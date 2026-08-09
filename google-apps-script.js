// Google Apps Script - 복지물품 키오스크 API
// 이 코드를 Google Apps Script에 붙여넣으세요
//
// ※ 필수 스크립트 속성 (편집기 → 프로젝트 설정 → 스크립트 속성)
//    ADMIN_PASSWORD_HASH = <관리자 비밀번호의 SHA-256 hex>
//    이 값이 없으면 관리자 액션(물품 추가·수정·삭제·순서변경, 전체 조회)이 전부 거부됩니다.
//    예전에는 미설정 시 통과시켰지만, API 키가 클라이언트에 노출되는 구조라
//    그 상태로는 아무나 관리자 작업을 할 수 있어 fail-closed 로 바꿨습니다.

var SPREADSHEET_ID = '14ajvLfg_irrWWYJzwe3n85Dug23wYEcUUHzBLzdIdBc';

// 보안: API 키 검증 (간단한 토큰 기반)
// ※ 이 키는 정적 사이트에 그대로 실려 나가므로 "비밀"이 아니다.
//    무작위 크롤러를 걸러내는 용도일 뿐이고, 실제 권한 판단은 verifyAdminAuth 가 한다.
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

// ========================================
// 보안: 액션별 rate limiting
// ========================================
// 예전에는 doGet/doPost 단위 전역 카운터(60초 30회)여서, 정상 이용만으로도
// 한도에 걸리는 동시에 외부인이 30회만 쳐도 전체가 마비됐다.
// 이제 액션마다 별도 한도를 둔다. doPost 에서는 LockService 안에서 호출해
// 카운터 read-modify-write 도 직렬화한다.
var RATE_LIMITS = {
  doGet: 240,
  getAllAdmin: 60,
  addBorrowed: 120,
  removeBorrowed: 120,
  recordConsume: 120,
  addChangeLog: 120,
  addLoginLog: 120,
  updateStock: 120,
  upsertItem: 60,
  deleteItem: 60,
  reorderItems: 60
};
var RATE_LIMIT_DEFAULT = 60;

function checkRateLimit(action) {
  var cache = CacheService.getScriptCache();
  var key = 'ratelimit_' + action;
  var limit = RATE_LIMITS[action] || RATE_LIMIT_DEFAULT;
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= limit) {
    return false;
  }
  cache.put(key, String(count + 1), 60); // 60초 TTL
  return true;
}

// ========================================
// 보안: 서버측 관리자 인증
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
function getAdminHash() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD_HASH') || '';
}

// 관리자 인증. 통과하면 null, 실패하면 오류 문자열을 돌려준다.
// fail-closed: 해시가 설정돼 있지 않으면 통과시키지 않는다.
function adminAuthError(params) {
  var adminHash = getAdminHash();
  if (!adminHash) {
    // 설정 실수를 진단할 수 있게 별도 메시지를 준다 (해시 자체는 노출하지 않음)
    return 'Admin auth not configured (set ADMIN_PASSWORD_HASH script property)';
  }
  var pw = params && params.adminPassword ? String(params.adminPassword) : '';
  if (!pw) return 'Admin auth required';
  if (sha256Hex(pw) !== adminHash) return 'Admin auth required';
  return null;
}

function isAdmin(params) {
  return adminAuthError(params) === null;
}

// items 시트 컬럼. 여기에 없는 필드는 arrayToSheet 가 버리므로 반드시 함께 갱신할 것
var ITEM_HEADERS = ['name', 'type', 'stock', 'maxStock', 'notice', 'icon', 'image'];
// 대여 시트 헤더 (id 컬럼 포함 - 로그/정렬용, 하위호환: 기존 행은 id 공란)
var BORROWED_HEADERS = ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt', 'id'];
var CHANGELOG_HEADERS = ['action', 'details', 'time'];
var LOGINLOG_HEADERS = ['studentId', 'name', 'phone', 'time'];

// 로그 보관 한도. 예전 200건은 너무 낮아, 아무 로그나 200번 밀어 넣으면
// 기존 감사 기록이 통째로 밀려 사라졌다. 한도를 올리고 rate limit 을 함께 건다.
var CHANGELOG_CAP = 2000;
var LOGINLOG_CAP = 1000;

var MAX_ITEMS = 500;

// 대여 중복 판정 키: (studentId, itemName) — 클라/서버 동일 규칙 (borrowedAt 미포함)
// 미반납 상태는 학생·물품당 1건만 가능하므로 이 조합이 유일 키
function borrowKey(r) {
  return String(r && r.studentId) + '|' + String(r && r.itemName);
}

