import {
  STREAM_FOUNDATION_141C_ROUTE_BINDING_APPROVAL_PACKAGE_VERSION,
  type StreamFoundation141CApprovalItem,
  type StreamFoundation141CApprovalPackageSnapshot,
  type StreamFoundation141CRouteId,
} from "./streamFoundationControlledRouteBindingApprovalPackageContracts";

function approvalItem(routeId: StreamFoundation141CRouteId, plannedPath: string): StreamFoundation141CApprovalItem {
  return {
    routeId,
    plannedPath,
    plannedMethod: "POST",
    previousVerificationStage: "BACKEND-STREAM-FOUNDATION-141B",
    approvalPackageReady: true,
    exactApprovalRequired: true,
    appTsPatchAllowedBy141C: false,
    serverTsPatchAllowedBy141C: false,
    streamIndexPatchAllowedBy141C: false,
    routeMountAllowedBy141C: false,
    runtimePostAllowedBy141C: false,
    runtimeSmokeAllowedBy141C: false,
    backendRestartAllowedBy141C: false,
    databaseWriteAllowedBy141C: false,
    providerCallAllowedBy141C: false,
    walletMutationAllowedBy141C: false,
    paymentAuthorizationAllowedBy141C: false,
    monthlyPayoutAllowedBy141C: false,
    moneyMovementAllowedBy141C: false,
    fakeSuccessAllowedBy141C: false,
    requiredApprovalText:
      "I approve BACKEND-STREAM-FOUNDATION-141D controlled source-only route binding patch draft review only for " +
      routeId +
      ", no app.ts write, no server.ts write, no src/modules/stream/index.ts write, no route mount, no runtime POST, no backend restart, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success.",
  };
}

const APPROVAL_ITEMS: readonly StreamFoundation141CApprovalItem[] = [
  approvalItem("stream_live_start", "/api/stream/live/start"),
  approvalItem("stream_live_stop", "/api/stream/live/stop"),
  approvalItem("stream_live_heartbeat", "/api/stream/live/heartbeat"),
];

export function getStreamFoundationControlledRouteBindingApprovalPackageSnapshot(): StreamFoundation141CApprovalPackageSnapshot {
  return {
    version: STREAM_FOUNDATION_141C_ROUTE_BINDING_APPROVAL_PACKAGE_VERSION,
    stage: "controlled_route_binding_source_only_approval_package",
    status: "approval_package_ready_no_runtime_binding",
    previousStage: "BACKEND-STREAM-FOUNDATION-141B",
    approvalItems: APPROVAL_ITEMS,
    totals: {
      approvalItems: 3,
      exactApprovalRequired: 3,
      appTsPatchAllowedBy141C: 0,
      serverTsPatchAllowedBy141C: 0,
      streamIndexPatchAllowedBy141C: 0,
      routeMountAllowedBy141C: 0,
      runtimePostAllowedBy141C: 0,
      runtimeSmokeAllowedBy141C: 0,
      backendRestartAllowedBy141C: 0,
      databaseWriteAllowedBy141C: 0,
      providerCallAllowedBy141C: 0,
      walletMutationAllowedBy141C: 0,
      moneyMovementAllowedBy141C: 0,
      fakeSuccessAllowedBy141C: 0,
    },
    safety: {
      sourceOnly: true,
      appTsChange: false,
      serverTsChange: false,
      streamIndexChange: false,
      routeMountNow: false,
      runtimeHttpBy141C: false,
      runtimePostBy141C: false,
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
