# 하성 복지물품 키오스크

인공지능융합대학 하성 복지물품 대여 및 관리 키오스크 시스템

## 📱 앱 설치 방법

### 모바일/태블릿 (Android)

1. **Chrome 브라우저**에서 사이트 접속
2. 화면 **우측 상단**의 **점 3개 메뉴(⋮)** 클릭
3. 메뉴에서 **"홈 화면에 추가"** 또는 **"앱 설치"** 선택
4. 설치 확인 후 홈 화면에서 앱 실행

### 모바일/태블릿 (iOS - iPhone/iPad)

1. **Safari 브라우저**에서 사이트 접속
2. 화면 **하단 중앙**의 **공유 버튼(□↑)** 클릭
3. 메뉴에서 **"홈 화면에 추가"** 선택
4. 설치 확인 후 홈 화면에서 앱 실행

### 데스크톱 (Windows/Mac/Linux)

#### 방법 1: 주소창 아이콘
1. **Chrome/Edge 브라우저**에서 사이트 접속
2. 주소창 **오른쪽 끝**에 나타나는 **설치 아이콘(⊕)** 클릭
3. "설치" 버튼 클릭

#### 방법 2: 화면 우측 하단 버튼
1. **Chrome/Edge 브라우저**에서 사이트 접속
2. 화면 **우측 하단**에 나타나는 **"앱 설치"** 버튼 클릭
3. 설치 확인

#### 방법 3: 브라우저 메뉴
1. **Chrome/Edge 브라우저**에서 사이트 접속
2. 주소창 **오른쪽 끝**의 **점 3개 메뉴(⋮)** 또는 **점 3개 메뉴(⋮)** 클릭
3. 메뉴에서 **"앱 설치"** 또는 **"앱으로 설치"** 선택

## ✨ 주요 기능

- **PWA (Progressive Web App)** 지원
- 오프라인 동작 가능
- 홈 화면에 추가 가능
- 독립 앱처럼 실행
- 태블릿 가로 모드 최적화

## 🚀 사용 방법

1. 웹 서버에 파일 업로드
2. HTTPS 환경에서 접속 (PWA 설치를 위해 필요)
3. 브라우저에서 앱 설치
4. 홈 화면에서 앱 실행

## 📋 파일 구조

```
복지물품/
├── index.html            # 메인 HTML 파일
├── css/styles.css        # 스타일
├── js/script.js          # 앱 로직 (수정은 이 파일에서 직접)
├── service-worker.js     # 서비스 워커 (오프라인 지원)
├── manifest.json         # PWA 매니페스트
├── logo.png              # 앱 아이콘
└── google-apps-script.js # 백엔드 (Google Apps Script에 붙여넣어 배포)
```

> Vue 3 재작성본(`hasung-kiosk-v2/`)은 미배포 상태로 방치돼 어느 쪽이 원본인지
> 혼동을 주어 삭제했습니다. 필요하면 git 이력에서 되살릴 수 있습니다.

## 🔧 기술 스택

- HTML5 / CSS3 / JavaScript (Vanilla)
- PWA (Service Worker + manifest)
- 백엔드: Google Apps Script + Google Sheets
- 로컬 캐시: LocalStorage

## 🖥 대상 기기

운영 기기는 **Galaxy Tab A 10.1 (SM-P580, 2016)** 이며 Chrome 106 기준으로 동작을 확인했습니다.
`Proxy`(Chrome 49+), `async`/`await`(Chrome 55+) 등 최신 문법이 모두 지원되므로
코드 작성 시 문법 제약은 없습니다.

> 참고: Android 7.x는 Chrome 120 전후까지만 업데이트되므로 그보다 높은 버전은 올라가지 않습니다.

## ⚠️ 소스 수정 시 주의

### `js/script.js` 가 원본입니다

이 파일은 과거 Babel로 ES5 트랜스파일된 결과물이지만 **트랜스파일 이전 원본은 남아 있지
않습니다.** 따라서 지금은 `js/script.js` 자체가 유일한 원본이며 직접 수정합니다.
빌드 단계는 없습니다.

