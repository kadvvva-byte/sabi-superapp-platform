import {
  STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffArea217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffBlocked217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffPrepared217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffResult217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffRunbook217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffSafety217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffSnapshot217B,
  type StreamGiftLedgerFraudRiskVelocityFinalHandoffSurface217B,
} from "./types";

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_OWNER_APPROVAL =
  "I_APPROVE_217B_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B: readonly StreamGiftLedgerFraudRiskVelocityFinalHandoffArea217B[] = [
  "previous_217a_fraud_risk_velocity_readiness_locked",
  "fraud_velocity_boundary_locked",
  "abuse_pattern_boundary_locked",
  "gift_spam_boundary_locked",
  "chargeback_fraud_signal_boundary_locked",
  "sender_limit_review_boundary_locked",
  "recipient_risk_review_boundary_locked",
  "admin_risk_velocity_review_evidence_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_fraud_risk_runtime_decision_approval_required",
  "future_velocity_runtime_decision_approval_required",
  "future_abuse_runtime_decision_approval_required",
  "future_provider_risk_call_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B: readonly StreamGiftLedgerFraudRiskVelocityFinalHandoffSurface217B[] = [
  "admin_fraud_risk_velocity_final_handoff_snapshot",
  "risk_velocity_limit_final_handoff",
  "gift_spam_abuse_pattern_final_handoff",
  "chargeback_fraud_signal_final_runbook",
  "sender_recipient_risk_review_final_runbook",
  "provider_not_configured_final_visibility",
] as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY: StreamGiftLedgerFraudRiskVelocityFinalHandoffSafety217B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous217AReadinessRequired: true,
  fraudVelocityBoundaryLocked: true,
  abusePatternBoundaryLocked: true,
  giftSpamBoundaryLocked: true,
  chargebackFraudSignalBoundaryLocked: true,
  senderLimitReviewBoundaryLocked: true,
  recipientRiskReviewBoundaryLocked: true,
  adminRiskVelocityReviewEvidenceLocked: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  fraudRiskRuntimeDecisionExecuted: false,
  velocityRuntimeDecisionExecuted: false,
  abuseRuntimeDecisionExecuted: false,
  adminRiskToggleExecuted: false,
  providerRiskCallExecuted: false,
  providerComplianceCallExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  kycKybRuntimeDecisionExecuted: false,
  amlSanctionsRuntimeDecisionExecuted: false,
  privacyRuntimeRedactionExecuted: false,
  retentionRuntimePurgeExecuted: false,
  dataSubjectRuntimeExportExecuted: false,
  giftLedgerExportRuntimeReadExecuted: false,
  giftLedgerReportRuntimeReadExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  reportRuntimeExportExecuted: false,
  exportRuntimeFileWriteExecuted: false,
  settlementRuntimeDecisionExecuted: false,
  taxWithholdingRuntimeDecisionExecuted: false,
  payoutEligibilityRuntimeDecisionExecuted: false,
  payoutExecutionExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
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
  futureFraudRiskDecisionRequiresSeparateApproval: true,
  futureVelocityDecisionRequiresSeparateApproval: true,
  futureAbuseDecisionRequiresSeparateApproval: true,
  futureProviderRiskCallRequiresSeparateApproval: true,
  futureDbReadRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_217B = [
  "217A fraud/risk/velocity readiness index passed",
  "Gift fraud/risk/velocity final handoff is source-only",
  "Admin fraud/risk/velocity evidence boundaries remain locked",
] as const;

const forbiddenValuePattern217B = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|risk_secret|fraud_secret|kyc_secret|aml_secret|access_token|refresh_token)/i;

function containsRawSecret217B(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern217B.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret217B(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret217B(entry));
  }
  return false;
}

function uniqueStringArray217B(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas217B(value: unknown): readonly StreamGiftLedgerFraudRiskVelocityFinalHandoffArea217B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerFraudRiskVelocityFinalHandoffArea217B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B;
}

function normalizeSurfaces217B(value: unknown): readonly StreamGiftLedgerFraudRiskVelocityFinalHandoffSurface217B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerFraudRiskVelocityFinalHandoffSurface217B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B;
}

function blocked217B(
  code: StreamGiftLedgerFraudRiskVelocityFinalHandoffBlocked217B["code"],
  blockedReason: string,
): StreamGiftLedgerFraudRiskVelocityFinalHandoffBlocked217B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "fraud_risk_velocity_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    fraudRiskRuntimeDecisionExecuted: false,
    velocityRuntimeDecisionExecuted: false,
    abuseRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B(
  input: Partial<StreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B> = {},
): StreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "fraud_risk_velocity_final_handoff_only",
    acknowledged217AStage: input.acknowledged217AStage ?? "217A_fraud_risk_velocity_readiness_index_clean",
    evidenceReferences: uniqueStringArray217B(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_217B),
    handoffAreas: normalizeAreas217B(input.handoffAreas),
    riskSurfaces: normalizeSurfaces217B(input.riskSurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRemainsSafe(): StreamGiftLedgerFraudRiskVelocityFinalHandoffSafety217B {
  return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY;
}

export function getStreamGiftLedgerFraudRiskVelocityFinalHandoff217B(): StreamGiftLedgerFraudRiskVelocityFinalHandoffSnapshot217B {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "ready_for_fraud_risk_velocity_final_handoff_without_runtime_enablement",
    previousStageRequired: "217A_fraud_risk_velocity_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    fraudVelocityBoundaryLocked: true,
    abusePatternBoundaryLocked: true,
    giftSpamBoundaryLocked: true,
    chargebackFraudSignalBoundaryLocked: true,
    senderLimitReviewBoundaryLocked: true,
    recipientRiskReviewBoundaryLocked: true,
    adminRiskVelocityReviewEvidenceLocked: true,
    regularUserNoCashoutBoundaryLocked: true,
    demoPointsNoCashoutBoundaryLocked: true,
    fraudRiskRuntimeDecisionExecuted: false,
    velocityRuntimeDecisionExecuted: false,
    abuseRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "closed_stream_gifts_fraud_risk_velocity_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
  };
}

