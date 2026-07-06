import {
  STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffArea215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffBlocked215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffBlockedCode215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffInput215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffPrepared215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffResult215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffRunbook215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffSafety215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffSnapshot215B,
  type StreamGiftLedgerPrivacyRetentionFinalHandoffSurface215B,
} from "./types";

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_OWNER_APPROVAL =
  "I_APPROVE_215B_PRIVACY_REDACTION_RETENTION_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B: readonly StreamGiftLedgerPrivacyRetentionFinalHandoffArea215B[] = [
  "previous_215a_privacy_retention_readiness_locked",
  "privacy_redaction_policy_boundary_locked",
  "pii_minimization_boundary_locked",
  "audit_log_retention_boundary_locked",
  "report_export_redaction_boundary_locked",
  "admin_privacy_review_evidence_locked",
  "data_subject_request_boundary_locked",
  "future_db_read_approval_required",
  "future_report_export_approval_required",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B: readonly StreamGiftLedgerPrivacyRetentionFinalHandoffSurface215B[] = [
  "admin_final_handoff_snapshot",
  "privacy_redaction_final_boundary",
  "retention_final_boundary",
  "data_subject_request_final_boundary",
  "export_redaction_final_boundary",
  "approval_boundary_runbook",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY: StreamGiftLedgerPrivacyRetentionFinalHandoffSafety215B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous215AReadinessRequired: true,
  privacyRedactionPolicyBoundaryLocked: true,
  piiMinimizationBoundaryLocked: true,
  auditLogRetentionBoundaryLocked: true,
  reportExportRedactionBoundaryLocked: true,
  adminPrivacyReviewEvidenceLocked: true,
  dataSubjectRequestBoundaryLocked: true,
  privacyRuntimeRedactionExecuted: false,
  retentionRuntimePurgeExecuted: false,
  dataSubjectRuntimeExportExecuted: false,
  giftLedgerExportRuntimeReadExecuted: false,
  giftLedgerReportRuntimeReadExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  reportRuntimeExportExecuted: false,
  exportRuntimeFileWriteExecuted: false,
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

const DEFAULT_EVIDENCE_REFERENCES_215B = [
  "215A privacy/redaction/retention readiness index passed",
  "Privacy/redaction/retention final handoff is source-only",
  "Runtime privacy, retention, export, DB, provider, Wallet, and payout execution remain locked",
] as const;

const forbiddenValuePattern215B = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|access_token|refresh_token)/i;

function containsRawSecret215B(value: unknown): boolean {
  if (typeof value === "string") {
    return forbiddenValuePattern215B.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret215B(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret215B(entry));
  }
  return false;
}

function uniqueStringArray215B(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas215B(value: unknown): readonly StreamGiftLedgerPrivacyRetentionFinalHandoffArea215B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerPrivacyRetentionFinalHandoffArea215B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B;
}

function normalizeSurfaces215B(value: unknown): readonly StreamGiftLedgerPrivacyRetentionFinalHandoffSurface215B[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerPrivacyRetentionFinalHandoffSurface215B => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B;
}

function blocked215B(
  code: StreamGiftLedgerPrivacyRetentionFinalHandoffBlockedCode215B,
  blockedReason: string,
): StreamGiftLedgerPrivacyRetentionFinalHandoffBlocked215B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
    status: "privacy_retention_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY,
  };
}

