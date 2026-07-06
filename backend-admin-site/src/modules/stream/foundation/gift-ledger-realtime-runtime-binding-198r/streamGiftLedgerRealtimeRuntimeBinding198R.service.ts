import type { PrismaClient } from "@prisma/client";
import type { Server } from "socket.io";
import {
  normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
  previewStreamGiftLedgerRealtimeDelivery198Q,
  type StreamGiftLedgerRealtimeDeliveryPayload198Q,
} from "../gift-ledger-realtime-delivery-adapter-198q";
import {
  STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
  type StreamGiftLedgerRealtimeRuntimeBindingBlocked198R,
  type StreamGiftLedgerRealtimeRuntimeBindingInput198R,
  type StreamGiftLedgerRealtimeRuntimeBindingNextRequest198R,
  type StreamGiftLedgerRealtimeRuntimeBindingReadiness198R,
  type StreamGiftLedgerRealtimeRuntimeBindingReady198R,
  type StreamGiftLedgerRealtimeRuntimeBindingResult198R,
  type StreamGiftLedgerRealtimeRuntimeBindingSafety198R,
  type StreamGiftLedgerRealtimeRuntimeChannel198R,
} from "./streamGiftLedgerRealtimeRuntimeBinding198R.types";

export const STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_APPROVAL = "STREAM_GIFT_LEDGER_198R_DELIVERY_APPROVED" as const;

export const STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY: StreamGiftLedgerRealtimeRuntimeBindingSafety198R = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  realtimeEmitAllowedOnlyWithExplicitRuntimeFlagAndAdminApproval: true,
  mobileDeliveryReceiptAllowedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutAllowedNow: false,
  availableBalanceReleaseAllowedNow: false,
  fakeDeliveredEventAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceOutputAllowed: false,
});

function normalizeString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function isRuntimeEnabled198R(): boolean {
  return String(process.env.STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED || "").trim().toLowerCase() === "true";
}

function blocked198R(code: StreamGiftLedgerRealtimeRuntimeBindingBlocked198R["code"], blockedReason: string): StreamGiftLedgerRealtimeRuntimeBindingBlocked198R {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    status: "runtime_emit_blocked_by_guard",
    code,
    blockedReason,
    deliveredToClientConfirmed: false,
    safety: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY,
  };
}

export function normalizeStreamGiftLedgerRealtimeRuntimeBindingInput198R(raw: Record<string, unknown>): StreamGiftLedgerRealtimeRuntimeBindingInput198R {
  return {
    sendIntentId: normalizeString(raw.sendIntentId),
    idempotencyKeyHash: normalizeString(raw.idempotencyKeyHash),
    deliveryApproval: normalizeString(raw.deliveryApproval),
  };
}

function pushChannel(channels: StreamGiftLedgerRealtimeRuntimeChannel198R[], channel: string | undefined, targetId: string | undefined) {
  if (!channel || !targetId) return;
  const exists = channels.some((candidate) => candidate.channel === channel && candidate.targetId === targetId);
  if (exists) return;
  channels.push({
    channel,
    targetId,
    eventName: "stream.gift.ledger.committed.v1",
    emitMode: "socket_io_gateway_emit",
  });
}

export function buildStreamGiftLedgerRealtimeRuntimeChannels198R(payload: StreamGiftLedgerRealtimeDeliveryPayload198Q): readonly StreamGiftLedgerRealtimeRuntimeChannel198R[] {
  const channels: StreamGiftLedgerRealtimeRuntimeChannel198R[] = [];
  if (payload.roomId) {
    pushChannel(channels, `stream:room:${payload.roomId}`, payload.roomId);
    pushChannel(channels, `room:${payload.roomId}`, payload.roomId);
  }
  if (payload.conversationId) {
    pushChannel(channels, payload.conversationId, payload.conversationId);
    pushChannel(channels, `messenger:conversation:${payload.conversationId}`, payload.conversationId);
  }
  pushChannel(channels, `user:${payload.receiverUserId}`, payload.receiverUserId);
  pushChannel(channels, `user-profile:${payload.receiverUserId}`, payload.receiverUserId);
  pushChannel(channels, `user:${payload.senderUserId}`, payload.senderUserId);
  return channels;
}

function emitToChannel198R(io: Server, channel: string, payload: StreamGiftLedgerRealtimeDeliveryPayload198Q) {
  io.to(channel).emit("stream.gift.ledger.committed.v1", payload);
  io.to(channel).emit("realtime:event", {
    room: channel,
    event: "stream.gift.ledger.committed.v1",
    payload,
  });
}