// ========================================
// 누적 통계 카운터 ('stats' 시트) - 로그 캡·덮어쓰기와 무관한 진짜 누적
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
  return (rows || []).map(function (r) {
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

// ========================================
// 입력 검증
// ========================================
function isValidStudentId(v) {
  return /^\d{10}$/.test(String(v || ''));
}

function isValidItemName(v) {
  var s = String(v || '');
  return s.length > 0 && s.length <= 100;
}

// 입력 검증: 대여 기록 한 건
function isValidBorrowRecord(r) {
  if (!r || typeof r !== 'object') return false;
  if (!isValidStudentId(r.studentId)) return false;
  if (!isValidItemName(r.itemName)) return false;
  if (String(r.name || '').length > 40) return false;
  if (String(r.phone || '').length > 20) return false;
  if (String(r.dueLabel || '').length > 40) return false;
  if (String(r.dueDate || '').length > 40) return false;
  if (String(r.borrowedAt || '').length > 40) return false;
  return true;
}

// 물품 한 건 정규화. 형식이 어긋나면 null.
function normalizeItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  var name = String(raw.name || '').trim();
  if (!isValidItemName(name)) return null;
  var type = String(raw.type || '');
  if (type !== '대여' && type !== '소모품') return null;
  var maxStock = Math.max(0, Math.min(9999, Number(raw.maxStock) || 0));
  var stock = Math.max(0, Math.min(9999, Number(raw.stock) || 0));
  if (maxStock > 0) stock = Math.min(stock, maxStock);
  return {
    name: name,
    type: type,
    stock: stock,
    maxStock: maxStock,
    notice: String(raw.notice || '').slice(0, 200),
    icon: String(raw.icon || '').slice(0, 8),
    image: String(raw.image || '').slice(0, 500)
  };
}

// 변경 로그 한 건 정규화
function normalizeChangeLog(log) {
  if (!log || typeof log !== 'object') return null;
  var action = String(log.action || '').trim().slice(0, 50);
  if (!action) return null;
  return {
    action: action,
    details: String(log.details || '').slice(0, 300),
    time: String(log.time || '').slice(0, 40)
  };
}

// 로그인 로그 한 건 정규화
function normalizeLoginLog(log) {
  if (!log || typeof log !== 'object') return null;
  if (!isValidStudentId(log.studentId)) return null;
  return {
    studentId: String(log.studentId),
    name: String(log.name || '').slice(0, 40),
    phone: String(log.phone || '').slice(0, 20),
    time: String(log.time || '').slice(0, 40)
  };
}

// ========================================
// 시트 유틸
// ========================================
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
    var rows = data.map(function (item) {
      return headers.map(function (h) {
        return item[h] !== undefined ? item[h] : '';
      });
    });
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

// 로그는 append + 초과분 삭제로 처리한다.
// clear() 후 전체 재작성은 중간에 실패하면 로그가 통째로 날아간다.
function appendLog(sheetName, headers, row, cap) {
  var sheet = getSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.appendRow(headers.map(function (h) {
    return row[h] !== undefined ? row[h] : '';
  }));
  var count = sheet.getLastRow() - 1; // 헤더 제외
  if (count > cap) {
    sheet.deleteRows(2, count - cap); // 오래된 것부터 제거
  }
}

// 재고 셀만 직접 고쳐 쓴다.
// 시트 전체를 clear() 후 다시 쓰면, 그 사이 다른 요청이 넣은 행이 사라질 수 있다.
// 반환값: 반영된 재고(숫자), 물품을 못 찾으면 null
function writeStockCell(itemName, mutate) {
  var sheet = getSheet('items');
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return null;
  var headers = data[0];
  var nameCol = headers.indexOf('name');
  var stockCol = headers.indexOf('stock');
  var maxCol = headers.indexOf('maxStock');
  if (nameCol === -1 || stockCol === -1) return null;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][nameCol]) === String(itemName)) {
      var current = Number(data[i][stockCol]) || 0;
      var max = maxCol === -1 ? 0 : (Number(data[i][maxCol]) || 0);
      var next = Math.max(0, Number(mutate(current)) || 0); // 음수 재고 방지
      if (max > 0) next = Math.min(next, max); // 최대 재고 초과 방지
      if (next !== current) {
        sheet.getRange(i + 1, stockCol + 1).setValue(next);
      }
      return next;
    }
  }
  return null;
}

