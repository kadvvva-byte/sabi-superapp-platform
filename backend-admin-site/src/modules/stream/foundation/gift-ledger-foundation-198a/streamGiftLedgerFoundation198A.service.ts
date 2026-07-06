import type {
  StreamGiftLedgerBlockedSendIntent198A,
  StreamGiftLedgerEconomy198A,
  StreamGiftLedgerQuote198A,
  StreamGiftLedgerQuoteInput198A,
  StreamGiftLedgerReadiness198A,
  StreamGiftLedgerSafety198A,
} from "./streamGiftLedgerFoundation198A.types";

export const STREAM_GIFT_LEDGER_198A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198A" as const;

export const STREAM_GIFT_LEDGER_198A_SAFETY: StreamGiftLedgerSafety198A = Object.freeze({
  stage: STREAM_GIFT_LEDGER_198A_VERSION,
  sourceOnly: true,
  providerCallAllowedNow: false,
  paymentCaptureAllowedNow: false,
  walletMutationAllowedNow: false,
  dbWriteAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_198A_ECONOMY: StreamGiftLedgerEconomy198A = Object.freeze({
  currency: "USD",
  diamondUnit: "diamond_micros",
  giftPriceMinDiamonds: 1,
  giftPriceMaxDiamonds: 10000,
  diamondsPerCoin: 100,
  usdCentsPerCoin: 100,
  usdCentsPerDiamond: 1,
  minimumTopUpCoins: 10,
  minimumTopUpUsdCents: 1000,
  receiverShareBps: 7000,
  platformComplianceFeeBps: 3000,
  basisPointsDenominator: 10000,
  catalogExpectedGiftCount: 80,
});

const DIAMOND_MICROS_PER_DIAMOND = 1_000_000n;
const USD_MICROCENTS_PER_CENT = 1_000_000n;

function asCleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function asPositiveInteger(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) return fallback;
  return value;
}

function assertDiamondPrice(value: number): void {
  if (!Number.isInteger(value)) {
    throw new Error("gift_diamond_price_must_be_integer");
  }

  if (value < STREAM_GIFT_LEDGER_198A_ECONOMY.giftPriceMinDiamonds || value > STREAM_GIFT_LEDGER_198A_ECONOMY.giftPriceMaxDiamonds) {
    throw new Error("gift_diamond_price_out_of_range_1_to_10000");
  }
}

export function normalizeStreamGiftLedgerQuoteInput198A(input: Record<string, unknown>): StreamGiftLedgerQuoteInput198A {
  const contextCandidate = asCleanText(input.context);
  const context = contextCandidate === "messenger" || contextCandidate === "shorts" || contextCandidate === "creator_profile"
    ? contextCandidate
    : "stream_live";

  const giftId = asCleanText(input.giftId);
  if (!giftId) throw new Error("gift_id_required");

  const diamondPrice = asPositiveInteger(input.diamondPrice, 0);
  assertDiamondPrice(diamondPrice);

  return {
    context,
    senderUserId: asCleanText(input.senderUserId),
    receiverUserId: asCleanText(input.receiverUserId),
    roomId: asCleanText(input.roomId),
    conversationId: asCleanText(input.conversationId),
    giftId,
    giftTitle: asCleanText(input.giftTitle),
    diamondPrice,
    quantity: Math.min(asPositiveInteger(input.quantity, 1), 999),
    idempotencyKey: asCleanText(input.idempotencyKey),
  };
}

export function createStreamGiftLedgerQuote198A(input: StreamGiftLedgerQuoteInput198A): StreamGiftLedgerQuote198A {
  const quantity = input.quantity ?? 1;
  const grossDiamonds = input.diamondPrice * quantity;
  const grossDiamondMicros = BigInt(grossDiamonds) * DIAMOND_MICROS_PER_DIAMOND;
  const receiverPendingDiamondMicros = (grossDiamondMicros * BigInt(STREAM_GIFT_LEDGER_198A_ECONOMY.receiverShareBps)) /
    BigInt(STREAM_GIFT_LEDGER_198A_ECONOMY.basisPointsDenominator);
  const platformFeeDiamondMicros = grossDiamondMicros - receiverPendingDiamondMicros;

  const grossUsdCents = BigInt(grossDiamonds) * BigInt(STREAM_GIFT_LEDGER_198A_ECONOMY.usdCentsPerDiamond);
  const grossUsdMicroCents = grossUsdCents * USD_MICROCENTS_PER_CENT;
  const receiverPendingUsdMicroCents = (grossUsdMicroCents * BigInt(STREAM_GIFT_LEDGER_198A_ECONOMY.receiverShareBps)) /
    BigInt(STREAM_GIFT_LEDGER_198A_ECONOMY.basisPointsDenominator);
  const platformFeeUsdMicroCents = grossUsdMicroCents - receiverPendingUsdMicroCents;

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_198A_VERSION,
    context: input.context,
    giftId: input.giftId,
    giftTitle: input.giftTitle,
    quantity,
    unitDiamondPrice: input.diamondPrice,
    grossDiamonds,
    grossDiamondMicros: grossDiamondMicros.toString(),
    grossUsdCents: grossUsdCents.toString(),
    receiverPendingDiamondMicros: receiverPendingDiamondMicros.toString(),
    receiverPendingUsdMicroCents: receiverPendingUsdMicroCents.toString(),
    platformFeeDiamondMicros: platformFeeDiamondMicros.toString(),
    platformFeeUsdMicroCents: platformFeeUsdMicroCents.toString(),
    receiverShareBps: STREAM_GIFT_LEDGER_198A_ECONOMY.receiverShareBps,
    platformComplianceFeeBps: STREAM_GIFT_LEDGER_198A_ECONOMY.platformComplianceFeeBps,
    settlementState: "quote_only",
    requiredLedgerEvent: "backend_verified_gift_send_event",
    availableBalancePolicy: "available_balance_backend_only_after_settlement",
    safety: STREAM_GIFT_LEDGER_198A_SAFETY,
    notes: [
      "This quote is deterministic and integer-only; it does not charge, mutate Wallet, or create a ledger entry in 198A.",
      "Receiver earnings must be created as pending only after a verified backend gift ledger event.",
      "Available balance and payout stay locked until provider settlement, compliance, tax, risk, and admin gates pass.",
    ],
  };
}

