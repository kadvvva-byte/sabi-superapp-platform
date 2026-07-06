export const STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-214A" as const;

export type StreamGiftLedgerExportReportReadinessArea214A =
  | "previous_213b_payout_audit_handoff_locked"
  | "payout_audit_trail_boundary_visible"
  | "gift_ledger_export_boundary_visible"
  | "gift_receipt_report_boundary_visible"
  | "creator_payout_report_boundary_visible"
  | "tax_withholding_report_boundary_visible"
  | "settlement_report_boundary_visible"
  | "admin_export_review_evidence_visible"
  | "privacy_redaction_boundary_visible"
  | "regular_user_no_cashout_boundary_locked"
  | "demo_points_no_cashout_boundary_locked"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerExportReportSurface214A =
  | "admin_readiness_snapshot"
  | "export_contract_preview"
  | "report_contract_preview"
  | "privacy_redaction_boundary"
  | "approval_boundary_runbook"
  | "provider_not_configured_visibility";

export type StreamGiftLedgerExportReportReadinessSafety214A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous213BHandoffRequired: true;
  giftLedgerExportBoundaryVisible: true;
  giftReceiptReportBoundaryVisible: true;
  creatorPayoutReportBoundaryVisible: true;
  taxWithholdingReportBoundaryVisible: true;
  settlementReportBoundaryVisible: true;
  adminExportReviewEvidenceVisible: true;
  privacyRedactionBoundaryVisible: true;
  payoutAuditTrailBoundaryVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  giftLedgerExportRuntimeReadExecuted: false;
  giftLedgerReportRuntimeReadExecuted: false;
  payoutAuditRuntimeExportExecuted: false;
  payoutAuditRuntimeWriteExecuted: false;
  reportRuntimeExportExecuted: false;
  exportRuntimeFileWriteExecuted: false;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecutionExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  sendIntentRuntimeExecutionExecuted: false;
  giftReceiptRuntimeWriteExecuted: false;
  giftLedgerRuntimeWriteExecuted: false;
  giftDeliveryRealtimeEmitExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  realtimeEmitExecuted: false;
  runtimeEnablementExecuted: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureGiftLedgerExportRequiresSeparateApproval: true;
  futureReportExportRequiresSeparateApproval: true;
  futurePayoutAuditExportRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerExportReportReadinessInput214A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "export_report_readiness_index_only" | "disabled";
  acknowledged213BStage?: "213B_payout_audit_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerExportReportReadinessArea214A[];
  reportSurfaces: readonly StreamGiftLedgerExportReportSurface214A[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerExportReportReadinessBlockedCode214A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_213b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "report_surfaces_required"
  | "missing_required_area"
  | "missing_required_surface"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerExportReportReadinessBlocked214A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION;
  status: "export_report_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerExportReportReadinessBlockedCode214A;
  blockedReason: string;
  readinessIndexPrepared: false;
  providerNotConfiguredVisible: true;
  giftLedgerExportRuntimeReadExecuted: false;
  reportRuntimeExportExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerExportReportReadinessSafety214A;
}>;

export type StreamGiftLedgerExportReportReadinessEnvelope214A = Readonly<{
  contract: "stream.gift.export-report-readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION;
  previousStageRequired: "213B_payout_audit_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerExportReportReadinessArea214A[];
  requiredSurfaces: readonly StreamGiftLedgerExportReportSurface214A[];
  readinessAreas: readonly StreamGiftLedgerExportReportReadinessArea214A[];
  reportSurfaces: readonly StreamGiftLedgerExportReportSurface214A[];
  evidenceReferences: readonly string[];
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  previous213BHandoffRequired: true;
  payoutAuditTrailBoundaryVisible: true;
  giftLedgerExportBoundaryVisible: true;
  giftReceiptReportBoundaryVisible: true;
  creatorPayoutReportBoundaryVisible: true;
  taxWithholdingReportBoundaryVisible: true;
  settlementReportBoundaryVisible: true;
  adminExportReviewEvidenceVisible: true;
  privacyRedactionBoundaryVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  giftLedgerExportRuntimeReadExecuted: false;
  giftLedgerReportRuntimeReadExecuted: false;
  payoutAuditRuntimeExportExecuted: false;
  reportRuntimeExportExecuted: false;
  exportRuntimeFileWriteExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  runtimeExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureGiftLedgerExportRequiresSeparateApproval: true;
  futureReportExportRequiresSeparateApproval: true;
  futurePayoutAuditExportRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  nextStage: "214B_stream_gifts_export_report_final_handoff";
}>;

export type StreamGiftLedgerExportReportReadinessPrepared214A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION;
  status: "export_report_readiness_index_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerExportReportReadinessEnvelope214A;
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  giftLedgerExportRuntimeReadExecuted: false;
  reportRuntimeExportExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerExportReportReadinessSafety214A;
}>;

export type StreamGiftLedgerExportReportReadinessResult214A =
  | StreamGiftLedgerExportReportReadinessPrepared214A
  | StreamGiftLedgerExportReportReadinessBlocked214A;

export type StreamGiftLedgerExportReportReadinessSnapshot214A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_VERSION;
  status: "ready_for_export_report_readiness_index_without_runtime_enablement";
  previousStageRequired: "213B_payout_audit_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  giftLedgerExportBoundaryVisible: true;
  giftReceiptReportBoundaryVisible: true;
  creatorPayoutReportBoundaryVisible: true;
  taxWithholdingReportBoundaryVisible: true;
  settlementReportBoundaryVisible: true;
  adminExportReviewEvidenceVisible: true;
  privacyRedactionBoundaryVisible: true;
  giftLedgerExportRuntimeReadExecuted: false;
  reportRuntimeExportExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  providerRuntimeEnabled: false;
  nextStage: "214B_stream_gifts_export_report_final_handoff";
  safety: StreamGiftLedgerExportReportReadinessSafety214A;
}>;
