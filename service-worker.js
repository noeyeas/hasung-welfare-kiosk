const CACHE_NAME = 'hasung-kiosk-v47';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/script.js',
  './logo.png',
  './manifest.json'
];

// 설치 이벤트 - 캐시 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // cache.addAll() 은 원자적이라 URL 하나만 실패해도 전체가 취소된다.
        // 기존 코드는 그 실패를 삼키고 설치를 성공 처리해, 캐시가 완전히 빈 채로
        // 오프라인에 진입하는 상황을 만들 수 있었다. 따라서 한 건씩 개별로 담는다.
        return Promise.all(
          urlsToCache.map((url) => {
            return cache.add(new Request(url, { cache: 'reload' }))
              .catch((err) => {
                console.warn('캐시 실패:', url, err);
              });
          })
        );
      })
  );
  // 즉시 활성화하여 새 버전 사용
  self.skipWaiting();
});

// 활성화 이벤트 - 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  // clients.claim() 도 waitUntil 안에서 처리해야 활성화 완료가 보장된다.
  // 이벤트 핸들러의 return 값은 무시되므로 예전 코드는 제어권 인계 시점을 보장하지 못했다.
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('오래된 캐시 삭제:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 캐시에 저장할 요청인지 판단
// 동일 출처의 정적 자원만 대상으로 한다 (API 응답·외부 CDN은 제외).
function shouldCache(request, url) {
  if (url.origin !== self.location.origin) {
    return false;
  }
  return ['document', 'style', 'script', 'image', 'manifest'].includes(request.destination);
}

// fetch 이벤트 - 네트워크 우선, 실패 시 캐시 사용
self.addEventListener('fetch', (event) => {
  // GET 요청만 캐시 처리
  if (event.request.method !== 'GET') {
    return;
  }

  // http/https 스킴만 처리 (chrome-extension 등 제외)
  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 응답이 유효한지 확인
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 캐시 대상만 저장한다.
        // 모든 GET 응답을 무제한으로 담으면 오래 켜두는 키오스크에서 저장 공간이 계속 늘어난다.
        if (shouldCache(event.request, url)) {
          // 응답 복제 (한 번만 읽을 수 있으므로)
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 찾기
        //
        // ignoreVary 가 반드시 필요하다. GitHub Pages 응답에는 'Vary: Accept-Encoding' 이
        // 붙는데, 기본 동작에서는 요청의 Accept-Encoding 이 캐시 저장 당시와 다르면
        // 저장된 응답이 있어도 매칭에 실패한다. 오프라인 상태에서 헤더가 달라지면
        // 캐시가 멀쩡히 있는데도 아무것도 못 찾고 네트워크 오류 화면이 뜬다.
        //
        // ignoreSearch 는 '/hasung-welfare-kiosk/?mode=admin' 처럼 쿼리가 붙은
        // 주소로 진입한 경우를 위한 것이다.
        const matchOptions = { ignoreVary: true, ignoreSearch: true };

        return caches.match(event.request, matchOptions)
          .then((response) => {
            if (response) {
              return response;
            }
            // 정확히 일치하는 캐시가 없을 때, 문서 요청이면 시작 페이지로 대체한다.
            if (event.request.mode === 'navigate' || event.request.destination === 'document') {
              return caches.match('./index.html', matchOptions)
                .then((page) => page || caches.match('./', matchOptions));
            }
            return undefined;
          });
      })
  );
});




