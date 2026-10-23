// ══════════════════════════════════════════════════════════════════
// 다름달음 공유폴더 — Cloudflare Worker
//  · 파일 본문은 R2 버킷(바인딩 이름: BUCKET)에 저장
//  · 로그인/권한/파일 목록은 발주 프로그램의 Supabase 프로젝트를 그대로 사용
//    (users.access_files = true 이거나 role = 'admin' 인 계정만 접근)
// ══════════════════════════════════════════════════════════════════

const DEFAULT_SB_URL = 'https://rsgbqlrxtexknhsvkroc.supabase.co';
const DEFAULT_SB_KEY = 'sb_publishable_Es6Y1pOe1friYzEnvT0iSw_gqQQvFvJ';

// 허용할 웹페이지 주소 (GitHub Pages)
const ALLOWED_ORIGINS = ['https://pjsu21-spec.github.io'];

// R2 무료 한도(10GB)를 넘지 않도록 9.5GB에서 업로드를 막습니다.
// 유료로 늘리려면 이 숫자만 바꾸면 됩니다.
const MAX_TOTAL_BYTES = 9.5 * 1024 * 1024 * 1024;

const SINGLE_UPLOAD_MAX = 95 * 1024 * 1024; // 한 번에 올릴 수 있는 최대 크기 (그 이상은 분할 업로드)

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    try {
      const res = await route(request, env);
      const headers = new Headers(res.headers);
      for (const [k, v] of Object.entries(cors)) headers.set(k, v);
      return new Response(res.body, { status: res.status, headers });
    } catch (e) {
      const status = e instanceof HttpError ? e.status : 500;
      if (status === 500) console.error(e);
      return json({ error: e.message || '서버 오류' }, status, cors);
    }
  }
};

function corsHeaders(origin, env) {
  const extra = (env.EXTRA_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const allowed = [...ALLOWED_ORIGINS, ...extra];
  const h = {
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
  if (allowed.includes(origin)) h['Access-Control-Allow-Origin'] = origin;
  return h;
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders }
  });
}

