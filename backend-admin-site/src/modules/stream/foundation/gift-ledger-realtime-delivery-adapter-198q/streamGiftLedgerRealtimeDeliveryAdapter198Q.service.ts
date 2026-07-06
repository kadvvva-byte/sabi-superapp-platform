import type { PrismaClient } from "@prisma/client";
import {
  inspectStreamGiftLedgerPostCommit198P,
  normalizeStreamGiftLedgerPostCommitInspectionInput198P,
} from "../gift-ledger-post-commit-event-contract-198p";
import {
  STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
  type StreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q,
  type StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q,
  type StreamGiftLedgerRealtimeDeliveryNextRequest198Q,
  type StreamGiftLedgerRealtimeDeliveryPayload198Q,
  type StreamGiftLedgerRealtimeDeliveryPreviewBlocked198Q,
  type StreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
  type StreamGiftLedgerRealtimeDeliveryPreviewReady198Q,
  type StreamGiftLedgerRealtimeDeliveryTarget198Q,
} from "./streamGiftLedgerRealtimeDeliveryAdapter198Q.types";

export const STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY: StreamGiftLedgerRealtimeDeliveryAdapterSafety198Q = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  realtimeEmitAllowedNow: false,
  mobileDeliveryAllowedNow: false,
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

const FORBIDDEN_PAYLOAD_FIELDS_198Q = [
  "providerReferenceHash",
  "rawProviderReference",
  "providerToken",
  "paymentToken",
  "purchaseToken",
  "authorizationCode",
  "availableBalanceDiamondMicros",
  "payoutExecutionAllowed=true",
  "fakeDelivered=true",
  "fakeGiftSendSuccess=true",
] as const;

function cleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export function normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q(input: Record<string, unknown>): StreamGiftLedgerRealtimeDeliveryPreviewInput198Q {
  return {
    sendIntentId: cleanText(input.sendIntentId),
    idempotencyKeyHash: cleanText(input.idempotencyKeyHash),
  };
}

function blocked198Q(code: StreamGiftLedgerRealtimeDeliveryPreviewBlocked198Q["code"], blockedReason: string): StreamGiftLedgerRealtimeDeliveryPreviewBlocked198Q {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    status: "delivery_preview_blocked_by_guard",
    code,
    blockedReason,
    safety: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY,
  };
}

function buildTargets198Q(payload: StreamGiftLedgerRealtimeDeliveryPayload198Q): readonly StreamGiftLedgerRealtimeDeliveryTarget198Q[] {
  const targets: StreamGiftLedgerRealtimeDeliveryTarget198Q[] = [
    {
      channel: "creator_profile_balance_refresh",
      targetId: payload.receiverUserId,
      eventName: "stream.gift.ledger.committed.v1",
      deliveryMode: "guarded_preview_not_emitted",
    },
    {
      channel: "sender_receipt_refresh",
      targetId: payload.senderUserId,
      eventName: "stream.gift.ledger.committed.v1",
      deliveryMode: "guarded_preview_not_emitted",
    },
  ];

  if (payload.roomId) {
    targets.unshift({
      channel: "stream_room",
      targetId: payload.roomId,
      eventName: "stream.gift.ledger.committed.v1",
      deliveryMode: "guarded_preview_not_emitted",
    });
  }

  if (payload.conversationId) {
    targets.unshift({
      channel: "messenger_conversation",
      targetId: payload.conversationId,
      eventName: "stream.gift.ledger.committed.v1",
      deliveryMode: "guarded_preview_not_emitted",
    });
  }

  return targets;
}

