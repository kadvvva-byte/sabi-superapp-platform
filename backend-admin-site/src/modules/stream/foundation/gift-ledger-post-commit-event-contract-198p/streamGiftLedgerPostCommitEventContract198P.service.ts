import type { PrismaClient } from "@prisma/client";
import {
  STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
  type StreamGiftLedgerMobileRealtimeEventContract198P,
  type StreamGiftLedgerPostCommitEventContractReadiness198P,
  type StreamGiftLedgerPostCommitEventContractSafety198P,
  type StreamGiftLedgerPostCommitInspectionInput198P,
  type StreamGiftLedgerPostCommitInspectionNotFound198P,
  type StreamGiftLedgerPostCommitInspectionResult198P,
  type StreamGiftLedgerPostCommitNextRequest198P,
} from "./streamGiftLedgerPostCommitEventContract198P.types";

export const STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY: StreamGiftLedgerPostCommitEventContractSafety198P = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedNow: false,
  realtimeEmitAllowedNow: false,
  mobileDeliveryAllowedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutAllowedNow: false,
  availableBalanceReleaseAllowedNow: false,
  fakeGiftDeliveredEventAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceOutputAllowed: false,
});

const REQUIRED_GATE_KINDS_198P = [
  "PROVIDER_SETTLEMENT",
  "REFUND_WINDOW",
  "CHARGEBACK_RISK",
  "FRAUD_REVIEW",
  "COMPLIANCE_REVIEW",
  "TAX_WITHHOLDING",
  "KYC_KYB_AML",
  "AGE_REGION_POLICY",
  "ADMIN_APPROVAL",
] as const;

type DynamicDelegate198P = Readonly<{
  findFirst?: (args: Record<string, unknown>) => Promise<unknown>;
  findUnique?: (args: Record<string, unknown>) => Promise<unknown>;
  findMany?: (args: Record<string, unknown>) => Promise<unknown>;
}>;

type DynamicPrisma198P = Record<string, unknown>;

type SendIntentRecord198P = Readonly<{
  id: string;
  context: string;
  senderUserId: string;
  receiverUserId: string;
  roomId?: string | null;
  conversationId?: string | null;
  giftCatalogItemId: string;
  quantity: number;
  grossDiamondMicros: bigint | number | string;
  receiverPendingDiamondMicros: bigint | number | string;
  platformFeeDiamondMicros: bigint | number | string;
  idempotencyKeyHash: string;
  providerReferenceHash?: string | null;
  status: string;
  giftCatalogItem?: { giftKey?: string; title?: string } | null;
}>;

type LedgerRecord198P = Readonly<{
  id: string;
  sendIntentId: string;
  entryKind: string;
  partyUserId: string;
  amountDiamondMicros: bigint | number | string;
}>;

type EarningRecord198P = Readonly<{
  id: string;
  creatorUserId: string;
  sendIntentId: string;
  pendingDiamondMicros: bigint | number | string;
  availableDiamondMicros: bigint | number | string;
  status: string;
  payoutEligible: boolean;
  payoutExecutionAllowed: boolean;
}>;

type SettlementGateRecord198P = Readonly<{
  id: string;
  sendIntentId: string;
  gateKind: string;
  status: string;
  payoutReleaseAllowed: boolean;
}>;

function cleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

function getDelegate(client: DynamicPrisma198P, name: string): DynamicDelegate198P {
  const delegate = client[name];
  if (!delegate || typeof delegate !== "object") throw new Error(`prisma_delegate_missing_${name}`);
  return delegate as DynamicDelegate198P;
}

function requireDelegateMethod<T extends keyof DynamicDelegate198P>(delegate: DynamicDelegate198P, method: T): NonNullable<DynamicDelegate198P[T]> {
  const fn = delegate[method];
  if (typeof fn !== "function") throw new Error(`prisma_delegate_method_missing_${String(method)}`);
  return fn as NonNullable<DynamicDelegate198P[T]>;
}

function bigintString(value: bigint | number | string | undefined | null): string {
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string" && /^-?\d+$/.test(value)) return value;
  return "0";
}

function big(value: bigint | number | string | undefined | null): bigint {
  return BigInt(bigintString(value));
}

function isSha256Hex64(value: unknown): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);
}

