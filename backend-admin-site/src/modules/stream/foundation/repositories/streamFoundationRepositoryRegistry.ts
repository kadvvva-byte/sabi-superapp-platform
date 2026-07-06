import {
  STREAM_FOUNDATION_REPOSITORY_CONTRACTS,
  type StreamFoundationRepositoryContract,
  type StreamFoundationRepositoryId,
  type StreamFoundationRepositoryKind,
  type StreamFoundationRepositoryOperation,
  type StreamFoundationRepositoryStatus,
} from "./streamFoundationRepositoryContracts";

export type StreamFoundationRepositoryRegistrySummary = Readonly<{
  totalRepositories: number;
  interfaceReadySourceOnlyRepositories: number;
  blockedDataStoreMissingRepositories: number;
  blockedAdminReviewRepositories: number;
  blockedProviderGateRepositories: number;
  lockedWalletGiftLastStageRepositories: number;
  repositoryKinds: readonly StreamFoundationRepositoryKind[];
  operationTypes: readonly StreamFoundationRepositoryOperation[];
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  dataStoreClientAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaFileMutationAllowedNow: false;
  migrationAllowedNow: false;
  providerCallAllowedNow: false;
  externalStorageWriteAllowedNow: false;
  realtimePublishAllowedNow: false;
  fakeRowsAllowedNow: false;
  fakeCountersAllowedNow: false;
  fakeSuccessAllowedNow: false;
  readyForRealRepositoryImplementationLater: true;
}>;

const countByStatus = (
  contracts: readonly StreamFoundationRepositoryContract[],
  status: StreamFoundationRepositoryStatus,
): number => contracts.filter((contract) => contract.status === status).length;

const uniqueRepositoryKinds = (
  contracts: readonly StreamFoundationRepositoryContract[],
): readonly StreamFoundationRepositoryKind[] => {
  const kinds = new Set<StreamFoundationRepositoryKind>();
  contracts.forEach((contract) => kinds.add(contract.repositoryKind));
  return Array.from(kinds).sort();
};

const uniqueOperationTypes = (
  contracts: readonly StreamFoundationRepositoryContract[],
): readonly StreamFoundationRepositoryOperation[] => {
  const operations = new Set<StreamFoundationRepositoryOperation>();
  contracts.forEach((contract) => {
    contract.operations.forEach((operation) => operations.add(operation.operation));
  });
  return Array.from(operations).sort();
};

export function getStreamFoundationRepositoryRegistrySummary(
  contracts: readonly StreamFoundationRepositoryContract[] = STREAM_FOUNDATION_REPOSITORY_CONTRACTS,
): StreamFoundationRepositoryRegistrySummary {
  return {
    totalRepositories: contracts.length,
    interfaceReadySourceOnlyRepositories: countByStatus(contracts, "interface_ready_source_only"),
    blockedDataStoreMissingRepositories: countByStatus(contracts, "blocked_data_store_missing"),
    blockedAdminReviewRepositories: countByStatus(contracts, "blocked_admin_review_missing"),
    blockedProviderGateRepositories: countByStatus(contracts, "blocked_provider_gate_missing"),
    lockedWalletGiftLastStageRepositories: countByStatus(contracts, "locked_wallet_gift_last_stage"),
    repositoryKinds: uniqueRepositoryKinds(contracts),
    operationTypes: uniqueOperationTypes(contracts),
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    dataStoreClientAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    schemaFileMutationAllowedNow: false,
    migrationAllowedNow: false,
    providerCallAllowedNow: false,
    externalStorageWriteAllowedNow: false,
    realtimePublishAllowedNow: false,
    fakeRowsAllowedNow: false,
    fakeCountersAllowedNow: false,
    fakeSuccessAllowedNow: false,
    readyForRealRepositoryImplementationLater: true,
  };
}

export function getStreamFoundationRepositoryContracts(): readonly StreamFoundationRepositoryContract[] {
  return STREAM_FOUNDATION_REPOSITORY_CONTRACTS;
}

export function getStreamFoundationRepositoryContractById(
  repositoryId: StreamFoundationRepositoryId,
): StreamFoundationRepositoryContract | undefined {
  return STREAM_FOUNDATION_REPOSITORY_CONTRACTS.find((contract) => contract.repositoryId === repositoryId);
}
