export const STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198Z" as const;

export type StreamGiftLedgerFinalAuditProductionBindingSafety198Z = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  payoutExecutionAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  availableBalanceMutationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  migrationAllowedNow: false;
  prismaGenerateAllowedNow: false;
  adminApprovalRequired: true;
  separateExactOwnerApprovalRequiredForProductionBinding: true;
  hashOnlyProviderReferencesRequired: true;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawBankOrCardAccepted: false;
  rawProviderReferenceOutputAllowed: false;
  providerResponseBodyOutputAllowed: false;
  fakeCashOutAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerFinalAuditProductionBindingInput198Z = Readonly<{
  sendIntentId?: string;
  creatorUserId?: string;
  providerPayoutReferenceHash?: string;
  payoutDestinationReferenceHash?: string;
  finalAuditApproval?: string;
  productionBindingApproval?: string;
  requestedProvider?: "airwallex" | "bank" | "manual_review" | "other";
  bindingMode?: "server_side_provider_binding_request" | "manual_review" | "disabled";
}>;

export type StreamGiftLedgerFinalAuditProductionBindingBlockedCode198Z =
  | "send_intent_id_required"
  | "raw_provider_reference_rejected"
  | "provider_payout_reference_hash_required"
  | "final_audit_approval_required"
  | "production_binding_approval_required"
  | "generated_delegate_missing"
  | "ledger_commit_not_found"
  | "ledger_commit_incomplete"
  | "earning_not_available"
  | "settlement_gates_not_satisfied"
  | "production_binding_requires_separate_exact_owner_approval"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerFinalAuditGate198Z = Readonly<{
  name: string;
  passed: boolean;
  evidence: string;
}>;

export type StreamGiftLedgerFinalAuditInspection198Z = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION;
  status: "final_audit_inspected";
  sendIntentId: string;
  creatorUserId?: string;
  catalogItemId?: string;
  senderUserId?: string;
  receiverUserId?: string;
  sendIntentStatus?: string;
  ledgerEntryCount: number;
  creatorEarningFound: boolean;
  creatorEarningStatus?: string;
  pendingDiamondMicros: string;
  availableDiamondMicros: string;
  settlementGateCount: number;
  settlementGatesSatisfied: boolean;
  deliveryReceiptAuditCount: number;
  providerPayoutReferenceHashPresent: boolean;
  payoutDestinationReferenceHashPresent: boolean;
  finalAuditReady: boolean;
  productionProviderBindingRequestReady: boolean;
  productionProviderBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  gates: readonly StreamGiftLedgerFinalAuditGate198Z[];
  nextStage: "199A_separate_provider_binding_owner_approval_required" | "198Z_fix_required_before_provider_binding";
  safety: StreamGiftLedgerFinalAuditProductionBindingSafety198Z;
}>;

export type StreamGiftLedgerProductionBindingRequestEnvelope198Z = Readonly<{
  contract: "stream.gift.creator.payout.production_provider_binding_request.v1";
  version: typeof STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION;
  sendIntentId: string;
  requestedProvider: "airwallex" | "bank" | "manual_review" | "other";
  bindingMode: "server_side_provider_binding_request" | "manual_review";
  providerPayoutReferenceHashPresent: true;
  payoutDestinationReferenceHashPresent: boolean;
  finalAuditPassed: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  separateExactOwnerApprovalRequired: true;
}>;

export type StreamGiftLedgerFinalAuditProductionBindingBlocked198Z = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION;
  status: "final_audit_or_production_binding_blocked";
  code: StreamGiftLedgerFinalAuditProductionBindingBlockedCode198Z;
  blockedReason: string;
  providerBindingAllowed: false;
  providerLiveCallAllowed: false;
  payoutExecutionAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamGiftLedgerFinalAuditProductionBindingSafety198Z;
}>;

export type StreamGiftLedgerProductionBindingRequestPrepared198Z = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION;
  status: "production_provider_binding_request_prepared_separate_owner_approval_required";
  code: "production_binding_requires_separate_exact_owner_approval";
  sendIntentId: string;
  envelope: StreamGiftLedgerProductionBindingRequestEnvelope198Z;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  nextStage: "199A_real_provider_binding_exact_owner_approval";
  safety: StreamGiftLedgerFinalAuditProductionBindingSafety198Z;
}>;

export type StreamGiftLedgerFinalAuditProductionBindingResult198Z =
  | StreamGiftLedgerFinalAuditInspection198Z
  | StreamGiftLedgerFinalAuditProductionBindingBlocked198Z
  | StreamGiftLedgerProductionBindingRequestPrepared198Z;
