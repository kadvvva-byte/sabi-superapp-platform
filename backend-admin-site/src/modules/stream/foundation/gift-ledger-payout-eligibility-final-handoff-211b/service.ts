import {
  STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffArea211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffBlocked211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffInput211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffPrepared211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffResult211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffSafety211B,
  type StreamGiftLedgerPayoutEligibilityFinalHandoffSnapshot211B,
} from "./types";

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_OWNER_APPROVAL =
  "I_APPROVE_211B_STREAM_GIFTS_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_211B: readonly StreamGiftLedgerPayoutEligibilityFinalHandoffArea211B[] = [
  "previous_211a_payout_eligibility_readiness_locked",
  "previous_210b_eligibility_risk_handoff_locked",
  "provider_not_configured_visibility_locked",
  "official_streamer_agreement_boundary_locked",
  "kyc_kyb_aml_boundary_locked",
  "tax_withholding_boundary_locked",
  "settlement_hold_boundary_locked",
  "fraud_risk_review_boundary_locked",
  "admin_payout_review_evidence_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "wallet_payout_boundary_locked",
  "provider_payout_boundary_locked",
  "payout_execution_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_SURFACES_211B = [
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
  "payout_execution_boundary",
] as const;

export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_SAFETY: StreamGiftLedgerPayoutEligibilityFinalHandoffSafety211B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous211AReadinessRequired: true,
  previous210BHandoffRequired: true,
  officialStreamerAgreementBoundaryLocked: true,
  kycKybAmlBoundaryLocked: true,
  taxWithholdingBoundaryLocked: true,
  settlementHoldBoundaryLocked: true,
  fraudRiskReviewBoundaryLocked: true,
  adminPayoutReviewEvidenceLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  walletPayoutBoundaryLocked: true,
  providerPayoutBoundaryLocked: true,
  payoutExecutionBoundaryLocked: true,
  payoutEligibilityRuntimeDecisionExecuted: false,
  payoutExecutionExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
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

function hasRawSecretLikeValue211B(value: unknown): boolean {
  if (typeof value === "string") {
    return /(?:sk_live_|pk_live_|AKIA|AIza|PRIVATE KEY|BEGIN RSA|BEGIN OPENSSH|client_secret|access_token|refresh_token|provider_secret|wallet_secret)/i.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((item) => hasRawSecretLikeValue211B(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((item) => hasRawSecretLikeValue211B(item));
  }
  return false;
}

function blocked211B(
  code: StreamGiftLedgerPayoutEligibilityFinalHandoffBlocked211B["code"],
  blockedReason: string,
): StreamGiftLedgerPayoutEligibilityFinalHandoffBlocked211B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "payout_eligibility_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_SAFETY,
  } as const;
}

export function normalizeStreamGiftLedgerPayoutEligibilityFinalHandoffInput211B(
  input: StreamGiftLedgerPayoutEligibilityFinalHandoffInput211B,
): StreamGiftLedgerPayoutEligibilityFinalHandoffInput211B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "disabled",
    acknowledged211AStage: input.acknowledged211AStage ?? "disabled",
    evidenceReferences: Array.isArray(input.evidenceReferences) ? input.evidenceReferences : [],
    handoffAreas: Array.isArray(input.handoffAreas) ? input.handoffAreas : [],
    payoutSurfaces: Array.isArray(input.payoutSurfaces) ? input.payoutSurfaces : [],
    operatorNote: input.operatorNote,
  } as const;
}

export function prepareStreamGiftLedgerPayoutEligibilityFinalHandoff211B(
  input: StreamGiftLedgerPayoutEligibilityFinalHandoffInput211B,
): StreamGiftLedgerPayoutEligibilityFinalHandoffResult211B {
  const normalized = normalizeStreamGiftLedgerPayoutEligibilityFinalHandoffInput211B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_OWNER_APPROVAL) {
    return blocked211B("owner_approval_required", "211B final handoff requires the exact owner approval phrase; no runtime execution is performed.");
  }
  if (normalized.handoffMode !== "payout_eligibility_final_handoff_only") {
    return blocked211B("handoff_mode_disabled", "211B is final handoff only and cannot execute payout eligibility, Wallet payout, provider payout, or runtime activation.");
  }
  if (normalized.acknowledged211AStage !== "211A_payout_eligibility_readiness_index_clean") {
    return blocked211B("previous_211a_readiness_required", "211B requires 211A payout eligibility readiness to be clean on owner machine.");
  }
  if (hasRawSecretLikeValue211B(normalized)) {
    return blocked211B("raw_secret_or_provider_value_rejected", "211B rejects raw secrets/provider tokens and never reads .env values.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked211B("evidence_references_required", "211B requires non-secret evidence references for final handoff traceability.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked211B("handoff_areas_required", "211B requires handoff areas to be listed.");
  }
  if (normalized.payoutSurfaces.length === 0) {
    return blocked211B("payout_surfaces_required", "211B requires payout surfaces to be listed without executing any payout.");
  }

  for (const area of STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_211B) {
    if (!normalized.handoffAreas.includes(area)) {
      return blocked211B("missing_required_area", `Missing required 211B handoff area: ${area}`);
    }
  }
  for (const surface of STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_SURFACES_211B) {
    if (!normalized.payoutSurfaces.includes(surface)) {
      return blocked211B("required_payout_surface_missing", `Missing required 211B payout surface: ${surface}`);
    }
  }

  const prepared: StreamGiftLedgerPayoutEligibilityFinalHandoffPrepared211B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "payout_eligibility_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.payout-eligibility-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
      previousStageRequired: "211A_payout_eligibility_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_211B,
      handoffAreas: normalized.handoffAreas,
      evidenceReferences: normalized.evidenceReferences,
      payoutSurfaces: normalized.payoutSurfaces,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous211AReadinessRequired: true,
      previous210BHandoffRequired: true,
      officialStreamerAgreementBoundaryLocked: true,
      kycKybAmlBoundaryLocked: true,
      taxWithholdingBoundaryLocked: true,
      settlementHoldBoundaryLocked: true,
      fraudRiskReviewBoundaryLocked: true,
      adminPayoutReviewEvidenceLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      walletPayoutBoundaryLocked: true,
      providerPayoutBoundaryLocked: true,
      payoutExecutionBoundaryLocked: true,
      payoutEligibilityRuntimeDecisionExecuted: false,
      payoutExecuted: false,
      providerPayoutCallExecuted: false,
      walletMutationExecuted: false,
      paymentCaptureExecuted: false,
      sendIntentRuntimeExecutionExecuted: false,
      giftReceiptRuntimeWriteExecuted: false,
      giftLedgerRuntimeWriteExecuted: false,
      giftDeliveryRealtimeEmitExecuted: false,
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
      nextStage: "closed_stream_gifts_official_streamer_payout_eligibility_future_payout_or_runtime_requires_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_SAFETY,
  } as const;

  assertStreamGiftLedgerPayoutEligibilityFinalHandoff211BRemainsSafe(prepared);
  return prepared;
}

