import {
  STREAM_MIGRATION_FILE_APPROVAL_VERSION,
  STREAM_MIGRATION_FILE_APPROVAL_PACKAGE,
  type StreamMigrationFileApprovalPackage,
} from "./stream-migration-file-approval.contracts";

export type StreamMigrationFileApprovalSourcePlan = Readonly<{
  version: typeof STREAM_MIGRATION_FILE_APPROVAL_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141U";
  approvalPackage: StreamMigrationFileApprovalPackage;
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
  nextStage: "BACKEND-STREAM-FOUNDATION-141V controlled Prisma migration file creation";
}>;

export const STREAM_MIGRATION_FILE_APPROVAL_SOURCE_PLAN: StreamMigrationFileApprovalSourcePlan = {
  version: STREAM_MIGRATION_FILE_APPROVAL_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141U",
  approvalPackage: STREAM_MIGRATION_FILE_APPROVAL_PACKAGE,
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
  nextStage: "BACKEND-STREAM-FOUNDATION-141V controlled Prisma migration file creation",
};

export function getStreamMigrationFileApprovalSourcePlan(): StreamMigrationFileApprovalSourcePlan {
  return STREAM_MIGRATION_FILE_APPROVAL_SOURCE_PLAN;
}
