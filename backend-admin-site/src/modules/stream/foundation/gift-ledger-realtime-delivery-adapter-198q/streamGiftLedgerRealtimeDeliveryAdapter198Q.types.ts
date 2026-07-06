export const STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198Q" as const;

export type StreamGiftLedgerRealtimeDeliveryAdapterStatus198Q =
  | "ready_for_realtime_delivery_adapter_preview"
  | "delivery_preview_ready_not_emitted"
  | "delivery_preview_blocked_by_guard";

export type StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  realtimeEmitAllowedNow: false;
  mobileDeliveryAllowedNow: false;
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

export type StreamGiftLedgerRealtimeDeliveryPreviewInput198Q = Readonly<{
  sendIntentId?: string;
  idempotencyKeyHash?: string;
}>;

export type StreamGiftLedgerRealtimeDeliveryTarget198Q = Readonly<{
  channel: "stream_room" | "messenger_conversation" | "creator_profile_balance_refresh" | "sender_receipt_refresh";
  targetId: string;
  eventName: "stream.gift.ledger.committed.v1";
  deliveryMode: "guarded_preview_not_emitted";
}>;

export type StreamGiftLedgerRealtimeDeliveryPayload198Q = Readonly<{
  eventName: "stream.gift.ledger.committed.v1";
  deliveryStatus: "ready_not_emitted";
  sendIntentId: string;
  context: string;
  senderUserId: string;
  receiverUserId: string;
  roomId?: string;
  conversationId?: string;
  giftCatalogItemId: string;
  giftKey?: string;
  giftTitle?: string;
  quantity: number;
  grossDiamondMicros: string;
  receiverPendingDiamondMicros: string;
  platformFeeDiamondMicros: string;
  receiverBalancePresentation: "pending_only";
  availableBalancePresentation: "hidden_until_settlement";
  payoutPresentation: "blocked_until_creator_settlement_gates_pass";
  providerReferenceHashPrinted: false;
}>;

export type StreamGiftLedgerRealtimeDeliveryPreviewReady198Q = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION;
  status: "delivery_preview_ready_not_emitted";
  sendIntentId: string;
  guardsPassed: readonly string[];
  deliveryTargets: readonly StreamGiftLedgerRealtimeDeliveryTarget198Q[];
  payload: StreamGiftLedgerRealtimeDeliveryPayload198Q;
  forbiddenPayloadFields: readonly string[];
  safety: StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q;
}>;

export type StreamGiftLedgerRealtimeDeliveryPreviewBlocked198Q = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION;
  status: "delivery_preview_blocked_by_guard";
  code:
    | "inspection_selector_required"
    | "post_commit_inspection_not_found"
    | "send_intent_not_committed"
    | "provider_reference_hash_missing_or_invalid"
    | "ledger_rows_incomplete"
    | "creator_earning_missing"
    | "settlement_gates_incomplete"
    | "event_contract_missing";
  blockedReason: string;
  safety: StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q;
}>;

export type StreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION;
  status: "ready_for_realtime_delivery_adapter_preview";
  safety: StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q;
  eventName: "stream.gift.ledger.committed.v1";
  routes: readonly string[];
  localRunner: "tools/stream-gifts-ledger-198q-realtime-delivery-preview-read-only.js";
  deliveryGuard: readonly string[];
  next: "198R_realtime_runtime_binding_after_adapter_preview_pass";
}>;

export type StreamGiftLedgerRealtimeDeliveryNextRequest198Q = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION;
  nextStage: "198R_realtime_runtime_binding_after_adapter_preview_pass";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
