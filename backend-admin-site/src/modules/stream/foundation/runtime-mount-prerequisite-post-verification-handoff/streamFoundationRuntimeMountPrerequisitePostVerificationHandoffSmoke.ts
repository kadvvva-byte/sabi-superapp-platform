import { getStreamFoundationRuntimeMountPrerequisitePostVerificationHandoffSnapshot } from "./streamFoundationRuntimeMountPrerequisitePostVerificationHandoff";
import { getStreamFoundationRuntimeMountPrerequisitePostVerificationHandoffReadiness } from "./streamFoundationRuntimeMountPrerequisitePostVerificationHandoffReadiness";

export function runStreamFoundationRuntimeMountPrerequisitePostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRuntimeMountPrerequisitePostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRuntimeMountPrerequisitePostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143k_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143K.ok === true &&
        snapshot.verificationEvidence143K.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143K.tscExitCode === 0 &&
        snapshot.verificationEvidence143K.runtimeMountPerformed === 0 &&
        snapshot.verificationEvidence143K.routeBehaviorChangePerformed === 0 &&
        snapshot.verificationEvidence143K.rollbackExecutionPerformed === 0 &&
        snapshot.verificationEvidence143K.postMountSmokePerformed === 0 &&
        snapshot.verificationEvidence143K.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143K),
    },
    {
      id: "runtime_mount_prerequisite_artifacts_closed_clean",
      passed:
        snapshot.closedPrerequisiteArtifacts.length === 3 &&
        snapshot.closedPrerequisiteArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedPrerequisiteArtifacts.every((artifact) => artifact.runtimeMountPerformed === 0) &&
        snapshot.closedPrerequisiteArtifacts.every((artifact) => artifact.routeBehaviorChangePerformed === 0) &&
        snapshot.closedPrerequisiteArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedPrerequisiteArtifacts),
    },
    {
      id: "target_detection_plan_present_and_blocked",
      passed:
        snapshot.targetDetectionPlanningItems.length === 8 &&
        snapshot.targetDetectionPlanningItems.some((item) => item.area === "candidate_target_file_inventory") &&
        snapshot.targetDetectionPlanningItems.some((item) => item.area === "route_mount_marker_inventory") &&
        snapshot.targetDetectionPlanningItems.some((item) => item.area === "blocked_live_write_route_preservation") &&
        snapshot.targetDetectionPlanningItems.every((item) => item.targetFileWriteAllowedNow === false) &&
        snapshot.targetDetectionPlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.targetDetectionPlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.targetDetectionPlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143m_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143M.includes("BACKEND-STREAM-FOUNDATION-143M") &&
        snapshot.requiredExactApprovalTextFor143M.includes("target detection") &&
        snapshot.requiredExactApprovalTextFor143M.includes("without writing src/app.ts") &&
        snapshot.requiredExactApprovalTextFor143M.includes("without fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143M,
    },
    {
      id: "143l_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143L === false &&
        snapshot.safety.prismaSchemaChangeBy143L === false &&
        snapshot.safety.migrationCreatedBy143L === false &&
        snapshot.safety.runtimePostBy143L === false &&
        snapshot.safety.providerCallBy143L === false &&
        snapshot.safety.runtimeMountBy143L === false &&
        snapshot.safety.routeBehaviorChangeBy143L === false &&
        snapshot.safety.fakeSuccessBy143L === false,
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
    stage: "runtime_mount_prerequisite_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_prerequisite_post_verification_handoff_smoke_passed" : "runtime_mount_prerequisite_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
