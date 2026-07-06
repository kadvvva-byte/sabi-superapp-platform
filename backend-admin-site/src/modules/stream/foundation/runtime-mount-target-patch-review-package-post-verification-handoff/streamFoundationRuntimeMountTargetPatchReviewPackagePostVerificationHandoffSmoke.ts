import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoff";
import { getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetPatchReviewPackagePostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143w_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143W.ok === true &&
        snapshot.verificationEvidence143W.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143W.tscExitCode === 0 &&
        snapshot.verificationEvidence143W.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence143W.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence143W.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence143W.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143W),
    },
    {
      id: "patch_review_artifacts_closed_clean",
      passed:
        snapshot.closedPatchReviewArtifacts.length === 2 &&
        snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedPatchReviewArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedPatchReviewArtifacts.map((artifact) => artifact.artifact)),
    },
    {
      id: "draft_planning_ready_but_blocked",
      passed:
        snapshot.targetPatchPackageDraftPlanningItems.length === 10 &&
        snapshot.targetPatchPackageDraftPlanningItems.some((item) => item.area === "target_patch_package_draft_preview") &&
        snapshot.targetPatchPackageDraftPlanningItems.some((item) => item.area === "owner_approval_gate") &&
        snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.draftPackageCreatedNow === false) &&
        snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
        snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.targetPatchPackageDraftPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.targetPatchPackageDraftPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143y_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143Y.includes("BACKEND-STREAM-FOUNDATION-143Y") &&
        snapshot.requiredExactApprovalTextFor143Y.includes("target patch package draft") &&
        snapshot.requiredExactApprovalTextFor143Y.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor143Y.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143Y,
    },
    {
      id: "143x_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143X === false &&
        snapshot.safety.streamIndexChangeBy143X === false &&
        snapshot.safety.runtimeMountBy143X === false &&
        snapshot.safety.targetRouteWriteBy143X === false &&
        snapshot.safety.fakeSuccessBy143X === false,
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
    stage: "runtime_mount_target_patch_review_package_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_patch_review_package_post_verification_handoff_smoke_passed" : "runtime_mount_target_patch_review_package_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
