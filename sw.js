// 다름달음 오더 — 서비스워커 (휴대폰에 앱으로 설치했을 때 카톡 등에서 "공유"로 보낸 발주서를 받는 용도만)
// 화면·자료는 저장(캐시)하지 않습니다 → 프로그램을 고치면 항상 최신 화면이 열립니다.
const INBOX = 'dd-share-inbox';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method === 'POST' && url.searchParams.has('share-target')) {
    event.respondWith((async () => {
      try {
        const form = await req.formData();
        const files = form.getAll('files').filter(f => f && typeof f === 'object' && f.size > 0);
        const cache = await caches.open(INBOX);
        const stamp = Date.now();
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          await cache.put(new Request(`/__share-inbox/${stamp}-${i}`), new Response(f, { headers: {
            'Content-Type': f.type || 'application/octet-stream',
            'X-File-Name': encodeURIComponent(f.name || ('공유파일-' + (i + 1))),
            'X-Received': String(stamp)
          } }));
        }
        return Response.redirect(new URL(`index.html?shared=${stamp}&n=${files.length}`, self.registration.scope).href, 303);
      } catch (e) {
        return Response.redirect(new URL('index.html?shared=error', self.registration.scope).href, 303);
      }
    })());
  }
  // 그 밖의 요청은 손대지 않음 (평소처럼 서버에서 받음)
});
