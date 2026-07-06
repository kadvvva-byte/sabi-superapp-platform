import { getStreamFoundationControlledRouteBindingApprovalPackageSnapshot } from "./streamFoundationControlledRouteBindingApprovalPackage";

export function getStreamFoundationControlledRouteBindingApprovalPackageReadiness() {
  const snapshot = getStreamFoundationControlledRouteBindingApprovalPackageSnapshot();

  const approvalReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141B" &&
    snapshot.approvalItems.length === 3 &&
    snapshot.approvalItems.every((item) => item.approvalPackageReady === true) &&
    snapshot.approvalItems.every((item) => item.exactApprovalRequired === true) &&
    snapshot.approvalItems.every((item) => item.requiredApprovalText.includes("I approve BACKEND-STREAM-FOUNDATION-141D"));

  const blockedNow =
    snapshot.approvalItems.every((item) => item.appTsPatchAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.serverTsPatchAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.streamIndexPatchAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.routeMountAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.runtimePostAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.runtimeSmokeAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.backendRestartAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.databaseWriteAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.providerCallAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.walletMutationAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.moneyMovementAllowedBy141C === false) &&
    snapshot.approvalItems.every((item) => item.fakeSuccessAllowedBy141C === false);

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141C === false &&
    snapshot.safety.runtimePostBy141C === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = approvalReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "route_binding_approval_package_ready_no_runtime_binding" : "route_binding_approval_package_blocked",
    approvalItems: snapshot.totals.approvalItems,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141D controlled source-only route binding patch draft review",
  } as const;
}
