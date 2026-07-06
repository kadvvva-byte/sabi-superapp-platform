export const STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-199D" as const;

export type StreamGiftLedgerRealPaymentAuthorizationProviderKind199D =
  | "accept_payments"
  | "google_billing_diamonds"
  | "wallet_balance_authorization"
  | "manual_provider_reference_review";

export type StreamGiftLedgerRealPaymentAuthorizationProviderName199D =
  | "google_billing"
  | "airwallex"
  | "wallet"
  | "manual_review"
  | "other";

export type StreamGiftLedgerRealPaymentAuthorizationContext199D =
  | "stream_live"
  | "messenger"
  | "shorts"
  | "creator_profile";

export type StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceAccepted: false;
  rawPaymentTokenAccepted: false;
  rawPurchaseTokenAccepted: false;
  rawProviderResponseAccepted: false;
  providerBindingAllowedNow: false;
  providerLiveCallAllowedNow: false;
  providerAuthorizationCallAllowedNow: false;
  providerPayoutCallAllowedNow: false;
  walletMutationAllowedNow: false;
  paymentCaptureAllowedNow: false;
  dbWriteAllowedNow: false;
  ledgerCommitAllowedNow: false;
  realtimeEmitAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  ownerLocalHashOnlyAuthorizationIntakeAllowed: true;
  providerAuthorizationReferenceHashOutputAllowed: true;
  separateExactOwnerApprovalRequiredFor199E: true;
}>;

export type StreamGiftLedgerRealPaymentAuthorizationRequest199D = Readonly<{
  context: StreamGiftLedgerRealPaymentAuthorizationContext199D;
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

export type StreamGiftLedgerRealPaymentAuthorizationAdapterInput199D = Readonly<{
  ownerApproval?: string;
  hashOnlyAuthorizationApproval?: string;
  adapterMode?: "owner_local_hash_only" | "disabled";
  requestedBundle?: "stream_gifts_real_payment_authorization_hash_only" | "disabled";
  providerKind?: StreamGiftLedgerRealPaymentAuthorizationProviderKind199D;
  providerName?: StreamGiftLedgerRealPaymentAuthorizationProviderName199D;
  providerAuthorizationReferenceHash?: string;
  providerAuthorizationAmountDiamondMicros?: string;
  providerAuthorizationCurrency?: "DIAMOND_MICROS";
  request?: StreamGiftLedgerRealPaymentAuthorizationRequest199D;
}>;

export type StreamGiftLedgerRealPaymentAuthorizationAdapterBlockedCode199D =
  | "owner_approval_required"
  | "hash_only_authorization_approval_required"
  | "adapter_mode_disabled"
  | "provider_kind_required"
  | "provider_authorization_hash_required"
  | "provider_authorization_amount_mismatch"
  | "request_required"
  | "invalid_request_amount"
  | "gift_identity_required"
  | "raw_secret_or_provider_value_rejected"
  | "unsafe_runtime_flag";

export type StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION;
  status: "real_payment_authorization_adapter_blocked";
  code: StreamGiftLedgerRealPaymentAuthorizationAdapterBlockedCode199D;
  blockedReason: string;
  providerLiveCallExecuted: false;
  providerAuthorizationReferenceHashAccepted: false;
  paymentAuthorizationCompletedByBackend: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D;
}>;

export type StreamGiftLedgerRealPaymentAuthorizationEnvelope199D = Readonly<{
  contract: "stream.gift.payment_authorization.hash_only.v1";
  version: typeof STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION;
  requestedBundle: "stream_gifts_real_payment_authorization_hash_only";
  providerKind: StreamGiftLedgerRealPaymentAuthorizationProviderKind199D;
  providerName: StreamGiftLedgerRealPaymentAuthorizationProviderName199D;
  request: StreamGiftLedgerRealPaymentAuthorizationRequest199D;
  providerAuthorizationReferenceHash: string;
  providerAuthorizationAmountDiamondMicros: string;
  providerAuthorizationCurrency: "DIAMOND_MICROS";
  rawProviderTokenStored: false;
  rawProviderReferenceStored: false;
  rawProviderResponseStored: false;
  providerLiveCallExecutedByBackend: false;
  paymentAuthorizationCompletedByBackend: false;
  ownerAttestedExternalAuthorization: true;
  ledgerCommitTarget: "POST /api/stream/gifts/ledger/198k/send-intent";
  nextStage: "199E_gift_send_real_provider_authorization_commit";
}>;

export type StreamGiftLedgerRealPaymentAuthorizationAdapterAccepted199D = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION;
  status: "provider_authorization_reference_hash_accepted_for_ledger_commit";
  envelope: StreamGiftLedgerRealPaymentAuthorizationEnvelope199D;
  providerLiveCallExecuted: false;
  providerAuthorizationReferenceHashAccepted: true;
  paymentAuthorizationCompletedByBackend: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D;
}>;

export type StreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION;
  status: "ready_for_owner_local_hash_only_payment_authorization";
  requiredPreviousStage: "199C_payment_authorization_adapter_boundary_clean";
  currentStage: "199D_real_payment_authorization_adapter_owner_local_hash_only";
  nextStage: "199E_gift_send_real_provider_authorization_commit";
  providerLiveCallExecuted: false;
  paymentAuthorizationCompletedByBackend: false;
  giftSendCommitted: false;
  safety: StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D;
}>;

export type StreamGiftLedgerRealPaymentAuthorizationAdapterResult199D =
  | StreamGiftLedgerRealPaymentAuthorizationAdapterAccepted199D
  | StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D;
