import { createHash, randomUUID } from "crypto";
import type { PrismaClient } from "@prisma/client";
import {
  STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
  type StreamGiftLedgerBlockedDbCommit198K,
  type StreamGiftLedgerCatalogSnapshot198K,
  type StreamGiftLedgerContext198K,
  type StreamGiftLedgerDbBackedEconomy198K,
  type StreamGiftLedgerDbBackedInput198K,
  type StreamGiftLedgerDbBackedReadiness198K,
  type StreamGiftLedgerDbBackedSafety198K,
  type StreamGiftLedgerDbCommit198K,
  type StreamGiftLedgerDbQuote198K,
  type StreamGiftLedgerPrismaRuntimeContext198K,
} from "./streamGiftLedgerDbBacked198K.types";

const DIAMOND_MICROS_PER_DIAMOND = 1_000_000n;
const BPS_DENOMINATOR = 10_000n;
const RECEIVER_SHARE_BPS = 7_000n;

export const STREAM_GIFT_LEDGER_DB_BACKED_198K_SAFETY: StreamGiftLedgerDbBackedSafety198K = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedWithVerifiedAuthorizationOnly: true,
  defaultRouteWriteEnabled: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutAllowedNow: false,
  realtimeEmitAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawProviderTokenAccepted: false,
});

export const STREAM_GIFT_LEDGER_DB_BACKED_198K_ECONOMY: StreamGiftLedgerDbBackedEconomy198K = Object.freeze({
  diamondUnit: "diamond_micros",
  giftPriceMinDiamonds: 1,
  giftPriceMaxDiamonds: 10000,
  receiverShareBps: 7000,
  platformComplianceFeeBps: 3000,
  basisPointsDenominator: 10000,
  diamondMicrosPerDiamond: "1000000",
});

type DynamicDelegate198K = Readonly<{
  findFirst?: (args: Record<string, unknown>) => Promise<unknown>;
  findUnique?: (args: Record<string, unknown>) => Promise<unknown>;
  create?: (args: Record<string, unknown>) => Promise<unknown>;
  createMany?: (args: Record<string, unknown>) => Promise<unknown>;
}>;

type DynamicPrisma198K = Record<string, unknown> & Readonly<{
  $transaction?: <T>(fn: (tx: DynamicPrisma198K) => Promise<T>) => Promise<T>;
}>;

type StreamGiftCatalogItemRecord198K = Readonly<{
  id: string;
  giftKey: string;
  title: string;
  diamondPrice: number;
  active: boolean;
  premiumTier?: string | null;
  assetId?: string | null;
  assetPosterUrl?: string | null;
  assetAnimationUrl?: string | null;
}>;

type StreamGiftSendIntentRecord198K = Readonly<{
  id: string;
  idempotencyKeyHash: string;
  providerReferenceHash?: string | null;
  status: string;
}>;

function cleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function requiredText(value: unknown, field: string): string {
  const normalized = cleanText(value);
  if (!normalized) throw new Error(`${field}_required`);
  return normalized;
}

function asQuantity(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) return 1;
  return Math.min(value, 999);
}

function toContext(value: unknown): StreamGiftLedgerContext198K {
  const normalized = cleanText(value);
  if (normalized === "messenger" || normalized === "shorts" || normalized === "creator_profile") return normalized;
  return "stream_live";
}

function toPrismaRuntimeContext(context: StreamGiftLedgerContext198K): StreamGiftLedgerPrismaRuntimeContext198K {
  if (context === "messenger") return "MESSENGER";
  if (context === "shorts") return "SHORTS";
  if (context === "creator_profile") return "CREATOR_PROFILE";
  return "STREAM_LIVE";
}

function getDelegate(client: DynamicPrisma198K, name: string): DynamicDelegate198K {
  const delegate = client[name];
  if (!delegate || typeof delegate !== "object") throw new Error(`prisma_delegate_missing_${name}`);
  return delegate as DynamicDelegate198K;
}