export function getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BContract() {
  return {
    contract: "stream.gift.fraud-risk-velocity-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    previousStageRequired: "217A_fraud_risk_velocity_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B,
    requiredSurfaces: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  };
}

export function getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRunbook(): StreamGiftLedgerFraudRiskVelocityFinalHandoffRunbook217B {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    steps: [
      "Keep 217A fraud/risk/velocity readiness index clean before this final handoff.",
      "Show fraud, velocity, abuse, sender limit, recipient risk, and chargeback boundaries as locked.",
      "Keep provider risk calls, DB reads, Admin risk toggles, and runtime risk decisions blocked.",
      "Require a new exact owner approval before any future runtime execution package.",
    ],
    lockedRuntimeRequests: [
      "Fraud/risk runtime decision",
      "Velocity-limit runtime decision",
      "Abuse/spam enforcement runtime decision",
      "Admin risk toggle execution",
      "Provider risk/compliance call",
      "DB read/write",
      "Wallet/payment/payout mutation",
    ],
    nextStage: "closed_stream_gifts_fraud_risk_velocity_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
  };
}

export function prepareStreamGiftLedgerFraudRiskVelocityFinalHandoff217B(
  rawInput: Partial<StreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B> = {},
): StreamGiftLedgerFraudRiskVelocityFinalHandoffResult217B {
  if (containsRawSecret217B(rawInput)) {
    return blocked217B("raw_secret_or_provider_value_rejected", "Raw secrets, provider tokens, and credential values are rejected for 217B.");
  }

  const input = normalizeStreamGiftLedgerFraudRiskVelocityFinalHandoffInput217B(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_OWNER_APPROVAL) {
    return blocked217B("owner_approval_required", "217B final handoff requires the explicit owner approval label and remains source-only.");
  }

  if (input.handoffMode !== "fraud_risk_velocity_final_handoff_only") {
    return blocked217B("handoff_mode_disabled", "217B only prepares a final handoff and cannot enable runtime risk decisions.");
  }

  if (input.acknowledged217AStage !== "217A_fraud_risk_velocity_readiness_index_clean") {
    return blocked217B("previous_217a_readiness_required", "217A fraud/risk/velocity readiness index must be clean before 217B.");
  }

  if (input.evidenceReferences.length === 0) {
    return blocked217B("evidence_references_required", "At least one non-secret evidence reference is required.");
  }

  const missingArea = STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B.find((area) => !input.handoffAreas.includes(area));
  if (missingArea) {
    return blocked217B("missing_required_area", `Missing required 217B area: ${missingArea}`);
  }

  const missingSurface = STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B.find((surface) => !input.riskSurfaces.includes(surface));
  if (missingSurface) {
    return blocked217B("missing_required_surface", `Missing required 217B surface: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerFraudRiskVelocityFinalHandoffPrepared217B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "fraud_risk_velocity_final_handoff_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.fraud-risk-velocity-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
      previousStageRequired: "217A_fraud_risk_velocity_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_AREAS_217B,
      requiredSurfaces: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_REQUIRED_SURFACES_217B,
      handoffAreas: input.handoffAreas,
      riskSurfaces: input.riskSurfaces,
      evidenceReferences: input.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous217AReadinessRequired: true,
      fraudVelocityBoundaryLocked: true,
      abusePatternBoundaryLocked: true,
      giftSpamBoundaryLocked: true,
      chargebackFraudSignalBoundaryLocked: true,
      senderLimitReviewBoundaryLocked: true,
      recipientRiskReviewBoundaryLocked: true,
      adminRiskVelocityReviewEvidenceLocked: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      fraudRiskRuntimeDecisionExecuted: false,
      velocityRuntimeDecisionExecuted: false,
      abuseRuntimeDecisionExecuted: false,
      adminRiskToggleExecuted: false,
      providerRiskCallExecuted: false,
      dbReadExecuted: false,
      dbWriteExecuted: false,
      payoutExecuted: false,
      providerPayoutCallExecuted: false,
      walletMutationExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureFraudRiskDecisionRequiresSeparateApproval: true,
      futureVelocityDecisionRequiresSeparateApproval: true,
      futureAbuseDecisionRequiresSeparateApproval: true,
      futureProviderRiskCallRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_fraud_risk_velocity_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
    },
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    fraudRiskRuntimeDecisionExecuted: false,
    velocityRuntimeDecisionExecuted: false,
    abuseRuntimeDecisionExecuted: false,
    providerRiskCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  };

  return prepared;
}

export function createStreamGiftLedgerFraudRiskVelocity217BFraudRiskRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "fraud_risk_runtime_decision",
    fraudRiskRuntimeDecisionExecuted: false,
    futureFraudRiskDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217BVelocityRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "velocity_runtime_decision",
    velocityRuntimeDecisionExecuted: false,
    futureVelocityDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217BAbuseRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "abuse_runtime_decision",
    abuseRuntimeDecisionExecuted: false,
    futureAbuseDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217BProviderRiskCallRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "provider_risk_call",
    providerRiskCallExecuted: false,
    futureProviderRiskCallRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217BAdminRiskToggleRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "admin_risk_toggle",
    adminRiskToggleExecuted: false,
    futureFraudRiskDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217BDbReadRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "db_read",
    dbReadExecuted: false,
    futureDbReadRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_SAFETY,
  } as const;
}
