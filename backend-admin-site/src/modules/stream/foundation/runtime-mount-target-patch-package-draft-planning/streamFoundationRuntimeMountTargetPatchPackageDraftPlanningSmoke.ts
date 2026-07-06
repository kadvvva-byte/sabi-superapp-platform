import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPlanning";
import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness";

export function runStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchPackageDraftPlanningReadiness();

  const assertions = [
    {
      id: "143x_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence143X.targetPatchReviewPackagePlanningClosed === true &&
        snapshot.postVerificationHandoffEvidence143X.tscExitCode === 0 &&
        snapshot.postVerificationHandoffEvidence143X.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143X.routeBehaviorChangePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143X.targetRouteWritePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143X.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence143X),
    },
    {
      id: "draft_planning_contracts_present",
      passed:
        snapshot.draftPreview.draftSections.length === 9 &&
        snapshot.selectedTargetCandidateProposal.candidates.length === 6 &&
        snapshot.proposedDiffPreviewPlan.sourceOnlyContract === true &&
        snapshot.insertionMarkerConfirmationPlan.sourceOnlyContract === true &&
        snapshot.duplicateMountRiskEvidencePlan.sourceOnlyContract === true &&
        snapshot.authBoundaryPreservationPlan.sourceOnlyContract === true &&
        snapshot.blockedRoutePreservationPlan.sourceOnlyContract === true &&
        snapshot.rollbackPreviewPlan.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.draftPreview.draftSections),
    },
    {
      id: "draft_planning_actions_blocked_now",
      passed:
        snapshot.draftPreview.draftPackageCreatedNow === false &&
        snapshot.draftPreview.proposedDiffRenderedNow === false &&
        snapshot.draftPreview.proposedDiffAppliedNow === false &&
        snapshot.selectedTargetCandidateProposal.finalSelectedTargetNow === null &&
        snapshot.proposedDiffPreviewPlan.proposedDiffAppliedNow === false &&
        snapshot.blockedRoutePreservationPlan.liveSuccessAllowedNow === false &&
        snapshot.rollbackPreviewPlan.rollbackExecutionAllowedNow === false &&
        snapshot.ownerApprovalGate.draftPackageBuildAllowedNow === false &&
        snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
        snapshot.ownerApprovalGate.runtimeMountAllowedNow === false &&
        snapshot.safety.fakeSuccessBy143Y === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_143z_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143Z.includes("BACKEND-STREAM-FOUNDATION-143Z") &&
        snapshot.requiredExactApprovalTextFor143Z.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor143Z.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor143Z.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143Z,
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
    stage: "runtime_mount_target_patch_package_draft_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_package_draft_planning_smoke_passed" : "runtime_mount_target_patch_package_draft_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
