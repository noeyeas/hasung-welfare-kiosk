// Google Apps Script - 복지물품 키오스크 API
// 이 코드를 Google Apps Script에 붙여넣으세요

var SPREADSHEET_ID = '14ajvLfg_irrWWYJzwe3n85Dug23wYEcUUHzBLzdIdBc';

// 보안: API 키 검증 (간단한 토큰 기반)
var API_KEY = 'HS_KIOSK_2024_SEC_TOKEN';

function verifyApiKey(e) {
  var key = '';
  if (e && e.parameter && e.parameter.key) {
    key = e.parameter.key;
  } else if (e && e.postData) {
    try {
      var params = JSON.parse(e.postData.contents);
      key = params.key || '';
    } catch (err) {
      // ignore
    }
  }
  return key === API_KEY;
}

// 보안: 비밀번호 시도 횟수 제한 (rate limiting)
function checkRateLimit(action) {
  var cache = CacheService.getScriptCache();
  var key = 'ratelimit_' + action;
  var count = parseInt(cache.get(key) || '0');
  if (count >= 30) {
    return false; // 60초 내 30회 초과 시 차단
  }
  cache.put(key, String(count + 1), 60); // 60초 TTL
  return true;
}

// ========================================
// 보안: 서버측 관리자 인증 (파괴적 작업 전용)
// ========================================
// SHA-256 hex 계산
function sha256Hex(str) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(str), Utilities.Charset.UTF_8);
  var hex = '';
  for (var i = 0; i < raw.length; i++) {
    var b = (raw[i] + 256) % 256;
    var h = b.toString(16);
    if (h.length === 1) h = '0' + h;
    hex += h;
  }
  return hex;
}

// 관리자 비밀번호 해시(SHA-256)는 스크립트 속성에 저장 (레포에 원문/해시 보관 안 함)
// 설정 방법: Apps Script 편집기 → 프로젝트 설정 → 스크립트 속성 → ADMIN_PASSWORD_HASH = <비밀번호의 sha256 hex>
function getAdminHash() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD_HASH') || '';
}

// 파괴적 작업(전체 저장/복원)에 대해 관리자 비밀번호 검증
// ADMIN_PASSWORD_HASH 미설정 시에는 하위 호환을 위해 통과(API_KEY만으로 허용)
function verifyAdminAuth(params) {
  var adminHash = getAdminHash();
  if (!adminHash) return true; // 미구성 상태: 기존 동작 유지
  var pw = params && params.adminPassword ? String(params.adminPassword) : '';
  if (!pw) return false;
  return sha256Hex(pw) === adminHash;
}

// 대여 시트 헤더 (id 컬럼 포함 - 로그/정렬용, 하위호환: 기존 행은 id 공란)
var BORROWED_HEADERS = ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt', 'id'];

// 대여 중복 판정 키: (studentId, itemName) — 클라/서버 동일 규칙 (borrowedAt 미포함)
// 미반납 상태는 학생·물품당 1건만 가능하므로 이 조합이 유일 키
function borrowKey(r) {
  return String(r && r.studentId) + '|' + String(r && r.itemName);
}

// (studentId, itemName) 기준 중복 제거 - 먼저 등장한 레코드 유지
function dedupBorrowed(rows) {
  var seen = {};
  var out = [];
  (rows || []).forEach(function(r) {
    var k = borrowKey(r);
    if (!seen[k]) {
      seen[k] = true;
      out.push(r);
    }
  });
  return out;
}

// 소모품 수령 기록 시트 — 누적 카운터의 중복 증가를 막는 멱등 키 저장소
var CONSUMED_HEADERS = ['id', 'studentId', 'itemName', 'consumedAt'];

function getConsumedSheet() {
  var sheet = getSheet('consumed');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CONSUMED_HEADERS.length).setValues([CONSUMED_HEADERS]);
  }
  return sheet;
}

// ========================================
// 누적 통계 카운터 ('stats' 시트) - 로그 200개 캡·덮어쓰기와 무관한 진짜 누적
// ========================================
function getStatsSheet() {
  var sheet = getSheet('stats');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 2).setValues([['key', 'value']]);
    sheet.appendRow(['totalBorrow', 0]);
  }
  return sheet;
}

function getStat(key) {
  var sheet = getStatsSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) return Number(data[i][1]) || 0;
  }
  return 0;
}

