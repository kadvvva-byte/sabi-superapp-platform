import {
  STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS,
  type StreamFoundationPersistenceModelContract,
  type StreamFoundationPersistenceModelKind,
  type StreamFoundationPersistenceStatus,
} from "./streamFoundationPersistenceModelContracts";

export type StreamFoundationPersistenceModelMapSummary = Readonly<{
  totalModels: number;
  contractReadySourceOnlyModels: number;
  blockedDatabaseFoundationModels: number;
  blockedAdminReviewModels: number;
  blockedProviderGateModels: number;
  lockedWalletGiftLastStageModels: number;
  modelKinds: readonly StreamFoundationPersistenceModelKind[];
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaFileMutationAllowedNow: false;
  migrationAllowedNow: false;
  providerCallAllowedNow: false;
  fakeRowsAllowedNow: false;
  fakeCountersAllowedNow: false;
  readyForRealDatabaseDesignLater: true;
}>;

const countByStatus = (
  models: readonly StreamFoundationPersistenceModelContract[],
  status: StreamFoundationPersistenceStatus,
): number => models.filter((model) => model.status === status).length;

const uniqueKinds = (models: readonly StreamFoundationPersistenceModelContract[]): readonly StreamFoundationPersistenceModelKind[] => {
  const kinds = new Set<StreamFoundationPersistenceModelKind>();
  models.forEach((model) => kinds.add(model.modelKind));
  return Array.from(kinds).sort();
};

export function getStreamFoundationPersistenceModelMapSummary(
  models: readonly StreamFoundationPersistenceModelContract[] = STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS,
): StreamFoundationPersistenceModelMapSummary {
  return {
    totalModels: models.length,
    contractReadySourceOnlyModels: countByStatus(models, "contract_ready_source_only"),
    blockedDatabaseFoundationModels: countByStatus(models, "blocked_database_foundation_missing"),
    blockedAdminReviewModels: countByStatus(models, "blocked_admin_review_missing"),
    blockedProviderGateModels: countByStatus(models, "blocked_provider_gate_missing"),
    lockedWalletGiftLastStageModels: countByStatus(models, "locked_wallet_gift_last_stage"),
    modelKinds: uniqueKinds(models),
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    schemaFileMutationAllowedNow: false,
    migrationAllowedNow: false,
    providerCallAllowedNow: false,
    fakeRowsAllowedNow: false,
    fakeCountersAllowedNow: false,
    readyForRealDatabaseDesignLater: true,
  };
}

export function getStreamFoundationPersistenceModelContracts(): readonly StreamFoundationPersistenceModelContract[] {
  return STREAM_FOUNDATION_PERSISTENCE_MODEL_CONTRACTS;
}
