/* SABI_281O_SUPERAPP_ADMIN_BRIDGE_START */
(function () {
  var fallback = {
  "module": "sabi-ai-studio",
  "version": "281O",
  "packageType": "public-site-studio-replacement",
  "mountPathRecommended": "/sabi-ai-studio/",
  "company": "SABI AI TECHNOLOGIES LIMITED",
  "publicSite": {
    "alreadyLaunchedSeparately": true,
    "replaceOnlyStudioModule": true,
    "doNotOverwritePublicRoot": true,
    "publicEntryButtonTarget": "/sabi-ai-studio/"
  },
  "routes": {
    "moduleRoot": "./index.html",
    "authEntry": "./auth-register.html",
    "studioMain": "./studio.html",
    "account": "./auth-account.html",
    "subscription": "./subscription-change-plan.html"
  },
  "superAppMobile": {
    "webPath": "/sabi-ai-studio/",
    "futureDeepLink": "sabi://studio",
    "qrLoginMode": "existing-app-users-login-through-sabi-qr",
    "newAccountMode": "email-code-verification"
  },
  "backendContractPrepared": {
    "status": "prepared_not_connected",
    "authEmailStart": "/api/sabi/studio/auth/email/start",
    "authEmailVerify": "/api/sabi/studio/auth/email/verify",
    "googleStart": "/api/sabi/studio/auth/google/start",
    "googleCallback": "/api/sabi/studio/auth/google/callback",
    "sessionMe": "/api/sabi/studio/session/me",
    "adminStatus": "/api/sabi/admin/studio/status",
    "note": "No live backend/provider/DB mutation is enabled in this static package."
  },
  "adminContractPrepared": {
    "futureScreen": "Admin / Sabi AI Studio Control",
    "ownerRole": "OWNER_ROOT_ADMIN",
    "allowedAdminActionsNow": [
      "read integration contract",
      "open public Studio module",
      "check locked provider state",
      "check mobile route health"
    ],
    "lockedUntilApprovedBackendStage": [
      "real email-code sending",
      "Google OAuth live credentials",
      "subscription payment activation",
      "database session mutation",
      "wallet/payment/payout actions"
    ]
  },
  "safetyLocks": {
    "paymentProviderEnabled": false,
    "emailProviderEnabled": false,
    "googleOAuthLiveEnabled": false,
    "backendMutationEnabled": false,
    "databaseMutationEnabled": false,
    "walletMutationEnabled": false,
    "payoutEnabled": false,
    "googlePasswordCollectionAllowed": false
  },
  "bankGoogleProof": {
    "positioning": "real product module connected to an existing public site, with safe locked gates and clear future provider contract",
    "publicCryptoWordingAllowed": false,
    "publicTelegramWordingAllowed": false,
    "donationOrInvestmentWordingAllowed": false
  }
};

  function expose(contract) {
    window.SABI_AI_STUDIO_INTEGRATION = contract;
    window.SABI_AI_STUDIO_BRIDGE = {
      version: contract.version,
      module: contract.module,
      mountPath: contract.mountPathRecommended,
      routes: contract.routes,
      locks: contract.safetyLocks,
      adminContract: contract.adminContractPrepared,
      backendContract: contract.backendContractPrepared,
      getRoute: function (name) {
        return contract.routes && contract.routes[name] ? contract.routes[name] : "./index.html";
      },
      isProviderLocked: function () {
        return !contract.safetyLocks.emailProviderEnabled ||
          !contract.safetyLocks.googleOAuthLiveEnabled ||
          !contract.safetyLocks.paymentProviderEnabled;
      }
    };

    if (document && document.body) {
      document.body.setAttribute("data-sabi281o-integration-ready", "true");
      document.body.setAttribute("data-sabi281o-module", contract.module);
      document.body.setAttribute("data-sabi281o-version", contract.version);
    }
  }

  function load() {
    if (!window.fetch) {
      expose(fallback);
      return;
    }

    fetch("./sabi-ai-studio-281O-superapp-admin-contract.json", { cache: "no-store" })
      .then(function (res) { return res.ok ? res.json() : fallback; })
      .then(expose)
      .catch(function () { expose(fallback); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
/* SABI_281O_SUPERAPP_ADMIN_BRIDGE_END */

