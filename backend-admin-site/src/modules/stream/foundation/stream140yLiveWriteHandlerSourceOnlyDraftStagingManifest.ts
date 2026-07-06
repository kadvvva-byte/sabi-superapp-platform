import { getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot } from "./live-write-handler-source-only-draft";

export const STREAM_140Y_LIVE_WRITE_HANDLER_SOURCE_ONLY_DRAFT_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140Y",
  stage: "live_write_handler_source_only_implementation_draft",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140X",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy140Y: false,
    runtimePostBy140Y: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationLiveWriteHandlerSourceOnlyDraftSnapshot(),
} as const;
