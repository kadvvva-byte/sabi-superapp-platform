import {
  STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION,
  STREAM_MIGRATE_DEPLOY_APPROVAL_PACKAGE,
  type StreamMigrateDeployApprovalPackage,
} from "./stream-migrate-deploy-approval.contracts";

export type StreamMigrateDeployApprovalSourcePlan = Readonly<{
  version: typeof STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141W";
  approvalPackage: StreamMigrateDeployApprovalPackage;
  controlledMigrateDeployAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeUseAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  nextStage: "BACKEND-STREAM-FOUNDATION-141X controlled Prisma migrate deploy execution";
}>;

export const STREAM_MIGRATE_DEPLOY_APPROVAL_SOURCE_PLAN: StreamMigrateDeployApprovalSourcePlan = {
  version: STREAM_MIGRATE_DEPLOY_APPROVAL_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141W",
  approvalPackage: STREAM_MIGRATE_DEPLOY_APPROVAL_PACKAGE,
  controlledMigrateDeployAllowedNow: false,
  prismaGenerateAllowedNow: false,
  runtimeUseAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-141X controlled Prisma migrate deploy execution",
};

export function getStreamMigrateDeployApprovalSourcePlan(): StreamMigrateDeployApprovalSourcePlan {
  return STREAM_MIGRATE_DEPLOY_APPROVAL_SOURCE_PLAN;
}
