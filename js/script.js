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
// 요소가 없으면 조용히 넘어가는 이벤트 등록 헬퍼.
// 예전에는 핵심 요소들에 el.addEventListener 를 바로 걸었는데, HTML 에서 id
// 하나만 바뀌어도 그 줄에서 TypeError 가 나 스크립트 전체가 멈췄다. 초기화
// 코드가 파일 아래쪽에 몰려 있어 결과적으로 앱이 통째로 죽었다.
function on(el, type, handler, options) {
  if (!el || !el.addEventListener) return;
  el.addEventListener(type, handler, options);
}

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

// HTML 과 스크립트가 어긋나면 조용히 오작동하는 대신 콘솔에 분명히 남긴다.
// (여기 없는 요소는 대부분 if 가드로 넘어가므로 증상이 늦게, 엉뚱하게 나타난다)
(function warnMissingElements() {
  var required = {
    "user-form": form, "step-user": stepUser, "step-items": stepItems,
    "step-admin": stepAdmin, "itemGrid": itemGrid, "selectionResult": selectionResult,
    "adminStockTable": adminStockTable, "adminBorrowedTable": adminBorrowedTable,
    "confirmModal": confirmModal
  };
  var missing = Object.keys(required).filter(function (id) {
    return !required[id];
  });
  if (missing.length > 0) {
    console.error("HTML 에서 찾을 수 없는 필수 요소:", missing.join(", "));
  }
})();

// ========================================
// 커스텀 비밀번호 입력 모달
var adminPwModal = document.getElementById("adminPasswordModal");
var adminPwInput = document.getElementById("adminPwInput");
var adminPwTitle = document.getElementById("adminPwTitle");
var adminPwOk = document.getElementById("adminPwOk");
var adminPwCancel = document.getElementById("adminPwCancel");
function showPasswordPrompt(title) {
  return new Promise(function (resolve) {
    if (adminPwTitle) adminPwTitle.textContent = title || "관리자 비밀번호를 입력하세요";
    if (adminPwInput) adminPwInput.value = "";
    if (adminPwModal) adminPwModal.style.display = "flex";
    setTimeout(function () {
      if (adminPwInput) adminPwInput.focus();
    }, 100);
    function cleanup() {
      if (adminPwModal) adminPwModal.style.display = "none";
      if (adminPwOk) adminPwOk.removeEventListener("click", onOk);
      if (adminPwCancel) adminPwCancel.removeEventListener("click", onCancel);
      if (adminPwInput) adminPwInput.removeEventListener("keydown", onKeydown);
    }
    function onOk() {
      var val = adminPwInput ? adminPwInput.value : "";
      cleanup();
      resolve(val);
    }
    function onCancel() {
      cleanup();
      resolve(null);
    }
    function onKeydown(e) {
      if (e.key === "Enter") onOk();
      if (e.key === "Escape") onCancel();
    }
    on(adminPwOk, "click", onOk);
    on(adminPwCancel, "click", onCancel);
    on(adminPwInput, "keydown", onKeydown);
  });
}

// ========================================
// Google Sheets API 설정
// ========================================
var API_URL = 'https://script.google.com/macros/s/AKfycbxnduzDbTqcdb8c0WH06vpiRl9E2SZVF1SoQ95IlLaveD048gaZu-nJbE55Ih9r1FAU4g/exec';
var API_KEY = 'HS_KIOSK_2024_SEC_TOKEN';

// API GET 요청 헬퍼
function apiGet(action, callback) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '?action=' + encodeURIComponent(action) + '&key=' + encodeURIComponent(API_KEY), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            callback(null, data);
          } catch (e) {
            callback(e, null);
          }
        } else {
          callback(new Error('HTTP ' + xhr.status), null);
        }
      }
    };
    xhr.onerror = function () {
      callback(new Error('Network error'), null);
    };
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
      callback(new Error('Timeout'), null);
    };
    xhr.send();
  } catch (e) {
    callback(e, null);
  }
}

// API POST 요청 헬퍼 (fire-and-forget)
function apiPost(data, callback) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (callback) {
          if (xhr.status === 200) {
            try {
              var resp = JSON.parse(xhr.responseText);
              callback(null, resp);
            } catch (e) {
              callback(e, null);
            }
          } else {
            callback(new Error('HTTP ' + xhr.status), null);
          }
        }
      }
    };
    xhr.onerror = function () {
      if (callback) callback(new Error('Network error'), null);
    };
    xhr.timeout = 15000;
    xhr.ontimeout = function () {
      if (callback) callback(new Error('Timeout'), null);
    };
    var payload = Object.assign({}, data, {
      key: API_KEY
    });
    xhr.send(JSON.stringify(payload));
  } catch (e) {
    if (callback) callback(e, null);
  }
}

// ========================================
// 서버 쓰기 재시도 큐
// ========================================
// 예전에는 실패한 요청을 그냥 버리고 카운터(pendingSync)만 올려 두었다. 그러면
//   (1) 그 변경은 영영 서버에 반영되지 않고 (재시도가 없었다)
//   (2) 카운터가 0으로 돌아오지 않아 관리자 화면이 그 세션 내내 서버 데이터를
//       다시 못 가져왔다 (아래 getAllAdmin 의 덮어쓰기 가드 조건)
// 즉 쓰기 한 번 실패가 "그 변경 유실 + 이후 모든 동기화 차단"으로 이어졌다.
// 이제 실패한 요청을 큐에 남겨 지수 백오프로 재시도하고, 새로고침 뒤에도
// 이어서 보내도록 localStorage 에 보관한다.
var PENDING_KEY = 'kiosk_pendingWrites';
var pendingWrites = [];
var pendingFlushing = false;
var pendingTimer = null;
var pendingDropped = 0; // 재시도해도 소용없어 버린 건수 (관리자 동기화 표시에 사용)
// 최대 백오프가 30초이므로 200회면 대략 1시간 40분. 그보다 오래 실패하는
// 요청은 네트워크 문제가 아니라 그 요청 자체에 문제가 있다고 본다.
var PENDING_MAX_TRIES = 200;

// 서버가 명시적으로 거절한 요청은 다시 보내도 결과가 같다. 그대로 두면 큐 맨
// 앞에서 막혀 뒤의 정상 요청까지 영영 못 나가므로, 일시적 오류만 재시도한다.
var RETRYABLE_ERRORS = ['Server busy, please retry', 'Rate limit exceeded'];
function isRetryableFailure(err, resp) {
  if (err) return true; // 네트워크·타임아웃·HTTP 오류
  if (!resp) return true;
  if (resp.success) return false;
  return RETRYABLE_ERRORS.indexOf(resp.error) !== -1;
}

// 관리자 비밀번호가 필요한 요청은 기기에 저장하지 않는다.
// (localStorage 에 관리자 비밀번호가 평문으로 남는 것을 막는다)
function savePendingWrites() {
  saveToLocalCache(PENDING_KEY, pendingWrites.filter(function (entry) {
    return !entry.needsAdmin;
  }));
}

// 아직 서버에 반영되지 않은 로컬 변경이 있는가
function hasPendingWrites() {
  return pendingWrites.length > 0;
}

function queueWrite(data, options) {
  // 같은 대여 요청이 큐에 두 번 들어가면 서버에도 두 번 도착한다.
  // 서버가 (studentId, itemName) 으로 멱등 처리하긴 하지만, 애초에 보내지 않는다.
  if (data && data.action === 'addBorrowed' && data.record) {
    var newKey = borrowKey(data.record);
    var queued = pendingWrites.some(function (e) {
      return e.data && e.data.action === 'addBorrowed' && e.data.record && borrowKey(e.data.record) === newKey;
    });
    if (queued) return;
  }
  pendingWrites.push({
    data: data,
    needsAdmin: !!(options && options.needsAdmin),
    tries: 0
  });
  savePendingWrites();
  flushPendingWrites();
}

// 큐를 앞에서부터 한 건씩 순서대로 보낸다.
// 순서를 지켜야 하는 이유: 같은 물품에 대한 addBorrowed → removeBorrowed 가
// 뒤바뀌면 반납이 먼저 처리돼 대여 기록이 남는다.
function flushPendingWrites() {
  if (pendingFlushing || pendingWrites.length === 0) return;
  if (pendingTimer) {
    clearTimeout(pendingTimer);
    pendingTimer = null;
  }

  var entry = pendingWrites[0];
  var payload = entry.data;

  if (entry.needsAdmin) {
    if (!adminAuthPassword) {
      // 관리자 세션이 끝나 더는 보낼 수 없다. 버리고 다음 건으로 넘어간다.
      dropHeadPendingWrite('관리자 세션 종료');
      return;
    }
    payload = Object.assign({}, entry.data, { adminPassword: adminAuthPassword });
  }

  pendingFlushing = true;
  apiPost(payload, function (err, resp) {
    pendingFlushing = false;

    if (!err && resp && resp.success) {
      pendingWrites.shift();
      savePendingWrites();
      flushPendingWrites();
      return;
    }

    if (!isRetryableFailure(err, resp)) {
      dropHeadPendingWrite(resp && resp.error);
      return;
    }

    entry.tries++;

    // 큐는 순서 보장을 위해 맨 앞 건이 끝나야 다음으로 넘어간다. 서버가 특정
    // 요청에만 계속 5xx 를 준다면 그 한 건이 뒤의 정상 요청을 영구히 막는다.
    // 오프라인이 길어지는 것(정상 상황)은 견디되, 그보다 훨씬 긴 한도에서 포기한다.
    if (entry.tries > PENDING_MAX_TRIES) {
      dropHeadPendingWrite('재시도 한도 초과 (' + entry.tries + '회)');
      return;
    }

    savePendingWrites();
    // 1초 → 2 → 4 → … → 최대 30초
    var delay = Math.min(30000, 1000 * Math.pow(2, Math.min(entry.tries, 5)));
    pendingTimer = setTimeout(function () {
      pendingTimer = null;
      flushPendingWrites();
    }, delay);
  });
}

function dropHeadPendingWrite(reason) {
  var entry = pendingWrites.shift();
  pendingDropped++;
  console.error('서버 반영 실패로 요청을 버립니다:', entry && entry.data && entry.data.action, reason);
  // 서버가 대여를 거절했는데 화면에만 대여 중으로 남으면, 사용자는 빌리지도 않은
  // 물품을 반납해야 재고가 맞는 이상한 상태가 된다. 화면을 서버 쪽으로 되돌린다.
  if (entry && entry.data && entry.data.action === 'addBorrowed' && entry.data.record) {
    rollbackLocalBorrow(entry.data.record, reason);
  }
  savePendingWrites();
  flushPendingWrites();
}

// 서버에 반영되지 못한 로컬 대여를 취소 (기록 제거 + 재고 복구 + 안내)
function rollbackLocalBorrow(record, reason) {
  var key = borrowKey(record);
  var before = borrowedRecords.length;
  borrowedRecords = borrowedRecords.filter(function (r) {
    return borrowKey(r) !== key;
  });
  if (borrowedRecords.length === before) return;
  // 이름 정규화 없이 찾으면 시트에서 딸려 온 앞뒤 공백 때문에 물품을 못 찾아
  // 기록만 지워지고 재고는 1 모자란 채로 남는다
  var item = findItemByName(record.itemName);
  if (item) item.stock = (Number(item.stock) || 0) + 1;
  saveLocalCache();
  if (typeof renderItems === 'function') renderItems();
  if (typeof showSelectionResult === 'function') {
    showSelectionResult(reason === 'ALREADY_BORROWED' ? '⚠️ 한 번에 한 개의 물품만 대여할 수 있습니다.\n이미 대여 중인 물품을 먼저 반납해주세요.' : '⚠️ 대여가 서버에 저장되지 않아 취소되었습니다. 다시 시도해주세요.', false);
  }
}

// 새로고침·재시작 뒤에도 못 보낸 변경을 이어서 보낸다.
function restorePendingWrites() {
  var saved = loadFromLocalCache(PENDING_KEY);
  if (Array.isArray(saved)) {
    pendingWrites = saved.filter(function (e) {
      return e && e.data && e.data.action;
    }).map(function (e) {
      // 저장된 건은 관리자 인증이 필요 없는 것들뿐이다 (savePendingWrites 참고)
      return { data: e.data, needsAdmin: false, tries: 0 };
    });
  }
  flushPendingWrites();
}

window.addEventListener('online', flushPendingWrites);
setInterval(flushPendingWrites, 30000);

// 대여 기록에서 개인정보(이름·전화번호)를 뺀 사본.
// 기기 localStorage 는 공용 키오스크에 남는 저장소라 PII 를 두지 않는다.
// 반납 흐름 판정에는 studentId·itemName·기한만 있으면 충분하다.
function stripBorrowedPii(rows) {
  return (Array.isArray(rows) ? rows : []).map(function (r) {
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

// 로컬 캐시에만 저장 (서버 동기화는 증분 queueWrite 로 별도 처리)
function saveLocalCache() {
  try {
    saveToLocalCache('kiosk_items', items);
    saveToLocalCache('kiosk_borrowed', stripBorrowedPii(borrowedRecords));
  } catch (e) {
    console.error('Failed to cache data:', e);
  }
}

// 대여 중복 판정 키: (studentId, itemName) — borrowedAt 미포함 (클라/서버 동일 규칙)
// 미반납 상태는 학생·물품당 1건만 가능하므로 이 조합이 유일 키
function borrowKey(r) {
  // 물품명은 정규화해서 비교한다. 원본 그대로 쓰면 "우산" 과 "우산 " 이 서로 다른 키가 되어
  // 중복 제거를 빠져나가고, 1인 1물품 판정도 함께 흔들린다.
  // (서버로 보내는 값은 정규화하지 않는다 - 시트 원본과 맞춰야 반납 매칭이 된다)
  return String(r && r.studentId) + '|' + normName(r && r.itemName);
}

// 물품명 비교용 정규화. 시트에 앞뒤 공백이 섞여 들어오면 대여 기록의 itemName 과
// 물품 목록의 name 이 "같은 물품인데 다른 문자열"이 되어 반납 목록에서 사라졌다.
function normName(s) {
  return String(s == null ? '' : s).trim();
}

// 정규화된 이름으로 물품 카탈로그에서 찾기 (없으면 null)
function findItemByName(name) {
  var target = normName(name);
  for (var i = 0; i < items.length; i++) {
    if (normName(items[i].name) === target) return items[i];
  }
  return null;
}

// 현재 사용자의 미반납 기록
function myBorrowedRecords() {
  if (!currentUser) return [];
  return borrowedRecords.filter(function (r) {
    return String(r.studentId) === String(currentUser.studentId);
  });
}

// (studentId, itemName) 기준 중복 제거 - 먼저 등장한 레코드 유지
function dedupBorrowed(rows) {
  var seen = {};
  var out = [];
  (rows || []).forEach(function (r) {
    var k = borrowKey(r);
    if (!seen[k]) {
      seen[k] = true;
      out.push(r);
    }
  });
  return out;
}

// localStorage 헬퍼 (캐시 및 폴백용)
function saveToLocalCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('localStorage save error:', e);
  }
}
function loadFromLocalCache(key) {
  try {
    var raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('localStorage load error:', e);
  }
  return null;
}

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
      messageHtml = _options.messageHtml,
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
    // messageHtml 은 강조 표시가 필요한 곳에서만 쓴다. 넘기는 쪽에서 반드시
    // escapeHtml 로 감싼 값만 넣어야 한다. 그 외에는 textContent 로 안전하게 둔다.
    if (confirmMessage) {
      if (messageHtml) {
        confirmMessage.innerHTML = messageHtml;
      } else {
        confirmMessage.textContent = message || '';
      }
    }

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
// 보안: 비밀번호 해싱 함수
// ========================================
// 간단한 해시 함수 (crypto.subtle 없는 환경용 폴백)
function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var _char = str.charCodeAt(i);
    hash = (hash << 5) - hash + _char;
    hash = hash & hash;
  }
  return hash.toString(16);
}
var hashPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(password) {
    var encoder, data, hashBuffer, hashArray, hashHex;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          if (!(typeof crypto !== 'undefined' && crypto.subtle)) {
            _context7.n = 2;
            break;
          }
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
        case 2:
          // 보안 컨텍스트(crypto.subtle)가 없으면 약한 32비트 해시로 폴백하지 않고 인증 거부
          // (약한 해시는 충돌 위조가 쉬워 관리자 우회에 악용될 수 있음)
          return _context7.a(2, null);
      }
    }, _callee7);
  }));
  return function hashPassword(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

// 관리자 비밀번호 해시 (SHA-256) - 비밀번호 원문 노출 방지
var ADMIN_PASSWORD_HASH = "de6d045537291b8c8762940084f51bd3d02055d5cbc250e6d2fc6ddb09d88325";
var ADMIN_PASSWORD_SIMPLE_HASH = "54dc6828";

// 관리자 로그인 성공 시 입력한 비밀번호를 메모리에만 보관 (서버측 파괴적 작업 인증에 사용)
// 저장/전송하지 않으며 로그아웃·화면 이탈 시 즉시 폐기
var adminAuthPassword = null;

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
          return _context8.a(2, inputHash !== null && inputHash === ADMIN_PASSWORD_HASH);
      }
    }, _callee8);
  }));
  return function verifyAdminPassword(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

// 추가 관리자 모드 비밀번호 해시 (원문 노출 방지)
var SUPER_ADMIN_SHA256_HASH = "a3cdb037448fc2bfde78fde5f165480c8ba82451899fa593de0ac2b155a66199";
var SUPER_ADMIN_SIMPLE_HASH = "-71c82a55";
var verifySuperAdminPassword = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(inputPassword) {
    var inputHash;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return hashPassword(inputPassword);
        case 1:
          inputHash = _context9.v;
          return _context9.a(2, inputHash !== null && inputHash === SUPER_ADMIN_SHA256_HASH);
      }
    }, _callee9);
  }));
  return function verifySuperAdminPassword(_x6) {
    return _ref9.apply(this, arguments);
  };
}();

