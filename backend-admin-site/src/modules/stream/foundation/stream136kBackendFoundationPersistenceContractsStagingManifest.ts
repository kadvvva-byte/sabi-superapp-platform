import { getStreamFoundationPersistenceModelMapSummary } from "./persistence";

export const STREAM_136K_BACKEND_FOUNDATION_PERSISTENCE_CONTRACTS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136K" as const;

export type Stream136KBackendFoundationPersistenceContractsStagingManifest = Readonly<{
  version: typeof STREAM_136K_BACKEND_FOUNDATION_PERSISTENCE_CONTRACTS_STAGING_VERSION;
  stage: "local_staging_only";
  scope: "backend_stream_foundation_persistence_contracts";
  patchMode: "source_only_database_model_map";
  totalModels: number;
  contractReadySourceOnlyModels: number;
  blockedDatabaseFoundationModels: number;
  blockedAdminReviewModels: number;
  blockedProviderGateModels: number;
  lockedWalletGiftLastStageModels: number;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaFileMutationAllowedNow: false;
  migrationAllowedNow: false;
  providerCallAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeRowsAllowedNow: false;
  fakeCountersAllowedNow: false;
  fakeSuccessAllowed: false;
  notes: readonly string[];
}>;

export function getStream136KBackendFoundationPersistenceContractsStagingManifest(): Stream136KBackendFoundationPersistenceContractsStagingManifest {
  const summary = getStreamFoundationPersistenceModelMapSummary();

  return {
    version: STREAM_136K_BACKEND_FOUNDATION_PERSISTENCE_CONTRACTS_STAGING_VERSION,
    stage: "local_staging_only",
    scope: "backend_stream_foundation_persistence_contracts",
    patchMode: "source_only_database_model_map",
    totalModels: summary.totalModels,
    contractReadySourceOnlyModels: summary.contractReadySourceOnlyModels,
    blockedDatabaseFoundationModels: summary.blockedDatabaseFoundationModels,
    blockedAdminReviewModels: summary.blockedAdminReviewModels,
    blockedProviderGateModels: summary.blockedProviderGateModels,
    lockedWalletGiftLastStageModels: summary.lockedWalletGiftLastStageModels,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    schemaFileMutationAllowedNow: false,
    migrationAllowedNow: false,
    providerCallAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeRowsAllowedNow: false,
    fakeCountersAllowedNow: false,
    fakeSuccessAllowed: false,
    notes: [
      "136K adds Stream backend persistence model contracts and a database model map for future real storage design.",
      "No schema file is changed, no migration is created, and no read/write execution is allowed in this staging patch.",
      "Wallet/Gift storage remains a locked last-stage boundary and cannot be simulated through Stream persistence contracts.",
    ],
  };
}
