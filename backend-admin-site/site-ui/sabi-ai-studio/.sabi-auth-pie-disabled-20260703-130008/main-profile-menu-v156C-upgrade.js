(function () {
  "use strict";
  const VERSION = "v156C-FIX1-profile-settings-help-upgrade";

  function qs(sel, root) { return (root || document).querySelector(sel); }

  function panelHtml(type) {
    if (type === "settings") {
      return "" +
        "<div id=\"sabi156SettingsPanel\" class=\"sabi156-panel\">" +
          "<div class=\"sabi156-panel-title\">Profile settings</div>" +
          "<div class=\"sabi156-panel-row\"><b>Account</b><span>Open full account details from Profile.</span></div>" +
          "<button class=\"sabi156-mini-action\" type=\"button\" data-sabi156-action=\"profile\">Open My Account</button>" +
          "<div class=\"sabi156-panel-row\"><b>Plan</b><span>Change subscription from the approved plan screen.</span></div>" +
          "<button class=\"sabi156-mini-action\" type=\"button\" data-sabi156-action=\"plan\">Open Subscription</button>" +
        "</div>";
    }
    return "" +
      "<div id=\"sabi156HelpPanel\" class=\"sabi156-panel\">" +
        "<div class=\"sabi156-panel-title\">Help</div>" +
        "<div class=\"sabi156-panel-row\"><b>Profile</b><span>Use Profile to view account, change plan, or log out.</span></div>" +
        "<div class=\"sabi156-panel-row\"><b>Support</b><span>Full support tickets remain locked until approved support stage.</span></div>" +
      "</div>";
  }

  function enhanceMenu() {
    const menu = qs("#sabi156ProfileMenu");
    if (!menu) return false;

    const settingsBtn = qs("[data-sabi156-action=\"settings\"]", menu);
    const helpBtn = qs("[data-sabi156-action=\"help\"]", menu);

    if (settingsBtn) {
      settingsBtn.disabled = false;
      settingsBtn.removeAttribute("disabled");
      const badge = settingsBtn.querySelector(".sabi156-badge") || settingsBtn.querySelector("b");
      if (badge) { badge.className = ""; badge.textContent = "⌄"; }
      if (!qs("#sabi156SettingsPanel", menu)) {
        settingsBtn.insertAdjacentHTML("afterend", panelHtml("settings"));
      }
    }

    if (helpBtn) {
      helpBtn.disabled = false;
      helpBtn.removeAttribute("disabled");
      const badge = helpBtn.querySelector(".sabi156-badge") || helpBtn.querySelector("b");
      if (badge) { badge.className = ""; badge.textContent = "⌄"; }
      if (!qs("#sabi156HelpPanel", menu)) {
        helpBtn.insertAdjacentHTML("afterend", panelHtml("help"));
      }
    }

    if (!menu.__sabi156CUpgradeBound) {
      menu.__sabi156CUpgradeBound = true;
      menu.addEventListener("click", function (e) {
        const actionEl = e.target.closest("[data-sabi156-action]");
        if (!actionEl) return;
        const action = actionEl.dataset.sabi156Action;

        if (action === "settings") {
          e.preventDefault();
          e.stopPropagation();
          const panel = qs("#sabi156SettingsPanel");
          const help = qs("#sabi156HelpPanel");
          if (help) help.classList.remove("show");
          if (panel) panel.classList.toggle("show");
          return;
        }

        if (action === "help") {
          e.preventDefault();
          e.stopPropagation();
          const panel = qs("#sabi156HelpPanel");
          const settings = qs("#sabi156SettingsPanel");
          if (settings) settings.classList.remove("show");
          if (panel) panel.classList.toggle("show");
          return;
        }
      }, true);
    }

    return true;
  }

  function install() {
    if (window.sabiProfileMenuV156B && typeof window.sabiProfileMenuV156B.install === "function") {
      window.sabiProfileMenuV156B.install();
    }
    return enhanceMenu();
  }

  function selfTest() {
    install();
    const menu = qs("#sabi156ProfileMenu");
    const settings = qs("#sabi156SettingsPanel");
    const help = qs("#sabi156HelpPanel");
    const settingsDisabled = !!qs("[data-sabi156-action=\"settings\"][disabled]");
    const helpDisabled = !!qs("[data-sabi156-action=\"help\"][disabled]");
    const oldV152Loaded = typeof window.sabiSidebarUserMenuV152A !== "undefined";
    const oldV152Dock = !!qs("[data-sabi152-user-dock]");
    const oldBrokenButtons = document.querySelectorAll(".sabi152m-hide-sidebar-btn,.sabi152n-hide-sidebar-btn,.sabi152o-hide-sidebar-btn,.sabi153b-hide-sidebar-btn,.sabi153b-open-sidebar-btn").length;
    const brokenVisible = window.sabiVisibleMojibakeCleanV154D ? window.sabiVisibleMojibakeCleanV154D.selfTest().brokenVisibleCount : null;
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 4 || document.body.scrollWidth > window.innerWidth + 4;

    return {
      at: new Date().toISOString(),
      version: VERSION,
      loaded: true,
      baseProfileLoaded: typeof window.sabiProfileMenuV156B !== "undefined",
      menu: !!menu,
      settingsPanelReady: !!settings,
      helpPanelReady: !!help,
      settingsDisabled: settingsDisabled,
      helpDisabled: helpDisabled,
      oldV152Loaded: oldV152Loaded,
      oldV152Dock: oldV152Dock,
      oldBrokenButtons: oldBrokenButtons,
      brokenVisible: brokenVisible,
      horizontalOverflow: horizontalOverflow
    };
  }

  async function fullSelfTest() {
    install();
    await new Promise(function (resolve) { setTimeout(resolve, 80); });
    const r = selfTest();
    return {
      at: new Date().toISOString(),
      version: VERSION,
      pass: r.baseProfileLoaded && r.menu && r.settingsPanelReady && r.helpPanelReady && !r.settingsDisabled && !r.helpDisabled && !r.oldV152Loaded && !r.oldV152Dock && r.oldBrokenButtons === 0 && r.brokenVisible === 0 && !r.horizontalOverflow,
      base: r,
      readiness: {
        settingsPanelPercent: r.settingsPanelReady && !r.settingsDisabled ? 100 : 0,
        helpPanelPercent: r.helpPanelReady && !r.helpDisabled ? 100 : 0,
        oldV152StillDisabledPercent: !r.oldV152Loaded && !r.oldV152Dock ? 100 : 0,
        brokenVisiblePercent: r.brokenVisible === 0 ? 100 : 0,
        layoutTouchedPercent: 0,
        backendTouchedPercent: 0
      }
    };
  }

  function boot() {
    install();
    window.setTimeout(install, 120);
    window.setTimeout(install, 450);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.sabiProfileMenuV156C = { version: VERSION, install: install, selfTest: selfTest, fullSelfTest: fullSelfTest };
})();
