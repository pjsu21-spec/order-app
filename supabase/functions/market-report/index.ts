// 도매시장 시세 리포트 (Supabase Edge Function: market-report)
//  공공데이터포털 '한국농수산식품유통공사_전국 공영도매시장 정산정보'(katSale/trades)에서 전국 공영도매시장의 전일 정산(경락) 자료를 받아
//  품목별로 등급·크기·산지·시장·품종별 kg당 가격과 물량을 정리해 공용 저장값(kv_store)에 넣는다. 화면(index.html '📈 시세 리포트' 탭)은 그 값을 읽어 보여 줌.
//  · 저장: 'mkt-report:YYYY-MM-DD' (그날 리포트) · 'mkt-report-index' (날짜별 요약 — 전일·전주 비교, 2주 흐름)
//  · 품목 목록: 'mkt-report-settings' = { items: [{ key, name, l, m, s }] } (없으면 기본: 대추방울토마토 · 찰토마토 · 딸기)
//  · 매일 아침 pg_cron 이 { action: 'cron' } 으로 부름 (시세리포트_SQL.sql) → 어제(한국 시간) 자료를 받음. 로그인 없이 부르면 30분에 한 번만 실제로 받음
//  · 화면(로그인 토큰 x-app-token)에서 { action: 'run', date } → 그날 자료를 바로 다시 받음 / { action: 'goods', q } → 품목 코드 찾기 (품목 추가용)
//  필요한 비밀값(Supabase → Edge Functions → Secrets): DATA_GO_KR_KEY (공공데이터포털 일반 인증키)
//  자동으로 있는 값: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (저장용)
//  배포할 때 'JWT 확인(Verify JWT)'은 끔 — 이 시스템은 자체 로그인 토큰을 씀.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'apikey, x-app-token, content-type, authorization, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
const API = 'https://apis.data.go.kr/B552845';
export const DEFAULT_ITEMS = [
  { key: '080603', name: '대추방울토마토', l: '08', m: '06', s: '03' },
  { key: '080304', name: '찰토마토', l: '08', m: '03', s: '04' },
  { key: '0804', name: '딸기', l: '08', m: '04', s: '' },
];
const FIELDS = 'whsl_mrkt_nm,gds_sclsf_nm,grd_nm,sz_nm,plor_nm,unit_nm,unit_qty,unit_tot_qty,totprc,lwprc,hgprc,pkg_nm,trd_se';
const KEEP_DAYS = 180;   // 요약(index)에 남길 날짜 수

const p2 = n => String(n).padStart(2, '0');
export function kstDay(offset = 0, now = Date.now()) {
  const k = new Date(now + 9 * 3600e3 + offset * 86400e3);
  return `${k.getUTCFullYear()}-${p2(k.getUTCMonth() + 1)}-${p2(k.getUTCDate())}`;
}
const num = v => { const n = Number(v); return isFinite(n) ? n : 0; };
const r1 = n => Math.round(n * 10) / 10;

// 산지 이름 줄이기: '강원특별자치도 춘천시' → { region: '강원', label: '강원 춘천시' }
const SIDO = [[/^서울/, '서울'], [/^부산/, '부산'], [/^대구/, '대구'], [/^인천/, '인천'], [/^광주/, '광주'], [/^대전/, '대전'], [/^울산/, '울산'], [/^세종/, '세종'],
  [/^경기/, '경기'], [/^강원/, '강원'], [/^충청북|^충북/, '충북'], [/^충청남|^충남/, '충남'], [/^전라북|^전북/, '전북'], [/^전라남|^전남/, '전남'],
  [/^경상북|^경북/, '경북'], [/^경상남|^경남/, '경남'], [/^제주/, '제주']];
export function originOf(nm) {
  const s = String(nm || '').trim();
  if (!s) return { region: '미상', label: '미상' };
  const parts = s.split(/\s+/);
  const hit = SIDO.find(([re]) => re.test(parts[0]));
  if (!hit) return { region: parts[0], label: s };   // 수입산 등 (국가명)
  return { region: hit[1], label: [hit[1]].concat(parts.slice(1, 2)).join(' ') };
}

