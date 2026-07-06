import { getStreamFoundationRuntimeMountPrerequisitePlanningSnapshot } from "./streamFoundationRuntimeMountPrerequisitePlanning";
import { getStreamFoundationRuntimeMountPrerequisitePlanningReadiness } from "./streamFoundationRuntimeMountPrerequisitePlanningReadiness";

export function runStreamFoundationRuntimeMountPrerequisitePlanningSmoke() {
  const snapshot = getStreamFoundationRuntimeMountPrerequisitePlanningSnapshot();
  const readiness = getStreamFoundationRuntimeMountPrerequisitePlanningReadiness();

  const assertions = [
    {
      id: "143h_handoff_evidence_preserved",
      passed:
        snapshot.postVerificationHandoffEvidence143H.providerRealtimeModerationContractsClosed === true &&
        snapshot.postVerificationHandoffEvidence143H.closedGateArtifacts === 3 &&
        snapshot.postVerificationHandoffEvidence143H.providerCallPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143H.providerSecretReadPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143H.realtimeSocketOpenPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143H.moderationBypassPerformed === 0 &&
        snapshot.postVerificationHandoffEvidence143H.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.postVerificationHandoffEvidence143H),
    },
    {
      id: "runtime_mount_matrix_present",
      passed:
        snapshot.prerequisiteMatrix.length === 10 &&
        snapshot.prerequisiteMatrix.some((item) => item.area === "repository_boundary") &&
        snapshot.prerequisiteMatrix.some((item) => item.area === "provider_readiness") &&
        snapshot.prerequisiteMatrix.some((item) => item.area === "realtime_handoff") &&
        snapshot.prerequisiteMatrix.some((item) => item.area === "owner_runtime_mount_approval") &&
        snapshot.prerequisiteMatrix.some((item) => item.area === "post_mount_smoke_prerequisite"),
      evidence: JSON.stringify(snapshot.prerequisiteMatrix.map((item) => item.area)),
    },
    {
      id: "runtime_mount_matrix_blocked_now",
      passed:
        snapshot.prerequisiteMatrix.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.routeBehaviorChangeAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.runtimePostAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.providerCallAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.providerSecretReadAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.realtimeSocketOpenAllowedNow === false) &&
        snapshot.prerequisiteMatrix.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.planningDecision),
    },
    {
      id: "next_143j_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143J.includes("BACKEND-STREAM-FOUNDATION-143J") &&
        snapshot.requiredExactApprovalTextFor143J.includes("runtime mount prerequisite contracts") &&
        snapshot.requiredExactApprovalTextFor143J.includes("no runtime mount") &&
        snapshot.requiredExactApprovalTextFor143J.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143J,
    },
    {
      id: "143i_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143I === false &&
        snapshot.safety.prismaSchemaChangeBy143I === false &&
        snapshot.safety.migrationCreatedBy143I === false &&
        snapshot.safety.runtimePostBy143I === false &&
        snapshot.safety.runtimeDbReadBy143I === false &&
        snapshot.safety.runtimeDbWriteBy143I === false &&
        snapshot.safety.providerCallBy143I === false &&
        snapshot.safety.providerSecretReadBy143I === false &&
        snapshot.safety.realtimeSocketOpenBy143I === false &&
        snapshot.safety.realtimeBroadcastBy143I === false &&
        snapshot.safety.moderationBypassBy143I === false &&
        snapshot.safety.runtimeMountBy143I === false &&
        snapshot.safety.moneyMovementBy143I === false &&
        snapshot.safety.fakeSuccessBy143I === false,
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
    stage: "runtime_mount_prerequisite_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_prerequisite_planning_smoke_passed" : "runtime_mount_prerequisite_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
