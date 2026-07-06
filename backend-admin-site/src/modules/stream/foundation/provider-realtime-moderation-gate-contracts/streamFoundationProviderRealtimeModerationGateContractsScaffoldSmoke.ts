import { getStreamFoundationProviderRealtimeModerationGateContractsScaffoldSnapshot } from "./streamFoundationProviderRealtimeModerationGateContractsScaffold";
import { getStreamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness } from "./streamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness";

export function runStreamFoundationProviderRealtimeModerationGateContractsScaffoldSmoke() {
  const snapshot = getStreamFoundationProviderRealtimeModerationGateContractsScaffoldSnapshot();
  const readiness = getStreamFoundationProviderRealtimeModerationGateContractsScaffoldReadiness();

  const assertions = [
    {
      id: "143e_planning_evidence_preserved",
      passed:
        snapshot.previousPlanningEvidence.providerRealtimeModerationPlanningReady === true &&
        snapshot.previousPlanningEvidence.gatePlanItems === 6 &&
        snapshot.previousPlanningEvidence.providerCallAllowedNow === false &&
        snapshot.previousPlanningEvidence.providerSecretReadAllowedNow === false &&
        snapshot.previousPlanningEvidence.liveWriteRoutesMustRemain423Blocked === true,
      evidence: JSON.stringify(snapshot.previousPlanningEvidence),
    },
    {
      id: "all_gate_contracts_present",
      passed:
        snapshot.providerReadinessGate.gateId === "provider_readiness_gate" &&
        snapshot.realtimeHandoffGate.gateId === "realtime_handoff_gate" &&
        snapshot.moderationGate.gateId === "moderation_gate" &&
        snapshot.runtimeMountPrerequisiteGate.gateId === "runtime_mount_prerequisite_gate" &&
        snapshot.adminReviewGate.gateId === "admin_review_gate" &&
        snapshot.safeDisabledResponseGate.gateId === "safe_disabled_response_gate",
      evidence: JSON.stringify({
        provider: snapshot.providerReadinessGate.gateId,
        realtime: snapshot.realtimeHandoffGate.gateId,
        moderation: snapshot.moderationGate.gateId,
        runtimeMount: snapshot.runtimeMountPrerequisiteGate.gateId,
        adminReview: snapshot.adminReviewGate.gateId,
        safeDisabled: snapshot.safeDisabledResponseGate.gateId,
      }),
    },
    {
      id: "provider_realtime_moderation_runtime_blocked_now",
      passed:
        snapshot.providerReadinessGate.providerCallAllowedNow === false &&
        snapshot.providerReadinessGate.providerSecretReadAllowedNow === false &&
        snapshot.realtimeHandoffGate.realtimeSocketOpenAllowedNow === false &&
        snapshot.realtimeHandoffGate.realtimeBroadcastAllowedNow === false &&
        snapshot.moderationGate.moderationBypassAllowedNow === false &&
        snapshot.runtimeMountPrerequisiteGate.runtimeMountAllowedNow === false &&
        snapshot.safeDisabledResponseGate.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify({
        provider: snapshot.providerReadinessGate,
        realtime: snapshot.realtimeHandoffGate,
        moderation: snapshot.moderationGate,
        runtimeMount: snapshot.runtimeMountPrerequisiteGate,
        safeDisabled: snapshot.safeDisabledResponseGate,
      }),
    },
    {
      id: "next_143g_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143G.includes("BACKEND-STREAM-FOUNDATION-143G") &&
        snapshot.requiredExactApprovalTextFor143G.includes("ops-only") &&
        snapshot.requiredExactApprovalTextFor143G.includes("no provider secret read") &&
        snapshot.requiredExactApprovalTextFor143G.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143G,
    },
    {
      id: "143f_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143F === false &&
        snapshot.safety.prismaSchemaChangeBy143F === false &&
        snapshot.safety.migrationCreatedBy143F === false &&
        snapshot.safety.runtimePostBy143F === false &&
        snapshot.safety.runtimeDbReadBy143F === false &&
        snapshot.safety.runtimeDbWriteBy143F === false &&
        snapshot.safety.providerCallBy143F === false &&
        snapshot.safety.providerSecretReadBy143F === false &&
        snapshot.safety.realtimeSocketOpenBy143F === false &&
        snapshot.safety.realtimeBroadcastBy143F === false &&
        snapshot.safety.moderationBypassBy143F === false &&
        snapshot.safety.moneyMovementBy143F === false &&
        snapshot.safety.fakeSuccessBy143F === false,
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
    stage: "provider_realtime_moderation_gate_contracts_scaffold_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "provider_realtime_moderation_gate_contracts_scaffold_smoke_passed" : "provider_realtime_moderation_gate_contracts_scaffold_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
