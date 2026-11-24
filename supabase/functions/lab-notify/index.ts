// 연구소 의뢰 샘플 메일 알림 (Supabase Edge Function: lab-notify)
//  화면(index.html)이 샘플 신청을 저장한 뒤 { id } 로 부름 → 신청에 '연구실 생산' 품목이 있으면 하이웍스 SMTP 로 연구소 담당자에게 메일.
//  · 새 의뢰 → [신규], 연구실 생산 품목·출고일·비고 등이 바뀌면 → [변경], 취소되거나 연구실 생산 품목이 빠지면 → [취소]
//  · 같은 내용은 두 번 보내지 않음 (보낸 기록: 표 lab_mail_log, 함수 app_lab_mail_get / app_lab_mail_mark — 연구소메일_SQL.sql)
//  · 받는 사람·켜기/끄기: 공용 저장값 'lab-mail-settings' = { on, to:[메일 주소] } (연구소 탭에서 관리자가 설정)
//  · 로그인 확인: 화면이 보낸 로그인 토큰(x-app-token)으로 서버 자료를 읽어 봄 (로그인 안 됐으면 서버가 401)
//  필요한 비밀값(Supabase → Edge Functions → Secrets): HIWORKS_SMTP_USER, HIWORKS_SMTP_PASS
//    (선택) HIWORKS_SMTP_HOST (기본 smtps.hiworks.com), HIWORKS_SMTP_PORT (기본 465), MAIL_FROM_NAME (기본 다름달음 통합시스템)
//  배포할 때 'JWT 확인(Verify JWT)'은 끔 — 이 시스템은 자체 로그인 토큰을 씀.

import nodemailer from 'npm:nodemailer@6.9.16';

const LAB_PM = '연구실 생산';
const SITE = 'https://order.dareumdaleum.com';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'apikey, x-app-token, content-type, authorization, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
const p2 = n => String(n).padStart(2, '0');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// 한국 시간 'MM/DD(요일) HH:mm'
export function kst(iso) {
  const d = new Date(iso); if (isNaN(d.getTime())) return String(iso || '');
  const k = new Date(d.getTime() + 9 * 3600e3);
  return `${p2(k.getUTCMonth() + 1)}/${p2(k.getUTCDate())}(${'일월화수목금토'[k.getUTCDay()]}) ${p2(k.getUTCHours())}:${p2(k.getUTCMinutes())}`;
}
const purposeOf = note => { const m = /(?:^|\n)\s*용도\s*[:：]\s*([^\n\r]+)/.exec(note || ''); return m ? m[1].trim() : ''; };
const noteRest = note => String(note || '').split(/\r?\n/).filter(l => !/^\s*용도\s*[:：]/.test(l)).join('\n').trim();

// 신청 → 연구소 메일에 쓰는 요약 (연구실 생산 품목만). 연구실 생산 품목이 없거나 취소면 null
export function labSummary(r) {
  if (!r || r.status === '취소') return null;
  const items = (Array.isArray(r.items) ? r.items : []).filter(i => i && ((i.production_method || r.production_method || '') === LAB_PM))
    .map(i => ({ name: String(i.name || i.skuName || i.skuId || ''), packs: Number(i.packs) || 0, boxes: i.boxes == null ? null : Number(i.boxes), production_date: i.production_date || '' }));
  if (!items.length) return null;
  return {
    requester: String(r.requester_name || ''), dept: String(r.requester_dept || ''), ship_at: r.ship_at || '', ship_method: String(r.ship_method || ''),
    purpose: purposeOf(r.note), note: noteRest(r.note), items,
  };
}
export const sigOf = s => (s ? JSON.stringify(s) : 'off');

// 이전 보낸 기록(prev: {sig, summary} | null)과 지금 요약으로 보낼 메일 종류 결정
export function decide(prev, cur) {
  const prevOn = !!(prev && prev.sig && prev.sig !== 'off');
  if (cur && !prevOn) return { kind: '신규', summary: cur };
  if (cur && prevOn && sigOf(cur) !== prev.sig) return { kind: '변경', summary: cur, before: prev.summary || null };
  if (!cur && prevOn) return { kind: '취소', summary: prev.summary || null };
  return null;
}

