import { getStreamFoundationRepositoryBoundaryContractsScaffoldSnapshot } from "./streamFoundationRepositoryBoundaryContractsScaffold";
import { getStreamFoundationRepositoryBoundaryContractsScaffoldReadiness } from "./streamFoundationRepositoryBoundaryContractsScaffoldReadiness";

export function runStreamFoundationRepositoryBoundaryContractsScaffoldSmoke() {
  const snapshot = getStreamFoundationRepositoryBoundaryContractsScaffoldSnapshot();
  const readiness = getStreamFoundationRepositoryBoundaryContractsScaffoldReadiness();

  const assertions = [
    {
      id: "143a_planning_evidence_preserved",
      passed:
        snapshot.previousPlanningEvidence.repositoryBoundaryPlanningReady === true &&
        snapshot.previousPlanningEvidence.planItems === 8 &&
        snapshot.previousPlanningEvidence.schemaPatchAllowedNow === false &&
        snapshot.previousPlanningEvidence.migrationAllowedNow === false &&
        snapshot.previousPlanningEvidence.databaseRuntimeAccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.previousPlanningEvidence),
    },
    {
      id: "repository_contract_groups_present",
      passed:
        snapshot.idempotencyContracts.length >= 2 &&
        snapshot.transactionBoundaryContracts.length >= 3 &&
        snapshot.liveSessionRepositoryContract.repositoryName === "StreamLiveSessionRepository" &&
        snapshot.participantRepositoryContract.repositoryName === "StreamLiveParticipantRepository" &&
        snapshot.heartbeatRepositoryContract.repositoryName === "StreamLiveHeartbeatRepository" &&
        snapshot.eventAuditRepositoryContract.repositoryName === "StreamLiveEventAuditRepository",
      evidence: JSON.stringify({
        idempotency: snapshot.idempotencyContracts.length,
        transactions: snapshot.transactionBoundaryContracts.length,
        repositories: [
          snapshot.liveSessionRepositoryContract.repositoryName,
          snapshot.participantRepositoryContract.repositoryName,
          snapshot.heartbeatRepositoryContract.repositoryName,
          snapshot.eventAuditRepositoryContract.repositoryName,
        ],
      }),
    },
    {
      id: "persistence_safety_envelope_blocks_runtime_now",
      passed:
        snapshot.persistenceSafetyEnvelope.statusCode === 423 &&
        snapshot.persistenceSafetyEnvelope.schemaWriteAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.migrationAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.runtimeDbReadAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.runtimeDbWriteAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.providerCallAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.walletMutationAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.moneyMovementAllowedNow === false &&
        snapshot.persistenceSafetyEnvelope.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.persistenceSafetyEnvelope),
    },
    {
      id: "next_143c_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143C.includes("BACKEND-STREAM-FOUNDATION-143C") &&
        snapshot.requiredExactApprovalTextFor143C.includes("ops-only") &&
        snapshot.requiredExactApprovalTextFor143C.includes("no runtime DB read/write") &&
        snapshot.requiredExactApprovalTextFor143C.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143C,
    },
    {
      id: "143b_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143B === false &&
        snapshot.safety.prismaSchemaChangeBy143B === false &&
        snapshot.safety.migrationCreatedBy143B === false &&
        snapshot.safety.routeBehaviorChangeBy143B === false &&
        snapshot.safety.runtimePostBy143B === false &&
        snapshot.safety.databaseReadBy143B === false &&
        snapshot.safety.databaseWriteBy143B === false &&
        snapshot.safety.providerCallBy143B === false &&
        snapshot.safety.walletMutationBy143B === false &&
        snapshot.safety.moneyMovementBy143B === false &&
        snapshot.safety.fakeSuccessBy143B === false,
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
    stage: "repository_boundary_contracts_scaffold_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "repository_boundary_contracts_scaffold_smoke_passed" : "repository_boundary_contracts_scaffold_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
