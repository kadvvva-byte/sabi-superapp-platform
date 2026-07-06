import { getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot } from "./runtime-mount-implementation-planning-approval-package";

export const STREAM_141U_RUNTIME_MOUNT_IMPLEMENTATION_PLANNING_APPROVAL_PACKAGE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141U",
  stage: "runtime_mount_implementation_planning_approval_package",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141T",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141U: false,
    serverTsChangeBy141U: false,
    streamIndexChangeBy141U: false,
    schemaMigrationBy141U: false,
    backendRestartBy141U: false,
    runtimeHttpBy141U: false,
    runtimePostBy141U: false,
    databaseReadBy141U: false,
    databaseWriteBy141U: false,
    providerCallBy141U: false,
    providerSecretReadBy141U: false,
    walletMutationBy141U: false,
    paymentAuthorizationBy141U: false,
    monthlyPayoutBy141U: false,
    moneyMovementBy141U: false,
    fakeSuccessBy141U: false,
  },
  snapshot: getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot(),
} as const;
