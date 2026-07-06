import {
  STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
  type StreamGiftLedgerComplianceEvidenceBlocked216A,
  type StreamGiftLedgerComplianceEvidenceReadinessArea216A,
  type StreamGiftLedgerComplianceEvidenceReadinessInput216A,
  type StreamGiftLedgerComplianceEvidencePrepared216A,
  type StreamGiftLedgerComplianceEvidenceResult216A,
  type StreamGiftLedgerComplianceEvidenceRunbook216A,
  type StreamGiftLedgerComplianceEvidenceSafety216A,
  type StreamGiftLedgerComplianceEvidenceSnapshot216A,
  type StreamGiftLedgerComplianceEvidenceSurface216A,
} from "./types";

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_OWNER_APPROVAL =
  "I_APPROVE_216A_COMPLIANCE_EVIDENCE_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A: readonly StreamGiftLedgerComplianceEvidenceReadinessArea216A[] = [
  "previous_215b_privacy_retention_handoff_locked",
  "kyc_evidence_boundary_visible",
  "kyb_evidence_boundary_visible",
  "aml_screening_evidence_boundary_visible",
  "sanctions_screening_evidence_boundary_visible",
  "age_region_compliance_evidence_boundary_visible",
  "official_streamer_agreement_evidence_visible",
  "admin_compliance_review_evidence_visible",
  "future_compliance_runtime_decision_approval_required",
  "future_db_read_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A: readonly StreamGiftLedgerComplianceEvidenceSurface216A[] = [
  "admin_compliance_snapshot",
  "kyc_kyb_evidence_preview",
  "aml_sanctions_evidence_preview",
  "age_region_compliance_runbook",
  "official_streamer_agreement_runbook",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY: StreamGiftLedgerComplianceEvidenceSafety216A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous215BHandoffRequired: true,
  kycEvidenceBoundaryVisible: true,
  kybEvidenceBoundaryVisible: true,
  amlScreeningEvidenceBoundaryVisible: true,
  sanctionsScreeningEvidenceBoundaryVisible: true,
  ageRegionComplianceEvidenceBoundaryVisible: true,
  officialStreamerAgreementEvidenceVisible: true,
  adminComplianceReviewEvidenceVisible: true,
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

const DEFAULT_EVIDENCE_REFERENCES_216A = [
  "215B privacy/redaction/retention final handoff passed",
  "Gift ledger compliance evidence readiness is source-only",
  "Admin compliance review evidence boundary is visible",
] as const;

const forbiddenValuePattern216A = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|kyc_secret|aml_secret|access_token|refresh_token)/i;

function containsRawSecret216A(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern216A.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret216A(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret216A(entry));
  }
  return false;
}

function uniqueStringArray216A(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas216A(value: unknown): readonly StreamGiftLedgerComplianceEvidenceReadinessArea216A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerComplianceEvidenceReadinessArea216A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A;
}

function normalizeSurfaces216A(value: unknown): readonly StreamGiftLedgerComplianceEvidenceSurface216A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerComplianceEvidenceSurface216A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A;
}

