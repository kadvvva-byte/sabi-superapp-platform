import { getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoff";
import { getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetDiffReviewPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143t_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143T.ok === true &&
        snapshot.verificationEvidence143T.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143T.tscExitCode === 0 &&
        snapshot.verificationEvidence143T.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence143T.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence143T.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence143T.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143T),
    },
    {
      id: "target_diff_review_artifacts_closed_clean",
      passed:
        snapshot.closedTargetDiffReviewArtifacts.length === 2 &&
        snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedTargetDiffReviewArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedTargetDiffReviewArtifacts.map((artifact) => artifact.artifact)),
    },
    {
      id: "patch_review_package_planning_ready_but_blocked",
      passed:
        snapshot.patchReviewPackagePlanningItems.length === 9 &&
        snapshot.patchReviewPackagePlanningItems.some((item) => item.area === "target_patch_package_review") &&
        snapshot.patchReviewPackagePlanningItems.some((item) => item.area === "owner_approval_gate") &&
        snapshot.patchReviewPackagePlanningItems.every((item) => item.targetPatchAllowedNow === false) &&
        snapshot.patchReviewPackagePlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.patchReviewPackagePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.patchReviewPackagePlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.patchReviewPackagePlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143v_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143V.includes("BACKEND-STREAM-FOUNDATION-143V") &&
        snapshot.requiredExactApprovalTextFor143V.includes("target patch review package") &&
        snapshot.requiredExactApprovalTextFor143V.includes("do not write src/app.ts") &&
        snapshot.requiredExactApprovalTextFor143V.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143V,
    },
    {
      id: "143u_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143U === false &&
        snapshot.safety.streamIndexChangeBy143U === false &&
        snapshot.safety.runtimeMountBy143U === false &&
        snapshot.safety.targetRouteWriteBy143U === false &&
        snapshot.safety.fakeSuccessBy143U === false,
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
    stage: "runtime_mount_target_diff_review_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_diff_review_post_verification_handoff_smoke_passed" : "runtime_mount_target_diff_review_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
