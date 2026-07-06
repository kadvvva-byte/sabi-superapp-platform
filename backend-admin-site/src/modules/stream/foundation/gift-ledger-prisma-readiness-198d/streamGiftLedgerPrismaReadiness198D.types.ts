export type StreamGiftLedgerPrismaReadinessSafety198D = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198D";
  prismaSchemaSourceWritePerformedNow: false;
  prismaSchemaValidatePlannedNow: true;
  prismaSchemaValidatePerformedNow: false;
  prismaGeneratePlannedNow: true;
  prismaGeneratePerformedNow: false;
  migrationCreatedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretReadAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerPrismaReadinessBoundary198D = Readonly<{
  currentStage: "prisma_validate_generate_planning_only";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198C";
  allowedNow: readonly [
    "schema_presence_static_check",
    "prisma_validate_command_planning",
    "prisma_generate_command_planning",
    "readiness_route",
    "approval_request_template",
  ];
  forbiddenNow: readonly [
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
  ];
  nextStageRequiresSeparateOwnerApproval: true;
}>;

export type StreamGiftLedgerPrismaCommandPlan198D = Readonly<{
  name: "prisma_validate" | "prisma_generate";
  command: string;
  plannedOnlyIn198D: true;
  executeNow: false;
  requiresSeparateApproval: true;
  purpose: string;
  forbiddenCompanions: readonly string[];
}>;

export type StreamGiftLedgerSchemaPresenceCheck198D = Readonly<{
  marker: string;
  required: true;
  expectedCount: 1;
}>;

export type StreamGiftLedgerPrismaReadiness198D = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198D";
  status: "prisma_validate_generate_planning_ready_no_execution";
  safety: StreamGiftLedgerPrismaReadinessSafety198D;
  boundary: StreamGiftLedgerPrismaReadinessBoundary198D;
  schemaPresenceChecks: readonly StreamGiftLedgerSchemaPresenceCheck198D[];
  commandPlan: readonly StreamGiftLedgerPrismaCommandPlan198D[];
  executionOrder: readonly [
    "owner_approves_198e_validate_only",
    "run_prisma_validate_without_migration",
    "fix_schema_if_validate_fails",
    "owner_approves_generate_only_after_validate_passes",
    "run_prisma_generate_without_migration_or_db_write",
  ];
  nextStage: "198E_prisma_validate_execution_no_generate_no_migration";
}>;

export type StreamGiftLedgerPrismaReadinessApprovalRequest198D = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198D";
  status: "blocked_until_next_exact_owner_approval";
  code: "prisma_validate_execution_requires_separate_approval";
  requestedNextStage: "198E_prisma_validate_execution_no_generate_no_migration";
  safety: StreamGiftLedgerPrismaReadinessSafety198D;
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