// ========================================
// 입력값 검증 함수 (보안 강화)
// ========================================

var studentIdRegex = /^\d{10}$/;
var phoneRegex = /^\d{11}$/;
var nameRegex = /^[가-힣a-zA-Z\s]{2,20}$/; // 한글, 영문, 공백만 허용, 2-20자

// 허용된 학과 식별번호
// 신입생: 402-컴정공, 403-소프트, 404-정융, 405/406-로봇
// 고학번: 202-컴정공, 203-소프트, 204-정융, 205-로봇
var validDepartmentCodes = ['202', '203', '204', '205', '402', '403', '404', '405', '406'];

// XSS 방지: HTML 특수문자 이스케이프
var escapeHtml = function escapeHtml(unsafe) {
  if (unsafe === null || unsafe === undefined) return '';
  if (typeof unsafe !== 'string') unsafe = String(unsafe);
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
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
    var logs, _t13;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          logs = loadFromLocalCache('kiosk_changeLog');
          return _context0.a(2, logs || []);
        case 1:
          _context0.p = 1;
          _t13 = _context0.v;
          console.error('Failed to load change log:', _t13);
          return _context0.a(2, []);
      }
    }, _callee0, null, [[0, 1]]);
  }));
  return function loadChangeLog() {
    return _ref0.apply(this, arguments);
  };
}();

// (호출된 적 없는 saveChangeLog 제거 — 저장은 addChangeLog 안에서 한다)
var changeLog = [];

// 변경 로그 추가
var addChangeLog = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(action, details) {
    var logEntry;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          try {
            logEntry = {
              time: new Date().toISOString(),
              action: action,
              details: details
            }; // 메모리 배열에 추가
            changeLog.push(logEntry);
            // 50개 제한 적용
            if (changeLog.length > 50) {
              changeLog = changeLog.slice(-50);
            }
            // localStorage 캐시
            saveToLocalCache('kiosk_changeLog', changeLog);
            // 서버 전송은 큐를 통해 재시도까지 보장한다
            queueWrite({
              action: 'addChangeLog',
              log: logEntry
            });
          } catch (error) {
            console.error('Failed to add change log:', error);
          }
        case 1:
          return _context10.a(2);
      }
    }, _callee10);
  }));
  return function addChangeLog(_x8, _x9) {
    return _ref10.apply(this, arguments);
  };
}();

// 로그인 기록 관리
// ※ 이름·학번·전화번호 묶음이라 기기 localStorage 에는 저장하지 않는다.
//    공용 키오스크에서 브라우저만 열면 최근 이용자 100명의 개인정보가 그대로
//    보이던 문제가 있었다. 서버에만 보내고, 관리자 화면에서 필요할 때
//    getAllAdmin 으로 받아 메모리에서만 쓴다.
var loginLog = [];

function addLoginLog(user) {
  try {
    var logEntry = {
      time: new Date().toISOString(),
      name: user.name,
      studentId: user.studentId,
      phone: user.phone
    };
    // 메모리 배열에만 추가 (최근 100건)
    loginLog.push(logEntry);
    if (loginLog.length > 100) {
      loginLog = loginLog.slice(-100);
    }
    // 서버 전송은 큐를 통해 재시도까지 보장한다
    queueWrite({
      action: 'addLoginLog',
      log: logEntry
    });
  } catch (error) {
    console.error('Failed to add login log:', error);
  }
}

// 예전 버전이 기기에 남겨 둔 개인정보를 지운다 (1회성 정리)
function purgeLegacyPii() {
  try {
    localStorage.removeItem('kiosk_loginLog');
    var cached = loadFromLocalCache('kiosk_borrowed');
    if (Array.isArray(cached) && cached.some(function (r) {
      return r && (r.name || r.phone);
    })) {
      saveToLocalCache('kiosk_borrowed', stripBorrowedPii(cached));
    }
  } catch (e) {
    console.error('legacy PII purge failed:', e);
  }
}
purgeLegacyPii();

// 기본 물품 데이터 (서버가 비어 있거나 연결이 안 될 때만 쓰는 폴백)
// ※ google-apps-script.js 의 initializeData() 목록과 내용이 같아야 한다.
//   maxStock 을 반드시 채운다. 비어 있으면 getMaxStock() 이 현재 재고를 최대치로
//   간주해, 모든 물품이 늘 "충분"으로 보이고 재고 부족 경고가 뜨지 않는다.
var DEFAULT_ITEMS = [
  { name: "우산", type: "대여", stock: 7, maxStock: 7, notice: "비 오는 날 사용 후 충분히 말려서 반납", icon: "🌂" },
  { name: "충전기", type: "대여", stock: 5, maxStock: 5, notice: "케이블 손상 시 즉시 관리자에게 보고", icon: "🔌" },
  { name: "USB 허브", type: "대여", stock: 3, maxStock: 3, notice: "USB 포트 무리하게 꽂지 않기", icon: "🔗" },
  { name: "USB 허브 C타입", type: "대여", stock: 3, maxStock: 3, notice: "USB 포트 무리하게 꽂지 않기", icon: "💻" },
  { name: "농구공", type: "대여", stock: 2, maxStock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🏀" },
  { name: "풋살볼", type: "대여", stock: 2, maxStock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "⚽" },
  { name: "피구공", type: "대여", stock: 2, maxStock: 2, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "🔴" },
  { name: "공", type: "대여", stock: 4, maxStock: 4, notice: "실내 사용 금지, 흙 묻지 않게 관리", icon: "⚽" },
  { name: "담요", type: "대여", stock: 2, maxStock: 2, notice: "음식물·화장품 묻지 않게 주의", icon: "🛏️" },
  { name: "핫팩", type: "소모품", stock: 20, maxStock: 20, notice: "개봉 후 재활용 불가, 즉시 폐기", icon: "🔥" },
  { name: "마스크", type: "소모품", stock: 50, maxStock: 50, notice: "1인 1개 제한", icon: "😷" }
];

// 기본 목록은 매번 새 사본을 준다 (전역 상수가 재고 증감으로 오염되지 않도록)
function defaultItemsCopy() {
  return DEFAULT_ITEMS.map(function (it) {
    return Object.assign({}, it);
  });
}

// Google Sheets API에서 데이터 불러오기 (localStorage 폴백)
var loadData = function loadData() {
  return new Promise(function (resolve) {
    var defaultItems = defaultItemsCopy();

    // API에서 데이터 가져오기 시도
    apiGet('getAll', function (err, response) {
      if (!err && response && response.success && response.data) {
        var apiData = response.data;
        var loadedItems = apiData.items && apiData.items.length > 0 ? apiData.items : defaultItems;
        // 재고를 항상 숫자로 보정 (시트 셀이 문자열이면 반납 시 "7"+1="71" 문자열 연결 방지)
        loadedItems.forEach(function (it) {
          it.stock = Number(it.stock) || 0;
        });
        // 과거에 중복 기록된 행이 시트에 남아 있어도 화면·판정에서는 한 건으로 본다
        var loadedBorrowed = dedupBorrowed(apiData.borrowed || []);

        // localStorage 캐시에 저장 (개인정보는 담지 않는다)
        saveToLocalCache('kiosk_items', loadedItems);
        saveToLocalCache('kiosk_borrowed', stripBorrowedPii(loadedBorrowed));
        if (apiData.changeLog) {
          saveToLocalCache('kiosk_changeLog', apiData.changeLog);
        }
        // loginLog 는 이름·학번·전화번호 묶음이라 기기에 남기지 않는다.
        // 관리자 화면에서 필요할 때 서버(getAllAdmin)에서 받아 메모리로만 쓴다.
        console.log('Data loaded from Google Sheets API');
        resolve({
          items: loadedItems,
          borrowedRecords: loadedBorrowed
        });
      } else {
        // API 실패 시 localStorage 폴백
        console.warn('API load failed, using localStorage fallback:', err);
        var cachedItems = loadFromLocalCache('kiosk_items');
        var cachedBorrowed = loadFromLocalCache('kiosk_borrowed');
        if (cachedItems && cachedItems.length > 0) {
          cachedItems.forEach(function (it) {
            it.stock = Number(it.stock) || 0;
          });
          resolve({
            items: cachedItems,
            borrowedRecords: dedupBorrowed(cachedBorrowed || [])
          });
        } else {
          resolve({
            items: defaultItems,
            borrowedRecords: []
          });
        }
      }
    });
  });
};
var items = [];
var borrowedRecords = [];
// 누적 대여·수령 횟수 (서버 stats 카운터에서 로드, 캐시 폴백) - 로그와 무관한 진짜 누적
var statsTotalBorrow = loadFromLocalCache('kiosk_statsTotalBorrow');
// 서버 응답을 기다리는 중인지. 기다리는 동안 캐시값을 보여주면 응답 도착 시
// 숫자가 뛰어 보이므로 '—' 로 대신한다. 요청이 실패하면 다시 캐시값으로 돌아간다.
var statsTotalBorrowLoading = false;

// ── 관리자 물품 편집: 증분 저장 ─────────────────────────
// 예전 saveData() 는 로컬 items/borrowedRecords 배열 전체를 시트에 덮어썼다.
// 관리자 화면을 열어둔 사이 다른 기기에서 대여가 일어나면, 물품 하나만 고쳐도
// 나머지 전 물품의 재고가 관리자 기기의 옛 값으로 되돌아갔다.
// 이제 실제로 건드린 대상만 서버에 보낸다.

// 서버에 보낼 물품 형태로 정리 (서버 ITEM_HEADERS 와 맞춘다)
function itemPayload(item) {
  return {
    name: item.name,
    type: item.type,
    stock: Number(item.stock) || 0,
    maxStock: Number(item.maxStock) || 0,
    notice: item.notice || '',
    icon: item.icon || '',
    image: item.image || ''
  };
}

// 추가·수정. 이름을 바꿨다면 oldName 을 함께 보내면 서버가 대여 기록의
// 물품명까지 같이 고쳐 준다.
function syncUpsertItem(item, oldName) {
  var payload = { action: 'upsertItem', item: itemPayload(item) };
  if (oldName && oldName !== item.name) payload.oldName = oldName;
  queueWrite(payload, { needsAdmin: true });
}

function syncDeleteItem(name) {
  queueWrite({ action: 'deleteItem', name: name }, { needsAdmin: true });
}

// 순서만 보낸다. 재고 등 값은 서버가 시트의 현재 값을 그대로 유지한다.
function syncReorderItems() {
  queueWrite({
    action: 'reorderItems',
    names: items.map(function (it) {
      return it.name;
    })
  }, { needsAdmin: true });
}
var userChips = document.getElementById("userChips");
var logBoard = document.getElementById("logBoard");
var brandLogo = document.getElementById("brandLogo");

var stepHome = document.getElementById("step-home");

// 흐름 모드: 'borrow'(대여) | 'return'(반납) — 홈 화면에서 선택한다
var flowMode = 'borrow';

// 홈 화면 재고 칩 렌더링
var homeStock = document.getElementById("homeStock");
// 직전에 그린 결과. 같은 내용을 다시 써 넣으면 DOM 이 통째로 교체되면서
// 화면이 한 번 비었다 채워져 깜빡인다(빠르게 조작할수록 심함). 그래서 비교 후 건너뛴다.
var lastHomeStockHtml = null;
var renderHomeStock = function renderHomeStock() {
  if (!homeStock) return;
  if (!Array.isArray(items) || items.length === 0) {
    if (lastHomeStockHtml !== '') {
      homeStock.innerHTML = '';
      lastHomeStockHtml = '';
    }
    return;
  }
  var homeStockHtml = items.slice(0, 6).map(function (item) {
    var stock = parseInt(item.stock) || 0;
    var cls = 'stock-chip';
    if (stock <= 0) cls += ' is-out';else if (stock <= 2) cls += ' is-low';
    // 소모품은 정확한 수량 대신 여유 정도만 알린다
    var label = item.type === '소모품' ? stock <= 0 ? '소진' : stock <= 5 ? '부족' : '충분' : stock + '개';
    return '<span class="' + cls + '">' + (item.icon ? escapeHtml(item.icon) + ' ' : '') + escapeHtml(item.name) + ' <b>' + label + '</b></span>';
  }).join('');
  if (homeStockHtml === lastHomeStockHtml) return;
  homeStock.innerHTML = homeStockHtml;
  lastHomeStockHtml = homeStockHtml;
};

// 진행 단계 표시 갱신 (1 정보 입력 → 2 물품 선택)
var stepIndicator = document.getElementById("stepIndicator");
var stepItemsLabel = document.getElementById("stepItemsLabel");
var stepBar = document.getElementById("stepBar");
var updateStepIndicator = function updateStepIndicator(step) {
  if (!stepIndicator) return;
  // 정보 입력·물품 선택 단계에서만 노출 (홈·관리자 화면에서는 숨김)
  var inFlow = step === "user" || step === "items";
  if (stepBar) stepBar.classList.toggle("hidden", !inFlow);
  // 물품 선택 화면에는 툴바에 자체 '취소' 가 있으므로 여기 버튼은 감춘다.
  // 같은 줄 왼쪽을 대여자 정보 칩이 채우므로 자리를 남길 필요가 없어 display 로 없앤다.
  var backBtn = document.getElementById("backToHome");
  if (backBtn) backBtn.style.display = step === "user" ? "" : "none";
  if (!inFlow) return;
  if (stepItemsLabel) {
    stepItemsLabel.textContent = flowMode === 'return' ? '반납할 물품' : '물품 선택';
  }
  var current = step === "items" ? "items" : "user";
  var dots = stepIndicator.querySelectorAll(".step-dot");
  Array.prototype.forEach.call(dots, function (dot) {
    var name = dot.getAttribute("data-step");
    dot.classList.remove("active", "done");
    if (name === current) {
      dot.classList.add("active");
    } else if (current === "items" && name === "user") {
      dot.classList.add("done");
    }
  });
};

// 현재 보고 있는 화면. 느린 초기화가 뒤늦게 끝나면서 사용자가 이동해 둔
// 화면을 홈으로 되돌리는 일을 막는 데 쓴다.
var currentStepName = null;

// ============================================================
// 관리자 콘솔 — 패널 전환 / 검색 / 필터
// ============================================================
var adminPanelName = 'dash';
var adminStockFilter = 'all';
var adminEditIndex = -1;   // 재고 표에서 인라인 수정 중인 행 (없으면 -1)
var adminEditFocus = false;

// 최대 재고(총 보유 수량). 예전에 등록된 물품에는 값이 없으므로 현재 재고로 대체한다.
function getMaxStock(item) {
  if (!item) return 0;
  var max = Number(item.maxStock) || 0;
  if (max > 0) return max;
  return Number(item.stock) || 0;
}

// 재고 상태: 최대 재고 대비 비율로 판단한다
function stockState(item) {
  var stock = Number(item.stock) || 0;
  var max = getMaxStock(item);
  if (stock === 0) return { cls: 'is-bad', label: '품절' };
  if (max <= 0) return { cls: 'is-mute', label: '-' };
  var ratio = stock / max;
  if (ratio <= 0.2) return { cls: 'is-bad', label: '부족' };
  if (ratio <= 0.5) return { cls: 'is-warn', label: '보통' };
  return { cls: 'is-ok', label: '충분' };
}
var adminStockQuery = '';
var adminLendQuery = '';

function showAdminPanel(name) {
  adminPanelName = name || 'dash';
  var nav = document.getElementById('adminNav');
  if (nav) {
    var navItems = nav.querySelectorAll('.admin-nav-item[data-panel]');
    Array.prototype.forEach.call(navItems, function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-panel') === adminPanelName);
    });
  }
  var panels = document.querySelectorAll('#step-admin .admin-panel[data-panel]');
  Array.prototype.forEach.call(panels, function (p) {
    p.classList.toggle('is-active', p.getAttribute('data-panel') === adminPanelName);
  });
  var sub = document.getElementById('adminCrumbSub');
  if (sub) {
    var labels = {
      dash: '전체 현황 한눈에 보기',
      lend: '현재 대여 중인 기록',
      overdue: '반납 기한이 지난 기록',
      stock: '물품 재고 추가 · 수정 · 삭제'
    };
    sub.textContent = adminDateLabel() + ' · ' + (labels[adminPanelName] || '');
  }
  if (adminPanelName === 'overdue') renderOverdueData();
  // 패널을 바꾸면 위에서부터 보이도록
  var active = document.querySelector('#step-admin .admin-panel.is-active');
  if (active) active.scrollTop = 0;
}