export function normalizeStreamGiftLedgerPrivacyRetentionFinalHandoffInput215B(
  input: Partial<StreamGiftLedgerPrivacyRetentionFinalHandoffInput215B> = {},
): StreamGiftLedgerPrivacyRetentionFinalHandoffInput215B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "privacy_retention_final_handoff_only",
    acknowledged215AStage: input.acknowledged215AStage ?? "215A_privacy_retention_readiness_index_clean",
    evidenceReferences: uniqueStringArray215B(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_215B),
    handoffAreas: normalizeAreas215B(input.handoffAreas),
    privacySurfaces: normalizeSurfaces215B(input.privacySurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerPrivacyRetentionFinalHandoff215BRemainsSafe(): StreamGiftLedgerPrivacyRetentionFinalHandoffSafety215B {
  return STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY;
}

export function getStreamGiftLedgerPrivacyRetentionFinalHandoff215B(): StreamGiftLedgerPrivacyRetentionFinalHandoffSnapshot215B {
  return {
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
    status: "ready_for_privacy_retention_final_handoff_without_runtime_enablement",
    previousStageRequired: "215A_privacy_retention_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    privacyRedactionPolicyBoundaryLocked: true,
    piiMinimizationBoundaryLocked: true,
    auditLogRetentionBoundaryLocked: true,
    reportExportRedactionBoundaryLocked: true,
    adminPrivacyReviewEvidenceLocked: true,
    dataSubjectRequestBoundaryLocked: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futurePrivacyRedactionRuntimeRequiresSeparateApproval: true,
    futureRetentionPurgeRequiresSeparateApproval: true,
    futureDataSubjectExportRequiresSeparateApproval: true,
    futureReportExportRequiresSeparateApproval: true,
    futureDbReadRequiresSeparateApproval: true,
  };
}

export function getStreamGiftLedgerPrivacyRetentionFinalHandoff215BContract() {
  return {
    contract: "stream.gift.privacy-retention-final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
    requiredAreas: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B,
    requiredSurfaces: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B,
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY,
  } as const;
}

export function prepareStreamGiftLedgerPrivacyRetentionFinalHandoff215B(
  input: Partial<StreamGiftLedgerPrivacyRetentionFinalHandoffInput215B> = {},
): StreamGiftLedgerPrivacyRetentionFinalHandoffResult215B {
  const normalized = normalizeStreamGiftLedgerPrivacyRetentionFinalHandoffInput215B(input);
  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_OWNER_APPROVAL) {
    return blocked215B("owner_approval_required", "215B final handoff requires the exact owner approval string.");
  }
  if (normalized.handoffMode !== "privacy_retention_final_handoff_only") {
    return blocked215B("handoff_mode_disabled", "215B cannot enable runtime privacy, retention, export, DB, provider, Wallet, or payout execution.");
  }
  if (normalized.acknowledged215AStage !== "215A_privacy_retention_readiness_index_clean") {
    return blocked215B("previous_215a_readiness_required", "215A privacy/redaction/retention readiness must be clean first.");
  }
  if (containsRawSecret215B(normalized)) {
    return blocked215B("raw_secret_or_provider_value_rejected", "Raw secrets or provider credential values are rejected.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked215B("evidence_references_required", "Evidence references are required.");
  }
  const missingArea = STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B.find((area) => !normalized.handoffAreas.includes(area));
  if (missingArea) {
    return blocked215B("missing_required_area", `Missing required final handoff area: ${missingArea}`);
  }
  const missingSurface = STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B.find((surface) => !normalized.privacySurfaces.includes(surface));
  if (missingSurface) {
    return blocked215B("missing_required_surface", `Missing required privacy surface: ${missingSurface}`);
  }
  const prepared: StreamGiftLedgerPrivacyRetentionFinalHandoffPrepared215B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
    status: "privacy_retention_final_handoff_prepared_without_runtime_enablement",
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    privacyRuntimeRedactionExecuted: false,
    retentionRuntimePurgeExecuted: false,
    dataSubjectRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    envelope: {
      contract: "stream.gift.privacy-retention-final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
      previousStageRequired: "215A_privacy_retention_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_AREAS_215B,
      requiredSurfaces: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_REQUIRED_SURFACES_215B,
      handoffAreas: normalized.handoffAreas,
      privacySurfaces: normalized.privacySurfaces,
      evidenceReferences: normalized.evidenceReferences,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previous215AReadinessRequired: true,
      privacyRedactionPolicyBoundaryLocked: true,
      piiMinimizationBoundaryLocked: true,
      auditLogRetentionBoundaryLocked: true,
      reportExportRedactionBoundaryLocked: true,
      adminPrivacyReviewEvidenceLocked: true,
      dataSubjectRequestBoundaryLocked: true,
      privacyRuntimeRedactionExecuted: false,
      retentionRuntimePurgeExecuted: false,
      dataSubjectRuntimeExportExecuted: false,
      giftLedgerExportRuntimeReadExecuted: false,
      reportRuntimeExportExecuted: false,
      exportRuntimeFileWriteExecuted: false,
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
      futurePrivacyRedactionRuntimeRequiresSeparateApproval: true,
      futureRetentionPurgeRequiresSeparateApproval: true,
      futureDataSubjectExportRequiresSeparateApproval: true,
      futureReportExportRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_privacy_redaction_retention_future_privacy_export_db_or_runtime_require_exact_owner_approval",
    },
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY,
  };
  return prepared;
}

export function getStreamGiftLedgerPrivacyRetentionFinalHandoff215BRunbook(): StreamGiftLedgerPrivacyRetentionFinalHandoffRunbook215B {
  return {
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
    steps: [
      "Confirm 215A privacy/redaction/retention readiness index is clean.",
      "Lock privacy redaction, PII minimization, retention, report redaction, and data-subject request boundaries.",
      "Keep DB reads, runtime exports, privacy redaction writes, retention purge, data-subject export, provider calls, Wallet mutation, and payout execution disabled.",
      "Require a new exact owner approval before any future privacy/export/DB/runtime execution package.",
    ],
    lockedRuntimeRequests: [
      "privacy-redaction-runtime-request",
      "retention-purge-runtime-request",
      "data-subject-export-runtime-request",
      "report-export-runtime-request",
      "db-read-request",
    ],
    nextStage: "closed_stream_gifts_privacy_redaction_retention_future_privacy_export_db_or_runtime_require_exact_owner_approval",
  };
}

function lockedRequest215B(requestType: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_VERSION,
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
    safety: STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_SAFETY,
  } as const;
}

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BPrivacyRedactionRuntimeRequest() {
  return lockedRequest215B("privacy_redaction_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRetentionPurgeRuntimeRequest() {
  return lockedRequest215B("retention_purge_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDataSubjectExportRuntimeRequest() {
  return lockedRequest215B("data_subject_export_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BReportExportRuntimeRequest() {
  return lockedRequest215B("report_export_runtime_request");
}

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDbReadRequest() {
  return lockedRequest215B("db_read_request");
}
