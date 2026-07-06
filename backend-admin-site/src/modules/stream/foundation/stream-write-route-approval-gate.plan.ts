import {
  STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION,
  STREAM_WRITE_ROUTE_APPROVAL_GATES,
  type StreamWriteRouteApprovalGate,
} from "./stream-write-route-approval-gate.contracts";

export type StreamWriteRouteApprovalGatePlan = Readonly<{
  version: typeof STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION;
  sourceOnly: true;
  planningStage: "BACKEND_STREAM_FOUNDATION_140W";
  routeMountAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  nextRequiredStages: readonly string[];
  gates: readonly StreamWriteRouteApprovalGate[];
}>;

export const STREAM_WRITE_ROUTE_APPROVAL_GATE_PLAN: StreamWriteRouteApprovalGatePlan = {
  version: STREAM_WRITE_ROUTE_APPROVAL_GATE_VERSION,
  sourceOnly: true,
  planningStage: "BACKEND_STREAM_FOUNDATION_140W",
  routeMountAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowed: false,
  nextRequiredStages: [
    "BACKEND-STREAM-FOUNDATION-140X read-only verification of source-only write route approval gate",
    "BACKEND-STREAM-FOUNDATION-140Y controlled unmounted contract expansion for auth/moderation/media/provider boundaries",
    "Separate explicit owner approval before any live route mount",
    "Separate backend smoke before any live write route is exposed",
  ],
  gates: STREAM_WRITE_ROUTE_APPROVAL_GATES,
};

export function getStreamWriteRouteApprovalGatePlan(): StreamWriteRouteApprovalGatePlan {
  return STREAM_WRITE_ROUTE_APPROVAL_GATE_PLAN;
}
