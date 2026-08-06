const CACHE_NAME = 'hasung-kiosk-v23';
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
        console.log('캐시 열기');
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })))
          .catch(err => {
            console.log('일부 파일 캐시 실패:', err);
            // 일부 파일이 실패해도 계속 진행
            return Promise.resolve();
          });
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
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // 캐시에도 없으면 오프라인 페이지 반환
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});




