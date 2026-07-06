import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoff";
import { getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchDraftPreviewPackagePostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "144c_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence144C.ok === true &&
        snapshot.verificationEvidence144C.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence144C.tscExitCode === 0 &&
        snapshot.verificationEvidence144C.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence144C.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence144C.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence144C.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence144C),
    },
    {
      id: "preview_package_planning_artifacts_closed_clean",
      passed:
        snapshot.closedPreviewPackagePlanningArtifacts.length === 2 &&
        snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedPreviewPackagePlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedPreviewPackagePlanningArtifacts.map((artifact) => artifact.artifact)),
    },
    {
      id: "evidence_capture_planning_ready_but_blocked",
      passed:
        snapshot.evidenceCapturePlanningItems.length === 10 &&
        snapshot.evidenceCapturePlanningItems.some((item) => item.area === "target_file_snapshot_evidence_capture") &&
        snapshot.evidenceCapturePlanningItems.some((item) => item.area === "owner_approval_gate") &&
        snapshot.evidenceCapturePlanningItems.every((item) => item.evidenceCapturedNow === false) &&
        snapshot.evidenceCapturePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
        snapshot.evidenceCapturePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.evidenceCapturePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.evidenceCapturePlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.evidenceCapturePlanningItems.map((item) => item.area)),
    },
    {
      id: "next_144e_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144E.includes("BACKEND-STREAM-FOUNDATION-144E") &&
        snapshot.requiredExactApprovalTextFor144E.includes("evidence capture planning") &&
        snapshot.requiredExactApprovalTextFor144E.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor144E.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144E,
    },
    {
      id: "144d_safety_clean",
      passed:
        snapshot.safety.targetWriteBy144D === false &&
        snapshot.safety.streamIndexChangeBy144D === false &&
        snapshot.safety.runtimeMountBy144D === false &&
        snapshot.safety.targetRouteWriteBy144D === false &&
        snapshot.safety.fakeSuccessBy144D === false,
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
    stage: "runtime_mount_target_patch_draft_preview_package_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_draft_preview_package_post_verification_handoff_smoke_passed" : "runtime_mount_target_patch_draft_preview_package_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
