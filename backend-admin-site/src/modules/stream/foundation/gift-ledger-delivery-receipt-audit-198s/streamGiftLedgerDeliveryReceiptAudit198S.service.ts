import type { PrismaClient } from "@prisma/client";
import {
  normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
  previewStreamGiftLedgerRealtimeDelivery198Q,
} from "../gift-ledger-realtime-delivery-adapter-198q";
import {
  STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
  type StreamGiftLedgerDeliveryReceiptAuditBlocked198S,
  type StreamGiftLedgerDeliveryReceiptAuditInput198S,
  type StreamGiftLedgerDeliveryReceiptAuditNextRequest198S,
  type StreamGiftLedgerDeliveryReceiptAuditReadiness198S,
  type StreamGiftLedgerDeliveryReceiptAuditResult198S,
  type StreamGiftLedgerDeliveryReceiptAuditSafety198S,
  type StreamGiftLedgerDeliveryReceiptAuditVerified198S,
} from "./streamGiftLedgerDeliveryReceiptAudit198S.types";

const STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_STAGE = "BACKEND-STREAM-GIFTS-LEDGER-198S" as const;

export const STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY: StreamGiftLedgerDeliveryReceiptAuditSafety198S = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  realtimeEmitAllowedNow: false,
  mobileDeliveryReceiptRuntimeAcceptedOnlyWithExplicitFlag: true,
  mobileDeliveryReceiptPersistAllowedNow: false,
  clientReceiptAcceptedAsFinancialTruth: false,
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

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeClientPlatform(value: unknown): "ios" | "android" | "web" | "unknown" {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "ios" || normalized === "android" || normalized === "web") return normalized;
  return "unknown";
}

function normalizeAckMode(value: unknown): StreamGiftLedgerDeliveryReceiptAuditVerified198S["ackMode"] {
  const normalized = clean(value)?.toLowerCase();
  if (
    normalized === "stream_room" ||
    normalized === "messenger_conversation" ||
    normalized === "sender_receipt_refresh" ||
    normalized === "creator_profile_balance_refresh"
  ) {
    return normalized;
  }
  return "unknown";
}

function isReceiptRuntimeEnabled198S(): boolean {
  return String(process.env.STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED || "").trim().toLowerCase() === "true";
}

function blocked198S(
  code: StreamGiftLedgerDeliveryReceiptAuditBlocked198S["code"],
  blockedReason: string,
): StreamGiftLedgerDeliveryReceiptAuditBlocked198S {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    status: "delivery_receipt_blocked_by_guard",
    code,
    blockedReason,
    deliveredToClientConfirmed: false,
    receiptPersisted: false,
    availableBalanceReleased: false,
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY,
  };
}

export function normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S(raw: Record<string, unknown>): StreamGiftLedgerDeliveryReceiptAuditInput198S {
  return {
    sendIntentId: clean(raw.sendIntentId),
    idempotencyKeyHash: clean(raw.idempotencyKeyHash),
    clientReceiptId: clean(raw.clientReceiptId),
    clientPlatform: normalizeClientPlatform(raw.clientPlatform),
    receivedEventName: clean(raw.receivedEventName),
    receivedAtClientIso: clean(raw.receivedAtClientIso),
    deliveredPayloadHash: clean(raw.deliveredPayloadHash),
    senderUserId: clean(raw.senderUserId),
    receiverUserId: clean(raw.receiverUserId),
    roomId: clean(raw.roomId),
    conversationId: clean(raw.conversationId),
    ackMode: normalizeAckMode(raw.ackMode),
  };
}

function validateReceiptShape198S(input: StreamGiftLedgerDeliveryReceiptAuditInput198S): StreamGiftLedgerDeliveryReceiptAuditBlocked198S | undefined {
  if (!input.sendIntentId && !input.idempotencyKeyHash) {
    return blocked198S("receipt_selector_required", "sendIntentId or idempotencyKeyHash is required for receipt audit");
  }
  if (input.receivedEventName !== "stream.gift.ledger.committed.v1") {
    return blocked198S("receipt_event_name_invalid", "receivedEventName must be stream.gift.ledger.committed.v1");
  }
  if (!input.clientReceiptId || input.clientReceiptId.length < 8) {
    return blocked198S("receipt_shape_invalid", "clientReceiptId is required and must be stable enough for idempotent receipt audit");
  }
  return undefined;
}

function matchesOptional(expected: string | undefined, actual: string | undefined): boolean {
  return !expected || !actual || expected === actual;
}

