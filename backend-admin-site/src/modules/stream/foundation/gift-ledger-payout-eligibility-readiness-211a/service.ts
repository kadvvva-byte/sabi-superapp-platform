import {
  STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
  type StreamGiftLedgerPayoutEligibilityReadinessArea211A,
  type StreamGiftLedgerPayoutEligibilityReadinessBlocked211A,
  type StreamGiftLedgerPayoutEligibilityReadinessInput211A,
  type StreamGiftLedgerPayoutEligibilityReadinessPrepared211A,
  type StreamGiftLedgerPayoutEligibilityReadinessResult211A,
  type StreamGiftLedgerPayoutEligibilityReadinessSafety211A,
  type StreamGiftLedgerPayoutEligibilityReadinessSnapshot211A,
} from "./types";

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_OWNER_APPROVAL =
  "I_APPROVE_211A_STREAM_GIFTS_OFFICIAL_STREAMER_PAYOUT_ELIGIBILITY_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_SURFACES_211A = [
  "official_streamer_agreement",
  "kyc_kyb_aml",
  "tax_withholding",
  "settlement_hold",
  "fraud_risk_review",
  "admin_payout_review_evidence",
  "regular_user_no_cashout",
  "demo_points_no_cashout",
  "wallet_payout_boundary",
  "provider_payout_boundary",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_AREAS_211A: readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[] = [
  "previous_210b_eligibility_risk_handoff_locked",
  "previous_209b_send_intent_audit_handoff_locked",
  "provider_not_configured_visibility_locked",
  "official_streamer_agreement_boundary_visible",
  "kyc_kyb_aml_boundary_visible",
  "tax_withholding_boundary_visible",
  "settlement_hold_boundary_visible",
  "fraud_risk_review_boundary_visible",
  "admin_payout_review_evidence_visible",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "wallet_payout_boundary_locked",
  "provider_payout_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY: StreamGiftLedgerPayoutEligibilityReadinessSafety211A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous210BHandoffRequired: true,
  previous209BHandoffRequired: true,
  officialStreamerAgreementBoundaryVisible: true,
  kycKybAmlBoundaryVisible: true,
  taxWithholdingBoundaryVisible: true,
  settlementHoldBoundaryVisible: true,
  fraudRiskReviewBoundaryVisible: true,
  adminPayoutReviewEvidenceVisible: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  walletPayoutBoundaryLocked: true,
  providerPayoutBoundaryLocked: true,
  payoutEligibilityRuntimeDecisionExecuted: false,
  payoutExecutionExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futurePayoutEligibilityDecisionRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const RAW_SECRET_PATTERNS_211A = [
  /sk_live_[A-Za-z0-9]/i,
  /rk_live_[A-Za-z0-9]/i,
  /pk_live_[A-Za-z0-9]/i,
  /AIza[0-9A-Za-z_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /client_secret\s*[:=]\s*[A-Za-z0-9_-]{12,}/i,
] as const;

function normalizeTextArray(value: readonly string[] | undefined): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => `${item}`.trim()).filter(Boolean);
}

function normalizeAreaArray(value: readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[] | undefined): readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StreamGiftLedgerPayoutEligibilityReadinessArea211A =>
    STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_AREAS_211A.includes(item),
  );
}

function hasRawSecret(value: unknown): boolean {
  const text = JSON.stringify(value ?? "");
  return RAW_SECRET_PATTERNS_211A.some((pattern) => pattern.test(text));
}

function blocked211A(
  code: StreamGiftLedgerPayoutEligibilityReadinessBlocked211A["code"],
  blockedReason: string,
): StreamGiftLedgerPayoutEligibilityReadinessBlocked211A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "payout_eligibility_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerPayoutEligibilityReadinessInput211A(
  input: StreamGiftLedgerPayoutEligibilityReadinessInput211A,
): StreamGiftLedgerPayoutEligibilityReadinessInput211A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode,
    acknowledged210BStage: input.acknowledged210BStage,
    evidenceReferences: normalizeTextArray(input.evidenceReferences),
    readinessAreas: normalizeAreaArray(input.readinessAreas),
    payoutSurfaces: normalizeTextArray(input.payoutSurfaces),
    operatorNote: input.operatorNote?.trim(),
  };
}

