export type StreamGiftLedgerPrismaGenerateSafety198G = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198G";
  prismaValidatePassedReportedByOwner: true;
  prismaGenerateLocalRunnerPreparedNow: true;
  prismaGenerateExecutedByApiNow: false;
  migrationCreatedNow: false;
  prismaMigratePerformedNow: false;
  prismaDbPushPerformedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  payoutExecutionAllowedNow: false;
  giftSendRuntimeEnabledNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretReadByRouteAllowed: false;
  rawSecretOutputAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerPrismaGenerateBoundary198G = Readonly<{
  currentStage: "prisma_generate_execution_only_local_runner_prepared";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198F";
  validateStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198E";
  ownerRunsLocallyOnly: true;
  apiExecutesShellCommands: false;
  nextStageRequiresGeneratePassReport: true;
  nextStageRequiresSeparateOwnerApproval: true;
  allowedNow: readonly [
    "local_generate_runner_source",
    "readiness_route",
    "runbook_route",
    "next_approval_template_after_generate_pass",
  ];
  forbiddenNow: readonly [
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
  ];
}>;

export type StreamGiftLedgerPrismaGenerateCommand198G = Readonly<{
  name: "prisma_generate_only_local_owner_runner";
  runner: "node tools/stream-gifts-ledger-198g-prisma-generate-only.js";
  underlyingCommand: "npx prisma generate --schema prisma/schema.prisma";
  executesPrismaGenerate: true;
  executeInApiRuntime: false;
  executeLocallyByOwnerOnly: true;
  createsMigration: false;
  runsMigrate: false;
  runsDbPush: false;
  dbReadWriteExpected: false;
  mutatesWallet: false;
  callsProvider: false;
  enablesGiftRuntime: false;
  redactsOutput: true;
  writesReport: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json";
}>;

export type StreamGiftLedgerPrismaGenerateRunbookStep198G = Readonly<{
  order: number;
  title: string;
  command?: string;
  expected: string;
  forbidden: readonly string[];
}>;

export type StreamGiftLedgerPrismaGenerateReadiness198G = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198G";
  status: "prisma_generate_execution_only_local_runner_ready";
  safety: StreamGiftLedgerPrismaGenerateSafety198G;
  boundary: StreamGiftLedgerPrismaGenerateBoundary198G;
  command: StreamGiftLedgerPrismaGenerateCommand198G;
  runbook: readonly StreamGiftLedgerPrismaGenerateRunbookStep198G[];
  expectedGeneratedClientModels: readonly string[];
  validateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json";
  generateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json";
  nextStage: "198H_generated_prisma_client_usability_check_planning";
}>;

export type StreamGiftLedgerPrismaGenerateNextApprovalRequest198G = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198G";
  status: "blocked_until_generate_pass_report_for_198h";
  code: "generated_client_usability_check_requires_198g_generate_pass";
  requestedNextStage: "198H_generated_prisma_client_usability_check_planning";
  safety: StreamGiftLedgerPrismaGenerateSafety198G;
  requiredEvidence: readonly [
    ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true",
    "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json exits 0 after generate",
  ];
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
