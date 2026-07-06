import {
  STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
  type StreamGiftLedgerEligibilityRiskReadinessArea210A,
  type StreamGiftLedgerEligibilityRiskReadinessBlocked210A,
  type StreamGiftLedgerEligibilityRiskReadinessInput210A,
  type StreamGiftLedgerEligibilityRiskReadinessPrepared210A,
  type StreamGiftLedgerEligibilityRiskReadinessResult210A,
  type StreamGiftLedgerEligibilityRiskReadinessSafety210A,
  type StreamGiftLedgerEligibilityRiskReadinessSnapshot210A,
} from "./types";

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_OWNER_APPROVAL =
  "I_APPROVE_210A_STREAM_GIFTS_ELIGIBILITY_RISK_COMPLIANCE_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_SURFACES_210A = [
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

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_AREAS_210A: readonly StreamGiftLedgerEligibilityRiskReadinessArea210A[] = [
  "previous_209b_send_intent_audit_handoff_locked",
  "previous_208b_admin_controls_handoff_locked",
  "provider_not_configured_visibility_locked",
  "gift_quote_contract_locked",
  "gift_send_intent_contract_locked",
  "gift_receipt_contract_locked",
  "gift_ledger_audit_boundary_locked",
  "sender_identity_eligibility_boundary_visible",
  "recipient_identity_eligibility_boundary_visible",
  "age_gate_boundary_visible",
  "region_gate_boundary_visible",
  "compliance_kyc_kyb_boundary_visible",
  "fraud_risk_scoring_boundary_visible",
  "demo_points_no_cashout_boundary_visible",
  "diamonds_paid_future_deferred_boundary_visible",
  "official_streamer_payout_eligibility_boundary_visible",
  "regular_user_no_cashout_boundary_visible",
  "admin_risk_review_evidence_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_SAFETY: StreamGiftLedgerEligibilityRiskReadinessSafety210A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous209BHandoffRequired: true,
  giftQuoteContractLocked: true,
  giftSendIntentContractLocked: true,
  giftReceiptContractLocked: true,
  giftLedgerAuditBoundaryLocked: true,
  senderEligibilityBoundaryVisible: true,
  recipientEligibilityBoundaryVisible: true,
  ageGateBoundaryVisible: true,
  regionGateBoundaryVisible: true,
  complianceKycKybBoundaryVisible: true,
  fraudRiskScoringBoundaryVisible: true,
  demoPointsNoCashoutBoundaryVisible: true,
  diamondsPaidFutureDeferredBoundaryVisible: true,
  officialStreamerPayoutEligibilityBoundaryVisible: true,
  regularUserNoCashoutBoundaryVisible: true,
  adminRiskReviewEvidenceRequired: true,
  sendIntentExecutionAllowedNow: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  eligibilityRuntimeDecisionExecuted: false,
  riskRuntimeDecisionExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  adminRiskToggleExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
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

const RAW_SECRET_PATTERNS_210A = [
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

function normalizeAreaArray(value: readonly StreamGiftLedgerEligibilityRiskReadinessArea210A[] | undefined): readonly StreamGiftLedgerEligibilityRiskReadinessArea210A[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StreamGiftLedgerEligibilityRiskReadinessArea210A =>
    STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_AREAS_210A.includes(item),
  );
}

function hasRawSecret(value: unknown): boolean {
  const text = JSON.stringify(value ?? "");
  return RAW_SECRET_PATTERNS_210A.some((pattern) => pattern.test(text));
}

function blocked210A(
  code: StreamGiftLedgerEligibilityRiskReadinessBlocked210A["code"],
  blockedReason: string,
): StreamGiftLedgerEligibilityRiskReadinessBlocked210A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "eligibility_risk_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerEligibilityRiskReadinessInput210A(
  input: StreamGiftLedgerEligibilityRiskReadinessInput210A,
): StreamGiftLedgerEligibilityRiskReadinessInput210A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode,
    acknowledged209BStage: input.acknowledged209BStage,
    evidenceReferences: normalizeTextArray(input.evidenceReferences),
    readinessAreas: normalizeAreaArray(input.readinessAreas),
    riskSurfaces: normalizeTextArray(input.riskSurfaces),
    operatorNote: input.operatorNote?.trim(),
  };
}