export function prepareStreamGiftLedgerPayoutEligibilityReadiness211A(
  input: StreamGiftLedgerPayoutEligibilityReadinessInput211A,
): StreamGiftLedgerPayoutEligibilityReadinessResult211A {
  const normalized = normalizeStreamGiftLedgerPayoutEligibilityReadinessInput211A(input);

  if (hasRawSecret(normalized)) {
    return blocked211A("raw_secret_or_provider_value_rejected", "Raw secrets, provider tokens, private keys, and credential values are rejected by 211A.");
  }
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_OWNER_APPROVAL) {
    return blocked211A("owner_approval_required", "Exact 211A owner approval phrase is required for readiness only.");
  }
  if (normalized.readinessMode !== "payout_eligibility_readiness_index_only") {
    return blocked211A("readiness_mode_disabled", "211A only prepares a safe-disabled payout eligibility readiness index.");
  }
  if (normalized.acknowledged210BStage !== "210B_eligibility_risk_final_handoff_clean") {
    return blocked211A("previous_210b_handoff_required", "210B final handoff must be clean before 211A readiness can be prepared.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked211A("evidence_references_required", "Evidence references are required; do not include secrets or provider credentials.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked211A("readiness_areas_required", "Payout eligibility readiness areas are required.");
  }
  if (normalized.payoutSurfaces.length === 0) {
    return blocked211A("payout_surfaces_required", "Payout eligibility surfaces are required.");
  }

  const missingArea = STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_AREAS_211A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked211A("missing_required_area", `Required payout eligibility readiness area is missing: ${missingArea}`);
  }

  const missingSurface = STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_SURFACES_211A.find((surface) => !normalized.payoutSurfaces.includes(surface));
  if (missingSurface) {
    return blocked211A("required_payout_surface_missing", `Required payout eligibility surface is missing: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerPayoutEligibilityReadinessPrepared211A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "payout_eligibility_readiness_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.payout-eligibility-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
      previousStageRequired: "210B_eligibility_risk_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_AREAS_211A,
      readinessAreas: normalized.readinessAreas,
      evidenceReferences: normalized.evidenceReferences,
      payoutSurfaces: normalized.payoutSurfaces,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      previous210BHandoffRequired: true,
      previous209BHandoffRequired: true,
      officialStreamerAgreementBoundaryVisible: true,
      kycKybAmlBoundaryVisible: true,
      taxWithholdingBoundaryVisible: true,
      settlementHoldBoundaryVisible: true,
      fraudRiskReviewBoundaryVisible: true,
      adminPayoutReviewEvidenceVisible: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      walletPayoutBoundaryLocked: true,
      providerPayoutBoundaryLocked: true,
      payoutEligibilityRuntimeDecisionExecuted: false,
      payoutExecuted: false,
      providerPayoutCallExecuted: false,
      walletMutationExecuted: false,
      paymentCaptureExecuted: false,
      sendIntentRuntimeExecutionExecuted: false,
      giftLedgerRuntimeWriteExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      providerLiveCallExecuted: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futurePayoutEligibilityDecisionRequiresSeparateApproval: true,
      futureWalletPayoutRequiresSeparateApproval: true,
      futureProviderPayoutRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      nextStage: "211B_stream_gifts_official_streamer_payout_eligibility_final_handoff",
    },
    readinessPrepared: true,
    providerNotConfiguredVisible: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerPayoutEligibilityReadiness211A(): StreamGiftLedgerPayoutEligibilityReadinessSnapshot211A {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "ready_for_payout_eligibility_readiness_without_runtime_enablement",
    previousStageRequired: "210B_eligibility_risk_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    officialStreamerAgreementBoundaryVisible: true,
    kycKybAmlBoundaryVisible: true,
    taxWithholdingBoundaryVisible: true,
    settlementHoldBoundaryVisible: true,
    fraudRiskReviewBoundaryVisible: true,
    adminPayoutReviewEvidenceVisible: true,
    regularUserNoCashoutBoundaryLocked: true,
    demoPointsNoCashoutBoundaryLocked: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "211B_stream_gifts_official_streamer_payout_eligibility_final_handoff",
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY,
  };
}

export function getStreamGiftLedgerPayoutEligibilityReadiness211AContract() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_OWNER_APPROVAL,
    readinessMode: "payout_eligibility_readiness_index_only" as const,
    acknowledged210BStage: "210B_eligibility_risk_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_AREAS_211A,
    requiredPayoutSurfaces: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_REQUIRED_SURFACES_211A,
    providerNotConfiguredVisible: true,
    noRuntimeExecution: true,
    noPayoutExecution: true,
    noProviderPayoutCall: true,
    noWalletMutation: true,
    noDbReadWrite: true,
    noFakeSuccess: true,
  } as const;
}

export function getStreamGiftLedgerPayoutEligibilityReadiness211ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    steps: [
      "Confirm 210B eligibility/risk/compliance final handoff is clean.",
      "Review official streamer agreement, KYC/KYB/AML, tax/withholding, settlement hold, and fraud/risk boundaries.",
      "Keep regular users blocked from cash-out and demo-points blocked from cash-out.",
      "Do not execute payout eligibility decisions, provider payouts, Wallet mutations, DB writes, or runtime enablement.",
      "Prepare 211B final handoff only after 211A readiness is clean.",
    ],
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityReadiness211APayoutDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    dbWriteExecuted: false,
    reason: "211A is readiness-only. Future payout eligibility decisions require separate exact owner approval and execution package.",
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityReadiness211AProviderPayoutRequest() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    providerPayoutCallExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    reason: "Provider payout calls are blocked in 211A and require separate exact owner approval.",
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityReadiness211AWalletPayoutRequest() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    walletMutationExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    reason: "Wallet payout/mutation is blocked in 211A and requires separate exact owner approval.",
  } as const;
}

export function assertStreamGiftLedgerPayoutEligibilityReadiness211ARemainsSafe() {
  return STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_SAFETY;
}
