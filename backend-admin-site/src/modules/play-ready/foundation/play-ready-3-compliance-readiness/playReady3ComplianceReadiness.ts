export const PLAY_READY_3_VERSION = "PLAY-READY-3" as const;

export const PLAY_READY_3_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-3 controlled privacy, Data Safety, account deletion, permissions, AI reporting, and UGC moderation readiness source-only, use PLAY-READY-2 and PLAY-READY-2A billing/financial feature policy planning to plan Play Console compliance documents and app-side compliance gates for Sabi Wallet, Messenger, Stream, Sabi AI Assistant, NFT/tokenized digital collectibles, and virtual card readiness, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_3_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_4 = "I approve PLAY-READY-4 controlled Play Console document draft and closed testing release checklist source-only, use PLAY-READY-1, PLAY-READY-2, PLAY-READY-2A, and PLAY-READY-3 to draft Privacy Policy sections, Data Safety answer map, account deletion instructions, app access/reviewer notes, financial features declaration notes, UGC/AI reporting reviewer evidence, target SDK/AAB checklist, and closed testing checklist for Sabi Wallet, Messenger, Stream, Sabi AI Assistant, NFT/tokenized digital collectibles, and virtual card readiness, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export const PLAY_READY_3_COMPLIANCE_READINESS_SNAPSHOT = {
  version: PLAY_READY_3_VERSION,
  stage: "controlled_privacy_data_safety_account_deletion_permissions_ai_reporting_ugc_readiness_source_only",
  status: "compliance_readiness_ready_for_play_console_document_draft",
  sourceOnly: true,
  positioning: "Sabi AI-first Global SuperApp with Play-ready privacy, safety, and compliance gates",

  playConsoleRequiredBlocks: [
    "Privacy Policy URL",
    "Data Safety form",
    "Data deletion / account deletion questions",
    "Financial features declaration",
    "AI-generated content reporting evidence",
    "UGC moderation/report/block evidence",
    "Content rating",
    "App access / reviewer instructions",
    "Target SDK / AAB release readiness",
    "Closed testing readiness where required",
  ],

  dataSafetyReadiness: {
    owner: "Sabi compliance and engineering",
    mustMatchActualRuntime: true,
    needsFinalRuntimeAuditBeforeSubmission: true,
    categoriesToReview: [
      "account identifiers",
      "profile data",
      "contact info if collected",
      "messages and chat content",
      "voice/audio if recorded or processed",
      "photos/videos if uploaded or streamed",
      "location if used by QR/Supermarket/geo features",
      "payment and transaction metadata",
      "device identifiers",
      "diagnostics/crash logs",
      "AI prompts and responses",
      "UGC reports and moderation evidence",
    ],
    shareDisclosureRequiredFor: [
      "payment processors/providers",
      "cloud/AI providers",
      "analytics/crash providers if enabled",
      "moderation providers if enabled",
      "legal/compliance processors where required",
    ],
    blockedUntil: [
      "all SDKs and permissions are audited",
      "privacy policy matches actual data practice",
      "provider_not_configured states are disclosed where visible",
      "data retention/deletion rules are documented",
    ],
  },

  privacyPolicyReadiness: {
    requiredSections: [
      "who operates Sabi",
      "what data Sabi collects",
      "why data is used",
      "AI assistant data handling",
      "Messenger data handling",
      "Stream UGC/live data handling",
      "Wallet/Business/Merchant financial metadata handling",
      "NFT/tokenized digital asset disclosure",
      "virtual card provider/issuer disclosure",
      "third-party providers",
      "children/minors policy",
      "data retention",
      "account/data deletion",
      "user rights and contact",
      "security",
      "policy updates",
    ],
    mustBePublicUrlBeforeSubmission: true,
    mustBeConsistentWithDataSafety: true,
    noOverClaimingEncryptionOrDeletion: true,
  },

  accountDeletionReadiness: {
    inAppDeletionPathRequired: true,
    webDeletionRequestUrlRequired: true,
    deletionScopeMustBeClear: true,
    retentionExceptionsMustBeClear: true,
    modulesAffected: [
      "Sabi account",
      "Messenger profile and chats according to retention policy",
      "Stream profile/content according to retention policy",
      "AI assistant logs according to retention policy",
      "Wallet/financial records where legal retention applies",
      "Business/Merchant records where legal retention applies",
      "NFT/tokenized entitlement records where legal retention/provider rules apply",
      "virtual card records where issuer/legal retention applies",
    ],
    blockedUntil: [
      "deletion UX is reviewed",
      "web deletion URL exists",
      "support/contact process exists",
      "legal retention exceptions are documented",
    ],
  },

  permissionReadiness: {
    permissionsToAudit: [
      "camera",
      "microphone",
      "photos/media",
      "notifications",
      "contacts if used",
      "location if used",
      "nearby devices/bluetooth if used",
      "phone/call related permissions if used",
      "biometric if used",
    ],
    rules: [
      "ask only when needed",
      "explain why permission is needed",
      "provide safe fallback if denied",
      "do not request unused sensitive permissions",
      "remove debug/test permission copy before Play submission",
    ],
  },

  aiReportingReadiness: {
    requiredInAppAction: "report_or_flag_ai_response",
    appliesTo: [
      "Sabi AI Assistant",
      "AI translation",
      "AI moderation suggestions",
      "AI-generated collectible text/media if enabled later",
      "AI business assistant outputs",
    ],
    requiredReportReasons: [
      "offensive",
      "unsafe",
      "incorrect",
      "privacy concern",
      "financial/payment concern",
      "other",
    ],
    mustNotDo: [
      "fake AI response if provider is unavailable",
      "hide provider_not_configured",
      "claim Sabi AI is always correct",
      "allow AI to perform payment/money/card actions without explicit provider/compliance gates",
    ],
  },

  ugcModerationReadiness: {
    appliesTo: [
      "Stream live",
      "Stream shorts/videos",
      "comments",
      "profiles",
      "creator content",
      "Messenger public/group surfaces if exposed",
      "NFT/display collectibles if user-generated",
    ],
    requiredActions: [
      "report content",
      "report user",
      "block user",
      "hide/remove abusive content after review",
      "moderation queue",
      "abuse/profanity handling",
      "18+ gate where needed",
      "appeal/review flow where needed",
    ],
    mustNotDo: [
      "promote harmful UGC",
      "allow no-report live/stream content",
      "allow no-block user interactions on UGC surfaces",
      "show live provider as ready if provider is not configured",
    ],
  },

  financialFeatureComplianceReadiness: {
    coveredFromPlayReady2And2A: [
      "Google Play Billing for digital goods",
      "Wallet/Airwallex for real-world payments only",
      "Tokenized Digital Assets declaration",
      "Virtual card through Airwallex or licensed issuer only",
      "Google Pay tokenization only through issuer/TSP approval",
    ],
    requiredDisclosures: [
      "Financial features declaration",
      "Tokenized Digital Asset product details if sold/enabled",
      "provider_not_configured for card/NFT/payment providers",
      "no investment/earning promise",
      "no NFT gambling/staking/chance-based unknown value",
      "no raw PAN/CVV storage by Sabi",
    ],
  },

  appSideComplianceGatesPlan: {
    requiredBeforeProduction: [
      "privacy_policy_link_gate",
      "data_safety_answer_map_review_gate",
      "account_deletion_in_app_gate",
      "account_deletion_web_url_gate",
      "permission_rationale_gate",
      "ai_report_response_gate",
      "ugc_report_content_gate",
      "ugc_report_user_gate",
      "ugc_block_user_gate",
      "financial_features_declaration_gate",
      "billing_vs_wallet_separation_gate",
      "provider_not_configured_gate",
      "target_sdk_aab_gate",
    ],
    allGatesSourceOnlyNow: true,
    implementationDoneNow: false,
  },

  hardBlocks: {
    noFakeProviderSuccess: true,
    noFakeMoneyMovement: true,
    noFakeAiAnswerWhenProviderUnavailable: true,
    noWalletBypassForDigitalGoods: true,
    noNftGamblingOrStaking: true,
    noFakeCardIssuing: true,
    noRawPanCvvStorage: true,
    noRuntimeDbWriteNow: true,
    noProviderCallsNow: true,
    noSourceTargetWritesNow: true,
  },

  nextStage: "PLAY-READY-4",
  requiredExactApprovalTextForPlayReady4: PLAY_READY_3_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_4,

  safety: {
    sourceTargetWriteByPlayReady3: false,
    backendRestartByPlayReady3: false,
    runtimeDbWriteByPlayReady3: false,
    providerCallByPlayReady3: false,
    walletMutationByPlayReady3: false,
    paymentAuthorizationByPlayReady3: false,
    moneyMovementByPlayReady3: false,
    fakeSuccessByPlayReady3: false,
  },
} as const;