export async function emitStreamGiftLedgerRealtimeRuntime198R(
  prisma: PrismaClient,
  io: Server | null | undefined,
  input: StreamGiftLedgerRealtimeRuntimeBindingInput198R,
): Promise<StreamGiftLedgerRealtimeRuntimeBindingResult198R> {
  if (!io) {
    return blocked198R("socket_gateway_missing", "Socket.IO gateway is not available in app bootstrap");
  }

  if (!isRuntimeEnabled198R()) {
    return blocked198R("runtime_flag_disabled", "STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED=true is required before realtime emit");
  }

  if (input.deliveryApproval !== STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_APPROVAL) {
    return blocked198R("admin_delivery_approval_required", "deliveryApproval must exactly match STREAM_GIFT_LEDGER_198R_DELIVERY_APPROVED");
  }

  const preview = await previewStreamGiftLedgerRealtimeDelivery198Q(
    prisma,
    normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q({
      sendIntentId: input.sendIntentId,
      idempotencyKeyHash: input.idempotencyKeyHash,
    }),
  );

  if (!preview.ok) {
    return blocked198R("post_commit_preview_blocked", preview.blockedReason);
  }

  const channels = buildStreamGiftLedgerRealtimeRuntimeChannels198R(preview.payload);
  if (channels.length === 0) {
    return blocked198R("no_realtime_channels_resolved", "No Stream/Messenger/user channels were resolved from the committed ledger payload");
  }

  channels.forEach((target) => emitToChannel198R(io, target.channel, preview.payload));

  const result: StreamGiftLedgerRealtimeRuntimeBindingReady198R = {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    status: "runtime_emit_enqueued_to_gateway",
    sendIntentId: preview.sendIntentId,
    emittedToGateway: true,
    deliveredToClientConfirmed: false,
    deliveryReceiptRequired: true,
    channels,
    payload: preview.payload,
    safety: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY,
  };

  return result;
}

export function getStreamGiftLedgerRealtimeRuntimeBindingReadiness198R(): StreamGiftLedgerRealtimeRuntimeBindingReadiness198R {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    status: "ready_for_guarded_realtime_runtime_binding",
    safety: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY,
    eventName: "stream.gift.ledger.committed.v1",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198r/readiness",
      "GET /api/admin/stream/gifts/ledger/198r/runtime-binding-contract",
      "POST /api/admin/stream/gifts/ledger/198r/emit",
      "GET /api/admin/stream/gifts/ledger/198r/runbook",
      "POST /api/admin/stream/gifts/ledger/198r/next-delivery-audit-request",
    ],
    runtimeFlag: "STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED=true",
    approvalField: "deliveryApproval",
    approvalValue: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_APPROVAL,
    next: "198S_mobile_receipt_ack_and_admin_delivery_audit",
  };
}

export function getStreamGiftLedgerRealtimeRuntimeBindingContract198R(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    eventName: "stream.gift.ledger.committed.v1",
    status: "guarded_runtime_binding_ready",
    emitOnlyAfter: [
      "198P post-commit inspection passes",
      "198Q delivery preview returns ready_not_emitted",
      "STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED=true",
      "admin deliveryApproval exact value present",
    ],
    channels: [
      "stream:room:<roomId>",
      "room:<roomId>",
      "<conversationId>",
      "messenger:conversation:<conversationId>",
      "user:<receiverUserId>",
      "user-profile:<receiverUserId>",
      "user:<senderUserId>",
    ],
    emittedEvent: "stream.gift.ledger.committed.v1",
    genericEnvelopeEvent: "realtime:event",
    deliveryReceiptRequired: true,
    deliveredToClientConfirmed: false,
    providerReferenceHashPrinted: false,
    forbidden: [
      "fake delivery receipt",
      "gift success without ledger commit",
      "providerReferenceHash in payload",
      "available balance release",
      "Wallet mutation",
      "provider call",
      "payout execution",
    ],
    safety: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY,
  };
}

export function getStreamGiftLedgerRealtimeRuntimeBindingRunbook198R(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "set STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ENABLED=true",
      "POST /api/admin/stream/gifts/ledger/198r/emit with sendIntentId and deliveryApproval=STREAM_GIFT_LEDGER_198R_DELIVERY_APPROVED",
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    ],
    note: "198R emits to Socket.IO gateway only after 198Q guarded preview passes. It does not confirm mobile receipt and never releases available balance.",
  };
}

export function createStreamGiftLedgerDeliveryAuditRequest198R(): StreamGiftLedgerRealtimeRuntimeBindingNextRequest198R {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
    nextStage: "198S_mobile_receipt_ack_and_admin_delivery_audit",
    allowedNext: [
      "mobile receipt acknowledgement contract",
      "admin delivery audit rows/readiness",
      "idempotent delivery receipt inspection",
      "Stream/Messenger UI refresh based on ledger event only",
    ],
    stillForbidden: [
      "fake delivered event",
      "fake gift send success",
      "available balance release before settlement gates",
      "Wallet mutation from realtime adapter",
      "provider call from realtime adapter",
      "payout execution",
      "raw provider token/reference output",
    ],
  };
}

export function assertStreamGiftLedgerRealtimeRuntimeBinding198RRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.mobileDeliveryReceiptAllowedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutAllowedNow,
    safety.availableBalanceReleaseAllowedNow,
    safety.fakeDeliveredEventAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceOutputAllowed,
  ].some(Boolean);

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_UNSAFE_FLAG");
}
