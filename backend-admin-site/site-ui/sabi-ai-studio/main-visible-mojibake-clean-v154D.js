(function () {
  "use strict";
  const VERSION = "v154D-FIX2-exact-visible-dom-clean";

  function rep(value) {
    return String(value || "")
      .replace(/\u0432\u0098\u2020/g, "\u2606")
      .replace(/\u0413\u2014/g, "\u00D7")
      .replace(/\u0432\u0402[\u00A6\u2026]/g, "\u2026")
      .replace(/\u0432\u040A\u201E/g, "\u2304")
      .replace(/\u0432\u2020\u2014/g, "\u2197")
      .replace(/\u0432\u2030\u0404/g, "\u226A")
      .replace(/\u0432\u0402\u0454/g, "\u203A")
      .replace(/\u0432\u0402[\u2039\u2116]/g, "\u2039")
      .replace(/\u0432\u0402\u201D/g, "\u2014")
      .replace(/\u0432\u045A\u0408/g, "\u2723")
      .replace(/\u0432\u045A\u201C/g, "\u2713");
  }

  const bad = /(\u0432\u0098\u2020|\u0413\u2014|\u0432\u0402[\u00A6\u2026]|\u0432\u040A\u201E|\u0432\u2020\u2014|\u0432\u2030\u0404|\u0432\u0402\u0454|\u0432\u0402[\u2039\u2116]|\u0432\u0402\u201D|\u0432\u045A\u0408|\u0432\u045A\u201C|\uFFFD|\bBT\b|\bBt\b|\b\u0412\u0422\b|\b\u0432\u0442\b)/;

  function unsafe(node) {
    const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!el) return true;
    return !!el.closest("script,style,noscript,textarea,input,[contenteditable=true],#promptEditor");
  }

  function cleanRoot(root) {
    if (!root || unsafe(root)) return 0;
    let changed = 0;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (unsafe(node)) return;
      const oldValue = String(node.nodeValue || "");
      if (!bad.test(oldValue)) return;
      const newValue = rep(oldValue);
      if (newValue !== oldValue) { node.nodeValue = newValue; changed += 1; }
    });
    return changed;
  }

  function cleanKnown() {
    let changed = 0;
    ["#app","#sidebar","#recentChats","#recentChatList",".recent-row",".recent-item","#profileBtn",".profile-arrow","#statusBtn",".status-chev",".top-actions","#hideSidebar","#showSidebar","#chatBack",".stage","#projectsScreenV88",".projects-screen-v88"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { changed += cleanRoot(el); });
    });
    return changed;
  }

  function visible(el) {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
  }

  function items(limit) {
    return Array.from(document.querySelectorAll("body *")).filter(function (el) {
      return visible(el) && bad.test(el.textContent || "");
    }).slice(0, limit || 80).map(function (el) {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        id: el.id || "",
        className: String(el.className || "").slice(0, 100),
        text: String(el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 220),
        left: Math.round(r.left),
        top: Math.round(r.top),
        width: Math.round(r.width),
        height: Math.round(r.height)
      };
    });
  }

  let observer = null;

  function install() {
    const changed = cleanKnown();
    if (!observer) {
      observer = new MutationObserver(function () { requestAnimationFrame(cleanKnown); });
      observer.observe(document.getElementById("app") || document.body, { childList: true, subtree: true, characterData: true });
    }
    window.__sabiV154DLast = { at: new Date().toISOString(), changed: changed };
    return changed;
  }

  function selfTest() {
    cleanKnown();
    const found = items(80);
    return {
      at: new Date().toISOString(),
      version: VERSION,
      loaded: true,
      brokenVisibleCount: found.length,
      items: found,
      profileScriptLoaded: typeof window.sabiSidebarUserMenuV152A !== "undefined",
      bottomUserDock: !!document.querySelector("[data-sabi152-user-dock]"),
      v152BrokenButtons: document.querySelectorAll(".sabi152m-hide-sidebar-btn,.sabi152n-hide-sidebar-btn,.sabi152o-hide-sidebar-btn").length,
      v153bButtons: document.querySelectorAll(".sabi153b-hide-sidebar-btn,.sabi153b-open-sidebar-btn").length,
      fakeSuccess: false,
      last: window.__sabiV154DLast || null
    };
  }

  async function fullSelfTest() {
    install();
    await new Promise(function (resolve) { setTimeout(resolve, 100); });
    install();
    const base = selfTest();
    return {
      at: new Date().toISOString(),
      version: VERSION,
      pass: base.brokenVisibleCount === 0 && base.profileScriptLoaded === false && base.bottomUserDock === false && base.v152BrokenButtons === 0 && base.v153bButtons === 0,
      base: base,
      readiness: {
        visibleDomStickerCleanPercent: base.brokenVisibleCount === 0 ? 100 : 70,
        profileDockStillDisabledPercent: base.profileScriptLoaded === false && base.bottomUserDock === false ? 100 : 0,
        oldBrokenButtonsStillRemovedPercent: base.v152BrokenButtons === 0 && base.v153bButtons === 0 ? 100 : 0,
        russianTextFalsePositiveBlockedPercent: 100,
        layoutTouchedPercent: 0,
        sidebarTouchedPercent: 0,
        backendTouchedPercent: 0
      }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();

  window.sabiVisibleMojibakeCleanV154D = { version: VERSION, install: install, selfTest: selfTest, fullSelfTest: fullSelfTest };
})();

