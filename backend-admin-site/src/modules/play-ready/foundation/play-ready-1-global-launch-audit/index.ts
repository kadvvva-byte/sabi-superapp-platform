export const PLAY_READY_1_VERSION = "PLAY-READY-1" as const;

export const PLAY_READY_1_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-1 controlled Google Play and Global Launch readiness audit source-only, audit Sabi Wallet, Messenger, Stream, Sabi AI Assistant, billing separation, Google Play Billing requirements, Data Safety, privacy policy, account deletion, permissions, UGC moderation, AI reporting, provider_not_configured states, no fake money movement, no fake provider success, Google Cloud AI startup readiness, Airwallex/Hong Kong company readiness, no source target writes, no backend restart, no runtime DB write, no provider calls, no Wallet mutation, no payment authorization, no money movement, and no fake success.";

export const PLAY_READY_1_REQUIRED_EXACT_APPROVAL_TEXT_FOR_PLAY_READY_2 = "I approve PLAY-READY-2 controlled billing separation and entitlement architecture source-only, use PLAY-READY-1 audit to plan Google Play Billing for digital goods and Sabi Wallet/Airwallex for real-world payments, including AI Premium, Stream Premium, gifts, Messenger paid translation, game digital goods, purchase token verification, entitlement ledger, provider_not_configured states, no Wallet bypass for digital goods, no source target writes, no backend restart, no runtime DB write, no provider calls, no Wallet mutation, no payment authorization, no money movement, and no fake success.";

export const PLAY_READY_1_GLOBAL_LAUNCH_AUDIT = {
  version: PLAY_READY_1_VERSION,
  stage: "controlled_google_play_and_global_launch_readiness_audit_source_only",
  status: "global_launch_readiness_audit_ready_for_billing_architecture",
  ownerApprovalAccepted: true,
  positioning: "Sabi AI-first Global SuperApp",
  sourceOnly: true,
  modules: [
    { module: "Wallet", focus: ["Wallet vs Google Play Billing separation", "provider_not_configured gates", "no fake money movement", "KYC/KYB/AML readiness"] },
    { module: "Messenger", focus: ["permissions", "privacy", "report/block", "paid translation billing", "provider_not_configured"] },
    { module: "Stream", focus: ["UGC report/block", "live moderation", "18+ gates", "gifts through Google Play Billing", "no Wallet bypass"] },
    { module: "Sabi AI Assistant", focus: ["AI consent", "AI report/flag", "privacy/data safety", "provider_not_configured", "AI Premium billing"] },
  ],
  billingSeparation: {
    digitalGoodsMustUsePlayBillingInPlayBuild: [
      "AI Premium",
      "Stream Premium",
      "Stream gifts/badges/effects",
      "Messenger paid translation",
      "Premium stickers",
      "Game digital goods",
      "Sold virtual currency used for digital goods",
    ],
    realWorldPaymentsMustStayInWalletProviderLayer: [
      "QR Pay",
      "Merchant payments",
      "Business Account",
      "Supermarket and delivery",
      "Hotel and real-world bookings",
      "Airwallex/Alipay/bank-provider payments",
    ],
    walletBypassForDigitalGoodsAllowed: false,
    googlePlayBillingImplementationDoneNow: false,
    entitlementLedgerImplementationDoneNow: false,
  },
  auditItems: [
    { area: "google_play_billing", impact: "critical", action: "Create billing product matrix and purchase-token verification plan." },
    { area: "wallet_real_world_payments", impact: "critical", action: "Keep Wallet separate from digital goods and block fake money movement." },
    { area: "messenger", impact: "high", action: "Audit permissions, privacy, report/block, paid translation billing." },
    { area: "stream_ugc_live", impact: "critical", action: "Plan UGC moderation/report/block and Play Billing for gifts/premium." },
    { area: "sabi_ai_assistant", impact: "critical", action: "Plan AI consent, report/flag, privacy, provider_not_configured, premium billing." },
    { area: "data_safety_privacy", impact: "critical", action: "Prepare Data Safety answers and privacy policy." },
    { area: "account_deletion", impact: "high", action: "Plan in-app deletion, web URL, retention and deletion policy." },
    { area: "permissions", impact: "high", action: "Audit camera/mic/contacts/notifications and permission rationale." },
    { area: "provider_gates", impact: "critical", action: "Keep provider_not_configured and no fake provider success." },
    { area: "google_cloud_ai_startup", impact: "high", action: "Prepare AI-first grant story, GCP architecture, budget, IAM and Secret Manager." },
    { area: "airwallex_hong_kong", impact: "high", action: "Prepare HK/Airwallex KYB and payment-flow docs." },
    { area: "play_console_release", impact: "critical", action: "Prepare AAB/API target/store listing/app access/closed testing readiness." },
  ],
  officialRequirementSources: [
    "Google Play Payments policy",
    "Google Play Billing system docs",
    "Google Play Data Safety form",
    "Google Play Account Deletion requirements",
    "Google Play UGC policy",
    "Google Play AI-generated content policy",
    "Google Play Target API level requirements",
    "Google for Startups Cloud AI program",
  ],
  requiredExactApprovalTextForPlayReady2: PLAY_READY_1_REQUIRED_EXACT_APPROVAL_TEXT_FOR_PLAY_READY_2,
  safety: {
    sourceTargetWriteByPlayReady1: false,
    backendRestartByPlayReady1: false,
    runtimeDbWriteByPlayReady1: false,
    providerCallByPlayReady1: false,
    walletMutationByPlayReady1: false,
    paymentAuthorizationByPlayReady1: false,
    moneyMovementByPlayReady1: false,
    fakeProviderSuccessByPlayReady1: false,
    fakeMoneyMovementByPlayReady1: false,
    fakeSuccessByPlayReady1: false,
  },
} as const;

