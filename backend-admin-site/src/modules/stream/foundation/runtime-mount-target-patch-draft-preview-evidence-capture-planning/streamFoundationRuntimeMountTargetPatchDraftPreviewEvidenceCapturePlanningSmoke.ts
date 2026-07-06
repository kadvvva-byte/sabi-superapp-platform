import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSnapshot } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanning";
import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness";

export function runStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchDraftPreviewEvidenceCapturePlanningReadiness();

  const assertions = [
    {
      id: "144d_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence144D.targetPatchDraftPreviewPackagePlanningClosed === true &&
        snapshot.postVerificationHandoffEvidence144D.tscExitCode === 0 &&
        snapshot.postVerificationHandoffEvidence144D.runtimeMountPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144D.routeBehaviorChangePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144D.targetRouteWritePerformed === 0 &&
        snapshot.postVerificationHandoffEvidence144D.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence144D),
    },
    {
      id: "evidence_capture_planning_contracts_present",
      passed:
        snapshot.targetFileSnapshotEvidenceCapture.capturePlanItems.length === 6 &&
        snapshot.targetHashPreview.sourceOnlyContract === true &&
        snapshot.targetExcerptCapture.sourceOnlyContract === true &&
        snapshot.insertionAnchorCapture.sourceOnlyContract === true &&
        snapshot.duplicateMountInventoryCapture.sourceOnlyContract === true &&
        snapshot.authBoundaryEvidenceCapture.sourceOnlyContract === true &&
        snapshot.blockedRouteEvidenceCapture.sourceOnlyContract === true &&
        snapshot.rollbackEvidenceCapture.sourceOnlyContract === true &&
        snapshot.compileGate.sourceOnlyContract === true &&
        snapshot.ownerApprovalGate.sourceOnlyContract === true,
      evidence: JSON.stringify(snapshot.targetFileSnapshotEvidenceCapture.capturePlanItems.map((item) => item.id)),
    },
    {
      id: "evidence_capture_actions_blocked_now",
      passed:
        snapshot.targetFileSnapshotEvidenceCapture.targetFileReadNow === false &&
        snapshot.targetFileSnapshotEvidenceCapture.targetSnapshotCapturedNow === false &&
        snapshot.targetHashPreview.targetHashPreviewCapturedNow === false &&
        snapshot.targetExcerptCapture.targetExcerptCapturedNow === false &&
        snapshot.insertionAnchorCapture.insertionAnchorCapturedNow === false &&
        snapshot.duplicateMountInventoryCapture.duplicateMountInventoryCapturedNow === false &&
        snapshot.authBoundaryEvidenceCapture.authBoundaryEvidenceCapturedNow === false &&
        snapshot.blockedRouteEvidenceCapture.blockedRouteEvidenceCapturedNow === false &&
        snapshot.blockedRouteEvidenceCapture.liveSuccessAllowedNow === false &&
        snapshot.rollbackEvidenceCapture.rollbackExecutionAllowedNow === false &&
        snapshot.ownerApprovalGate.evidenceCaptureRunnerAllowedNow === false &&
        snapshot.safety.fakeSuccessBy144E === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_144f_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144F.includes("BACKEND-STREAM-FOUNDATION-144F") &&
        snapshot.requiredExactApprovalTextFor144F.includes("compile and safety verification") &&
        snapshot.requiredExactApprovalTextFor144F.includes("no target route write") &&
        snapshot.requiredExactApprovalTextFor144F.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144F,
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
    stage: "runtime_mount_target_patch_draft_preview_evidence_capture_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_draft_preview_evidence_capture_planning_smoke_passed" : "runtime_mount_target_patch_draft_preview_evidence_capture_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
