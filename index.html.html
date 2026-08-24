<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>다름달음 발주취합 프로그램</title>
<style>
  :root{
    --ink:#1e2a24;
    --paper:#faf8f3;
    --line:#d8d2c2;
    --accent:#3a6b52;
    --accent-soft:#e7efe9;
    --warn:#b5482e;
    --warn-soft:#fbeae5;
    --muted:#8a8578;
  }
  #app{
    font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
    color:var(--ink);
    background:var(--paper);
    padding:24px;
    border-radius:12px;
    max-width:1150px;
    margin:0 auto;
  }
  #app h1{
    font-size:20px;
    font-weight:700;
    margin:0 0 4px;
    letter-spacing:-0.02em;
  }
  #app .sub{
    color:var(--muted);
    font-size:13px;
    margin-bottom:20px;
  }
  .card{
    background:#fff;
    border:1px solid var(--line);
    border-radius:10px;
    padding:18px 20px;
    margin-bottom:16px;
  }
  .card h2{
    font-size:14px;
    font-weight:700;
    margin:0 0 12px;
    display:flex;
    align-items:center;
    gap:8px;
  }
  .card h3{
    font-size:12.5px;
    font-weight:700;
    color:var(--muted);
    margin:16px 0 8px;
    text-transform:none;
  }
  .card h2 .badge{
    background:var(--accent-soft);
    color:var(--accent);
    font-size:11px;
    font-weight:600;
    padding:2px 8px;
    border-radius:100px;
  }
  textarea{
    width:100%;
    box-sizing:border-box;
    min-height:110px;
    border:1px solid var(--line);
    border-radius:8px;
    padding:10px 12px;
    font-size:13px;
    font-family:inherit;
    resize:vertical;
    background:#fffdf9;
  }
  textarea:focus, input:focus, select:focus{ outline:2px solid var(--accent); outline-offset:1px; }
  button{
    font-family:inherit;
    font-size:13px;
    font-weight:600;
    border:none;
    border-radius:7px;
    padding:8px 14px;
    cursor:pointer;
    transition:opacity .15s;
  }
  button:hover{ opacity:.85; }
  button:active{ transform:translateY(1px); }
  .btn-primary{ background:var(--accent); color:#fff; }
  .btn-ghost{ background:var(--accent-soft); color:var(--accent); }
  .btn-danger{ background:var(--warn-soft); color:var(--warn); }
  .row{ display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; align-items:center; }
  table{ width:100%; border-collapse:collapse; font-size:12.5px; }
  th, td{ border:1px solid var(--line); padding:6px 8px; text-align:center; }
  th{ background:#f3f0e6; font-weight:700; white-space:nowrap; }
  td.name-cell, th.name-cell{ text-align:left; white-space:nowrap; }
  td input[type=number]{
    width:56px; border:1px solid transparent; background:transparent;
    text-align:center; font-size:12.5px; border-radius:4px; padding:2px;
  }
  td input[type=number]:hover{ border-color:var(--line); }
  td input[type=text]{
    width:100%; border:1px solid transparent; background:transparent;
    font-size:12px; border-radius:4px; padding:2px;
  }
  td input[type=text]:hover{ border-color:var(--line); }
  .parsed-row{ display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px dashed var(--line); flex-wrap:wrap; }
  .parsed-row:last-child{ border-bottom:none; }
  .tag{ font-size:11px; padding:2px 7px; border-radius:100px; font-weight:600; }
  .tag.ok{ background:var(--accent-soft); color:var(--accent); }
  .tag.warn{ background:var(--warn-soft); color:var(--warn); }
  select{ font-size:12.5px; padding:4px 6px; border-radius:6px; border:1px solid var(--line); font-family:inherit; }
  input[type=text]{ font-size:12.5px; padding:5px 8px; border-radius:6px; border:1px solid var(--line); font-family:inherit; }
  .raw-line{ color:var(--muted); font-size:11.5px; flex-basis:100%; }
  .dict-row{ display:flex; gap:8px; align-items:center; margin-bottom:6px; }
  .dict-row input[type=text]{ flex:1; }
  .empty{ color:var(--muted); font-size:13px; padding:20px; text-align:center; }
  .small-btn{ padding:4px 8px; font-size:11.5px; }
  .totals-col{ background:#f7f4ea; font-weight:700; }
  details summary{ cursor:pointer; font-size:13px; font-weight:600; color:var(--accent); }
  .toast{
    position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
    background:var(--ink); color:#fff; padding:8px 16px; border-radius:8px;
    font-size:13px; opacity:0; transition:opacity .3s; pointer-events:none; z-index:999;
  }
  .toast.show{ opacity:1; }
  .tab-btn{ background:transparent; color:var(--muted); border:1px solid var(--line); }
  .tab-btn.active{ background:var(--accent); color:#fff; border-color:var(--accent); }
  .date-chip{ background:#fff; color:var(--ink); border:1px solid var(--line); font-size:12px; font-weight:600; padding:5px 10px; border-radius:100px; cursor:pointer; }
  .date-chip.active{ background:var(--accent); color:#fff; border-color:var(--accent); }
  .dropzone{
    border:2px dashed var(--line);
    border-radius:10px;
    padding:22px;
    text-align:center;
    font-size:13px;
    color:var(--muted);
    cursor:pointer;
    transition:background .15s, border-color .15s, color .15s;
    margin-top:10px;
  }
  .dropzone.dragover{ background:var(--accent-soft); border-color:var(--accent); color:var(--accent); }
  .dropzone .fname{ font-weight:700; color:var(--ink); margin-top:4px; }
</style>
</head>
<body style="margin:0;">

<!-- 로그인 화면 -->
<div id="login-screen" style="display:flex; align-items:center; justify-content:center; min-height:100vh; background:var(--bg);">
  <div style="background:#fff; border:1px solid var(--line); border-radius:16px; padding:36px 40px; width:340px; box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="text-align:center; margin-bottom:24px;">
      <div style="font-size:22px; font-weight:800; color:var(--ink);">다름달음</div>
      <div style="font-size:13px; color:var(--muted); margin-top:4px;">발주취합 프로그램</div>
    </div>
    <div style="margin-bottom:12px;">
      <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">아이디</label>
      <input type="text" id="login-username" placeholder="아이디 입력" style="width:100%; box-sizing:border-box; padding:10px 12px; border:1px solid var(--line); border-radius:8px; font-size:14px; font-family:inherit;">
    </div>
    <div style="margin-bottom:20px;">
      <label style="font-size:12px; font-weight:600; color:var(--muted); display:block; margin-bottom:4px;">비밀번호</label>
      <input type="password" id="login-password" placeholder="비밀번호 입력" style="width:100%; box-sizing:border-box; padding:10px 12px; border:1px solid var(--line); border-radius:8px; font-size:14px; font-family:inherit;">
    </div>
    <button id="login-btn" style="width:100%; padding:12px; background:var(--accent); color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit;">로그인</button>
    <div id="login-error" style="color:#b5482e; font-size:12px; text-align:center; margin-top:10px; display:none;"></div>
  </div>
</div>

<div id="app" style="display:none;">
  <!-- 상단 사용자 정보 바 -->
  <div style="background:var(--accent); color:#fff; padding:8px 20px; display:flex; justify-content:space-between; align-items:center; font-size:13px;">
    <span style="font-weight:700;">다름달음 발주취합</span>
    <div style="display:flex; align-items:center; gap:12px;">
      <span id="user-badge" style="opacity:0.9;"></span>
      <button onclick="logout()" style="background:rgba(255,255,255,0.2); border:none; color:#fff; padding:4px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-family:inherit;">로그아웃</button>
    </div>
  </div>

  <h1>다름달음 발주취합 프로그램</h1>
  <div class="sub">카카오톡 발주 메시지를 붙여넣거나 엑셀을 업로드하면 품목별 수량을 자동으로 집계표에 반영합니다.</div>

  <div class="card" style="padding:14px 20px;">
    <div class="row" style="margin-top:0; align-items:center;">
      <label style="font-size:13px;font-weight:700;">담당자 :</label>
      <input type="text" id="staff-name" placeholder="이름 입력" style="width:120px;">
      <label style="font-size:13px;font-weight:700; margin-left:8px;">부서 :</label>
      <input type="text" id="staff-dept" placeholder="부서명" style="width:110px;">
      <span style="font-size:11px;color:var(--muted);">※ 내 브라우저에만 저장됩니다 (담당자별 개인 설정)</span>
    </div>
    <div class="row" style="margin-top:8px; align-items:center;">
      <label style="font-size:13px;font-weight:700;">납품일 :</label>
      <input type="number" id="delivery-year" placeholder="연" style="width:70px;" min="2020" max="2100">
      <span>년</span>
      <input type="number" id="delivery-month" placeholder="월" style="width:55px;" min="1" max="12">
      <span>월</span>
      <input type="number" id="delivery-day" placeholder="일" style="width:55px;" min="1" max="31">
      <span>일</span>
      <button class="btn-ghost small-btn" id="new-date-btn">+ 새 날짜로 집계 시작</button>
    </div>
    <div class="row" id="saved-dates-wrap" style="margin-top:10px;"></div>
    <div class="row" style="margin-top:10px; align-items:center; border-top:1px solid var(--line); padding-top:10px;">
      <label style="font-size:12px;color:var(--muted);">데이터 보관 기간 :</label>
      <input type="number" id="retention-months" min="1" style="width:55px;" value="3">
      <span style="font-size:12px;color:var(--muted);">개월 (이보다 오래된 날짜 데이터는 자동 정리됩니다)</span>
      <button class="btn-ghost small-btn" id="cleanup-now-btn">지금 정리하기</button>
    </div>
  </div>

  <div class="card">
    <details>
      <summary>SKU 관리 (별칭 등록 · 항목 추가/삭제)</summary>
      <div id="dict-editor" style="margin-top:12px;"></div>
      <div class="row">
        <button class="btn-ghost small-btn" id="add-item-btn">+ 품목 추가</button>
      </div>
    </details>
  </div>

  <div class="card">
    <details>
      <summary>거래처 관리 (업체 목록 추가/삭제)</summary>
      <div id="company-editor" style="margin-top:12px;"></div>
      <div class="row">
        <input type="text" id="new-company-manage-input" placeholder="업체명 입력" style="min-width:180px;">
        <button class="btn-ghost small-btn" id="add-company-manage-btn">+ 업체 추가</button>
        <button class="btn-primary small-btn" id="export-codes-btn">품목·거래처 코드표 다운로드</button>
      </div>
      <div style="margin-top:16px; padding-top:12px; border-top:1px dashed var(--line);">
        <div style="font-size:13px; font-weight:700; margin-bottom:8px; color:var(--muted);">구분 목록 관리</div>
        <div id="category-editor" style="margin-bottom:8px;"></div>
        <div class="row" style="margin-top:6px;">
          <input type="text" id="new-category-input" placeholder="새 구분 입력" style="min-width:180px;">
          <button class="btn-ghost small-btn" id="add-category-btn">+ 구분 추가</button>
        </div>
      </div>
    </details>
  </div>

  <div class="card">
    <details>
      <summary style="cursor:pointer; font-size:16px; font-weight:700; color:var(--fg);">1. 전일 재고 / 원물사용량 입력 <span class="badge">원물 · 제품 별도 관리</span></summary>
      <div style="margin-top:10px;">
      <div class="sub" style="margin-top:0;">전일 재고를 넣어두면 아래 집계표에서 오늘 필요한 생산 수량을 바로 확인할 수 있습니다. 원물사용량은 생산본부 공유파일에 자동 반영됩니다.</div>

      <h3>원물 재고 &amp; 당일 사용량(kg)</h3>
      <div style="font-size:11.5px; color:var(--muted); margin-bottom:6px;">전일재고(단위), 팩당kg, 당일사용량(kg) — 당일사용량은 직접 입력하거나 팩당kg×오늘출고수량으로 자동계산</div>
      <div id="raw-stock-editor"></div>
      <div class="row">
        <input type="text" id="new-raw-material-input" placeholder="원물명 입력 (예: 토마토, 망고, 자몽)" style="min-width:180px;">
        <button class="btn-ghost small-btn" id="add-raw-material-btn">+ 원물 추가</button>
      </div>

      <h3>제품 재고</h3>
      <div id="product-stock-editor"></div>
      </div>
    </details>
  </div>

  <div class="row" style="align-items:stretch; margin-top:0;">
    <div class="card" style="flex:1; min-width:300px; margin-bottom:0;">
      <h2>2. 오프라인 발주 메시지 입력 <span class="badge" id="parse-status">대기중</span></h2>
      <textarea id="msg-input" placeholder="예)&#10;덕평휴게소&#10;자몽토마토 120박스&#10;망고토마토 60박스&#10;용과10박스 주문합니다"></textarea>
      <div class="row">
        <button class="btn-primary" id="parse-btn">입력하기</button>
        <button class="btn-ghost" id="clear-input-btn">지우기</button>
      </div>
    </div>

    <div class="card" style="flex:1; min-width:300px; margin-bottom:0;">
      <h2>3. 온라인 주문 엑셀 업로드 <span class="badge">3PL 등 업체별 파일 형식 지원</span></h2>
      <div class="row" style="margin-top:0;">
        <label style="font-size:13px;font-weight:600;">업체 선택 :</label>
        <select id="upload-company-select" style="min-width:160px;"></select>
      </div>
      <div class="dropzone" id="upload-dropzone">
        <div>주문 파일을 여기로 끌어다 놓거나 클릭해서 선택하세요 (xlsx / xls / csv)</div>
        <div class="fname" id="upload-fname"></div>
        <input type="file" id="upload-file-input" accept=".xlsx,.xls,.csv" style="display:none;">
      </div>
      <div id="upload-mapping-wrap" style="margin-top:12px; display:none;">
        <div class="row" id="upload-field-selects" style="margin-top:0;"></div>
        <div class="row">
          <label style="font-size:13px;">데이터 시작 행 :</label>
          <input type="number" id="upload-start-row" min="1" style="width:60px;" value="2">
        </div>
        <div class="sub" style="margin:6px 0 0;">업체마다 파일 형식이 달라도 괜찮습니다 — 한 번 지정해두면 같은 업체 파일은 다음부터 자동으로 같은 열을 사용합니다.</div>
        <div id="upload-file-preview" style="margin-top:10px; overflow-x:auto;"></div>
        <div class="row">
          <button class="btn-primary small-btn" id="upload-apply-btn">이 매핑으로 불러오기</button>
        </div>
      </div>
    </div>
  </div>


  <div class="card" id="preview-card" style="display:none;">
    <h2>인식 결과 확인 <span class="badge">수정 후 확정</span></h2>
    <div class="row" style="margin-top:0;">
      <label style="font-size:13px;font-weight:600;">업체명 :</label>
      <select id="company-select" style="min-width:180px;"></select>
      <button class="btn-ghost small-btn" id="add-company-inline-btn">+ 새 업체</button>
    </div>
    <div class="row" id="new-company-row" style="display:none;">
      <input type="text" id="new-company-input" placeholder="새 업체명 입력" style="min-width:180px;">
      <button class="btn-primary small-btn" id="save-new-company-btn">추가</button>
    </div>
    <div id="parsed-items" style="margin-top:12px;"></div>
    <div class="row">
      <button class="btn-primary" id="confirm-btn">✓ 집계표에 확정 추가</button>
      <button class="btn-ghost" id="cancel-preview-btn">취소</button>
    </div>
  </div>

  <div class="card">
    <h2>4. 업체별 발주 집계표 <span class="badge" id="current-date-badge"></span></h2>
    <div class="row" style="margin-top:0;">
      <button class="tab-btn active" id="tab-all-btn">전체 집계</button>
      <button class="tab-btn" id="tab-3pl-btn">3PL 출고 집계</button>
      <button class="tab-btn" id="admin-tab-btn" style="display:none; background:#fef9e7; color:#b7770d;">관리자</button>
    </div>
    <div id="agg-table-wrap"></div>
    <div class="row" id="agg-bulk-bar" style="display:none;">
      <button class="btn-danger small-btn" id="agg-bulk-delete-btn">선택 항목 삭제</button>
    </div>
    <div id="agg-3pl-wrap" style="display:none;">
      <h3>품목별 합계</h3>
      <div id="agg-3pl-summary-wrap"></div>
      <h3>개별 주문(택배) 리스트</h3>
      <div id="agg-3pl-detail-wrap"></div>
      <div class="row" id="detail-bulk-bar" style="display:none;">
        <button class="btn-danger small-btn" id="detail-bulk-delete-btn">선택 항목 삭제</button>
      </div>

      <h3>택배사 발주서 다운로드</h3>
      <div class="sub" style="margin-top:0;">첨부해주신 제이엠로지스 발주서 양식 그대로, 오늘 3PL 전체 개별 주문을 담아 .xls로 내려받습니다.</div>
      <div class="row">
        <label style="font-size:13px;">보내는분 성명 :</label>
        <input type="text" id="sender-name" style="width:120px;" value="㈜다름달음">
        <label style="font-size:13px;">보내는분 전화번호 :</label>
        <input type="text" id="sender-phone" style="width:130px;" value="02-406-1122">
        <button class="btn-primary small-btn" id="export-courier-form-btn">택배사 발주서 다운로드 (.xls)</button>
      </div>

      <h3>운송장번호 업로드</h3>
      <div class="sub" style="margin-top:0;">택배사에서 발급된 운송장번호 파일을 업로드하면 개별 주문과 자동 매칭됩니다.</div>
      <div class="dropzone" id="tracking-dropzone">
        <div>운송장번호가 담긴 파일을 여기로 끌어다 놓거나 클릭해서 선택하세요 (xlsx / xls / csv)</div>
        <div class="fname" id="tracking-fname"></div>
        <input type="file" id="tracking-file-input" accept=".xlsx,.xls,.csv" style="display:none;">
      </div>
      <div id="tracking-mapping-wrap" style="margin-top:12px; display:none;">
        <div class="row" style="margin-top:0;">
          <label style="font-size:13px;">업체 주문번호 열 :</label>
          <select id="tracking-orderno-col"></select>
          <label style="font-size:13px;">운송장번호 열 :</label>
          <select id="tracking-trackingno-col"></select>
          <label style="font-size:13px;">데이터 시작 행 :</label>
          <input type="number" id="tracking-start-row" min="1" style="width:60px;" value="2">
        </div>
        <div class="sub" style="margin:6px 0 0;">업체 주문번호 기준으로 매칭됩니다. 업체 주문번호가 없으면 사내관리번호로 자동 매칭합니다.</div>
        <div id="tracking-file-preview" style="margin-top:10px; overflow-x:auto;"></div>
        <div class="row">
          <button class="btn-primary small-btn" id="tracking-apply-btn">운송장번호 매칭 적용</button>
        </div>
      </div>

      <h3>업체 원본 양식 + 운송장번호 다운로드</h3>
      <div class="sub" style="margin-top:0;">업로드했던 업체의 원본 파일 형식 그대로, 운송장번호를 지정한 열에 채워서 그 업체에 회신할 파일을 받습니다.</div>
      <div class="row">
        <select id="original-file-company-select" style="min-width:180px;"></select>
        <label style="font-size:13px;">운송장번호 삽입 열 :</label>
        <input type="text" id="original-tracking-col" placeholder="예: L" style="width:60px; text-transform:uppercase;" title="원본 파일에서 운송장번호를 기입할 열 (예: L). 비워두면 마지막 열 뒤에 추가됩니다.">
        <button class="btn-primary small-btn" id="export-original-format-btn">업체 양식으로 다운로드</button>
      </div>

      <h3>택배 건수 집계 (업체별 / 사이즈별)</h3>
      <div class="sub" style="margin-top:0;">운송장번호가 매칭된 주문 기준으로 극소(1~4팩) / 소(5~8팩) 사이즈별 건수를 집계합니다. 업체에 택배비 청구 시 활용하세요.</div>
      <div id="delivery-count-wrap"></div>
      <div class="row">
        <button class="btn-ghost small-btn" id="refresh-delivery-count-btn">집계 새로고침</button>
        <button class="btn-primary small-btn" id="export-delivery-count-btn">택배 건수 엑셀 다운로드</button>
      </div>
    </div>
    <div class="row">
      <button class="btn-primary" id="export-btn">전체 엑셀 다운로드</button>
      <button class="btn-primary" id="export-production-btn">생산본부 공유파일 다운로드</button>
      <button class="btn-primary" id="export-3pl-btn" style="display:none;">3PL 엑셀 다운로드</button>
      <button class="btn-danger" id="reset-all-btn">이 날짜 초기화</button>
    </div>

    <details style="margin-top:14px;">
      <summary style="cursor:pointer; font-size:13px; font-weight:600; color:var(--accent);">생산본부 공유파일 템플릿 관리 (교체 · SKU 열 매핑)</summary>
      <div style="margin-top:12px;">
        <div class="sub" style="margin:0 0 8px;">원본 파일(.xlsx)을 업로드해두면 해당 파일 양식 그대로 값을 채워서 다운로드합니다. 파일이 바뀌면 새 파일로 교체하세요.</div>
        <div class="dropzone" id="production-template-dropzone">
          <div>생산본부 공유파일(.xlsx)을 여기에 끌어다 놓거나 클릭해서 선택</div>
          <div class="fname" id="production-template-fname"></div>
          <input type="file" id="production-template-input" accept=".xlsx" style="display:none;">
        </div>
        <h3 style="margin:14px 0 6px;">SKU → 파일 내 열 매핑</h3>
        <div class="sub" style="margin:0 0 8px;">각 SKU가 파일에서 어느 열(예: J, K, AA)에 해당하는지 지정하세요. 파일의 13행 헤더를 보고 맞춰주세요.</div>
        <div id="sku-column-map-editor"></div>
      </div>
    </details>

    <h3>월간 누적 보기</h3>
    <div class="row" style="margin-top:0;">
      <input type="number" id="monthly-year" placeholder="연" style="width:70px;">
      <span>년</span>
      <input type="number" id="monthly-month" placeholder="월" style="width:55px;">
      <span>월</span>
      <button class="btn-ghost small-btn" id="monthly-view-btn">월간 합계 보기</button>
      <button class="btn-primary small-btn" id="monthly-export-btn" style="display:none;">월간 엑셀 다운로드</button>
    </div>
    <div id="monthly-summary-wrap" style="margin-top:10px;"></div>

    <!-- 관리자 패널 (관리자만 표시) -->
    <div id="admin-panel" style="display:none; margin-top:16px;">
      <h3>관리자 패널</h3>
      <div style="display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap;">
        <button class="btn-ghost small-btn" id="admin-tab-log" onclick="showAdminSection('log')">활동 로그</button>
        <button class="btn-ghost small-btn" id="admin-tab-users" onclick="showAdminSection('users')">사용자 관리</button>
      </div>

      <!-- 활동 로그 -->
      <div id="admin-section-log">
        <div class="row" style="margin-top:0;">
          <button class="btn-ghost small-btn" id="admin-refresh-log-btn">새로고침</button>
          <button class="btn-primary small-btn" id="admin-export-log-btn">로그 엑셀 다운로드</button>
        </div>
        <div id="admin-log-wrap" style="margin-top:10px; overflow-x:auto;"></div>
      </div>

      <!-- 사용자 관리 -->
      <div id="admin-section-users" style="display:none;">
        <div id="admin-users-wrap" style="overflow-x:auto;"></div>
        <h3 style="margin-top:16px;">새 사용자 추가</h3>
        <div class="row" style="margin-top:0;">
          <input type="text" id="new-user-username" placeholder="아이디" style="width:110px;">
          <input type="text" id="new-user-display" placeholder="이름 (예: 박준수)" style="width:120px;">
          <input type="password" id="new-user-pw" placeholder="비밀번호" style="width:110px;">
          <select id="new-user-role">
            <option value="staff">직원</option>
            <option value="admin">관리자</option>
          </select>
          <button class="btn-primary small-btn" id="admin-add-user-btn">추가</button>
        </div>
        <div style="margin-top:10px;">
          <div style="font-size:13px; font-weight:700; margin-bottom:6px;">비밀번호 변경</div>
          <div class="row" style="margin-top:0;">
            <select id="pw-change-user-select" style="min-width:130px;"></select>
            <input type="password" id="pw-change-new" placeholder="새 비밀번호" style="width:130px;">
            <button class="btn-ghost small-btn" id="admin-change-pw-btn">변경</button>
          </div>
        </div>
      </div>
    </div>

    <details style="margin-top:14px;">
      <summary style="cursor:pointer;font-size:13px;font-weight:600;color:var(--accent);">수동 날짜 데이터 입력 (프로그램 외부에서 처리한 날짜)</summary>
      <div style="margin-top:10px;">
        <div class="sub" style="margin:0 0 8px;">발주취합 프로그램을 사용하지 않은 날짜의 데이터를 직접 입력해 월간 합계에 포함시킵니다.</div>
        <div class="row" style="margin-top:0;">
          <label style="font-size:13px;">날짜 :</label>
          <input type="number" id="manual-year" placeholder="연" style="width:70px;">
          <span>년</span>
          <input type="number" id="manual-month" placeholder="월" style="width:55px;">
          <span>월</span>
          <input type="number" id="manual-day" placeholder="일" style="width:55px;">
          <span>일</span>
        </div>
        <div class="row">
          <label style="font-size:13px;">업체명 :</label>
          <input type="text" id="manual-company" placeholder="업체명" style="width:150px;">
        </div>
        <div id="manual-qty-editor" style="margin-top:8px;"></div>
        <div class="row">
          <button class="btn-primary small-btn" id="manual-add-btn">+ 이 날짜에 추가</button>
        </div>
      </div>
    </details>
  </div>

  <div class="card">
    <details>
      <summary style="cursor:pointer; font-size:16px; font-weight:700; color:var(--fg);">이카운트 판매입력 엑셀 다운로드</summary>
      <div style="margin-top:10px;">
      <div class="sub" style="margin-top:0;">당일 집계된 발주를 이카운트 판매입력 템플릿 형식으로 다운로드합니다. 업체별 단가는 아래 거래처 관리에서 설정하세요.</div>
    <div class="row" style="margin-top:0;">
      <label style="font-size:13px;">출하창고 :</label>
      <input type="text" id="ecount-warehouse" placeholder="예: 본창고" style="width:110px;">
      <label style="font-size:13px;">거래유형 :</label>
      <input type="text" id="ecount-trade-type" placeholder="예: 판매" style="width:90px;" value="판매">
      <span style="font-size:11px;color:var(--muted);">※ 공용 저장</span>
    </div>
    <div class="row" style="margin-top:6px;">
      <label style="font-size:13px;">담당자 :</label>
      <input type="text" id="ecount-manager" placeholder="담당자명 (개인 저장)" style="width:120px;">
      <label style="font-size:13px;">부서 :</label>
      <input type="text" id="ecount-department" placeholder="부서명 (개인 저장)" style="width:110px;">
      <span style="font-size:11px;color:var(--muted);">※ 내 브라우저에만 저장</span>
    </div>
    <div class="row">
      <button class="btn-primary small-btn" id="export-ecount-btn">이카운트 엑셀 다운로드</button>
    </div>

    <h3 style="margin-top:14px;">거래처별 품목 단가 설정</h3>
    <div class="sub" style="margin:0 0 8px;">거래처 관리에서 구분이 설정된 업체만 표시됩니다.</div>
    <div id="price-map-editor" style="overflow-x:auto;"></div>

    <h3 style="margin-top:16px;">3PL 택배비 품목 설정 (이카운트 자동 입력용)</h3>
    <div class="sub" style="margin:0 0 8px;">운송장번호가 매칭된 3PL 주문에 대해 극소/소 사이즈별 택배비를 이카운트 행으로 자동 추가합니다. 품목명·품목코드·단가를 설정해두세요.</div>
    <div id="delivery-fee-editor"></div>
      </div>
    </details>
  </div>

  <div class="card">
    <details>
      <summary style="cursor:pointer; font-size:16px; font-weight:700; color:var(--fg);">데이터 백업 / 복원</summary>
      <div style="margin-top:10px;">
      <div class="sub" style="margin-top:0;">새 버전으로 교체하기 전에 백업을 받아두고, 새 버전에서 복원하면 데이터를 그대로 이어갈 수 있습니다.</div>
    <div class="row">
      <button class="btn-primary small-btn" id="backup-btn">📥 전체 데이터 백업 (JSON 다운로드)</button>
    </div>
    <div class="dropzone" id="restore-dropzone" style="margin-top:10px;">
      <div>백업 파일(.json)을 여기에 끌어다 놓거나 클릭해서 복원</div>
      <div class="fname" id="restore-fname"></div>
      <input type="file" id="restore-file-input" accept=".json" style="display:none;">
    </div>
    <div id="restore-preview" style="margin-top:10px; display:none;">
      <div id="restore-summary" style="font-size:13px; margin-bottom:8px;"></div>
      <div class="row" style="margin-top:0;">
        <button class="btn-primary small-btn" id="restore-confirm-btn">✓ 이 백업으로 복원하기</button>
        <button class="btn-ghost small-btn" id="restore-cancel-btn">취소</button>
      </div>
    </div>
      </div>
    </details>
  </div>

  <div class="toast" id="toast"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script>
// ══════════════════════════════════════════════════════════════════
// Supabase 어댑터 + 인증 시스템
// ══════════════════════════════════════════════════════════════════
const SB_URL = 'https://rsgbqlrxtexknhsvkroc.supabase.co';
const SB_KEY = 'sb_publishable_Es6Y1pOe1friYzEnvT0iSw_gqQQvFvJ';

const sbHeaders = {
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates'
};

// ── 현재 로그인 세션 ──
window.currentUser = null; // { id, username, display_name, role, token }

// ── kv_store 어댑터 ──
window.storage = {
  async get(key, shared = false) {
    if (!shared) {
      const val = localStorage.getItem('sb_local_' + key);
      return val !== null ? { key, value: val } : null;
    }
    const res = await fetch(`${SB_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}&limit=1`, { headers: sbHeaders });
    if (!res.ok) throw new Error(`storage.get failed: ${res.status}`);
    const rows = await res.json();
    return rows.length ? { key, value: rows[0].value } : null;
  },
  async set(key, value, shared = false) {
    if (!shared) { localStorage.setItem('sb_local_' + key, value); return { key, value }; }
    const res = await fetch(`${SB_URL}/rest/v1/kv_store`, {
      method: 'POST', headers: sbHeaders,
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() })
    });
    if (!res.ok) throw new Error(`storage.set failed: ${res.status}`);
    return { key, value };
  },
  async delete(key, shared = false) {
    if (!shared) { localStorage.removeItem('sb_local_' + key); return { key, deleted: true }; }
    const res = await fetch(`${SB_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}`, { method: 'DELETE', headers: sbHeaders });
    if (!res.ok) throw new Error(`storage.delete failed: ${res.status}`);
    return { key, deleted: true };
  },
  async list(prefix = '', shared = false) {
    if (!shared) {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('sb_local_' + prefix)).map(k => k.replace('sb_local_', ''));
      return { keys };
    }
    const filter = prefix ? `?key=like.${encodeURIComponent(prefix + '%')}&select=key` : '?select=key';
    const res = await fetch(`${SB_URL}/rest/v1/kv_store${filter}`, { headers: sbHeaders });
    const rows = await res.json();
    return { keys: rows.map(r => r.key) };
  }
};

// ── 인증 함수 ──
async function sbQuery(table, params = '') {
  const res = await fetch(`${SB_URL}/rest/v1/${table}${params}`, { headers: sbHeaders });
  if (!res.ok) {
    const body = await res.text().catch(()=>'');
    throw new Error(`Query failed (${res.status}) on table '${table}': ${body.slice(0,100)}`);
  }
  return res.json();
}
async function sbInsert(table, data) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...sbHeaders, 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  if (!res.ok) { const e = await res.text(); throw new Error(`Insert failed (${res.status}): ${e}`); }
  const result = await res.json();
  return result; // array of inserted rows
}
async function sbDelete2(table, filter) {
  await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, { method: 'DELETE', headers: sbHeaders });
}

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function login(username, password) {
  const hash = await hashPassword(password);
  const rows = await sbQuery('users', `?username=eq.${encodeURIComponent(username)}&is_active=eq.true&limit=1`);
  if (!rows.length) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다');
  const user = rows[0];
  // 비밀번호 확인
  if (user.password_hash !== hash) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다');
  // 세션 생성 — INSERT 후 token을 직접 읽어옴
  const inserted = await sbInsert('sessions', { user_id: user.id });
  const token = Array.isArray(inserted) ? inserted[0]?.token : inserted?.token;
  if (!token) throw new Error('세션 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
  window.currentUser = { id: user.id, username: user.username, display_name: user.display_name, role: user.role, token };
  localStorage.setItem('auth_token', token);
  try { await writeLog('login', '로그인'); } catch(e) { /* 로그 실패해도 로그인은 진행 */ }
  return user;
}

async function logout() {
  if (window.currentUser?.token) {
    await writeLog('logout', '로그아웃');
    await sbDelete2('sessions', `token=eq.${encodeURIComponent(window.currentUser.token)}`);
  }
  localStorage.removeItem('auth_token');
  window.currentUser = null;
  showLoginScreen();
}

async function restoreSession() {
  const token = localStorage.getItem('auth_token');
  if (!token) return false;
  try {
    // Step 1: get session
    const sessions = await sbQuery('sessions', `?token=eq.${encodeURIComponent(token)}&limit=1`);
    if (!sessions.length) { localStorage.removeItem('auth_token'); return false; }
    const session = sessions[0];
    // Check expiry
    if (new Date(session.expires_at) < new Date()) { localStorage.removeItem('auth_token'); return false; }
    // Step 2: get user
    const users = await sbQuery('users', `?id=eq.${encodeURIComponent(session.user_id)}&is_active=eq.true&limit=1`);
    if (!users.length) { localStorage.removeItem('auth_token'); return false; }
    const user = users[0];
    window.currentUser = { id: user.id, username: user.username, display_name: user.display_name, role: user.role, token };
    return true;
  } catch(e) {
    console.error('세션 복원 오류:', e);
    localStorage.removeItem('auth_token');
    return false;
  }
}

async function writeLog(action, detail = '') {
  if (!window.currentUser) return;
  try {
    await sbInsert('activity_log', {
      user_id: window.currentUser.id,
      username: window.currentUser.username,
      display_name: window.currentUser.display_name,
      action, detail
    });
  } catch(e) { console.warn('로그 기록 실패:', e); }
}

// ── 로그인 화면 표시/숨기기 ──
function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}
function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  applyUserUI();
}

