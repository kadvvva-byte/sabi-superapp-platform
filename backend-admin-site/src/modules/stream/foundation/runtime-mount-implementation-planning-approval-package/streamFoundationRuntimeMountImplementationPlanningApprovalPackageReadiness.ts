import { getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot } from "./streamFoundationRuntimeMountImplementationPlanningApprovalPackage";

export function getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageReadiness() {
  const snapshot = getStreamFoundationRuntimeMountImplementationPlanningApprovalPackageSnapshot();

  const approvalPackageReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141T" &&
    snapshot.reviewedGates.length === 7 &&
    snapshot.reviewedGates.every((gate) => gate.requiredBeforeImplementationPlanning === true) &&
    snapshot.reviewedGates.every((gate) => gate.implementationPlanningAllowedAfterExactApproval === true) &&
    snapshot.approvalPolicy.exactApprovalRequiredBefore141V === true &&
    snapshot.approvalPolicy.planningOnlyAfterApproval === true &&
    snapshot.requiredExactApprovalTextFor141V.includes("BACKEND-STREAM-FOUNDATION-141V") &&
    snapshot.requiredExactApprovalTextFor141V.includes("source-only only") &&
    snapshot.requiredExactApprovalTextFor141V.includes("do not write src/app.ts") &&
    snapshot.requiredExactApprovalTextFor141V.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor141V.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor141V.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor141V.includes("no fake success");

  const blockedNow =
    snapshot.approvalPolicy.blockedRoutesMustRemain423Now === true &&
    snapshot.approvalPolicy.routesStayBlockedNow === true &&
    snapshot.approvalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.approvalPolicy.implementationAllowedBy141U === false &&
    snapshot.approvalPolicy.targetSourceWriteAllowedBy141U === false &&
    snapshot.approvalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.approvalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.approvalPolicy.databaseWriteAllowedNow === false &&
    snapshot.approvalPolicy.providerCallAllowedNow === false &&
    snapshot.approvalPolicy.walletMutationAllowedNow === false &&
    snapshot.approvalPolicy.moneyMovementAllowedNow === false &&
    snapshot.reviewedGates.every((gate) => gate.runtimeMountAllowedNow === false) &&
    snapshot.reviewedGates.every((gate) => gate.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.implementationAllowedNow === 0 &&
    snapshot.totals.targetSourceWriteAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141U === true &&
    snapshot.safety.appTsChangeBy141U === false &&
    snapshot.safety.serverTsChangeBy141U === false &&
    snapshot.safety.streamIndexChangeBy141U === false &&
    snapshot.safety.schemaMigrationBy141U === false &&
    snapshot.safety.backendRestartBy141U === false &&
    snapshot.safety.runtimeHttpBy141U === false &&
    snapshot.safety.runtimePostBy141U === false &&
    snapshot.safety.databaseReadBy141U === false &&
    snapshot.safety.databaseWriteBy141U === false &&
    snapshot.safety.providerCallBy141U === false &&
    snapshot.safety.providerSecretReadBy141U === false &&
    snapshot.safety.walletMutationBy141U === false &&
    snapshot.safety.moneyMovementBy141U === false &&
    snapshot.safety.fakeSuccessBy141U === false;

  const ready = approvalPackageReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_implementation_planning_approval_package_ready" : "runtime_mount_implementation_planning_approval_package_blocked",
    reviewedGates: snapshot.reviewedGates.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141V runtime mount implementation planning source-only after exact approval",
  } as const;
}
