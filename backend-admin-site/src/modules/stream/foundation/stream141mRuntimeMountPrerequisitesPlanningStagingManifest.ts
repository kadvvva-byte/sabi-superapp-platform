import { getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot } from "./runtime-mount-prerequisites-planning";

export const STREAM_141M_RUNTIME_MOUNT_PREREQUISITES_PLANNING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141M",
  stage: "runtime_mount_prerequisites_planning",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141L",
  currentRouteFreeze: {
    startStopHeartbeatRoutesStayBlocked: true,
    expectedCurrentStatusCode: 423,
    runtimeSuccessAllowedNow: false,
    fakeSuccessAllowedNow: false,
  },
  forbidden: {
    appTsChangeBy141M: false,
    serverTsChangeBy141M: false,
    streamIndexChangeBy141M: false,
    backendRestartBy141M: false,
    runtimeHttpBy141M: false,
    runtimePostBy141M: false,
    databaseWriteBy141M: false,
    providerCallBy141M: false,
    walletMutationBy141M: false,
    paymentAuthorizationBy141M: false,
    monthlyPayoutBy141M: false,
    moneyMovementBy141M: false,
    fakeSuccessBy141M: false,
  },
  snapshot: getStreamFoundationRuntimeMountPrerequisitesPlanningSnapshot(),
} as const;
