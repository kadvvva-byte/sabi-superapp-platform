export type StreamGiftLedgerPrismaGeneratePlanningSafety198F = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198F";
  prismaValidatePassedReportedByOwner: true;
  prismaGeneratePlanningPreparedNow: true;
  prismaGenerateExecutedNow: false;
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

export type StreamGiftLedgerPrismaGeneratePlanningBoundary198F = Readonly<{
  currentStage: "prisma_generate_planning_only_after_validate_pass";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198E";
  validateReportRequiredBeforeGenerate: true;
  nextStageRequiresSeparateOwnerApproval: true;
  allowedNow: readonly [
    "generate_scope_plan",
    "generate_runbook",
    "readiness_route",
    "next_approval_template_for_local_generate_runner",
  ];
  forbiddenNow: readonly [
    "runtime_route_executes_prisma_generate",
    "prisma_generate_execution_now",
    "migration_file_create",
    "prisma_migrate_dev",
    "prisma_db_push",
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

export type StreamGiftLedgerPrismaGenerateCommandPlan198F = Readonly<{
  name: "prisma_generate_only_next_stage";
  plannedNextRunner: "node tools/stream-gifts-ledger-198g-prisma-generate-only.js";
  underlyingCommand: "npx prisma generate --schema prisma/schema.prisma";
  executeInApiRuntime: false;
  executeLocallyByOwnerOnly: true;
  executeNowIn198F: false;
  createsMigration: false;
  runsMigrate: false;
  runsDbPush: false;
  touchesDatabase: false;
  mutatesWallet: false;
  callsProvider: false;
  enablesGiftRuntime: false;
  redactsOutput: true;
}>;

export type StreamGiftLedgerPrismaGeneratePlanningRunbookStep198F = Readonly<{
  order: number;
  title: string;
  command?: string;
  expected: string;
  forbidden: readonly string[];
}>;

export type StreamGiftLedgerPrismaGeneratePlanningReadiness198F = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198F";
  status: "prisma_generate_planning_ready_after_198e_validate_pass";
  safety: StreamGiftLedgerPrismaGeneratePlanningSafety198F;
  boundary: StreamGiftLedgerPrismaGeneratePlanningBoundary198F;
  generatePlan: StreamGiftLedgerPrismaGenerateCommandPlan198F;
  runbook: readonly StreamGiftLedgerPrismaGeneratePlanningRunbookStep198F[];
  validateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json";
  schemaModelsExpectedInGeneratedClient: readonly string[];
  nextStage: "198G_prisma_generate_execution_only_local_runner";
}>;

export type StreamGiftLedgerPrismaGenerateNextApprovalRequest198F = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198F";
  status: "blocked_until_exact_owner_approval_for_198g_local_generate_runner";
  code: "prisma_generate_execution_requires_separate_198g_approval";
  requestedNextStage: "198G_prisma_generate_execution_only_local_runner";
  safety: StreamGiftLedgerPrismaGeneratePlanningSafety198F;
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
