export const STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198N" as const;

export type StreamGiftLedgerProviderAuthorizationKind198N =
  | "wallet_authorization"
  | "payment_provider_authorization"
  | "admin_replay_verified_reference";

export type StreamGiftLedgerProviderAuthorizationContext198N =
  | "stream_live"
  | "messenger"
  | "shorts"
  | "creator_profile";

export type StreamGiftLedgerProviderAuthorizationContractSafety198N = Readonly<{
  apiDbWriteAllowed: false;
  localRunnerDbWriteAllowed: false;
  providerCallAllowed: false;
  walletMutationAllowed: false;
  paymentCaptureAllowed: false;
  payoutAllowed: false;
  realtimeEmitAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawProviderTokenAccepted: false;
  rawProviderTokenOutputAllowed: false;
  hashOnlyReferenceRequired: true;
}>;

export type StreamGiftLedgerProviderAuthorizationContractInput198N = Readonly<{
  context: StreamGiftLedgerProviderAuthorizationContext198N;
  authorizationKind: StreamGiftLedgerProviderAuthorizationKind198N;
  providerReferenceHash: string;
  providerName?: string;
  senderUserId: string;
  receiverUserId: string;
  giftKey?: string;
  giftCatalogItemId?: string;
  roomId?: string;
  conversationId?: string;
  quantity: number;
  idempotencyKey: string;
}>;

export type StreamGiftLedgerProviderAuthorizationNormalized198N = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION;
  mode: "provider_authorization_contract_verified_hash_only";
  context: StreamGiftLedgerProviderAuthorizationContext198N;
  authorizationKind: StreamGiftLedgerProviderAuthorizationKind198N;
  providerName: string;
  providerReferenceHashAccepted: true;
  providerReferenceHashShape: "sha256_hex_64";
  rawProviderReferenceStored: false;
  rawProviderTokenAccepted: false;
  commitTarget: "POST /api/stream/gifts/ledger/198k/send-intent";
  commitRequires: readonly string[];
  forwardedSendIntentBody: Readonly<{
    context: StreamGiftLedgerProviderAuthorizationContext198N;
    senderUserId: string;
    receiverUserId: string;
    giftKey?: string;
    giftCatalogItemId?: string;
    roomId?: string;
    conversationId?: string;
    quantity: number;
    idempotencyKey: string;
    providerReferenceHash: string;
  }>;
}>;

export type StreamGiftLedgerProviderAuthorizationBlocked198N = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION;
  status: "blocked_without_mutation";
  code:
    | "provider_reference_hash_required"
    | "provider_reference_hash_must_be_sha256_hex"
    | "raw_provider_token_rejected"
    | "send_intent_required_field_missing";
  requiredBeforeCommit: readonly string[];
}>;

export type StreamGiftLedgerProviderAuthorizationReadiness198N = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION;
  status: "provider_authorization_contract_ready_hash_only_no_runtime_call";
  safety: StreamGiftLedgerProviderAuthorizationContractSafety198N;
  acceptedAuthorizationKinds: readonly StreamGiftLedgerProviderAuthorizationKind198N[];
  endpoints: readonly string[];
  localRunner: string;
  commitBoundary: readonly string[];
  next: "198O_provider_authorized_commit_smoke_owner_local";
}>;

export type StreamGiftLedgerProviderAuthorizationNextRequest198N = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION;
  nextStage: "198O_provider_authorized_commit_smoke_owner_local";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