export function mailOf(kind, s, before) {
  const subj = `[연구소 샘플 의뢰 · ${kind}] ${kst(s.ship_at)} 출고 · ${s.requester}${s.dept ? ' (' + s.dept + ')' : ''}`;
  const itemTxt = s.items.map(i => `- ${i.name} ${i.packs}팩${i.boxes ? ` (${Math.round(i.boxes * 100) / 100}박스)` : ''}${i.production_date ? ` · 생산 ${i.production_date}` : ''}`).join('\n');
  const head = kind === '취소' ? '아래 연구소 의뢰 샘플이 취소되었거나 연구실 생산 품목이 빠졌습니다.' : kind === '변경' ? '연구소 의뢰 샘플 내용이 바뀌었습니다 (바뀐 뒤 내용).' : '새 연구소 의뢰 샘플이 들어왔습니다.';
  const rows = [['신청자', s.requester + (s.dept ? ` (${s.dept})` : '')], ['출고일시', kst(s.ship_at)], ['출고 방식', s.ship_method], ['용도', s.purpose], ['비고', s.note]];
  const text = `${head}\n\n${rows.filter(r => r[1]).map(r => `${r[0]}: ${r[1]}`).join('\n')}\n\n연구실 생산 품목\n${itemTxt}\n`
    + (before && kind === '변경' ? `\n(바뀌기 전 출고일시: ${kst(before.ship_at)} / 품목: ${(before.items || []).map(i => `${i.name} ${i.packs}팩`).join(', ')})\n` : '')
    + `\n통합 시스템 → 🔬 연구소 탭에서 접수·제작 완료를 표시해 주세요: ${SITE}\n(이 메일은 자동으로 보낸 메일입니다)`;
  const html = `<div style="font-family:'Malgun Gothic',sans-serif;font-size:14px;color:#222;">
<p style="margin:0 0 12px;"><b>${esc(head)}</b></p>
<table style="border-collapse:collapse;font-size:13px;">${rows.filter(r => r[1]).map(r => `<tr><td style="padding:4px 12px 4px 0;color:#777;white-space:nowrap;vertical-align:top;">${esc(r[0])}</td><td style="padding:4px 0;white-space:pre-wrap;">${esc(r[1])}</td></tr>`).join('')}</table>
<p style="margin:14px 0 6px;"><b>연구실 생산 품목</b></p>
<table style="border-collapse:collapse;font-size:13px;border:1px solid #ddd;"><tr style="background:#f6f6f6;"><th style="padding:6px 10px;text-align:left;border:1px solid #ddd;">품목</th><th style="padding:6px 10px;border:1px solid #ddd;">수량</th><th style="padding:6px 10px;border:1px solid #ddd;">생산일</th></tr>
${s.items.map(i => `<tr><td style="padding:6px 10px;border:1px solid #ddd;">${esc(i.name)}</td><td style="padding:6px 10px;border:1px solid #ddd;text-align:right;">${i.packs}팩${i.boxes ? ` (${Math.round(i.boxes * 100) / 100}박스)` : ''}</td><td style="padding:6px 10px;border:1px solid #ddd;">${esc(i.production_date || '-')}</td></tr>`).join('')}</table>
${before && kind === '변경' ? `<p style="margin:10px 0 0;color:#777;font-size:12px;">바뀌기 전: ${esc(kst(before.ship_at))} 출고 · ${esc((before.items || []).map(i => `${i.name} ${i.packs}팩`).join(', '))}</p>` : ''}
<p style="margin:16px 0 0;"><a href="${SITE}">통합 시스템 열기</a> → 🔬 연구소 탭에서 접수·제작 완료를 표시해 주세요.</p>
<p style="margin:8px 0 0;color:#999;font-size:12px;">이 메일은 자동으로 보낸 메일입니다.</p></div>`;
  return { subject: subj, text, html };
}