export async function verifyStreamGiftLedgerDeliveryReceiptAudit198S(
  prisma: PrismaClient,
  input: StreamGiftLedgerDeliveryReceiptAuditInput198S,
  options: Readonly<{ requireRuntimeFlag: boolean }> = { requireRuntimeFlag: true },
): Promise<StreamGiftLedgerDeliveryReceiptAuditResult198S> {
  if (options.requireRuntimeFlag && !isReceiptRuntimeEnabled198S()) {
    return blocked198S(
      "receipt_runtime_flag_disabled",
      "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED=true is required before accepting mobile delivery receipts",
    );
  }

  const shapeError = validateReceiptShape198S(input);
  if (shapeError) return shapeError;

  const preview = await previewStreamGiftLedgerRealtimeDelivery198Q(
    prisma,
    normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q({
      sendIntentId: input.sendIntentId,
      idempotencyKeyHash: input.idempotencyKeyHash,
    }),
  );

  if (!preview.ok) {
    return blocked198S("post_commit_preview_blocked", preview.blockedReason);
  }

  const payload = preview.payload;
  const matched = Boolean(
    matchesOptional(input.senderUserId, payload.senderUserId) &&
    matchesOptional(input.receiverUserId, payload.receiverUserId) &&
    matchesOptional(input.roomId, payload.roomId) &&
    matchesOptional(input.conversationId, payload.conversationId),
  );

  if (!matched) {
    return blocked198S(
      "receipt_not_matching_committed_payload",
      "Receipt sender/receiver/room/conversation fields do not match committed ledger payload",
    );
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    status: "delivery_receipt_verified_for_audit_preview_not_persisted",
    sendIntentId: payload.sendIntentId,
    clientReceiptId: input.clientReceiptId ?? "missing_client_receipt_id",
    clientPlatform: input.clientPlatform ?? "unknown",
    receivedEventName: "stream.gift.ledger.committed.v1",
    ackMode: input.ackMode ?? "unknown",
    clientReceiptShapeVerified: true,
    committedPayloadMatched: true,
    deliveredToClientConfirmed: false,
    receiptPersisted: false,
    receiptPersistenceRequired: true,
    adminAuditRequired: true,
    availableBalanceReleased: false,
    payload,
    auditNotes: [
      "198S verifies receipt shape against committed ledger payload only",
      "198S does not persist delivery receipt because no dedicated receipt/audit table is enabled yet",
      "client receipt is not accepted as financial truth and never releases available balance",
      "persistent receipt/audit store remains a separate 198T schema/runtime step",
    ],
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY,
  };
}

export async function previewStreamGiftLedgerDeliveryReceiptAdminAudit198S(
  prisma: PrismaClient,
  input: StreamGiftLedgerDeliveryReceiptAuditInput198S,
): Promise<StreamGiftLedgerDeliveryReceiptAuditResult198S> {
  return verifyStreamGiftLedgerDeliveryReceiptAudit198S(prisma, input, { requireRuntimeFlag: false });
}

export function getStreamGiftLedgerDeliveryReceiptAuditReadiness198S(): StreamGiftLedgerDeliveryReceiptAuditReadiness198S {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    status: "ready_for_delivery_receipt_audit_contract",
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY,
    eventName: "stream.gift.ledger.committed.v1",
    receiptRuntimeFlag: "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED=true",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198s/readiness",
      "GET /api/admin/stream/gifts/ledger/198s/receipt-contract",
      "POST /api/admin/stream/gifts/ledger/198s/audit-preview",
      "POST /api/stream/gifts/ledger/198s/delivery-receipt",
      "GET /api/admin/stream/gifts/ledger/198s/runbook",
      "POST /api/admin/stream/gifts/ledger/198s/next-persistent-audit-request",
    ],
    next: "198T_persistent_delivery_receipt_schema_or_admin_audit_store",
  };
}

export function getStreamGiftLedgerDeliveryReceiptContract198S(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    eventName: "stream.gift.ledger.committed.v1",
    receiptEndpoint: "POST /api/stream/gifts/ledger/198s/delivery-receipt",
    requiredFields: ["sendIntentId or idempotencyKeyHash", "clientReceiptId", "receivedEventName"],
    optionalMatchFields: ["senderUserId", "receiverUserId", "roomId", "conversationId", "clientPlatform", "ackMode", "receivedAtClientIso", "deliveredPayloadHash"],
    acceptedOnlyWhen: [
      "198P post-commit inspection passes",
      "198Q payload preview passes",
      "receivedEventName is stream.gift.ledger.committed.v1",
      "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED=true for public mobile receipt endpoint",
    ],
    receiptPersistenceNow: false,
    deliveredToClientConfirmedNow: false,
    availableBalanceReleaseNow: false,
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY,
  };
}

export function getStreamGiftLedgerDeliveryReceiptAuditRunbook198S(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-198s-delivery-receipt-audit-preview.js --latest-committed",
      "set STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_ACCEPT_ENABLED=true",
      "POST /api/stream/gifts/ledger/198s/delivery-receipt with committed sendIntentId and clientReceiptId",
    ],
    note: "198S validates receipt/audit contract only. It does not persist delivery receipt and never releases available balance.",
  };
}

export function createStreamGiftLedgerPersistentDeliveryAuditRequest198S(): StreamGiftLedgerDeliveryReceiptAuditNextRequest198S {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
    nextStage: "198T_persistent_delivery_receipt_schema_or_admin_audit_store",
    allowedNext: [
      "persistent delivery receipt/audit table planning",
      "idempotent receipt persistence after authenticated mobile ack",
      "admin audit query by sendIntentId/clientReceiptId",
      "mobile receipt state sync without available balance release",
    ],
    stillForbidden: [
      "fake delivered event",
      "fake gift send success",
      "available balance release before settlement gates",
      "Wallet mutation from receipt endpoint",
      "provider call from receipt endpoint",
      "payout execution",
      "raw provider token/reference output",
    ],
  };
}

export function assertStreamGiftLedgerDeliveryReceiptAudit198SRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.mobileDeliveryReceiptPersistAllowedNow,
    safety.clientReceiptAcceptedAsFinancialTruth,
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

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_UNSAFE_FLAG");
}
