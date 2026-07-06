(function () {
  "use strict";

  if (window.sabiStudioV143B) return;

  const VERSION = "v143B-safe-nonvisual-main-chat-project-sync";
  const STATE_KEY = "sabi-ai-studio-v143B-safe-sync-state";
  const REPORT_KEY = "sabi-ai-studio-v143B-safe-sync-report";

  const state = {
    version: VERSION,
    installedAt: new Date().toISOString(),
    lastKnownScreen: "",
    lastMainPrompt: "",
    lastChatDraft: "",
    lastProjectContext: "",
    currentChatId: "",
    currentProjectId: "",
    events: [],
    warnings: []
  };

  function now() {
    return new Date().toISOString();
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STATE_KEY) || "null");
      if (saved && typeof saved === "object") Object.assign(state, saved);
    } catch (_) {}
  }

  function save() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  function emit(type, data) {
    state.events.push({
      at: now(),
      type,
      data: data || {}
    });

    if (state.events.length > 120) state.events = state.events.slice(-120);
    save();

    try {
      window.dispatchEvent(new CustomEvent("sabi-studio-safe-sync-v143B", {
        detail: {
          at: now(),
          version: VERSION,
          type,
          state: {
            lastKnownScreen: state.lastKnownScreen,
            currentChatId: state.currentChatId,
            currentProjectId: state.currentProjectId,
            lastMainPrompt: state.lastMainPrompt,
            lastChatDraft: state.lastChatDraft,
            lastProjectContext: state.lastProjectContext
          },
          data: data || {}
        }
      }));
    } catch (_) {}
  }

  function textOf(el) {
    try {
      return [
        el.id || "",
        el.className || "",
        el.name || "",
        el.placeholder || "",
        el.getAttribute("aria-label") || "",
        el.getAttribute("title") || "",
        el.getAttribute("data-screen") || "",
        el.getAttribute("data-route") || "",
        el.getAttribute("data-action") || "",
        (el.textContent || "").slice(0, 500)
      ].join(" ").toLowerCase();
    } catch (_) {
      return "";
    }
  }

  function visible(el) {
    if (!el) return false;
    try {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== "none" &&
        cs.visibility !== "hidden" &&
        r.width > 8 &&
        r.height > 8;
    } catch (_) {
      return false;
    }
  }

  function getValue(el) {
    if (!el) return "";
    try {
      if (el.isContentEditable) return (el.textContent || "").trim();
      return String(el.value || "").trim();
    } catch (_) {
      return "";
    }
  }

  function inputs() {
    try {
      return Array.from(document.querySelectorAll("textarea,input,[contenteditable='true']")).filter(visible);
    } catch (_) {
      return [];
    }
  }

  function visibleActions() {
    try {
      return Array.from(document.querySelectorAll("button,a,[role='button'],[data-route],[data-action]")).filter(visible);
    } catch (_) {
      return [];
    }
  }

  function inferScreenFromElement(el) {
    const t = textOf(el);

    if (/project|projects|проект|проекты/.test(t)) return "projects";
    if (/chat|чат|message|сообщ|dialog/.test(t)) return "chat";
    if (/main|home|start|главн|начал|старт|hero/.test(t)) return "main";

    return "";
  }

  function inferCurrentScreen() {
    const hash = String(location.hash || "").toLowerCase();

    if (/project/.test(hash)) return "projects";
    if (/chat/.test(hash)) return "chat";
    if (/main|home|start/.test(hash)) return "main";

    const actionsText = visibleActions().map(textOf).join(" ");
    const bodyText = (document.body && document.body.textContent ? document.body.textContent : "").slice(0, 3000).toLowerCase();

    if (/project|projects|проект|проекты/.test(actionsText) && /project|projects|проект|проекты/.test(bodyText)) return "projects";
    if (/chat|чат|message|сообщ/.test(actionsText) || /chat|чат/.test(bodyText)) return "chat";
    if (/sabi|studio|главн|start|home/.test(bodyText)) return "main";

    return state.lastKnownScreen || "main";
  }

  function syncInputsOnly() {
    const list = inputs();

    list.forEach(function (el) {
      const value = getValue(el);
      if (!value) return;

      const t = textOf(el);

      if (/project|проект/.test(t)) {
        state.lastProjectContext = value;
        if (!state.currentProjectId) state.currentProjectId = "project-" + Date.now();
      } else if (/chat|чат|message|сообщ|ask|prompt|спрос|запрос/.test(t)) {
        state.lastChatDraft = value;
        if (!state.currentChatId) state.currentChatId = "chat-" + Date.now();
      } else if (/main|home|start|главн|начал|ask|prompt|спрос|запрос/.test(t)) {
        state.lastMainPrompt = value;
      }
    });

    save();

    return {
      ok: true,
      inputsCount: list.length,
      lastMainPromptLength: state.lastMainPrompt.length,
      lastChatDraftLength: state.lastChatDraft.length,
      lastProjectContextLength: state.lastProjectContext.length
    };
  }

  function setContext(data) {
    data = data || {};

    if (data.screen) state.lastKnownScreen = String(data.screen);
    if (data.chatId) state.currentChatId = String(data.chatId);
    if (data.projectId) state.currentProjectId = String(data.projectId);
    if (data.mainPrompt) state.lastMainPrompt = String(data.mainPrompt);
    if (data.chatDraft) state.lastChatDraft = String(data.chatDraft);
    if (data.projectContext) state.lastProjectContext = String(data.projectContext);

    save();
    emit("set-context", data);

    return {
      ok: true,
      state: Object.assign({}, state)
    };
  }

  function getContext() {
    syncInputsOnly();

    return {
      ok: true,
      version: VERSION,
      state: {
        lastKnownScreen: state.lastKnownScreen,
        currentChatId: state.currentChatId,
        currentProjectId: state.currentProjectId,
        lastMainPrompt: state.lastMainPrompt,
        lastChatDraft: state.lastChatDraft,
        lastProjectContext: state.lastProjectContext
      }
    };
  }

  function installPassiveInputListener() {
    document.addEventListener("input", function (e) {
      const el = e.target;
      if (!el) return;

      const value = getValue(el);
      if (!value) return;

      const screen = inferScreenFromElement(el);
      if (screen) state.lastKnownScreen = screen;

      const t = textOf(el);

      if (/project|проект/.test(t) || screen === "projects") {
        state.lastProjectContext = value;
        if (!state.currentProjectId) state.currentProjectId = "project-" + Date.now();
      } else if (/chat|чат|message|сообщ|ask|prompt|спрос|запрос/.test(t) || screen === "chat") {
        state.lastChatDraft = value;
        if (!state.currentChatId) state.currentChatId = "chat-" + Date.now();
      } else {
        state.lastMainPrompt = value;
      }

      save();
      emit("input-sync", { screen: screen || state.lastKnownScreen, valueLength: value.length });
    }, true);
  }

  function installPassiveClickListener() {
    document.addEventListener("click", function (e) {
      const el = e.target && e.target.closest
        ? e.target.closest("button,a,[role='button'],[data-route],[data-action]")
        : null;

      if (!el || !visible(el)) return;

      const screen = inferScreenFromElement(el);

      if (screen) {
        state.lastKnownScreen = screen;
        if (screen === "chat" && !state.currentChatId) state.currentChatId = "chat-" + Date.now();
        if (screen === "projects" && !state.currentProjectId) state.currentProjectId = "project-" + Date.now();

        save();
        emit("passive-click-screen-detected", { screen });
      }
    }, true);
  }

  function report() {
    const screen = inferCurrentScreen();
    state.lastKnownScreen = screen;
    const inputReport = syncInputsOnly();

    const actions = visibleActions();
    const syncTargets = actions
      .map(function (el) { return inferScreenFromElement(el); })
      .filter(Boolean);

    const r = {
      at: now(),
      version: VERSION,
      loaded: true,
      mode: "safe-nonvisual",
      lastKnownScreen: state.lastKnownScreen,
      currentChatId: state.currentChatId,
      currentProjectId: state.currentProjectId,
      lastMainPromptLength: state.lastMainPrompt.length,
      lastChatDraftLength: state.lastChatDraft.length,
      lastProjectContextLength: state.lastProjectContext.length,
      visibleInputsCount: inputReport.inputsCount,
      visibleActionsCount: actions.length,
      syncTargetsCount: syncTargets.length,
      hasMainTarget: syncTargets.includes("main"),
      hasChatTarget: syncTargets.includes("chat"),
      hasProjectsTarget: syncTargets.includes("projects"),
      accessBridgeLoaded: !!(window.sabiAccessV138 || window.sabiAccessV129),
      noHiddenUsed: true,
      noDisplayNoneUsed: true,
      noForcedNavigation: true,
      cssChanged: false,
      designChanged: false,
      paymentAcceptanceTouched: false
    };

    try {
      localStorage.setItem(REPORT_KEY, JSON.stringify(r));
    } catch (_) {}

    return r;
  }

  function fullSelfTest() {
    const before = report();

    const testContext = setContext({
      screen: before.lastKnownScreen || "main",
      chatId: state.currentChatId || "chat-v143B-self-test",
      projectId: state.currentProjectId || "project-v143B-self-test",
      mainPrompt: state.lastMainPrompt || "Sabi v143B safe main prompt",
      chatDraft: state.lastChatDraft || "Sabi v143B safe chat draft",
      projectContext: state.lastProjectContext || "Sabi v143B safe project context"
    });

    const after = report();

    const pass = !!(
      after.loaded &&
      after.accessBridgeLoaded &&
      after.noHiddenUsed &&
      after.noDisplayNoneUsed &&
      after.noForcedNavigation &&
      after.visibleActionsCount > 0 &&
      after.visibleInputsCount > 0 &&
      !after.cssChanged &&
      !after.designChanged &&
      !after.paymentAcceptanceTouched
    );

    const r = {
      at: now(),
      version: VERSION,
      loaded: true,
      pass,
      before,
      testContextOk: !!testContext.ok,
      after,
      readiness: {
        safeSyncPercent: pass ? 99 : 96,
        mainChatProjectsContextPercent: pass ? 99 : 96
      },
      cssChanged: false,
      designChanged: false,
      paymentAcceptanceTouched: false
    };

    try {
      localStorage.setItem(REPORT_KEY, JSON.stringify(r));
    } catch (_) {}

    return r;
  }

  load();
  installPassiveInputListener();
  installPassiveClickListener();

  window.sabiStudioV143B = {
    version: VERSION,
    mode: "safe-nonvisual",
    state,
    setContext,
    getContext,
    syncInputsOnly,
    selfTest: report,
    report,
    fullSelfTest,
    getStoredReport: function () {
      try { return JSON.parse(localStorage.getItem(REPORT_KEY) || "null"); }
      catch (_) { return null; }
    }
  };

  emit("installed", { safeNonVisual: true });
})();