// 좁은 화면에서 표가 카드로 바뀔 때 각 칸에 항목 이름을 붙인다.
// (헤더 행의 th 텍스트를 그대로 td[data-th] 로 복사)
function labelTableCells(container) {
  if (!container) return;
  var tables = container.tagName === 'TABLE' ? [container] : container.querySelectorAll('table');
  Array.prototype.forEach.call(tables, function (table) {
    var rows = table.rows;
    if (!rows || rows.length === 0) return;
    var heads = rows[0].cells;
    var labels = [];
    Array.prototype.forEach.call(heads, function (th) {
      labels.push((th.textContent || '').trim());
    });
    for (var r = 1; r < rows.length; r++) {
      var cells = rows[r].cells;
      for (var c = 0; c < cells.length; c++) {
        if (labels[c]) cells[c].setAttribute('data-th', labels[c]);
      }
    }
  });
}

function adminDateLabel() {
  var d = new Date();
  var days = ['일', '월', '화', '수', '목', '금', '토'];
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0') + ' (' + days[d.getDay()] + ')';
}

// 동기화 상태 표시
function setAdminSync(state, text) {
  var dot = document.getElementById('adminSyncDot');
  var txt = document.getElementById('adminSyncText');
  if (dot) {
    dot.classList.remove('is-off', 'is-wait');
    if (state === 'off') dot.classList.add('is-off');
    if (state === 'wait') dot.classList.add('is-wait');
  }
  if (txt) txt.textContent = text;
}