export function getPlayReady3ComplianceReadinessSnapshot() {
  return PLAY_READY_3_COMPLIANCE_READINESS_SNAPSHOT;
}

export function getPlayReady3ComplianceReadiness() {
  const s = getPlayReady3ComplianceReadinessSnapshot();

  const dataSafetyReady =
    s.dataSafetyReadiness.mustMatchActualRuntime === true &&
    s.dataSafetyReadiness.needsFinalRuntimeAuditBeforeSubmission === true &&
    s.dataSafetyReadiness.categoriesToReview.length >= 10 &&
    s.dataSafetyReadiness.shareDisclosureRequiredFor.length >= 4;

  const privacyReady =
    s.privacyPolicyReadiness.requiredSections.length >= 12 &&
    s.privacyPolicyReadiness.mustBePublicUrlBeforeSubmission === true &&
    s.privacyPolicyReadiness.mustBeConsistentWithDataSafety === true &&
    s.privacyPolicyReadiness.noOverClaimingEncryptionOrDeletion === true;

  const deletionReady =
    s.accountDeletionReadiness.inAppDeletionPathRequired === true &&
    s.accountDeletionReadiness.webDeletionRequestUrlRequired === true &&
    s.accountDeletionReadiness.modulesAffected.length >= 7;

  const permissionReady =
    s.permissionReadiness.permissionsToAudit.length >= 7 &&
    s.permissionReadiness.rules.includes("ask only when needed") &&
    s.permissionReadiness.rules.includes("remove debug/test permission copy before Play submission");

  const aiReady =
    s.aiReportingReadiness.requiredInAppAction === "report_or_flag_ai_response" &&
    s.aiReportingReadiness.requiredReportReasons.length >= 5 &&
    s.aiReportingReadiness.mustNotDo.includes("fake AI response if provider is unavailable");

  const ugcReady =
    s.ugcModerationReadiness.requiredActions.includes("report content") &&
    s.ugcModerationReadiness.requiredActions.includes("report user") &&
    s.ugcModerationReadiness.requiredActions.includes("block user") &&
    s.ugcModerationReadiness.requiredActions.includes("moderation queue");

  const financialReady =
    s.financialFeatureComplianceReadiness.coveredFromPlayReady2And2A.length >= 5 &&
    s.financialFeatureComplianceReadiness.requiredDisclosures.length >= 5;

  const gatesReady =
    s.appSideComplianceGatesPlan.requiredBeforeProduction.length >= 12 &&
    s.appSideComplianceGatesPlan.allGatesSourceOnlyNow === true &&
    s.appSideComplianceGatesPlan.implementationDoneNow === false;

  const safetyReady =
    s.safety.sourceTargetWriteByPlayReady3 === false &&
    s.safety.backendRestartByPlayReady3 === false &&
    s.safety.runtimeDbWriteByPlayReady3 === false &&
    s.safety.providerCallByPlayReady3 === false &&
    s.safety.walletMutationByPlayReady3 === false &&
    s.safety.paymentAuthorizationByPlayReady3 === false &&
    s.safety.moneyMovementByPlayReady3 === false &&
    s.safety.fakeSuccessByPlayReady3 === false;

  const ready =
    dataSafetyReady &&
    privacyReady &&
    deletionReady &&
    permissionReady &&
    aiReady &&
    ugcReady &&
    financialReady &&
    gatesReady &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady4.includes("PLAY-READY-4");

  return {
    version: s.version,
    ready,
    status: ready
      ? "compliance_readiness_ready_for_play_console_document_draft"
      : "compliance_readiness_blocked",
    playConsoleRequiredBlocks: s.playConsoleRequiredBlocks.length,
    appSideGatesBeforeProduction: s.appSideComplianceGatesPlan.requiredBeforeProduction.length,
    nextRecommendedStage: "PLAY-READY-4 controlled Play Console document draft and closed testing release checklist source-only after exact approval",
  } as const;
}

