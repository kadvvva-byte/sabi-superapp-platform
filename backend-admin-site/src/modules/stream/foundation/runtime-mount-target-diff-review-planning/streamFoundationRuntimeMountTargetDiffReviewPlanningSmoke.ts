import { getStreamFoundationRuntimeMountTargetDiffReviewPlanningSnapshot } from "./streamFoundationRuntimeMountTargetDiffReviewPlanning";
import { getStreamFoundationRuntimeMountTargetDiffReviewPlanningReadiness } from "./streamFoundationRuntimeMountTargetDiffReviewPlanningReadiness";

export function runStreamFoundationRuntimeMountTargetDiffReviewPlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetDiffReviewPlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetDiffReviewPlanningReadiness();

  const assertions = [
    {
      id: "143r_handoff_evidence_preserved",
      passed:
        snapshot.postRunHandoffEvidence143R.targetInspectionClosed === true &&
        snapshot.postRunHandoffEvidence143R.tscExitCode === 0 &&
        snapshot.postRunHandoffEvidence143R.runtimeMountPerformed === 0 &&
        snapshot.postRunHandoffEvidence143R.routeBehaviorChangePerformed === 0 &&
        snapshot.postRunHandoffEvidence143R.targetRouteWritePerformed === 0 &&
        snapshot.postRunHandoffEvidence143R.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postRunHandoffEvidence143R),
    },
    {
      id: "diff_review_contracts_present",
      passed:
        snapshot.targetDiffReview.targetCandidates.length === 6 &&
        snapshot.targetDiffReview.requiredReviewItems.length === 8 &&
        snapshot.exactInsertionMarkerPlanning.sourceOnlyContract === true &&
        snapshot.duplicateMountRiskReview.sourceOnlyContract === true &&
        snapshot.authBoundaryPreservation.sourceOnlyContract === true &&
        snapshot.blockedRoutePreservation.sourceOnlyContract === true &&
        snapshot.rollbackPlan.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.targetDiffReview.requiredReviewItems),
    },
    {
      id: "diff_review_actions_blocked_now",
      passed:
        snapshot.targetDiffReview.diffAppliedNow === false &&
        snapshot.targetDiffReview.targetRouteWriteAllowedNow === false &&
        snapshot.targetDiffReview.runtimeMountAllowedNow === false &&
        snapshot.blockedRoutePreservation.liveSuccessAllowedNow === false &&
        snapshot.rollbackPlan.rollbackExecutionAllowedNow === false &&
        snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
        snapshot.ownerApprovalGate.runtimeMountAllowedNow === false &&
        snapshot.safety.fakeSuccessBy143S === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_143t_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143T.includes("BACKEND-STREAM-FOUNDATION-143T") &&
        snapshot.requiredExactApprovalTextFor143T.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor143T.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor143T.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143T,
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
    stage: "runtime_mount_target_diff_review_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_diff_review_planning_smoke_passed" : "runtime_mount_target_diff_review_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