var showStep = function showStep(step) {
  currentStepName = step;
  updateStepIndicator(step);
  // 화면 전환 시 기존 자동 로그아웃 타이머 해제 (items 화면이면 아래에서 다시 무장)
  if (typeof clearAutoLogout === 'function') {
    clearAutoLogout();
  }
  // 모든 섹션을 숨김 처리
  if (stepHome) stepHome.classList.add("hidden");
  if (stepUser) stepUser.classList.add("hidden");
  if (stepItems) stepItems.classList.add("hidden");
  if (stepAdmin) stepAdmin.classList.add("hidden"); // 관리자 섹션 숨김 추가
  if (stepOverdue) stepOverdue.classList.add("hidden"); // 연체자 섹션(구버전) 숨김
  if (stepChangelog) stepChangelog.classList.add("hidden"); // 변경 로그 섹션 숨김 추가
  if (logBoard) logBoard.classList.add("hidden");
  if (adminBorrowedPopup) adminBorrowedPopup.classList.add("hidden");
  // 대여자 정보 칩은 물품 선택 화면에서만 쓴다. 다른 화면으로 옮기면 비운다.
  // 칩이 상단 줄(#stepBar)로 올라오면서 정보 입력 화면에서도 보이게 됐고,
  // 그대로 두면 앞사람 이름·학번이 다음 이용자 화면에 남는다.
  if (userChips && step !== "items") userChips.innerHTML = "";
  // 화면을 옮기면 숫자 키패드는 항상 닫는다.
  // (initApp 이 이 파일 아래쪽 정의보다 먼저 showStep 을 부를 수 있어 typeof 로 방어)
  if (typeof closeNumPad === "function") closeNumPad();
  if (typeof closeHanPad === "function") closeHanPad();
  var mobileBorrowedPanelEl = document.getElementById("mobileBorrowedPanel");
  if (mobileBorrowedPanelEl) mobileBorrowedPanelEl.classList.add("hidden");
  if (brandLogo) brandLogo.classList.add("hidden");
  var loginLogPopup = document.getElementById("loginLogPopup");
  if (loginLogPopup) loginLogPopup.classList.add("hidden");
  if (step === "home") {
    if (stepHome) stepHome.classList.remove("hidden");
    if (brandLogo) brandLogo.classList.remove("hidden");
    renderHomeStock();
    // 홈으로 돌아오면 다음 이용자를 위해 흐름 모드를 초기화
    flowMode = 'borrow';
    var _kioskHome = document.querySelector('.kiosk');
    if (_kioskHome) {
      _kioskHome.style.marginLeft = '';
      _kioskHome.style.width = '';
    }
  } else if (step === "items") {
    if (stepItems) stepItems.classList.remove("hidden");
    // 관리자 화면이 남긴 인라인 여백·폭을 원복한다.
    // 남아 있으면 물품 그리드가 오른쪽으로 밀려 잘린다.
    var _kioskItems = document.querySelector('.kiosk');
    if (_kioskItems) {
      _kioskItems.style.marginLeft = '';
      _kioskItems.style.width = '';
    }
    // 반납 흐름에서는 타입 필터 대신 안내 문구를 보여준다
    var filterRow = document.getElementById("filterRow");
    var itemsModeLabel = document.getElementById("itemsModeLabel");
    if (filterRow) filterRow.classList.toggle("hidden", flowMode === 'return');
    if (itemsModeLabel) itemsModeLabel.classList.toggle("hidden", flowMode !== 'return');
    // currentUser·flowMode 가 정해진 뒤 목록을 다시 그려야 한다
    renderItems();
    if (logBoard) logBoard.classList.add("hidden");
    if (brandLogo) brandLogo.classList.remove("hidden");
    // 대여자 정보는 툴바 칩(#userChips)으로 보여준다.
    // 떠 있던 카드(#userInfoPopup)는 화면이 좁을 때 물품 카드를 덮어서 더 이상 띄우지 않는다.
    // 자동 로그아웃 타이머 시작
    if (typeof resetAutoLogout === 'function') {
      resetAutoLogout();
    }
  } else if (step === "admin") {
    // 관리자 모드일 경우
    if (stepAdmin) stepAdmin.classList.remove("hidden");
    // 고정 팝업이 사라졌으므로 .kiosk 여백 조작도 필요 없다. 남아 있으면 잘리므로 원복.
    var kiosk = document.querySelector('.kiosk');
    if (kiosk) {
      kiosk.style.marginLeft = '';
      kiosk.style.width = '';
    }
    showAdminPanel('dash');
    setAdminSync('wait', '서버에서 불러오는 중…');
    // 관리자 모드 진입 시 API에서 최신 데이터 가져오기 (전체 PII 포함 → POST + 관리자 인증)
    // pendingSync > 0 이면 아직 서버에 반영 안 된 로컬 변경이 있으므로 덮어쓰지 않음 (데이터 유실 방지)
    // 누적 카운터는 서버가 권위 값이다. 캐시값을 먼저 보여주면 응답이 온 순간
    // 숫자가 뛰어 오작동처럼 보이므로, 응답을 기다리는 동안에는 '—' 로 둔다.
    statsTotalBorrowLoading = true;
    apiPost({ action: 'getAllAdmin', adminPassword: adminAuthPassword }, function (err, response) {
      statsTotalBorrowLoading = false;
      // req1: 응답 없음(err)·success=false·data 파손 시 로컬 메모리/캐시를 절대 덮어쓰지 않고 캐시로 렌더링만
      var ok = !err && response && response.success && response.data;
      // 못 보낸 로컬 변경이 남아 있으면 덮어쓰지 않음 (데이터 유실 방지).
      // 큐는 백오프로 계속 재시도하므로, 예전처럼 영구히 막히지는 않는다.
      if (ok && !hasPendingWrites()) {
        var apiData = response.data;

        // req2/5: items 는 "비어있지 않은 배열"일 때만 교체 + 재고 숫자 보정
        if (Array.isArray(apiData.items) && apiData.items.length > 0) {
          apiData.items.forEach(function (item) {
            if (item) item.stock = Number(item.stock) || 0;
          });
          items = apiData.items;
          saveToLocalCache('kiosk_items', items);
        }

        // req2/3: 서버 borrowed 를 기준으로 하되, 로컬에만 있고 서버엔 없는 기록(미동기화)을 병합해 유실 방지
        if (Array.isArray(apiData.borrowed)) {
          var serverKeys = {};
          apiData.borrowed.forEach(function (r) {
            serverKeys[borrowKey(r)] = true;
          });
          var localBorrowed = Array.isArray(borrowedRecords) ? borrowedRecords : [];
          var localOnly = localBorrowed.filter(function (r) {
            return !serverKeys[borrowKey(r)];
          });
          borrowedRecords = dedupBorrowed(apiData.borrowed.concat(localOnly));
          // 캐시에는 개인정보를 뺀 사본만 남긴다 (메모리에는 관리자 표시용으로 유지)
          saveToLocalCache('kiosk_borrowed', stripBorrowedPii(borrowedRecords));
        }

        // req2: changeLog 는 "비어있지 않은 배열"일 때만 교체
        if (Array.isArray(apiData.changeLog) && apiData.changeLog.length > 0) {
          changeLog = apiData.changeLog;
          saveToLocalCache('kiosk_changeLog', changeLog);
        }
        // loginLog 는 메모리에만 둔다 (이름·학번·전화번호 묶음이라 기기에 남기지 않음)
        if (Array.isArray(apiData.loginLog)) {
          loginLog = apiData.loginLog;
        }
      }
      // 누적 카운터는 로컬 쓰기와 무관한 서버 권위 값이므로 pendingSync와 별개로 갱신
      if (ok && response.data.stats && typeof response.data.stats.totalBorrow === 'number') {
        statsTotalBorrow = response.data.stats.totalBorrow;
        saveToLocalCache('kiosk_statsTotalBorrow', statsTotalBorrow);
      }
      var syncTime = new Date();
      var hh = String(syncTime.getHours()).padStart(2, '0') + ':' + String(syncTime.getMinutes()).padStart(2, '0');
      if (!ok) {
        setAdminSync('off', '오프라인 · 저장된 데이터 표시 중');
      } else if (pendingDropped > 0) {
        // 재시도해도 서버가 거절한 변경이 있으면 조용히 넘기지 않는다
        setAdminSync('wait', '서버 연결됨 · 반영 실패한 변경 ' + pendingDropped + '건 (콘솔 확인)');
      } else if (hasPendingWrites()) {
        setAdminSync('wait', '서버 연결됨 · 전송 대기 중인 변경 ' + pendingWrites.length + '건');
      } else {
        setAdminSync('ok', '서버 연결됨 · ' + hh + ' 동기화');
      }
      renderAdminData();
    });
    renderAdminData(); // 일단 캐시 데이터로 즉시 렌더링
  } else if (step === "overdue") {
    // 연체는 이제 관리자 콘솔 안의 패널이다 → 관리자 화면으로 보내고 해당 패널을 연다
    showStep("admin");
    showAdminPanel("overdue");
    return;
  } else if (step === "changelog") {
    // 변경 로그 화면일 경우
    if (stepChangelog) stepChangelog.classList.remove("hidden");
    var _kiosk = document.querySelector('.kiosk');
    if (_kiosk) {
      _kiosk.style.marginLeft = '';
      _kiosk.style.width = '';
    }
    renderChangeLogView(); // 변경 로그 화면 진입 시 데이터 렌더링
    renderLoginLog(); // 로그인 기록 렌더링
  } else {
    // 기본값 (user)
    if (stepUser) stepUser.classList.remove("hidden");
    // STEP 1에서는 제목과 부제목 숨김 (로고가 브랜드 역할)

    if (brandLogo) brandLogo.classList.remove("hidden");
    // 기본 모드일 때 레이아웃 원복
    var _kiosk2 = document.querySelector('.kiosk');
    if (_kiosk2) {
      _kiosk2.style.marginLeft = '';
      _kiosk2.style.width = '';
    }
    // 정보 입력 화면에서는 키패드를 처음부터 띄워 둔다
    if (typeof openDefaultPad === "function") openDefaultPad();
  }
};
var renderAdminData = function renderAdminData() {
  try {
    // req4/5: 방어 - 전역 데이터가 배열이 아니면 [] 로 정규화, 재고는 항상 숫자로 보정
    if (!Array.isArray(items)) items = [];
    if (!Array.isArray(borrowedRecords)) borrowedRecords = [];
    if (!Array.isArray(changeLog)) changeLog = [];
    if (!Array.isArray(loginLog)) loginLog = [];
    items.forEach(function (it) {
      if (it) it.stock = Number(it.stock) || 0;
    });
  // 0. 통계 대시보드 업데이트
  var now = new Date();
  var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 누적 대여·수령 횟수: 서버 stats 카운터 사용 (200개 캡·덮어쓰기·문자열 의존과 무관한 진짜 누적)
  // 서버 값이 아직 로드되지 않았으면 레거시 changeLog 카운트로 임시 표시 (서버 응답 오면 정정됨)
  var totalBorrowCount = typeof statsTotalBorrow === 'number' ? statsTotalBorrow : changeLog.filter(function (log) {
    return log.action === '물품 대여' || log.action === '소모품 수령';
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
  if (statTodayBorrow) statTodayBorrow.textContent = statsTotalBorrowLoading ? '—' : totalBorrowCount;
  if (statTotalBorrowed) statTotalBorrowed.textContent = totalBorrowed;
  if (statOverdue) statOverdue.textContent = overdueCount;

  // 오늘 반납 완료 건수 (변경 로그 기준)
  var todayReturnCount = changeLog.filter(function (log) {
    if (!log || log.action !== '물품 반납') return false;
    var t = new Date(log.time);
    return t >= todayStart;
  }).length;
  var statTodayReturn = document.getElementById('statTodayReturn');
  if (statTodayReturn) statTodayReturn.textContent = todayReturnCount;

  // 네비 뱃지
  var navLendBadge = document.getElementById('navLendBadge');
  var navOverdueBadge = document.getElementById('navOverdueBadge');
  if (navLendBadge) navLendBadge.textContent = totalBorrowed;
  if (navOverdueBadge) {
    navOverdueBadge.textContent = overdueCount;
    navOverdueBadge.classList.toggle('is-mute', overdueCount === 0);
  }

  // 재고 부족 경고 배너
  var lowItems = items.filter(function (it) {
    return stockState(it).cls === 'is-bad';
  });
  var adminAlert = document.getElementById('adminAlert');
  var adminAlertText = document.getElementById('adminAlertText');
  if (adminAlert && adminAlertText) {
    if (lowItems.length > 0) {
      adminAlertText.innerHTML = '<b>재고 부족 ' + lowItems.length + '건</b> · ' + lowItems.map(function (it) {
        return escapeHtml(it.name) + '(' + (Number(it.stock) || 0) + '/' + getMaxStock(it) + ')';
      }).join(', ') + ' — 보충이 필요합니다.';
      adminAlert.classList.remove('hidden');
    } else {
      adminAlert.classList.add('hidden');
    }
  }

  // 1. 재고 현황 테이블 렌더링 (검색 · 필터 · 상태 태그 · 인라인 수정)
  var stockRows = items.map(function (item, index) {
    return { item: item, index: index };
  }).filter(function (row) {
    var it = row.item;
    var stock = Number(it.stock) || 0;
    if (row.index === adminEditIndex) return true; // 수정 중인 행은 필터와 무관하게 계속 보인다
    if (adminStockFilter === 'low' && ['is-bad'].indexOf(stockState(it).cls) === -1) return false;
    if (adminStockFilter !== 'all' && adminStockFilter !== 'low' && it.type !== adminStockFilter) return false;
    if (adminStockQuery && String(it.name || '').toLowerCase().indexOf(adminStockQuery) === -1) return false;
    return true;
  });
  var stockHtml;
  if (stockRows.length === 0) {
    stockHtml = '<p class="admin-empty">조건에 맞는 물품이 없습니다.</p>';
  } else {
    stockHtml = '<table id="stockTable"><tr class="is-head"><th>순서</th><th>물품명</th><th>구분</th><th>재고</th><th>상태</th><th>주의사항</th><th>관리</th></tr>' + stockRows.map(function (row) {
      var item = row.item;
      var index = row.index;
      var stock = Number(item.stock) || 0;

      // ── 수정 모드 행 ──
      if (index === adminEditIndex) {
        return '<tr class="is-editing" data-index="' + index + '">' + '<td data-th="순서" style="text-align: center;">✏️</td>' + '<td data-th="물품명">' + '<div class="admin-edit-name">' + '<input id="editIcon" class="admin-input is-icon" type="text" value="' + escapeHtml(item.icon || '') + '" placeholder="🌂" maxlength="4">' + '<input id="editName" class="admin-input" type="text" value="' + escapeHtml(item.name || '') + '" placeholder="물품명">' + '</div>' + '</td>' + '<td data-th="구분">' + '<select id="editType" class="admin-input">' + '<option value="대여"' + (item.type === '대여' ? ' selected' : '') + '>대여</option>' + '<option value="소모품"' + (item.type === '소모품' ? ' selected' : '') + '>소모품</option>' + '</select>' + '</td>' + '<td data-th="재고">' + '<div class="admin-edit-stock">' + '<input id="editMaxStock" class="admin-input" type="number" min="0" max="9999" value="' + getMaxStock(item) + '">' + '<span class="admin-edit-hint">최대 재고 · 현재 ' + stock + '개</span>' + '</div>' + '</td>' + '<td data-th="상태"><span class="admin-tag is-mute">수정 중</span></td>' + '<td data-th="주의사항"><input id="editNotice" class="admin-input" type="text" value="' + escapeHtml(item.notice || '') + '" placeholder="주의사항"></td>' + '<td data-th="관리">' + '<div class="admin-row-actions">' + '<button onclick="saveEditItem(' + index + ')" class="admin-btn is-primary">저장</button>' + '<button onclick="cancelEditItem()" class="admin-btn">취소</button>' + '</div>' + '</td>' + '</tr>';
      }

      // ── 일반 행 ──
      var max = getMaxStock(item);
      var st = stockState(item);
      var tag = '<span class="admin-tag ' + st.cls + '">' + st.label + '</span>';
      var iconLabel = item.icon ? escapeHtml(item.icon) + ' ' : '';
      return '<tr draggable="true" data-index="' + index + '" style="cursor: move;">' + '<td data-th="순서" style="text-align: center; white-space: nowrap;">' + '<button onclick="moveItem(' + index + ', -1)" class="admin-move" ' + (index === 0 ? 'disabled' : '') + '>▲</button>' + '<button onclick="moveItem(' + index + ', 1)" class="admin-move" ' + (index === items.length - 1 ? 'disabled' : '') + '>▼</button>' + '</td>' + '<td data-th="물품명"><strong>' + iconLabel + escapeHtml(item.name) + '</strong></td>' + '<td data-th="구분"><span class="admin-tag is-mute">' + escapeHtml(item.type) + '</span></td>' + '<td data-th="재고">' + '<div class="admin-stepper">' + '<button onclick="updateStock(' + index + ', -1)"' + (stock <= 0 ? ' disabled' : '') + '>−</button>' + '<span>' + stock + '<i>/' + max + '</i></span>' + '<button onclick="updateStock(' + index + ', 1)"' + (max > 0 && stock >= max ? ' disabled' : '') + '>＋</button>' + '</div>' + '</td>' + '<td data-th="상태">' + tag + '</td>' + '<td data-th="주의사항" style="font-size: 0.7rem; color: var(--text-3);">' + escapeHtml(item.notice || '-') + '</td>' + '<td data-th="관리">' + '<div class="admin-row-actions">' + '<button onclick="startEditItem(' + index + ')" class="admin-btn">수정</button>' + '<button onclick="deleteItem(' + index + ')" class="admin-btn is-danger">삭제</button>' + '</div>' + '</td>' + '</tr>';
    }).join('') + '</table>';
  }
  if (adminStockTable) adminStockTable.innerHTML = stockHtml;
  labelTableCells(adminStockTable);
  // 수정 모드에 들어가면 물품명 칸에 바로 커서를 둔다
  if (adminEditIndex !== -1 && adminEditFocus) {
    adminEditFocus = false;
    var editNameEl = document.getElementById('editName');
    if (editNameEl) {
      editNameEl.focus();
      editNameEl.select();
    }
  }



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

  // 2. 현재 대여 기록 테이블 렌더링 (검색)
  var lendRows = borrowedRecords.filter(function (r) {
    if (!adminLendQuery) return true;
    var hay = (String(r.name || '') + ' ' + String(r.studentId || '') + ' ' + String(r.itemName || '')).toLowerCase();
    return hay.indexOf(adminLendQuery) !== -1;
  });
  if (lendRows.length === 0) {
    if (adminBorrowedTable) adminBorrowedTable.innerHTML = '<p class="admin-empty">' + (borrowedRecords.length === 0 ? '현재 대여된 물품이 없습니다.' : '검색 결과가 없습니다.') + '</p>';
    renderLoginLog();
    return;
  }
  var nowForLend = new Date();
  var borrowedHtml = '<table style="table-layout: auto;"><tr class="is-head"><th>물품</th><th>학번</th><th>이름</th><th>연락처</th><th>반납 기한</th></tr>' + lendRows.map(function (record) {
    var dueLabelWithoutTime = (record.dueLabel || '').replace(' 18:00', '');
    var isOverdue = new Date(record.dueDate) < nowForLend;
    return '<tr>' + '<td data-th="물품" style="white-space: nowrap;">' + escapeHtml(record.itemName) + '</td>' + '<td data-th="학번" style="white-space: nowrap;">' + escapeHtml(record.studentId) + '</td>' + // 이름·연락처는 서버(getAllAdmin)에서 받아온 동안에만 채워진다.
    // 오프라인이거나 로그아웃 후에는 기기에 남기지 않으므로 '-' 로 표시된다.
    '<td data-th="이름" style="white-space: nowrap;"><strong>' + escapeHtml(record.name || '-') + '</strong></td>' + '<td data-th="연락처" style="white-space: nowrap;">' + escapeHtml(record.phone || '-') + '</td>' + '<td data-th="반납 기한" style="white-space: nowrap;"><span class="admin-tag ' + (isOverdue ? 'is-bad' : 'is-warn') + '">' + escapeHtml(dueLabelWithoutTime) + (isOverdue ? ' 연체' : '') + '</span></td>' + '</tr>';
  }).join('') + '</table>';
  if (adminBorrowedTable) adminBorrowedTable.innerHTML = borrowedHtml;
  labelTableCells(adminBorrowedTable);


  // 로그인 기록 렌더링
  renderLoginLog();
  } catch (e) {
    // req4: 잘못된 데이터로도 렌더가 예외로 죽지 않도록 방어
    console.error('renderAdminData failed:', e);
  }
};

// (호출된 적 없고 선언되지 않은 adminChangeLog 를 참조하던 renderChangeLog 는 제거.
//  실제로 쓰이는 것은 아래 renderChangeLogView 다.)

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
  var logHtml = "\n                <table>\n                    <tr class=\"is-head\"><th>\uC2DC\uAC04</th><th>\uC791\uC5C5</th><th>\uC0C1\uC138 \uB0B4\uC5ED</th></tr>\n                    ".concat(recentLogs.map(function (log) {
    return "\n                        <tr>\n                            <td style=\"font-size: 0.85rem;\">".concat(formatTime(log.time), "</td>\n                            <td style=\"color: #9aa9ff; font-weight: 600;\">").concat(escapeHtml(log.action), "</td>\n                            <td style=\"font-size: 0.9rem;\">").concat(escapeHtml(log.details), "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  changeLogView.innerHTML = logHtml;
  labelTableCells(changeLogView);
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
  var formatPhone = function formatPhone(phone) {
    var s = String(phone || '');
    if (s.length === 10 && s.charAt(0) !== '0') s = '0' + s;
    return s;
  };
  var logHtml = "\n                <table style=\"table-layout: auto;\">\n                    <tr class=\"is-head\"><th>\uC2DC\uAC04</th><th>\uC774\uB984</th><th>\uD559\uBC88</th><th>\uC5F0\uB77D\uCC98</th></tr>\n                    ".concat(recentLogs.map(function (log) {
    return "\n                        <tr>\n                            <td style=\"font-size: 0.85rem; white-space: nowrap;\">".concat(formatTime(log.time), "</td>\n                            <td style=\"white-space: nowrap;\">").concat(escapeHtml(log.name), "</td>\n                            <td style=\"white-space: nowrap;\">").concat(escapeHtml(log.studentId), "</td>\n                            <td style=\"white-space: nowrap;\">").concat(escapeHtml(formatPhone(log.phone)), "</td>\n                        </tr>\n                    ");
  }).join(''), "\n                </table>\n            ");
  loginLogTable.innerHTML = logHtml;
  labelTableCells(loginLogTable);
  // 데스크탑 팝업에도 동일 내용 복사
  var loginLogTable2 = document.getElementById("loginLogTable2");
  if (loginLogTable2) loginLogTable2.innerHTML = logHtml;
};

// 연체자 데이터 렌더링 함수
var renderOverdueData = function renderOverdueData() {
  if (!overdueTable) return;
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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 연체 벌금 계산 (1일당 2000원)
  var calculateFine = function calculateFine(dueDate) {
    return calculateOverdueDays(dueDate) * 2000;
  };

  // 강제 반납 버튼은 onclick 문자열로 값을 넘기지 않는다.
  // 예전에는 escapeHtml 로 감싼 값을 다시 작은따옴표 문자열에 끼워 넣었는데,
  // escapeHtml 이 이미 따옴표를 엔티티로 바꾼 뒤라 이스케이프가 무의미했고,
  // 무엇보다 forceReturn 이 HTML 이스케이프된 이름을 받아 원본 기록과
  // 비교에 실패해 강제 반납이 조용히 안 되는 경우가 있었다.
  // 이제 data-* 로 원본 값을 담고 이벤트 위임으로 처리한다.
  var rowsHtml = overdueRecords.map(function (record) {
    var overdueDays = calculateOverdueDays(record.dueDate);
    var fine = calculateFine(record.dueDate);
    return '<tr>' +
      '<td style="white-space: nowrap;">' + escapeHtml(record.itemName) + '</td>' +
      '<td style="white-space: nowrap;">' + escapeHtml(String(record.studentId)) + '</td>' +
      '<td style="white-space: nowrap;">' + escapeHtml(record.name || '-') + '</td>' +
      '<td style="white-space: nowrap;">' + escapeHtml(record.phone || '-') + '</td>' +
      '<td style="color: #ff8f8f; white-space: nowrap; min-width: 120px;">' + escapeHtml(record.dueLabel) + '</td>' +
      '<td style="color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 80px;">' + (parseInt(overdueDays, 10) || 0) + '일</td>' +
      '<td style="color: #ff8f8f; font-weight: 600; white-space: nowrap; min-width: 100px;">' + (parseInt(fine, 10) ? fine.toLocaleString() : '0') + '원</td>' +
      '<td style="white-space: nowrap;">' +
        '<button type="button" class="admin-btn is-danger" data-force-return' +
        ' data-student-id="' + escapeHtml(String(record.studentId)) + '"' +
        ' data-item-name="' + escapeHtml(String(record.itemName)) + '"' +
        ' data-due-date="' + escapeHtml(String(record.dueDate)) + '">강제 반납</button>' +
      '</td>' +
      '</tr>';
  }).join('');

  overdueTable.innerHTML =
    '<table style="table-layout: auto; min-width: 100%;">' +
    '<tr class="is-head"><th>물품</th><th>학번</th><th>이름</th><th>연락처</th>' +
    '<th>반납 기한</th><th>연체 일수</th><th>연체 벌금</th><th>관리</th></tr>' +
    rowsHtml +
    '</table>';
  labelTableCells(overdueTable);
};

// 강제 반납 버튼 (이벤트 위임)
if (overdueTable) {
  overdueTable.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-force-return]') : null;
    if (!btn) return;
    // dataset 값은 브라우저가 HTML 엔티티를 이미 되돌려 주므로 원본 그대로다
    window.forceReturn(btn.dataset.studentId, btn.dataset.itemName, btn.dataset.dueDate);
  });
}
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

  // 활성/비활성 상태는 CSS(.filter-btn.active)가 담당한다
  [filterAllBtn, filterBorrowBtn, filterConsumeBtn].forEach(function (btn) {
    if (btn) btn.classList.remove('active');
  });
  var activeBtn = filter === 'all' ? filterAllBtn : filter === 'borrow' ? filterBorrowBtn : filterConsumeBtn;
  if (activeBtn) activeBtn.classList.add('active');
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
// 그리드도 같은 이유로 직전 결과를 기억해 둔다. 여기는 twemoji 가 이모지를 CDN 이미지로
// 바꿔 달기까지 해서, 다시 그릴 때마다 글자→이미지 교체가 눈에 띄게 번쩍인다.
var lastItemGridHtml = null;
var renderItems = function renderItems() {
  if (!itemGrid) return;
  // 재고가 바뀔 때마다 홈 화면 칩도 같이 갱신한다
  renderHomeStock();

  // 필터링
  var filteredItems = items;
  var isReturnFlow = flowMode === 'return';

  // 반납 흐름에서는 이 사용자가 실제로 빌린 물품만 보여준다.
  // 카탈로그를 걸러내는 방식이면 물품이 삭제·개명되었거나 이름에 공백이 섞인 순간
  // 목록이 비어 반납할 방법이 사라진다(완료 화면에는 기록이 그대로 남아 혼란).
  // 그래서 목록의 출처를 '내 대여 기록' 쪽으로 뒤집고, 카탈로그에 없으면 임시 카드로 띄운다.
  if (isReturnFlow) {
    filteredItems = myBorrowedRecords().map(function (record) {
      return findItemByName(record.itemName) || {
        name: normName(record.itemName),
        type: '대여',
        stock: 0,
        icon: '📦',
        notice: '',
        missingFromCatalog: true
      };
    });
  }

  // 타입 필터링 (반납 흐름에서는 필터 UI가 숨겨져 있으므로 이전 선택이 남아 있어도 무시)
  if (isReturnFlow) {
    // 반납 목록은 이미 '내가 빌린 것'으로 확정되어 있어 추가 필터가 필요 없다
  } else if (currentFilter === 'borrow') {
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
    var message = isReturnFlow ? '반납할 물품이 없습니다. 대여 중인 물품이 확인되지 않아요.' : searchQuery ? '"' + escapeHtml(searchQuery) + '"에 대한 검색 결과가 없습니다.' : currentFilter === 'borrow' ? '대여 가능한 물품이 없습니다.' : currentFilter === 'consume' ? '소모품이 없습니다.' : '물품이 없습니다.';
    var emptyHtml = '<div class="item-grid-empty">' + message + '</div>';
    if (emptyHtml !== lastItemGridHtml) {
      itemGrid.innerHTML = emptyHtml;
      lastItemGridHtml = emptyHtml;
    }
    return;
  }
  var gridHtml = filteredItems.map(function (item) {
    // 원본 배열에서의 인덱스 찾기
    var originalIndex = items.indexOf(item);
    var stock = parseInt(item.stock) || 0;
    var outOfStock = stock <= 0;
    var iconHtml = '';
    if (item.icon) {
      iconHtml = '<span style="font-size: 2.5rem; flex-shrink: 0;">' + escapeHtml(item.icon) + '</span>';
    } else if (item.image) {
      iconHtml = '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '" style="width: 50px; height: 50px; object-fit: contain; flex-shrink: 0;">';
    }
    var actionsHtml;
    if (isReturnFlow) {
      // 반납 흐름: 목록 자체가 대여 중인 물품이므로 반납 버튼만 노출한다
      // 반납 버튼은 인덱스 대신 물품명을 넘긴다 (카탈로그에 없는 임시 카드도 처리해야 함)
      actionsHtml = '<button class="borrow" data-action="return" data-index="' + originalIndex + '" data-item-name="' + escapeHtml(item.name) + '">반납하기</button>';
    } else if (item.type === "대여") {
      // 대여 흐름에서는 대여 버튼만 둔다. 반납은 홈의 '반납하기'로 들어오는
      // 별도 흐름이 담당하므로 여기 반납 버튼은 오히려 오조작을 부른다.
      actionsHtml = '<button class="borrow' + (outOfStock ? ' disabled' : '') + '" data-action="borrow" data-index="' + originalIndex + '"' + (outOfStock ? ' disabled title="재고가 없습니다"' : '') + '>' + (outOfStock ? '재고 없음' : '대여하기') + '</button>';
    } else {
      actionsHtml = '<button class="consume' + (outOfStock ? ' disabled' : '') + '" data-action="consume" data-index="' + originalIndex + '"' + (outOfStock ? ' disabled title="재고가 없습니다"' : '') + '>' + (outOfStock ? '재고 없음' : '수령하기') + '</button>';
    }
    // 반납 흐름에서는 재고보다 반납 기한이 필요한 정보다
    var metaText;
    if (isReturnFlow) {
      var myRecord = null;
      for (var i = 0; i < borrowedRecords.length; i++) {
        var r = borrowedRecords[i];
        if (currentUser && String(r.studentId) === String(currentUser.studentId) && normName(r.itemName) === normName(item.name)) {
          myRecord = r;
          break;
        }
      }
      metaText = myRecord && myRecord.dueLabel ? '대여 중 \xB7 반납 기한 ' + escapeHtml(myRecord.dueLabel) : '대여 중';
    } else {
      metaText = escapeHtml(item.type) + ' \xB7 재고 ' + stock + '개';
    }

    return '<div class="item-card">' + iconHtml + '<div class="item-card-info">' + '<strong>' + escapeHtml(item.name) + '</strong>' + '<small>' + metaText + '</small>' + '</div>' + '<div class="item-card-actions">' + actionsHtml + '</div>' + '</div>';
  }).join("");
  // 내용이 그대로면 DOM 도 twemoji 변환도 건드리지 않는다
  if (gridHtml === lastItemGridHtml) return;
  itemGrid.innerHTML = gridHtml;
  lastItemGridHtml = gridHtml;
  // Twemoji로 이모지를 이미지로 변환 (구형 브라우저 지원)
  if (typeof twemoji !== 'undefined') {
    twemoji.parse(itemGrid, {
      folder: 'svg',
      ext: '.svg'
    });
  }
};
renderItems();

// 물품 목록 드래그 스크롤 기능
var isDragging = false;
var startY = 0;
var scrollTop = 0;
on(itemGrid, 'mousedown', function (e) {
  // 버튼 클릭이 아닌 경우에만 드래그 시작
  if (e.target.tagName !== 'BUTTON') {
    isDragging = true;
    startY = e.pageY - itemGrid.offsetTop;
    scrollTop = itemGrid.scrollTop;
    itemGrid.style.cursor = 'grabbing';
  }
});
on(itemGrid, 'mouseleave', function () {
  isDragging = false;
  itemGrid.style.cursor = 'grab';
});
on(itemGrid, 'mouseup', function () {
  isDragging = false;
  itemGrid.style.cursor = 'grab';
});
on(itemGrid, 'mousemove', function (e) {
  if (!isDragging) return;
  e.preventDefault();
  var y = e.pageY - itemGrid.offsetTop;
  var walk = (y - startY) * 2; // 스크롤 속도 조절
  itemGrid.scrollTop = scrollTop - walk;
});

// 터치 이벤트 지원
var touchStartY = 0;
var touchScrollTop = 0;
on(itemGrid, 'touchstart', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    touchStartY = e.touches[0].pageY;
    touchScrollTop = itemGrid.scrollTop;
  }
}, {
  passive: true
});
on(itemGrid, 'touchmove', function (e) {
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
on(adminStockTable, 'mousedown', function (e) {
  // 버튼 클릭이 아닌 경우에만 드래그 시작
  if (e.target.tagName !== 'BUTTON') {
    adminIsDragging = true;
    adminStartY = e.pageY - adminStockTable.offsetTop;
    adminScrollTop = adminStockTable.scrollTop;
    adminStockTable.style.cursor = 'grabbing';
  }
});
on(adminStockTable, 'mouseleave', function () {
  adminIsDragging = false;
  adminStockTable.style.cursor = 'grab';
});
on(adminStockTable, 'mouseup', function () {
  adminIsDragging = false;
  adminStockTable.style.cursor = 'grab';
});
on(adminStockTable, 'mousemove', function (e) {
  if (!adminIsDragging) return;
  e.preventDefault();
  var y = e.pageY - adminStockTable.offsetTop;
  var walk = (y - adminStartY) * 2; // 스크롤 속도 조절
  adminStockTable.scrollTop = adminScrollTop - walk;
});

// 터치 이벤트 지원
var adminTouchStartY = 0;
var adminTouchScrollTop = 0;
on(adminStockTable, 'touchstart', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    adminTouchStartY = e.touches[0].pageY;
    adminTouchScrollTop = adminStockTable.scrollTop;
  }
}, {
  passive: true
});
on(adminStockTable, 'touchmove', function (e) {
  if (e.target.tagName !== 'BUTTON') {
    var touchY = e.touches[0].pageY;
    var walk = (touchY - adminTouchStartY) * 2;
    adminStockTable.scrollTop = adminTouchScrollTop - walk;
  }
}, {
  passive: true
});

