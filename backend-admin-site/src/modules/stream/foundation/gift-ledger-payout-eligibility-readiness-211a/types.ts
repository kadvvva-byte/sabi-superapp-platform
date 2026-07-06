export const STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-211A" as const;

export type StreamGiftLedgerPayoutEligibilityReadinessArea211A =
  | "previous_210b_eligibility_risk_handoff_locked"
  | "previous_209b_send_intent_audit_handoff_locked"
  | "provider_not_configured_visibility_locked"
  | "official_streamer_agreement_boundary_visible"
  | "kyc_kyb_aml_boundary_visible"
  | "tax_withholding_boundary_visible"
  | "settlement_hold_boundary_visible"
  | "fraud_risk_review_boundary_visible"
  | "admin_payout_review_evidence_visible"
  | "regular_user_no_cashout_boundary_locked"
  | "demo_points_no_cashout_boundary_locked"
  | "wallet_payout_boundary_locked"
  | "provider_payout_boundary_locked"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerPayoutEligibilityReadinessSafety211A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous210BHandoffRequired: true;
  previous209BHandoffRequired: true;
  officialStreamerAgreementBoundaryVisible: true;
  kycKybAmlBoundaryVisible: true;
  taxWithholdingBoundaryVisible: true;
  settlementHoldBoundaryVisible: true;
  fraudRiskReviewBoundaryVisible: true;
  adminPayoutReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  walletPayoutBoundaryLocked: true;
  providerPayoutBoundaryLocked: true;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecutionExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  sendIntentRuntimeExecutionExecuted: false;
  giftReceiptRuntimeWriteExecuted: false;
  giftLedgerRuntimeWriteExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  schemaWriteExecuted: false;
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
  futurePayoutEligibilityDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerPayoutEligibilityReadinessInput211A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "payout_eligibility_readiness_index_only" | "disabled";
  acknowledged210BStage?: "210B_eligibility_risk_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[];
  payoutSurfaces: readonly string[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerPayoutEligibilityReadinessBlockedCode211A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_210b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "payout_surfaces_required"
  | "missing_required_area"
  | "required_payout_surface_missing"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerPayoutEligibilityReadinessBlocked211A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION;
  status: "payout_eligibility_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerPayoutEligibilityReadinessBlockedCode211A;
  blockedReason: string;
  readinessPrepared: false;
  providerNotConfiguredVisible: true;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerPayoutEligibilityReadinessSafety211A;
}>;

export type StreamGiftLedgerPayoutEligibilityReadinessEnvelope211A = Readonly<{
  contract: "stream.gift.payout-eligibility-readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION;
  previousStageRequired: "210B_eligibility_risk_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[];
  readinessAreas: readonly StreamGiftLedgerPayoutEligibilityReadinessArea211A[];
  evidenceReferences: readonly string[];
  payoutSurfaces: readonly string[];
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  previous210BHandoffRequired: true;
  previous209BHandoffRequired: true;
  officialStreamerAgreementBoundaryVisible: true;
  kycKybAmlBoundaryVisible: true;
  taxWithholdingBoundaryVisible: true;
  settlementHoldBoundaryVisible: true;
  fraudRiskReviewBoundaryVisible: true;
  adminPayoutReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  walletPayoutBoundaryLocked: true;
  providerPayoutBoundaryLocked: true;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  sendIntentRuntimeExecutionExecuted: false;
  giftLedgerRuntimeWriteExecuted: false;
  runtimeExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futurePayoutEligibilityDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  nextStage: "211B_stream_gifts_official_streamer_payout_eligibility_final_handoff";
}>;

export type StreamGiftLedgerPayoutEligibilityReadinessPrepared211A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION;
  status: "payout_eligibility_readiness_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerPayoutEligibilityReadinessEnvelope211A;
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerPayoutEligibilityReadinessSafety211A;
}>;

export type StreamGiftLedgerPayoutEligibilityReadinessResult211A =
  | StreamGiftLedgerPayoutEligibilityReadinessPrepared211A
  | StreamGiftLedgerPayoutEligibilityReadinessBlocked211A;

export type StreamGiftLedgerPayoutEligibilityReadinessSnapshot211A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_VERSION;
  status: "ready_for_payout_eligibility_readiness_without_runtime_enablement";
  previousStageRequired: "210B_eligibility_risk_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  officialStreamerAgreementBoundaryVisible: true;
  kycKybAmlBoundaryVisible: true;
  taxWithholdingBoundaryVisible: true;
  settlementHoldBoundaryVisible: true;
  fraudRiskReviewBoundaryVisible: true;
  adminPayoutReviewEvidenceVisible: true;
  regularUserNoCashoutBoundaryLocked: true;
  demoPointsNoCashoutBoundaryLocked: true;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  providerRuntimeEnabled: false;
  nextStage: "211B_stream_gifts_official_streamer_payout_eligibility_final_handoff";
  safety: StreamGiftLedgerPayoutEligibilityReadinessSafety211A;
}>;
