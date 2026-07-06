export const STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-217A" as const;

export type StreamGiftLedgerFraudRiskVelocityReadinessArea217A =
  | "previous_216b_compliance_evidence_handoff_locked"
  | "fraud_velocity_boundary_visible"
  | "abuse_pattern_boundary_visible"
  | "gift_spam_boundary_visible"
  | "chargeback_fraud_signal_boundary_visible"
  | "sender_limit_review_boundary_visible"
  | "recipient_risk_review_boundary_visible"
  | "admin_risk_velocity_review_evidence_visible"
  | "regular_user_no_cashout_boundary_locked"
  | "demo_points_no_cashout_boundary_locked"
  | "future_risk_runtime_decision_approval_required"
  | "future_velocity_runtime_decision_approval_required"
  | "future_db_read_approval_required"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerFraudRiskVelocitySurface217A =
  | "admin_fraud_risk_velocity_snapshot"
  | "risk_velocity_limit_preview"
  | "gift_spam_abuse_pattern_preview"
  | "chargeback_fraud_signal_runbook"
  | "sender_recipient_risk_review_runbook"
  | "provider_not_configured_visibility";

export type StreamGiftLedgerFraudRiskVelocitySafety217A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous216BHandoffRequired: true;
  fraudVelocityBoundaryVisible: true;
  abusePatternBoundaryVisible: true;
  giftSpamBoundaryVisible: true;
  chargebackFraudSignalBoundaryVisible: true;
  senderLimitReviewBoundaryVisible: true;
  recipientRiskReviewBoundaryVisible: true;
  adminRiskVelocityReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  fraudRiskRuntimeDecisionExecuted: false;
  velocityRuntimeDecisionExecuted: false;
  abuseRuntimeDecisionExecuted: false;
  adminRiskToggleExecuted: false;
  providerRiskCallExecuted: false;
  providerComplianceCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  complianceRuntimeDecisionExecuted: false;
  kycKybRuntimeDecisionExecuted: false;
  amlSanctionsRuntimeDecisionExecuted: false;
  privacyRuntimeRedactionExecuted: false;
  retentionRuntimePurgeExecuted: false;
  dataSubjectRuntimeExportExecuted: false;
  giftLedgerExportRuntimeReadExecuted: false;
  giftLedgerReportRuntimeReadExecuted: false;
  payoutAuditRuntimeExportExecuted: false;
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
  futureFraudRiskDecisionRequiresSeparateApproval: true;
  futureVelocityDecisionRequiresSeparateApproval: true;
  futureAbuseDecisionRequiresSeparateApproval: true;
  futureProviderRiskCallRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerFraudRiskVelocityReadinessInput217A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "fraud_risk_velocity_readiness_index_only" | "disabled";
  acknowledged216BStage?: "216B_compliance_evidence_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerFraudRiskVelocityReadinessArea217A[];
  riskSurfaces: readonly StreamGiftLedgerFraudRiskVelocitySurface217A[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerFraudRiskVelocityBlockedCode217A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_216b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "risk_surfaces_required"
  | "missing_required_area"
  | "missing_required_surface"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerFraudRiskVelocityBlocked217A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION;
  status: "fraud_risk_velocity_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerFraudRiskVelocityBlockedCode217A;
  blockedReason: string;
  readinessIndexPrepared: false;
  providerNotConfiguredVisible: true;
  fraudRiskRuntimeDecisionExecuted: false;
  velocityRuntimeDecisionExecuted: false;
  abuseRuntimeDecisionExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerFraudRiskVelocitySafety217A;
}>;

export type StreamGiftLedgerFraudRiskVelocityReadinessEnvelope217A = Readonly<{
  contract: "stream.gift.fraud-risk-velocity-readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION;
  previousStageRequired: "216B_compliance_evidence_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerFraudRiskVelocityReadinessArea217A[];
  requiredSurfaces: readonly StreamGiftLedgerFraudRiskVelocitySurface217A[];
  readinessAreas: readonly StreamGiftLedgerFraudRiskVelocityReadinessArea217A[];
  riskSurfaces: readonly StreamGiftLedgerFraudRiskVelocitySurface217A[];
  evidenceReferences: readonly string[];
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  previous216BHandoffRequired: true;
  fraudVelocityBoundaryVisible: true;
  abusePatternBoundaryVisible: true;
  giftSpamBoundaryVisible: true;
  chargebackFraudSignalBoundaryVisible: true;
  senderLimitReviewBoundaryVisible: true;
  recipientRiskReviewBoundaryVisible: true;
  adminRiskVelocityReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  fraudRiskRuntimeDecisionExecuted: false;
  velocityRuntimeDecisionExecuted: false;
  abuseRuntimeDecisionExecuted: false;
  providerRiskCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  runtimeExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureFraudRiskDecisionRequiresSeparateApproval: true;
  futureVelocityDecisionRequiresSeparateApproval: true;
  futureAbuseDecisionRequiresSeparateApproval: true;
  futureProviderRiskCallRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  nextStage: "217B_stream_gifts_fraud_risk_velocity_final_handoff";
}>;

export type StreamGiftLedgerFraudRiskVelocityPrepared217A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION;
  status: "fraud_risk_velocity_readiness_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerFraudRiskVelocityReadinessEnvelope217A;
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  fraudRiskRuntimeDecisionExecuted: false;
  velocityRuntimeDecisionExecuted: false;
  abuseRuntimeDecisionExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerFraudRiskVelocitySafety217A;
}>;

export type StreamGiftLedgerFraudRiskVelocityResult217A =
  | StreamGiftLedgerFraudRiskVelocityPrepared217A
  | StreamGiftLedgerFraudRiskVelocityBlocked217A;

export type StreamGiftLedgerFraudRiskVelocitySnapshot217A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION;
  status: "ready_for_fraud_risk_velocity_readiness_without_runtime_enablement";
  previousStageRequired: "216B_compliance_evidence_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  fraudVelocityBoundaryVisible: true;
  abusePatternBoundaryVisible: true;
  giftSpamBoundaryVisible: true;
  chargebackFraudSignalBoundaryVisible: true;
  senderLimitReviewBoundaryVisible: true;
  recipientRiskReviewBoundaryVisible: true;
  adminRiskVelocityReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  fraudRiskRuntimeDecisionExecuted: false;
  velocityRuntimeDecisionExecuted: false;
  abuseRuntimeDecisionExecuted: false;
  providerRiskCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  providerRuntimeEnabled: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "217B_stream_gifts_fraud_risk_velocity_final_handoff";
}>;

export type StreamGiftLedgerFraudRiskVelocityRunbook217A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_VERSION;
  title: "Stream Gifts fraud/risk/velocity readiness index without runtime enablement";
  requiredBeforeRuntime: readonly string[];
  blockedUntilSeparateApproval: readonly string[];
  safety: StreamGiftLedgerFraudRiskVelocitySafety217A;
}>;
