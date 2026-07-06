import { getStreamFoundationProviderRealtimeModerationGatePlanningSnapshot } from "./streamFoundationProviderRealtimeModerationGatePlanning";
import { getStreamFoundationProviderRealtimeModerationGatePlanningReadiness } from "./streamFoundationProviderRealtimeModerationGatePlanningReadiness";

export function runStreamFoundationProviderRealtimeModerationGatePlanningSmoke() {
  const snapshot = getStreamFoundationProviderRealtimeModerationGatePlanningSnapshot();
  const readiness = getStreamFoundationProviderRealtimeModerationGatePlanningReadiness();

  const assertions = [
    {
      id: "143d_repository_boundary_handoff_preserved",
      passed:
        snapshot.repositoryBoundaryHandoffEvidence143D.repositoryBoundaryClosed === true &&
        snapshot.repositoryBoundaryHandoffEvidence143D.closedArtifacts === 3 &&
        snapshot.repositoryBoundaryHandoffEvidence143D.runtimePostPerformed === 0 &&
        snapshot.repositoryBoundaryHandoffEvidence143D.providerCallPerformed === 0 &&
        snapshot.repositoryBoundaryHandoffEvidence143D.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.repositoryBoundaryHandoffEvidence143D),
    },
    {
      id: "gate_plan_items_present",
      passed:
        snapshot.gatePlanItems.length === 6 &&
        snapshot.gatePlanItems.some((item) => item.area === "provider_readiness_gate") &&
        snapshot.gatePlanItems.some((item) => item.area === "realtime_handoff_gate") &&
        snapshot.gatePlanItems.some((item) => item.area === "moderation_gate") &&
        snapshot.gatePlanItems.some((item) => item.area === "runtime_mount_prerequisite_gate"),
      evidence: JSON.stringify(snapshot.gatePlanItems.map((item) => item.area)),
    },
    {
      id: "gate_plan_blocks_provider_realtime_moderation_now",
      passed:
        snapshot.gatePlanItems.every((item) => item.providerCallAllowedNow === false) &&
        snapshot.gatePlanItems.every((item) => item.providerSecretReadAllowedNow === false) &&
        snapshot.gatePlanItems.every((item) => item.realtimeSocketOpenAllowedNow === false) &&
        snapshot.gatePlanItems.every((item) => item.realtimeBroadcastAllowedNow === false) &&
        snapshot.gatePlanItems.every((item) => item.moderationBypassAllowedNow === false) &&
        snapshot.gatePlanItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.gatePlanItems),
    },
    {
      id: "next_143f_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143F.includes("BACKEND-STREAM-FOUNDATION-143F") &&
        snapshot.requiredExactApprovalTextFor143F.includes("provider readiness gate") &&
        snapshot.requiredExactApprovalTextFor143F.includes("no provider secret read") &&
        snapshot.requiredExactApprovalTextFor143F.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143F,
    },
    {
      id: "143e_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143E === false &&
        snapshot.safety.prismaSchemaChangeBy143E === false &&
        snapshot.safety.migrationCreatedBy143E === false &&
        snapshot.safety.routeBehaviorChangeBy143E === false &&
        snapshot.safety.runtimePostBy143E === false &&
        snapshot.safety.runtimeDbReadBy143E === false &&
        snapshot.safety.runtimeDbWriteBy143E === false &&
        snapshot.safety.providerCallBy143E === false &&
        snapshot.safety.providerSecretReadBy143E === false &&
        snapshot.safety.realtimeSocketOpenBy143E === false &&
        snapshot.safety.realtimeBroadcastBy143E === false &&
        snapshot.safety.moderationBypassBy143E === false &&
        snapshot.safety.walletMutationBy143E === false &&
        snapshot.safety.moneyMovementBy143E === false &&
        snapshot.safety.fakeSuccessBy143E === false,
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
    stage: "provider_realtime_moderation_gate_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "provider_realtime_moderation_gate_planning_smoke_passed" : "provider_realtime_moderation_gate_planning_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
