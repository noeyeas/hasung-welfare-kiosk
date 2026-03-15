"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var form = document.getElementById("user-form");
var stepUser = document.getElementById("step-user");
var stepItems = document.getElementById("step-items");
var nameError = document.getElementById("nameError");
var studentIdError = document.getElementById("studentIdError");
var phoneError = document.getElementById("phoneError");
var summaryBox = document.getElementById("userSummary");
var itemGrid = document.getElementById("itemGrid");
var selectionResult = document.getElementById("selectionResult");
var editInfoBtn = document.getElementById("editInfo");
var finishBtn = document.getElementById("finish");
var logList = document.getElementById("logList");
var stepAdmin = document.getElementById("step-admin");
var stepOverdue = document.getElementById("step-overdue");
var stepChangelog = document.getElementById("step-changelog");
var adminStockTable = document.getElementById("adminStockTable");
var adminBorrowedTable = document.getElementById("adminBorrowedTable");
var adminBorrowedPopup = document.getElementById("adminBorrowedPopup");
var changeLogView = document.getElementById("changeLogView");
var overdueTable = document.getElementById("overdueTable");
var logoutAdminBtn = document.getElementById("logoutAdmin");
var viewOverdueBtn = document.getElementById("viewOverdue");
var backToAdminBtn = document.getElementById("backToAdmin");
var backFromChangelogBtn = document.getElementById("backFromChangelog");
var confirmModal = document.getElementById("confirmModal");
var confirmMessage = document.getElementById("confirmMessage");
var confirmIcon = document.getElementById("confirmIcon");
var confirmTitle = document.getElementById("confirmTitle");
var confirmStock = document.getElementById("confirmStock");
var confirmOk = document.getElementById("confirmOk");
var confirmCancel = document.getElementById("confirmCancel");

// 커스텀 확인 대화상자 함수
var showConfirm = function showConfirm(options) {
  return new Promise(function (resolve) {
    // 옵션이 문자열이면 기존 방식 호환
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    var _options = options,
      icon = _options.icon,
      title = _options.title,
      stock = _options.stock,
      message = _options.message,
      autoClose = _options.autoClose;
    if (confirmIcon) confirmIcon.textContent = icon || '📦';
    if (confirmTitle) confirmTitle.textContent = title || '';
    if (confirmStock) {
      if (stock !== undefined) {
        var stockColor = stock <= 2 ? '#ff8f8f' : stock <= 5 ? '#ffd876' : '#a0f0a0';
        confirmStock.innerHTML = "\uB0A8\uC740 \uC7AC\uACE0: <span style=\"color: ".concat(stockColor, "; font-weight: 700; font-size: 1.2rem;\">").concat(stock, "\uAC1C</span>");
      } else {
        confirmStock.textContent = '';
      }
    }
    if (confirmMessage) confirmMessage.textContent = message || '';

    // 버튼 영역 표시/숨기기
    var btnArea = confirmOk ? confirmOk.parentElement : null;
    if (btnArea) btnArea.style.display = autoClose ? 'none' : 'flex';
    if (confirmModal) {
      confirmModal.classList.remove("hidden");
      confirmModal.style.display = "flex";
    }
    var closeModal = function closeModal(result) {
      if (confirmModal) {
        confirmModal.classList.add("hidden");
        confirmModal.style.display = "none";
      }
      if (confirmOk) confirmOk.removeEventListener("click", handleOk);
      if (confirmCancel) confirmCancel.removeEventListener("click", handleCancel);
      resolve(result);
    };
    var handleOk = function handleOk() {
      return closeModal(true);
    };
    var handleCancel = function handleCancel() {
      return closeModal(false);
    };
    if (autoClose) {
      setTimeout(function () {
        return closeModal(true);
      }, autoClose);
    } else {
      if (confirmOk) confirmOk.addEventListener("click", handleOk);
      if (confirmCancel) confirmCancel.addEventListener("click", handleCancel);
    }
  });
};

// ========================================
// IndexedDB 헬퍼 함수
// ========================================
var DB_NAME = 'HasungKioskDB';
var DB_VERSION = 2;
var db = null;

// DB 초기화
var initDB = function initDB() {
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = function () {
      return reject(request.error);
    };
    request.onsuccess = function () {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = function (event) {
      var db = event.target.result;

      // Object Stores (테이블) 생성
      if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', {
          keyPath: 'name'
        });
      }
      if (!db.objectStoreNames.contains('borrowed')) {
        var borrowedStore = db.createObjectStore('borrowed', {
          keyPath: 'id',
          autoIncrement: true
        });
        borrowedStore.createIndex('studentId', 'studentId', {
          unique: false
        });
        borrowedStore.createIndex('itemName', 'itemName', {
          unique: false
        });
      }
      if (!db.objectStoreNames.contains('changeLog')) {
        var changeLogStore = db.createObjectStore('changeLog', {
          keyPath: 'id',
          autoIncrement: true
        });
        changeLogStore.createIndex('time', 'time', {
          unique: false
        });
      }
      if (!db.objectStoreNames.contains('loginLog')) {
        var loginLogStore = db.createObjectStore('loginLog', {
          keyPath: 'id',
          autoIncrement: true
        });
        loginLogStore.createIndex('time', 'time', {
          unique: false
        });
      }
      if (!db.objectStoreNames.contains('cameraRecords')) {
        var cameraStore = db.createObjectStore('cameraRecords', {
          keyPath: 'id',
          autoIncrement: true
        });
        cameraStore.createIndex('studentId', 'studentId', {
          unique: false
        });
        cameraStore.createIndex('timestamp', 'timestamp', {
          unique: false
        });
      }
    };
  });
};

// 데이터 저장 (단일)
var saveToStore = function saveToStore(storeName, data) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.put(data);
    request.onsuccess = function () {
      return resolve(request.result);
    };
    request.onerror = function () {
      return reject(request.error);
    };
  });
};

// 데이터 저장 (여러 개)
var saveAllToStore = function saveAllToStore(storeName, dataArray) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);

    // 기존 데이터 모두 삭제
    var clearRequest = store.clear();
    clearRequest.onsuccess = function () {
      // 새 데이터 추가
      var promises = dataArray.map(function (data) {
        return new Promise(function (res, rej) {
          var request = store.put(data);
          request.onsuccess = function () {
            return res();
          };
          request.onerror = function () {
            return rej(request.error);
          };
        });
      });
      Promise.all(promises).then(function () {
        return resolve();
      })["catch"](reject);
    };
    clearRequest.onerror = function () {
      return reject(clearRequest.error);
    };
  });
};

// 데이터 가져오기 (전체)
var getAllFromStore = function getAllFromStore(storeName) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readonly');
    var store = transaction.objectStore(storeName);
    var request = store.getAll();
    request.onsuccess = function () {
      return resolve(request.result);
    };
    request.onerror = function () {
      return reject(request.error);
    };
  });
};

// 데이터 가져오기 (특정 키)
var getFromStore = function getFromStore(storeName, key) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readonly');
    var store = transaction.objectStore(storeName);
    var request = store.get(key);
    request.onsuccess = function () {
      return resolve(request.result);
    };
    request.onerror = function () {
      return reject(request.error);
    };
  });
};

// 데이터 삭제
var deleteFromStore = function deleteFromStore(storeName, key) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store["delete"](key);
    request.onsuccess = function () {
      return resolve();
    };
    request.onerror = function () {
      return reject(request.error);
    };
  });
};

// 데이터 추가 (append)
var addToStore = function addToStore(storeName, data) {
  return new Promise(function (resolve, reject) {
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.add(data);
    request.onsuccess = function () {
      return resolve(request.result);
    };
    request.onerror = function () {
      return reject(request.error);
    };
  });
};

// ========================================
// localStorage에서 IndexedDB로 마이그레이션
var migrateFromLocalStorage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var savedItems, _items, savedBorrowed, borrowed, savedChangeLog, _changeLog, savedLoginLog, _loginLog, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // items 마이그레이션
          savedItems = localStorage.getItem('kiosk_items');
          if (!savedItems) {
            _context.n = 2;
            break;
          }
          _items = JSON.parse(savedItems);
          _context.n = 1;
          return saveAllToStore('items', _items);
        case 1:
          console.log('Items migrated to IndexedDB');
        case 2:
          // borrowed 마이그레이션
          savedBorrowed = localStorage.getItem('kiosk_borrowed');
          if (!savedBorrowed) {
            _context.n = 4;
            break;
          }
          borrowed = JSON.parse(savedBorrowed);
          _context.n = 3;
          return saveAllToStore('borrowed', borrowed);
        case 3:
          console.log('Borrowed records migrated to IndexedDB');
        case 4:
          // changeLog 마이그레이션
          savedChangeLog = localStorage.getItem('kiosk_change_log');
          if (!savedChangeLog) {
            _context.n = 6;
            break;
          }
          _changeLog = JSON.parse(savedChangeLog);
          _context.n = 5;
          return saveAllToStore('changeLog', _changeLog);
        case 5:
          console.log('Change log migrated to IndexedDB');
        case 6:
          // loginLog 마이그레이션
          savedLoginLog = localStorage.getItem('kiosk_login_log');
          if (!savedLoginLog) {
            _context.n = 8;
            break;
          }
          _loginLog = JSON.parse(savedLoginLog);
          _context.n = 7;
          return saveAllToStore('loginLog', _loginLog);
        case 7:
          console.log('Login log migrated to IndexedDB');
        case 8:
          // 마이그레이션 완료 표시
          localStorage.setItem('migrated_to_indexeddb', 'true');
          console.log('Migration completed successfully');
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          console.error('Migration error:', _t);
        case 10:
          return _context.a(2);
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function migrateFromLocalStorage() {
    return _ref.apply(this, arguments);
  };
}();

// ========================================
// 데이터 백업 및 복원 기능
// ========================================

