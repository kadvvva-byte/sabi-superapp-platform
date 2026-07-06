export const STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-212B" as const;

export type StreamGiftLedgerSettlementTaxFinalHandoffArea212B =
  | "previous_212a_settlement_tax_readiness_locked"
  | "previous_211b_payout_eligibility_handoff_locked"
  | "provider_not_configured_visibility_locked"
  | "official_streamer_agreement_boundary_locked"
  | "tax_withholding_policy_boundary_locked"
  | "settlement_hold_policy_boundary_locked"
  | "creator_country_tax_profile_boundary_locked"
  | "invoice_receipt_evidence_boundary_locked"
  | "admin_settlement_review_evidence_locked"
  | "wallet_payout_boundary_locked"
  | "provider_payout_boundary_locked"
  | "payout_execution_boundary_locked"
  | "future_exact_owner_approval_required";

export type StreamGiftLedgerSettlementTaxFinalHandoffSafety212B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous212AReadinessRequired: true;
  previous211BHandoffRequired: true;
  officialStreamerAgreementBoundaryLocked: true;
  taxWithholdingPolicyBoundaryLocked: true;
  settlementHoldPolicyBoundaryLocked: true;
  creatorCountryTaxProfileBoundaryLocked: true;
  invoiceReceiptEvidenceBoundaryLocked: true;
  adminSettlementReviewEvidenceLocked: true;
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
  giftDeliveryRealtimeEmitExecuted: false;
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
  futureSettlementDecisionRequiresSeparateApproval: true;
  futureTaxWithholdingDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerSettlementTaxFinalHandoffInput212B = Readonly<{
  ownerApproval?: string;
  handoffMode?: "settlement_tax_final_handoff_only" | "disabled";
  acknowledged212AStage?: "212A_settlement_tax_readiness_index_clean" | "disabled";
  evidenceReferences: readonly string[];
  handoffAreas: readonly StreamGiftLedgerSettlementTaxFinalHandoffArea212B[];
  settlementSurfaces: readonly string[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerSettlementTaxFinalHandoffBlockedCode212B =
  | "owner_approval_required"
  | "handoff_mode_disabled"
  | "previous_212a_readiness_required"
  | "evidence_references_required"
  | "handoff_areas_required"
  | "settlement_surfaces_required"
  | "required_settlement_surface_missing"
  | "missing_required_area"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerSettlementTaxFinalHandoffBlocked212B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION;
  status: "settlement_tax_final_handoff_blocked_without_runtime_enablement";
  code: StreamGiftLedgerSettlementTaxFinalHandoffBlockedCode212B;
  blockedReason: string;
  finalHandoffPrepared: false;
  providerNotConfiguredVisible: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSettlementTaxFinalHandoffSafety212B;
}>;

export type StreamGiftLedgerSettlementTaxFinalHandoffEnvelope212B = Readonly<{
  contract: "stream.gift.settlement-tax-final-handoff.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION;
  previousStageRequired: "212A_settlement_tax_readiness_index_clean";
  requiredAreas: readonly StreamGiftLedgerSettlementTaxFinalHandoffArea212B[];
  handoffAreas: readonly StreamGiftLedgerSettlementTaxFinalHandoffArea212B[];
  evidenceReferences: readonly string[];
  settlementSurfaces: readonly string[];
  finalHandoffPrepared: true;
  providerNotConfiguredVisible: true;
  previous212AReadinessRequired: true;
  previous211BHandoffRequired: true;
  officialStreamerAgreementBoundaryLocked: true;
  taxWithholdingPolicyBoundaryLocked: true;
  settlementHoldPolicyBoundaryLocked: true;
  creatorCountryTaxProfileBoundaryLocked: true;
  invoiceReceiptEvidenceBoundaryLocked: true;
  adminSettlementReviewEvidenceLocked: true;
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
  sendIntentRuntimeExecutionExecuted: false;
  giftReceiptRuntimeWriteExecuted: false;
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
  futureSettlementDecisionRequiresSeparateApproval: true;
  futureTaxWithholdingDecisionRequiresSeparateApproval: true;
  futureWalletPayoutRequiresSeparateApproval: true;
  futureProviderPayoutRequiresSeparateApproval: true;
  futurePayoutExecutionRequiresSeparateApproval: true;
  nextStage: "closed_stream_gifts_settlement_tax_withholding_future_decisions_payout_or_runtime_require_exact_owner_approval";
}>;

export type StreamGiftLedgerSettlementTaxFinalHandoffPrepared212B = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION;
  status: "settlement_tax_final_handoff_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerSettlementTaxFinalHandoffEnvelope212B;
  finalHandoffPrepared: true;
  providerNotConfiguredVisible: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerSettlementTaxFinalHandoffSafety212B;
}>;

export type StreamGiftLedgerSettlementTaxFinalHandoffResult212B =
  | StreamGiftLedgerSettlementTaxFinalHandoffPrepared212B
  | StreamGiftLedgerSettlementTaxFinalHandoffBlocked212B;

export type StreamGiftLedgerSettlementTaxFinalHandoffSnapshot212B = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_VERSION;
  status: "ready_for_settlement_tax_final_handoff_without_runtime_enablement";
  previousStageRequired: "212A_settlement_tax_readiness_index_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  officialStreamerAgreementBoundaryLocked: true;
  taxWithholdingPolicyBoundaryLocked: true;
  settlementHoldPolicyBoundaryLocked: true;
  creatorCountryTaxProfileBoundaryLocked: true;
  invoiceReceiptEvidenceBoundaryLocked: true;
  adminSettlementReviewEvidenceLocked: true;
  settlementRuntimeDecisionExecuted: false;
  taxWithholdingRuntimeDecisionExecuted: false;
  payoutExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  providerRuntimeEnabled: false;
  nextStage: "closed_stream_gifts_settlement_tax_withholding_future_decisions_payout_or_runtime_require_exact_owner_approval";
  safety: StreamGiftLedgerSettlementTaxFinalHandoffSafety212B;
}>;