`_regenerator` / `_asyncToGenerator` 로 시작하는 상태 머신 코드가 보이는 것은 그 때문입니다.
새로 작성하는 부분은 굳이 그 형식을 따를 필요 없이 일반적인 문법으로 쓰면 됩니다.

### 캐시 버전 올리기

`js/script.js` 나 `css/styles.css` 를 수정했다면 `index.html` 의 `?v=` 값을,
`service-worker.js` 를 수정했다면 `CACHE_NAME` 의 버전을 올려야 기기에 반영됩니다.

서비스 워커가 `js/script.js` 를 쿼리 없이 미리 캐시하므로, 스크립트를 고쳤다면
`?v=` 와 `CACHE_NAME` 을 **함께** 올리는 편이 안전합니다.

### 로컬 스모크 테스트

`node .claude/smoke-test.js` 로 `js/script.js` 를 최소 DOM 스텁 위에서 실행해
볼 수 있습니다. 참조 오류·초기화 순서 문제, 대여/반납 요청이 서버로 나가는지,
재시도 큐가 도는지, 개인정보가 LocalStorage 에 남지 않는지를 확인합니다.
(`.claude/` 는 배포에 포함되지 않습니다)

## 🔐 백엔드 배포 시 필수 설정

> **`ADMIN_PASSWORD_HASH` 를 반드시 설정해야 합니다.**
>
> Apps Script 편집기 → 프로젝트 설정 → 스크립트 속성에
> `ADMIN_PASSWORD_HASH` = *관리자 비밀번호의 SHA-256 hex* 를 넣으세요.
>
> 예전에는 이 값이 비어 있으면 관리자 인증을 그냥 통과시켰습니다. API 키가
> 정적 사이트에 그대로 실려 나가는 구조라, 그 상태에서는 소스만 보면 누구나
> 물품 추가·수정·삭제를 할 수 있었습니다. 지금은 **미설정 시 관리자 액션이
> 전부 거부**됩니다(fail-closed). 설정하지 않으면 관리자 화면에서
> `Admin auth not configured` 오류가 납니다.

해시 만드는 법 (예):

```bash
printf '내비밀번호' | sha256sum
```

기존 시트를 쓰던 경우 편집기에서 `backfillMaxStock()` 을 한 번 실행하세요.
`maxStock` 이 비어 있으면 재고 부족 경고가 뜨지 않습니다.

### 권한 구분

| 액션 | 관리자 인증 |
|---|---|
| `getAllAdmin`, `upsertItem`, `deleteItem`, `reorderItems`, `updateStock` | 필요 |
| `addBorrowed`, `removeBorrowed`, `recordConsume`, `addChangeLog`, `addLoginLog` | 불필요 (입력 검증 + 액션별 rate limit) |

학생 흐름의 재고 증감은 **서버가 직접 ±1** 합니다. 클라이언트가 계산한 절대값을
받지 않으므로, API 키만으로 재고를 임의의 값으로 바꿀 수 없습니다.

## 📝 참고사항

- PWA 설치를 위해서는 **HTTPS** 환경이 필요합니다
- 로컬 개발 시 `localhost`도 HTTPS로 간주됩니다
- 물품·대여 데이터는 Google Sheets에 저장되며, LocalStorage는 오프라인 캐시 용도입니다
- 백엔드 설정값(시트 ID, API 키, 관리자 비밀번호 해시)은 Apps Script의
  **스크립트 속성**에 저장합니다. 자세한 항목은 `google-apps-script.js` 상단 주석 참고
- **개인정보는 기기에 저장하지 않습니다.** 이름·전화번호는 서버로만 보내고,
  LocalStorage 캐시(`kiosk_borrowed`)에는 학번·물품명·기한만 남깁니다.
  관리자 화면의 이름·연락처는 서버에서 받아 메모리에서만 사용하며,
  로그아웃 시 즉시 지웁니다. 오프라인일 때 이름·연락처가 `-` 로 보이는 것은 정상입니다
- 서버 전송에 실패한 변경은 `kiosk_pendingWrites` 큐에 남아 지수 백오프로
  재시도합니다. 앱을 껐다 켜도 이어서 보냅니다
