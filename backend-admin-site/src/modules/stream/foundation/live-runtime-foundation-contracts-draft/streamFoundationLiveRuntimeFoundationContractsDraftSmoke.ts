import { getStreamFoundationLiveRuntimeFoundationContractsDraftSnapshot } from "./streamFoundationLiveRuntimeFoundationContractsDraft";
import { getStreamFoundationLiveRuntimeFoundationContractsDraftReadiness } from "./streamFoundationLiveRuntimeFoundationContractsDraftReadiness";

export function runStreamFoundationLiveRuntimeFoundationContractsDraftSmoke() {
  const snapshot = getStreamFoundationLiveRuntimeFoundationContractsDraftSnapshot();
  const readiness = getStreamFoundationLiveRuntimeFoundationContractsDraftReadiness();

  const assertions = [
    {
      id: "previous_142x_142v_evidence_preserved",
      passed:
        snapshot.verifiedPreviousEvidence.blockedJsonEnvelopesPresentForLiveWriteRoutes === true &&
        snapshot.verifiedPreviousEvidence.routesReturned423 === 3 &&
        snapshot.verifiedPreviousEvidence.emptyBodyRoutes === 0 &&
        snapshot.verifiedPreviousEvidence.targetPatchForEnvelopeBodyNeeded === false,
      evidence: JSON.stringify(snapshot.verifiedPreviousEvidence),
    },
    {
      id: "all_contract_groups_present",
      passed:
        snapshot.lifecycleContracts.length >= 4 &&
        snapshot.repositoryBoundaryContracts.length >= 3 &&
        snapshot.providerReadinessGateContracts.length >= 2 &&
        snapshot.realtimeHandoffContracts.length >= 2 &&
        snapshot.moderationGateContracts.length >= 2 &&
        snapshot.eventAuditContracts.length >= 3,
      evidence: JSON.stringify({
        lifecycle: snapshot.lifecycleContracts.length,
        repository: snapshot.repositoryBoundaryContracts.length,
        provider: snapshot.providerReadinessGateContracts.length,
        realtime: snapshot.realtimeHandoffContracts.length,
        moderation: snapshot.moderationGateContracts.length,
        eventAudit: snapshot.eventAuditContracts.length,
      }),
    },
    {
      id: "contracts_are_source_only_and_blocked_now",
      passed:
        snapshot.lifecycleContracts.every((contract) => contract.runtimeMountAllowedNow === false) &&
        snapshot.lifecycleContracts.every((contract) => contract.runtimePostAllowedNow === false) &&
        snapshot.lifecycleContracts.every((contract) => contract.databaseWriteAllowedNow === false) &&
        snapshot.lifecycleContracts.every((contract) => contract.providerCallAllowedNow === false) &&
        snapshot.lifecycleContracts.every((contract) => contract.walletMutationAllowedNow === false) &&
        snapshot.lifecycleContracts.every((contract) => contract.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.lifecycleContracts),
    },
    {
      id: "next_142z_approval_present",
      passed:
        snapshot.nextApprovalTextFor142Z.includes("BACKEND-STREAM-FOUNDATION-142Z") &&
        snapshot.nextApprovalTextFor142Z.includes("ops-only") &&
        snapshot.nextApprovalTextFor142Z.includes("no runtime POST") &&
        snapshot.nextApprovalTextFor142Z.includes("no fake success"),
      evidence: snapshot.nextApprovalTextFor142Z,
    },
    {
      id: "142y_safety_clean",
      passed:
        snapshot.safety.targetWriteBy142Y === false &&
        snapshot.safety.routeBehaviorChangeBy142Y === false &&
        snapshot.safety.runtimePostBy142Y === false &&
        snapshot.safety.databaseWriteBy142Y === false &&
        snapshot.safety.providerCallBy142Y === false &&
        snapshot.safety.walletMutationBy142Y === false &&
        snapshot.safety.moneyMovementBy142Y === false &&
        snapshot.safety.fakeSuccessBy142Y === false,
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
    stage: "live_runtime_foundation_contracts_draft_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_runtime_foundation_contracts_draft_smoke_passed" : "live_runtime_foundation_contracts_draft_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
