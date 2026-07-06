import {
  STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION,
  type StreamGiftCatalogSeedNextRequest198L,
  type StreamGiftCatalogSeedReadiness198L,
  type StreamGiftCatalogSeedSafety198L,
} from "./streamGiftLedgerCatalogSeed198L.types";
import { streamGiftLedgerCanonicalCatalog198L, streamGiftLedgerCanonicalCatalogSummary198L } from "./streamGiftLedgerCanonicalCatalog198L";

export const STREAM_GIFT_LEDGER_CATALOG_SEED_198L_SAFETY: StreamGiftCatalogSeedSafety198L = Object.freeze({
  apiDbWriteAllowed: false,
  ownerLocalSeedRunnerMayWriteCatalogOnly: true,
  ledgerWriteAllowedFromSeed: false,
  sendIntentWriteAllowedFromSeed: false,
  walletMutationAllowed: false,
  providerCallAllowed: false,
  paymentCaptureAllowed: false,
  payoutAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretOutputAllowed: false,
});

export function getStreamGiftLedgerCatalogSeedReadiness198L(): StreamGiftCatalogSeedReadiness198L {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION,
    status: "canonical_catalog_seed_ready_owner_local_only",
    giftCount: 80,
    activeGiftCount: 80,
    priceRangeDiamonds: {
      min: streamGiftLedgerCanonicalCatalogSummary198L.minDiamondPrice,
      max: streamGiftLedgerCanonicalCatalogSummary198L.maxDiamondPrice,
    },
    contexts: streamGiftLedgerCanonicalCatalogSummary198L.runtimeContexts,
    safety: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_SAFETY,
    endpoints: [
      "GET /api/admin/stream/gifts/ledger/198l/readiness",
      "GET /api/admin/stream/gifts/ledger/198l/catalog-preview",
      "GET /api/admin/stream/gifts/ledger/198l/runbook",
      "POST /api/admin/stream/gifts/ledger/198l/next-runtime-smoke-request",
    ],
    localRunner: "tools/stream-gifts-ledger-198l-seed-catalog-and-quote-smoke.js",
    next: "198M_runtime_quote_smoke_and_send_guard_verification",
  };
}

export function getStreamGiftLedgerCatalogPreview198L(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION,
    summary: streamGiftLedgerCanonicalCatalogSummary198L,
    catalog: streamGiftLedgerCanonicalCatalog198L,
    note: "API preview only; it does not seed DB. Run owner-local tool with explicit approval flag to write catalog rows.",
  };
}

export function getStreamGiftLedgerCatalogSeedRunbook198L(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION,
    commands: [
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      "node .\tools\stream-gifts-ledger-198l-seed-catalog-and-quote-smoke.js --i-approve-catalog-seed",
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
    ],
    writesAllowedByRunnerOnly: ["StreamGiftCatalogItem upsert for 80 canonical active gifts"],
    notAllowed: [
      "StreamGiftSendIntent write",
      "StreamGiftLedgerEntry write",
      "StreamGiftCreatorEarning write",
      "StreamGiftSettlementGate write",
      "Wallet mutation",
      "provider call",
      "payment capture",
      "payout",
      "fake gift success",
      "fake available balance",
    ],
  };
}

export function createStreamGiftLedgerCatalogSeedNextRuntimeSmokeRequest198L(): StreamGiftCatalogSeedNextRequest198L {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION,
    nextStage: "198M_runtime_quote_smoke_and_send_guard_verification",
    allowedAfterLocalSeed: [
      "runtime quote smoke against seeded catalog",
      "send-intent guard verification expects 423 without provider authorization",
      "admin readiness smoke",
    ],
    stillForbidden: [
      "provider payment call",
      "Wallet mutation",
      "real send success without verified provider authorization",
      "available balance unlock",
      "payout execution",
      "fake success response",
    ],
  };
}

export function assertStreamGiftLedgerCatalogSeed198LRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_CATALOG_SEED_198L_SAFETY;
  const unsafe = [
    safety.apiDbWriteAllowed,
    safety.ledgerWriteAllowedFromSeed,
    safety.sendIntentWriteAllowedFromSeed,
    safety.walletMutationAllowed,
    safety.providerCallAllowed,
    safety.paymentCaptureAllowed,
    safety.payoutAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretOutputAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_CATALOG_SEED_198L_UNSAFE_FLAG");
}
