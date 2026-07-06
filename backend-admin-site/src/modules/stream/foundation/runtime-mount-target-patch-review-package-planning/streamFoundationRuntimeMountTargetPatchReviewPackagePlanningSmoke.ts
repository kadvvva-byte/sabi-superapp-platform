import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePlanning";
import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness";

export function runStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchReviewPackagePlanningReadiness();

  const assertions = [
    {
      id: "143u_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence143U.targetDiffReviewPlanningClosed === true &&
        snapshot.postVerificationHandoffEvidence143U.tscExitCode === 0 &&
        snapshot.postVerificationHandoffEvidence143U.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143U.routeBehaviorChangePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143U.targetRouteWritePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143U.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence143U),
    },
    {
      id: "patch_review_package_contracts_present",
      passed:
        snapshot.targetPatchPackageReview.candidateTargets.length === 6 &&
        snapshot.targetPatchPackageReview.requiredPackageSections.length === 9 &&
        snapshot.exactTargetCandidateSelection.sourceOnlyContract === true &&
        snapshot.exactInsertionMarkerReview.sourceOnlyContract === true &&
        snapshot.duplicateMountRiskGate.sourceOnlyContract === true &&
        snapshot.authBoundaryPreservationGate.sourceOnlyContract === true &&
        snapshot.blockedRoutePreservationGate.sourceOnlyContract === true &&
        snapshot.rollbackPackagePlan.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.targetPatchPackageReview.requiredPackageSections),
    },
    {
      id: "patch_review_actions_blocked_now",
      passed:
        snapshot.targetPatchPackageReview.targetPatchPackageCreatedNow === false &&
        snapshot.targetPatchPackageReview.proposedDiffAppliedNow === false &&
        snapshot.targetPatchPackageReview.targetRouteWriteAllowedNow === false &&
        snapshot.targetPatchPackageReview.runtimeMountAllowedNow === false &&
        snapshot.blockedRoutePreservationGate.liveSuccessAllowedNow === false &&
        snapshot.rollbackPackagePlan.rollbackExecutionAllowedNow === false &&
        snapshot.ownerApprovalGate.patchPackageBuildAllowedNow === false &&
        snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
        snapshot.ownerApprovalGate.runtimeMountAllowedNow === false &&
        snapshot.safety.fakeSuccessBy143V === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_143w_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143W.includes("BACKEND-STREAM-FOUNDATION-143W") &&
        snapshot.requiredExactApprovalTextFor143W.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor143W.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor143W.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143W,
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "runtime_mount_target_patch_review_package_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_review_package_planning_smoke_passed" : "runtime_mount_target_patch_review_package_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