// deps: { env(name), fetch, send({to, subject, text, html}) } — 시험할 때 바꿔 끼움
export async function handle(req, deps) {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const base = deps.env('SUPABASE_URL');
  const apikey = req.headers.get('apikey') || deps.env('SUPABASE_ANON_KEY') || '';
  const token = req.headers.get('x-app-token') || '';
  if (!token) return json({ error: 'login required' }, 401);
  const H = { apikey, 'x-app-token': token, 'Content-Type': 'application/json' };
  const rest = async (path, init = {}) => {
    const r = await deps.fetch(`${base}/rest/v1/${path}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
    if (r.status === 401) throw Object.assign(new Error('login required'), { status: 401 });
    if (!r.ok) throw new Error(`server ${r.status} ${(await r.text().catch(() => '')).slice(0, 120)}`);
    const t = await r.text(); return t ? JSON.parse(t) : null;
  };
  let body = {};
  try { body = await req.json(); } catch (e) { body = {}; }
  try {
    // 받는 사람 (로그인 확인도 겸함)
    const kv = await rest(`kv_store?key=eq.lab-mail-settings&select=value`);
    let st = kv && kv[0] ? kv[0].value : null;
    if (typeof st === 'string') { try { st = JSON.parse(st); } catch (e) { st = null; } }
    const to = (st && Array.isArray(st.to) ? st.to : []).map(x => String(x).trim()).filter(x => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x));
    const on = !!(st && st.on) && to.length > 0;

    if (body.test) {
      if (!to.length) return json({ ok: false, error: '받는 메일 주소가 없습니다' }, 400);
      const s = { requester: '테스트', dept: '', ship_at: new Date().toISOString(), ship_method: '직접 픽업', purpose: '메일 알림 시험', note: '연구소 메일 알림 설정을 시험하는 메일입니다.', items: [{ name: '시험 품목', packs: 1, boxes: null, production_date: '' }] };
      const m = mailOf('테스트', s, null);
      await deps.send({ to, ...m });
      return json({ ok: true, sent: true, kind: '테스트', to: to.length });
    }

    const id = body.id == null ? '' : String(body.id);
    if (!id) return json({ error: 'id required' }, 400);
    const rows = await rest(`sample_requests?id=eq.${encodeURIComponent(id)}&select=*`);
    const cur = labSummary(rows && rows[0]);
    const prev = await rest('rpc/app_lab_mail_get', { method: 'POST', body: JSON.stringify({ p_id: id }) });
    const d = decide(prev, cur);
    if (!d) return json({ ok: true, sent: false, reason: 'no change' });
    if (!on) {   // 알림이 꺼져 있어도 기록은 맞춰 둠 (켰을 때 예전 건이 한꺼번에 '신규'로 가지 않게)
      await rest('rpc/app_lab_mail_mark', { method: 'POST', body: JSON.stringify({ p_id: id, p_sig: sigOf(cur), p_summary: cur, p_kind: d.kind + '(안 보냄)' }) });
      return json({ ok: true, sent: false, reason: 'off' });
    }
    if (!d.summary) return json({ ok: true, sent: false, reason: 'no summary' });
    const m = mailOf(d.kind, d.summary, d.before);
    await deps.send({ to, ...m });
    await rest('rpc/app_lab_mail_mark', { method: 'POST', body: JSON.stringify({ p_id: id, p_sig: sigOf(cur), p_summary: cur, p_kind: d.kind }) });
    return json({ ok: true, sent: true, kind: d.kind, to: to.length });
  } catch (e) {
    const status = e && e.status === 401 ? 401 : 500;
    return json({ ok: false, error: String((e && e.message) || e) }, status);
  }
}

// ── 실제 서버(Deno)에서 실행 ──
if (typeof Deno !== 'undefined' && Deno.serve) {
  const env = n => Deno.env.get(n) || '';
  // 보낼 때마다 비밀값을 새로 읽어 연결 (Secrets 를 바꾸면 바로 적용 — 예전 값을 기억해 두지 않음). 앞뒤 공백은 지움
  const send = async ({ to, subject, text, html }) => {
    const user = env('HIWORKS_SMTP_USER').trim(), pass = env('HIWORKS_SMTP_PASS').trim();
    if (!user || !pass) throw new Error('Supabase Secrets 에 HIWORKS_SMTP_USER / HIWORKS_SMTP_PASS 가 없습니다');
    const port = Number(env('HIWORKS_SMTP_PORT') || 465);
    const transport = nodemailer.createTransport({ host: env('HIWORKS_SMTP_HOST').trim() || 'smtps.hiworks.com', port, secure: port === 465, auth: { user, pass } });
    const from = `"${(env('MAIL_FROM_NAME') || '다름달음 통합시스템').replace(/"/g, '')}" <${user}>`;
    try { await transport.sendMail({ from, to: to.join(', '), subject, text, html }); }
    finally { try { transport.close(); } catch (e) { /* 무시 */ } }
  };
  Deno.serve(req => handle(req, { env, fetch, send }));
}
