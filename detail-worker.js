// ══════════════════════════════════════════════════════════════════
// 다름달음 상세페이지 이미지 서버 (Cloudflare Worker)
//
//  - GET  /i/p/<상품ID>/<파일>      : 공개 이미지 (마켓 상세페이지가 불러가는 주소)
//  - GET  /api/me                   : 로그인 확인
//  - GET  /api/products             : 상세페이지 목록
//  - GET  /api/products/<ID>        : 상세페이지 1개 정보
//  - PUT  /api/products/<ID>        : 상세페이지 정보 저장
//  - DELETE /api/products/<ID>      : 상세페이지와 이미지 전체 삭제
//  - PUT  /api/upload/p/<ID>/<파일> : 이미지 업로드
//
// 로그인은 발주 프로그램과 같은 계정·세션을 씁니다.
// 사용 권한은 발주 프로그램의 "공유폴더" 권한을 그대로 따릅니다.
//   (관리자 = 전체, 공유폴더 '전체' = 전체, '읽기만' = 보기만, 차단 = 사용 불가)
//
// 필요한 연결(Bindings): R2 버킷 → 변수 이름 BUCKET
// ══════════════════════════════════════════════════════════════════

const SB_URL = 'https://rsgbqlrxtexknhsvkroc.supabase.co';
const SB_KEY = 'sb_publishable_Es6Y1pOe1friYzEnvT0iSw_gqQQvFvJ';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;           // 이미지 1장 최대 10MB
const MAX_TOTAL_BYTES = 9 * 1024 * 1024 * 1024;     // 버킷 전체 9GB에서 업로드 차단 (R2 무료 10GB 보호)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ID_RE = /^[a-z0-9][a-z0-9-]{2,60}$/;
const FILE_RE = /^[a-z0-9][a-z0-9._-]{0,80}\.(jpg|jpeg|png|webp|gif)$/;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...CORS },
  });
}
const err = (msg, status = 400) => json({ error: msg }, status);

// ── 로그인 확인 ──
async function sb(path) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  if (!res.ok) throw new Error('로그인 서버 오류');
  return res.json();
}

// 세션 확인은 DB 함수(app_me)로 합니다 (users/sessions 테이블을 직접 읽지 않음).
// 함수가 아직 없으면(404) 예전 방식으로 확인합니다 — 보안 0단계 SQL 적용 전 호환용.
async function rpcMe(token) {
  const res = await fetch(`${SB_URL}/rest/v1/rpc/app_me`, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_token: token }),
  });
  if (res.status === 404) return { missing: true };
  if (!res.ok) throw new Error('로그인 서버 오류');
  return { user: await res.json() };
}

async function getUser(request) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token || token.length > 200) return null;
  let u = null;
  const r = await rpcMe(token);
  if (!r.missing) {
    u = r.user;
  } else {
    const sessions = await sb(`sessions?token=eq.${encodeURIComponent(token)}&limit=1`);
    if (!sessions.length) return null;
    const s = sessions[0];
    if (s.expires_at && new Date(s.expires_at) < new Date()) return null;
    const users = await sb(`users?id=eq.${encodeURIComponent(s.user_id)}&is_active=eq.true&limit=1`);
    u = users[0] || null;
  }
  if (!u) return null;
  const isAdmin = u.role === 'admin';
  const has = isAdmin || u.access_files === true;
  const readOnly = !isAdmin && u.readonly_files === true;
  return { id: u.id, display_name: u.display_name || u.username, isAdmin, has, readOnly };
}
// ── 공개 이미지 ──
async function serveImage(request, key, ctx, env) {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), { method: 'GET' });
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const obj = await env.BUCKET.get(key);
  if (!obj) return new Response('Not found', { status: 404, headers: CORS });

  const headers = new Headers(CORS);
  obj.writeHttpMetadata(headers);
  if (!headers.get('Content-Type')) headers.set('Content-Type', 'image/jpeg');
  headers.set('ETag', obj.httpEtag);
  // 파일 이름이 업로드마다 달라서(내용이 바뀌면 이름도 바뀜) 오래 캐시해도 안전합니다.
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  const res = new Response(obj.body, { headers });
  if (request.method === 'GET') ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

