export const STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198L" as const;

export type StreamGiftCatalogSeedRuntimeContext198L = "STREAM_LIVE" | "MESSENGER" | "SHORTS" | "CREATOR_PROFILE";

export type StreamGiftCatalogSeedItem198L = Readonly<{
  id: string;
  giftKey: string;
  title: string;
  titleRu: string;
  diamondPrice: number;
  assetId: string;
  assetPosterUrl: string;
  assetAnimationUrl: string;
  premiumTier: string;
  packKey: string;
  packLabel: string;
  catalogSegment: string;
  rarityLabel: string;
  active: boolean;
  runtimeContexts: readonly StreamGiftCatalogSeedRuntimeContext198L[];
  metadata: Readonly<Record<string, unknown>>;
}>;

export type StreamGiftCatalogSeedSafety198L = Readonly<{
  apiDbWriteAllowed: false;
  ownerLocalSeedRunnerMayWriteCatalogOnly: true;
  ledgerWriteAllowedFromSeed: false;
  sendIntentWriteAllowedFromSeed: false;
  walletMutationAllowed: false;
  providerCallAllowed: false;
  paymentCaptureAllowed: false;
  payoutAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretOutputAllowed: false;
}>;

export type StreamGiftCatalogSeedReadiness198L = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION;
  status: "canonical_catalog_seed_ready_owner_local_only";
  giftCount: 80;
  activeGiftCount: 80;
  priceRangeDiamonds: Readonly<{ min: number; max: number }>;
  contexts: readonly StreamGiftCatalogSeedRuntimeContext198L[];
  safety: StreamGiftCatalogSeedSafety198L;
  endpoints: readonly string[];
  localRunner: "tools/stream-gifts-ledger-198l-seed-catalog-and-quote-smoke.js";
  next: "198M_runtime_quote_smoke_and_send_guard_verification";
}>;

export type StreamGiftCatalogSeedNextRequest198L = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION;
  nextStage: "198M_runtime_quote_smoke_and_send_guard_verification";
  allowedAfterLocalSeed: readonly string[];
  stillForbidden: readonly string[];
}>;
