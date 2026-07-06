import { createHash } from "crypto";
import type { PrismaClient } from "@prisma/client";
import {
  normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S,
  verifyStreamGiftLedgerDeliveryReceiptAudit198S,
} from "../gift-ledger-delivery-receipt-audit-198s";
import {
  STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
  type StreamGiftLedgerDeliveryReceiptPersistentBlocked198T,
  type StreamGiftLedgerDeliveryReceiptPersistentInput198T,
  type StreamGiftLedgerDeliveryReceiptPersistentResult198T,
  type StreamGiftLedgerDeliveryReceiptPersistentStoreSafety198T,
} from "./streamGiftLedgerDeliveryReceiptPersistentStore198T.types";

type DeliveryReceiptAuditDelegate198T = Readonly<{
  upsert(args: Record<string, unknown>): Promise<Record<string, unknown>>;
  findMany(args: Record<string, unknown>): Promise<readonly Record<string, unknown>[]>;
  count(args?: Record<string, unknown>): Promise<number>;
}>;

export const STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY: StreamGiftLedgerDeliveryReceiptPersistentStoreSafety198T = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedOnlyWithExplicitRuntimeFlag: true,
  receiptPersistenceAllowedOnlyAfter198SVerification: true,
  clientReceiptAcceptedAsFinancialTruth: false,
  realtimeEmitAllowedNow: false,
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

function receiptPersistenceEnabled198T(): boolean {
  return String(process.env.STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSIST_ENABLED || "").trim().toLowerCase() === "true";
}

function getReceiptAuditDelegate198T(prisma: PrismaClient): DeliveryReceiptAuditDelegate198T | undefined {
  const candidate = (prisma as unknown as { streamGiftDeliveryReceiptAudit?: DeliveryReceiptAuditDelegate198T }).streamGiftDeliveryReceiptAudit;
  return candidate && typeof candidate.upsert === "function" && typeof candidate.findMany === "function" ? candidate : undefined;
}

function deterministicReceiptAuditId198T(sendIntentId: string, clientReceiptId: string): string {
  return `sgdra_198t_${createHash("sha256").update(`${sendIntentId}:${clientReceiptId}`).digest("hex").slice(0, 40)}`;
}

function blocked198T(
  code: StreamGiftLedgerDeliveryReceiptPersistentBlocked198T["code"],
  blockedReason: string,
): StreamGiftLedgerDeliveryReceiptPersistentBlocked198T {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    status: "persistent_receipt_blocked_by_guard",
    code,
    blockedReason,
    receiptPersisted: false,
    deliveredToClientConfirmed: false,
    availableBalanceReleased: false,
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
  };
}

export function normalizeStreamGiftLedgerDeliveryReceiptPersistentInput198T(
  raw: Record<string, unknown>,
): StreamGiftLedgerDeliveryReceiptPersistentInput198T {
  return normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S(raw) as StreamGiftLedgerDeliveryReceiptPersistentInput198T;
}

export async function persistStreamGiftLedgerDeliveryReceiptAudit198T(
  prisma: PrismaClient,
  input: StreamGiftLedgerDeliveryReceiptPersistentInput198T,
  options: Readonly<{ requireRuntimeFlag: boolean }> = { requireRuntimeFlag: true },
): Promise<StreamGiftLedgerDeliveryReceiptPersistentResult198T> {
  if (options.requireRuntimeFlag && !receiptPersistenceEnabled198T()) {
    return blocked198T(
      "persistence_runtime_flag_disabled",
      "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSIST_ENABLED=true is required before persisting mobile delivery receipts",
    );
  }

  const verified = await verifyStreamGiftLedgerDeliveryReceiptAudit198S(prisma, input, { requireRuntimeFlag: false });
  if (!verified.ok) {
    return blocked198T("receipt_verification_failed", verified.blockedReason);
  }

  const delegate = getReceiptAuditDelegate198T(prisma);
  if (!delegate) {
    return blocked198T(
      "receipt_delegate_missing_generate_required",
      "Prisma delegate streamGiftDeliveryReceiptAudit is missing. Run 198T migrate+generate runner after installing the schema patch.",
    );
  }

  const clientReceiptId = verified.clientReceiptId;
  const receiptAuditId = deterministicReceiptAuditId198T(verified.sendIntentId, clientReceiptId);
  const nowIso = new Date().toISOString();
  const createUpdate = {
    sendIntentId: verified.sendIntentId,
    clientReceiptId,
    clientPlatform: verified.clientPlatform,
    ackMode: verified.ackMode,
    receivedEventName: verified.receivedEventName,
    receivedAtClientIso: clean(input.receivedAtClientIso),
    deliveredPayloadHash: clean(input.deliveredPayloadHash),
    senderUserId: verified.payload.senderUserId,
    receiverUserId: verified.payload.receiverUserId,
    roomId: verified.payload.roomId,
    conversationId: verified.payload.conversationId,
    receiptStatus: "VERIFIED_AUDIT_ONLY",
    availableBalanceReleased: false,
    payoutReleaseAllowed: false,
    metadata: {
      stage: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
      persistedForAuditOnly: true,
      deliveredToClientConfirmed: false,
      availableBalanceReleased: false,
      clientReceiptAcceptedAsFinancialTruth: false,
      payloadPreviewStatus: verified.payload.deliveryStatus,
    },
  };

  try {
    await delegate.upsert({
      where: { id: receiptAuditId },
      create: { id: receiptAuditId, ...createUpdate },
      update: createUpdate,
    });
  } catch (error) {
    return blocked198T("receipt_persistence_failed", error instanceof Error ? error.message : String(error));
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    status: "delivery_receipt_persisted_for_audit_only",
    receiptAuditId,
    sendIntentId: verified.sendIntentId,
    clientReceiptId,
    clientPlatform: verified.clientPlatform,
    ackMode: verified.ackMode,
    receiptPersisted: true,
    deliveredToClientConfirmed: false,
    availableBalanceReleased: false,
    payoutReleaseAllowed: false,
    receiptStatus: "VERIFIED_AUDIT_ONLY",
    persistedAt: nowIso,
    auditNotes: [
      "198T persists receipt for audit/idempotency only",
      "mobile receipt does not prove financial settlement",
      "available balance remains blocked until settlement gates pass",
      "payout remains blocked until creator payout system approves release",
    ],
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
  };
}