function requireDelegateMethod<T extends keyof DynamicDelegate198K>(delegate: DynamicDelegate198K, method: T): NonNullable<DynamicDelegate198K[T]> {
  const fn = delegate[method];
  if (typeof fn !== "function") throw new Error(`prisma_delegate_method_missing_${String(method)}`);
  return fn as NonNullable<DynamicDelegate198K[T]>;
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function assertSafeProviderReferenceHash(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (!/^[a-f0-9]{64}$/i.test(value)) throw new Error("provider_reference_hash_must_be_sha256_hex");
  return value.toLowerCase();
}

function assertDiamondPrice(value: number): void {
  if (!Number.isInteger(value)) throw new Error("catalog_diamond_price_must_be_integer");
  if (value < STREAM_GIFT_LEDGER_DB_BACKED_198K_ECONOMY.giftPriceMinDiamonds || value > STREAM_GIFT_LEDGER_DB_BACKED_198K_ECONOMY.giftPriceMaxDiamonds) {
    throw new Error("catalog_diamond_price_out_of_range_1_to_10000");
  }
}

function toCatalogRecord(value: unknown): StreamGiftCatalogItemRecord198K | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<StreamGiftCatalogItemRecord198K>;
  if (typeof record.id !== "string" || typeof record.giftKey !== "string" || typeof record.title !== "string") return undefined;
  if (typeof record.diamondPrice !== "number" || typeof record.active !== "boolean") return undefined;
  return {
    id: record.id,
    giftKey: record.giftKey,
    title: record.title,
    diamondPrice: record.diamondPrice,
    active: record.active,
    premiumTier: record.premiumTier,
    assetId: record.assetId,
    assetPosterUrl: record.assetPosterUrl,
    assetAnimationUrl: record.assetAnimationUrl,
  };
}

function toSendIntentRecord(value: unknown): StreamGiftSendIntentRecord198K | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as Partial<StreamGiftSendIntentRecord198K>;
  if (typeof record.id !== "string" || typeof record.idempotencyKeyHash !== "string" || typeof record.status !== "string") return undefined;
  return {
    id: record.id,
    idempotencyKeyHash: record.idempotencyKeyHash,
    providerReferenceHash: record.providerReferenceHash,
    status: record.status,
  };
}

function toCatalogSnapshot(catalog: StreamGiftCatalogItemRecord198K): StreamGiftLedgerCatalogSnapshot198K {
  return {
    id: catalog.id,
    giftKey: catalog.giftKey,
    title: catalog.title,
    diamondPrice: catalog.diamondPrice,
    active: catalog.active,
    premiumTier: catalog.premiumTier ?? "standard",
    assetId: catalog.assetId ?? undefined,
    assetPosterUrl: catalog.assetPosterUrl ?? undefined,
    assetAnimationUrl: catalog.assetAnimationUrl ?? undefined,
  };
}

export function normalizeStreamGiftLedgerDbBackedInput198K(input: Record<string, unknown>): StreamGiftLedgerDbBackedInput198K {
  return {
    context: toContext(input.context),
    senderUserId: requiredText(input.senderUserId, "sender_user_id"),
    receiverUserId: requiredText(input.receiverUserId, "receiver_user_id"),
    giftCatalogItemId: cleanText(input.giftCatalogItemId),
    giftKey: cleanText(input.giftKey),
    roomId: cleanText(input.roomId),
    conversationId: cleanText(input.conversationId),
    quantity: asQuantity(input.quantity),
    idempotencyKey: requiredText(input.idempotencyKey, "idempotency_key"),
    providerReferenceHash: assertSafeProviderReferenceHash(cleanText(input.providerReferenceHash)),
  };
}

