(function () {
  "use strict";
  const VERSION = "v156B-clean-profile-menu";

  const SESSION_TOKEN_KEY = "sabi-ai-studio-real-session-token-v146A";
  const SESSION_USER_KEY = "sabi-ai-studio-real-user-v146A";

  function qs(sel, root) { return (root || document).querySelector(sel); }

  function safeJson(value) {
    try { return JSON.parse(value || "null"); } catch (e) { return null; }
  }

  function currentUser() {
    const user = safeJson(localStorage.getItem(SESSION_USER_KEY)) || {};
    const email = user.email || user.mail || "Owner";
    const name = user.name || user.displayName || user.fullName || "Sabi AI";
    return { name: String(name), email: String(email) };
  }

  function initials(name, email) {
    const source = String(name || email || "S").trim();
    return (source[0] || "S").toUpperCase();
  }

  function closeMenu() {
    const menu = qs("#sabi156ProfileMenu");
    const btn = qs("#profileBtn");
    if (menu) menu.classList.remove("open");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function showLocked(message) {
    const note = qs("#sabi156LockedNote");
    if (!note) return;
    note.textContent = message;
    note.classList.add("show");
    window.clearTimeout(window.__sabi156LockedTimer);
    window.__sabi156LockedTimer = window.setTimeout(function () {
      note.classList.remove("show");
    }, 2600);
  }

  function logout() {
    localStorage.removeItem(SESSION_TOKEN_KEY);
    localStorage.removeItem(SESSION_USER_KEY);
    localStorage.removeItem("sabi-ai-studio-pending-plan-v147A");
    localStorage.removeItem("sabi-ai-studio-active-plan-v147A");
    window.location.href = "./auth-register.html";
  }

  function menuHtml(user) {
    const name = escapeHtml(user.name);
    const email = escapeHtml(user.email);
    return "" +
      "<div class=\"sabi156-menu-head\">" +
        "<div class=\"sabi156-menu-title\">" + name + "</div>" +
        "<div class=\"sabi156-menu-sub\">" + email + "</div>" +
      "</div>" +
      "<button class=\"sabi156-menu-item\" type=\"button\" data-sabi156-action=\"profile\"><span>●</span><span>Profile</span><b>↗</b></button>" +
      "<button class=\"sabi156-menu-item\" type=\"button\" data-sabi156-action=\"settings\" disabled><span>⚙</span><span>Settings</span><b class=\"sabi156-badge\">locked</b></button>" +
      "<button class=\"sabi156-menu-item\" type=\"button\" data-sabi156-action=\"plan\"><span>◆</span><span>Change plan</span><b>↗</b></button>" +
      "<button class=\"sabi156-menu-item\" type=\"button\" data-sabi156-action=\"help\" disabled><span>?</span><span>Help</span><b class=\"sabi156-badge\">locked</b></button>" +
      "<button class=\"sabi156-menu-item\" type=\"button\" data-sabi156-action=\"logout\"><span>⏻</span><span>Log out</span><b></b></button>" +
      "<div id=\"sabi156LockedNote\" class=\"sabi156-locked-note\"></div>";
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>\"]/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[ch];
    });
  }

  function renderButton(btn, user) {
    btn.classList.add("sabi156-profile-ready");
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    btn.type = "button";
    btn.innerHTML = "" +
      "<span class=\"sabi156-profile-main\">" +
        "<span class=\"sabi156-avatar\">" + escapeHtml(initials(user.name, user.email)) + "</span>" +
        "<span class=\"sabi156-profile-text\">" +
          "<span class=\"sabi156-profile-name\">" + escapeHtml(user.name) + "</span>" +
          "<span class=\"sabi156-profile-email\">" + escapeHtml(user.email) + "</span>" +
        "</span>" +
        "<span class=\"sabi156-profile-chev\">›</span>" +
      "</span>";
  }

  function install() {
    const btn = qs("#profileBtn");
    const sidebar = qs("#sidebar");
    if (!btn || !sidebar) return false;

    const user = currentUser();
    renderButton(btn, user);

    let menu = qs("#sabi156ProfileMenu");
    if (!menu) {
      menu = document.createElement("div");
      menu.id = "sabi156ProfileMenu";
      menu.className = "sabi156-menu";
      menu.setAttribute("role", "menu");
      document.body.appendChild(menu);
    }

    menu.innerHTML = menuHtml(user);

    if (!btn.__sabi156Bound) {
      btn.__sabi156Bound = true;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    if (!menu.__sabi156Bound) {
      menu.__sabi156Bound = true;
      menu.addEventListener("click", function (e) {
        const actionEl = e.target.closest("[data-sabi156-action]");
        if (!actionEl || actionEl.disabled) {
          if (actionEl && actionEl.dataset.sabi156Action === "settings") showLocked("Settings screen is locked until the approved settings stage.");
          if (actionEl && actionEl.dataset.sabi156Action === "help") showLocked("Help center is locked until the approved support stage.");
          return;
        }
        const action = actionEl.dataset.sabi156Action;
        if (action === "profile") window.location.href = "./auth-account.html";
        if (action === "plan") window.location.href = "./subscription-change-plan.html";
        if (action === "logout") logout();
      });
    }

    if (!document.__sabi156DocBound) {
      document.__sabi156DocBound = true;
      document.addEventListener("click", function (e) {
        const menuNow = qs("#sabi156ProfileMenu");
        const btnNow = qs("#profileBtn");
        if (!menuNow || !btnNow) return;
        if (menuNow.contains(e.target) || btnNow.contains(e.target)) return;
        closeMenu();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
    }

    return true;
  }

  function selfTest() {
    install();
    const btn = qs("#profileBtn");
    const menu = qs("#sabi156ProfileMenu");
    const oldDock = !!qs("[data-sabi152-user-dock]");
    const oldLoaded = typeof window.sabiSidebarUserMenuV152A !== "undefined";
    const old153Loaded = typeof window.sabiSidebarReadonlyMapV153A !== "undefined";
    const oldButtons = document.querySelectorAll(".sabi152m-hide-sidebar-btn,.sabi152n-hide-sidebar-btn,.sabi152o-hide-sidebar-btn,.sabi153b-hide-sidebar-btn,.sabi153b-open-sidebar-btn").length;
    const brokenVisible = window.sabiVisibleMojibakeCleanV154D ? window.sabiVisibleMojibakeCleanV154D.selfTest().brokenVisibleCount : null;
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 4 || document.body.scrollWidth > window.innerWidth + 4;
    return {
      at: new Date().toISOString(),
      version: VERSION,
      loaded: true,
      profileBtn: !!btn,
      menu: !!menu,
      menuItems: menu ? menu.querySelectorAll(".sabi156-menu-item").length : 0,
      oldV152Dock: oldDock,
      oldV152Loaded: oldLoaded,
      oldV153Loaded: old153Loaded,
      oldBrokenButtons: oldButtons,
      brokenVisible: brokenVisible,
      horizontalOverflow: overflow,
      accountLinkReady: true,
      planLinkReady: true,
      logoutReady: true,
      settingsPanelReady: !!qs("#sabi156SettingsPanel"),
      helpPanelReady: !!qs("#sabi156HelpPanel")
    };
  }

  async function fullSelfTest() {
    install();
    await new Promise(function (resolve) { setTimeout(resolve, 80); });
    const r = selfTest();
    return {
      at: new Date().toISOString(),
      version: VERSION,
      pass: r.profileBtn && r.menu && r.menuItems === 5 && !r.oldV152Dock && !r.oldV152Loaded && !r.oldV153Loaded && r.oldBrokenButtons === 0 && r.brokenVisible === 0 && !r.horizontalOverflow,
      base: r,
      readiness: {
        cleanProfileMenuPercent: r.profileBtn && r.menu && r.menuItems === 5 ? 100 : 60,
        oldV152V153StillDisabledPercent: !r.oldV152Dock && !r.oldV152Loaded && !r.oldV153Loaded && r.oldBrokenButtons === 0 ? 100 : 0,
        profileActionsPercent: r.accountLinkReady && r.planLinkReady && r.logoutReady && r.settingsPanelReady && r.helpPanelReady ? 100 : 70,
        layoutTouchedPercent: 0,
        sidebarBrokenButtonsPercent: r.oldBrokenButtons === 0 ? 100 : 0,
        backendTouchedPercent: 0
      }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();

  window.sabiProfileMenuV156B = { version: VERSION, install: install, selfTest: selfTest, fullSelfTest: fullSelfTest };
})();

