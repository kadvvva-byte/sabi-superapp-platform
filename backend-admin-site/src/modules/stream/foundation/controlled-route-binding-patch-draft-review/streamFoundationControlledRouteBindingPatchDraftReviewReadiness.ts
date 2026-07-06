import { getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot } from "./streamFoundationControlledRouteBindingPatchDraftReview";

export function getStreamFoundationControlledRouteBindingPatchDraftReviewReadiness() {
  const snapshot = getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot();

  const draftReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141C" &&
    snapshot.approvalPackageReady === true &&
    snapshot.draftReviewItems.length === 3 &&
    snapshot.draftReviewItems.every((item) => item.draftReviewReady === true) &&
    snapshot.draftReviewItems.every((item) => item.actualTargetWriteNow === false);

  const blockedNow =
    snapshot.draftReviewItems.every((item) => item.routeMountNow === false) &&
    snapshot.draftReviewItems.every((item) => item.runtimePostNow === false) &&
    snapshot.draftReviewItems.every((item) => item.backendRestartNow === false) &&
    snapshot.draftReviewItems.every((item) => item.databaseWriteNow === false) &&
    snapshot.draftReviewItems.every((item) => item.providerCallNow === false) &&
    snapshot.draftReviewItems.every((item) => item.walletMutationNow === false) &&
    snapshot.draftReviewItems.every((item) => item.moneyMovementNow === false) &&
    snapshot.draftReviewItems.every((item) => item.fakeSuccessNow === false);

  const safetyReady =
    snapshot.safety.sourceOnly === true &&
    snapshot.safety.appTsChange === false &&
    snapshot.safety.serverTsChange === false &&
    snapshot.safety.streamIndexChange === false &&
    snapshot.safety.routeMountNow === false &&
    snapshot.safety.runtimeHttpBy141D === false &&
    snapshot.safety.runtimePostBy141D === false &&
    snapshot.safety.backendRestart === false &&
    snapshot.safety.databaseWrite === false &&
    snapshot.safety.providerCall === false &&
    snapshot.safety.walletMutation === false &&
    snapshot.safety.moneyMovement === false &&
    snapshot.safety.fakeSuccess === false;

  const ready = draftReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "route_binding_patch_draft_review_ready_no_target_write" : "route_binding_patch_draft_review_blocked",
    draftReviewItems: snapshot.totals.draftReviewItems,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141E exact target detection for future binding patch",
  } as const;
}
