import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoff";
import { getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchPackageDraftPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143z_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143Z.ok === true &&
        snapshot.verificationEvidence143Z.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143Z.tscExitCode === 0 &&
        snapshot.verificationEvidence143Z.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence143Z.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence143Z.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence143Z.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143Z),
    },
    {
      id: "draft_planning_artifacts_closed_clean",
      passed:
        snapshot.closedDraftPlanningArtifacts.length === 2 &&
        snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedDraftPlanningArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedDraftPlanningArtifacts.map((artifact) => artifact.artifact)),
    },
    {
      id: "preview_package_planning_ready_but_blocked",
      passed:
        snapshot.draftPreviewPackagePlanningItems.length === 10 &&
        snapshot.draftPreviewPackagePlanningItems.some((item) => item.area === "target_patch_draft_preview_package") &&
        snapshot.draftPreviewPackagePlanningItems.some((item) => item.area === "owner_approval_gate") &&
        snapshot.draftPreviewPackagePlanningItems.every((item) => item.previewPackageCreatedNow === false) &&
        snapshot.draftPreviewPackagePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
        snapshot.draftPreviewPackagePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.draftPreviewPackagePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.draftPreviewPackagePlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.draftPreviewPackagePlanningItems.map((item) => item.area)),
    },
    {
      id: "next_144b_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144B.includes("BACKEND-STREAM-FOUNDATION-144B") &&
        snapshot.requiredExactApprovalTextFor144B.includes("target patch draft preview package") &&
        snapshot.requiredExactApprovalTextFor144B.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor144B.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144B,
    },
    {
      id: "144a_safety_clean",
      passed:
        snapshot.safety.targetWriteBy144A === false &&
        snapshot.safety.streamIndexChangeBy144A === false &&
        snapshot.safety.runtimeMountBy144A === false &&
        snapshot.safety.targetRouteWriteBy144A === false &&
        snapshot.safety.fakeSuccessBy144A === false,
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
    stage: "runtime_mount_target_patch_package_draft_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_package_draft_post_verification_handoff_smoke_passed" : "runtime_mount_target_patch_package_draft_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
