import type { StreamGiftLedgerRealtimeDeliveryPayload198Q } from "../gift-ledger-realtime-delivery-adapter-198q";

export const STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198S" as const;

export type StreamGiftLedgerDeliveryReceiptAuditStatus198S =
  | "ready_for_delivery_receipt_audit_contract"
  | "delivery_receipt_blocked_by_guard"
  | "delivery_receipt_verified_for_audit_preview_not_persisted";

export type StreamGiftLedgerDeliveryReceiptAuditSafety198S = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  realtimeEmitAllowedNow: false;
  mobileDeliveryReceiptRuntimeAcceptedOnlyWithExplicitFlag: true;
  mobileDeliveryReceiptPersistAllowedNow: false;
  clientReceiptAcceptedAsFinancialTruth: false;
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

export type StreamGiftLedgerDeliveryReceiptAuditInput198S = Readonly<{
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

export type StreamGiftLedgerDeliveryReceiptAuditBlockedCode198S =
  | "receipt_runtime_flag_disabled"
  | "receipt_selector_required"
  | "receipt_event_name_invalid"
  | "receipt_shape_invalid"
  | "receipt_not_matching_committed_payload"
  | "post_commit_preview_blocked";

export type StreamGiftLedgerDeliveryReceiptAuditBlocked198S = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION;
  status: "delivery_receipt_blocked_by_guard";
  code: StreamGiftLedgerDeliveryReceiptAuditBlockedCode198S;
  blockedReason: string;
  deliveredToClientConfirmed: false;
  receiptPersisted: false;
  availableBalanceReleased: false;
  safety: StreamGiftLedgerDeliveryReceiptAuditSafety198S;
}>;

export type StreamGiftLedgerDeliveryReceiptAuditVerified198S = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION;
  status: "delivery_receipt_verified_for_audit_preview_not_persisted";
  sendIntentId: string;
  clientReceiptId: string;
  clientPlatform: "ios" | "android" | "web" | "unknown";
  receivedEventName: "stream.gift.ledger.committed.v1";
  ackMode: "stream_room" | "messenger_conversation" | "sender_receipt_refresh" | "creator_profile_balance_refresh" | "unknown";
  clientReceiptShapeVerified: true;
  committedPayloadMatched: true;
  deliveredToClientConfirmed: false;
  receiptPersisted: false;
  receiptPersistenceRequired: true;
  adminAuditRequired: true;
  availableBalanceReleased: false;
  payload: StreamGiftLedgerRealtimeDeliveryPayload198Q;
  auditNotes: readonly string[];
  safety: StreamGiftLedgerDeliveryReceiptAuditSafety198S;
}>;

export type StreamGiftLedgerDeliveryReceiptAuditResult198S =
  | StreamGiftLedgerDeliveryReceiptAuditVerified198S
  | StreamGiftLedgerDeliveryReceiptAuditBlocked198S;

export type StreamGiftLedgerDeliveryReceiptAuditReadiness198S = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION;
  status: "ready_for_delivery_receipt_audit_contract";
  safety: StreamGiftLedgerDeliveryReceiptAuditSafety198S;
  eventName: "stream.gift.ledger.committed.v1";
  receiptRuntimeFlag: "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED=true";
  routes: readonly string[];
  next: "198T_persistent_delivery_receipt_schema_or_admin_audit_store";
}>;

export type StreamGiftLedgerDeliveryReceiptAuditNextRequest198S = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION;
  nextStage: "198T_persistent_delivery_receipt_schema_or_admin_audit_store";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
