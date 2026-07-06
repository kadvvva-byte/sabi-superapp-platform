import {
  STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
  type StreamGiftLedgerExportReportReadinessArea214A,
  type StreamGiftLedgerExportReportReadinessBlocked214A,
  type StreamGiftLedgerExportReportReadinessInput214A,
  type StreamGiftLedgerExportReportReadinessPrepared214A,
  type StreamGiftLedgerExportReportReadinessResult214A,
  type StreamGiftLedgerExportReportReadinessSafety214A,
  type StreamGiftLedgerExportReportReadinessSnapshot214A,
  type StreamGiftLedgerExportReportSurface214A,
} from "./types";

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_OWNER_APPROVAL =
  "I_APPROVE_214A_EXPORT_REPORT_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A: readonly StreamGiftLedgerExportReportReadinessArea214A[] = [
  "previous_213b_payout_audit_handoff_locked",
  "payout_audit_trail_boundary_visible",
  "gift_ledger_export_boundary_visible",
  "gift_receipt_report_boundary_visible",
  "creator_payout_report_boundary_visible",
  "tax_withholding_report_boundary_visible",
  "settlement_report_boundary_visible",
  "admin_export_review_evidence_visible",
  "privacy_redaction_boundary_visible",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A: readonly StreamGiftLedgerExportReportSurface214A[] = [
  "admin_readiness_snapshot",
  "export_contract_preview",
  "report_contract_preview",
  "privacy_redaction_boundary",
  "approval_boundary_runbook",
  "provider_not_configured_visibility",
] as const;

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY: StreamGiftLedgerExportReportReadinessSafety214A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous213BHandoffRequired: true,
  giftLedgerExportBoundaryVisible: true,
  giftReceiptReportBoundaryVisible: true,
  creatorPayoutReportBoundaryVisible: true,
  taxWithholdingReportBoundaryVisible: true,
  settlementReportBoundaryVisible: true,
  adminExportReviewEvidenceVisible: true,
  privacyRedactionBoundaryVisible: true,
  payoutAuditTrailBoundaryVisible: true,
  regularUserNoCashoutBoundaryLocked: true,
  demoPointsNoCashoutBoundaryLocked: true,
  giftLedgerExportRuntimeReadExecuted: false,
  giftLedgerReportRuntimeReadExecuted: false,
  payoutAuditRuntimeExportExecuted: false,
  payoutAuditRuntimeWriteExecuted: false,
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
  dbReadExecuted: false,
  dbWriteExecuted: false,
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
  futureGiftLedgerExportRequiresSeparateApproval: true,
  futureReportExportRequiresSeparateApproval: true,
  futurePayoutAuditExportRequiresSeparateApproval: true,
  futureDbReadRequiresSeparateApproval: true,
  futureProviderPayoutRequiresSeparateApproval: true,
  futureWalletPayoutRequiresSeparateApproval: true,
  sourceOnly: true,
};

const DEFAULT_EVIDENCE_REFERENCES_214A = [
  "213B payout audit/evidence final handoff passed",
  "Gift ledger export/report readiness is source-only",
  "Admin export/report evidence boundary is visible",
] as const;

const RAW_SECRET_PATTERN_214A = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY|client_secret|provider_secret|payout_secret|access_token|refresh_token)/i;

function containsRawSecret214A(value: unknown): boolean {
  if (typeof value === "string") {
    return RAW_SECRET_PATTERN_214A.test(value);
  }
  if (Array.isArray(value)) {
    return value.some((entry) => containsRawSecret214A(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => containsRawSecret214A(entry));
  }
  return false;
}

function uniqueStringArray214A(value: unknown, fallback: readonly string[]): readonly string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const normalized = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return Array.from(new Set(normalized));
}

function normalizeAreas214A(value: unknown): readonly StreamGiftLedgerExportReportReadinessArea214A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerExportReportReadinessArea214A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A;
}