// 카운터 증가 (doPost의 LockService로 직렬화되어 read-modify-write 경쟁 안전)
function incrementStat(key, by) {
  var sheet = getStatsSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      var newVal = (Number(data[i][1]) || 0) + by;
      sheet.getRange(i + 1, 2).setValue(newVal);
      return newVal;
    }
  }
  sheet.appendRow([key, by]);
  return by;
}

// 공개 응답용: 대여 기록에서 개인정보(이름·전화번호) 제거
function sanitizeBorrowed(rows) {
  return (rows || []).map(function(r) {
    return {
      studentId: r.studentId,
      itemName: r.itemName,
      dueLabel: r.dueLabel,
      dueDate: r.dueDate,
      borrowedAt: r.borrowedAt,
      id: r.id
    };
  });
}

// 입력 검증: 대여 기록 한 건
function isValidBorrowRecord(r) {
  if (!r || typeof r !== 'object') return false;
  if (!/^\d{10}$/.test(String(r.studentId || ''))) return false;
  var itemName = String(r.itemName || '');
  if (itemName.length === 0 || itemName.length > 100) return false;
  if (String(r.name || '').length > 40) return false;
  if (String(r.phone || '').length > 20) return false;
  return true;
}

function getSheet(name) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function sheetToArray(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  var headers = data[0];
  var result = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = data[i][j];
    }
    result.push(obj);
  }
  return result;
}

