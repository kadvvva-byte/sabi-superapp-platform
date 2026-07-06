import type {
  StreamGiftLedgerPrismaGenerateBoundary198G,
  StreamGiftLedgerPrismaGenerateCommand198G,
  StreamGiftLedgerPrismaGenerateNextApprovalRequest198G,
  StreamGiftLedgerPrismaGenerateReadiness198G,
  StreamGiftLedgerPrismaGenerateRunbookStep198G,
  StreamGiftLedgerPrismaGenerateSafety198G,
} from "./streamGiftLedgerPrismaGenerate198G.types";

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198G" as const;

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_SAFETY: StreamGiftLedgerPrismaGenerateSafety198G = Object.freeze({
  stage: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_VERSION,
  prismaValidatePassedReportedByOwner: true,
  prismaGenerateLocalRunnerPreparedNow: true,
  prismaGenerateExecutedByApiNow: false,
  migrationCreatedNow: false,
  prismaMigratePerformedNow: false,
  prismaDbPushPerformedNow: false,
  dbReadPerformedNow: false,
  dbWritePerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  giftSendRuntimeEnabledNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretReadByRouteAllowed: false,
  rawSecretOutputAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_BOUNDARY: StreamGiftLedgerPrismaGenerateBoundary198G = Object.freeze({
  currentStage: "prisma_generate_execution_only_local_runner_prepared",
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198F",
  validateStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198E",
  ownerRunsLocallyOnly: true,
  apiExecutesShellCommands: false,
  nextStageRequiresGeneratePassReport: true,
  nextStageRequiresSeparateOwnerApproval: true,
  allowedNow: [
    "local_generate_runner_source",
    "readiness_route",
    "runbook_route",
    "next_approval_template_after_generate_pass",
  ] as const,
  forbiddenNow: [
    "api_shell_execution",
    "prisma_migrate_dev",
    "prisma_db_push",
    "migration_file_create",
    "db_read",
    "db_write",
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

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_COMMAND: StreamGiftLedgerPrismaGenerateCommand198G = Object.freeze({
  name: "prisma_generate_only_local_owner_runner",
  runner: "node tools/stream-gifts-ledger-198g-prisma-generate-only.js",
  underlyingCommand: "npx prisma generate --schema prisma/schema.prisma",
  executesPrismaGenerate: true,
  executeInApiRuntime: false,
  executeLocallyByOwnerOnly: true,
  createsMigration: false,
  runsMigrate: false,
  runsDbPush: false,
  dbReadWriteExpected: false,
  mutatesWallet: false,
  callsProvider: false,
  enablesGiftRuntime: false,
  redactsOutput: true,
  writesReport: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json",
});

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_EXPECTED_CLIENT_MODELS: readonly string[] = Object.freeze([
  "StreamGiftCatalogItem",
  "StreamGiftSendIntent",
  "StreamGiftLedgerEntry",
  "StreamGiftCreatorEarning",
  "StreamGiftSettlementGate",
]);

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_RUNBOOK: readonly StreamGiftLedgerPrismaGenerateRunbookStep198G[] = Object.freeze([
  Object.freeze({
    order: 1,
    title: "Install 198G patch and run TypeScript before generate.",
    command: "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    expected: "TypeScript exits 0 before local Prisma client generation.",
    forbidden: ["prisma migrate", "prisma db push", "DB write", "Wallet mutation", "provider call"] as const,
  }),
  Object.freeze({
    order: 2,
    title: "Run only the 198G Prisma generate local runner from project root.",
    command: "node .\\tools\\stream-gifts-ledger-198g-prisma-generate-only.js",
    expected: "Runner executes only npx prisma generate --schema prisma/schema.prisma and writes a redacted report.",
    forbidden: ["migration", "db push", "runtime route shell execution", "raw secret output"] as const,
  }),
  Object.freeze({
    order: 3,
    title: "Run TypeScript again after generated Prisma client is refreshed.",
    command: "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    expected: "Backend compiles with generated Prisma client artifacts updated.",
    forbidden: ["gift send runtime enable", "fake available balance", "money movement"] as const,
  }),
]);

export function assertStreamGiftLedgerPrismaGenerate198GRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_SAFETY;
  const unsafe = [
    safety.prismaGenerateExecutedByApiNow,
    safety.migrationCreatedNow,
    safety.prismaMigratePerformedNow,
    safety.prismaDbPushPerformedNow,
    safety.dbReadPerformedNow,
    safety.dbWritePerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.giftSendRuntimeEnabledNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretReadByRouteAllowed,
    safety.rawSecretOutputAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_UNSAFE_RUNTIME_FLAG");
  }

  const boundary = STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_BOUNDARY;
  const command = STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_COMMAND;
  if (
    boundary.apiExecutesShellCommands ||
    !boundary.ownerRunsLocallyOnly ||
    command.executeInApiRuntime ||
    !command.executeLocallyByOwnerOnly ||
    command.createsMigration ||
    command.runsMigrate ||
    command.runsDbPush ||
    command.dbReadWriteExpected ||
    command.mutatesWallet ||
    command.callsProvider ||
    command.enablesGiftRuntime
  ) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_FORBIDDEN_COMMAND_SCOPE");
  }
}

export function getStreamGiftLedgerPrismaGenerateReadiness198G(): StreamGiftLedgerPrismaGenerateReadiness198G {
  assertStreamGiftLedgerPrismaGenerate198GRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_VERSION,
    status: "prisma_generate_execution_only_local_runner_ready",
    safety: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_SAFETY,
    boundary: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_BOUNDARY,
    command: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_COMMAND,
    runbook: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_RUNBOOK,
    expectedGeneratedClientModels: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_EXPECTED_CLIENT_MODELS,
    validateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json",
    generateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json",
    nextStage: "198H_generated_prisma_client_usability_check_planning",
  };
}

export function createStreamGiftLedgerPrismaGenerateNextApprovalRequest198G(): StreamGiftLedgerPrismaGenerateNextApprovalRequest198G {
  assertStreamGiftLedgerPrismaGenerate198GRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_VERSION,
    status: "blocked_until_generate_pass_report_for_198h",
    code: "generated_client_usability_check_requires_198g_generate_pass",
    requestedNextStage: "198H_generated_prisma_client_usability_check_planning",
    safety: STREAM_GIFT_LEDGER_PRISMA_GENERATE_198G_SAFETY,
    requiredEvidence: [
      ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true",
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json exits 0 after generate",
    ],
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198H generated Prisma client usability check planning after 198G generate-only runner passed, read generated client shape only, no migration, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no gift send runtime enable, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "198G API routes do not execute prisma generate or any shell command.",
      "198G local runner does not run migrate or db push and does not create migration files.",
      "198G does not enable gift send runtime, Wallet mutation, provider calls, payouts, fake gift send success, or fake available balance.",
      "198H must be a separate planning/check stage after local generate passes.",
    ],
  };
}
