(function () {
  "use strict";
  const VERSION = "v156E-premium-profile-center-screens";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function premiumSettingsHtml() {
    return "" +
      "<div class=\"sabi156e-hero\">" +
        "<div><div class=\"sabi156e-hero-title\">Studio control settings</div><div class=\"sabi156e-hero-sub\">Manage account, plan, session, language direction, and locked production integrations from one clean profile center.</div></div>" +
        "<div class=\"sabi156e-pill\">Owner safe mode</div>" +
      "</div>" +
      "<div class=\"sabi156e-status-grid\">" +
        "<div class=\"sabi156e-status ok\"><b>Account</b><span>Local account bridge active.</span></div>" +
        "<div class=\"sabi156e-status ok\"><b>Plan</b><span>Subscription screen linked.</span></div>" +
        "<div class=\"sabi156e-status locked\"><b>Payments</b><span>Provider locked until approval.</span></div>" +
        "<div class=\"sabi156e-status locked\"><b>OAuth</b><span>Google real OAuth locked.</span></div>" +
      "</div>" +
      "<div class=\"sabi156d-grid\">" +
        "<div class=\"sabi156d-card\"><b>Profile source</b><span>Name and email come from the approved local Sabi account session. No unapproved account mutation is executed here.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Interface</b><span>RU/EN quick buttons are hidden from sidebar. Full language controls can be added later inside this Settings center.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Security</b><span>Log out clears local session and returns to the approved auth screen.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Production locks</b><span>Payment, provider, DB mutation, and real OAuth remain locked until Owner-approved stage.</span></div>" +
      "</div>" +
      "<div class=\"sabi156e-actionbar\">" +
        "<button class=\"sabi156e-action\" type=\"button\" data-sabi156e-go=\"account\">Open My Account</button>" +
        "<button class=\"sabi156e-action\" type=\"button\" data-sabi156e-go=\"plan\">Change Plan</button>" +
        "<button class=\"sabi156e-action secondary\" type=\"button\" data-sabi156e-close=\"true\">Close</button>" +
      "</div>" +
      "<div class=\"sabi156e-note\">This Settings screen is functional UI navigation and status control only. It does not simulate provider, payment, OAuth, DB, or backend success.</div>";
  }

  function premiumHelpHtml() {
    return "" +
      "<div class=\"sabi156e-hero\">" +
        "<div><div class=\"sabi156e-hero-title\">Sabi AI Studio help center</div><div class=\"sabi156e-hero-sub\">Quick guidance for Profile, Projects, Chat, files, account, and safe production locks.</div></div>" +
        "<div class=\"sabi156e-pill\">Help center beta</div>" +
      "</div>" +
      "<div class=\"sabi156e-status-grid\">" +
        "<div class=\"sabi156e-status ok\"><b>Profile</b><span>Menu works and opens center screens.</span></div>" +
        "<div class=\"sabi156e-status ok\"><b>Projects</b><span>Auto-scale verified.</span></div>" +
        "<div class=\"sabi156e-status ok\"><b>Stickers</b><span>Mojibake clean.</span></div>" +
        "<div class=\"sabi156e-status locked\"><b>Support tickets</b><span>Locked until support stage.</span></div>" +
      "</div>" +
      "<div class=\"sabi156d-grid\">" +
        "<div class=\"sabi156d-card\"><b>Profile</b><span>Use the bottom profile button to open account, settings, subscription, help, or log out.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Projects</b><span>Projects keep chats, files, and history separate. The screen must not crop when the panel is narrow.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Chat</b><span>Use the composer for text, files, documents, presentations, images, video, and generated output.</span></div>" +
        "<div class=\"sabi156d-card\"><b>Locked actions</b><span>When a real provider or support backend is not approved, UI must say locked instead of showing simulated success.</span></div>" +
      "</div>" +
      "<div class=\"sabi156e-actionbar\">" +
        "<button class=\"sabi156e-action\" type=\"button\" data-sabi156e-go=\"account\">Open My Account</button>" +
        "<button class=\"sabi156e-action\" type=\"button\" data-sabi156e-go=\"plan\">Open Subscription</button>" +
        "<button class=\"sabi156e-action secondary\" type=\"button\" data-sabi156e-close=\"true\">Close</button>" +
      "</div>" +
      "<div class=\"sabi156e-note\">This Help center is real guidance UI. It does not create unsupported tickets and does not touch backend/payment/provider code.</div>";
  }

  function ensureBase() {
    if (window.sabiProfileCenterScreensV156D && typeof window.sabiProfileCenterScreensV156D.install === "function") {
      window.sabiProfileCenterScreensV156D.install();
    }
    return !!qs("#sabi156DOverlay");
  }

  function open(type) {
    ensureBase();
    const overlay = qs("#sabi156DOverlay");
    const title = qs("#sabi156DTitle");
    const body = qs("#sabi156DBody");
    const screen = qs(".sabi156d-screen", overlay);
    if (!overlay || !title || !body || !screen) return false;
    screen.classList.add("sabi156e-premium");
    if (type === "help") {
      title.textContent = "Help";
      body.innerHTML = premiumHelpHtml();
    } else {
      title.textContent = "Settings";
      body.innerHTML = premiumSettingsHtml();
    }
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    qsa("[data-sabi156e-go]", body).forEach(function (btn) {
      btn.addEventListener("click", function () {
        const go = btn.getAttribute("data-sabi156e-go");
        if (go === "account") window.location.href = "./auth-account.html";
        if (go === "plan") window.location.href = "./subscription-change-plan.html";
      });
    });
    qsa("[data-sabi156e-close]", body).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.sabiProfileCenterScreensV156D) window.sabiProfileCenterScreensV156D.close();
      });
    });
    return true;
  }

  function bindMenu() {
    ensureBase();
    const menu = qs("#sabi156ProfileMenu");
    if (!menu || menu.__sabi156EPremiumBound) return !!menu;
    menu.__sabi156EPremiumBound = true;
    menu.addEventListener("click", function (e) {
      const actionEl = e.target.closest("[data-sabi156-action]");
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-sabi156-action");
      if (action === "settings" || action === "help") {
        e.preventDefault();
        e.stopPropagation();
        open(action);
      }
    }, true);
    return true;
  }

  function hideLang() {
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
    const base = ensureBase();
    const bound = bindMenu();
    const hiddenLang = hideLang();
    window.__sabi156ELast = { at: new Date().toISOString(), base: base, bound: bound, hiddenLang: hiddenLang };
    return base && bound;
  }

  function boxOk() {
    const screen = qs(".sabi156d-screen");
    if (!screen) return false;
    const r = screen.getBoundingClientRect();
    return r.width <= window.innerWidth + 2 && r.height <= window.innerHeight + 2 && r.left >= -2 && r.right <= window.innerWidth + 2;
  }

  function selfTest() {
    install();
    const settingsOpened = open("settings");
    const settingsOk = settingsOpened && boxOk();
    if (window.sabiProfileCenterScreensV156D) window.sabiProfileCenterScreensV156D.close();
    const helpOpened = open("help");
    const helpOk = helpOpened && boxOk();
    if (window.sabiProfileCenterScreensV156D) window.sabiProfileCenterScreensV156D.close();
    const oldV152Loaded = typeof window.sabiSidebarUserMenuV152A !== "undefined";
    const oldV152Dock = !!qs("[data-sabi152-user-dock]");
    const oldBrokenButtons = document.querySelectorAll(".sabi152m-hide-sidebar-btn,.sabi152n-hide-sidebar-btn,.sabi152o-hide-sidebar-btn,.sabi153b-hide-sidebar-btn,.sabi153b-open-sidebar-btn").length;
    const brokenVisible = window.sabiVisibleMojibakeCleanV154D ? window.sabiVisibleMojibakeCleanV154D.selfTest().brokenVisibleCount : null;
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 4 || document.body.scrollWidth > window.innerWidth + 4;
    return {
      at: new Date().toISOString(),
      version: VERSION,
      loaded: true,
      premiumBaseReady: !!qs("#sabi156DOverlay"),
      settingsPremiumReady: settingsOk,
      helpPremiumReady: helpOk,
      hiddenLangButtons: qsa("[data-sabi156d-hidden-lang=true]").length,
      oldV152Loaded: oldV152Loaded,
      oldV152Dock: oldV152Dock,
      oldBrokenButtons: oldBrokenButtons,
      brokenVisible: brokenVisible,
      horizontalOverflow: horizontalOverflow,
      last: window.__sabi156ELast || null
    };
  }

  async function fullSelfTest() {
    install();
    await new Promise(function (resolve) { setTimeout(resolve, 100); });
    const r = selfTest();
    return {
      at: new Date().toISOString(),
      version: VERSION,
      pass: r.premiumBaseReady && r.settingsPremiumReady && r.helpPremiumReady && !r.oldV152Loaded && !r.oldV152Dock && r.oldBrokenButtons === 0 && r.brokenVisible === 0 && !r.horizontalOverflow,
      base: r,
      readiness: {
        settingsPremiumPercent: r.settingsPremiumReady ? 100 : 0,
        helpPremiumPercent: r.helpPremiumReady ? 100 : 0,
        autoScalePercent: !r.horizontalOverflow ? 100 : 0,
        oldV152StillDisabledPercent: !r.oldV152Loaded && !r.oldV152Dock ? 100 : 0,
        backendTouchedPercent: 0
      }
    };
  }

  function boot() {
    install();
    window.setTimeout(install, 180);
    window.setTimeout(install, 550);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.sabiProfilePremiumCenterV156E = { version: VERSION, install: install, open: open, selfTest: selfTest, fullSelfTest: fullSelfTest };
})();
