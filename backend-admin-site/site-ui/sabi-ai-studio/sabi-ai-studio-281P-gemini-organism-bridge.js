/* SABI_281P_GEMINI_ORGANISM_BRIDGE_START */
(function () {
  var contract = {
  "module": "sabi-ai-studio",
  "version": "281P",
  "organismMode": "Sabi AI controls Gemini through backend proxy",
  "mountPathRecommended": "/sabi-ai-studio/",
  "company": "SABI AI TECHNOLOGIES LIMITED",
  "principle": {
    "publicSite": "entry and trust proof",
    "studio": "user-facing AI workspace and chat",
    "sabiAIControl": "governance, policy, memory, safety, owner rules and audit context",
    "gemini": "LLM provider behind Sabi AI controller",
    "backend": "secure proxy and provider-key holder",
    "admin": "Owner/Admin monitoring, status and provider readiness",
    "mobileSuperApp": "future deep link and QR session entry"
  },
  "chatFlow": [
    "User opens /sabi-ai-studio/",
    "User signs in or enters through Sabi QR",
    "User sends prompt in Sabi AI Studio chat",
    "Studio calls /api/sabi-ai/studio/gemini/chat",
    "Backend verifies session, entitlement, KYC/access flags and Owner rules",
    "Sabi AI control layer prepares safe request and audit envelope",
    "Backend calls Gemini with server-side key only",
    "Gemini response returns through Sabi AI control layer",
    "Admin can read health/status, not private user secrets"
  ],
  "routes": {
    "moduleRoot": "./index.html",
    "authEntry": "./auth-register.html",
    "studioMain": "./studio.html",
    "account": "./auth-account.html",
    "subscription": "./subscription-change-plan.html",
    "chatEndpointPrepared": "/api/sabi-ai/studio/gemini/chat",
    "healthEndpointPrepared": "/api/sabi-ai/studio/gemini/health",
    "sessionEndpointPrepared": "/api/sabi-ai/studio/session/me",
    "adminStatusEndpointPrepared": "/api/sabi/admin/studio/gemini/status"
  },
  "backendGeminiProxyPrepared": {
    "status": "prepared_not_connected",
    "provider": "gemini",
    "apiKeyLocation": "server_env_or_secret_manager_only",
    "browserApiKeyAllowed": false,
    "directBrowserGoogleAIAllowed": false,
    "requestEnvelopeRequired": true,
    "auditRequired": true,
    "ownerPolicyRequired": true,
    "endpoints": {
      "chat": "/api/sabi-ai/studio/gemini/chat",
      "health": "/api/sabi-ai/studio/gemini/health"
    }
  },
  "adminControlPrepared": {
    "futureScreen": "Admin / Sabi AI Studio / Gemini Control",
    "ownerRole": "OWNER_ROOT_ADMIN",
    "allowedNow": [
      "read contract",
      "verify provider lock",
      "verify route health",
      "verify no browser API key",
      "verify Studio package version"
    ],
    "enabledLaterAfterApproval": [
      "Gemini API key status",
      "Gemini health smoke",
      "chat audit report",
      "daily Sabi AI Owner report",
      "risk and violation report"
    ]
  },
  "mobileSuperAppPrepared": {
    "webFallback": "/sabi-ai-studio/",
    "futureDeepLink": "sabi://studio",
    "qrLogin": "existing app users enter through Sabi QR",
    "newUser": "email-code verification"
  },
  "safetyLocks": {
    "emailProviderEnabled": false,
    "googleOAuthLiveEnabled": false,
    "geminiLiveEnabled": false,
    "geminiApiKeyInBrowser": false,
    "paymentProviderEnabled": false,
    "backendMutationEnabled": false,
    "databaseMutationEnabled": false,
    "walletMutationEnabled": false,
    "payoutEnabled": false,
    "googlePasswordCollectionAllowed": false
  }
};

  window.SABI_AI_STUDIO_GEMINI_ORGANISM = contract;
  window.SABI_AI_STUDIO_GEMINI_BASE = window.location.origin;

  try {
    localStorage.setItem("sabi-ai-studio-runtime-api-base", window.location.origin);
    localStorage.setItem("sabi-ai-studio-working-route", contract.routes.chatEndpointPrepared);
    localStorage.setItem("sabi-ai-studio-gemini-chat-route", contract.routes.chatEndpointPrepared);
    localStorage.setItem("sabi-ai-studio-gemini-health-route", contract.routes.healthEndpointPrepared);
    localStorage.setItem("sabi-ai-studio-backend-routes", JSON.stringify([
      contract.routes.chatEndpointPrepared,
      "/api/sabi-ai/studio/chat",
      "/api/sabi-ai/gemini/chat",
      "/api/chat"
    ]));
  } catch (_) {}

  window.SABI_AI_STUDIO_BRIDGE = Object.assign({}, window.SABI_AI_STUDIO_BRIDGE || {}, {
    version: contract.version,
    organismMode: contract.organismMode,
    geminiChatRoute: contract.routes.chatEndpointPrepared,
    geminiHealthRoute: contract.routes.healthEndpointPrepared,
    adminStatusRoute: contract.routes.adminStatusEndpointPrepared,
    locks: contract.safetyLocks,
    isGeminiLive: function () {
      return contract.safetyLocks.geminiLiveEnabled === true;
    },
    isBrowserGeminiKeyAllowed: function () {
      return false;
    }
  });

  if (document && document.documentElement) {
    document.documentElement.setAttribute("data-sabi281p-gemini-organism", "ready");
  }

  if (document && document.body) {
    document.body.setAttribute("data-sabi281p-gemini-organism", "ready");
    document.body.setAttribute("data-sabi281p-gemini-route", contract.routes.chatEndpointPrepared);
  }
})();
/* SABI_281P_GEMINI_ORGANISM_BRIDGE_END */