// 초기 로드 시 홈 화면으로
async function initApp() {
  try {
    const data = await loadData();
    items = data.items;
    borrowedRecords = data.borrowedRecords;

    // 변경 로그는 localStorage 캐시에서 (개인정보가 없다)
    changeLog = await loadChangeLog();
    // 로그인 기록은 개인정보라 기기에 캐시하지 않는다.
    // 관리자 화면에 들어갈 때 getAllAdmin 으로 서버에서 받아 온다.
    loginLog = [];
    console.log('Data loaded successfully');

    renderItems();
  } catch (err) {
    console.error('Initialization error:', err);
    // 최종 폴백
    try {
      const savedItems = loadFromLocalCache('kiosk_items');
      if (savedItems) items = savedItems;
      const savedBorrowed = loadFromLocalCache('kiosk_borrowed');
      if (savedBorrowed) borrowedRecords = dedupBorrowed(savedBorrowed);
      const savedChangeLog = loadFromLocalCache('kiosk_changeLog');
      if (savedChangeLog) changeLog = savedChangeLog;
      console.log('Fallback: Data loaded from localStorage');
      renderItems();
    } catch (e2) {
      console.error('localStorage fallback error:', e2);
    }
  }

  // 못 보낸 변경이 남아 있으면 이어서 보낸다 (앱 재시작 후 복구)
  restorePendingWrites();

  // initApp 은 서버 응답을 기다리느라 수 초가 걸릴 수 있다. 그 사이 사용자가
  // 이미 다른 화면으로 넘어갔다면 홈으로 되돌리지 않는다 (입력 중이던 내용 보호).
  if (!currentStepName || currentStepName === 'home') {
    showStep('home');
  }
}
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
    // 월~목 대여만 "같은 주 안에 안 내면 주말에도 벌금" 안내가 맞다.
    // 예전 조건(day <= 4)은 일요일(0)까지 포함해, 월요일이 기한인 일요일 대여에도
    // 주말 벌금 문구가 붙었다.
    isWeekendPenalty: day >= 1 && day <= 4
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
    return "\n                <li>\n                    <strong>".concat(escapeHtml(log.user.name), "</strong> \xB7 ").concat(escapeHtml(log.item), " (").concat(escapeHtml(log.action), ")<br>\n                    ").concat(escapeHtml(log.message), "<br>\n                    ").concat(escapeHtml(log.time), "\n                </li>\n            ");
  }).join("");
};

// 키보드 올라올 때 입력 필드 보이게 스크롤
var formInputs = document.querySelectorAll('#user-form input');
for (var i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('focus', function () {
    var self = this;
    setTimeout(function () {
      self.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }, 500);
    setTimeout(function () {
      self.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }, 1000);
  });
}