export async function findStreamGiftCatalogItem198K(client: PrismaClient, input: StreamGiftLedgerDbBackedInput198K): Promise<StreamGiftCatalogItemRecord198K> {
  const delegate = getDelegate(client as unknown as DynamicPrisma198K, "streamGiftCatalogItem");
  const findFirst = requireDelegateMethod(delegate, "findFirst");

  const where = input.giftCatalogItemId
    ? { id: input.giftCatalogItemId, active: true }
    : { giftKey: input.giftKey, active: true };

  const catalog = toCatalogRecord(await findFirst({ where }));
  if (!catalog) throw new Error("stream_gift_catalog_item_not_found_or_inactive");
  assertDiamondPrice(catalog.diamondPrice);
  return catalog;
}

export function createStreamGiftLedgerDbQuoteFromCatalog198K(
  input: StreamGiftLedgerDbBackedInput198K,
  catalog: StreamGiftCatalogItemRecord198K,
): StreamGiftLedgerDbQuote198K {
  const grossDiamondMicros = BigInt(catalog.diamondPrice) * BigInt(input.quantity) * DIAMOND_MICROS_PER_DIAMOND;
  const receiverPendingDiamondMicros = (grossDiamondMicros * RECEIVER_SHARE_BPS) / BPS_DENOMINATOR;
  const platformFeeDiamondMicros = grossDiamondMicros - receiverPendingDiamondMicros;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
    mode: "db_catalog_quote",
    context: input.context,
    runtimeContext: toPrismaRuntimeContext(input.context),
    catalogItem: toCatalogSnapshot(catalog),
    quantity: input.quantity,
    grossDiamondMicros: grossDiamondMicros.toString(),
    receiverPendingDiamondMicros: receiverPendingDiamondMicros.toString(),
    platformFeeDiamondMicros: platformFeeDiamondMicros.toString(),
    receiverShareBps: 7000,
    platformComplianceFeeBps: 3000,
    availableBalancePolicy: "available_balance_backend_only_after_settlement",
  };
}

export async function createStreamGiftLedgerDbQuote198K(
  client: PrismaClient,
  input: StreamGiftLedgerDbBackedInput198K,
): Promise<StreamGiftLedgerDbQuote198K> {
  const catalog = await findStreamGiftCatalogItem198K(client, input);
  return createStreamGiftLedgerDbQuoteFromCatalog198K(input, catalog);
}

function isDbWriteRouteEnabled(): boolean {
  return process.env.STREAM_GIFT_LEDGER_DB_WRITE_ENABLED === "true" &&
    process.env.STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE === "verified_reference";
}

export function createBlockedStreamGiftLedgerDbCommit198K(
  code: StreamGiftLedgerBlockedDbCommit198K["code"],
  quote?: StreamGiftLedgerDbQuote198K,
): StreamGiftLedgerBlockedDbCommit198K {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
    status: "blocked_without_mutation",
    code,
    quote,
    requiredBeforeCommit: [
      "STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=true",
      "STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=verified_reference",
      "providerReferenceHash must be sha256 hex of a verified provider/Wallet authorization reference",
      "server-side catalog item must be active and priced by backend",
      "idempotencyKey must be unique per real send attempt",
    ],
  };
}

async function runTransaction198K<T>(client: PrismaClient, fn: (tx: DynamicPrisma198K) => Promise<T>): Promise<T> {
  const dynamicClient = client as unknown as DynamicPrisma198K;
  if (typeof dynamicClient.$transaction !== "function") throw new Error("prisma_transaction_unavailable");
  return dynamicClient.$transaction(fn);
}

