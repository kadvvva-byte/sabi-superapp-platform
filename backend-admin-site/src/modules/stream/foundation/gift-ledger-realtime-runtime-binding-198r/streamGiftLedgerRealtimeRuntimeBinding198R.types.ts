import type { StreamGiftLedgerRealtimeDeliveryPayload198Q } from "../gift-ledger-realtime-delivery-adapter-198q";

export const STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198R" as const;

export type StreamGiftLedgerRealtimeRuntimeBindingStatus198R =
  | "ready_for_guarded_realtime_runtime_binding"
  | "runtime_emit_enqueued_to_gateway"
  | "runtime_emit_blocked_by_guard";

export type StreamGiftLedgerRealtimeRuntimeBindingSafety198R = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedNow: false;
  realtimeEmitAllowedOnlyWithExplicitRuntimeFlagAndAdminApproval: true;
  mobileDeliveryReceiptAllowedNow: false;
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

export type StreamGiftLedgerRealtimeRuntimeBindingInput198R = Readonly<{
  sendIntentId?: string;
  idempotencyKeyHash?: string;
  deliveryApproval?: string;
}>;

export type StreamGiftLedgerRealtimeRuntimeChannel198R = Readonly<{
  channel: string;
  targetId: string;
  eventName: "stream.gift.ledger.committed.v1";
  emitMode: "socket_io_gateway_emit";
}>;

export type StreamGiftLedgerRealtimeRuntimeBindingReady198R = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION;
  status: "runtime_emit_enqueued_to_gateway";
  sendIntentId: string;
  emittedToGateway: true;
  deliveredToClientConfirmed: false;
  deliveryReceiptRequired: true;
  channels: readonly StreamGiftLedgerRealtimeRuntimeChannel198R[];
  payload: StreamGiftLedgerRealtimeDeliveryPayload198Q;
  safety: StreamGiftLedgerRealtimeRuntimeBindingSafety198R;
}>;

export type StreamGiftLedgerRealtimeRuntimeBindingBlockedCode198R =
  | "runtime_flag_disabled"
  | "admin_delivery_approval_required"
  | "post_commit_preview_blocked"
  | "no_realtime_channels_resolved"
  | "socket_gateway_missing";

export type StreamGiftLedgerRealtimeRuntimeBindingBlocked198R = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION;
  status: "runtime_emit_blocked_by_guard";
  code: StreamGiftLedgerRealtimeRuntimeBindingBlockedCode198R;
  blockedReason: string;
  deliveredToClientConfirmed: false;
  safety: StreamGiftLedgerRealtimeRuntimeBindingSafety198R;
}>;

export type StreamGiftLedgerRealtimeRuntimeBindingResult198R =
  | StreamGiftLedgerRealtimeRuntimeBindingReady198R
  | StreamGiftLedgerRealtimeRuntimeBindingBlocked198R;

export type StreamGiftLedgerRealtimeRuntimeBindingReadiness198R = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION;
  status: "ready_for_guarded_realtime_runtime_binding";
  safety: StreamGiftLedgerRealtimeRuntimeBindingSafety198R;
  eventName: "stream.gift.ledger.committed.v1";
  routes: readonly string[];
  runtimeFlag: "STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED=true";
  approvalField: "deliveryApproval";
  approvalValue: "STREAM_GIFT_LEDGER_198R_DELIVERY_APPROVED";
  next: "198S_mobile_receipt_ack_and_admin_delivery_audit";
}>;

export type StreamGiftLedgerRealtimeRuntimeBindingNextRequest198R = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION;
  nextStage: "198S_mobile_receipt_ack_and_admin_delivery_audit";
  allowedNext: readonly string[];
  stillForbidden: readonly string[];
}>;