// 백업 데이터 내보내기 (JSON 파일 다운로드)
var exportBackup = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var backupData, jsonString, blob, url, date, dateStr, timeStr, filename, a, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _t2 = new Date().toISOString();
          _context2.n = 1;
          return getAllFromStore('items');
        case 1:
          _t3 = _context2.v;
          _context2.n = 2;
          return getAllFromStore('borrowed');
        case 2:
          _t4 = _context2.v;
          _context2.n = 3;
          return getAllFromStore('changeLog');
        case 3:
          _t5 = _context2.v;
          _context2.n = 4;
          return getAllFromStore('loginLog');
        case 4:
          _t6 = _context2.v;
          _t7 = {
            items: _t3,
            borrowed: _t4,
            changeLog: _t5,
            loginLog: _t6
          };
          backupData = {
            version: '1.0',
            exportDate: _t2,
            data: _t7
          };
          jsonString = JSON.stringify(backupData, null, 2);
          blob = new Blob([jsonString], {
            type: 'application/json'
          });
          url = URL.createObjectURL(blob);
          date = new Date();
          dateStr = "".concat(date.getFullYear()).concat(String(date.getMonth() + 1).padStart(2, '0')).concat(String(date.getDate()).padStart(2, '0'));
          timeStr = "".concat(String(date.getHours()).padStart(2, '0')).concat(String(date.getMinutes()).padStart(2, '0'));
          filename = "hasung_backup_".concat(dateStr, "_").concat(timeStr, ".json");
          a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          addChangeLog("백업 내보내기", "\uBC31\uC5C5 \uD30C\uC77C \uB2E4\uC6B4\uB85C\uB4DC: ".concat(filename));
          alert("\u2705 \uBC31\uC5C5\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4!\n\uD30C\uC77C\uBA85: ".concat(filename));
          return _context2.a(2, true);
        case 5:
          _context2.p = 5;
          _t8 = _context2.v;
          console.error('Backup export error:', _t8);
          alert('❌ 백업 내보내기에 실패했습니다.');
          return _context2.a(2, false);
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function exportBackup() {
    return _ref2.apply(this, arguments);
  };
}();

// 백업 데이터 가져오기 (JSON 파일 업로드)
var importBackup = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(file) {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          return _context4.a(2, new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
                var backupData, currentData, _items2, _borrowedRecords, newData, _t9, _t0, _t1, _t10, _t11, _t12;
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.p = _context3.n) {
                    case 0:
                      _context3.p = 0;
                      backupData = JSON.parse(e.target.result); // 버전 및 구조 검증
                      if (!(!backupData.data || !backupData.data.items)) {
                        _context3.n = 1;
                        break;
                      }
                      throw new Error('유효하지 않은 백업 파일 형식입니다.');
                    case 1:
                      _context3.n = 2;
                      return getAllFromStore('items');
                    case 2:
                      _t9 = _context3.v;
                      _context3.n = 3;
                      return getAllFromStore('borrowed');
                    case 3:
                      _t0 = _context3.v;
                      _context3.n = 4;
                      return getAllFromStore('changeLog');
                    case 4:
                      _t1 = _context3.v;
                      _context3.n = 5;
                      return getAllFromStore('loginLog');
                    case 5:
                      _t10 = _context3.v;
                      currentData = {
                        items: _t9,
                        borrowed: _t0,
                        changeLog: _t1,
                        loginLog: _t10
                      };
                      _context3.p = 6;
                      if (!(backupData.data.items && backupData.data.items.length > 0)) {
                        _context3.n = 7;
                        break;
                      }
                      _context3.n = 7;
                      return saveAllToStore('items', backupData.data.items);
                    case 7:
                      if (!backupData.data.borrowed) {
                        _context3.n = 8;
                        break;
                      }
                      _context3.n = 8;
                      return saveAllToStore('borrowed', backupData.data.borrowed);
                    case 8:
                      if (!backupData.data.changeLog) {
                        _context3.n = 9;
                        break;
                      }
                      _context3.n = 9;
                      return saveAllToStore('changeLog', backupData.data.changeLog);
                    case 9:
                      if (!backupData.data.loginLog) {
                        _context3.n = 10;
                        break;
                      }
                      _context3.n = 10;
                      return saveAllToStore('loginLog', backupData.data.loginLog);
                    case 10:
                      _context3.n = 11;
                      return loadData();
                    case 11:
                      newData = _context3.v;
                      items.length = 0;
                      (_items2 = items).push.apply(_items2, _toConsumableArray(newData.items));
                      borrowedRecords.length = 0;
                      (_borrowedRecords = borrowedRecords).push.apply(_borrowedRecords, _toConsumableArray(newData.borrowedRecords));
                      _context3.n = 12;
                      return loadChangeLog();
                    case 12:
                      changeLog = _context3.v;
                      _context3.n = 13;
                      return loadLoginLog();
                    case 13:
                      loginLog = _context3.v;
                      addChangeLog("백업 복원", "\uBC31\uC5C5 \uD30C\uC77C\uC5D0\uC11C \uB370\uC774\uD130 \uBCF5\uC6D0 \uC644\uB8CC (".concat(backupData.exportDate, ")"));
                      resolve({
                        success: true,
                        message: "\u2705 \uBC31\uC5C5\uC774 \uBCF5\uC6D0\uB418\uC5C8\uC2B5\uB2C8\uB2E4!\n\n\uBCF5\uC6D0\uB41C \uB370\uC774\uD130:\n- \uBB3C\uD488: ".concat(backupData.data.items && backupData.data.items.length || 0, "\uAC1C\n- \uB300\uC5EC \uAE30\uB85D: ").concat(backupData.data.borrowed && backupData.data.borrowed.length || 0, "\uAC1C\n- \uBCC0\uACBD \uB85C\uADF8: ").concat(backupData.data.changeLog && backupData.data.changeLog.length || 0, "\uAC1C\n- \uB85C\uADF8\uC778 \uAE30\uB85D: ").concat(backupData.data.loginLog && backupData.data.loginLog.length || 0, "\uAC1C")
                      });
                      _context3.n = 19;
                      break;
                    case 14:
                      _context3.p = 14;
                      _t11 = _context3.v;
                      // 복원 실패 시 롤백
                      console.error('Restore failed, rolling back:', _t11);
                      _context3.n = 15;
                      return saveAllToStore('items', currentData.items);
                    case 15:
                      _context3.n = 16;
                      return saveAllToStore('borrowed', currentData.borrowed);
                    case 16:
                      _context3.n = 17;
                      return saveAllToStore('changeLog', currentData.changeLog);
                    case 17:
                      _context3.n = 18;
                      return saveAllToStore('loginLog', currentData.loginLog);
                    case 18:
                      throw new Error('데이터 복원에 실패했습니다. 기존 데이터가 유지됩니다.');
                    case 19:
                      _context3.n = 21;
                      break;
                    case 20:
                      _context3.p = 20;
                      _t12 = _context3.v;
                      reject(_t12);
                    case 21:
                      return _context3.a(2);
                  }
                }, _callee3, null, [[6, 14], [0, 20]]);
              }));
              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }();
            reader.onerror = function () {
              return reject(new Error('파일을 읽을 수 없습니다.'));
            };
            reader.readAsText(file);
          }));
      }
    }, _callee4);
  }));
  return function importBackup(_x) {
    return _ref3.apply(this, arguments);
  };
}();

// 백업 파일 선택 및 가져오기
var selectAndImportBackup = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          return _context6.a(2, new Promise(function (resolve) {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
                var file, result, _t13;
                return _regenerator().w(function (_context5) {
                  while (1) switch (_context5.p = _context5.n) {
                    case 0:
                      file = e.target.files[0];
                      if (file) {
                        _context5.n = 1;
                        break;
                      }
                      resolve({
                        success: false,
                        message: '파일이 선택되지 않았습니다.'
                      });
                      return _context5.a(2);
                    case 1:
                      _context5.p = 1;
                      _context5.n = 2;
                      return importBackup(file);
                    case 2:
                      result = _context5.v;
                      resolve(result);
                      _context5.n = 4;
                      break;
                    case 3:
                      _context5.p = 3;
                      _t13 = _context5.v;
                      resolve({
                        success: false,
                        message: "\u274C ".concat(_t13.message)
                      });
                    case 4:
                      return _context5.a(2);
                  }
                }, _callee5, null, [[1, 3]]);
              }));
              return function (_x3) {
                return _ref6.apply(this, arguments);
              };
            }();
            input.click();
          }));
      }
    }, _callee6);
  }));
  return function selectAndImportBackup() {
    return _ref5.apply(this, arguments);
  };
}();

// 전역 함수로 등록
window.exportBackup = exportBackup;
window.importBackup = importBackup;
window.selectAndImportBackup = selectAndImportBackup;

// ========================================
// 보안: 비밀번호 해싱 함수
// ========================================
var hashPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(password) {
    var encoder, data, hashBuffer, hashArray, hashHex;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          encoder = new TextEncoder();
          data = encoder.encode(password);
          _context7.n = 1;
          return crypto.subtle.digest('SHA-256', data);
        case 1:
          hashBuffer = _context7.v;
          hashArray = Array.from(new Uint8Array(hashBuffer));
          hashHex = hashArray.map(function (b) {
            return b.toString(16).padStart(2, '0');
          }).join('');
          return _context7.a(2, hashHex);
      }
    }, _callee7);
  }));
  return function hashPassword(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

// 관리자 비밀번호 해시 (SHA-256)
// 원본: "041104"
// 보안을 위해 해시값만 저장
var ADMIN_PASSWORD_HASH = "de6d045537291b8c8762940084f51bd3d02055d5cbc250e6d2fc6ddb09d88325";

// 비밀번호 검증 함수
var verifyAdminPassword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(inputPassword) {
    var inputHash;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return hashPassword(inputPassword);
        case 1:
          inputHash = _context8.v;
          return _context8.a(2, inputHash === ADMIN_PASSWORD_HASH);
      }
    }, _callee8);
  }));
  return function verifyAdminPassword(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

// ========================================
// 입력값 검증 함수 (보안 강화)
// ========================================

var studentIdRegex = /^\d{10}$/;
var phoneRegex = /^\d{11}$/;
var nameRegex = /^[가-힣a-zA-Z\s]{2,20}$/; // 한글, 영문, 공백만 허용, 2-20자

// 허용된 학과 식별번호
// 신입생: 402-컴정공, 403-소프트, 404-정융, 405-로봇
// 고학번: 202-컴정공, 203-소프트, 204-정융, 205-로봇
var validDepartmentCodes = ['202', '203', '204', '205', '402', '403', '404', '405'];

// XSS 방지: HTML 특수문자 이스케이프
var escapeHtml = function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

// 학번 검증 강화
var validateStudentId = function validateStudentId(studentId) {
  // 1. 형식 검증 (10자리 숫자)
  if (!studentIdRegex.test(studentId)) {
    return {
      valid: false,
      message: "학번은 숫자 10자리로 입력하세요."
    };
  }

  // 2. 학과 코드 검증 (5~7번째 자리)
  var departmentCode = studentId.substring(4, 7);
  if (!validDepartmentCodes.includes(departmentCode)) {
    return {
      valid: false,
      message: "인공지능융합대학 학생만 이용 가능합니다."
    };
  }

  // 3. 입학년도 검증 (첫 4자리가 2020~2030 사이)
  var year = parseInt(studentId.substring(0, 4));
  var currentYear = new Date().getFullYear();
  if (year < 2020 || year > currentYear + 1) {
    return {
      valid: false,
      message: "유효하지 않은 학번입니다. (입학년도 확인)"
    };
  }
  return {
    valid: true,
    message: ""
  };
};

// 이름 검증
var validateName = function validateName(name) {
  if (!name || name.trim().length === 0) {
    return {
      valid: false,
      message: "이름을 입력해주세요."
    };
  }
  if (!nameRegex.test(name)) {
    return {
      valid: false,
      message: "이름은 한글 또는 영문 2-20자로 입력하세요."
    };
  }
  return {
    valid: true,
    message: ""
  };
};

// 전화번호 검증
var validatePhone = function validatePhone(phone) {
  if (!phoneRegex.test(phone)) {
    return {
      valid: false,
      message: "전화번호는 '-' 없이 11자리 숫자로 입력하세요."
    };
  }
  // 010, 011, 016, 017, 018, 019로 시작하는지 확인
  var prefix = phone.substring(0, 3);
  var validPrefixes = ['010', '011', '016', '017', '018', '019'];
  if (!validPrefixes.includes(prefix)) {
    return {
      valid: false,
      message: "유효하지 않은 전화번호입니다."
    };
  }
  return {
    valid: true,
    message: ""
  };
};
var transactionLog = [];
var currentUser = null;
var currentDueInfo = null;

// 변경 로그 불러오기
var loadChangeLog = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var logs, _t14;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return getAllFromStore('changeLog');
        case 1:
          logs = _context9.v;
          return _context9.a(2, logs || []);
        case 2:
          _context9.p = 2;
          _t14 = _context9.v;
          console.error('Failed to load change log:', _t14);
          return _context9.a(2, []);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function loadChangeLog() {
    return _ref9.apply(this, arguments);
  };
}();

