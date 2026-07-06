import { getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageSnapshot } from "./streamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackage";

export function getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageReadiness() {
  const snapshot = getStreamFoundationTargetPatchReviewHandoffControlledWriteApprovalPackageSnapshot();

  const handoffReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142J" &&
    snapshot.verification142J.ok === true &&
    snapshot.verification142J.expectedChecksPassed === 6 &&
    snapshot.verification142J.expectedChecksFailed === 0 &&
    snapshot.verification142J.targetUntouchedSafetyOk === true &&
    snapshot.verification142J.patchReviewSourceSafetyOk === true &&
    snapshot.verification142J.manifestSafetyOk === true &&
    snapshot.verification142J.tscExitCode === 0 &&
    snapshot.handoffItems.length === 6 &&
    snapshot.handoffItems.every((item) => item.routesRemainBlocked === true) &&
    snapshot.handoffItems.every((item) => item.targetWriteAllowedNow === false) &&
    snapshot.handoffItems.every((item) => item.routeBindingAllowedNow === false) &&
    snapshot.handoffItems.every((item) => item.runtimeSuccessAllowedNow === false);

  const approvalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore142L === true &&
    snapshot.nextApprovalPolicy.nextStageMayDetectExactTargetAndPrepareMinimalPatch === true &&
    snapshot.nextApprovalPolicy.nextStageMustPreserveBlocked423Behavior === true &&
    snapshot.requiredExactApprovalTextFor142L.includes("BACKEND-STREAM-FOUNDATION-142L") &&
    snapshot.requiredExactApprovalTextFor142L.includes("controlled target write preflight and patch draft only") &&
    snapshot.requiredExactApprovalTextFor142L.includes("preserving 423 blocked behavior") &&
    snapshot.requiredExactApprovalTextFor142L.includes("no runtime POST") &&
    snapshot.requiredExactApprovalTextFor142L.includes("no DB write") &&
    snapshot.requiredExactApprovalTextFor142L.includes("no provider call") &&
    snapshot.requiredExactApprovalTextFor142L.includes("no Wallet mutation") &&
    snapshot.requiredExactApprovalTextFor142L.includes("no fake success");

  const blockedNow =
    snapshot.nextApprovalPolicy.targetWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.routeBindingAllowedNow === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedNow === false &&
    snapshot.nextApprovalPolicy.backendRestartAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedNow === false &&
    snapshot.nextApprovalPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.databaseWriteAllowedNow === false &&
    snapshot.nextApprovalPolicy.providerCallAllowedNow === false &&
    snapshot.nextApprovalPolicy.walletMutationAllowedNow === false &&
    snapshot.nextApprovalPolicy.moneyMovementAllowedNow === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedNow === false &&
    snapshot.nextApprovalPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.totals.targetWriteAllowedNow === 0 &&
    snapshot.totals.routeBindingAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.backendRestartAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142K === true &&
    snapshot.safety.appTsChangeBy142K === false &&
    snapshot.safety.serverTsChangeBy142K === false &&
    snapshot.safety.streamIndexChangeBy142K === false &&
    snapshot.safety.liveWriteHandlerChangeBy142K === false &&
    snapshot.safety.schemaMigrationBy142K === false &&
    snapshot.safety.backendRestartBy142K === false &&
    snapshot.safety.runtimeHttpBy142K === false &&
    snapshot.safety.runtimePostBy142K === false &&
    snapshot.safety.databaseReadBy142K === false &&
    snapshot.safety.databaseWriteBy142K === false &&
    snapshot.safety.providerCallBy142K === false &&
    snapshot.safety.providerSecretReadBy142K === false &&
    snapshot.safety.walletMutationBy142K === false &&
    snapshot.safety.moneyMovementBy142K === false &&
    snapshot.safety.fakeSuccessBy142K === false;

  const ready = handoffReady && approvalReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "target_patch_review_handoff_ready_next_exact_approval_required" : "target_patch_review_handoff_blocked",
    handoffItems: snapshot.handoffItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142L controlled target write preflight and patch draft after exact approval",
  } as const;
}