function normalizeSurfaces214A(value: unknown): readonly StreamGiftLedgerExportReportSurface214A[] {
  if (!Array.isArray(value)) {
    return STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A;
  }
  const allowed = new Set<string>(STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A);
  const normalized = value
    .filter((entry): entry is StreamGiftLedgerExportReportSurface214A => typeof entry === "string" && allowed.has(entry))
    .filter((entry, index, entries) => entries.indexOf(entry) === index);
  return normalized.length > 0 ? normalized : STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A;
}

function blocked214A(
  code: StreamGiftLedgerExportReportReadinessBlocked214A["code"],
  blockedReason: string,
): StreamGiftLedgerExportReportReadinessBlocked214A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    status: "export_report_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerExportReportReadinessInput214A(
  input: Partial<StreamGiftLedgerExportReportReadinessInput214A> = {},
): StreamGiftLedgerExportReportReadinessInput214A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode ?? "export_report_readiness_index_only",
    acknowledged213BStage: input.acknowledged213BStage ?? "213B_payout_audit_final_handoff_clean",
    evidenceReferences: uniqueStringArray214A(input.evidenceReferences, DEFAULT_EVIDENCE_REFERENCES_214A),
    readinessAreas: normalizeAreas214A(input.readinessAreas),
    reportSurfaces: normalizeSurfaces214A(input.reportSurfaces),
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerExportReportReadiness214ARemainsSafe(): StreamGiftLedgerExportReportReadinessSafety214A {
  return STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY;
}

export function prepareStreamGiftLedgerExportReportReadiness214A(
  rawInput: Partial<StreamGiftLedgerExportReportReadinessInput214A> = {},
): StreamGiftLedgerExportReportReadinessResult214A {
  if (containsRawSecret214A(rawInput)) {
    return blocked214A("raw_secret_or_provider_value_rejected", "Raw secrets/provider values are rejected; use labels and evidence references only.");
  }

  const input = normalizeStreamGiftLedgerExportReportReadinessInput214A(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_OWNER_APPROVAL) {
    return blocked214A("owner_approval_required", "214A exact owner approval phrase is required for readiness index only.");
  }
  if (input.readinessMode !== "export_report_readiness_index_only") {
    return blocked214A("readiness_mode_disabled", "214A only prepares export/report readiness index; no runtime mode is available.");
  }
  if (input.acknowledged213BStage !== "213B_payout_audit_final_handoff_clean") {
    return blocked214A("previous_213b_handoff_required", "213B clean payout audit final handoff acknowledgement is required.");
  }
  if (input.evidenceReferences.length === 0) {
    return blocked214A("evidence_references_required", "Evidence references are required.");
  }
  if (input.readinessAreas.length === 0) {
    return blocked214A("readiness_areas_required", "Readiness areas are required.");
  }
  if (input.reportSurfaces.length === 0) {
    return blocked214A("report_surfaces_required", "Report/export surfaces are required.");
  }
  for (const requiredArea of STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A) {
    if (!input.readinessAreas.includes(requiredArea)) {
      return blocked214A("missing_required_area", `Missing required readiness area: ${requiredArea}`);
    }
  }
  for (const requiredSurface of STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A) {
    if (!input.reportSurfaces.includes(requiredSurface)) {
      return blocked214A("missing_required_surface", `Missing required report/export surface: ${requiredSurface}`);
    }
  }

  const prepared: StreamGiftLedgerExportReportReadinessPrepared214A = {
    ok: true,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    status: "export_report_readiness_index_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.export-report-readiness.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
      previousStageRequired: "213B_payout_audit_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A,
      requiredSurfaces: STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A,
      readinessAreas: input.readinessAreas,
      reportSurfaces: input.reportSurfaces,
      evidenceReferences: input.evidenceReferences,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
      previous213BHandoffRequired: true,
      payoutAuditTrailBoundaryVisible: true,
      giftLedgerExportBoundaryVisible: true,
      giftReceiptReportBoundaryVisible: true,
      creatorPayoutReportBoundaryVisible: true,
      taxWithholdingReportBoundaryVisible: true,
      settlementReportBoundaryVisible: true,
      adminExportReviewEvidenceVisible: true,
      privacyRedactionBoundaryVisible: true,
      regularUserNoCashoutBoundaryLocked: true,
      demoPointsNoCashoutBoundaryLocked: true,
      giftLedgerExportRuntimeReadExecuted: false,
      giftLedgerReportRuntimeReadExecuted: false,
      payoutAuditRuntimeExportExecuted: false,
      reportRuntimeExportExecuted: false,
      exportRuntimeFileWriteExecuted: false,
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
      futureGiftLedgerExportRequiresSeparateApproval: true,
      futureReportExportRequiresSeparateApproval: true,
      futurePayoutAuditExportRequiresSeparateApproval: true,
      futureDbReadRequiresSeparateApproval: true,
      futureProviderPayoutRequiresSeparateApproval: true,
      futureWalletPayoutRequiresSeparateApproval: true,
      nextStage: "214B_stream_gifts_export_report_final_handoff",
    },
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY,
  };

  return prepared;
}