// 변경 로그 저장
var saveChangeLog = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(changeLog) {
    var limitedLog, _t15;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          // 최근 50개만 저장
          limitedLog = changeLog.slice(-50);
          _context0.n = 1;
          return saveAllToStore('changeLog', limitedLog);
        case 1:
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t15 = _context0.v;
          console.error('Failed to save change log:', _t15);
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function saveChangeLog(_x6) {
    return _ref0.apply(this, arguments);
  };
}();
var changeLog = [];

// 변경 로그 추가
var addChangeLog = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(action, details) {
    var logEntry, _t16;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          logEntry = {
            time: new Date().toISOString(),
            action: action,
            details: details
          };
          _context1.n = 1;
          return addToStore('changeLog', logEntry);
        case 1:
          _context1.n = 2;
          return loadChangeLog();
        case 2:
          changeLog = _context1.v;
          if (!(changeLog.length > 50)) {
            _context1.n = 3;
            break;
          }
          _context1.n = 3;
          return saveChangeLog(changeLog);
        case 3:
          _context1.n = 5;
          break;
        case 4:
          _context1.p = 4;
          _t16 = _context1.v;
          console.error('Failed to add change log:', _t16);
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 4]]);
  }));
  return function addChangeLog(_x7, _x8) {
    return _ref1.apply(this, arguments);
  };
}();

// 로그인 기록 관리
var loadLoginLog = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
    var logs, _t17;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return getAllFromStore('loginLog');
        case 1:
          logs = _context10.v;
          return _context10.a(2, logs || []);
        case 2:
          _context10.p = 2;
          _t17 = _context10.v;
          console.error('Failed to load login log:', _t17);
          return _context10.a(2, []);
      }
    }, _callee10, null, [[0, 2]]);
  }));
  return function loadLoginLog() {
    return _ref10.apply(this, arguments);
  };
}();
var saveLoginLog = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(log) {
    var limitedLog, _t18;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          // 최근 100개만 저장
          limitedLog = log.slice(-100);
          _context11.n = 1;
          return saveAllToStore('loginLog', limitedLog);
        case 1:
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t18 = _context11.v;
          console.error('Failed to save login log:', _t18);
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function saveLoginLog(_x9) {
    return _ref11.apply(this, arguments);
  };
}();
var loginLog = [];
var addLoginLog = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(user) {
    var logEntry, _t19;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          logEntry = {
            time: new Date().toISOString(),
            name: user.name,
            studentId: user.studentId,
            phone: user.phone
          };
          _context12.n = 1;
          return addToStore('loginLog', logEntry);
        case 1:
          _context12.n = 2;
          return loadLoginLog();
        case 2:
          loginLog = _context12.v;
          if (!(loginLog.length > 100)) {
            _context12.n = 3;
            break;
          }
          _context12.n = 3;
          return saveLoginLog(loginLog);
        case 3:
          _context12.n = 5;
          break;
        case 4:
          _context12.p = 4;
          _t19 = _context12.v;
          console.error('Failed to add login log:', _t19);
        case 5:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 4]]);
  }));
  return function addLoginLog(_x0) {
    return _ref12.apply(this, arguments);
  };
}();

// IndexedDB에서 데이터 불러오기
var loadData = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
    var savedItems, savedBorrowed, defaultItems, now, overdueDate, overdueExample, _items3, _borrowedRecords2, newItems, updated, iconMap, hasOverdueExample, _t20;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return getAllFromStore('items');
        case 1:
          savedItems = _context13.v;
          _context13.n = 2;
          return getAllFromStore('borrowed');
        case 2:
          savedBorrowed = _context13.v;
          // 기본 물품 데이터
          defaultItems = [{
            name: "우산",
            type: "대여",
            stock: 7,
            notice: "비 오는 날 사용 후 충분히 말려서 반납",
            icon: "🌂"
          }, {
            name: "충전기",
            type: "대여",
            stock: 5,
            notice: "케이블 손상 시 즉시 관리자에게 보고",
            icon: "🔌"
          }, {
            name: "USB 허브",
            type: "대여",
            stock: 3,
            notice: "USB 포트 무리하게 꽂지 않기",
            icon: "🔗"
          }, {
            name: "USB 허브 C타입",
            type: "대여",
            stock: 3,
            notice: "USB 포트 무리하게 꽂지 않기",
            icon: "💻"
          }, {
            name: "농구공",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "🏀"
          }, {
            name: "풋살볼",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "⚽"
          }, {
            name: "피구공",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "🔴"
          }, {
            name: "공",
            type: "대여",
            stock: 4,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "⚽"
          }, {
            name: "담요",
            type: "대여",
            stock: 2,
            notice: "음식물·화장품 묻지 않게 주의",
            icon: "🛏️"
          }, {
            name: "핫팩",
            type: "소모품",
            stock: 20,
            notice: "개봉 후 재활용 불가, 즉시 폐기",
            icon: "🔥"
          }, {
            name: "마스크",
            type: "소모품",
            stock: 50,
            notice: "1인 1개 제한",
            icon: "😷"
          }]; // 테스트용 연체자 예시 데이터 생성 (3일 전 날짜로 설정)
          now = new Date();
          overdueDate = new Date(now);
          overdueDate.setDate(overdueDate.getDate() - 3);
          overdueDate.setHours(18, 0, 0, 0);
          overdueExample = {
            studentId: "2020123456",
            name: "홍길동",
            phone: "01012345678",
            itemName: "우산",
            dueLabel: "".concat(overdueDate.getMonth() + 1, "/").concat(overdueDate.getDate(), "(").concat(["일", "월", "화", "수", "목", "금", "토"][overdueDate.getDay()], ") 18:00"),
            dueDate: overdueDate.toISOString(),
            borrowedAt: new Date(overdueDate.getTime() - 24 * 60 * 60 * 1000).toISOString() // 하루 전에 대여
          };
          if (!(savedItems && savedItems.length > 0)) {
            _context13.n = 5;
            break;
          }
          _items3 = savedItems;
          _borrowedRecords2 = savedBorrowed || []; // 새 물품 목록 (기존 데이터에 없으면 추가)
          newItems = [{
            name: "USB 허브 C타입",
            type: "대여",
            stock: 3,
            notice: "USB 포트 무리하게 꽂지 않기",
            icon: "💻"
          }, {
            name: "농구공",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "🏀"
          }, {
            name: "풋살볼",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "⚽"
          }, {
            name: "피구공",
            type: "대여",
            stock: 2,
            notice: "실내 사용 금지, 흙 묻지 않게 관리",
            icon: "🔴"
          }, {
            name: "마스크",
            type: "소모품",
            stock: 50,
            notice: "1인 1개 제한",
            icon: "😷"
          }];
          updated = false;
          newItems.forEach(function (newItem) {
            if (!_items3.some(function (item) {
              return item.name === newItem.name;
            })) {
              _items3.push(newItem);
              updated = true;
            }
          });

          // 물품 아이콘 추가 (기존 데이터 호환)
          iconMap = {
            "우산": "🌂",
            "충전기": "🔌",
            "USB 허브": "🔗",
            "USB 허브 C타입": "💻",
            "농구공": "🏀",
            "풋살볼": "⚽",
            "피구공": "🔴",
            "공": "⚽",
            "담요": "🛏️",
            "핫팩": "🔥",
            "마스크": "😷"
          };
          _items3.forEach(function (item) {
            if (iconMap[item.name] && item.icon !== iconMap[item.name]) {
              item.icon = iconMap[item.name];
              updated = true;
            }
          });
          if (!updated) {
            _context13.n = 3;
            break;
          }
          _context13.n = 3;
          return saveAllToStore('items', _items3);
        case 3:
          // 연체자 예시가 없으면 추가
          hasOverdueExample = _borrowedRecords2.some(function (record) {
            return record.studentId === overdueExample.studentId && record.itemName === overdueExample.itemName;
          });
          if (hasOverdueExample) {
            _context13.n = 4;
            break;
          }
          _borrowedRecords2.push(overdueExample);
          _context13.n = 4;
          return saveAllToStore('borrowed', _borrowedRecords2);
        case 4:
          return _context13.a(2, {
            items: _items3,
            borrowedRecords: _borrowedRecords2
          });
        case 5:
          _context13.n = 6;
          return saveAllToStore('items', defaultItems);
        case 6:
          _context13.n = 7;
          return saveAllToStore('borrowed', [overdueExample]);
        case 7:
          return _context13.a(2, {
            items: defaultItems,
            borrowedRecords: [overdueExample]
          });
        case 8:
          _context13.p = 8;
          _t20 = _context13.v;
          console.error('Failed to load data:', _t20);
          return _context13.a(2, {
            items: [],
            borrowedRecords: []
          });
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function loadData() {
    return _ref13.apply(this, arguments);
  };
}();
var items = [];
var borrowedRecords = [];

