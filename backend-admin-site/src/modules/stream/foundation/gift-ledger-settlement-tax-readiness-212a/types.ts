export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-212A" as const;

export type StreamGiftLedgerSettlementTaxReadinessArea212A =
  | "previous_211b_payout_eligibility_handoff_locked"
  | "official_streamer_agreement_boundary_visible"
  | "tax_withholding_policy_boundary_visible"
  | "settlement_hold_policy_boundary_visible"
  | "creator_country_tax_profile_boundary_visible"
  | "invoice_receipt_evidence_boundary_visible"
  | "admin_settlement_review_evidence_visible"
  | "provider_not_configured_visibility_locked"
  | "wallet_payout_boundary_locked"
  | "provider_payout_boundary_locked"
  | "payout_execution_boundary_locked"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerSettlementTaxReadinessSafety212A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous211BHandoffRequired: true;
  taxWithholdingPolicyBoundaryVisible: true;
  settlementHoldPolicyBoundaryVisible: true;
  creatorCountryTaxProfileBoundaryVisible: true;
  invoiceReceiptEvidenceBoundaryVisible: true;
  adminSettlementReviewEvidenceVisible: true;
  walletPayoutBoundaryLocked: true;
  providerPayoutBoundaryLocked: true;
  payoutExecutionBoundaryLocked: true;
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
  dbReadExecuted: false;
  dbWriteExecuted: false;
  schemaWriteExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  realtimeEmitExecuted: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  fakePaymentSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureSettlementDecisionRequiresSeparateApproval: true;
  futureTaxWithholdingDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerSettlementTaxReadinessInput212A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "settlement_tax_readiness_index_only" | "disabled";
  acknowledged211BStage?: "211B_payout_eligibility_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerSettlementTaxReadinessArea212A[];
  settlementSurfaces: readonly string[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerSettlementTaxReadinessBlockedCode212A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_211b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "settlement_surfaces_required"
  | "required_settlement_surface_missing"
  | "missing_required_area"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerSettlementTaxReadinessBlocked212A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION;
  status: "settlement_tax_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerSettlementTaxReadinessBlockedCode212A;
  blockedReason: string;
  readinessPrepared: false;
  providerNotConfiguredVisible: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSettlementTaxReadinessSafety212A;
}>;

export type StreamGiftLedgerSettlementTaxReadinessEnvelope212A = Readonly<{
  contract: "stream.gift.settlement-tax-readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION;
  previousStageRequired: "211B_payout_eligibility_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerSettlementTaxReadinessArea212A[];
  readinessAreas: readonly StreamGiftLedgerSettlementTaxReadinessArea212A[];
  evidenceReferences: readonly string[];
  settlementSurfaces: readonly string[];
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  previous211BHandoffRequired: true;
  officialStreamerAgreementBoundaryVisible: true;
  taxWithholdingPolicyBoundaryVisible: true;
  settlementHoldPolicyBoundaryVisible: true;
  creatorCountryTaxProfileBoundaryVisible: true;
  invoiceReceiptEvidenceBoundaryVisible: true;
  adminSettlementReviewEvidenceVisible: true;
  walletPayoutBoundaryLocked: true;
  providerPayoutBoundaryLocked: true;
  payoutExecutionBoundaryLocked: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutEligibilityRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  runtimeExecutionApprovedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureSettlementDecisionRequiresSeparateApproval: true;
  futureTaxWithholdingDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  nextStage: "212B_stream_gifts_settlement_tax_withholding_final_handoff";
}>;

export type StreamGiftLedgerSettlementTaxReadinessPrepared212A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION;
  status: "settlement_tax_readiness_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerSettlementTaxReadinessEnvelope212A;
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSettlementTaxReadinessSafety212A;
}>;

export type StreamGiftLedgerSettlementTaxReadinessResult212A =
  | StreamGiftLedgerSettlementTaxReadinessPrepared212A
  | StreamGiftLedgerSettlementTaxReadinessBlocked212A;

export type StreamGiftLedgerSettlementTaxReadinessSnapshot212A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_VERSION;
  status: "ready_for_settlement_tax_readiness_without_runtime_enablement";
  previousStageRequired: "211B_payout_eligibility_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  officialStreamerAgreementBoundaryVisible: true;
  taxWithholdingPolicyBoundaryVisible: true;
  settlementHoldPolicyBoundaryVisible: true;
  creatorCountryTaxProfileBoundaryVisible: true;
  invoiceReceiptEvidenceBoundaryVisible: true;
  adminSettlementReviewEvidenceVisible: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  providerRuntimeEnabled: false;
  nextStage: "212B_stream_gifts_settlement_tax_withholding_final_handoff";
  safety: StreamGiftLedgerSettlementTaxReadinessSafety212A;
}>;
