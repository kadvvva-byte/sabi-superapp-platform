export const PLAY_READY_15_VERSION = "PLAY-READY-15" as const;

export const PLAY_READY_15_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-15 controlled admin and reviewer evidence center planning source-only, use PLAY-READY-14 permission/target SDK/AAB planning and PLAY-READY-7 gap-closure planning to prepare an exact future Admin/Play reviewer evidence center plan for privacy/account deletion, AI report/flag, UGC report/block, provider_not_configured, billing-vs-wallet separation, financial features/NFT/virtual card disclosures, permission rationale, target SDK/AAB readiness, closed testing notes, and reviewer access instructions, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_15_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_16 = "I approve PLAY-READY-16 controlled Play-ready implementation readiness handoff and first target-patch execution gate planning source-only, use PLAY-READY-1 through PLAY-READY-15 to consolidate final production blockers, exact implementation order, first controlled target patch candidate, rollback/check commands, reviewer evidence requirements, and remaining no-fake/no-provider/no-money safety gates, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";

export type PlayReady15EvidenceStatus =
  | "planned_source_only"
  | "requires_future_target_patch"
  | "requires_external_play_console_action"
  | "requires_local_root_audit"
  | "blocked_until_provider_ready";

export type PlayReady15EvidencePriority =
  | "critical_before_submission"
  | "high_before_closed_testing"
  | "required_before_public_production";

export interface PlayReady15EvidenceSection {
  readonly id: string;
  readonly title: string;
  readonly priority: PlayReady15EvidencePriority;
  readonly status: PlayReady15EvidenceStatus;
  readonly reviewerMustSee: readonly string[];
  readonly futureAdminTargets: readonly string[];
  readonly futureMobileTargets: readonly string[];
  readonly productionBlockersIfMissing: readonly string[];
  readonly targetWriteNow: false;
  readonly runtimeDbWriteNow: false;
  readonly providerCallNow: false;
  readonly secretExposureNow: false;
  readonly fakeEvidenceAllowed: false;
}