export function assertStreamGiftLedgerPayoutEligibilityFinalHandoff211BRemainsSafe(
  result: StreamGiftLedgerPayoutEligibilityFinalHandoffResult211B,
): void {
  const unsafe =
    result.safety.providerRuntimeEnabled ||
    result.safety.providerPayoutCallExecuted ||
    result.safety.payoutExecutionExecuted ||
    result.safety.walletMutationExecuted ||
    result.safety.paymentCaptureExecuted ||
    result.safety.dbReadExecuted ||
    result.safety.dbWriteExecuted ||
    result.safety.realtimeEmitExecuted;

  if (unsafe) {
    throw new Error("211B must remain safe-disabled: no payout/runtime/provider/Wallet/DB/realtime execution is allowed.");
  }
}

export function getStreamGiftLedgerPayoutEligibilityFinalHandoff211B(): StreamGiftLedgerPayoutEligibilityFinalHandoffSnapshot211B {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "ready_for_payout_eligibility_final_handoff_without_runtime_enablement",
    previousStageRequired: "211A_payout_eligibility_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    officialStreamerAgreementBoundaryLocked: true,
    kycKybAmlBoundaryLocked: true,
    taxWithholdingBoundaryLocked: true,
    settlementHoldBoundaryLocked: true,
    fraudRiskReviewBoundaryLocked: true,
    adminPayoutReviewEvidenceLocked: true,
    regularUserNoCashoutBoundaryLocked: true,
    demoPointsNoCashoutBoundaryLocked: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "closed_stream_gifts_official_streamer_payout_eligibility_future_payout_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_SAFETY,
  } as const;
}

export function getStreamGiftLedgerPayoutEligibilityFinalHandoff211BContract() {
  return {
    contract: "stream.gift.payout-eligibility-final-handoff.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_OWNER_APPROVAL,
    handoffMode: "payout_eligibility_final_handoff_only",
    previousStageRequired: "211A_payout_eligibility_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_211B,
    requiredPayoutSurfaces: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_REQUIRED_SURFACES_211B,
    providerNotConfiguredVisible: true,
    finalHandoffOnlyNoRuntime: true,
    noRawSecrets: true,
    noEnvRead: true,
    noPayoutExecution: true,
    noProviderPayoutCall: true,
    noWalletMutation: true,
    noDbReadWrite: true,
    noRuntimeEnablement: true,
  } as const;
}

export function getStreamGiftLedgerPayoutEligibilityFinalHandoff211BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    steps: [
      "Verify 211A passed and owner machine TypeScript was clean.",
      "Confirm official streamer agreement, KYC/KYB/AML, tax/withholding, settlement hold, fraud/risk review, and Admin payout review evidence are locked as boundaries only.",
      "Do not execute payout eligibility runtime decisions, Wallet mutation, provider payout calls, DB reads/writes, realtime emits, or runtime enablement.",
      "Require a separate exact owner approval and execution package for any future payout/runtime action.",
    ] as const,
    blockedRuntimeActions: [
      "payout_eligibility_runtime_decision",
      "wallet_payout",
      "provider_payout_call",
      "payout_execution",
      "db_read_write",
      "provider_runtime_enablement",
      "fake_success",
    ] as const,
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutDecisionRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "blocked_payout_eligibility_decision_requires_separate_exact_owner_approval",
    providerNotConfiguredVisible: true,
    payoutEligibilityRuntimeDecisionExecuted: false,
    futurePayoutEligibilityDecisionRequiresSeparateApproval: true,
    reason: "211B is final handoff only and cannot execute payout eligibility decisions.",
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityFinalHandoff211BWalletPayoutRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "blocked_wallet_payout_requires_separate_exact_owner_approval",
    walletMutationExecuted: false,
    futureWalletPayoutRequiresSeparateApproval: true,
    reason: "211B never mutates Wallet balances or executes payouts.",
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityFinalHandoff211BProviderPayoutRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "blocked_provider_payout_requires_separate_exact_owner_approval",
    providerPayoutCallExecuted: false,
    providerRuntimeEnabled: false,
    futureProviderPayoutRequiresSeparateApproval: true,
    reason: "211B never calls payout providers or enables provider runtime.",
  } as const;
}

export function createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutExecutionRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_VERSION,
    status: "blocked_payout_execution_requires_separate_exact_owner_approval",
    payoutExecutionExecuted: false,
    futurePayoutExecutionRequiresSeparateApproval: true,
    reason: "211B is a final handoff boundary only; payout execution remains locked.",
  } as const;
}
