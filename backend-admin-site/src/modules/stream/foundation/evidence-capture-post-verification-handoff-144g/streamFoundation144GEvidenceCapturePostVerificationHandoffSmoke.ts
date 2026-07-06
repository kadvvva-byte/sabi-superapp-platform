import { getStreamFoundation144GEvidenceCapturePostVerificationHandoffSnapshot } from "./streamFoundation144GEvidenceCapturePostVerificationHandoff";
import { getStreamFoundation144GEvidenceCapturePostVerificationHandoffReadiness } from "./streamFoundation144GEvidenceCapturePostVerificationHandoffReadiness";

export function runStreamFoundation144GEvidenceCapturePostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundation144GEvidenceCapturePostVerificationHandoffSnapshot();
  const readiness = getStreamFoundation144GEvidenceCapturePostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "144f_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence144F.ok === true &&
        snapshot.verificationEvidence144F.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence144F.tscExitCode === 0 &&
        snapshot.verificationEvidence144F.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence144F.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence144F.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence144F.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence144F),
    },
    {
      id: "evidence_capture_planning_artifacts_closed_clean",
      passed:
        snapshot.closedEvidenceCapturePlanningArtifacts.length === 2 &&
        snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedEvidenceCapturePlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedEvidenceCapturePlanningArtifacts.map((artifact) => artifact.artifact)),
    },
    {
      id: "runner_approval_package_ready_but_blocked",
      passed:
        snapshot.runnerApprovalPlanningItems.length === 10 &&
        snapshot.runnerApprovalPlanningItems.some((item) => item.area === "ops_only_evidence_capture_runner_package") &&
        snapshot.runnerApprovalPlanningItems.some((item) => item.area === "owner_approval_gate") &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.runnerPackageCreatedNow === false) &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.evidenceCapturedNow === false) &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.targetFileReadAllowedNow === false) &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.runnerApprovalPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.runnerApprovalPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_144h_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144H.includes("BACKEND-STREAM-FOUNDATION-144H") &&
        snapshot.requiredExactApprovalTextFor144H.includes("evidence capture runner approval package") &&
        snapshot.requiredExactApprovalTextFor144H.includes("without source target writes") &&
        snapshot.requiredExactApprovalTextFor144H.includes("without fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144H,
    },
    {
      id: "144g_safety_clean",
      passed:
        snapshot.safety.targetWriteBy144G === false &&
        snapshot.safety.streamIndexChangeBy144G === false &&
        snapshot.safety.runtimeMountBy144G === false &&
        snapshot.safety.targetRouteWriteBy144G === false &&
        snapshot.safety.targetFileReadBy144G === false &&
        snapshot.safety.fakeSuccessBy144G === false,
      evidence: JSON.stringify(snapshot.safety),
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
    stage: "runtime_mount_target_patch_draft_preview_evidence_capture_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_draft_preview_evidence_capture_post_verification_handoff_smoke_passed" : "runtime_mount_target_patch_draft_preview_evidence_capture_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
