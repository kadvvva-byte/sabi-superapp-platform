import {
  STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffArea216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffBlocked216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffInput216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffPrepared216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffResult216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffRunbook216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffSafety216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffSnapshot216B,
  type StreamGiftLedgerComplianceEvidenceFinalHandoffSurface216B,
} from "./types";

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_OWNER_APPROVAL =
  "I_APPROVE_216B_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B: readonly StreamGiftLedgerComplianceEvidenceFinalHandoffArea216B[] = [
  "previous_216a_compliance_evidence_readiness_locked",
  "kyc_evidence_boundary_locked",
  "kyb_evidence_boundary_locked",
  "aml_screening_evidence_boundary_locked",
  "sanctions_screening_evidence_boundary_locked",
  "age_region_compliance_evidence_boundary_locked",
  "official_streamer_agreement_evidence_locked",
  "admin_compliance_review_evidence_locked",
  "future_compliance_runtime_decision_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B: readonly StreamGiftLedgerComplianceEvidenceFinalHandoffSurface216B[] = [
  "admin_compliance_final_handoff_snapshot",
  "kyc_kyb_evidence_final_handoff",
  "aml_sanctions_evidence_final_handoff",
  "age_region_compliance_final_runbook",
  "official_streamer_agreement_final_runbook",
  "provider_not_configured_final_visibility",
] as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY: StreamGiftLedgerComplianceEvidenceFinalHandoffSafety216B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous216AReadinessRequired: true,
  kycEvidenceBoundaryLocked: true,
  kybEvidenceBoundaryLocked: true,
  amlScreeningEvidenceBoundaryLocked: true,
  sanctionsScreeningEvidenceBoundaryLocked: true,
  ageRegionComplianceEvidenceBoundaryLocked: true,
  officialStreamerAgreementEvidenceLocked: true,
  adminComplianceReviewEvidenceLocked: true,
  complianceRuntimeDecisionExecuted: false,
  kycKybRuntimeDecisionExecuted: false,
  amlSanctionsRuntimeDecisionExecuted: false,
  providerComplianceCallExecuted: false,
  providerKycCallExecuted: false,
  providerAmlCallExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
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
  futureComplianceDecisionRequiresSeparateApproval: true,
  futureKycKybDecisionRequiresSeparateApproval: true,
  futureAmlSanctionsDecisionRequiresSeparateApproval: true,
  futureProviderComplianceCallRequiresSeparateApproval: true,
  futureDbReadRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_216B = [
  "216A compliance evidence readiness index passed",
  "Compliance evidence final handoff is source-only",
  "Compliance/KYC/KYB/AML/sanctions decisions remain disabled",
] as const;

const forbiddenValuePattern216B = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|kyc_secret|aml_secret|access_token|refresh_token)/i;

function containsRawSecret216B(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern216B.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret216B(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret216B(entry));
  }
  return false;
}

function uniqueStringArray216B(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas216B(value: unknown): readonly StreamGiftLedgerComplianceEvidenceFinalHandoffArea216B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerComplianceEvidenceFinalHandoffArea216B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B;
}

function normalizeSurfaces216B(value: unknown): readonly StreamGiftLedgerComplianceEvidenceFinalHandoffSurface216B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerComplianceEvidenceFinalHandoffSurface216B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B;
}

