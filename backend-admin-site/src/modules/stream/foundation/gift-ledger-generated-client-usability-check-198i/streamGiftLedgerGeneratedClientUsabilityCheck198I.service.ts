import type {
  StreamGiftLedgerGeneratedClientDelegateExpectation198I,
  StreamGiftLedgerGeneratedClientUsabilityCheckBoundary198I,
  StreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I,
  StreamGiftLedgerGeneratedClientUsabilityCheckSafety198I,
  StreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I,
  StreamGiftLedgerGeneratedClientUsabilityRunbook198I,
} from "./streamGiftLedgerGeneratedClientUsabilityCheck198I.types";

export const STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_VERSION =
  "BACKEND-STREAM-GIFTS-LEDGER-198I" as const;

export const STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_SAFETY: StreamGiftLedgerGeneratedClientUsabilityCheckSafety198I = Object.freeze({
  stage: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_VERSION,
  generatedClientUsabilityLocalRunnerPreparedNow: true,
  generatedClientUsabilityCheckExecutedByApiNow: false,
  apiImportsPrismaClientNow: false,
  apiInstantiatesPrismaClientNow: false,
  apiExecutesShellCommandsNow: false,
  localRunnerMayImportPrismaClient: true,
  localRunnerMayInstantiatePrismaClient: true,
  localRunnerCallsPrismaConnect: false,
  localRunnerPerformsPrismaQueries: false,
  localRunnerReadsDatabase: false,
  localRunnerWritesDatabase: false,
  migrationCreatedNow: false,
  prismaMigratePerformedNow: false,
  prismaDbPushPerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  giftSendRuntimeEnabledNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretOutputAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_BOUNDARY: StreamGiftLedgerGeneratedClientUsabilityCheckBoundary198I = Object.freeze({
  currentStage: "generated_prisma_client_usability_check_local_runner",
  previousStageRequired: "BACKEND-STREAM-GIFTS-LEDGER-198H",
  generateReportRecommended: ".data/stream/gifts/backend-stream-gifts-ledger-198g-prisma-generate-only-report.json with ok=true",
  apiImportsPrismaClient: false,
  apiInstantiatesPrismaClient: false,
  apiExecutesShellCommands: false,
  localRunnerCommand: "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js",
  localRunnerReportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json",
  nextStageRequiresRunnerOutput: true,
  allowedNow: [
    "local_generated_client_shape_runner",
    "constructor_presence_check",
    "delegate_property_presence_check",
    "readiness_route",
    "runbook_route",
    "next_report_review_template",
  ] as const,
  forbiddenNow: [
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
  ] as const,
});

export const STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_EXPECTED_DELEGATES: readonly StreamGiftLedgerGeneratedClientDelegateExpectation198I[] = Object.freeze([
  Object.freeze({
    modelName: "StreamGiftCatalogItem",
    expectedDelegateName: "streamGiftCatalogItem",
    checkMode: "property_presence_only",
    requiresPrismaClientConstructor: true,
    requiresDbConnection: false,
    requiresQuery: false,
    requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation",
  }),
  Object.freeze({
    modelName: "StreamGiftSendIntent",
    expectedDelegateName: "streamGiftSendIntent",
    checkMode: "property_presence_only",
    requiresPrismaClientConstructor: true,
    requiresDbConnection: false,
    requiresQuery: false,
    requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation",
  }),
  Object.freeze({
    modelName: "StreamGiftLedgerEntry",
    expectedDelegateName: "streamGiftLedgerEntry",
    checkMode: "property_presence_only",
    requiresPrismaClientConstructor: true,
    requiresDbConnection: false,
    requiresQuery: false,
    requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation",
  }),
  Object.freeze({
    modelName: "StreamGiftCreatorEarning",
    expectedDelegateName: "streamGiftCreatorEarning",
    checkMode: "property_presence_only",
    requiresPrismaClientConstructor: true,
    requiresDbConnection: false,
    requiresQuery: false,
    requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation",
  }),
  Object.freeze({
    modelName: "StreamGiftSettlementGate",
    expectedDelegateName: "streamGiftSettlementGate",
    checkMode: "property_presence_only",
    requiresPrismaClientConstructor: true,
    requiresDbConnection: false,
    requiresQuery: false,
    requiredBeforeRuntimeStage: "198K_or_later_after_migration_and_client_confirmation",
  }),
]);

export const STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_RUNBOOK: StreamGiftLedgerGeneratedClientUsabilityRunbook198I = Object.freeze({
  command: "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js",
  reportPath: ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json",
  expectedExitCodeWhenClientShapeOk: 0,
  expectedExitCodeWhenClientShapeMissing: 1,
  checksOnly: [
    "PrismaClient export exists",
    "new PrismaClient can be constructed",
    "gift-ledger delegate property names exist",
  ] as const,
  doesNotDo: [
    "prisma.$connect()",
    "delegate.findMany/create/update/delete",
    "DB read/write",
    "migration",
    "db push",
    "Wallet mutation",
    "provider call",
    "gift send runtime enable",
    "raw secret output",
  ] as const,
});

export function assertStreamGiftLedgerGeneratedClientUsabilityCheck198IRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_SAFETY;
  const unsafe = [
    safety.generatedClientUsabilityCheckExecutedByApiNow,
    safety.apiImportsPrismaClientNow,
    safety.apiInstantiatesPrismaClientNow,
    safety.apiExecutesShellCommandsNow,
    safety.localRunnerCallsPrismaConnect,
    safety.localRunnerPerformsPrismaQueries,
    safety.localRunnerReadsDatabase,
    safety.localRunnerWritesDatabase,
    safety.migrationCreatedNow,
    safety.prismaMigratePerformedNow,
    safety.prismaDbPushPerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.giftSendRuntimeEnabledNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretOutputAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_UNSAFE_RUNTIME_FLAG");
  }

  const boundary = STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_BOUNDARY;
  if (boundary.apiImportsPrismaClient || boundary.apiInstantiatesPrismaClient || boundary.apiExecutesShellCommands) {
    throw new Error("STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_FORBIDDEN_API_SCOPE");
  }
}

export function getStreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I(): StreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I {
  assertStreamGiftLedgerGeneratedClientUsabilityCheck198IRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_VERSION,
    status: "generated_client_usability_check_local_runner_ready",
    safety: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_SAFETY,
    boundary: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_BOUNDARY,
    expectedDelegates: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_EXPECTED_DELEGATES,
    runbook: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_RUNBOOK,
    nextStage: "198J_generated_client_usability_report_review",
  };
}

export function createStreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I(): StreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I {
  assertStreamGiftLedgerGeneratedClientUsabilityCheck198IRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_VERSION,
    status: "blocked_until_owner_runs_198i_local_runner_and_shares_result",
    code: "generated_client_usability_report_required",
    requestedNextStage: "198J_generated_client_usability_report_review",
    safety: STREAM_GIFT_LEDGER_GENERATED_CLIENT_USABILITY_CHECK_198I_SAFETY,
    requiredEvidence: [
      "node tools/stream-gifts-ledger-198i-generated-client-usability-check-only.js exits 0",
      ".data/stream/gifts/backend-stream-gifts-ledger-198i-generated-client-usability-check-only-report.json with ok=true",
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json exits 0 after check",
    ],
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198J generated Prisma client usability check report review after 198I local runner exits 0 and report ok=true, review report only, no Prisma database connection, no Prisma delegate query, no migration, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no gift send runtime enable, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "198I API routes do not import or instantiate PrismaClient.",
      "198I API routes do not execute shell commands.",
      "198I local runner is owner-run only and checks client shape without Prisma $connect or delegate queries.",
      "198I does not create migrations, push schema, read/write DB rows, mutate Wallet, call providers, or enable gift runtime.",
    ],
  };
}
