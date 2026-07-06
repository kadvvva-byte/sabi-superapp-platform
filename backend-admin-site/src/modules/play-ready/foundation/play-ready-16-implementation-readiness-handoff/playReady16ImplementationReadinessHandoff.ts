export const PLAY_READY_16_VERSION = "PLAY-READY-16" as const;

export const PLAY_READY_16_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-16 controlled Play-ready implementation readiness handoff and first target-patch execution gate planning source-only, use PLAY-READY-1 through PLAY-READY-15 to consolidate final production blockers, exact implementation order, first controlled target patch candidate, rollback/check commands, reviewer evidence requirements, and remaining no-fake/no-provider/no-money safety gates, without executing target writes, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, and without fake success.";
export const PLAY_READY_16_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_17 = "I approve PLAY-READY-17 controlled privacy policy link and account deletion first target patch execution package, modify only the smallest approved privacy/account deletion target files needed to wire public privacy policy URL config/copy, in-app account deletion path copy, web deletion URL placeholder/config, retention exception copy, and reviewer evidence references, without backend restart, without runtime DB write, without provider calls, without secret value exposure, without Wallet mutation, without payment authorization, without money movement, without deleting accounts, and without fake success.";

export type PlayReady16ImplementationPriority =
  | "must_close_before_play_submission"
  | "must_close_before_closed_testing"
  | "must_close_before_public_production"
  | "provider_live_blocked_until_approval";

