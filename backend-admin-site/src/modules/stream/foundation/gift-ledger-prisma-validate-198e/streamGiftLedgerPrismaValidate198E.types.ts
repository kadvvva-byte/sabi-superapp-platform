export type StreamGiftLedgerPrismaValidateSafety198E = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198E";
  prismaValidateExecutionPreparedNow: true;
  prismaValidateExecutedByRuntimeNow: false;
  prismaGeneratePerformedNow: false;
  migrationCreatedNow: false;
  prismaMigratePerformedNow: false;
  prismaDbPushPerformedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretReadByRouteAllowed: false;
  rawSecretOutputAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerPrismaValidateBoundary198E = Readonly<{
  currentStage: "prisma_validate_execution_only_prepared";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198D";
  allowedNow: readonly [
    "local_runner_prisma_validate_only",
    "validate_result_redacted_report",
    "readiness_route",
    "generate_approval_template_after_validate_passes",
  ];
  forbiddenNow: readonly [
    "runtime_route_executes_prisma_validate",
    "prisma_generate_execution",
    "migration_file_create",
    "prisma_migrate_dev",
    "prisma_db_push",
    "db_read",
    "db_write",
    "wallet_mutation",
    "provider_call",
    "money_movement",
    "payout_execution",
    "raw_secret_output",
    "raw_purchase_token_output",
  ];
  nextStageRequiresSeparateOwnerApproval: true;
}>;

export type StreamGiftLedgerPrismaValidateCommand198E = Readonly<{
  name: "prisma_validate_only";
  command: "node tools/stream-gifts-ledger-198e-prisma-validate-only.js";
  underlyingCommand: "npx prisma validate --schema prisma/schema.prisma";
  executeInApiRuntime: false;
  executeLocallyByOwner: true;
  createsMigration: false;
  runsGenerate: false;
  touchesDatabase: false;
  readsWallet: false;
  mutatesWallet: false;
  callsProvider: false;
  redactsOutput: true;
}>;

export type StreamGiftLedgerPrismaValidateRunbookStep198E = Readonly<{
  order: number;
  title: string;
  command?: string;
  expected: string;
  forbidden: readonly string[];
}>;

export type StreamGiftLedgerPrismaValidateReadiness198E = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198E";
  status: "prisma_validate_execution_only_ready_for_local_owner_run";
  safety: StreamGiftLedgerPrismaValidateSafety198E;
  boundary: StreamGiftLedgerPrismaValidateBoundary198E;
  validateCommand: StreamGiftLedgerPrismaValidateCommand198E;
  runbook: readonly StreamGiftLedgerPrismaValidateRunbookStep198E[];
  requiredSchemaMarkers: readonly string[];
  resultReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json";
  nextStage: "198F_prisma_generate_planning_after_validate_passes";
}>;

export type StreamGiftLedgerPrismaGenerateApprovalRequest198E = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198E";
  status: "blocked_until_validate_passes_and_next_exact_owner_approval";
  code: "prisma_generate_requires_validate_pass_and_separate_approval";
  requestedNextStage: "198F_prisma_generate_planning_after_validate_passes";
  safety: StreamGiftLedgerPrismaValidateSafety198E;
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