// 개인정보 동의 팝업
var privacyConsent = document.getElementById("privacyConsent");
var privacyError = document.getElementById("privacyError");
var privacyDetail = document.getElementById("privacyDetail");
var privacyModal = document.getElementById("privacyModal");
var privacyModalClose = document.getElementById("privacyModalClose");
if (privacyDetail) {
  privacyDetail.addEventListener("click", function (e) {
    e.preventDefault();
    if (privacyModal) privacyModal.style.display = "flex";
  });
}
if (privacyModalClose) {
  privacyModalClose.addEventListener("click", function () {
    if (privacyModal) privacyModal.style.display = "none";
  });
}
if (privacyModal) {
  privacyModal.addEventListener("click", function (e) {
    if (e.target === privacyModal) privacyModal.style.display = "none";
  });
}
on(form, "submit", function (event) {
  event.preventDefault();
  selectionResult.classList.add("hidden");
  selectionResult.textContent = "";

  // 입력값은 원본 그대로 다룬다.
  // 예전에는 여기서 escapeHtml 을 걸어 그 결과를 currentUser·시트에까지 저장했다.
  // 이스케이프는 화면에 그릴 때(출력 시점)만 하는 것이 원칙이고, 저장 시점에
  // 걸면 검증도 이스케이프된 문자열을 대상으로 돌아 규칙이 어긋난다.
  // (아래 렌더링 경로는 모두 escapeHtml 을 거친다)
  var name = form.name.value.trim();
  var studentId = form.studentId.value.trim();
  var phone = form.phone.value.trim();
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

  // 개인정보 동의 검증
  if (privacyConsent && !privacyConsent.checked) {
    setError(privacyError, "개인정보 수집·이용에 동의해주세요.");
    isValid = false;
  } else if (privacyError) {
    setError(privacyError, "");
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
  var userInfoHtml;
  if (flowMode === 'return') {
    // 반납 흐름에서는 새 대여 기한·벌금 안내가 맞지 않는다
    userInfoHtml = '<strong>' + escapeHtml(name) + ' (' + escapeHtml(studentId) + ')</strong><br>' +
      '연락처: ' + escapeHtml(phone) + '<br>' +
      '<span style="color: #6ee7a8; font-weight: 600;">반납 진행 중</span>' +
      '<ul>' +
      '<li>반납할 물품을 눌러 주세요</li>' +
      '<li>물품 상태 이상 시 관리자에게 알려주세요</li>' +
      '</ul>';
  } else {
    userInfoHtml = '<strong>' + escapeHtml(name) + ' (' + escapeHtml(studentId) + ')</strong><br>' +
      '연락처: ' + escapeHtml(phone) + '<br>' +
      '반납 기한: <span style="color: #ff7a7a; font-weight: 600;">' + escapeHtml(currentDueInfo.label) + '</span>' +
      '<ul>' +
      '<li>기한 초과 시 1일당 2,000원 벌금 (주말 포함)</li>' +
      '<li>' + (currentDueInfo.isWeekendPenalty ? '같은 주 내 미반납 시 주말에도 벌금이 부과됩니다.' : '금요일 대여는 다음 주 월요일 18:00까지 반납') + '</li>' +
      '<li>물품 분실·파손 시 동일 제품으로 변상</li>' +
      '</ul>';
  }
  // 툴바 칩 — 물품 선택 화면에서 상시 보이는 요약.
  // 상세 안내(벌금·변상 조건)는 완료 화면 요약(summaryBox)에 그대로 남는다.
  if (userChips) {
    var chipsHtml = '<span class="user-chip"><b>' + escapeHtml(name) + '</b> ' + escapeHtml(studentId) + '</span>';
    if (flowMode === 'return') {
      chipsHtml += '<span class="user-chip is-return">반납 진행 중</span>';
    } else {
      chipsHtml += '<span class="user-chip is-due">반납 ' + escapeHtml(currentDueInfo.label) + '</span>';
    }
    userChips.innerHTML = chipsHtml;
  }
  if (summaryBox) {
    summaryBox.innerHTML = userInfoHtml;
  }
  showStep("items");
});

// Debounce 기능
var isProcessing = false;
var debounceTime = 400; // 400ms

on(itemGrid, "click", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(event) {
    var _event$target$dataset, action, index, item, alreadyBorrowed, noticeMsg, noticeLines, _dueForNotice, dueInfo, borrowRecord, dueLabel, borrowedIndex, removedRecord;
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
          _event$target$dataset = event.target.dataset, action = _event$target$dataset.action, index = _event$target$dataset.index;
          item = items[Number(index)];
          // 반납은 인덱스가 아니라 물품명으로 찾는다. 카탈로그에서 삭제·개명된 물품도
          // 기록만 있으면 반납할 수 있어야 한다(안 그러면 1인 1물품 규칙에 영구히 갇힌다).
          // 이름이 붙어 있을 때만 이름 기준으로 갈아탄다. 이름이 없는데도 덮어쓰면
          // 이름이 빈 물품이 만들어져 대여 기록과 영영 매칭되지 않는다(인덱스로 폴백).
          if (action === "return" && normName(event.target.dataset.itemName)) {
            item = findItemByName(event.target.dataset.itemName) || {
              name: normName(event.target.dataset.itemName),
              missingFromCatalog: true
            };
          }
          // 목록이 다시 그려지는 사이 인덱스가 어긋나면 item 이 없을 수 있다.
          // 예전에는 곧바로 item.stock 을 읽어 예외로 죽었다.
          if (!item || !action) {
            return _context16.a(2);
          }
          if (currentUser) {
            _context16.n = 3;
            break;
          }
          showConfirm({
            icon: '⚠️',
            title: '알림',
            message: '먼저 학생 정보를 입력해주세요.',
            autoClose: 2000
          });
          return _context16.a(2);
        case 3:
          // 재고가 0 이어도 여기서 조용히 return 하지 않는다. 다른 기기가 마지막 재고를
          // 가져간 직후에는 이 화면이 옛 재고를 그리고 있어 버튼이 살아 있는데,
          // 그때 눌러도 아무 반응이 없어 고장으로 보였다(아래 안내 문구는 죽은 코드였다).
          // 재고 부족 판정은 대여·수령 각 분기가 안내와 함께 처리한다.
          _context16.n = 4;
          break;
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
          // 1인 1물품: 이미 대여 중인 물품이 하나라도 있으면 추가 대여를 막는다.
          // (같은 물품이든 다른 물품이든 먼저 반납해야 다시 빌릴 수 있다)
          alreadyBorrowed = borrowedRecords.filter(function (record) {
            return String(record.studentId) === String(currentUser.studentId);
          })[0];
          if (!alreadyBorrowed) {
            _context16.n = 6;
            break;
          }
          if (normName(alreadyBorrowed.itemName) === normName(item.name)) {
            showSelectionResult("\u26A0\uFE0F \uC774\uBBF8 ".concat(item.name, "\uC744(\uB97C) \uB300\uC5EC \uC911\uC785\uB2C8\uB2E4.\n\uBA3C\uC800 \uBC18\uB0A9 \uD6C4 \uB2E4\uC2DC \uB300\uC5EC\uD574\uC8FC\uC138\uC694."), false);
          } else {
            // \uD55C \uBC88\uC5D0 \uD55C \uAC1C\uB9CC \uB300\uC5EC\uD560 \uC218 \uC788\uB2E4\uB294 \uADDC\uCE59\uC744 \uC774\uC720\uC640 \uD568\uAED8 \uC54C\uB9B0\uB2E4
            showSelectionResult("\u26A0\uFE0F \uD55C \uBC88\uC5D0 \uD55C \uAC1C\uC758 \uBB3C\uD488\uB9CC \uB300\uC5EC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.\n\uD604\uC7AC ".concat(alreadyBorrowed.itemName, "\uC744(\uB97C) \uB300\uC5EC \uC911\uC785\uB2C8\uB2E4. \uBA3C\uC800 \uBC18\uB0A9\uD574\uC8FC\uC138\uC694."), false);
          }
          return _context16.a(2);
        case 6:
          // 주의사항 메시지 구성. 예전에는 떠 있는 정보 카드에 상시 표시했지만
          // 화면을 가렸고, 정작 필요한 시점은 빌리는 순간이므로 이 확인 창으로 옮겼다.
          _dueForNotice = currentDueInfo || getDueInfo();
          noticeLines = [];
          if (item.notice && item.notice.trim()) {
            noticeLines.push("⚠️ " + escapeHtml(item.notice));
          }
          // 반납 기한은 가장 중요한 정보라 붉게 강조한다
          noticeLines.push("📅 반납 기한: <span style=\"color: #ff7a7a; font-weight: 700;\">" + escapeHtml(_dueForNotice.label) + "</span>");
          noticeLines.push("💸 기한 초과 시 1일당 2,000원 (주말 포함)");
          if (_dueForNotice.isWeekendPenalty) {
            noticeLines.push("주말에도 벌금이 부과됩니다.");
          }
          noticeLines.push("🔧 분실·파손 시 동일 제품으로 변상");
          noticeMsg = noticeLines.join("<br>");
          _context16.n = 7;
          return showConfirm({
            icon: item.icon || '📦',
            title: "".concat(item.name, " \uB300\uC5EC"),
            stock: item.stock,
            messageHtml: noticeMsg
          });
        case 7:
          // 사용자가 취소를 누르면 대여를 진행하지 않는다
          if (!_context16.v) {
            return _context16.a(2);
          }
          dueInfo = currentDueInfo || getDueInfo();
          borrowRecord = {
            studentId: currentUser.studentId,
            name: currentUser.name,
            phone: currentUser.phone,
            itemName: item.name,
            dueLabel: dueInfo.label,
            dueDate: dueInfo.date.toISOString(),
            borrowedAt: new Date().toISOString()
          };
          // id 는 로그/정렬용 (중복 판정에는 사용하지 않음 - 판정은 borrowKey)
          borrowRecord.id = borrowRecord.studentId + '|' + borrowRecord.itemName + '|' + borrowRecord.borrowedAt;
          borrowedRecords.push(borrowRecord);
          borrowedRecords = dedupBorrowed(borrowedRecords); // 어떤 경로로도 같은 기록이 두 번 남지 않게
          item.stock = (Number(item.stock) || 0) - 1;
          dueLabel = (currentDueInfo || getDueInfo()).label;
          saveLocalCache(); // 로컬 캐시만 저장 (서버는 아래 증분 동기화로 처리)
          // 재고 차감은 서버가 addBorrowed 안에서 직접 −1 한다.
          // 예전처럼 클라이언트가 계산한 절대값을 updateStock 으로 보내면,
          // API 키만 있으면 누구나 모든 재고를 0으로 만들 수 있었다.
          queueWrite({
            action: 'addBorrowed',
            record: borrowRecord
          });
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uB300\uC5EC \uC644\uB8CC!\n\uBC18\uB0A9 \uC608\uC815\uC77C\uC740 ").concat(dueLabel, "\uC785\uB2C8\uB2E4.\n\n\uAE30\uD55C \uCD08\uACFC \uC2DC 1\uC77C\uB2F9 2,000\uC6D0 \uBC8C\uAE08(\uC8FC\uB9D0 \uD3EC\uD568)\uC774 \uBD80\uACFC\uB429\uB2C8\uB2E4."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "대여",
            message: "\uBC18\uB0A9 \uC608\uC815\uC77C ".concat(dueLabel),
            time: formatTime(new Date())
          });
          addChangeLog("물품 대여", "".concat(currentUser.name, "(").concat(currentUser.studentId, ") - ").concat(item.name, " \uB300\uC5EC (\uBC18\uB0A9: ").concat(dueLabel, ")"));
          return _context16.a(2);
        case 8:
          if (!(action === "return")) {
            _context16.n = 10;
            break;
          }
          borrowedIndex = borrowedRecords.findIndex(function (record) {
            return String(record.studentId) === String(currentUser.studentId) && normName(record.itemName) === normName(item.name);
          });
          if (!(borrowedIndex === -1)) {
            _context16.n = 9;
            break;
          }
          showSelectionResult("\u26A0\uFE0F ".concat(item.name, " \uB300\uC5EC \uC774\uB825\uC774 \uD655\uC778\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBB38\uC758\uD574\uC8FC\uC138\uC694."), false);
          return _context16.a(2);
        case 9:
          removedRecord = borrowedRecords[borrowedIndex];
          borrowedRecords.splice(borrowedIndex, 1);
          // 카탈로그에 없는 물품이면 되돌릴 재고 자체가 없다
          if (!item.missingFromCatalog) {
            item.stock = (Number(item.stock) || 0) + 1;
          }
          saveLocalCache(); // 로컬 캐시만 저장 (서버는 아래 증분 동기화로 처리)
          // 재고 복구는 서버가 removeBorrowed 안에서 실제 삭제된 건수만큼 +1 한다
          // (중복 반납 요청이 재고를 부풀리지 않도록 서버가 멱등 처리)
          queueWrite({
            action: 'removeBorrowed',
            studentId: removedRecord.studentId,
            itemName: removedRecord.itemName
          });
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uBC18\uB0A9 \uCC98\uB9AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC0C1\uD0DC \uC774\uC0C1 \uC2DC \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBCF4\uACE0\uD574\uC8FC\uC138\uC694."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "반납",
            message: "정상 반납",
            time: formatTime(new Date())
          });
          addChangeLog("물품 반납", "".concat(currentUser.name, "(").concat(currentUser.studentId, ") - ").concat(item.name, " \uBC18\uB0A9"));
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
          item.stock = (Number(item.stock) || 0) - 1;
          saveLocalCache(); // 로컬 캐시만 저장 (서버는 아래 증분 동기화로 처리)
          // 재고 −1 과 누적 카운터 +1 을 서버가 한 번에 처리한다
          queueWrite({
            action: 'recordConsume',
            itemName: item.name
          });
          renderItems();
          showSelectionResult("\u2705 ".concat(item.name, " \uC218\uB839 \uC644\uB8CC! \uC18C\uBAA8\uD488\uC740 \uBC18\uB0A9\uD558\uC9C0 \uC54A\uC544\uB3C4 \uB429\uB2C8\uB2E4."), true);
          addLog({
            user: currentUser,
            item: item.name,
            action: "소모품 수령",
            message: "소모품은 반납 불필요",
            time: formatTime(new Date())
          });
          addChangeLog("소모품 수령", "".concat(currentUser.name, "(").concat(currentUser.studentId, ") - ").concat(item.name, " \uC218\uB839"));
        case 12:
          return _context16.a(2);
      }
    }, _callee16);
  }));
  return function (_x10) {
    // 중복 처리 방지: 클릭한 버튼을 즉시 비활성화하고, 작업이 실제로 끝날 때(확인창 응답·저장 완료 후) 해제
    var evt = arguments[0];
    var btn = evt && evt.target && evt.target.tagName === "BUTTON" ? evt.target : null;
    if (btn) btn.disabled = true;
    var safety = setTimeout(function () {
      isProcessing = false;
      if (btn) btn.disabled = false;
    }, 15000); // 만약을 대비한 안전장치 (핸들러가 멈춰도 잠금/비활성이 영구화되지 않도록)
    var release = function release() {
      clearTimeout(safety);
      isProcessing = false;
      if (btn) btn.disabled = false;
    };
    var p = _ref16.apply(this, arguments);
    if (p && typeof p.then === "function") {
      p.then(release, release);
    } else {
      release();
    }
    return p;
  };
}());
on(editInfoBtn, "click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
  var userBorrowed, warningMsg, confirmed;
  return _regenerator().w(function (_context17) {
    while (1) switch (_context17.n) {
      case 0:
        // 현재 사용자의 대여 기록 확인
        userBorrowed = borrowedRecords.filter(function (r) {
          return String(r.studentId) === String(currentUser && currentUser.studentId);
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
        showStep("home");
      case 3:
        return _context17.a(2);
    }
  }, _callee17);
})));
on(finishBtn, "click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
  var userBorrowed, summaryMsg, confirmed;
  return _regenerator().w(function (_context18) {
    while (1) switch (_context18.n) {
      case 0:
        // 현재 사용자의 대여 기록 확인
        userBorrowed = borrowedRecords.filter(function (r) {
          return String(r.studentId) === String(currentUser && currentUser.studentId);
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
        showStep("home");
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
      autoLogoutTimer = null;
      // 발동 시점에도 여전히 물품 선택 화면인지 재확인 (다른 화면/새 사용자 입력을 초기화하지 않도록)
      if (!currentUser || stepItems.classList.contains('hidden')) {
        return;
      }
      form.reset();
      studentIdError.textContent = "";
      phoneError.textContent = "";
      selectionResult.classList.add("hidden");
      selectionResult.textContent = "";
      currentUser = null;
      currentDueInfo = null;
      showStep("home");
    }, AUTO_LOGOUT_TIME);
  }
};

// 화면 전환·로그아웃 시 자동 로그아웃 타이머를 명시적으로 해제
var clearAutoLogout = function clearAutoLogout() {
  if (autoLogoutTimer) {
    clearTimeout(autoLogoutTimer);
    autoLogoutTimer = null;
  }
};

// 사용자 활동 감지
// mousemove 는 초당 수십 번 오므로 그때마다 clearTimeout+setTimeout 을 돌리면
// 구형 태블릿에서 부담이 된다. 1초에 한 번만 타이머를 다시 건다.
var lastActivityReset = 0;
var throttledResetAutoLogout = function throttledResetAutoLogout() {
  var now = Date.now();
  if (now - lastActivityReset < 1000) return;
  lastActivityReset = now;
  resetAutoLogout();
};
['click', 'touchstart', 'mousemove', 'keydown'].forEach(function (event) {
  document.addEventListener(event, throttledResetAutoLogout, {
    passive: true
  });
});

// 로고 더블클릭/더블탭으로 관리자 모드 진입
var lastLogoTap = 0;
var adminEntering = false;
function handleLogoAdmin(_x11) {
  return _handleLogoAdmin.apply(this, arguments);
}
function _handleLogoAdmin() {
  _handleLogoAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(e) {
    var now, password;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.n) {
        case 0:
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!adminEntering) {
            _context23.n = 1;
            break;
          }
          return _context23.a(2);
        case 1:
          now = Date.now();
          if (!(now - lastLogoTap < 600)) {
            _context23.n = 4;
            break;
          }
          lastLogoTap = 0;
          adminEntering = true;
          _context23.n = 2;
          return showPasswordPrompt("관리자 비밀번호를 입력하세요");
        case 2:
          password = _context23.v;
          if (!(password === null)) {
            _context23.n = 3;
            break;
          }
          adminEntering = false;
          return _context23.a(2);
        case 3:
          verifyAdminPassword(password).then(function (isValid) {
            if (isValid) {
              adminAuthPassword = password; // 서버측 파괴적 작업 인증용 (메모리 한정)
              showStep("admin");
            } else {
              showConfirm({
                icon: '🔒',
                title: '접근 거부',
                message: '비밀번호가 틀렸습니다.',
                autoClose: 2000
              });
            }
            adminEntering = false;
          });
          _context23.n = 5;
          break;
        case 4:
          lastLogoTap = now;
        case 5:
          return _context23.a(2);
      }
    }, _callee23);
  }));
  return _handleLogoAdmin.apply(this, arguments);
}
if (brandLogo) {
  brandLogo.addEventListener("touchend", handleLogoAdmin);
  brandLogo.addEventListener("click", handleLogoAdmin);
}

// ── 홈 화면 진입 버튼들 ────────────────────────────────────
var goBorrowBtn = document.getElementById("goBorrow");
var goReturnBtn = document.getElementById("goReturn");
var backToHomeBtn = document.getElementById("backToHome");
var userStepTitle = document.getElementById("userStepTitle");
var userStepSub = document.getElementById("userStepSub");

// 대여/반납 모두 본인 확인이 먼저이므로 같은 정보 입력 화면을 쓰고, 문구만 바꾼다
var startFlow = function startFlow(mode) {
  flowMode = mode;
  if (userStepTitle) {
    userStepTitle.textContent = mode === 'return' ? '반납자 정보를 입력해 주세요' : '대여자 정보를 입력해 주세요';
  }
  if (userStepSub) {
    userStepSub.textContent = mode === 'return' ? '대여할 때 입력한 이름 · 학번 · 연락처를 그대로 입력해 주세요' : '이름 · 학번 · 연락처만 입력하면 바로 대여 · 다음 날 18시까지 반납 (금·토 대여는 월요일)';
  }
  showStep("user");
};
if (goBorrowBtn) {
  goBorrowBtn.addEventListener("click", function () {
    startFlow('borrow');
  });
}
if (goReturnBtn) {
  goReturnBtn.addEventListener("click", function () {
    startFlow('return');
  });
}
if (backToHomeBtn) {
  backToHomeBtn.addEventListener("click", function () {
    form.reset();
    nameError.textContent = "";
    studentIdError.textContent = "";
    phoneError.textContent = "";
    currentUser = null;
    currentDueInfo = null;
    showStep("home");
  });
}


// 변경 로그 화면에서 돌아가기 버튼
on(backFromChangelogBtn, "click", function () {
  showStep("admin");
});

// 변경 로그 / 로그인 기록 탭 전환
var tabChangeLog = document.getElementById("tabChangeLog");
var tabLoginLog = document.getElementById("tabLoginLog");
var changeLogPanel = document.getElementById("changeLogPanel");
var loginLogPanel = document.getElementById("loginLogPanel");
if (tabChangeLog && tabLoginLog) {
  tabChangeLog.addEventListener("click", function () {
    changeLogPanel.classList.add("is-active");
    loginLogPanel.classList.remove("is-active");
    tabChangeLog.classList.add("is-active");
    tabLoginLog.classList.remove("is-active");
  });
  tabLoginLog.addEventListener("click", function () {
    changeLogPanel.classList.remove("is-active");
    loginLogPanel.classList.add("is-active");
    tabLoginLog.classList.add("is-active");
    tabChangeLog.classList.remove("is-active");
  });
}

// ── 관리자 콘솔: 네비 · 검색 · 필터 ──────────────────────────
var adminNavEl = document.getElementById("adminNav");
if (adminNavEl) {
  adminNavEl.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".admin-nav-item[data-panel]") : null;
    if (btn) showAdminPanel(btn.getAttribute("data-panel"));
  });
}

// 경고 배너 → 재고 화면 이동
var adminAlertEl = document.getElementById("adminAlert");
if (adminAlertEl) {
  adminAlertEl.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest("[data-goto]") : null;
    if (btn) showAdminPanel(btn.getAttribute("data-goto"));
  });
}

// 새로고침
var adminRefreshBtn = document.getElementById("adminRefresh");
if (adminRefreshBtn) {
  adminRefreshBtn.addEventListener("click", function () {
    var keep = adminPanelName;
    showStep("admin");
    showAdminPanel(keep);
  });
}

