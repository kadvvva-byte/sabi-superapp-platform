import {
  STREAM_FOUNDATION_141A_LIVE_WRITE_ROUTE_BINDING_PLAN_VERSION,
  type StreamFoundation141ABindingPlanItem,
  type StreamFoundation141ABindingPlanSnapshot,
} from "./streamFoundationLiveWriteRouteBindingPlanContracts";

const SAFE_BLOCKED_RESPONSE = {
  statusCode: 423,
  ok: false,
  safeCode: "STREAM_RUNTIME_WRITE_BLOCKED_SOURCE_ONLY",
} as const;

function plan(
  routeId: StreamFoundation141ABindingPlanItem["routeId"],
  plannedPath: string,
  plannedHandlerExport: StreamFoundation141ABindingPlanItem["plannedHandlerExport"],
): StreamFoundation141ABindingPlanItem {
  return {
    routeId,
    plannedPath,
    plannedMethod: "POST",
    plannedHandlerExport,
    sourceOnlyRegistryReady: true,
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
    exactApprovalRequiredBeforeRuntimeMount: true,
    safeExpectedRuntimeResponseBeforeApproval: SAFE_BLOCKED_RESPONSE,
  };
}

const BINDING_PLANS: readonly StreamFoundation141ABindingPlanItem[] = [
  plan("stream_live_start", "/api/stream/live/start", "handleStreamFoundationLiveStartSourceOnlyDraft"),
  plan("stream_live_stop", "/api/stream/live/stop", "handleStreamFoundationLiveStopSourceOnlyDraft"),
  plan("stream_live_heartbeat", "/api/stream/live/heartbeat", "handleStreamFoundationLiveHeartbeatSourceOnlyDraft"),
];

export function getStreamFoundationLiveWriteRouteBindingPlanSnapshot(): StreamFoundation141ABindingPlanSnapshot {
  return {
    version: STREAM_FOUNDATION_141A_LIVE_WRITE_ROUTE_BINDING_PLAN_VERSION,
    stage: "controlled_source_only_route_binding_plan",
    status: "live_write_route_binding_plan_ready_runtime_mount_blocked",
    previousStage: "BACKEND-STREAM-FOUNDATION-140Z",
    handlerBindingApprovalReady: true,
    bindingPlans: BINDING_PLANS,
    totals: {
      bindingPlans: 3,
      sourceOnlyRegistryReady: 3,
      appTsMountNow: 0,
      serverTsMountNow: 0,
      streamIndexExportNow: 0,
      runtimePostAllowedNow: 0,
      runtimeSmokeAllowedNow: 0,
      backendRestartAllowedNow: 0,
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
      runtimeHttpBy141A: false,
      runtimePostBy141A: false,
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
