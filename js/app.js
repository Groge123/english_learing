/* ==========================================================================
   砚台 · 应用逻辑
   Vanilla JS · 无构建步骤 · 数据保存在本地 localStorage
   ========================================================================== */
(function () {
  "use strict";

  const D = window.KY.DATA;
  const P = window.KY.PROMPTS;
  const E = window.KY.engine;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const app = $("#app");
  const modalRoot = $("#modal-root");
  const toastRoot = $("#toast-root");

  function showFatal(message, stack) {
    const overlay = document.getElementById("error-overlay");
    const splash = document.getElementById("boot-splash");
    if (splash) splash.remove();
    if (!overlay) return;
    overlay.hidden = false;
    overlay.innerHTML = `<div style="max-width:900px;margin:0 auto"><h2>页面出了点问题</h2><p>${String(message || "").replace(/[<>&]/g, "")}</p><pre>${String(stack || "").replace(/[<>&]/g, "")}</pre><button class="btn" onclick="location.reload()">刷新重试</button></div>`;
  }
  window.addEventListener("error", (ev) => showFatal(ev.message, ev.error && ev.error.stack));
  window.addEventListener("unhandledrejection", (ev) => showFatal(ev.reason && ev.reason.message, ev.reason && ev.reason.stack));

  const ROUTES = ["home", "big", "small", "prompts", "templates", "coach", "drafts"];
  const STORAGE = { big: "ky_big_v1", small: "ky_small_v1", api: "ky_api_v1", drafts: "ky_drafts_v1", favs: "ky_favs_v1", chat: "ky_chat_v1" };

  /* ------------------------------------------------------------------------
     Icons
     ------------------------------------------------------------------------ */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-7h6v7"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    letter: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    library: '<path d="M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
    sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 15.5 20 18l2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
    chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    picture: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    combo: '<rect x="3" y="4" width="8" height="7" rx="1"/><path d="M14 20v-6"/><path d="M18 20V9"/><path d="M22 20H2"/>',
    text: '<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h14"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2 2-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20h-3v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-2-2 .1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4v-3h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 2-2 .1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 2 2-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1H20v3h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2 2 9.3l6.9-1Z"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.4L3 16"/><path d="M3 21v-5h5"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    play: '<path d="m6 3 14 9-14 9Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    message: '<path d="M21 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    wand: '<path d="m15 4 5 5"/><path d="m13 6 5 5"/><path d="M3 21 14 10"/><path d="m5 3 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>',
    book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4Z"/><path d="M20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 12 9-9"/><path d="m17 3 4 4"/><path d="m14 6 4 4"/>'
  };

  function icon(name, cls) {
    return `<svg class="${cls || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  /* ------------------------------------------------------------------------
     State
     ------------------------------------------------------------------------ */
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* ignore quota */ }
  }

  const savedBig = read(STORAGE.big, null);
  const savedSmall = read(STORAGE.small, null);

  const state = {
    route: "home",
    big: savedBig ? Object.assign(E.defaultBigState(), savedBig, { review: null }) : E.defaultBigState(),
    small: savedSmall ? Object.assign(E.defaultSmallState(), savedSmall, { review: null }) : E.defaultSmallState(),
    api: Object.assign({
      baseUrl: "https://api.deepseek.com/v1",
      model: "deepseek-chat",
      apiKey: "",
      useProxy: true,
      provider: "deepseek"
    }, read(STORAGE.api, {})),
    drafts: read(STORAGE.drafts, []),
    favs: read(STORAGE.favs, []),
    chat: read(STORAGE.chat, []),
    ui: {
      bigTab: 0,
      smallTab: 0,
      promptKind: "big",
      promptExam: "全部",
      promptType: "全部",
      promptQuery: "",
      libKind: "big",
      libSection: "all",
      libQuery: "",
      bankGroup: "all",
      bankQuery: "",
      bankSelection: [],
      settingsOpen: false,
      picker: null,
      lastSaved: 0
    }
  };

  // Repair defaults for older saved states.
  if (!state.big.settings) state.big.settings = E.defaultBigState().settings;
  if (!state.big.shared) state.big.shared = E.defaultBigState().shared;
  if (!state.big.selections) state.big.selections = E.defaultBigState().selections;
  if (!state.big.fills) state.big.fills = {};
  if (!state.small.settings) state.small.settings = E.defaultSmallState().settings;
  if (!state.small.shared) state.small.shared = E.defaultSmallState().shared;
  if (!state.small.selections) state.small.selections = E.defaultSmallState().selections;
  if (!state.small.fills) state.small.fills = {};
  if (!state.small.bankIds) state.small.bankIds = [];
  if (!state.chat.length) {
    state.chat.push({
      role: "assistant",
      time: Date.now(),
      html: `<p>我是砚台，你的作文教练。左边选真题、右边写作文，我负责帮你把模板用对。</p><p>你可以先告诉我：<strong>今天想练大作文还是小作文？</strong>或者直接点下面的快捷问题。</p>`
    });
  }

  /* ------------------------------------------------------------------------
     Utility
     ------------------------------------------------------------------------ */
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function getPath(path) {
    return path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), state);
  }
  function setPath(path, value) {
    const parts = path.split(".");
    let obj = state;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]] || typeof obj[parts[i]] !== "object") obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }
  function debounce(fn, wait) {
    let t = null;
    return function () {
      const args = arguments;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  }
  const saveBig = debounce(() => write(STORAGE.big, state.big), 350);
  const saveSmall = debounce(() => write(STORAGE.small, state.small), 350);
  const saveChat = debounce(() => write(STORAGE.chat, state.chat.slice(-40)), 500);

  function routeFromHash() {
    const h = (location.hash || "").replace(/^#\/?/, "").split("?")[0];
    return ROUTES.includes(h) ? h : "home";
  }
  function navigate(route) {
    if (route === state.route) { render(); return; }
    location.hash = "#/" + route;
  }
  function toast(message, type) {
    const el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " is-error" : "");
    el.innerHTML = `<span class="t-icon">${type === "error" ? "!" : "✓"}</span><span>${E.escapeHtml(message)}</span>`;
    toastRoot.appendChild(el);
    setTimeout(() => { el.classList.add("is-out"); setTimeout(() => el.remove(), 240); }, 2400);
  }
  function fmtDate(ts) {
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function todayLabel() {
    const d = new Date();
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  function currentPrompt(kind) {
    const id = kind === "big" ? state.big.promptId : state.small.promptId;
    if (!id) return null;
    return (kind === "big" ? P.big : P.small).find((p) => p.id === id) || null;
  }
  function currentEssay(kind) {
    const s = kind === "big" ? state.big : state.small;
    if (s.manualText) return s.manualText;
    return kind === "big" ? E.composeBig(s) : E.composeSmall(s);
  }
  function currentWords(kind) { return E.countWords(currentEssay(kind)); }
  function bodyParagraphCount(kind, essay) {
    const paras = E.splitParagraphs(essay);
    if (kind !== "small") return paras.length;
    const body = paras.filter((p) => !/^(Dear\b|Yours\b|Best regards|Sincerely|Li Ming|Zhang Wei|Notice$|NOTICE$|Minutes of Meeting|Date:|Time:|Location:|Objective:|Attendees:|Recorded by:)/i.test(p.trim()));
    return Math.max(1, Math.min(3, body.length || paras.length));
  }
  const PREVIEW_SIGNATURES = [
    /it is apparent/i, /to be specific/i, /for one thing/i, /only through/i,
    /i am writing/i, /there are/i, /not only/i, /in conclusion/i, /all in all/i,
    /the majority of/i, /it is imperative/i, /from my perspective/i,
    /i wonder if/i, /we are badly in need/i, /the primary reasons/i,
    /i would like to/i, /looking forward/i, /it is a pleasure to inform/i,
    /the relevant matters/i, /welcome to join us/i, /the meeting commenced/i,
    /the meeting aimed/i, /the meeting agreed/i
  ];
  function coverageCount(text) {
    const s = String(text || "");
    return PREVIEW_SIGNATURES.filter((re) => re.test(s)).length;
  }
  function targetWords(kind) {
    if (kind === "small") return 100;
    return (kind === "big" ? state.big.exam : state.small.exam) === "英二" ? 150 : 180;
  }
  function rerenderKeepScroll() {
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
  }

  /* ------------------------------------------------------------------------
     Shell
     ------------------------------------------------------------------------ */
  function navItem(route, label, iconName, badge) {
    return `<a class="nav-item ${state.route === route ? "is-active" : ""}" href="#/${route}" data-nav="${route}">
      <span class="nav-icon">${icon(iconName)}</span><span>${label}</span>
      ${badge ? `<span class="nav-badge">${badge}</span>` : ""}
    </a>`;
  }

  function renderShell(viewHtml, wide) {
    const apiLive = !!state.api.apiKey;
    const crumb = {
      home: "训练台", big: "大作文工作台", small: "小作文工作台", prompts: "真题库",
      templates: "模板库", coach: "AI 教练", drafts: "我的练习"
    }[state.route] || "训练台";
    app.innerHTML = `
      <aside class="sidebar">
        <a class="brand" href="#/home" data-nav="home">
          <span class="brand-seal">砚</span>
          <span><span class="brand-name">砚台</span><span class="brand-sub">Kaoyan Writing Studio</span></span>
        </a>
        <div class="nav-label">Workspace</div>
        <nav class="nav">
          ${navItem("home", "训练台", "home")}
          ${navItem("big", "大作文", "pen", E.allBigOptions().length)}
          ${navItem("small", "小作文", "letter", E.allSmallOptions().length)}
          ${navItem("prompts", "真题库", "layers")}
          ${navItem("templates", "模板库", "library")}
          ${navItem("coach", "AI 教练", "sparkles")}
          ${navItem("drafts", "我的练习", "bookmark", state.drafts.length || "")}
        </nav>
        <div class="sidebar-spacer"></div>
        <div class="side-card">
          <h4>今天的练法</h4>
          <p>先套一篇真题，再用「AI 批改」找出 3 个可升级点，比背 10 句更有用。</p>
          <a class="side-link" href="#/prompts" data-nav="prompts">挑一道真题 →</a>
        </div>
        <div class="sidebar-foot">
          <span class="status-dot ${apiLive ? "" : "is-off"}"></span>
          <span>${apiLive ? "大模型已连接" : "本地教练模式"}</span>
        </div>
      </aside>
      <div class="main-col">
        <header class="topbar">
          <div class="topbar-crumb"><span>砚台</span><span class="crumb-sep">/</span><strong>${crumb}</strong></div>
          <div class="topbar-spacer"></div>
          <div class="top-actions">
            <span class="api-pill ${apiLive ? "is-live" : "is-local"}"><span class="dot"></span>${apiLive ? "AI 已就绪" : "本地模式"}</span>
            <button class="icon-btn" title="AI 设置" data-action="open-settings">${icon("settings")}</button>
            <button class="btn btn-primary btn-sm" data-action="new-big">${icon("plus")} 新写一篇</button>
          </div>
        </header>
        <main class="${wide ? "view is-wide" : "view"}" id="view">${viewHtml}</main>
      </div>`;
  }

  /* ------------------------------------------------------------------------
     Home
     ------------------------------------------------------------------------ */
  const QUOTES = [
    { en: "The chart above illustrates the changes in ... during which it rose steadily.", cn: "上方图表展示了……的变化，其在这一时期稳步上升。", tag: "图表总体描述" },
    { en: "Simple as the drawing is, it conveys a truth that ...", cn: "图画虽然简单，却蕴含着一个真理：……", tag: "图画主题句" },
    { en: "Three key reasons, from my perspective, account for this phenomenon.", cn: "在我看来，三个关键原因可以解释这一现象。", tag: "第二段过渡" },
    { en: "If we ignored the importance of ..., we would never become a better version of ourselves.", cn: "如果我们忽视……的重要性，就永远不会成为更好的自己。", tag: "虚拟语气" },
    { en: "Only through the joint efforts of all people can we effectively solve the problem.", cn: "只有通过所有人的共同努力，我们才能有效解决问题。", tag: "结尾展望" },
    { en: "I am writing to offer some suggestions on ...", cn: "我写信是为了就……提出一些建议。", tag: "小作文目的句" },
    { en: "It is imperative for the authorities to formulate policies to ...", cn: "当局必须制定政策来……", tag: "措施句" }
  ];

  function renderHome() {
    const today = new Date();
    const doy = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const quote = QUOTES[doy % QUOTES.length];
    const totalWords = state.drafts.reduce((sum, d) => sum + (d.words || 0), 0);
    const avgScore = state.drafts.filter((d) => d.score != null).length
      ? Math.round(state.drafts.filter((d) => d.score != null).reduce((s, d) => s + d.score, 0) / state.drafts.filter((d) => d.score != null).length)
      : null;
    const recent = state.drafts.slice(0, 4);

    const html = `
      <section class="hero">
        <div class="hero-main">
          <div class="hero-kicker"><span class="seal-mini">砚</span> 27 考研 · 英语一 / 英语二通用</div>
          <h1>把模板，<br>写成你的<em>分数</em>。</h1>
          <p class="hero-lead">大作文 <b>逐句套用</b>，小作文 <b>功能句拼装</b>。内置 ${E.allBigOptions().length + E.allSmallOptions().length}+ 个模板句、${P.big.length + P.small.length} 道历年真题。不是让你背更多，而是让你<b>用得出来</b>。</p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" data-action="new-big">${icon("pen")} 开始一篇大作文</button>
            <button class="btn btn-lg" data-nav="prompts">${icon("layers")} 打开真题库</button>
          </div>
          <div class="hero-meta">
            <div><strong>${E.allBigOptions().length}</strong><span>大作文模板句</span></div>
            <div><strong>${E.allSmallOptions().length}</strong><span>小作文功能句</span></div>
            <div><strong>${P.big.length + P.small.length}</strong><span>历年真题</span></div>
            <div><strong>3 段</strong><span>固定骨架</span></div>
          </div>
        </div>
        <div class="hero-aside">
          <div class="quote-card">
            <div class="quote-label">今日一句 · ${E.escapeHtml(quote.tag)}</div>
            <p class="quote-en">${E.escapeHtml(quote.en)}</p>
            <p class="quote-cn">${E.escapeHtml(quote.cn)}</p>
            <div class="quote-foot"><span>${todayLabel()}</span><span>背一句，用一句</span></div>
          </div>
          <div class="mini-plan">
            <h4>考前 20 天节奏</h4>
            <ol>
              <li>每天 1 篇真题，限时 25 分钟</li>
              <li>生成初稿 → 换 3 处主题词</li>
              <li>AI 批改 → 只改 2 个问题</li>
            </ol>
          </div>
        </div>
      </section>

      <div class="stats-strip">
        <div class="stat-card card"><span class="stat-icon">${icon("bookmark")}</span><div><div class="stat-value">${state.drafts.length}<small>篇</small></div><div class="stat-label">已保存练习</div></div></div>
        <div class="stat-card card"><span class="stat-icon is-accent">${icon("pen")}</span><div><div class="stat-value">${totalWords}<small>词</small></div><div class="stat-label">累计写作</div></div></div>
        <div class="stat-card card"><span class="stat-icon">${icon("target")}</span><div><div class="stat-value">${avgScore != null ? avgScore : "—"}<small>${avgScore != null ? "分" : ""}</small></div><div class="stat-label">平均预估分</div></div></div>
        <div class="stat-card card"><span class="stat-icon is-accent">${icon("layers")}</span><div><div class="stat-value">${P.big.length + P.small.length}<small>道</small></div><div class="stat-label">真题可练</div></div></div>
      </div>

      <div class="section-head">
        <div><h2>四个入口，一条路径</h2><p>不知道怎么开始？按顺序走一遍。</p></div>
      </div>
      <div class="feature-grid">
        <a class="feature-card card" href="#/big" data-nav="big">
          <span class="feature-num">01</span>
          <span class="feature-icon accent">${icon("chart")}</span>
          <h3>大作文 · 逐句套模板</h3>
          <p>图表 / 图画 / 文字 / 图画+图表。第一段换引入，第二三段通用，选一句填一句。</p>
          <span class="feature-link">进入工作台 ${icon("arrow")}</span>
        </a>
        <a class="feature-card card" href="#/small" data-nav="small">
          <span class="feature-num">02</span>
          <span class="feature-icon">${icon("letter")}</span>
          <h3>小作文 · 功能句拼装</h3>
          <p>书信 / 通知 / 纪要。弱化题型，强化功能：时间地点、目的、流程、要求、好处。</p>
          <span class="feature-link">进入工作台 ${icon("arrow")}</span>
        </a>
        <a class="feature-card card" href="#/prompts" data-nav="prompts">
          <span class="feature-num">03</span>
          <span class="feature-icon gold">${icon("layers")}</span>
          <h3>真题库 · 2001–2026</h3>
          <p>英一图画与图表、英二图表、小作文全部题型。点开就能带着数据开始写。</p>
          <span class="feature-link">挑一道真题 ${icon("arrow")}</span>
        </a>
        <a class="feature-card card" href="#/coach" data-nav="coach">
          <span class="feature-num">04</span>
          <span class="feature-icon ink">${icon("sparkles")}</span>
          <h3>AI 教练 · 审题 / 批改</h3>
          <p>本地教练免费可用；配置 API 后可逐句改写、生成个性化范文。</p>
          <span class="feature-link">和教练聊聊 ${icon("arrow")}</span>
        </a>
      </div>

      <div class="section-head"><div><h2>写作路径</h2><p>把“背模板”变成“用模板”。</p></div></div>
      <div class="path-grid">
        <div class="path-step"><div class="step-no">STEP 01</div><h4>选一道真题</h4><p>从题库带入题型、主题词和图表数据，不用自己抄题。</p></div>
        <div class="path-step"><div class="step-no">STEP 02</div><h4>拆成句子</h4><p>每段 3–4 句，每句都有待选模板和中文提示。</p></div>
        <div class="path-step"><div class="step-no">STEP 03</div><h3>填主题词</h3><p>只改主题词、好处、数据和一个身边例子，其余骨架保留。</p></div>
        <div class="path-step"><div class="step-no">STEP 04</div><h3>批改再改</h3><p>看字数、结构、模板覆盖和语言，只改最值得改的 2 处。</p></div>
      </div>

      <div class="home-lower">
        <div class="card card-pad">
          <div class="card-head"><div><h3 class="card-title">最近的练习</h3><p class="card-sub">保存在浏览器本地，不会上传。</p></div><button class="btn btn-sm" data-nav="drafts">全部 ${icon("arrow")}</button></div>
          ${recent.length ? `<div class="recent-list">${recent.map((d) => `
            <button class="recent-item" data-action="open-draft" data-id="${d.id}">
              <span class="r-icon">${d.kind === "small" ? "小" : "大"}</span>
              <span class="r-main"><span class="r-title">${E.escapeHtml(d.title)}</span><span class="r-meta">${d.words} 词 · ${fmtDate(d.time)} ${d.score != null ? "· 预估 " + d.score : ""}</span></span>
              ${icon("chevron")}
            </button>`).join("")}</div>` : `<div class="empty-mini">还没有练习。先写一篇，系统会自动保存到这里。</div>`}
        </div>
        <div class="card card-pad">
          <div class="card-head"><div><h3 class="card-title">模板库速览</h3><p class="card-sub">按段落、按功能查找。</p></div><button class="btn btn-sm" data-nav="templates">打开 ${icon("arrow")}</button></div>
          <div class="chip-row">
            <span class="chip chip-accent">图表总体描述</span><span class="chip">细节公式</span><span class="chip">社会现象</span>
            <span class="chip chip-jade">七大原因方案</span><span class="chip">总结措施</span><span class="chip chip-gold">50 个小作文功能句</span>
            <span class="chip">通知</span><span class="chip">纪要</span>
          </div>
          <div class="mt-2" style="padding:12px;border-radius:9px;background:var(--paper-3);border:1px solid #e2d6c2;font-size:11.5px;line-height:1.7;color:var(--ink-3)">
            <strong style="color:var(--ink)">使用原则：</strong>模板只保留骨架，主题词、好处、数据、例子必须自己换。一篇作文至少换 3 处，才不像模板。
          </div>
        </div>
      </div>
      <p class="tiny muted" style="margin:26px 2px 0;line-height:1.8">模板内容整理自你提供的《27 考研英语大 / 小作文模板》，真题整理自《考研英语作文真题题目汇总》。仅用于个人备考，原讲义版权归原作者所有。</p>`;
    renderShell(html, false);
  }

  /* ------------------------------------------------------------------------
     Big workspace
     ------------------------------------------------------------------------ */
  const GLOBAL_SETTINGS = new Set([
    "theme", "themeCn", "subject", "subjectCn", "benefit", "benefitCn", "year1", "year2",
    "chart", "trend", "trendCn", "trendNoun", "metric", "metricCn", "pictureType",
    "scene", "sceneCn", "idea", "ideaCn", "authorIdea", "authorIdeaCn", "agent", "agentCn",
    "audience", "audienceCn"
  ]);

  const ROLE_META = {
    overview: { name: "总体描述", en: "Overview" },
    detail: { name: "细节描述", en: "Details" },
    phenomenonTransition: { name: "现象过渡", en: "Transition" },
    phenomenon: { name: "社会现象", en: "Phenomenon" },
    pictureIntro: { name: "图画描述", en: "Description" },
    pictureThemeTransition: { name: "主题过渡", en: "Theme" },
    pictureIdea: { name: "中心思想", en: "Message" },
    textIntro: { name: "文字改写", en: "Paraphrase" },
    textView: { name: "作者观点", en: "Author" },
    stance: { name: "表明态度", en: "Stance" },
    transition: { name: "第二段过渡", en: "Transition" },
    reason1: { name: "原因一", en: "Reason 1" },
    reason2: { name: "原因二", en: "Reason 2" },
    reason3: { name: "原因三", en: "Reason 3" },
    conclusion: { name: "总结全文", en: "Conclusion" },
    measure1: { name: "措施一", en: "Measure 1" },
    measure2: { name: "措施二", en: "Measure 2" },
    future: { name: "畅想未来", en: "Outlook" }
  };

  function bigCardGroups(s) {
    const p1 = [];
    const push = (key, role, en, optionId) => p1.push({ key, role, roleEn: en || (ROLE_META[key]?.en || ""), optionId: optionId || s.selections[key] });
    if (s.type === "picture") {
      push("pictureIntro", "图画描述", "Description");
      push("pictureThemeTransition", "主题过渡", "Theme");
      push("pictureIdea", "中心思想（接上句）", "Message");
    } else if (s.type === "text") {
      push("textIntro", "文字改写", "Paraphrase");
      push("textView", "作者观点", "Author");
      push("stance", "表明态度", "Stance");
    } else if (s.type === "picture-chart") {
      push("pictureIntro", "图画 + 图表描述", "Description");
      push("pictureThemeTransition", "主题过渡", "Theme");
      push("pictureIdea", "中心思想（接上句）", "Message");
    } else {
      push("overview", "总体描述", "Overview");
      push("detail", "细节描述", "Details");
      push("phenomenonTransition", "现象过渡", "Transition");
      push("phenomenon", "社会现象（接上句）", "Phenomenon");
    }
    const p2 = [
      { key: "transition", role: "第二段过渡", roleEn: "Transition", optionId: s.selections.transition },
      { key: "reason1", role: "原因一", roleEn: "Reason 1", optionId: s.selections.reason1 },
      { key: "reason2", role: "原因二", roleEn: "Reason 2", optionId: s.selections.reason2 },
      { key: "reason3", role: "原因三", roleEn: "Reason 3", optionId: s.selections.reason3 }
    ];
    const p3 = [
      { key: "conclusion", role: "总结全文", roleEn: "Conclusion", optionId: s.selections.conclusion },
      { key: "measure1", role: "措施一", roleEn: "Measure 1", optionId: s.selections.measure1 },
      { key: "measure2", role: "措施二", roleEn: "Measure 2", optionId: s.selections.measure2 },
      { key: "future", role: "畅想未来", roleEn: "Outlook", optionId: s.selections.future }
    ];
    const typeLabel = { chart: "图表", picture: "图画", "picture-chart": "图画 + 图表", text: "文字" }[s.type] || "图表";
    return [
      { name: "第一段", sub: typeLabel + "引入 + 细节 + 主题", cards: p1 },
      { name: "第二段", sub: "过渡 + 三点原因", cards: p2 },
      { name: "第三段", sub: "总结 + 措施 + 展望", cards: p3 }
    ];
  }

  function renderBigView() {
    const s = state.big;
    const groups = bigCardGroups(s);
    const tab = Math.min(state.ui.bigTab, groups.length - 1);
    state.ui.bigTab = tab;
    const group = groups[tab];
    const totalCards = groups.reduce((n, g) => n + g.cards.length, 0);
    const words = E.countWords(E.composeBig(s));

    const html = `
      <div class="page-head">
        <div>
          <div class="eyebrow">Big Essay · 大作文</div>
          <h1 class="page-title">逐句套模板，先搭骨架再填肉</h1>
          <p class="page-sub">${s.type === "chart" ? "图表作文" : s.type === "picture" ? "图画作文" : s.type === "picture-chart" ? "图画 + 图表" : "文字作文"} · 目标 ${targetWords("big")} 词 · 已选 ${totalCards} 句 · 模板生成约 ${words} 词</p>
        </div>
        <div class="page-actions">
          <button class="btn" data-action="quick-outline">${icon("list")} 看提纲</button>
          <button class="btn" data-action="open-settings">${icon("settings")} AI 设置</button>
          <button class="btn btn-primary" data-action="generate-big">${icon("wand")} 生成初稿</button>
        </div>
      </div>
      <div class="workspace-grid">
        <aside class="ws-side">${bigSetupPanel(s)}</aside>
        <section class="ws-main">
          <div class="ws-main-head">
            <div><h2>${group.name} · ${group.sub}</h2><div class="sub">点「换一句」切换待选模板；黄色空格都可以替换。</div></div>
            <button class="btn btn-sm" data-action="open-picker" data-section="${group.cards[0]?.key || "overview"}">${icon("layers")} 本段句型</button>
          </div>
          <div class="para-tabs">
            ${groups.map((g, i) => `<button class="para-tab ${i === tab ? "is-active" : ""}" data-action="big-tab" data-index="${i}"><span class="p-badge">${i + 1}</span>${g.name}<span class="p-meta">${g.cards.length} 句</span></button>`).join("")}
          </div>
          <div class="sentence-list">
            ${group.cards.map((card, i) => renderBigCard(card, i)).join("")}
          </div>
        </section>
        <aside class="ws-preview" id="preview-col">${previewPanel("big")}</aside>
      </div>`;
    renderShell(html, true);
  }

  function bigSetupPanel(s) {
    const p = currentPrompt("big");
    const promptOptions = (exam) => P.big.filter((x) => x.exam === exam).map((x) => `<option value="${x.id}" ${s.promptId === x.id ? "selected" : ""}>${x.year} · ${E.escapeHtml(x.topic)}（${E.escapeHtml(x.typeName)}）</option>`).join("");
    return `
      <div class="side-panel card">
        <h3><span class="num">1</span> 选择题目</h3>
        <div class="form-stack">
          <div class="segmented is-full">
            <button class="${s.exam === "英一" ? "is-active" : ""}" data-action="set-exam" data-kind="big" data-value="英一">英语一</button>
            <button class="${s.exam === "英二" ? "is-active" : ""}" data-action="set-exam" data-kind="big" data-value="英二">英语二</button>
          </div>
          <div class="field">
            <label>题型</label>
            <select class="select" data-bind="big.type" data-rerender="true">
              ${D.big.scenarios.map((x) => `<option value="${x.id}" ${s.type === x.id ? "selected" : ""}>${x.name} · ${x.en}</option>`).join("")}
            </select>
          </div>
          ${s.type === "chart" ? `<div class="field"><label>图表场景</label><select class="select" data-bind="big.scenario" data-rerender="true">${D.big.chartScenarios.map((x) => `<option value="${x.id}" ${s.scenario === x.id ? "selected" : ""}>${x.name} · ${x.example}</option>`).join("")}</select></div>` : ""}
          <div class="field">
            <label>真题 <span class="en">${p ? p.year + " " + p.exam : "可选"}</span></label>
            <select class="select" data-action="load-big-prompt">
              <option value="">自定义 / 不套真题</option>
              <optgroup label="英语一">${promptOptions("英一")}</optgroup>
              <optgroup label="英语二">${promptOptions("英二")}</optgroup>
            </select>
          </div>
          ${p ? `<div class="prompt-brief"><strong>${E.escapeHtml(p.topic)}</strong>${E.escapeHtml(p.prompt)}
            ${p.points?.length ? `<ul class="brief-points">${p.points.map((x) => `<li>${E.escapeHtml(x)}</li>`).join("")}</ul>` : ""}
            ${p.data ? `<div class="brief-data">${E.escapeHtml(p.data)}</div>` : ""}</div>` : `<div class="prompt-brief">当前是自定义题目。先在下方填写主题词，或从真题库选一道题自动带入。</div>`}
        </div>
      </div>

      <div class="side-panel card">
        <h3><span class="num">2</span> 主题与数据</h3>
        <div class="form-stack">
          <div class="field"><label>主题词（英文）<span class="en">theme</span></label><input class="input" data-bind="big.settings.theme" value="${E.escapeHtml(s.settings.theme || "")}" placeholder="Chinese residents' health literacy level"></div>
          <div class="field"><label>主题词（中文）</label><input class="input" data-bind="big.settings.themeCn" value="${E.escapeHtml(s.settings.themeCn || "")}" placeholder="中国居民健康素养水平"></div>
          <div class="form-grid">
            <div class="field"><label>写作对象</label><input class="input" data-bind="big.settings.subject" value="${E.escapeHtml(s.settings.subject || "")}" placeholder="Chinese residents"></div>
            <div class="field"><label>对象中文</label><input class="input" data-bind="big.settings.subjectCn" value="${E.escapeHtml(s.settings.subjectCn || "")}" placeholder="中国居民"></div>
          </div>
          <div class="field"><label>好处 / 方面 <span class="en">benefit</span></label><input class="input" data-bind="big.settings.benefit" value="${E.escapeHtml(s.settings.benefit || "")}" placeholder="public health"></div>
          <div class="form-grid">
            <div class="field"><label>起始年</label><input class="input" data-bind="big.settings.year1" value="${E.escapeHtml(s.settings.year1 || "")}" placeholder="2012"></div>
            <div class="field"><label>结束年</label><input class="input" data-bind="big.settings.year2" value="${E.escapeHtml(s.settings.year2 || "")}" placeholder="2021"></div>
          </div>
          <div class="field"><label>图表类型 <span class="en">chart</span></label><select class="select" data-bind="big.settings.chart">${["line chart", "bar chart", "pie chart", "table", "chart"].map((x) => `<option value="${x}" ${s.settings.chart === x ? "selected" : ""}>${x}</option>`).join("")}</select></div>
        </div>
      </div>

      <div class="side-panel card">
        <h3><span class="num">3</span> 高级设定</h3>
        <details class="form-stack" ${s.type === "picture" || s.type === "picture-chart" ? "open" : ""}>
          <summary style="cursor:pointer;font-size:11px;color:var(--muted);margin-bottom:8px">图画 / 文字 / 趋势细节</summary>
          ${s.type === "picture" || s.type === "picture-chart" ? `
            <div class="field"><label>画面描述（英）</label><textarea class="textarea" data-bind="big.settings.scene" rows="3">${E.escapeHtml(s.settings.scene || "")}</textarea></div>
            <div class="field"><label>画面描述（中）</label><textarea class="textarea" data-bind="big.settings.sceneCn" rows="2">${E.escapeHtml(s.settings.sceneCn || "")}</textarea></div>
            <div class="field"><label>中心思想（英）</label><textarea class="textarea" data-bind="big.settings.idea" rows="2">${E.escapeHtml(s.settings.idea || "")}</textarea></div>
          ` : ""}
          ${s.type === "text" ? `
            <div class="field"><label>作者观点（英）</label><textarea class="textarea" data-bind="big.settings.authorIdea" rows="3">${E.escapeHtml(s.settings.authorIdea || "")}</textarea></div>
            <div class="field"><label>作者观点（中）</label><textarea class="textarea" data-bind="big.settings.authorIdeaCn" rows="2">${E.escapeHtml(s.settings.authorIdeaCn || "")}</textarea></div>
          ` : ""}
          <div class="form-grid">
            <div class="field"><label>趋势动词</label><input class="input" data-bind="big.settings.trend" value="${E.escapeHtml(s.settings.trend || "")}" placeholder="rose steadily"></div>
            <div class="field"><label>趋势名词</label><input class="input" data-bind="big.settings.trendNoun" value="${E.escapeHtml(s.settings.trendNoun || "")}" placeholder="a steady rise"></div>
          </div>
          <div class="field"><label>数据指标</label><input class="input" data-bind="big.settings.metric" value="${E.escapeHtml(s.settings.metric || "")}" placeholder="health literacy level"></div>
        </details>
      </div>

      <div class="side-panel card">
        <h3><span class="num">4</span> 快速操作</h3>
        <div class="form-stack">
          <button class="btn btn-jade btn-block" data-action="generate-big">${icon("wand")} 按当前模板生成初稿</button>
          <button class="btn btn-block" data-action="quick-outline">${icon("list")} 查看三段提纲</button>
          <button class="btn btn-ghost btn-block" data-action="reset-big">${icon("refresh")} 重置本篇设定</button>
        </div>
      </div>`;
  }

  function renderBigCard(card, index) {
    const opt = E.getBigOption(card.optionId);
    if (!opt) return "";
    return renderSentenceCard({
      kind: "big",
      section: card.key,
      option: opt,
      index: index + 1,
      role: card.role,
      roleEn: card.roleEn,
      scheme: (E.bigIndex.get(opt.id) || {}).schemeName || "",
      removable: false
    });
  }

  /* ------------------------------------------------------------------------
     Small workspace
     ------------------------------------------------------------------------ */
  const SMALL_ROLES = {
    greeting: { name: "寒暄", en: "Greeting" },
    selfIntro: { name: "自我介绍", en: "Introduction" },
    purpose: { name: "写信目的", en: "Purpose" },
    secondTransition: { name: "第二段过渡", en: "Transition" },
    bank: { name: "功能句", en: "Function" },
    thirdEmotion: { name: "表达情感", en: "Emotion" },
    thirdReply: { name: "期待回信", en: "Reply" },
    noticeFirst: { name: "通知概况", en: "Overview" },
    noticeSecond: { name: "通知目的", en: "Purpose" },
    noticeThird: { name: "邀请 / 报名", en: "Action" },
    minutesIntro: { name: "导入", en: "Opening" },
    minutesPurpose: { name: "会议目的", en: "Purpose" },
    minutesSpeech: { name: "发言", en: "Speech" },
    minutesAgree: { name: "赞同", en: "Agreement" },
    minutesDecision: { name: "决定", en: "Decision" },
    minutesNext: { name: "下次会议", en: "Next" }
  };

  function renderSmallView() {
    const s = state.small;
    const groups = smallCardGroups(s);
    const tab = Math.min(state.ui.smallTab, groups.length - 1);
    state.ui.smallTab = tab;
    const group = groups[tab];
    const words = E.countWords(E.composeSmall(s));

    const html = `
      <div class="page-head">
        <div>
          <div class="eyebrow">Small Essay · 小作文</div>
          <h1 class="page-title">弱化题型，强化功能</h1>
          <p class="page-sub">${s.type === "notice" ? "通知 / 告示" : s.type === "minutes" ? "会议纪要" : "书信 / Email"} · 目标 100 词 · 当前模板生成约 ${words} 词</p>
        </div>
        <div class="page-actions">
          <button class="btn" data-action="new-small">${icon("plus")} 新写小作文</button>
          <button class="btn" data-action="open-settings">${icon("settings")} AI 设置</button>
          <button class="btn btn-primary" data-action="generate-small">${icon("wand")} 生成初稿</button>
        </div>
      </div>
      <div class="workspace-grid is-small">
        <aside class="ws-side">${smallSetupPanel(s)}</aside>
        <section class="ws-main">
          <div class="ws-main-head">
            <div><h2>${group.name} · ${group.sub}</h2><div class="sub">${s.type === "letter" ? "称呼 + 目的 + 分点 + 情感，四块拼完就是一篇。" : s.type === "notice" ? "格式 + 概况 + 细节 + 报名，四块拼完。" : "格式头 + 五句话，纪要就完成了。"}</div></div>
            ${s.type === "letter" || s.type === "notice" ? `<button class="btn btn-sm" data-action="open-bank">${icon("plus")} 功能句库</button>` : ""}
          </div>
          <div class="para-tabs">
            ${groups.map((g, i) => `<button class="para-tab ${i === tab ? "is-active" : ""}" data-action="small-tab" data-index="${i}"><span class="p-badge">${i + 1}</span>${g.name}<span class="p-meta">${g.cards.length} 句</span></button>`).join("")}
          </div>
          <div class="sentence-list">
            ${renderSmallGroup(group, s)}
          </div>
        </section>
        <aside class="ws-preview" id="preview-col">${previewPanel("small")}</aside>
      </div>`;
    renderShell(html, true);
  }

  function smallCardGroups(s) {
    if (s.type === "notice") {
      return [
        { name: "格式", sub: "标题 + 日期", cards: [{ key: "format", special: "notice-format" }] },
        { name: "第一段", sub: "通知概况 + 目的", cards: [
          { key: "noticeFirst", role: "通知概况", roleEn: "Overview", optionId: s.selections.noticeFirst },
          { key: "noticeSecond", role: "通知目的", roleEn: "Purpose", optionId: s.selections.noticeSecond }
        ] },
        { name: "第二段", sub: "时间地点 + 对象 + 流程 + 奖励", cards: (s.bankIds || []).map((id) => ({ key: "bank", role: "功能句", roleEn: "Function", optionId: id, removable: true })) },
        { name: "第三段", sub: "邀请 + 报名方式", cards: [{ key: "noticeThird", role: "邀请 / 报名", roleEn: "Action", optionId: s.selections.noticeThird }] }
      ];
    }
    if (s.type === "minutes") {
      return [
        { name: "纪要头", sub: "时间 / 地点 / 目的 / 参会人", cards: [{ key: "minutesHeader", special: "minutes-header" }] },
        { name: "正文", sub: "导入 + 目的 + 发言 + 赞同 + 决定", cards: [
          { key: "minutesIntro", role: "导入", roleEn: "Opening", optionId: s.selections.minutesIntro },
          { key: "minutesPurpose", role: "会议目的", roleEn: "Purpose", optionId: s.selections.minutesPurpose },
          { key: "minutesSpeech", role: "发言", roleEn: "Speech", optionId: s.selections.minutesSpeech },
          { key: "minutesAgree", role: "赞同", roleEn: "Agreement", optionId: s.selections.minutesAgree },
          { key: "minutesDecision", role: "决定", roleEn: "Decision", optionId: s.selections.minutesDecision }
        ] }
      ];
    }
    return [
      { name: "开头", sub: "称呼 + 寒暄 + 写信目的", cards: [
        { key: "letterHeader", special: "letter-header" },
        ...(s.mode === "passive"
          ? [{ key: "greeting", role: "寒暄", roleEn: "Greeting", optionId: s.greetingId }]
          : [{ key: "selfIntro", role: "自我介绍", roleEn: "Introduction", optionId: s.selfIntroId }]),
        { key: "purpose", role: "写信目的", roleEn: "Purpose", special: "purpose" }
      ] },
      { name: "第二段", sub: "过渡 + 2~3 个分点", cards: [
        { key: "secondTransition", role: "第二段过渡", roleEn: "Transition", optionId: s.transitionId },
        ...(s.bankIds || []).map((id) => ({ key: "bank", role: "功能句", roleEn: "Function", optionId: id, removable: true }))
      ] },
      { name: "结尾", sub: "情感 + 期待回信 + 落款", cards: [
        { key: "thirdEmotion", role: "表达情感", roleEn: "Emotion", optionId: s.emotionId },
        { key: "thirdReply", role: "期待回信", roleEn: "Reply", optionId: s.replyId },
        { key: "letterFooter", special: "letter-footer" }
      ] }
    ];
  }

  function renderSmallGroup(group, s) {
    let out = "";
    group.cards.forEach((card, i) => {
      if (card.special === "letter-header") out += renderLetterHeader(s);
      else if (card.special === "letter-footer") out += renderLetterFooter(s);
      else if (card.special === "purpose") out += renderPurposeCard(s);
      else if (card.special === "notice-format") out += renderNoticeFormat(s);
      else if (card.special === "minutes-header") out += renderMinutesHeader(s);
      else out += renderSmallCard(card, i, s);
    });
    if (group.name === "第二段" && (s.type === "letter" || s.type === "notice")) {
      out += `<button class="add-sentence" data-action="open-bank">${icon("plus")} 从功能句库添加一句（时间地点 / 目的 / 流程 / 要求 / 好处）</button>`;
    }
    return out;
  }

  function renderSmallCard(card, index, s) {
    const opt = E.getSmallOption(card.optionId);
    if (!opt) return "";
    const entry = E.smallIndex.get(opt.id) || {};
    return renderSentenceCard({
      kind: "small",
      section: card.key,
      option: opt,
      index: index + 1,
      role: card.role || SMALL_ROLES[entry.section]?.name || "功能句",
      roleEn: card.roleEn || SMALL_ROLES[entry.section]?.en || "",
      scheme: entry.groupName || "",
      removable: !!card.removable
    });
  }

  function renderLetterHeader(s) {
    const needsName = ["sa1", "sa2", "sa3"].includes(s.salutationId);
    return `<article class="sentence-card card">
      <div class="s-head"><span class="s-no">1</span><div><div class="s-role">称呼与格式</div><div class="s-role-en">Salutation</div></div><div class="s-head-spacer"></div><span class="s-option-name">格式分不能丢</span></div>
      <div class="s-body">
        <div class="form-grid">
          <div class="field ${needsName ? "" : "span-2"}"><label>称呼</label><select class="select" data-bind="small.salutationId" data-rerender="true">${D.small.salutations.map((x) => `<option value="${x.id}" ${s.salutationId === x.id ? "selected" : ""}>${E.escapeHtml(x.en.replace("{lastName}", "Lee").replace("{firstName}", "Paul"))}</option>`).join("")}</select></div>
          ${needsName ? `<div class="field"><label>收信人姓 / 名</label><input class="input" data-bind="small.settings.lastName" value="${E.escapeHtml(s.settings.lastName || "Lee")}" placeholder="Lee"></div>` : ""}
        </div>
        <div class="s-tip"><b>格式：</b>称呼顶格，正文缩进或空一行；结尾 Yours sincerely, 右下角署名。题干说“Do not write the address”就不要写地址。</div>
      </div>
    </article>`;
  }

  function renderLetterFooter(s) {
    return `<article class="sentence-card card">
      <div class="s-head"><span class="s-no">4</span><div><div class="s-role">落款</div><div class="s-role-en">Sign-off</div></div></div>
      <div class="s-body">
        <div class="form-grid">
          <div class="field"><label>结尾敬语</label><select class="select" data-bind="small.closing" data-rerender="true">${D.small.closings.map((x) => `<option value="${x.en}" ${s.closing === x.en ? "selected" : ""}>${E.escapeHtml(x.en)}</option>`).join("")}</select></div>
          <div class="field"><label>署名</label><input class="input" data-bind="small.signature" value="${E.escapeHtml(s.signature || "Li Ming")}"></div>
        </div>
        <div class="s-tip"><b>注意：</b>题干要求用 Li Ming / Zhang Wei 时，必须一字不差；不要写自己的真实姓名。</div>
      </div>
    </article>`;
  }

  function renderPurposeCard(s) {
    const opt = E.getSmallOption(s.selections.purpose || "pu-suggest") || D.small.purposes[0];
    const values = E.mergedValues("small", s, opt.id);
    const fields = (opt.fields || []);
    return `<article class="sentence-card card" data-sentence-special="purpose">
      <div class="s-head"><span class="s-no">2</span><div><div class="s-role">写信目的</div><div class="s-role-en">Purpose</div></div><div class="s-head-spacer"></div><span class="s-option-name">${E.escapeHtml(E.fillPlain(opt.cn, values))}</span></div>
      <div class="s-body">
        <div class="sentence-en" data-sentence-special="purpose-en">${s.mode === "passive" ? "I am writing to " : "I am writing to "}<span class="blank">${E.escapeHtml(E.fillPlain(opt.en, values))}</span>.</div>
        <p class="sentence-cn">我写信是为了${E.escapeHtml(E.fillPlain(opt.cn, values))}。</p>
        ${fields.length ? `<div class="s-fields">${fields.map((key) => fieldInput("small", opt.id, key, values, s)).join("")}</div>` : ""}
        <div class="s-actions"><div class="left"><button class="tiny-btn" data-action="open-purpose-picker">${icon("refresh")} 换一个目的</button></div></div>
        <div class="s-tip"><b>一句话说清楚：</b>建议 / 邀请 / 感谢 / 道歉 / 投诉 / 咨询 / 答复。不要在第一段写细节，细节留给第二段。</div>
      </div>
    </article>`;
  }

  function renderNoticeFormat(s) {
    return `<article class="sentence-card card">
      <div class="s-head"><span class="s-no">1</span><div><div class="s-role">通知格式</div><div class="s-role-en">Notice Format</div></div></div>
      <div class="s-body">
        <div class="form-grid">
          <div class="field"><label>标题</label><select class="select" data-bind="small.title" data-rerender="true"><option value="Notice" ${s.title === "Notice" ? "selected" : ""}>Notice</option><option value="NOTICE" ${s.title === "NOTICE" ? "selected" : ""}>NOTICE</option></select></div>
          <div class="field"><label>日期</label><input class="input" data-bind="small.settings.date" value="${E.escapeHtml(s.settings.date || "")}"></div>
        </div>
        <div class="s-tip"><b>格式：</b>标题居中；正文另起；右下角署名 + 日期。通知 = 换格式的书信。</div>
      </div>
    </article>`;
  }

  function renderMinutesHeader(s) {
    return `<article class="sentence-card card">
      <div class="s-head"><span class="s-no">1</span><div><div class="s-role">纪要头</div><div class="s-role-en">Header</div></div></div>
      <div class="s-body">
        <div class="form-grid">
          <div class="field"><label>Date</label><input class="input" data-bind="small.date" value="${E.escapeHtml(s.date || "")}"></div>
          <div class="field"><label>Time</label><input class="input" data-bind="small.time" value="${E.escapeHtml(s.time || "")}"></div>
          <div class="field"><label>Location</label><input class="input" data-bind="small.place" value="${E.escapeHtml(s.place || "")}"></div>
          <div class="field"><label>Attendees</label><input class="input" data-bind="small.attendees" value="${E.escapeHtml(s.attendees || "")}"></div>
          <div class="field span-2"><label>Objective</label><input class="input" data-bind="small.objective" value="${E.escapeHtml(s.objective || "")}"></div>
        </div>
        <div class="s-tip"><b>纪要：</b>本质是换格式的书信。Objective 改写自题干，短语即可。</div>
      </div>
    </article>`;
  }

  function smallSetupPanel(s) {
    const promptOptions = P.small.map((x) => `<option value="${x.id}" ${s.promptId === x.id ? "selected" : ""}>${x.year} ${x.exam} · ${E.escapeHtml(x.topic)}（${E.escapeHtml(x.type === "letter" ? "书信" : x.type === "notice" ? "通知" : "纪要")}）</option>`).join("");
    return `
      <div class="side-panel card">
        <h3><span class="num">1</span> 选择题目</h3>
        <div class="form-stack">
          <div class="segmented is-full">
            <button class="${s.exam === "英一" ? "is-active" : ""}" data-action="set-exam" data-kind="small" data-value="英一">英语一</button>
            <button class="${s.exam === "英二" ? "is-active" : ""}" data-action="set-exam" data-kind="small" data-value="英二">英语二</button>
          </div>
          <div class="field"><label>文体</label><select class="select" data-bind="small.type" data-rerender="true">${D.small.types.map((x) => `<option value="${x.id}" ${s.type === x.id ? "selected" : ""}>${x.name} · ${x.en}</option>`).join("")}</select></div>
          ${s.type === "letter" ? `<div class="field"><label>书信类型</label><select class="select" data-bind="small.subtype" data-rerender="true">${D.small.letterSubtypes.map((x) => `<option value="${x.id}" ${s.subtype === x.id ? "selected" : ""}>${x.name}</option>`).join("")}</select></div>` : ""}
          <div class="field"><label>真题</label><select class="select" data-action="load-small-prompt"><option value="">自定义 / 不套真题</option>${promptOptions}</select></div>
          ${currentPrompt("small") ? `<div class="prompt-brief"><strong>${E.escapeHtml(currentPrompt("small").topic)}</strong>${E.escapeHtml(currentPrompt("small").prompt)}${currentPrompt("small").points?.length ? `<ul class="brief-points">${currentPrompt("small").points.map((x) => `<li>${E.escapeHtml(x)}</li>`).join("")}</ul>` : ""}</div>` : ""}
        </div>
      </div>
      <div class="side-panel card">
        <h3><span class="num">2</span> 收信人与场景</h3>
        <div class="form-stack">
          ${s.type === "letter" ? `<div class="field"><label>收信人</label><input class="input" data-bind="small.settings.audience" value="${E.escapeHtml(s.settings.audience || "")}" placeholder="international students"></div>` : ""}
          ${s.type === "minutes" ? `
            <div class="field"><label>会议目的 Objective</label><input class="input" data-bind="small.objective" value="${E.escapeHtml(s.objective || "")}" placeholder="Review the activity held last week"></div>
            <div class="field"><label>参会人 Attendees</label><input class="input" data-bind="small.attendees" value="${E.escapeHtml(s.attendees || "")}" placeholder="All members"></div>
          ` : `
            <div class="field"><label>活动 / 事件</label><input class="input" data-bind="small.settings.event" value="${E.escapeHtml(s.settings.event || "")}" placeholder="a campus food festival"></div>
            <div class="form-grid">
              <div class="field"><label>地点</label><input class="input" data-bind="small.settings.place" value="${E.escapeHtml(s.settings.place || "")}" placeholder="the playground"></div>
              <div class="field"><label>日期</label><input class="input" data-bind="small.settings.date" value="${E.escapeHtml(s.settings.date || "")}" placeholder="next Sunday"></div>
            </div>
          `}
          <div class="field"><label>主题（topic）</label><input class="input" data-bind="small.settings.topic" value="${E.escapeHtml(s.settings.topic || "")}" placeholder="traditional Chinese culture"></div>
          ${s.type === "letter" ? `<div class="field"><label>写作类型</label><div class="chip-row"><span class="chip chip-accent">${E.escapeHtml((D.small.letterSubtypes.find((x) => x.id === s.subtype) || {}).name || "书信")}</span><span class="chip ${s.mode === "passive" ? "chip-gold" : "chip-jade"}">${s.mode === "passive" ? "回复来信" : "主动写信"}</span></div></div>` : ""}
        </div>
      </div>
      <div class="side-panel card">
        <h3><span class="num">3</span> 写法</h3>
        <div class="form-stack">
          ${s.type === "letter" ? `<div class="field"><label>主动 / 被动</label><div class="segmented is-full"><button class="${s.mode === "active" ? "is-active" : ""}" data-action="set-small-mode" data-value="active">主动写信</button><button class="${s.mode === "passive" ? "is-active" : ""}" data-action="set-small-mode" data-value="passive">回复来信</button></div></div>
          <label style="display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink-3)"><input type="checkbox" data-bind="small.includeSelfIntro" ${s.includeSelfIntro ? "checked" : ""}> 公务信函，需要自我介绍</label>` : ""}
          <div class="field"><label>过渡句</label><select class="select" data-bind="small.transitionId" data-rerender="true">${D.small.secondTransitions.map((x) => `<option value="${x.id}" ${s.transitionId === x.id ? "selected" : ""}>${E.escapeHtml(x.name)}</option>`).join("")}</select></div>
          <div class="field"><label>结尾情感</label><select class="select" data-bind="small.emotionId" data-rerender="true">${D.small.thirdEmotion.map((x) => `<option value="${x.id}" ${s.emotionId === x.id ? "selected" : ""}>${E.escapeHtml(x.name)}</option>`).join("")}</select></div>
          <button class="btn btn-jade btn-block" data-action="generate-small">${icon("wand")} 生成初稿</button>
          <button class="btn btn-ghost btn-block" data-action="reset-small">${icon("refresh")} 重置本篇</button>
        </div>
      </div>`;
  }

  /* ------------------------------------------------------------------------
     Sentence card (shared)
     ------------------------------------------------------------------------ */
  function fieldInput(kind, optionId, key, values, s) {
    const isGlobal = GLOBAL_SETTINGS.has(key);
    const path = isGlobal ? `${kind}.settings.${key}` : `${kind}.fills.${optionId}.${key}`;
    const val = values[key] == null ? "" : values[key];
    const current = isGlobal ? (getPath(path) || "") : val;
    return `<div class="field"><label>${E.escapeHtml(E.label(key))}</label><input class="input" data-bind="${path}" value="${E.escapeHtml(current)}" placeholder="${E.escapeHtml(E.label(key))}"></div>`;
  }

  function renderSentenceCard({ kind, section, option, index, role, roleEn, scheme, removable }) {
    const s = kind === "big" ? state.big : state.small;
    const values = E.mergedValues(kind, s, option.id);
    const enHtml = E.fillHtml(option.en, values);
    const cn = E.fillPlain(option.cn, values, "……");
    let fields = (option.fields || []).filter((key) => !GLOBAL_SETTINGS.has(key) || !values[key]);
    if (kind === "small") {
      fields = (option.fields || []).filter((key) => !["audience", "event", "place", "date", "topic", "object"].includes(key) || !values[key]);
    }
    const uidAttr = "s-" + option.id;
    return `<article class="sentence-card card" data-option-card="${option.id}">
      <div class="s-head">
        <span class="s-no">${index}</span>
        <div><div class="s-role">${E.escapeHtml(role)}</div><div class="s-role-en">${E.escapeHtml(roleEn || "")}</div></div>
        <div class="s-head-spacer"></div>
        ${scheme ? `<span class="s-option-name" style="background:var(--gold-soft);border-color:#e6d2a7;color:#7c5a1f">${E.escapeHtml(scheme)}</span>` : ""}
        <span class="s-option-name" title="${E.escapeHtml(option.name)}">${E.escapeHtml(option.name)}</span>
      </div>
      <div class="s-body">
        <div class="sentence-en" data-sentence-kind="${kind}" data-sentence-option="${option.id}">${enHtml}</div>
        <p class="sentence-cn" data-cn-kind="${kind}" data-cn-option="${option.id}">${E.escapeHtml(cn)}</p>
        ${fields.length ? `<details class="s-fields-wrap" ${fields.length <= 6 ? "open" : ""}>
          <summary>本句填空 · ${fields.length} 处</summary>
          <div class="s-fields">${fields.map((key) => fieldInput(kind, option.id, key, values, s)).join("")}</div>
        </details>` : ""}
        ${option.tip ? `<div class="s-tip"><b>提示：</b>${E.escapeHtml(option.tip)}</div>` : ""}
        <div class="s-actions">
          <div class="left">
            <button class="tiny-btn" data-action="open-picker" data-kind="${kind}" data-section="${section}" data-option="${option.id}">${icon("refresh")} 换一句</button>
            <button class="tiny-btn" data-action="copy-sentence" data-kind="${kind}" data-option="${option.id}">${icon("copy")} 复制英文</button>
            <button class="tiny-btn ${isFav(option.id) ? "is-on" : ""}" data-action="toggle-fav" data-id="${option.id}">${icon("star")} ${isFav(option.id) ? "已收藏" : "收藏"}</button>
            ${removable ? `<button class="tiny-btn" data-action="remove-bank" data-id="${option.id}">${icon("trash")} 移除</button>` : ""}
          </div>
          <div class="right"><span class="tiny muted">${option.en.includes("{") ? "含 " + (option.en.match(/\{\w+\}/g) || []).length + " 个空" : "无需填空"}</span></div>
        </div>
      </div>
    </article>`;
  }

  /* ------------------------------------------------------------------------
     Preview
     ------------------------------------------------------------------------ */
  function previewPanel(kind) {
    const essay = currentEssay(kind);
    const words = E.countWords(essay);
    const target = targetWords(kind);
    const pct = Math.min(100, Math.round(words / target * 100));
    const paras = bodyParagraphCount(kind, essay);
    const coverage = Math.min(12, coverageCount(essay));
    const s = kind === "big" ? state.big : state.small;
    return `<div class="preview-card card">
      <div class="preview-head">
        <div class="preview-title-row"><span class="auto-dot"></span><h3>实时预览</h3><span class="chip ${s.manualText ? "chip-gold" : "chip-jade"}" style="margin-left:auto">${s.manualText ? "手动编辑" : "模板生成"}</span></div>
        <div class="preview-metrics">
          <div class="word-ring" id="word-ring" style="--p:${pct}"><span id="word-ring-text">${pct}%</span></div>
          <div class="pm-main">
            <div class="pm-value"><span id="word-count">${words}</span> <span style="font-size:10px;color:var(--muted)">词</span></div>
            <div class="pm-label">目标 <span id="word-target">${target}</span> 词 · ${kind === "small" && state.small.type === "minutes" ? "纪要格式" : `<span id="para-count">${paras}</span> 段`}</div>
          </div>
          <div style="text-align:right"><div class="pm-target" id="coverage-text">模板句 ${coverage}</div><div class="pm-label">覆盖率</div></div>
        </div>
        <div class="preview-chips">
          <span class="chip chip-jade" id="exam-chip">${kind === "small" ? "小作文" : state.big.exam + " 大作文"}</span>
          <span class="chip" id="type-chip">${kind === "small" ? (state.small.type === "letter" ? "书信" : state.small.type === "notice" ? "通知" : "纪要") : (state.big.type === "chart" ? "图表" : state.big.type === "picture" ? "图画" : state.big.type === "picture-chart" ? "图画+图表" : "文字")}</span>
          ${s.manualText ? `<span class="chip chip-gold">已脱离模板，可恢复</span>` : `<span class="chip">${E.escapeHtml((kind === "big" ? state.big.settings.themeCn : state.small.settings.topicCn) || "自定义主题")}</span>`}
        </div>
      </div>
      <div class="essay-paper ${s.manualText ? "is-manual" : ""}" id="essay-paper" data-kind="${kind}" contenteditable="${s.manualText ? "true" : "false"}" spellcheck="false">${E.escapeHtml(essay)}</div>
      <div class="preview-actions">
        <button class="btn btn-sm" data-action="toggle-edit" data-kind="${kind}">${icon("edit")} ${s.manualText ? "完成编辑" : "直接编辑"}</button>
        <button class="btn btn-sm" data-action="review-essay" data-kind="${kind}">${icon("target")} AI 批改</button>
        <button class="btn btn-sm" data-action="copy-essay" data-kind="${kind}">${icon("copy")} 复制</button>
        <button class="btn btn-sm" data-action="save-draft" data-kind="${kind}">${icon("save")} 保存</button>
        <button class="btn btn-sm" data-action="download-essay" data-kind="${kind}">${icon("download")} 导出</button>
      </div>
      <div id="review-panel">${reviewPanelHTML(kind)}</div>
    </div>`;
  }

  function reviewPanelHTML(kind) {
    const s = kind === "big" ? state.big : state.small;
    if (!s.review) {
      return `<div class="review-panel"><div class="review-empty">写完或生成初稿后，点「AI 批改」。<br>会检查字数、段落、模板覆盖、衔接词、重复词和语法硬伤。</div></div>`;
    }
    const r = s.review;
    return `<div class="review-panel">
      <div class="review-score-row">
        <div class="score-badge"><strong>${r.band}</strong><span>/ ${r.full}</span></div>
        <div class="rs-main"><h4>${E.escapeHtml(r.level)} · 预估 ${r.band} / ${r.full} 分</h4><p>${r.words} 词 · ${r.paragraphs} 段 · 模板句 ${r.templateHits} 处 · 衔接词 ${r.transitions} 处</p></div>
      </div>
      <div class="review-items">
        ${r.items.map((it) => `<div class="review-item ${it.status}"><span class="ri-dot">${it.status === "ok" ? "✓" : it.status === "warn" ? "!" : "×"}</span><span>${E.escapeHtml(it.text)}</span></div>`).join("")}
      </div>
      <div class="review-suggest"><b>下一步：</b>${E.escapeHtml(r.suggestions[0])}</div>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Prompt library
     ------------------------------------------------------------------------ */
  function renderPrompts() {
    const kind = state.ui.promptKind;
    const all = kind === "big" ? P.big : P.small;
    const exams = ["全部", ...Array.from(new Set(all.map((p) => p.exam)))];
    const types = ["全部", ...Array.from(new Set(all.map((p) => p.typeName || (p.type === "letter" ? "书信" : p.type === "notice" ? "通知" : "纪要"))))];
    const q = state.ui.promptQuery.trim().toLowerCase();
    const filtered = all.filter((p) => {
      if (state.ui.promptExam !== "全部" && p.exam !== state.ui.promptExam) return false;
      const t = p.typeName || (p.type === "letter" ? "书信" : p.type === "notice" ? "通知" : "纪要");
      if (state.ui.promptType !== "全部" && t !== state.ui.promptType) return false;
      if (q && !((p.topic || "") + (p.topicEn || "") + (p.prompt || "") + p.year).toLowerCase().includes(q)) return false;
      return true;
    });

    const html = `
      <div class="page-head">
        <div><div class="eyebrow">Question Bank · 真题库</div><h1 class="page-title">先做真题，再谈押题</h1><p class="page-sub">2001–2026 英语一 / 英语二 · 大作文 ${P.big.length} 道 · 小作文 ${P.small.length} 道。点开自动带入题型、主题词和数据。</p></div>
        <div class="page-actions"><button class="btn" data-action="random-prompt">${icon("refresh")} 随机一道</button><button class="btn btn-primary" data-action="new-big">${icon("pen")} 自定义题目</button></div>
      </div>
      <div class="filter-bar card">
        <div class="segmented"><button class="${kind === "big" ? "is-active" : ""}" data-action="prompt-kind" data-value="big">大作文</button><button class="${kind === "small" ? "is-active" : ""}" data-action="prompt-kind" data-value="small">小作文</button></div>
        <select class="select" style="width:110px" data-action="prompt-exam">${exams.map((x) => `<option ${state.ui.promptExam === x ? "selected" : ""}>${x}</option>`).join("")}</select>
        <select class="select" style="width:170px" data-action="prompt-type">${types.map((x) => `<option ${state.ui.promptType === x ? "selected" : ""}>${x}</option>`).join("")}</select>
        <div class="filter-search">${icon("search")}<input class="input" data-action="prompt-search" placeholder="搜索主题 / 年份 / 关键词" value="${E.escapeHtml(state.ui.promptQuery)}"></div>
        <div class="filter-spacer"></div><span class="chip">${filtered.length} 道</span>
      </div>
      <div class="prompt-grid">
        ${filtered.length ? filtered.map(promptCard).join("") : `<div class="prompt-empty">没有匹配的真题。换个筛选条件，或点「自定义题目」。</div>`}
      </div>`;
    renderShell(html, false);
  }

  function promptCard(p) {
    const typeText = p.typeName || (p.type === "letter" ? "书信" : p.type === "notice" ? "通知" : p.type === "minutes" ? "纪要" : "应用文");
    const fav = isFav(p.id);
    return `<article class="prompt-card card">
      <button class="fav-btn ${fav ? "is-fav" : ""}" data-action="toggle-fav" data-id="${p.id}" title="收藏">${icon("star")}</button>
      <div class="pc-top"><span class="prompt-year">${p.year}</span><span class="chip chip-accent">${E.escapeHtml(p.exam)}</span><span class="prompt-type">${E.escapeHtml(typeText)}</span></div>
      <h3>${E.escapeHtml(p.topic)}</h3>
      <p class="pc-prompt">${E.escapeHtml(p.prompt)}</p>
      ${p.data ? `<div class="pc-data">${E.escapeHtml(p.data)}</div>` : ""}
      <div class="pc-foot"><span class="chip">${p.points?.length || 0} 个要点</span><button class="btn btn-sm btn-primary" data-action="start-prompt" data-kind="${p.type === "letter" || p.type === "notice" || p.type === "minutes" ? "small" : "big"}" data-id="${p.id}">开始写 ${icon("arrow")}</button></div>
    </article>`;
  }

  /* ------------------------------------------------------------------------
     Template library
     ------------------------------------------------------------------------ */
  function libGroups(kind) {
    if (kind === "big") {
      return [
        { id: "overview", name: "图表 · 总体描述", options: flatten(D.big.overview) },
        { id: "detail", name: "图表 · 细节公式", options: flatten(D.big.detail) },
        { id: "phenomenon", name: "图表 · 社会现象", options: D.big.phenomenonTransition.concat(D.big.phenomenon) },
        { id: "picture", name: "图画 · 第一段", options: D.big.pictureIntro.concat(D.big.pictureThemeTransition, D.big.pictureIdea) },
        { id: "text", name: "文字 · 第一段", options: D.big.textIntro.concat(D.big.textView, D.big.stance) },
        { id: "reasons", name: "第二段 · 过渡与原因", options: D.big.transition.concat(flatten(D.big.reasonSchemes.map((x) => x.options))) },
        { id: "ending", name: "第三段 · 总结 / 措施 / 展望", options: D.big.conclusion.concat(D.big.measures, D.big.future, D.big.trendPrediction) }
      ];
    }
    return [
      { id: "letter-open", name: "书信 · 开头与目的", options: D.small.greetings.concat(D.small.selfIntro, D.small.purposes.map((p) => ({ ...p, name: p.type }))) },
      { id: "bank", name: "第二段 · 50 个功能句", options: flatten(D.small.sentenceBank.map((g) => g.items)) },
      { id: "letter-end", name: "第三段 · 情感与回信", options: D.small.thirdEmotion.concat(D.small.thirdReply) },
      { id: "notice", name: "通知 / 告示", options: D.small.notice.first.concat(D.small.notice.second, D.small.notice.third) },
      { id: "minutes", name: "纪要", options: D.small.minutes.intro.concat(D.small.minutes.purpose, D.small.minutes.speech, D.small.minutes.agree, D.small.minutes.decision, [D.small.minutes.next]) }
    ];
  }
  function flatten(value) {
    if (Array.isArray(value)) return value.reduce((acc, x) => acc.concat(flatten(x)), []);
    if (value && typeof value === "object") {
      if (typeof value.en === "string" && (value.id || value.name)) return [value];
      return Object.keys(value).reduce((acc, k) => acc.concat(flatten(value[k])), []);
    }
    return [value];
  }

  function renderTemplates() {
    const kind = state.ui.libKind;
    const groups = libGroups(kind);
    const sec = state.ui.libSection;
    const q = state.ui.libQuery.trim().toLowerCase();
    const allCount = groups.reduce((n, g) => n + g.options.length, 0);
    const shown = groups
      .filter((g) => sec === "all" || g.id === sec)
      .map((g) => ({
        ...g,
        options: g.options.filter((o) => !q || ((o.en || "") + (o.cn || "") + (o.name || "")).toLowerCase().includes(q))
      }))
      .filter((g) => g.options.length);

    const html = `
      <div class="page-head">
        <div><div class="eyebrow">Template Library · 模板库</div><h1 class="page-title">不是背更多，是随取随用</h1><p class="page-sub">${E.allBigOptions().length + E.allSmallOptions().length} 个模板句 / 功能句，按段落和功能归档。看到好句，直接「套用」。</p></div>
        <div class="page-actions"><div class="segmented"><button class="${kind === "big" ? "is-active" : ""}" data-action="lib-kind" data-value="big">大作文</button><button class="${kind === "small" ? "is-active" : ""}" data-action="lib-kind" data-value="small">小作文</button></div></div>
      </div>
      <div class="library-layout">
        <aside class="library-nav card">
          <button class="${sec === "all" ? "is-active" : ""}" data-action="lib-sec" data-value="all"><span>全部</span><span class="ln-count">${allCount}</span></button>
          ${groups.map((g) => `<button class="${sec === g.id ? "is-active" : ""}" data-action="lib-sec" data-value="${g.id}"><span>${E.escapeHtml(g.name)}</span><span class="ln-count">${g.options.length}</span></button>`).join("")}
        </aside>
        <div class="library-main">
          <div class="library-toolbar">
            <div class="filter-search">${icon("search")}<input class="input" data-action="lib-search" placeholder="搜索句型 / 中文提示 / 关键词" value="${E.escapeHtml(state.ui.libQuery)}"></div>
            <span class="chip">${shown.reduce((n, g) => n + g.options.length, 0)} 句</span>
          </div>
          ${shown.length ? shown.map((g) => `<div class="template-group">
            <div class="template-group-head"><h3>${E.escapeHtml(g.name)}</h3><span class="count">${g.options.length} 句</span></div>
            <div class="card" style="overflow:hidden">${g.options.map((o, i) => templateRow(o, i, kind)).join("")}</div>
          </div>`).join("") : `<div class="prompt-empty">没有匹配的句型。</div>`}
        </div>
      </div>`;
    renderShell(html, false);
  }

  function templateRow(o, i, kind) {
    const en = E.fillHtml(o.en || "", {});
    const fav = isFav(o.id);
    return `<div class="template-row">
      <span class="tr-no">${i + 1}</span>
      <div><div class="tr-en">${en}</div><p class="tr-cn">${E.fillHtml(o.cn || "", {})}</p>${o.tip ? `<p class="tr-tip">${E.escapeHtml(o.tip)}</p>` : ""}</div>
      <div class="tr-actions">
        <button class="tiny-btn" data-action="copy-sentence" data-kind="${kind}" data-option="${o.id}">${icon("copy")}</button>
        <button class="tiny-btn ${fav ? "is-on" : ""}" data-action="toggle-fav" data-id="${o.id}">${icon("star")}</button>
        <button class="tiny-btn" data-action="apply-template" data-kind="${kind}" data-id="${o.id}">套用</button>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Coach
     ------------------------------------------------------------------------ */
  function renderCoach() {
    const kind = state.route === "coach" ? (state.big.type ? "big" : "big") : "big";
    const essay = currentEssay("big");
    const prompt = currentPrompt("big");
    const html = `
      <div class="page-head">
        <div><div class="eyebrow">AI Coach · 教练</div><h1 class="page-title">问具体问题，别问“怎么提分”</h1><p class="page-sub">本地教练会调用你上传的模板知识库；配置 API 后可以针对你的作文逐句改写。</p></div>
        <div class="page-actions"><button class="btn" data-action="open-settings">${icon("key")} ${state.api.apiKey ? "AI 已连接" : "配置 API"}</button><button class="btn" data-action="clear-chat">${icon("refresh")} 清空对话</button></div>
      </div>
      <div class="coach-layout">
        <div class="chat-card card">
          <div class="chat-head"><div class="coach-avatar">砚</div><div><h3>砚台教练</h3><p>${state.api.apiKey ? "大模型已连接 · " + E.escapeHtml(state.api.model) : "本地模式 · 模板知识库"}</p></div><div class="chat-head-actions"><button class="icon-btn" title="设置" data-action="open-settings">${icon("settings")}</button></div></div>
          <div class="chat-log" id="chat-log"></div>
          <div class="chat-quick">${D.quickReplies.map((q) => `<button data-action="chat-quick" data-text="${E.escapeHtml(q)}">${E.escapeHtml(q)}</button>`).join("")}</div>
          <div class="chat-input"><textarea id="chat-input" placeholder="例如：帮我看看这篇作文的原因二能不能换一句……（Enter 发送，Shift+Enter 换行）"></textarea><button class="btn btn-primary" data-action="chat-send">${icon("send")} 发送</button></div>
        </div>
        <aside class="chat-side">
          <div class="card card-pad">
            <div class="card-head"><div><h3 class="card-title">当前上下文</h3><p class="card-sub">教练会读取这些信息。</p></div></div>
            <div class="ctx-list">
              <div class="ctx-item"><span class="ctx-k">当前题目</span><span class="ctx-v">${prompt ? E.escapeHtml(prompt.year + " " + prompt.exam + " · " + prompt.topic) : "自定义 / 未选择"}</span></div>
              <div class="ctx-item"><span class="ctx-k">主题词</span><span class="ctx-v">${E.escapeHtml(state.big.settings.theme || "—")}</span></div>
              <div class="ctx-item"><span class="ctx-k">好处</span><span class="ctx-v">${E.escapeHtml(state.big.settings.benefit || "—")}</span></div>
              <div class="ctx-item"><span class="ctx-k">当前字数</span><span class="ctx-v">${E.countWords(essay)} 词</span></div>
            </div>
            <div class="mt-2"><button class="btn btn-block btn-sm" data-action="coach-use-draft">${icon("pen")} 带着当前作文提问</button></div>
          </div>
          <div class="card card-pad">
            <div class="card-head"><div><h3 class="card-title">三个最好用的问法</h3></div></div>
            <div class="ctx-list">
              <div class="ctx-item"><span class="ctx-k">审题</span><span class="ctx-v">「帮我审题，这篇的主题词和三个理由怎么定？」</span></div>
              <div class="ctx-item"><span class="ctx-k">改写</span><span class="ctx-v">「原因二太模板了，换成对比论证，给我两句。」</span></div>
              <div class="ctx-item"><span class="ctx-k">批改</span><span class="ctx-v">「按考研评分标准批改，只告诉我最值得改的两处。」</span></div>
            </div>
          </div>
        </aside>
      </div>`;
    renderShell(html, false);
    renderChatLog();
  }

  function formatChat(text) {
    let s = E.escapeHtml(text || "");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    const blocks = s.split(/\n{2,}/).map((block) => {
      if (/^\s*[-•]\s+/m.test(block)) {
        return `<ul>${block.split(/\n/).map((line) => line.replace(/^\s*[-•]\s+/, "")).filter(Boolean).map((line) => `<li>${line}</li>`).join("")}</ul>`;
      }
      if (/^\s*\d+[.)]\s+/m.test(block)) {
        return `<ol>${block.split(/\n/).map((line) => line.replace(/^\s*\d+[.)]\s+/, "")).filter(Boolean).map((line) => `<li>${line}</li>`).join("")}</ol>`;
      }
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    });
    return blocks.join("");
  }

  function renderChatLog() {
    const log = $("#chat-log");
    if (!log) return;
    log.innerHTML = state.chat.map((m) => {
      const isUser = m.role === "user";
      return `<div class="msg ${isUser ? "is-user" : ""}">
        <div class="msg-avatar">${isUser ? "你" : "砚"}</div>
        <div><div class="msg-bubble">${isUser ? E.escapeHtml(m.text || "").replace(/\n/g, "<br>") : (m.html || formatChat(m.text || ""))}</div><div class="msg-time">${m.time ? new Date(m.time).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : ""}</div></div>
      </div>`;
    }).join("");
    log.scrollTop = log.scrollHeight;
  }

  async function sendChat(text) {
    const message = String(text || "").trim();
    if (!message) return;
    state.chat.push({ role: "user", text: message, time: Date.now() });
    renderChatLog();
    saveChat();
    const log = $("#chat-log");
    if (log) {
      log.insertAdjacentHTML("beforeend", `<div class="msg" id="typing-msg"><div class="msg-avatar">砚</div><div class="msg-bubble"><span class="typing"><i></i><i></i><i></i></span></div></div>`);
      log.scrollTop = log.scrollHeight;
    }
    const ctx = { kind: state.route === "small" ? "small" : "big", state: state.big, prompt: currentPrompt("big"), draft: currentEssay("big") };
    let reply = null;
    let usedRemote = false;
    if (state.api.apiKey) {
      try {
        const history = state.chat.slice(-8).filter((m) => m.role === "user" || m.html || m.text).map((m) => ({ role: m.role, content: m.text || E.stripTags(m.html || "") }));
        const messages = [{ role: "system", content: E.buildSystemPrompt(ctx) }].concat(history);
        const content = await E.remoteChat(messages, state.api);
        reply = { role: "assistant", html: formatChat(content), time: Date.now() };
        usedRemote = true;
      } catch (err) {
        const local = E.localChat(message, ctx);
        reply = { role: "assistant", html: local.text + `<p class="msg-note">大模型调用失败：${E.escapeHtml(err.message)} 已回退到本地教练。</p>`, time: Date.now() };
      }
    } else {
      const local = E.localChat(message, ctx);
      reply = { role: "assistant", html: local.text, time: Date.now() };
    }
    const typing = $("#typing-msg");
    if (typing) typing.remove();
    state.chat.push(reply);
    renderChatLog();
    saveChat();
    if (!usedRemote && !state.api.apiKey) {
      // 轻提示，不打断
    }
  }

  /* ------------------------------------------------------------------------
     Drafts
     ------------------------------------------------------------------------ */
  function renderDrafts() {
    const totalWords = state.drafts.reduce((n, d) => n + (d.words || 0), 0);
    const scored = state.drafts.filter((d) => d.score != null);
    const avg = scored.length ? (scored.reduce((n, d) => n + d.score, 0) / scored.length).toFixed(1) : "—";
    const html = `
      <div class="page-head">
        <div><div class="eyebrow">My Work · 我的练习</div><h1 class="page-title">写过的每一篇，都算数</h1><p class="page-sub">保存在本机浏览器，不会上传。建议每周导出一次备份。</p></div>
        <div class="page-actions"><button class="btn" data-action="export-all">${icon("download")} 导出全部</button><button class="btn btn-primary" data-action="new-big">${icon("plus")} 新写一篇</button></div>
      </div>
      <div class="progress-hero">
        <div class="stat-card card"><span class="stat-icon">${icon("bookmark")}</span><div><div class="stat-value">${state.drafts.length}<small>篇</small></div><div class="stat-label">累计练习</div></div></div>
        <div class="stat-card card"><span class="stat-icon is-accent">${icon("pen")}</span><div><div class="stat-value">${totalWords}<small>词</small></div><div class="stat-label">累计写作</div></div></div>
        <div class="stat-card card"><span class="stat-icon">${icon("target")}</span><div><div class="stat-value">${avg}<small>${avg !== "—" ? "分" : ""}</small></div><div class="stat-label">平均预估分</div></div></div>
        <div class="stat-card card"><span class="stat-icon is-accent">${icon("clock")}</span><div><div class="stat-value">${state.drafts.length ? Math.max(1, Math.round(totalWords / 180)) : 0}<small>次</small></div><div class="stat-label">约合训练量</div></div></div>
      </div>
      <div class="draft-grid">
        ${state.drafts.length ? state.drafts.map((d) => `<article class="draft-card card">
          <div class="dc-top"><span class="chip chip-accent">${d.kind === "small" ? "小作文" : "大作文"}</span><span class="chip">${E.escapeHtml(d.exam || "")}</span>${d.score != null ? `<span class="chip chip-jade">${d.score} 分</span>` : ""}</div>
          <h3>${E.escapeHtml(d.title)}</h3>
          <div class="dc-meta">${d.words} 词 · ${fmtDate(d.time)}</div>
          <p class="dc-excerpt">${E.escapeHtml(d.text || "")}</p>
          <div class="dc-actions"><button class="btn btn-sm" data-action="open-draft" data-id="${d.id}">打开</button><button class="btn btn-sm" data-action="delete-draft" data-id="${d.id}">${icon("trash")}</button></div>
        </article>`).join("") : `<div class="draft-empty"><h3>还没有保存的练习</h3><p>去写一篇，点「保存」后就会出现在这里。</p><div class="mt-2"><button class="btn btn-primary" data-action="new-big">开始写</button></div></div>`}
      </div>`;
    renderShell(html, false);
  }

  /* ------------------------------------------------------------------------
     Modals
     ------------------------------------------------------------------------ */
  function openModal(html, opts) {
    const o = opts || {};
    modalRoot.innerHTML = `<div class="modal-backdrop" data-action="modal-backdrop"><div class="modal ${o.wide ? "is-wide" : ""} ${o.narrow ? "is-narrow" : ""}" role="dialog" aria-modal="true">${html}</div></div>`;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
  }

  function openSettings() {
    const a = state.api;
    const providers = [
      { id: "deepseek", name: "DeepSeek", base: "https://api.deepseek.com/v1", model: "deepseek-chat" },
      { id: "openai", name: "OpenAI", base: "https://api.openai.com/v1", model: "gpt-4o-mini" },
      { id: "moonshot", name: "Kimi", base: "https://api.moonshot.cn/v1", model: "moonshot-v1-8k" },
      { id: "zhipu", name: "智谱", base: "https://open.bigmodel.cn/api/paas/v4", model: "glm-4-flash" },
      { id: "ollama", name: "Ollama", base: "http://localhost:11434/v1", model: "qwen2.5:7b" },
      { id: "custom", name: "自定义", base: a.baseUrl || "", model: a.model || "" }
    ];
    openModal(`
      <div class="modal-head"><div><h3>AI 设置</h3><p>Key 只保存在本机浏览器；通过本地 server.js 代理请求，避免 CORS。</p></div><button class="icon-btn modal-close" data-action="close-modal">${icon("close")}</button></div>
      <div class="modal-body">
        <div class="provider-grid">${providers.map((p) => `<button class="provider-btn ${a.provider === p.id ? "is-active" : ""}" data-action="set-provider" data-id="${p.id}">${p.name}</button>`).join("")}</div>
        <div class="form-stack">
          <div class="field"><label>Base URL</label><input class="input" id="api-base" value="${E.escapeHtml(a.baseUrl || "")}" placeholder="https://api.deepseek.com/v1"></div>
          <div class="field"><label>模型名</label><input class="input" id="api-model" value="${E.escapeHtml(a.model || "")}" placeholder="deepseek-chat"></div>
          <div class="field"><label>API Key</label><div class="key-row"><input class="input" id="api-key" type="password" value="${E.escapeHtml(a.apiKey || "")}" placeholder="sk-..."><button class="key-toggle" data-action="toggle-key" title="显示/隐藏">${icon("key")}</button></div><div class="field-hint">没有 Key？继续用本地教练，审题、生成、批改都可以用，只是不能逐句自由改写。</div></div>
          <label style="display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--ink-3)"><input type="checkbox" id="api-proxy" ${a.useProxy !== false ? "checked" : ""}> 通过本地代理请求（推荐，需先运行 server.js）</label>
          <div class="settings-note">本地直接请求可能被浏览器 CORS 拦截。运行 <code>start.bat</code> 后访问 http://127.0.0.1:3210，勾选代理即可。Key 不会写入服务器日志。</div>
          <div class="settings-status" id="api-status">${a.apiKey ? "已保存 Key，可以测试连接。" : "当前使用本地教练模式。"}</div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn" data-action="test-api">测试连接</button><div class="spacer"></div><button class="btn" data-action="close-modal">取消</button><button class="btn btn-primary" data-action="save-settings">保存设置</button></div>`, { wide: false });
  }

  function openPicker(kind, section, currentId) {
    const stateObj = kind === "big" ? state.big : state.small;
    let groups = [];
    if (kind === "big") {
      if (section === "overview") {
        const sc = stateObj.scenario;
        groups = [{ name: "当前场景 · " + (D.big.chartScenarios.find((x) => x.id === sc)?.name || ""), options: D.big.overview[sc] || [] }];
        if (sc !== "universal") groups.push({ name: "万能场景", options: D.big.overview.universal });
      } else if (section === "detail") {
        const sc = stateObj.scenario;
        groups = [{ name: "当前场景 · " + (D.big.chartScenarios.find((x) => x.id === sc)?.name || ""), options: D.big.detail[sc] || [] }];
        if (sc !== "universal") groups.push({ name: "自由细节句", options: D.big.detail.universal });
      } else if (section === "reason1" || section === "reason2" || section === "reason3") {
        groups = D.big.reasonSchemes.map((x) => ({ name: x.name + " · " + x.desc, options: x.options }));
      } else if (section === "measure1" || section === "measure2") {
        groups = [{ name: "五个角度任选", options: D.big.measures }];
      } else if (section === "pictureIntro") {
        groups = [{ name: "图画描述", options: D.big.pictureIntro }];
      } else if (section === "pictureThemeTransition") {
        groups = [{ name: "主题过渡", options: D.big.pictureThemeTransition }];
      } else if (section === "pictureIdea") {
        groups = [{ name: "中心思想", options: D.big.pictureIdea }];
      } else if (section === "textIntro" || section === "textView" || section === "stance") {
        groups = [{ name: ROLE_META[section]?.name || section, options: D.big[section] || [] }];
      } else if (section === "overview" || section === "detail") {
        groups = [{ name: "待选", options: [] }];
      } else {
        groups = [{ name: ROLE_META[section]?.name || section, options: D.big[section] || [] }];
      }
    } else {
      if (section === "greeting") groups = [{ name: "寒暄", options: D.small.greetings }];
      else if (section === "selfIntro") groups = [{ name: "自我介绍", options: D.small.selfIntro }];
      else if (section === "secondTransition") groups = [{ name: "过渡句", options: D.small.secondTransitions }];
      else if (section === "thirdEmotion") groups = [{ name: "表达情感", options: D.small.thirdEmotion }];
      else if (section === "thirdReply") groups = [{ name: "期待回信", options: D.small.thirdReply }];
      else if (section === "noticeFirst") groups = [{ name: "通知概况", options: D.small.notice.first }];
      else if (section === "noticeSecond") groups = [{ name: "通知目的", options: D.small.notice.second }];
      else if (section === "noticeThird") groups = [{ name: "邀请 / 报名", options: D.small.notice.third }];
      else if (section?.startsWith("minutes")) groups = [{ name: "纪要句", options: D.small.minutes[section.replace("minutes", "").toLowerCase()] || [] }];
      else if (section === "bank") groups = D.small.sentenceBank.map((g) => ({ name: g.name, options: g.items }));
    }
    groups = groups.filter((g) => g.options && g.options.length);
    openModal(`
      <div class="modal-head"><div><h3>换一句 · ${E.escapeHtml(ROLE_META[section]?.name || section)}</h3><p>同一位置至少准备 2 句，考场上按题目选，避免年年雷同。</p></div><button class="icon-btn modal-close" data-action="close-modal">${icon("close")}</button></div>
      <div class="modal-body">
        ${groups.map((g) => `<div class="template-group"><div class="template-group-head"><h3>${E.escapeHtml(g.name)}</h3><span class="count">${g.options.length} 句</span></div>
          <div class="card" style="overflow:hidden">${g.options.map((o) => `<div class="template-row" style="grid-template-columns:minmax(0,1fr) auto">
            <div><div class="tr-en">${E.fillHtml(o.en, {})}</div><p class="tr-cn">${E.fillHtml(o.cn || "", {})}</p>${o.tip ? `<p class="tr-tip">${E.escapeHtml(o.tip)}</p>` : ""}</div>
            <div class="tr-actions"><button class="tiny-btn ${o.id === currentId ? "is-on" : ""}" data-action="set-option" data-kind="${kind}" data-section="${section}" data-id="${o.id}">${o.id === currentId ? "当前" : "用这句"}</button></div>
          </div>`).join("")}</div>
        </div>`).join("")}
      </div>`, { wide: true });
  }

  function openBankPicker() {
    const s = state.small;
    const selected = new Set(state.ui.bankSelection || []);
    const q = (state.ui.bankQuery || "").trim().toLowerCase();
    const groups = D.small.sentenceBank.filter((g) => state.ui.bankGroup === "all" || g.id === state.ui.bankGroup)
      .map((g) => ({ ...g, items: g.items.filter((o) => !q || ((o.en || "") + (o.cn || "") + (o.name || "")).toLowerCase().includes(q)) }))
      .filter((g) => g.items.length);
    openModal(`
      <div class="modal-head"><div><h3>功能句库</h3><p>按功能挑，不按题型背。建议一篇选 3~4 句：时间地点 + 目的/流程 + 好处。</p></div><button class="icon-btn modal-close" data-action="close-modal">${icon("close")}</button></div>
      <div class="modal-body">
        <div class="filter-bar" style="padding:0 0 10px;border:0;background:transparent">
          <div class="segmented" style="flex-wrap:wrap"><button class="${state.ui.bankGroup === "all" ? "is-active" : ""}" data-action="bank-group" data-value="all">全部</button>${D.small.sentenceBank.map((g) => `<button class="${state.ui.bankGroup === g.id ? "is-active" : ""}" data-action="bank-group" data-value="${g.id}">${E.escapeHtml(g.name)}</button>`).join("")}</div>
          <div class="filter-search" style="margin-left:auto">${icon("search")}<input class="input" data-action="bank-search" value="${E.escapeHtml(state.ui.bankQuery)}" placeholder="搜索功能句"></div>
        </div>
        <div class="card" style="overflow:hidden">
          ${groups.map((g) => `<div style="padding:10px 13px 5px;font-size:10px;letter-spacing:.12em;color:var(--muted);background:rgba(255,255,255,.35);border-bottom:1px solid var(--line)">${E.escapeHtml(g.name)}</div>${g.items.map((o) => `<label class="template-row" style="grid-template-columns:20px minmax(0,1fr);cursor:pointer">
            <input type="checkbox" ${selected.has(o.id) ? "checked" : ""} data-action="bank-toggle" data-id="${o.id}" style="margin-top:4px">
            <div><div class="tr-en">${E.fillHtml(o.en, {})}</div><p class="tr-cn">${E.fillHtml(o.cn || "", {})}</p></div>
          </label>`).join("")}`).join("")}
        </div>
      </div>
      <div class="modal-foot"><span class="small muted">已选 <strong id="bank-selected-count">${selected.size}</strong> 句</span><div class="spacer"></div><button class="btn" data-action="close-modal">取消</button><button class="btn btn-primary" data-action="add-bank-confirm">加入作文</button></div>`, { wide: true });
  }

  /* ------------------------------------------------------------------------
     Actions
     ------------------------------------------------------------------------ */
  function setExam(kind, value) {
    const s = kind === "big" ? state.big : state.small;
    s.exam = value;
    if (kind === "big") saveBig(); else saveSmall();
    rerenderKeepScroll();
  }

  function setSmallMode(value) {
    state.small.mode = value;
    const subtype = D.small.letterSubtypes.find((x) => x.id === state.small.subtype);
    if (subtype) subtype.mode = value;
    saveSmall();
    rerenderKeepScroll();
  }

  function setOption(kind, section, id) {
    const s = kind === "big" ? state.big : state.small;
    if (kind === "big") {
      if (section === "reason1" || section === "reason2" || section === "reason3") s.selections[section] = id;
      else if (section === "measure1" || section === "measure2") s.selections[section] = id;
      else if (ROLE_META[section]) s.selections[section] = id;
      else s.selections[section] = id;
    } else {
      if (section === "greeting") s.greetingId = id;
      else if (section === "selfIntro") s.selfIntroId = id;
      else if (section === "secondTransition") s.transitionId = id;
      else if (section === "thirdEmotion") s.emotionId = id;
      else if (section === "thirdReply") s.replyId = id;
      else if (section === "noticeFirst" || section === "noticeSecond" || section === "noticeThird") s.selections[section] = id;
      else if (section?.startsWith("minutes")) s.selections[section] = id;
    }
    if (kind === "big") saveBig(); else saveSmall();
    closeModal();
    render();
    toast("已换上一句");
  }

  function applyTemplate(kind, id) {
    const opt = kind === "big" ? E.getBigOption(id) : E.getSmallOption(id);
    if (!opt) return;
    if (kind === "big") {
      const entry = E.bigIndex.get(id);
      if (!entry) return;
      if (["overview", "detail", "phenomenonTransition", "phenomenon"].includes(entry.section)) state.big.type = "chart";
      if (["pictureIntro", "pictureThemeTransition", "pictureIdea"].includes(entry.section)) state.big.type = "picture";
      if (["textIntro", "textView", "stance"].includes(entry.section)) state.big.type = "text";
      let key = entry.section === "reason" ? "reason1" : entry.section === "measure" ? "measure1" : entry.section;
      if (key === "reason") key = "reason1";
      if (key === "measure") key = "measure1";
      if (key === "phenomenonTransition" || key === "phenomenon" || key === "pictureThemeTransition" || key === "pictureIdea" || key === "textView" || key === "stance" || key === "trendPrediction") {
        // valid keys
      }
      if (key === "trendPrediction") { state.big.selections.future = id; }
      else state.big.selections[key] = id;
      if (["overview", "detail", "phenomenonTransition", "phenomenon", "pictureIntro", "pictureThemeTransition", "pictureIdea", "textIntro", "textView", "stance"].includes(key)) state.ui.bigTab = 0;
      else if (key.startsWith("reason") || key === "transition") state.ui.bigTab = 1;
      else state.ui.bigTab = 2;
      saveBig();
      toast("已套用到大作文");
      navigate("big");
    } else {
      const entry = E.smallIndex.get(id);
      if (!entry) return;
      if (entry.section === "bank") {
        if (!state.small.bankIds.includes(id)) state.small.bankIds.push(id);
        saveSmall();
        toast("已加入小作文第二段");
        navigate("small");
      } else if (entry.section === "purpose") {
        state.small.selections.purpose = id;
        saveSmall(); toast("已更换写信目的"); navigate("small");
      } else if (entry.section === "salutation") {
        state.small.salutationId = id; saveSmall(); toast("已更换称呼"); navigate("small");
      } else {
        const map = { greetings: "greetingId", selfIntro: "selfIntroId", secondTransition: "transitionId", thirdEmotion: "emotionId", thirdReply: "replyId" };
        if (map[entry.section]) state.small[map[entry.section]] = id;
        else if (entry.section.startsWith("notice")) state.small.selections[entry.section] = id;
        else if (entry.section.startsWith("minutes")) state.small.selections[entry.section] = id;
        saveSmall(); toast("已套用到小作文"); navigate("small");
      }
    }
  }

  function loadBigPrompt(id) {
    const p = P.big.find((x) => x.id === id);
    if (!p) return;
    const s = state.big;
    s.promptId = id;
    s.type = p.type === "picture-chart" ? "picture-chart" : p.type;
    s.scenario = p.setup?.scenario || "dynamic-single";
    s.settings = Object.assign({}, E.defaultBigState().settings, p.setup || {});
    s.shared = Object.assign({}, E.defaultBigState().shared, p.fills || {});
    if (!p.fills?.phenomenon && p.setup?.theme) {
      s.shared.phenomenon = /父母|家长|消费者|公众|居民|学生|年轻人|老人/.test(p.setup.themeCn || "")
        ? `${p.setup.theme} has drawn growing attention from the public`
        : `${p.setup.theme} has been developing rapidly in recent years`;
      s.shared.phenomenonCn = `${p.setup.themeCn}日益受到公众关注`;
    }
    s.selections = Object.assign({}, E.defaultBigState().selections, p.selections || {});
    if (s.type === "chart") {
      s.selections.overview = defaultOverviewId(s);
      s.selections.detail = defaultDetailId(s);
      s.selections.phenomenon = "ph-6";
    }
    if (s.type === "picture" || s.type === "picture-chart") {
      s.selections.pictureIntro = s.type === "picture-chart" ? "pic-in5" : (p.fills?.speakerA ? "pic-in3" : "pic-in1");
      s.selections.pictureThemeTransition = "pic-t1";
      s.selections.pictureIdea = "pic-i2";
    }
    s.fills = {};
    s.manualText = "";
    s.review = null;
    state.ui.bigTab = 0;
    saveBig();
    if (state.route === "big") render(); else navigate("big");
    toast("已带入真题：" + p.topic);
  }

  function defaultOverviewId(s) {
    const map = { "dynamic-single": "ov-dyn1", "dynamic-multi": "ov-mul1", "static": "ov-sta1", "double": "ov-dbl1", "universal": "ov-uni2" };
    return map[s.scenario] || "ov-dyn1";
  }
  function defaultDetailId(s) {
    const map = { "dynamic-single": "det-dyn1", "dynamic-multi": "det-mul1", "static": "det-sta1", "double": "det-dbl1", "universal": "det-uni1" };
    return map[s.scenario] || "det-dyn1";
  }

  const SUBTYPE_PURPOSE = {
    suggest: "pu-suggest", invite: "pu-invite", recommend: "pu-recommend", thank: "pu-thank",
    apologize: "pu-apologize", complain: "pu-complain", inquire: "pu-inquire", reply: "pu-reply",
    introduce: "pu-introduce", apply: "pu-apply", resign: "pu-resign", help: "pu-help",
    congratulate: "pu-congratulate", other: "pu-suggest"
  };
  const SUBTYPE_BANK = {
    suggest: ["sb-43", "sb-45", "sb-46"],
    invite: ["sb-3", "sb-7", "sb-19"],
    recommend: ["sb-26", "sb-49"],
    thank: ["sb-35", "sb-38"],
    apologize: ["sb-41", "sb-42"],
    complain: ["sb-44", "sb-45"],
    reply: ["sb-9", "sb-45"],
    introduce: ["sb-21", "sb-49"],
    help: ["sb-43", "sb-45"],
    congratulate: ["sb-35", "sb-48"],
    other: ["sb-43", "sb-45", "sb-47"]
  };

  function loadSmallPrompt(id) {
    const p = P.small.find((x) => x.id === id);
    if (!p) return;
    const s = state.small;
    s.promptId = id;
    s.type = p.type;
    s.subtype = p.subtype || "suggest";
    s.mode = p.mode || (s.subtype === "reply" ? "passive" : "active");
    s.settings = Object.assign({}, E.defaultSmallState().settings, p.setup || {});
    if (s.settings.event) s.settings.event = String(s.settings.event).replace(/^(a|an|the)\s+/i, "");
    s.shared = Object.assign({}, E.defaultSmallState().shared, p.fills || {});
    s.selections = Object.assign({}, E.defaultSmallState().selections, p.selections || {});
    s.selections.purpose = SUBTYPE_PURPOSE[s.subtype] || "pu-suggest";
    s.bankIds = (SUBTYPE_BANK[s.subtype] || SUBTYPE_BANK.other).slice();
    s.emotionId = s.subtype === "apologize" ? "te-2"
      : s.subtype === "invite" ? "te-6"
      : s.subtype === "thank" ? "te-1"
      : s.subtype === "complain" ? "te-1"
      : s.subtype === "reply" ? "te-4"
      : "te-1";
    const audience = String(p.setup?.audience || "").toLowerCase();
    s.salutationId = /professor/.test(audience) ? "sa4"
      : /editor/.test(audience) ? "sa5"
      : /^(paul|jack|david|john|bob|james)\b/.test(audience) ? "sa3"
      : /^mr\./.test(audience) ? "sa1"
      : /^ms\./.test(audience) ? "sa2"
      : "sa6";
    if (p.setup?.audience && /^(Paul|Jack|David|John|Bob|James)/i.test(p.setup.audience)) {
      s.settings.firstName = p.setup.audience.split(/\s+/)[0];
    }
    if (p.type === "notice") {
      s.bankIds = ["sb-9", "sb-10", "sb-18"];
      s.selections.noticeFirst = "no-1"; s.selections.noticeSecond = "no-6"; s.selections.noticeThird = "no-9";
    }
    if (p.type === "minutes") s.bankIds = [];
    s.manualText = "";
    s.review = null;
    state.ui.smallTab = 0;
    saveSmall();
    if (state.route === "small") render(); else navigate("small");
    toast("已带入真题：" + p.topic);
  }

  function generateBig() {
    state.big.manualText = "";
    state.big.review = null;
    saveBig();
    render();
    const words = E.countWords(E.composeBig(state.big));
    toast(`初稿已生成，约 ${words} 词。把黄色空格补完再保存。`);
  }
  function generateSmall() {
    state.small.manualText = "";
    state.small.review = null;
    saveSmall();
    render();
    toast("初稿已生成，检查称呼、目的和落款。");
  }

  function reviewCurrent(kind) {
    const text = currentEssay(kind);
    if (E.countWords(text) < 20) { toast("还没有可批改的作文，先生成初稿。", "error"); return; }
    const s = kind === "big" ? state.big : state.small;
    s.review = E.reviewEssay(text, kind, { exam: s.exam, type: s.type, settings: kind === "big" ? s.settings : { theme: s.settings.topic, themeCn: s.settings.topicCn } });
    if (kind === "big") saveBig(); else saveSmall();
    const panel = $("#review-panel");
    if (panel) panel.innerHTML = reviewPanelHTML(kind);
    toast(`批改完成：预估 ${s.review.band} / ${s.review.full} 分`);
  }

  function saveDraft(kind) {
    const text = currentEssay(kind);
    if (E.countWords(text) < 20) { toast("内容太少，先写几句再保存。", "error"); return; }
    const prompt = currentPrompt(kind);
    const s = kind === "big" ? state.big : state.small;
    const title = prompt ? `${prompt.year} ${prompt.exam} · ${prompt.topic}` : (kind === "big" ? "自定义大作文" : "自定义小作文");
    const existing = s.draftId ? state.drafts.find((d) => d.id === s.draftId) : null;
    const draft = {
      id: existing ? existing.id : uid(),
      kind, title, exam: s.exam,
      words: E.countWords(text),
      score: s.review?.score ?? null,
      text,
      promptId: s.promptId,
      time: Date.now()
    };
    if (existing) Object.assign(existing, draft);
    else state.drafts.unshift(draft);
    s.draftId = draft.id;
    state.drafts = state.drafts.slice(0, 40);
    write(STORAGE.drafts, state.drafts);
    toast("已保存到「我的练习」");
  }

  function downloadText(text, filename) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function copyText(text, message) {
    const done = () => toast(message || "已复制");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (err) { toast("复制失败，请手动选择", "error"); }
    ta.remove();
  }

  function isFav(id) { return state.favs.includes(id); }
  function toggleFav(id) {
    if (isFav(id)) state.favs = state.favs.filter((x) => x !== id);
    else state.favs.unshift(id);
    write(STORAGE.favs, state.favs);
    toast(isFav(id) ? "已收藏" : "已取消收藏");
    rerenderKeepScroll();
  }

  function applyProvider(id) {
    const map = {
      deepseek: ["https://api.deepseek.com/v1", "deepseek-chat"],
      openai: ["https://api.openai.com/v1", "gpt-4o-mini"],
      moonshot: ["https://api.moonshot.cn/v1", "moonshot-v1-8k"],
      zhipu: ["https://open.bigmodel.cn/api/paas/v4", "glm-4-flash"],
      ollama: ["http://localhost:11434/v1", "qwen2.5:7b"],
      custom: [state.api.baseUrl, state.api.model]
    }[id] || ["", ""];
    state.api.provider = id;
    const base = $("#api-base"), model = $("#api-model");
    if (base) base.value = map[0];
    if (model) model.value = map[1];
    $$(".provider-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.id === id));
  }

  async function testApi() {
    const cfg = {
      baseUrl: $("#api-base")?.value.trim() || state.api.baseUrl,
      model: $("#api-model")?.value.trim() || state.api.model,
      apiKey: $("#api-key")?.value.trim() || "",
      useProxy: !!$("#api-proxy")?.checked
    };
    const status = $("#api-status");
    if (status) status.textContent = "正在测试……";
    try {
      const content = await E.remoteChat([
        { role: "system", content: "You are a test assistant." },
        { role: "user", content: "Reply with exactly: OK" }
      ], cfg);
      if (status) status.textContent = "连接成功：" + content.slice(0, 40);
      toast("API 连接成功");
    } catch (err) {
      if (status) status.textContent = "连接失败：" + err.message;
      toast("连接失败：" + err.message, "error");
    }
  }

  function saveSettings() {
    state.api.baseUrl = $("#api-base")?.value.trim() || state.api.baseUrl;
    state.api.model = $("#api-model")?.value.trim() || state.api.model;
    state.api.apiKey = $("#api-key")?.value.trim() || "";
    state.api.useProxy = !!$("#api-proxy")?.checked;
    write(STORAGE.api, state.api);
    closeModal();
    render();
    toast(state.api.apiKey ? "AI 设置已保存" : "已切换为本地教练模式");
  }

  /* ------------------------------------------------------------------------
     Event handling
     ------------------------------------------------------------------------ */
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) { e.preventDefault(); navigate(nav.dataset.nav); return; }
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    const kind = el.dataset.kind;
    switch (action) {
      case "modal-backdrop": if (e.target === el) closeModal(); break;
      case "close-modal": closeModal(); break;
      case "open-settings": openSettings(); break;
      case "save-settings": saveSettings(); break;
      case "test-api": testApi(); break;
      case "set-provider": applyProvider(el.dataset.id); break;
      case "toggle-key": { const inp = $("#api-key"); if (inp) inp.type = inp.type === "password" ? "text" : "password"; break; }
      case "new-big": state.big = E.defaultBigState(); state.big.exam = state.small.exam || "英一"; saveBig(); navigate("big"); break;
      case "new-small": state.small = E.defaultSmallState(); saveSmall(); navigate("small"); break;
      case "big-tab": state.ui.bigTab = Number(el.dataset.index); render(); break;
      case "small-tab": state.ui.smallTab = Number(el.dataset.index); render(); break;
      case "set-exam": setExam(kind, el.dataset.value); break;
      case "set-small-mode": setSmallMode(el.dataset.value); break;
      case "generate-big": generateBig(); break;
      case "generate-small": generateSmall(); break;
      case "review-essay": reviewCurrent(el.dataset.kind); break;
      case "save-draft": saveDraft(el.dataset.kind); break;
      case "download-essay": {
        const k = el.dataset.kind; const prompt = currentPrompt(k);
        const name = (prompt ? prompt.year + "_" + prompt.exam + "_" + prompt.topic : "考研英语作文").replace(/[\\/:*?"<>|]/g, "_");
        downloadText(currentEssay(k), name + ".txt");
        break;
      }
      case "copy-essay": copyText(currentEssay(el.dataset.kind), "作文已复制"); break;
      case "copy-sentence": {
        const k = el.dataset.kind, id = el.dataset.option;
        const opt = k === "big" ? E.getBigOption(id) : E.getSmallOption(id);
        if (opt) {
          const s = k === "big" ? state.big : state.small;
          copyText(E.fillPlain(opt.en, E.mergedValues(k, s, id), "______"), "句子已复制");
        }
        break;
      }
      case "toggle-edit": {
        const k = el.dataset.kind; const s = k === "big" ? state.big : state.small;
        const paper = $("#essay-paper");
        if (!s.manualText) {
          s.manualText = paper ? paper.innerText : currentEssay(k);
          if (k === "big") saveBig(); else saveSmall();
          render();
          const p = $("#essay-paper"); if (p) { p.focus(); const range = document.createRange(); range.selectNodeContents(p); range.collapse(false); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); }
        } else {
          s.manualText = paper ? paper.innerText : s.manualText;
          if (k === "big") saveBig(); else saveSmall();
          render();
        }
        break;
      }
      case "open-picker": {
        const k = el.dataset.kind || "big";
        const section = el.dataset.section || "overview";
        if (section === "bank") { openBankPicker(); break; }
        const s = k === "big" ? state.big : state.small;
        let currentId = "";
        if (k === "big") currentId = s.selections[section] || "";
        else if (section === "greeting") currentId = s.greetingId;
        else if (section === "selfIntro") currentId = s.selfIntroId;
        else if (section === "secondTransition") currentId = s.transitionId;
        else if (section === "thirdEmotion") currentId = s.emotionId;
        else if (section === "thirdReply") currentId = s.replyId;
        else currentId = s.selections[section] || "";
        openPicker(k, section, currentId);
        break;
      }
      case "set-option": setOption(el.dataset.kind, el.dataset.section, el.dataset.id); break;
      case "open-purpose-picker": openPurposePicker(); break;
      case "set-purpose": {
        state.small.selections.purpose = el.dataset.id;
        saveSmall();
        closeModal();
        render();
        toast("已更换写信目的");
        break;
      }
      case "open-bank": state.ui.bankSelection = []; state.ui.bankQuery = ""; state.ui.bankGroup = "all"; openBankPicker(); break;
      case "bank-group": state.ui.bankGroup = el.dataset.value; openBankPicker(); break;
      case "bank-toggle": {
        const id = el.dataset.id;
        const set = new Set(state.ui.bankSelection || []);
        if (set.has(id)) set.delete(id); else set.add(id);
        state.ui.bankSelection = Array.from(set);
        const count = $("#bank-selected-count"); if (count) count.textContent = set.size;
        break;
      }
      case "add-bank-confirm": {
        const ids = state.ui.bankSelection || [];
        const s = state.small;
        ids.forEach((id) => { if (!s.bankIds.includes(id)) s.bankIds.push(id); });
        saveSmall();
        closeModal();
        render();
        toast(`已加入 ${ids.length} 句`);
        break;
      }
      case "remove-bank": {
        state.small.bankIds = state.small.bankIds.filter((x) => x !== el.dataset.id);
        saveSmall(); render(); toast("已移除");
        break;
      }
      case "toggle-fav": toggleFav(el.dataset.id); break;
      case "apply-template": applyTemplate(el.dataset.kind, el.dataset.id); break;
      case "prompt-kind": state.ui.promptKind = el.dataset.value; state.ui.promptType = "全部"; state.ui.promptExam = "全部"; render(); break;
      case "start-prompt": {
        if (el.dataset.kind === "big") loadBigPrompt(el.dataset.id);
        else loadSmallPrompt(el.dataset.id);
        break;
      }
      case "random-prompt": {
        const list = state.ui.promptKind === "big" ? P.big : P.small;
        const p = list[Math.floor(Math.random() * list.length)];
        if (state.ui.promptKind === "big") loadBigPrompt(p.id); else loadSmallPrompt(p.id);
        break;
      }
      case "lib-kind": state.ui.libKind = el.dataset.value; state.ui.libSection = "all"; render(); break;
      case "lib-sec": state.ui.libSection = el.dataset.value; render(); break;
      case "open-draft": openDraft(el.dataset.id); break;
      case "delete-draft": {
        state.drafts = state.drafts.filter((d) => d.id !== el.dataset.id);
        write(STORAGE.drafts, state.drafts); render(); toast("已删除");
        break;
      }
      case "export-all": {
        const text = state.drafts.map((d) => `【${d.title}】\n${d.text}\n\n`).join("\n");
        downloadText(text || "还没有练习。", "砚台_我的作文备份.txt");
        break;
      }
      case "quick-outline": showOutline(); break;
      case "reset-big": if (confirm("重置大作文的所有设定和选择？已保存的练习不受影响。")) { state.big = E.defaultBigState(); saveBig(); render(); toast("已重置"); } break;
      case "reset-small": if (confirm("重置小作文的所有设定和选择？")) { state.small = E.defaultSmallState(); saveSmall(); render(); toast("已重置"); } break;
      case "chat-send": { const inp = $("#chat-input"); if (inp) { sendChat(inp.value); inp.value = ""; } break; }
      case "chat-quick": sendChat(el.dataset.text); break;
      case "coach-use-draft": {
        const text = currentEssay("big");
        const inp = $("#chat-input");
        if (inp) { inp.value = "这是我目前的大作文，请按考研评分标准批改，只告诉我最值得改的两处：\n" + text.slice(0, 1800); inp.focus(); }
        break;
      }
      case "clear-chat": state.chat = [{ role: "assistant", time: Date.now(), html: "<p>对话已清空。今天想练什么？</p>" }]; write(STORAGE.chat, state.chat); renderChatLog(); break;
      case "load-big-prompt": break;
      default: break;
    }
  });

  document.addEventListener("change", (e) => {
    const el = e.target.closest("[data-action]");
    if (el && el.tagName === "SELECT") {
      const action = el.dataset.action;
      if (action === "load-big-prompt") { if (el.value) loadBigPrompt(el.value); return; }
      if (action === "load-small-prompt") { if (el.value) loadSmallPrompt(el.value); return; }
      if (action === "prompt-exam") { state.ui.promptExam = el.value; render(); return; }
      if (action === "prompt-type") { state.ui.promptType = el.value; render(); return; }
    }
    const bind = e.target.closest("[data-bind]");
    if (bind) {
      const path = bind.dataset.bind;
      const value = bind.type === "checkbox" ? bind.checked : bind.value;
      setPath(path, value);
      if (bind.dataset.rerender === "true") {
        if (path === "big.type") {
          state.big.manualText = "";
          if (state.big.type === "chart") { state.big.selections.overview = defaultOverviewId(state.big); state.big.selections.detail = defaultDetailId(state.big); }
          if (state.big.type === "picture") { state.big.selections.pictureIntro = "pic-in1"; }
          if (state.big.type === "picture-chart") { state.big.selections.pictureIntro = "pic-in5"; }
        }
        if (path === "big.scenario") {
          state.big.selections.overview = defaultOverviewId(state.big);
          state.big.selections.detail = defaultDetailId(state.big);
          state.big.manualText = "";
        }
        if (path === "small.type") {
          state.small.manualText = "";
          state.ui.smallTab = 0;
          if (state.small.type === "notice") state.small.bankIds = ["sb-9", "sb-10", "sb-18"];
          if (state.small.type === "minutes") state.small.bankIds = [];
          if (state.small.type === "letter") state.small.bankIds = (SUBTYPE_BANK[state.small.subtype] || SUBTYPE_BANK.other).slice();
        }
        if (path === "small.subtype") {
          const subtype = D.small.letterSubtypes.find((x) => x.id === state.small.subtype);
          state.small.mode = subtype?.mode || "active";
          state.small.selections.purpose = SUBTYPE_PURPOSE[state.small.subtype] || "pu-suggest";
          state.small.bankIds = (SUBTYPE_BANK[state.small.subtype] || SUBTYPE_BANK.other).slice();
          state.small.manualText = "";
        }
        if (path === "small.salutationId" || path === "small.closing" || path === "small.transitionId" || path === "small.emotionId" || path === "small.title") {
          // no extra
        }
        if (path.startsWith("big")) saveBig(); else saveSmall();
        render();
      } else {
        if (path.startsWith("big")) saveBig(); else saveSmall();
        refreshSentenceCards();
        refreshPreview();
      }
    }
  });

  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.id === "chat-input") return;
    const bind = el.closest("[data-bind]");
    if (bind && el.tagName !== "SELECT" && el.type !== "checkbox" && el.dataset.rerender !== "true") {
      setPath(bind.dataset.bind, el.value);
      if (bind.dataset.bind.startsWith("big")) saveBig(); else saveSmall();
      refreshSentenceCards();
      refreshPreview();
      return;
    }
    if (el.dataset.action === "prompt-search") {
      state.ui.promptQuery = el.value;
      clearTimeout(window.__promptSearchTimer);
      window.__promptSearchTimer = setTimeout(() => { const v = el.value; render(); const inp = $('[data-action="prompt-search"]'); if (inp) { inp.focus(); inp.setSelectionRange(v.length, v.length); } }, 260);
      return;
    }
    if (el.dataset.action === "lib-search") {
      state.ui.libQuery = el.value;
      clearTimeout(window.__libSearchTimer);
      window.__libSearchTimer = setTimeout(() => { const v = el.value; render(); const inp = $('[data-action="lib-search"]'); if (inp) { inp.focus(); inp.setSelectionRange(v.length, v.length); } }, 260);
      return;
    }
    if (el.dataset.action === "bank-search") {
      state.ui.bankQuery = el.value;
      clearTimeout(window.__bankSearchTimer);
      window.__bankSearchTimer = setTimeout(() => { const v = el.value; openBankPicker(); const inp = $('[data-action="bank-search"]'); if (inp) { inp.focus(); inp.setSelectionRange(v.length, v.length); } }, 260);
      return;
    }
    if (el.id === "essay-paper" && el.isContentEditable) {
      const kind = el.dataset.kind;
      const s = kind === "big" ? state.big : state.small;
      s.manualText = el.innerText;
      if (kind === "big") saveBig(); else saveSmall();
      refreshPreview(true);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.id === "chat-input" && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const value = e.target.value;
      e.target.value = "";
      sendChat(value);
    }
    if (e.key === "Escape") closeModal();
    if (e.target.id === "essay-paper" && e.target.isContentEditable && e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "    ");
    }
  });

  modalRoot.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) closeModal();
  });

  /* ------------------------------------------------------------------------
     Refresh helpers
     ------------------------------------------------------------------------ */
  function refreshSentenceCards() {
    $$("[data-sentence-option]").forEach((el) => {
      const kind = el.dataset.sentenceKind;
      const id = el.dataset.sentenceOption;
      const opt = kind === "big" ? E.getBigOption(id) : E.getSmallOption(id);
      if (!opt) return;
      const s = kind === "big" ? state.big : state.small;
      el.innerHTML = E.fillHtml(opt.en, E.mergedValues(kind, s, id));
    });
    $$("[data-cn-option]").forEach((el) => {
      const kind = el.dataset.cnKind;
      const id = el.dataset.cnOption;
      const opt = kind === "big" ? E.getBigOption(id) : E.getSmallOption(id);
      if (!opt) return;
      const s = kind === "big" ? state.big : state.small;
      el.textContent = E.fillPlain(opt.cn, E.mergedValues(kind, s, id), "……");
    });
    const purpose = $('[data-sentence-special="purpose-en"]');
    if (purpose) {
      const s = state.small;
      const opt = E.getSmallOption(s.selections.purpose || "pu-suggest");
      if (opt) purpose.innerHTML = "I am writing to <span class=\"blank\">" + E.escapeHtml(E.fillPlain(opt.en, E.mergedValues("small", s, opt.id))) + "</span>.";
    }
  }

  function refreshPreview(manual) {
    const paper = $("#essay-paper");
    if (!paper) return;
    const kind = paper.dataset.kind;
    if (manual) {
      const s = kind === "big" ? state.big : state.small;
      s.review = null;
      const panel = $("#review-panel");
      if (panel) panel.innerHTML = reviewPanelHTML(kind);
      updateMetrics(kind, paper.innerText);
      return;
    }
    if (paper.isContentEditable) return;
    const essay = currentEssay(kind);
    paper.innerHTML = E.escapeHtml(essay);
    updateMetrics(kind, essay);
  }

  function updateMetrics(kind, essay) {
    const words = E.countWords(essay);
    const target = targetWords(kind);
    const pct = Math.min(100, Math.round(words / target * 100));
    const ring = $("#word-ring"); if (ring) ring.style.setProperty("--p", pct);
    const rt = $("#word-ring-text"); if (rt) rt.textContent = pct + "%";
    const wc = $("#word-count"); if (wc) wc.textContent = words;
    const pc = $("#para-count"); if (pc) pc.textContent = bodyParagraphCount(kind, essay);
    const cov = Math.min(12, coverageCount(essay));
    const ct = $("#coverage-text"); if (ct) ct.textContent = "模板句 " + cov;
  }

  function openPurposePicker() {
    const s = state.small;
    const subtype = s.subtype;
    const list = D.small.purposes.filter((p) => p.type === subtype || subtype === "other");
    const options = (list.length ? list : D.small.purposes);
    openModal(`<div class="modal-head"><div><h3>换一个写信目的</h3><p>第一段只写目的，不写细节。</p></div><button class="icon-btn modal-close" data-action="close-modal">${icon("close")}</button></div>
      <div class="modal-body"><div class="card" style="overflow:hidden">${options.map((o) => `<div class="template-row" style="grid-template-columns:minmax(0,1fr) auto"><div><div class="tr-en">I am writing to ${E.escapeHtml(o.en)}.</div><p class="tr-cn">我写信是为了${E.escapeHtml(o.cn)}。</p></div><button class="tiny-btn" data-action="set-purpose" data-id="${o.id}">用这句</button></div>`).join("")}</div></div>`, { wide: false });
  }

  function openDraft(id) {
    const d = state.drafts.find((x) => x.id === id);
    if (!d) return;
    if (d.kind === "big") {
      if (d.promptId && d.promptId !== state.big.promptId) loadBigPrompt(d.promptId);
      state.big.manualText = d.text;
      state.big.promptId = d.promptId || state.big.promptId;
      state.big.exam = d.exam || "英一";
      state.big.draftId = d.id;
      state.big.review = null;
      saveBig();
      history.replaceState(null, "", "#/big");
      state.route = "big";
      render();
    } else {
      if (d.promptId && d.promptId !== state.small.promptId) loadSmallPrompt(d.promptId);
      state.small.manualText = d.text;
      state.small.promptId = d.promptId || state.small.promptId;
      state.small.exam = d.exam || "英一";
      state.small.draftId = d.id;
      state.small.review = null;
      saveSmall();
      history.replaceState(null, "", "#/small");
      state.route = "small";
      render();
    }
  }

  function showOutline() {
    const list = E.outlineBig(state.big);
    openModal(`<div class="modal-head"><div><h3>三段提纲</h3><p>先想清楚每段写什么，再动笔。</p></div><button class="icon-btn modal-close" data-action="close-modal">${icon("close")}</button></div>
      <div class="modal-body"><ol style="padding-left:18px;line-height:1.85;font-size:12.5px">${list.map((x) => `<li>${E.escapeHtml(x)}</li>`).join("")}</ol>
      <div class="settings-note mt-2">如果提纲里有你写不出来的点，回到工作台换一句模板，不要硬憋。</div></div>
      <div class="modal-foot"><div class="spacer"></div><button class="btn btn-primary" data-action="close-modal">知道了</button></div>`, { narrow: true });
  }

  /* ------------------------------------------------------------------------
     Render dispatcher
     ------------------------------------------------------------------------ */
  function render() {
    state.route = routeFromHash();
    switch (state.route) {
      case "big": renderBigView(); break;
      case "small": renderSmallView(); break;
      case "prompts": renderPrompts(); break;
      case "templates": renderTemplates(); break;
      case "coach": renderCoach(); break;
      case "drafts": renderDrafts(); break;
      default: renderHome();
    }
    if (state.route === "big" || state.route === "small") refreshPreview();
    const splash = $("#boot-splash");
    if (splash) splash.remove();
    app.hidden = false;
  }

  /* ------------------------------------------------------------------------
     Init
     ------------------------------------------------------------------------ */
  function init() {
    if (!location.hash) history.replaceState(null, "", "#/home");
    window.addEventListener("hashchange", render);
    render();
    window.addEventListener("error", (e) => showFatal(e.message, e.error && e.error.stack));
  }

  init();
})();