const blank = v => { const s = String(v == null ? '' : v).trim(); return !s || /^[.\-]+$/.test(s) ? '미표시' : s; };   // 자료에 '.'로 들어온 등급·크기
// 정산 자료 줄(item) → kg 기준 값. kg/g 단위가 아니면 kg 값은 null
export function rowOf(x) {
  const u = String(x.unit_nm || '').trim().toLowerCase();
  const f = u === 'kg' ? 1 : u === 'g' ? 0.001 : 0;
  const uq = num(x.unit_qty), tq = num(x.unit_tot_qty);
  return {
    unitKg: f ? uq * f : null, kg: f ? tq * f : null, amt: num(x.totprc),
    boxes: uq > 0 ? tq / uq : 0, lw: num(x.lwprc), hg: num(x.hgprc),
    grade: blank(x.grd_nm), size: blank(x.sz_nm),
    origin: originOf(x.plor_nm), market: String(x.whsl_mrkt_nm || '').trim() || '-',
    variety: String(x.gds_sclsf_nm || '').trim() || '-', pkg: String(x.pkg_nm || '').trim() || '-', trade: String(x.trd_se || '').trim() || '-',
  };
}

function groupBy(rows, keyOf, top) {
  const m = new Map();
  rows.forEach(r => {
    const k = keyOf(r);
    const g = m.get(k) || { name: k, kg: 0, amt: 0, n: 0, lo: Infinity, hi: 0 };
    g.kg += r.kg; g.amt += r.amt; g.n++;
    if (r.unitKg > 0) {
      if (r.lw > 0) g.lo = Math.min(g.lo, r.lw / r.unitKg);
      if (r.hg > 0) g.hi = Math.max(g.hi, r.hg / r.unitKg);
    }
    m.set(k, g);
  });
  const all = [...m.values()].filter(g => g.kg > 0).sort((a, b) => b.kg - a.kg);
  return all.slice(0, top || all.length).map(g => ({ name: g.name, kg: Math.round(g.kg), avg: Math.round(g.amt / g.kg), lo: isFinite(g.lo) ? Math.round(g.lo) : null, hi: g.hi ? Math.round(g.hi) : null, n: g.n }));
}

// 한 품목의 그날 자료(줄 목록) → 리포트 요약
export function summarize(items) {
  const all = items.map(rowOf);
  const rows = all.filter(r => r.kg > 0 && r.amt > 0);
  const out = { rows: all.length, skipped: all.length - rows.length };
  if (!rows.length) return { ...out, empty: true };
  const kg = rows.reduce((s, r) => s + r.kg, 0), amt = rows.reduce((s, r) => s + r.amt, 0);
  // 대표 포장: kg 물량이 가장 많은 '포장 + 단위' (예: 상자 3kg) → 그 포장 한 개 기준 가격
  const pk = groupBy(rows, r => `${r.pkg}|${r1(r.unitKg)}`)[0];
  const [pkgNm, unitKgS] = pk.name.split('|'); const unitKg = Number(unitKgS);
  const inPk = rows.filter(r => r.pkg === pkgNm && r1(r.unitKg) === unitKg);
  const pkKg = inPk.reduce((s, r) => s + r.kg, 0), pkAmt = inPk.reduce((s, r) => s + r.amt, 0), pkBoxes = inPk.reduce((s, r) => s + r.boxes, 0);
  const lows = inPk.map(r => r.lw).filter(v => v > 0), highs = inPk.map(r => r.hg).filter(v => v > 0);
  return {
    ...out,
    kg: Math.round(kg), amt: Math.round(amt), avg: Math.round(amt / kg),
    pack: { label: `${pkgNm} ${unitKg}kg`, unitKg, avg: Math.round(pkBoxes ? pkAmt / pkBoxes : (pkAmt / pkKg) * unitKg), lo: lows.length ? Math.min(...lows) : null, hi: highs.length ? Math.max(...highs) : null, boxes: Math.round(pkBoxes), share: Math.round((pkKg / kg) * 100) },
    grades: groupBy(rows, r => r.grade),
    sizes: groupBy(rows, r => r.size),
    gradeSize: groupBy(rows, r => `${r.grade} · ${r.size}`, 20),
    regions: groupBy(rows, r => r.origin.region),
    origins: groupBy(rows, r => r.origin.label, 25),
    markets: groupBy(rows, r => r.market),
    varieties: groupBy(rows, r => r.variety),
    trades: groupBy(rows, r => r.trade),
  };
}