export const PLAY_READY_15_EVIDENCE_SECTIONS: readonly PlayReady15EvidenceSection[] = [
  {
    id: "privacy_account_deletion_evidence",
    title: "Privacy policy and account deletion evidence",
    priority: "critical_before_submission",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "public Privacy Policy URL",
      "in-app privacy path",
      "in-app account deletion path",
      "public account deletion request URL",
      "retention exception copy",
      "Data Safety consistency note",
    ],
    futureAdminTargets: [
      "future Admin Play readiness evidence page",
      "future reviewer evidence snapshot route",
    ],
    futureMobileTargets: [
      "app/legal/privacy.tsx",
      "app/profile/privacy.tsx",
      "app/profile/privacy/auto-delete.tsx",
      "src/modules/profile/data/privacy.ts",
    ],
    productionBlockersIfMissing: [
      "privacy policy URL missing or placeholder",
      "account deletion web URL missing or placeholder",
      "in-app deletion path missing",
      "retention exceptions missing",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "ai_report_flag_evidence",
    title: "AI report and flag evidence",
    priority: "critical_before_submission",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "AI response report/flag action",
      "AI report reason list",
      "provider_not_configured AI copy",
      "AI privacy/safety explanation",
      "no fake AI provider success statement",
    ],
    futureAdminTargets: [
      "src/core/kernel/ai/ai-safety-admin.service.ts",
      "src/modules/ai/infrastructure/routes/ai-safety-admin.routes.ts",
      "future Admin AI report evidence panel",
    ],
    futureMobileTargets: [
      "app/ai/chat.tsx",
      "app/ai/settings.tsx",
      "src/modules/ai/mobile/screens/AiMobileChatScreen.tsx",
      "src/modules/ai/mobile/screens/AiMobileSettingsScreen.tsx",
    ],
    productionBlockersIfMissing: [
      "AI report/flag action missing",
      "provider_not_configured copy missing",
      "AI report intake collects excessive sensitive data",
      "AI screen claims live provider without real provider",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "ugc_report_block_evidence",
    title: "UGC report/block/moderation evidence",
    priority: "critical_before_submission",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "report content path",
      "report user path",
      "block user path",
      "comment report/hide/moderation path",
      "18+ gate or adult-content-disabled evidence",
      "moderation queue or safe-disabled explanation",
      "no fake moderation success statement",
    ],
    futureAdminTargets: [
      "src/core/kernel/admin/moderation-queue.service.ts",
      "future Admin moderation evidence panel",
      "future UGC report intake evidence snapshot",
    ],
    futureMobileTargets: [
      "app/stream.tsx",
      "src/modules/stream/screens/StreamScreen.tsx",
      "src/modules/stream/mobile/StreamShortVideoDraftPanel.tsx",
      "app/chat-report.tsx",
      "app/profile/privacy/blocked.tsx",
    ],
    productionBlockersIfMissing: [
      "report content missing",
      "report user missing",
      "block user missing",
      "comment moderation missing",
      "18+ evidence missing where applicable",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "provider_not_configured_evidence",
    title: "Unified provider_not_configured evidence",
    priority: "critical_before_submission",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "AI provider_not_configured state",
      "Stream provider_not_configured state",
      "Wallet provider_not_configured state",
      "Airwallex/Alipay provider_not_configured state",
      "NFT/tokenized asset provider_not_configured state",
      "virtual card issuer_not_configured state",
      "Google Play Billing not configured evidence if not live",
      "secret values redacted",
    ],
    futureAdminTargets: [
      "future unified provider evidence snapshot route",
      "future Admin provider readiness evidence panel",
    ],
    futureMobileTargets: [
      "src/modules/ai/mobile/aiMobileApi.ts",
      "app/wallet/virtual-card.tsx",
      "app/wallet/crypto.tsx",
      "app/ai/premium.tsx",
    ],
    productionBlockersIfMissing: [
      "provider unavailable but fake success shown",
      "secret value visible in reviewer evidence",
      "provider readiness unclear to reviewer",
      "safe-disabled state not visible",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "billing_wallet_separation_evidence",
    title: "Billing-vs-Wallet separation and entitlement evidence",
    priority: "critical_before_submission",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "digital goods use Google Play Billing in Android Play build",
      "Wallet/Airwallex/Alipay are blocked for digital goods",
      "purchase token verification planned server-side",
      "entitlement ledger states",
      "refund/revoke/expire states",
      "no fake purchase/entitlement success statement",
    ],
    futureAdminTargets: [
      "future billing separation evidence panel",
      "future entitlement ledger evidence snapshot",
    ],
    futureMobileTargets: [
      "app/ai/premium.tsx",
      "app/profile/premium.tsx",
      "app/wallet/coin/topup.tsx",
      "app/wallet/coin/diamonds.tsx",
    ],
    productionBlockersIfMissing: [
      "Wallet can buy Play-build digital goods",
      "purchase token verification missing",
      "fake entitlement state possible",
      "refund/revoke states missing",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "financial_nft_card_disclosure_evidence",
    title: "Financial features, NFT/tokenized assets, and virtual card disclosure evidence",
    priority: "critical_before_submission",
    status: "requires_external_play_console_action",
    reviewerMustSee: [
      "Financial features declaration notes",
      "Tokenized Digital Asset disclosure",
      "no NFT gambling/staking/chance-based unknown value",
      "virtual card issuer/provider_not_configured copy",
      "Sabi Virtual Visa Card naming",
      "no Google Visa Card naming",
      "no raw PAN/CVV storage evidence",
      "no fake NFT/card/balance evidence",
    ],
    futureAdminTargets: [
      "future financial features evidence panel",
      "future raw PAN/CVV safety audit evidence file",
    ],
    futureMobileTargets: [
      "app/wallet/virtual-card.tsx",
      "app/wallet/crypto.tsx",
      "app/wallet/crypto/buy.tsx",
      "app/wallet/crypto/sell.tsx",
    ],
    productionBlockersIfMissing: [
      "Financial features declaration missing",
      "tokenized asset disclosure missing",
      "virtual card implies live issuer",
      "raw PAN/CVV evidence missing",
      "fake NFT/card/balance shown",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "permission_target_sdk_aab_evidence",
    title: "Permissions, target SDK, AAB, signing, and release evidence",
    priority: "high_before_closed_testing",
    status: "requires_local_root_audit",
    reviewerMustSee: [
      "permission rationale for camera/microphone/media/notifications/location/contacts/overlay/biometric if used",
      "unused sensitive permissions removed or justified",
      "target SDK/API check result",
      "AAB readiness",
      "app signing/versioning readiness",
      "no mobile secret values",
      "reviewer credentials/access instructions",
    ],
    futureAdminTargets: [
      "future release readiness evidence panel",
      "future local-root audit report attachment",
    ],
    futureMobileTargets: [
      "app.json",
      "app.config.ts/app.config.js",
      "eas.json",
      "android/app/build.gradle",
      "android/app/src/main/AndroidManifest.xml",
    ],
    productionBlockersIfMissing: [
      "target SDK not confirmed",
      "AAB not confirmed",
      "unused sensitive permissions declared",
      "reviewer access instructions missing",
      "release source contains secrets",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
  {
    id: "closed_testing_notes_evidence",
    title: "Closed testing notes and reviewer instructions evidence",
    priority: "high_before_closed_testing",
    status: "requires_future_target_patch",
    reviewerMustSee: [
      "test account access path",
      "provider_not_configured explanation",
      "privacy/account deletion instructions",
      "AI report path",
      "UGC report/block path",
      "billing separation explanation",
      "financial features disclosure explanation",
      "known disabled features list",
      "feedback/support path",
    ],
    futureAdminTargets: [
      "future Play readiness reviewer notes generator",
      "future closed testing checklist panel",
    ],
    futureMobileTargets: [
      "future in-app help/reviewer support screen if needed",
    ],
    productionBlockersIfMissing: [
      "reviewer cannot access app",
      "disabled features look broken instead of intentionally safe-disabled",
      "reviewer cannot find report/delete/privacy flows",
      "closed testing notes missing",
    ],
    targetWriteNow: false,
    runtimeDbWriteNow: false,
    providerCallNow: false,
    secretExposureNow: false,
    fakeEvidenceAllowed: false,
  },
];

export const PLAY_READY_15_ADMIN_REVIEWER_EVIDENCE_CENTER_PLANNING = {
  version: PLAY_READY_15_VERSION,
  stage: "controlled_admin_and_reviewer_evidence_center_planning_source_only",
  status: "admin_reviewer_evidence_center_planning_ready_for_play_ready_implementation_handoff",
  sourceOnly: true,
  sourceTargetWritesNow: 0,
  targetFilesModifiedNow: 0,
  backendRestartNow: 0,
  runtimeDbWriteNow: 0,
  providerCallsNow: 0,
  secretValueExposureNow: false,
  walletMutationsNow: 0,
  paymentAuthorizationsNow: 0,
  moneyMovementNow: 0,
  fakeSuccessNow: false,

  evidenceSections: PLAY_READY_15_EVIDENCE_SECTIONS,

  futureAdminEvidenceCenterPlan: {
    purpose: "One reviewer-safe Admin/Play readiness center that explains every sensitive Play policy gate without exposing secrets or claiming fake provider/payment/card/NFT success.",
    possibleTargets: [
      "future Admin Play readiness evidence screen",
      "future read-only reviewer evidence snapshot route",
      "future downloadable reviewer checklist JSON",
      "future closed testing notes generator",
    ],
    mustBeReadOnly: true,
    publicReviewerModeMustRedactSecrets: true,
    canShowProviderStateButNotSecretValues: true,
    canShowDisabledFeaturesAsSafeDisabled: true,
    canShowBuildReadinessButNotSigningSecrets: true,
    runtimeDbWriteNow: false,
    providerCallNow: false,
  },

  reviewerEvidenceChecklist: [
    "Privacy Policy URL",
    "in-app account deletion path",
    "web account deletion URL",
    "retention exceptions",
    "AI report/flag path",
    "UGC report content path",
    "UGC report user path",
    "block user path",
    "provider_not_configured examples",
    "billing-vs-wallet separation map",
    "Play Billing product map",
    "entitlement ledger state plan",
    "Financial features declaration notes",
    "Tokenized Digital Asset disclosure",
    "Sabi Virtual Visa Card issuer/provider_not_configured copy",
    "no raw PAN/CVV storage evidence",
    "permission rationale checklist",
    "target SDK/API check result",
    "AAB/app signing/versioning readiness",
    "closed testing reviewer instructions",
  ],

  reviewerAccessInstructionPlan: {
    requiredBeforeClosedTesting: [
      "test account username or phone/email path",
      "password or OTP/testing access method without putting secrets in source",
      "country/region availability note",
      "provider_not_configured/safe-disabled explanation",
      "steps to find privacy/account deletion",
      "steps to report AI response",
      "steps to report/block UGC user/content",
      "steps to see billing separation",
      "steps to see financial feature disabled disclosures",
      "support/feedback contact",
    ],
    secretCredentialsInSourceAllowed: false,
    fakeAccessAllowed: false,
  },

  closedTestingNotesPlan: {
    requiredNotes: [
      "Sabi is AI-first Global SuperApp",
      "some provider-dependent financial/card/NFT/live/payment features are intentionally safe-disabled",
      "digital goods in Android Play build must use Google Play Billing",
      "Wallet/Airwallex/Alipay are real-world rails only after approval",
      "AI and UGC reporting flows must be tested",
      "account deletion and privacy links must be tested",
      "sensitive permissions are requested only at feature use",
      "feedback/support path for testers",
    ],
    notesMustNotClaim: [
      "live money movement when provider is not configured",
      "live card issuing without issuer approval",
      "live NFT minting/trading without provider/compliance",
      "AI provider ready if not configured",
      "moderation success if no persistence/review exists",
    ],
  },

  productionBlockers: [
    "Admin/reviewer evidence center missing",
    "reviewer evidence claims fake provider/payment/card/NFT success",
    "secret values visible in reviewer evidence",
    "privacy/account deletion evidence missing",
    "AI report/flag evidence missing",
    "UGC report/block evidence missing",
    "provider_not_configured evidence missing",
    "billing-vs-wallet separation evidence missing",
    "financial features/NFT/card disclosure evidence missing",
    "permission/target SDK/AAB evidence missing",
    "closed testing reviewer instructions missing",
  ],

  implementationHandoffPlan: {
    recommendedNextStage: "PLAY-READY-16",
    firstActualTargetPatchShouldRemainSmall: true,
    recommendedFirstTargetPatchArea: "privacy/account deletion URLs and copy",
    targetPatchRequiresSeparateExactApproval: true,
    everyFuturePatchMustInclude: [
      "changed files list",
      "rollback instructions",
      "TypeScript command",
      "no fake success audit",
      "no secret exposure audit",
      "provider/money movement safety check",
      "reviewer evidence update",
    ],
  },

  nextStage: "PLAY-READY-16",
  requiredExactApprovalTextForPlayReady16: PLAY_READY_15_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_16,

  safety: {
    sourceTargetWriteByPlayReady15: false,
    targetFilesModifiedByPlayReady15: false,
    backendRestartByPlayReady15: false,
    runtimeDbWriteByPlayReady15: false,
    providerCallByPlayReady15: false,
    secretValueExposureByPlayReady15: false,
    walletMutationByPlayReady15: false,
    paymentAuthorizationByPlayReady15: false,
    moneyMovementByPlayReady15: false,
    fakeEvidenceByPlayReady15: false,
    fakeSuccessByPlayReady15: false,
  },
} as const;

export function getPlayReady15AdminReviewerEvidenceCenterPlanning() {
  return PLAY_READY_15_ADMIN_REVIEWER_EVIDENCE_CENTER_PLANNING;
}

export function getPlayReady15Readiness() {
  const s = getPlayReady15AdminReviewerEvidenceCenterPlanning();

  const sectionsReady =
    s.evidenceSections.length >= 8 &&
    s.evidenceSections.every((section) => section.targetWriteNow === false) &&
    s.evidenceSections.every((section) => section.runtimeDbWriteNow === false) &&
    s.evidenceSections.every((section) => section.providerCallNow === false) &&
    s.evidenceSections.every((section) => section.secretExposureNow === false) &&
    s.evidenceSections.every((section) => section.fakeEvidenceAllowed === false) &&
    s.evidenceSections.some((section) => section.id === "privacy_account_deletion_evidence") &&
    s.evidenceSections.some((section) => section.id === "ai_report_flag_evidence") &&
    s.evidenceSections.some((section) => section.id === "ugc_report_block_evidence") &&
    s.evidenceSections.some((section) => section.id === "billing_wallet_separation_evidence");

  const centerReady =
    s.futureAdminEvidenceCenterPlan.mustBeReadOnly === true &&
    s.futureAdminEvidenceCenterPlan.publicReviewerModeMustRedactSecrets === true &&
    s.futureAdminEvidenceCenterPlan.canShowProviderStateButNotSecretValues === true &&
    s.futureAdminEvidenceCenterPlan.runtimeDbWriteNow === false &&
    s.futureAdminEvidenceCenterPlan.providerCallNow === false;

  const checklistReady =
    s.reviewerEvidenceChecklist.length >= 18 &&
    s.reviewerAccessInstructionPlan.requiredBeforeClosedTesting.length >= 9 &&
    s.reviewerAccessInstructionPlan.secretCredentialsInSourceAllowed === false &&
    s.reviewerAccessInstructionPlan.fakeAccessAllowed === false;

  const testingReady =
    s.closedTestingNotesPlan.requiredNotes.length >= 7 &&
    s.closedTestingNotesPlan.notesMustNotClaim.length >= 5 &&
    s.productionBlockers.length >= 10;

  const handoffReady =
    s.implementationHandoffPlan.recommendedNextStage === "PLAY-READY-16" &&
    s.implementationHandoffPlan.firstActualTargetPatchShouldRemainSmall === true &&
    s.implementationHandoffPlan.targetPatchRequiresSeparateExactApproval === true &&
    s.implementationHandoffPlan.everyFuturePatchMustInclude.length >= 6;

  const safetyReady =
    s.sourceTargetWritesNow === 0 &&
    s.targetFilesModifiedNow === 0 &&
    s.backendRestartNow === 0 &&
    s.runtimeDbWriteNow === 0 &&
    s.providerCallsNow === 0 &&
    s.secretValueExposureNow === false &&
    s.walletMutationsNow === 0 &&
    s.paymentAuthorizationsNow === 0 &&
    s.moneyMovementNow === 0 &&
    s.fakeSuccessNow === false &&
    s.safety.sourceTargetWriteByPlayReady15 === false &&
    s.safety.targetFilesModifiedByPlayReady15 === false &&
    s.safety.backendRestartByPlayReady15 === false &&
    s.safety.runtimeDbWriteByPlayReady15 === false &&
    s.safety.providerCallByPlayReady15 === false &&
    s.safety.secretValueExposureByPlayReady15 === false &&
    s.safety.walletMutationByPlayReady15 === false &&
    s.safety.paymentAuthorizationByPlayReady15 === false &&
    s.safety.moneyMovementByPlayReady15 === false &&
    s.safety.fakeEvidenceByPlayReady15 === false &&
    s.safety.fakeSuccessByPlayReady15 === false;

  const ready =
    sectionsReady &&
    centerReady &&
    checklistReady &&
    testingReady &&
    handoffReady &&
    safetyReady &&
    s.requiredExactApprovalTextForPlayReady16.includes("PLAY-READY-16");

  return {
    version: s.version,
    ready,
    status: ready
      ? "admin_reviewer_evidence_center_planning_ready_for_play_ready_implementation_handoff"
      : "admin_reviewer_evidence_center_planning_blocked",
    evidenceSections: s.evidenceSections.length,
    reviewerEvidenceItems: s.reviewerEvidenceChecklist.length,
    productionBlockers: s.productionBlockers.length,
    nextRecommendedStage: "PLAY-READY-16 controlled Play-ready implementation readiness handoff source-only after exact approval",
  } as const;
}

export function runPlayReady15AdminReviewerEvidenceCenterPlanningSmoke() {
  const snapshot = getPlayReady15AdminReviewerEvidenceCenterPlanning();
  const readiness = getPlayReady15Readiness();

  const assertions = [
    {
      id: "all_evidence_sections_present_no_runtime",
      passed:
        snapshot.evidenceSections.length >= 8 &&
        snapshot.evidenceSections.every((section) => section.targetWriteNow === false) &&
        snapshot.evidenceSections.every((section) => section.runtimeDbWriteNow === false) &&
        snapshot.evidenceSections.every((section) => section.providerCallNow === false) &&
        snapshot.evidenceSections.every((section) => section.fakeEvidenceAllowed === false),
      evidence: JSON.stringify(snapshot.evidenceSections.map((section) => ({
        id: section.id,
        status: section.status,
        targetWrite: section.targetWriteNow,
        fake: section.fakeEvidenceAllowed,
      })),
    },
    {
      id: "reviewer_center_readonly_secret_safe",
      passed:
        snapshot.futureAdminEvidenceCenterPlan.mustBeReadOnly === true &&
        snapshot.futureAdminEvidenceCenterPlan.publicReviewerModeMustRedactSecrets === true &&
        snapshot.futureAdminEvidenceCenterPlan.canShowProviderStateButNotSecretValues === true &&
        snapshot.futureAdminEvidenceCenterPlan.runtimeDbWriteNow === false &&
        snapshot.futureAdminEvidenceCenterPlan.providerCallNow === false,
      evidence: JSON.stringify(snapshot.futureAdminEvidenceCenterPlan),
    },
    {
      id: "reviewer_checklist_and_access_ready",
      passed:
        snapshot.reviewerEvidenceChecklist.length >= 18 &&
        snapshot.reviewerAccessInstructionPlan.requiredBeforeClosedTesting.length >= 9 &&
        snapshot.reviewerAccessInstructionPlan.secretCredentialsInSourceAllowed === false &&
        snapshot.reviewerAccessInstructionPlan.fakeAccessAllowed === false,
      evidence: JSON.stringify({
        checklist: snapshot.reviewerEvidenceChecklist,
        access: snapshot.reviewerAccessInstructionPlan,
      }),
    },
    {
      id: "closed_testing_notes_do_not_overclaim",
      passed:
        snapshot.closedTestingNotesPlan.requiredNotes.length >= 7 &&
        snapshot.closedTestingNotesPlan.notesMustNotClaim.includes("live money movement when provider is not configured") &&
        snapshot.closedTestingNotesPlan.notesMustNotClaim.includes("live card issuing without issuer approval"),
      evidence: JSON.stringify(snapshot.closedTestingNotesPlan),
    },
    {
      id: "safety_no_target_secret_provider_money_fake",
      passed:
        snapshot.sourceTargetWritesNow === 0 &&
        snapshot.targetFilesModifiedNow === 0 &&
        snapshot.backendRestartNow === 0 &&
        snapshot.runtimeDbWriteNow === 0 &&
        snapshot.providerCallsNow === 0 &&
        snapshot.secretValueExposureNow === false &&
        snapshot.walletMutationsNow === 0 &&
        snapshot.paymentAuthorizationsNow === 0 &&
        snapshot.moneyMovementNow === 0 &&
        snapshot.fakeSuccessNow === false &&
        snapshot.safety.fakeEvidenceByPlayReady15 === false,
      evidence: JSON.stringify(snapshot.safety),
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
    stage: "admin_reviewer_evidence_center_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "admin_reviewer_evidence_center_planning_smoke_passed"
      : "admin_reviewer_evidence_center_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
