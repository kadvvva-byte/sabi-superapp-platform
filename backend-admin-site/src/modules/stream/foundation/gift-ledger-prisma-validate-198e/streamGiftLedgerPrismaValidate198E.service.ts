import { STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SCHEMA_PRESENCE } from "../gift-ledger-prisma-readiness-198d";
import type {
  StreamGiftLedgerPrismaGenerateApprovalRequest198E,
  StreamGiftLedgerPrismaValidateBoundary198E,
  StreamGiftLedgerPrismaValidateCommand198E,
  StreamGiftLedgerPrismaValidateReadiness198E,
  StreamGiftLedgerPrismaValidateRunbookStep198E,
  StreamGiftLedgerPrismaValidateSafety198E,
} from "./streamGiftLedgerPrismaValidate198E.types";

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198E" as const;

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_SAFETY: StreamGiftLedgerPrismaValidateSafety198E = Object.freeze({
  stage: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_VERSION,
  prismaValidateExecutionPreparedNow: true,
  prismaValidateExecutedByRuntimeNow: false,
  prismaGeneratePerformedNow: false,
  migrationCreatedNow: false,
  prismaMigratePerformedNow: false,
  prismaDbPushPerformedNow: false,
  dbReadPerformedNow: false,
  dbWritePerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretReadByRouteAllowed: false,
  rawSecretOutputAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_BOUNDARY: StreamGiftLedgerPrismaValidateBoundary198E = Object.freeze({
  currentStage: "prisma_validate_execution_only_prepared",
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198D",
  allowedNow: [
    "local_runner_prisma_validate_only",
    "validate_result_redacted_report",
    "readiness_route",
    "generate_approval_template_after_validate_passes",
  ] as const,
  forbiddenNow: [
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
  ] as const,
  nextStageRequiresSeparateOwnerApproval: true,
});

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_COMMAND: StreamGiftLedgerPrismaValidateCommand198E = Object.freeze({
  name: "prisma_validate_only",
  command: "node tools/stream-gifts-ledger-198e-prisma-validate-only.js",
  underlyingCommand: "npx prisma validate --schema prisma/schema.prisma",
  executeInApiRuntime: false,
  executeLocallyByOwner: true,
  createsMigration: false,
  runsGenerate: false,
  touchesDatabase: false,
  readsWallet: false,
  mutatesWallet: false,
  callsProvider: false,
  redactsOutput: true,
});

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_RUNBOOK: readonly StreamGiftLedgerPrismaValidateRunbookStep198E[] = Object.freeze([
  Object.freeze({
    order: 1,
    title: "Install 198E patch over 198D/198C.",
    expected: "Backend source has the 198C gift ledger Prisma models and the 198D readiness layer.",
    forbidden: ["editing .env", "printing secrets", "creating migrations"] as const,
  }),
  Object.freeze({
    order: 2,
    title: "Run TypeScript first.",
    command: "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
    expected: "TypeScript exits 0 before Prisma validation is attempted.",
    forbidden: ["prisma generate", "prisma migrate", "db push"] as const,
  }),
  Object.freeze({
    order: 3,
    title: "Run Prisma validate only through the local redacted runner.",
    command: "node tools/stream-gifts-ledger-198e-prisma-validate-only.js",
    expected: "Runner executes only `npx prisma validate --schema prisma/schema.prisma` and writes a redacted report.",
    forbidden: ["prisma generate", "prisma migrate", "prisma db push", "DB read/write", "Wallet mutation", "provider call"] as const,
  }),
]);

export const STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_REQUIRED_SCHEMA_MARKERS: readonly string[] = Object.freeze(
  STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SCHEMA_PRESENCE.map((check) => check.marker),
);

export function assertStreamGiftLedgerPrismaValidate198ERemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_SAFETY;
  const unsafe = [
    safety.prismaValidateExecutedByRuntimeNow,
    safety.prismaGeneratePerformedNow,
    safety.migrationCreatedNow,
    safety.prismaMigratePerformedNow,
    safety.prismaDbPushPerformedNow,
    safety.dbReadPerformedNow,
    safety.dbWritePerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretReadByRouteAllowed,
    safety.rawSecretOutputAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_UNSAFE_RUNTIME_FLAG");
  }

  const command = STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_COMMAND;
  if (command.executeInApiRuntime || command.runsGenerate || command.createsMigration || command.touchesDatabase || command.callsProvider) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_FORBIDDEN_COMMAND_SCOPE");
  }
}

export function getStreamGiftLedgerPrismaValidateReadiness198E(): StreamGiftLedgerPrismaValidateReadiness198E {
  assertStreamGiftLedgerPrismaValidate198ERemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_VERSION,
    status: "prisma_validate_execution_only_ready_for_local_owner_run",
    safety: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_SAFETY,
    boundary: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_BOUNDARY,
    validateCommand: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_COMMAND,
    runbook: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_RUNBOOK,
    requiredSchemaMarkers: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_REQUIRED_SCHEMA_MARKERS,
    resultReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198e-prisma-validate-only-report.json",
    nextStage: "198F_prisma_generate_planning_after_validate_passes",
  };
}

export function createStreamGiftLedgerPrismaGenerateApprovalRequest198E(): StreamGiftLedgerPrismaGenerateApprovalRequest198E {
  assertStreamGiftLedgerPrismaValidate198ERemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_VERSION,
    status: "blocked_until_validate_passes_and_next_exact_owner_approval",
    code: "prisma_generate_requires_validate_pass_and_separate_approval",
    requestedNextStage: "198F_prisma_generate_planning_after_validate_passes",
    safety: STREAM_GIFT_LEDGER_PRISMA_VALIDATE_198E_SAFETY,
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198F Prisma generate planning after 198E validate passes, no migration, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "198E does not run prisma generate.",
      "198E does not create a migration or touch the database.",
      "198E does not enable Wallet mutation, provider calls, payouts, fake gift send success, or fake available balance.",
      "198E API route does not execute shell commands; only the local owner runner performs prisma validate.",
    ],
  };
}
