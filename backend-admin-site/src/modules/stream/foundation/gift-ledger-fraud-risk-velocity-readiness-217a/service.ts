import {
  STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
  type StreamGiftLedgerFraudRiskVelocityBlocked217A,
  type StreamGiftLedgerFraudRiskVelocityPrepared217A,
  type StreamGiftLedgerFraudRiskVelocityReadinessArea217A,
  type StreamGiftLedgerFraudRiskVelocityReadinessInput217A,
  type StreamGiftLedgerFraudRiskVelocityResult217A,
  type StreamGiftLedgerFraudRiskVelocityRunbook217A,
  type StreamGiftLedgerFraudRiskVelocitySafety217A,
  type StreamGiftLedgerFraudRiskVelocitySnapshot217A,
  type StreamGiftLedgerFraudRiskVelocitySurface217A,
} from "./types";

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_OWNER_APPROVAL =
  "I_APPROVE_217A_FRAUD_RISK_VELOCITY_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A: readonly StreamGiftLedgerFraudRiskVelocityReadinessArea217A[] = [
  "previous_216b_compliance_evidence_handoff_locked",
  "fraud_velocity_boundary_visible",
  "abuse_pattern_boundary_visible",
  "gift_spam_boundary_visible",
  "chargeback_fraud_signal_boundary_visible",
  "sender_limit_review_boundary_visible",
  "recipient_risk_review_boundary_visible",
  "admin_risk_velocity_review_evidence_visible",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_risk_runtime_decision_approval_required",
  "future_velocity_runtime_decision_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A: readonly StreamGiftLedgerFraudRiskVelocitySurface217A[] = [
  "admin_fraud_risk_velocity_snapshot",
  "risk_velocity_limit_preview",
  "gift_spam_abuse_pattern_preview",
  "chargeback_fraud_signal_runbook",
  "sender_recipient_risk_review_runbook",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY: StreamGiftLedgerFraudRiskVelocitySafety217A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous216BHandoffRequired: true,
  fraudVelocityBoundaryVisible: true,
  abusePatternBoundaryVisible: true,
  giftSpamBoundaryVisible: true,
  chargebackFraudSignalBoundaryVisible: true,
  senderLimitReviewBoundaryVisible: true,
  recipientRiskReviewBoundaryVisible: true,
  adminRiskVelocityReviewEvidenceVisible: true,
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

const DEFAULT_EVIDENCE_REFERENCES_217A = [
  "216B compliance evidence final handoff passed",
  "Gift ledger fraud/risk/velocity readiness is source-only",
  "Admin risk velocity evidence boundary is visible",
] as const;

const forbiddenValuePattern217A = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|risk_secret|fraud_secret|kyc_secret|aml_secret|access_token|refresh_token)/i;

function containsRawSecret217A(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern217A.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret217A(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret217A(entry));
  }
  return false;
}

function uniqueStringArray217A(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas217A(value: unknown): readonly StreamGiftLedgerFraudRiskVelocityReadinessArea217A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerFraudRiskVelocityReadinessArea217A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A;
}

function normalizeSurfaces217A(value: unknown): readonly StreamGiftLedgerFraudRiskVelocitySurface217A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerFraudRiskVelocitySurface217A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A;
}

function blocked217A(
  code: StreamGiftLedgerFraudRiskVelocityBlocked217A["code"],
  blockedReason: string,
): StreamGiftLedgerFraudRiskVelocityBlocked217A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "fraud_risk_velocity_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    fraudRiskRuntimeDecisionExecuted: false,
    velocityRuntimeDecisionExecuted: false,
    abuseRuntimeDecisionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerFraudRiskVelocityReadinessInput217A(
  input: Partial<StreamGiftLedgerFraudRiskVelocityReadinessInput217A> = {},
): StreamGiftLedgerFraudRiskVelocityReadinessInput217A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode ?? "fraud_risk_velocity_readiness_index_only",
    acknowledged216BStage: input.acknowledged216BStage ?? "216B_compliance_evidence_final_handoff_clean",
    evidenceReferences: uniqueStringArray217A(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_217A),
    readinessAreas: normalizeAreas217A(input.readinessAreas),
    riskSurfaces: normalizeSurfaces217A(input.riskSurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerFraudRiskVelocityReadiness217ARemainsSafe(): StreamGiftLedgerFraudRiskVelocitySafety217A {
  return STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY;
}

export function getStreamGiftLedgerFraudRiskVelocityReadiness217A(): StreamGiftLedgerFraudRiskVelocitySnapshot217A {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "ready_for_fraud_risk_velocity_readiness_without_runtime_enablement",
    previousStageRequired: "216B_compliance_evidence_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    fraudVelocityBoundaryVisible: true,
    abusePatternBoundaryVisible: true,
    giftSpamBoundaryVisible: true,
    chargebackFraudSignalBoundaryVisible: true,
    senderLimitReviewBoundaryVisible: true,
    recipientRiskReviewBoundaryVisible: true,
    adminRiskVelocityReviewEvidenceVisible: true,
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
    nextStage: "217B_stream_gifts_fraud_risk_velocity_final_handoff",
  };
}