// ── 공공데이터 부르기 (초당 요청 제한이 있어 하나씩 차례로, 429면 잠시 쉬고 다시) ──
const sleep = ms => new Promise(r => setTimeout(r, ms));
export function makeApi(key, fetchFn, gapMs = 120) {
  let last = 0;
  return async function call(path, params) {
    const qs = Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    const url = `${API}/${path}?serviceKey=${encodeURIComponent(key)}&returnType=json&${qs}`;
    for (let attempt = 0; attempt < 5; attempt++) {
      const wait = last + gapMs - Date.now(); if (wait > 0) await sleep(wait);
      last = Date.now();
      let res, text;
      try { res = await fetchFn(url); text = await res.text(); } catch (e) { await sleep(800 * (attempt + 1)); continue; }
      if (res.status === 429 || /LIMITED_NUMBER_OF_SERVICE_REQUESTS/.test(text)) { await sleep(1500 * (attempt + 1)); continue; }
      let j; try { j = JSON.parse(text); } catch (e) { throw new Error(`공공데이터 응답 오류 ${res.status}: ${text.slice(0, 160)}`); }
      if (!j.response) throw new Error(`공공데이터 오류: ${text.slice(0, 200)}`);
      const h = j.response.header || {};
      if (h.resultCode && !/^0+$/.test(String(h.resultCode))) throw new Error(`공공데이터 오류 ${h.resultCode}: ${h.resultMsg || ''}`);
      const b = j.response.body || {};
      const it = b.items && b.items.item;
      return { total: num(b.totalCount), items: Array.isArray(it) ? it : it ? [it] : [] };
    }
    throw new Error('공공데이터 요청 제한 — 잠시 후 다시 시도');
  };
}

async function marketsOf(call) {
  const r = await call('katCode/wholesaleMarkets', { pageNo: 1, numOfRows: 200 });
  return r.items.filter(m => m.whsl_mrkt_cd && !/수산/.test(m.whsl_mrkt_nm || ''));
}

// 하루치: 시장마다 · 품목마다 정산 자료를 받아 품목별 요약
export async function buildDay(call, day, items) {
  const markets = await marketsOf(call);
  const got = Object.fromEntries(items.map(it => [it.key, []]));
  const fails = [];
  for (const m of markets) {
    for (const it of items) {
      try {
        for (let p = 1; p <= 20; p++) {
          const q = { pageNo: p, numOfRows: 1000, selectable: FIELDS, 'cond[trd_clcln_ymd::EQ]': day, 'cond[whsl_mrkt_cd::EQ]': m.whsl_mrkt_cd, 'cond[gds_lclsf_cd::EQ]': it.l };
          if (it.m) q['cond[gds_mclsf_cd::EQ]'] = it.m;
          if (it.s) q['cond[gds_sclsf_cd::EQ]'] = it.s;
          const r = await call('katSale/trades', q);
          got[it.key].push(...r.items);
          if (p * 1000 >= r.total || !r.items.length) break;
        }
      } catch (e) { fails.push(`${m.whsl_mrkt_nm}/${it.name}: ${String(e.message || e).slice(0, 80)}`); }
    }
  }
  const out = items.map(it => ({ key: it.key, name: it.name, ...summarize(got[it.key]) }));
  return { date: day, at: new Date().toISOString(), markets: markets.length, fails, empty: out.every(x => x.empty), items: out };
}

// 요약(index)에 그날 값 넣기
export function indexWith(idx, rep) {
  const dates = { ...((idx && idx.dates) || {}) };
  dates[rep.date] = {
    at: rep.at, empty: !!rep.empty, partial: rep.fails.length > 0,
    items: Object.fromEntries(rep.items.filter(x => !x.empty).map(x => [x.key, { name: x.name, kg: x.kg, avg: x.avg, pack: x.pack ? { label: x.pack.label, avg: x.pack.avg } : null }])),
  };
  const keep = Object.keys(dates).sort().slice(-KEEP_DAYS);
  return { ...(idx || {}), dates: Object.fromEntries(keep.map(d => [d, dates[d]])) };
}

