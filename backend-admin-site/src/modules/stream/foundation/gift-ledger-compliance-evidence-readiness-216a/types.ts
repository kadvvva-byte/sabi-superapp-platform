export const STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-216A" as const;

export type StreamGiftLedgerComplianceEvidenceReadinessArea216A =
  | "previous_215b_privacy_retention_handoff_locked"
  | "kyc_evidence_boundary_visible"
  | "kyb_evidence_boundary_visible"
  | "aml_screening_evidence_boundary_visible"
  | "sanctions_screening_evidence_boundary_visible"
  | "age_region_compliance_evidence_boundary_visible"
  | "official_streamer_agreement_evidence_visible"
  | "admin_compliance_review_evidence_visible"
  | "future_compliance_runtime_decision_approval_required"
  | "future_db_read_approval_required"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerComplianceEvidenceSurface216A =
  | "admin_compliance_snapshot"
  | "kyc_kyb_evidence_preview"
  | "aml_sanctions_evidence_preview"
  | "age_region_compliance_runbook"
  | "official_streamer_agreement_runbook"
  | "provider_not_configured_visibility";

export type StreamGiftLedgerComplianceEvidenceSafety216A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous215BHandoffRequired: true;
  kycEvidenceBoundaryVisible: true;
  kybEvidenceBoundaryVisible: true;
  amlScreeningEvidenceBoundaryVisible: true;
  sanctionsScreeningEvidenceBoundaryVisible: true;
  ageRegionComplianceEvidenceBoundaryVisible: true;
  officialStreamerAgreementEvidenceVisible: true;
  adminComplianceReviewEvidenceVisible: true;
  complianceRuntimeDecisionExecuted: false;
  kycKybRuntimeDecisionExecuted: false;
  amlSanctionsRuntimeDecisionExecuted: false;
  providerComplianceCallExecuted: false;
  providerKycCallExecuted: false;
  providerAmlCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
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
  futureComplianceDecisionRequiresSeparateApproval: true;
  futureKycKybDecisionRequiresSeparateApproval: true;
  futureAmlSanctionsDecisionRequiresSeparateApproval: true;
  futureProviderComplianceCallRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerComplianceEvidenceReadinessInput216A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "compliance_evidence_readiness_index_only" | "disabled";
  acknowledged215BStage?: "215B_privacy_redaction_retention_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerComplianceEvidenceReadinessArea216A[];
  complianceSurfaces: readonly StreamGiftLedgerComplianceEvidenceSurface216A[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerComplianceEvidenceBlockedCode216A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_215b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "compliance_surfaces_required"
  | "missing_required_area"
  | "missing_required_surface"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerComplianceEvidenceBlocked216A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION;
  status: "compliance_evidence_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerComplianceEvidenceBlockedCode216A;
  blockedReason: string;
  readinessIndexPrepared: false;
  providerNotConfiguredVisible: true;
  complianceRuntimeDecisionExecuted: false;
  providerComplianceCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerComplianceEvidenceSafety216A;
}>;

export type StreamGiftLedgerComplianceEvidenceReadinessEnvelope216A = Readonly<{
  contract: "stream.gift.compliance-evidence-readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION;
  previousStageRequired: "215B_privacy_redaction_retention_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerComplianceEvidenceReadinessArea216A[];
  requiredSurfaces: readonly StreamGiftLedgerComplianceEvidenceSurface216A[];
  readinessAreas: readonly StreamGiftLedgerComplianceEvidenceReadinessArea216A[];
  complianceSurfaces: readonly StreamGiftLedgerComplianceEvidenceSurface216A[];
  evidenceReferences: readonly string[];
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  previous215BHandoffRequired: true;
  kycEvidenceBoundaryVisible: true;
  kybEvidenceBoundaryVisible: true;
  amlScreeningEvidenceBoundaryVisible: true;
  sanctionsScreeningEvidenceBoundaryVisible: true;
  ageRegionComplianceEvidenceBoundaryVisible: true;
  officialStreamerAgreementEvidenceVisible: true;
  adminComplianceReviewEvidenceVisible: true;
  complianceRuntimeDecisionExecuted: false;
  kycKybRuntimeDecisionExecuted: false;
  amlSanctionsRuntimeDecisionExecuted: false;
  providerComplianceCallExecuted: false;
  providerKycCallExecuted: false;
  providerAmlCallExecuted: false;
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
  futureComplianceDecisionRequiresSeparateApproval: true;
  futureKycKybDecisionRequiresSeparateApproval: true;
  futureAmlSanctionsDecisionRequiresSeparateApproval: true;
  futureProviderComplianceCallRequiresSeparateApproval: true;
  futureDbReadRequiresSeparateApproval: true;
  nextStage: "216B_stream_gifts_compliance_evidence_final_handoff";
}>;

export type StreamGiftLedgerComplianceEvidencePrepared216A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION;
  status: "compliance_evidence_readiness_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerComplianceEvidenceReadinessEnvelope216A;
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  complianceRuntimeDecisionExecuted: false;
  providerComplianceCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerComplianceEvidenceSafety216A;
}>;

export type StreamGiftLedgerComplianceEvidenceResult216A =
  | StreamGiftLedgerComplianceEvidencePrepared216A
  | StreamGiftLedgerComplianceEvidenceBlocked216A;

export type StreamGiftLedgerComplianceEvidenceSnapshot216A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION;
  status: "ready_for_compliance_evidence_readiness_without_runtime_enablement";
  previousStageRequired: "215B_privacy_redaction_retention_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  kycEvidenceBoundaryVisible: true;
  kybEvidenceBoundaryVisible: true;
  amlScreeningEvidenceBoundaryVisible: true;
  sanctionsScreeningEvidenceBoundaryVisible: true;
  ageRegionComplianceEvidenceBoundaryVisible: true;
  officialStreamerAgreementEvidenceVisible: true;
  adminComplianceReviewEvidenceVisible: true;
  complianceRuntimeDecisionExecuted: false;
  providerComplianceCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  providerRuntimeEnabled: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  nextStage: "216B_stream_gifts_compliance_evidence_final_handoff";
}>;

export type StreamGiftLedgerComplianceEvidenceRunbook216A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_VERSION;
  steps: readonly string[];
  lockedRuntimeRequests: readonly string[];
  nextStage: "216B_stream_gifts_compliance_evidence_final_handoff";
}>;
