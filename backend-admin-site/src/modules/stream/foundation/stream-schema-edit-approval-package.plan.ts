import {
  STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION,
  STREAM_SCHEMA_EDIT_APPROVAL_GATE,
  type StreamSchemaEditApprovalGate,
} from "./stream-schema-edit-approval-package.contracts";

export type StreamSchemaEditApprovalPackageSourcePlan = Readonly<{
  version: typeof STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_141O";
  approvalGate: StreamSchemaEditApprovalGate;
  schemaPrismaEditAllowedNow: false;
  migrationFileCreationAllowedNow: false;
  migrationExecutionAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeUseAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretStorageAllowed: false;
  rawPurchaseTokenStorageAllowed: false;
  nextStage: "BACKEND-STREAM-FOUNDATION-141P source-only schema.prisma patch draft planning";
}>;

export const STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_SOURCE_PLAN: StreamSchemaEditApprovalPackageSourcePlan = {
  version: STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_141O",
  approvalGate: STREAM_SCHEMA_EDIT_APPROVAL_GATE,
  schemaPrismaEditAllowedNow: false,
  migrationFileCreationAllowedNow: false,
  migrationExecutionAllowedNow: false,
  prismaGenerateAllowedNow: false,
  runtimeUseAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  fakeSuccessAllowed: false,
  rawSecretStorageAllowed: false,
  rawPurchaseTokenStorageAllowed: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-141P source-only schema.prisma patch draft planning",
};

export function getStreamSchemaEditApprovalPackageSourcePlan(): StreamSchemaEditApprovalPackageSourcePlan {
  return STREAM_SCHEMA_EDIT_APPROVAL_PACKAGE_SOURCE_PLAN;
}