export function runPlayReady3ComplianceReadinessSmoke() {
  const snapshot = getPlayReady3ComplianceReadinessSnapshot();
  const readiness = getPlayReady3ComplianceReadiness();

  const assertions = [
    {
      id: "play_console_blocks_present",
      passed: snapshot.playConsoleRequiredBlocks.length >= 10,
      evidence: JSON.stringify(snapshot.playConsoleRequiredBlocks),
    },
    {
      id: "privacy_data_safety_deletion_present",
      passed:
        snapshot.dataSafetyReadiness.mustMatchActualRuntime === true &&
        snapshot.privacyPolicyReadiness.mustBeConsistentWithDataSafety === true &&
        snapshot.accountDeletionReadiness.inAppDeletionPathRequired === true &&
        snapshot.accountDeletionReadiness.webDeletionRequestUrlRequired === true,
      evidence: JSON.stringify({
        dataSafety: snapshot.dataSafetyReadiness.categoriesToReview.length,
        privacy: snapshot.privacyPolicyReadiness.requiredSections.length,
        deletion: snapshot.accountDeletionReadiness.modulesAffected.length,
      }),
    },
    {
      id: "ai_and_ugc_reporting_present",
      passed:
        snapshot.aiReportingReadiness.requiredInAppAction === "report_or_flag_ai_response" &&
        snapshot.ugcModerationReadiness.requiredActions.includes("report content") &&
        snapshot.ugcModerationReadiness.requiredActions.includes("block user"),
      evidence: JSON.stringify({
        ai: snapshot.aiReportingReadiness,
        ugc: snapshot.ugcModerationReadiness.requiredActions,
      }),
    },
    {
      id: "financial_features_from_previous_stages_included",
      passed:
        snapshot.financialFeatureComplianceReadiness.coveredFromPlayReady2And2A.includes("Tokenized Digital Assets declaration") &&
        snapshot.financialFeatureComplianceReadiness.coveredFromPlayReady2And2A.includes("Virtual card through Airwallex or licensed issuer only"),
      evidence: JSON.stringify(snapshot.financialFeatureComplianceReadiness),
    },
    {
      id: "hard_blocks_and_safety_no_runtime",
      passed:
        snapshot.hardBlocks.noFakeProviderSuccess === true &&
        snapshot.hardBlocks.noFakeMoneyMovement === true &&
        snapshot.hardBlocks.noWalletBypassForDigitalGoods === true &&
        snapshot.safety.sourceTargetWriteByPlayReady3 === false &&
        snapshot.safety.backendRestartByPlayReady3 === false &&
        snapshot.safety.runtimeDbWriteByPlayReady3 === false &&
        snapshot.safety.providerCallByPlayReady3 === false &&
        snapshot.safety.moneyMovementByPlayReady3 === false &&
        snapshot.safety.fakeSuccessByPlayReady3 === false,
      evidence: JSON.stringify({ hardBlocks: snapshot.hardBlocks, safety: snapshot.safety }),
    },
    {
      id: "readiness_true",
      passed: readiness.ready,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((item) => !item.passed);

  return {
    version: snapshot.version,
    stage: "compliance_readiness_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "compliance_readiness_smoke_passed"
      : "compliance_readiness_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
