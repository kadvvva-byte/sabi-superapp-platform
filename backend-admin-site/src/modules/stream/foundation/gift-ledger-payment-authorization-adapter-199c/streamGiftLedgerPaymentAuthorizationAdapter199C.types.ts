export const STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199C" as const;

export type StreamGiftLedgerPaymentAuthorizationProviderKind199C =
  | "accept_payments"
  | "google_billing_diamonds"
  | "wallet_balance_authorization"
  | "manual_provider_reference_review";

export type StreamGiftLedgerPaymentAuthorizationProviderName199C =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "manual_review"
  | "other";

export type StreamGiftLedgerPaymentAuthorizationContext199C =
  | "stream_live"
  | "messenger"
  | "shorts"
  | "creator_profile";

export type StreamGiftLedgerPaymentAuthorizationAdapterSafety199C = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawPaymentTokenAccepted: false;
  rawPurchaseTokenAccepted: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerAuthorizationCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  paymentAuthorizationCompletedNow: false;
  dbWriteAllowedNow: false;
  ledgerCommitAllowedNow: false;
  realtimeEmitAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  referenceLabelsOnly: true;
  outputProviderAuthorizationReferenceHashAllowedOnlyAfterRealAdapter: true;
  separateExactOwnerApprovalRequiredFor199D: true;
}>;

export type StreamGiftLedgerPaymentAuthorizationReferenceLabel199C = Readonly<{
  providerKind: StreamGiftLedgerPaymentAuthorizationProviderKind199C;
  providerName: StreamGiftLedgerPaymentAuthorizationProviderName199C;
  envReferenceLabel: string;
  purpose: string;
  serverSideOnly: true;
}>;

export type StreamGiftLedgerPaymentAuthorizationRequestPreview199C = Readonly<{
  context: StreamGiftLedgerPaymentAuthorizationContext199C;
  senderUserId: string;
  receiverUserId: string;
  giftKey?: string;
  giftCatalogItemId?: string;
  roomId?: string;
  conversationId?: string;
  quantity: number;
  diamondAmount: number;
  diamondMicros: string;
  idempotencyKey: string;
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterInput199C = Readonly<{
  ownerApproval?: string;
  adapterMode?: "contract_boundary_only" | "disabled";
  requestedBundle?: "stream_gifts_payment_authorization_adapter_boundary" | "disabled";
  providerReferenceLabels?: readonly StreamGiftLedgerPaymentAuthorizationReferenceLabel199C[];
  requestPreview?: StreamGiftLedgerPaymentAuthorizationRequestPreview199C;
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterBlockedCode199C =
  | "owner_approval_required"
  | "adapter_mode_disabled"
  | "reference_labels_required"
  | "accept_payment_provider_label_required"
  | "google_billing_or_wallet_label_required"
  | "request_preview_required"
  | "invalid_gift_payment_amount"
  | "gift_identity_required"
  | "raw_secret_or_provider_value_rejected"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerPaymentAuthorizationAdapterBlocked199C = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION;
  status: "payment_authorization_adapter_boundary_blocked";
  code: StreamGiftLedgerPaymentAuthorizationAdapterBlockedCode199C;
  blockedReason: string;
  providerLiveCallExecuted: false;
  paymentAuthorizationCompleted: false;
  providerAuthorizationReferenceHashCreated: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerPaymentAuthorizationAdapterSafety199C;
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterEnvelope199C = Readonly<{
  contract: "stream.gift.payment_authorization.adapter_boundary.v1";
  version: typeof STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION;
  requestedBundle: "stream_gifts_payment_authorization_adapter_boundary";
  providerReferenceLabelCount: number;
  providedProviderKinds: readonly StreamGiftLedgerPaymentAuthorizationProviderKind199C[];
  requestPreview: StreamGiftLedgerPaymentAuthorizationRequestPreview199C;
  realAuthorizationAdapterRequired: true;
  providerLiveCallExecuted: false;
  paymentAuthorizationCompleted: false;
  providerAuthorizationReferenceHashCreated: false;
  providerAuthorizationReferenceHashShape: "sha256_hex_64_after_199d_only";
  rawProviderTokenStored: false;
  rawProviderReferenceStored: false;
  giftSendCommitted: false;
  commitTargetAfter199D: "POST /api/stream/gifts/ledger/198k/send-intent";
  nextStage: "199D_real_payment_authorization_adapter_owner_local";
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterPrepared199C = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION;
  status: "payment_authorization_adapter_boundary_prepared_no_provider_call";
  code: "requires_199d_real_payment_authorization_adapter";
  envelope: StreamGiftLedgerPaymentAuthorizationAdapterEnvelope199C;
  providerLiveCallExecuted: false;
  paymentAuthorizationCompleted: false;
  providerAuthorizationReferenceHashCreated: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerPaymentAuthorizationAdapterSafety199C;
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterReadiness199C = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION;
  status: "ready_for_payment_authorization_adapter_boundary_only";
  requiredPreviousStage: "199B_provider_config_reference_labels_clean";
  currentStage: "199C_payment_authorization_adapter_boundary";
  nextStage: "199D_real_payment_authorization_adapter_owner_local";
  providerLiveCallExecuted: false;
  paymentAuthorizationCompleted: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerPaymentAuthorizationAdapterSafety199C;
}>;

export type StreamGiftLedgerPaymentAuthorizationAdapterResult199C =
  | StreamGiftLedgerPaymentAuthorizationAdapterPrepared199C
  | StreamGiftLedgerPaymentAuthorizationAdapterBlocked199C;