// 데이터 저장 함수
var saveData = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
    var _t21;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _context14.n = 1;
          return saveAllToStore('items', items);
        case 1:
          _context14.n = 2;
          return saveAllToStore('borrowed', borrowedRecords);
        case 2:
          _context14.n = 4;
          break;
        case 3:
          _context14.p = 3;
          _t21 = _context14.v;
          console.error('Failed to save data:', _t21);
        case 4:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 3]]);
  }));
  return function saveData() {
    return _ref14.apply(this, arguments);
  };
}();
var userInfoPopup = document.getElementById("userInfoPopup");
var userInfoCard = document.getElementById("userInfoCard");
var logBoard = document.getElementById("logBoard");
var brandLogo = document.getElementById("brandLogo");
var showStep = function showStep(step) {
  // 모든 섹션을 숨김 처리
  stepUser.classList.add("hidden");
  stepItems.classList.add("hidden");
  stepAdmin.classList.add("hidden"); // 관리자 섹션 숨김 추가
  stepOverdue.classList.add("hidden"); // 연체자 섹션 숨김 추가
  stepChangelog.classList.add("hidden"); // 변경 로그 섹션 숨김 추가
  if (userInfoPopup) userInfoPopup.classList.add("hidden");
  if (logBoard) logBoard.classList.add("hidden");
  if (adminBorrowedPopup) adminBorrowedPopup.classList.add("hidden");
  if (brandLogo) brandLogo.classList.add("hidden");
  var loginLogPopup = document.getElementById("loginLogPopup");
  if (loginLogPopup) loginLogPopup.classList.add("hidden");
  if (step === "items") {
    stepItems.classList.remove("hidden");
    if (logBoard) logBoard.classList.add("hidden");
    if (brandLogo) brandLogo.classList.remove("hidden");
    if (userInfoPopup) {
      userInfoPopup.classList.remove("hidden");
      userInfoPopup.style.top = '20px';
      userInfoPopup.style.left = '20px';
    }
    // 자동 로그아웃 타이머 시작
    if (typeof resetAutoLogout === 'function') {
      resetAutoLogout();
    }
  } else if (step === "admin") {
    // 관리자 모드일 경우
    stepAdmin.classList.remove("hidden");
    if (adminBorrowedPopup) adminBorrowedPopup.classList.remove("hidden");

    // 관리자 모드일 때 현재 대여 기록 공간 확보
    var kiosk = document.querySelector('.kiosk');
    if (kiosk) {
      kiosk.style.marginLeft = '740px';
      kiosk.style.width = 'min(1200px, calc(100vw - 760px))';
    }
    renderAdminData(); // 관리자 모드 진입 시 데이터 렌더링
  } else if (step === "overdue") {
    // 연체자 화면일 경우
    stepOverdue.classList.remove("hidden");
    renderOverdueData(); // 연체자 화면 진입 시 데이터 렌더링
  } else if (step === "changelog") {
    // 변경 로그 화면일 경우
    stepChangelog.classList.remove("hidden");
    var _loginLogPopup = document.getElementById("loginLogPopup");
    if (_loginLogPopup) _loginLogPopup.classList.remove("hidden");

    // 변경 로그 화면에서도 레이아웃 조정
    var _kiosk = document.querySelector('.kiosk');
    if (_kiosk) {
      _kiosk.style.marginLeft = '740px';
      _kiosk.style.width = 'min(1200px, calc(100vw - 760px))';
    }
    renderChangeLogView(); // 변경 로그 화면 진입 시 데이터 렌더링
    renderLoginLog(); // 로그인 기록 렌더링
  } else {
    // 기본값 (user)
    stepUser.classList.remove("hidden");
    // STEP 1에서는 제목과 부제목 숨김 (로고가 브랜드 역할)

    if (brandLogo) brandLogo.classList.remove("hidden");
    // 기본 모드일 때 레이아웃 원복
    var _kiosk2 = document.querySelector('.kiosk');
    if (_kiosk2) {
      _kiosk2.style.marginLeft = '';
      _kiosk2.style.width = '';
    }
  }
};
var renderAdminData = function renderAdminData() {
  // 0. 통계 대시보드 업데이트
  var now = new Date();
  var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 오늘 대여 건수 (borrowedAt이 오늘인 것)
  var todayBorrowCount = borrowedRecords.filter(function (record) {
    if (!record.borrowedAt) return false;
    var borrowedDate = new Date(record.borrowedAt);
    return borrowedDate >= todayStart;
  }).length;

  // 현재 총 대여 중
  var totalBorrowed = borrowedRecords.length;

  // 연체 중인 인원 (중복 제거)
  var overdueStudents = new Set();
  borrowedRecords.forEach(function (record) {
    var dueDate = new Date(record.dueDate);
    if (dueDate < now) {
      overdueStudents.add(record.studentId);
    }
  });
  var overdueCount = overdueStudents.size;

  // 통계 표시
  var statTodayBorrow = document.getElementById('statTodayBorrow');
  var statTotalBorrowed = document.getElementById('statTotalBorrowed');
  var statOverdue = document.getElementById('statOverdue');
  if (statTodayBorrow) statTodayBorrow.textContent = todayBorrowCount;
  if (statTotalBorrowed) statTotalBorrowed.textContent = totalBorrowed;
  if (statOverdue) statOverdue.textContent = overdueCount;

  // 1. 재고 현황 테이블 렌더링
  var stockHtml = "\n                <table id=\"stockTable\" style=\"table-layout: fixed;\">\n                    <colgroup>\n                        <col style=\"width: 8%;\">\n                        <col style=\"width: 20%;\">\n                        <col style=\"width: 12%;\">\n                        <col style=\"width: 25%;\">\n                        <col style=\"width: 20%;\">\n                        <col style=\"width: 15%;\">\n                    </colgroup>\n                    <tr><th>\uC21C\uC11C</th><th>\uBB3C\uD488\uBA85</th><th>\uAD6C\uBD84</th><th>\uC7AC\uACE0</th><th>\uC8FC\uC758\uC0AC\uD56D</th><th>\uAD00\uB9AC</th></tr>\n                    ".concat(items.map(function (item, index) {
    return "\n                        <tr draggable=\"true\" data-index=\"".concat(index, "\" style=\"cursor: move;\">\n                            <td style=\"text-align: center; color: #9ba3bf; font-size: 0.9rem;\">\u22EE\u22EE</td>\n                            <td>").concat(item.name, "</td>\n                            <td>").concat(item.type, "</td>\n                            <td style=\"padding: 14px 20px;\">\n                                <div style=\"display: flex; align-items: center; gap: 12px; justify-content: center;\">\n                                    <button onclick=\"updateStock(").concat(index, ", -1)\" style=\"padding: 8px 12px; border-radius: 8px; border: 1px solid #2c3242; background: #252836; color: #fff; cursor: pointer; font-size: 1.1rem; font-weight: 600;\">-</button>\n                                    <span style=\"font-size: 1.05rem;\">").concat(item.stock, "\uAC1C</span>\n                                    <button onclick=\"updateStock(").concat(index, ", 1)\" style=\"padding: 8px 12px; border-radius: 8px; border: 1px solid #2c3242; background: #252836; color: #fff; cursor: pointer; font-size: 1.1rem; font-weight: 600;\">+</button>\n                                </div>\n                            </td>\n                            <td style=\"font-size: 0.8rem; color: #9ba3bf;\">").concat(item.notice || '-', "</td>\n                            <td>\n                                <button onclick=\"deleteItem(").concat(index, ")\" style=\"padding: 10px 16px; border-radius: 10px; border: none; background: #ff5c5c; color: #fff; cursor: pointer; font-size: 0.95rem; font-weight: 600;\">\uC0AD\uC81C</button>\n                            </td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  adminStockTable.innerHTML = stockHtml;

  // 드래그 앤 드롭 이벤트 설정
  var stockTable = document.getElementById('stockTable');
  if (stockTable) {
    var draggedRow = null;
    var draggedIndex = null;
    stockTable.addEventListener('dragstart', function (e) {
      // 버튼이나 입력 필드에서는 드래그 비활성화
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
        e.preventDefault();
        return;
      }
      var row = e.target.closest('tr[data-index]');
      if (row) {
        draggedRow = row;
        draggedIndex = parseInt(row.dataset.index);
        row.style.opacity = '0.5';
      } else {
        e.preventDefault();
      }
    });
    stockTable.addEventListener('dragend', function (e) {
      if (draggedRow) {
        draggedRow.style.opacity = '1';
      }
      draggedRow = null;
      draggedIndex = null;
    });
    stockTable.addEventListener('dragover', function (e) {
      e.preventDefault();
      var targetRow = e.target.closest('tr');
      if (targetRow && targetRow.dataset.index !== undefined && targetRow !== draggedRow) {
        var allRows = Array.from(stockTable.querySelectorAll('tr[data-index]'));
        allRows.forEach(function (row) {
          return row.style.backgroundColor = '';
        });
        targetRow.style.backgroundColor = 'rgba(97, 125, 255, 0.2)';
      }
    });
    stockTable.addEventListener('dragleave', function (e) {
      var targetRow = e.target.closest('tr');
      if (targetRow) {
        targetRow.style.backgroundColor = '';
      }
    });
    stockTable.addEventListener('drop', function (e) {
      e.preventDefault();
      var targetRow = e.target.closest('tr');
      if (targetRow && targetRow.dataset.index !== undefined && draggedIndex !== null) {
        var targetIndex = parseInt(targetRow.dataset.index);
        if (draggedIndex !== targetIndex) {
          window.moveItemTo(draggedIndex, targetIndex);
        }
      }
      // 모든 행의 배경색 초기화
      var allRows = Array.from(stockTable.querySelectorAll('tr[data-index]'));
      allRows.forEach(function (row) {
        return row.style.backgroundColor = '';
      });
    });
  }

  // 2. 현재 대여 기록 테이블 렌더링
  if (borrowedRecords.length === 0) {
    adminBorrowedTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>현재 대여된 물품이 없습니다.</p>";
    return;
  }
  var borrowedHtml = "\n                <table style=\"table-layout: auto;\">\n                    <tr><th>\uBB3C\uD488</th><th>\uD559\uBC88</th><th>\uC774\uB984</th><th>\uC5F0\uB77D\uCC98</th><th>\uBC18\uB0A9 \uAE30\uD55C</th></tr>\n                    ".concat(borrowedRecords.map(function (record) {
    // 18:00 제거
    var dueLabelWithoutTime = record.dueLabel.replace(' 18:00', '');
    return "\n                        <tr>\n                            <td style=\"white-space: nowrap;\">".concat(record.itemName, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.studentId, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.name, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.phone, "</td>\n                            <td style=\"color: #ff8f8f; white-space: nowrap; font-size: 0.9rem;\">").concat(dueLabelWithoutTime, "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  adminBorrowedTable.innerHTML = borrowedHtml;
};

// 변경 로그 렌더링 함수 (관리자 모드용)
var renderChangeLog = function renderChangeLog() {
  if (changeLog.length === 0) {
    adminChangeLog.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>변경 기록이 없습니다.</p>";
    return;
  }

  // 최근 10개만 표시 (최신 순)
  var recentLogs = changeLog.slice(-10).reverse();
  var formatTime = function formatTime(dateString) {
    var date = new Date(dateString);
    return "".concat(date.getMonth() + 1, "/").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, "0"), ":").concat(String(date.getMinutes()).padStart(2, "0"));
  };
  var logHtml = "\n                <table>\n                    <tr><th>\uC2DC\uAC04</th><th>\uC791\uC5C5</th><th>\uC0C1\uC138 \uB0B4\uC5ED</th></tr>\n                    ".concat(recentLogs.map(function (log) {
    return "\n                        <tr>\n                            <td style=\"font-size: 0.8rem;\">".concat(formatTime(log.time), "</td>\n                            <td style=\"color: #9aa9ff; font-weight: 600;\">").concat(log.action, "</td>\n                            <td style=\"font-size: 0.85rem;\">").concat(log.details, "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  adminChangeLog.innerHTML = logHtml;
};

// 변경 로그 화면 렌더링 함수
var renderChangeLogView = function renderChangeLogView() {
  if (changeLog.length === 0) {
    changeLogView.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>변경 기록이 없습니다.</p>";
    return;
  }

  // 최근 50개 표시 (최신 순)
  var recentLogs = changeLog.slice(-50).reverse();
  var formatTime = function formatTime(dateString) {
    var date = new Date(dateString);
    return "".concat(date.getMonth() + 1, "/").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, "0"), ":").concat(String(date.getMinutes()).padStart(2, "0"));
  };
  var logHtml = "\n                <table>\n                    <tr><th>\uC2DC\uAC04</th><th>\uC791\uC5C5</th><th>\uC0C1\uC138 \uB0B4\uC5ED</th></tr>\n                    ".concat(recentLogs.map(function (log) {
    return "\n                        <tr>\n                            <td style=\"font-size: 0.85rem;\">".concat(formatTime(log.time), "</td>\n                            <td style=\"color: #9aa9ff; font-weight: 600;\">").concat(log.action, "</td>\n                            <td style=\"font-size: 0.9rem;\">").concat(log.details, "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  changeLogView.innerHTML = logHtml;
};

// 로그인 기록 렌더링 함수
var renderLoginLog = function renderLoginLog() {
  var loginLogTable = document.getElementById("loginLogTable");
  if (!loginLogTable) return;
  if (loginLog.length === 0) {
    loginLogTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>로그인 기록이 없습니다.</p>";
    return;
  }

  // 최근 50개 표시 (최신 순)
  var recentLogs = loginLog.slice(-50).reverse();
  var formatTime = function formatTime(dateString) {
    var date = new Date(dateString);
    return "".concat(date.getMonth() + 1, "/").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, "0"), ":").concat(String(date.getMinutes()).padStart(2, "0"));
  };
  var logHtml = "\n                <table style=\"table-layout: auto;\">\n                    <tr><th>\uC2DC\uAC04</th><th>\uC774\uB984</th><th>\uD559\uBC88</th><th>\uC5F0\uB77D\uCC98</th></tr>\n                    ".concat(recentLogs.map(function (log) {
    return "\n                        <tr>\n                            <td style=\"font-size: 0.85rem; white-space: nowrap;\">".concat(formatTime(log.time), "</td>\n                            <td style=\"white-space: nowrap;\">").concat(log.name, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(log.studentId, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(log.phone, "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  loginLogTable.innerHTML = logHtml;
};

// 연체자 데이터 렌더링 함수
var renderOverdueData = function renderOverdueData() {
  var now = new Date();
  var overdueRecords = borrowedRecords.filter(function (record) {
    var dueDate = new Date(record.dueDate);
    return dueDate < now;
  });
  if (overdueRecords.length === 0) {
    overdueTable.innerHTML = "<p style='margin: 0; padding: 10px; color: #b5c0d0;'>연체된 대여 기록이 없습니다.</p>";
    return;
  }

  // 연체 일수 계산
  var calculateOverdueDays = function calculateOverdueDays(dueDate) {
    var due = new Date(dueDate);
    var diffTime = now - due;
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 연체 벌금 계산 (1일당 2000원)
  var calculateFine = function calculateFine(dueDate) {
    var days = calculateOverdueDays(dueDate);
    return days * 2000;
  };
  var overdueHtml = "\n                <table style=\"table-layout: auto; min-width: 100%;\">\n                    <colgroup>\n                        <col style=\"width: 8%;\">\n                        <col style=\"width: 10%;\">\n                        <col style=\"width: 8%;\">\n                        <col style=\"width: 10%;\">\n                        <col style=\"width: 15%;\">\n                        <col style=\"width: 8%;\">\n                        <col style=\"width: 15%;\">\n                        <col style=\"width: 16%;\">\n                    </colgroup>\n                    <tr><th>\uBB3C\uD488</th><th>\uD559\uBC88</th><th>\uC774\uB984</th><th>\uC5F0\uB77D\uCC98</th><th>\uBC18\uB0A9 \uAE30\uD55C</th><th>\uC5F0\uCCB4 \uC77C\uC218</th><th>\uC5F0\uCCB4 \uBC8C\uAE08</th><th>\uAD00\uB9AC</th></tr>\n                    ".concat(overdueRecords.map(function (record) {
    var overdueDays = calculateOverdueDays(record.dueDate);
    var fine = calculateFine(record.dueDate);
    // borrowedRecords에서 해당 기록의 인덱스 찾기
    var recordIndex = borrowedRecords.findIndex(function (r) {
      return r.studentId === record.studentId && r.itemName === record.itemName && r.dueDate === record.dueDate;
    });
    return "\n                        <tr>\n                            <td style=\"white-space: nowrap;\">".concat(record.itemName, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.studentId, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.name, "</td>\n                            <td style=\"white-space: nowrap;\">").concat(record.phone, "</td>\n                            <td style=\"color: #ff8f8f; white-space: nowrap; min-width: 120px;\">").concat(record.dueLabel, "</td>\n                            <td style=\"color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 80px;\">").concat(overdueDays, "\uC77C</td>\n                            <td style=\"color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 100px;\">").concat(fine.toLocaleString(), "\uC6D0</td>\n                            <td style=\"white-space: nowrap;\">\n                                <button onclick=\"forceReturn('").concat(record.studentId, "', '").concat(record.itemName, "', '").concat(record.dueDate, "')\" style=\"padding: 8px 16px; border-radius: 10px; border: none; background: #4e5fe5; color: #fff; cursor: pointer; font-size: 0.9rem; font-weight: 600;\">\uAC15\uC81C \uBC18\uB0A9</button>\n                            </td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  overdueTable.innerHTML = overdueHtml;
};
var showSelectionResult = function showSelectionResult(message) {
  var isSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  selectionResult.textContent = message;
  selectionResult.classList.remove("hidden");
  selectionResult.style.background = isSuccess ? "#1a2e1a" : "#2e1a1a";
  selectionResult.style.borderColor = isSuccess ? "#a0f0a0" : "#ff8f8f";
  selectionResult.style.color = isSuccess ? "#a0f0a0" : "#ff8f8f";

  // 성공 메시지는 자동으로 숨기지 않음
  // 오류 메시지만 3초 후 자동 숨김
  if (!isSuccess) {
    setTimeout(function () {
      selectionResult.classList.add("hidden");
    }, 3000);
  }
};
var setError = function setError(element, message) {
  element.textContent = message;
};

// 물품 검색 및 필터 기능
var searchQuery = '';
var currentFilter = 'all'; // 'all', 'borrow', 'consume'
var itemSearch = document.getElementById('itemSearch');
var clearSearchBtn = document.getElementById('clearSearch');
var filterAllBtn = document.getElementById('filterAll');
var filterBorrowBtn = document.getElementById('filterBorrow');
var filterConsumeBtn = document.getElementById('filterConsume');
if (itemSearch) {
  itemSearch.addEventListener('input', function (e) {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery) {
      clearSearchBtn.style.display = 'block';
    } else {
      clearSearchBtn.style.display = 'none';
    }
    renderItems();
  });
}
if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', function () {
    itemSearch.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderItems();
  });
}

// 필터 버튼 이벤트
var setFilter = function setFilter(filter) {
  currentFilter = filter;

  // 모든 필터 버튼 비활성화 스타일
  [filterAllBtn, filterBorrowBtn, filterConsumeBtn].forEach(function (btn) {
    if (btn) {
      btn.style.background = '#252836';
      btn.style.borderColor = '#2c3242';
      btn.style.color = '#f6f7fb';
      btn.classList.remove('active');
    }
  });

  // 선택된 필터 버튼 활성화 스타일
  var activeBtn = filter === 'all' ? filterAllBtn : filter === 'borrow' ? filterBorrowBtn : filterConsumeBtn;
  if (activeBtn) {
    activeBtn.style.background = '#617dff';
    activeBtn.style.borderColor = '#617dff';
    activeBtn.style.color = '#fff';
    activeBtn.classList.add('active');
  }
  renderItems();
};
if (filterAllBtn) {
  filterAllBtn.addEventListener('click', function () {
    return setFilter('all');
  });
}
if (filterBorrowBtn) {
  filterBorrowBtn.addEventListener('click', function () {
    return setFilter('borrow');
  });
}
if (filterConsumeBtn) {
  filterConsumeBtn.addEventListener('click', function () {
    return setFilter('consume');
  });
}
var renderItems = function renderItems() {
  // 필터링
  var filteredItems = items;

  // 타입 필터링
  if (currentFilter === 'borrow') {
    filteredItems = filteredItems.filter(function (item) {
      return item.type === '대여';
    });
  } else if (currentFilter === 'consume') {
    filteredItems = filteredItems.filter(function (item) {
      return item.type === '소모품';
    });
  }

  // 검색 필터링
  if (searchQuery) {
    filteredItems = filteredItems.filter(function (item) {
      return item.name.toLowerCase().includes(searchQuery) || item.type.toLowerCase().includes(searchQuery) || item.notice && item.notice.toLowerCase().includes(searchQuery);
    });
  }
  if (filteredItems.length === 0) {
    var message = searchQuery ? "\"".concat(searchQuery, "\"\uC5D0 \uB300\uD55C \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.") : currentFilter === 'borrow' ? '대여 가능한 물품이 없습니다.' : currentFilter === 'consume' ? '소모품이 없습니다.' : '물품이 없습니다.';
    itemGrid.innerHTML = "<div style=\"text-align: center; padding: 40px; color: #9ba3bf; font-size: 1.1rem;\">".concat(message, "</div>");
    return;
  }
  itemGrid.innerHTML = filteredItems.map(function (item, index) {
    // 원본 배열에서의 인덱스 찾기
    var originalIndex = items.indexOf(item);
    return "\n                    <div class=\"item-card\">\n                        ".concat(item.icon ? "<span style=\"font-size: 2.5rem; flex-shrink: 0;\">".concat(item.icon, "</span>") : item.image ? "<img src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\" style=\"width: 50px; height: 50px; object-fit: contain; flex-shrink: 0;\">") : '', "\n                        <div class=\"item-card-info\">\n                            <strong>").concat(item.name, "</strong>\n                            <small>").concat(item.type, " \xB7 \uC7AC\uACE0 ").concat(item.stock, "\uAC1C</small>\n                        </div>\n                        <div class=\"item-card-actions\">\n                            ").concat(item.type === "대여" ? "\n                                <button class=\"borrow ".concat(item.stock <= 0 ? 'disabled' : '', "\" data-action=\"borrow\" data-index=\"").concat(originalIndex, "\" ").concat(item.stock <= 0 ? 'disabled title="재고가 없습니다"' : '', ">\n                                    ").concat(item.stock <= 0 ? '재고 없음' : '대여하기', "\n                                </button>\n                                <button class=\"secondary\" data-action=\"return\" data-index=\"").concat(originalIndex, "\">\n                                    \uBC18\uB0A9\uD558\uAE30\n                                </button>\n                            ") : "\n                                <button class=\"consume ".concat(item.stock <= 0 ? 'disabled' : '', "\" data-action=\"consume\" data-index=\"").concat(originalIndex, "\" ").concat(item.stock <= 0 ? 'disabled title="재고가 없습니다"' : '', ">\n                                    ").concat(item.stock <= 0 ? '재고 없음' : '수령하기', "\n                                </button>\n                            "), "\n                        </div>\n                    </div>\n                ");
  }).join("");
};
renderItems();

// 물품 목록 드래그 스크롤 기능
var isDragging = false;
var startY = 0;
var scrollTop = 0;
itemGrid.addEventListener('mousedown', function (e) {
  // 버튼 클릭이 아닌 경우에만 드래그 시작
  if (e.target.tagName !== 'BUTTON') {
    isDragging = true;
    startY = e.pageY - itemGrid.offsetTop;
    scrollTop = itemGrid.scrollTop;
    itemGrid.style.cursor = 'grabbing';
  }
});
itemGrid.addEventListener('mouseleave', function () {
  isDragging = false;
  itemGrid.style.cursor = 'grab';
});
itemGrid.addEventListener('mouseup', function () {
  isDragging = false;
  itemGrid.style.cursor = 'grab';
});
itemGrid.addEventListener('mousemove', function (e) {
  if (!isDragging) return;
  e.preventDefault();
  var y = e.pageY - itemGrid.offsetTop;
  var walk = (y - startY) * 2; // 스크롤 속도 조절
  itemGrid.scrollTop = scrollTop - walk;
});

// 터치 이벤트 지원
var touchStartY = 0;
var touchScrollTop = 0;
itemGrid.addEventListener('touchstart', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    touchStartY = e.touches[0].pageY;
    touchScrollTop = itemGrid.scrollTop;
  }
}, {
  passive: true
});
itemGrid.addEventListener('touchmove', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    var touchY = e.touches[0].pageY;
    var walk = (touchY - touchStartY) * 2;
    itemGrid.scrollTop = touchScrollTop - walk;
  }
}, {
  passive: true
});

// STEP3 관리자 모드 물품 재고 현황 드래그 스크롤 기능
var adminIsDragging = false;
var adminStartY = 0;
var adminScrollTop = 0;
adminStockTable.addEventListener('mousedown', function (e) {
  // 버튼 클릭이 아닌 경우에만 드래그 시작
  if (e.target.tagName !== 'BUTTON') {
    adminIsDragging = true;
    adminStartY = e.pageY - adminStockTable.offsetTop;
    adminScrollTop = adminStockTable.scrollTop;
    adminStockTable.style.cursor = 'grabbing';
  }
});
adminStockTable.addEventListener('mouseleave', function () {
  adminIsDragging = false;
  adminStockTable.style.cursor = 'grab';
});
adminStockTable.addEventListener('mouseup', function () {
  adminIsDragging = false;
  adminStockTable.style.cursor = 'grab';
});
adminStockTable.addEventListener('mousemove', function (e) {
  if (!adminIsDragging) return;
  e.preventDefault();
  var y = e.pageY - adminStockTable.offsetTop;
  var walk = (y - adminStartY) * 2; // 스크롤 속도 조절
  adminStockTable.scrollTop = adminScrollTop - walk;
});

// 터치 이벤트 지원
var adminTouchStartY = 0;
var adminTouchScrollTop = 0;
adminStockTable.addEventListener('touchstart', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    adminTouchStartY = e.touches[0].pageY;
    adminTouchScrollTop = adminStockTable.scrollTop;
  }
}, {
  passive: true
});
adminStockTable.addEventListener('touchmove', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    var touchY = e.touches[0].pageY;
    var walk = (touchY - adminTouchStartY) * 2;
    adminStockTable.scrollTop = adminTouchScrollTop - walk;
  }
}, {
  passive: true
});

// 초기 로드 시 STEP1로 설정하며 CCTV 모달 표시
var initApp = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
    var migrated, data, _t22;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return initDB();
        case 1:
          console.log('IndexedDB initialized');

          // localStorage에서 마이그레이션 (처음 한 번만)
          migrated = localStorage.getItem('migrated_to_indexeddb');
          if (migrated) {
            _context15.n = 2;
            break;
          }
          _context15.n = 2;
          return migrateFromLocalStorage();
        case 2:
          _context15.n = 3;
          return loadData();
        case 3:
          data = _context15.v;
          items = data.items;
          borrowedRecords = data.borrowedRecords;

          // 로그 데이터 로드
          _context15.n = 4;
          return loadChangeLog();
        case 4:
          changeLog = _context15.v;
          _context15.n = 5;
          return loadLoginLog();
        case 5:
          loginLog = _context15.v;
          console.log('Data loaded from IndexedDB');

          // 데이터 로드 후 물품 목록 렌더링
          renderItems();
          _context15.n = 7;
          break;
        case 6:
          _context15.p = 6;
          _t22 = _context15.v;
          console.error('Initialization error:', _t22);
        case 7:
          showStep("user");
        case 8:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 6]]);
  }));
  return function initApp() {
    return _ref15.apply(this, arguments);
  };
}();
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
var weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
var getDueInfo = function getDueInfo() {
  var now = new Date();
  var day = now.getDay();
  var due = new Date(now);
  if (day === 5) {
    // Friday → next Monday
    due.setDate(due.getDate() + 3);
  } else if (day === 6) {
    // Saturday → next Monday
    due.setDate(due.getDate() + 2);
  } else {
    due.setDate(due.getDate() + 1);
  }
  due.setHours(18, 0, 0, 0);
  return {
    date: due,
    label: "".concat(due.getMonth() + 1, "/").concat(due.getDate(), "(").concat(weekdayNames[due.getDay()], ") 18:00"),
    isWeekendPenalty: day <= 4 // Monday~Thursday
  };
};
var formatTime = function formatTime(date) {
  return "".concat(date.getMonth() + 1, "/").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, "0"), ":").concat(String(date.getMinutes()).padStart(2, "0"));
};
var addLog = function addLog(entry) {
  transactionLog.unshift(entry);
  if (transactionLog.length > 6) {
    transactionLog.pop();
  }
  renderLogs();
};
var renderLogs = function renderLogs() {
  if (transactionLog.length === 0) {
    logList.innerHTML = "<li>아직 기록이 없습니다.</li>";
    return;
  }
  logList.innerHTML = transactionLog.map(function (log) {
    return "\n                <li>\n                    <strong>".concat(log.user.name, "</strong> \xB7 ").concat(log.item, " (").concat(log.action, ")<br>\n                    ").concat(log.message, "<br>\n                    ").concat(log.time, "\n                </li>\n            ");
  }).join("");
};
form.addEventListener("submit", function (event) {
  event.preventDefault();
  selectionResult.classList.add("hidden");
  selectionResult.textContent = "";

  // 입력값 가져오기 및 XSS 방지
  var rawName = form.name.value.trim();
  var rawStudentId = form.studentId.value.trim();
  var rawPhone = form.phone.value.trim();

  // HTML 이스케이프 처리
  var name = escapeHtml(rawName);
  var studentId = escapeHtml(rawStudentId);
  var phone = escapeHtml(rawPhone);
  var isValid = true;

  // 이름 검증
  var nameValidation = validateName(name);
  if (!nameValidation.valid) {
    setError(nameError, nameValidation.message);
    isValid = false;
  } else {
    setError(nameError, "");
  }

  // 학번 검증
  var studentIdValidation = validateStudentId(studentId);
  if (!studentIdValidation.valid) {
    setError(studentIdError, studentIdValidation.message);
    isValid = false;
  } else {
    setError(studentIdError, "");
  }

  // 전화번호 검증
  var phoneValidation = validatePhone(phone);
  if (!phoneValidation.valid) {
    setError(phoneError, phoneValidation.message);
    isValid = false;
  } else {
    setError(phoneError, "");
  }
  if (!isValid) {
    return;
  }
  currentUser = {
    name: name,
    studentId: studentId,
    phone: phone
  };
  currentDueInfo = getDueInfo();

  // 로그인 기록 저장
  addLoginLog(currentUser);
  var userInfoHtml = "\n                <strong>".concat(name, " (").concat(studentId, ")</strong><br>\n                \uC5F0\uB77D\uCC98: ").concat(phone, "<br>\n                \uBC18\uB0A9 \uAE30\uD55C: <span style=\"color: #ff8f8f; font-weight: 600;\">").concat(currentDueInfo.label, "</span><br>\n                <ul>\n                    <li>\uAE30\uD55C \uCD08\uACFC \uC2DC 1\uC77C\uB2F9 2,000\uC6D0 \uBC8C\uAE08 (\uC8FC\uB9D0 \uD3EC\uD568)</li>\n                    <li>").concat(currentDueInfo.isWeekendPenalty ? "같은 주 내 미반납 시 주말에도 벌금이 부과됩니다." : "금요일 대여는 다음 주 월요일 18:00까지 반납", "</li>\n                    <li>\uBB3C\uD488 \uBD84\uC2E4\xB7\uD30C\uC190 \uC2DC \uB3D9\uC77C \uC81C\uD488\uC73C\uB85C \uBCC0\uC0C1</li>\n                </ul>\n            ");
  if (userInfoCard) {
    userInfoCard.innerHTML = userInfoHtml;
  }
  if (summaryBox) {
    summaryBox.innerHTML = userInfoHtml;
  }
  showStep("items");
});

