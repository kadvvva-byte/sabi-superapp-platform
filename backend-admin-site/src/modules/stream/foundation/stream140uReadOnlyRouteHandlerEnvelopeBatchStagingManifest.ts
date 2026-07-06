import { getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot } from "./read-only-route-handler-envelope-batch";

export const STREAM_140U_READ_ONLY_ROUTE_HANDLER_ENVELOPE_BATCH_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140U",
  stage: "read_only_route_handler_envelope_batch_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140T",
  diagnosticsRoutesAlreadyLive: ["readiness", "preview"],
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    backendRestart: false,
    runtimeHttpBy140U: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationReadOnlyRouteHandlerEnvelopeBatchSnapshot(),
} as const;