// ── 목록 / 정보 ──
async function listProducts(env) {
  const out = [];
  let cursor;
  do {
    const page = await env.BUCKET.list({ prefix: 'm/', cursor, include: ['customMetadata'] });
    for (const o of page.objects) {
      const id = o.key.slice(2, -5);
      const meta = o.customMetadata || {};
      out.push({
        id,
        title: meta.title ? decodeURIComponent(meta.title) : id,
        count: Number(meta.count || 0),
        thumb: meta.thumb || '',
        updated_at: meta.updated_at || o.uploaded.toISOString(),
        updated_by: meta.updated_by ? decodeURIComponent(meta.updated_by) : '',
      });
    }
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  out.sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1));
  return out;
}

async function totalUsage(env) {
  let total = 0, cursor;
  do {
    const page = await env.BUCKET.list({ prefix: 'p/', cursor });
    for (const o of page.objects) total += o.size;
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return total;
}

async function saveManifest(env, id, body, user) {
  const title = String(body.title || '').trim().slice(0, 100);
  if (!title) return err('상품명을 입력해주세요');
  const images = Array.isArray(body.images) ? body.images : [];
  if (images.length > 300) return err('이미지가 너무 많습니다 (최대 300장)');
  const clean = [];
  for (const im of images) {
    const file = String(im.file || '');
    if (!FILE_RE.test(file)) return err('잘못된 이미지 이름이 있습니다');
    const head = await env.BUCKET.head(`p/${id}/${file}`);
    if (!head) return err(`이미지가 서버에 없습니다: ${file}`);
    clean.push({ file, w: Math.round(Number(im.w) || 0), h: Math.round(Number(im.h) || 0), size: head.size });
  }
  // 썸네일(상세 HTML에는 넣지 않는 대표 이미지) — 이미지와 같은 방식으로 확인합니다.
  const thumbsIn = Array.isArray(body.thumbs) ? body.thumbs : [];
  if (thumbsIn.length > 20) return err('썸네일이 너무 많습니다 (최대 20장)');
  const cleanThumbs = [];
  for (const im of thumbsIn) {
    const file = String(im.file || '');
    if (!FILE_RE.test(file)) return err('잘못된 썸네일 이름이 있습니다');
    const head = await env.BUCKET.head(`p/${id}/${file}`);
    if (!head) return err(`썸네일이 서버에 없습니다: ${file}`);
    cleanThumbs.push({ file, w: Math.round(Number(im.w) || 0), h: Math.round(Number(im.h) || 0), size: head.size });
  }
  const now = new Date().toISOString();
  const prev = await env.BUCKET.get(`m/${id}.json`);
  const prevData = prev ? await prev.json().catch(() => ({})) : {};
  const manifest = {
    id,
    title,
    width: Math.min(2000, Math.max(300, Math.round(Number(body.width) || 860))),
    text: String(body.text || '').slice(0, 5000),
    images: clean,
    thumbs: cleanThumbs,
    created_at: prevData.created_at || now,
    created_by: prevData.created_by || user.display_name,
    updated_at: now,
    updated_by: user.display_name,
  };
  await env.BUCKET.put(`m/${id}.json`, JSON.stringify(manifest), {
    httpMetadata: { contentType: 'application/json' },
    customMetadata: {
      title: encodeURIComponent(title),
      count: String(clean.length),
      thumb: cleanThumbs[0] ? cleanThumbs[0].file : (clean[0] ? clean[0].file : ''),
      updated_at: now,
      updated_by: encodeURIComponent(user.display_name),
    },
  });
  return json({ ok: true, product: manifest });
}

async function deleteProduct(env, id, origin) {
  let cursor;
  do {
    const page = await env.BUCKET.list({ prefix: `p/${id}/`, cursor });
    const keys = page.objects.map(o => o.key);
    if (keys.length) await env.BUCKET.delete(keys);
    // 캐시에 남은 사본도 지움 (지운 이미지가 계속 보이지 않도록)
    await Promise.all(keys.map(k => caches.default.delete(new Request(`${origin}/i/${k}`)).catch(() => {})));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  await env.BUCKET.delete(`m/${id}.json`);
  return json({ ok: true });
}

// ── 진입점 ──
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    try {
      if (path === '/' && method === 'GET') return json({ ok: true, service: '다름달음 상세페이지 이미지 서버' });

      // 공개 이미지
      if (path.startsWith('/i/') && (method === 'GET' || method === 'HEAD')) {
        const key = path.slice(3);
        const m = key.match(/^p\/([^/]+)\/([^/]+)$/);
        if (!m || !ID_RE.test(m[1]) || !FILE_RE.test(m[2])) return new Response('Not found', { status: 404, headers: CORS });
        return serveImage(request, key, ctx, env);
      }

      if (!path.startsWith('/api/')) return err('없는 주소입니다', 404);

      const user = await getUser(request);
      if (!user) return err('로그인이 필요합니다', 401);
      if (!user.has) return err('상세페이지 도구 사용 권한이 없습니다. 관리자에게 공유폴더 권한을 요청하세요.', 403);

      if (path === '/api/me') return json({ me: user });

      if (path === '/api/products' && method === 'GET') {
        return json({ items: await listProducts(env), me: user });
      }

      let m = path.match(/^\/api\/products\/([^/]+)$/);
      if (m) {
        const id = m[1];
        if (!ID_RE.test(id)) return err('잘못된 상품 ID입니다');
        if (method === 'GET') {
          const obj = await env.BUCKET.get(`m/${id}.json`);
          if (!obj) return err('상세페이지를 찾을 수 없습니다', 404);
          return json({ product: await obj.json() });
        }
        if (user.readOnly) return err('읽기 전용 권한이라 수정할 수 없습니다', 403);
        if (method === 'PUT') return saveManifest(env, id, await request.json(), user);
        if (method === 'DELETE') return deleteProduct(env, id, url.origin);
      }

      m = path.match(/^\/api\/upload\/p\/([^/]+)\/([^/]+)$/);
      if (m && method === 'PUT') {
        if (user.readOnly) return err('읽기 전용 권한이라 올릴 수 없습니다', 403);
        const [, id, file] = m;
        if (!ID_RE.test(id) || !FILE_RE.test(file)) return err('잘못된 파일 이름입니다');
        const type = (request.headers.get('Content-Type') || '').split(';')[0].trim();
        if (!ALLOWED_TYPES.includes(type)) return err('JPG, PNG, WEBP, GIF 이미지만 올릴 수 있습니다');
        const len = Number(request.headers.get('Content-Length') || 0);
        if (len > MAX_IMAGE_BYTES) return err('이미지 1장이 10MB를 넘습니다');
        const buf = await request.arrayBuffer();
        if (!buf.byteLength) return err('빈 파일입니다');
        if (buf.byteLength > MAX_IMAGE_BYTES) return err('이미지 1장이 10MB를 넘습니다');
        if (Math.random() < 0.1 || buf.byteLength > 3 * 1024 * 1024) {
          // 매번 전체 용량을 세면 느려서 가끔(10%)만 확인합니다.
          if ((await totalUsage(env)) + buf.byteLength > MAX_TOTAL_BYTES) return err('저장 공간이 가득 찼습니다. 안 쓰는 상세페이지를 삭제해주세요.', 507);
        }
        // 파일 이름이 업로드마다 달라서 오래 캐시해도 안전합니다. R2 공개 주소(Worker를 거치지 않음)에서도 이 헤더가 그대로 나갑니다.
        await env.BUCKET.put(`p/${id}/${file}`, buf, { httpMetadata: { contentType: type, cacheControl: 'public, max-age=31536000, immutable' } });
        return json({ ok: true, file, size: buf.byteLength, url: `${url.origin}/i/p/${id}/${file}` });
      }

      return err('없는 주소입니다', 404);
    } catch (e) {
      return err('서버 오류: ' + (e && e.message ? e.message : e), 500);
    }
  },
};