// Debounce 기능
var isProcessing = false;
var debounceTime = 400; // 400ms

itemGrid.addEventListener("click", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(event) {
    var _event$target$dataset, action, index, item, alreadyBorrowed, noticeMsg, dueInfo, dueLabel, borrowedIndex;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          if (!(event.target.tagName !== "BUTTON")) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2);
        case 1:
          if (!isProcessing) {
            _context16.n = 2;
            break;
          }
          return _context16.a(2);
        case 2:
          isProcessing = true;
          setTimeout(function () {
            isProcessing = false;
          }, debounceTime);
          _event$target$dataset = event.target.dataset, action = _event$target$dataset.action, index = _event$target$dataset.index;
          item = items[Number(index)];
          if (currentUser) {
            _context16.n = 3;
            break;
          }
          alert("먼저 학생 정보를 입력해주세요.");
          return _context16.a(2);
        case 3:
          if (!((action === "borrow" || action === "consume") && item.stock <= 0)) {
            _context16.n = 4;
            break;
          }
          return _context16.a(2);
        case 4:
          if (!(action === "borrow")) {
            _context16.n = 8;
            break;
          }
          if (!(item.stock <= 0)) {
            _context16.n = 5;
            break;
          }
          showSelectionResult("\u26A0\uFE0F ".concat(item.name, " \uC7AC\uACE0\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4. \uB2E4\uB978 \uBB3C\uD488\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694."), false);
          return _context16.a(2);
        case 5:
          // 중복 대여 방지: 이미 빌린 물품인지 확인
          alreadyBorrowed = borrowedRecords.some(function (record) {
            return record.studentId === currentUser.studentId && record.itemName === item.name;
          });
          if (!alreadyBorrowed) {
            _context16.n = 6;
            break;
          }
          showSelectionResult("\u26A0\uFE0F \uC774\uBBF8 ".concat(item.name, "\uC744(\uB97C) \uB300\uC5EC \uC911\uC785\uB2C8\uB2E4.\n\uBA3C\uC800 \uBC18\uB0A9 \uD6C4 \uB2E4\uC2DC \uB300\uC5EC\uD574\uC8FC\uC138\uC694."), false);
          return _context16.a(2);
        case 6:
          // 주의사항 메시지 구성
          noticeMsg = '';
          if (item.notice && item.notice.trim()) {
            noticeMsg = "\u26A0\uFE0F \uC8FC\uC758\uC0AC\uD56D: ".concat(item.notice);
          }
          _context16.n = 7;
          return showConfirm({
            icon: item.icon || '📦',
            title: "".concat(item.name, " \uB300\uC5EC"),
            stock: item.stock,
            message: noticeMsg || '대여 후 기한 내 반납해주세요.',
            autoClose: 3000
          });
        case 7:
          dueInfo = currentDueInfo || getDueInfo();
          borrowedRecords.push({
            studentId: currentUser.studentId,
            name: currentUser.name,
            phone: currentUser.phone,
            itemName: item.name,
            dueLabel: dueInfo.label,
            dueDate: dueInfo.date.toISOString(),
            borrowedAt: new Date().toISOString()
          });
          item.stock -= 1;
          dueLabel = (currentDueInfo || getDueInfo()).label;
          saveData(); // 데이터 저장
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uB300\uC5EC \uC644\uB8CC!\n\uBC18\uB0A9 \uC608\uC815\uC77C\uC740 ").concat(dueLabel, "\uC785\uB2C8\uB2E4.\n\n\uAE30\uD55C \uCD08\uACFC \uC2DC 1\uC77C\uB2F9 2,000\uC6D0 \uBC8C\uAE08(\uC8FC\uB9D0 \uD3EC\uD568)\uC774 \uBD80\uACFC\uB429\uB2C8\uB2E4."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "대여",
            message: "\uBC18\uB0A9 \uC608\uC815\uC77C ".concat(dueLabel),
            time: formatTime(new Date())
          });
          return _context16.a(2);
        case 8:
          if (!(action === "return")) {
            _context16.n = 10;
            break;
          }
          borrowedIndex = borrowedRecords.findIndex(function (record) {
            return record.studentId === currentUser.studentId && record.itemName === item.name;
          });
          if (!(borrowedIndex === -1)) {
            _context16.n = 9;
            break;
          }
          showSelectionResult("\u26A0\uFE0F ".concat(item.name, " \uB300\uC5EC \uC774\uB825\uC774 \uD655\uC778\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBB38\uC758\uD574\uC8FC\uC138\uC694."), false);
          return _context16.a(2);
        case 9:
          borrowedRecords.splice(borrowedIndex, 1);
          item.stock += 1;
          saveData(); // 데이터 저장
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uBC18\uB0A9 \uCC98\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC0C1\uD0DC \uC774\uC0C1 \uC2DC \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBCF4\uACE0\uD574\uC8FC\uC138\uC694."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "반납",
            message: "정상 반납",
            time: formatTime(new Date())
          });
          return _context16.a(2);
        case 10:
          if (!(action === "consume")) {
            _context16.n = 12;
            break;
          }
          if (!(item.stock <= 0)) {
            _context16.n = 11;
            break;
          }
          showSelectionResult("\u26A0\uFE0F ".concat(item.name, " \uC7AC\uACE0\uAC00 \uBAA8\uB450 \uC18C\uC9C4\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), false);
          return _context16.a(2);
        case 11:
          item.stock -= 1;
          saveData(); // 데이터 저장
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uC218\uB839 \uC644\uB8CC! \uC18C\uBAA8\uD488\uC740 \uBC18\uB0A9\uD558\uC9C0 \uC54A\uC544\uB3C4 \uB429\uB2C8\uB2E4."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "소모품 수령",
            message: "소모품은 반납 불필요",
            time: formatTime(new Date())
          });
        case 12:
          return _context16.a(2);
      }
    }, _callee16);
  }));
  return function (_x1) {
    return _ref16.apply(this, arguments);
  };
}());
editInfoBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
  var userBorrowed, warningMsg, confirmed;
  return _regenerator().w(function (_context17) {
    while (1) switch (_context17.n) {
      case 0:
        // 현재 사용자의 대여 기록 확인
        userBorrowed = borrowedRecords.filter(function (r) {
          return r.studentId === (currentUser && currentUser.studentId);
        });
        if (!(userBorrowed.length > 0)) {
          _context17.n = 2;
          break;
        }
        // 대여 기록이 있으면 경고
        warningMsg = "\u26A0\uFE0F \uB300\uC5EC \uC911\uC778 \uBB3C\uD488\uC774 \uC788\uC2B5\uB2C8\uB2E4!\n\n";
        userBorrowed.forEach(function (record) {
          warningMsg += "\u2022 ".concat(record.itemName, " (\uBC18\uB0A9: ").concat(record.dueLabel.replace(' 18:00', ''), ")\n");
        });
        warningMsg += "\n\uB300\uC5EC \uAE30\uB85D\uC740 \uC720\uC9C0\uB429\uB2C8\uB2E4.\n\uCCAB \uD654\uBA74\uC73C\uB85C \uB3CC\uC544\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?";
        _context17.n = 1;
        return showConfirm({
          icon: '⚠️',
          title: '대여 중인 물품 있음',
          message: warningMsg
        });
      case 1:
        confirmed = _context17.v;
        if (confirmed) {
          _context17.n = 2;
          break;
        }
        return _context17.a(2);
      case 2:
        form.reset();
        studentIdError.textContent = "";
        phoneError.textContent = "";
        currentUser = null;
        currentDueInfo = null;
        showStep("user");
      case 3:
        return _context17.a(2);
    }
  }, _callee17);
})));
finishBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
  var userBorrowed, summaryMsg, confirmed;
  return _regenerator().w(function (_context18) {
    while (1) switch (_context18.n) {
      case 0:
        // 현재 사용자의 대여 기록 확인
        userBorrowed = borrowedRecords.filter(function (r) {
          return r.studentId === (currentUser && currentUser.studentId);
        }); // 요약 확인 메시지 생성
        summaryMsg = '';
        if (userBorrowed.length > 0) {
          summaryMsg = "\uD83D\uDCCB \uB300\uC5EC \uB0B4\uC5ED \uD655\uC778\n\n";
          summaryMsg += "\uD83D\uDC64 ".concat(currentUser.name, " (").concat(currentUser.studentId, ")\n\n");
          summaryMsg += "\uD83D\uDCE6 \uB300\uC5EC \uC911\uC778 \uBB3C\uD488:\n";
          userBorrowed.forEach(function (record) {
            summaryMsg += "\u2022 ".concat(record.itemName, " (\uBC18\uB0A9: ").concat(record.dueLabel.replace(' 18:00', ''), ")\n");
          });
          summaryMsg += "\n\uAE30\uD55C \uB0B4 \uBC18\uB0A9 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4!";
        } else {
          summaryMsg = "\uD83D\uDC64 ".concat(currentUser && currentUser.name || '사용자', "\uB2D8\n\n\uB300\uC5EC\uD558\uC2E0 \uBB3C\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.\n\n\uCCAB \uD654\uBA74\uC73C\uB85C \uB3CC\uC544\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?");
        }
        _context18.n = 1;
        return showConfirm({
          icon: '✅',
          title: '완료 확인',
          message: summaryMsg
        });
      case 1:
        confirmed = _context18.v;
        if (confirmed) {
          _context18.n = 2;
          break;
        }
        return _context18.a(2);
      case 2:
        form.reset();
        studentIdError.textContent = "";
        phoneError.textContent = "";
        selectionResult.classList.add("hidden");
        selectionResult.textContent = "";
        currentUser = null;
        currentDueInfo = null;
        showStep("user");
      case 3:
        return _context18.a(2);
    }
  }, _callee18);
})));

