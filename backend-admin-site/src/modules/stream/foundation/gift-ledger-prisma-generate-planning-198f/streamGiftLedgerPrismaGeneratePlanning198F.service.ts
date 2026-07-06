import type {
  StreamGiftLedgerPrismaGenerateCommandPlan198F,
  StreamGiftLedgerPrismaGenerateNextApprovalRequest198F,
  StreamGiftLedgerPrismaGeneratePlanningBoundary198F,
  StreamGiftLedgerPrismaGeneratePlanningReadiness198F,
  StreamGiftLedgerPrismaGeneratePlanningRunbookStep198F,
  StreamGiftLedgerPrismaGeneratePlanningSafety198F,
} from "./streamGiftLedgerPrismaGeneratePlanning198F.types";

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198F" as const;

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_SAFETY: StreamGiftLedgerPrismaGeneratePlanningSafety198F = Object.freeze({
  stage: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_VERSION,
  prismaValidatePassedReportedByOwner: true,
  prismaGeneratePlanningPreparedNow: true,
  prismaGenerateExecutedNow: false,
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

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_BOUNDARY: StreamGiftLedgerPrismaGeneratePlanningBoundary198F =
  Object.freeze({
    currentStage: "prisma_generate_planning_only_after_validate_pass",
    previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198E",
    validateReportRequiredBeforeGenerate: true,
    nextStageRequiresSeparateOwnerApproval: true,
    allowedNow: [
      "generate_scope_plan",
      "generate_runbook",
      "readiness_route",
      "next_approval_template_for_local_generate_runner",
    ] as const,
    forbiddenNow: [
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
    ] as const,
  });

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_COMMAND_PLAN: StreamGiftLedgerPrismaGenerateCommandPlan198F =
  Object.freeze({
    name: "prisma_generate_only_next_stage",
    plannedNextRunner: "node tools/stream-gifts-ledger-198g-prisma-generate-only.js",
    underlyingCommand: "npx prisma generate --schema prisma/schema.prisma",
    executeInApiRuntime: false,
    executeLocallyByOwnerOnly: true,
    executeNowIn198F: false,
    createsMigration: false,
    runsMigrate: false,
    runsDbPush: false,
    touchesDatabase: false,
    mutatesWallet: false,
    callsProvider: false,
    enablesGiftRuntime: false,
    redactsOutput: true,
  });

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_EXPECTED_CLIENT_MODELS: readonly string[] = Object.freeze([
  "StreamGiftCatalogItem",
  "StreamGiftSendIntent",
  "StreamGiftLedgerEntry",
  "StreamGiftCreatorEarning",
  "StreamGiftSettlementGate",
]);

export const STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_RUNBOOK: readonly StreamGiftLedgerPrismaGeneratePlanningRunbookStep198F[] =
  Object.freeze([
    Object.freeze({
      order: 1,
      title: "Confirm 198E Prisma validate has passed locally.",
      expected: "The owner has already reported no errors after the 198E validate-only runner.",
      forbidden: ["skipping validate", "printing .env", "creating migrations"] as const,
    }),
    Object.freeze({
      order: 2,
      title: "Install 198F planning patch and run TypeScript only.",
      command: "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      expected: "TypeScript exits 0 before any Prisma generate attempt is prepared.",
      forbidden: ["prisma generate", "prisma migrate", "prisma db push", "DB read/write"] as const,
    }),
    Object.freeze({
      order: 3,
      title: "Wait for 198G exact approval before generating Prisma client.",
      expected: "198F prepares the generate boundary and approval text only.",
      forbidden: ["runtime shell execution", "migration", "Wallet mutation", "provider call", "gift send runtime enable"] as const,
    }),
  ]);

export function assertStreamGiftLedgerPrismaGeneratePlanning198FRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_SAFETY;
  const unsafe = [
    safety.prismaGenerateExecutedNow,
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
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_UNSAFE_RUNTIME_FLAG");
  }

  const command = STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_COMMAND_PLAN;
  if (
    command.executeInApiRuntime ||
    command.executeNowIn198F ||
    command.createsMigration ||
    command.runsMigrate ||
    command.runsDbPush ||
    command.touchesDatabase ||
    command.mutatesWallet ||
    command.callsProvider ||
    command.enablesGiftRuntime
  ) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_FORBIDDEN_COMMAND_SCOPE");
  }
}

export function getStreamGiftLedgerPrismaGeneratePlanningReadiness198F(): StreamGiftLedgerPrismaGeneratePlanningReadiness198F {
  assertStreamGiftLedgerPrismaGeneratePlanning198FRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_VERSION,
    status: "prisma_generate_planning_ready_after_198e_validate_pass",
    safety: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_SAFETY,
    boundary: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_BOUNDARY,
    generatePlan: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_COMMAND_PLAN,
    runbook: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_RUNBOOK,
    validateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json",
    schemaModelsExpectedInGeneratedClient: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_EXPECTED_CLIENT_MODELS,
    nextStage: "198G_prisma_generate_execution_only_local_runner",
  };
}

export function createStreamGiftLedgerPrismaGenerateNextApprovalRequest198F(): StreamGiftLedgerPrismaGenerateNextApprovalRequest198F {
  assertStreamGiftLedgerPrismaGeneratePlanning198FRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_VERSION,
    status: "blocked_until_exact_owner_approval_for_198g_local_generate_runner",
    code: "prisma_generate_execution_requires_separate_198g_approval",
    requestedNextStage: "198G_prisma_generate_execution_only_local_runner",
    safety: STREAM_GIFT_LEDGER_PRISMA_GENERATE_PLANNING_198F_SAFETY,
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198G Prisma generate execution-only local runner after 198F planning and 198E validate passed, run only npx prisma generate --schema prisma/schema.prisma, no migration, no prisma db push, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no gift send runtime enable, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "198F does not run prisma generate.",
      "198F does not create migrations or touch the database.",
      "198F does not enable gift send runtime, Wallet mutation, provider calls, payouts, fake gift send success, or fake available balance.",
      "198F API routes do not execute shell commands; the future 198G runner must be local owner-run only.",
    ],
  };
}