// deps: { env(name), fetch, waitUntil?(promise), now?() } — 시험할 때 바꿔 끼움
export async function handle(req, deps) {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const base = deps.env('SUPABASE_URL'), srk = deps.env('SUPABASE_SERVICE_ROLE_KEY'), key = deps.env('DATA_GO_KR_KEY').trim();
  if (!key) return json({ ok: false, error: 'Supabase Secrets 에 DATA_GO_KR_KEY 가 없습니다' }, 500);
  const now = deps.now ? deps.now() : Date.now();
  let body = {};
  try { body = await req.json(); } catch (e) { body = {}; }
  const action = String(body.action || 'cron');

  // 저장값 읽기·쓰기 (서버 권한 키로 — 화면 권한 규칙과 무관하게 이 함수만 씀)
  const SH = { apikey: srk, Authorization: `Bearer ${srk}`, 'Content-Type': 'application/json' };
  const kvGet = async k => {
    const r = await deps.fetch(`${base}/rest/v1/kv_store?key=eq.${encodeURIComponent(k)}&select=value`, { headers: SH });
    if (!r.ok) throw new Error(`저장값 읽기 실패 ${r.status}`);
    const a = await r.json(); let v = a && a[0] ? a[0].value : null;
    if (typeof v === 'string') { try { v = JSON.parse(v); } catch (e) { v = null; } }
    return v;
  };
  const kvSet = async (k, v) => {
    const r = await deps.fetch(`${base}/rest/v1/kv_store?on_conflict=key`, { method: 'POST', headers: { ...SH, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key: k, value: JSON.stringify(v), updated_at: new Date(now).toISOString() }) });
    if (!r.ok) throw new Error(`저장 실패 ${r.status} ${(await r.text().catch(() => '')).slice(0, 120)}`);
  };
  // 화면에서 부를 때: 로그인 토큰으로 서버 자료를 읽어 봐서 로그인 확인
  const token = req.headers.get('x-app-token') || '';
  const loggedIn = async () => {
    if (!token) return false;
    const apikey = req.headers.get('apikey') || deps.env('SUPABASE_ANON_KEY') || '';
    const r = await deps.fetch(`${base}/rest/v1/kv_store?key=eq.mkt-report-settings&select=key`, { headers: { apikey, 'x-app-token': token } });
    return r.ok;
  };

  const call = makeApi(key, deps.fetch);
  try {
    if (action === 'goods') {
      if (!(await loggedIn())) return json({ ok: false, error: 'login required' }, 401);
      const q = String(body.q || '').trim();
      if (q.length < 1) return json({ ok: true, list: [] });
      const list = [];
      for (let p = 1; p <= 20; p++) {
        const r = await call('katCode/goods', { pageNo: p, numOfRows: 1000 });
        r.items.forEach(g => { if (`${g.gds_mclsf_nm} ${g.gds_sclsf_nm}`.includes(q)) list.push({ l: g.gds_lclsf_cd, ln: g.gds_lclsf_nm, m: g.gds_mclsf_cd, mn: g.gds_mclsf_nm, s: g.gds_sclsf_cd, sn: g.gds_sclsf_nm }); });
        if (p * 1000 >= r.total || !r.items.length) break;
      }
      return json({ ok: true, list: list.slice(0, 80) });
    }

    const st = await kvGet('mkt-report-settings').catch(() => null);
    const items = (st && Array.isArray(st.items) && st.items.length ? st.items : DEFAULT_ITEMS)
      .filter(it => it && it.key && it.name && /^\d{2}$/.test(it.l || '')).slice(0, 12);
    const run = async day => {
      const rep = await buildDay(call, day, items);
      await kvSet(`mkt-report:${day}`, rep);
      const idx = await kvGet('mkt-report-index').catch(() => null);
      await kvSet('mkt-report-index', { ...indexWith(idx, rep), lastRunAt: new Date().toISOString() });
      return rep;
    };

    if (action === 'run') {
      if (!(await loggedIn())) return json({ ok: false, error: 'login required' }, 401);
      const day = /^\d{4}-\d{2}-\d{2}$/.test(body.date || '') ? body.date : kstDay(-1, now);
      if (day >= kstDay(0, now)) return json({ ok: false, error: '오늘 이후 날짜는 받을 수 없습니다' }, 400);
      if (day < kstDay(-400, now)) return json({ ok: false, error: '너무 오래된 날짜입니다' }, 400);
      const rep = await run(day);
      return json({ ok: true, date: day, empty: rep.empty, fails: rep.fails.length, items: rep.items.map(x => ({ name: x.name, rows: x.rows, avg: x.avg || null })) });
    }

    // cron: 어제 자료. 로그인 없이 부르면 30분에 한 번만 (마구 불러 공공데이터 사용량을 쓰지 않게)
    const idx = await kvGet('mkt-report-index').catch(() => null);
    const lastAt = idx && idx.lastRunAt ? Date.parse(idx.lastRunAt) : 0;
    if (now - lastAt < 30 * 60e3 && !(await loggedIn())) return json({ ok: true, skipped: 'recent' });
    const day = kstDay(-1, now);
    await kvSet('mkt-report-index', { ...(idx || {}), lastRunAt: new Date(now).toISOString() });   // 실행 중 표시 (겹쳐 부르지 않게)
    const job = run(day).catch(e => console.error('market-report', e));
    if (deps.waitUntil) { deps.waitUntil(job); return json({ ok: true, started: day }); }
    await job;
    return json({ ok: true, done: day });
  } catch (e) {
    return json({ ok: false, error: String((e && e.message) || e) }, 500);
  }
}

// ── 실제 서버(Deno)에서 실행 ──
if (typeof Deno !== 'undefined' && Deno.serve) {
  const env = n => Deno.env.get(n) || '';
  // deno-lint-ignore no-explicit-any
  const ER = (globalThis as any).EdgeRuntime;
  Deno.serve(req => handle(req, { env, fetch, waitUntil: ER && ER.waitUntil ? p => ER.waitUntil(p) : undefined }));
}
