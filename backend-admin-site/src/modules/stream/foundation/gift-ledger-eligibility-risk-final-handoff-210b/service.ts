import {
  STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
  type StreamGiftLedgerEligibilityRiskFinalHandoffArea210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffBlocked210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffInput210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffPrepared210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffResult210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffSafety210B,
  type StreamGiftLedgerEligibilityRiskFinalHandoffSnapshot210B,
} from "./types";

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_OWNER_APPROVAL =
  "I_APPROVE_210B_STREAM_GIFTS_ELIGIBILITY_RISK_COMPLIANCE_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_SURFACES_210B = [
  "sender_identity_eligibility",
  "recipient_identity_eligibility",
  "age_gate",
  "region_gate",
  "compliance_kyc_kyb_boundary",
  "fraud_risk_scoring",
  "demo_points_no_cashout",
  "official_streamer_payout_eligibility",
  "regular_user_no_cashout",
  "admin_risk_review_evidence",
] as const;

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_AREAS_210B: readonly StreamGiftLedgerEligibilityRiskFinalHandoffArea210B[] = [
  "previous_210a_eligibility_risk_readiness_locked",
  "previous_209b_send_intent_audit_handoff_locked",
  "provider_not_configured_visibility_locked",
  "gift_quote_contract_locked",
  "gift_send_intent_contract_locked",
  "gift_receipt_contract_locked",
  "gift_ledger_audit_boundary_locked",
  "sender_identity_eligibility_boundary_locked",
  "recipient_identity_eligibility_boundary_locked",
  "age_gate_boundary_locked",
  "region_gate_boundary_locked",
  "compliance_kyc_kyb_boundary_locked",
  "fraud_risk_scoring_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "diamonds_paid_future_deferred_boundary_locked",
  "official_streamer_payout_eligibility_boundary_locked",
  "regular_user_no_cashout_boundary_locked",
  "admin_risk_review_evidence_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_SAFETY: StreamGiftLedgerEligibilityRiskFinalHandoffSafety210B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous210AReadinessRequired: true,
  previous209BHandoffRequired: true,
  giftQuoteContractLocked: true,
  giftSendIntentContractLocked: true,
  giftReceiptContractLocked: true,
  giftLedgerAuditBoundaryLocked: true,
  senderEligibilityBoundaryLocked: true,
  recipientEligibilityBoundaryLocked: true,
  ageGateBoundaryLocked: true,
  regionGateBoundaryLocked: true,
  complianceKycKybBoundaryLocked: true,
  fraudRiskScoringBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  diamondsPaidFutureDeferredBoundaryLocked: true,
  officialStreamerPayoutEligibilityBoundaryLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  adminRiskReviewEvidenceLocked: true,
  sendIntentExecutionAllowedNow: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  eligibilityRuntimeDecisionExecuted: false,
  riskRuntimeDecisionExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  adminRiskToggleExecuted: false,
  runtimeExecutionApprovedNow: false,
  liveActivationExecutionApprovedNow: false,
  liveActivationExecutionPerformedNow: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureSendIntentExecutionRequiresSeparateApproval: true,
  futureGiftLedgerWriteRequiresSeparateApproval: true,
  futureEligibilityRuntimeDecisionRequiresSeparateApproval: true,
  futureRiskRuntimeDecisionRequiresSeparateApproval: true,
  futureComplianceRuntimeDecisionRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const RAW_SECRET_PATTERNS_210B = [
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

function normalizeAreaArray(value: readonly StreamGiftLedgerEligibilityRiskFinalHandoffArea210B[] | undefined): readonly StreamGiftLedgerEligibilityRiskFinalHandoffArea210B[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StreamGiftLedgerEligibilityRiskFinalHandoffArea210B =>
    STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_AREAS_210B.includes(item),
  );
}

function hasRawSecret(value: unknown): boolean {
  const text = JSON.stringify(value ?? "");
  return RAW_SECRET_PATTERNS_210B.some((pattern) => pattern.test(text));
}

function blocked210B(
  code: StreamGiftLedgerEligibilityRiskFinalHandoffBlocked210B["code"],
  blockedReason: string,
): StreamGiftLedgerEligibilityRiskFinalHandoffBlocked210B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "eligibility_risk_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    eligibilityRuntimeDecisionExecuted: false,
    riskRuntimeDecisionExecuted: false,
    complianceRuntimeDecisionExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerEligibilityRiskFinalHandoffInput210B(
  input: StreamGiftLedgerEligibilityRiskFinalHandoffInput210B,
): StreamGiftLedgerEligibilityRiskFinalHandoffInput210B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode,
    acknowledged210AStage: input.acknowledged210AStage,
    evidenceReferences: normalizeTextArray(input.evidenceReferences),
    handoffAreas: normalizeAreaArray(input.handoffAreas),
    riskSurfaces: normalizeTextArray(input.riskSurfaces),
    operatorNote: input.operatorNote?.trim(),
  };
}

