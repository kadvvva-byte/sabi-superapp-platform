export type StreamGiftLedgerGeneratedClientUsabilityCheckSafety198I = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198I";
  generatedClientUsabilityLocalRunnerPreparedNow: true;
  generatedClientUsabilityCheckExecutedByApiNow: false;
  apiImportsPrismaClientNow: false;
  apiInstantiatesPrismaClientNow: false;
  apiExecutesShellCommandsNow: false;
  localRunnerMayImportPrismaClient: true;
  localRunnerMayInstantiatePrismaClient: true;
  localRunnerCallsPrismaConnect: false;
  localRunnerPerformsPrismaQueries: false;
  localRunnerReadsDatabase: false;
  localRunnerWritesDatabase: false;
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
  rawSecretOutputAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerGeneratedClientUsabilityCheckBoundary198I = Readonly<{
  currentStage: "generated_prisma_client_usability_check_local_runner";
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198H";
  generateReportRecommended: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true";
  apiImportsPrismaClient: false;
  apiInstantiatesPrismaClient: false;
  apiExecutesShellCommands: false;
  localRunnerCommand: "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js";
  localRunnerReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json";
  nextStageRequiresRunnerOutput: true;
  allowedNow: readonly [
    "local_generated_client_shape_runner",
    "constructor_presence_check",
    "delegate_property_presence_check",
    "readiness_route",
    "runbook_route",
    "next_report_review_template",
  ];
  forbiddenNow: readonly [
    "api_prisma_client_import",
    "api_prisma_client_instantiation",
    "api_shell_execution",
    "prisma_connect",
    "prisma_delegate_query",
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

export type StreamGiftLedgerGeneratedClientDelegateExpectation198I = Readonly<{
  modelName: string;
  expectedDelegateName: string;
  checkMode: "property_presence_only";
  requiresPrismaClientConstructor: true;
  requiresDbConnection: false;
  requiresQuery: false;
  requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation";
}>;

export type StreamGiftLedgerGeneratedClientUsabilityRunbook198I = Readonly<{
  command: "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js";
  reportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json";
  expectedExitCodeWhenClientShapeOk: 0;
  expectedExitCodeWhenClientShapeMissing: 1;
  checksOnly: readonly ["PrismaClient export exists", "new PrismaClient can be constructed", "gift-ledger delegate property names exist"];
  doesNotDo: readonly [
    "prisma.$connect()",
    "delegate.findMany/create/update/delete",
    "DB read/write",
    "migration",
    "db push",
    "Wallet mutation",
    "provider call",
    "gift send runtime enable",
    "raw secret output",
  ];
}>;

export type StreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198I";
  status: "generated_client_usability_check_local_runner_ready";
  safety: StreamGiftLedgerGeneratedClientUsabilityCheckSafety198I;
  boundary: StreamGiftLedgerGeneratedClientUsabilityCheckBoundary198I;
  expectedDelegates: readonly StreamGiftLedgerGeneratedClientDelegateExpectation198I[];
  runbook: StreamGiftLedgerGeneratedClientUsabilityRunbook198I;
  nextStage: "198J_generated_client_usability_report_review";
}>;

export type StreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198I";
  status: "blocked_until_owner_runs_198i_local_runner_and_shares_result";
  code: "generated_client_usability_report_required";
  requestedNextStage: "198J_generated_client_usability_report_review";
  safety: StreamGiftLedgerGeneratedClientUsabilityCheckSafety198I;
  requiredEvidence: readonly [
    "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js exits 0",
    ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json with ok=true",
    "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json exits 0 after check",
  ];
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