function blocked216B(
  code: StreamGiftLedgerComplianceEvidenceFinalHandoffBlocked216B["code"],
  blockedReason: string,
): StreamGiftLedgerComplianceEvidenceFinalHandoffBlocked216B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    status: "compliance_evidence_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerComplianceEvidenceFinalHandoffInput216B(
  input: Partial<StreamGiftLedgerComplianceEvidenceFinalHandoffInput216B> = {},
): StreamGiftLedgerComplianceEvidenceFinalHandoffInput216B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "compliance_evidence_final_handoff_only",
    acknowledged216AStage: input.acknowledged216AStage ?? "216A_compliance_evidence_readiness_index_clean",
    evidenceReferences: uniqueStringArray216B(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_216B),
    handoffAreas: normalizeAreas216B(input.handoffAreas),
    complianceSurfaces: normalizeSurfaces216B(input.complianceSurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerComplianceEvidenceFinalHandoff216BRemainsSafe(): StreamGiftLedgerComplianceEvidenceFinalHandoffSafety216B {
  return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY;
}

export function getStreamGiftLedgerComplianceEvidenceFinalHandoff216B(): StreamGiftLedgerComplianceEvidenceFinalHandoffSnapshot216B {
  return {
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    status: "ready_for_compliance_evidence_final_handoff_without_runtime_enablement",
    previousStageRequired: "216A_compliance_evidence_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    kycEvidenceBoundaryLocked: true,
    kybEvidenceBoundaryLocked: true,
    amlScreeningEvidenceBoundaryLocked: true,
    sanctionsScreeningEvidenceBoundaryLocked: true,
    ageRegionComplianceEvidenceBoundaryLocked: true,
    officialStreamerAgreementEvidenceLocked: true,
    adminComplianceReviewEvidenceLocked: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "closed_stream_gifts_compliance_evidence_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
  };
}

export function getStreamGiftLedgerComplianceEvidenceFinalHandoff216BContract() {
  return {
    contract: "stream.gift.compliance-evidence-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    requiredAreas: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B,
    requiredSurfaces: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B,
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY,
  } as const;
}

export function prepareStreamGiftLedgerComplianceEvidenceFinalHandoff216B(
  input: Partial<StreamGiftLedgerComplianceEvidenceFinalHandoffInput216B> = {},
): StreamGiftLedgerComplianceEvidenceFinalHandoffResult216B {
  const normalized = normalizeStreamGiftLedgerComplianceEvidenceFinalHandoffInput216B(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_OWNER_APPROVAL) {
    return blocked216B("owner_approval_required", "216B final handoff requires the exact owner approval string.");
  }
  if (normalized.handoffMode !== "compliance_evidence_final_handoff_only") {
    return blocked216B("handoff_mode_disabled", "216B cannot enable compliance decisions, provider calls, DB reads, or runtime execution.");
  }
  if (normalized.acknowledged216AStage !== "216A_compliance_evidence_readiness_index_clean") {
    return blocked216B("previous_216a_readiness_required", "216A compliance evidence readiness index must be clean first.");
  }
  if (containsRawSecret216B(normalized)) {
    return blocked216B("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are rejected.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked216B("evidence_references_required", "Evidence references are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B.find((area) => !normalized.handoffAreas.includes(area));
  if (missingArea) {
    return blocked216B("missing_required_area", `Missing required handoff area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B.find((surface) => !normalized.complianceSurfaces.includes(surface));
  if (missingSurface) {
    return blocked216B("missing_required_surface", `Missing required compliance surface: ${missingSurface}`);
  }
  const prepared: StreamGiftLedgerComplianceEvidenceFinalHandoffPrepared216B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    status: "compliance_evidence_final_handoff_prepared_without_runtime_enablement",
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    envelope: {
      contract: "stream.gift.compliance-evidence-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
      previousStageRequired: "216A_compliance_evidence_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_AREAS_216B,
      requiredSurfaces: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_REQUIRED_SURFACES_216B,
      handoffAreas: normalized.handoffAreas,
      complianceSurfaces: normalized.complianceSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous216AReadinessRequired: true,
      kycEvidenceBoundaryLocked: true,
      kybEvidenceBoundaryLocked: true,
      amlScreeningEvidenceBoundaryLocked: true,
      sanctionsScreeningEvidenceBoundaryLocked: true,
      ageRegionComplianceEvidenceBoundaryLocked: true,
      officialStreamerAgreementEvidenceLocked: true,
      adminComplianceReviewEvidenceLocked: true,
      complianceRuntimeDecisionExecuted: false,
      kycKybRuntimeDecisionExecuted: false,
      amlSanctionsRuntimeDecisionExecuted: false,
      providerComplianceCallExecuted: false,
      providerKycCallExecuted: false,
      providerAmlCallExecuted: false,
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
      futureComplianceDecisionRequiresSeparateApproval: true,
      futureKycKybDecisionRequiresSeparateApproval: true,
      futureAmlSanctionsDecisionRequiresSeparateApproval: true,
      futureProviderComplianceCallRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_compliance_evidence_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
    },
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY,
  };
  return prepared;
}

export function getStreamGiftLedgerComplianceEvidenceFinalHandoff216BRunbook(): StreamGiftLedgerComplianceEvidenceFinalHandoffRunbook216B {
  return {
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    steps: [
      "Confirm 216A compliance evidence readiness index is clean.",
      "Lock KYC/KYB, AML, sanctions, age/region, and streamer agreement evidence boundaries.",
      "Keep all compliance decisions, provider compliance calls, DB reads, Wallet mutation, payout execution, and runtime execution disabled.",
      "Use a new exact owner approval and a separate execution package before any runtime decision, provider call, DB read, payout, or Wallet mutation.",
    ],
    lockedRuntimeRequests: [
      "compliance-runtime-decision-request",
      "kyc-kyb-runtime-decision-request",
      "aml-sanctions-runtime-decision-request",
      "provider-compliance-call-request",
      "db-read-request",
    ],
    nextStage: "closed_stream_gifts_compliance_evidence_future_decisions_provider_db_or_runtime_require_exact_owner_approval",
  };
}

function lockedRequest216B(requestType: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_VERSION,
    status: "locked_requires_separate_exact_owner_approval" as const,
    requestType,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    complianceRuntimeDecisionExecuted: false,
    kycKybRuntimeDecisionExecuted: false,
    amlSanctionsRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BComplianceRuntimeDecisionRequest() {
  return lockedRequest216B("compliance_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BKycKybRuntimeDecisionRequest() {
  return lockedRequest216B("kyc_kyb_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BAmlSanctionsRuntimeDecisionRequest() {
  return lockedRequest216B("aml_sanctions_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BProviderComplianceCallRequest() {
  return lockedRequest216B("provider_compliance_call_request");
}

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BDbReadRequest() {
  return lockedRequest216B("db_read_request");
}