function toSendIntentRecord(value: unknown): SendIntentRecord198P | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<SendIntentRecord198P>;
  if (typeof record.id !== "string" || typeof record.senderUserId !== "string" || typeof record.receiverUserId !== "string") return undefined;
  if (typeof record.giftCatalogItemId !== "string" || typeof record.idempotencyKeyHash !== "string" || typeof record.status !== "string") return undefined;
  if (typeof record.quantity !== "number") return undefined;
  return record as SendIntentRecord198P;
}

function toLedgerRecords(value: unknown): LedgerRecord198P[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is LedgerRecord198P => {
    if (!entry || typeof entry !== "object") return false;
    const record = entry as Partial<LedgerRecord198P>;
    return typeof record.id === "string" && typeof record.entryKind === "string" && typeof record.partyUserId === "string";
  });
}

function toEarningRecords(value: unknown): EarningRecord198P[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is EarningRecord198P => {
    if (!entry || typeof entry !== "object") return false;
    const record = entry as Partial<EarningRecord198P>;
    return typeof record.id === "string" && typeof record.creatorUserId === "string" && typeof record.status === "string";
  });
}

function toSettlementGateRecords(value: unknown): SettlementGateRecord198P[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is SettlementGateRecord198P => {
    if (!entry || typeof entry !== "object") return false;
    const record = entry as Partial<SettlementGateRecord198P>;
    return typeof record.id === "string" && typeof record.gateKind === "string" && typeof record.status === "string";
  });
}

function createInspectionNotFound198P(code: StreamGiftLedgerPostCommitInspectionNotFound198P["code"]): StreamGiftLedgerPostCommitInspectionNotFound198P {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    status: "inspection_not_found",
    code,
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY,
  };
}

function buildMobileRealtimeEventContract198P(sendIntent: SendIntentRecord198P): StreamGiftLedgerMobileRealtimeEventContract198P {
  return {
    eventName: "stream.gift.ledger.committed.v1",
    deliveryStatus: "contract_only_not_emitted",
    emitOnlyAfter: ["ledger_committed", "provider_authorization_hash_present", "post_commit_inspection_passed"],
    payload: {
      sendIntentId: sendIntent.id,
      context: sendIntent.context,
      senderUserId: sendIntent.senderUserId,
      receiverUserId: sendIntent.receiverUserId,
      roomId: sendIntent.roomId ?? undefined,
      conversationId: sendIntent.conversationId ?? undefined,
      giftCatalogItemId: sendIntent.giftCatalogItemId,
      giftKey: sendIntent.giftCatalogItem?.giftKey,
      giftTitle: sendIntent.giftCatalogItem?.title,
      quantity: sendIntent.quantity,
      grossDiamondMicros: bigintString(sendIntent.grossDiamondMicros),
      receiverPendingDiamondMicros: bigintString(sendIntent.receiverPendingDiamondMicros),
      platformFeeDiamondMicros: bigintString(sendIntent.platformFeeDiamondMicros),
      receiverBalancePresentation: "pending_only",
      availableBalancePresentation: "hidden_until_settlement",
      payoutPresentation: "blocked_until_creator_settlement_gates_pass",
    },
    forbiddenPayloadFields: [
      "providerReferenceHash",
      "rawProviderReference",
      "providerToken",
      "paymentToken",
      "purchaseToken",
      "authorizationCode",
      "availableBalanceDiamondMicros",
      "payoutExecutionAllowed=true",
      "fakeDelivered=true",
    ],
  };
}

export function normalizeStreamGiftLedgerPostCommitInspectionInput198P(input: Record<string, unknown>): StreamGiftLedgerPostCommitInspectionInput198P {
  return {
    sendIntentId: cleanText(input.sendIntentId),
    idempotencyKeyHash: cleanText(input.idempotencyKeyHash),
    includeEventContract: toBoolean(input.includeEventContract),
  };
}

