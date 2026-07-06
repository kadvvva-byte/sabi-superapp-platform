import { getStreamFoundationControlledTargetPatchApprovalPackageSnapshot } from "./streamFoundationControlledTargetPatchApprovalPackage";

export function getStreamFoundationControlledTargetPatchApprovalPackageReadiness() {
  const snapshot = getStreamFoundationControlledTargetPatchApprovalPackageSnapshot();

  const approvalReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141F" &&
    snapshot.approvalTargets.length === 2 &&
    snapshot.approvalTargets.every((target) => target.approvalPackageReady === true) &&
    snapshot.approvalTargets.every((target) => target.exactApprovalRequiredBeforeWrite === true) &&
    snapshot.approvalTargets.every((target) => target.requiredApprovalText.includes("I approve BACKEND-STREAM-FOUNDATION-141H")) &&
    snapshot.forbiddenTargets.includes("src/server.ts");

  const allActionsBlocked =
    snapshot.approvalTargets.every((target) => target.writeAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.routeMountAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.runtimePostAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.runtimeSmokeAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.backendRestartAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.databaseWriteAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.providerCallAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.walletMutationAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.moneyMovementAllowedBy141G === false) &&
    snapshot.approvalTargets.every((target) => target.fakeSuccessAllowedBy141G === false);

  const totalsReady =
    snapshot.totals.approvalTargets === 2 &&
    snapshot.totals.forbiddenTargets === 1 &&
    snapshot.totals.writeAllowedBy141G === 0 &&
    snapshot.totals.routeMountAllowedBy141G === 0 &&
    snapshot.totals.runtimePostAllowedBy141G === 0 &&
    snapshot.totals.runtimeSmokeAllowedBy141G === 0 &&
    snapshot.totals.backendRestartAllowedBy141G === 0 &&
    snapshot.totals.databaseWriteAllowedBy141G === 0 &&
    snapshot.totals.providerCallAllowedBy141G === 0 &&
    snapshot.totals.walletMutationAllowedBy141G === 0 &&
    snapshot.totals.moneyMovementAllowedBy141G === 0 &&
    snapshot.totals.fakeSuccessAllowedBy141G === 0;

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141G === false &&
    snapshot.safety.runtimePostBy141G === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = approvalReady && allActionsBlocked && totalsReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "controlled_target_patch_approval_ready_no_target_write" : "controlled_target_patch_approval_blocked",
    approvalTargets: snapshot.totals.approvalTargets,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141H controlled target patch write package",
  } as const;
}