function applyUserUI() {
  if (!window.currentUser) return;
  // 담당자 이름 자동 세팅
  const nameEl = document.getElementById('staff-name');
  if (nameEl && !nameEl.value) nameEl.value = window.currentUser.display_name;
  // 관리자 탭 표시/숨김
  const adminTab = document.getElementById('admin-tab-btn');
  if (adminTab) {
    adminTab.style.display = window.currentUser.role === 'admin' ? 'inline-block' : 'none';
  }
  // 상단 사용자 배지
  const userBadge = document.getElementById('user-badge');
  if (userBadge) userBadge.textContent = `${window.currentUser.display_name} (${window.currentUser.role === 'admin' ? '관리자' : '직원'})`;
}
</script>
<script>
(function(){
  const DEFAULT_DICT = [
    { id: cryptoId(), name: '투맛토(스테비아) 500g', aliases: ['투맛토 스테비아','스테비아토마토','스테비아 토마토'] },
    { id: cryptoId(), name: '투맛토(망고향) 500g', aliases: ['망고토마토','투맛토 망고','망고향 토마토','망고 토마토'] },
    { id: cryptoId(), name: '투맛토(자몽향) 500g', aliases: ['자몽토마토','투맛토 자몽','자몽향 토마토','자몽 토마토'] },
    { id: cryptoId(), name: '투맛토(스테비아) 150g', aliases: ['투맛토 스테비아 150','스테비아 150'] },
    { id: cryptoId(), name: '투맛토(망고향) 150g', aliases: ['망고토마토 150','망고 150'] },
    { id: cryptoId(), name: '투맛토(자몽향) 150g', aliases: ['자몽토마토 150','자몽 150'] },
    { id: cryptoId(), name: '포도쉐킷(망고향)', aliases: ['포도쉐킷 망고'] },
    { id: cryptoId(), name: '포도쉐킷(애플향)', aliases: ['포도쉐킷 애플'] },
    { id: cryptoId(), name: '투래곤후르츠', aliases: ['드래곤후르츠','트래곤후르츠'] },
  ];

  const SIMPLE_FIELDS = [
    { key: 'item', label: '품목 열' },
    { key: 'qty', label: '수량 열' },
  ];
  const THIRDPARTY_FIELDS = [
    { key: 'orderNo', label: '업체 주문번호 열 (고객주문번호, 선택)', optional: true },
    { key: 'recipientName', label: '받는사람 성명 열', optional: true },
    { key: 'recipientPhone', label: '받는사람 전화번호 열', optional: true },
    { key: 'address', label: '배송지 주소 열', optional: true },
    { key: 'item', label: '품목명 열' },
    { key: 'qty', label: '수량(팩) 열' },
    { key: 'note', label: '배송시 요청사항 열', optional: true },
  ];
  const BOX_CAPACITY = 8; // max units in one box; above this splits into additional boxes

  function getBoxSize(qty){
    if(qty <= 0) return null;
    if(qty <= 4) return '극소';
    if(qty <= 8) return '소';
    return '대'; // should not appear after splitting
  }

  // Build a map of trackingNo → { totalQty, size } across all rows in a list.
  // Same tracking number can appear on multiple rows (one per SKU) — we sum the quantities
  // to get the actual total being delivered in that one shipment, then classify the size.
  function buildTrackingTotalMap(rows){
    const totalByTracking = {}; // trackingNo -> totalQty
    rows.filter(r=> r.trackingNo && r.trackingNo.trim()).forEach(r=>{
      totalByTracking[r.trackingNo] = (totalByTracking[r.trackingNo] || 0) + r.qty;
    });
    const result = {}; // trackingNo -> { totalQty, size }
    Object.entries(totalByTracking).forEach(([trackingNo, totalQty])=>{
      result[trackingNo] = { totalQty, size: getBoxSize(totalQty) || '소' };
    });
    return result;
  }

  // Build a per-company trackingSet using total qty per tracking number (not individual row qty)
  function buildTrackingSetByCompany(rows){
    // First, compute total qty per tracking number across ALL companies
    const trackingTotalMap = buildTrackingTotalMap(rows);
    const trackingSet = {}; // companyName -> Map(trackingNo -> { qty:totalQty, size })
    rows.filter(r=> r.trackingNo && r.trackingNo.trim()).forEach(r=>{
      if(!trackingSet[r.company]) trackingSet[r.company] = new Map();
      if(!trackingSet[r.company].has(r.trackingNo)){
        const info = trackingTotalMap[r.trackingNo];
        trackingSet[r.company].set(r.trackingNo, { qty: info.totalQty, size: info.size });
      }
    });
    return trackingSet;
  }

  function splitIntoBoxes(qty){
    // Each resulting box must be ≤ 8 units (소 or 극소 size).
    // Boxes of qty ≥ 9 must be split; each split piece is ≤ 8.
    // We fill each box to exactly 8 (소), leaving the remainder as a separate box.
    if(qty <= BOX_CAPACITY) return [qty];
    const boxes = [];
    let remaining = qty;
    while(remaining > 0){
      const take = Math.min(BOX_CAPACITY, remaining);
      boxes.push(take);
      remaining -= take;
    }
    return boxes;
  }

  function cryptoId(){ return 'i' + Math.random().toString(36).slice(2,10); }

  let dict = [];
  let ordersByDate = {};        // { 'YYYY-MM-DD': { 업체명: { itemId: qty } } }
  let thirdPartyLineItems = {}; // { 'YYYY-MM-DD': [ { id, company, orderNo, recipientName, recipientPhone, address, itemNameRaw, itemId, qty, note, trackingNo } ] }
  let companies = [];           // [{ name, isThirdParty, uploadMapping, code, category, region, listedMarketName, priceMap: { itemId: unitPrice } }]
  // category: 편의점|도매|직거래|SP|3PL(제이엠로지스)|3PL(비티원)|개인구매|샘플|기타
  // region: 수도권/지방/지역명 (도매일 경우 가락/구리/강서 등)
  // listedMarketName: 도매 상장청과명 (예: (상장)중앙청과)
  let rawMaterials = [];        // [{ id, name, kgPerUnit }] - 원물(원재료) 목록. kgPerUnit: 팩 1개당 원물 소요 kg
  let previousStock = {};       // { 'YYYY-MM-DD': { raw: { materialId: qty }, product: { itemId: qty } } } - 전일 재고
  let rawMaterialUsage = {};    // { 'YYYY-MM-DD': { materialId: kg } } - 당일 원물사용량(kg) 직접 입력값
  const DEFAULT_CATEGORIES = ['편의점','도매','직거래','SP','3PL(제이엠로지스)','3PL(비티원)','개인구매','샘플','기타'];
  let companyCategories = [...DEFAULT_CATEGORIES]; // user-editable list
  let deliveryFeeItems = []; // [{ id, size, name, code, price }] size: '극소'|'소'
  let internalOrderCounters = {}; // { 'YYYY-MM-DD': lastUsedSeq } - 사내관리번호(YYYYMMDD-001..) 발번 카운터
  let uploadedOriginalFiles = {}; // { 'YYYY-MM-DD': { 업체명: { aoa: [...raw rows...], startRow } } } - 업체 원본파일 보관(운송장 반영 회신용)
  let productionTemplateB64 = ''; // base64-encoded production template xlsx (user-replaceable)
  let skuColumnMap = {};           // { itemId: colLetter } - SKU -> column in production template
  let currentParsed = null;
  let currentDateKey = '';
  let uploadedSheetData = null;
  let uploadedTrackingData = null;

  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 1800);
  }

  // window.confirm()/alert() are blocked (silently no-op) inside this sandboxed artifact frame,
  // so delete actions use a "click again to confirm" pattern on the button itself instead.
  // optional `guard` runs before arming (e.g. "is anything selected?"); return false from it to abort silently.
  function armConfirmButton(btn, onConfirm, guard){
    const originalText = btn.textContent;
    let armed = false;
    let timer = null;
    btn.addEventListener('click', ()=>{
      if(guard && !guard()) return;
      if(!armed){
        armed = true;
        btn.textContent = '한번 더 누르면 삭제';
        btn.style.opacity = '1';
        timer = setTimeout(()=>{ armed = false; btn.textContent = originalText; }, 3000);
      } else {
        clearTimeout(timer);
        armed = false;
        btn.textContent = originalText;
        onConfirm();
      }
    });
  }

  function pad2(n){ return String(n).padStart(2,'0'); }
  function getTodayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  }
  function getDeliveryDateLabel(){
    const year = document.getElementById('delivery-year').value;
    const month = document.getElementById('delivery-month').value;
    const day = document.getElementById('delivery-day').value;
    if(year && month && day) return `${year}-${pad2(month)}-${pad2(day)}`;
    return '';
  }
  function computeCurrentDateKey(){
    return getDeliveryDateLabel() || getTodayKey();
  }
  function currentOrders(){
    if(!ordersByDate[currentDateKey]) ordersByDate[currentDateKey] = {};
    return ordersByDate[currentDateKey];
  }
  function currentLineItems(){
    if(!thirdPartyLineItems[currentDateKey]) thirdPartyLineItems[currentDateKey] = [];
    return thirdPartyLineItems[currentDateKey];
  }
  function currentPreviousStock(){
    if(!previousStock[currentDateKey]) previousStock[currentDateKey] = { raw: {}, product: {} };
    if(!previousStock[currentDateKey].raw) previousStock[currentDateKey].raw = {};
    if(!previousStock[currentDateKey].product) previousStock[currentDateKey].product = {};
    return previousStock[currentDateKey];
  }
  function currentRawMaterialUsage(){
    if(!rawMaterialUsage[currentDateKey]) rawMaterialUsage[currentDateKey] = {};
    return rawMaterialUsage[currentDateKey];
  }
  function currentOriginalFiles(){
    if(!uploadedOriginalFiles[currentDateKey]) uploadedOriginalFiles[currentDateKey] = {};
    return uploadedOriginalFiles[currentDateKey];
  }

  async function loadState(){
    try{
      const d = await window.storage.get('dictionary', true);
      dict = d ? JSON.parse(d.value) : DEFAULT_DICT;
    }catch(e){ dict = DEFAULT_DICT; }

    try{
      const c = await window.storage.get('companies', true);
      const parsed = c ? JSON.parse(c.value) : [];
      companies = parsed.map(item => typeof item === 'string' ? { name: item, isThirdParty: false } : item);
    }catch(e){ companies = []; }

    try{
      const staff = await window.storage.get('staff-name');
      if(staff) document.getElementById('staff-name').value = staff.value || '';
      const staffDept = await window.storage.get('staff-dept');
      if(staffDept) document.getElementById('staff-dept').value = staffDept.value || '';
    }catch(e){ /* no saved staff name yet */ }

    try{
      const dd = await window.storage.get('delivery-date', true);
      if(dd){
        const { year, month, day } = JSON.parse(dd.value);
        document.getElementById('delivery-year').value = year || '';
        document.getElementById('delivery-month').value = month || '';
        document.getElementById('delivery-day').value = day || '';
      }
    }catch(e){ /* no saved date yet */ }
    currentDateKey = computeCurrentDateKey();

    try{
      const o = await window.storage.get('orders-by-date', true);
      if(o){
        ordersByDate = JSON.parse(o.value);
      } else {
        // migrate legacy single-day flat format if present (from earlier personal-storage testing)
        const legacy = await window.storage.get('orders').catch(()=>null);
        if(legacy){
          const parsedLegacy = JSON.parse(legacy.value);
          const keys = Object.keys(parsedLegacy);
          const looksFlat = keys.length > 0 && typeof Object.values(parsedLegacy[keys[0]] || {})[0] !== 'object';
          ordersByDate = looksFlat ? { [currentDateKey]: parsedLegacy } : parsedLegacy;
        } else {
          ordersByDate = {};
        }
      }
    }catch(e){ ordersByDate = {}; }

    try{
      const li = await window.storage.get('thirdparty-lineitems', true);
      thirdPartyLineItems = li ? JSON.parse(li.value) : {};
    }catch(e){ thirdPartyLineItems = {}; }

    try{
      const rm = await window.storage.get('raw-materials', true);
      rawMaterials = rm ? JSON.parse(rm.value) : [];
    }catch(e){ rawMaterials = []; }

    try{
      const ps = await window.storage.get('previous-stock', true);
      previousStock = ps ? JSON.parse(ps.value) : {};
    }catch(e){ previousStock = {}; }

    try{
      const rmu = await window.storage.get('raw-material-usage', true);
      rawMaterialUsage = rmu ? JSON.parse(rmu.value) : {};
    }catch(e){ rawMaterialUsage = {}; }

    try{
      const cc = await window.storage.get('company-categories', true);
      companyCategories = cc ? JSON.parse(cc.value) : [...DEFAULT_CATEGORIES];
    }catch(e){ companyCategories = [...DEFAULT_CATEGORIES]; }

    try{
      const rt = await window.storage.get('retention-months', true);
      document.getElementById('retention-months').value = rt ? (JSON.parse(rt.value) || 3) : 3;
    }catch(e){ document.getElementById('retention-months').value = 3; }

    try{
      const ioc = await window.storage.get('internal-order-counters', true);
      internalOrderCounters = ioc ? JSON.parse(ioc.value) : {};
    }catch(e){ internalOrderCounters = {}; }

    try{
      const uof = await window.storage.get('uploaded-original-files', true);
      uploadedOriginalFiles = uof ? JSON.parse(uof.value) : {};
    }catch(e){ uploadedOriginalFiles = {}; }

    try{
      const si = await window.storage.get('sender-info', true);
      if(si){
        const { name, phone } = JSON.parse(si.value);
        if(name) document.getElementById('sender-name').value = name;
        if(phone) document.getElementById('sender-phone').value = phone;
      }
    }catch(e){ /* keep the pre-filled defaults */ }

    try{
      const pt = await window.storage.get('production-template-b64', true);
      productionTemplateB64 = pt ? pt.value : '';
    }catch(e){ productionTemplateB64 = ''; }

    try{
      const scm = await window.storage.get('sku-column-map', true);
      skuColumnMap = scm ? JSON.parse(scm.value) : {};
    }catch(e){ skuColumnMap = {}; }

    cleanupOldData(true); // silent auto-cleanup of anything past the retention window

    try{
      const ec = await window.storage.get('ecount-settings', true);
      if(ec){
        const { warehouse, tradeType } = JSON.parse(ec.value);
        if(warehouse) document.getElementById('ecount-warehouse').value = warehouse;
        if(tradeType) document.getElementById('ecount-trade-type').value = tradeType;
      }
    }catch(e){ /* keep defaults */ }

    try{
      const ep = await window.storage.get('ecount-personal');
      if(ep){
        const { manager, department } = JSON.parse(ep.value);
        if(manager) document.getElementById('ecount-manager').value = manager;
        if(department) document.getElementById('ecount-department').value = department;
      }
    }catch(e){ /* keep defaults */ }

    try{
      const dfi = await window.storage.get('delivery-fee-items', true);
      deliveryFeeItems = dfi ? JSON.parse(dfi.value) : [];
    }catch(e){ deliveryFeeItems = []; }
    // Ensure defaults exist (극소, 소)
    if(!deliveryFeeItems.find(d=>d.size==='극소'))
      deliveryFeeItems.push({ id: cryptoId(), size:'극소', name:'택배비(극소)', code:'', price:'' });
    if(!deliveryFeeItems.find(d=>d.size==='소'))
      deliveryFeeItems.push({ id: cryptoId(), size:'소', name:'택배비(소)', code:'', price:'' });

    renderDict();
    renderCategoryEditor();
    renderCompanyManager();
    renderSkuColumnMapEditor();
    renderPriceMapEditor();
    renderDeliveryFeeEditor();
    renderAggTable();
    renderThirdPartyAggTable();
    renderThirdPartyLineItems();
    renderSavedDatesBar();
    updateCurrentDateBadge();
    renderRawStockEditor();
    renderProductStockEditor();
    renderOriginalFileSelect();
    applyUserUI(); // 관리자 탭 등 로그인 사용자 UI 반영
  }

  function getStaffName(){
    return (document.getElementById('staff-name').value || '').trim();
  }
  function getStaffDept(){
    return (document.getElementById('staff-dept').value || '').trim();
  }
  async function saveStaffName(){
    try{
      await window.storage.set('staff-name', getStaffName());
      await window.storage.set('staff-dept', getStaffDept());
    }catch(e){ console.error(e); }
  }

  async function saveDeliveryDate(){
    const year = document.getElementById('delivery-year').value;
    const month = document.getElementById('delivery-month').value;
    const day = document.getElementById('delivery-day').value;
    try{ await window.storage.set('delivery-date', JSON.stringify({ year, month, day }), true); }catch(e){ console.error(e); }
  }
  async function saveDict(){
    try{ await window.storage.set('dictionary', JSON.stringify(dict), true); }catch(e){ console.error(e); }
  }
  async function saveOrdersByDate(){
    try{ await window.storage.set('orders-by-date', JSON.stringify(ordersByDate), true); }catch(e){ console.error(e); }
  }
  async function saveCompanies(){
    try{ await window.storage.set('companies', JSON.stringify(companies), true); }catch(e){ console.error(e); }
  }
  async function saveLineItems(){
    try{ await window.storage.set('thirdparty-lineitems', JSON.stringify(thirdPartyLineItems), true); }catch(e){ console.error(e); }
  }
  async function saveRawMaterials(){
    try{ await window.storage.set('raw-materials', JSON.stringify(rawMaterials), true); }catch(e){ console.error(e); }
  }
  async function savePreviousStock(){
    try{ await window.storage.set('previous-stock', JSON.stringify(previousStock), true); }catch(e){ console.error(e); }
  }
  async function saveRawMaterialUsage(){
    try{ await window.storage.set('raw-material-usage', JSON.stringify(rawMaterialUsage), true); }catch(e){ console.error(e); }
  }
  async function saveCompanyCategories(){
    try{ await window.storage.set('company-categories', JSON.stringify(companyCategories), true); }catch(e){ console.error(e); }
  }
  async function saveEcountSettings(){
    // Shared fields (same for all staff)
    const warehouse = document.getElementById('ecount-warehouse').value.trim();
    const tradeType = document.getElementById('ecount-trade-type').value.trim();
    try{ await window.storage.set('ecount-settings', JSON.stringify({ warehouse, tradeType }), true); }catch(e){ console.error(e); }
    // Personal fields (each staff saves their own)
    const manager = document.getElementById('ecount-manager').value.trim();
    const department = document.getElementById('ecount-department').value.trim();
    try{ await window.storage.set('ecount-personal', JSON.stringify({ manager, department })); }catch(e){ console.error(e); }
  }
  async function saveDeliveryFeeItems(){
    try{ await window.storage.set('delivery-fee-items', JSON.stringify(deliveryFeeItems), true); }catch(e){ console.error(e); }
  }
  async function saveRetentionMonths(){
    const months = parseInt(document.getElementById('retention-months').value, 10) || 3;
    try{ await window.storage.set('retention-months', JSON.stringify(months), true); }catch(e){ console.error(e); }
  }
  async function saveInternalOrderCounters(){
    try{ await window.storage.set('internal-order-counters', JSON.stringify(internalOrderCounters), true); }catch(e){ console.error(e); }
  }
  async function saveOriginalFiles(){
    try{ await window.storage.set('uploaded-original-files', JSON.stringify(uploadedOriginalFiles), true); }catch(e){ console.error(e); }
  }
  async function saveSenderInfo(){
    const name = document.getElementById('sender-name').value.trim();
    const phone = document.getElementById('sender-phone').value.trim();
    try{ await window.storage.set('sender-info', JSON.stringify({ name, phone }), true); }catch(e){ console.error(e); }
  }
  async function saveProductionTemplate(){
    try{ await window.storage.set('production-template-b64', productionTemplateB64, true); }catch(e){ console.error(e); }
  }
  async function saveSkuColumnMap(){
    try{ await window.storage.set('sku-column-map', JSON.stringify(skuColumnMap), true); }catch(e){ console.error(e); }
  }

  // 사내관리번호: YYYYMMDD-001, 002... 납품일(currentDateKey) 기준으로 그날 안에서 계속 이어서 발번됨.
  // 같은 원본 주문 한 줄이 박스로 쪼개져도(예: 10개->8+2) 같은 번호를 공유해야 하므로,
  // 박스 분리 전, 업로드 파일의 원래 한 줄당 한 번만 호출해서 써야 함.
  function getNextInternalOrderNo(){
    const datePrefix = currentDateKey.replace(/-/g, '');
    const nextSeq = (internalOrderCounters[currentDateKey] || 0) + 1;
    internalOrderCounters[currentDateKey] = nextSeq;
    return `${datePrefix}-${String(nextSeq).padStart(3, '0')}`;
  }

  function getRetentionCutoffKey(){
    const months = parseInt(document.getElementById('retention-months').value, 10) || 3;
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  }

  // Removes any date-keyed data older than the retention window. `auto` runs silently
  // unless something was actually removed; a manual run always reports the result.
  function cleanupOldData(auto){
    const cutoff = getRetentionCutoffKey();
    const allDateKeys = new Set([
      ...Object.keys(ordersByDate),
      ...Object.keys(thirdPartyLineItems),
      ...Object.keys(previousStock),
      ...Object.keys(internalOrderCounters),
      ...Object.keys(uploadedOriginalFiles),
      ...Object.keys(rawMaterialUsage)
    ]);
    const toRemove = Array.from(allDateKeys).filter(k => k < cutoff && k !== currentDateKey);

    if(toRemove.length === 0){
      if(!auto) toast('보관 기간이 지난 데이터가 없습니다');
      return;
    }

    toRemove.forEach(k=>{
      delete ordersByDate[k];
      delete thirdPartyLineItems[k];
      delete previousStock[k];
      delete internalOrderCounters[k];
      delete uploadedOriginalFiles[k];
      delete rawMaterialUsage[k];
    });
    saveOrdersByDate();
    saveLineItems();
    savePreviousStock();
    saveInternalOrderCounters();
    saveOriginalFiles();
    saveRawMaterialUsage();
    renderSavedDatesBar();

    const msg = `${cutoff} 이전 날짜 ${toRemove.length}일치 데이터를 정리했습니다`;
    toast(msg);
  }

  function addCompanyIfNew(name){
    if(name && !companies.some(c=>c.name===name)){
      companies.push({ name, isThirdParty: false, code: '', category: '', region: '', listedMarketName: '' });
      saveCompanies();
      renderCompanyManager();
    }
  }

  function updateCurrentDateBadge(){
    document.getElementById('current-date-badge').textContent = currentDateKey ? `납품일: ${currentDateKey}` : '';
  }

  function onDateChanged(){
    saveDeliveryDate();
    currentDateKey = computeCurrentDateKey();
    renderAggTable();
    renderThirdPartyAggTable();
    renderThirdPartyLineItems();
    renderSavedDatesBar();
    updateCurrentDateBadge();
    renderRawStockEditor();
    renderProductStockEditor();
    renderOriginalFileSelect();
  }

  function renderSavedDatesBar(){
    const wrap = document.getElementById('saved-dates-wrap');
    const keys = new Set([...Object.keys(ordersByDate), ...Object.keys(thirdPartyLineItems), ...Object.keys(previousStock)]);
    keys.add(currentDateKey);
    const sorted = Array.from(keys).sort();
    wrap.innerHTML = '';
    if(sorted.length === 0) return;
    const label = document.createElement('span');
    label.style.fontSize = '12px';
    label.style.color = 'var(--muted)';
    label.textContent = '저장된 날짜:';
    wrap.appendChild(label);
    sorted.forEach(k=>{
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'date-chip' + (k === currentDateKey ? ' active' : '');
      chip.textContent = k;
      chip.addEventListener('click', ()=> switchToDateKey(k));
      wrap.appendChild(chip);
    });
  }

  function switchToDateKey(dateKey){
    const [y,m,d] = dateKey.split('-');
    document.getElementById('delivery-year').value = y;
    document.getElementById('delivery-month').value = parseInt(m,10);
    document.getElementById('delivery-day').value = parseInt(d,10);
    onDateChanged();
    toast(dateKey + ' 날짜로 전환했습니다');
  }

  function normalize(s){
    return (s||'').replace(/\s+/g,'').toLowerCase();
  }

  function matchItem(text){
    const norm = normalize(text);
    if(!norm) return null;
    const exact = dict.filter(item=>{
      return normalize(item.name) === norm || item.aliases.some(a => normalize(a) === norm);
    });
    if(exact.length === 1) return exact[0].id;
    if(exact.length > 1) return null;
    const partial = dict.filter(item=>{
      const cands = [item.name, ...item.aliases].map(normalize).filter(Boolean);
      return cands.some(c => c.includes(norm) || norm.includes(c));
    });
    if(partial.length === 1) return partial[0].id;
    return null;
  }

  const NUM_REGEX = /(\d+(?:\.\d+)?)/;
  const UNIT_REGEX = /^\s*(박스|개|팩|kg|Kg|KG|g|G|box|BOX)/;
  const NOISE = /(주문합니다|부탁드립니다|부탁드려요|해주세요|주세요|발주요청|발주\s*요청|요청드립니다|합니다요|드립니다|입니다|합니다)/g;
  const SUMMARY_LINE_REGEX = /^(총|합계|계)\s*[:\-]?\s*\d/;
  const QTY_WITH_UNIT_REGEX = /\d+(?:\.\d+)?\s*(박스|개|팩|kg|Kg|KG|g|G|box|BOX)/;

  function parseMessage(text){
    const lines = text.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
    if(lines.length===0) return null;

    let company = lines[0];
    let itemLines = lines.slice(1);
    if(lines.length === 1 || QTY_WITH_UNIT_REGEX.test(company)){
      company = '';
      itemLines = lines;
    }

    itemLines = itemLines.filter(line => !SUMMARY_LINE_REGEX.test(line));

    const items = itemLines.map(line=>{
      const m = line.match(NUM_REGEX);
      let qty = null, unit = '박스', itemText = line;
      if(m){
        qty = parseFloat(m[0]);
        const idx = m.index, end = idx + m[0].length;
        const after = line.slice(end);
        const unitMatch = after.match(UNIT_REGEX);
        let consumedEnd = end;
        if(unitMatch){
          const raw = unitMatch[1].toLowerCase();
          unit = raw.startsWith('box') ? '박스' : (raw === 'kg' ? 'kg' : (raw === 'g' ? 'g' : unitMatch[1]));
          consumedEnd = end + unitMatch[0].length;
        }
        itemText = (line.slice(0, idx) + line.slice(consumedEnd)).trim();
      }
      itemText = itemText.replace(NOISE, '').replace(/^[-*·.\d\)]+\s*/, '').trim();
      const matchedId = itemText ? matchItem(itemText) : null;
      return { raw: line, itemText, qty, unit, matchedId };
    }).filter(p => p.itemText.length > 0);

    return { company, items };
  }

  function populateCompanySelect(selectedName){
    const sel = document.getElementById('company-select');
    sel.innerHTML = '';
    const blank = document.createElement('option');
    blank.value = ''; blank.textContent = '(선택하세요)';
    sel.appendChild(blank);
    companies.forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c.name; opt.textContent = c.name + (c.isThirdParty ? ' [3PL]' : '');
      if(c.name === selectedName) opt.selected = true;
      sel.appendChild(opt);
    });
    if(selectedName && !companies.some(c=>c.name===selectedName)){
      const opt = document.createElement('option');
      opt.value = selectedName; opt.textContent = selectedName + ' (신규)';
      opt.selected = true;
      sel.appendChild(opt);
    }
  }

  function renderParsed(parsed){
    currentParsed = parsed;
    document.getElementById('preview-card').style.display = 'block';
    document.getElementById('new-company-row').style.display = 'none';
    populateCompanySelect(parsed.company || '');
    const wrap = document.getElementById('parsed-items');
    wrap.innerHTML = '';
    if(parsed.items.length === 0){
      wrap.innerHTML = '<div class="empty">인식된 품목이 없습니다. 메시지 형식을 확인해주세요.</div>';
      return;
    }
    parsed.items.forEach((it, idx)=>{
      const row = document.createElement('div');
      row.className = 'parsed-row';
      const matched = it.matchedId ? 'ok' : 'warn';
      const label = it.matchedId ? '매칭됨' : '미매칭';

      const select = document.createElement('select');
      select.dataset.idx = idx;
      const noneOpt = document.createElement('option');
      noneOpt.value = ''; noneOpt.textContent = '(선택 안 함)';
      select.appendChild(noneOpt);
      dict.forEach(d=>{
        const opt = document.createElement('option');
        opt.value = d.id; opt.textContent = d.name;
        if(d.id === it.matchedId) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', (e)=>{
        currentParsed.items[idx].matchedId = e.target.value || null;
        renderParsed(currentParsed);
      });

      const qtyInput = document.createElement('input');
      qtyInput.type = 'number';
      qtyInput.value = it.qty ?? '';
      qtyInput.style.width = '70px';
      qtyInput.addEventListener('input', (e)=>{
        currentParsed.items[idx].qty = e.target.value === '' ? null : parseFloat(e.target.value);
      });

      const unitSpan = document.createElement('span');
      unitSpan.textContent = it.unit || '';
      unitSpan.style.fontSize = '12px';
      unitSpan.style.color = 'var(--muted)';

      const tag = document.createElement('span');
      tag.className = 'tag ' + matched;
      tag.textContent = label;

      const rawLine = document.createElement('div');
      rawLine.className = 'raw-line';
      rawLine.textContent = '원문: ' + it.raw;

      row.appendChild(tag);
      row.appendChild(select);
      row.appendChild(qtyInput);
      row.appendChild(unitSpan);
      row.appendChild(rawLine);
      wrap.appendChild(row);
    });
  }

  function renderDict(){
    const wrap = document.getElementById('dict-editor');
    wrap.innerHTML = '';
    dict.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'dict-row';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = item.name;
      nameInput.style.maxWidth = '200px';
      nameInput.addEventListener('change', (e)=>{
        item.name = e.target.value;
        saveDict(); renderAggTable(); renderThirdPartyAggTable();
      });

      const aliasInput = document.createElement('input');
      aliasInput.type = 'text';
      aliasInput.placeholder = '별칭 (쉼표로 구분)';
      aliasInput.value = item.aliases.join(', ');
      aliasInput.addEventListener('change', (e)=>{
        item.aliases = e.target.value.split(',').map(s=>s.trim()).filter(Boolean);
        saveDict();
      });

      const codeInput = document.createElement('input');
      codeInput.type = 'text';
      codeInput.placeholder = '코드';
      codeInput.style.maxWidth = '90px';
      codeInput.value = item.code || '';
      codeInput.addEventListener('change', (e)=>{
        item.code = e.target.value.trim();
        saveDict();
      });

      const boxUnitLabel = document.createElement('label');
      boxUnitLabel.style.fontSize = '11.5px';
      boxUnitLabel.style.color = 'var(--muted)';
      boxUnitLabel.style.whiteSpace = 'nowrap';
      boxUnitLabel.textContent = '박스입수:';
      const boxUnitInput = document.createElement('input');
      boxUnitInput.type = 'number';
      boxUnitInput.min = '1';
      boxUnitInput.placeholder = '개/박스';
      boxUnitInput.style.maxWidth = '80px';
      boxUnitInput.value = item.boxUnitCount || '';
      boxUnitInput.addEventListener('change', (e)=>{
        item.boxUnitCount = e.target.value === '' ? '' : (parseFloat(e.target.value) || '');
        saveDict(); renderProductStockEditor(); renderAggTable();
      });

      const shortNameInput = document.createElement('input');
      shortNameInput.type = 'text';
      shortNameInput.placeholder = '상품명(약자)';
      shortNameInput.style.maxWidth = '110px';
      shortNameInput.title = '택배사 발주서의 "상품명(약자)" 열에 쓰일 짧은 이름 (비워두면 품목명 그대로 사용)';
      shortNameInput.value = item.shortName || '';
      shortNameInput.addEventListener('change', (e)=>{
        item.shortName = e.target.value.trim();
        saveDict();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      armConfirmButton(delBtn, ()=>{
        dict = dict.filter(d=>d.id !== item.id);
        Object.keys(ordersByDate).forEach(dateKey=>{
          Object.keys(ordersByDate[dateKey]).forEach(c=>{ delete ordersByDate[dateKey][c][item.id]; });
        });
        Object.keys(thirdPartyLineItems).forEach(dateKey=>{
          thirdPartyLineItems[dateKey].forEach(r=>{ if(r.itemId === item.id) r.itemId = null; });
        });
        Object.keys(previousStock).forEach(dateKey=>{
          if(previousStock[dateKey].product) delete previousStock[dateKey].product[item.id];
        });
        saveDict(); saveOrdersByDate(); saveLineItems(); savePreviousStock();
        renderDict(); renderAggTable(); renderThirdPartyAggTable(); renderThirdPartyLineItems(); renderProductStockEditor();
      });

      row.appendChild(nameInput);
      row.appendChild(aliasInput);
      row.appendChild(codeInput);
      row.appendChild(boxUnitLabel);
      row.appendChild(boxUnitInput);
      row.appendChild(shortNameInput);
      row.appendChild(delBtn);
      wrap.appendChild(row);
    });
  }

  function renderCategoryEditor(){
    const wrap = document.getElementById('category-editor');
    if(!wrap) return;
    wrap.innerHTML = '';
    companyCategories.forEach((cat, idx)=>{
      const row = document.createElement('div');
      row.className = 'dict-row';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = cat;
      nameInput.style.maxWidth = '180px';
      nameInput.addEventListener('change', (e)=>{
        const newVal = e.target.value.trim();
        if(!newVal){ nameInput.value = cat; return; }
        const oldVal = cat;
        companyCategories[idx] = newVal;
        // update any company already using this category
        companies.forEach(c=>{ if(c.category === oldVal) c.category = newVal; });
        saveCompanyCategories(); saveCompanies();
        renderCategoryEditor(); renderCompanyManager(); renderPriceMapEditor();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      armConfirmButton(delBtn, ()=>{
        companyCategories.splice(idx, 1);
        saveCompanyCategories();
        renderCategoryEditor(); renderCompanyManager(); renderPriceMapEditor();
        toast(`"${cat}" 구분을 삭제했습니다. 이 구분을 쓰던 업체는 "(구분선택)" 상태로 표시됩니다.`);
      });

      row.appendChild(nameInput);
      row.appendChild(delBtn);
      wrap.appendChild(row);
    });
  }

  function renderCompanyManager(){
    const wrap = document.getElementById('company-editor');
    wrap.innerHTML = '';
    populateUploadCompanySelect();
    if(companies.length === 0){
      wrap.innerHTML = '<div class="empty" style="padding:10px 0;">등록된 업체가 없습니다. 아래에서 추가하거나, 발주를 확정할 때 자동으로 등록됩니다.</div>';
      return;
    }
    companies.forEach(company=>{
      const row = document.createElement('div');
      row.className = 'dict-row';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = company.name;
      nameInput.addEventListener('change', (e)=>{
        const newName = e.target.value.trim();
        if(!newName){ nameInput.value = company.name; return; }
        const oldName = company.name;
        company.name = newName;
        Object.keys(ordersByDate).forEach(dateKey=>{
          const bucket = ordersByDate[dateKey];
          if(bucket[oldName]){ bucket[newName] = bucket[oldName]; delete bucket[oldName]; }
        });
        Object.keys(thirdPartyLineItems).forEach(dateKey=>{
          thirdPartyLineItems[dateKey].forEach(r=>{ if(r.company === oldName) r.company = newName; });
        });
        saveOrdersByDate(); saveLineItems();
        saveCompanies(); renderCompanyManager(); renderAggTable(); renderThirdPartyAggTable(); renderThirdPartyLineItems();
      });

      const label = document.createElement('label');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '4px';
      label.style.fontSize = '12px';
      label.style.color = 'var(--muted)';
      label.style.whiteSpace = 'nowrap';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!company.isThirdParty;
      checkbox.addEventListener('change', (e)=>{
        company.isThirdParty = e.target.checked;
        saveCompanies(); renderThirdPartyAggTable(); renderThirdPartyLineItems();
        populateCompanySelect(document.getElementById('company-select').value);
        populateUploadCompanySelect();
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode('3PL'));

      const codeInput = document.createElement('input');
      codeInput.type = 'text';
      codeInput.placeholder = '코드';
      codeInput.style.maxWidth = '70px';
      codeInput.value = company.code || '';
      codeInput.addEventListener('change', (e)=>{
        company.code = e.target.value.trim();
        saveCompanies();
      });

      const categorySelect = document.createElement('select');
      categorySelect.title = '생산본부 양식 구분';
      const categories = ['(구분선택)', ...companyCategories];
      categories.forEach(cat=>{
        const opt = document.createElement('option');
        opt.value = cat === '(구분선택)' ? '' : cat;
        opt.textContent = cat;
        if((company.category || '') === opt.value) opt.selected = true;
        categorySelect.appendChild(opt);
      });
      categorySelect.addEventListener('change', (e)=>{
        company.category = e.target.value;
        saveCompanies();
        regionInput.style.display = e.target.value === '직거래' ? 'none' : '';
      });

      const regionInput = document.createElement('input');
      regionInput.type = 'text';
      regionInput.placeholder = '지역(예:가락/수도권)';
      regionInput.style.maxWidth = '100px';
      regionInput.value = company.region || '';
      regionInput.style.display = company.category === '직거래' ? 'none' : '';
      regionInput.addEventListener('change', (e)=>{
        company.region = e.target.value.trim();
        saveCompanies();
      });

      const listedInput = document.createElement('input');
      listedInput.type = 'text';
      listedInput.placeholder = '상장청과명(도매)';
      listedInput.style.maxWidth = '120px';
      listedInput.value = company.listedMarketName || '';
      listedInput.title = '도매 상장청과명 (예: (상장)중앙청과)';
      listedInput.addEventListener('change', (e)=>{
        company.listedMarketName = e.target.value.trim();
        saveCompanies();
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      armConfirmButton(delBtn, ()=>{
        companies = companies.filter(c=>c!==company);
        saveCompanies(); renderCompanyManager(); renderPriceMapEditor();
      });

      row.appendChild(nameInput);
      row.appendChild(label);
      row.appendChild(codeInput);
      row.appendChild(categorySelect);
      row.appendChild(regionInput);
      row.appendChild(listedInput);
      row.appendChild(delBtn);
      wrap.appendChild(row);
    });
  }

  function renderRawStockEditor(){
    const wrap = document.getElementById('raw-stock-editor');
    wrap.innerHTML = '';
    if(rawMaterials.length === 0){
      wrap.innerHTML = '<div class="empty" style="padding:10px 0;">등록된 원물이 없습니다. 아래에서 추가해주세요.</div>';
      return;
    }
    const stock = currentPreviousStock();
    const usage = currentRawMaterialUsage();

    // compute today's total units dispatched per item across all companies
    const orders = currentOrders();
    const todayUnitsByItemId = {};
    Object.values(orders).forEach(co=>{
      Object.keys(co).forEach(itemId=>{
        if(itemId === '_meta') return;
        todayUnitsByItemId[itemId] = (todayUnitsByItemId[itemId] || 0) + (Number(co[itemId]) || 0);
      });
    });

    rawMaterials.forEach(mat=>{
      const row = document.createElement('div');
      row.className = 'dict-row';
      row.style.flexWrap = 'wrap';

      const nameSpan = document.createElement('div');
      nameSpan.style.flex = '0 0 80px';
      nameSpan.style.fontSize = '13px';
      nameSpan.style.fontWeight = '600';
      nameSpan.textContent = mat.name;
      row.appendChild(nameSpan);

      const prevLabel = document.createElement('label');
      prevLabel.style.fontSize = '11.5px'; prevLabel.style.color = 'var(--muted)'; prevLabel.textContent = '전일재고:';
      row.appendChild(prevLabel);
      const qtyInput = document.createElement('input');
      qtyInput.type = 'number';
      qtyInput.style.width = '75px';
      qtyInput.placeholder = '단위';
      qtyInput.value = stock.raw[mat.id] ?? '';
      qtyInput.addEventListener('change', (e)=>{
        stock.raw[mat.id] = e.target.value === '' ? 0 : (parseFloat(e.target.value) || 0);
        savePreviousStock();
      });
      row.appendChild(qtyInput);

      const kgLabel = document.createElement('label');
      kgLabel.style.fontSize = '11.5px'; kgLabel.style.color = 'var(--muted)'; kgLabel.textContent = '팩당kg:';
      row.appendChild(kgLabel);
      const kgInput = document.createElement('input');
      kgInput.type = 'number';
      kgInput.step = '0.01';
      kgInput.style.width = '65px';
      kgInput.placeholder = 'kg/팩';
      kgInput.value = mat.kgPerUnit ?? '';
      kgInput.addEventListener('change', (e)=>{
        mat.kgPerUnit = e.target.value === '' ? '' : (parseFloat(e.target.value) || '');
        saveRawMaterials();
        renderRawStockEditor(); // refresh auto-calc
      });
      row.appendChild(kgInput);

      // auto-compute usage from today's total dispatched units × kgPerUnit
      const autoKg = (mat.kgPerUnit && mat.kgPerUnit > 0)
        ? Object.keys(todayUnitsByItemId).reduce((sum, itemId)=>{
            // each item that uses this raw material contributes itemId units × kgPerUnit
            // (simple model: all items use the same raw material equally by kgPerUnit;
            //  for different raw materials per SKU, the user can override manually below)
            return sum + (todayUnitsByItemId[itemId] * mat.kgPerUnit);
          }, 0)
        : null;

      const usageLabel = document.createElement('label');
      usageLabel.style.fontSize = '11.5px'; usageLabel.style.color = 'var(--muted)'; usageLabel.textContent = '당일사용(kg):';
      row.appendChild(usageLabel);
      const usageInput = document.createElement('input');
      usageInput.type = 'number';
      usageInput.step = '0.1';
      usageInput.style.width = '75px';
      usageInput.placeholder = 'kg';
      usageInput.value = usage[mat.id] ?? (autoKg !== null ? autoKg : '');
      usageInput.title = autoKg !== null ? `자동계산: ${autoKg}kg (팩당kg×오늘출고수량). 직접 입력 시 덮어씌워집니다.` : '직접 입력';
      usageInput.addEventListener('change', (e)=>{
        usage[mat.id] = e.target.value === '' ? null : (parseFloat(e.target.value) || 0);
        saveRawMaterialUsage();
      });
      row.appendChild(usageInput);

      if(autoKg !== null && usage[mat.id] == null){
        const autoTag = document.createElement('span');
        autoTag.style.fontSize = '10.5px'; autoTag.style.color = 'var(--accent)'; autoTag.textContent = '(자동)';
        row.appendChild(autoTag);
      }

      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      armConfirmButton(delBtn, ()=>{
        rawMaterials = rawMaterials.filter(m=>m.id!==mat.id);
        Object.keys(previousStock).forEach(dateKey=>{
          if(previousStock[dateKey].raw) delete previousStock[dateKey].raw[mat.id];
        });
        Object.keys(rawMaterialUsage).forEach(dateKey=>{
          delete rawMaterialUsage[dateKey][mat.id];
        });
        saveRawMaterials(); savePreviousStock(); saveRawMaterialUsage(); renderRawStockEditor();
      });
      row.appendChild(delBtn);

      wrap.appendChild(row);
    });
  }

  function renderProductStockEditor(){
    const wrap = document.getElementById('product-stock-editor');
    wrap.innerHTML = '';
    if(dict.length === 0){
      wrap.innerHTML = '<div class="empty" style="padding:10px 0;">등록된 품목(SKU)이 없습니다.</div>';
      return;
    }
    const stock = currentPreviousStock();
    dict.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'dict-row';

      const nameSpan = document.createElement('div');
      nameSpan.style.flex = '1';
      nameSpan.style.fontSize = '13px';
      nameSpan.textContent = item.name;
      row.appendChild(nameSpan);

      const qtyInput = document.createElement('input');
      qtyInput.type = 'number';
      qtyInput.style.width = '90px';
      qtyInput.placeholder = '전일 재고(개)';
      qtyInput.value = stock.product[item.id] ?? '';

      const boxSpan = document.createElement('span');
      boxSpan.style.fontSize = '11.5px';
      boxSpan.style.color = 'var(--accent)';
      boxSpan.style.minWidth = '90px';
      const updateBoxSpan = (val)=>{
        const breakdown = formatBoxBreakdown(val, item.boxUnitCount);
        boxSpan.textContent = breakdown ? `= ${breakdown}` : (item.boxUnitCount ? '' : '(박스입수 미설정)');
      };
      updateBoxSpan(stock.product[item.id] ?? 0);

      qtyInput.addEventListener('input', (e)=>{
        const v = e.target.value === '' ? 0 : (parseFloat(e.target.value) || 0);
        updateBoxSpan(v);
      });
      qtyInput.addEventListener('change', (e)=>{
        stock.product[item.id] = e.target.value === '' ? 0 : (parseFloat(e.target.value) || 0);
        savePreviousStock();
        renderAggTable();
      });
      row.appendChild(qtyInput);
      row.appendChild(boxSpan);

      const clearBtn = document.createElement('button');
      clearBtn.className = 'btn-ghost small-btn';
      clearBtn.textContent = '지우기';
      clearBtn.title = '이 품목의 재고 수량만 지웁니다 (품목 자체는 삭제되지 않습니다)';
      clearBtn.addEventListener('click', ()=>{
        delete stock.product[item.id];
        savePreviousStock();
        qtyInput.value = '';
        updateBoxSpan(0);
        renderAggTable();
      });
      row.appendChild(clearBtn);

      wrap.appendChild(row);
    });
  }

  function populateUploadCompanySelect(){
    const sel = document.getElementById('upload-company-select');
    if(!sel) return;
    const prevVal = sel.value;
    sel.innerHTML = '';
    const blank = document.createElement('option');
    blank.value = ''; blank.textContent = '(업체를 선택하세요)';
    sel.appendChild(blank);
    companies.forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c.name; opt.textContent = c.name + (c.isThirdParty ? ' [3PL]' : '');
      sel.appendChild(opt);
    });
    if(companies.some(c=>c.name===prevVal)) sel.value = prevVal;
  }

  function renderSkuColumnMapEditor(){
    const wrap = document.getElementById('sku-column-map-editor');
    if(!wrap) return;
    wrap.innerHTML = '';
    if(dict.length === 0){
      wrap.innerHTML = '<div class="empty" style="padding:8px 0;">SKU 관리에 품목이 없습니다.</div>';
      return;
    }
    dict.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'dict-row';
      row.style.flexWrap = 'wrap';

      const nameSpan = document.createElement('div');
      nameSpan.style.flex = '0 0 200px';
      nameSpan.style.fontSize = '13px';
      nameSpan.textContent = item.name;
      row.appendChild(nameSpan);

      const arrowSpan = document.createElement('span');
      arrowSpan.textContent = '→ 열:';
      arrowSpan.style.fontSize = '12px';
      arrowSpan.style.color = 'var(--muted)';
      row.appendChild(arrowSpan);

      const colInput = document.createElement('input');
      colInput.type = 'text';
      colInput.style.width = '60px';
      colInput.style.textTransform = 'uppercase';
      colInput.placeholder = '예: J';
      colInput.value = skuColumnMap[item.id] || '';
      colInput.title = `${item.name}의 데이터를 쓸 엑셀 열 (예: J, K, AA 등)`;
      colInput.addEventListener('change', (e)=>{
        const v = e.target.value.trim().toUpperCase();
        if(v) skuColumnMap[item.id] = v;
        else delete skuColumnMap[item.id];
        saveSkuColumnMap();
      });
      row.appendChild(colInput);

      const hint = document.createElement('span');
      hint.style.fontSize = '11px';
      hint.style.color = 'var(--muted)';
      hint.style.marginLeft = '6px';
      hint.textContent = skuColumnMap[item.id]
        ? `✓ ${skuColumnMap[item.id]}열`
        : '(미설정 — 해당 SKU는 파일에 기입 안 됨)';
      row.appendChild(hint);

      wrap.appendChild(row);
    });

    // if template is loaded, show a preview of the col-13 headers to help the user
    if(productionTemplateB64){
      const noteDiv = document.createElement('div');
      noteDiv.style.marginTop = '10px';
      noteDiv.style.fontSize = '11.5px';
      noteDiv.style.color = 'var(--muted)';
      noteDiv.innerHTML = '<b>파일 등록됨.</b> 13행 헤더 기준 참고: J=투맛토(스테비아) K=투맛토(망고향) L=투맛토(자몽향) M=스테비아(스티로폼) N=망고향(스티로폼) O=자몽향(스티로폼) P=포도쉐킷(망고) Q=포도쉐킷(애플) S=투래곤후르츠 Z=[150g]스테비아 AA=[150g]망고 AB=[150g]자몽 AC=[150g]포도쉐킷(망고) AD=[150g]포도쉐킷(애플)';
      wrap.appendChild(noteDiv);
    }
  }

  function renderDeliveryFeeEditor(){
    const wrap = document.getElementById('delivery-fee-editor');
    if(!wrap) return;
    wrap.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>사이즈</th><th>품목명</th><th>품목코드</th><th>단가(원)</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');

    deliveryFeeItems.forEach(item=>{
      const tr = document.createElement('tr');

      const sizeTd = document.createElement('td');
      sizeTd.style.fontWeight = '700';
      sizeTd.style.color = item.size === '극소' ? 'var(--muted)' : 'var(--accent)';
      sizeTd.textContent = `${item.size} (${item.size==='극소'?'1~4팩':'5~8팩'})`;
      tr.appendChild(sizeTd);

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = item.name || '';
      nameInput.placeholder = `택배비(${item.size})`;
      nameInput.style.width = '140px';
      nameInput.style.border = '1px solid var(--line)';
      nameInput.style.borderRadius = '4px';
      nameInput.style.padding = '3px 6px';
      nameInput.style.fontSize = '12px';
      nameInput.addEventListener('change', e=>{ item.name = e.target.value.trim(); saveDeliveryFeeItems(); });
      const nameTd = document.createElement('td');
      nameTd.appendChild(nameInput);
      tr.appendChild(nameTd);

      const codeInput = document.createElement('input');
      codeInput.type = 'text';
      codeInput.value = item.code || '';
      codeInput.placeholder = '내부코드';
      codeInput.style.width = '100px';
      codeInput.style.border = '1px solid var(--line)';
      codeInput.style.borderRadius = '4px';
      codeInput.style.padding = '3px 6px';
      codeInput.style.fontSize = '12px';
      codeInput.addEventListener('change', e=>{ item.code = e.target.value.trim(); saveDeliveryFeeItems(); });
      const codeTd = document.createElement('td');
      codeTd.appendChild(codeInput);
      tr.appendChild(codeTd);

      const priceInput = document.createElement('input');
      priceInput.type = 'number';
      priceInput.min = '0';
      priceInput.value = item.price !== '' ? item.price : '';
      priceInput.placeholder = '단가';
      priceInput.style.width = '90px';
      priceInput.style.border = '1px solid var(--line)';
      priceInput.style.borderRadius = '4px';
      priceInput.style.padding = '3px 6px';
      priceInput.style.fontSize = '12px';
      priceInput.addEventListener('change', e=>{
        item.price = e.target.value === '' ? '' : (parseFloat(e.target.value) || 0);
        saveDeliveryFeeItems();
      });
      const priceTd = document.createElement('td');
      priceTd.appendChild(priceInput);
      tr.appendChild(priceTd);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
  }

  function renderPriceMapEditor(){
    const wrap = document.getElementById('price-map-editor');
    if(!wrap) return;
    const registeredCompanies = companies.filter(c=> c.category && c.category !== '');
    if(registeredCompanies.length === 0 || dict.length === 0){
      wrap.innerHTML = '<div class="empty" style="padding:8px 0;">거래처 관리에서 구분이 설정된 업체가 없습니다.</div>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = '<th class="name-cell">업체명</th>' +
      dict.map(d=>`<th>${escapeHtml(d.name)}</th>`).join('');
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    registeredCompanies.forEach(company=>{
      if(!company.priceMap) company.priceMap = {};
      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      nameTd.className = 'name-cell';
      nameTd.textContent = company.name;
      tr.appendChild(nameTd);

      dict.forEach(d=>{
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.step = '1';
        input.style.width = '80px';
        input.style.border = '1px solid var(--line)';
        input.style.borderRadius = '4px';
        input.style.padding = '3px 4px';
        input.style.fontSize = '12px';
        input.placeholder = '단가';
        input.value = company.priceMap[d.id] ?? '';
        input.addEventListener('change', (e)=>{
          if(!company.priceMap) company.priceMap = {};
          const v = parseFloat(e.target.value);
          if(isNaN(v) || e.target.value.trim() === '') delete company.priceMap[d.id];
          else company.priceMap[d.id] = v;
          saveCompanies();
        });
        td.appendChild(input);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  function renderDeliveryCount(){
    const wrap = document.getElementById('delivery-count-wrap');
    if(!wrap) return;
    const rows = currentLineItems();

    // Count by unique tracking number per company, using TOTAL qty per tracking number
    // (e.g. 자몽 2팩 + 망고 2팩 with same tracking = 4팩 total = 극소, not 2×극소)
    const trackingSet = buildTrackingSetByCompany(rows.filter(r=> r.trackingNo && r.trackingNo.trim()));

    if(Object.keys(trackingSet).length === 0){
      wrap.innerHTML = '<div class="empty">운송장번호가 매칭된 주문이 없습니다. 5. 운송장번호 업로드를 먼저 진행해주세요.</div>';
      return;
    }

    // Aggregate per company using unique tracking numbers
    const byCompany = {};
    Object.entries(trackingSet).forEach(([companyName, trackMap])=>{
      byCompany[companyName] = { '극소': 0, '소': 0, total: 0 };
      trackMap.forEach(({ size })=>{
        byCompany[companyName][size] = (byCompany[companyName][size] || 0) + 1;
        byCompany[companyName].total++;
      });
    });

    const table = document.createElement('table');
    table.style.marginTop = '10px';
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>
      <th class="name-cell">업체명</th>
      <th>극소(1~4팩)</th>
      <th>소(5~8팩)</th>
      <th class="totals-col">합계 건수</th>
    </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    let grandXS = 0, grandS = 0, grandTotal = 0;
    Object.entries(byCompany).sort(([a],[b])=>a.localeCompare(b)).forEach(([name, counts])=>{
      const tr = document.createElement('tr');
      const xs = counts['극소'] || 0;
      const s = counts['소'] || 0;
      grandXS += xs; grandS += s; grandTotal += counts.total;
      tr.innerHTML = `<td class="name-cell">${escapeHtml(name)}</td>
        <td>${xs}</td>
        <td>${s}</td>
        <td class="totals-col">${counts.total}</td>`;
      tbody.appendChild(tr);
    });
    const totalTr = document.createElement('tr');
    totalTr.innerHTML = `<td class="name-cell totals-col">합계</td>
      <td class="totals-col">${grandXS}</td>
      <td class="totals-col">${grandS}</td>
      <td class="totals-col">${grandTotal}</td>`;
    tbody.appendChild(totalTr);
    table.appendChild(tbody);

    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  function renderOriginalFileSelect(){
    const sel = document.getElementById('original-file-company-select');
    if(!sel) return;
    const prevVal = sel.value;
    const names = Object.keys(currentOriginalFiles());
    sel.innerHTML = '';
    if(names.length === 0){
      const opt = document.createElement('option');
      opt.value = ''; opt.textContent = '(업로드된 원본 파일 없음)';
      sel.appendChild(opt);
      return;
    }
    names.forEach(name=>{
      const opt = document.createElement('option');
      opt.value = name; opt.textContent = name;
      sel.appendChild(opt);
    });
    if(names.includes(prevVal)) sel.value = prevVal;
  }

  function formatBoxBreakdown(qty, boxUnitCount){
    const n = Number(boxUnitCount);
    if(!n || n <= 0 || qty == null || isNaN(qty) || qty <= 0) return null;
    const boxes = Math.floor(qty / n);
    const remainder = qty % n;
    return remainder === 0 ? `${boxes}박스` : `${boxes}박스 ${remainder}개`;
  }

  function colLetter(i){
    let n = i + 1, s = '';
    while(n > 0){
      const rem = (n - 1) % 26;
      s = String.fromCharCode(65 + rem) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }
  function letterToIndex(letter){
    let idx = 0;
    for(let i = 0; i < letter.length; i++){
      idx = idx * 26 + (letter.charCodeAt(i) - 64);
    }
    return idx - 1;
  }

  function buildColumnPreviewTable(sheetData, containerId){
    const maxCols = sheetData.reduce((m, r) => Math.max(m, r.length), 0);
    const previewRows = sheetData.slice(0, 6);
    let html = '<table><thead><tr><th></th>';
    for(let i = 0; i < maxCols; i++) html += `<th>${colLetter(i)}</th>`;
    html += '</tr></thead><tbody>';
    previewRows.forEach((row, ridx) => {
      html += `<tr><td class="totals-col">${ridx + 1}</td>`;
      for(let i = 0; i < maxCols; i++){
        html += `<td>${escapeHtml((row[i] ?? '').toString())}</td>`;
      }
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById(containerId).innerHTML = html;
    return maxCols;
  }

  function renderUploadMapping(){
    const wrap = document.getElementById('upload-mapping-wrap');
    if(!uploadedSheetData || uploadedSheetData.length === 0){ wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';

    const companyName = document.getElementById('upload-company-select').value;
    const companyObj = companies.find(c => c.name === companyName);
    const isThreePl = !!(companyObj && companyObj.isThirdParty);
    const fieldDefs = isThreePl ? THIRDPARTY_FIELDS : SIMPLE_FIELDS;

    const maxCols = buildColumnPreviewTable(uploadedSheetData, 'upload-file-preview');

    const fieldWrap = document.getElementById('upload-field-selects');
    fieldWrap.innerHTML = '';
    const savedMapping = (companyObj && companyObj.uploadMapping) || {};

    // Read header row (startRow-1, 0-indexed = startRow-2) to show column names in dropdowns
    const startRowNum = parseInt(document.getElementById('upload-start-row').value, 10) || 2;
    const headerRowIdx = startRowNum - 2;
    const headerRow = (headerRowIdx >= 0 && uploadedSheetData[headerRowIdx]) ? uploadedSheetData[headerRowIdx] : [];

    fieldDefs.forEach((f, i)=>{
      const label = document.createElement('label');
      label.style.fontSize = '13px';
      label.textContent = f.label + ' :';
      const sel = document.createElement('select');
      sel.id = 'upload-field-' + f.key;
      if(f.optional){
        const noneOpt = document.createElement('option');
        noneOpt.value = ''; noneOpt.textContent = '(없음)';
        sel.appendChild(noneOpt);
      }
      for(let c = 0; c < maxCols; c++){
        const letter = colLetter(c);
        const opt = document.createElement('option');
        opt.value = letter;
        // Show the actual column header name alongside the letter
        const headerName = headerRow[c] != null ? String(headerRow[c]).trim() : '';
        opt.textContent = headerName ? `${letter} [${headerName.slice(0,12)}]` : letter;
        sel.appendChild(opt);
      }
      sel.value = (savedMapping[f.key] !== undefined) ? savedMapping[f.key] : (maxCols > i ? colLetter(i) : 'A');
      fieldWrap.appendChild(label);
      fieldWrap.appendChild(sel);
    });
    document.getElementById('upload-start-row').value = savedMapping.startRow || 2;
  }

  function renderAggTable(){
    const wrap = document.getElementById('agg-table-wrap');
    const orders = currentOrders();
    const orderCompanies = Object.keys(orders);
    if(orderCompanies.length === 0 || dict.length === 0){
      wrap.innerHTML = '<div class="empty">아직 확정된 발주가 없습니다. 위에서 메시지를 입력하고 확정 추가해보세요.</div>';
      document.getElementById('agg-bulk-bar').style.display = 'none';
      return;
    }
    document.getElementById('agg-bulk-bar').style.display = 'flex';
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = '<th><input type="checkbox" id="agg-select-all"></th><th class="name-cell">업체명</th><th>담당자</th>' +
      dict.map(d=>{
        const boxNote = d.boxUnitCount ? `<div style="font-size:10px;font-weight:400;color:var(--muted)">${d.boxUnitCount}팩/박스</div>` : '';
        return `<th>${escapeHtml(d.name)}${boxNote}</th>`;
      }).join('') +
      '<th class="totals-col">합계</th><th></th>';
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    orderCompanies.forEach(company=>{
      const tr = document.createElement('tr');

      const checkTd = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'agg-row-check';
      checkbox.dataset.company = company;
      checkTd.appendChild(checkbox);
      tr.appendChild(checkTd);

      const nameTd = document.createElement('td');
      nameTd.className = 'name-cell';
      nameTd.textContent = company;
      tr.appendChild(nameTd);

      const staffTd = document.createElement('td');
      staffTd.textContent = (orders[company]._meta && orders[company]._meta.enteredBy) || '';
      tr.appendChild(staffTd);

      let rowTotal = 0;
      dict.forEach(d=>{
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        const val = orders[company][d.id] ?? 0;
        rowTotal += Number(val) || 0;
        input.value = val;
        input.addEventListener('change', (e)=>{
          const v = parseFloat(e.target.value) || 0;
          orders[company][d.id] = v;
          orders[company]._meta = { enteredBy: getStaffName(), updatedAt: new Date().toISOString() };
          saveOrdersByDate(); renderAggTable(); renderThirdPartyAggTable();
        });
        td.appendChild(input);
        tr.appendChild(td);
      });

      const totalTd = document.createElement('td');
      totalTd.className = 'totals-col';
      totalTd.textContent = rowTotal;
      tr.appendChild(totalTd);

      const actionTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      delBtn.addEventListener('click', ()=>{
        delete orders[company];
        saveOrdersByDate(); renderAggTable(); renderThirdPartyAggTable();
      });
      actionTd.appendChild(delBtn);
      tr.appendChild(actionTd);

      tbody.appendChild(tr);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = '<td></td><td class="name-cell totals-col">합계</td><td class="totals-col"></td>';
    let grandTotal = 0;
    const colTotals = [];
    dict.forEach(d=>{
      let colTotal = 0;
      orderCompanies.forEach(c=>{ colTotal += Number(orders[c][d.id]) || 0; });
      grandTotal += colTotal;
      colTotals.push(colTotal);
      const td = document.createElement('td');
      td.className = 'totals-col';
      const packDiv = document.createElement('div');
      packDiv.textContent = `${colTotal}팩`;
      td.appendChild(packDiv);
      if(d.boxUnitCount && Number(d.boxUnitCount) > 0){
        const boxDiv = document.createElement('div');
        boxDiv.style.fontSize = '10.5px';
        boxDiv.style.color = 'var(--accent)';
        const boxes = (colTotal / Number(d.boxUnitCount)).toFixed(2);
        boxDiv.textContent = `${boxes}박스`;
        td.appendChild(boxDiv);
      }
      totalRow.appendChild(td);
    });
    const gtTd = document.createElement('td');
    gtTd.className = 'totals-col';
    gtTd.textContent = `${grandTotal}팩`;
    totalRow.appendChild(gtTd);
    totalRow.appendChild(document.createElement('td'));
    tbody.appendChild(totalRow);

    const stock = currentPreviousStock();

    const stockRow = document.createElement('tr');
    stockRow.innerHTML = '<td></td><td class="name-cell" style="color:var(--muted);">전일 재고 (제품)</td><td></td>';
    let stockGrandTotal = 0;
    dict.forEach(d=>{
      const val = Number(stock.product[d.id]) || 0;
      stockGrandTotal += val;
      const td = document.createElement('td');
      td.style.color = 'var(--muted)';
      td.textContent = val;
      stockRow.appendChild(td);
    });
    const stockGtTd = document.createElement('td');
    stockGtTd.style.color = 'var(--muted)';
    stockGtTd.textContent = stockGrandTotal;
    stockRow.appendChild(stockGtTd);
    stockRow.appendChild(document.createElement('td'));
    tbody.appendChild(stockRow);

    const neededRow = document.createElement('tr');
    neededRow.innerHTML = '<td></td><td class="name-cell totals-col" style="color:var(--accent);">생산 필요수량 (합계-전일재고)</td><td class="totals-col"></td>';
    let neededGrandTotal = 0;
    dict.forEach((d, i)=>{
      const needed = colTotals[i] - (Number(stock.product[d.id]) || 0);
      neededGrandTotal += needed;
      const td = document.createElement('td');
      td.className = 'totals-col';
      td.style.color = 'var(--accent)';
      const numDiv = document.createElement('div');
      numDiv.textContent = `${needed}팩`;
      td.appendChild(numDiv);
      const breakdown = formatBoxBreakdown(needed, d.boxUnitCount);
      if(breakdown){
        const subDiv = document.createElement('div');
        subDiv.style.fontSize = '10.5px';
        subDiv.style.fontWeight = '400';
        subDiv.style.color = 'var(--muted)';
        subDiv.textContent = breakdown;
        td.appendChild(subDiv);
      }
      neededRow.appendChild(td);
    });
    const neededGtTd = document.createElement('td');
    neededGtTd.className = 'totals-col';
    neededGtTd.style.color = 'var(--accent)';
    neededGtTd.textContent = `${neededGrandTotal}팩`;
    neededRow.appendChild(neededGtTd);
    neededRow.appendChild(document.createElement('td'));
    tbody.appendChild(neededRow);

    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);

    document.getElementById('agg-select-all').addEventListener('change', (e)=>{
      document.querySelectorAll('.agg-row-check').forEach(cb=>{ cb.checked = e.target.checked; });
    });
  }

  // builds a read-only summary table (company x item) from an arbitrary companyMap, used for
  // the 3PL item-total summary and the monthly rollup view.
  function buildReadonlyAggTable(companyMap, totalsLabel){
    const companyNames = Object.keys(companyMap);
    if(companyNames.length === 0 || dict.length === 0) return null;
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = '<th class="name-cell">업체명</th>' +
      dict.map(d=>`<th>${escapeHtml(d.name)}</th>`).join('') +
      '<th class="totals-col">합계</th>';
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    companyNames.forEach(company=>{
      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      nameTd.className = 'name-cell';
      nameTd.textContent = company;
      tr.appendChild(nameTd);
      let rowTotal = 0;
      dict.forEach(d=>{
        const val = Number(companyMap[company][d.id]) || 0;
        rowTotal += val;
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      });
      const totalTd = document.createElement('td');
      totalTd.className = 'totals-col';
      totalTd.textContent = rowTotal;
      tr.appendChild(totalTd);
      tbody.appendChild(tr);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td class="name-cell totals-col">${escapeHtml(totalsLabel)}</td>`;
    let grandTotal = 0;
    dict.forEach(d=>{
      let colTotal = 0;
      companyNames.forEach(c=>{ colTotal += Number(companyMap[c][d.id]) || 0; });
      grandTotal += colTotal;
      const td = document.createElement('td');
      td.className = 'totals-col';
      td.textContent = colTotal;
      totalRow.appendChild(td);
    });
    const gtTd = document.createElement('td');
    gtTd.className = 'totals-col';
    gtTd.textContent = grandTotal;
    totalRow.appendChild(gtTd);
    tbody.appendChild(totalRow);
    table.appendChild(tbody);
    return table;
  }

  function renderThirdPartyAggTable(){
    const wrap = document.getElementById('agg-3pl-summary-wrap');
    const orders = currentOrders();
    const threePlNames = companies.filter(c=>c.isThirdParty).map(c=>c.name);
    if(threePlNames.length === 0){
      wrap.innerHTML = '<div class="empty">3PL로 지정된 업체가 없습니다. "거래처 관리"에서 업체 옆 3PL 체크박스를 켜주세요.</div>';
      return;
    }
    const filtered = {};
    threePlNames.forEach(name=>{ if(orders[name]) filtered[name] = orders[name]; });
    const table = buildReadonlyAggTable(filtered, '택배 출고 합계');
    if(!table){
      wrap.innerHTML = '<div class="empty">3PL 업체 중 아직 확정된 발주가 없습니다.</div>';
      return;
    }
    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  function itemNameById(itemId){
    const it = dict.find(d=>d.id===itemId);
    return it ? it.name : '';
  }

  function renderThirdPartyLineItems(){
    const wrap = document.getElementById('agg-3pl-detail-wrap');
    const rows = currentLineItems();
    if(rows.length === 0){
      wrap.innerHTML = '<div class="empty">아직 등록된 온라인 주문(3PL) 개별 건이 없습니다. 위에서 온라인 주문 엑셀을 업로드해주세요.</div>';
      document.getElementById('detail-bulk-bar').style.display = 'none';
      return;
    }
    document.getElementById('detail-bulk-bar').style.display = 'flex';
    // Build total-qty per tracking number so box size reflects the full shipment, not just one row
    const trackingTotalMap = buildTrackingTotalMap(rows.filter(r=>r.trackingNo&&r.trackingNo.trim()));
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>
      <th><input type="checkbox" id="detail-select-all"></th>
      <th>사내관리번호</th>
      <th class="name-cell">업체명</th>
      <th>담당자</th>
      <th>업체 주문번호</th>
      <th>받는사람 성명</th>
      <th>받는사람 전화번호</th>
      <th class="name-cell">배송지 주소</th>
      <th>품목명</th>
      <th>수량(팩)</th>
      <th>박스</th>
      <th class="name-cell">배송시 요청사항</th>
      <th>운송장번호</th>
      <th></th>
    </tr>`;
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach((r, idx)=>{
      const tr = document.createElement('tr');

      const checkTd = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'detail-row-check';
      checkbox.dataset.id = r.id;
      checkTd.appendChild(checkbox);
      tr.appendChild(checkTd);

      const internalNoTd = document.createElement('td');
      internalNoTd.style.fontWeight = '700';
      internalNoTd.textContent = r.internalOrderNo || '-';
      tr.appendChild(internalNoTd);

      const companyTd = document.createElement('td');
      companyTd.className = 'name-cell';
      companyTd.textContent = r.company;
      tr.appendChild(companyTd);

      const staffTd = document.createElement('td');
      staffTd.textContent = r.enteredBy || '';
      tr.appendChild(staffTd);

      const orderNoTd = document.createElement('td');
      orderNoTd.textContent = r.orderNo;
      tr.appendChild(orderNoTd);

      const nameTd = document.createElement('td');
      nameTd.textContent = r.recipientName;
      tr.appendChild(nameTd);

      const phoneTd = document.createElement('td');
      phoneTd.textContent = r.recipientPhone;
      tr.appendChild(phoneTd);

      const addrTd = document.createElement('td');
      addrTd.className = 'name-cell';
      addrTd.textContent = r.address;
      tr.appendChild(addrTd);

      const itemTd = document.createElement('td');
      const itemSel = document.createElement('select');
      const noneOpt = document.createElement('option');
      noneOpt.value = ''; noneOpt.textContent = r.itemNameRaw + ' (미매칭)';
      itemSel.appendChild(noneOpt);
      dict.forEach(d=>{
        const opt = document.createElement('option');
        opt.value = d.id; opt.textContent = d.name;
        if(d.id === r.itemId) opt.selected = true;
        itemSel.appendChild(opt);
      });
      itemSel.addEventListener('change', (e)=>{
        const oldItemId = r.itemId;
        r.itemId = e.target.value || null;
        // keep the aggregate total in sync with the corrected match
        const orders = currentOrders();
        if(!orders[r.company]) orders[r.company] = {};
        if(oldItemId){ orders[r.company][oldItemId] = (orders[r.company][oldItemId] || 0) - r.qty; }
        if(r.itemId){ orders[r.company][r.itemId] = (orders[r.company][r.itemId] || 0) + r.qty; }
        saveOrdersByDate(); saveLineItems();
        renderAggTable(); renderThirdPartyAggTable();
      });
      itemTd.appendChild(itemSel);
      tr.appendChild(itemTd);

      const qtyTd = document.createElement('td');
      qtyTd.textContent = r.qty;
      tr.appendChild(qtyTd);

      const boxTd = document.createElement('td');
      // Use total qty of this tracking number (all SKUs combined) to determine size
      const trackingInfo = r.trackingNo ? trackingTotalMap[r.trackingNo] : null;
      const sizeLabel = trackingInfo ? trackingInfo.size : getBoxSize(r.qty);
      if(r.boxTotal && r.boxTotal > 1){
        boxTd.textContent = `${r.boxIndex}/${r.boxTotal} (${sizeLabel})`;
        boxTd.style.color = 'var(--accent)';
        boxTd.style.fontWeight = '700';
      } else {
        boxTd.textContent = sizeLabel || '-';
        boxTd.style.color = sizeLabel === '극소' ? 'var(--muted)' : '';
      }
      tr.appendChild(boxTd);

      const noteTd = document.createElement('td');
      noteTd.className = 'name-cell';
      noteTd.textContent = r.note;
      tr.appendChild(noteTd);

      const trackTd = document.createElement('td');
      const trackInput = document.createElement('input');
      trackInput.type = 'text';
      trackInput.value = r.trackingNo || '';
      trackInput.style.width = '110px';
      trackInput.addEventListener('change', (e)=>{
        r.trackingNo = e.target.value.trim();
        saveLineItems();
      });
      trackTd.appendChild(trackInput);
      tr.appendChild(trackTd);

      const actionTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-danger small-btn';
      delBtn.textContent = '삭제';
      delBtn.addEventListener('click', ()=>{
        const orders = currentOrders();
        if(r.itemId && orders[r.company]){
          orders[r.company][r.itemId] = (orders[r.company][r.itemId] || 0) - r.qty;
        }
        const bucket = currentLineItems();
        const pos = bucket.findIndex(x=>x.id===r.id);
        if(pos !== -1) bucket.splice(pos, 1);
        saveOrdersByDate(); saveLineItems();
        renderAggTable(); renderThirdPartyAggTable(); renderThirdPartyLineItems();
      });
      actionTd.appendChild(delBtn);
      tr.appendChild(actionTd);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);

    document.getElementById('detail-select-all').addEventListener('change', (e)=>{
      document.querySelectorAll('.detail-row-check').forEach(cb=>{ cb.checked = e.target.checked; });
    });
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // ---------- generic file readers ----------
  function readSheetFile(file, onData){
    const reader = new FileReader();
    reader.onload = (evt)=>{
      try{
        const data = new Uint8Array(evt.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const aoa = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: '' });
        onData(aoa);
      }catch(err){
        console.error(err);
        toast('파일을 읽지 못했습니다. xlsx/xls/csv 형식인지 확인해주세요');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function setupDropzone(zoneEl, inputEl, onFile){
    zoneEl.addEventListener('click', ()=> inputEl.click());
    zoneEl.addEventListener('dragover', (e)=>{ e.preventDefault(); zoneEl.classList.add('dragover'); });
    zoneEl.addEventListener('dragleave', ()=> zoneEl.classList.remove('dragover'));
    zoneEl.addEventListener('drop', (e)=>{
      e.preventDefault();
      zoneEl.classList.remove('dragover');
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if(file) onFile(file);
    });
    inputEl.addEventListener('change', (e)=>{
      const file = e.target.files[0];
      if(file) onFile(file);
    });
  }

  function handleOnlineOrderFile(file){
    const companyName = document.getElementById('upload-company-select').value;
    if(!companyName){ toast('먼저 업체를 선택해주세요'); return; }
    document.getElementById('upload-fname').textContent = file.name;
    readSheetFile(file, (aoa)=>{
      uploadedSheetData = aoa;
      renderUploadMapping();
    });
  }

  function handleTrackingFile(file){
    document.getElementById('tracking-fname').textContent = file.name;
    readSheetFile(file, (aoa)=>{
      uploadedTrackingData = aoa;
      renderTrackingMapping();
    });
  }

  function renderTrackingMapping(){
    const wrap = document.getElementById('tracking-mapping-wrap');
    if(!uploadedTrackingData || uploadedTrackingData.length === 0){ wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    const maxCols = buildColumnPreviewTable(uploadedTrackingData, 'tracking-file-preview');
    const orderSel = document.getElementById('tracking-orderno-col');
    const trackSel = document.getElementById('tracking-trackingno-col');
    orderSel.innerHTML = ''; trackSel.innerHTML = '';
    for(let i = 0; i < maxCols; i++){
      const letter = colLetter(i);
      const o1 = document.createElement('option'); o1.value = letter; o1.textContent = letter;
      orderSel.appendChild(o1);
      const o2 = document.createElement('option'); o2.value = letter; o2.textContent = letter;
      trackSel.appendChild(o2);
    }
    orderSel.value = 'A';
    trackSel.value = maxCols > 1 ? colLetter(1) : 'A';
  }

  // ---------- events ----------
  document.getElementById('staff-name').addEventListener('change', saveStaffName);
  document.getElementById('staff-dept').addEventListener('change', saveStaffName);

  ['delivery-year','delivery-month','delivery-day'].forEach(id=>{
    document.getElementById(id).addEventListener('change', onDateChanged);
  });

  document.getElementById('new-date-btn').addEventListener('click', ()=>{
    document.getElementById('delivery-year').value = '';
    document.getElementById('delivery-month').value = '';
    document.getElementById('delivery-day').value = '';
    onDateChanged();
    toast('오늘 날짜로 새 집계를 시작합니다');
  });

  document.getElementById('retention-months').addEventListener('change', saveRetentionMonths);

  document.getElementById('cleanup-now-btn').addEventListener('click', ()=>{
    cleanupOldData(false);
  });

  document.getElementById('parse-btn').addEventListener('click', ()=>{
    const text = document.getElementById('msg-input').value;
    const parsed = parseMessage(text);
    if(!parsed){ toast('입력된 메시지가 없습니다'); return; }
    document.getElementById('parse-status').textContent = '입력 완료';
    renderParsed(parsed);
  });

  document.getElementById('clear-input-btn').addEventListener('click', ()=>{
    document.getElementById('msg-input').value = '';
    document.getElementById('parse-status').textContent = '대기중';
  });

  document.getElementById('cancel-preview-btn').addEventListener('click', ()=>{
    document.getElementById('preview-card').style.display = 'none';
    currentParsed = null;
  });

  document.getElementById('company-select').addEventListener('change', (e)=>{
    if(currentParsed) currentParsed.company = e.target.value;
  });

  document.getElementById('add-company-inline-btn').addEventListener('click', ()=>{
    const row = document.getElementById('new-company-row');
    row.style.display = row.style.display === 'none' ? 'flex' : 'none';
    document.getElementById('new-company-input').focus();
  });

  document.getElementById('save-new-company-btn').addEventListener('click', ()=>{
    const input = document.getElementById('new-company-input');
    const val = input.value.trim();
    if(!val){ toast('업체명을 입력해주세요'); return; }
    addCompanyIfNew(val);
    if(currentParsed) currentParsed.company = val;
    populateCompanySelect(val);
    input.value = '';
    document.getElementById('new-company-row').style.display = 'none';
  });

  document.getElementById('confirm-btn').addEventListener('click', ()=>{
    if(!currentParsed) return;
    const company = (document.getElementById('company-select').value || '').trim();
    if(!company){ toast('업체명을 선택하거나 입력해주세요'); return; }
    addCompanyIfNew(company);
    const orders = currentOrders();
    if(!orders[company]) orders[company] = {};
    let addedAny = false;
    currentParsed.items.forEach(it=>{
      if(it.matchedId && it.qty != null && !isNaN(it.qty)){
        orders[company][it.matchedId] = (orders[company][it.matchedId] || 0) + it.qty;
        addedAny = true;
      }
    });
    if(!addedAny){ toast('추가된 품목이 없습니다. 매칭과 수량을 확인해주세요'); return; }
    orders[company]._meta = { enteredBy: getStaffName(), updatedAt: new Date().toISOString() };
    saveOrdersByDate();
    renderAggTable();
    renderThirdPartyAggTable();
    renderRawStockEditor();
    document.getElementById('preview-card').style.display = 'none';
    document.getElementById('msg-input').value = '';
    document.getElementById('parse-status').textContent = '대기중';
    currentParsed = null;
    toast(company + ' 발주가 집계표에 추가되었습니다');
  });

  document.getElementById('add-item-btn').addEventListener('click', ()=>{
    dict.push({ id: cryptoId(), name: '새 품목', aliases: [], code: '', boxUnitCount: '', shortName: '' });
    saveDict(); renderDict(); renderAggTable(); renderThirdPartyAggTable(); renderProductStockEditor(); renderSkuColumnMapEditor(); renderPriceMapEditor();
  });

  document.getElementById('add-raw-material-btn').addEventListener('click', ()=>{
    const input = document.getElementById('new-raw-material-input');
    const val = input.value.trim();
    if(!val){ toast('원물명을 입력해주세요'); return; }
    if(rawMaterials.some(m=>m.name===val)){ toast('이미 등록된 원물입니다'); return; }
    rawMaterials.push({ id: cryptoId(), name: val });
    saveRawMaterials(); renderRawStockEditor();
    input.value = '';
  });

  document.getElementById('add-company-manage-btn').addEventListener('click', ()=>{
    const input = document.getElementById('new-company-manage-input');
    const val = input.value.trim();
    if(!val){ toast('업체명을 입력해주세요'); return; }
    if(companies.some(c=>c.name===val)){ toast('이미 등록된 업체입니다'); return; }
    companies.push({ name: val, isThirdParty: false, code: '', category: '', region: '', listedMarketName: '' });
    saveCompanies(); renderCompanyManager(); renderPriceMapEditor();
    input.value = '';
  });

  document.getElementById('add-category-btn').addEventListener('click', ()=>{
    const input = document.getElementById('new-category-input');
    const val = input.value.trim();
    if(!val){ toast('구분명을 입력해주세요'); return; }
    if(companyCategories.includes(val)){ toast('이미 있는 구분입니다'); return; }
    companyCategories.push(val);
    saveCompanyCategories();
    renderCategoryEditor(); renderCompanyManager(); renderPriceMapEditor();
    input.value = '';
    toast(`"${val}" 구분이 추가되었습니다`);
  });

  document.getElementById('export-codes-btn').addEventListener('click', ()=>{
    const itemHeader = ['품목명', '코드'];
    const itemRows = dict.map(d=>[d.name, d.code || '']);
    const companyHeader = ['업체명', '코드', '3PL 여부'];
    const companyRows = companies.map(c=>[c.name, c.code || '', c.isThirdParty ? 'Y' : '']);

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet([itemHeader, ...itemRows]);
    XLSX.utils.book_append_sheet(wb, ws1, '품목코드');
    const ws2 = XLSX.utils.aoa_to_sheet([companyHeader, ...companyRows]);
    XLSX.utils.book_append_sheet(wb, ws2, '거래처코드');

    const today = new Date();
    const fname = `품목_거래처_코드표_${today.getFullYear()}${pad2(today.getMonth()+1)}${pad2(today.getDate())}.xlsx`;
    XLSX.writeFile(wb, fname);
    toast('코드표 엑셀이 다운로드되었습니다');
  });

  document.getElementById('upload-company-select').addEventListener('change', ()=>{
    if(uploadedSheetData) renderUploadMapping();
  });

  setupDropzone(
    document.getElementById('upload-dropzone'),
    document.getElementById('upload-file-input'),
    handleOnlineOrderFile
  );

  document.getElementById('upload-apply-btn').addEventListener('click', ()=>{
    const companyName = document.getElementById('upload-company-select').value;
    if(!companyName){ toast('업체를 선택해주세요'); return; }
    if(!uploadedSheetData){ toast('먼저 파일을 업로드해주세요'); return; }

    const companyObj = companies.find(c => c.name === companyName);
    const isThreePl = !!(companyObj && companyObj.isThirdParty);
    const fieldDefs = isThreePl ? THIRDPARTY_FIELDS : SIMPLE_FIELDS;
    const startRow = parseInt(document.getElementById('upload-start-row').value, 10) || 2;

    const mapping = { startRow };
    fieldDefs.forEach(f=>{ mapping[f.key] = document.getElementById('upload-field-' + f.key).value; });
    if(companyObj){ companyObj.uploadMapping = mapping; saveCompanies(); }

    const idx = {};
    fieldDefs.forEach(f=>{ idx[f.key] = letterToIndex(mapping[f.key]); });

    if(!isThreePl){
      const items = [];
      for(let r = startRow - 1; r < uploadedSheetData.length; r++){
        const row = uploadedSheetData[r] || [];
        // skip rows that are completely empty
        if(row.every(v=> v == null || v.toString().trim() === '')) continue;
        const itemTextRaw = (row[idx.item] ?? '').toString().trim();
        const qtyRaw = row[idx.qty];
        if(!itemTextRaw) continue;  // item name is required
        const qty = parseFloat(qtyRaw);
        if(isNaN(qty) || qty <= 0) continue;
        const matchedId = matchItem(itemTextRaw);
        items.push({ raw: `${itemTextRaw} / ${qtyRaw}`, itemText: itemTextRaw, qty, unit: '박스', matchedId });
      }
      if(items.length === 0){ toast('인식된 품목이 없습니다. 열/시작 행 설정을 확인해주세요'); return; }
      renderParsed({ company: companyName, items });
      document.getElementById('preview-card').scrollIntoView({ behavior: 'smooth' });
      toast(`${items.length}개 행을 불러왔습니다. 아래에서 확인 후 확정해주세요`);
      return;
    }

    // 3PL: build detailed shipment rows
    // First pass: collect raw order lines grouped by address for address-based box merging (issue 2)
    // Build newRows: each original order line stays independent.
    // If a single line has qty > 8 it splits into multiple box rows (same internalOrderNo),
    // but different order lines (different products/items for the same customer) stay separate rows.
    const newRows = [];
    for(let r = startRow - 1; r < uploadedSheetData.length; r++){
      const row = uploadedSheetData[r] || [];
      if(row.every(v=> v == null || v.toString().trim() === '')) continue;
      const itemTextRaw = (row[idx.item] ?? '').toString().trim();
      const qtyRaw = row[idx.qty];
      if(!itemTextRaw) continue;
      const qty = parseFloat(qtyRaw);
      if(isNaN(qty) || qty <= 0) continue;

      const orderNo = idx.orderNo !== undefined && idx.orderNo >= 0 ? (row[idx.orderNo] ?? '').toString().trim() : '';
      const recipientName = idx.recipientName !== undefined && idx.recipientName >= 0 ? (row[idx.recipientName] ?? '').toString().trim() : '';
      const recipientPhone = idx.recipientPhone !== undefined && idx.recipientPhone >= 0 ? (row[idx.recipientPhone] ?? '').toString().trim() : '';
      const address = idx.address !== undefined && idx.address >= 0 ? (row[idx.address] ?? '').toString().trim() : '';
      const note = idx.note !== undefined && idx.note >= 0 ? (row[idx.note] ?? '').toString().trim() : '';
      const itemId = matchItem(itemTextRaw);
      const internalOrderNo = getNextInternalOrderNo(); // one per original order line

      const boxQtys = splitIntoBoxes(qty); // only splits if qty > 8
      boxQtys.forEach((boxQty, boxIdx)=>{
        newRows.push({
          id: cryptoId(),
          internalOrderNo,
          company: companyName,
          orderNo,
          recipientName,
          recipientPhone,
          address,
          itemNameRaw: itemTextRaw,
          itemId,
          qty: boxQty,
          note,
          trackingNo: '',
          enteredBy: getStaffName(),
          boxIndex: boxIdx + 1,
          boxTotal: boxQtys.length,
          sourceRowIndex: r
        });
      });
    }

    if(newRows.length === 0){ toast('인식된 주문 행이 없습니다. 열/시작 행 설정을 확인해주세요'); return; }
    saveInternalOrderCounters();
    const splitCount = newRows.filter(r=>r.boxTotal > 1).length;

    addCompanyIfNew(companyName);
    const bucket = currentLineItems();
    newRows.forEach(r=> bucket.push(r));
    saveLineItems();

    // Accumulate original files per company per batch
    const batchId = cryptoId();
    const origFiles = currentOriginalFiles();
    if(!origFiles[companyName]) origFiles[companyName] = [];
    if(!Array.isArray(origFiles[companyName])) {
      // migrate from old single-object format to array
      origFiles[companyName] = [origFiles[companyName]];
    }
    origFiles[companyName].push({ batchId, aoa: uploadedSheetData, startRow });
    // Update sourceRowIndex on the new rows to include batchId for unambiguous matching
    newRows.forEach(r=>{ r.sourceBatchId = batchId; });
    saveOriginalFiles();
    renderOriginalFileSelect();

    const orders = currentOrders();
    if(!orders[companyName]) orders[companyName] = {};
    newRows.forEach(r=>{
      if(r.itemId){ orders[companyName][r.itemId] = (orders[companyName][r.itemId] || 0) + r.qty; }
    });
    orders[companyName]._meta = { enteredBy: getStaffName(), updatedAt: new Date().toISOString() };
    saveOrdersByDate();

    renderAggTable(); renderThirdPartyAggTable(); renderThirdPartyLineItems();
    document.getElementById('tab-3pl-btn').click();
    toast(`${newRows.length}건의 3PL 주문이 추가되었습니다${splitCount > 0 ? ` (${splitCount}건은 박스 분리됨)` : ''}`);
  });

  setupDropzone(
    document.getElementById('tracking-dropzone'),
    document.getElementById('tracking-file-input'),
    handleTrackingFile
  );

  setupDropzone(
    document.getElementById('production-template-dropzone'),
    document.getElementById('production-template-input'),
    (file)=>{
      const reader = new FileReader();
      reader.onload = (evt)=>{
        // Store as base64 so it can be persisted and later reconstructed
        const arr = new Uint8Array(evt.target.result);
        let b64 = '';
        const chunk = 8192;
        for(let i = 0; i < arr.length; i += chunk){
          b64 += String.fromCharCode(...arr.subarray(i, i + chunk));
        }
        productionTemplateB64 = btoa(b64);
        saveProductionTemplate();
        document.getElementById('production-template-fname').textContent = file.name;
        renderSkuColumnMapEditor();
        toast(`"${file.name}" 템플릿이 등록되었습니다`);
      };
      reader.readAsArrayBuffer(file);
    }
  );

  document.getElementById('tracking-apply-btn').addEventListener('click', ()=>{
    if(!uploadedTrackingData){ toast('먼저 파일을 업로드해주세요'); return; }
    const orderColIdx = letterToIndex(document.getElementById('tracking-orderno-col').value);
    const trackColIdx = letterToIndex(document.getElementById('tracking-trackingno-col').value);
    const startRow = parseInt(document.getElementById('tracking-start-row').value, 10) || 2;

    // build a queue per order number so that when one order was split into several boxes,
    // each box (in the order it was created) picks up the next tracking number for that order.
    // primary key is the vendor's own order number; rows where the vendor left that blank
    // fall back to matching on our internal 사내관리번호 instead.
    const rows = currentLineItems();
    const queueByOrderNo = {};
    rows
      .filter(r => r.orderNo && !r.trackingNo)
      .sort((a, b) => (a.boxIndex || 1) - (b.boxIndex || 1))
      .forEach(r=>{
        if(!queueByOrderNo[r.orderNo]) queueByOrderNo[r.orderNo] = [];
        queueByOrderNo[r.orderNo].push(r);
      });
    const queueByInternalNo = {};
    rows
      .filter(r => !r.orderNo && r.internalOrderNo && !r.trackingNo)
      .sort((a, b) => (a.boxIndex || 1) - (b.boxIndex || 1))
      .forEach(r=>{
        if(!queueByInternalNo[r.internalOrderNo]) queueByInternalNo[r.internalOrderNo] = [];
        queueByInternalNo[r.internalOrderNo].push(r);
      });

    let matched = 0, unmatched = 0;
    for(let r = startRow - 1; r < uploadedTrackingData.length; r++){
      const row = uploadedTrackingData[r] || [];
      const refNo = (row[orderColIdx] ?? '').toString().trim();
      const trackingNo = (row[trackColIdx] ?? '').toString().trim();
      if(!refNo || !trackingNo) continue;
      const queue = queueByOrderNo[refNo] || queueByInternalNo[refNo];
      if(queue && queue.length){
        queue.shift().trackingNo = trackingNo;
        matched++;
      } else {
        unmatched++;
      }
    }
    saveLineItems();
    renderThirdPartyLineItems();
    renderDeliveryCount();
    toast(`운송장번호 ${matched}건 매칭 완료${unmatched > 0 ? `, ${unmatched}건은 주문번호를 찾지 못함` : ''}`);
  });

  document.getElementById('export-btn').addEventListener('click', ()=>{
    const orders = currentOrders();
    const orderCompanies = Object.keys(orders);
    if(orderCompanies.length === 0){ toast('집계된 발주가 없습니다'); return; }
    const dateLabel = getDeliveryDateLabel() || currentDateKey;
    const header = ['업체명', '담당자', ...dict.map(d=>d.name), '합계'];
    const rows = orderCompanies.map(c=>{
      let total = 0;
      const vals = dict.map(d=>{ const v = Number(orders[c][d.id])||0; total += v; return v; });
      const enteredBy = (orders[c]._meta && orders[c]._meta.enteredBy) || '';
      return [c, enteredBy, ...vals, total];
    });
    const totalsRow = ['합계', '', ...dict.map(d=>{
      let t = 0; orderCompanies.forEach(c=>{ t += Number(orders[c][d.id])||0; }); return t;
    })];
    totalsRow.push(totalsRow.slice(2).reduce((a,b)=>a+b,0));

    const sheetRows = [[`납품일: ${dateLabel}`], header, ...rows, totalsRow];
    const ws = XLSX.utils.aoa_to_sheet(sheetRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '발주집계');
    const fname = `발주취합_${dateLabel.replace(/-/g,'')}.xlsx`;
    XLSX.writeFile(wb, fname);
    toast('엑셀 파일이 다운로드되었습니다');
  });

  document.getElementById('export-production-btn').addEventListener('click', ()=>{
    // If no template uploaded, fall back to the generated xlsx
    if(!productionTemplateB64){
      toast('생산본부 템플릿 파일이 등록되지 않았습니다. 위 "템플릿 관리"에서 원본 파일을 먼저 업로드해주세요.');
      return;
    }

    // Reconstruct the workbook from the stored base64
    const binaryStr = atob(productionTemplateB64);
    const bytes = new Uint8Array(binaryStr.length);
    for(let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
    const wb = XLSX.read(bytes, { type: 'array', cellStyles: true });
    const ws = wb.Sheets[wb.SheetNames[0]];

    const orders = currentOrders();
    const dateLabel = getDeliveryDateLabel() || currentDateKey;
    const dateCompact = dateLabel.replace(/-/g,'');
    const usage = currentRawMaterialUsage();
    const stock = currentPreviousStock();

    // helper: write a value to a cell (preserving existing style)
    const writeCell = (col, row, value)=>{
      const addr = `${col}${row}`;
      if(!ws[addr]) ws[addr] = {};
      ws[addr].v = value;
      ws[addr].t = typeof value === 'number' ? 'n' : 's';
      delete ws[addr].f; // remove any formula so our value takes effect
    };

    // helper: sum across all companies for one item
    const itemTotal = (itemId) => {
      let t = 0;
      Object.keys(orders).forEach(c=>{ if(c !== '_meta') t += Number(orders[c][itemId]) || 0; });
      return t;
    };

    // --- ROW 2: 납품일 ---
    writeCell('B', 2, dateLabel);

    // --- ROWS 5-9: 전일재고 (G열) ---
    // Mapping: G5=스테비아500, G6=망고향500, G7=자몽향500, G8=투래곤, G9=포도쉐킷
    // We'll match by SKU column map — find which items are in each expected column
    // and read their previous stock
    const colToItemId = {}; // colLetter -> itemId
    Object.entries(skuColumnMap).forEach(([itemId, col])=>{ colToItemId[col] = itemId; });

    // Restock row mappings in the original file (G5~G9 = 전일재고)
    const prevStockRows = [
      { gRow: 5, skuCols: ['J','M'] },   // 스테비아 500g (500g + 스티로폼)
      { gRow: 6, skuCols: ['K','N'] },   // 망고향 500g
      { gRow: 7, skuCols: ['L','O'] },   // 자몽향 500g
      { gRow: 8, skuCols: ['S'] },        // 투래곤후르츠
      { gRow: 9, skuCols: ['P','Q'] },   // 포도쉐킷
    ];
    prevStockRows.forEach(({ gRow, skuCols })=>{
      let stockTotal = 0;
      skuCols.forEach(col=>{
        const iid = colToItemId[col];
        if(iid) stockTotal += Number(stock.product[iid]) || 0;
      });
      if(stockTotal > 0) writeCell('G', gRow, stockTotal);
    });

    // --- Company rows: fill in quantities per company per SKU column ---
    // Build a lookup: company name → its row(s) in the sheet
    // Strategy: read all rows 15-93, find company names in the relevant columns by category
    const COMPANY_ROW_RULES = [
      // { cat, rows, nameCols } — nameCols tried in order to get company name for matching
      { cat: '편의점',   rows: [15,16,17,18], nameCols:['D'] },
      { cat: '도매',     rows: Array.from({length:24}, (_,i)=>i+21), nameCols:['F','E'] },
      { cat: '직거래',   rows: Array.from({length:8}, (_,i)=>i+45), nameCols:['C'] },
      { cat: 'SP',       rows: Array.from({length:15}, (_,i)=>i+55), nameCols:['F'] },
      { cat: '3PL(제이엠로지스)', rows:[72], nameCols:['B'] },
      { cat: '3PL(비티원)',       rows:[73], nameCols:['B'] },
      { cat: '개인구매', rows: Array.from({length:8}, (_,i)=>i+76), nameCols:['C'] },
      { cat: '샘플',     rows: Array.from({length:8}, (_,i)=>i+86), nameCols:['C','D'] },
    ];

    // Build a map: normalised company name → row index
    const companyRowMap = {}; // name.trim().toLowerCase() -> rowNum
    COMPANY_ROW_RULES.forEach(rule=>{
      rule.rows.forEach(rowNum=>{
        for(const nc of rule.nameCols){
          const cell = ws[`${nc}${rowNum}`];
          let v = cell && cell.v;
          // SP rows use VLOOKUP formulas — try the cached value first, else skip
          if(!v && cell && cell.f) v = null; // can't resolve formulas here
          if(v && typeof v === 'string'){
            const key = v.trim().toLowerCase();
            if(!companyRowMap[key]) companyRowMap[key] = [];
            companyRowMap[key].push({ rowNum, rule });
            break;
          }
        }
      });
    });

    // Fill in quantities
    Object.keys(orders).forEach(companyName=>{
      if(companyName === '_meta') return;
      const key = companyName.trim().toLowerCase();
      const targets = companyRowMap[key] || [];
      if(targets.length === 0) return; // company not found in template

      targets.forEach(({ rowNum })=>{
        dict.forEach(item=>{
          const col = skuColumnMap[item.id];
          if(!col) return;
          const qty = Number((orders[companyName] || {})[item.id]) || 0;
          if(qty > 0) writeCell(col, rowNum, qty);
        });
      });
    });

    // --- SP rows: also write the company name into F column for VLOOKUP ---
    // (If the user has SP companies registered, we try to put their name in F55-F69)
    const spCompanies = companies.filter(c=> c.category === 'SP' && orders[c.name]);
    const spRows = Array.from({length:15}, (_,i)=>i+55);
    spCompanies.forEach((c, idx)=>{
      if(idx >= spRows.length) return;
      const rowNum = spRows[idx];
      writeCell('F', rowNum, c.name);
      dict.forEach(item=>{
        const col = skuColumnMap[item.id];
        if(!col) return;
        const qty = Number((orders[c.name] || {})[item.id]) || 0;
        if(qty > 0) writeCell(col, rowNum, qty);
      });
    });

    // Update the ref range so XLSX knows the sheet dimensions haven't changed
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:AD120');
    ws['!ref'] = XLSX.utils.encode_range(range);

    XLSX.writeFile(wb, `투맛토_발주_${dateCompact}.xlsx`);
    toast('생산본부 공유파일이 다운로드되었습니다 (원본 양식 그대로)');
  });

  document.getElementById('tab-all-btn').addEventListener('click', ()=>{
    document.getElementById('tab-all-btn').classList.add('active');
    document.getElementById('tab-3pl-btn').classList.remove('active');
    document.getElementById('agg-table-wrap').style.display = 'block';
    document.getElementById('agg-3pl-wrap').style.display = 'none';
    document.getElementById('export-btn').style.display = 'inline-block';
    document.getElementById('export-3pl-btn').style.display = 'none';
  });

  document.getElementById('tab-3pl-btn').addEventListener('click', ()=>{
    document.getElementById('tab-3pl-btn').classList.add('active');
    document.getElementById('tab-all-btn').classList.remove('active');
    document.getElementById('agg-3pl-wrap').style.display = 'block';
    document.getElementById('agg-table-wrap').style.display = 'none';
    document.getElementById('export-3pl-btn').style.display = 'inline-block';
    document.getElementById('export-btn').style.display = 'none';
    renderDeliveryCount();
  });

  document.getElementById('refresh-delivery-count-btn').addEventListener('click', ()=>{
    renderDeliveryCount();
    toast('택배 건수 집계를 새로고침했습니다');
  });

  document.getElementById('export-delivery-count-btn').addEventListener('click', ()=>{
    const allRows = currentLineItems().filter(r=> r.trackingNo && r.trackingNo.trim());
    if(allRows.length === 0){ toast('운송장번호가 매칭된 주문이 없습니다'); return; }

    const dateLabel = getDeliveryDateLabel() || currentDateKey;
    const trackingSet = buildTrackingSetByCompany(allRows);
    const byCompany = {};
    Object.entries(trackingSet).forEach(([companyName, trackMap])=>{
      byCompany[companyName] = { '극소': 0, '소': 0, total: 0 };
      trackMap.forEach(({ size })=>{
        byCompany[companyName][size] = (byCompany[companyName][size] || 0) + 1;
        byCompany[companyName].total++;
      });
    });

    const header = ['업체명', '극소(1~4팩)', '소(5~8팩)', '합계 건수'];
    const dataRows = Object.entries(byCompany).sort(([a],[b])=>a.localeCompare(b))
      .map(([name, c])=>[name, c['극소']||0, c['소']||0, c.total]);
    const totals = ['합계',
      dataRows.reduce((s,r)=>s+r[1],0),
      dataRows.reduce((s,r)=>s+r[2],0),
      dataRows.reduce((s,r)=>s+r[3],0)
    ];

    const ws = XLSX.utils.aoa_to_sheet([[`납품일: ${dateLabel}`], header, ...dataRows, totals]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '택배건수집계');
    XLSX.writeFile(wb, `택배건수집계_${dateLabel.replace(/-/g,'')}.xlsx`);
    toast('택배 건수 엑셀이 다운로드되었습니다');
  });

  document.getElementById('export-3pl-btn').addEventListener('click', ()=>{
    const rows = currentLineItems();
    if(rows.length === 0){ toast('3PL 개별 주문 건이 없습니다'); return; }
    const dateLabel = getDeliveryDateLabel() || currentDateKey;
    const header = ['사내관리번호','업체명','담당자','업체 주문번호','받는사람 성명','받는사람 전화번호','배송지 주소','품목명','수량(팩)','박스','배송시 요청사항','운송장번호'];
    const dataRows = rows.map(r=>[
      r.internalOrderNo || '', r.company, r.enteredBy || '', r.orderNo, r.recipientName, r.recipientPhone, r.address,
      r.itemId ? itemNameById(r.itemId) : r.itemNameRaw, r.qty,
      (r.boxTotal && r.boxTotal > 1) ? `${r.boxIndex}/${r.boxTotal}` : '-',
      r.note, r.trackingNo
    ]);
    const sheetRows = [[`납품일: ${dateLabel}`], header, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '3PL출고리스트');

    // second sheet: item totals summary for packing prep
    const threePlNames = companies.filter(c=>c.isThirdParty).map(c=>c.name);
    const orders = currentOrders();
    const summaryHeader = ['업체명', '담당자', ...dict.map(d=>d.name), '합계'];
    const summaryRows = threePlNames.filter(n=>orders[n]).map(c=>{
      let total = 0;
      const vals = dict.map(d=>{ const v = Number(orders[c][d.id])||0; total += v; return v; });
      const enteredBy = (orders[c]._meta && orders[c]._meta.enteredBy) || '';
      return [c, enteredBy, ...vals, total];
    });
    if(summaryRows.length > 0){
      const ws2 = XLSX.utils.aoa_to_sheet([summaryHeader, ...summaryRows]);
      XLSX.utils.book_append_sheet(wb, ws2, '품목별합계');
    }

    const fname = `3PL출고집계_${dateLabel.replace(/-/g,'')}.xlsx`;
    XLSX.writeFile(wb, fname);
    toast('3PL 출고 집계 엑셀이 다운로드되었습니다');
  });

  document.getElementById('sender-name').addEventListener('change', saveSenderInfo);
  document.getElementById('sender-phone').addEventListener('change', saveSenderInfo);

  ['ecount-warehouse','ecount-trade-type','ecount-department','ecount-manager'].forEach(id=>{
    document.getElementById(id).addEventListener('change', saveEcountSettings);
  });

  document.getElementById('export-ecount-btn').addEventListener('click', ()=>{
    const orders = currentOrders();
    const dateLabel = getDeliveryDateLabel() || currentDateKey;
    const warehouse = document.getElementById('ecount-warehouse').value.trim();
    const tradeType = document.getElementById('ecount-trade-type').value.trim();
    const department = document.getElementById('ecount-department').value.trim();
    const manager = document.getElementById('ecount-manager').value.trim();

    if(!warehouse){ toast('출하창고를 입력해주세요'); return; }
    if(!tradeType){ toast('거래유형을 입력해주세요'); return; }

    // Pre-compute fee counts by company using TOTAL qty per tracking number
    const lineItems = currentLineItems();
    const feeItemsBySize = {};
    deliveryFeeItems.forEach(fi=>{ feeItemsBySize[fi.size] = fi; });
    const trackingSet = buildTrackingSetByCompany(lineItems.filter(r=> r.trackingNo && r.trackingNo.trim()));
    const feeCountByCompany = {};
    Object.entries(trackingSet).forEach(([companyName, trackMap])=>{
      feeCountByCompany[companyName] = {};
      trackMap.forEach(({ size })=>{
        feeCountByCompany[companyName][size] = (feeCountByCompany[companyName][size] || 0) + 1;
      });
    });

    const header = ['일자','순번','거래처코드','거래처명','담당자','출하창고','거래유형','프로젝트','통화','환율','부서','품목코드','품목명','규격','수량','단가','외화금액','공급가액','부가세','적요','생산전표생성','시리얼/로트'];
    const dataRows = [];
    let companySeq = 1;

    const orderCompanies = Object.keys(orders).filter(n=> n !== '_meta');
    orderCompanies.forEach(companyName=>{
      const companyObj = companies.find(c=>c.name===companyName);
      const companyCode = companyObj?.code || '';
      const priceMap = companyObj?.priceMap || {};
      const companyRows = [];

      // Product rows
      dict.forEach(item=>{
        const qtyPacks = Number(orders[companyName][item.id]) || 0;
        if(qtyPacks === 0) return;
        const boxUnitCount = Number(item.boxUnitCount) || 0;
        const ecountQty = boxUnitCount > 0 ? parseFloat((qtyPacks / boxUnitCount).toFixed(2)) : qtyPacks;
        const unitPrice = priceMap[item.id] ?? '';
        const supplyAmt = (unitPrice !== '' && ecountQty > 0) ? parseFloat((unitPrice * ecountQty).toFixed(0)) : '';
        companyRows.push([
          dateLabel, companySeq, companyCode, companyName, manager,
          warehouse, tradeType, '', '', '', department,
          item.code || '', item.name, '', ecountQty, unitPrice, '', supplyAmt, '',
          boxUnitCount > 0 ? `${qtyPacks}팩` : '', '', ''
        ]);
      });

      // Fee rows for this company (immediately after its product rows)
      const feeCounts = feeCountByCompany[companyName] || {};
      Object.entries(feeCounts).forEach(([size, count])=>{
        const fi = feeItemsBySize[size];
        if(!fi || !fi.name) return;
        const unitPrice = fi.price !== '' ? fi.price : '';
        const supplyAmt = (unitPrice !== '' && count > 0) ? unitPrice * count : '';
        companyRows.push([
          dateLabel, companySeq, companyCode, companyName, manager,
          warehouse, tradeType, '', '', '', department,
          fi.code || '', fi.name, '', count, unitPrice, '', supplyAmt, '',
          `택배비(${size})`, '', ''
        ]);
      });

      if(companyRows.length > 0){
        dataRows.push(...companyRows);
        companySeq++;
      }
    });

    if(dataRows.length === 0){ toast('집계된 발주가 없습니다'); return; }

    const ws = XLSX.utils.aoa_to_sheet([header, ...dataRows]);
    // Column widths
    ws['!cols'] = header.map((h,i)=>{
      if(['일자','거래유형','통화','환율','부서','순번'].includes(h)) return { wch: 8 };
      if(['품목명','거래처명'].includes(h)) return { wch: 18 };
      return { wch: 12 };
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '판매입력');
    XLSX.writeFile(wb, `이카운트_판매입력_${dateLabel.replace(/-/g,'')}.xlsx`);
    toast('이카운트 판매입력 엑셀이 다운로드되었습니다');
  });



  // 업체 원본 양식 그대로 + 운송장번호만 채워서 그 업체에 회신할 파일
  document.getElementById('export-original-format-btn').addEventListener('click', ()=>{
    const companyName = document.getElementById('original-file-company-select').value;
    if(!companyName){ toast('원본 파일이 있는 업체를 선택해주세요'); return; }
    let origEntry = currentOriginalFiles()[companyName];
    if(!origEntry){ toast('해당 업체의 원본 업로드 파일을 찾을 수 없습니다'); return; }

    // normalise: may be a single object (legacy) or array of batches
    const batches = Array.isArray(origEntry) ? origEntry : [origEntry];

    const trackingColRaw = (document.getElementById('original-tracking-col').value || '').trim().toUpperCase();

    // Produce one output file per batch (if multiple uploads, create a zip-like multi-sheet wb)
    const wb = XLSX.utils.book_new();
    const rows = currentLineItems().filter(r=>r.company===companyName);

    batches.forEach((batch, batchIdx)=>{
      // Build tracking map keyed by (batchId+rowIndex) or rowIndex for legacy entries
      const trackingByRowIdx = {};
      rows.forEach(r=>{
        // Match by batchId if available, else by sourceRowIndex alone
        const matchesBatch = batch.batchId
          ? r.sourceBatchId === batch.batchId
          : batchIdx === 0; // legacy: assume single batch
        if(!matchesBatch) return;
        if(r.sourceRowIndex == null) return;
        if(!trackingByRowIdx[r.sourceRowIndex]) trackingByRowIdx[r.sourceRowIndex] = [];
        if(r.trackingNo) trackingByRowIdx[r.sourceRowIndex].push(r.trackingNo);
      });

      const aoa = batch.aoa;
      const startRow = batch.startRow;

      let outRows;
      if(trackingColRaw){
        // Mode 1: insert value into a specific existing column
        const colIdx = letterToIndex(trackingColRaw);
        outRows = aoa.map((row, idx)=>{
          const newRow = row.slice();
          if(idx >= startRow - 1){
            // ensure the array is long enough
            while(newRow.length <= colIdx) newRow.push('');
            newRow[colIdx] = (trackingByRowIdx[idx] || []).join(' / ');
          }
          return newRow;
        });
      } else {
        // Mode 2 (fallback): append tracking number as new last column
        const headerRowIdx = startRow - 2;
        outRows = aoa.map((row, idx)=>{
          const newRow = row.slice();
          if(idx === headerRowIdx) newRow.push('운송장번호');
          else if(idx >= startRow - 1) newRow.push((trackingByRowIdx[idx] || []).join(' / '));
          return newRow;
        });
      }

      const ws = XLSX.utils.aoa_to_sheet(outRows);
      const sheetName = batches.length > 1 ? `운송장반영_${batchIdx+1}` : '운송장반영';
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    const dateLabel = (getDeliveryDateLabel() || currentDateKey).replace(/-/g,'');
    XLSX.writeFile(wb, `${companyName}_운송장반영_${dateLabel}.xlsx`);
    toast(`${companyName} 원본 양식 + 운송장번호 파일이 다운로드되었습니다`);
  });

  // 첨부해주신 제이엠로지스 발주서 양식 그대로, 오늘 3PL 전체 개별 주문을 담아 .xls로 다운로드
  document.getElementById('export-courier-form-btn').addEventListener('click', ()=>{
    const rows = currentLineItems();
    if(rows.length === 0){ toast('3PL 개별 주문 건이 없습니다'); return; }
    const senderName = document.getElementById('sender-name').value.trim();
    const senderPhone = document.getElementById('sender-phone').value.trim();

    const header = ['예약구분','집하예정일','보내는분성명','보내는분전화번호','받는사람','주문자 연락처','수취인 연락처','받는분우편번호','주소','배송메세지1','운송장번호','고객주문번호','상품명(약자)','수량','판매처'];
    const dataRows = rows.map(r=>{
      const itemName = r.itemId ? (dict.find(d=>d.id===r.itemId)?.shortName || itemNameById(r.itemId)) : r.itemNameRaw;
      const customerOrderNo = r.orderNo || r.internalOrderNo; // 업체 번호 우선, 없으면 사내관리번호로 대체 (양식 요구사항: 꼭 채워야 함)
      return [
        '', '', senderName, senderPhone, r.recipientName, r.recipientPhone, r.recipientPhone,
        '', r.address, r.note, r.trackingNo || '', customerOrderNo, itemName, r.qty, r.company
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([header, ...dataRows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet');
    const dateLabel = (getDeliveryDateLabel() || currentDateKey).replace(/-/g,'');
    XLSX.writeFile(wb, `제이엠로지스_발주서_${dateLabel}.xls`);
    toast('택배사 발주서(.xls)가 다운로드되었습니다');
  });

  armConfirmButton(
    document.getElementById('agg-bulk-delete-btn'),
    ()=>{
      const checked = Array.from(document.querySelectorAll('.agg-row-check:checked'));
      const orders = currentOrders();
      checked.forEach(cb=>{ delete orders[cb.dataset.company]; });
      saveOrdersByDate();
      renderAggTable();
      renderThirdPartyAggTable();
      toast(`${checked.length}개 항목을 삭제했습니다`);
    },
    ()=>{
      const checked = document.querySelectorAll('.agg-row-check:checked');
      if(checked.length === 0){ toast('삭제할 항목을 먼저 체크해주세요'); return false; }
      return true;
    }
  );

  armConfirmButton(
    document.getElementById('detail-bulk-delete-btn'),
    ()=>{
      const checked = Array.from(document.querySelectorAll('.detail-row-check:checked'));
      const idsToDelete = new Set(checked.map(cb=>cb.dataset.id));
      const bucket = currentLineItems();
      const orders = currentOrders();
      bucket.forEach(r=>{
        if(idsToDelete.has(r.id) && r.itemId && orders[r.company]){
          orders[r.company][r.itemId] = (orders[r.company][r.itemId] || 0) - r.qty;
        }
      });
      thirdPartyLineItems[currentDateKey] = bucket.filter(r=>!idsToDelete.has(r.id));
      saveOrdersByDate();
      saveLineItems();
      renderAggTable();
      renderThirdPartyAggTable();
      renderThirdPartyLineItems();
      toast(`${checked.length}건을 삭제했습니다`);
    },
    ()=>{
      const checked = document.querySelectorAll('.detail-row-check:checked');
      if(checked.length === 0){ toast('삭제할 항목을 먼저 체크해주세요'); return false; }
      return true;
    }
  );

  armConfirmButton(document.getElementById('reset-all-btn'), ()=>{
    ordersByDate[currentDateKey] = {};
    thirdPartyLineItems[currentDateKey] = [];
    saveOrdersByDate();
    saveLineItems();
    renderAggTable();
    renderThirdPartyAggTable();
    renderThirdPartyLineItems();
    renderSavedDatesBar();
    toast('초기화되었습니다');
  });

  // manual qty editor
  function renderManualQtyEditor(){
    const wrap = document.getElementById('manual-qty-editor');
    if(!wrap) return;
    wrap.innerHTML = '';
    if(dict.length === 0){ wrap.innerHTML = '<div class="empty" style="padding:6px 0;">SKU 관리에 품목이 없습니다.</div>'; return; }
    dict.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'dict-row';
      const lbl = document.createElement('div');
      lbl.style.flex = '0 0 200px'; lbl.style.fontSize = '13px';
      lbl.textContent = item.name;
      row.appendChild(lbl);
      const inp = document.createElement('input');
      inp.type = 'number'; inp.min = '0'; inp.placeholder = '수량(팩)';
      inp.style.width = '90px'; inp.id = `manual-qty-${item.id}`;
      row.appendChild(inp);
      wrap.appendChild(row);
    });
  }
  renderManualQtyEditor();

  document.getElementById('manual-add-btn').addEventListener('click', ()=>{
    const y = document.getElementById('manual-year').value;
    const m = document.getElementById('manual-month').value;
    const d = document.getElementById('manual-day').value;
    const company = document.getElementById('manual-company').value.trim();
    if(!y||!m||!d){ toast('날짜를 모두 입력해주세요'); return; }
    if(!company){ toast('업체명을 입력해주세요'); return; }
    const dateKey = `${y}-${pad2(m)}-${pad2(d)}`;
    if(!ordersByDate[dateKey]) ordersByDate[dateKey] = {};
    if(!ordersByDate[dateKey][company]) ordersByDate[dateKey][company] = {};
    let added = false;
    dict.forEach(item=>{
      const el = document.getElementById(`manual-qty-${item.id}`);
      const v = parseFloat(el?.value||'');
      if(!isNaN(v) && v > 0){
        ordersByDate[dateKey][company][item.id] = (ordersByDate[dateKey][company][item.id]||0) + v;
        added = true;
        if(el) el.value = '';
      }
    });
    if(!added){ toast('수량을 하나 이상 입력해주세요'); return; }
    saveOrdersByDate();
    renderSavedDatesBar();
    toast(`${dateKey} / ${company} 데이터가 추가됐습니다`);
  });

  document.getElementById('monthly-view-btn').addEventListener('click', ()=>{
    const year = document.getElementById('monthly-year').value;
    const month = document.getElementById('monthly-month').value;
    if(!year || !month){ toast('연도와 월을 입력해주세요'); return; }
    const monthKey = `${year}-${pad2(month)}`;
    const matchingDates = Object.keys(ordersByDate).filter(k=>k.startsWith(monthKey)).sort();
    const wrap = document.getElementById('monthly-summary-wrap');
    wrap.innerHTML = '';

    if(matchingDates.length === 0){
      wrap.innerHTML = `<div class="empty">${monthKey}에 저장된 발주 데이터가 없습니다.</div>`;
      document.getElementById('monthly-export-btn').style.display = 'none';
      return;
    }

    // 1. 일자별 상세
    const sec1 = document.createElement('div');
    sec1.style.overflowX = 'auto';
    const h1 = document.createElement('div');
    h1.style.fontWeight = '700'; h1.style.fontSize = '13px'; h1.style.marginBottom = '6px';
    h1.textContent = '▸ 일자별 품목/수량';
    sec1.appendChild(h1);
    const dt = document.createElement('table');
    dt.innerHTML = '<thead><tr><th class="name-cell">날짜</th><th class="name-cell">업체명</th>' +
      dict.map(d=>`<th>${escapeHtml(d.name)}</th>`).join('') +
      '<th class="totals-col">합계</th></tr></thead>';
    const dtbody = document.createElement('tbody');
    const merged = {};
    matchingDates.forEach(dateKey=>{
      const bucket = ordersByDate[dateKey];
      Object.keys(bucket).filter(c=>c!=='_meta').forEach(company=>{
        let rowTotal = 0;
        let tr = `<tr><td class="name-cell">${dateKey}</td><td class="name-cell">${escapeHtml(company)}</td>`;
        dict.forEach(d=>{
          const v = Number(bucket[company][d.id])||0;
          rowTotal += v;
          tr += `<td>${v||''}</td>`;
          if(!merged[company]) merged[company] = {};
          merged[company][d.id] = (merged[company][d.id]||0) + v;
        });
        tr += `<td class="totals-col">${rowTotal||''}</td></tr>`;
        dtbody.innerHTML += tr;
      });
    });
    dt.appendChild(dtbody);
    sec1.appendChild(dt);
    wrap.appendChild(sec1);

    // 2. 월간 합계
    const sec2 = document.createElement('div');
    sec2.style.marginTop = '16px'; sec2.style.overflowX = 'auto';
    const h2 = document.createElement('div');
    h2.style.fontWeight = '700'; h2.style.fontSize = '13px'; h2.style.marginBottom = '6px';
    h2.textContent = `▸ ${monthKey} 월간 합계`;
    sec2.appendChild(h2);
    const sumTable = buildReadonlyAggTable(merged, '월간 합계');
    if(sumTable) sec2.appendChild(sumTable);
    wrap.appendChild(sec2);

    // 3. 월간 택배 건수 (운송장번호 기준)
    const sec3 = document.createElement('div');
    sec3.style.marginTop = '16px';
    const h3el = document.createElement('div');
    h3el.style.fontWeight = '700'; h3el.style.fontSize = '13px'; h3el.style.marginBottom = '6px';
    h3el.textContent = '▸ 월간 택배 건수 (운송장번호 기준)';
    sec3.appendChild(h3el);
    const monthLineItems = Object.entries(thirdPartyLineItems)
      .filter(([k])=>k.startsWith(monthKey)).flatMap(([,rows])=>rows);
    const mTrackingSet = buildTrackingSetByCompany(monthLineItems.filter(r=>r.trackingNo&&r.trackingNo.trim()));
    if(Object.keys(mTrackingSet).length > 0){
      const ft = document.createElement('table');
      ft.innerHTML = '<thead><tr><th class="name-cell">업체명</th><th>극소(1~4팩)</th><th>소(5~8팩)</th><th class="totals-col">합계</th></tr></thead>';
      const ftb = document.createElement('tbody');
      let gXS=0,gS=0;
      Object.entries(mTrackingSet).sort(([a],[b])=>a.localeCompare(b)).forEach(([name,tmap])=>{
        let xs=0,s=0;
        tmap.forEach(({size})=>{ if(size==='극소') xs++; else s++; });
        gXS+=xs; gS+=s;
        ftb.innerHTML += `<tr><td class="name-cell">${escapeHtml(name)}</td><td>${xs}</td><td>${s}</td><td class="totals-col">${xs+s}</td></tr>`;
      });
      ftb.innerHTML += `<tr><td class="name-cell totals-col">합계</td><td class="totals-col">${gXS}</td><td class="totals-col">${gS}</td><td class="totals-col">${gXS+gS}</td></tr>`;
      ft.appendChild(ftb);
      sec3.appendChild(ft);
    } else {
      sec3.innerHTML += '<div class="empty">이 달의 운송장번호 매칭 데이터가 없습니다.</div>';
    }
    wrap.appendChild(sec3);

    document.getElementById('monthly-export-btn').style.display = 'inline-block';
    document.getElementById('monthly-export-btn')._data = { monthKey, merged, matchingDates, mTrackingSet };
  });

  document.getElementById('monthly-export-btn').addEventListener('click', (e)=>{
    const data = e.target._data;
    if(!data) return;
    const { monthKey, merged, matchingDates, mTrackingSet } = data;
    const wb = XLSX.utils.book_new();

    // Sheet 1: 월간 합계
    const companyNames = Object.keys(merged);
    const hdr = ['업체명', ...dict.map(d=>d.name), '합계'];
    const sRows = companyNames.map(c=>{
      let t=0; const vals = dict.map(d=>{ const v=Number(merged[c][d.id])||0; t+=v; return v; });
      return [c,...vals,t];
    });
    const totRow = ['합계',...dict.map(d=>{ let t=0; companyNames.forEach(c=>{ t+=Number(merged[c][d.id])||0; }); return t; })];
    totRow.push(totRow.slice(1).reduce((a,b)=>a+b,0));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([hdr,...sRows,totRow]), '월간합계');

    // Sheet 2: 일자별 상세
    const dHdr = ['날짜','업체명',...dict.map(d=>d.name),'합계'];
    const dRows = [];
    matchingDates.forEach(dateKey=>{
      const bucket = ordersByDate[dateKey];
      Object.keys(bucket).filter(c=>c!=='_meta').forEach(company=>{
        let rowTotal=0;
        const vals = dict.map(d=>{ const v=Number(bucket[company][d.id])||0; rowTotal+=v; return v; });
        dRows.push([dateKey,company,...vals,rowTotal]);
      });
    });
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([dHdr,...dRows]), '일자별상세');

    // Sheet 3: 택배 건수
    if(Object.keys(mTrackingSet).length > 0){
      const fHdr = ['업체명','극소(1~4팩)','소(5~8팩)','합계'];
      const fRows = Object.entries(mTrackingSet).sort(([a],[b])=>a.localeCompare(b)).map(([name,tmap])=>{
        let xs=0,s=0; tmap.forEach(({size})=>{ if(size==='극소') xs++; else s++; });
        return [name,xs,s,xs+s];
      });
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([fHdr,...fRows]), '택배건수');
    }

    XLSX.writeFile(wb, `월간누적집계_${monthKey.replace('-','')}.xlsx`);
    toast('월간 누적 엑셀이 다운로드되었습니다');
  });

  // -------- 데이터 백업 / 복원 --------
  document.getElementById('backup-btn').addEventListener('click', async ()=>{
    const backup = {
      _version: 2,
      _exportedAt: new Date().toISOString(),
      dict,
      companies,
      companyCategories,
      ordersByDate,
      thirdPartyLineItems,
      previousStock,
      rawMaterials,
      rawMaterialUsage,
      internalOrderCounters,
      deliveryFeeItems,
      skuColumnMap,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
    a.href = url;
    a.download = `다름달음_발주취합_백업_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('백업 파일이 다운로드되었습니다');
  });

  let pendingRestoreData = null;

  setupDropzone(
    document.getElementById('restore-dropzone'),
    document.getElementById('restore-file-input'),
    (file)=>{
      const reader = new FileReader();
      reader.onload = (evt)=>{
        try{
          const data = JSON.parse(evt.target.result);
          if(!data._version){ toast('올바른 백업 파일이 아닙니다'); return; }
          pendingRestoreData = data;
          document.getElementById('restore-fname').textContent = file.name;
          // Show summary
          const dateKeys = Object.keys(data.ordersByDate || {});
          const companyCount = (data.companies || []).length;
          const skuCount = (data.dict || []).length;
          const lineItemCount = Object.values(data.thirdPartyLineItems || {}).reduce((s,a)=>s+a.length, 0);
          document.getElementById('restore-summary').innerHTML =
            `<b>백업 내용:</b> 거래처 ${companyCount}개 · SKU ${skuCount}개 · 발주일자 ${dateKeys.length}일치 · 3PL 주문 ${lineItemCount}건<br>` +
            `<span style="color:var(--warn)">⚠ 복원하면 현재 저장된 모든 데이터가 이 백업으로 교체됩니다.</span>`;
          document.getElementById('restore-preview').style.display = 'block';
        }catch(e){
          toast('파일을 읽을 수 없습니다. 올바른 JSON 백업 파일인지 확인해주세요');
        }
      };
      reader.readAsText(file);
    }
  );

  document.getElementById('restore-cancel-btn').addEventListener('click', ()=>{
    pendingRestoreData = null;
    document.getElementById('restore-preview').style.display = 'none';
    document.getElementById('restore-fname').textContent = '';
  });

  document.getElementById('restore-confirm-btn').addEventListener('click', async ()=>{
    if(!pendingRestoreData){ toast('복원할 데이터가 없습니다'); return; }
    const data = pendingRestoreData;

    // Restore all state
    if(data.dict) dict = data.dict;
    if(data.companies) companies = data.companies.map(c=> typeof c === 'string' ? { name:c, isThirdParty:false, code:'', category:'', region:'', listedMarketName:'' } : c);
    if(data.companyCategories) companyCategories = data.companyCategories;
    if(data.ordersByDate) ordersByDate = data.ordersByDate;
    if(data.thirdPartyLineItems) thirdPartyLineItems = data.thirdPartyLineItems;
    if(data.previousStock) previousStock = data.previousStock;
    if(data.rawMaterials) rawMaterials = data.rawMaterials;
    if(data.rawMaterialUsage) rawMaterialUsage = data.rawMaterialUsage;
    if(data.internalOrderCounters) internalOrderCounters = data.internalOrderCounters;
    if(data.deliveryFeeItems) deliveryFeeItems = data.deliveryFeeItems;
    if(data.skuColumnMap) skuColumnMap = data.skuColumnMap;

    // Persist everything
    await Promise.allSettled([
      saveDict(),
      saveCompanies(),
      saveCompanyCategories(),
      saveOrdersByDate(),
      saveLineItems(),
      savePreviousStock(),
      saveRawMaterials(),
      saveRawMaterialUsage(),
      saveInternalOrderCounters(),
      saveDeliveryFeeItems(),
      saveSkuColumnMap(),
    ]);

    // Re-render everything
    currentDateKey = computeCurrentDateKey();
    renderDict();
    renderCategoryEditor();
    renderCompanyManager();
    renderSkuColumnMapEditor();
    renderPriceMapEditor();
    renderDeliveryFeeEditor();
    renderAggTable();
    renderThirdPartyAggTable();
    renderThirdPartyLineItems();
    renderSavedDatesBar();
    updateCurrentDateBadge();
    renderRawStockEditor();
    renderProductStockEditor();
    renderOriginalFileSelect();

    pendingRestoreData = null;
    document.getElementById('restore-preview').style.display = 'none';
    document.getElementById('restore-fname').textContent = '';
    toast('✓ 데이터 복원이 완료되었습니다');
  });

  // ── 로그인 이벤트 ──
  async function doLogin(){
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-btn');
    if(!username || !password){ errEl.textContent='아이디와 비밀번호를 입력해주세요'; errEl.style.display='block'; return; }
    btn.disabled = true; btn.textContent = '로그인 중...';
    errEl.style.display = 'none';
    try{
      await login(username, password);
      showApp();
      await loadState();
    }catch(e){
      errEl.textContent = e.message;
      errEl.style.display = 'block';
      btn.disabled = false; btn.textContent = '로그인';
    }
  }
  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('login-password').addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });

  // ── 관리자 탭 ──
  document.getElementById('admin-tab-btn').addEventListener('click', ()=>{
    document.getElementById('admin-tab-btn').classList.add('active');
    document.getElementById('tab-all-btn').classList.remove('active');
    document.getElementById('tab-3pl-btn').classList.remove('active');
    document.getElementById('agg-table-wrap').style.display = 'none';
    document.getElementById('agg-3pl-wrap').style.display = 'none';
    document.getElementById('agg-bulk-bar').style.display = 'none';
    document.getElementById('export-btn').style.display = 'none';
    document.getElementById('export-3pl-btn').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadAdminLog();
    loadAdminUsers();
  });
  document.getElementById('tab-all-btn').addEventListener('click', ()=>{
    document.getElementById('admin-panel').style.display = 'none';
  });
  document.getElementById('tab-3pl-btn').addEventListener('click', ()=>{
    document.getElementById('admin-panel').style.display = 'none';
  });

  function showAdminSection(sec){
    document.getElementById('admin-section-log').style.display = sec==='log' ? 'block' : 'none';
    document.getElementById('admin-section-users').style.display = sec==='users' ? 'block' : 'none';
  }

  async function loadAdminLog(){
    const wrap = document.getElementById('admin-log-wrap');
    wrap.innerHTML = '<div class="empty">로그 불러오는 중...</div>';
    try{
      const rows = await sbQuery('activity_log', '?order=created_at.desc&limit=200');
      if(!rows.length){ wrap.innerHTML='<div class="empty">로그가 없습니다.</div>'; return; }
      const table = document.createElement('table');
      table.innerHTML = `<thead><tr><th>시간</th><th>아이디</th><th>이름</th><th>액션</th><th>상세</th></tr></thead>`;
      const tbody = document.createElement('tbody');
      rows.forEach(r=>{
        const tr = document.createElement('tr');
        const dt = new Date(r.created_at).toLocaleString('ko-KR');
        tr.innerHTML = `<td style="white-space:nowrap;font-size:12px;">${dt}</td><td>${escapeHtml(r.username||'')}</td><td>${escapeHtml(r.display_name||'')}</td><td>${escapeHtml(r.action||'')}</td><td class="name-cell" style="font-size:12px;">${escapeHtml(r.detail||'')}</td>`;
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      wrap.innerHTML = '';
      wrap.appendChild(table);
    }catch(e){ wrap.innerHTML=`<div class="empty">로드 실패: ${e.message}</div>`; }
  }

  async function loadAdminUsers(){
    const wrap = document.getElementById('admin-users-wrap');
    const sel = document.getElementById('pw-change-user-select');
    wrap.innerHTML = ''; sel.innerHTML = '';
    try{
      const rows = await sbQuery('users', '?order=created_at.asc');
      const table = document.createElement('table');
      table.innerHTML = `<thead><tr><th>아이디</th><th>이름</th><th>역할</th><th>상태</th><th>생성일</th><th></th></tr></thead>`;
      const tbody = document.createElement('tbody');
      rows.forEach(u=>{
        const tr = document.createElement('tr');
        const dt = new Date(u.created_at).toLocaleDateString('ko-KR');
        tr.innerHTML = `<td>${escapeHtml(u.username)}</td><td>${escapeHtml(u.display_name)}</td><td>${u.role==='admin'?'관리자':'직원'}</td><td>${u.is_active?'✅ 활성':'🔴 비활성'}</td><td>${dt}</td><td></td>`;
        const toggleBtn = document.createElement('button');
        toggleBtn.className = u.is_active ? 'btn-danger small-btn' : 'btn-ghost small-btn';
        toggleBtn.textContent = u.is_active ? '비활성화' : '활성화';
        toggleBtn.addEventListener('click', async ()=>{
          if(u.id === window.currentUser?.id){ toast('자기 자신은 변경할 수 없습니다'); return; }
          await fetch(`${SB_URL}/rest/v1/users?id=eq.${u.id}`, {
            method:'PATCH', headers: sbHeaders, body: JSON.stringify({ is_active: !u.is_active })
          });
          await writeLog('user_toggle', `${u.username} ${u.is_active?'비활성화':'활성화'}`);
          loadAdminUsers();
        });
        tr.lastElementChild.appendChild(toggleBtn);
        tbody.appendChild(tr);
        const opt = document.createElement('option');
        opt.value = u.id; opt.textContent = `${u.username} (${u.display_name})`;
        sel.appendChild(opt);
      });
      table.appendChild(tbody);
      wrap.appendChild(table);
    }catch(e){ wrap.innerHTML=`<div class="empty">로드 실패: ${e.message}</div>`; }
  }

  document.getElementById('admin-refresh-log-btn').addEventListener('click', loadAdminLog);

  document.getElementById('admin-export-log-btn').addEventListener('click', async ()=>{
    try{
      const rows = await sbQuery('activity_log', '?order=created_at.desc&limit=1000');
      const header = ['시간','아이디','이름','액션','상세'];
      const data = rows.map(r=>[new Date(r.created_at).toLocaleString('ko-KR'), r.username||'', r.display_name||'', r.action||'', r.detail||'']);
      const ws = XLSX.utils.aoa_to_sheet([header,...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '활동로그');
      XLSX.writeFile(wb, `활동로그_${new Date().toISOString().slice(0,10)}.xlsx`);
    }catch(e){ toast('로그 다운로드 실패: '+e.message); }
  });

  document.getElementById('admin-add-user-btn').addEventListener('click', async ()=>{
    const username = document.getElementById('new-user-username').value.trim();
    const display = document.getElementById('new-user-display').value.trim();
    const pw = document.getElementById('new-user-pw').value;
    const role = document.getElementById('new-user-role').value;
    if(!username||!display||!pw){ toast('모든 항목을 입력해주세요'); return; }
    try{
      const hash = await hashPassword(pw);
      await sbInsert('users', { username, display_name: display, password_hash: hash, role, is_active: true });
      await writeLog('user_create', `신규 사용자 생성: ${username} (${display})`);
      ['new-user-username','new-user-display','new-user-pw'].forEach(id=>{ document.getElementById(id).value=''; });
      loadAdminUsers();
      toast(`${display}(${username}) 계정이 생성되었습니다`);
    }catch(e){ toast('생성 실패: '+e.message); }
  });

  document.getElementById('admin-change-pw-btn').addEventListener('click', async ()=>{
    const userId = document.getElementById('pw-change-user-select').value;
    const newPw = document.getElementById('pw-change-new').value;
    if(!userId||!newPw){ toast('사용자와 새 비밀번호를 입력해주세요'); return; }
    try{
      const hash = await hashPassword(newPw);
      await fetch(`${SB_URL}/rest/v1/users?id=eq.${userId}`, {
        method:'PATCH', headers: sbHeaders, body: JSON.stringify({ password_hash: hash })
      });
      const users = await sbQuery('users', `?id=eq.${userId}&limit=1`);
      await writeLog('pw_change', `비밀번호 변경: ${users[0]?.username}`);
      document.getElementById('pw-change-new').value='';
      toast('비밀번호가 변경되었습니다');
    }catch(e){ toast('변경 실패: '+e.message); }
  });

  // ── 로그 기록 포인트 연동 ──
  // confirm-btn (발주 확정), upload-apply-btn (업로드) 등에 로그 추가
  const _origLoadState = loadState;

  // ── 앱 시작: 세션 복원 또는 로그인 화면 ──
  (async ()=>{
    try{
      const ok = await restoreSession();
      if(ok){
        showApp();
        await loadState();
      } else {
        showLoginScreen();
      }
    }catch(e){
      console.error('세션 복원 실패:', e);
      showLoginScreen();
    }
  })();

})();
</script>
</body>
</html>