// 재고 검색 / 필터
var stockSearchEl = document.getElementById("stockSearch");
if (stockSearchEl) {
  stockSearchEl.addEventListener("input", function () {
    adminStockQuery = String(stockSearchEl.value || '').trim().toLowerCase();
    renderAdminData();
  });
}
var stockChips = document.querySelectorAll("[data-stock-filter]");
Array.prototype.forEach.call(stockChips, function (chip) {
  chip.addEventListener("click", function () {
    adminStockFilter = chip.getAttribute("data-stock-filter");
    Array.prototype.forEach.call(stockChips, function (c) {
      c.classList.toggle("is-on", c === chip);
    });
    renderAdminData();
  });
});

// 대여 현황 검색
var lendSearchEl = document.getElementById("lendSearch");
if (lendSearchEl) {
  lendSearchEl.addEventListener("input", function () {
    adminLendQuery = String(lendSearchEl.value || '').trim().toLowerCase();
    renderAdminData();
  });
}

// 새 물품 추가 폼 열고 닫기
var toggleAddItemBtn = document.getElementById("toggleAddItem");
var addItemCard = document.getElementById("addItemCard");
if (toggleAddItemBtn && addItemCard) {
  toggleAddItemBtn.addEventListener("click", function () {
    var willOpen = addItemCard.classList.contains("hidden");
    addItemCard.classList.toggle("hidden", !willOpen);
    toggleAddItemBtn.textContent = willOpen ? "✕ 닫기" : "＋ 물품 추가";
    if (willOpen) addItemCard.scrollIntoView({ block: "nearest" });
  });
}

// 관리자 모드 제목 더블클릭/더블탭 시 변경 로그 화면으로 이동
var adminTitle = document.getElementById("adminTitle");
var lastAdminTitleTap = 0;
var adminTitleEntering = false;
function handleAdminTitleTap(_x12) {
  return _handleAdminTitleTap.apply(this, arguments);
}
function _handleAdminTitleTap() {
  _handleAdminTitleTap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(e) {
    var now, password;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.n) {
        case 0:
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!adminTitleEntering) {
            _context24.n = 1;
            break;
          }
          return _context24.a(2);
        case 1:
          now = Date.now();
          if (!(now - lastAdminTitleTap < 600)) {
            _context24.n = 4;
            break;
          }
          lastAdminTitleTap = 0;
          adminTitleEntering = true;
          _context24.n = 2;
          return showPasswordPrompt("추가 관리자 비밀번호를 입력하세요");
        case 2:
          password = _context24.v;
          if (!(password === null)) {
            _context24.n = 3;
            break;
          }
          adminTitleEntering = false;
          return _context24.a(2);
        case 3:
          verifySuperAdminPassword(password).then(function (isValid) {
            if (isValid) {
              showStep("changelog");
            } else {
              showConfirm({
                icon: '🔒',
                title: '접근 거부',
                message: '비밀번호가 틀렸습니다.',
                autoClose: 2000
              });
            }
            adminTitleEntering = false;
          });
          _context24.n = 5;
          break;
        case 4:
          lastAdminTitleTap = now;
        case 5:
          return _context24.a(2);
      }
    }, _callee24);
  }));
  return _handleAdminTitleTap.apply(this, arguments);
}
on(adminTitle, "touchend", handleAdminTitleTap);
on(adminTitle, "click", handleAdminTitleTap);

// 2. 관리자 모드에서 로그아웃 버튼 이벤트 리스너 추가
if (logoutAdminBtn) {
  logoutAdminBtn.addEventListener("click", function () {
    // 아직 못 보낸 관리자 변경이 있으면 알린다.
    // 로그아웃하면 비밀번호가 사라져 그 요청들은 더 보낼 수 없다.
    var adminPending = pendingWrites.filter(function (e) {
      return e.needsAdmin;
    }).length;
    if (adminPending > 0) {
      showConfirm({
        icon: '⚠️',
        title: '전송 대기 중',
        message: '서버에 아직 반영되지 않은 변경 ' + adminPending + '건이 있습니다. 잠시 후 다시 로그아웃해 주세요.',
        autoClose: 3000
      });
      return;
    }

    adminAuthPassword = null; // 관리자 세션 종료 시 비밀번호 폐기
    // 관리자 화면에서만 쓰던 개인정보를 메모리에서도 지운다
    borrowedRecords = stripBorrowedPii(borrowedRecords);
    loginLog = [];
    showStep("home");
  });
}

// 연체자 화면으로 이동
if (viewOverdueBtn) {
  viewOverdueBtn.addEventListener("click", function () {
    showStep("overdue");
  });
}

// 관리자 모드로 돌아가기
if (backToAdminBtn) {
  backToAdminBtn.addEventListener("click", function () {
    showStep("admin");
  });
}