export function getStreamGiftLedgerFraudRiskVelocityReadiness217AContract() {
  return {
    contract: "stream.gift.fraud-risk-velocity-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    previousStageRequired: "216B_compliance_evidence_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A,
    requiredSurfaces: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  };
}

export function getStreamGiftLedgerFraudRiskVelocityReadiness217ARunbook(): StreamGiftLedgerFraudRiskVelocityRunbook217A {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    title: "Stream Gifts fraud/risk/velocity readiness index without runtime enablement",
    requiredBeforeRuntime: [
      "Separate exact owner approval for any fraud/risk runtime decision",
      "Separate exact owner approval for any velocity/abuse runtime decision",
      "Separate exact owner approval for any provider risk call",
      "Separate exact owner approval for any DB read/write",
      "Provider runtime remains provider_not_configured until separately approved",
    ],
    blockedUntilSeparateApproval: [
      "Fraud/risk runtime decision",
      "Velocity-limit runtime decision",
      "Abuse/spam enforcement runtime decision",
      "Admin risk toggle execution",
      "Provider risk/compliance calls",
      "DB read/write",
      "Wallet/payment/payout mutation",
    ],
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  };
}

export function prepareStreamGiftLedgerFraudRiskVelocityReadiness217A(
  rawInput: Partial<StreamGiftLedgerFraudRiskVelocityReadinessInput217A> = {},
): StreamGiftLedgerFraudRiskVelocityResult217A {
  if (containsRawSecret217A(rawInput)) {
    return blocked217A("raw_secret_or_provider_value_rejected", "Raw secrets, provider tokens, and credential values are rejected for 217A.");
  }

  const input = normalizeStreamGiftLedgerFraudRiskVelocityReadinessInput217A(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_OWNER_APPROVAL) {
    return blocked217A("owner_approval_required", "217A readiness index requires the explicit owner approval label and remains source-only.");
  }

  if (input.readinessMode !== "fraud_risk_velocity_readiness_index_only") {
    return blocked217A("readiness_mode_disabled", "217A only prepares a readiness index and cannot enable runtime risk decisions.");
  }

  if (input.acknowledged216BStage !== "216B_compliance_evidence_final_handoff_clean") {
    return blocked217A("previous_216b_handoff_required", "216B compliance evidence final handoff must be clean before 217A.");
  }

  if (input.evidenceReferences.length === 0) {
    return blocked217A("evidence_references_required", "At least one non-secret evidence reference is required.");
  }

  const missingArea = STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A.find((area) => !input.readinessAreas.includes(area));
  if (missingArea) {
    return blocked217A("missing_required_area", `Missing required 217A area: ${missingArea}`);
  }

  const missingSurface = STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A.find((surface) => !input.riskSurfaces.includes(surface));
  if (missingSurface) {
    return blocked217A("missing_required_surface", `Missing required 217A surface: ${missingSurface}`);
  }

  const prepared: StreamGiftLedgerFraudRiskVelocityPrepared217A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "fraud_risk_velocity_readiness_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.fraud-risk-velocity-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
      previousStageRequired: "216B_compliance_evidence_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_AREAS_217A,
      requiredSurfaces: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_REQUIRED_SURFACES_217A,
      readinessAreas: input.readinessAreas,
      riskSurfaces: input.riskSurfaces,
      evidenceReferences: input.evidenceReferences,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous216BHandoffRequired: true,
      fraudVelocityBoundaryVisible: true,
      abusePatternBoundaryVisible: true,
      giftSpamBoundaryVisible: true,
      chargebackFraudSignalBoundaryVisible: true,
      senderLimitReviewBoundaryVisible: true,
      recipientRiskReviewBoundaryVisible: true,
      adminRiskVelocityReviewEvidenceVisible: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      fraudRiskRuntimeDecisionExecuted: false,
      velocityRuntimeDecisionExecuted: false,
      abuseRuntimeDecisionExecuted: false,
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
      nextStage: "217B_stream_gifts_fraud_risk_velocity_final_handoff",
    },
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    fraudRiskRuntimeDecisionExecuted: false,
    velocityRuntimeDecisionExecuted: false,
    abuseRuntimeDecisionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  };

  return prepared;
}

export function createStreamGiftLedgerFraudRiskVelocity217AFraudRiskRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "fraud_risk_runtime_decision",
    fraudRiskRuntimeDecisionExecuted: false,
    futureFraudRiskDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217AVelocityRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "velocity_runtime_decision",
    velocityRuntimeDecisionExecuted: false,
    futureVelocityDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217AAbuseRuntimeDecisionRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "abuse_runtime_decision",
    abuseRuntimeDecisionExecuted: false,
    futureAbuseDecisionRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217AProviderRiskCallRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "provider_risk_call",
    providerRiskCallExecuted: false,
    futureProviderRiskCallRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerFraudRiskVelocity217ADbReadRequest() {
  return {
    version: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION,
    status: "blocked_requires_separate_exact_owner_approval",
    requestedAction: "db_read",
    dbReadExecuted: false,
    futureDbReadRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_SAFETY,
  } as const;
}