export interface PlayReady16ProductionBlocker {
  readonly id: string;
  readonly priority: PlayReady16ImplementationPriority;
  readonly blocker: string;
  readonly sourceStages: readonly string[];
  readonly closureStageCandidate: string;
  readonly targetPatchAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export interface PlayReady16ImplementationStep {
  readonly order: number;
  readonly stage: string;
  readonly title: string;
  readonly purpose: string;
  readonly expectedScope: readonly string[];
  readonly mustStaySafe: readonly string[];
  readonly targetPatchExecutionRequiresSeparateApproval: true;
}

export const PLAY_READY_16_FINAL_PRODUCTION_BLOCKERS: readonly PlayReady16ProductionBlocker[] = [
  {
    id: "privacy_policy_url_missing",
    priority: "must_close_before_play_submission",
    blocker: "Public Privacy Policy URL is missing, placeholder, unreachable, or not linked from app.",
    sourceStages: ["PLAY-READY-4", "PLAY-READY-8", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-17",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "account_deletion_missing",
    priority: "must_close_before_play_submission",
    blocker: "In-app account deletion path and public web deletion URL are missing, unclear, or placeholder.",
    sourceStages: ["PLAY-READY-4", "PLAY-READY-8", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-17",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "ai_report_flag_missing",
    priority: "must_close_before_play_submission",
    blocker: "AI response report/flag action and report reasons are not closed with reviewer evidence.",
    sourceStages: ["PLAY-READY-5", "PLAY-READY-9", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-18",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "ugc_report_block_missing",
    priority: "must_close_before_play_submission",
    blocker: "UGC report content, report user, block user, and comment moderation evidence are not closed.",
    sourceStages: ["PLAY-READY-5", "PLAY-READY-10", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-19",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "provider_not_configured_evidence_missing",
    priority: "must_close_before_play_submission",
    blocker: "Unified provider_not_configured reviewer evidence is missing or inconsistent across AI, Stream, Wallet, Airwallex, Alipay, NFT, virtual card, and Google Play Billing.",
    sourceStages: ["PLAY-READY-11", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-20",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "billing_wallet_separation_missing",
    priority: "must_close_before_play_submission",
    blocker: "Digital goods must be separated from Wallet/Airwallex/Alipay and mapped to Google Play Billing with entitlement states.",
    sourceStages: ["PLAY-READY-2", "PLAY-READY-12", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-21",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "financial_features_disclosure_missing",
    priority: "must_close_before_play_submission",
    blocker: "Financial features declaration, NFT/tokenized asset disclosure, virtual card issuer copy, and raw PAN/CVV evidence are not closed.",
    sourceStages: ["PLAY-READY-2A", "PLAY-READY-13", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-22",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "permission_target_sdk_aab_unconfirmed",
    priority: "must_close_before_closed_testing",
    blocker: "Local root Android permissions, permission rationale, target SDK/API, AAB, signing, versioning, and reviewer access are not audited.",
    sourceStages: ["PLAY-READY-14", "PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-23",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "admin_reviewer_evidence_center_missing",
    priority: "must_close_before_closed_testing",
    blocker: "Admin/Play reviewer evidence center and closed testing notes are not implemented.",
    sourceStages: ["PLAY-READY-15"],
    closureStageCandidate: "PLAY-READY-24",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
  {
    id: "live_provider_money_card_nft_features_blocked",
    priority: "provider_live_blocked_until_approval",
    blocker: "Provider-dependent live money, card issuing, NFT minting/trading, payout, and provider calls remain blocked until real provider approvals and separate launch gates.",
    sourceStages: ["PLAY-READY-1", "PLAY-READY-2A", "PLAY-READY-11", "PLAY-READY-13"],
    closureStageCandidate: "future provider launch gates only",
    targetPatchAllowedNow: false,
    fakeSuccessAllowed: false,
  },
];

export const PLAY_READY_16_IMPLEMENTATION_ORDER: readonly PlayReady16ImplementationStep[] = [
  {
    order: 1,
    stage: "PLAY-READY-17",
    title: "Privacy policy link and account deletion first target patch",
    purpose: "Close the highest Play submission blocker first with smallest low-risk UI/copy/config target patch.",
    expectedScope: [
      "privacy policy URL config/copy",
      "in-app privacy/account deletion path copy",
      "web account deletion URL placeholder/config",
      "retention exception copy",
      "reviewer evidence references",
    ],
    mustStaySafe: [
      "no account deletion execution",
      "no runtime DB write",
      "no backend restart",
      "no provider call",
      "no secret exposure",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 2,
    stage: "PLAY-READY-18",
    title: "AI report/flag target patch",
    purpose: "Add or wire Play-required AI response report/flag user path and safe provider_not_configured copy.",
    expectedScope: [
      "AI report/flag action",
      "AI report reasons",
      "provider_not_configured copy",
      "AI safety/reviewer evidence references",
    ],
    mustStaySafe: [
      "no AI provider call",
      "no fake AI answer",
      "no secret exposure",
      "no DB write unless separately approved later",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 3,
    stage: "PLAY-READY-19",
    title: "UGC report/block target patch",
    purpose: "Close UGC report content/report user/block user/comment report evidence for Stream/Messenger exposed UGC.",
    expectedScope: [
      "Stream report content",
      "report user",
      "block user",
      "comment report/hide",
      "18+ evidence or adult-content-disabled copy",
    ],
    mustStaySafe: [
      "no fake moderation success",
      "no provider call",
      "no live stream provider enablement",
      "no DB write unless separately approved later",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 4,
    stage: "PLAY-READY-20",
    title: "Unified provider_not_configured evidence patch",
    purpose: "Make disabled provider states consistent and reviewer-safe across AI, Stream, Wallet, Airwallex, Alipay, NFT, card, and Play Billing.",
    expectedScope: [
      "provider_not_configured copy",
      "secret redaction evidence",
      "safe-disabled reviewer notes",
      "no fake provider success guards",
    ],
    mustStaySafe: [
      "no secret values",
      "no provider calls",
      "no provider READY mutation",
      "no money movement",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 5,
    stage: "PLAY-READY-21",
    title: "Billing-vs-Wallet separation and entitlement patch",
    purpose: "Close Play Billing product map, entitlement states, and Wallet bypass hard-block for digital goods.",
    expectedScope: [
      "digital goods map",
      "Wallet bypass block copy/contract",
      "entitlement state copy/contract",
      "refund/revoke/expire state plan",
    ],
    mustStaySafe: [
      "no fake purchase",
      "no fake entitlement",
      "no payment authorization",
      "no Wallet mutation",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 6,
    stage: "PLAY-READY-22",
    title: "Financial features/NFT/virtual card disclosure patch",
    purpose: "Close financial declarations, tokenized asset disclosure, virtual card issuer copy, and raw PAN/CVV evidence plan.",
    expectedScope: [
      "financial feature disclosure copy",
      "tokenized asset disclosure",
      "virtual card issuer/provider_not_configured copy",
      "no raw PAN/CVV evidence references",
    ],
    mustStaySafe: [
      "no fake NFT minting",
      "no fake card issuing",
      "no fake balance",
      "no raw PAN/CVV",
      "no money movement",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 7,
    stage: "PLAY-READY-23",
    title: "Local root permissions/target SDK/AAB audit",
    purpose: "Inspect local root app/build files before closed testing and Play submission.",
    expectedScope: [
      "Android permissions",
      "permission rationale",
      "target SDK/API",
      "AAB readiness",
      "app signing/versioning",
      "reviewer access",
    ],
    mustStaySafe: [
      "no Play upload",
      "no release signing secret exposure",
      "no build execution until approved",
      "no target write in audit-only mode",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
  {
    order: 8,
    stage: "PLAY-READY-24",
    title: "Admin/reviewer evidence center implementation",
    purpose: "Create read-only reviewer evidence center after individual gate evidence is ready.",
    expectedScope: [
      "Admin readiness panel",
      "reviewer checklist",
      "closed testing notes",
      "safe-disabled explanations",
    ],
    mustStaySafe: [
      "read-only",
      "secret redacted",
      "no fake evidence",
      "no provider call",
      "no backend restart unless separately approved",
    ],
    targetPatchExecutionRequiresSeparateApproval: true,
  },
];

export const PLAY_READY_16_FIRST_TARGET_PATCH_CANDIDATE = {
  stage: "PLAY-READY-17",
  title: "Privacy policy link and account deletion first target patch",
  whyFirst: [
    "required before Play submission when account creation exists",
    "lowest risk compared with provider/billing/wallet/runtime changes",
    "mostly UI/copy/config and reviewer evidence",
    "does not require provider calls, Wallet mutation, DB write, or money movement",
  ],
  expectedSmallestTargetCandidateFiles: [
    "src/modules/profile/data/privacy.ts",
    "app/legal/privacy.tsx or app/profile/privacy.tsx",
    "app/profile/privacy/auto-delete.tsx",
    "src/modules/profile/components/PrivacyDetailScreen.tsx if copy is centralized there",
  ],
  explicitNonGoals: [
    "do not execute account deletion",
    "do not add destructive backend deletion",
    "do not mutate user data",
    "do not change provider readiness",
    "do not add fake legal/privacy claims",
    "do not expose secrets",
  ],
  rollbackPlan: [
    "keep pre-patch copy of changed files",
    "revert only changed files from PLAY-READY-17 package if TypeScript or UI review fails",
    "rerun npx tsc --noEmit",
    "verify privacy/account deletion routes still open",
    "verify no provider/money/card/NFT files changed",
  ],
  checkCommands: [
    "npx tsc --noEmit",
    "grep/search for placeholder URL before Play submission",
    "manual app navigation check: Profile > Privacy > Delete account",
    "manual app navigation check: Privacy Policy link opens",
  ],
  targetPatchExecutionRequiresSeparateApproval: true,
} as const;

export const PLAY_READY_16_REVIEWER_EVIDENCE_REQUIREMENTS = {
  minimumBeforePlaySubmission: [
    "Privacy Policy URL reachable",
    "web account deletion URL reachable",
    "in-app account deletion path clear",
    "AI report/flag path visible",
    "UGC report content/report user/block user visible",
    "provider_not_configured examples visible",
    "digital goods Billing-vs-Wallet separation documented",
    "financial features/NFT/card disclosures documented",
    "permissions and target SDK/AAB audit complete",
    "closed testing reviewer instructions complete",
  ],
  mustNotClaim: [
    "live money movement without provider authorization",
    "live card issuing without licensed issuer approval",
    "NFT minting/trading without provider/compliance approval",
    "AI provider ready when not configured",
    "moderation success without real local/backend/provider behavior",
    "Google Visa Card",
    "secret values visible",
  ],
  reviewerModeRules: [
    "read-only",
    "secret-redacted",
    "safe-disabled states are explicit",
    "no fake evidence",
    "no provider calls",
    "no DB mutation",
  ],
} as const;

export const PLAY_READY_16_REMAINING_SAFETY_GATES = {
  noFakeProviderSuccess: true,
  noFakePurchaseSuccess: true,
  noFakeEntitlementSuccess: true,
  noFakeModerationSuccess: true,
  noFakeMoneyMovement: true,
  noFakeCardIssuing: true,
  noFakeNftMinting: true,
  noFakeBalance: true,
  noSecretValueExposure: true,
  noMobileSecrets: true,
  noRawPanCvvStorage: true,
  noWalletBypassForDigitalGoods: true,
  providerCallsRequireSeparateApproval: true,
  backendRestartRequiresSeparateApproval: true,
  runtimeDbWriteRequiresSeparateApproval: true,
  targetPatchExecutionRequiresSeparateApproval: true,
} as const;

export const PLAY_READY_16_IMPLEMENTATION_READINESS_HANDOFF = {
  version: PLAY_READY_16_VERSION,
  stage: "controlled_play_ready_implementation_readiness_handoff_and_first_target_patch_execution_gate_planning_source_only",
  status: "play_ready_implementation_handoff_ready_for_first_controlled_target_patch",
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

  inputsConsolidated: [
    "PLAY-READY-1 global launch readiness audit",
    "PLAY-READY-2 billing separation",
    "PLAY-READY-2A financial/NFT/card policy",
    "PLAY-READY-3 compliance readiness",
    "PLAY-READY-4 Play Console document draft",
    "PLAY-READY-5 compliance gate planning",
    "PLAY-READY-6 target detection/gap audit",
    "PLAY-READY-7 gap-closure package planning",
    "PLAY-READY-8 privacy/account deletion review",
    "PLAY-READY-9 AI report/flag review",
    "PLAY-READY-10 UGC report/block review",
    "PLAY-READY-11 provider_not_configured evidence review",
    "PLAY-READY-12 billing entitlement review",
    "PLAY-READY-13 financial/NFT/card disclosure review",
    "PLAY-READY-14 permission/target SDK/AAB planning",
    "PLAY-READY-15 admin/reviewer evidence center planning",
  ],

  finalProductionBlockers: PLAY_READY_16_FINAL_PRODUCTION_BLOCKERS,
  implementationOrder: PLAY_READY_16_IMPLEMENTATION_ORDER,
  firstTargetPatchCandidate: PLAY_READY_16_FIRST_TARGET_PATCH_CANDIDATE,
  reviewerEvidenceRequirements: PLAY_READY_16_REVIEWER_EVIDENCE_REQUIREMENTS,
  remainingSafetyGates: PLAY_READY_16_REMAINING_SAFETY_GATES,

  nextStage: "PLAY-READY-17",
  requiredExactApprovalTextForPlayReady17: PLAY_READY_16_REQUIRED_APPROVAL_TEXT_FOR_PLAY_READY_17,

  safety: {
    sourceTargetWriteByPlayReady16: false,
    targetFilesModifiedByPlayReady16: false,
    backendRestartByPlayReady16: false,
    runtimeDbWriteByPlayReady16: false,
    providerCallByPlayReady16: false,
    secretValueExposureByPlayReady16: false,
    walletMutationByPlayReady16: false,
    paymentAuthorizationByPlayReady16: false,
    moneyMovementByPlayReady16: false,
    fakeSuccessByPlayReady16: false,
  },
} as const;

export function getPlayReady16ImplementationReadinessHandoff() {
  return PLAY_READY_16_IMPLEMENTATION_READINESS_HANDOFF;
}

export function getPlayReady16Readiness() {
  const s = getPlayReady16ImplementationReadinessHandoff();

  const blockersReady =
    s.finalProductionBlockers.length >= 10 &&
    s.finalProductionBlockers.every((item) => item.targetPatchAllowedNow === false) &&
    s.finalProductionBlockers.every((item) => item.fakeSuccessAllowed === false) &&
    s.finalProductionBlockers.some((item) => item.id === "privacy_policy_url_missing") &&
    s.finalProductionBlockers.some((item) => item.id === "account_deletion_missing") &&
    s.finalProductionBlockers.some((item) => item.id === "billing_wallet_separation_missing");

  const orderReady =
    s.implementationOrder.length >= 8 &&
    s.implementationOrder.every((item) => item.targetPatchExecutionRequiresSeparateApproval === true) &&
    s.implementationOrder[0]?.stage === "PLAY-READY-17";

  const firstPatchReady =
    s.firstTargetPatchCandidate.stage === "PLAY-READY-17" &&
    s.firstTargetPatchCandidate.targetPatchExecutionRequiresSeparateApproval === true &&
    s.firstTargetPatchCandidate.expectedSmallestTargetCandidateFiles.length >= 3 &&
    s.firstTargetPatchCandidate.explicitNonGoals.includes("do not execute account deletion") &&
    s.firstTargetPatchCandidate.rollbackPlan.length >= 4 &&
    s.firstTargetPatchCandidate.checkCommands.includes("npx tsc --noEmit");

  const evidenceReady =
    s.reviewerEvidenceRequirements.minimumBeforePlaySubmission.length >= 9 &&
    s.reviewerEvidenceRequirements.mustNotClaim.includes("Google Visa Card") &&
    s.reviewerEvidenceRequirements.reviewerModeRules.includes("secret-redacted");

  const safetyGateReady =
    s.remainingSafetyGates.noFakeProviderSuccess === true &&
    s.remainingSafetyGates.noFakeMoneyMovement === true &&
    s.remainingSafetyGates.noSecretValueExposure === true &&
    s.remainingSafetyGates.noRawPanCvvStorage === true &&
    s.remainingSafetyGates.noWalletBypassForDigitalGoods === true &&
    s.remainingSafetyGates.targetPatchExecutionRequiresSeparateApproval === true;

  const runtimeSafetyReady =
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
    s.safety.sourceTargetWriteByPlayReady16 === false &&
    s.safety.targetFilesModifiedByPlayReady16 === false &&
    s.safety.backendRestartByPlayReady16 === false &&
    s.safety.runtimeDbWriteByPlayReady16 === false &&
    s.safety.providerCallByPlayReady16 === false &&
    s.safety.secretValueExposureByPlayReady16 === false &&
    s.safety.walletMutationByPlayReady16 === false &&
    s.safety.paymentAuthorizationByPlayReady16 === false &&
    s.safety.moneyMovementByPlayReady16 === false &&
    s.safety.fakeSuccessByPlayReady16 === false;

  const ready =
    blockersReady &&
    orderReady &&
    firstPatchReady &&
    evidenceReady &&
    safetyGateReady &&
    runtimeSafetyReady &&
    s.requiredExactApprovalTextForPlayReady17.includes("PLAY-READY-17");

  return {
    version: s.version,
    ready,
    status: ready
      ? "play_ready_implementation_handoff_ready_for_first_controlled_target_patch"
      : "play_ready_implementation_handoff_blocked",
    finalProductionBlockers: s.finalProductionBlockers.length,
    implementationSteps: s.implementationOrder.length,
    firstTargetPatchCandidate: s.firstTargetPatchCandidate.stage,
    nextRecommendedStage: "PLAY-READY-17 controlled privacy policy link and account deletion first target patch execution package after exact approval",
  } as const;
}

export function runPlayReady16ImplementationReadinessHandoffSmoke() {
  const snapshot = getPlayReady16ImplementationReadinessHandoff();
  const readiness = getPlayReady16Readiness();

  const assertions = [
    {
      id: "all_prior_play_ready_stages_consolidated",
      passed:
        snapshot.inputsConsolidated.length >= 15 &&
        snapshot.inputsConsolidated[0].includes("PLAY-READY-1") &&
        snapshot.inputsConsolidated[snapshot.inputsConsolidated.length - 1].includes("PLAY-READY-15"),
      evidence: JSON.stringify(snapshot.inputsConsolidated),
    },
    {
      id: "production_blockers_and_order_present",
      passed:
        snapshot.finalProductionBlockers.length >= 10 &&
        snapshot.implementationOrder.length >= 8 &&
        snapshot.implementationOrder[0]?.stage === "PLAY-READY-17",
      evidence: JSON.stringify({
        blockers: snapshot.finalProductionBlockers.map((item) => item.id),
        order: snapshot.implementationOrder.map((item) => item.stage),
      }),
    },
    {
      id: "first_target_patch_candidate_is_privacy_deletion_and_safe",
      passed:
        snapshot.firstTargetPatchCandidate.stage === "PLAY-READY-17" &&
        snapshot.firstTargetPatchCandidate.explicitNonGoals.includes("do not execute account deletion") &&
        snapshot.firstTargetPatchCandidate.rollbackPlan.includes("rerun npx tsc --noEmit") &&
        snapshot.firstTargetPatchCandidate.targetPatchExecutionRequiresSeparateApproval === true,
      evidence: JSON.stringify(snapshot.firstTargetPatchCandidate),
    },
    {
      id: "reviewer_evidence_and_safety_gates_present",
      passed:
        snapshot.reviewerEvidenceRequirements.minimumBeforePlaySubmission.length >= 9 &&
        snapshot.remainingSafetyGates.noFakeProviderSuccess === true &&
        snapshot.remainingSafetyGates.noFakeMoneyMovement === true &&
        snapshot.remainingSafetyGates.noWalletBypassForDigitalGoods === true,
      evidence: JSON.stringify({
        evidence: snapshot.reviewerEvidenceRequirements,
        safety: snapshot.remainingSafetyGates,
      }),
    },
    {
      id: "source_only_no_runtime_or_money",
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
        snapshot.safety.fakeSuccessByPlayReady16 === false,
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
    stage: "implementation_readiness_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "implementation_readiness_handoff_smoke_passed"
      : "implementation_readiness_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
