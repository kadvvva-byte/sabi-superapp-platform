export const STREAM_MIGRATION_FILE_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-141U" as const;

export type StreamMigrationFileApprovalStatus =
  | "migration_file_approval_package_ready"
  | "blocked"
  | "review_required";

export type StreamMigrationFileApprovalPackage = Readonly<{
  version: typeof STREAM_MIGRATION_FILE_APPROVAL_VERSION;
  status: StreamMigrationFileApprovalStatus;
  sourceOnly: true;
  postPatchSchemaVerificationRequired: true;
  schemaPrismaPatched: true;
  schemaPrismaHash: string;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  databaseWriteAllowedNow: false;
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
  requiredBeforeMigrationFileCreation: readonly string[];
  exactNextApprovalPhrase: string;
  notes: string;
}>;

export const STREAM_MIGRATION_FILE_APPROVAL_PACKAGE: StreamMigrationFileApprovalPackage = {
  version: STREAM_MIGRATION_FILE_APPROVAL_VERSION,
  status: "migration_file_approval_package_ready",
  sourceOnly: true,
  postPatchSchemaVerificationRequired: true,
  schemaPrismaPatched: true,
  schemaPrismaHash: "f87c1850a89f48f5013027eacd5e70484bf8368225b0899b148d55b9cb05bfe3",
  migrationFileCreationAllowedNow: false,
  migrationExecutionAllowedNow: false,
  prismaGenerateAllowedNow: false,
  databaseWriteAllowedNow: false,
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
  requiredBeforeMigrationFileCreation: [
    "Clean 141T controlled schema.prisma patch execution report",
    "schema.prisma has 141T begin/end markers",
    "all 10 planned models exist exactly once",
    "prisma validate passes after patch",
    "TypeScript passes after patch",
    "no raw purchase token column",
    "no raw provider secret column",
    "owner approval phrase for 141V",
  ],
  exactNextApprovalPhrase:
    "I approve BACKEND-STREAM-FOUNDATION-141V controlled Prisma migration file creation only, no migration execution, no prisma generate, no DB write, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch.",
  notes:
    "This approval package does not create a migration file. It only prepares the gate for a future controlled migration file creation stage.",
};

export function getStreamMigrationFileApprovalPackage(): StreamMigrationFileApprovalPackage {
  return STREAM_MIGRATION_FILE_APPROVAL_PACKAGE;
}
