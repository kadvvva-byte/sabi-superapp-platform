import { getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot } from "./live-write-handler-binding-approval";

export const STREAM_140Z_LIVE_WRITE_HANDLER_BINDING_APPROVAL_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140Z",
  stage: "live_write_handler_source_only_verification_and_route_binding_approval",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140Y",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy140Z: false,
    runtimePostBy140Z: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot(),
} as const;
