/* SABI_281Q_FINAL_GEMINI_ORGANISM_BRIDGE_START */
(function () {
  var contract = {
  "module": "sabi-ai-studio",
  "version": "281Q",
  "organismMode": "Sabi AI controls Gemini through same-origin backend proxy",
  "mountPathRecommended": "/sabi-ai-studio/",
  "chatEndpoint": "/api/sabi-ai/studio/gemini/chat",
  "healthEndpoint": "/api/sabi-ai/studio/gemini/health",
  "adminStatusEndpoint": "/api/sabi/admin/studio/gemini/status",
  "safety": {
    "browserGeminiApiKeyAllowed": false,
    "directBrowserGoogleAIAllowed": false,
    "geminiLiveEnabled": false,
    "backendProxyRequired": true,
    "ownerPolicyRequired": true,
    "auditRequired": true
  }
};

  window.SABI_AI_STUDIO_FINAL_GEMINI_ORGANISM = contract;
  window.SABI_AI_STUDIO_GEMINI_BASE = window.location.origin;

  try {
    localStorage.setItem("sabi-ai-studio-runtime-api-base", window.location.origin);
    localStorage.setItem("sabi-ai-studio-working-route", contract.chatEndpoint);
    localStorage.setItem("sabi-ai-studio-gemini-chat-route", contract.chatEndpoint);
    localStorage.setItem("sabi-ai-studio-gemini-health-route", contract.healthEndpoint);
  } catch (_) {}

  window.SABI_AI_STUDIO_BRIDGE = Object.assign({}, window.SABI_AI_STUDIO_BRIDGE || {}, {
    version: contract.version,
    organismMode: contract.organismMode,
    geminiChatRoute: contract.chatEndpoint,
    geminiHealthRoute: contract.healthEndpoint,
    adminStatusRoute: contract.adminStatusEndpoint,
    noBrowserGeminiKey: true,
    backendProxyRequired: true,
    isGeminiLive: function () { return false; }
  });

  if (document && document.documentElement) {
    document.documentElement.setAttribute("data-sabi281q-final-gemini-organism", "ready");
  }

  if (document && document.body) {
    document.body.setAttribute("data-sabi281q-final-gemini-organism", "ready");
    document.body.setAttribute("data-sabi281q-chat-endpoint", contract.chatEndpoint);
  }
})();
/* SABI_281Q_FINAL_GEMINI_ORGANISM_BRIDGE_END */

