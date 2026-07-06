import { getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot } from "./owner-runtime-mount-approval-gate-planning";

export const STREAM_141T_OWNER_RUNTIME_MOUNT_APPROVAL_GATE_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141T",
  stage: "owner_runtime_mount_approval_gate_source_only_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141S",
  currentRouteFreeze: {
    routesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141T: false,
    serverTsChangeBy141T: false,
    streamIndexChangeBy141T: false,
    schemaMigrationBy141T: false,
    backendRestartBy141T: false,
    runtimeHttpBy141T: false,
    runtimePostBy141T: false,
    databaseReadBy141T: false,
    databaseWriteBy141T: false,
    providerCallBy141T: false,
    providerSecretReadBy141T: false,
    walletMutationBy141T: false,
    paymentAuthorizationBy141T: false,
    monthlyPayoutBy141T: false,
    moneyMovementBy141T: false,
    fakeSuccessBy141T: false,
  },
  snapshot: getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot(),
} as const;