// ── Supabase (PostgREST) ──
function sb(env) {
  const url = env.SB_URL || DEFAULT_SB_URL;
  const key = env.SB_KEY || DEFAULT_SB_KEY;
  const headers = { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' };
  async function call(method, path, body, prefer) {
    const res = await fetch(`${url}/rest/v1/${path}`, {
      method,
      headers: prefer ? { ...headers, 'Prefer': prefer } : headers,
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      throw new HttpError(502, `DB 오류 (${res.status}): ${t.slice(0, 200)}`);
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }
  return {
    get: (path) => call('GET', path),
    insert: (table, row) => call('POST', table, row, 'return=representation'),
    patch: (path, row) => call('PATCH', path, row, 'return=representation'),
    del: (path) => call('DELETE', path),
    // PostgREST는 한 번에 최대 1000행만 주므로 끝까지 반복해서 가져옵니다.
    async getAll(path) {
      const out = [];
      const sep = path.includes('?') ? '&' : '?';
      for (let offset = 0; ; offset += 1000) {
        const rows = await call('GET', `${path}${sep}limit=1000&offset=${offset}`);
        out.push(...rows);
        if (rows.length < 1000) break;
      }
      return out;
    }
  };
}

const enc = encodeURIComponent;
const isUuid = (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s || '');

// 세션 토큰 → 사용자 (DB 함수 app_me). 함수가 없으면 { missing: true }
async function rpcMe(env, token) {
  const url = env.SB_URL || DEFAULT_SB_URL;
  const key = env.SB_KEY || DEFAULT_SB_KEY;
  const res = await fetch(`${url}/rest/v1/rpc/app_me`, {
    method: 'POST',
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_token: token })
  });
  if (res.status === 404) return { missing: true };
  if (!res.ok) throw new HttpError(502, `DB 오류 (${res.status})`);
  return { user: await res.json() };
}

// ── 로그인 확인: 발주 프로그램의 세션 토큰을 그대로 검증 ──
async function authenticate(request, env, url) {
  const header = request.headers.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : url.searchParams.get('t');
  if (!token) throw new HttpError(401, '로그인이 필요합니다');
  if (token.length > 200) throw new HttpError(401, '로그인이 만료되었습니다');
  const db = sb(env);
  // 세션 확인은 DB 함수(app_me)로 합니다 (users/sessions 테이블을 직접 읽지 않음).
  // 함수가 아직 없으면(404) 예전 방식으로 확인합니다 — 보안 0단계 SQL 적용 전 호환용.
  let u = null;
  const me = await rpcMe(env, token);
  if (!me.missing) {
    u = me.user;
    if (!u) throw new HttpError(401, '로그인이 만료되었습니다');
  } else {
    const sessions = await db.get(`sessions?token=eq.${enc(token)}&limit=1`);
    if (!sessions.length) throw new HttpError(401, '로그인이 만료되었습니다');
    const s = sessions[0];
    if (s.expires_at && new Date(s.expires_at) < new Date()) throw new HttpError(401, '로그인이 만료되었습니다');
    const users = await db.get(`users?id=eq.${enc(s.user_id)}&is_active=eq.true&limit=1`);
    if (!users.length) throw new HttpError(401, '사용할 수 없는 계정입니다');
    u = users[0];
  }
  const isAdmin = u.role === 'admin';
  if (!isAdmin && u.access_files !== true) throw new HttpError(403, '공유폴더 접근 권한이 없습니다. 관리자에게 요청해주세요.');
  // 읽기 전용(users.readonly_files = true): 보기·내려받기만 가능. 관리자에게는 적용되지 않습니다.
  const readOnly = !isAdmin && u.readonly_files === true;
  return { id: String(u.id), rawId: u.id, username: u.username, display_name: u.display_name, isAdmin, readOnly };
}

async function writeLog(env, user, action, detail) {
  try {
    await sb(env).insert('activity_log', {
      user_id: user.rawId, username: user.username, display_name: user.display_name, action, detail
    });
  } catch (e) { console.warn('로그 기록 실패', e.message); }
}

// ── 이름 처리 ──
function cleanName(name) {
  const n = String(name || '').replace(/[\\/\u0000-\u001f]/g, '_').trim();
  if (!n || n === '.' || n === '..') throw new HttpError(400, '이름을 입력해주세요');
  if (n.length > 200) throw new HttpError(400, '이름이 너무 깁니다 (200자 이내)');
  return n;
}

const parentFilter = (parentId) => parentId ? `parent_id=eq.${parentId}` : 'parent_id=is.null';

function normalizeParent(v) {
  if (!v || v === 'root' || v === 'null') return null;
  if (!isUuid(v)) throw new HttpError(400, '잘못된 폴더입니다');
  return v;
}

async function ensureFolder(db, parentId) {
  if (!parentId) return;
  const rows = await db.get(`shared_files?id=eq.${parentId}&is_folder=eq.true&select=id&limit=1`);
  if (!rows.length) throw new HttpError(404, '폴더를 찾을 수 없습니다. 새로고침 해주세요.');
}

// 같은 폴더에 같은 이름이 있으면 "이름 (2).확장자" 식으로 바꿉니다.
async function uniqueName(db, parentId, name, exceptId) {
  const siblings = await db.getAll(`shared_files?${parentFilter(parentId)}&select=id,name`);
  const taken = new Set(siblings.filter(r => r.id !== exceptId).map(r => r.name.toLowerCase()));
  if (!taken.has(name.toLowerCase())) return name;
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  for (let i = 2; i < 1000; i++) {
    const candidate = `${base} (${i})${ext}`;
    if (!taken.has(candidate.toLowerCase())) return candidate;
  }
  throw new HttpError(409, '같은 이름의 파일이 너무 많습니다');
}

async function totalUsage(db) {
  const rows = await db.getAll('shared_files?is_folder=eq.false&select=size');
  return rows.reduce((sum, r) => sum + Number(r.size || 0), 0);
}

async function checkQuota(db, addBytes) {
  const used = await totalUsage(db);
  if (used + addBytes > MAX_TOTAL_BYTES) {
    throw new HttpError(413, '공유폴더 저장 공간이 부족합니다. 필요 없는 파일을 지운 뒤 다시 시도해주세요.');
  }
}

async function insertFileRow(db, user, { parentId, name, size, mime, key }) {
  const finalName = await uniqueName(db, parentId, name);
  const rows = await db.insert('shared_files', {
    parent_id: parentId, name: finalName, is_folder: false, size, mime: mime || null,
    r2_key: key, uploaded_by: user.id, uploaded_by_name: user.display_name
  });
  return rows[0];
}

// R2는 길이를 아는 본문만 받으므로, Content-Length 기준으로 길이를 고정합니다.
function sizedBody(request) {
  const len = Number(request.headers.get('Content-Length'));
  if (!request.body || !Number.isFinite(len) || len <= 0) throw new HttpError(411, '파일 내용이 없습니다');
  return { size: len, stream: request.body.pipeThrough(new FixedLengthStream(len)) };
}

// ── 라우팅 ──
async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === '/' || path === '/health') return json({ ok: true, service: '다름달음 공유폴더' });

  const user = await authenticate(request, env, url);
  const db = sb(env);

  // 목록 전체 (폴더 구조는 화면에서 조립)
  if (method === 'GET' && path === '/api/list') {
    const items = await db.getAll('shared_files?select=id,parent_id,name,is_folder,size,mime,uploaded_by,uploaded_by_name,created_at&order=name.asc');
    const used = items.reduce((s, r) => s + (r.is_folder ? 0 : Number(r.size || 0)), 0);
    return json({
      items, used, limit: MAX_TOTAL_BYTES,
      me: { id: user.id, display_name: user.display_name, isAdmin: user.isAdmin, readOnly: user.readOnly }
    });
  }

  // 여기부터는 내용을 바꾸는 요청 — 읽기 전용 사용자는 내려받기(/dl/)만 통과
  if (user.readOnly && path.startsWith('/api/')) {
    throw new HttpError(403, '읽기 전용 권한입니다. 올리기·이름 바꾸기·삭제는 할 수 없습니다.');
  }

  // 새 폴더
  if (method === 'POST' && path === '/api/folder') {
    const body = await request.json();
    const parentId = normalizeParent(body.parent_id);
    await ensureFolder(db, parentId);
    const name = await uniqueName(db, parentId, cleanName(body.name));
    const rows = await db.insert('shared_files', {
      parent_id: parentId, name, is_folder: true, size: 0,
      uploaded_by: user.id, uploaded_by_name: user.display_name
    });
    await writeLog(env, user, 'file_folder_create', `공유폴더: 폴더 생성 '${name}'`);
    return json({ item: rows[0] });
  }

  // 일반 업로드 (95MB 이하)
  if (method === 'PUT' && path === '/api/upload') {
    const parentId = normalizeParent(url.searchParams.get('parent'));
    const name = cleanName(url.searchParams.get('name'));
    const mime = url.searchParams.get('type') || 'application/octet-stream';
    const { size, stream } = sizedBody(request);
    if (size > SINGLE_UPLOAD_MAX) throw new HttpError(413, '파일이 너무 큽니다');
    await ensureFolder(db, parentId);
    await checkQuota(db, size);
    const key = `f/${crypto.randomUUID()}`;
    const obj = await env.BUCKET.put(key, stream, { httpMetadata: { contentType: mime } });
    try {
      const item = await insertFileRow(db, user, { parentId, name, size: obj.size, mime, key });
      await writeLog(env, user, 'file_upload', `공유폴더: 업로드 '${item.name}' (${obj.size} bytes)`);
      return json({ item });
    } catch (e) {
      await env.BUCKET.delete(key);
      throw e;
    }
  }

  // 분할 업로드 시작 (대용량)
  if (method === 'POST' && path === '/api/mpu/create') {
    const body = await request.json();
    const parentId = normalizeParent(body.parent_id);
    cleanName(body.name);
    await ensureFolder(db, parentId);
    await checkQuota(db, Number(body.size || 0));
    const key = `f/${crypto.randomUUID()}`;
    const mpu = await env.BUCKET.createMultipartUpload(key, {
      httpMetadata: { contentType: body.type || 'application/octet-stream' }
    });
    return json({ key, uploadId: mpu.uploadId });
  }

  // 분할 업로드: 조각 하나
  if (method === 'PUT' && path === '/api/mpu/part') {
    const key = url.searchParams.get('key') || '';
    const uploadId = url.searchParams.get('uploadId') || '';
    const partNumber = Number(url.searchParams.get('part'));
    if (!/^f\/[0-9a-f-]{36}$/.test(key) || !uploadId || !(partNumber >= 1 && partNumber <= 10000)) {
      throw new HttpError(400, '잘못된 요청입니다');
    }
    const { stream } = sizedBody(request);
    const mpu = env.BUCKET.resumeMultipartUpload(key, uploadId);
    const part = await mpu.uploadPart(partNumber, stream);
    return json({ partNumber: part.partNumber, etag: part.etag });
  }

  // 분할 업로드 완료
  if (method === 'POST' && path === '/api/mpu/complete') {
    const body = await request.json();
    const key = body.key || '';
    if (!/^f\/[0-9a-f-]{36}$/.test(key) || !body.uploadId || !Array.isArray(body.parts)) {
      throw new HttpError(400, '잘못된 요청입니다');
    }
    const parentId = normalizeParent(body.parent_id);
    const name = cleanName(body.name);
    const mpu = env.BUCKET.resumeMultipartUpload(key, body.uploadId);
    const obj = await mpu.complete(body.parts.map(p => ({ partNumber: p.partNumber, etag: p.etag })));
    try {
      await ensureFolder(db, parentId);
      const item = await insertFileRow(db, user, { parentId, name, size: obj.size, mime: body.type, key });
      await writeLog(env, user, 'file_upload', `공유폴더: 업로드 '${item.name}' (${obj.size} bytes)`);
      return json({ item });
    } catch (e) {
      await env.BUCKET.delete(key);
      throw e;
    }
  }

  // 분할 업로드 취소
  if (method === 'POST' && path === '/api/mpu/abort') {
    const body = await request.json();
    if (/^f\/[0-9a-f-]{36}$/.test(body.key || '') && body.uploadId) {
      try { await env.BUCKET.resumeMultipartUpload(body.key, body.uploadId).abort(); } catch (e) { /* 이미 정리됨 */ }
    }
    return json({ ok: true });
  }

  // 이름 바꾸기 (올린 사람 또는 관리자)
  if (method === 'POST' && path === '/api/rename') {
    const body = await request.json();
    if (!isUuid(body.id)) throw new HttpError(400, '잘못된 요청입니다');
    const rows = await db.get(`shared_files?id=eq.${body.id}&limit=1`);
    if (!rows.length) throw new HttpError(404, '항목을 찾을 수 없습니다');
    const row = rows[0];
    if (!user.isAdmin && row.uploaded_by !== user.id) throw new HttpError(403, '올린 사람 또는 관리자만 이름을 바꿀 수 있습니다');
    const name = await uniqueName(db, row.parent_id, cleanName(body.name), row.id);
    const updated = await db.patch(`shared_files?id=eq.${row.id}`, { name });
    await writeLog(env, user, 'file_rename', `공유폴더: 이름 변경 '${row.name}' → '${name}'`);
    return json({ item: updated[0] });
  }

  // 다른 폴더로 이동 (파일: 올린 사람 또는 관리자 / 폴더: 관리자만)
  if (method === 'POST' && path === '/api/move') {
    const body = await request.json();
    if (!isUuid(body.id)) throw new HttpError(400, '잘못된 요청입니다');
    const destId = normalizeParent(body.parent_id);
    const all = await db.getAll('shared_files?select=id,parent_id,name,is_folder,uploaded_by');
    const byId = new Map(all.map(r => [r.id, r]));
    const row = byId.get(body.id);
    if (!row) throw new HttpError(404, '항목을 찾을 수 없습니다');
    if (row.is_folder) {
      if (!user.isAdmin) throw new HttpError(403, '폴더는 관리자만 이동할 수 있습니다');
    } else if (!user.isAdmin && row.uploaded_by !== user.id) {
      throw new HttpError(403, '올린 사람 또는 관리자만 이동할 수 있습니다');
    }
    if (destId) {
      const dest = byId.get(destId);
      if (!dest || !dest.is_folder) throw new HttpError(404, '옮길 폴더를 찾을 수 없습니다. 새로고침 해주세요.');
      // 폴더를 자기 자신이나 자기 안의 폴더로 옮기는 것 방지
      for (let cur = dest, guard = 0; cur && guard < 200; cur = cur.parent_id ? byId.get(cur.parent_id) : null, guard++) {
        if (cur.id === row.id) throw new HttpError(400, '폴더를 자기 자신 안으로 옮길 수 없습니다');
      }
    }
    if ((row.parent_id || null) === destId) return json({ item: row });
    const name = await uniqueName(db, destId, row.name, row.id);
    const updated = await db.patch(`shared_files?id=eq.${row.id}`, { parent_id: destId, name });
    const destName = destId ? byId.get(destId).name : '전체';
    await writeLog(env, user, 'file_move', `공유폴더: '${row.name}' → '${destName}' 폴더로 이동`);
    return json({ item: updated[0] });
  }

  // 삭제 (파일: 올린 사람 또는 관리자 / 폴더: 관리자만, 안의 내용까지 함께 삭제)
  if (method === 'POST' && path === '/api/delete') {
    const body = await request.json();
    if (!isUuid(body.id)) throw new HttpError(400, '잘못된 요청입니다');
    const all = await db.getAll('shared_files?select=id,parent_id,name,is_folder,r2_key,uploaded_by');
    const target = all.find(r => r.id === body.id);
    if (!target) throw new HttpError(404, '항목을 찾을 수 없습니다');
    if (target.is_folder) {
      if (!user.isAdmin) throw new HttpError(403, '폴더는 관리자만 삭제할 수 있습니다');
    } else if (!user.isAdmin && target.uploaded_by !== user.id) {
      throw new HttpError(403, '올린 사람 또는 관리자만 삭제할 수 있습니다');
    }
    const children = new Map();
    for (const r of all) {
      if (!children.has(r.parent_id)) children.set(r.parent_id, []);
      children.get(r.parent_id).push(r);
    }
    const doomed = [];
    const stack = [target];
    while (stack.length) {
      const r = stack.pop();
      doomed.push(r);
      for (const c of children.get(r.id) || []) stack.push(c);
    }
    const keys = doomed.map(r => r.r2_key).filter(Boolean);
    for (let i = 0; i < keys.length; i += 1000) await env.BUCKET.delete(keys.slice(i, i + 1000));
    const ids = doomed.map(r => r.id);
    for (let i = 0; i < ids.length; i += 100) {
      await db.del(`shared_files?id=in.(${ids.slice(i, i + 100).join(',')})`);
    }
    await writeLog(env, user, 'file_delete',
      `공유폴더: ${target.is_folder ? '폴더' : '파일'} 삭제 '${target.name}'` + (doomed.length > 1 ? ` (하위 ${doomed.length - 1}개 포함)` : ''));
    return json({ ok: true, deleted: ids });
  }

  // 내려받기 / 미리보기
  if (method === 'GET' && path.startsWith('/dl/')) {
    const id = path.slice(4);
    if (!isUuid(id)) throw new HttpError(400, '잘못된 요청입니다');
    const rows = await db.get(`shared_files?id=eq.${id}&is_folder=eq.false&limit=1`);
    if (!rows.length) throw new HttpError(404, '파일을 찾을 수 없습니다');
    const row = rows[0];
    const range = request.headers.get('Range');
    const obj = await env.BUCKET.get(row.r2_key, range ? { range: request.headers } : undefined);
    if (!obj) throw new HttpError(404, '파일 본문을 찾을 수 없습니다');
    const headers = new Headers();
    headers.set('Content-Type', row.mime || 'application/octet-stream');
    // 브라우저에서 바로 열어도 안전한 형식(사진·영상·음성·PDF)만 미리보기 허용
    const m = (row.mime || '').toLowerCase();
    const previewable = (m.startsWith('image/') && m !== 'image/svg+xml') || m.startsWith('video/') || m.startsWith('audio/') || m === 'application/pdf';
    const disp = (url.searchParams.get('inline') === '1' && previewable) ? 'inline' : 'attachment';
    headers.set('Content-Disposition', `${disp}; filename*=UTF-8''${enc(row.name)}`);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'private, no-store');
    headers.set('X-Content-Type-Options', 'nosniff');
    let status = 200;
    if (range && obj.range) {
      const offset = obj.range.offset ?? (obj.size - obj.range.suffix);
      const length = obj.range.length ?? (obj.size - offset);
      headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${obj.size}`);
      headers.set('Content-Length', String(length));
      status = 206;
    } else {
      headers.set('Content-Length', String(obj.size));
    }
    return new Response(obj.body, { status, headers });
  }

  throw new HttpError(404, '없는 주소입니다');
}
