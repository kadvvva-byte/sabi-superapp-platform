import { getStreamFoundationLiveWriteRouteBindingPlanSnapshot } from "./live-write-route-binding-plan";

export const STREAM_141A_LIVE_WRITE_ROUTE_BINDING_PLAN_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141A",
  stage: "controlled_source_only_route_binding_plan",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140Z",
  forbidden: {
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
  snapshot: getStreamFoundationLiveWriteRouteBindingPlanSnapshot(),
} as const;
