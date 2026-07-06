import { getStreamFoundationLiveWriteHandlerSourcePlanSnapshot } from "./live-write-handler-source-plan";

export const STREAM_140X_LIVE_WRITE_HANDLER_SOURCE_PLAN_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140X",
  stage: "live_write_handler_source_plan_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140W",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimePostBy140X: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationLiveWriteHandlerSourcePlanSnapshot(),
} as const;