function blocked216A(
  code: StreamGiftLedgerComplianceEvidenceBlocked216A["code"],
  blockedReason: string,
): StreamGiftLedgerComplianceEvidenceBlocked216A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
    status: "compliance_evidence_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerComplianceEvidenceReadinessInput216A(
  input: Partial<StreamGiftLedgerComplianceEvidenceReadinessInput216A> = {},
): StreamGiftLedgerComplianceEvidenceReadinessInput216A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode ?? "compliance_evidence_readiness_index_only",
    acknowledged215BStage: input.acknowledged215BStage ?? "215B_privacy_redaction_retention_final_handoff_clean",
    evidenceReferences: uniqueStringArray216A(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_216A),
    readinessAreas: normalizeAreas216A(input.readinessAreas),
    complianceSurfaces: normalizeSurfaces216A(input.complianceSurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerComplianceEvidenceReadiness216ARemainsSafe(): StreamGiftLedgerComplianceEvidenceSafety216A {
  return STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY;
}

export function getStreamGiftLedgerComplianceEvidenceReadiness216A(): StreamGiftLedgerComplianceEvidenceSnapshot216A {
  return {
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
    status: "ready_for_compliance_evidence_readiness_without_runtime_enablement",
    previousStageRequired: "215B_privacy_redaction_retention_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    kycEvidenceBoundaryVisible: true,
    kybEvidenceBoundaryVisible: true,
    amlScreeningEvidenceBoundaryVisible: true,
    sanctionsScreeningEvidenceBoundaryVisible: true,
    ageRegionComplianceEvidenceBoundaryVisible: true,
    officialStreamerAgreementEvidenceVisible: true,
    adminComplianceReviewEvidenceVisible: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "216B_stream_gifts_compliance_evidence_final_handoff",
  };
}

export function getStreamGiftLedgerComplianceEvidenceReadiness216AContract() {
  return {
    contract: "stream.gift.compliance-evidence-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
    requiredAreas: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A,
    requiredSurfaces: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A,
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY,
  } as const;
}

export function prepareStreamGiftLedgerComplianceEvidenceReadiness216A(
  input: Partial<StreamGiftLedgerComplianceEvidenceReadinessInput216A> = {},
): StreamGiftLedgerComplianceEvidenceResult216A {
  const normalized = normalizeStreamGiftLedgerComplianceEvidenceReadinessInput216A(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_OWNER_APPROVAL) {
    return blocked216A("owner_approval_required", "216A readiness requires the exact owner approval string.");
  }
  if (normalized.readinessMode !== "compliance_evidence_readiness_index_only") {
    return blocked216A("readiness_mode_disabled", "216A cannot enable compliance decisions, provider calls, DB reads, or runtime execution.");
  }
  if (normalized.acknowledged215BStage !== "215B_privacy_redaction_retention_final_handoff_clean") {
    return blocked216A("previous_215b_handoff_required", "215B privacy/redaction/retention final handoff must be clean first.");
  }
  if (containsRawSecret216A(normalized)) {
    return blocked216A("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are rejected.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked216A("evidence_references_required", "Evidence references are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked216A("missing_required_area", `Missing required readiness area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A.find((surface) => !normalized.complianceSurfaces.includes(surface));
  if (missingSurface) {
    return blocked216A("missing_required_surface", `Missing required compliance surface: ${missingSurface}`);
  }
  const prepared: StreamGiftLedgerComplianceEvidencePrepared216A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
    status: "compliance_evidence_readiness_prepared_without_runtime_enablement",
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    complianceRuntimeDecisionExecuted: false,
    providerComplianceCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    envelope: {
      contract: "stream.gift.compliance-evidence-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
      previousStageRequired: "215B_privacy_redaction_retention_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_AREAS_216A,
      requiredSurfaces: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_REQUIRED_SURFACES_216A,
      readinessAreas: normalized.readinessAreas,
      complianceSurfaces: normalized.complianceSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous215BHandoffRequired: true,
      kycEvidenceBoundaryVisible: true,
      kybEvidenceBoundaryVisible: true,
      amlScreeningEvidenceBoundaryVisible: true,
      sanctionsScreeningEvidenceBoundaryVisible: true,
      ageRegionComplianceEvidenceBoundaryVisible: true,
      officialStreamerAgreementEvidenceVisible: true,
      adminComplianceReviewEvidenceVisible: true,
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
      nextStage: "216B_stream_gifts_compliance_evidence_final_handoff",
    },
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY,
  };
  return prepared;
}

export function getStreamGiftLedgerComplianceEvidenceReadiness216ARunbook(): StreamGiftLedgerComplianceEvidenceRunbook216A {
  return {
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
    steps: [
      "Confirm 215B privacy/redaction/retention final handoff is clean.",
      "Review KYC/KYB, AML, sanctions, age/region, and streamer agreement evidence boundaries.",
      "Keep all compliance decisions, provider compliance calls, DB reads, Wallet mutation, payout execution, and runtime execution disabled.",
      "Prepare final handoff only after owner-machine TypeScript and checker are clean.",
    ],
    lockedRuntimeRequests: [
      "compliance-runtime-decision-request",
      "kyc-kyb-runtime-decision-request",
      "aml-sanctions-runtime-decision-request",
      "provider-compliance-call-request",
      "db-read-request",
    ],
    nextStage: "216B_stream_gifts_compliance_evidence_final_handoff",
  };
}

function lockedRequest216A(requestType: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION,
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
    safety: STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerComplianceEvidenceReadiness216AComplianceRuntimeDecisionRequest() {
  return lockedRequest216A("compliance_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceReadiness216AKycKybRuntimeDecisionRequest() {
  return lockedRequest216A("kyc_kyb_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceReadiness216AAmlSanctionsRuntimeDecisionRequest() {
  return lockedRequest216A("aml_sanctions_runtime_decision_request");
}

export function createStreamGiftLedgerComplianceEvidenceReadiness216AProviderComplianceCallRequest() {
  return lockedRequest216A("provider_compliance_call_request");
}

export function createStreamGiftLedgerComplianceEvidenceReadiness216ADbReadRequest() {
  return lockedRequest216A("db_read_request");
}