export function getStreamGiftLedgerReadiness198A(): StreamGiftLedgerReadiness198A {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_198A_VERSION,
    status: "source_only_safe_disabled_contract_ready",
    mobileStreamUiLockedFrom197V: true,
    unifiedMessengerGiftsExpected: true,
    economy: STREAM_GIFT_LEDGER_198A_ECONOMY,
    safety: STREAM_GIFT_LEDGER_198A_SAFETY,
    ledgerFlow: [
      "sender_purchase_or_coin_balance_verified_by_backend",
      "gift_send_intent_idempotency_checked",
      "gift_catalog_price_validated_server_side",
      "payment_or_coin_authorization_completed_by_provider_layer",
      "append_only_gift_ledger_event_created",
      "receiver_creator_earning_pending_created",
      "platform_fee_reserved",
      "risk_tax_compliance_settlement_gates_applied",
      "available_balance_released_backend_only",
    ],
    endpoints: [
      "GET /api/admin/stream/gifts/ledger/198a/readiness",
      "POST /api/stream/gifts/ledger/198a/quote",
      "POST /api/stream/gifts/ledger/198a/send-intent",
    ],
    blockedUntilLater: [
      "198B Prisma schema review for canonical gift catalog and gift ledger entities",
      "198C idempotency and append-only ledger persistence",
      "198D provider/payment authorization boundary",
      "198E realtime gift event emission to Stream and Messenger",
      "198F creator pending earnings settlement and Admin gates",
    ],
  };
}

export function createBlockedStreamGiftSendIntent198A(input: StreamGiftLedgerQuoteInput198A): StreamGiftLedgerBlockedSendIntent198A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_198A_VERSION,
    error: "stream_gift_send_runtime_safe_disabled",
    code: "provider_wallet_ledger_not_enabled",
    status: "blocked_without_mutation",
    quote: createStreamGiftLedgerQuote198A(input),
    requiredBeforeEnable: [
      "server-side catalog ownership",
      "verified sender funding source",
      "provider authorization or approved coin balance debit",
      "append-only DB ledger transaction",
      "receiver pending earnings write",
      "realtime event delivery after commit",
      "Admin risk/tax/compliance gates",
    ],
  };
}

export function assertStreamGiftLedger198ARemainsSafeDisabled(): void {
  const safety = STREAM_GIFT_LEDGER_198A_SAFETY;
  const unsafe = [
    safety.providerCallAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.walletMutationAllowedNow,
    safety.dbWriteAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_198A_UNSAFE_RUNTIME_FLAG");
  }
}
