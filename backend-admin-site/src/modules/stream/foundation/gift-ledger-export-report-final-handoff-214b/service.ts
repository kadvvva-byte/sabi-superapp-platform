import {
  STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
  type StreamGiftLedgerExportReportFinalHandoffArea214B,
  type StreamGiftLedgerExportReportFinalHandoffBlocked214B,
  type StreamGiftLedgerExportReportFinalHandoffBlockedCode214B,
  type StreamGiftLedgerExportReportFinalHandoffEnvelope214B,
  type StreamGiftLedgerExportReportFinalHandoffInput214B,
  type StreamGiftLedgerExportReportFinalHandoffPrepared214B,
  type StreamGiftLedgerExportReportFinalHandoffResult214B,
  type StreamGiftLedgerExportReportFinalHandoffSafety214B,
  type StreamGiftLedgerExportReportFinalHandoffSnapshot214B,
  type StreamGiftLedgerExportReportFinalHandoffSurface214B,
} from "./types";

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_OWNER_APPROVAL =
  "I_APPROVE_214B_STREAM_GIFTS_EXPORT_REPORT_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B = [
  "previous_214a_export_report_readiness_locked",
  "payout_audit_trail_boundary_locked",
  "gift_ledger_export_boundary_locked",
  "gift_receipt_report_boundary_locked",
  "creator_payout_report_boundary_locked",
  "tax_withholding_report_boundary_locked",
  "settlement_report_boundary_locked",
  "admin_export_review_evidence_locked",
  "privacy_redaction_boundary_locked",
  "regular_user_no_cashout_boundary_locked",
  "demo_points_no_cashout_boundary_locked",
  "future_exact_owner_approval_required",
] as const satisfies readonly StreamGiftLedgerExportReportFinalHandoffArea214B[];

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B = [
  "admin_final_handoff_snapshot",
  "export_contract_final_handoff",
  "report_contract_final_handoff",
  "privacy_redaction_final_boundary",
  "approval_boundary_runbook",
  "provider_not_configured_visibility",
] as const satisfies readonly StreamGiftLedgerExportReportFinalHandoffSurface214B[];

export const STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_SAFETY: StreamGiftLedgerExportReportFinalHandoffSafety214B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous214AReadinessRequired: true,
  giftLedgerExportBoundaryLocked: true,
  giftReceiptReportBoundaryLocked: true,
  creatorPayoutReportBoundaryLocked: true,
  taxWithholdingReportBoundaryLocked: true,
  settlementReportBoundaryLocked: true,
  adminExportReviewEvidenceLocked: true,
  privacyRedactionBoundaryLocked: true,
  payoutAuditTrailBoundaryLocked: true,
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
} as const;

const forbiddenValuePattern = /(sk_live_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|provider_secret|raw_secret|client_secret|access_token|refresh_token)/i;

function uniqueStrings(values: readonly string[] | undefined): readonly string[] {
  return Array.from(new Set((values ?? []).filter((value): value is string => typeof value === "string" && value.trim().length > 0)));
}

function hasForbiddenValue(input: StreamGiftLedgerExportReportFinalHandoffInput214B): boolean {
  return [
    input.ownerApproval,
    input.handoffMode,
    input.acknowledged214AStage,
    input.operatorNote,
    ...uniqueStrings(input.evidenceReferences),
    ...uniqueStrings(input.handoffAreas),
    ...uniqueStrings(input.reportSurfaces),
  ].some((value) => typeof value === "string" && forbiddenValuePattern.test(value));
}

function blocked(
  code: StreamGiftLedgerExportReportFinalHandoffBlockedCode214B,
  blockedReason: string,
): StreamGiftLedgerExportReportFinalHandoffBlocked214B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    status: "export_report_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_SAFETY,
  } as const;
}

export function normalizeStreamGiftLedgerExportReportFinalHandoffInput214B(
  input: Partial<StreamGiftLedgerExportReportFinalHandoffInput214B> = {},
): StreamGiftLedgerExportReportFinalHandoffInput214B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode ?? "disabled",
    acknowledged214AStage: input.acknowledged214AStage ?? "disabled",
    evidenceReferences: uniqueStrings(input.evidenceReferences),
    handoffAreas: uniqueStrings(input.handoffAreas) as readonly StreamGiftLedgerExportReportFinalHandoffArea214B[],
    reportSurfaces: uniqueStrings(input.reportSurfaces) as readonly StreamGiftLedgerExportReportFinalHandoffSurface214B[],
    operatorNote: input.operatorNote,
  } as const;
}

export function assertStreamGiftLedgerExportReportFinalHandoff214BRemainsSafe(): StreamGiftLedgerExportReportFinalHandoffSafety214B {
  return STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_SAFETY;
}

export function getStreamGiftLedgerExportReportFinalHandoff214B(): StreamGiftLedgerExportReportFinalHandoffSnapshot214B {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    status: "ready_for_export_report_final_handoff_without_runtime_enablement",
    previousStageRequired: "214A_export_report_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    giftLedgerExportBoundaryLocked: true,
    giftReceiptReportBoundaryLocked: true,
    creatorPayoutReportBoundaryLocked: true,
    taxWithholdingReportBoundaryLocked: true,
    settlementReportBoundaryLocked: true,
    adminExportReviewEvidenceLocked: true,
    privacyRedactionBoundaryLocked: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    providerRuntimeEnabled: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    fakeSuccessWritten: false,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureGiftLedgerExportRequiresSeparateApproval: true,
    futureReportExportRequiresSeparateApproval: true,
    futurePayoutAuditExportRequiresSeparateApproval: true,
    futureDbReadRequiresSeparateApproval: true,
  } as const;
}

