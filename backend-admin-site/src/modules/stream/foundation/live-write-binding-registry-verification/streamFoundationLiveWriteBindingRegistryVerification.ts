import {
  STREAM_FOUNDATION_141B_BINDING_REGISTRY_VERIFICATION_VERSION,
  type StreamFoundation141BRegistryVerificationItem,
  type StreamFoundation141BRegistryVerificationSnapshot,
} from "./streamFoundationLiveWriteBindingRegistryVerificationContracts";

function item(routeId: StreamFoundation141BRegistryVerificationItem["routeId"], plannedPath: string): StreamFoundation141BRegistryVerificationItem {
  return {
    routeId,
    plannedPath,
    plannedMethod: "POST",
    sourceOnlyBindingPlanPresent: true,
    draftHandlerPresent: true,
    exactApprovalRequired: true,
    expectedBlockedStatusCode: 423,
    appTsMountNow: false,
    serverTsMountNow: false,
    streamIndexExportNow: false,
    runtimePostAllowedNow: false,
    runtimeSmokeAllowedNow: false,
    backendRestartAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    paymentAuthorizationAllowedNow: false,
    monthlyPayoutAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}

const VERIFICATION_ITEMS = [
  item("stream_live_start", "/api/stream/live/start"),
  item("stream_live_stop", "/api/stream/live/stop"),
  item("stream_live_heartbeat", "/api/stream/live/heartbeat"),
] as const;

export function getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot(): StreamFoundation141BRegistryVerificationSnapshot {
  return {
    version: STREAM_FOUNDATION_141B_BINDING_REGISTRY_VERIFICATION_VERSION,
    stage: "source_only_binding_registry_verification",
    status: "binding_registry_verified_runtime_mount_blocked",
    previousStage: "BACKEND-STREAM-FOUNDATION-141A",
    verificationItems: VERIFICATION_ITEMS,
    totals: {
      verifiedBindings: 3,
      draftHandlersPresent: 3,
      exactApprovalRequired: 3,
      runtimeMountAllowedNow: 0,
      runtimePostAllowedNow: 0,
      databaseWriteAllowedNow: 0,
      providerCallAllowedNow: 0,
      walletMutationAllowedNow: 0,
      moneyMovementAllowedNow: 0,
      fakeSuccessAllowed: 0,
    },
    safety: {
      sourceOnly: true,
      appTsChange: false,
      serverTsChange: false,
      streamIndexChange: false,
      routeMountNow: false,
      runtimeHttpBy141B: false,
      runtimePostBy141B: false,
      backendRestart: false,
      databaseWrite: false,
      providerCall: false,
      walletMutation: false,
      paymentAuthorization: false,
      monthlyPayout: false,
      moneyMovement: false,
      fakeSuccess: false,
    },
  };
}