export function getStreamGiftLedgerExportReportReadiness214A(): StreamGiftLedgerExportReportReadinessSnapshot214A {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    status: "ready_for_export_report_readiness_index_without_runtime_enablement",
    previousStageRequired: "213B_payout_audit_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    giftLedgerExportBoundaryVisible: true,
    giftReceiptReportBoundaryVisible: true,
    creatorPayoutReportBoundaryVisible: true,
    taxWithholdingReportBoundaryVisible: true,
    settlementReportBoundaryVisible: true,
    adminExportReviewEvidenceVisible: true,
    privacyRedactionBoundaryVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    nextStage: "214B_stream_gifts_export_report_final_handoff",
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY,
  };
}

export function getStreamGiftLedgerExportReportReadiness214AContract() {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    contract: "stream.gift.export-report-readiness.safe_disabled.v1",
    purpose: "Expose Stream Gifts export/report readiness boundaries after payout audit evidence handoff without executing exports or DB reads.",
    requiredAreas: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_REQUIRED_AREAS_214A,
    requiredSurfaces: STREAM_GIFT_LEDGER_EXPORT_REPORT_REQUIRED_SURFACES_214A,
    providerNotConfiguredVisible: true,
    blocks: [
      "no_env_read",
      "no_raw_secrets",
      "no_gift_ledger_export_runtime_read",
      "no_report_runtime_export",
      "no_payout_audit_export",
      "no_db_read_write",
      "no_wallet_payment_payout",
      "no_provider_payout_call",
      "no_runtime_enablement",
      "no_fake_success",
    ],
  } as const;
}

export function getStreamGiftLedgerExportReportReadiness214ARunbook() {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    runbook: [
      "Confirm 213B payout audit/evidence final handoff is clean.",
      "Show export/report boundaries and provider_not_configured state to Admin only.",
      "Keep privacy redaction and evidence references visible.",
      "Block all runtime export/report reads until a future exact owner approval package exists.",
    ],
    requiredFutureApprovals: [
      "gift_ledger_export_runtime_read",
      "report_runtime_export",
      "payout_audit_export",
      "db_read",
      "provider_payout",
      "wallet_payout",
      "runtime_execution",
    ],
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY,
  } as const;
}

function blockedFuture214A(operation: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION,
    status: "blocked_future_exact_owner_approval_required",
    operation,
    providerNotConfiguredVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    payoutAuditRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    payoutExecuted: false,
    providerPayoutCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    reason: "214A is readiness index only. Runtime export/report, DB read/write, payout, Wallet, provider, and runtime execution require a future exact owner approval package.",
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_SAFETY,
  } as const;
}

export function createStreamGiftLedgerExportReportReadiness214AGiftLedgerExportRequest() {
  return blockedFuture214A("gift_ledger_export_runtime_read");
}

export function createStreamGiftLedgerExportReportReadiness214AReportExportRequest() {
  return blockedFuture214A("report_runtime_export");
}

export function createStreamGiftLedgerExportReportReadiness214APayoutAuditExportRequest() {
  return blockedFuture214A("payout_audit_export");
}

export function createStreamGiftLedgerExportReportReadiness214ADbReadRequest() {
  return blockedFuture214A("db_read");
}

export function createStreamGiftLedgerExportReportReadiness214APayoutExecutionRequest() {
  return blockedFuture214A("payout_execution");
}
