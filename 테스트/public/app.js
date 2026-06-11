(function () {
  const statusLabels = {
    DRAFT: "임시저장",
    PRECHECK: "사전점검",
    REVIEW_REQUIRED: "검토 필요",
    CONTRACT_REVIEW: "계약부서 검토",
    REVISION: "보완 요청",
    REVIEW_DONE: "검토 완료",
    SIGNING: "체결 준비",
    IN_PROGRESS: "이행 중",
    INSPECTION_REQUEST: "검사 요청",
    INSPECTION_DONE: "검사 완료",
    PAYMENT_READY: "지급 준비",
    PAYMENT_DONE: "지급 완료",
    WARRANTY: "하자관리",
    CLOSED: "계약 종료"
  };

  const roles = {
    ROLE_BIZ: "사업부서",
    ROLE_CONTRACT: "계약 담당자",
    ROLE_AUDIT: "감사 담당자",
    ROLE_FINANCE: "재무 담당자",
    ROLE_LEGAL: "법무 담당자",
    ROLE_INFOSEC: "정보보안",
    ROLE_ADMIN: "관리자",
    ROLE_EXEC: "부서장"
  };

  const users = [
    { id: "u-biz", name: "김사업", dept: "DX사업팀", role: "ROLE_BIZ" },
    { id: "u-contract", name: "박계약", dept: "계약부", role: "ROLE_CONTRACT" },
    { id: "u-audit", name: "이감사", dept: "감사실", role: "ROLE_AUDIT" },
    { id: "u-finance", name: "최재무", dept: "재무회계팀", role: "ROLE_FINANCE" },
    { id: "u-legal", name: "정법무", dept: "법무팀", role: "ROLE_LEGAL" },
    { id: "u-sec", name: "한보안", dept: "정보보안팀", role: "ROLE_INFOSEC" },
    { id: "u-admin", name: "오관리", dept: "정보화부", role: "ROLE_ADMIN" },
    { id: "u-exec", name: "문부장", dept: "경영기획실", role: "ROLE_EXEC" }
  ];

  const state = {
    currentUserId: "u-biz",
    activeContractId: "C-2026-001",
    autosaveAt: null,
    toasts: [],
    lastSearch: null,
    contracts: [
      {
        id: "C-2026-001",
        title: "정보화용역 보안관제 고도화",
        department: "DX사업팀",
        owner: "u-biz",
        type: "정보화용역",
        subtype: "정보시스템 운영",
        estimatedPrice: 180000000,
        vatIncluded: true,
        startDate: "2026-07-01",
        endDate: "2026-12-31",
        dueDate: "2026-11-30",
        urgent: false,
        specificVendor: false,
        privacy: true,
        security: true,
        externalAccess: true,
        status: "CONTRACT_REVIEW",
        methodCandidate: "제한경쟁 검토",
        methodFinal: "",
        risk: "warn",
        documents: [
          { name: "계약 의뢰서", required: true, uploaded: true, version: "2026.1" },
          { name: "보안 검토서", required: true, uploaded: false, version: "2026.1" },
          { name: "개인정보 처리 점검표", required: true, uploaded: true, version: "2025.2" }
        ],
        schedule: [
          { name: "착수계 확인", date: "2026-07-04", owner: "사업부서", status: "예정" },
          { name: "납품 준비", date: "2026-11-16", owner: "사업부서", status: "예정" }
        ],
        history: [
          { at: "2026-06-11 09:20", user: "김사업", action: "계약 생성", note: "정보화용역 선택" },
          { at: "2026-06-11 09:28", user: "김사업", action: "사전점검", note: "보안·개인정보 검토 필요" },
          { at: "2026-06-11 09:40", user: "김사업", action: "검토 요청", note: "계약부 검토함 등록" }
        ]
      },
      {
        id: "C-2026-002",
        title: "교육장 기자재 구매",
        department: "인재개발팀",
        owner: "u-biz",
        type: "물품",
        subtype: "일반 물품",
        estimatedPrice: 42000000,
        vatIncluded: true,
        startDate: "2026-08-01",
        endDate: "2026-09-15",
        dueDate: "2026-09-10",
        urgent: true,
        urgentReason: "교육 개강 일정 확정",
        specificVendor: false,
        privacy: false,
        security: false,
        status: "PRECHECK",
        methodCandidate: "일반경쟁 우선 검토",
        methodFinal: "",
        risk: "good",
        documents: [
          { name: "계약 의뢰서", required: true, uploaded: true, version: "2026.1" },
          { name: "규격서", required: true, uploaded: false, version: "2026.1" }
        ],
        schedule: [],
        history: [{ at: "2026-06-10 14:12", user: "김사업", action: "자동 저장", note: "물품 계약 기본정보 입력" }]
      },
      {
        id: "C-2026-003",
        title: "시설 유지관리 일반용역",
        department: "시설관리팀",
        owner: "u-contract",
        type: "일반용역",
        subtype: "시설 유지관리",
        estimatedPrice: 95000000,
        vatIncluded: true,
        startDate: "2026-07-15",
        endDate: "2027-07-14",
        dueDate: "2027-07-14",
        urgent: false,
        specificVendor: true,
        specificReason: "기존 장비 제조사 유지관리 필요",
        privacy: false,
        security: false,
        status: "REVIEW_DONE",
        methodCandidate: "수의계약 검토 후보",
        methodFinal: "수의계약",
        risk: "warn",
        documents: [
          { name: "계약 의뢰서", required: true, uploaded: true, version: "2026.1" },
          { name: "수의계약 사유서", required: true, uploaded: true, version: "2026.1" }
        ],
        schedule: [],
        history: [{ at: "2026-06-09 16:35", user: "박계약", action: "승인", note: "사유서 확인" }]
      }
    ],
    reviewTickets: [
      { id: "R-101", contractId: "C-2026-001", status: "신규", due: "2026-06-14", assignee: "u-contract", risk: "warn" }
    ],
    notifications: [
      { id: "N-1", to: "u-contract", title: "계약부서 검토 요청", contractId: "C-2026-001", read: false, type: "검토" },
      { id: "N-2", to: "u-biz", title: "보안 검토서 첨부 필요", contractId: "C-2026-001", read: false, type: "보완" },
      { id: "N-3", to: "u-admin", title: "규정 개정 영향 분석 필요", contractId: "", read: false, type: "운영" }
    ],
    regulations: [
      { id: "REG-1", name: "공기업·준정부기관 계약사무규칙", clause: "제2조", effective: "2026-01-01", type: "법령", summary: "준정부기관 계약 업무 기본 적용 기준" },
      { id: "REG-2", name: "기관 계약규정", clause: "제18조", effective: "2026-03-01", type: "내규", summary: "계약 방식 검토와 담당자 승인 기준" },
      { id: "REG-3", name: "일상감사규정", clause: "제7조", effective: "2026-02-01", type: "내규", summary: "일정 금액 이상 또는 예외 계약의 감사 검토 기준" },
      { id: "REG-4", name: "정보화사업 보안지침", clause: "제11조", effective: "2026-01-15", type: "지침", summary: "정보시스템 접근과 개인정보 처리 시 보안 검토" }
    ],
    rules: [
      { id: "RULE-1", name: "정보화 보안 검토", condition: "정보화용역 및 시스템 접근", result: "SECURITY_REVIEW", evidence: "정보화사업 보안지침 제11조", active: true },
      { id: "RULE-2", name: "개인정보 검토", condition: "개인정보 처리", result: "PRIVACY_REVIEW", evidence: "정보화사업 보안지침 제11조", active: true },
      { id: "RULE-3", name: "고액 계약 검토", condition: "추정가격 1억원 이상", result: "AUDIT_REVIEW", evidence: "일상감사규정 제7조", active: true },
      { id: "RULE-4", name: "특정 업체 검토", condition: "특정 업체 검토", result: "REVIEW_REQUIRED", evidence: "기관 계약규정 제18조", active: true }
    ],
    auditLogs: [
      { at: "2026-06-11 09:40", user: "김사업", action: "검토 요청", target: "C-2026-001", note: "계약부서 검토함 등록" },
      { at: "2026-06-11 10:05", user: "오관리", action: "규칙 조회", target: "RULE-1", note: "운영 버전 확인" }
    ]
  };

  const menus = [
    { key: "dashboard", label: "대시보드", icon: "□", roles: "all" },
    { key: "new", label: "새 계약 준비", icon: "+", roles: ["ROLE_BIZ", "ROLE_CONTRACT", "ROLE_ADMIN"] },
    { key: "reviews", label: "계약부서 검토함", icon: "◇", roles: ["ROLE_CONTRACT", "ROLE_ADMIN", "ROLE_LEGAL", "ROLE_AUDIT"] },
    { key: "search", label: "규정 검색", icon: "⌕", roles: "all" },
    { key: "lifecycle", label: "후속관리", icon: "→", roles: ["ROLE_BIZ", "ROLE_CONTRACT", "ROLE_FINANCE", "ROLE_ADMIN"] },
    { key: "audit", label: "감사·분석", icon: "※", roles: ["ROLE_AUDIT", "ROLE_CONTRACT", "ROLE_ADMIN", "ROLE_EXEC"] },
    { key: "admin", label: "관리자 콘솔", icon: "⚙", roles: ["ROLE_ADMIN"] }
  ];

  function currentUser() {
    return users.find((user) => user.id === state.currentUserId) || users[0];
  }

  function money(value) {
    return new Intl.NumberFormat("ko-KR").format(Number(value || 0)) + "원";
  }

  function todayText() {
    return "2026-06-11";
  }

  function canAccessMenu(menu) {
    const user = currentUser();
    return menu.roles === "all" || menu.roles.includes(user.role);
  }

  function visibleContracts() {
    const user = currentUser();
    if (["ROLE_ADMIN", "ROLE_EXEC"].includes(user.role)) return state.contracts;
    if (user.role === "ROLE_CONTRACT") return state.contracts;
    if (user.role === "ROLE_AUDIT") return state.contracts.filter((contract) => contract.status !== "DRAFT" || contract.risk !== "good");
    if (user.role === "ROLE_FINANCE") return state.contracts.filter((contract) => ["PAYMENT_READY", "PAYMENT_DONE", "INSPECTION_DONE", "WARRANTY"].includes(contract.status));
    return state.contracts.filter((contract) => contract.owner === user.id || contract.department === user.dept);
  }

  function canOpenAdmin() {
    return currentUser().role === "ROLE_ADMIN";
  }

  function addAudit(action, target, note) {
    state.auditLogs.unshift({
      at: new Date().toLocaleString("ko-KR", { hour12: false }),
      user: currentUser().name,
      action,
      target,
      note
    });
  }

  function toast(message) {
    state.toasts.push({ id: Date.now(), message });
    renderToasts();
    window.setTimeout(() => {
      state.toasts.shift();
      renderToasts();
    }, 2600);
  }

  function renderToasts() {
    const area = document.querySelector(".toast");
    if (!area) return;
    area.innerHTML = state.toasts.map((item) => `<div>${escapeHtml(item.message)}</div>`).join("");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function riskPill(risk) {
    if (risk === "bad") return `<span class="pill bad">위험</span>`;
    if (risk === "warn") return `<span class="pill warn">주의</span>`;
    return `<span class="pill good">정상</span>`;
  }

  function statusPill(status) {
    const kind = ["REVISION", "REVIEW_REQUIRED"].includes(status) ? "warn" : ["REVIEW_DONE", "PAYMENT_DONE", "CLOSED"].includes(status) ? "good" : "neutral";
    return `<span class="pill ${kind}">${statusLabels[status] || status}</span>`;
  }

  function navigate(route) {
    window.location.hash = route;
  }

  function route() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return hash || "dashboard";
  }

  function renderShell() {
    const user = currentUser();
    const active = route().split("/")[0] || "dashboard";
    document.querySelector("#app").innerHTML = `
      <div class="app-shell">
        <aside class="side" id="side">
          <div class="brand">
            <div class="brand-mark">AX</div>
            <div>
              <strong>계약AX Desk</strong>
              <span>준정부기관 계약 업무 플랫폼</span>
            </div>
          </div>
          <nav class="nav">
            ${menus.filter(canAccessMenu).map((menu) => `
              <button class="${active === menu.key ? "active" : ""}" data-nav="${menu.key}">
                <span><span class="icon">${menu.icon}</span>${menu.label}</span>
                <span>›</span>
              </button>
            `).join("")}
          </nav>
          <div class="side-foot">
            <strong>오케스트레이션</strong><br />
            Dev 지시서 구현 후 Chk 지시서 기준으로 자체 검수하는 실행 구조입니다.
          </div>
        </aside>
        <main class="main">
          <header class="topbar">
            <div>
              <button class="btn mobile-menu" id="menuToggle">메뉴</button>
              <h1>${pageTitle(active)}</h1>
              <p class="topbar-sub">${todayText()} · ${user.dept} · ${roles[user.role]}</p>
            </div>
            <div class="top-actions">
              <button class="btn" id="notiButton">알림 ${unreadCount() > 0 ? `<span class="pill bad">${unreadCount()}</span>` : ""}</button>
              <select class="role-select" id="userSelect" aria-label="개발용 사용자 전환">
                ${users.map((candidate) => `<option value="${candidate.id}" ${candidate.id === user.id ? "selected" : ""}>${candidate.name} · ${roles[candidate.role]}</option>`).join("")}
              </select>
            </div>
          </header>
          <section class="content" id="view"></section>
        </main>
      </div>
      <div class="toast"></div>
    `;

    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector("#side").classList.remove("open");
        navigate(button.dataset.nav);
      });
    });

    document.querySelector("#userSelect").addEventListener("change", (event) => {
      state.currentUserId = event.target.value;
      addAudit("사용자 전환", state.currentUserId, "개발 검수용 역할 전환");
      render();
    });

    document.querySelector("#menuToggle").addEventListener("click", () => {
      document.querySelector("#side").classList.toggle("open");
    });

    document.querySelector("#notiButton").addEventListener("click", () => {
      renderNotificationPanel();
    });
  }

  function pageTitle(key) {
    return {
      dashboard: "대시보드",
      new: "새 계약 준비",
      contracts: "사전점검 결과",
      reviews: "계약부서 검토함",
      search: "규정 검색",
      lifecycle: "후속관리",
      audit: "감사·분석",
      admin: "관리자 콘솔"
    }[key] || "계약AX Desk";
  }

  function unreadCount() {
    const user = currentUser();
    return state.notifications.filter((item) => !item.read && (item.to === user.id || user.role === "ROLE_ADMIN")).length;
  }

  function renderNotificationPanel() {
    const user = currentUser();
    const notices = state.notifications.filter((item) => item.to === user.id || user.role === "ROLE_ADMIN");
    const area = document.querySelector("#view");
    area.insertAdjacentHTML("afterbegin", `
      <div class="panel" id="notiPanel">
        <div class="section-title">
          <div>
            <h3>알림 센터</h3>
            <p>업무 요청, 보완, 운영 알림</p>
          </div>
          <button class="btn" id="readAllNoti">모두 읽음</button>
        </div>
        <div class="grid">
          ${notices.map((notice) => `
            <div class="card">
              <div class="section-title">
                <div>
                  <strong>${escapeHtml(notice.title)}</strong>
                  <p>${notice.type} ${notice.contractId ? "· " + notice.contractId : ""}</p>
                </div>
                <span class="pill ${notice.read ? "neutral" : "bad"}">${notice.read ? "읽음" : "미확인"}</span>
              </div>
            </div>
          `).join("") || `<div class="empty">표시할 알림이 없습니다.</div>`}
        </div>
      </div>
    `);
    document.querySelector("#readAllNoti").addEventListener("click", () => {
      notices.forEach((notice) => {
        notice.read = true;
      });
      addAudit("알림 읽음", "Notification", "알림 일괄 읽음 처리");
      toast("알림을 읽음 처리했습니다.");
      render();
    });
  }

  function renderDashboard() {
    const contracts = visibleContracts();
    const statusCounts = contracts.reduce((acc, contract) => {
      acc[contract.status] = (acc[contract.status] || 0) + 1;
      return acc;
    }, {});
    const workItems = contracts.filter((contract) => ["PRECHECK", "CONTRACT_REVIEW", "REVISION", "PAYMENT_READY", "INSPECTION_REQUEST"].includes(contract.status));
    return `
      <div class="grid cols-4">
        ${kpiCard("권한 내 계약", contracts.length, "조회 가능 범위")}
        ${kpiCard("검토 중", statusCounts.CONTRACT_REVIEW || 0, "계약부서 처리")}
        ${kpiCard("보완 요청", statusCounts.REVISION || 0, "사업부서 회신")}
        ${kpiCard("S1 오류", 0, "권한·개인정보 위반 없음")}
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>내 업무함</h2>
              <p>단계, 기한, 위험 기준으로 우선 처리할 계약</p>
            </div>
            <button class="btn primary" data-action="quick-new">새 계약</button>
          </div>
          ${contractTable(workItems.length ? workItems : contracts.slice(0, 3), true)}
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>빠른 시작</h2>
              <p>물품, 일반용역, 정보화용역 준비 흐름</p>
            </div>
          </div>
          <div class="grid">
            ${["물품", "일반용역", "정보화용역"].map((type) => `
              <button class="btn" data-quick-type="${type}">
                <strong>${type}</strong>
                <span class="muted">계약 준비 마법사 열기</span>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>계약 현황</h2>
              <p>상태별 집계</p>
            </div>
          </div>
          <div class="grid cols-3">
            ${Object.keys(statusLabels).slice(0, 9).map((status) => `
              <div class="card kpi">
                <span>${statusLabels[status]}</span>
                <strong>${statusCounts[status] || 0}</strong>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>최근 규정 변경</h2>
              <p>영향받는 업무와 서식 확인</p>
            </div>
            <span class="pill warn">영향 분석</span>
          </div>
          <div class="timeline">
            ${state.regulations.slice(0, 4).map((reg) => `
              <div class="timeline-item">
                <span class="pill neutral">${reg.effective}</span>
                <div><strong>${reg.name} ${reg.clause}</strong><br /><span class="muted">${reg.summary}</span></div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function kpiCard(label, value, note) {
    return `<div class="card kpi"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`;
  }

  function contractTable(contracts, withActions) {
    if (!contracts.length) return `<div class="empty">표시할 계약이 없습니다.</div>`;
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>계약명</th>
              <th>유형</th>
              <th>상태</th>
              <th>금액</th>
              <th>위험</th>
              ${withActions ? "<th>작업</th>" : ""}
            </tr>
          </thead>
          <tbody>
            ${contracts.map((contract) => `
              <tr>
                <td><strong>${escapeHtml(contract.title)}</strong><br /><span class="muted">${contract.id} · ${contract.department}</span></td>
                <td>${contract.type}<br /><span class="muted">${contract.subtype || "-"}</span></td>
                <td>${statusPill(contract.status)}</td>
                <td>${money(contract.estimatedPrice)}</td>
                <td>${riskPill(contract.risk)}</td>
                ${withActions ? `<td><button class="btn" data-open-contract="${contract.id}">열기</button></td>` : ""}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderNewContract() {
    const draft = state.draft || {
      title: "",
      department: currentUser().dept,
      owner: currentUser().id,
      type: "물품",
      subtype: "일반 물품",
      estimatedPrice: "",
      vatIncluded: "true",
      startDate: "2026-07-01",
      endDate: "2026-12-31",
      dueDate: "2026-11-30",
      repeat: "신규",
      existingContract: "",
      privacy: "false",
      security: "false",
      systemAccess: "false",
      externalAccess: "false",
      urgent: "false",
      urgentReason: "",
      specificVendor: "false",
      specificReason: "",
      warranty: "모름"
    };
    state.draft = draft;
    const errors = validateDraft(draft);
    return `
      <div class="steps">
        ${["기본정보", "조건 질문", "입력 검증", "사전점검"].map((step, index) => `
          <div class="step ${index === 0 ? "active" : ""}"><strong>${index + 1}. ${step}</strong><span>${index === 2 ? `${errors.length}건 확인` : "진행 가능"}</span></div>
        `).join("")}
      </div>
      <div class="split">
        <form class="panel" id="contractForm">
          <div class="section-title">
            <div>
              <h2>새 계약 준비 마법사</h2>
              <p>자동 저장 ${state.autosaveAt ? "· " + state.autosaveAt : "대기 중"}</p>
            </div>
            <span class="pill">${draft.type}</span>
          </div>
          <div class="form-grid">
            ${field("사업명", "title", "text", draft.title, "예: 정보화용역 보안관제 고도화")}
            ${selectField("계약 대상", "type", draft.type, ["물품", "일반용역", "정보화용역"])}
            ${field("사업부서", "department", "text", draft.department)}
            ${field("추정가격", "estimatedPrice", "number", draft.estimatedPrice)}
            ${field("계약 시작일", "startDate", "date", draft.startDate)}
            ${field("계약 종료일", "endDate", "date", draft.endDate)}
            ${field("납품·준공 목표일", "dueDate", "date", draft.dueDate)}
            ${selectField("신규·반복 사업", "repeat", draft.repeat, ["신규", "반복", "갱신"])}
            ${draft.repeat === "반복" || draft.repeat === "갱신" ? field("기존 계약 ID", "existingContract", "text", draft.existingContract, "C-2025-000") : ""}
            ${selectField("개인정보 처리", "privacy", draft.privacy, [["true", "예"], ["false", "아니오"]])}
            ${selectField("보안 검토 가능성", "security", draft.security, [["true", "예"], ["false", "아니오"]])}
            ${draft.type === "정보화용역" ? selectField("정보시스템 접근", "systemAccess", draft.systemAccess, [["true", "예"], ["false", "아니오"], ["unknown", "모름"]]) : ""}
            ${draft.type === "정보화용역" ? selectField("외부 시스템 연계", "externalAccess", draft.externalAccess, [["true", "예"], ["false", "아니오"], ["unknown", "모름"]]) : ""}
            ${selectField("긴급성", "urgent", draft.urgent, [["true", "예"], ["false", "아니오"]])}
            ${draft.urgent === "true" ? field("긴급 사유", "urgentReason", "text", draft.urgentReason) : ""}
            ${selectField("특정 업체 검토", "specificVendor", draft.specificVendor, [["true", "예"], ["false", "아니오"]])}
            ${draft.specificVendor === "true" ? field("특정 업체 사유", "specificReason", "text", draft.specificReason) : ""}
            ${selectField("하자관리 대상 가능성", "warranty", draft.warranty, ["예", "아니오", "모름"])}
          </div>
          ${errors.length ? `<div class="callout" style="margin-top:16px"><strong>입력 확인 필요</strong>${errors.map((error) => `<div class="error">${error}</div>`).join("")}</div>` : ""}
          <div class="button-row" style="margin-top:16px">
            <button type="button" class="btn" id="loadSimilar">유사 사업 불러오기</button>
            <button type="button" class="btn primary" id="runPrecheck" ${errors.length ? "disabled" : ""}>사전점검 실행</button>
          </div>
        </form>
        <aside class="panel">
          <div class="section-title">
            <div>
              <h3>동적 질문 상태</h3>
              <p>선택 조건에 따라 검토 단계가 생성됩니다.</p>
            </div>
          </div>
          <div class="timeline">
            ${dynamicQuestionSummary(draft).map((item) => `
              <div class="timeline-item">
                <span class="pill ${item.kind}">${item.tag}</span>
                <div><strong>${item.title}</strong><br /><span class="muted">${item.note}</span></div>
              </div>
            `).join("")}
          </div>
        </aside>
      </div>
    `;
  }

  function field(label, name, type, value, placeholder = "") {
    return `
      <div class="field">
        <label for="${name}">${label}</label>
        <input id="${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />
      </div>
    `;
  }

  function selectField(label, name, value, options) {
    const normalized = options.map((option) => Array.isArray(option) ? option : [option, option]);
    return `
      <div class="field">
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}">
          ${normalized.map(([optionValue, optionLabel]) => `<option value="${optionValue}" ${String(value) === String(optionValue) ? "selected" : ""}>${optionLabel}</option>`).join("")}
        </select>
      </div>
    `;
  }

  function validateDraft(draft) {
    const errors = [];
    if (!draft.title.trim()) errors.push("사업명을 입력해야 합니다.");
    if (!draft.estimatedPrice || Number(draft.estimatedPrice) <= 0) errors.push("추정가격은 0보다 커야 합니다.");
    if (!draft.startDate || !draft.endDate || draft.startDate > draft.endDate) errors.push("계약 기간을 확인해야 합니다.");
    if ((draft.repeat === "반복" || draft.repeat === "갱신") && !draft.existingContract.trim()) errors.push("반복·갱신 사업은 기존 계약 ID가 필요합니다.");
    if (draft.urgent === "true" && !draft.urgentReason.trim()) errors.push("긴급성 사유가 필요합니다.");
    if (draft.specificVendor === "true" && !draft.specificReason.trim()) errors.push("특정 업체 검토 사유가 필요합니다.");
    return errors;
  }

  function dynamicQuestionSummary(draft) {
    const list = [
      { tag: "기본", kind: "neutral", title: "계약 유형 질문", note: `${draft.type} 기준 질문 세트를 적용합니다.` }
    ];
    if (draft.type === "정보화용역") list.push({ tag: "보안", kind: "warn", title: "정보화 보안 질문", note: "시스템 접근과 외부 연계를 확인합니다." });
    if (draft.privacy === "true") list.push({ tag: "개인정보", kind: "warn", title: "개인정보 검토", note: "개인정보 처리 점검 단계가 생성됩니다." });
    if (draft.specificVendor === "true") list.push({ tag: "예외", kind: "bad", title: "특정 업체 사유", note: "계약 담당자 승인 전 확정할 수 없습니다." });
    return list;
  }

  function runRules(contract) {
    const results = [];
    if (contract.type === "정보화용역" && (contract.systemAccess || contract.externalAccess || contract.security)) {
      results.push({ result: "보안 검토 필요", evidence: "정보화사업 보안지침 제11조", severity: "warn" });
    }
    if (contract.privacy) results.push({ result: "개인정보 검토 필요", evidence: "정보화사업 보안지침 제11조", severity: "warn" });
    if (Number(contract.estimatedPrice) >= 100000000) results.push({ result: "일상감사 검토 후보", evidence: "일상감사규정 제7조", severity: "warn" });
    if (contract.specificVendor) results.push({ result: "담당자 검토 필요", evidence: "기관 계약규정 제18조", severity: "bad" });
    if (!results.length) results.push({ result: "일반경쟁 우선 검토", evidence: "공기업·준정부기관 계약사무규칙 제2조", severity: "good" });
    return results;
  }

  function methodCandidate(contract) {
    if (contract.specificVendor) return "수의계약 검토 후보";
    if (Number(contract.estimatedPrice) >= 100000000 || contract.type === "정보화용역") return "제한경쟁 검토 후보";
    return "일반경쟁 우선 검토";
  }

  function renderPrecheck(contractId) {
    const contract = state.contracts.find((item) => item.id === contractId) || state.contracts[0];
    state.activeContractId = contract.id;
    const ruleResults = runRules(contract);
    const missingDocs = contract.documents.filter((doc) => doc.required && !doc.uploaded);
    const oldDocs = contract.documents.filter((doc) => doc.version !== "2026.1");
    return `
      <div class="panel">
        <div class="section-title">
          <div>
            <h2>${escapeHtml(contract.title)}</h2>
            <p>${contract.id} · ${contract.type} · ${money(contract.estimatedPrice)}</p>
          </div>
          ${statusPill(contract.status)}
        </div>
        <div class="grid cols-4">
          ${kpiCard("계약 방식 후보", methodCandidate(contract), "담당자 확정 필요")}
          ${kpiCard("필수 서류 누락", missingDocs.length, "제출 전 확인")}
          ${kpiCard("구버전 서식", oldDocs.length, "폐기 서식 차단")}
          ${kpiCard("근거 표시율", "100%", "조항·시행일 표시")}
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>규칙 실행 결과</h3>
              <p>자동 확정이 아닌 검토 후보입니다.</p>
            </div>
          </div>
          <div class="timeline">
            ${ruleResults.map((result) => `
              <div class="timeline-item">
                <span class="pill ${result.severity}">${result.result}</span>
                <div><strong>${result.evidence}</strong><br /><span class="muted">시행일 2026-01-01 · 규칙 버전 v2026.1</span></div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>예상 일정</h3>
              <p>기관 기준과 계약 조건을 적용한 참고 일정</p>
            </div>
            <button class="btn" id="makeSchedule">일정 생성</button>
          </div>
          <div class="timeline">
            ${[
              ["계약부서 검토", "D+3", "계약 방식과 서류 확인"],
              ["보안·개인정보 검토", "D+5", contract.security || contract.privacy ? "조건부 생성" : "해당 없음"],
              ["계약 체결 준비", "D+10", "검토 완료 후 진행"]
            ].map(([name, day, note]) => `
              <div class="timeline-item"><span class="pill neutral">${day}</span><div><strong>${name}</strong><br /><span class="muted">${note}</span></div></div>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>제출 서류 체크리스트</h3>
              <p>필수, 조건부, 해당 없음 구분</p>
            </div>
            <button class="btn" id="uploadDoc">샘플 첨부</button>
          </div>
          ${documentsTable(contract)}
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>서식 초안</h3>
              <p>공통 필드 자동 반영</p>
            </div>
            <button class="btn" id="makeForms">초안 생성</button>
          </div>
          <div class="grid">
            ${["계약 의뢰서", "보안 검토서", "수의계약 사유서", "검사 체크리스트"].map((form, index) => `
              <div class="card">
                <div class="section-title">
                  <div><strong>${form}</strong><p>자동작성률 ${index === 0 ? "86%" : "72%"}</p></div>
                  <span class="pill ${index === 0 ? "good" : "neutral"}">${index === 0 ? "생성 가능" : "검토 필요"}</span>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="button-row" style="margin-top:14px">
            <button class="btn primary" id="requestReview">검토 요청</button>
            <button class="btn" data-nav-button="reviews">검토함 보기</button>
          </div>
        </div>
      </div>
    `;
  }

  function documentsTable(contract) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>서류</th><th>구분</th><th>첨부</th><th>버전</th><th>근거</th></tr></thead>
          <tbody>
            ${contract.documents.map((doc) => `
              <tr>
                <td><strong>${doc.name}</strong></td>
                <td>${doc.required ? `<span class="pill warn">필수</span>` : `<span class="pill neutral">조건부</span>`}</td>
                <td>${doc.uploaded ? `<span class="pill good">첨부됨</span>` : `<span class="pill bad">누락</span>`}</td>
                <td>${doc.version === "2026.1" ? doc.version : `<span class="pill bad">${doc.version}</span>`}</td>
                <td>기관 계약규정 제18조</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderReviews() {
    if (!["ROLE_CONTRACT", "ROLE_ADMIN", "ROLE_LEGAL", "ROLE_AUDIT"].includes(currentUser().role)) {
      return accessDenied("계약부서 검토 권한");
    }
    const tickets = state.reviewTickets;
    return `
      <div class="split">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>검토 큐</h2>
              <p>신규 요청, 보완 회신, 지연 위험</p>
            </div>
          </div>
          ${tickets.length ? `
            <div class="table-wrap">
              <table>
                <thead><tr><th>티켓</th><th>계약</th><th>상태</th><th>기한</th><th>위험</th><th>작업</th></tr></thead>
                <tbody>
                  ${tickets.map((ticket) => {
                    const contract = state.contracts.find((item) => item.id === ticket.contractId);
                    return `<tr>
                      <td>${ticket.id}</td>
                      <td><strong>${contract ? contract.title : ticket.contractId}</strong><br /><span class="muted">${ticket.contractId}</span></td>
                      <td><span class="pill neutral">${ticket.status}</span></td>
                      <td>${ticket.due}</td>
                      <td>${riskPill(ticket.risk)}</td>
                      <td><button class="btn" data-open-contract="${ticket.contractId}">상세</button></td>
                    </tr>`;
                  }).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="empty">검토 티켓이 없습니다.</div>`}
        </div>
        ${reviewDetail(state.activeContractId)}
      </div>
    `;
  }

  function reviewDetail(contractId) {
    const contract = state.contracts.find((item) => item.id === contractId) || state.contracts[0];
    const missing = contract.documents.filter((doc) => doc.required && !doc.uploaded);
    const oldDocs = contract.documents.filter((doc) => doc.version !== "2026.1");
    return `
      <div class="panel">
        <div class="section-title">
          <div>
            <h2>검토 상세</h2>
            <p>${contract.id} · ${contract.title}</p>
          </div>
          ${statusPill(contract.status)}
        </div>
        <div class="callout">
          <strong>문서 오류 점검</strong>
          금액 형식 정상 · 날짜 범위 정상 · 필수 첨부 누락 ${missing.length}건 · 구버전 서식 ${oldDocs.length}건
        </div>
        <div style="margin-top:14px">${documentsTable(contract)}</div>
        <div class="button-row" style="margin-top:16px">
          <button class="btn danger" id="requestRevision">보완 요청</button>
          <button class="btn primary" id="approveReview">승인</button>
          <button class="btn" id="exceptionReview">예외 검토</button>
        </div>
        <h3>검토 의견 타임라인</h3>
        <div class="timeline">
          ${contract.history.map((item) => `
            <div class="timeline-item"><span class="pill neutral">${item.at}</span><div><strong>${item.action}</strong><br /><span class="muted">${item.user} · ${item.note}</span></div></div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderSearch() {
    const last = state.lastSearch;
    return `
      <div class="panel">
        <div class="section-title">
          <div>
            <h2>규정 검색</h2>
            <p>권한 범위 내 규정과 문서만 검색합니다.</p>
          </div>
        </div>
        <div class="search-box">
          <input id="searchInput" placeholder="예: 정보화용역 보안 검토가 필요한가요?" value="${escapeHtml(last ? last.query : "")}" />
          <select id="searchType">
            ${["전체", "물품", "일반용역", "정보화용역"].map((item) => `<option ${last && last.type === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
          <select id="searchStage">
            ${["전체 단계", "사전점검", "검토", "체결", "검사·지급"].map((item) => `<option>${item}</option>`).join("")}
          </select>
          <button class="btn primary" id="runSearch">검색</button>
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>AI 답변</h3>
              <p>근거 조항이 없는 경우 답변을 제한합니다.</p>
            </div>
            <span class="pill good">근거 표시</span>
          </div>
          ${last ? `
            <div class="callout">
              <strong>${last.masked ? "민감정보 마스킹 적용" : "근거 기반 답변"}</strong>
              ${last.answer}
            </div>
            <div class="button-row" style="margin-top:14px">
              <button class="btn" id="feedbackGood">도움됨</button>
              <button class="btn" id="feedbackBad">수정 필요</button>
              <button class="btn" id="askManager">담당자 문의</button>
            </div>
          ` : `<div class="empty">검색어를 입력하면 답변과 근거가 표시됩니다.</div>`}
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h3>근거 조항</h3>
              <p>규정명, 조항, 시행일</p>
            </div>
          </div>
          <div class="timeline">
            ${(last ? last.sources : state.regulations).map((reg) => `
              <div class="timeline-item">
                <span class="pill neutral">${reg.effective}</span>
                <div><strong>${reg.name} ${reg.clause}</strong><br /><span class="muted">${reg.summary}</span></div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function renderLifecycle() {
    const contract = state.contracts.find((item) => item.id === state.activeContractId) || state.contracts[0];
    return `
      <div class="grid cols-3">
        ${kpiCard("체결 체크", contract.status === "SIGNING" ? "진행" : "대기", "필수 절차")}
        ${kpiCard("이행 일정", contract.schedule.length, "자동 생성 업무")}
        ${kpiCard("지급 상태", contract.status === "PAYMENT_DONE" ? "완료" : "준비 전", "재무 연계")}
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>체결·이행 일정</h2>
              <p>${contract.title}</p>
            </div>
            <button class="btn primary" id="completeSigning">체결 완료</button>
          </div>
          <div class="timeline">
            ${(contract.schedule.length ? contract.schedule : [
              { name: "착수계 확인", date: "체결 후 D+3", owner: "사업부서", status: "예정" },
              { name: "납품 준비", date: "납품일 D-14", owner: "사업부서", status: "예정" },
              { name: "검사 요청", date: "이행 완료", owner: "검사 담당", status: "예정" }
            ]).map((item) => `
              <div class="timeline-item"><span class="pill neutral">${item.date}</span><div><strong>${item.name}</strong><br /><span class="muted">${item.owner} · ${item.status}</span></div></div>
            `).join("")}
          </div>
          <div class="button-row" style="margin-top:16px">
            <button class="btn" id="changeContract">변경계약 비교</button>
            <button class="btn danger" id="delayReview">지체 검토</button>
          </div>
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>검사·지급·하자</h2>
              <p>후속 업무 연결</p>
            </div>
          </div>
          <div class="grid">
            <button class="btn" id="requestInspection">검사 요청 생성</button>
            <button class="btn" id="finishInspection">검사 완료 및 지급 준비</button>
            <button class="btn" id="finishPayment">지급 완료 처리</button>
            <button class="btn" id="registerWarranty">하자관리 등록</button>
          </div>
          <div class="callout" style="margin-top:16px">
            <strong>증빙 점검</strong>
            세금계산서, 검수조서, 계약서, 계좌 정보가 모두 확인되어야 지급 가능으로 표시됩니다.
          </div>
        </div>
      </div>
    `;
  }

  function renderAudit() {
    if (!["ROLE_AUDIT", "ROLE_CONTRACT", "ROLE_ADMIN", "ROLE_EXEC"].includes(currentUser().role)) {
      return accessDenied("감사·분석 권한");
    }
    const contracts = visibleContracts();
    return `
      <div class="grid cols-4">
        ${kpiCard("실제 사용자", users.length, "실증 목표 20~50명")}
        ${kpiCard("처리 계약", contracts.length, "실증 목표 30건")}
        ${kpiCard("근거 표시율", "100%", "무근거 답변 차단")}
        ${kpiCard("권한 위반", 0, "S1 오류 0건")}
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>감사 패키지</h2>
              <p>계약 기본정보, 판정 근거, 검토 의견, 승인 이력, 로그</p>
            </div>
            <button class="btn primary" id="makeAuditPackage">패키지 생성</button>
          </div>
          ${contractTable(contracts, true)}
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>분석 리포트</h2>
              <p>기간, 부서, 계약 유형 필터 기반 집계</p>
            </div>
          </div>
          <div class="grid">
            ${[
              ["계약 준비시간", "32% 단축", "목표 30% 이상"],
              ["필수 문서 누락", "54% 감소", "목표 50% 이상"],
              ["판정 수용률", "82%", "목표 80% 이상"],
              ["반복 문의", "31% 감소", "목표 30% 이상"]
            ].map(([label, value, note]) => `<div class="card kpi"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="panel" style="margin-top:16px">
        <div class="section-title">
          <div>
            <h2>감사 로그</h2>
            <p>조회, 수정, 다운로드, 승인 기록</p>
          </div>
        </div>
        ${auditTable()}
      </div>
    `;
  }

  function renderAdmin() {
    if (!canOpenAdmin()) return accessDenied("관리자 권한");
    return `
      <div class="grid cols-4">
        ${kpiCard("규정", state.regulations.length, "승인 대상")}
        ${kpiCard("규칙", state.rules.length, "운영 버전")}
        ${kpiCard("서식", 4, "자동작성")}
        ${kpiCard("회귀 테스트", "통과", "100건 샘플")}
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>규정·규칙 관리</h2>
              <p>시행일, 종료일, 근거 조항, 승인 상태</p>
            </div>
            <button class="btn" id="addRule">규칙 등록</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>규칙명</th><th>조건</th><th>결과</th><th>근거</th></tr></thead>
              <tbody>
                ${state.rules.map((rule) => `<tr><td>${rule.id}</td><td><strong>${rule.name}</strong></td><td>${rule.condition}</td><td>${rule.result}</td><td>${rule.evidence}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>사용자·권한</h2>
              <p>역할 변경 시 감사 로그 기록</p>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>사용자</th><th>부서</th><th>역할</th><th>작업</th></tr></thead>
              <tbody>
                ${users.map((user) => `<tr><td>${user.name}</td><td>${user.dept}</td><td>${roles[user.role]}</td><td><button class="btn" data-change-role="${user.id}">이력 기록</button></td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:16px">
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>서식 관리</h2>
              <p>필드 매핑과 구버전 차단</p>
            </div>
            <button class="btn" id="testForm">테스트 생성</button>
          </div>
          <div class="timeline">
            ${["계약 의뢰서", "수의계약 사유서", "보안 검토서", "검사조서"].map((name) => `<div class="timeline-item"><span class="pill good">2026.1</span><div><strong>${name}</strong><br /><span class="muted">공통 필드 매핑 완료</span></div></div>`).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="section-title">
            <div>
              <h2>배포·롤백</h2>
              <p>승인 버전만 운영 반영</p>
            </div>
          </div>
          <div class="grid">
            <button class="btn primary" id="deployRules">승인 버전 배포</button>
            <button class="btn" id="rollbackRules">이전 버전 롤백</button>
            <button class="btn" id="runRegression">회귀 테스트 실행</button>
          </div>
        </div>
      </div>
      <div class="panel" style="margin-top:16px">
        <div class="section-title"><div><h2>감사 로그</h2><p>관리 작업 이력</p></div></div>
        ${auditTable()}
      </div>
    `;
  }

  function auditTable() {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr><th>시각</th><th>사용자</th><th>행동</th><th>대상</th><th>비고</th></tr></thead>
          <tbody>
            ${state.auditLogs.map((log) => `<tr><td>${log.at}</td><td>${log.user}</td><td>${log.action}</td><td>${log.target}</td><td>${log.note}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function accessDenied(required) {
    return `
      <div class="panel">
        <div class="section-title">
          <div>
            <h2>접근 권한이 없습니다</h2>
            <p>필요 권한: ${required}</p>
          </div>
          <span class="pill bad">차단</span>
        </div>
        <div class="callout">
          <strong>권한 상속 원칙 적용</strong>
          현재 사용자 역할로는 이 메뉴 또는 데이터에 접근할 수 없습니다. 관리자 또는 계약 담당자에게 문의해야 합니다.
        </div>
      </div>
    `;
  }

  function bindEvents() {
    document.querySelectorAll("[data-open-contract]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeContractId = button.dataset.openContract;
        navigate(`contracts/${button.dataset.openContract}/precheck`);
      });
    });

    document.querySelectorAll("[data-quick-type]").forEach((button) => {
      button.addEventListener("click", () => {
        state.draft = null;
        navigate("new");
        setTimeout(() => {
          state.draft.type = button.dataset.quickType;
          render();
        }, 0);
      });
    });

    document.querySelectorAll("[data-nav-button]").forEach((button) => {
      button.addEventListener("click", () => navigate(button.dataset.navButton));
    });

    const quickNew = document.querySelector("[data-action='quick-new']");
    if (quickNew) quickNew.addEventListener("click", () => navigate("new"));

    const form = document.querySelector("#contractForm");
    if (form) {
      form.addEventListener("input", () => updateDraftFromForm(false));
      form.addEventListener("change", () => updateDraftFromForm(true));
    }

    const loadSimilar = document.querySelector("#loadSimilar");
    if (loadSimilar) {
      loadSimilar.addEventListener("click", () => {
        state.draft.title = "전년도 유사 계약 복제";
        state.draft.estimatedPrice = "52000000";
        state.draft.existingContract = "C-2025-018";
        state.autosaveAt = new Date().toLocaleTimeString("ko-KR", { hour12: false });
        addAudit("유사 사업 불러오기", "Draft", "필드 선택 복사");
        toast("유사 사업 정보를 불러왔습니다.");
        render();
      });
    }

    const runPrecheck = document.querySelector("#runPrecheck");
    if (runPrecheck) {
      runPrecheck.addEventListener("click", () => {
        const draft = state.draft;
        const id = "C-2026-" + String(state.contracts.length + 1).padStart(3, "0");
        const contract = {
          id,
          title: draft.title,
          department: draft.department,
          owner: currentUser().id,
          type: draft.type,
          subtype: draft.type === "정보화용역" ? "정보시스템 구축·운영" : draft.type === "물품" ? "일반 물품" : "일반용역",
          estimatedPrice: Number(draft.estimatedPrice),
          vatIncluded: draft.vatIncluded === "true",
          startDate: draft.startDate,
          endDate: draft.endDate,
          dueDate: draft.dueDate,
          urgent: draft.urgent === "true",
          urgentReason: draft.urgentReason,
          specificVendor: draft.specificVendor === "true",
          specificReason: draft.specificReason,
          privacy: draft.privacy === "true",
          security: draft.security === "true" || draft.systemAccess === "true" || draft.externalAccess === "true",
          systemAccess: draft.systemAccess === "true",
          externalAccess: draft.externalAccess === "true",
          status: draft.specificVendor === "true" || draft.systemAccess === "unknown" ? "REVIEW_REQUIRED" : "PRECHECK",
          methodCandidate: "",
          methodFinal: "",
          risk: draft.specificVendor === "true" ? "bad" : draft.privacy === "true" || draft.security === "true" ? "warn" : "good",
          documents: [
            { name: "계약 의뢰서", required: true, uploaded: false, version: "2026.1" },
            { name: "규격서 또는 과업지시서", required: true, uploaded: false, version: "2026.1" },
            { name: "보안 검토서", required: draft.type === "정보화용역", uploaded: false, version: "2026.1" }
          ],
          schedule: [],
          history: [{ at: new Date().toLocaleString("ko-KR", { hour12: false }), user: currentUser().name, action: "사전점검", note: "규칙 엔진 실행" }]
        };
        contract.methodCandidate = methodCandidate(contract);
        state.contracts.unshift(contract);
        state.activeContractId = contract.id;
        addAudit("사전점검 실행", contract.id, contract.methodCandidate);
        toast("사전점검 결과를 생성했습니다.");
        navigate(`contracts/${contract.id}/precheck`);
      });
    }

    bindPrecheckEvents();
    bindReviewEvents();
    bindSearchEvents();
    bindLifecycleEvents();
    bindAdminEvents();
    bindAuditEvents();
  }

  function updateDraftFromForm(shouldRender) {
    const form = document.querySelector("#contractForm");
    const data = new FormData(form);
    for (const [key, value] of data.entries()) state.draft[key] = value;
    state.autosaveAt = new Date().toLocaleTimeString("ko-KR", { hour12: false });
    addAudit("자동 저장", "Draft", "계약 준비 입력값 저장");
    if (shouldRender) render();
  }

  function bindPrecheckEvents() {
    const contract = state.contracts.find((item) => item.id === state.activeContractId);
    if (!contract) return;

    const uploadDoc = document.querySelector("#uploadDoc");
    if (uploadDoc) {
      uploadDoc.addEventListener("click", () => {
        const missing = contract.documents.find((doc) => !doc.uploaded);
        if (missing) missing.uploaded = true;
        addAudit("첨부 업로드", contract.id, missing ? missing.name : "추가 누락 없음");
        toast("샘플 첨부를 반영했습니다.");
        render();
      });
    }

    const makeForms = document.querySelector("#makeForms");
    if (makeForms) {
      makeForms.addEventListener("click", () => {
        addAudit("서식 초안 생성", contract.id, "계약 의뢰서 외 3종");
        toast("서식 초안을 생성했습니다.");
      });
    }

    const makeSchedule = document.querySelector("#makeSchedule");
    if (makeSchedule) {
      makeSchedule.addEventListener("click", () => {
        contract.schedule = [
          { name: "계약부서 검토", date: "2026-06-14", owner: "계약부", status: "예정" },
          { name: "보안 검토", date: "2026-06-16", owner: "정보보안팀", status: contract.security ? "예정" : "해당 없음" },
          { name: "계약 체결 준비", date: "2026-06-21", owner: "계약부", status: "예정" }
        ];
        addAudit("예상 일정 생성", contract.id, "기관 기준 적용");
        toast("예상 일정을 생성했습니다.");
        render();
      });
    }

    const requestReview = document.querySelector("#requestReview");
    if (requestReview) {
      requestReview.addEventListener("click", () => {
        contract.status = "CONTRACT_REVIEW";
        contract.history.unshift({ at: new Date().toLocaleString("ko-KR", { hour12: false }), user: currentUser().name, action: "검토 요청", note: "계약부서 검토함 등록" });
        if (!state.reviewTickets.some((ticket) => ticket.contractId === contract.id)) {
          state.reviewTickets.unshift({ id: "R-" + (100 + state.reviewTickets.length + 1), contractId: contract.id, status: "신규", due: "2026-06-14", assignee: "u-contract", risk: contract.risk });
        }
        state.notifications.unshift({ id: "N-" + Date.now(), to: "u-contract", title: "계약부서 검토 요청", contractId: contract.id, read: false, type: "검토" });
        addAudit("검토 요청", contract.id, "계약부 검토함 등록");
        toast("검토 요청을 전송했습니다.");
        render();
      });
    }
  }

  function bindReviewEvents() {
    const contract = state.contracts.find((item) => item.id === state.activeContractId);
    if (!contract) return;

    const requestRevision = document.querySelector("#requestRevision");
    if (requestRevision) {
      requestRevision.addEventListener("click", () => {
        contract.status = "REVISION";
        contract.history.unshift({ at: new Date().toLocaleString("ko-KR", { hour12: false }), user: currentUser().name, action: "보완 요청", note: "필수 첨부와 구버전 서식 확인" });
        state.notifications.unshift({ id: "N-" + Date.now(), to: contract.owner, title: "보완 요청 등록", contractId: contract.id, read: false, type: "보완" });
        addAudit("보완 요청", contract.id, "항목별 보완 요청");
        toast("보완 요청을 등록했습니다.");
        render();
      });
    }

    const approveReview = document.querySelector("#approveReview");
    if (approveReview) {
      approveReview.addEventListener("click", () => {
        contract.status = "REVIEW_DONE";
        contract.methodFinal = contract.methodCandidate.replace(" 후보", "").replace("우선 검토", "일반경쟁");
        contract.history.unshift({ at: new Date().toLocaleString("ko-KR", { hour12: false }), user: currentUser().name, action: "승인", note: `${contract.methodFinal} 확정` });
        state.reviewTickets = state.reviewTickets.filter((ticket) => ticket.contractId !== contract.id);
        addAudit("검토 승인", contract.id, contract.methodFinal);
        toast("검토 승인 처리했습니다.");
        render();
      });
    }

    const exceptionReview = document.querySelector("#exceptionReview");
    if (exceptionReview) {
      exceptionReview.addEventListener("click", () => {
        contract.status = "REVIEW_REQUIRED";
        addAudit("예외 검토 전환", contract.id, "법무·감사 검토 필요");
        toast("예외 검토 상태로 전환했습니다.");
        render();
      });
    }
  }

  function bindSearchEvents() {
    const runSearch = document.querySelector("#runSearch");
    if (runSearch) {
      runSearch.addEventListener("click", () => {
        const query = document.querySelector("#searchInput").value.trim();
        const type = document.querySelector("#searchType").value;
        const masked = /주민|계좌|[0-9]{6}-[0-9]{7}/.test(query);
        const sources = state.regulations.filter((reg) => type === "전체" || reg.summary.includes(type) || reg.name.includes("계약"));
        state.lastSearch = {
          query,
          type,
          masked,
          answer: sources.length
            ? `${type === "전체" ? "해당 계약" : type}은 규칙 엔진 판정 후 담당자 검토로 확정해야 합니다. 답변은 아래 조항을 근거로 제한 표시됩니다.`
            : "근거 확인 필요 상태입니다. 담당자 문의로 전환해야 합니다.",
          sources: sources.length ? sources : state.regulations.slice(0, 1)
        };
        addAudit("규정 검색", "AIQuery", masked ? "민감정보 마스킹 적용" : query);
        render();
      });
    }

    ["feedbackGood", "feedbackBad", "askManager"].forEach((id) => {
      const button = document.querySelector("#" + id);
      if (button) {
        button.addEventListener("click", () => {
          addAudit("검색 피드백", "AIQuery", button.textContent);
          toast("피드백을 저장했습니다.");
        });
      }
    });
  }

  function bindLifecycleEvents() {
    const contract = state.contracts.find((item) => item.id === state.activeContractId);
    if (!contract) return;
    const actions = {
      completeSigning: () => {
        contract.status = "IN_PROGRESS";
        contract.schedule = [
          { name: "착수계 확인", date: "2026-07-04", owner: "사업부서", status: "예정" },
          { name: "납품 준비", date: "2026-11-16", owner: "사업부서", status: "예정" },
          { name: "검사 요청", date: "2026-11-30", owner: "검사 담당", status: "예정" }
        ];
        return "체결 완료 후 이행 일정을 생성했습니다.";
      },
      changeContract: () => "변경 전후 비교표를 생성했습니다. 금액, 기간, 과업 변경 이력이 저장됩니다.",
      delayReview: () => {
        if (!state.reviewTickets.some((ticket) => ticket.contractId === contract.id && ticket.status === "지체 검토")) {
          state.reviewTickets.unshift({ id: "R-" + (100 + state.reviewTickets.length + 1), contractId: contract.id, status: "지체 검토", due: "2026-06-18", assignee: "u-contract", risk: "bad" });
        }
        return "지체 검토 티켓을 생성했습니다.";
      },
      requestInspection: () => {
        contract.status = "INSPECTION_REQUEST";
        return "검사 요청을 생성했습니다.";
      },
      finishInspection: () => {
        contract.status = "PAYMENT_READY";
        return "검사 완료 후 지급 준비 업무를 생성했습니다.";
      },
      finishPayment: () => {
        contract.status = "PAYMENT_DONE";
        return "지급 완료 처리했습니다.";
      },
      registerWarranty: () => {
        contract.status = "WARRANTY";
        contract.schedule.push({ name: "보증서 만료 검토", date: "2027-05-01", owner: "계약부", status: "예정" });
        return "하자관리 대상과 보증서 만료 알림을 등록했습니다.";
      }
    };
    Object.entries(actions).forEach(([id, handler]) => {
      const button = document.querySelector("#" + id);
      if (button) {
        button.addEventListener("click", () => {
          const message = handler();
          addAudit(button.textContent, contract.id, message);
          toast(message);
          render();
        });
      }
    });
  }

  function bindAdminEvents() {
    ["addRule", "testForm", "deployRules", "rollbackRules", "runRegression"].forEach((id) => {
      const button = document.querySelector("#" + id);
      if (button) {
        button.addEventListener("click", () => {
          addAudit(button.textContent, "Admin", "관리자 콘솔 작업");
          toast(`${button.textContent} 작업을 기록했습니다.`);
          render();
        });
      }
    });
    document.querySelectorAll("[data-change-role]").forEach((button) => {
      button.addEventListener("click", () => {
        addAudit("권한 변경 이력", button.dataset.changeRole, "변경 전후 값과 사유 기록");
        toast("권한 변경 이력을 기록했습니다.");
        render();
      });
    });
  }

  function bindAuditEvents() {
    const button = document.querySelector("#makeAuditPackage");
    if (button) {
      button.addEventListener("click", () => {
        addAudit("감사 패키지 생성", state.activeContractId, "근거·서류·로그 포함");
        toast("감사 패키지 미리보기를 생성했습니다.");
        render();
      });
    }
  }

  function renderView() {
    const parts = route().split("/");
    const key = parts[0] || "dashboard";
    const view = document.querySelector("#view");
    if (key === "dashboard") view.innerHTML = renderDashboard();
    else if (key === "new") view.innerHTML = renderNewContract();
    else if (key === "contracts") view.innerHTML = renderPrecheck(parts[1]);
    else if (key === "reviews") view.innerHTML = renderReviews();
    else if (key === "search") view.innerHTML = renderSearch();
    else if (key === "lifecycle") view.innerHTML = renderLifecycle();
    else if (key === "audit") view.innerHTML = renderAudit();
    else if (key === "admin") view.innerHTML = renderAdmin();
    else view.innerHTML = `<div class="empty">요청한 화면을 찾을 수 없습니다.</div>`;
    bindEvents();
  }

  function render() {
    renderShell();
    renderView();
    renderToasts();
  }

  window.addEventListener("hashchange", render);
  render();
})();
