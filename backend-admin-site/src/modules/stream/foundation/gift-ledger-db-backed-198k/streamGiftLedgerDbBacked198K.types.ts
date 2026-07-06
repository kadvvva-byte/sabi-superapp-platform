export const STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198K" as const;

export type StreamGiftLedgerContext198K = "stream_live" | "messenger" | "shorts" | "creator_profile";

export type StreamGiftLedgerPrismaRuntimeContext198K = "STREAM_LIVE" | "MESSENGER" | "SHORTS" | "CREATOR_PROFILE";

export type StreamGiftLedgerDbBackedSafety198K = Readonly<{
  dbReadAllowedNow: true;
  dbWriteAllowedWithVerifiedAuthorizationOnly: true;
  defaultRouteWriteEnabled: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  paymentCaptureAllowedNow: false;
  payoutAllowedNow: false;
  realtimeEmitAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawProviderTokenAccepted: false;
}>;

export type StreamGiftLedgerDbBackedEconomy198K = Readonly<{
  diamondUnit: "diamond_micros";
  giftPriceMinDiamonds: 1;
  giftPriceMaxDiamonds: 10000;
  receiverShareBps: 7000;
  platformComplianceFeeBps: 3000;
  basisPointsDenominator: 10000;
  diamondMicrosPerDiamond: "1000000";
}>;

export type StreamGiftLedgerDbBackedInput198K = Readonly<{
  context: StreamGiftLedgerContext198K;
  senderUserId: string;
  receiverUserId: string;
  giftCatalogItemId?: string;
  giftKey?: string;
  roomId?: string;
  conversationId?: string;
  quantity: number;
  idempotencyKey: string;
  providerReferenceHash?: string;
}>;

export type StreamGiftLedgerCatalogSnapshot198K = Readonly<{
  id: string;
  giftKey: string;
  title: string;
  diamondPrice: number;
  active: boolean;
  premiumTier: string;
  assetId?: string;
  assetPosterUrl?: string;
  assetAnimationUrl?: string;
}>;

export type StreamGiftLedgerDbQuote198K = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION;
  mode: "db_catalog_quote";
  context: StreamGiftLedgerContext198K;
  runtimeContext: StreamGiftLedgerPrismaRuntimeContext198K;
  catalogItem: StreamGiftLedgerCatalogSnapshot198K;
  quantity: number;
  grossDiamondMicros: string;
  receiverPendingDiamondMicros: string;
  platformFeeDiamondMicros: string;
  receiverShareBps: 7000;
  platformComplianceFeeBps: 3000;
  availableBalancePolicy: "available_balance_backend_only_after_settlement";
}>;

export type StreamGiftLedgerDbCommit198K = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION;
  mode: "db_ledger_committed_after_external_authorization";
  sendIntentId: string;
  status: "LEDGER_COMMITTED";
  idempotencyKeyHash: string;
  providerReferenceHash: string;
  ledgerEntryIds: readonly string[];
  creatorEarningId: string;
  settlementGateIds: readonly string[];
  quote: StreamGiftLedgerDbQuote198K;
  notes: readonly string[];
}>;

export type StreamGiftLedgerBlockedDbCommit198K = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION;
  status: "blocked_without_mutation";
  code: "provider_authorization_required" | "db_write_feature_flag_disabled" | "catalog_not_ready";
  quote?: StreamGiftLedgerDbQuote198K;
  requiredBeforeCommit: readonly string[];
}>;

export type StreamGiftLedgerDbBackedReadiness198K = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION;
  status: "db_backed_service_ready_provider_wallet_still_guarded";
  safety: StreamGiftLedgerDbBackedSafety198K;
  economy: StreamGiftLedgerDbBackedEconomy198K;
  endpoints: readonly string[];
  dbModelsRequired: readonly string[];
  enabledOnlyWhen: readonly string[];
  next: "198L_seed_canonical_gift_catalog_and_runtime_smoke";
}>;