export async function listStreamGiftLedgerDeliveryReceiptAudit198T(
  prisma: PrismaClient,
  input: Readonly<{ sendIntentId?: string; clientReceiptId?: string; take?: number }>,
): Promise<Readonly<Record<string, unknown>>> {
  const delegate = getReceiptAuditDelegate198T(prisma);
  if (!delegate) {
    return {
      ok: false,
      version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
      status: "receipt_delegate_missing_generate_required",
      safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
    };
  }
  const where: Record<string, unknown> = {};
  if (input.sendIntentId) where.sendIntentId = input.sendIntentId;
  if (input.clientReceiptId) where.clientReceiptId = input.clientReceiptId;
  const rows = await delegate.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: Math.max(1, Math.min(Number(input.take || 20), 50)),
  });
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    status: "receipt_audit_rows_read_only",
    count: rows.length,
    rows,
    availableBalanceReleased: false,
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
  };
}

export function getStreamGiftLedgerDeliveryReceiptPersistentStoreReadiness198T(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    status: "ready_for_persistent_delivery_receipt_audit_store",
    persistenceFlag: "STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSIST_ENABLED=true",
    model: "StreamGiftDeliveryReceiptAudit",
    routes: [
      "GET /api/admin/stream/gifts/ledger/198t/readiness",
      "GET /api/admin/stream/gifts/ledger/198t/schema-contract",
      "POST /api/stream/gifts/ledger/198t/delivery-receipt",
      "POST /api/admin/stream/gifts/ledger/198t/audit-read",
      "GET /api/admin/stream/gifts/ledger/198t/runbook",
      "POST /api/admin/stream/gifts/ledger/198t/next-settlement-request",
    ],
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
  };
}

export function getStreamGiftLedgerDeliveryReceiptPersistentSchemaContract198T(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    model: "StreamGiftDeliveryReceiptAudit",
    uniqueKeys: ["id", "sendIntentId + clientReceiptId"],
    persistedState: "VERIFIED_AUDIT_ONLY",
    availableBalanceReleased: false,
    payoutReleaseAllowed: false,
    clientReceiptAcceptedAsFinancialTruth: false,
    safety: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY,
  };
}

export function getStreamGiftLedgerDeliveryReceiptPersistentRunbook198T(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    commands: [
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      "node .\tools\stream-gifts-ledger-198t-migrate-generate.js --i-approve-198t-local-migrate-generate",
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      "set STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSIST_ENABLED=true",
      "POST /api/stream/gifts/ledger/198t/delivery-receipt with committed sendIntentId and clientReceiptId",
    ],
    note: "198T persists receipt/audit only. It never releases available balance and never executes payout.",
  };
}

export function createStreamGiftLedgerSettlementRequest198T(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
    nextStage: "198U_settlement_gate_readiness_and_available_balance_release_planning",
    allowedNext: [
      "read settlement gates",
      "verify all gates passed",
      "plan available balance release separately",
    ],
    stillForbidden: [
      "available balance release from delivery receipt",
      "payout execution from delivery receipt",
      "Wallet mutation from delivery receipt",
      "provider call from delivery receipt",
      "fake delivered success",
    ],
  };
}

export function assertStreamGiftLedgerDeliveryReceiptPersistentStore198TRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_SAFETY;
  const unsafe = [
    safety.clientReceiptAcceptedAsFinancialTruth,
    safety.realtimeEmitAllowedNow,
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

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_UNSAFE_FLAG");
}
