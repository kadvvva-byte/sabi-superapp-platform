import { STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MARKERS } from "../gift-ledger-schema-write-198c";
import type {
  StreamGiftLedgerPrismaCommandPlan198D,
  StreamGiftLedgerPrismaReadiness198D,
  StreamGiftLedgerPrismaReadinessApprovalRequest198D,
  StreamGiftLedgerPrismaReadinessBoundary198D,
  StreamGiftLedgerPrismaReadinessSafety198D,
  StreamGiftLedgerSchemaPresenceCheck198D,
} from "./streamGiftLedgerPrismaReadiness198D.types";

export const STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198D" as const;

export const STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SAFETY: StreamGiftLedgerPrismaReadinessSafety198D = Object.freeze({
  stage: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_VERSION,
  prismaSchemaSourceWritePerformedNow: false,
  prismaSchemaValidatePlannedNow: true,
  prismaSchemaValidatePerformedNow: false,
  prismaGeneratePlannedNow: true,
  prismaGeneratePerformedNow: false,
  migrationCreatedNow: false,
  dbReadPerformedNow: false,
  dbWritePerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretReadAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_BOUNDARY: StreamGiftLedgerPrismaReadinessBoundary198D = Object.freeze({
  currentStage: "prisma_validate_generate_planning_only",
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198C",
  allowedNow: [
    "schema_presence_static_check",
    "prisma_validate_command_planning",
    "prisma_generate_command_planning",
    "readiness_route",
    "approval_request_template",
  ] as const,
  forbiddenNow: [
    "prisma_validate_execution",
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
    "raw_secret_read",
    "raw_purchase_token_output",
  ] as const,
  nextStageRequiresSeparateOwnerApproval: true,
});

export const STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SCHEMA_PRESENCE: readonly StreamGiftLedgerSchemaPresenceCheck198D[] = Object.freeze(
  STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MARKERS.map((marker) =>
    Object.freeze({
      marker,
      required: true,
      expectedCount: 1,
    }),
  ),
);

export const STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_COMMAND_PLAN: readonly StreamGiftLedgerPrismaCommandPlan198D[] = Object.freeze([
  Object.freeze({
    name: "prisma_validate",
    command: "npx prisma validate --schema prisma/schema.prisma",
    plannedOnlyIn198D: true,
    executeNow: false,
    requiresSeparateApproval: true,
    purpose: "Validate 198C schema syntax and Prisma relations after an exact owner-approved validation step.",
    forbiddenCompanions: ["prisma migrate", "prisma db push", "database write", "wallet mutation", "provider call"],
  }),
  Object.freeze({
    name: "prisma_generate",
    command: "npx prisma generate --schema prisma/schema.prisma",
    plannedOnlyIn198D: true,
    executeNow: false,
    requiresSeparateApproval: true,
    purpose: "Regenerate @prisma/client only after validate passes and after a separate generate-only approval.",
    forbiddenCompanions: ["prisma migrate", "prisma db push", "database write", "wallet mutation", "provider call"],
  }),
]);

export function assertStreamGiftLedgerPrismaReadiness198DRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SAFETY;
  const unsafe = [
    safety.prismaSchemaSourceWritePerformedNow,
    safety.prismaSchemaValidatePerformedNow,
    safety.prismaGeneratePerformedNow,
    safety.migrationCreatedNow,
    safety.dbReadPerformedNow,
    safety.dbWritePerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretReadAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_UNSAFE_RUNTIME_FLAG");
  }

  const commandExecutionRequested = STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_COMMAND_PLAN.some((command) => command.executeNow);
  if (commandExecutionRequested) {
    throw new Error("STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_COMMAND_EXECUTION_BLOCKED");
  }
}

export function getStreamGiftLedgerPrismaReadiness198D(): StreamGiftLedgerPrismaReadiness198D {
  assertStreamGiftLedgerPrismaReadiness198DRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_VERSION,
    status: "prisma_validate_generate_planning_ready_no_execution",
    safety: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SAFETY,
    boundary: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_BOUNDARY,
    schemaPresenceChecks: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SCHEMA_PRESENCE,
    commandPlan: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_COMMAND_PLAN,
    executionOrder: [
      "owner_approves_198e_validate_only",
      "run_prisma_validate_without_migration",
      "fix_schema_if_validate_fails",
      "owner_approves_generate_only_after_validate_passes",
      "run_prisma_generate_without_migration_or_db_write",
    ],
    nextStage: "198E_prisma_validate_execution_no_generate_no_migration",
  };
}

export function createStreamGiftLedgerPrismaReadinessApprovalRequest198D(): StreamGiftLedgerPrismaReadinessApprovalRequest198D {
  assertStreamGiftLedgerPrismaReadiness198DRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_VERSION,
    status: "blocked_until_next_exact_owner_approval",
    code: "prisma_validate_execution_requires_separate_approval",
    requestedNextStage: "198E_prisma_validate_execution_no_generate_no_migration",
    safety: STREAM_GIFT_LEDGER_PRISMA_READINESS_198D_SAFETY,
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198E Prisma schema validate execution only after 198D planning, run prisma validate only, no prisma generate, no migration, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "198D does not run prisma validate.",
      "198D does not run prisma generate.",
      "198D does not create a migration or touch the database.",
      "198D does not enable Wallet mutation, provider calls, payouts, fake gift send success, or fake available balance.",
    ],
  };
}
