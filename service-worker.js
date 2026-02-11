const CACHE_NAME = 'hasung-kiosk-v7';
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
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 모든 클라이언트에 즉시 제어권 부여
  return self.clients.claim();
});

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

        // 응답 복제 (한 번만 읽을 수 있으므로)
        const responseToCache = response.clone();

        // 캐시에 저장
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

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




