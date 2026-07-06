import { getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot } from "./streamFoundationOwnerRuntimeMountApprovalGatePlanning";

export function getStreamFoundationOwnerRuntimeMountApprovalGatePlanningReadiness() {
  const snapshot = getStreamFoundationOwnerRuntimeMountApprovalGatePlanningSnapshot();

  const approvalContractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141S" &&
    snapshot.approvalBoundaries.length === 8 &&
    snapshot.approvalBoundaries.every((boundary) => boundary.requiredBeforeRuntimeMount === true) &&
    snapshot.ownerApprovalPolicy.ownerApprovalRequiredBeforeRuntimeMountImplementation === true &&
    snapshot.ownerApprovalPolicy.ownerApprovalRequiredBeforeChangingBlockedRoutes === true &&
    snapshot.requiredExactApprovalTextForNextPlanning.includes("BACKEND-STREAM-FOUNDATION") &&
    snapshot.requiredExactApprovalTextForNextPlanning.includes("no DB write") &&
    snapshot.requiredExactApprovalTextForNextPlanning.includes("no provider call") &&
    snapshot.requiredExactApprovalTextForNextPlanning.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextForNextPlanning.includes("no fake success");

  const blockedNow =
    snapshot.ownerApprovalPolicy.blockedRoutesMustRemain423Now === true &&
    snapshot.ownerApprovalPolicy.routesStayBlockedNow === true &&
    snapshot.ownerApprovalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.ownerApprovalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.ownerApprovalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.ownerApprovalPolicy.providerLiveAllowedNow === false &&
    snapshot.ownerApprovalPolicy.databaseWriteAllowedNow === false &&
    snapshot.ownerApprovalPolicy.walletMoneyAllowedNow === false &&
    snapshot.approvalBoundaries.every((boundary) => boundary.implementationAllowedNow === false) &&
    snapshot.approvalBoundaries.every((boundary) => boundary.runtimeSuccessAllowedNow === false) &&
    snapshot.approvalBoundaries.every((boundary) => boundary.databaseWriteAllowedNow === false) &&
    snapshot.approvalBoundaries.every((boundary) => boundary.providerCallAllowedNow === false) &&
    snapshot.approvalBoundaries.every((boundary) => boundary.walletMutationAllowedNow === false) &&
    snapshot.approvalBoundaries.every((boundary) => boundary.moneyMovementAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.implementationAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141T === true &&
    snapshot.safety.appTsChangeBy141T === false &&
    snapshot.safety.serverTsChangeBy141T === false &&
    snapshot.safety.streamIndexChangeBy141T === false &&
    snapshot.safety.schemaMigrationBy141T === false &&
    snapshot.safety.backendRestartBy141T === false &&
    snapshot.safety.runtimeHttpBy141T === false &&
    snapshot.safety.runtimePostBy141T === false &&
    snapshot.safety.databaseReadBy141T === false &&
    snapshot.safety.databaseWriteBy141T === false &&
    snapshot.safety.providerCallBy141T === false &&
    snapshot.safety.providerSecretReadBy141T === false &&
    snapshot.safety.walletMutationBy141T === false &&
    snapshot.safety.moneyMovementBy141T === false &&
    snapshot.safety.fakeSuccessBy141T === false;

  const ready = approvalContractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "owner_runtime_mount_approval_gate_ready_routes_remain_blocked" : "owner_runtime_mount_approval_gate_blocked",
    approvalBoundaries: snapshot.approvalBoundaries.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141U runtime mount implementation planning approval package",
  } as const;
}
