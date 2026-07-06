import { getStreamFoundationRepositoryGateContractPlanningSnapshot } from "./streamFoundationRepositoryGateContractPlanning";

export function getStreamFoundationRepositoryGateContractPlanningReadiness() {
  const snapshot = getStreamFoundationRepositoryGateContractPlanningSnapshot();

  const contractReady =
    snapshot.previousStage === "BACKEND-STREAM-FOUNDATION-141P" &&
    snapshot.repositoryContracts.length === 7 &&
    snapshot.repositoryContracts.every((contract) => contract.requiredBeforeRuntimeMount === true) &&
    snapshot.repositoryPolicy.repositoryRequiredBeforeRuntimeMount === true &&
    snapshot.repositoryPolicy.lifecyclePersistenceRequiredBeforeRuntimeSuccess === true &&
    snapshot.repositoryPolicy.heartbeatPersistenceRequiredBeforeRuntimeSuccess === true &&
    snapshot.repositoryPolicy.eventAuditPersistenceRequiredBeforeRuntimeSuccess === true &&
    snapshot.repositoryPolicy.schemaMigrationAllowedNow === false &&
    snapshot.repositoryPolicy.prismaRuntimeAllowedNow === false;

  const blockedNow =
    snapshot.repositoryPolicy.routesStayBlockedNow === true &&
    snapshot.repositoryPolicy.expectedCurrentStatusCode === 423 &&
    snapshot.repositoryContracts.every((contract) => contract.schemaMigrationAllowedNow === false) &&
    snapshot.repositoryContracts.every((contract) => contract.databaseReadAllowedNow === false) &&
    snapshot.repositoryContracts.every((contract) => contract.databaseWriteAllowedNow === false) &&
    snapshot.repositoryContracts.every((contract) => contract.transactionAllowedNow === false) &&
    snapshot.repositoryContracts.every((contract) => contract.runtimeSuccessAllowedNow === false) &&
    snapshot.totals.readyForRuntimeMountNow === 0 &&
    snapshot.totals.databaseReadAllowedNow === 0 &&
    snapshot.totals.databaseWriteAllowedNow === 0 &&
    snapshot.totals.transactionAllowedNow === 0 &&
    snapshot.totals.runtimeSuccessAllowedNow === 0 &&
    snapshot.totals.providerCallAllowedNow === 0 &&
    snapshot.totals.walletMutationAllowedNow === 0 &&
    snapshot.totals.moneyMovementAllowedNow === 0 &&
    snapshot.totals.fakeSuccessAllowedNow === 0;

  const safetyReady =
    snapshot.safety.sourceOnly141Q === true &&
    snapshot.safety.appTsChangeBy141Q === false &&
    snapshot.safety.serverTsChangeBy141Q === false &&
    snapshot.safety.streamIndexChangeBy141Q === false &&
    snapshot.safety.schemaMigrationBy141Q === false &&
    snapshot.safety.backendRestartBy141Q === false &&
    snapshot.safety.runtimeHttpBy141Q === false &&
    snapshot.safety.runtimePostBy141Q === false &&
    snapshot.safety.databaseReadBy141Q === false &&
    snapshot.safety.databaseWriteBy141Q === false &&
    snapshot.safety.providerCallBy141Q === false &&
    snapshot.safety.walletMutationBy141Q === false &&
    snapshot.safety.moneyMovementBy141Q === false &&
    snapshot.safety.fakeSuccessBy141Q === false;

  const ready = contractReady && blockedNow && safetyReady;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "repository_gate_contract_ready_routes_remain_blocked" : "repository_gate_contract_blocked",
    repositoryContracts: snapshot.repositoryContracts.length,
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-141R realtime provider readiness gate source-only contract planning",
  } as const;
}