// 현재 재고만 읽는다 (기록하지 않음). 물품을 못 찾으면 null.
function getStock(itemName) {
  var sheet = getSheet('items');
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return null;
  var headers = data[0];
  var nameCol = headers.indexOf('name');
  var stockCol = headers.indexOf('stock');
  if (nameCol === -1 || stockCol === -1) return null;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][nameCol]) === String(itemName)) {
      return Number(data[i][stockCol]) || 0;
    }
  }
  return null;
}

function adjustStock(itemName, delta) {
  return writeStockCell(itemName, function (current) {
    return current + delta;
  });
}

function setStock(itemName, value) {
  return writeStockCell(itemName, function () {
    return Number(value) || 0;
  });
}

function jsonOut(result) {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// GET (공개 조회)
// ========================================
function doGet(e) {
  if (!verifyApiKey(e)) {
    return jsonOut({ success: false, error: 'Unauthorized' });
  }
  if (!checkRateLimit('doGet')) {
    return jsonOut({ success: false, error: 'Rate limit exceeded' });
  }

  var action = e.parameter.action;
  var result = {};

  try {
    if (action === 'getItems') {
      var items = sheetToArray(getSheet('items'));
      items.forEach(function (item) {
        item.stock = Number(item.stock) || 0;
      });
      result = { success: true, data: items };
    } else if (action === 'getAll') {
      // 공개(GET) 엔드포인트: 개인정보(이름·전화번호) 제거 후 반환
      // 사용자 흐름은 studentId+itemName 만으로 중복대여/반납 판정이 가능하므로 이름·전화번호 불필요
      var allItems = sheetToArray(getSheet('items'));
      allItems.forEach(function (item) {
        item.stock = Number(item.stock) || 0;
      });
      result = {
        success: true,
        data: {
          items: allItems,
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

  return jsonOut(result);
}

// ========================================
// POST (변경 및 관리자 조회)
// ========================================
function doPost(e) {
  var params;
  try {
    params = JSON.parse(e.postData.contents);
  } catch (parseErr) {
    return jsonOut({ success: false, error: 'Invalid request body' });
  }

  if (params.key !== API_KEY) {
    return jsonOut({ success: false, error: 'Unauthorized' });
  }

  // 동시성 제어: 여러 요청이 시트를 동시에 read-modify-write 하면 기록이 유실되므로 잠금 사용
  // rate limit 카운터도 이 잠금 안에서 증가시켜야 경쟁 없이 정확하다.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // 최대 10초 대기
  } catch (lockErr) {
    return jsonOut({ success: false, error: 'Server busy, please retry' });
  }

  var action = String(params.action || '');
  var result = {};

  try {
    if (!checkRateLimit(action || 'doPost')) {
      result = { success: false, error: 'Rate limit exceeded' };
    } else {
      result = handlePost(action, params);
    }
  } catch (err) {
    result = { success: false, error: err.message };
  } finally {
    lock.releaseLock();
  }

  return jsonOut(result);
}

function handlePost(action, params) {
  // ── 관리자 전용 액션 ──────────────────────────────────
  var ADMIN_ACTIONS = ['getAllAdmin', 'upsertItem', 'deleteItem', 'reorderItems', 'updateStock'];
  if (ADMIN_ACTIONS.indexOf(action) !== -1) {
    var authErr = adminAuthError(params);
    if (authErr) return { success: false, error: authErr };
  }

  if (action === 'getAllAdmin') {
    // 관리자 전용 전체 조회 (개인정보 포함) - 비밀번호를 URL에 노출하지 않도록 POST 사용
    var aitems = sheetToArray(getSheet('items'));
    aitems.forEach(function (item) {
      item.stock = Number(item.stock) || 0;
    });
    return {
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

  // ── 물품 추가·수정 (증분) ────────────────────────────
  // 예전 saveItems 는 클라이언트의 items 배열 전체를 시트에 덮어썼다.
  // 관리자 화면을 열어둔 사이 다른 기기에서 대여가 일어나면, 물품 하나만
  // 고쳐도 나머지 전 물품의 재고가 관리자 기기의 옛 값으로 되돌아갔다.
  // 이제 건드리는 물품 한 건만 반영한다.
  if (action === 'upsertItem') {
    var item = normalizeItem(params.item);
    if (!item) return { success: false, error: 'Invalid item' };

    var oldName = params.oldName ? String(params.oldName) : '';
    var sheet = getSheet('items');
    var items = sheetToArray(sheet);
    var targetName = oldName || item.name;
    var idx = -1;
    for (var i = 0; i < items.length; i++) {
      if (String(items[i].name) === targetName) { idx = i; break; }
    }

    // 이름 충돌 검사 (자기 자신 제외)
    for (var j = 0; j < items.length; j++) {
      if (j !== idx && String(items[j].name) === item.name) {
        return { success: false, error: 'Duplicate item name' };
      }
    }

    if (idx === -1) {
      if (items.length >= MAX_ITEMS) return { success: false, error: 'Too many items' };
      items.push(item);
    } else {
      items[idx] = item;
    }
    arrayToSheet(sheet, items, ITEM_HEADERS);

    // 이름을 바꾸면 대여 기록이 물품과 연결이 끊긴다 → 기록의 물품명도 함께 갱신
    var renamed = 0;
    if (oldName && oldName !== item.name) {
      var bsheet = getSheet('borrowed');
      var brows = sheetToArray(bsheet);
      brows.forEach(function (r) {
        if (String(r.itemName) === oldName) {
          r.itemName = item.name;
          renamed++;
        }
      });
      if (renamed > 0) arrayToSheet(bsheet, brows, BORROWED_HEADERS);
    }
    return { success: true, renamed: renamed };
  }

  if (action === 'deleteItem') {
    var delName = String(params.name || '');
    if (!isValidItemName(delName)) return { success: false, error: 'Invalid item name' };
    var dsheet = getSheet('items');
    var ditems = sheetToArray(dsheet);
    var kept = ditems.filter(function (it) {
      return String(it.name) !== delName;
    });
    if (kept.length === ditems.length) return { success: false, error: 'Item not found' };
    arrayToSheet(dsheet, kept, ITEM_HEADERS);

    // 물품을 지우면 그 물품의 대여 기록이 고아로 남는다. 그대로 두면 대여자는
    // (1인 1물품 규칙 때문에) 새 대여도 막히고, 반납 목록엔 삭제된 물품이 안 떠
    // 반납도 못 하는 상태에 갇힌다. 그래서 대여 기록도 함께 정리한다.
    var delBSheet = getSheet('borrowed');
    var delBRows = sheetToArray(delBSheet);
    var keptBorrowed = delBRows.filter(function (r) {
      return String(r.itemName) !== delName;
    });
    var releasedBorrowed = delBRows.length - keptBorrowed.length;
    if (releasedBorrowed > 0) arrayToSheet(delBSheet, keptBorrowed, BORROWED_HEADERS);
    return { success: true, releasedBorrowed: releasedBorrowed };
  }

  // 순서만 재배치한다. 재고 등 값은 시트의 현재 값을 그대로 유지하므로
  // 클라이언트의 오래된 재고가 서버로 되밀리지 않는다.
  if (action === 'reorderItems') {
    if (!Array.isArray(params.names)) return { success: false, error: 'Invalid names' };
    var rsheet = getSheet('items');
    var ritems = sheetToArray(rsheet);
    var byName = {};
    ritems.forEach(function (it) {
      byName[String(it.name)] = it;
    });
    var ordered = [];
    var used = {};
    params.names.forEach(function (n) {
      var key = String(n);
      if (byName[key] && !used[key]) {
        ordered.push(byName[key]);
        used[key] = true;
      }
    });
    // 목록에 없던 물품(그 사이 다른 기기에서 추가된 것)은 뒤에 붙여 유실을 막는다
    ritems.forEach(function (it) {
      if (!used[String(it.name)]) ordered.push(it);
    });
    arrayToSheet(rsheet, ordered, ITEM_HEADERS);
    return { success: true };
  }

  // 관리자 재고 직접 지정 (스테퍼 ＋/−)
  if (action === 'updateStock') {
    if (!isValidItemName(params.itemName)) return { success: false, error: 'Invalid item name' };
    var applied = setStock(params.itemName, params.stock);
    if (applied === null) return { success: false, error: 'Item not found' };
    return { success: true, stock: applied };
  }

  // ── 학생 흐름 (관리자 인증 없이 허용) ──────────────────
  // 재고 증감은 클라이언트가 계산한 절대값을 받지 않고 서버가 직접 ±1 한다.
  // 예전에는 학생 흐름도 updateStock(절대값)을 불렀는데, API 키만 있으면
  // 아무나 모든 재고를 0으로 만들 수 있었다.
  if (action === 'addBorrowed') {
    if (!isValidBorrowRecord(params.record)) {
      return { success: false, error: 'Invalid record' };
    }
    var bsheet2 = getSheet('borrowed');
    var bdata = sheetToArray(bsheet2);
    var key = borrowKey(params.record);
    var exists = bdata.some(function (r) {
      return borrowKey(r) === key;
    });
    if (exists) {
      // 멱등: 같은 (studentId, itemName) 미반납 레코드가 이미 있으면 추가하지 않음
      // (응답을 못 받아 재시도로 같은 요청이 두 번 도착해도 기록이 복제되지 않는다)
      return { success: true, duplicate: true };
    }
    // 1인 1물품: 이미 반납하지 않은 다른 물품이 있으면 추가 대여를 막는다.
    // 클라이언트에서도 막지만, 다른 기기·오래된 화면에서 오는 요청은
    // 서버만이 최종적으로 판단할 수 있다.
    var studentSid = String(params.record.studentId);
    var held = null;
    for (var bi = 0; bi < bdata.length; bi++) {
      if (String(bdata[bi].studentId) === studentSid) {
        held = String(bdata[bi].itemName);
        break;
      }
    }
    if (held) {
      return { success: false, error: 'ALREADY_BORROWED', heldItem: held };
    }
    // 재고 확인은 서버가 최종 판단한다. 클라이언트는 stock<=0 을 막지만,
    // 오래된 화면·동시 요청은 서버만이 정확히 알 수 있다. 이 검사가 없으면
    // 재고 1개를 두 사람이 동시에 대여해 재고 없이 빌린 기록이 생긴다.
    var curStock = getStock(params.record.itemName);
    if (curStock === null) return { success: false, error: 'Item not found' };
    if (curStock <= 0) return { success: false, error: 'OUT_OF_STOCK' };

    var rec = params.record;
    if (!rec.id) {
      rec.id = String(rec.studentId) + '|' + String(rec.itemName) + '|' + String(rec.borrowedAt);
    }
    appendLog('borrowed', BORROWED_HEADERS, rec, 100000);
    var afterBorrow = adjustStock(rec.itemName, -1); // 재고 차감은 서버가 판단
    incrementStat('totalBorrow', 1); // 누적 카운터 +1 (실제 추가 시에만)
    return { success: true, stock: afterBorrow };
  }

  if (action === 'removeBorrowed') {
    // 예전에는 검증이 전혀 없어, 키만 있으면 임의의 대여 기록을 지울 수 있었다.
    if (!isValidStudentId(params.studentId)) return { success: false, error: 'Invalid studentId' };
    if (!isValidItemName(params.itemName)) return { success: false, error: 'Invalid item name' };

    var rmSheet = getSheet('borrowed');
    var rmData = sheetToArray(rmSheet);
    var studentId = String(params.studentId);
    var itemName = String(params.itemName);
    var remaining = rmData.filter(function (r) {
      return !(String(r.studentId) === studentId && String(r.itemName) === itemName);
    });
    var removed = rmData.length - remaining.length;
    if (removed === 0) {
      // 멱등: 이미 반납된 건이면 재고를 또 올리지 않는다 (중복 반납으로 재고 부풀리기 방지)
      return { success: true, removed: 0 };
    }
    arrayToSheet(rmSheet, remaining, BORROWED_HEADERS);
    var afterReturn = adjustStock(itemName, removed);
    return { success: true, removed: removed, stock: afterReturn };
  }

  if (action === 'recordConsume') {
    // 소모품 수령: 재고 −1 + 누적 카운터 +1 (borrowed 시트에는 기록하지 않음)
    if (!isValidItemName(params.itemName)) return { success: false, error: 'Invalid item name' };
    var afterConsume = adjustStock(params.itemName, -1);
    if (afterConsume === null) return { success: false, error: 'Item not found' };
    incrementStat('totalBorrow', 1);
    return { success: true, stock: afterConsume };
  }

  if (action === 'addChangeLog') {
    var clog = normalizeChangeLog(params.log);
    if (!clog) return { success: false, error: 'Invalid log' };
    appendLog('changeLog', CHANGELOG_HEADERS, clog, CHANGELOG_CAP);
    return { success: true };
  }

  if (action === 'addLoginLog') {
    var llog = normalizeLoginLog(params.log);
    if (!llog) return { success: false, error: 'Invalid log' };
    appendLog('loginLog', LOGINLOG_HEADERS, llog, LOGINLOG_CAP);
    return { success: true };
  }

  // saveItems / saveBorrowed 는 제거했다.
  // 시트 전체를 클라이언트 상태로 덮어쓰는 구조라, 캐시된 옛 클라이언트가
  // 한 번만 호출해도 그 사이의 대여 기록·재고가 통째로 되돌아갔다.
  return { success: false, error: 'Unknown action' };
}

// ========================================
// 초기 데이터 설정 (최초 1회 실행)
// ========================================
// ※ 물품 목록은 클라이언트(js/script.js)의 DEFAULT_ITEMS 와 같은 내용이어야 한다.
//   한쪽만 고치면 초기화 결과가 어긋난다.
function initializeData() {
  var itemsSheet = getSheet('items');
  var items = sheetToArray(itemsSheet);

  if (items.length === 0) {
    // maxStock 을 반드시 채운다. 비어 있으면 클라이언트가 "현재 재고 = 최대 재고"로
    // 간주해 재고 부족 경고가 영원히 뜨지 않는다.
    var defaultItems = [
      { name: '우산', type: '대여', stock: 7, maxStock: 7, notice: '비 오는 날 사용 후 충분히 말려서 반납', icon: '🌂', image: '' },
      { name: '충전기', type: '대여', stock: 5, maxStock: 5, notice: '케이블 손상 시 즉시 관리자에게 보고', icon: '🔌', image: '' },
      { name: 'USB 허브', type: '대여', stock: 3, maxStock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '🔗', image: '' },
      { name: 'USB 허브 C타입', type: '대여', stock: 3, maxStock: 3, notice: 'USB 포트 무리하게 꽂지 않기', icon: '💻', image: '' },
      { name: '농구공', type: '대여', stock: 2, maxStock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🏀', image: '' },
      { name: '풋살볼', type: '대여', stock: 2, maxStock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽', image: '' },
      { name: '피구공', type: '대여', stock: 2, maxStock: 2, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '🔴', image: '' },
      { name: '공', type: '대여', stock: 4, maxStock: 4, notice: '실내 사용 금지, 흙 묻지 않게 관리', icon: '⚽', image: '' },
      { name: '담요', type: '대여', stock: 2, maxStock: 2, notice: '음식물·화장품 묻지 않게 주의', icon: '🛏️', image: '' },
      { name: '핫팩', type: '소모품', stock: 20, maxStock: 20, notice: '개봉 후 재활용 불가, 즉시 폐기', icon: '🔥', image: '' },
      { name: '마스크', type: '소모품', stock: 50, maxStock: 50, notice: '1인 1개 제한', icon: '😷', image: '' }
    ];
    arrayToSheet(itemsSheet, defaultItems, ITEM_HEADERS);
  }

  // borrowed 시트 헤더 생성
  var borrowedSheet = getSheet('borrowed');
  if (borrowedSheet.getLastRow() === 0) {
    borrowedSheet.getRange(1, 1, 1, BORROWED_HEADERS.length).setValues([BORROWED_HEADERS]);
  }

  // changeLog 시트 헤더 생성
  var changeLogSheet = getSheet('changeLog');
  if (changeLogSheet.getLastRow() === 0) {
    changeLogSheet.getRange(1, 1, 1, CHANGELOG_HEADERS.length).setValues([CHANGELOG_HEADERS]);
  }

  // loginLog 시트 헤더 생성
  var loginLogSheet = getSheet('loginLog');
  if (loginLogSheet.getLastRow() === 0) {
    loginLogSheet.getRange(1, 1, 1, LOGINLOG_HEADERS.length).setValues([LOGINLOG_HEADERS]);
  }

  // stats 시트 초기화 (누적 대여·수령 카운터, totalBorrow=0)
  // ※ 과거 누적을 반영하려면 stats 시트 totalBorrow 셀 값을 관리자가 직접 시드값으로 설정
  getStatsSheet();
}

// 기존 items 시트에 maxStock 이 비어 있는 행을 현재 재고로 채운다.
// (예전 데이터 호환용 - 편집기에서 1회 실행)
function backfillMaxStock() {
  var sheet = getSheet('items');
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;
  var headers = data[0];
  var stockCol = headers.indexOf('stock');
  var maxCol = headers.indexOf('maxStock');
  if (stockCol === -1 || maxCol === -1) return;
  for (var i = 1; i < data.length; i++) {
    if (!(Number(data[i][maxCol]) > 0)) {
      sheet.getRange(i + 1, maxCol + 1).setValue(Number(data[i][stockCol]) || 0);
    }
  }
}
