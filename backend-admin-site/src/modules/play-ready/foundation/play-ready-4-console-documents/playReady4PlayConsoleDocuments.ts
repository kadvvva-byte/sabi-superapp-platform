export const PLAY_READY_4_VERSION = "PLAY-READY-4" as const;

export const PLAY_READY_4_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-4 controlled Play Console document draft and closed testing release checklist source-only, use PLAY-READY-1, PLAY-READY-2, PLAY-READY-2A, and PLAY-READY-3 to draft Privacy Policy sections, Data Safety answer map, account deletion instructions, app access/reviewer notes, financial features declaration notes, UGC/AI reporting reviewer evidence, target SDK/AAB checklist, and closed testing checklist for Sabi Wallet, Messenger, Stream, Sabi AI Assistant, NFT/tokenized digital collectibles, and virtual card readiness, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_4_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_5 = "I approve PLAY-READY-5 controlled app-side compliance gate implementation planning source-only, use PLAY-READY-4 Play Console document draft and closed testing checklist to plan exact future app/backend gate implementation for privacy links, account deletion, AI report/flag, UGC report/block, permission rationales, provider_not_configured, billing-vs-wallet separation, financial features, target SDK/AAB checks, and reviewer evidence, without source target writes, without backend restart, without runtime DB write, without provider calls, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export const PLAY_READY_4_PLAY_CONSOLE_DOCUMENT_DRAFT = {
  version: PLAY_READY_4_VERSION,
  stage: "controlled_play_console_document_draft_and_closed_testing_release_checklist_source_only",
  status: "play_console_document_draft_ready_for_app_side_gate_planning",
  sourceOnly: true,
  positioning: "Sabi AI-first Global SuperApp prepared for Google Play review without fake provider or money movement",

  privacyPolicyDraftSections: [
    {
      id: "operator_and_scope",
      title: "Who operates Sabi and what this policy covers",
      draft: "Sabi explains that it operates an AI-first global SuperApp including Sabi AI Assistant, Messenger, Stream, Wallet, Business/Merchant, digital collectibles readiness, and virtual card readiness. The final legal entity details must be completed after company incorporation/provider onboarding.",
      finalizationRequired: true,
    },
    {
      id: "data_collected",
      title: "Data Sabi may collect",
      draft: "Account identifiers, profile data, messages/content metadata, user-generated content, AI prompts/responses, media uploads, device diagnostics, permissions-based data, payment/transaction metadata, compliance records, support requests, and moderation reports may be processed depending on enabled features.",
      finalizationRequired: true,
    },
    {
      id: "ai_assistant",
      title: "Sabi AI Assistant data handling",
      draft: "Sabi AI may process prompts, responses, language, voice/audio where enabled, feedback/reporting signals, and approved context to provide assistant, translation, moderation, and business automation features. Sabi must disclose provider_not_configured states and not claim AI is always correct.",
      finalizationRequired: true,
    },
    {
      id: "messenger_stream_ugc",
      title: "Messenger, Stream, and UGC",
      draft: "Sabi may process messages, calls metadata, uploaded media, live/short content, comments, reports, blocks, and moderation evidence. Users must be able to report/block objectionable UGC and users where UGC surfaces exist.",
      finalizationRequired: true,
    },
    {
      id: "wallet_financial_features",
      title: "Wallet, financial metadata, digital collectibles, and virtual cards",
      draft: "Sabi Wallet is separated from Google Play Billing. Google Play Billing is planned for digital goods in the Play build; Sabi Wallet/Airwallex/Alipay/provider rails are for real-world payments after provider approval. Tokenized Digital Assets and virtual card features must remain provider_not_configured until policy/provider/KYB/KYC/AML readiness.",
      finalizationRequired: true,
    },
    {
      id: "data_deletion_and_retention",
      title: "Account deletion, data deletion, and retention",
      draft: "Users must have in-app account deletion and a public web deletion request link. Some records may be retained where required for security, fraud prevention, financial compliance, legal obligations, chargebacks, tax, audit, or provider/issuer obligations.",
      finalizationRequired: true,
    },
    {
      id: "third_parties_security_contact",
      title: "Third parties, security, and contact",
      draft: "Sabi may use cloud, AI, analytics/crash, payment, issuer, moderation, support, and compliance processors where configured. Secrets must stay server-side. Contact and policy update details must be public before Play submission.",
      finalizationRequired: true,
    },
  ],

  dataSafetyAnswerMap: {
    mustBeFinalRuntimeTruth: true,
    collectDataLikelyYesForLaunch: true,
    shareDataLikelyYesIfProvidersConfigured: true,
    deletionAvailableMustBeYesWhenAccountCreationEnabled: true,
    dataTypesToMap: [
      "Name/profile/account identifiers",
      "Email/phone if collected",
      "Messages and chat metadata",
      "Photos/videos/audio uploaded or streamed",
      "Location if enabled for commerce/nearby features",
      "Contacts if contact sync/invite is enabled",
      "Payment and transaction metadata",
      "Financial/compliance/KYC/KYB metadata where enabled",
      "AI prompts/responses/reporting feedback",
      "App activity and diagnostics",
      "Device identifiers and crash logs",
      "User-generated content reports and moderation records",
    ],
    purposesToMap: [
      "App functionality",
      "Account management",
      "Communication",
      "AI assistance and translation",
      "Safety, moderation, and abuse prevention",
      "Payments and compliance where enabled",
      "Analytics and diagnostics",
      "Fraud prevention and security",
      "Legal compliance",
    ],
    blockedUntil: [
      "final SDK list audited",
      "permissions audited",
      "provider list finalized",
      "privacy policy public URL exists",
      "account deletion URL exists",
      "runtime data collection matches form answers",
    ],
  },

  accountDeletionInstructionsDraft: {
    inAppPathDraft: "Profile > Settings > Account > Delete account",
    webUrlPlaceholder: "https://sabi.example.com/account-deletion",
    userMustBeAbleToRequestAccountAndAssociatedDataDeletion: true,
    explainRetentionExceptions: true,
    reviewerEvidenceRequired: [
      "screenshot or path showing in-app deletion",
      "working public web deletion request link",
      "support/contact route",
      "retention exception text for financial/compliance/provider records",
    ],
    providerDependentRecords: [
      "Wallet financial audit records",
      "Business/Merchant/KYB records",
      "Airwallex/issuer virtual card records",
      "Tokenized digital asset entitlement/provider records",
      "chargeback/refund/security records",
    ],
  },

  appAccessReviewerNotesDraft: {
    includeDemoCredentialsIfLoginRequired: true,
    explainProviderNotConfiguredStates: true,
    explainGooglePlayBillingForDigitalGoods: true,
    explainWalletForRealWorldPaymentsOnly: true,
    explainNoLiveCardIssuingOrNftMintingNow: true,
    reviewerNotes: [
      "Sabi is an AI-first SuperApp. Some provider-dependent financial features may show provider_not_configured until licensed providers are approved.",
      "Digital goods in the Android Play build are planned for Google Play Billing; Sabi Wallet is not used to bypass digital purchase policy.",
      "Virtual cards are not issued by Google. Sabi Virtual Visa Card readiness requires Airwallex or licensed issuer approval and KYB/KYC/AML gates.",
      "Tokenized Digital Assets/NFT features must remain policy-gated and declared through Financial features before live sale/earning/minting.",
      "AI responses and UGC surfaces require in-app report/flag/block paths before production release.",
    ],
  },

  financialFeaturesDeclarationNotes: {
    financialFeatureDeclarationRequired: true,
    featuresToDeclareIfVisibleOrEnabled: [
      "Wallet / payments",
      "Business/Merchant payments",
      "Tokenized Digital Assets",
      "Virtual card readiness/issuing when enabled",
      "Money transfer/payment provider features if enabled",
      "Financial account/payment metadata handling",
    ],
    tokenizedDigitalAssetNotes: [
      "Declare if Sabi sells or enables users to earn Tokenized Digital Assets.",
      "In-app product details must indicate that the product represents a Tokenized Digital Asset.",
      "No NFT gambling, staking, chance-based unknown value, or investment/earning promise.",
      "No crypto exchange without certified regulated provider and jurisdictional compliance.",
    ],
    virtualCardNotes: [
      "Use Sabi Virtual Visa Card naming, not Google Visa Card.",
      "Card issuing only through Airwallex or licensed issuer after approval.",
      "Google Pay tokenization only through issuer/TSP approval.",
      "No fake card issuing, fake balance, or raw PAN/CVV storage by Sabi infrastructure.",
    ],
  },

  aiReportingReviewerEvidenceDraft: {
    requiredBeforeProduction: true,
    actionName: "Report or flag AI response",
    surfaces: [
      "Sabi AI Assistant chat",
      "AI translation output",
      "AI business assistant output",
      "AI moderation suggestion review",
      "AI-generated collectible text/media if enabled later",
    ],
    reportReasons: [
      "offensive",
      "unsafe",
      "incorrect",
      "privacy concern",
      "financial/payment concern",
      "other",
    ],
    evidenceNeeded: [
      "screenshot/path of report AI response button",
      "backend/admin report intake path or safe-disabled plan",
      "moderation/filter feedback process",
      "provider_not_configured behavior for AI provider missing",
    ],
  },

  ugcReviewerEvidenceDraft: {
    requiredBeforeProduction: true,
    surfaces: [
      "Stream live",
      "Stream shorts/videos",
      "comments",
      "public/group profile surfaces",
      "creator content",
      "Messenger public/group surfaces if exposed",
      "NFT/display collectible surfaces if user-generated",
    ],
    requiredActions: [
      "report content",
      "report user",
      "block user",
      "moderation queue",
      "remove/hide abusive content after review",
      "18+ gate where applicable",
      "abuse/profanity handling",
    ],
    evidenceNeeded: [
      "screenshot/path for report content",
      "screenshot/path for report user",
      "screenshot/path for block user",
      "admin/moderation handling notes",
      "provider_not_configured behavior for live provider missing",
    ],
  },

  targetSdkAabChecklist: {
    targetAndroidApiMinimumForNewMobileApp: 35,
    aabRequiredForPlayRelease: true,
    appSigningRequired: true,
    packageNameMustBeFinal: true,
    releaseTrackPlan: [
      "internal testing",
      "closed testing",
      "open testing optional",
      "production only after compliance and billing gates",
    ],
    blockedUntil: [
      "targetSdk checked",
      "AAB build generated",
      "versionCode/versionName set",
      "app signing ready",
      "privacy policy URL ready",
      "Data Safety complete",
      "app access instructions complete",
    ],
  },

  closedTestingChecklist: {
    neededIfAccountRequiresIt: true,
    testerGroupRequired: true,
    testerFeedbackCollectionRequired: true,
    readinessItems: [
      "closed testing email group or Google Group",
      "minimum required testers where Play account requires it",
      "14-day continuous testing plan where required",
      "tester instructions",
      "known limitations/provider_not_configured explanation",
      "crash/log monitoring",
      "feedback collection form",
      "release notes",
      "privacy policy and account deletion links active",
      "no fake money/provider/card/NFT features enabled",
    ],
  },

  productionBlockersBeforeSubmission: [
    "No public Privacy Policy URL",
    "No account deletion web URL",
    "No in-app account deletion path",
    "Data Safety not matching actual runtime",
    "No AI response reporting on AI surfaces",
    "No UGC report/block on UGC surfaces",
    "Digital goods purchasable through Wallet/Airwallex instead of Google Play Billing",
    "Financial features not declared",
    "NFT/tokenized asset shown as live without declaration/disclosure",
    "Virtual card shown as issued/live without licensed issuer approval",
    "Raw PAN/CVV stored by Sabi",
    "Target SDK below required level",
    "AAB/app signing incomplete",
    "Reviewer cannot access app or understand provider_not_configured states",
  ],

  nextStage: "PLAY-READY-5",
  requiredExactApprovalTextForPlayReady5: PLAY_READY_4_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_5,

  safety: {
    sourceTargetWriteByPlayReady4: false,
    backendRestartByPlayReady4: false,
    runtimeDbWriteByPlayReady4: false,
    providerCallByPlayReady4: false,
    walletMutationByPlayReady4: false,
    paymentAuthorizationByPlayReady4: false,
    moneyMovementByPlayReady4: false,
    fakeSuccessByPlayReady4: false,
  },
} as const;