// 자동 로그아웃 기능 (60초 동안 활동 없으면 첫 화면으로)
var autoLogoutTimer = null;
var AUTO_LOGOUT_TIME = 60000; // 60초

var resetAutoLogout = function resetAutoLogout() {
  if (autoLogoutTimer) {
    clearTimeout(autoLogoutTimer);
  }
  // 물품 선택 화면(items)에서만 자동 로그아웃 작동
  if (currentUser && !stepItems.classList.contains('hidden')) {
    autoLogoutTimer = setTimeout(function () {
      form.reset();
      studentIdError.textContent = "";
      phoneError.textContent = "";
      selectionResult.classList.add("hidden");
      selectionResult.textContent = "";
      currentUser = null;
      currentDueInfo = null;
      showStep("user");
    }, AUTO_LOGOUT_TIME);
  }
};

// 사용자 활동 감지
['click', 'touchstart', 'mousemove', 'keydown'].forEach(function (event) {
  document.addEventListener(event, resetAutoLogout, {
    passive: true
  });
});

// 로고 더블클릭으로 관리자 모드 진입
if (brandLogo) {
  brandLogo.addEventListener("dblclick", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
    var password, isValid;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.n) {
        case 0:
          password = prompt("관리자 비밀번호를 입력하세요:");
          if (!(password === null)) {
            _context19.n = 1;
            break;
          }
          return _context19.a(2);
        case 1:
          _context19.n = 2;
          return verifyAdminPassword(password);
        case 2:
          isValid = _context19.v;
          if (isValid) {
            showStep("admin");
          } else {
            alert("비밀번호가 틀렸습니다.");
          }
        case 3:
          return _context19.a(2);
      }
    }, _callee19);
  })));
}

