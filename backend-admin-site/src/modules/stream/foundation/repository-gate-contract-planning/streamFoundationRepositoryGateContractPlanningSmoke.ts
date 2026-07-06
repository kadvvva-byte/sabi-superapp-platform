import { getStreamFoundationRepositoryGateContractPlanningSnapshot } from "./streamFoundationRepositoryGateContractPlanning";
import { getStreamFoundationRepositoryGateContractPlanningReadiness } from "./streamFoundationRepositoryGateContractPlanningReadiness";

export function runStreamFoundationRepositoryGateContractPlanningSmoke() {
  const snapshot = getStreamFoundationRepositoryGateContractPlanningSnapshot();
  const readiness = getStreamFoundationRepositoryGateContractPlanningReadiness();

  const assertions = [
    {
      id: "repository_contracts_planned",
      passed: snapshot.repositoryContracts.length === 7 && snapshot.totals.repositoryContracts === 7,
      evidence: JSON.stringify(snapshot.repositoryContracts.map((contract) => contract.id)),
    },
    {
      id: "repository_policy_locked",
      passed:
        snapshot.repositoryPolicy.repositoryRequiredBeforeRuntimeMount === true &&
        snapshot.repositoryPolicy.lifecyclePersistenceRequiredBeforeRuntimeSuccess === true &&
        snapshot.repositoryPolicy.heartbeatPersistenceRequiredBeforeRuntimeSuccess === true &&
        snapshot.repositoryPolicy.eventAuditPersistenceRequiredBeforeRuntimeSuccess === true &&
        snapshot.repositoryPolicy.schemaMigrationAllowedNow === false &&
        snapshot.repositoryPolicy.prismaRuntimeAllowedNow === false,
      evidence: JSON.stringify(snapshot.repositoryPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.repositoryPolicy.routesStayBlockedNow === true &&
        snapshot.repositoryPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.totals.runtimeSuccessAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_database_or_transaction_runtime",
      passed:
        snapshot.totals.schemaMigrationAllowedNow === 0 &&
        snapshot.totals.databaseReadAllowedNow === 0 &&
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.transactionAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_provider_wallet_money",
      passed:
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
      evidence: JSON.stringify(snapshot.totals),
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
    stage: "repository_gate_source_only_contract_planning_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "repository_gate_contract_smoke_passed" : "repository_gate_contract_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