export function getPlayReady4PlayConsoleDocumentDraft() {
  return PLAY_READY_4_PLAY_CONSOLE_DOCUMENT_DRAFT;
}

export function getPlayReady4Readiness() {
  const s = getPlayReady4PlayConsoleDocumentDraft();

  const privacyReady =
    s.privacyPolicyDraftSections.length >= 7 &&
    s.privacyPolicyDraftSections.every((item) => item.finalizationRequired === true);

  const dataSafetyReady =
    s.dataSafetyAnswerMap.mustBeFinalRuntimeTruth === true &&
    s.dataSafetyAnswerMap.dataTypesToMap.length >= 10 &&
    s.dataSafetyAnswerMap.purposesToMap.length >= 8;

  const deletionReady =
    s.accountDeletionInstructionsDraft.userMustBeAbleToRequestAccountAndAssociatedDataDeletion === true &&
    s.accountDeletionInstructionsDraft.explainRetentionExceptions === true &&
    s.accountDeletionInstructionsDraft.reviewerEvidenceRequired.length >= 4;

  const reviewerReady =
    s.appAccessReviewerNotesDraft.includeDemoCredentialsIfLoginRequired === true &&
    s.appAccessReviewerNotesDraft.explainProviderNotConfiguredStates === true &&
    s.appAccessReviewerNotesDraft.explainGooglePlayBillingForDigitalGoods === true &&
    s.appAccessReviewerNotesDraft.explainNoLiveCardIssuingOrNftMintingNow === true;

  const financialReady =
    s.financialFeaturesDeclarationNotes.financialFeatureDeclarationRequired === true &&
    s.financialFeaturesDeclarationNotes.featuresToDeclareIfVisibleOrEnabled.length >= 5 &&
    s.financialFeaturesDeclarationNotes.tokenizedDigitalAssetNotes.length >= 4 &&
    s.financialFeaturesDeclarationNotes.virtualCardNotes.length >= 4;

  const aiUgcReady =
    s.aiReportingReviewerEvidenceDraft.requiredBeforeProduction === true &&
    s.aiReportingReviewerEvidenceDraft.reportReasons.length >= 5 &&
    s.ugcReviewerEvidenceDraft.requiredBeforeProduction === true &&
    s.ugcReviewerEvidenceDraft.requiredActions.includes("report content") &&
    s.ugcReviewerEvidenceDraft.requiredActions.includes("block user");

  const buildTestingReady =
    s.targetSdkAabChecklist.targetAndroidApiMinimumForNewMobileApp >= 35 &&
    s.targetSdkAabChecklist.aabRequiredForPlayRelease === true &&
    s.closedTestingChecklist.readinessItems.length >= 9;

  const blockersReady = s.productionBlockersBeforeSubmission.length >= 12;

  const safetyReady =
    s.safety.sourceTargetWriteByPlayReady4 === false &&
    s.safety.backendRestartByPlayReady4 === false &&
    s.safety.runtimeDbWriteByPlayReady4 === false &&
    s.safety.providerCallByPlayReady4 === false &&
    s.safety.walletMutationByPlayReady4 === false &&
    s.safety.paymentAuthorizationByPlayReady4 === false &&
    s.safety.moneyMovementByPlayReady4 === false &&
    s.safety.fakeSuccessByPlayReady4 === false;

  const ready =
    privacyReady &&
    dataSafetyReady &&
    deletionReady &&
    reviewerReady &&
    financialReady &&
    aiUgcReady &&
    buildTestingReady &&
    blockersReady &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady5.includes("PLAY-READY-5");

  return {
    version: s.version,
    ready,
    status: ready
      ? "play_console_document_draft_ready_for_app_side_gate_planning"
      : "play_console_document_draft_blocked",
    privacySections: s.privacyPolicyDraftSections.length,
    dataSafetyDataTypes: s.dataSafetyAnswerMap.dataTypesToMap.length,
    productionBlockers: s.productionBlockersBeforeSubmission.length,
    nextRecommendedStage: "PLAY-READY-5 controlled app-side compliance gate implementation planning source-only after exact approval",
  } as const;
}

