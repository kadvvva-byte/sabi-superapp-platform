import { getStreamFoundationControlledTargetPatchDraftReviewSourceOnlySnapshot } from "./streamFoundationControlledTargetPatchDraftReviewSourceOnly";

export function getStreamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness() {
  const snapshot = getStreamFoundationControlledTargetPatchDraftReviewSourceOnlySnapshot();

  const reviewReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-142H" &&
    snapshot.ownerApprovalAccepted === true &&
    snapshot.ownerApprovalText.includes("BACKEND-STREAM-FOUNDATION-142I") &&
    snapshot.ownerApprovalText.includes("controlled target patch draft review source-only only") &&
    snapshot.futurePatchReviewItems.length === 6 &&
    snapshot.futurePatchReviewItems.every((item) => item.targetWriteAllowedNow === false) &&
    snapshot.futurePatchReviewItems.every((item) => item.routeBindingAllowedNow === false) &&
    snapshot.futurePatchReviewItems.every((item) => item.routeBehaviorChangeAllowedNow === false);

  const blockedNow =
    snapshot.targetPatchPolicy.draftReviewOnly === true &&
    snapshot.targetPatchPolicy.futureTargetPatchRequiresNewExactApproval === true &&
    snapshot.targetPatchPolicy.currentRoutesRemainBlockedNow === true &&
    snapshot.targetPatchPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.targetPatchPolicy.appTsWriteAllowedNow === false &&
    snapshot.targetPatchPolicy.serverTsWriteAllowedNow === false &&
    snapshot.targetPatchPolicy.streamIndexWriteAllowedNow === false &&
    snapshot.targetPatchPolicy.liveWriteHandlerChangeAllowedNow === false &&
    snapshot.targetPatchPolicy.routeBindingAllowedNow === false &&
    snapshot.targetPatchPolicy.routeBehaviorChangeAllowedNow === false &&
    snapshot.targetPatchPolicy.runtimePostAllowedNow === false &&
    snapshot.targetPatchPolicy.runtimeSuccessAllowedNow === false &&
    snapshot.targetPatchPolicy.databaseWriteAllowedNow === false &&
    snapshot.targetPatchPolicy.providerCallAllowedNow === false &&
    snapshot.targetPatchPolicy.walletMutationAllowedNow === false &&
    snapshot.targetPatchPolicy.moneyMovementAllowedNow === false &&
    snapshot.targetPatchPolicy.fakeSuccessAllowedNow === false &&
    snapshot.totals.targetWriteAllowedNow === 0 &&
    snapshot.totals.routeBindingAllowedNow === 0 &&
    snapshot.totals.routeBehaviorChangeAllowedNow === 0 &&
    snapshot.totals.runtimePostAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly142I === true &&
    snapshot.safety.appTsChangeBy142I === false &&
    snapshot.safety.serverTsChangeBy142I === false &&
    snapshot.safety.streamIndexChangeBy142I === false &&
    snapshot.safety.liveWriteHandlerChangeBy142I === false &&
    snapshot.safety.schemaMigrationBy142I === false &&
    snapshot.safety.backendRestartBy142I === false &&
    snapshot.safety.runtimeHttpBy142I === false &&
    snapshot.safety.runtimePostBy142I === false &&
    snapshot.safety.databaseReadBy142I === false &&
    snapshot.safety.databaseWriteBy142I === false &&
    snapshot.safety.providerCallBy142I === false &&
    snapshot.safety.providerSecretReadBy142I === false &&
    snapshot.safety.walletMutationBy142I === false &&
    snapshot.safety.moneyMovementBy142I === false &&
    snapshot.safety.fakeSuccessBy142I === false;

  const ready = reviewReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "target_patch_draft_review_source_only_ready_no_target_write" : "target_patch_draft_review_source_only_blocked",
    futurePatchReviewItems: snapshot.futurePatchReviewItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-142J target patch draft review compile and target untouched verification",
  } as const;
}
