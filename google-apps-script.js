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
    } else if (action === 'getBorrowed') {
      result = { success: true, data: sheetToArray(getSheet('borrowed')) };
    } else if (action === 'getChangeLog') {
      result = { success: true, data: sheetToArray(getSheet('changeLog')) };
    } else if (action === 'getLoginLog') {
      result = { success: true, data: sheetToArray(getSheet('loginLog')) };
    } else if (action === 'getAll') {
      var items = sheetToArray(getSheet('items'));
      items.forEach(function(item) {
        item.stock = Number(item.stock) || 0;
      });
      result = {
        success: true,
        data: {
          items: items,
          borrowed: sheetToArray(getSheet('borrowed')),
          changeLog: sheetToArray(getSheet('changeLog')),
          loginLog: sheetToArray(getSheet('loginLog'))
        }
      };
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
  var params = JSON.parse(e.postData.contents);

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

  var action = params.action;
  var result = {};

  try {
    if (action === 'saveItems') {
      var sheet = getSheet('items');
      arrayToSheet(sheet, params.data, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
      result = { success: true };

    } else if (action === 'saveBorrowed') {
      var sheet = getSheet('borrowed');
      arrayToSheet(sheet, params.data, ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt']);
      result = { success: true };

    } else if (action === 'addBorrowed') {
      var sheet = getSheet('borrowed');
      var data = sheetToArray(sheet);
      data.push(params.record);
      arrayToSheet(sheet, data, ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt']);
      result = { success: true };

    } else if (action === 'removeBorrowed') {
      var sheet = getSheet('borrowed');
      var data = sheetToArray(sheet);
      var studentId = params.studentId;
      var itemName = params.itemName;
      data = data.filter(function(r) {
        return !(r.studentId == studentId && r.itemName == itemName);
      });
      arrayToSheet(sheet, data, ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt']);
      result = { success: true };

    } else if (action === 'updateStock') {
      var sheet = getSheet('items');
      var items = sheetToArray(sheet);
      var itemName = params.itemName;
      var newStock = params.stock;
      items.forEach(function(item) {
        if (item.name === itemName) {
          item.stock = Number(newStock);
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
      arrayToSheet(getSheet('items'), params.data.items, ['name', 'type', 'stock', 'notice', 'icon', 'image']);
      arrayToSheet(getSheet('borrowed'), params.data.borrowed, ['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt']);
      if (params.data.changeLog) {
        arrayToSheet(getSheet('changeLog'), params.data.changeLog, ['action', 'details', 'time']);
      }
      if (params.data.loginLog) {
        arrayToSheet(getSheet('loginLog'), params.data.loginLog, ['studentId', 'name', 'phone', 'time']);
      }
      result = { success: true };

    } else {
      result = { success: false, error: 'Unknown action' };
    }
  } catch (err) {
    result = { success: false, error: err.message };
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
    borrowedSheet.getRange(1, 1, 1, 7).setValues([['studentId', 'name', 'phone', 'itemName', 'dueLabel', 'dueDate', 'borrowedAt']]);
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
}