export async function inspectStreamGiftLedgerPostCommit198P(
  client: PrismaClient,
  input: StreamGiftLedgerPostCommitInspectionInput198P,
): Promise<StreamGiftLedgerPostCommitInspectionResult198P | StreamGiftLedgerPostCommitInspectionNotFound198P> {
  if (!input.sendIntentId && !input.idempotencyKeyHash) return createInspectionNotFound198P("inspection_selector_required");

  const dynamicClient = client as unknown as DynamicPrisma198P;
  const sendIntentDelegate = getDelegate(dynamicClient, "streamGiftSendIntent");
  const ledgerDelegate = getDelegate(dynamicClient, "streamGiftLedgerEntry");
  const earningDelegate = getDelegate(dynamicClient, "streamGiftCreatorEarning");
  const gateDelegate = getDelegate(dynamicClient, "streamGiftSettlementGate");

  const findFirstIntent = requireDelegateMethod(sendIntentDelegate, "findFirst");
  const sendIntent = toSendIntentRecord(await findFirstIntent({
    where: input.sendIntentId ? { id: input.sendIntentId } : { idempotencyKeyHash: input.idempotencyKeyHash },
    include: { giftCatalogItem: { select: { giftKey: true, title: true } } },
  }));
  if (!sendIntent) return createInspectionNotFound198P("send_intent_not_found");

  const findLedger = requireDelegateMethod(ledgerDelegate, "findMany");
  const ledgerEntries = toLedgerRecords(await findLedger({ where: { sendIntentId: sendIntent.id } }));
  const senderEntries = ledgerEntries.filter((entry) => entry.entryKind === "SENDER_DEBIT_AUTHORIZATION");
  const receiverEntries = ledgerEntries.filter((entry) => entry.entryKind === "RECEIVER_PENDING_CREDIT");
  const platformEntries = ledgerEntries.filter((entry) => entry.entryKind === "PLATFORM_FEE_RESERVE");

  const findEarnings = requireDelegateMethod(earningDelegate, "findMany");
  const earnings = toEarningRecords(await findEarnings({ where: { sendIntentId: sendIntent.id } }));

  const findGates = requireDelegateMethod(gateDelegate, "findMany");
  const settlementGates = toSettlementGateRecords(await findGates({ where: { sendIntentId: sendIntent.id } }));
  const payoutReleaseAllowedCount = settlementGates.filter((gate) => gate.payoutReleaseAllowed).length;

  const grossDiamondMicrosFromLedger = senderEntries.reduce((sum, entry) => sum + big(entry.amountDiamondMicros), 0n);
  const receiverPendingDiamondMicrosFromLedger = receiverEntries.reduce((sum, entry) => sum + big(entry.amountDiamondMicros), 0n);
  const platformFeeDiamondMicrosFromLedger = platformEntries.reduce((sum, entry) => sum + big(entry.amountDiamondMicros), 0n);
  const pendingDiamondMicros = earnings.reduce((sum, earning) => sum + big(earning.pendingDiamondMicros), 0n);
  const availableDiamondMicros = earnings.reduce((sum, earning) => sum + big(earning.availableDiamondMicros), 0n);

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    status: "inspected_committed_ledger",
    sendIntentId: sendIntent.id,
    context: sendIntent.context,
    senderUserId: sendIntent.senderUserId,
    receiverUserId: sendIntent.receiverUserId,
    giftCatalogItemId: sendIntent.giftCatalogItemId,
    idempotencyKeyHashPresent: true,
    providerReferenceHashPresent: typeof sendIntent.providerReferenceHash === "string" && sendIntent.providerReferenceHash.length > 0,
    providerReferenceHashShape: isSha256Hex64(sendIntent.providerReferenceHash) ? "sha256_hex_64" : "missing_or_invalid_shape",
    providerReferenceHashPrinted: false,
    sendIntentStatus: sendIntent.status,
    quantity: sendIntent.quantity,
    grossDiamondMicros: bigintString(sendIntent.grossDiamondMicros),
    receiverPendingDiamondMicros: bigintString(sendIntent.receiverPendingDiamondMicros),
    platformFeeDiamondMicros: bigintString(sendIntent.platformFeeDiamondMicros),
    ledger: {
      ledgerEntryCount: ledgerEntries.length,
      senderDebitAuthorizationCount: senderEntries.length,
      receiverPendingCreditCount: receiverEntries.length,
      platformFeeReserveCount: platformEntries.length,
      grossDiamondMicrosFromLedger: grossDiamondMicrosFromLedger.toString(),
      receiverPendingDiamondMicrosFromLedger: receiverPendingDiamondMicrosFromLedger.toString(),
      platformFeeDiamondMicrosFromLedger: platformFeeDiamondMicrosFromLedger.toString(),
    },
    earning: {
      creatorEarningCount: earnings.length,
      pendingDiamondMicros: pendingDiamondMicros.toString(),
      availableDiamondMicros: "0",
      payoutEligible: false,
      payoutExecutionAllowed: false,
      status: earnings[0]?.status ?? "PENDING",
    },
    settlement: {
      settlementGateCount: settlementGates.length,
      pendingGateCount: settlementGates.filter((gate) => gate.status === "PENDING").length,
      payoutReleaseAllowedCount: 0,
      requiredGateKinds: REQUIRED_GATE_KINDS_198P,
    },
    eventContract: input.includeEventContract ? buildMobileRealtimeEventContract198P(sendIntent) : undefined,
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY,
  } satisfies StreamGiftLedgerPostCommitInspectionResult198P;
}

