import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePlanning";

export function getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSnapshot();

  const previousReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-143U" &&
    snapshot.postVerificationHandoffEvidence143U.targetDiffReviewPlanningClosed === true &&
    snapshot.postVerificationHandoffEvidence143U.closedTargetDiffReviewArtifacts === 2 &&
    snapshot.postVerificationHandoffEvidence143U.targetPatchReviewPackagePlanningAllowedNext === true &&
    snapshot.postVerificationHandoffEvidence143U.tscExitCode === 0 &&
    snapshot.postVerificationHandoffEvidence143U.sourceModificationPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.sourceTargetWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.runtimePostPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.runtimeMountPerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.routeBehaviorChangePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.targetRouteWritePerformed === 0 &&
    snapshot.postVerificationHandoffEvidence143U.fakeSuccessAllowed === false;

  const packageReviewReady =
    snapshot.targetPatchPackageReview.sourceOnlyContract === true &&
    snapshot.targetPatchPackageReview.candidateTargets.length === 6 &&
    snapshot.targetPatchPackageReview.requiredPackageSections.length === 9 &&
    snapshot.targetPatchPackageReview.targetPatchPackageCreatedNow === false &&
    snapshot.targetPatchPackageReview.proposedDiffAppliedNow === false &&
    snapshot.targetPatchPackageReview.targetWriteAllowedNow === false &&
    snapshot.targetPatchPackageReview.targetRouteWriteAllowedNow === false &&
    snapshot.targetPatchPackageReview.runtimeMountAllowedNow === false &&
    snapshot.targetPatchPackageReview.routeBehaviorChangeAllowedNow === false &&
    snapshot.targetPatchPackageReview.fakeSuccessAllowedNow === false &&
    snapshot.targetPatchPackageReview.candidateTargets.every((candidate) => candidate.currentWriteAllowed === false) &&
    snapshot.targetPatchPackageReview.candidateTargets.every((candidate) => candidate.targetPatchAllowedNow === false) &&
    snapshot.targetPatchPackageReview.candidateTargets.every((candidate) => candidate.targetRouteWriteAllowedNow === false);

  const gatesReady =
    snapshot.exactTargetCandidateSelection.selectedTargetNow === null &&
    snapshot.exactTargetCandidateSelection.targetPatchAllowedNow === false &&
    snapshot.exactInsertionMarkerReview.insertionMarkerSelectedNow === false &&
    snapshot.exactInsertionMarkerReview.markerWriteAllowedNow === false &&
    snapshot.duplicateMountRiskGate.duplicateMountAllowedNow === false &&
    snapshot.duplicateMountRiskGate.runtimeMountAllowedNow === false &&
    snapshot.authBoundaryPreservationGate.authBypassAllowedNow === false &&
    snapshot.authBoundaryPreservationGate.authRouteOrderChangeAllowedNow === false &&
    snapshot.blockedRoutePreservationGate.expectedStatusCodeBeforeMount === 423 &&
    snapshot.blockedRoutePreservationGate.liveWriteRoutesMustRemain423Blocked === true &&
    snapshot.blockedRoutePreservationGate.liveSuccessAllowedNow === false &&
    snapshot.blockedRoutePreservationGate.fakeSuccessAllowedNow === false &&
    snapshot.rollbackPackagePlan.rollbackPackageCreatedNow === false &&
    snapshot.rollbackPackagePlan.rollbackExecutionAllowedNow === false &&
    snapshot.compileGate.compileRunBy143VNow === false &&
    snapshot.compileGate.sourceModificationAllowedNow === false &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforePatchPackageBuild === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeTargetPatchWrite === true &&
    snapshot.ownerApprovalGate.exactOwnerApprovalRequiredBeforeRuntimeMount === true &&
    snapshot.ownerApprovalGate.patchPackageBuildAllowedNow === false &&
    snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
    snapshot.ownerApprovalGate.runtimeMountAllowedNow === false;

  const nextApprovalReady =
    snapshot.nextApprovalPolicy.exactApprovalRequiredBefore143W === true &&
    snapshot.nextApprovalPolicy.nextStageIsOpsOnlyCompileAndSafetyVerification === true &&
    snapshot.nextApprovalPolicy.sourceModificationAllowedFor143W === false &&
    snapshot.nextApprovalPolicy.runtimePostAllowedFor143W === false &&
    snapshot.nextApprovalPolicy.runtimeMountAllowedFor143W === false &&
    snapshot.nextApprovalPolicy.routeBehaviorChangeAllowedFor143W === false &&
    snapshot.nextApprovalPolicy.targetRouteWriteAllowedFor143W === false &&
    snapshot.nextApprovalPolicy.fakeSuccessAllowedFor143W === false &&
    snapshot.requiredExactApprovalTextFor143W.includes("BACKEND-STREAM-FOUNDATION-143W") &&
    snapshot.requiredExactApprovalTextFor143W.includes("compile and safety verification") &&
    snapshot.requiredExactApprovalTextFor143W.includes("no target route write") &&
    snapshot.requiredExactApprovalTextFor143W.includes("no fake success");

  const safetyReady =
    snapshot.safety.sourceOnly143V === true &&
    snapshot.safety.targetWriteBy143V === false &&
    snapshot.safety.appTsChangeBy143V === false &&
    snapshot.safety.serverTsChangeBy143V === false &&
    snapshot.safety.streamIndexChangeBy143V === false &&
    snapshot.safety.prismaSchemaChangeBy143V === false &&
    snapshot.safety.migrationCreatedBy143V === false &&
    snapshot.safety.routeBehaviorChangeBy143V === false &&
    snapshot.safety.backendRestartBy143V === false &&
    snapshot.safety.runtimePostBy143V === false &&
    snapshot.safety.providerCallBy143V === false &&
    snapshot.safety.runtimeMountBy143V === false &&
    snapshot.safety.targetRouteWriteBy143V === false &&
    snapshot.safety.fakeSuccessBy143V === false;

  const ready = previousReady && packageReviewReady && gatesReady && nextApprovalReady && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "runtime_mount_target_patch_review_package_planning_ready" : "runtime_mount_target_patch_review_package_planning_blocked",
    candidateTargets: snapshot.targetPatchPackageReview.candidateTargets.length,
    requiredPackageSections: snapshot.targetPatchPackageReview.requiredPackageSections.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-143W controlled runtime mount target patch review package planning compile and safety verification ops-only after exact approval",
  } as const;
}
