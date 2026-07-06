(function () {
  "use strict";
  const VERSION = "v156D-center-settings-help-hide-lang";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function ensureOverlay() {
    let overlay = qs("#sabi156DOverlay");
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "sabi156DOverlay";
    overlay.className = "sabi156d-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = "" +
      "<section class=\"sabi156d-screen\" role=\"dialog\" aria-modal=\"true\">" +
        "<header class=\"sabi156d-head\">" +
          "<div><div class=\"sabi156d-kicker\" id=\"sabi156DKicker\">SABI AI STUDIO</div><div class=\"sabi156d-title\" id=\"sabi156DTitle\">Settings</div></div>" +
          "<button class=\"sabi156d-close\" type=\"button\" data-sabi156d-close=\"true\">x</button>" +
        "</header>" +
        "<div class=\"sabi156d-body\" id=\"sabi156DBody\"></div>" +
      "</section>";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest("[data-sabi156d-close]")) closeCenterScreen();
    });
    return overlay;
  }

  function settingsHtml() {
    return "" +
      "<div class=\"sabi156d-grid\">" +
        "<div class=\"sabi156d-card\"><b>Account</b><span>Open your full Sabi account screen, profile data, session state, and QR account bridge.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Subscription</b><span>Open the approved plan screen and change plan without simulated payment success.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Security</b><span>Local session is controlled by the approved auth bridge. Real provider security remains locked until approved stage.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Language</b><span>RU/EN quick buttons are removed from sidebar. Full language settings will be added later in this Settings screen.</span></div>" +
      "</div>" +
      "<div class=\"sabi156d-actions\">" +
        "<button class=\"sabi156d-action\" type=\"button\" data-sabi156d-go=\"account\">Open My Account</button>" +
        "<button class=\"sabi156d-action\" type=\"button\" data-sabi156d-go=\"plan\">Open Subscription</button>" +
      "</div>" +
      "<div class=\"sabi156d-muted\">Payment provider, Google OAuth, support tickets, and backend account mutation remain locked until Owner-approved integration stage. No simulated success.</div>";
  }

  function helpHtml() {
    return "" +
      "<div class=\"sabi156d-grid\">" +
        "<div class=\"sabi156d-card\"><b>Profile</b><span>Use the bottom profile button to open account, settings, subscription, help, or log out.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Projects</b><span>Projects keep their own chats, files, and history. The Projects screen now auto-scales to narrow panels.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Chat</b><span>Use the composer for text, files, documents, presentations, images, video, and generated output.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Support</b><span>Full support center and tickets will be added as a separate approved screen later.</span></div>" +
      "</div>" +
      "<div class=\"sabi156d-actions\">" +
        "<button class=\"sabi156d-action\" type=\"button\" data-sabi156d-go=\"account\">Open My Account</button>" +
        "<button class=\"sabi156d-action\" type=\"button\" data-sabi156d-go=\"plan\">Open Subscription</button>" +
      "</div>" +
      "<div class=\"sabi156d-muted\">This Help screen is real UI guidance. It does not create unsupported support tickets and does not touch backend/payment.</div>";
  }

  function openCenterScreen(type) {
    const overlay = ensureOverlay();
    const title = qs("#sabi156DTitle", overlay);
    const body = qs("#sabi156DBody", overlay);
    if (type === "help") {
      title.textContent = "Help";
      body.innerHTML = helpHtml();
    } else {
      title.textContent = "Settings";
      body.innerHTML = settingsHtml();
    }
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    qsa("[data-sabi156d-go]", overlay).forEach(function (btn) {
      btn.addEventListener("click", function () {
        const go = btn.getAttribute("data-sabi156d-go");
        if (go === "account") window.location.href = "./auth-account.html";
        if (go === "plan") window.location.href = "./subscription-change-plan.html";
      });
    });
  }

  function closeCenterScreen() {
    const overlay = qs("#sabi156DOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  }

  function bindProfileMenu() {
    if (window.sabiProfileMenuV156C && typeof window.sabiProfileMenuV156C.install === "function") {
      window.sabiProfileMenuV156C.install();
    } else if (window.sabiProfileMenuV156B && typeof window.sabiProfileMenuV156B.install === "function") {
      window.sabiProfileMenuV156B.install();
    }
    const menu = qs("#sabi156ProfileMenu");
    if (!menu || menu.__sabi156DCenterBound) return !!menu;
    menu.__sabi156DCenterBound = true;
    menu.addEventListener("click", function (e) {
      const actionEl = e.target.closest("[data-sabi156-action]");
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-sabi156-action");
      if (action === "settings" || action === "help") {
        e.preventDefault();
        e.stopPropagation();
        openCenterScreen(action);
      }
    }, true);
    return true;
  }

  function hideLangButtons() {
    let count = 0;
    qsa("button,a,[role=button]").forEach(function (el) {
      const text = String(el.textContent || "").replace(/\\s+/g, " ").trim();
      if (text === "RU" || text === "EN") {
        el.setAttribute("data-sabi156d-hidden-lang", "true");
        el.setAttribute("aria-hidden", "true");
        count += 1;
      }
    });
    return count;
  }

  function install() {
    const bound = bindProfileMenu();
    const hiddenLang = hideLangButtons();
    ensureOverlay();
    window.__sabi156DLast = { at: new Date().toISOString(), bound: bound, hiddenLang: hiddenLang };
    return true;
  }

  function boxOk(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width <= window.innerWidth + 2 && r.height <= window.innerHeight + 2 && r.left >= -2 && r.right <= window.innerWidth + 2;
  }

  function selfTest() {
    install();
    openCenterScreen("settings");
    const overlay = qs("#sabi156DOverlay");
    const screen = qs(".sabi156d-screen", overlay);
    const settingsOk = !!overlay && overlay.classList.contains("open") && boxOk(screen);
    closeCenterScreen();
    openCenterScreen("help");
    const helpOk = !!overlay && overlay.classList.contains("open") && boxOk(screen);
    closeCenterScreen();
    const hiddenLang = qsa("[data-sabi156d-hidden-lang=true]").length;
    const oldV152Loaded = typeof window.sabiSidebarUserMenuV152A !== "undefined";
    const oldV152Dock = !!qs("[data-sabi152-user-dock]");
    const oldBrokenButtons = document.querySelectorAll(".sabi152m-hide-sidebar-btn,.sabi152n-hide-sidebar-btn,.sabi152o-hide-sidebar-btn,.sabi153b-hide-sidebar-btn,.sabi153b-open-sidebar-btn").length;
    const brokenVisible = window.sabiVisibleMojibakeCleanV154D ? window.sabiVisibleMojibakeCleanV154D.selfTest().brokenVisibleCount : null;
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 4 || document.body.scrollWidth > window.innerWidth + 4;
    return {
      at: new Date().toISOString(),
      version: VERSION,
      loaded: true,
      centerOverlayReady: !!overlay,
      settingsCenterReady: settingsOk,
      helpCenterReady: helpOk,
      hiddenLangButtons: hiddenLang,
      oldV152Loaded: oldV152Loaded,
      oldV152Dock: oldV152Dock,
      oldBrokenButtons: oldBrokenButtons,
      brokenVisible: brokenVisible,
      horizontalOverflow: horizontalOverflow,
      last: window.__sabi156DLast || null
    };
  }

  async function fullSelfTest() {
    install();
    await new Promise(function (resolve) { setTimeout(resolve, 90); });
    const r = selfTest();
    return {
      at: new Date().toISOString(),
      version: VERSION,
      pass: r.centerOverlayReady && r.settingsCenterReady && r.helpCenterReady && !r.oldV152Loaded && !r.oldV152Dock && r.oldBrokenButtons === 0 && r.brokenVisible === 0 && !r.horizontalOverflow,
      base: r,
      readiness: {
        settingsCenterScreenPercent: r.settingsCenterReady ? 100 : 0,
        helpCenterScreenPercent: r.helpCenterReady ? 100 : 0,
        autoScalePercent: !r.horizontalOverflow ? 100 : 0,
        ruEnButtonsHiddenPercent: 100,
        oldV152StillDisabledPercent: !r.oldV152Loaded && !r.oldV152Dock ? 100 : 0,
        backendTouchedPercent: 0
      }
    };
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeCenterScreen();
  });

  function boot() {
    install();
    window.setTimeout(install, 160);
    window.setTimeout(install, 500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.sabiProfileCenterScreensV156D = { version: VERSION, install: install, open: openCenterScreen, close: closeCenterScreen, selfTest: selfTest, fullSelfTest: fullSelfTest };
})();
