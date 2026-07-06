export const STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199A" as const;

export type StreamGiftLedgerProviderBindingKind199A =
  | "accept_payments"
  | "creator_payout"
  | "google_billing_diamonds"
  | "airwallex_merchant_rails";

export type StreamGiftLedgerProviderReferenceLabel199A = Readonly<{
  providerKind: StreamGiftLedgerProviderBindingKind199A;
  providerName: "google_billing" | "airwallex" | "bank" | "wallet" | "manual_review" | "other";
  envReferenceLabel: string;
  purpose: string;
}>;

export type StreamGiftLedgerRealProviderBindingApprovalSafety199A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutExecutionAllowedNow: false;
  dbWriteAllowedNow: false;
  migrationAllowedNow: false;
  realtimeEmitAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  separateExactOwnerApprovalRequiredFor199B: true;
  referenceLabelsOnly: true;
}>;

export type StreamGiftLedgerRealProviderBindingApprovalInput199A = Readonly<{
  ownerApproval?: string;
  bindingMode?: "exact_owner_approval_request" | "disabled";
  requestedBundle?: "stream_gifts_provider_binding" | "disabled";
  referenceLabels?: readonly StreamGiftLedgerProviderReferenceLabel199A[];
}>;

export type StreamGiftLedgerRealProviderBindingApprovalBlockedCode199A =
  | "owner_approval_required"
  | "binding_mode_disabled"
  | "reference_labels_required"
  | "missing_required_provider_kind"
  | "invalid_reference_label"
  | "raw_secret_or_provider_value_rejected"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerRealProviderBindingApprovalBlocked199A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION;
  status: "real_provider_binding_exact_owner_approval_blocked";
  code: StreamGiftLedgerRealProviderBindingApprovalBlockedCode199A;
  blockedReason: string;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerRealProviderBindingApprovalSafety199A;
}>;

export type StreamGiftLedgerRealProviderBindingApprovalEnvelope199A = Readonly<{
  contract: "stream.gift.provider_binding.exact_owner_approval_request.v1";
  version: typeof STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION;
  requestedBundle: "stream_gifts_provider_binding";
  referenceLabelCount: number;
  requiredProviderKinds: readonly StreamGiftLedgerProviderBindingKind199A[];
  providedProviderKinds: readonly StreamGiftLedgerProviderBindingKind199A[];
  acceptPaymentsProviderSeparated: true;
  creatorPayoutProviderSeparated: true;
  googleBillingDiamondsSeparated: true;
  airwallexMerchantRailsSeparated: true;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  walletMutationAllowed: false;
  rawSecretsIncluded: false;
  nextStage: "199B_provider_config_readiness_reference_labels_only";
}>;

export type StreamGiftLedgerRealProviderBindingApprovalPrepared199A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION;
  status: "real_provider_binding_exact_owner_approval_prepared_not_executed";
  code: "provider_binding_requires_199b_separate_execution";
  envelope: StreamGiftLedgerRealProviderBindingApprovalEnvelope199A;
  providerBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerRealProviderBindingApprovalSafety199A;
}>;

export type StreamGiftLedgerRealProviderBindingApprovalReadiness199A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION;
  status: "ready_for_exact_owner_approval_request_only";
  requiredPreviousStage: "198Z_final_audit_clean";
  currentStage: "199A_exact_owner_approval_boundary";
  nextStage: "199B_provider_config_readiness_reference_labels_only";
  productionBindingExecuted: false;
  providerLiveCallExecuted: false;
  payoutExecutionAllowed: false;
  safety: StreamGiftLedgerRealProviderBindingApprovalSafety199A;
}>;

export type StreamGiftLedgerRealProviderBindingApprovalResult199A =
  | StreamGiftLedgerRealProviderBindingApprovalPrepared199A
  | StreamGiftLedgerRealProviderBindingApprovalBlocked199A;