export async function previewStreamGiftLedgerRealtimeDelivery198Q(
  client: PrismaClient,
  input: StreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
): Promise<StreamGiftLedgerRealtimeDeliveryPreviewReady198Q | StreamGiftLedgerRealtimeDeliveryPreviewBlocked198Q> {
  if (!input.sendIntentId && !input.idempotencyKeyHash) {
    return blocked198Q("inspection_selector_required", "sendIntentId or idempotencyKeyHash is required for guarded delivery preview");
  }

  const inspection = await inspectStreamGiftLedgerPostCommit198P(
    client,
    normalizeStreamGiftLedgerPostCommitInspectionInput198P({
      sendIntentId: input.sendIntentId,
      idempotencyKeyHash: input.idempotencyKeyHash,
      includeEventContract: true,
    }),
  );

  if (!inspection.ok) {
    return blocked198Q("post_commit_inspection_not_found", "post-commit inspection did not find a committed gift ledger intent");
  }

  if (inspection.sendIntentStatus !== "LEDGER_COMMITTED") {
    return blocked198Q("send_intent_not_committed", "realtime delivery preview requires LEDGER_COMMITTED send intent status");
  }

  if (inspection.providerReferenceHashShape !== "sha256_hex_64") {
    return blocked198Q("provider_reference_hash_missing_or_invalid", "hash-only provider authorization reference is required before realtime delivery");
  }

  if (
    inspection.ledger.ledgerEntryCount < 3 ||
    inspection.ledger.senderDebitAuthorizationCount < 1 ||
    inspection.ledger.receiverPendingCreditCount < 1 ||
    inspection.ledger.platformFeeReserveCount < 1
  ) {
    return blocked198Q("ledger_rows_incomplete", "ledger rows are incomplete for delivery preview");
  }

  if (inspection.earning.creatorEarningCount < 1) {
    return blocked198Q("creator_earning_missing", "receiver pending creator earning row is required before delivery preview");
  }

  if (inspection.settlement.settlementGateCount < 9) {
    return blocked198Q("settlement_gates_incomplete", "settlement gates are required before delivery preview");
  }

  const contractPayload = inspection.eventContract?.payload;
  if (!contractPayload) return blocked198Q("event_contract_missing", "198P event contract payload is required before 198Q adapter preview");

  const payload: StreamGiftLedgerRealtimeDeliveryPayload198Q = {
    eventName: "stream.gift.ledger.committed.v1",
    deliveryStatus: "ready_not_emitted",
    sendIntentId: contractPayload.sendIntentId,
    context: contractPayload.context,
    senderUserId: contractPayload.senderUserId,
    receiverUserId: contractPayload.receiverUserId,
    roomId: contractPayload.roomId,
    conversationId: contractPayload.conversationId,
    giftCatalogItemId: contractPayload.giftCatalogItemId,
    giftKey: contractPayload.giftKey,
    giftTitle: contractPayload.giftTitle,
    quantity: contractPayload.quantity,
    grossDiamondMicros: contractPayload.grossDiamondMicros,
    receiverPendingDiamondMicros: contractPayload.receiverPendingDiamondMicros,
    platformFeeDiamondMicros: contractPayload.platformFeeDiamondMicros,
    receiverBalancePresentation: "pending_only",
    availableBalancePresentation: "hidden_until_settlement",
    payoutPresentation: "blocked_until_creator_settlement_gates_pass",
    providerReferenceHashPrinted: false,
  };

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    status: "delivery_preview_ready_not_emitted",
    sendIntentId: payload.sendIntentId,
    guardsPassed: [
      "ledger_committed",
      "provider_authorization_hash_present_not_printed",
      "post_commit_inspection_passed",
      "ledger_rows_complete",
      "creator_pending_earning_present",
      "settlement_gates_present",
      "available_balance_hidden",
      "fake_delivery_not_allowed",
    ],
    deliveryTargets: buildTargets198Q(payload),
    payload,
    forbiddenPayloadFields: FORBIDDEN_PAYLOAD_FIELDS_198Q,
    safety: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY,
  };
}

export function getStreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q(): StreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    status: "ready_for_realtime_delivery_adapter_preview",
    safety: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY,
    eventName: "stream.gift.ledger.committed.v1",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198q/readiness",
      "GET /api/admin/stream/gifts/ledger/198q/adapter-contract",
      "POST /api/admin/stream/gifts/ledger/198q/delivery-preview",
      "GET /api/admin/stream/gifts/ledger/198q/runbook",
      "POST /api/admin/stream/gifts/ledger/198q/next-realtime-runtime-request",
    ],
    localRunner: "tools/stream-gifts-ledger-198q-realtime-delivery-preview-read-only.js",
    deliveryGuard: [
      "LEDGER_COMMITTED send intent",
      "providerReferenceHash has sha256 hex 64 shape but is never printed",
      "post-commit inspection passes",
      "ledger entries include sender debit, receiver pending, platform fee",
      "creator earning remains pending only",
      "settlement gates exist and available balance remains hidden",
      "adapter returns preview only; no socket emit is performed",
    ],
    next: "198R_realtime_runtime_binding_after_adapter_preview_pass",
  };
}

export function getStreamGiftLedgerRealtimeDeliveryAdapterContract198Q(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    eventName: "stream.gift.ledger.committed.v1",
    status: "adapter_contract_ready_not_emitted",
    targetChannels: ["stream_room", "messenger_conversation", "creator_profile_balance_refresh", "sender_receipt_refresh"],
    payloadPolicy: {
      receiverBalancePresentation: "pending_only",
      availableBalancePresentation: "hidden_until_settlement",
      payoutPresentation: "blocked_until_creator_settlement_gates_pass",
      providerReferenceHashPrinted: false,
      forbiddenPayloadFields: FORBIDDEN_PAYLOAD_FIELDS_198Q,
    },
    safety: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY,
  };
}

export function getStreamGiftLedgerRealtimeDeliveryRunbook198Q(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    commands: [
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      "node .\tools\stream-gifts-ledger-198q-realtime-delivery-preview-read-only.js --latest-committed",
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
    ],
    reportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198q-realtime-delivery-preview-read-only-report.json",
    note: "Read-only adapter preview. It never emits socket.io/ws events and never returns delivered=true.",
  };
}

export function createStreamGiftLedgerRealtimeRuntimeRequest198Q(): StreamGiftLedgerRealtimeDeliveryNextRequest198Q {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
    nextStage: "198R_realtime_runtime_binding_after_adapter_preview_pass",
    allowedNext: [
      "bind adapter to existing realtime gateway only after preview passes",
      "emit stream.gift.ledger.committed.v1 only from committed ledger event",
      "mobile Stream and Messenger consume one shared event contract",
      "delivery acknowledgement remains separate from payment/ledger commit",
    ],
    stillForbidden: [
      "fake delivered event",
      "gift success without ledger commit",
      "provider call from realtime adapter",
      "Wallet mutation from realtime adapter",
      "available balance release before settlement gates",
      "payout execution",
      "raw provider token/reference output",
    ],
  };
}

export function assertStreamGiftLedgerRealtimeDeliveryAdapter198QRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.mobileDeliveryAllowedNow,
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

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_UNSAFE_FLAG");
}
