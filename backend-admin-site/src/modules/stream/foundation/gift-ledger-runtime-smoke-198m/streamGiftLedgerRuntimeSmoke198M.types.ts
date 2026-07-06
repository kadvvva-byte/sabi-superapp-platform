export const STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198M" as const;

export type StreamGiftLedgerRuntimeSmokeSafety198M = Readonly<{
  apiDbWriteAllowed: false;
  localRunnerDbReadAllowed: true;
  localRunnerSendIntentWriteAllowed: false;
  localRunnerLedgerWriteAllowed: false;
  localRunnerProviderCallAllowed: false;
  walletMutationAllowed: false;
  paymentCaptureAllowed: false;
  payoutAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretOutputAllowed: false;
}>;

export type StreamGiftLedgerRuntimeSmokeReadiness198M = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION;
  status: "runtime_quote_smoke_ready_send_guard_expected_423";
  safety: StreamGiftLedgerRuntimeSmokeSafety198M;
  expectedSeededCatalogCount: 80;
  expectedQuoteMath: Readonly<{
    unit: "diamond_micros";
    receiverShareBps: 7000;
    platformFeeBps: 3000;
  }>;
  endpoints: readonly string[];
  localRunner: "tools/stream-gifts-ledger-198m-runtime-quote-send-guard-smoke.js";
  next: "198N_db_backed_send_intent_provider_authorization_contract";
}>;

export type StreamGiftLedgerRuntimeSmokeNextRequest198M = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION;
  nextStage: "198N_db_backed_send_intent_provider_authorization_contract";
  allowedAfterSmokePass: readonly string[];
  stillForbidden: readonly string[];
}>;
