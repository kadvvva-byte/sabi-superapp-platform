import { getStreamFoundationWriteRouteApprovalGateSnapshot } from "./write-route-approval-gate";

export const STREAM_140W_WRITE_ROUTE_APPROVAL_GATE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140W",
  stage: "write_route_approval_gate_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-140V",
  readOnlyRoutesVerified: true,
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    backendRestart: false,
    runtimeHttpBy140W: false,
    postPutPatchDeleteBy140W: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationWriteRouteApprovalGateSnapshot(),
} as const;
