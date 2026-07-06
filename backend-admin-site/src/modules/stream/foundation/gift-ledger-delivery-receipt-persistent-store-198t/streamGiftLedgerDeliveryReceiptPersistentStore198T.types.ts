export const STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198T" as const;

export type StreamGiftLedgerDeliveryReceiptPersistentStoreSafety198T = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedOnlyWithExplicitRuntimeFlag: true;
  receiptPersistenceAllowedOnlyAfter198SVerification: true;
  clientReceiptAcceptedAsFinancialTruth: false;
  realtimeEmitAllowedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutAllowedNow: false;
  availableBalanceReleaseAllowedNow: false;
  fakeDeliveredEventAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawProviderTokenAccepted: false;
  rawProviderReferenceOutputAllowed: false;
}>;

export type StreamGiftLedgerDeliveryReceiptPersistentInput198T = Readonly<{
  sendIntentId?: string;
  idempotencyKeyHash?: string;
  clientReceiptId?: string;
  clientPlatform?: "ios" | "android" | "web" | "unknown";
  receivedEventName?: string;
  receivedAtClientIso?: string;
  deliveredPayloadHash?: string;
  senderUserId?: string;
  receiverUserId?: string;
  roomId?: string;
  conversationId?: string;
  ackMode?: "stream_room" | "messenger_conversation" | "sender_receipt_refresh" | "creator_profile_balance_refresh" | "unknown";
}>;

export type StreamGiftLedgerDeliveryReceiptPersistentBlocked198T = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION;
  status: "persistent_receipt_blocked_by_guard";
  code:
    | "persistence_runtime_flag_disabled"
    | "receipt_verification_failed"
    | "receipt_delegate_missing_generate_required"
    | "receipt_persistence_failed";
  blockedReason: string;
  receiptPersisted: false;
  deliveredToClientConfirmed: false;
  availableBalanceReleased: false;
  safety: StreamGiftLedgerDeliveryReceiptPersistentStoreSafety198T;
}>;

export type StreamGiftLedgerDeliveryReceiptPersistentStored198T = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION;
  status: "delivery_receipt_persisted_for_audit_only";
  receiptAuditId: string;
  sendIntentId: string;
  clientReceiptId: string;
  clientPlatform: string;
  ackMode: string;
  receiptPersisted: true;
  deliveredToClientConfirmed: false;
  availableBalanceReleased: false;
  payoutReleaseAllowed: false;
  receiptStatus: "VERIFIED_AUDIT_ONLY";
  persistedAt: string;
  auditNotes: readonly string[];
  safety: StreamGiftLedgerDeliveryReceiptPersistentStoreSafety198T;
}>;

export type StreamGiftLedgerDeliveryReceiptPersistentResult198T =
  | StreamGiftLedgerDeliveryReceiptPersistentBlocked198T
  | StreamGiftLedgerDeliveryReceiptPersistentStored198T;
