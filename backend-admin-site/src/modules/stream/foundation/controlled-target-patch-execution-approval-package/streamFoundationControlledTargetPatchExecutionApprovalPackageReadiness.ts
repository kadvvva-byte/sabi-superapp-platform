import { getStreamFoundationControlledTargetPatchExecutionApprovalPackageSnapshot } from "./streamFoundationControlledTargetPatchExecutionApprovalPackage";

export function getStreamFoundationControlledTargetPatchExecutionApprovalPackageReadiness() {
  const snapshot = getStreamFoundationControlledTargetPatchExecutionApprovalPackageSnapshot();

  const detectionReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142L" &&
    snapshot.detection142L.ok === true &&
    snapshot.detection142L.exactTargetDetected === true &&
    snapshot.detection142L.primaryTargetFile === "src/app.ts" &&
    snapshot.detection142L.routeContextsFound === 3 &&
    snapshot.detection142L.runtimeHandlerReadinessPassed === 3 &&
    snapshot.detection142L.runtimeHandlerReadinessFailed === 0 &&
    snapshot.detection142L.tscExitCode === 0 &&
    snapshot.detection142L.patchDraftOnly === true &&
    snapshot.detection142L.applyPatchNow === false &&
    snapshot.detection142L.targetFileWritePerformed === 0 &&
    snapshot.detection142L.runtimePostPerformed === 0 &&
    snapshot.detection142L.databaseWritePerformed === 0 &&
    snapshot.detection142L.providerCallPerformed === 0 &&
    snapshot.detection142L.walletMutationPerformed === 0 &&
    snapshot.detection142L.moneyMovementPerformed === 0 &&
    snapshot.detection142L.fakeSuccessAllowed === false;

  const approvalReady =
    snapshot.approvedPatchScopeForNextStage.nextStage === "BACKEND-STREAM-FOUNDATION-142N" &&
    snapshot.approvedPatchScopeForNextStage.exactApprovalRequiredBefore142N === true &&
    snapshot.approvedPatchScopeForNextStage.onlyTargetFileAllowedFor142N === "src/app.ts" &&
    snapshot.requiredExactApprovalTextFor142N.includes("BACKEND-STREAM-FOUNDATION-142N") &&
    snapshot.requiredExactApprovalTextFor142N.includes("modify only src/app.ts") &&
    snapshot.requiredExactApprovalTextFor142N.includes("preserving 423 blocked behavior") &&
    snapshot.requiredExactApprovalTextFor142N.includes("do not write src/server.ts") &&
    snapshot.requiredExactApprovalTextFor142N.includes("do not write src/modules/stream/index.ts") &&
    snapshot.requiredExactApprovalTextFor142N.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142N.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142N.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142N.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142N.includes("no fake success");

  const scopeSafe =
    snapshot.routePatchApprovalItems.length === 3 &&
    snapshot.routePatchApprovalItems.every((item) => item.targetFile === "src/app.ts") &&
    snapshot.routePatchApprovalItems.every((item) => item.mustPreserveStatusCode === 423) &&
    snapshot.routePatchApprovalItems.every((item) => item.routeBehaviorMustRemainBlocked === true) &&
    snapshot.routePatchApprovalItems.every((item) => item.runtimeSuccessAllowedNow === false) &&
    snapshot.routePatchApprovalItems.every((item) => item.databaseWriteAllowedNow === false) &&
    snapshot.routePatchApprovalItems.every((item) => item.providerCallAllowedNow === false) &&
    snapshot.routePatchApprovalItems.every((item) => item.walletMutationAllowedNow === false) &&
    snapshot.totals.targetFilesAllowedFor142N === 1 &&
    snapshot.totals.serverTsWriteAllowedFor142N === 0 &&
    snapshot.totals.streamIndexWriteAllowedFor142N === 0 &&
    snapshot.totals.backendRestartAllowedFor142N === 0 &&
    snapshot.totals.runtimePostAllowedFor142N === 0 &&
    snapshot.totals.databaseWriteAllowedFor142N === 0 &&
    snapshot.totals.providerCallAllowedFor142N === 0 &&
    snapshot.totals.walletMutationAllowedFor142N === 0 &&
    snapshot.totals.moneyMovementAllowedFor142N === 0 &&
    snapshot.totals.fakeSuccessAllowedFor142N === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142M === true &&
    snapshot.safety.targetWriteBy142M === false &&
    snapshot.safety.appTsChangeBy142M === false &&
    snapshot.safety.serverTsChangeBy142M === false &&
    snapshot.safety.streamIndexChangeBy142M === false &&
    snapshot.safety.backendRestartBy142M === false &&
    snapshot.safety.runtimeHttpBy142M === false &&
    snapshot.safety.runtimePostBy142M === false &&
    snapshot.safety.databaseReadBy142M === false &&
    snapshot.safety.databaseWriteBy142M === false &&
    snapshot.safety.providerCallBy142M === false &&
    snapshot.safety.providerSecretReadBy142M === false &&
    snapshot.safety.walletMutationBy142M === false &&
    snapshot.safety.moneyMovementBy142M === false &&
    snapshot.safety.fakeSuccessBy142M === false;

  const ready = detectionReady && approvalReady && scopeSafe && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "target_patch_execution_approval_ready_next_exact_approval_required" : "target_patch_execution_approval_blocked",
    routePatchApprovalItems: snapshot.routePatchApprovalItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142N controlled target patch execution after exact approval",
  } as const;
}
