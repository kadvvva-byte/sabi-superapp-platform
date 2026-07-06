import { getStreamFoundationExactTargetDetectionFutureBindingSnapshot } from "./exact-target-detection-future-binding";

export const STREAM_141E_EXACT_TARGET_DETECTION_FUTURE_BINDING_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141E",
  stage: "exact_target_detection_for_future_binding_patch",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141D",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141E: false,
    runtimePostBy141E: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationExactTargetDetectionFutureBindingSnapshot(),
} as const;