export function getPlayReady1GlobalLaunchAuditSnapshot() {
  return PLAY_READY_1_GLOBAL_LAUNCH_AUDIT;
}

export function getPlayReady1GlobalLaunchAuditReadiness() {
  const snapshot = getPlayReady1GlobalLaunchAuditSnapshot();
  const ready =
    snapshot.modules.length === 4 &&
    snapshot.auditItems.length === 12 &&
    snapshot.billingSeparation.walletBypassForDigitalGoodsAllowed === false &&
    snapshot.billingSeparation.digitalGoodsMustUsePlayBillingInPlayBuild.length >= 6 &&
    snapshot.billingSeparation.realWorldPaymentsMustStayInWalletProviderLayer.length >= 5 &&
    snapshot.safety.sourceTargetWriteByPlayReady1 === false &&
    snapshot.safety.backendRestartByPlayReady1 === false &&
    snapshot.safety.runtimeDbWriteByPlayReady1 === false &&
    snapshot.safety.providerCallByPlayReady1 === false &&
    snapshot.safety.walletMutationByPlayReady1 === false &&
    snapshot.safety.moneyMovementByPlayReady1 === false &&
    snapshot.safety.fakeSuccessByPlayReady1 === false &&
    snapshot.requiredExactApprovalTextForPlayReady2.includes("PLAY-READY-2") &&
    snapshot.requiredExactApprovalTextForPlayReady2.includes("no Wallet bypass for digital goods") &&
    snapshot.requiredExactApprovalTextForPlayReady2.includes("no fake success");

  return {
    version: snapshot.version,
    ready,
    status: ready ? "global_launch_readiness_audit_ready_for_billing_architecture" : "global_launch_readiness_audit_blocked",
    nextRecommendedStage: "PLAY-READY-2 controlled billing separation and entitlement architecture source-only after exact approval",
  } as const;
}

export function runPlayReady1GlobalLaunchAuditSmoke() {
  const snapshot = getPlayReady1GlobalLaunchAuditSnapshot();
  const readiness = getPlayReady1GlobalLaunchAuditReadiness();
  const assertions = [
    { id: "core_modules_covered", passed: snapshot.modules.length === 4, evidence: JSON.stringify(snapshot.modules.map((item) => item.module)) },
    { id: "billing_separation_present", passed: snapshot.billingSeparation.walletBypassForDigitalGoodsAllowed === false, evidence: JSON.stringify(snapshot.billingSeparation) },
    { id: "audit_items_present", passed: snapshot.auditItems.length === 12, evidence: JSON.stringify(snapshot.auditItems.map((item) => item.area)) },
    { id: "safety_all_blocked", passed: snapshot.safety.sourceTargetWriteByPlayReady1 === false && snapshot.safety.fakeSuccessByPlayReady1 === false, evidence: JSON.stringify(snapshot.safety) },
    { id: "readiness_true", passed: readiness.ready, evidence: readiness.status },
  ];
  const failedAssertions = assertions.filter((item) => !item.passed);
  return {
    version: snapshot.version,
    stage: "global_launch_readiness_audit_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "global_launch_readiness_audit_smoke_passed" : "global_launch_readiness_audit_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
