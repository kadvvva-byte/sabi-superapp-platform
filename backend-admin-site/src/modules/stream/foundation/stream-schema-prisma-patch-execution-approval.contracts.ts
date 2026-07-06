export const STREAM_SCHEMA_PRISMA_PATCH_EXECUTION_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-141S" as const;

export type StreamSchemaPatchExecutionApprovalStatus =
  | "schema_patch_execution_approval_package_ready"
  | "blocked"
  | "review_required";

export type StreamSchemaPatchExecutionApprovalPackage = Readonly<{
  version: typeof STREAM_SCHEMA_PRISMA_PATCH_EXECUTION_APPROVAL_VERSION;
  status: StreamSchemaPatchExecutionApprovalStatus;
  sourceOnly: true;
  priorLiveDbReadOnlyPreflightRequired: true;
  priorLiveDbReadOnlyPreflightConflictFreeRequired: true;
  schemaPatchDraftHash: string;
  schemaPrismaEditAllowedNow: false;
  schemaPrismaPatchExecutionAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  routeMountAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretColumnAllowed: false;
  rawPurchaseTokenColumnAllowed: false;
  plannedTables: readonly string[];
  requiredBeforeControlledSchemaPatchExecution: readonly string[];
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_SCHEMA_PRISMA_PATCH_EXECUTION_APPROVAL_PACKAGE: StreamSchemaPatchExecutionApprovalPackage = {
  version: STREAM_SCHEMA_PRISMA_PATCH_EXECUTION_APPROVAL_VERSION,
  status: "schema_patch_execution_approval_package_ready",
  sourceOnly: true,
  priorLiveDbReadOnlyPreflightRequired: true,
  priorLiveDbReadOnlyPreflightConflictFreeRequired: true,
  schemaPatchDraftHash: "8d770899da7d5c4abdafcca6390edd79301e2c3f06fb315af20cfdbff7ebcd0e",
  schemaPrismaEditAllowedNow: false,
  schemaPrismaPatchExecutionAllowedNow: false,
  migrationFileCreationAllowedNow: false,
  migrationExecutionAllowedNow: false,
  prismaGenerateAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  routeMountAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretColumnAllowed: false,
  rawPurchaseTokenColumnAllowed: false,
  plannedTables: [
    "StreamPurchaseIntent",
    "StreamPurchaseClassification",
    "StreamGooglePurchaseVerification",
    "StreamAppendOnlyLedgerEntry",
    "StreamLedgerHold",
    "StreamCreatorEarningState",
    "StreamMerchantSettlementState",
    "StreamRefundVoidAdjustment",
    "StreamIdempotencyKey",
    "StreamProviderGateSnapshot",
  ],
  requiredBeforeControlledSchemaPatchExecution: [
    "Clean 141R live DB read-only conflict preflight",
    "plannedTableConflictCount equals 0",
    "plannedIndexConflictCount equals 0",
    "plannedConstraintConflictCount equals 0",
    "schema.prisma unchanged before 141T",
    "patch draft hash matches 141P/141Q",
    "backup and rollback runbook remains available",
    "no raw purchase token column",
    "no raw provider secret column",
    "owner approval phrase for 141T",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141T controlled schema.prisma patch execution only, no migration file creation, no migration execution, no prisma generate, no DB write, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This is an approval package for a future controlled schema.prisma patch execution stage. It does not edit schema.prisma now and does not create or execute migrations.",
};

export function getStreamSchemaPrismaPatchExecutionApprovalPackage(): StreamSchemaPatchExecutionApprovalPackage {
  return STREAM_SCHEMA_PRISMA_PATCH_EXECUTION_APPROVAL_PACKAGE;
}
