export type StreamGiftLedgerGeneratedClientUsabilityPlanningSafety198H = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198H";
  prismaGeneratePassedReportedByOwner: true;
  generatedClientUsabilityPlanningPreparedNow: true;
  generatedClientUsabilityCheckExecutedNow: false;
  prismaClientImportedByApiRuntimeNow: false;
  prismaClientInstantiatedByApiRuntimeNow: false;
  prismaConnectCalledNow: false;
  prismaQueryPerformedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  migrationCreatedNow: false;
  prismaMigratePerformedNow: false;
  prismaDbPushPerformedNow: false;
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

export type StreamGiftLedgerGeneratedClientUsabilityPlanningBoundary198H = Readonly<{
  currentStage: "generated_prisma_client_usability_check_planning";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198G";
  generateReportRequired: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true";
  apiImportsPrismaClient: false;
  apiInstantiatesPrismaClient: false;
  apiExecutesShellCommands: false;
  nextStageRequiresSeparateOwnerApproval: true;
  allowedNow: readonly [
    "generated_client_shape_check_planning",
    "delegate_presence_expectations",
    "readiness_route",
    "runbook_route",
    "next_approval_template",
  ];
  forbiddenNow: readonly [
    "api_prisma_client_import",
    "api_prisma_client_instantiation",
    "api_shell_execution",
    "prisma_connect",
    "prisma_query",
    "db_read",
    "db_write",
    "prisma_migrate_dev",
    "prisma_db_push",
    "migration_file_create",
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

export type StreamGiftLedgerGeneratedClientDelegateExpectation198H = Readonly<{
  modelName: string;
  expectedDelegateName: string;
  checkMode: "property_presence_only";
  requiresDbConnection: false;
  requiresQuery: false;
  requiredForRuntimeStage: "198K_or_later_after_migration_and_client_confirmation";
}>;

export type StreamGiftLedgerGeneratedClientUsabilityPlannedCheck198H = Readonly<{
  name: "generated_prisma_client_delegate_shape_check";
  plannedRunnerStage: "198I_generated_client_usability_check_local_runner";
  plannedRunnerCommand: "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js";
  plannedCheckDescription: string;
  importsPrismaClientInApiRuntime: false;
  instantiatesPrismaClientInApiRuntime: false;
  connectsToDatabase: false;
  performsQueries: false;
  writesDatabase: false;
  mutatesWallet: false;
  callsProvider: false;
  enablesGiftRuntime: false;
  redactsOutput: true;
  expectedReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json";
}>;

export type StreamGiftLedgerGeneratedClientUsabilityPlanningReadiness198H = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198H";
  status: "generated_client_usability_check_planning_ready";
  safety: StreamGiftLedgerGeneratedClientUsabilityPlanningSafety198H;
  boundary: StreamGiftLedgerGeneratedClientUsabilityPlanningBoundary198H;
  expectedDelegates: readonly StreamGiftLedgerGeneratedClientDelegateExpectation198H[];
  plannedCheck: StreamGiftLedgerGeneratedClientUsabilityPlannedCheck198H;
  generateReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json";
  nextStage: "198I_generated_client_usability_check_local_runner";
}>;

export type StreamGiftLedgerGeneratedClientUsabilityNextApprovalRequest198H = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198H";
  status: "blocked_until_owner_approves_198i_local_shape_check_runner";
  code: "generated_client_usability_check_runner_requires_separate_owner_approval";
  requestedNextStage: "198I_generated_client_usability_check_local_runner";
  safety: StreamGiftLedgerGeneratedClientUsabilityPlanningSafety198H;
  requiredEvidence: readonly [
    ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true",
    "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json exits 0 after generate",
  ];
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
