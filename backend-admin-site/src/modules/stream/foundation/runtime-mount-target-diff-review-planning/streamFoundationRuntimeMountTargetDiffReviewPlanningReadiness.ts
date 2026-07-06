import { getStreamFoundationRuntimeMountTargetDiffReviewPlanningSnapshot } from "./streamFoundationRuntimeMountTargetDiffReviewPlanning";

export function getStreamFoundationRuntimeMountTargetDiffReviewPlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetDiffReviewPlanningSnapshot();

  const previousReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143R" &&
    snapshot.postRunHandoffEvidence143R.targetInspectionClosed === true &&
    snapshot.postRunHandoffEvidence143R.targetDiffReviewPlanningAllowedNext === true &&
    snapshot.postRunHandoffEvidence143R.tscExitCode === 0 &&
    snapshot.postRunHandoffEvidence143R.sourceModificationPerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.sourceTargetWritePerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.runtimePostPerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.runtimeMountPerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.routeBehaviorChangePerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.targetRouteWritePerformed === 0 &&
    snapshot.postRunHandoffEvidence143R.fakeSuccessAllowed === false;

  const diffReviewReady =
    snapshot.targetDiffReview.sourceOnlyContract === true &&
    snapshot.targetDiffReview.targetCandidates.length === 6 &&
    snapshot.targetDiffReview.requiredReviewItems.length === 8 &&
    snapshot.targetDiffReview.diffAppliedNow === false &&
    snapshot.targetDiffReview.targetWriteAllowedNow === false &&
    snapshot.targetDiffReview.targetRouteWriteAllowedNow === false &&
    snapshot.targetDiffReview.runtimeMountAllowedNow === false &&
    snapshot.targetDiffReview.routeBehaviorChangeAllowedNow === false &&
    snapshot.targetDiffReview.fakeSuccessAllowedNow === false &&
    snapshot.targetDiffReview.targetCandidates.every((candidate) => candidate.sourceOnlyNow === true) &&
    snapshot.targetDiffReview.targetCandidates.every((candidate) => candidate.actualPatchAllowedNow === false) &&
    snapshot.targetDiffReview.targetCandidates.every((candidate) => candidate.targetRouteWriteAllowedNow === false);

  const contractsReady =
    snapshot.exactInsertionMarkerPlanning.markerWriteAllowedNow === false &&
    snapshot.exactInsertionMarkerPlanning.runtimeMountAllowedNow === false &&
    snapshot.duplicateMountRiskReview.duplicateMountAllowedNow === false &&
    snapshot.duplicateMountRiskReview.runtimeMountAllowedNow === false &&
    snapshot.authBoundaryPreservation.authBypassAllowedNow === false &&
    snapshot.authBoundaryPreservation.authRouteOrderChangeAllowedNow === false &&
    snapshot.blockedRoutePreservation.expectedStatusCodeBeforeMount === 423 &&
    snapshot.blockedRoutePreservation.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.blockedRoutePreservation.liveSuccessAllowedNow === false &&
    snapshot.blockedRoutePreservation.fakeSuccessAllowedNow === false &&
    snapshot.rollbackPlan.rollbackExecutionAllowedNow === false &&
    snapshot.rollbackPlan.targetWriteAllowedNow === false &&
    snapshot.compileGate.compileRunBy143SNow === false &&
    snapshot.compileGate.sourceModificationAllowedNow === false &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeTargetPatch === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeRuntimeMount === true &&
    snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
    snapshot.ownerApprovalGate.runtimeMountAllowedNow === false;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143T === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyCompileAndSafetyVerification === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor143T === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor143T === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143T === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143T === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143T === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143T === false &&
    snapshot.requiredExactApprovalTextFor143T.includes("BACKEND-STREAM-FOUNDATION-143T") &&
    snapshot.requiredExactApprovalTextFor143T.includes("compile and safety verification") &&
    snapshot.requiredExactApprovalTextFor143T.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor143T.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143S === true &&
    snapshot.safety.targetWriteBy143S === false &&
    snapshot.safety.appTsChangeBy143S === false &&
    snapshot.safety.serverTsChangeBy143S === false &&
    snapshot.safety.streamIndexChangeBy143S === false &&
    snapshot.safety.prismaSchemaChangeBy143S === false &&
    snapshot.safety.migrationCreatedBy143S === false &&
    snapshot.safety.routeBehaviorChangeBy143S === false &&
    snapshot.safety.backendRestartBy143S === false &&
    snapshot.safety.runtimePostBy143S === false &&
    snapshot.safety.providerCallBy143S === false &&
    snapshot.safety.runtimeMountBy143S === false &&
    snapshot.safety.targetRouteWriteBy143S === false &&
    snapshot.safety.fakeSuccessBy143S === false;

  const ready = previousReady && diffReviewReady && contractsReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_diff_review_planning_ready" : "runtime_mount_target_diff_review_planning_blocked",
    targetCandidates: snapshot.targetDiffReview.targetCandidates.length,
    requiredReviewItems: snapshot.targetDiffReview.requiredReviewItems.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143T controlled runtime mount target diff review planning compile and safety verification ops-only after exact approval",
  } as const;
}