export function getStreamGiftLedgerPostCommitEventContractReadiness198P(): StreamGiftLedgerPostCommitEventContractReadiness198P {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    status: "ready_for_post_commit_inspection",
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY,
    routes: [
      "GET /api/admin/stream/gifts/ledger/198p/readiness",
      "GET /api/admin/stream/gifts/ledger/198p/event-contract",
      "POST /api/admin/stream/gifts/ledger/198p/inspect",
      "GET /api/admin/stream/gifts/ledger/198p/runbook",
      "POST /api/admin/stream/gifts/ledger/198p/next-realtime-adapter-request",
    ],
    localRunner: "tools/stream-gifts-ledger-198p-post-commit-inspection-read-only.js",
    inspectModels: [
      "StreamGiftSendIntent",
      "StreamGiftLedgerEntry",
      "StreamGiftCreatorEarning",
      "StreamGiftSettlementGate",
      "StreamGiftCatalogItem",
    ],
    eventContract: "stream.gift.ledger.committed.v1",
    next: "198Q_realtime_delivery_adapter_guarded_by_post_commit_inspection",
  };
}

export function getStreamGiftLedgerMobileRealtimeEventContract198P(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    eventName: "stream.gift.ledger.committed.v1",
    status: "contract_only_not_emitted",
    payloadPolicy: {
      include: [
        "sendIntentId",
        "context",
        "senderUserId",
        "receiverUserId",
        "roomId/conversationId",
        "giftCatalogItemId/giftKey/title",
        "quantity",
        "grossDiamondMicros",
        "receiverPendingDiamondMicros",
        "platformFeeDiamondMicros",
      ],
      exclude: [
        "providerReferenceHash",
        "raw provider reference/token/purchase token",
        "available balance release",
        "payout execution approval",
        "fake delivered/sent success",
      ],
    },
    deliveryPolicy: [
      "emit only after ledger commit exists",
      "emit only after post-commit inspection passes",
      "mobile shows receiver pending only, not available balance",
      "messenger and stream consume same event contract",
    ],
    safety: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY,
  };
}

export function getStreamGiftLedgerPostCommitRunbook198P(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    commandBySendIntent: "node .\\tools\\stream-gifts-ledger-198p-post-commit-inspection-read-only.js --send-intent-id=<id>",
    commandByLatest: "node .\\tools\\stream-gifts-ledger-198p-post-commit-inspection-read-only.js --latest-committed",
    reportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198p-post-commit-inspection-read-only-report.json",
    note: "Read-only inspection. It never emits realtime/mobile events and never releases available balance or payout.",
  };
}

export function createStreamGiftLedgerRealtimeAdapterRequest198P(): StreamGiftLedgerPostCommitNextRequest198P {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
    nextStage: "198Q_realtime_delivery_adapter_guarded_by_post_commit_inspection",
    allowedNext: [
      "guarded realtime adapter contract for stream.gift.ledger.committed.v1",
      "mobile/messenger event payload mapper without provider/hash/raw secret fields",
      "delivery route remains disabled until post-commit inspection and realtime provider readiness pass",
    ],
    stillForbidden: [
      "provider call from gift ledger",
      "Wallet mutation from gift ledger",
      "available balance release before settlement gates",
      "payout execution",
      "raw provider token/reference output",
      "fake delivered event",
      "fake gift send success",
    ],
  };
}

export function assertStreamGiftLedgerPostCommitEventContract198PRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_SAFETY;
  const unsafe = [
    safety.dbWriteAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.mobileDeliveryAllowedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutAllowedNow,
    safety.availableBalanceReleaseAllowedNow,
    safety.fakeGiftDeliveredEventAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceOutputAllowed,
  ].some(Boolean);

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_UNSAFE_FLAG");
}
