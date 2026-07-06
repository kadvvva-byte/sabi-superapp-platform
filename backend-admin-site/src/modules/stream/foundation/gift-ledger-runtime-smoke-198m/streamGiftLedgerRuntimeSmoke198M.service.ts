import {
  STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION,
  type StreamGiftLedgerRuntimeSmokeNextRequest198M,
  type StreamGiftLedgerRuntimeSmokeReadiness198M,
  type StreamGiftLedgerRuntimeSmokeSafety198M,
} from "./streamGiftLedgerRuntimeSmoke198M.types";

export const STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_SAFETY: StreamGiftLedgerRuntimeSmokeSafety198M = Object.freeze({
  apiDbWriteAllowed: false,
  localRunnerDbReadAllowed: true,
  localRunnerSendIntentWriteAllowed: false,
  localRunnerLedgerWriteAllowed: false,
  localRunnerProviderCallAllowed: false,
  walletMutationAllowed: false,
  paymentCaptureAllowed: false,
  payoutAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretOutputAllowed: false,
});

export function getStreamGiftLedgerRuntimeSmokeReadiness198M(): StreamGiftLedgerRuntimeSmokeReadiness198M {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION,
    status: "runtime_quote_smoke_ready_send_guard_expected_423",
    safety: STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_SAFETY,
    expectedSeededCatalogCount: 80,
    expectedQuoteMath: { unit: "diamond_micros", receiverShareBps: 7000, platformFeeBps: 3000 },
    endpoints: [
      "GET /api/admin/stream/gifts/ledger/198m/readiness",
      "GET /api/admin/stream/gifts/ledger/198m/runbook",
      "POST /api/admin/stream/gifts/ledger/198m/next-runtime-contract-request",
    ],
    localRunner: "tools/stream-gifts-ledger-198m-runtime-quote-send-guard-smoke.js",
    next: "198N_db_backed_send_intent_provider_authorization_contract",
  };
}

export function getStreamGiftLedgerRuntimeSmokeRunbook198M(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION,
    purpose: "Verify seeded DB catalog quote math and verify send guard remains blocked without provider authorization.",
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-198m-runtime-quote-send-guard-smoke.js --i-approve-runtime-quote-smoke",
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    ],
    expectedResults: {
      catalogCount: 80,
      quoteSmoke: "pass",
      sendGuard: "blocked_without_mutation_provider_authorization_required",
      fakeGiftSendSuccess: false,
      fakeAvailableBalance: false,
    },
    writesForbidden: [
      "StreamGiftSendIntent",
      "StreamGiftLedgerEntry",
      "StreamGiftCreatorEarning",
      "StreamGiftSettlementGate",
      "Wallet mutation",
      "provider call",
      "payment capture",
      "payout",
      "fake available balance",
    ],
  };
}

export function createStreamGiftLedgerRuntimeContractRequest198M(): StreamGiftLedgerRuntimeSmokeNextRequest198M {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION,
    nextStage: "198N_db_backed_send_intent_provider_authorization_contract",
    allowedAfterSmokePass: [
      "provider authorization reference contract",
      "server-side hash-only provider reference intake",
      "send-intent commit remains guarded by local env flags",
      "ledger event response contract for mobile Stream and Messenger",
    ],
    stillForbidden: [
      "raw provider token intake",
      "provider payment call",
      "Wallet mutation",
      "send success without verified provider authorization",
      "available balance unlock before settlement gates",
      "payout execution",
      "fake success response",
    ],
  };
}

export function assertStreamGiftLedgerRuntimeSmoke198MRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_SAFETY;
  const unsafe = [
    safety.apiDbWriteAllowed,
    safety.localRunnerSendIntentWriteAllowed,
    safety.localRunnerLedgerWriteAllowed,
    safety.localRunnerProviderCallAllowed,
    safety.walletMutationAllowed,
    safety.paymentCaptureAllowed,
    safety.payoutAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretOutputAllowed,
  ].some(Boolean);
  if (unsafe) throw new Error("STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_UNSAFE_FLAG");
}