// 물품 추가 기능
var addItemBtn = document.getElementById("addItemBtn");
var newItemName = document.getElementById("newItemName");
var newItemType = document.getElementById("newItemType");
var newItemStock = document.getElementById("newItemStock");
var newItemNotice = document.getElementById("newItemNotice");
on(addItemBtn, "click", function () {
  var name = newItemName.value.trim().replace(/[<>"'&]/g, '');
  var type = newItemType.value;
  var stock = Math.max(0, Math.min(9999, parseInt(newItemStock.value) || 0));
  var notice = newItemNotice.value.trim().replace(/[<>"'&]/g, '');
  var newItemIcon = document.getElementById("newItemIcon");
  var icon = newItemIcon ? newItemIcon.value.trim() : "";
  if (!name) {
    showConfirm({
      icon: '⚠️',
      title: '알림',
      message: '물품명을 입력해주세요.',
      autoClose: 2000
    });
    return;
  }
  if (items.some(function (item) {
    return item.name === name;
  })) {
    showConfirm({
      icon: '⚠️',
      title: '알림',
      message: '이미 존재하는 물품명입니다.',
      autoClose: 2000
    });
    return;
  }
  var newItem = {
    name: name,
    type: type,
    stock: stock,
    maxStock: stock, // 최대 재고는 일단 초기 재고와 동일 — 이후 '수정'에서 조정한다
    notice: notice || "",
    icon: icon
  };
  items.push(newItem);
  saveLocalCache();
  syncUpsertItem(newItem); // 이 물품 한 건만 서버에 반영
  addChangeLog("물품 추가", "".concat(name, " (").concat(type, ", \uC7AC\uACE0: ").concat(stock, "\uAC1C) \uCD94\uAC00\uB428"));

  // 입력 필드 초기화
  newItemName.value = "";
  newItemStock.value = "";
  newItemNotice.value = "";

  // 관리자 화면과 사용자 화면 모두 업데이트
  renderAdminData();
  renderItems();
  showConfirm({
    icon: '✅',
    title: '물품 추가',
    message: name + ' 물품이 추가되었습니다.',
    autoClose: 2000
  });
});

// 재고 수정 함수 (전역 함수로 만들기 위해 window 객체에 할당)
// ── 재고 표 인라인 수정 ─────────────────────────────────────
window.startEditItem = function (index) {
  if (index < 0 || index >= items.length) return;
  adminEditIndex = index;
  adminEditFocus = true;
  renderAdminData();
};

window.cancelEditItem = function () {
  adminEditIndex = -1;
  renderAdminData();
};

window.saveEditItem = function (index) {
  if (index < 0 || index >= items.length) return;
  var item = items[index];
  var clean = function clean(v) {
    return String(v || '').trim().replace(/[<>"'&]/g, '');
  };
  var nameEl = document.getElementById('editName');
  var typeEl = document.getElementById('editType');
  var maxStockEl = document.getElementById('editMaxStock');
  var noticeEl = document.getElementById('editNotice');
  var iconEl = document.getElementById('editIcon');
  if (!nameEl || !typeEl || !maxStockEl || !noticeEl) return;

  var newName = clean(nameEl.value);
  var newType = typeEl.value;
  var newMaxStock = Math.max(0, Math.min(9999, parseInt(maxStockEl.value, 10) || 0));
  // 현재 재고는 수정 폼에서 건드리지 않는다. 다만 최대치를 넘고 있으면 함께 내린다.
  var newStock = Number(item.stock) || 0;
  if (newMaxStock > 0 && newStock > newMaxStock) newStock = newMaxStock;
  var newNotice = clean(noticeEl.value);
  var newIcon = iconEl ? clean(iconEl.value) : item.icon || '';

  if (!newName) {
    showConfirm({ icon: '⚠️', title: '알림', message: '물품명을 입력해주세요.', autoClose: 2000 });
    return;
  }
  var duplicated = items.some(function (it, i) {
    return i !== index && it.name === newName;
  });
  if (duplicated) {
    showConfirm({ icon: '⚠️', title: '알림', message: '이미 존재하는 물품명입니다.', autoClose: 2000 });
    return;
  }

  var oldName = item.name;
  var oldType = item.type;
  var oldStock = Number(item.stock) || 0;
  var oldMaxStock = getMaxStock(item);
  var oldNotice = item.notice || '';
  var oldIcon = item.icon || '';

  // 바뀐 항목만 골라 변경 로그에 남긴다
  var changes = [];
  if (oldName !== newName) changes.push('물품명 ' + oldName + ' → ' + newName);
  if (oldType !== newType) changes.push('구분 ' + oldType + ' → ' + newType);
  if (oldMaxStock !== newMaxStock) changes.push('최대 재고 ' + oldMaxStock + '개 → ' + newMaxStock + '개');
  if (oldStock !== newStock) changes.push('현재 재고 ' + oldStock + '개 → ' + newStock + '개 (최대치에 맞춰 내림)');
  if (oldNotice !== newNotice) changes.push('주의사항 변경');
  if (oldIcon !== newIcon) changes.push('아이콘 변경');
  if (changes.length === 0) {
    adminEditIndex = -1;
    renderAdminData();
    return;
  }

  items[index] = {
    name: newName,
    type: newType,
    stock: newStock,
    maxStock: newMaxStock,
    notice: newNotice,
    icon: newIcon
  };

  // 이름을 바꾸면 대여 기록이 물품과 연결이 끊긴다 → 기록의 물품명도 함께 갱신
  var renamedRecords = 0;
  if (oldName !== newName && Array.isArray(borrowedRecords)) {
    borrowedRecords.forEach(function (r) {
      if (r && r.itemName === oldName) {
        r.itemName = newName;
        renamedRecords++;
      }
    });
  }

  saveLocalCache();
  // 이름을 바꿨다면 oldName 을 함께 보낸다 → 서버가 대여 기록의 물품명도 같이 고친다
  syncUpsertItem(items[index], oldName);
  addChangeLog('물품 수정', newName + ': ' + changes.join(', ') + (renamedRecords > 0 ? ' (대여 기록 ' + renamedRecords + '건 함께 수정)' : ''));

  adminEditIndex = -1;
  renderAdminData();
  renderItems();
  showConfirm({
    icon: '✅',
    title: '수정 완료',
    message: newName + ' 정보가 수정되었습니다.',
    autoClose: 2000
  });
};

window.updateStock = function (index, change) {
  if (index < 0 || index >= items.length) return;
  var item = items[index];
  var oldStock = Number(item.stock) || 0;
  var max = getMaxStock(item);
  var next = Math.max(0, oldStock + change);
  if (max > 0) next = Math.min(next, max); // 최대 재고를 넘겨 올릴 수 없다
  if (next === oldStock) return;
  items[index].stock = next;
  var newStock = next;
  saveLocalCache(); // 로컬 캐시만 저장 (서버는 아래 증분 동기화로 처리)
  // 관리자가 직접 지정하는 값이므로 절대값 전송 + 관리자 인증 필요
  queueWrite({
    action: 'updateStock',
    itemName: item.name,
    stock: newStock
  }, { needsAdmin: true });
  addChangeLog("재고 변경", "".concat(item.name, ": ").concat(oldStock, "\uAC1C \u2192 ").concat(newStock, "\uAC1C ").concat(change > 0 ? "(+1)" : "(-1)"));
  renderAdminData();
  renderItems();
};

// 강제 반납 함수 (전역 함수로 만들기 위해 window 객체에 할당)
window.forceReturn = async function (studentId, itemName, dueDate) {
  // borrowedRecords에서 해당 기록 찾기
  var recordIndex = borrowedRecords.findIndex(function (r) {
    return String(r.studentId) === String(studentId) &&
      String(r.itemName) === String(itemName) &&
      String(r.dueDate) === String(dueDate);
  });
  if (recordIndex === -1) {
    showConfirm({
      icon: '⚠️',
      title: '알림',
      message: '대여 기록을 찾을 수 없습니다.',
      autoClose: 2000
    });
    return;
  }
  var record = borrowedRecords[recordIndex];

  // 중요 작업: 비밀번호 재확인
  var password = await showPasswordPrompt('중요한 작업입니다. 관리자 비밀번호를 다시 입력하세요');
  if (password === null) return;
  var isValid = await verifyAdminPassword(password);
  if (!isValid) {
    showConfirm({
      icon: '🔒',
      title: '접근 거부',
      message: '비밀번호가 틀렸습니다.',
      autoClose: 2000
    });
    return;
  }

  var confirmed = await showConfirm({
    icon: '↩️',
    title: '강제 반납',
    message: '"' + (record.name || record.studentId) + '"님의 "' + record.itemName + '" 강제 반납을 처리하시겠습니까?'
  });
  if (!confirmed) return;

  // 해당 물품 재고 복구 (로컬 표시용 — 서버는 removeBorrowed 안에서 함께 올린다)
  var item = items.find(function (i) {
    return i.name === record.itemName;
  });
  if (item) {
    var max = getMaxStock(item);
    var next = (Number(item.stock) || 0) + 1;
    item.stock = max > 0 ? Math.min(next, max) : next;
  }

  // 대여 기록 삭제
  borrowedRecords.splice(recordIndex, 1);

  saveLocalCache();
  queueWrite({
    action: 'removeBorrowed',
    studentId: record.studentId,
    itemName: record.itemName
  });

  addChangeLog('강제 반납', (record.name || '') + '(' + record.studentId + ')의 ' + record.itemName + ' 강제 반납 처리');

  renderAdminData();
  renderOverdueData();
  renderItems();
  showConfirm({
    icon: '✅',
    title: '강제 반납',
    message: record.itemName + ' 강제 반납이 처리되었습니다.',
    autoClose: 2000
  });
};

// 물품 순서 변경 함수 (드래그 앤 드롭용)
window.moveItemTo = function (fromIndex, toIndex) {
  adminEditIndex = -1; // 순서가 바뀌면 수정 중이던 행 인덱스가 어긋난다
  if (fromIndex < 0 || fromIndex >= items.length) return;
  if (toIndex < 0 || toIndex >= items.length) return;
  if (fromIndex === toIndex) return;

  // 배열에서 위치 이동
  var _items$splice = items.splice(fromIndex, 1),
    _items$splice2 = _slicedToArray(_items$splice, 1),
    movedItem = _items$splice2[0];
  items.splice(toIndex, 0, movedItem);

  // 순서만 서버에 보낸다. 재고 등 값은 서버가 시트의 현재 값을 유지하므로
  // 관리자 기기의 오래된 재고가 서버로 되밀리지 않는다.
  saveLocalCache();
  syncReorderItems();

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
window.deleteItem = async function (index) {
  if (index < 0 || index >= items.length) return;
  var item = items[index];
  // 네이티브 confirm() 은 전체화면 PWA 에서 스타일이 깨지고 브라우저 설정에
  // 따라 아예 차단되기도 한다. 다른 곳과 같은 showConfirm 을 쓴다.
  var confirmed = await showConfirm({
    icon: '🗑️',
    title: '물품 삭제',
    message: '"' + item.name + '" 물품을 삭제하시겠습니까?'
  });
  if (!confirmed) return;

  items.splice(index, 1);
  adminEditIndex = -1; // 삭제로 인덱스가 밀리므로 수정 모드 해제
  // 서버가 이 물품의 대여 기록도 함께 정리하므로(deleteItem), 로컬 메모리도 맞춘다.
  // 남겨 두면 대여자가 1인 1물품 규칙에 걸려 새 대여·반납 모두 막힌다.
  var releasedBorrowed = 0;
  if (Array.isArray(borrowedRecords)) {
    var beforeDel = borrowedRecords.length;
    borrowedRecords = borrowedRecords.filter(function (r) {
      return !(r && String(r.itemName) === String(item.name));
    });
    releasedBorrowed = beforeDel - borrowedRecords.length;
  }
  saveLocalCache();
  syncDeleteItem(item.name); // 이 물품 한 건만 서버에서 제거 (대여 기록도 서버가 정리)
  addChangeLog('물품 삭제', item.name + ' 삭제됨' + (releasedBorrowed > 0 ? ' (대여 기록 ' + releasedBorrowed + '건 함께 정리)' : ''));
  renderAdminData();
  renderItems();
  showConfirm({
    icon: '✅',
    title: '물품 삭제',
    message: item.name + ' 물품이 삭제되었습니다.',
    autoClose: 2000
  });
};

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

// 헤더 시계
var headerClock = document.getElementById("headerClock");
var DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
var updateHeaderClock = function updateHeaderClock() {
  if (!headerClock) return;
  var d = new Date();
  var pad = function pad(n) {
    return String(n).padStart(2, "0");
  };
  headerClock.textContent = d.getFullYear() + ". " + pad(d.getMonth() + 1) + ". " + pad(d.getDate()) + ". (" + DAY_LABELS[d.getDay()] + ") " + pad(d.getHours()) + ":" + pad(d.getMinutes());
};
updateHeaderClock();
setInterval(updateHeaderClock, 10000);

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

// ========================================
// 숫자 키패드 (학번 · 전화번호)
// ========================================
// 키오스크는 물리 키보드가 없고, 키오스크 모드 브라우저에서는 OS 가상 키보드가
// 아예 안 뜨는 경우가 있어 입력 자체가 막힌다. 대상 입력칸에 inputmode="none" 을
// 걸어 OS 키보드를 억제하고, 화면 안의 이 키패드로 입력받는다.
var numPad = document.getElementById("numPad");
var numPadLabel = document.getElementById("numPadLabel");
var numPadCloseBtn = document.getElementById("numPadClose");
var numPadTarget = null;

var closeNumPad = function closeNumPad() {
  if (!numPad) return;
  numPad.classList.add("hidden");
  document.body.classList.remove("numpad-open");
  numPadTarget = null;
};

var openNumPad = function openNumPad(input) {
  if (!numPad || !input) return;
  numPadTarget = input;
  var label = document.querySelector('label[for="' + input.id + '"]');
  if (numPadLabel) numPadLabel.textContent = label ? label.textContent : "숫자 입력";
  numPad.classList.remove("hidden");
  document.body.classList.add("numpad-open");
  // 예전에 키패드가 화면 하단에 고정돼 있을 때는 입력칸이 가려져서
  // scrollIntoView 로 끌어올렸다. 지금은 키패드가 폼 옆에 있어 가리지
  // 않으므로, 자동 스크롤은 화면만 움직여 거슬린다. 넣지 않는다.
};

// 키패드 입력을 실제 입력칸에 반영. maxlength 를 넘기지 않고,
// 다른 코드가 듣고 있을 수 있으므로 input 이벤트를 발생시킨다.
var applyNumPadKey = function applyNumPadKey(key) {
  if (!numPadTarget) return;
  var value = numPadTarget.value;
  if (key === "back") {
    value = value.slice(0, -1);
  } else if (key === "clear") {
    value = "";
  } else {
    var max = parseInt(numPadTarget.getAttribute("maxlength"), 10);
    if (!isNaN(max) && value.length >= max) return;
    value = value + key;
  }
  numPadTarget.value = value;
  numPadTarget.dispatchEvent(new Event("input", { bubbles: true }));
};

// pointerdown 에서 preventDefault 를 하면 브라우저가 :active 를 걸어 주지
// 않아, 눌러도 키가 반응하지 않는 것처럼 보인다(=느리게 느껴진다).
// 눌린 표시를 직접 붙였다 떼어 준다.
var attachPressFeedback = function attachPressFeedback(pad, selector) {
  if (!pad) return;
  var pressed = null;
  var release = function release() {
    if (pressed) pressed.classList.remove("is-pressed");
    pressed = null;
  };
  pad.addEventListener("pointerdown", function (e) {
    var key = e.target.closest ? e.target.closest(selector) : null;
    if (!key) return;
    release();
    pressed = key;
    key.classList.add("is-pressed");
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) {
    pad.addEventListener(type, release);
  });
};

if (numPad) {
  attachPressFeedback(numPad, ".numpad-key");
  // pointerdown 에서 바로 입력한다. click 은 터치에서 touchend 이후에야
  // 오기 때문에 누른 느낌과 글자가 찍히는 시점이 어긋나 느리게 보인다.
  // 기본 동작을 막아야 입력칸이 포커스를 잃지 않고, click 도 뒤따르지 않는다.
  numPad.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    var keyBtn = e.target.closest ? e.target.closest(".numpad-key") : null;
    if (!keyBtn) return;
    applyNumPadKey(keyBtn.getAttribute("data-key"));
  });
}
if (numPadCloseBtn) {
  numPadCloseBtn.addEventListener("click", closeNumPad);
}

// 숫자 칸을 누르면 숫자 키패드로 전환한다. 키패드는 항상 떠 있으므로 닫지 않는다.
["studentId", "phone"].forEach(function (id) {
  var input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("focus", function () {
    if (typeof closeHanPad === "function") closeHanPad();
    openNumPad(input);
  });
});

// ========================================
// 한글 키패드 (두벌식) — 이름 입력
// ========================================
// 자모를 눌러 음절을 조합한다. 유니코드 한글 음절은
//   0xAC00 + (초성index * 21 + 중성index) * 28 + 종성index
// 로 계산된다.
var HAN_CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
var HAN_JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
var HAN_JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

// 겹모음: ㅗ + ㅏ = ㅘ 처럼 두 모음이 합쳐지는 조합
var HAN_JUNG_PAIR = {
  "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ",
  "ㅡㅣ": "ㅢ"
};
// 겹받침: ㄱ + ㅅ = ㄳ 처럼 두 자음이 받침으로 합쳐지는 조합
var HAN_JONG_PAIR = {
  "ㄱㅅ": "ㄳ", "ㄴㅈ": "ㄵ", "ㄴㅎ": "ㄶ",
  "ㄹㄱ": "ㄺ", "ㄹㅁ": "ㄻ", "ㄹㅂ": "ㄼ", "ㄹㅅ": "ㄽ",
  "ㄹㅌ": "ㄾ", "ㄹㅍ": "ㄿ", "ㄹㅎ": "ㅀ", "ㅂㅅ": "ㅄ"
};
// 겹받침을 되돌릴 때 쓰는 역방향 표 (ㄳ → ㄱ + ㅅ)
var HAN_JONG_SPLIT = {};
Object.keys(HAN_JONG_PAIR).forEach(function (pair) {
  HAN_JONG_SPLIT[HAN_JONG_PAIR[pair]] = [pair.charAt(0), pair.charAt(1)];
});
var HAN_JUNG_SPLIT = {};
Object.keys(HAN_JUNG_PAIR).forEach(function (pair) {
  HAN_JUNG_SPLIT[HAN_JUNG_PAIR[pair]] = [pair.charAt(0), pair.charAt(1)];
});

var isJung = function isJung(j) {
  return HAN_JUNG.indexOf(j) >= 0;
};

// 조합 중인 음절 상태. committed 는 이미 확정된 앞부분 문자열.
var hanState = { cho: "", jung: "", jong: "" };
var hanCommitted = "";
var hanTarget = null;

// 현재 상태를 화면에 보일 한 글자로 만든다 (아직 미완성이면 자모 그대로)
var renderHanState = function renderHanState() {
  var cho = hanState.cho, jung = hanState.jung, jong = hanState.jong;
  if (!cho && !jung) return "";
  if (cho && !jung) return cho;
  if (!cho && jung) return jung;
  var code = 0xac00 + (HAN_CHO.indexOf(cho) * 21 + HAN_JUNG.indexOf(jung)) * 28 + HAN_JONG.indexOf(jong || "");
  return String.fromCharCode(code);
};

var syncHanInput = function syncHanInput() {
  if (!hanTarget) return;
  hanTarget.value = hanCommitted + renderHanState();
  hanTarget.dispatchEvent(new Event("input", { bubbles: true }));
};

var clearHanState = function clearHanState() {
  hanState = { cho: "", jung: "", jong: "" };
};

// 조합 중이던 글자를 확정하고 상태를 비운다
var commitHanState = function commitHanState() {
  hanCommitted += renderHanState();
  clearHanState();
};

var pushJamo = function pushJamo(jamo) {
  if (isJung(jamo)) {
    if (!hanState.cho && !hanState.jung) {
      // 초성 없이 모음만 → 자모 그대로 확정
      hanCommitted += jamo;
    } else if (hanState.cho && !hanState.jung) {
      hanState.jung = jamo;
    } else if (hanState.jong) {
      // 받침이 다음 글자의 초성으로 넘어간다 (예: 한 + ㅏ → 하 + 나)
      var moved = hanState.jong;
      var rest = "";
      if (HAN_JONG_SPLIT[moved]) {
        rest = HAN_JONG_SPLIT[moved][0];
        moved = HAN_JONG_SPLIT[moved][1];
      }
      hanState.jong = rest;
      commitHanState();
      hanState.cho = moved;
      hanState.jung = jamo;
    } else {
      var pair = HAN_JUNG_PAIR[hanState.jung + jamo];
      if (pair) {
        hanState.jung = pair;
      } else {
        commitHanState();
        hanCommitted += jamo;
      }
    }
  } else {
    // 자음
    if (!hanState.cho && !hanState.jung) {
      if (HAN_CHO.indexOf(jamo) >= 0) {
        hanState.cho = jamo;
      } else {
        hanCommitted += jamo;
      }
    } else if (hanState.cho && !hanState.jung) {
      // 자음 두 개 연속 → 앞 자음 확정
      commitHanState();
      hanState.cho = jamo;
    } else if (!hanState.jong) {
      if (HAN_JONG.indexOf(jamo) > 0) {
        hanState.jong = jamo;
      } else {
        commitHanState();
        hanState.cho = jamo;
      }
    } else {
      var jongPair = HAN_JONG_PAIR[hanState.jong + jamo];
      if (jongPair) {
        hanState.jong = jongPair;
      } else {
        commitHanState();
        hanState.cho = jamo;
      }
    }
  }
  syncHanInput();
};

// 지우기: 조합 중이면 한 단계씩 되돌리고, 아니면 확정된 마지막 글자를 지운다
var hanBackspace = function hanBackspace() {
  if (hanState.jong) {
    var split = HAN_JONG_SPLIT[hanState.jong];
    hanState.jong = split ? split[0] : "";
  } else if (hanState.jung) {
    var jsplit = HAN_JUNG_SPLIT[hanState.jung];
    hanState.jung = jsplit ? jsplit[0] : "";
  } else if (hanState.cho) {
    hanState.cho = "";
  } else {
    hanCommitted = hanCommitted.slice(0, -1);
  }
  syncHanInput();
};

var hanPad = document.getElementById("hanPad");
var hanPadCloseBtn = document.getElementById("hanPadClose");
var hanShiftBtn = document.getElementById("hanShift");
var hanShiftOn = false;

// 입력 모드: 'ko'(두벌식 조합) 또는 'en'(영문 직접 입력)
var hanMode = 'ko';

// 키 라벨을 현재 모드·시프트 상태에 맞게 다시 그린다
var renderHanKeys = function renderHanKeys() {
  if (!hanPad) return;
  if (hanShiftBtn) {
    hanShiftBtn.classList.toggle("is-active", hanShiftOn);
    hanShiftBtn.textContent = hanMode === 'en' ? '대문자' : '쌍자음';
  }
  var keys = hanPad.querySelectorAll(".hanpad-key[data-jamo]");
  Array.prototype.forEach.call(keys, function (key) {
    if (hanMode === 'en') {
      var en = key.getAttribute("data-en") || '';
      key.textContent = hanShiftOn ? en.toUpperCase() : en;
    } else {
      var shifted = key.getAttribute("data-shift");
      key.textContent = hanShiftOn && shifted ? shifted : key.getAttribute("data-jamo");
    }
  });
};

var setHanShift = function setHanShift(on) {
  hanShiftOn = on;
  renderHanKeys();
};

var setHanMode = function setHanMode(mode) {
  // 모드를 바꾸기 전에 조합 중이던 글자를 확정한다 (ㄱ 만 눌린 상태 등)
  commitHanState();
  syncHanInput();
  hanMode = mode;
  hanShiftOn = false;
  renderHanKeys();
};

var closeHanPad = function closeHanPad() {
  if (!hanPad) return;
  hanPad.classList.add("hidden");
  document.body.classList.remove("hanpad-open");
  commitHanState();
  hanTarget = null;
  setHanShift(false);
};

var openHanPad = function openHanPad(input) {
  if (!hanPad || !input) return;
  hanTarget = input;
  // 이미 입력돼 있던 값은 확정된 것으로 보고 조합을 새로 시작한다
  hanCommitted = input.value;
  clearHanState();
  hanPad.classList.remove("hidden");
  document.body.classList.add("hanpad-open");
  setHanShift(false);
};

if (hanPad) {
  attachPressFeedback(hanPad, ".hanpad-key");
  // 숫자 키패드와 같은 이유로 pointerdown 에서 바로 처리한다
  hanPad.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    var key = e.target.closest ? e.target.closest(".hanpad-key") : null;
    if (!key) return;
    if (key === hanShiftBtn) {
      setHanShift(!hanShiftOn);
      return;
    }
    if (!hanTarget) return;
    var action = key.getAttribute("data-han");
    if (action === "back") {
      hanBackspace();
      return;
    }
    if (action === "clear") {
      hanCommitted = "";
      clearHanState();
      syncHanInput();
      return;
    }
    if (action === "lang") {
      setHanMode(hanMode === 'ko' ? 'en' : 'ko');
      return;
    }
    if (hanMode === 'en') {
      // 영문은 조합이 없으므로 글자를 그대로 덧붙인다
      var en = key.getAttribute("data-en");
      if (!en) return;
      commitHanState();
      hanCommitted += hanShiftOn ? en.toUpperCase() : en;
      syncHanInput();
      if (hanShiftOn) setHanShift(false);
      return;
    }
    var jamo = key.getAttribute("data-jamo");
    if (!jamo) return;
    var shifted = key.getAttribute("data-shift");
    pushJamo(hanShiftOn && shifted ? shifted : jamo);
    // 쌍자음은 한 번 쓰면 풀린다 (물리 키보드 Shift 와 같은 동작)
    if (hanShiftOn) setHanShift(false);
  });
}
if (hanPadCloseBtn) {
  hanPadCloseBtn.addEventListener("click", closeHanPad);
}

var nameInput = document.getElementById("name");

// OS 가상 키보드 차단.
// inputmode="none" 만으로는 무시하는 기기가 있어 readonly 를 함께 건다.
// readonly 여도 포커스·선택은 되고 값은 스크립트로 넣으므로 키패드 입력에 지장이 없다.
// 대신 물리 키보드 타이핑은 막히는데, 키오스크에는 물리 키보드가 없다.
["name", "studentId", "phone"].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) el.setAttribute("readonly", "readonly");
});

// 정보 입력 화면에 들어오면 키패드를 바로 띄운다 (누를 때까지 기다리지 않는다)
var openDefaultPad = function openDefaultPad() {
  var active = document.activeElement;
  if (active === document.getElementById("studentId") || active === document.getElementById("phone")) {
    return;
  }
  if (typeof closeNumPad === "function") closeNumPad();
  if (nameInput) openHanPad(nameInput);
};

if (nameInput) {
  nameInput.addEventListener("focus", function () {
    if (typeof closeNumPad === "function") closeNumPad();
    openHanPad(nameInput);
  });
  // 물리 키보드나 붙여넣기로 값이 바뀌면 조합 상태가 어긋나므로 다시 맞춘다
  nameInput.addEventListener("keydown", function () {
    commitHanState();
    hanCommitted = nameInput.value;
    clearHanState();
  });
}