export function getStreamGiftLedgerExportReportFinalHandoff214BContract() {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    contract: "stream.gift.export-report-final-handoff.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_OWNER_APPROVAL,
    previousStageRequired: "214A_export_report_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B,
    requiredSurfaces: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B,
    safeDisabled: true,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    payoutExecutionExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  } as const;
}

export function getStreamGiftLedgerExportReportFinalHandoff214BRunbook() {
  return {
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    steps: [
      "Confirm 214A export/report readiness index and TypeScript are clean on owner machine.",
      "Keep provider_not_configured visible for every export/report surface.",
      "Lock gift ledger export, receipt report, creator payout report, tax/settlement report, and privacy redaction boundaries.",
      "Do not read DB, do not write export files, do not call provider payout, do not mutate Wallet, and do not enable runtime.",
      "Require a new exact owner approval package before any future export/report/DB read/runtime execution.",
    ] as const,
    blockedRuntimeActions: [
      "gift_ledger_export_runtime_read",
      "gift_ledger_report_runtime_read",
      "payout_audit_runtime_export",
      "report_runtime_export",
      "export_runtime_file_write",
      "db_read",
      "db_write",
      "provider_payout_call",
      "wallet_mutation",
      "payout_execution",
      "runtime_enablement",
    ] as const,
  } as const;
}

export function prepareStreamGiftLedgerExportReportFinalHandoff214B(
  rawInput: Partial<StreamGiftLedgerExportReportFinalHandoffInput214B> = {},
): StreamGiftLedgerExportReportFinalHandoffResult214B {
  const input = normalizeStreamGiftLedgerExportReportFinalHandoffInput214B(rawInput);

  if (input.ownerApproval !== STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "214B exact owner approval phrase is required for handoff preparation only.");
  }
  if (input.handoffMode !== "export_report_final_handoff_only") {
    return blocked("handoff_mode_disabled", "214B only prepares final handoff metadata and cannot execute runtime export/report work.");
  }
  if (input.acknowledged214AStage !== "214A_export_report_readiness_index_clean") {
    return blocked("previous_214a_readiness_required", "214A export/report readiness index must be clean before 214B.");
  }
  if (input.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "At least one non-secret evidence reference is required.");
  }
  if (input.handoffAreas.length === 0) {
    return blocked("handoff_areas_required", "Handoff areas are required.");
  }
  if (input.reportSurfaces.length === 0) {
    return blocked("report_surfaces_required", "Report surfaces are required.");
  }
  for (const area of STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B) {
    if (!input.handoffAreas.includes(area)) {
      return blocked("missing_required_area", `Missing required 214B area: ${area}`);
    }
  }
  for (const surface of STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B) {
    if (!input.reportSurfaces.includes(surface)) {
      return blocked("missing_required_surface", `Missing required 214B surface: ${surface}`);
    }
  }
  if (hasForbiddenValue(input)) {
    return blocked("raw_secret_or_provider_value_rejected", "Raw secrets or provider values are not accepted in 214B.");
  }

  const envelope: StreamGiftLedgerExportReportFinalHandoffEnvelope214B = {
    contract: "stream.gift.export-report-final-handoff.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    previousStageRequired: "214A_export_report_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B,
    requiredSurfaces: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B,
    handoffAreas: input.handoffAreas,
    reportSurfaces: input.reportSurfaces,
    evidenceReferences: input.evidenceReferences,
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    previous214AReadinessRequired: true,
    payoutAuditTrailBoundaryLocked: true,
    giftLedgerExportBoundaryLocked: true,
    giftReceiptReportBoundaryLocked: true,
    creatorPayoutReportBoundaryLocked: true,
    taxWithholdingReportBoundaryLocked: true,
    settlementReportBoundaryLocked: true,
    adminExportReviewEvidenceLocked: true,
    privacyRedactionBoundaryLocked: true,
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
    nextStage: "closed_stream_gifts_export_report_future_exports_db_read_or_runtime_require_exact_owner_approval",
  } as const;

  const result: StreamGiftLedgerExportReportFinalHandoffPrepared214B = {
    ok: true,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    status: "export_report_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_SAFETY,
  } as const;

  return result;
}

function lockedRequest(action: string) {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_VERSION,
    status: "locked_requires_new_exact_owner_approval",
    action,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    giftLedgerExportRuntimeReadExecuted: false,
    reportRuntimeExportExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
    requiredNextApproval: "new_exact_owner_approval_and_separate_execution_package",
  } as const;
}

export function createStreamGiftLedgerExportReportFinalHandoff214BGiftLedgerExportRequest() {
  return lockedRequest("gift_ledger_export_runtime_read");
}

export function createStreamGiftLedgerExportReportFinalHandoff214BReportExportRequest() {
  return lockedRequest("report_runtime_export");
}

export function createStreamGiftLedgerExportReportFinalHandoff214BPayoutAuditExportRequest() {
  return lockedRequest("payout_audit_runtime_export");
}

export function createStreamGiftLedgerExportReportFinalHandoff214BDbReadRequest() {
  return lockedRequest("db_read");
}

export function createStreamGiftLedgerExportReportFinalHandoff214BPayoutExecutionRequest() {
  return lockedRequest("payout_execution");
}
