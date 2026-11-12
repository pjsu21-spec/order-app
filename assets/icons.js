/* 다름달음 아이콘: 화면의 이모지를 같은 스타일의 아이콘으로 바꿔 보여 줌 (통합 시스템 · 상세페이지 · 공유폴더 공통)
 *  - 글자(이모지)는 그대로 두고 <i class="dd-ico">이모지</i>로 감싸 그림만 바꿈 → textContent·복사·엑셀·저장값은 그대로
 *  - 프로그램 대표 이모지는 홈 화면의 3D 아이콘(PNG), 나머지는 빨강·분홍 톤 SVG
 *  - 나중에 생기는 글자(알림·표 다시 그리기 등)도 자동으로 바꿈. 바꾸지 않을 곳은 data-noico 속성 */
(function () {
  if (window.__ddIcons) return; window.__ddIcons = true;
  var me = document.currentScript && document.currentScript.src;
  var BASE = me ? me.replace(/[^\/]*$/, '') : 'assets/';
  var PNG = { '📋': 'order', '🍅': 'sorting', '🧾': 'ecount', '💰': 'cost', '🧪': 'sample', '🖼': 'detail', '📁': 'files', '📂': 'files', '🛠': 'admin', '📖': 'manual', '🍱': 'lunch' };
  var RS = '#D7192B';   // 선 색 (빨강)
  var DEFS = "<defs>" +
    "<linearGradient id='r' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#F4525A'/><stop offset='1' stop-color='#C8102E'/></linearGradient>" +
    "<linearGradient id='y' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFCB45'/><stop offset='1' stop-color='#F29A0E'/></linearGradient>" +
    "<linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#3FCF82'/><stop offset='1' stop-color='#1C9B55'/></linearGradient>" +
    "<linearGradient id='k' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#F4CF95'/><stop offset='1' stop-color='#D79B4E'/></linearGradient>" +
    "<linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#CFD5DF'/><stop offset='1' stop-color='#8C96A8'/></linearGradient>" +
    "<linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#62A8FF'/><stop offset='1' stop-color='#2D6FE0'/></linearGradient>" +
    "</defs>";
  var L = function (d, w) { return "<path d='" + d + "' fill='none' stroke='" + RS + "' stroke-width='" + (w || 2.4) + "' stroke-linecap='round' stroke-linejoin='round'/>"; };
  var DOC = "<path d='M6 2.5h8.5l5 5V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V4A1.5 1.5 0 0 1 6 2.5z' fill='#fff' stroke='#C9CED8' stroke-width='1.2'/><path d='M14.5 2.5v5h5' fill='#EEF1F5' stroke='#C9CED8' stroke-width='1.2' stroke-linejoin='round'/>";
  var TAG = function (fill, t) { return DOC + "<rect x='2.5' y='12' width='14' height='7' rx='1.4' fill='" + fill + "'/><text x='9.5' y='17.3' font-size='5.2' font-family='Arial,sans-serif' font-weight='700' fill='#fff' text-anchor='middle'>" + t + "</text>"; };
  var SVG = {
    warn: "<path d='M12 2.8 22.4 20.6a.8.8 0 0 1-.7 1.2H2.3a.8.8 0 0 1-.7-1.2z' fill='url(#y)' stroke='#E08A00' stroke-width='.8' stroke-linejoin='round'/><rect x='10.9' y='8.4' width='2.2' height='7.2' rx='1.1' fill='#fff'/><circle cx='12' cy='18.3' r='1.3' fill='#fff'/>",
    ok: "<rect x='2' y='2' width='20' height='20' rx='6' fill='url(#g)'/><path d='M7 12.5l3.4 3.4 6.8-7.3' fill='none' stroke='#fff' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/>",
    box3: "<rect x='3' y='3' width='18' height='18' rx='4.5' fill='url(#r)'/><path d='M7.5 12.2l3 3 6-6.4' fill='none' stroke='#fff' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'/>",
    stop: "<circle cx='12' cy='12' r='10' fill='url(#r)'/><rect x='6' y='10.4' width='12' height='3.2' rx='1.3' fill='#fff'/>",
    cross: "<circle cx='12' cy='12' r='10' fill='url(#r)'/><path d='M8.5 8.5l7 7M15.5 8.5l-7 7' stroke='#fff' stroke-width='2.6' stroke-linecap='round'/>",
    info: "<circle cx='12' cy='12' r='10' fill='url(#b)'/><circle cx='12' cy='7.6' r='1.4' fill='#fff'/><rect x='10.8' y='10.2' width='2.4' height='7.4' rx='1.2' fill='#fff'/>",
    dotR: "<circle cx='12' cy='12' r='8' fill='url(#r)'/><circle cx='9.5' cy='9.5' r='2.2' fill='#fff' opacity='.45'/>",
    dotY: "<circle cx='12' cy='12' r='8' fill='url(#y)'/><circle cx='9.5' cy='9.5' r='2.2' fill='#fff' opacity='.5'/>",
    eye: "<path d='M1.8 12C4.4 7.4 8 5.2 12 5.2s7.6 2.2 10.2 6.8C19.6 16.6 16 18.8 12 18.8S4.4 16.6 1.8 12z' fill='#FDE3E3' stroke='" + RS + "' stroke-width='1.6'/><circle cx='12' cy='12' r='4.2' fill='url(#r)'/><circle cx='13.4' cy='10.6' r='1.3' fill='#fff'/>",
    refresh: L('M21 4v6h-6') + L('M3 20v-6h6') + L('M5.2 9a8 8 0 0 1 13.4-2.9L21 9.5M3 14.5l2.4 3.4A8 8 0 0 0 18.8 15'),
    box: "<path d='M12 2.5 21 7v10l-9 4.5L3 17V7z' fill='url(#k)'/><path d='M3 7l9 4.5L21 7M12 11.5v10' fill='none' stroke='#B87A32' stroke-width='1.3' stroke-linejoin='round'/><path d='M7.5 4.8l9 4.5v3' fill='none' stroke='#fff' stroke-width='1.7' opacity='.85'/>",
    gift: "<rect x='3' y='10' width='18' height='11' rx='2' fill='url(#r)'/><rect x='2' y='6.8' width='20' height='4.4' rx='1.5' fill='#F4525A'/><rect x='10.6' y='6.8' width='2.8' height='14.2' fill='#FFD45C'/><path d='M12 6.8C10 2.8 6.5 3.2 7 5.4c.4 1.4 3 1.4 5 1.4s4.6 0 5-1.4c.5-2.2-3-2.6-5 1.4z' fill='#FFD45C' stroke='#E5A800' stroke-width='.8'/>",
    pin: "<path d='M9 2.5h6l-1 6 3.5 3.5v1.6h-11V12L10 8.5z' fill='url(#r)'/><path d='M12 13.6v8' stroke='#8C96A8' stroke-width='2' stroke-linecap='round'/><path d='M10.4 3.6h1l-.6 4.4' fill='none' stroke='#fff' stroke-width='.9' opacity='.8'/>",
    undo: L('M9 14 4 9l5-5') + L('M4 9h10.5a5.5 5.5 0 0 1 0 11H11'),
    down: "<path d='M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4' fill='#FDE0E0' stroke='" + RS + "' stroke-width='2' stroke-linecap='round'/>" + L('M12 3v11M7 9.5l5 5 5-5'),
    up: "<path d='M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4' fill='#FDE0E0' stroke='" + RS + "' stroke-width='2' stroke-linecap='round'/>" + L('M12 15V4M7 8.5l5-5 5 5'),
    save: "<rect x='3' y='3' width='18' height='18' rx='3' fill='url(#r)'/><rect x='7' y='3' width='9' height='6' rx='1' fill='#FDE0E0'/><rect x='13' y='4.2' width='1.8' height='3.6' fill='#C8102E'/><rect x='6' y='12.5' width='12' height='6.5' rx='1' fill='#fff'/><path d='M8 15h8M8 17h5' stroke='#F4A0A6' stroke-width='1'/>",
    tv: "<rect x='2' y='4.5' width='20' height='13.5' rx='2.5' fill='url(#r)'/><rect x='4' y='6.5' width='16' height='9.5' rx='1' fill='#2B2F3A'/><path d='M5.6 8.2h4.2' stroke='#5D6576' stroke-width='1.2' stroke-linecap='round'/><path d='M8 21h8M12 18v3' stroke='#8C96A8' stroke-width='2' stroke-linecap='round'/>",
    search: "<circle cx='10.5' cy='10.5' r='6.5' fill='#FDE0E0' stroke='" + RS + "' stroke-width='2.4'/><path d='M15.5 15.5l5 5' stroke='" + RS + "' stroke-width='3' stroke-linecap='round'/><path d='M7.4 9.2a3.3 3.3 0 0 1 3-2.7' fill='none' stroke='#fff' stroke-width='1.6' stroke-linecap='round'/>",
    check: "<rect x='4' y='4' width='16' height='18' rx='2.5' fill='#FDE0E0' stroke='" + RS + "' stroke-width='1.8'/><rect x='8' y='2' width='8' height='4' rx='1.2' fill='url(#r)'/><path d='M8 13.5l2.7 2.7L16.5 10' fill='none' stroke='#1C9B55' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>",
    cal: "<rect x='3' y='4.5' width='18' height='16.5' rx='2.5' fill='#fff' stroke='" + RS + "' stroke-width='1.6'/><path d='M3 7a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 7v3H3z' fill='url(#r)'/><path d='M8 2.5v4M16 2.5v4' stroke='#8C96A8' stroke-width='2' stroke-linecap='round'/><g fill='#F4A0A6'><rect x='6' y='12.5' width='3' height='2.5' rx='.5'/><rect x='10.5' y='12.5' width='3' height='2.5' rx='.5'/><rect x='15' y='12.5' width='3' height='2.5' rx='.5'/><rect x='6' y='16.5' width='3' height='2.5' rx='.5'/><rect x='10.5' y='16.5' width='3' height='2.5' rx='.5'/></g>",
    memo: "<rect x='3.5' y='2.5' width='14' height='19' rx='2' fill='#fff' stroke='" + RS + "' stroke-width='1.6'/><path d='M6.5 7.5h8M6.5 11h8M6.5 14.5h5' stroke='#F4A0A6' stroke-width='1.5' stroke-linecap='round'/><path d='M13.6 20.5l.9-3.4 6-6 2.5 2.5-6 6z' fill='url(#y)' stroke='#C77700' stroke-width='.8' stroke-linejoin='round'/>",
    pencil: "<path d='M4 20l1.2-4.8L16.5 3.9a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.8 18.8z' fill='url(#y)' stroke='#C77700' stroke-width='1' stroke-linejoin='round'/><path d='M4 20l1.2-4.8 3.6 3.6z' fill='#F7D7B0'/><path d='M4 20l.5-2 1.5 1.5z' fill='#3A3A3A'/><path d='M16.5 3.9a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8l-1 1-3.6-3.6z' fill='url(#r)'/>",
    key: "<circle cx='8' cy='12' r='5' fill='url(#y)' stroke='#C77700' stroke-width='1'/><circle cx='7' cy='12' r='1.6' fill='#fff'/><path d='M12.6 12H21v3M17.5 12v2.5' fill='none' stroke='#E08A00' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>",
    lock: "<path d='M7.5 11V8a4.5 4.5 0 0 1 9 0v3' fill='none' stroke='#8C96A8' stroke-width='2.2'/><rect x='4.5' y='10.5' width='15' height='11' rx='2.5' fill='url(#r)'/><circle cx='12' cy='15.3' r='1.6' fill='#fff'/><rect x='11.3' y='15.5' width='1.4' height='3' rx='.7' fill='#fff'/>",
    left: "<path d='M16 4.5v15L5.5 12z' fill='url(#r)' stroke='#D7192B' stroke-width='1.5' stroke-linejoin='round'/>",
    right: "<path d='M8 4.5v15L18.5 12z' fill='url(#r)' stroke='#D7192B' stroke-width='1.5' stroke-linejoin='round'/>",
    ne: L('M7 17 17 7M9 7h8v8'),
    lr: L('M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4'),
    ud: L('M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4'),
    take: L('M4 5h7a6 6 0 0 1 6 6v7') + L('M13 14.5l4 4 4-4'),
    chart: "<rect x='3' y='3' width='18' height='18' rx='3' fill='#fff' stroke='#E8C7C7' stroke-width='1.2'/><rect x='6' y='12' width='2.8' height='6' rx='.6' fill='url(#r)'/><rect x='10.6' y='9' width='2.8' height='9' rx='.6' fill='url(#r)'/><rect x='15.2' y='6' width='2.8' height='12' rx='.6' fill='url(#r)'/>",
    chartUp: "<rect x='3' y='3' width='18' height='18' rx='3' fill='#fff' stroke='#E8C7C7' stroke-width='1.2'/>" + L('M6 16l4-4.5 3 2.5 5-6', 2.2) + L('M14.5 8h3.5v3.5', 2.2),
    truck: "<path d='M2 6.5A1.5 1.5 0 0 1 3.5 5H14v11H2z' fill='url(#r)'/><path d='M14 8.5h4.2l3.3 3.8V16H14z' fill='#F4525A'/><path d='M15.5 10h2.2l1.8 2.2h-4z' fill='#DDF0FF'/><rect x='2' y='15.5' width='19.5' height='2' rx='.8' fill='#9F0E22'/><circle cx='6.5' cy='18' r='2.3' fill='#2B2F3A'/><circle cx='17' cy='18' r='2.3' fill='#2B2F3A'/><circle cx='6.5' cy='18' r='.9' fill='#C9D0DC'/><circle cx='17' cy='18' r='.9' fill='#C9D0DC'/>",
    inbox: "<path d='M3 13l2.5-8h13L21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' fill='#FDE0E0' stroke='" + RS + "' stroke-width='1.6' stroke-linejoin='round'/><path d='M3 13h5l1.5 2.5h5L16 13h5' fill='none' stroke='" + RS + "' stroke-width='1.6' stroke-linejoin='round'/>" + L('M12 3v8M9 8l3 3 3-3', 2),
    outbox: "<path d='M3 13l2.5-8h13L21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' fill='#FDE0E0' stroke='" + RS + "' stroke-width='1.6' stroke-linejoin='round'/><path d='M3 13h5l1.5 2.5h5L16 13h5' fill='none' stroke='" + RS + "' stroke-width='1.6' stroke-linejoin='round'/>" + L('M12 11V3M9 6l3-3 3 3', 2),
    mail: "<rect x='2.5' y='5' width='19' height='14' rx='2.5' fill='url(#r)'/><path d='M3.5 6.5l8.5 6.5 8.5-6.5' fill='none' stroke='#fff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/>",
    gear: "<path d='M12 1.8l1.6 2.4 2.8-.8.6 2.8 2.8.6-.8 2.8 2.4 1.6-2.4 1.6.8 2.8-2.8.6-.6 2.8-2.8-.8L12 22.2l-1.6-2.4-2.8.8-.6-2.8-2.8-.6.8-2.8L1.8 12l2.4-1.6-.8-2.8 2.8-.6.6-2.8 2.8.8z' fill='url(#s)'/><circle cx='12' cy='12' r='3.8' fill='#fff'/><circle cx='12' cy='12' r='2' fill='url(#r)'/>",
    timer: "<circle cx='12' cy='13.5' r='8' fill='#fff' stroke='" + RS + "' stroke-width='2'/><rect x='10' y='1.8' width='4' height='2.6' rx='1' fill='url(#r)'/>" + L('M12 9v4.8l3 1.8', 2) + L('M18.6 6l1.5-1.5', 2),
    broom: "<path d='M16.5 2.5 11 10' stroke='#B87A32' stroke-width='2.2' stroke-linecap='round'/><path d='M8 9l6 4-2.5 8.5c-3-.5-6.5-2.8-8.5-5.5z' fill='url(#y)' stroke='#C77700' stroke-width='.8' stroke-linejoin='round'/><path d='M7.5 9.5l6.5 3.8' stroke='" + RS + "' stroke-width='2.2' stroke-linecap='round'/>",
    trash: "<path d='M5 7h14l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z' fill='url(#r)'/><rect x='3' y='4.5' width='18' height='3' rx='1.2' fill='#F4525A'/><rect x='9' y='2.2' width='6' height='2.8' rx='1' fill='#9F0E22'/><path d='M10 10.5v7M14 10.5v7' stroke='#fff' stroke-width='1.6' stroke-linecap='round' opacity='.85'/>",
    factory: "<path d='M2 21V11l5 3v-3l5 3v-3l5 3V4h4v17z' fill='url(#r)'/><rect x='17' y='2.5' width='4' height='2' fill='#9F0E22'/><g fill='#fff'><rect x='5' y='16' width='2.5' height='2.5' rx='.4'/><rect x='10' y='16' width='2.5' height='2.5' rx='.4'/><rect x='15' y='16' width='2.5' height='2.5' rx='.4'/></g>",
    phone: "<path d='M6.6 3.5h2.6l1.5 4.2-2 1.4a11 11 0 0 0 6.2 6.2l1.4-2 4.2 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z' fill='url(#r)'/>",
    link: "<path d='M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2' fill='none' stroke='" + RS + "' stroke-width='2.4' stroke-linecap='round'/><path d='M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2' fill='none' stroke='#8C96A8' stroke-width='2.4' stroke-linecap='round'/>",
    film: "<rect x='3' y='9' width='18' height='12' rx='2' fill='#2B2F3A'/><path d='M3 5.6l17-3 .7 3.8-17 3z' fill='url(#r)'/><path d='M7 4.9l2 3.2M11.5 4.1l2 3.2M16 3.3l2 3.2' stroke='#fff' stroke-width='1.3'/><path d='M10 12.5v5l4.5-2.5z' fill='#fff'/>",
    music: "<path d='M9 18V5.5l11-2.5v12.5' fill='none' stroke='" + RS + "' stroke-width='2.2' stroke-linejoin='round'/><circle cx='6.5' cy='18' r='3' fill='url(#r)'/><circle cx='17.5' cy='15.5' r='3' fill='url(#r)'/>",
    pdf: TAG('#D7192B', 'PDF'), ppt: TAG('#F08A24', 'PPT'), zip: TAG('#7D879C', 'ZIP'),
    cart: "<path d='M1.8 3.5h3l2.4 11.2a1.8 1.8 0 0 0 1.8 1.4h8.8a1.8 1.8 0 0 0 1.7-1.3L21.6 7H6' fill='none' stroke='#D7192B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M6.4 7h15.2l-2.1 7.4a1.2 1.2 0 0 1-1.1.9H8.6z' fill='url(#r)'/><circle cx='9.5' cy='20' r='1.8' fill='#2B2F3A'/><circle cx='17.5' cy='20' r='1.8' fill='#2B2F3A'/><path d='M10 10.2h7.5' stroke='#fff' stroke-width='1.4' stroke-linecap='round' opacity='.8'/>",
    doc: DOC + "<path d='M7.5 11h9M7.5 14h9M7.5 17h6' stroke='#C9CED8' stroke-width='1.4' stroke-linecap='round'/>"
  };
  var MAP = {
    '⚠': 'warn', '✅': 'ok', '☑': 'box3', '⛔': 'stop', '❌': 'cross', 'ℹ': 'info', '🔴': 'dotR', '🟡': 'dotY', '👁': 'eye', '🔄': 'refresh',
    '📦': 'box', '🎁': 'gift', '📌': 'pin', '↩': 'undo', '⬇': 'down', '⬆': 'up', '💾': 'save', '📺': 'tv', '🔎': 'search', '🔍': 'search',
    '🩺': 'check', '🗓': 'cal', '📅': 'cal', '📝': 'memo', '✏': 'pencil', '✍': 'pencil', '🔑': 'key', '🔒': 'lock', '◀': 'left', '▶': 'right',
    '↗': 'ne', '↔': 'lr', '↕': 'ud', '⤵': 'take', '📊': 'chart', '📈': 'chartUp', '🚚': 'truck', '📥': 'inbox', '📤': 'outbox', '📨': 'mail',
    '⚙': 'gear', '⏱': 'timer', '🧹': 'broom', '🗑': 'trash', '🏭': 'factory', '☎': 'phone', '🔗': 'link', '🎬': 'film', '🎵': 'music',
    '📕': 'pdf', '📙': 'ppt', '🗜': 'zip', '📄': 'doc', '🛒': 'cart', '🛍': 'cart'
  };
  // 스타일
  var css = '.dd-ico{display:inline-block;width:1.28em;height:1.28em;vertical-align:-0.26em;background:center/contain no-repeat;overflow:hidden;text-indent:200%;white-space:nowrap;line-height:1;font-style:normal;flex:0 0 auto;}' +
            '.dd-ico.dd-png{width:1.55em;height:1.55em;vertical-align:-0.4em;margin:-0.12em 0;}';
  Object.keys(SVG).forEach(function (k) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>" + DEFS + SVG[k] + "</svg>";
    css += '.dd-ico[data-k="' + k + '"]{background-image:url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27') + '")}';
  });
  Object.keys(PNG).forEach(function (e) { css += '.dd-ico[data-k="p-' + PNG[e] + '"]{background-image:url("' + BASE + 'ic-' + PNG[e] + '.png")}'; });
  var st = document.createElement('style'); st.id = 'dd-icons-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
  // 이모지 찾기
  var keys = Object.keys(MAP).concat(Object.keys(PNG)).sort(function (a, b) { return b.length - a.length; })
    .map(function (k) { return k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
  var SRC = '(' + keys.join('|') + ')\\uFE0F?';
  var TEST = new RegExp(SRC);
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|OPTION|OPTGROUP|SELECT|TITLE|NOSCRIPT|CANVAS|svg|SVG|INPUT|CODE|PRE)$/;
  function blocked(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
      if (SKIP.test(n.nodeName)) return true;
      if (n.classList && n.classList.contains('dd-ico')) return true;
      if (n.hasAttribute && (n.hasAttribute('data-noico') || n.getAttribute('contenteditable') === 'true')) return true;
    }
    return false;
  }
  function wrap(node) {
    var t = node.nodeValue;
    if (!t || !TEST.test(t)) return;
    var p = node.parentNode;
    if (!p || p.nodeType !== 1 || blocked(p)) return;
    var re = new RegExp(SRC, 'g'), frag = document.createDocumentFragment(), last = 0, m;
    while ((m = re.exec(t))) {
      if (m.index > last) frag.appendChild(document.createTextNode(t.slice(last, m.index)));
      var i = document.createElement('i'), base = m[1];
      i.className = PNG[base] ? 'dd-ico dd-png' : 'dd-ico';
      i.setAttribute('data-k', PNG[base] ? 'p-' + PNG[base] : MAP[base]);
      i.setAttribute('aria-hidden', 'true');
      i.textContent = m[0];
      frag.appendChild(i);
      last = m.index + m[0].length;
    }
    if (last < t.length) frag.appendChild(document.createTextNode(t.slice(last)));
    p.replaceChild(frag, node);
  }
  function scan(root) {
    if (!root) return;
    if (root.nodeType === 3) { wrap(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    if (root.classList && root.classList.contains('dd-ico')) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], n;
    while ((n = w.nextNode())) { if (n.nodeValue && TEST.test(n.nodeValue)) list.push(n); }
    for (var k = 0; k < list.length; k++) wrap(list[k]);
  }
  window.ddIconScan = scan;
  function start() {
    scan(document.body);
    new MutationObserver(function (muts) {
      for (var a = 0; a < muts.length; a++) {
        var m = muts[a];
        if (m.type === 'characterData') wrap(m.target);
        else for (var b = 0; b < m.addedNodes.length; b++) scan(m.addedNodes[b]);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
