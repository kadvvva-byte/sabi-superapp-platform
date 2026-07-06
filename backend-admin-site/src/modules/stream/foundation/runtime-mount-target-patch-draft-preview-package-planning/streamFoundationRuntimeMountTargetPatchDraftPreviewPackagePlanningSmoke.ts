import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanning";
import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness";

export function runStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePlanningReadiness();

  const assertions = [
    {
      id: "144a_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence144A.targetPatchPackageDraftPlanningClosed === true &&
        snapshot.postVerificationHandoffEvidence144A.tscExitCode === 0 &&
        snapshot.postVerificationHandoffEvidence144A.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144A.routeBehaviorChangePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144A.targetRouteWritePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144A.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence144A),
    },
    {
      id: "draft_preview_package_contracts_present",
      passed:
        snapshot.previewPackage.previewPackageSections.length === 9 &&
        snapshot.proposedTargetFileSnapshot.snapshotItems.length === 6 &&
        snapshot.proposedDiffPreviewText.sourceOnlyContract === true &&
        snapshot.insertionMarkerEvidence.sourceOnlyContract === true &&
        snapshot.duplicateMountEvidence.sourceOnlyContract === true &&
        snapshot.authBoundaryEvidence.sourceOnlyContract === true &&
        snapshot.blockedRouteEvidence.sourceOnlyContract === true &&
        snapshot.rollbackPreview.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.previewPackage.previewPackageSections),
    },
    {
      id: "draft_preview_actions_blocked_now",
      passed:
        snapshot.previewPackage.previewPackageCreatedNow === false &&
        snapshot.previewPackage.previewPackageRenderedNow === false &&
        snapshot.previewPackage.proposedDiffAppliedNow === false &&
        snapshot.proposedTargetFileSnapshot.targetSnapshotReadNow === false &&
        snapshot.proposedTargetFileSnapshot.finalSelectedTargetNow === null &&
        snapshot.proposedDiffPreviewText.diffPreviewTextGeneratedNow === false &&
        snapshot.blockedRouteEvidence.liveSuccessAllowedNow === false &&
        snapshot.rollbackPreview.rollbackExecutionAllowedNow === false &&
        snapshot.ownerApprovalGate.previewPackageBuildAllowedNow === false &&
        snapshot.ownerApprovalGate.targetPatchAllowedNow === false &&
        snapshot.ownerApprovalGate.runtimeMountAllowedNow === false &&
        snapshot.safety.fakeSuccessBy144B === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_144c_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144C.includes("BACKEND-STREAM-FOUNDATION-144C") &&
        snapshot.requiredExactApprovalTextFor144C.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor144C.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor144C.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144C,
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
    stage: "runtime_mount_target_patch_draft_preview_package_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_draft_preview_package_planning_smoke_passed" : "runtime_mount_target_patch_draft_preview_package_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
