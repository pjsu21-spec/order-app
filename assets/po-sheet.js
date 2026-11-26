// ══════════════════ 발주취합 엑셀 새 방식: 서식 파일 없이 직접 만들기 ══════════════════
// 모양(글꼴·색·테두리·칸 너비)은 assets/po-sheet-base.js(지금 서식에서 뽑은 값)를 쓰고, 업체 줄·품목 칸은 그날 자료로 새로 만든다.
// 같은 표(grid)를 엑셀 파일(toXlsx)과 화면/캡처/인쇄용 HTML(toHtml)로 내보낸다. 출력·공유용이라 수식 없이 값만 넣는다.
(function(){
  'use strict';
  const CI = s => s.split('').reduce((a, c) => a * 26 + c.charCodeAt(0) - 64, 0);
  const CL = n => { let s = ''; while(n > 0){ const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
  const R2 = v => Math.round((Number(v) || 0) * 100) / 100;
  const LASTC = 42;   // AP
  // 품목 열 묶음 (서식과 같음): 머리글 '총수량' 글자 칸·단위
  const GROUPS = [
    { cols: ['J', 'K', 'L', 'M'], cell: 'J7', unit: '박스' }, { cols: ['N', 'O', 'P', 'Q'], cell: 'N7', unit: '박스' },
    { cols: ['R', 'S'], cell: 'R7', unit: '박스' }, { cols: ['U', 'V', 'W'], cell: 'U7', unit: '박스' },
    { cols: ['Y', 'Z', 'AA'], cell: 'Y7', unit: '병' }, { cols: ['AC', 'AD', 'AE', 'AF'], cell: 'AC7', unit: '팩' },
    { cols: ['AG', 'AH'], cell: 'AG7', unit: '팩' }, { cols: ['AJ'], cell: 'AJ7', unit: '박스' }
  ];
  const PROD_COLS = GROUPS.flatMap(g => g.cols);
  const BOX_COLS = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'AJ'];
  const PACK_COLS = ['Y', 'Z', 'AA', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH'];
  // 제품별 수량 줄 (서식 6~13행)
  const LINES = [
    { r: 6, label: '스테비아', box: ['J', 'N'], pack: ['AC'], kg: 2 }, { r: 7, label: '망고향', box: ['K', 'O'], pack: ['AD'], kg: 2 },
    { r: 8, label: '자몽향', box: ['L', 'P'], pack: ['AE'], kg: 2 }, { r: 9, label: '복숭아향', box: ['M', 'Q'], pack: ['AF'], kg: 2 },
    { r: 10, label: '투래곤후르츠', box: ['U'], pack: [], kg: 1.8 }, { r: 11, label: '왓더넛츠(검은콩)', bottle: ['Y'] },
    { r: 12, label: '왓더넛츠(아몬드)', bottle: ['Z'] }, { r: 13, label: '포도쉐킷', box: ['R', 'S'], pack: ['AG', 'AH'], kg: 1.8 }
  ];
  const WD = '일월화수목금토';

  // ── 표(grid) ──
  function Grid(){ this.rows = []; this.merges = []; this.cols = []; }
  Grid.prototype.row = function(r){ return this.rows[r] || (this.rows[r] = { h: 15, hidden: false, cells: {} }); };
  Grid.prototype.set = function(r, col, v, st){ this.row(r).cells[col] = { v: v == null ? '' : v, st }; };
  Grid.prototype.merge = function(a, b){ if(a !== b) this.merges.push(a + ':' + b); };
  const style = i => window.PO_BASE.styles[i];
  const withBd = (s, t, b) => { const o = Object.assign({}, s); o.bd = s.bd.slice(); if(t !== undefined) o.bd[2] = t; if(b !== undefined) o.bd[3] = b; return o; };
  const withFill = (s, fill, fc, bold) => { const o = Object.assign({}, s); if(fill) o.fill = fill.toUpperCase(); if(fc) o.fc = fc.toUpperCase(); if(bold) o.b = 1; return o; };
  // 칸 스타일 고르기: [기본, 켜짐(값>0), 조건 칸]
  function pick(spec, val, refVal){
    if(!spec) return style(0);
    const on = spec[1] != null && (spec[2] ? Number(refVal) > 0 : Number(val) > 0);
    return style(on ? spec[1] : spec[0]);
  }
  const hasTB = s => !!(s.bd[2] || s.bd[3]);

  // ── 색 규칙 (거래처명 / 납품담당 / 적재방식) ──
  function textRule(rules, target, text){
    const t = String(text || '').toLowerCase();
    if(!t) return null;
    return (rules || []).find(r => r.target === target && r.kw && t.includes(String(r.kw).toLowerCase())) || null;
  }

  function build(m){
    const B = window.PO_BASE, g = new Grid();
    const rules = m.rules || { text: B.textRules, name: B.nameRules.map(x => ({ target: 'name', kw: x.kw, fill: x.fill })) };
    const allRules = [...(rules.text || []), ...(rules.name || [])];
    g.cols = B.cols.map(w => ({ w, hidden: false }));
    const col15 = m.col15 || {};
    const vals = {};   // 서식 주소 → 값 (머리글 조건부 색 판단용)
    // ── 1) 머리글 1~18행 ──
    const sumC = (cs, src) => R2((cs || []).reduce((a, c) => a + (Number((src || col15)[c]) || 0), 0));
    const boxesAll = sumC(BOX_COLS), packsAll = R2(boxesAll * 4 + sumC(PACK_COLS));
    // 1박스 = 1개 품목(예: 찰토리 2.5kg — SKU 박스입수 1)만 든 팩 열: '박스'로 보이고 총 박스에 더함 (팩 수는 그대로 1개씩)
    const ONE = (m.oneCols || []).filter(c => PACK_COLS.includes(c));
    vals.G15 = m.totPacks != null ? m.totPacks : packsAll; vals.H15 = R2(boxesAll + sumC(ONE));
    PROD_COLS.forEach(c => { vals[c + '15'] = R2(col15[c]); vals[c + '16'] = PACK_COLS.includes(c) ? R2(col15[c]) : R2((col15[c] || 0) * 4); });
    const dyn = {};
    const d = new Date(m.date + 'T00:00:00');
    dyn.B2 = { n: Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(1899, 11, 30)) / 86400000), date: m.date };
    dyn.D2 = '(' + WD[d.getDay()] + ')';
    const c15 = c => Number(col15[c]) || 0;
    dyn.D3 = ` ◇토마토 : ${R2((sumC(['J', 'K', 'L', 'M']) + sumC(['N', 'O', 'P', 'Q'])) * 2 + sumC(['AC', 'AD', 'AE', 'AF']) * 0.15)}kg    ◇포도 : ${R2((c15('R') + c15('S')) * 1.8 + (c15('AG') + c15('AH')) * 0.15)}kg    ◇용과 : ${R2(c15('U') * 1.8)}kg`;
    dyn.D4 = ` ◇검은콩 : ${R2(c15('Y') * 0.15)}kg    ◇아몬드 : ${R2(c15('Z') * 0.15)}kg`;
    const hideRows = new Set();
    LINES.forEach(L => {
      const stock = sumC(L.box || L.bottle, m.stockByCol || {});
      let text, used;
      if(L.bottle){ const n = sumC(L.bottle); used = n; text = `□${L.label} : ${n}병   [${R2(n * 0.15)}kg]`; }
      else { const bx = sumC(L.box), pk = sumC(L.pack); used = bx + pk; text = `□${L.label} : ${bx}박스(${R2(bx * 4 + pk)}팩)   [${R2(bx * L.kg + pk * 0.15)}kg]`; }
      dyn['B' + L.r] = text; dyn['G' + L.r] = stock || ''; dyn['H' + L.r] = R2(stock - sumC(L.box || L.bottle) - sumC(L.box || L.bottle, m.smpUseByCol || {}));   // 전날 생산 샘플이 오늘 재고에서 나감
      if(!(stock > 0) && !(used > 0)) hideRows.add(L.r);
    });
    GROUPS.forEach(G => { const used = G.cols.filter(c => c15(c) > 0); dyn[G.cell] = `총수량 : ${sumC(G.cols)}${used.length && used.every(c => ONE.includes(c)) ? '박스' : G.unit}`; });
    dyn.G15 = vals.G15; dyn.H15 = vals.H15;
    PROD_COLS.forEach(c => { dyn[c + '15'] = vals[c + '15']; dyn[c + '16'] = vals[c + '16']; });
    B.header.rows.forEach(row => {
      const R = g.row(row.r); R.h = row.h; R.hidden = hideRows.has(row.r);
      row.cells.forEach(([col, st, v, on, ref]) => {
        const addr = col + row.r;
        let val = v;
        if(dyn[addr] !== undefined) val = dyn[addr];
        if(m.headText && m.headText[addr] != null) val = m.headText[addr];   // 묶음 머리글 용량(예: 대추방울토마토 750g)
        const s = on != null ? style((ref ? Number(vals[ref]) > 0 : Number(typeof val === 'object' ? 0 : val) > 0) ? on : st) : style(st);
        g.set(row.r, col, val, s);
      });
    });
    B.header.merges.forEach(x => { const [a, b] = x.split(':'); g.merge(a, b); });
    // 열 숨김: 품목 열은 그날 수량이 있을 때만, 사이 칸은 양쪽에 보이는 열이 있을 때만 (서식과 같은 규칙)
    const vis = c => c15(c) > 0;
    PROD_COLS.forEach(c => { g.cols[CI(c) - 1].hidden = !vis(c); });
    const any = cs => cs.some(vis);
    const set = (c, on) => { g.cols[CI(c) - 1].hidden = !on; };
    set('T', any(['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S']) && any(['U', 'V', 'W', 'Y', 'Z', 'AA', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AJ']));
    set('X', any(['U', 'V', 'W']) && any(['Y', 'Z', 'AA', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AJ']));
    set('AB', any(['Y', 'Z', 'AA']) && any(['AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AJ']));
    set('AK', vis('AJ'));
    // 손으로 쓰던 계산 칸(AQ 이후)은 넣지 않음 → 열 목록도 AP까지

    // ── 2) 업체 줄 ──
    let r = 19;
    const rowSum = (rows, key) => R2(rows.reduce((a, x) => a + (Number(key === 'G' ? x.packs : key === 'H' ? x.boxes : (x.qty || {})[key]) || 0), 0));
    const total = { G: 0, H: 0 }; PROD_COLS.forEach(c => { total[c] = 0; });
    // 한 줄 쓰기: vec(대표 행 칸 스타일), pos(묶음 경계), v(값)
    function emitRow(vec, pos, v, h){
      const R = g.row(r); R.h = h || B.heights.body;
      for(let n = 1; n <= LASTC; n++){
        const col = CL(n), spec = vec[col];
        let val = v[col]; if(val === undefined) val = '';
        let s = pick(spec, val);
        if(pos && pos.lines){   // 업체 줄: 묶음 경계는 굵은 선, 안쪽은 얇은 선
          if(col === 'B' && !pos.noB) s = withBd(s, pos.blockStart ? 'medium' : '', pos.blockEnd ? 'medium' : '');
          else if(col === 'C' && pos.cGroup) s = withBd(s, pos.cStart ? 'medium' : '', pos.cEnd ? 'medium' : '');
          else if(hasTB(s)) s = withBd(s, pos.top ? 'medium' : 'thin', pos.bottom ? 'medium' : 'thin');
        }
        // 색 규칙
        if(v._name && (v._nameCols || ['E', 'F']).includes(col)){ const nr = textRule(allRules, 'name', v._nameText); if(nr) s = withFill(s, nr.fill, nr.fc, nr.b); }
        if(v._changed && (v._nameCols || ['D', 'E', 'F']).includes(col)) s = withFill(s, '#FFFF00');   // 초안 공유본 이후 바뀐 업체
        if(col === 'AL'){ const tr = textRule(allRules, 'driver', val); if(tr) s = withFill(s, tr.fill, tr.fc, tr.b); }
        if(col === 'AM'){ const tr = textRule(allRules, 'load', val); if(tr) s = withFill(s, tr.fill, tr.fc, tr.b); }
        g.set(r, col, val, s);
      }
      r++;
    }
    const rowH = x => { const n = Math.max(1, ...['AN', 'AO'].map(k => String((x.plan || {})[k === 'AN' ? 'stock' : 'note'] || '').split('\n').length)); return n > 1 ? 15 * n : B.heights.body; };
    const qtyVals = x => { const o = {}; PROD_COLS.forEach(c => { const q = R2((x.qty || {})[c]); if(q) o[c] = q; }); o.G = x.packs || ''; o.H = x.boxes || ''; const p = x.plan || {}; o.AL = p.driver || ''; o.AM = p.load || ''; o.AN = p.stock || ''; o.AO = p.note || ''; return o; };
    const sections = m.sections || [];
    sections.forEach(sec => {
      const subs = (sec.subs || []).filter(s => s.rows && s.rows.length);
      if(!subs.length) return;
      const secRows = [];
      subs.forEach(sb => {
        const kind = sb.kind, vec = B.tpl[kind === 'smp' ? 'smp' : kind] || B.tpl.jik;
        // 3PL: 구분(B)='3PL' 세로 병합(배경색 없음, SP 칸 모양), 지역~법인(C:E) 비움, 업체명(F)에 줄 이름
        const tplVec = v0 => Object.assign({}, v0, { B: B.tpl.sp.B, C: B.tpl.sp.C, D: B.tpl.sp.D, E: B.tpl.sp.E, F: B.tpl.sp.F });
        const rows = sb.rows;
        const start = r;
        // 줄 묶음(가로 굵은 선) 기준: 도매=시장, 샘플=영업용/본사, 나머지=블록 전체
        const lineKey = x => kind === 'doma' ? (x.region || '') + '|' + (x.market || '') : kind === 'smp' ? (x.group || '') : '';
        const cKey = x => kind === 'doma' ? (x.region || '') : kind === 'smp' ? (x.group || '') : null;
        rows.forEach((x, i) => {
          const prev = rows[i - 1], next = rows[i + 1];
          const pos = {
            lines: true,
            blockStart: i === 0, blockEnd: i === rows.length - 1,
            top: !prev || lineKey(prev) !== lineKey(x), bottom: !next || lineKey(next) !== lineKey(x),
            cGroup: cKey(x) != null, cStart: !prev || cKey(prev) !== cKey(x), cEnd: !next || cKey(next) !== cKey(x)
          };
          const v = qtyVals(x);
          if(x.changed) v._changed = 1;
          if(i === 0) v.B = sb.label || '';
          if(kind === 'doma'){
            if(pos.cStart) v.C = x.region || '';
            if(pos.top) v.D = x.market || '';
            const corpStart = !prev || lineKey(prev) !== lineKey(x) || (prev.corp || '') !== (x.corp || '') || !x.corp;
            if(x.corp){ if(corpStart) v.E = x.corp; v.F = x.name; } else v.E = x.name;
            v._name = 1; v._nameText = (x.corp || '') + ' ' + x.name;
          } else if(kind === 'sp'){ v.C = x.region || ''; v.D = x.market || ''; v.E = x.corp || ''; v.F = x.name; v._name = 1; v._nameText = (x.corp || '') + ' ' + x.name; }
          else if(kind === 'smp'){ if(pos.cStart) v.C = x.group || ''; v.D = x.name; }
          else if(kind === 'tpl'){ v.F = x.label || x.name || ''; v._name = 1; v._nameText = v.F; v._nameCols = ['F']; }
          else { v.C = x.name; v._name = 1; v._nameText = x.name; v._nameCols = ['C', 'D', 'E', 'F']; }
          emitRow(kind === 'smp' && x.group && x.group !== (rows[0].group || '') ? (B.tpl.smp2 || vec) : (kind === 'tpl' ? tplVec(x.qc ? B.tpl.qc : vec) : vec), pos, v, rowH(x));
        });
        const end = r - 1;
        // 병합
        g.merge('B' + start, 'B' + end);
        if(kind === 'tpl') g.merge('C' + start, 'E' + end);
        for(let i = 0; i < rows.length; i++){
          const R0 = start + i, x = rows[i];
          if(kind === 'doma'){
            // 지역(C)·시장(D) 묶음, 법인(E) 묶음, 법인 없으면 E:F
            if(i === 0 || cKey(rows[i - 1]) !== cKey(x)){ let j = i; while(j + 1 < rows.length && cKey(rows[j + 1]) === cKey(x)) j++; g.merge('C' + R0, 'C' + (start + j)); }
            if(i === 0 || lineKey(rows[i - 1]) !== lineKey(x)){ let j = i; while(j + 1 < rows.length && lineKey(rows[j + 1]) === lineKey(x)) j++; g.merge('D' + R0, 'D' + (start + j)); }
            if(x.corp && (i === 0 || lineKey(rows[i - 1]) !== lineKey(x) || (rows[i - 1].corp || '') !== x.corp)){ let j = i; while(j + 1 < rows.length && lineKey(rows[j + 1]) === lineKey(x) && rows[j + 1].corp === x.corp) j++; g.merge('E' + R0, 'E' + (start + j)); }
            if(!x.corp) g.merge('E' + R0, 'F' + R0);
          } else if(kind === 'smp'){
            if(i === 0 || cKey(rows[i - 1]) !== cKey(x)){ let j = i; while(j + 1 < rows.length && cKey(rows[j + 1]) === cKey(x)) j++; g.merge('C' + R0, 'C' + (start + j)); }
            g.merge('D' + R0, 'F' + R0);
          } else if(kind === 'tpl'){ /* C:E 는 위에서 한 번에 */ }
          else if(kind !== 'sp') g.merge('C' + R0, 'F' + R0);
        }
        secRows.push(...rows);
      });
      // 소계 + 사이 줄
      const sv = { B: '소 계', G: rowSum(secRows, 'G'), H: rowSum(secRows, 'H') };
      PROD_COLS.forEach(c => { const q = rowSum(secRows, c); if(q) sv[c] = q; total[c] = R2(total[c] + q); });
      total.G = R2(total.G + sv.G); total.H = R2(total.H + sv.H);
      emitRow(B.tpl.sub, null, sv, B.heights.sub);
      g.merge('B' + (r - 1), 'F' + (r - 1)); g.merge('AL' + (r - 1), 'AO' + (r - 1));
      emitRow(B.tpl.spacer, null, {}, B.heights.spacer);
    });
    // 합계
    const tv = { B: '합  계', G: total.G, H: total.H }; PROD_COLS.forEach(c => { if(total[c]) tv[c] = total[c]; });
    emitRow(B.tpl.total, null, tv, B.heights.total);
    g.merge('B' + (r - 1), 'F' + (r - 1)); g.merge('AL' + (r - 1), 'AO' + (r - 1));
    emitRow(B.tpl.after, null, {}, B.heights.after);

    // ── 3) 출고일 지정 업체(쿠팡 등) ──
    const disp = (m.disp || []).filter(x => x.boxes > 0 || x.packs > 0);
    if(disp.length){
      const head0 = r, dv = {};
      dv.G107 = R2(disp.reduce((a, x) => a + (x.packs || 0), 0)); dv.H107 = R2(disp.reduce((a, x) => a + (x.boxes || 0), 0));
      PROD_COLS.forEach(c => { const q = R2(disp.reduce((a, x) => a + (Number((x.qty || {})[c]) || 0), 0)); dv[c + '107'] = q || ''; dv[c + '108'] = PACK_COLS.includes(c) ? (q || '') : (q ? R2(q * 4) : ''); });
      B.disp.head.rows.forEach((row, k) => {
        const R = g.row(head0 + k); R.h = row.h; R.head = true;
        row.cells.forEach(([col, st, v, on, ref]) => {
          const addr = col + row.r; const val = dv[addr] !== undefined ? dv[addr] : v;
          const s = on != null ? style((ref ? Number(dv[ref]) > 0 : Number(val) > 0) ? on : st) : style(st);
          g.set(head0 + k, col, val, s);
        });
      });
      B.disp.head.merges.forEach(x => { const [a, b] = x.split(':'); const sh = s => s.replace(/(\d+)$/, n => String(+n - 107 + head0)); g.merge(sh(a), sh(b)); });
      r = head0 + B.disp.head.rows.length;
      const start = r;
      disp.forEach((x, i) => {
        const prev = disp[i - 1], next = disp[i + 1];
        const vec = i === 0 ? B.disp.first : (i === disp.length - 1 ? B.disp.last : B.disp.mid);
        const v = qtyVals(x);
        if(!prev || prev.company !== x.company) v.B = x.company;
        if(!prev || prev.company !== x.company || prev.warehouse !== x.warehouse) v.D = x.warehouse;
        const [y, mo, dd] = String(x.shipDate).split('-').map(Number);
        v.F = { n: Math.round((Date.UTC(y, mo - 1, dd) - Date.UTC(1899, 11, 30)) / 86400000), date: x.shipDate };
        v.AN = x.plan && x.plan.stock || ''; v.AO = x.shelf || '';
        emitRow(vec, { lines: true, top: i === 0, bottom: i === disp.length - 1, blockStart: !prev || prev.company !== x.company, blockEnd: !next || next.company !== x.company }, v, B.heights.disp);
      });
      for(let i = 0; i < disp.length; i++){
        const x = disp[i];
        if(i === 0 || disp[i - 1].company !== x.company){ let j = i; while(j + 1 < disp.length && disp[j + 1].company === x.company) j++; g.merge('B' + (start + i), 'C' + (start + j)); }
        if(i === 0 || disp[i - 1].company !== x.company || disp[i - 1].warehouse !== x.warehouse){ let j = i; while(j + 1 < disp.length && disp[j + 1].company === x.company && disp[j + 1].warehouse === x.warehouse) j++; g.merge('D' + (start + i), 'E' + (start + j)); }
      }
    }
    // ── 4) 서식에 열이 없는 품목 (맨 아래 메모) ──
    if((m.extras || []).length){
      r++;
      const st = style(B.tpl.after.B ? B.tpl.after.B[0] : 0);
      const mk = t => Object.assign({}, st, { h: 'left', bd: ['', '', '', ''], fill: '', sz: 11, b: 1, fc: '#C00000' });
      g.set(r, 'B', '※ 품목 열이 없는 주문 (아래 수량은 위 표에 들어가지 않았습니다)', mk()); g.row(r).h = 20; g.row(r).cells.B.spill = 1; r++;
      m.extras.forEach(e => { g.set(r, 'B', `${e.company} · ${e.item} ${e.qty}${e.unit || ''}`, Object.assign(mk(), { fc: '#000000' })); g.row(r).h = 18; g.row(r).cells.B.spill = 1; r++; });
    }
    g.maxRow = r - 1;
    // 1박스 = 1개 열: 칸 서식의 '팩' 글자를 '박스'로 (머리글 합계·합계 줄 등)
    if(ONE.length) g.rows.forEach(R => { if(!R) return; ONE.forEach(c => { const x = R.cells[c]; if(x && x.st && /팩/.test(x.st.nf || '')) x.st = Object.assign({}, x.st, { nf: x.st.nf.replace(/팩/g, '박스') }); }); });
    autoFit(g);
    return g;
  }
  // ── 칸 맞춤: 모든 보이는 칸의 글자·숫자가 칸 안에 들어가게 (엑셀 · 공유용 이미지 · 인쇄가 같은 표를 씀) ──
  //  · 업체 줄·소계·합계(데이터): 한 줄로 보이게 열을 넓힘 (엑셀에서 숫자가 #### 로 보이지 않게)
  //  · 머리글(1~18행, 출고일 지정 머리글): 줄바꿈·글자 크기 줄이기로 먼저 맞추고, 그래도 모자라면 열을 넓힘
  //  · 빼는 것: 사이 칸(아주 좁은 열), 맨 위 요약의 병합 안 된 글자(◇토마토 등 — 옆 칸으로 넘쳐 보이는 글자), 맨 아래 메모 줄
  function textUnits(t, sz){
    let em = 0;
    for(const ch of String(t)){
      if(/[ᄀ-ᇿ㄰-㆏가-힯]/.test(ch)) em += 1;
      else if(ch === ' ') em += 0.32;
      else if(/[0-9a-z.,:·]/.test(ch)) em += 0.58;
      else em += 0.66;
    }
    const px = em * (sz || 10) * 96 / 72 * 1.1;   // 굵은 글씨·PC마다 다른 글꼴 여유
    return (px + 12) / 7;                          // 엑셀 열 너비 단위(대략 7px)
  }
  const lineUnits = (t, sz) => Math.max(0, ...String(t).split('\n').map(l => textUnits(l, sz)));
  // 줄바꿈 칸: 띄어쓰기에서 접어 몇 줄이 되는지 (한 낱말이 너비보다 길면 Infinity)
  function wrapLines(t, sz, width){
    let n = 0;
    for(const para of String(t).split('\n')){
      let cur = '';
      for(const w of para.split(' ')){
        if(textUnits(w, sz) > width) return Infinity;
        const tt = cur ? cur + ' ' + w : w;
        if(cur && textUnits(tt, sz) > width){ n++; cur = w; } else cur = tt;
      }
      n++;
    }
    return n;
  }
  function autoFit(g){
    const base = window.PO_BASE.cols;
    const spacer = j => (base[j - 1] || 9) < 2;
    const spans = new Map(), inside = new Set();
    g.merges.forEach(m => {
      const [a, b] = m.split(':'); const p = s => { const x = /([A-Z]+)(\d+)/.exec(s); return [CI(x[1]), +x[2]]; };
      const [c1, r1] = p(a), [c2, r2] = p(b);
      spans.set(c1 + ',' + r1, { c1, c2, r1, r2 });
      for(let i = r1; i <= r2; i++) for(let j = c1; j <= c2; j++) if(!(i === r1 && j === c1)) inside.add(j + ',' + i);
    });
    const vis = j => g.cols[j - 1] && !g.cols[j - 1].hidden;
    const w = j => vis(j) ? (g.cols[j - 1].w || 9) : 0;
    const spanW = sp => { let s = 0; for(let j = sp.c1; j <= sp.c2; j++) s += w(j); return s; };
    const spanH = sp => { let h = 0; for(let i = sp.r1; i <= sp.r2; i++){ const R = g.rows[i]; if(R && !R.hidden) h += R.h || 15; } return h; };
    const grow = (sp, need) => {   // 모자란 만큼 범위 안의 마지막 보이는(사이 칸 아닌) 열에 더함
      const have = spanW(sp); if(need <= have + 0.05) return;
      for(let j = sp.c2; j >= sp.c1; j--) if(vis(j) && !spacer(j)){ g.cols[j - 1].w = Math.round((w(j) + need - have) * 100) / 100; return; }
    };
    const data = [], head = [];
    for(let r = 1; r < g.rows.length; r++){
      const R = g.rows[r]; if(!R || R.hidden) continue;
      Object.entries(R.cells).forEach(([col, c]) => {
        const n = CI(col);
        if(c.spill || inside.has(n + ',' + r) || !vis(n) || spacer(n)) return;
        const txt = (c.v && typeof c.v === 'object') || typeof c.v === 'number' ? fmt(c.v, c.st && c.st.nf) : String(c.v == null ? '' : c.v);
        if(!txt.trim()) return;
        const sp = spans.get(n + ',' + r) || { c1: n, c2: n, r1: r, r2: r };
        const isHead = r < 19 || R.head;
        if(isHead && r < 5 && !spans.has(n + ',' + r)) return;   // 맨 위 2~4행의 넘쳐 보이는 글자(요일 · ◇토마토 …)
        (isHead ? head : data).push({ c, txt, sp, r, col });
      });
    }
    // 1) 데이터: 한 줄 기준으로 넓힘 (한 칸짜리 먼저, 그다음 병합 칸)
    const byWidth = (x, y) => (x.sp.c2 - x.sp.c1) - (y.sp.c2 - y.sp.c1);
    data.sort(byWidth).forEach(x => grow(x.sp, lineUnits(x.txt, (x.c.st && x.c.st.sz) || 11)));
    // 2) 머리글: 줄바꿈(칸 높이 안에서) → 글자 줄이기 → 그래도 모자라면 넓힘
    head.sort(byWidth).forEach(x => {
      const st = x.c.st || {}, sz0 = st.sz || 11, H = spanH(x.sp);
      const fits = sz => {
        const width = spanW(x.sp);
        if(st.w){ const n = wrapLines(x.txt, sz, width); return n !== Infinity && n * sz * 1.3 <= H + 1; }
        return lineUnits(x.txt, sz) <= width + 0.05;
      };
      if(fits(sz0)) return;
      const min = Math.max(9, Math.round(sz0 * 0.7));
      let sz = sz0;
      while(sz > min && !fits(sz)) sz = Math.round((sz - 0.5) * 10) / 10;
      if(sz !== sz0) x.c.st = Object.assign({}, st, { sz });   // 같은 모양을 쓰는 다른 칸은 그대로
      if(!fits(sz)){
        // 낱말 하나가 안 들어가거나 줄 수가 높이를 넘으면: 가장 긴 줄(또는 가장 긴 낱말)이 들어가게 넓힘
        const lines = Math.max(1, Math.floor((H + 1) / (sz * 1.3)));
        const words = String(x.txt).split(/[\s\n]+/).filter(Boolean);
        const longest = Math.max(...words.map(t => textUnits(t, sz)));
        grow(x.sp, st.w && lines > 1 ? Math.max(longest, lineUnits(x.txt, sz) / lines) : lineUnits(x.txt, sz));
        if(!fits(sz)) grow(x.sp, lineUnits(x.txt, sz));
      }
    });
  }

  // ── 숫자 표시 (엑셀 형식과 같게: 0은 안 보임) ──
  function fmt(v, nf){
    if(v === '' || v == null) return '';
    if(typeof v === 'object' && v.date){ const [y, m, d] = v.date.split('-').map(Number); return nf === 'md' ? `${m}월 ${d}일` : nf === 'm/d' ? `${m}/${d}` : v.date; }
    if(typeof v !== 'number') return String(v);
    if(v === 0) return '';
    const g3 = (x, dec) => { const s = Math.abs(x).toFixed(dec).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '-' : '') + s.join('.'); };
    switch(nf){
      case 'acc0': return Number.isInteger(R2(v)) ? g3(Math.round(v), 0) : g3(R2(v), 2);   // 서식은 소수 없는 형식이지만 0.25박스 같은 소수는 그대로 보여 줌 (349.75가 350으로 보이지 않게)
      case 'acc2': return g3(v, 2);
      case '0.000': return v.toFixed(3);
      case '0"팩"': return Math.round(v) + '팩';
      case '0"박스"': return Math.round(v) + '박스';
      case '0"kg"': return Math.round(v) + 'kg';
      case '0"병"': return Math.round(v) + '병';
      case '0.00"팩"': return v.toFixed(2) + '팩';
      default: return String(R2(v));
    }
  }

  // ── 엑셀 파일 ──
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const NF_ID = { '': 0, date: 14, acc0: 41 };
  const NF_CUSTOM = { acc2: '_-* #,##0.00_-;\\-* #,##0.00_-;_-* "-"_-;_-@_-', '0.000': '0.000', md: 'm"월" d"일";@', 'm/d': 'm"/"d;@', '0"팩"': '0"팩"', '0"박스"': '0"박스"', '0"kg"': '0"kg"', '0"병"': '0"병"', '0.00"팩"': '0.00"팩"' };
  // g: 표 하나 또는 여러 시트 [{ grid, name }] (시트마다 탭 하나, 서식은 함께 씀). 표에 zoom을 주면 그 배율로 열림(기본 70%)
  async function toXlsx(g, sheetName){
    const list = Array.isArray(g) ? g : [{ grid: g, name: sheetName }];
    const fonts = [], fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'], borders = [], xfs = [];
    const fK = new Map(), flK = new Map(), bK = new Map(), xK = new Map(), nfK = new Map();
    const idx = (map, arr, key, xml) => { if(!map.has(key)){ map.set(key, arr.length); arr.push(xml); } return map.get(key); };
    const nfId = nf => { if(NF_ID[nf] !== undefined) return NF_ID[nf]; if(!NF_CUSTOM[nf]) return 0; if(!nfK.has(nf)) nfK.set(nf, 176 + nfK.size); return nfK.get(nf); };
    idx(fK, fonts, 'base', '<font><sz val="11"/><name val="나눔스퀘어 네오 ExtraBold"/><family val="3"/><charset val="129"/></font>');
    idx(bK, borders, '||||', '<border><left/><right/><top/><bottom/><diagonal/></border>');
    idx(xK, xfs, 'default', '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>');
    const xfOf = s => {
      if(!s) return 0;
      const fk = [s.fn, s.sz, s.b, s.fc].join('|');
      const fi = idx(fK, fonts, fk, `<font>${s.b ? '<b/>' : ''}<sz val="${s.sz}"/>${s.fc ? `<color rgb="FF${s.fc.slice(1)}"/>` : ''}<name val="${esc(s.fn || '나눔스퀘어 네오 ExtraBold')}"/><family val="3"/><charset val="129"/></font>`);
      const fli = s.fill ? idx(flK, fills, s.fill, `<fill><patternFill patternType="solid"><fgColor rgb="FF${s.fill.slice(1)}"/><bgColor indexed="64"/></patternFill></fill>`) : 0;
      const bk = s.bd.join('|');
      const bi = idx(bK, borders, bk, '<border>' + ['left', 'right', 'top', 'bottom'].map((k, i) => s.bd[i] ? `<${k} style="${s.bd[i]}"><color indexed="64"/></${k}>` : `<${k}/>`).join('') + '<diagonal/></border>');
      const nf = nfId(s.nf);
      const al = (s.h || s.v || s.w) ? `<alignment${s.h ? ` horizontal="${s.h}"` : ''}${s.v ? ` vertical="${s.v}"` : ''}${s.w ? ' wrapText="1"' : ''}/>` : '';
      const key = [fi, fli, bi, nf, al].join('|');
      return idx(xK, xfs, key, `<xf numFmtId="${nf}" fontId="${fi}" fillId="${fli}" borderId="${bi}" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">${al}</xf>`);
    };
    // 시트
    const sheetXmlOf = (g, first) => {
    let rowsXml = '';
    for(let r = 1; r <= g.rows.length - 1 || r <= (g.maxRow || 0); r++){
      const R = g.rows[r]; if(!R) continue;
      let cs = '';
      for(let n = 1; n <= LASTC; n++){
        const col = CL(n), c = R.cells[col]; if(!c) continue;
        const multi = typeof c.v === 'string' && c.v.includes('\n') && c.st && !c.st.w;   // 여러 줄 글자(재고사용 등)는 엑셀 '줄 바꿈'을 켜야 줄바꿈이 네모로 깨지지 않음
        const frac = typeof c.v === 'number' && c.st && c.st.nf === 'acc0' && !Number.isInteger(R2(c.v));   // 소수 수량은 소수 둘째 자리 형식으로
        const s = xfOf(multi ? Object.assign({}, c.st, { w: 1, v: c.st.v || 'center' }) : frac ? Object.assign({}, c.st, { nf: 'acc2' }) : c.st), ref = col + r;
        let v = c.v;
        if(v && typeof v === 'object' && v.n != null) cs += `<c r="${ref}" s="${s}"><v>${v.n}</v></c>`;
        else if(typeof v === 'number') cs += `<c r="${ref}" s="${s}"${v === 0 ? '' : ''}><v>${v}</v></c>`;
        else if(v !== '' && v != null) cs += `<c r="${ref}" s="${s}" t="inlineStr"><is><t xml:space="preserve">${esc(v)}</t></is></c>`;
        else cs += `<c r="${ref}" s="${s}"/>`;
      }
      rowsXml += `<row r="${r}" ht="${R.h}" customHeight="1"${R.hidden ? ' hidden="1"' : ''}>${cs}</row>`;
    }
    const colsXml = '<cols>' + g.cols.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${c.w || 9}" customWidth="1"${c.hidden ? ' hidden="1"' : ''}/>`).join('') + '</cols>';
    const mergesXml = g.merges.length ? `<mergeCells count="${g.merges.length}">${g.merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : '';
    const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><sheetViews><sheetView showGridLines="0" showZeros="0"${first ? ' tabSelected="1"' : ''} zoomScale="${g.zoom || 70}" zoomScaleNormal="${g.zoom || 70}" workbookViewId="0"/></sheetViews><sheetFormatPr defaultColWidth="9" defaultRowHeight="15"/>${colsXml}<sheetData>${rowsXml}</sheetData>${mergesXml}<pageMargins left="0.236" right="0.236" top="0.748" bottom="0.748" header="0.315" footer="0.315"/><pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="1"/></worksheet>`;
    return sheet;
    };
    const sheets = list.map((x, i) => sheetXmlOf(x.grid, i === 0));
    // 시트 이름: 엑셀 규칙(31자, []:*?/ 안 됨, 겹치지 않게)
    const used = new Set();
    const names = list.map((x, i) => { let b = String(x.name || (i ? 'Sheet' + (i + 1) : '왓더프룻 발주서')).replace(/[\[\]:*?\/\\]/g, ' ').trim().slice(0, 31) || 'Sheet' + (i + 1), n = b, k = 2; while(used.has(n.toLowerCase())){ n = b.slice(0, 28) + ' ' + k++; } used.add(n.toLowerCase()); return n; });
    const numFmtsXml = nfK.size ? `<numFmts count="${nfK.size}">${[...nfK.entries()].map(([k, id]) => `<numFmt numFmtId="${id}" formatCode="${esc(NF_CUSTOM[k])}"/>`).join('')}</numFmts>` : '';
    const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${numFmtsXml}<fonts count="${fonts.length}">${fonts.join('')}</fonts><fills count="${fills.length}">${fills.join('')}</fills><borders count="${borders.length}">${borders.join('')}</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xfs.length}">${xfs.join('')}</cellXfs><cellStyles count="1"><cellStyle name="표준" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0"/></styleSheet>`;
    const zip = new JSZip();
    zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' + sheets.map((x, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('') + '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>');
    zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
    zip.file('xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${names.map((n, i) => `<sheet name="${esc(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`);
    zip.file('xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + sheets.map((x, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('') + `<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
    sheets.forEach((x, i) => zip.file(`xl/worksheets/sheet${i + 1}.xml`, x));
    zip.file('xl/styles.xml', styles);
    return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', compression: 'DEFLATE' });
  }

  // ── 화면·캡처·인쇄용 HTML (엑셀과 같은 표) ──
  const FONT_URL = 'https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-dEb.woff';
  const fontCss = `@font-face{font-family:'PoNanumEB';src:url(${FONT_URL}) format('woff');font-display:block;}`;
  const BW = { thin: 1, medium: 2, thick: 3 };
  const pxW = w => Math.floor(w * 7 + 5);          // 엑셀 열 너비(글자 수) → 화면 px
  const pxH = h => Math.round(h * 4 / 3);          // 행 높이(pt) → px
  function cssOf(s, bdOverride, num){
    const bd = bdOverride || s.bd;
    const b = i => bd[i] ? `${BW[bd[i]] || 1}px solid #000` : 'none';
    return `font-size:${s.sz}pt;${s.b ? 'font-weight:800;' : ''}${s.fc ? `color:${s.fc};` : ''}${s.fill ? `background:${s.fill};` : ''}border-left:${b(0)};border-right:${b(1)};border-top:${b(2)};border-bottom:${b(3)};text-align:${s.h === 'centerContinuous' ? 'center' : (s.h || (num ? 'right' : 'left'))};${!s.h && num ? 'padding-right:3px;' : ''}vertical-align:${s.v === 'center' ? 'middle' : (s.v || 'bottom')};white-space:${s.w ? 'pre-wrap' : 'pre'};`;
  }
  function toHtml(g, opts){
    opts = opts || {};
    const maxR = g.maxRow || (g.rows.length - 1);
    const visR = r => g.rows[r] && !g.rows[r].hidden, visC = n => !(g.cols[n - 1] || {}).hidden;
    const mm = new Map(), covered = new Set();
    g.merges.forEach(m => {
      const [a, b] = m.split(':'); const p = s => { const x = /([A-Z]+)(\d+)/.exec(s); return [CI(x[1]), +x[2]]; };
      const [c1, r1] = p(a), [c2, r2] = p(b);
      // 숨긴 행·열을 뺀 첫 칸이 대표
      let rr = r1; while(rr <= r2 && !visR(rr)) rr++; let cc = c1; while(cc <= c2 && !visC(cc)) cc++;
      if(rr > r2 || cc > c2) return;
      let rs = 0, cs = 0; for(let i = r1; i <= r2; i++) if(visR(i)) rs++; for(let j = c1; j <= c2; j++) if(visC(j)) cs++;
      mm.set(cc + ',' + rr, { rs, cs, r1, c1, r2, c2 });
      for(let i = r1; i <= r2; i++) for(let j = c1; j <= c2; j++) if(!(i === rr && j === cc)) covered.add(j + ',' + i);
    });
    let w = 0; const colg = [];
    for(let n = 1; n <= LASTC; n++){ if(!visC(n)) continue; const px = pxW(g.cols[n - 1].w || 9); w += px; colg.push(`<col style="width:${px}px">`); }
    let h = '';
    for(let r = 1; r <= maxR; r++){
      if(!visR(r)) continue;
      const R = g.rows[r];
      let tds = '';
      for(let n = 1; n <= LASTC; n++){
        if(!visC(n) || covered.has(n + ',' + r)) continue;
        const col = CL(n), mg = mm.get(n + ',' + r);
        let c = R.cells[col] || { v: '', st: null };
        // 병합의 원래 첫 칸(글자가 든 칸)이 숨긴 행·열이면 보이는 첫 칸에 그 글자·모양을 씀 (예: 찰토리 머리글·총수량 — 엑셀은 보이는데 이미지에서 비던 것)
        if(mg && (mg.c1 !== n || mg.r1 !== r)){
          const mc = g.rows[mg.r1] && g.rows[mg.r1].cells[CL(mg.c1)];
          if(mc && mc.v !== '' && mc.v != null && (c.v === '' || c.v == null)) c = mc;
        }
        const s = c.st || { sz: 11, bd: ['', '', '', ''] };
        let bd = s.bd;
        if(mg){
          // 병합 칸 테두리: 오른쪽은 맨 오른쪽 칸, 아래는 맨 아래 칸 것
          const at = (rr, cc) => { const x = g.rows[rr] && g.rows[rr].cells[CL(cc)]; return x && x.st ? x.st.bd : ['', '', '', '']; };
          let lr = mg.r2; while(lr > r && !visR(lr)) lr--; let lc = mg.c2; while(lc > n && !visC(lc)) lc--;
          bd = [s.bd[0], at(r, lc)[1], s.bd[2], at(lr, n)[3]];
        }
        const txt = esc(fmt(c.v, s.nf));
        tds += `<td${mg ? `${mg.rs > 1 ? ` rowspan="${mg.rs}"` : ''}${mg.cs > 1 ? ` colspan="${mg.cs}"` : ''}` : ''} style="${cssOf(s, bd, typeof c.v === 'number' || (c.v && typeof c.v === 'object'))}">${txt}</td>`;
      }
      h += `<tr style="height:${pxH(R.h)}px">${tds}</tr>`;
    }
    return { width: w, html: `<table class="po-sheet" style="border-collapse:collapse;table-layout:fixed;width:${w}px;font-family:'PoNanumEB','NanumSquareNeoExtraBold','나눔스퀘어 네오 ExtraBold','Malgun Gothic',sans-serif;line-height:1.15;"><colgroup>${colg.join('')}</colgroup><tbody>${h}</tbody></table>` };
  }
  window.PoSheet = { build, toXlsx, toHtml, fmt, fontCss, FONT_URL, PROD_COLS, BOX_COLS, PACK_COLS, GROUPS };
})();