// 변경 로그 화면에서 돌아가기 버튼
backFromChangelogBtn.addEventListener("click", function () {
  showStep("admin");
});

// 관리자 모드 제목 더블클릭 시 변경 로그 화면으로 이동
var adminTitle = document.getElementById("adminTitle");
adminTitle.addEventListener("dblclick", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
  var password, isValid;
  return _regenerator().w(function (_context20) {
    while (1) switch (_context20.n) {
      case 0:
        password = prompt("관리자 비밀번호를 입력하세요:");
        if (!(password === null)) {
          _context20.n = 1;
          break;
        }
        return _context20.a(2);
      case 1:
        _context20.n = 2;
        return verifyAdminPassword(password);
      case 2:
        isValid = _context20.v;
        if (isValid) {
          showStep("changelog");
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      case 3:
        return _context20.a(2);
    }
  }, _callee20);
})));

// 2. 관리자 모드에서 로그아웃 버튼 이벤트 리스너 추가
logoutAdminBtn.addEventListener("click", function () {
  showStep("user");
});

// 연체자 화면으로 이동
viewOverdueBtn.addEventListener("click", function () {
  showStep("overdue");
});

// 관리자 모드로 돌아가기
backToAdminBtn.addEventListener("click", function () {
  showStep("admin");
});

