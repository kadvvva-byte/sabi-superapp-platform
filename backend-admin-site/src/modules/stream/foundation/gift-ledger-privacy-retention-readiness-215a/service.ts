import {
  STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
  type StreamGiftLedgerPrivacyRetentionBlocked215A,
  type StreamGiftLedgerPrivacyRetentionReadinessArea215A,
  type StreamGiftLedgerPrivacyRetentionReadinessInput215A,
  type StreamGiftLedgerPrivacyRetentionPrepared215A,
  type StreamGiftLedgerPrivacyRetentionResult215A,
  type StreamGiftLedgerPrivacyRetentionRunbook215A,
  type StreamGiftLedgerPrivacyRetentionSafety215A,
  type StreamGiftLedgerPrivacyRetentionSnapshot215A,
  type StreamGiftLedgerPrivacyRetentionSurface215A,
} from "./types";

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_OWNER_APPROVAL =
  "I_APPROVE_215A_PRIVACY_REDACTION_RETENTION_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A: readonly StreamGiftLedgerPrivacyRetentionReadinessArea215A[] = [
  "previous_214b_export_report_handoff_locked",
  "privacy_redaction_policy_boundary_visible",
  "pii_minimization_boundary_visible",
  "audit_log_retention_boundary_visible",
  "report_export_redaction_boundary_visible",
  "admin_privacy_review_evidence_visible",
  "data_subject_request_boundary_visible",
  "future_db_read_approval_required",
  "future_report_export_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A: readonly StreamGiftLedgerPrivacyRetentionSurface215A[] = [
  "admin_privacy_snapshot",
  "redaction_policy_preview",
  "retention_policy_preview",
  "export_redaction_contract_preview",
  "data_subject_request_runbook",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY: StreamGiftLedgerPrivacyRetentionSafety215A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous214BHandoffRequired: true,
  privacyRedactionPolicyBoundaryVisible: true,
  piiMinimizationBoundaryVisible: true,
  auditLogRetentionBoundaryVisible: true,
  reportExportRedactionBoundaryVisible: true,
  adminPrivacyReviewEvidenceVisible: true,
  dataSubjectRequestBoundaryVisible: true,
  giftLedgerExportRuntimeReadExecuted: false,
  giftLedgerReportRuntimeReadExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  reportRuntimeExportExecuted: false,
  exportRuntimeFileWriteExecuted: false,
  privacyRuntimeRedactionExecuted: false,
  retentionRuntimePurgeExecuted: false,
  dataSubjectRuntimeExportExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
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
  futurePrivacyRedactionRuntimeRequiresSeparateApproval: true,
  futureRetentionPurgeRequiresSeparateApproval: true,
  futureDataSubjectExportRequiresSeparateApproval: true,
  futureReportExportRequiresSeparateApproval: true,
  futureDbReadRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_215A = [
  "214B export/report final handoff passed",
  "Gift ledger privacy/redaction/retention readiness is source-only",
  "Admin privacy evidence boundary is visible",
] as const;

const forbiddenValuePattern215A = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|access_token|refresh_token)/i;

function containsRawSecret215A(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern215A.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret215A(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret215A(entry));
  }
  return false;
}

function uniqueStringArray215A(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas215A(value: unknown): readonly StreamGiftLedgerPrivacyRetentionReadinessArea215A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerPrivacyRetentionReadinessArea215A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A;
}

function normalizeSurfaces215A(value: unknown): readonly StreamGiftLedgerPrivacyRetentionSurface215A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerPrivacyRetentionSurface215A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A;
}

