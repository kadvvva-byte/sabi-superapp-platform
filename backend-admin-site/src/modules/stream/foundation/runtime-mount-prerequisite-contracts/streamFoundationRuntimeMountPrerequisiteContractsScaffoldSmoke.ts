import { getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldSnapshot } from "./streamFoundationRuntimeMountPrerequisiteContractsScaffold";
import { getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness } from "./streamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness";

export function runStreamFoundationRuntimeMountPrerequisiteContractsScaffoldSmoke() {
  const snapshot = getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldSnapshot();
  const readiness = getStreamFoundationRuntimeMountPrerequisiteContractsScaffoldReadiness();

  const assertions = [
    {
      id: "143i_planning_evidence_preserved",
      passed:
        snapshot.previousPlanningEvidence.runtimeMountPrerequisiteMatrixPlanningReady === true &&
        snapshot.previousPlanningEvidence.prerequisiteMatrixItems === 10 &&
        snapshot.previousPlanningEvidence.runtimeMountAllowedNow === false &&
        snapshot.previousPlanningEvidence.routeBehaviorChangeAllowedNow === false &&
        snapshot.previousPlanningEvidence.liveWriteRoutesMustRemain423Blocked === true,
      evidence: JSON.stringify(snapshot.previousPlanningEvidence),
    },
    {
      id: "runtime_mount_prerequisite_contracts_present",
      passed:
        snapshot.runtimeMountPrerequisiteMatrix.requirements.length === 10 &&
        snapshot.blockedRoutePreservation.routeIds.length === 3 &&
        snapshot.ownerRuntimeMountApprovalRequirement.approvalStatus === "separate_exact_owner_approval_required" &&
        snapshot.rollbackReadiness.rollbackStatus === "rollback_planned_not_executable_now" &&
        snapshot.postMountSmokePrerequisite.smokeStatus === "post_mount_smoke_planned_not_executable_now",
      evidence: JSON.stringify({
        requirements: snapshot.runtimeMountPrerequisiteMatrix.requirements.map((item) => item.prerequisiteId),
        routes: snapshot.blockedRoutePreservation.routeIds,
      }),
    },
    {
      id: "runtime_mount_and_route_behavior_blocked_now",
      passed:
        snapshot.runtimeMountPrerequisiteMatrix.runtimeMountAllowedNow === false &&
        snapshot.runtimeMountPrerequisiteMatrix.routeBehaviorChangeAllowedNow === false &&
        snapshot.blockedRoutePreservation.requiredStatusCodeNow === 423 &&
        snapshot.blockedRoutePreservation.liveSuccessAllowedNow === false &&
        snapshot.ownerRuntimeMountApprovalRequirement.ownerRuntimeMountApprovalNow === false &&
        snapshot.rollbackReadiness.rollbackExecutionAllowedNow === false &&
        snapshot.postMountSmokePrerequisite.postMountSmokeAllowedNow === false,
      evidence: JSON.stringify({
        matrix: snapshot.runtimeMountPrerequisiteMatrix.matrixStatus,
        blockedRoute: snapshot.blockedRoutePreservation,
        owner: snapshot.ownerRuntimeMountApprovalRequirement,
      }),
    },
    {
      id: "next_143k_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143K.includes("BACKEND-STREAM-FOUNDATION-143K") &&
        snapshot.requiredExactApprovalTextFor143K.includes("ops-only") &&
        snapshot.requiredExactApprovalTextFor143K.includes("no runtime mount") &&
        snapshot.requiredExactApprovalTextFor143K.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143K,
    },
    {
      id: "143j_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143J === false &&
        snapshot.safety.prismaSchemaChangeBy143J === false &&
        snapshot.safety.migrationCreatedBy143J === false &&
        snapshot.safety.runtimePostBy143J === false &&
        snapshot.safety.providerCallBy143J === false &&
        snapshot.safety.providerSecretReadBy143J === false &&
        snapshot.safety.runtimeMountBy143J === false &&
        snapshot.safety.routeBehaviorChangeBy143J === false &&
        snapshot.safety.rollbackExecutionBy143J === false &&
        snapshot.safety.postMountSmokeBy143J === false &&
        snapshot.safety.moneyMovementBy143J === false &&
        snapshot.safety.fakeSuccessBy143J === false,
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
    stage: "runtime_mount_prerequisite_contracts_scaffold_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "runtime_mount_prerequisite_contracts_scaffold_smoke_passed" : "runtime_mount_prerequisite_contracts_scaffold_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
