import { getStreamFoundationRuntimeMountTargetDetectionPostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountTargetDetectionPostVerificationHandoff";
import { getStreamFoundationRuntimeMountTargetDetectionPostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountTargetDetectionPostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountTargetDetectionPostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountTargetDetectionPostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountTargetDetectionPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143o_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143O.ok === true &&
        snapshot.verificationEvidence143O.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143O.tscExitCode === 0 &&
        snapshot.verificationEvidence143O.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence143O.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence143O.targetRouteWritePerformed === 0 &&
        snapshot.verificationEvidence143O.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143O),
    },
    {
      id: "target_detection_artifacts_closed_clean",
      passed:
        snapshot.closedTargetDetectionArtifacts.length === 3 &&
        snapshot.closedTargetDetectionArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedTargetDetectionArtifacts.every((artifact) => artifact.targetRouteWritePerformed === 0) &&
        snapshot.closedTargetDetectionArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedTargetDetectionArtifacts),
    },
    {
      id: "target_inspection_plan_ready_but_blocked",
      passed:
        snapshot.targetInspectionPlanningItems.length === 8 &&
        snapshot.targetInspectionPlanningItems.some((item) => item.area === "candidate_target_file_inspection") &&
        snapshot.targetInspectionPlanningItems.some((item) => item.area === "blocked_live_write_route_preservation_inspection") &&
        snapshot.targetInspectionPlanningItems.every((item) => item.sourceModificationAllowedNow === false) &&
        snapshot.targetInspectionPlanningItems.every((item) => item.targetRouteWriteAllowedNow === false) &&
        snapshot.targetInspectionPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.targetInspectionPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143q_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143Q.includes("BACKEND-STREAM-FOUNDATION-143Q") &&
        snapshot.requiredExactApprovalTextFor143Q.includes("target inspection") &&
        snapshot.requiredExactApprovalTextFor143Q.includes("do not modify source") &&
        snapshot.requiredExactApprovalTextFor143Q.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143Q,
    },
    {
      id: "143p_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143P === false &&
        snapshot.safety.streamIndexChangeBy143P === false &&
        snapshot.safety.runtimeMountBy143P === false &&
        snapshot.safety.targetRouteWriteBy143P === false &&
        snapshot.safety.fakeSuccessBy143P === false,
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
    stage: "runtime_mount_target_detection_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_target_detection_post_verification_handoff_smoke_passed" : "runtime_mount_target_detection_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