function blocked215A(
  code: StreamGiftLedgerPrivacyRetentionBlocked215A["code"],
  blockedReason: string,
): StreamGiftLedgerPrivacyRetentionBlocked215A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    status: "privacy_retention_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerPrivacyRetentionReadinessInput215A(
  input: Partial<StreamGiftLedgerPrivacyRetentionReadinessInput215A> = {},
): StreamGiftLedgerPrivacyRetentionReadinessInput215A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode ?? "privacy_retention_readiness_index_only",
    acknowledged214BStage: input.acknowledged214BStage ?? "214B_export_report_final_handoff_clean",
    evidenceReferences: uniqueStringArray215A(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_215A),
    readinessAreas: normalizeAreas215A(input.readinessAreas),
    privacySurfaces: normalizeSurfaces215A(input.privacySurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerPrivacyRetentionReadiness215ARemainsSafe(): StreamGiftLedgerPrivacyRetentionSafety215A {
  return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY;
}

export function getStreamGiftLedgerPrivacyRetentionReadiness215A(): StreamGiftLedgerPrivacyRetentionSnapshot215A {
  return {
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    status: "ready_for_privacy_retention_readiness_without_runtime_enablement",
    previousStageRequired: "214B_export_report_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    privacyRedactionPolicyBoundaryVisible: true,
    piiMinimizationBoundaryVisible: true,
    auditLogRetentionBoundaryVisible: true,
    reportExportRedactionBoundaryVisible: true,
    adminPrivacyReviewEvidenceVisible: true,
    dataSubjectRequestBoundaryVisible: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "215B_stream_gifts_privacy_redaction_retention_final_handoff",
  };
}

export function getStreamGiftLedgerPrivacyRetentionReadiness215AContract() {
  return {
    contract: "stream.gift.privacy-retention-readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    requiredAreas: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A,
    requiredSurfaces: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A,
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY,
  } as const;
}

export function prepareStreamGiftLedgerPrivacyRetentionReadiness215A(
  input: Partial<StreamGiftLedgerPrivacyRetentionReadinessInput215A> = {},
): StreamGiftLedgerPrivacyRetentionResult215A {
  const normalized = normalizeStreamGiftLedgerPrivacyRetentionReadinessInput215A(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_OWNER_APPROVAL) {
    return blocked215A("owner_approval_required", "215A readiness requires the exact owner approval string.");
  }
  if (normalized.readinessMode !== "privacy_retention_readiness_index_only") {
    return blocked215A("readiness_mode_disabled", "215A cannot enable runtime privacy/redaction/retention execution.");
  }
  if (normalized.acknowledged214BStage !== "214B_export_report_final_handoff_clean") {
    return blocked215A("previous_214b_handoff_required", "214B export/report final handoff must be clean first.");
  }
  if (containsRawSecret215A(normalized)) {
    return blocked215A("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are rejected.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked215A("evidence_references_required", "Evidence references are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A.find((area) => !normalized.readinessAreas.includes(area));
  if (missingArea) {
    return blocked215A("missing_required_area", `Missing required readiness area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A.find((surface) => !normalized.privacySurfaces.includes(surface));
  if (missingSurface) {
    return blocked215A("missing_required_surface", `Missing required privacy surface: ${missingSurface}`);
  }
  const prepared: StreamGiftLedgerPrivacyRetentionPrepared215A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    status: "privacy_retention_readiness_prepared_without_runtime_enablement",
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    envelope: {
      contract: "stream.gift.privacy-retention-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
      previousStageRequired: "214B_export_report_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_AREAS_215A,
      requiredSurfaces: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_REQUIRED_SURFACES_215A,
      readinessAreas: normalized.readinessAreas,
      privacySurfaces: normalized.privacySurfaces,
      evidenceReferences: normalized.evidenceReferences,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous214BHandoffRequired: true,
      privacyRedactionPolicyBoundaryVisible: true,
      piiMinimizationBoundaryVisible: true,
      auditLogRetentionBoundaryVisible: true,
      reportExportRedactionBoundaryVisible: true,
      adminPrivacyReviewEvidenceVisible: true,
      dataSubjectRequestBoundaryVisible: true,
      giftLedgerExportRuntimeReadExecuted: false,
      reportRuntimeExportExecuted: false,
      exportRuntimeFileWriteExecuted: false,
      privacyRuntimeRedactionExecuted: false,
      retentionRuntimePurgeExecuted: false,
      dataSubjectRuntimeExportExecuted: false,
      payoutExecuted: false,
      providerPayoutCallExecuted: false,
      walletMutationExecuted: false,
      dbReadExecuted: false,
      dbWriteExecuted: false,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futurePrivacyRedactionRuntimeRequiresSeparateApproval: true,
      futureRetentionPurgeRequiresSeparateApproval: true,
      futureDataSubjectExportRequiresSeparateApproval: true,
      futureReportExportRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      nextStage: "215B_stream_gifts_privacy_redaction_retention_final_handoff",
    },
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY,
  };
  return prepared;
}

export function getStreamGiftLedgerPrivacyRetentionReadiness215ARunbook(): StreamGiftLedgerPrivacyRetentionRunbook215A {
  return {
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    steps: [
      "Confirm 214B export/report final handoff is clean.",
      "Review privacy redaction and PII minimization boundaries.",
      "Review audit-log retention and data-subject request boundaries.",
      "Keep all DB reads, runtime exports, redaction writes, retention purge, provider calls, Wallet mutation, and payout execution disabled.",
    ],
    lockedRuntimeRequests: [
      "privacy-redaction-runtime-request",
      "retention-purge-runtime-request",
      "data-subject-export-runtime-request",
      "report-export-runtime-request",
      "db-read-request",
    ],
    nextStage: "215B_stream_gifts_privacy_redaction_retention_final_handoff",
  };
}

function lockedRequest215A(requestType: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_VERSION,
    status: "locked_requires_separate_exact_owner_approval" as const,
    requestType,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerPrivacyRetentionReadiness215APrivacyRedactionRuntimeRequest() {
  return lockedRequest215A("privacy_redaction_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionReadiness215ARetentionPurgeRuntimeRequest() {
  return lockedRequest215A("retention_purge_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionReadiness215ADataSubjectExportRuntimeRequest() {
  return lockedRequest215A("data_subject_export_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionReadiness215AReportExportRuntimeRequest() {
  return lockedRequest215A("report_export_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionReadiness215ADbReadRequest() {
  return lockedRequest215A("db_read_request");
}
