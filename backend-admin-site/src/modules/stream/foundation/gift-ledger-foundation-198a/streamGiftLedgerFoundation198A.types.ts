export type StreamGiftLedgerContext198A = "stream_live" | "messenger" | "shorts" | "creator_profile";

export type StreamGiftLedgerSettlementState198A =
  | "quote_only"
  | "send_intent_blocked_until_provider"
  | "ledger_pending_after_backend_event"
  | "held_for_review"
  | "available_after_settlement_backend_only";

export type StreamGiftLedgerSafety198A = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198A";
  sourceOnly: true;
  providerCallAllowedNow: false;
  paymentCaptureAllowedNow: false;
  walletMutationAllowedNow: false;
  dbWriteAllowedNow: false;
  moneyMovementAllowedNow: false;
  payoutAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerEconomy198A = Readonly<{
  currency: "USD";
  diamondUnit: "diamond_micros";
  giftPriceMinDiamonds: 1;
  giftPriceMaxDiamonds: 10000;
  diamondsPerCoin: 100;
  usdCentsPerCoin: 100;
  usdCentsPerDiamond: 1;
  minimumTopUpCoins: 10;
  minimumTopUpUsdCents: 1000;
  receiverShareBps: 7000;
  platformComplianceFeeBps: 3000;
  basisPointsDenominator: 10000;
  catalogExpectedGiftCount: 80;
}>;

export type StreamGiftLedgerQuoteInput198A = Readonly<{
  context: StreamGiftLedgerContext198A;
  senderUserId?: string;
  receiverUserId?: string;
  roomId?: string;
  conversationId?: string;
  giftId: string;
  giftTitle?: string;
  diamondPrice: number;
  quantity?: number;
  idempotencyKey?: string;
}>;

export type StreamGiftLedgerQuote198A = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198A";
  context: StreamGiftLedgerContext198A;
  giftId: string;
  giftTitle?: string;
  quantity: number;
  unitDiamondPrice: number;
  grossDiamonds: number;
  grossDiamondMicros: string;
  grossUsdCents: string;
  receiverPendingDiamondMicros: string;
  receiverPendingUsdMicroCents: string;
  platformFeeDiamondMicros: string;
  platformFeeUsdMicroCents: string;
  receiverShareBps: 7000;
  platformComplianceFeeBps: 3000;
  settlementState: StreamGiftLedgerSettlementState198A;
  requiredLedgerEvent: "backend_verified_gift_send_event";
  availableBalancePolicy: "available_balance_backend_only_after_settlement";
  safety: StreamGiftLedgerSafety198A;
  notes: readonly string[];
}>;

export type StreamGiftLedgerReadiness198A = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198A";
  status: "source_only_safe_disabled_contract_ready";
  mobileStreamUiLockedFrom197V: true;
  unifiedMessengerGiftsExpected: true;
  economy: StreamGiftLedgerEconomy198A;
  safety: StreamGiftLedgerSafety198A;
  ledgerFlow: readonly [
    "sender_purchase_or_coin_balance_verified_by_backend",
    "gift_send_intent_idempotency_checked",
    "gift_catalog_price_validated_server_side",
    "payment_or_coin_authorization_completed_by_provider_layer",
    "append_only_gift_ledger_event_created",
    "receiver_creator_earning_pending_created",
    "platform_fee_reserved",
    "risk_tax_compliance_settlement_gates_applied",
    "available_balance_released_backend_only",
  ];
  endpoints: readonly string[];
  blockedUntilLater: readonly string[];
}>;

export type StreamGiftLedgerBlockedSendIntent198A = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198A";
  error: "stream_gift_send_runtime_safe_disabled";
  code: "provider_wallet_ledger_not_enabled";
  status: "blocked_without_mutation";
  quote: StreamGiftLedgerQuote198A;
  requiredBeforeEnable: readonly string[];
}>;
