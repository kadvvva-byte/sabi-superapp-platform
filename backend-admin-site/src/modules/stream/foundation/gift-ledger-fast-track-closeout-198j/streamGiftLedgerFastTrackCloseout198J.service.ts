import type {
  StreamGiftLedgerFastTrackCloseoutBoundary198J,
  StreamGiftLedgerFastTrackCloseoutReadiness198J,
  StreamGiftLedgerFastTrackCloseoutSafety198J,
  StreamGiftLedgerFastTrackRunbook198J,
  StreamGiftLedgerRuntimeImplementationRequest198J,
} from "./streamGiftLedgerFastTrackCloseout198J.types";

export const STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198J" as const;

export const STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_SAFETY: StreamGiftLedgerFastTrackCloseoutSafety198J = Object.freeze({
  stage: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_VERSION,
  fastTrackCloseoutPreparedNow: true,
  apiExecutesShellCommandsNow: false,
  apiImportsPrismaClientNow: false,
  apiInstantiatesPrismaClientNow: false,
  apiConnectsToDatabaseNow: false,
  apiReadsDatabaseNow: false,
  apiWritesDatabaseNow: false,
  localMigrationRunnerPreparedNow: true,
  localMigrationRunnerRequiresExplicitOwnerFlag: true,
  localMigrationRunnerMayCreateMigrationFileWhenOwnerRuns: true,
  localMigrationRunnerMayWriteLocalDatabaseWhenOwnerRuns: true,
  localMigrationRunnerSkipsGenerate: true,
  runtimeGiftSendEnabledNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretOutputAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_BOUNDARY: StreamGiftLedgerFastTrackCloseoutBoundary198J = Object.freeze({
  currentStage: "fast_track_migration_closeout_runner_ready",
  previousStagesRequired: [
    "BACKEND-STREAM-GIFTS-LEDGER-198E_VALIDATE_OK",
    "BACKEND-STREAM-GIFTS-LEDGER-198G_GENERATE_OK",
    "BACKEND-STREAM-GIFTS-LEDGER-198I_CLIENT_SHAPE_OK",
  ] as const,
  migrationCommand: "node tools/stream-gifts-ledger-198j-prisma-migrate-dev-only.js --i-approve-local-db-migration",
  migrationReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198j-prisma-migrate-dev-only-report.json",
  migrationName: "stream_gifts_ledger_198c",
  prismaCommand: "npx prisma migrate dev --name stream_gifts_ledger_198c --schema prisma/schema.prisma --skip-generate",
  nextImplementationStage: "198K_db_backed_gift_ledger_repository_safe_disabled_runtime",
  allowedNow: [
    "owner_local_migration_runner",
    "migration_report_capture",
    "readiness_route",
    "fast_track_runbook_route",
    "next_runtime_implementation_request",
  ] as const,
  forbiddenByApiNow: [
    "api_shell_execution",
    "api_prisma_client_import",
    "api_prisma_client_instantiation",
    "api_db_connect",
    "api_db_read",
    "api_db_write",
    "wallet_mutation",
    "provider_call",
    "money_movement",
    "payout_execution",
    "gift_send_runtime_enable",
    "fake_gift_send_success",
    "fake_available_balance",
    "raw_secret_output",
    "raw_purchase_token_output",
  ] as const,
});

export const STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_RUNBOOK: StreamGiftLedgerFastTrackRunbook198J = Object.freeze({
  summary: "fast_track_to_real_db_backed_gift_ledger_without_fake_runtime",
  steps: [
    Object.freeze({
      order: 1,
      title: "Confirm current source compiles",
      command: "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      expected: "exit code 0",
      stopsIfFails: true,
    }),
    Object.freeze({
      order: 2,
      title: "Run controlled local Prisma migration only",
      command: "node tools/stream-gifts-ledger-198j-prisma-migrate-dev-only.js --i-approve-local-db-migration",
      expected: "report ok=true and migration file created by Prisma",
      stopsIfFails: true,
    }),
    Object.freeze({
      order: 3,
      title: "Confirm generated client still compiles after migration",
      command: "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json",
      expected: "exit code 0",
      stopsIfFails: true,
    }),
    Object.freeze({
      order: 4,
      title: "Proceed directly to DB-backed gift ledger source implementation",
      expected: "198K adds repository/service with runtime still provider-safe-disabled",
      stopsIfFails: false,
    }),
  ] as const,
  afterSuccess: [
    "send the 198J migrate report result",
    "continue directly to 198K repository/service source implementation",
    "keep provider/payment/Wallet/payout disabled until ledger idempotency and settlement gates are verified",
  ] as const,
});

export function assertStreamGiftLedgerFastTrackCloseout198JRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_SAFETY;
  const unsafeApiRuntime = [
    safety.apiExecutesShellCommandsNow,
    safety.apiImportsPrismaClientNow,
    safety.apiInstantiatesPrismaClientNow,
    safety.apiConnectsToDatabaseNow,
    safety.apiReadsDatabaseNow,
    safety.apiWritesDatabaseNow,
    safety.runtimeGiftSendEnabledNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretOutputAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafeApiRuntime) {
    throw new Error("STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_UNSAFE_API_RUNTIME_FLAG");
  }
}

export function getStreamGiftLedgerFastTrackCloseoutReadiness198J(): StreamGiftLedgerFastTrackCloseoutReadiness198J {
  assertStreamGiftLedgerFastTrackCloseout198JRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_VERSION,
    status: "fast_track_migration_closeout_runner_ready",
    safety: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_SAFETY,
    boundary: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_BOUNDARY,
    runbook: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_RUNBOOK,
  };
}

export function createStreamGiftLedgerRuntimeImplementationRequest198J(): StreamGiftLedgerRuntimeImplementationRequest198J {
  assertStreamGiftLedgerFastTrackCloseout198JRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FAST_TRACK_CLOSEOUT_198J_VERSION,
    status: "blocked_until_owner_runs_198j_local_migration_runner",
    code: "migration_report_required_before_db_backed_runtime",
    requiredEvidence: [
      "198E prisma validate report ok=true",
      "198G prisma generate report ok=true",
      "198I generated client usability report ok=true",
      "198J prisma migrate dev --skip-generate report ok=true",
      "node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json exits 0 after migration",
    ] as const,
    nextStage: "198K_db_backed_gift_ledger_repository_safe_disabled_runtime",
    willNotDoBeforeEvidence: [
      "enable gift send runtime",
      "enable Wallet mutation",
      "enable provider call",
      "enable payout",
      "show fake available balance",
      "fake successful gift send",
    ] as const,
  };
}