export async function createStreamGiftLedgerDbCommit198K(
  client: PrismaClient,
  input: StreamGiftLedgerDbBackedInput198K,
): Promise<StreamGiftLedgerDbCommit198K | StreamGiftLedgerBlockedDbCommit198K> {
  const catalog = await findStreamGiftCatalogItem198K(client, input);
  const quote = createStreamGiftLedgerDbQuoteFromCatalog198K(input, catalog);

  const verifiedProviderReferenceHash = input.providerReferenceHash;
  if (!verifiedProviderReferenceHash) {
    return createBlockedStreamGiftLedgerDbCommit198K("provider_authorization_required", quote);
  }

  if (!isDbWriteRouteEnabled()) {
    return createBlockedStreamGiftLedgerDbCommit198K("db_write_feature_flag_disabled", quote);
  }

  const idempotencyKeyHash = sha256(`198K:${input.context}:${input.senderUserId}:${input.receiverUserId}:${input.idempotencyKey}`);
  const grossDiamondMicros = BigInt(quote.grossDiamondMicros);
  const receiverPendingDiamondMicros = BigInt(quote.receiverPendingDiamondMicros);
  const platformFeeDiamondMicros = BigInt(quote.platformFeeDiamondMicros);

  return runTransaction198K(client, async (tx) => {
    const sendIntentDelegate = getDelegate(tx, "streamGiftSendIntent");
    const ledgerDelegate = getDelegate(tx, "streamGiftLedgerEntry");
    const earningDelegate = getDelegate(tx, "streamGiftCreatorEarning");
    const gateDelegate = getDelegate(tx, "streamGiftSettlementGate");

    const findUniqueIntent = requireDelegateMethod(sendIntentDelegate, "findUnique");
    const existing = toSendIntentRecord(await findUniqueIntent({ where: { idempotencyKeyHash } }));
    if (existing) {
      return {
        ok: true,
        version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
        mode: "db_ledger_committed_after_external_authorization",
        sendIntentId: existing.id,
        status: "LEDGER_COMMITTED",
        idempotencyKeyHash: existing.idempotencyKeyHash,
        providerReferenceHash: existing.providerReferenceHash ?? verifiedProviderReferenceHash,
        ledgerEntryIds: [],
        creatorEarningId: "existing_idempotent_commit",
        settlementGateIds: [],
        quote,
        notes: [
          "Idempotency key already existed; no duplicate ledger rows were created.",
          "Read DB details through admin ledger inspection route in the next stage.",
        ],
      } satisfies StreamGiftLedgerDbCommit198K;
    }

    const createIntent = requireDelegateMethod(sendIntentDelegate, "create");
    const sendIntentId = randomUUID();
    await createIntent({
      data: {
        id: sendIntentId,
        context: quote.runtimeContext,
        senderUserId: input.senderUserId,
        receiverUserId: input.receiverUserId,
        roomId: input.roomId,
        conversationId: input.conversationId,
        giftCatalogItemId: catalog.id,
        quantity: input.quantity,
        grossDiamondMicros,
        receiverPendingDiamondMicros,
        platformFeeDiamondMicros,
        idempotencyKeyHash,
        providerReferenceHash: verifiedProviderReferenceHash,
        status: "LEDGER_COMMITTED",
        blockedReasons: [],
      },
    });

    const createLedger = requireDelegateMethod(ledgerDelegate, "create");
    const senderEntryId = randomUUID();
    const receiverEntryId = randomUUID();
    const platformEntryId = randomUUID();

    await createLedger({
      data: {
        id: senderEntryId,
        sendIntentId,
        entryKind: "SENDER_DEBIT_AUTHORIZATION",
        partyUserId: input.senderUserId,
        amountDiamondMicros: grossDiamondMicros,
        idempotencyKeyHash: sha256(`${idempotencyKeyHash}:sender_debit`),
        metadata: { stage: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION },
      },
    });

    await createLedger({
      data: {
        id: receiverEntryId,
        sendIntentId,
        entryKind: "RECEIVER_PENDING_CREDIT",
        partyUserId: input.receiverUserId,
        amountDiamondMicros: receiverPendingDiamondMicros,
        idempotencyKeyHash: sha256(`${idempotencyKeyHash}:receiver_pending`),
        metadata: { stage: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION },
      },
    });

    await createLedger({
      data: {
        id: platformEntryId,
        sendIntentId,
        entryKind: "PLATFORM_FEE_RESERVE",
        partyUserId: "SABI_PLATFORM",
        amountDiamondMicros: platformFeeDiamondMicros,
        idempotencyKeyHash: sha256(`${idempotencyKeyHash}:platform_fee`),
        metadata: { stage: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION },
      },
    });

    const createEarning = requireDelegateMethod(earningDelegate, "create");
    const creatorEarningId = randomUUID();
    await createEarning({
      data: {
        id: creatorEarningId,
        creatorUserId: input.receiverUserId,
        sendIntentId,
        ledgerEntryId: receiverEntryId,
        pendingDiamondMicros: receiverPendingDiamondMicros,
        availableDiamondMicros: 0n,
        status: "PENDING",
        holdReasons: [
          "provider_settlement_required",
          "refund_window_required",
          "fraud_compliance_tax_admin_gates_required",
        ],
        payoutEligible: false,
        payoutExecutionAllowed: false,
      },
    });

    const createGate = requireDelegateMethod(gateDelegate, "create");
    const gateKinds = [
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
    const settlementGateIds: string[] = [];
    for (const gateKind of gateKinds) {
      const gateId = randomUUID();
      settlementGateIds.push(gateId);
      await createGate({
        data: {
          id: gateId,
          sendIntentId,
          creatorUserId: input.receiverUserId,
          gateKind,
          status: "PENDING",
          reasonCode: "required_before_available_balance_or_payout",
          adminReviewRequired: gateKind === "ADMIN_APPROVAL" || gateKind === "COMPLIANCE_REVIEW",
          payoutReleaseAllowed: false,
        },
      });
    }

    return {
      ok: true,
      version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
      mode: "db_ledger_committed_after_external_authorization",
      sendIntentId,
      status: "LEDGER_COMMITTED",
      idempotencyKeyHash,
      providerReferenceHash: verifiedProviderReferenceHash,
      ledgerEntryIds: [senderEntryId, receiverEntryId, platformEntryId],
      creatorEarningId,
      settlementGateIds,
      quote,
      notes: [
        "Ledger rows were created only after providerReferenceHash and local DB-write guard were present.",
        "Receiver balance is pending only; available balance and payout remain blocked by settlement gates.",
        "No provider call, Wallet mutation, payment capture, payout, or realtime event is performed in 198K.",
      ],
    } satisfies StreamGiftLedgerDbCommit198K;
  });
}

export function getStreamGiftLedgerDbBackedReadiness198K(): StreamGiftLedgerDbBackedReadiness198K {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION,
    status: "db_backed_service_ready_provider_wallet_still_guarded",
    safety: STREAM_GIFT_LEDGER_DB_BACKED_198K_SAFETY,
    economy: STREAM_GIFT_LEDGER_DB_BACKED_198K_ECONOMY,
    endpoints: [
      "GET /api/admin/stream/gifts/ledger/198k/readiness",
      "POST /api/stream/gifts/ledger/198k/quote",
      "POST /api/stream/gifts/ledger/198k/send-intent",
    ],
    dbModelsRequired: [
      "StreamGiftCatalogItem",
      "StreamGiftSendIntent",
      "StreamGiftLedgerEntry",
      "StreamGiftCreatorEarning",
      "StreamGiftSettlementGate",
    ],
    enabledOnlyWhen: [
      "Prisma migration has been applied locally/target environment",
      "Prisma client has been generated after schema write",
      "Canonical gift catalog is seeded and active",
      "External provider/Wallet authorization exists and only its hash is supplied",
      "STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=true",
      "STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=verified_reference",
    ],
    next: "198L_seed_canonical_gift_catalog_and_runtime_smoke",
  };
}

export function assertStreamGiftLedgerDbBacked198KRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_DB_BACKED_198K_SAFETY;
  const unsafe = [
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawProviderTokenAccepted,
  ].some(Boolean);

  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_DB_BACKED_198K_UNSAFE_RUNTIME_FLAG");
}