export function prepareStreamGiftLedgerEligibilityRiskReadiness210A(
  input: StreamGiftLedgerEligibilityRiskReadinessInput210A,
): StreamGiftLedgerEligibilityRiskReadinessResult210A {
  const normalized = normalizeStreamGiftLedgerEligibilityRiskReadinessInput210A(input);

  if (hasRawSecret(normalized)) {
    return blocked210A("raw_secret_or_provider_value_rejected", "Raw secrets, provider tokens, private keys, and credential values are rejected by this readiness index.");
  }
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_OWNER_APPROVAL) {
    return blocked210A("owner_approval_required", "Exact 210A owner approval phrase is required for readiness-index generation only.");
  }
  if (normalized.readinessMode !== "eligibility_risk_readiness_index_only") {
    return blocked210A("readiness_mode_disabled", "210A only prepares a safe-disabled eligibility/risk/compliance readiness index.");
  }
  if (normalized.acknowledged209BStage !== "209B_send_intent_audit_final_handoff_clean") {
    return blocked210A("previous_209b_handoff_required", "209B final handoff must be clean before 210A readiness can be prepared.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked210A("evidence_references_required", "Evidence references are required; do not include secrets or provider credentials.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked210A("readiness_areas_required", "Eligibility/risk readiness areas are required.");
  }
  if (normalized.riskSurfaces.length === 0) {
    return blocked210A("risk_surfaces_required", "Risk/compliance surfaces are required.");
  }

  const missingArea = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_AREAS_210A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked210A("missing_required_area", `Required eligibility/risk readiness area is missing: ${missingArea}`);
  }

  const missingSurface = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_SURFACES_210A.find((surface) => !normalized.riskSurfaces.includes(surface));
  if (missingSurface) {
    return blocked210A("required_risk_surface_missing", `Required risk/compliance surface is missing: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerEligibilityRiskReadinessPrepared210A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "eligibility_risk_readiness_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.eligibility-risk-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
      previousStageRequired: "209B_send_intent_audit_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_AREAS_210A,
      readinessAreas: normalized.readinessAreas,
      evidenceReferences: normalized.evidenceReferences,
      riskSurfaces: normalized.riskSurfaces,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous209BHandoffRequired: true,
      giftQuoteContractLocked: true,
      giftSendIntentContractLocked: true,
      giftReceiptContractLocked: true,
      giftLedgerAuditBoundaryLocked: true,
      senderEligibilityBoundaryVisible: true,
      recipientEligibilityBoundaryVisible: true,
      ageGateBoundaryVisible: true,
      regionGateBoundaryVisible: true,
      complianceKycKybBoundaryVisible: true,
      fraudRiskScoringBoundaryVisible: true,
      demoPointsNoCashoutBoundaryVisible: true,
      diamondsPaidFutureDeferredBoundaryVisible: true,
      officialStreamerPayoutEligibilityBoundaryVisible: true,
      regularUserNoCashoutBoundaryVisible: true,
      adminRiskReviewEvidenceRequired: true,
      sendIntentExecutionAllowedNow: false,
      sendIntentRuntimeExecutionExecuted: false,
      giftReceiptRuntimeWriteExecuted: false,
      giftLedgerRuntimeWriteExecuted: false,
      giftDeliveryRealtimeEmitExecuted: false,
      eligibilityRuntimeDecisionExecuted: false,
      riskRuntimeDecisionExecuted: false,
      complianceRuntimeDecisionExecuted: false,
      adminRiskToggleExecuted: false,
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
      nextStage: "210B_stream_gifts_eligibility_risk_compliance_final_handoff",
    },
    readinessIndexPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerEligibilityRiskReadiness210A(): StreamGiftLedgerEligibilityRiskReadinessSnapshot210A {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "ready_for_eligibility_risk_readiness_without_runtime_enablement",
    previousStageRequired: "209B_send_intent_audit_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previous209BHandoffRequired: true,
    senderEligibilityBoundaryVisible: true,
    recipientEligibilityBoundaryVisible: true,
    ageGateBoundaryVisible: true,
    regionGateBoundaryVisible: true,
    complianceKycKybBoundaryVisible: true,
    fraudRiskScoringBoundaryVisible: true,
    demoPointsNoCashoutBoundaryVisible: true,
    officialStreamerPayoutEligibilityBoundaryVisible: true,
    regularUserNoCashoutBoundaryVisible: true,
    adminRiskReviewEvidenceRequired: true,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "210B_stream_gifts_eligibility_risk_compliance_final_handoff",
    safety: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_SAFETY,
  };
}

export function getStreamGiftLedgerEligibilityRiskReadiness210AContract() {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    contract: "stream.gift.eligibility-risk-readiness.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_OWNER_APPROVAL,
    previousStageRequired: "209B_send_intent_audit_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_AREAS_210A,
    requiredRiskSurfaces: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_REQUIRED_SURFACES_210A,
    runtimeExecutionApprovedNow: false,
    sendIntentExecutionAllowedNow: false,
    giftLedgerRuntimeWriteExecuted: false,
    providerRuntimeEnabled: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    sourceOnly: true,
  } as const;
}

export function getStreamGiftLedgerEligibilityRiskReadiness210ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    steps: [
      "Confirm 209B final handoff and TypeScript check are clean.",
      "Review sender and recipient eligibility boundaries without reading secrets.",
      "Review age, region, and compliance/KYC/KYB boundaries without runtime decisions.",
      "Review fraud/risk/admin audit evidence boundaries without DB writes.",
      "Keep send execution, ledger write, Wallet payment, payout, provider calls, realtime delivery, and runtime enablement blocked.",
    ],
    forbiddenActions: [
      "Do not read .env or credential values.",
      "Do not execute send-intent or write gift ledger rows.",
      "Do not mutate Wallet, capture payment, or execute payout.",
      "Do not call providers or enable runtime binding.",
      "Do not run Prisma generate, migrations, DB reads, DB writes, or realtime emits.",
    ],
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskReadiness210ASendIntentRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "send_intent_execution_blocked_by_210a_readiness_index",
    httpStatus: 423,
    blockedReason: "210A is readiness-index only; send-intent execution requires separate exact owner approval.",
    sendIntentRuntimeExecutionExecuted: false,
    giftLedgerRuntimeWriteExecuted: false,
    walletMutationExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskReadiness210ALedgerWriteRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "gift_ledger_write_blocked_by_210a_readiness_index",
    httpStatus: 423,
    blockedReason: "210A does not write the gift ledger; ledger writes require separate exact owner approval.",
    giftLedgerRuntimeWriteExecuted: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskReadiness210AEligibilityDecisionRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "eligibility_runtime_decision_blocked_by_210a_readiness_index",
    httpStatus: 423,
    blockedReason: "210A exposes eligibility/risk/compliance readiness only; runtime decisions require separate exact owner approval.",
    eligibilityRuntimeDecisionExecuted: false,
    riskRuntimeDecisionExecuted: false,
    complianceRuntimeDecisionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamGiftLedgerEligibilityRiskReadiness210APayoutRequest() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_VERSION,
    status: "payout_execution_blocked_by_210a_readiness_index",
    httpStatus: 423,
    blockedReason: "210A does not execute payouts; official streamer payout requires separate approval, provider readiness, compliance, and settlement controls.",
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function assertStreamGiftLedgerEligibilityRiskReadiness210ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.sendIntentRuntimeExecutionExecuted !== false ||
    safety.giftLedgerRuntimeWriteExecuted !== false ||
    safety.eligibilityRuntimeDecisionExecuted !== false ||
    safety.riskRuntimeDecisionExecuted !== false ||
    safety.complianceRuntimeDecisionExecuted !== false ||
    safety.providerRuntimeEnabled !== false ||
    safety.walletMutationExecuted !== false ||
    safety.paymentCaptureExecuted !== false ||
    safety.payoutExecutionExecuted !== false ||
    safety.dbReadExecuted !== false ||
    safety.dbWriteExecuted !== false ||
    safety.prismaGenerateExecuted !== false ||
    safety.realtimeEmitExecuted !== false
  ) {
    throw new Error("210A safety invariant violated");
  }
  return true;
}