export function runPlayReady4PlayConsoleDocumentDraftSmoke() {
  const snapshot = getPlayReady4PlayConsoleDocumentDraft();
  const readiness = getPlayReady4Readiness();

  const assertions = [
    {
      id: "privacy_data_safety_deletion_drafts_present",
      passed:
        snapshot.privacyPolicyDraftSections.length >= 7 &&
        snapshot.dataSafetyAnswerMap.mustBeFinalRuntimeTruth === true &&
        snapshot.accountDeletionInstructionsDraft.userMustBeAbleToRequestAccountAndAssociatedDataDeletion === true,
      evidence: JSON.stringify({
        privacySections: snapshot.privacyPolicyDraftSections.length,
        dataTypes: snapshot.dataSafetyAnswerMap.dataTypesToMap.length,
        deletionEvidence: snapshot.accountDeletionInstructionsDraft.reviewerEvidenceRequired,
      }),
    },
    {
      id: "reviewer_notes_and_financial_features_present",
      passed:
        snapshot.appAccessReviewerNotesDraft.explainProviderNotConfiguredStates === true &&
        snapshot.financialFeaturesDeclarationNotes.financialFeatureDeclarationRequired === true &&
        snapshot.financialFeaturesDeclarationNotes.tokenizedDigitalAssetNotes.length >= 4,
      evidence: JSON.stringify({
        reviewer: snapshot.appAccessReviewerNotesDraft.reviewerNotes,
        financial: snapshot.financialFeaturesDeclarationNotes.featuresToDeclareIfVisibleOrEnabled,
      }),
    },
    {
      id: "ai_ugc_evidence_present",
      passed:
        snapshot.aiReportingReviewerEvidenceDraft.requiredBeforeProduction === true &&
        snapshot.ugcReviewerEvidenceDraft.requiredBeforeProduction === true &&
        snapshot.ugcReviewerEvidenceDraft.requiredActions.includes("report user") &&
        snapshot.ugcReviewerEvidenceDraft.requiredActions.includes("block user"),
      evidence: JSON.stringify({
        ai: snapshot.aiReportingReviewerEvidenceDraft.evidenceNeeded,
        ugc: snapshot.ugcReviewerEvidenceDraft.evidenceNeeded,
      }),
    },
    {
      id: "target_sdk_aab_closed_testing_present",
      passed:
        snapshot.targetSdkAabChecklist.targetAndroidApiMinimumForNewMobileApp >= 35 &&
        snapshot.targetSdkAabChecklist.aabRequiredForPlayRelease === true &&
        snapshot.closedTestingChecklist.readinessItems.length >= 9,
      evidence: JSON.stringify({
        targetSdk: snapshot.targetSdkAabChecklist,
        closedTesting: snapshot.closedTestingChecklist.readinessItems,
      }),
    },
    {
      id: "production_blockers_and_safety_present",
      passed:
        snapshot.productionBlockersBeforeSubmission.length >= 12 &&
        snapshot.safety.sourceTargetWriteByPlayReady4 === false &&
        snapshot.safety.backendRestartByPlayReady4 === false &&
        snapshot.safety.runtimeDbWriteByPlayReady4 === false &&
        snapshot.safety.providerCallByPlayReady4 === false &&
        snapshot.safety.moneyMovementByPlayReady4 === false &&
        snapshot.safety.fakeSuccessByPlayReady4 === false,
      evidence: JSON.stringify({
        blockers: snapshot.productionBlockersBeforeSubmission,
        safety: snapshot.safety,
      }),
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
    stage: "play_console_document_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "play_console_document_draft_smoke_passed"
      : "play_console_document_draft_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