// 물품 추가 기능
var addItemBtn = document.getElementById("addItemBtn");
var newItemName = document.getElementById("newItemName");
var newItemType = document.getElementById("newItemType");
var newItemStock = document.getElementById("newItemStock");
var newItemNotice = document.getElementById("newItemNotice");
var exportBackupBtn = document.getElementById("exportBackupBtn");
var importBackupBtn = document.getElementById("importBackupBtn");

// 백업 내보내기 버튼
if (exportBackupBtn) {
  exportBackupBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
    var password, isValid;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.n) {
        case 0:
          password = prompt("⚠️ 백업을 내보내려면 관리자 비밀번호를 입력하세요:");
          if (!(password === null)) {
            _context21.n = 1;
            break;
          }
          return _context21.a(2);
        case 1:
          _context21.n = 2;
          return verifyAdminPassword(password);
        case 2:
          isValid = _context21.v;
          if (isValid) {
            _context21.n = 3;
            break;
          }
          alert("비밀번호가 틀렸습니다.");
          return _context21.a(2);
        case 3:
          _context21.n = 4;
          return exportBackup();
        case 4:
          return _context21.a(2);
      }
    }, _callee21);
  })));
}

// 백업 불러오기 버튼
if (importBackupBtn) {
  importBackupBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
    var password, isValid, result;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.n) {
        case 0:
          password = prompt("⚠️ 백업을 불러오면 현재 데이터가 덮어씌워집니다.\n관리자 비밀번호를 입력하세요:");
          if (!(password === null)) {
            _context22.n = 1;
            break;
          }
          return _context22.a(2);
        case 1:
          _context22.n = 2;
          return verifyAdminPassword(password);
        case 2:
          isValid = _context22.v;
          if (isValid) {
            _context22.n = 3;
            break;
          }
          alert("비밀번호가 틀렸습니다.");
          return _context22.a(2);
        case 3:
          if (confirm("⚠️ 정말 백업 파일에서 데이터를 복원하시겠습니까?\n현재 데이터가 모두 덮어씌워집니다.")) {
            _context22.n = 4;
            break;
          }
          return _context22.a(2);
        case 4:
          _context22.n = 5;
          return selectAndImportBackup();
        case 5:
          result = _context22.v;
          alert(result.message);
          if (result.success) {
            // UI 업데이트
            renderAdminData();
            renderItems();
          }
        case 6:
          return _context22.a(2);
      }
    }, _callee22);
  })));
}
addItemBtn.addEventListener("click", function () {
  var name = newItemName.value.trim();
  var type = newItemType.value;
  var stock = parseInt(newItemStock.value) || 0;
  var notice = newItemNotice.value.trim();
  if (!name) {
    alert("물품명을 입력해주세요.");
    return;
  }
  if (items.some(function (item) {
    return item.name === name;
  })) {
    alert("이미 존재하는 물품명입니다.");
    return;
  }
  items.push({
    name: name,
    type: type,
    stock: stock,
    notice: notice || ""
  });
  saveData(); // 데이터 저장
  addChangeLog("물품 추가", "".concat(name, " (").concat(type, ", \uC7AC\uACE0: ").concat(stock, "\uAC1C) \uCD94\uAC00\uB428"));

  // 입력 필드 초기화
  newItemName.value = "";
  newItemStock.value = "";
  newItemNotice.value = "";

  // 관리자 화면과 사용자 화면 모두 업데이트
  renderAdminData();
  renderItems();
  alert("".concat(name, " \uBB3C\uD488\uC774 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
});

// 재고 수정 함수 (전역 함수로 만들기 위해 window 객체에 할당)
window.updateStock = function (index, change) {
  if (index < 0 || index >= items.length) return;
  var item = items[index];
  var oldStock = item.stock;
  items[index].stock = Math.max(0, items[index].stock + change);
  var newStock = items[index].stock;
  saveData(); // 데이터 저장
  addChangeLog("재고 변경", "".concat(item.name, ": ").concat(oldStock, "\uAC1C \u2192 ").concat(newStock, "\uAC1C ").concat(change > 0 ? "(+1)" : "(-1)"));
  renderAdminData();
  renderItems();
};

// 강제 반납 함수 (전역 함수로 만들기 위해 window 객체에 할당)
window.forceReturn = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(studentId, itemName, dueDate) {
    var recordIndex, record, password, isValid, item;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.n) {
        case 0:
          // borrowedRecords에서 해당 기록 찾기
          recordIndex = borrowedRecords.findIndex(function (r) {
            return r.studentId === studentId && r.itemName === itemName && r.dueDate === dueDate;
          });
          if (!(recordIndex === -1)) {
            _context23.n = 1;
            break;
          }
          alert("대여 기록을 찾을 수 없습니다.");
          return _context23.a(2);
        case 1:
          record = borrowedRecords[recordIndex]; // 중요 작업: 비밀번호 재확인
          password = prompt("⚠️ 중요한 작업입니다.\n관리자 비밀번호를 다시 입력하세요:");
          if (!(password === null)) {
            _context23.n = 2;
            break;
          }
          return _context23.a(2);
        case 2:
          _context23.n = 3;
          return verifyAdminPassword(password);
        case 3:
          isValid = _context23.v;
          if (isValid) {
            _context23.n = 4;
            break;
          }
          alert("비밀번호가 틀렸습니다.");
          return _context23.a(2);
        case 4:
          if (confirm("\"".concat(record.name, "\"\uB2D8\uC758 \"").concat(record.itemName, "\" \uAC15\uC81C \uBC18\uB0A9\uC744 \uCC98\uB9AC\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"))) {
            _context23.n = 5;
            break;
          }
          return _context23.a(2);
        case 5:
          // 해당 물품 찾기
          item = items.find(function (i) {
            return i.name === record.itemName;
          });
          if (item) {
            item.stock += 1; // 재고 증가
          }

          // 대여 기록 삭제
          borrowedRecords.splice(recordIndex, 1);

          // 데이터 저장
          saveData();

          // 변경 로그 추가
          addChangeLog("강제 반납", "".concat(record.name, "(").concat(record.studentId, ")\uC758 ").concat(record.itemName, " \uAC15\uC81C \uBC18\uB0A9 \uCC98\uB9AC"));

          // 화면 업데이트
          renderAdminData();
          renderOverdueData();
          renderItems();
          alert("".concat(record.itemName, " \uAC15\uC81C \uBC18\uB0A9\uC774 \uCC98\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
        case 6:
          return _context23.a(2);
      }
    }, _callee23);
  }));
  return function (_x10, _x11, _x12) {
    return _ref23.apply(this, arguments);
  };
}();

// 물품 순서 변경 함수 (드래그 앤 드롭용)
window.moveItemTo = function (fromIndex, toIndex) {
  if (fromIndex < 0 || fromIndex >= items.length) return;
  if (toIndex < 0 || toIndex >= items.length) return;
  if (fromIndex === toIndex) return;

  // 배열에서 위치 이동
  var _items$splice = items.splice(fromIndex, 1),
    _items$splice2 = _slicedToArray(_items$splice, 1),
    movedItem = _items$splice2[0];
  items.splice(toIndex, 0, movedItem);

  // 데이터 저장
  saveData();

  // 변경 로그 추가
  addChangeLog("물품 순서 변경", "".concat(movedItem.name, "\uC758 \uC21C\uC11C \uBCC0\uACBD"));

  // 화면 업데이트
  renderAdminData();
  renderItems();
};

// 물품 순서 변경 함수 (버튼용 - 호환성 유지)
window.moveItem = function (index, direction) {
  if (index < 0 || index >= items.length) return;
  var newIndex = index + direction;
  if (newIndex < 0 || newIndex >= items.length) return;
  window.moveItemTo(index, newIndex);
};

// 물품 삭제 함수
window.deleteItem = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(index) {
    var item;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.n) {
        case 0:
          if (!(index < 0 || index >= items.length)) {
            _context24.n = 1;
            break;
          }
          return _context24.a(2);
        case 1:
          item = items[index];
          if (confirm("\"".concat(item.name, "\" \uBB3C\uD488\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"))) {
            _context24.n = 2;
            break;
          }
          return _context24.a(2);
        case 2:
          items.splice(index, 1);
          saveData();
          addChangeLog("물품 삭제", "".concat(item.name, " \uC0AD\uC81C\uB428"));
          renderAdminData();
          renderItems();
          alert("".concat(item.name, " \uBB3C\uD488\uC774 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
        case 3:
          return _context24.a(2);
      }
    }, _callee24);
  }));
  return function (_x13) {
    return _ref24.apply(this, arguments);
  };
}();

// 팝업 드래그 기능 공통 함수
function makeDraggable(cardElement) {
  if (!cardElement) return;
  var isDragging = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;
  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    if (e.target === cardElement || cardElement.contains(e.target)) {
      isDragging = true;
    }
  }
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }
    xOffset = currentX;
    yOffset = currentY;
    setTranslate(currentX, currentY, cardElement);
  }
  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(".concat(xPos, "px, ").concat(yPos, "px, 0)");
  }

  // 드래그 이벤트 리스너
  cardElement.addEventListener('mousedown', dragStart);
  cardElement.addEventListener('touchstart', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
}

// 모든 팝업에 드래그 기능 적용
makeDraggable(userInfoCard);

// Service Worker 등록 (PWA 지원)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
      console.log('Service Worker 등록 성공:', registration.scope);
    })["catch"](function (error) {
      console.log('Service Worker 등록 실패:', error);
    });
  });
}