function arrayToSheet(sheet, data, headers) {
  sheet.clear();
  if (!headers || headers.length === 0) return;
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (data.length > 0) {
    var rows = data.map(function(item) {
      return headers.map(function(h) {
        return item[h] !== undefined ? item[h] : '';
      });
    });
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function doGet(e) {
  // 보안: API 키 검증
  if (!verifyApiKey(e)) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 보안: Rate limiting
  if (!checkRateLimit('doGet')) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Rate limit exceeded' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var action = e.parameter.action;
  var result = {};

  try {
    if (action === 'getItems') {
      var items = sheetToArray(getSheet('items'));
      items.forEach(function(item) {
        item.stock = Number(item.stock) || 0;
      });
      result = { success: true, data: items };
    } else if (action === 'getAll') {
      // 공개(GET) 엔드포인트: 개인정보(이름·전화번호) 제거 후 반환
      // 사용자 흐름은 studentId+itemName 만으로 중복대여/반납 판정이 가능하므로 이름·전화번호 불필요
      var items = sheetToArray(getSheet('items'));
      items.forEach(function(item) {
        item.stock = Number(item.stock) || 0;
      });
      result = {
        success: true,
        data: {
          items: items,
          borrowed: sanitizeBorrowed(sheetToArray(getSheet('borrowed')))
          // changeLog·loginLog·이름·전화번호는 공개 응답에서 제외 (관리자 전용 getAllAdmin 사용)
        }
      };
    } else if (action === 'getBorrowed' || action === 'getChangeLog' || action === 'getLoginLog') {
      // 개인정보/감사 로그 전체는 공개 GET으로 제공하지 않음 (관리자 전용 POST getAllAdmin 사용)
      result = { success: false, error: 'Admin endpoint required' };
    } else {
      result = { success: false, error: 'Unknown action' };
    }
  } catch (err) {
    result = { success: false, error: err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var params;
  try {
    params = JSON.parse(e.postData.contents);
  } catch (parseErr) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid request body' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 보안: API 키 검증
  if (params.key !== API_KEY) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 보안: Rate limiting
  if (!checkRateLimit('doPost')) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Rate limit exceeded' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 동시성 제어: 여러 요청이 시트를 동시에 read-modify-write 하면 기록이 유실되므로 잠금 사용
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // 최대 10초 대기
  } catch (lockErr) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Server busy, please retry' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var action = params.action;
  var result = {};

  try {
    if (action === 'getAllAdmin') {
      // 관리자 전용 전체 조회 (개인정보 포함) - 비밀번호를 URL에 노출하지 않도록 POST 사용
      if (!verifyAdminAuth(params)) {
        result = { success: false, error: 'Admin auth required' };
      } else {
        var aitems = sheetToArray(getSheet('items'));
        aitems.forEach(function(item) {
          item.stock = Number(item.stock) || 0;
        });
        result = {
          success: true,
          data: {
            items: aitems,
            borrowed: sheetToArray(getSheet('borrowed')),
            changeLog: sheetToArray(getSheet('changeLog')),
            loginLog: sheetToArray(getSheet('loginLog')),
            stats: { totalBorrow: getStat('totalBorrow') }
          }
        };
      }

    } else if (action === 'saveItems') {
      // 파괴적 작업(전체 물품 덮어쓰기·삭제): 관리자 인증 필요
      if (!verifyAdminAuth(params)) {
        result = { success: false, error: 'Admin auth required' };
      } else if (!Array.isArray(params.data) || params.data.length > 500) {
        result = { success: false, error: 'Invalid items payload' };
      } else {
        arrayToSheet(getSheet('items'), params.data, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
        result = { success: true };
      }

    } else if (action === 'saveBorrowed') {
      // 파괴적 작업(대여 기록 전체 덮어쓰기): 관리자 인증 필요
      if (!verifyAdminAuth(params)) {
        result = { success: false, error: 'Admin auth required' };
      } else if (!Array.isArray(params.data) || params.data.length > 5000) {
        result = { success: false, error: 'Invalid borrowed payload' };
      } else {
        // (studentId, itemName) 기준 중복 제거 후 저장
        arrayToSheet(getSheet('borrowed'), dedupBorrowed(params.data), BORROWED_HEADERS);
        result = { success: true };
      }

    } else if (action === 'addBorrowed') {
      // 입력 검증: 학번 형식·필드 길이
      if (!isValidBorrowRecord(params.record)) {
        result = { success: false, error: 'Invalid record' };
      } else {
        var sheet = getSheet('borrowed');
        var data = sheetToArray(sheet);
        var key = borrowKey(params.record);
        var exists = data.some(function(r) {
          return borrowKey(r) === key;
        });
        if (exists) {
          // 멱등: 같은 (studentId, itemName) 미반납 레코드가 이미 있으면 추가하지 않음
          result = { success: true, duplicate: true };
        } else {
          var rec = params.record;
          if (!rec.id) {
            rec.id = String(rec.studentId) + '|' + String(rec.itemName) + '|' + String(rec.borrowedAt);
          }
          data.push(rec);
          arrayToSheet(sheet, data, BORROWED_HEADERS);
          incrementStat('totalBorrow', 1); // 누적 카운터 +1 (실제 추가 시에만)
          result = { success: true };
        }
      }

    } else if (action === 'removeBorrowed') {
      var sheet = getSheet('borrowed');
      var data = sheetToArray(sheet);
      var studentId = params.studentId;
      var itemName = params.itemName;
      data = data.filter(function(r) {
        return !(r.studentId == studentId && r.itemName == itemName);
      });
      arrayToSheet(sheet, data, BORROWED_HEADERS);
      result = { success: true };

    } else if (action === 'recordConsume') {
      // 소모품 수령: 누적 카운터 +1.
      // 대여(addBorrowed)는 (학번, 물품명)으로 멱등하지만 수령은 반납이 없어
      // 그런 자연 키가 없다. 그래서 클라이언트가 만든 요청 id 를 시트에 남겨
      // 같은 요청이 두 번 도달해도 한 번만 세도록 한다.
      // (id 가 없는 구버전 클라이언트 요청은 예전처럼 그냥 +1 한다)
      var consumeId = params.id ? String(params.id) : '';
      if (!consumeId) {
        incrementStat('totalBorrow', 1);
        result = { success: true };
      } else {
        var cSheet = getConsumedSheet();
        var cData = sheetToArray(cSheet);
        var already = cData.some(function(r) {
          return String(r.id) === consumeId;
        });
        if (already) {
          result = { success: true, duplicate: true };
        } else {
          cData.push({
            id: consumeId,
            studentId: params.studentId || '',
            itemName: params.itemName || '',
            consumedAt: new Date().toISOString()
          });
          arrayToSheet(cSheet, cData, CONSUMED_HEADERS);
          incrementStat('totalBorrow', 1);
          result = { success: true };
        }
      }

    } else if (action === 'updateStock') {
      var sheet = getSheet('items');
      var items = sheetToArray(sheet);
      var itemName = params.itemName;
      var newStock = params.stock;
      items.forEach(function(item) {
        if (item.name === itemName) {
          item.stock = Math.max(0, Number(newStock) || 0); // 음수 재고 방지
        }
      });
      arrayToSheet(sheet, items, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
      result = { success: true };

    } else if (action === 'addChangeLog') {
      var sheet = getSheet('changeLog');
      var headers = ['action', 'details', 'time'];
      var data = sheetToArray(sheet);
      data.push(params.log);
      // 최근 200개만 유지
      if (data.length > 200) data = data.slice(data.length - 200);
      arrayToSheet(sheet, data, headers);
      result = { success: true };

    } else if (action === 'addLoginLog') {
      var sheet = getSheet('loginLog');
      var headers = ['studentId', 'name', 'phone', 'time'];
      var data = sheetToArray(sheet);
      data.push(params.log);
      if (data.length > 200) data = data.slice(data.length - 200);
      arrayToSheet(sheet, data, headers);
      result = { success: true };

    } else if (action === 'saveAll') {
      // 파괴적 작업(전체 데이터 덮어쓰기/복원): 관리자 인증 필요
      if (!verifyAdminAuth(params)) {
        result = { success: false, error: 'Admin auth required' };
      } else if (!params.data) {
        result = { success: false, error: 'Invalid payload' };
      } else {
        arrayToSheet(getSheet('items'), params.data.items, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
        arrayToSheet(getSheet('borrowed'), dedupBorrowed(params.data.borrowed), BORROWED_HEADERS);
        if (params.data.changeLog) {
          arrayToSheet(getSheet('changeLog'), params.data.changeLog, ['action', 'details', 'time']);
        }
        if (params.data.loginLog) {
          arrayToSheet(getSheet('loginLog'), params.data.loginLog, ['studentId', 'name', 'phone', 'time']);
        }
        result = { success: true };
      }

    } else {
      result = { success: false, error: 'Unknown action' };
    }
  } catch (err) {
    result = { success: false, error: err.message };
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// 초기 데이터 설정 (최초 1회 실행)
function initializeData() {
  var itemsSheet = getSheet('items');
  var items = sheetToArray(itemsSheet);

  if (items.length === 0) {
    var defaultItems = [
      { name: '우산', type: '대여', stock: 7, notice: '비 오는 날 사용 후 충분히 말려서 반납', icon: '🌂', image: '' },
      { name: '충전기', type: '대여', stock: 5, notice: '케이블 손상 시 즉시 관리자에게 보고', icon: '🔌', image: '' },
      { name: 'USB 허브', type: '대여', stock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '🔗', image: '' },
      { name: 'USB 허브 C타입', type: '대여', stock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '💻', image: '' },
      { name: '농구공', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🏀', image: '' },
      { name: '풋살볼', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽', image: '' },
      { name: '피구공', type: '대여', stock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🔴', image: '' },
      { name: '공', type: '대여', stock: 4, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽', image: '' },
      { name: '담요', type: '대여', stock: 2, notice: '음식물·화장품 묻지 않게 주의', icon: '🛏️', image: '' },
      { name: '핫팩', type: '소모품', stock: 20, notice: '개봉 후 재활용 불가, 즉시 폐기', icon: '🔥', image: '' },
      { name: '마스크', type: '소모품', stock: 50, notice: '1인 1개 제한', icon: '😷', image: '' }
    ];
    arrayToSheet(itemsSheet, defaultItems, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
  }

  // borrowed 시트 헤더 생성
  var borrowedSheet = getSheet('borrowed');
  if (borrowedSheet.getLastRow() === 0) {
    borrowedSheet.getRange(1, 1, 1, BORROWED_HEADERS.length).setValues([BORROWED_HEADERS]);
  }

  // changeLog 시트 헤더 생성
  var changeLogSheet = getSheet('changeLog');
  if (changeLogSheet.getLastRow() === 0) {
    changeLogSheet.getRange(1, 1, 1, 3).setValues([['action', 'details', 'time']]);
  }

  // loginLog 시트 헤더 생성
  var loginLogSheet = getSheet('loginLog');
  if (loginLogSheet.getLastRow() === 0) {
    loginLogSheet.getRange(1, 1, 1, 4).setValues([['studentId', 'name', 'phone', 'time']]);
  }

  // stats 시트 초기화 (누적 대여·수령 카운터, totalBorrow=0)
  // ※ 과거 누적을 반영하려면 stats 시트 totalBorrow 셀 값을 관리자가 직접 시드값으로 설정
  getStatsSheet();
}