export function prepareStreamGiftLedgerEligibilityRiskFinalHandoff210B(
  input: StreamGiftLedgerEligibilityRiskFinalHandoffInput210B,
): StreamGiftLedgerEligibilityRiskFinalHandoffResult210B {
  const normalized = normalizeStreamGiftLedgerEligibilityRiskFinalHandoffInput210B(input);

  if (hasRawSecret(normalized)) {
    return blocked210B("raw_secret_or_provider_value_rejected", "Raw secrets, provider tokens, private keys, and credential values are rejected by this final handoff.");
  }
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_OWNER_APPROVAL) {
    return blocked210B("owner_approval_required", "Exact 210B owner approval phrase is required for final handoff generation only.");
  }
  if (normalized.handoffMode !== "eligibility_risk_final_handoff_only") {
    return blocked210B("handoff_mode_disabled", "210B only prepares a safe-disabled eligibility/risk/compliance final handoff.");
  }
  if (normalized.acknowledged210AStage !== "210A_eligibility_risk_readiness_index_clean") {
    return blocked210B("previous_210a_readiness_required", "210A readiness index must be clean before 210B final handoff can be prepared.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked210B("evidence_references_required", "Evidence references are required; do not include secrets or provider credentials.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked210B("handoff_areas_required", "Eligibility/risk final handoff areas are required.");
  }
  if (normalized.riskSurfaces.length === 0) {
    return blocked210B("risk_surfaces_required", "Risk/compliance surfaces are required.");
  }

  const missingArea = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_AREAS_210B.find((area) => !normalized.handoffAreas.includes(area));
  if (missingArea) {
    return blocked210B("missing_required_area", `Required eligibility/risk final handoff area is missing: ${missingArea}`);
  }

  const missingSurface = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_SURFACES_210B.find((surface) => !normalized.riskSurfaces.includes(surface));
  if (missingSurface) {
    return blocked210B("required_risk_surface_missing", `Required risk/compliance surface is missing: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerEligibilityRiskFinalHandoffPrepared210B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "eligibility_risk_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.eligibility-risk-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
      previousStageRequired: "210A_eligibility_risk_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_AREAS_210B,
      handoffAreas: normalized.handoffAreas,
      evidenceReferences: normalized.evidenceReferences,
      riskSurfaces: normalized.riskSurfaces,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous210AReadinessRequired: true,
      previous209BHandoffRequired: true,
      giftQuoteContractLocked: true,
      giftSendIntentContractLocked: true,
      giftReceiptContractLocked: true,
      giftLedgerAuditBoundaryLocked: true,
      senderEligibilityBoundaryLocked: true,
      recipientEligibilityBoundaryLocked: true,
      ageGateBoundaryLocked: true,
      regionGateBoundaryLocked: true,
      complianceKycKybBoundaryLocked: true,
      fraudRiskScoringBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      diamondsPaidFutureDeferredBoundaryLocked: true,
      officialStreamerPayoutEligibilityBoundaryLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      adminRiskReviewEvidenceLocked: true,
      sendIntentExecutionAllowedNow: false,
      sendIntentRuntimeExecutionExecuted: false,
      giftReceiptRuntimeWriteExecuted: false,
      giftLedgerRuntimeWriteExecuted: false,
      giftDeliveryRealtimeEmitExecuted: false,
      eligibilityRuntimeDecisionExecuted: false,
      riskRuntimeDecisionExecuted: false,
      complianceRuntimeDecisionExecuted: false,
      adminRiskToggleExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      providerLiveCallExecuted: false,
      providerPayoutCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureSendIntentExecutionRequiresSeparateApproval: true,
      futureGiftLedgerWriteRequiresSeparateApproval: true,
      futureEligibilityRuntimeDecisionRequiresSeparateApproval: true,
      futureRiskRuntimeDecisionRequiresSeparateApproval: true,
      futureComplianceRuntimeDecisionRequiresSeparateApproval: true,
      futureWalletPaymentRequiresSeparateApproval: true,
      futurePayoutRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_eligibility_risk_compliance_future_decisions_send_or_runtime_require_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    eligibilityRuntimeDecisionExecuted: false,
    riskRuntimeDecisionExecuted: false,
    complianceRuntimeDecisionExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerEligibilityRiskFinalHandoff210B(): StreamGiftLedgerEligibilityRiskFinalHandoffSnapshot210B {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "ready_for_eligibility_risk_final_handoff_without_runtime_enablement",
    previousStageRequired: "210A_eligibility_risk_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previous210AReadinessRequired: true,
    senderEligibilityBoundaryLocked: true,
    recipientEligibilityBoundaryLocked: true,
    ageGateBoundaryLocked: true,
    regionGateBoundaryLocked: true,
    complianceKycKybBoundaryLocked: true,
    fraudRiskScoringBoundaryLocked: true,
    demoPointsNoCashoutBoundaryLocked: true,
    officialStreamerPayoutEligibilityBoundaryLocked: true,
    regularUserNoCashoutBoundaryLocked: true,
    adminRiskReviewEvidenceLocked: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "closed_stream_gifts_eligibility_risk_compliance_future_decisions_send_or_runtime_require_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_SAFETY,
  };
}

export function getStreamGiftLedgerEligibilityRiskFinalHandoff210BContract() {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    contract: "stream.gift.eligibility-risk-final-handoff.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_OWNER_APPROVAL,
    previousStageRequired: "210A_eligibility_risk_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_AREAS_210B,
    requiredRiskSurfaces: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_REQUIRED_SURFACES_210B,
    runtimeExecutionApprovedNow: false,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    eligibilityRuntimeDecisionExecuted: false,
    riskRuntimeDecisionExecuted: false,
    complianceRuntimeDecisionExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    sourceOnly: true,
  } as const;
}

export function getStreamGiftLedgerEligibilityRiskFinalHandoff210BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    steps: [
      "Confirm 210A readiness index and TypeScript check are clean.",
      "Lock sender/recipient eligibility, age, region, compliance, and fraud/risk boundaries.",
      "Confirm regular-user no-cashout and official-streamer payout eligibility notices remain visible.",
      "Keep send execution, ledger write, eligibility/risk/compliance runtime decisions, Wallet payment, payout, provider calls, realtime delivery, and runtime enablement blocked.",
    ],
    forbiddenActions: [
      "Do not read .env or credential values.",
      "Do not execute send-intent or write gift ledger rows.",
      "Do not make eligibility/risk/compliance runtime decisions.",
      "Do not mutate Wallet, capture payment, or execute payout.",
      "Do not call providers or enable runtime binding.",
      "Do not run Prisma generate, migrations, DB reads, DB writes, or realtime emits.",
    ],
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BSendIntentRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "send_intent_execution_blocked_by_210b_final_handoff",
    httpStatus: 423,
    blockedReason: "210B is final handoff only; send-intent execution requires separate exact owner approval.",
    sendIntentRuntimeExecutionExecuted: false,
    giftLedgerRuntimeWriteExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BLedgerWriteRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "gift_ledger_write_blocked_by_210b_final_handoff",
    httpStatus: 423,
    blockedReason: "210B does not write the gift ledger; ledger writes require separate exact owner approval.",
    giftLedgerRuntimeWriteExecuted: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BEligibilityDecisionRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "eligibility_runtime_decision_blocked_by_210b_final_handoff",
    httpStatus: 423,
    blockedReason: "210B locks eligibility/risk/compliance boundaries only; runtime decisions require separate exact owner approval.",
    eligibilityRuntimeDecisionExecuted: false,
    riskRuntimeDecisionExecuted: false,
    complianceRuntimeDecisionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BAdminRiskToggleRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "admin_risk_toggle_blocked_by_210b_final_handoff",
    httpStatus: 423,
    blockedReason: "210B does not execute Admin risk toggles; toggles require separate exact owner approval and audit evidence.",
    adminRiskToggleExecuted: false,
    riskRuntimeDecisionExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BPayoutRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_VERSION,
    status: "payout_execution_blocked_by_210b_final_handoff",
    httpStatus: 423,
    blockedReason: "210B does not execute payouts; official streamer payout requires separate approval, provider readiness, compliance, and settlement controls.",
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function assertStreamGiftLedgerEligibilityRiskFinalHandoff210BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.sendIntentRuntimeExecutionExecuted !== false ||
    safety.giftLedgerRuntimeWriteExecuted !== false ||
    safety.eligibilityRuntimeDecisionExecuted !== false ||
    safety.riskRuntimeDecisionExecuted !== false ||
    safety.complianceRuntimeDecisionExecuted !== false ||
    safety.adminRiskToggleExecuted !== false ||
    safety.providerRuntimeEnabled !== false ||
    safety.walletMutationExecuted !== false ||
    safety.paymentCaptureExecuted !== false ||
    safety.payoutExecutionExecuted !== false ||
    safety.dbReadExecuted !== false ||
    safety.dbWriteExecuted !== false ||
    safety.prismaGenerateExecuted !== false ||
    safety.realtimeEmitExecuted !== false
  ) {
    throw new Error("210B safety invariant violated");
  }
  return true;
}
