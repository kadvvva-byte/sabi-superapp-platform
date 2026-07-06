import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { getStreamFoundationRepositoryRegistrySummary } from "./repositories";

export const STREAM_136L_BACKEND_FOUNDATION_REPOSITORY_CONTRACTS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136L" as const;

export type Stream136LBackendFoundationRepositoryContractsStagingManifest = Readonly<{
  version: typeof STREAM_136L_BACKEND_FOUNDATION_REPOSITORY_CONTRACTS_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  changedFiles: readonly string[];
  repositorySummary: ReturnType<typeof getStreamFoundationRepositoryRegistrySummary>;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
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
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeRowsAllowedNow: false;
  fakeCountersAllowedNow: false;
  fakeSuccessAllowedNow: false;
  nextStep: "BACKEND_STREAM_FOUNDATION_136M_SERVICE_READINESS_COMPOSITION";
}>;

export function getStream136LBackendFoundationRepositoryContractsStagingManifest(): Stream136LBackendFoundationRepositoryContractsStagingManifest {
  return {
    version: STREAM_136L_BACKEND_FOUNDATION_REPOSITORY_CONTRACTS_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    changedFiles: [
      "src/modules/stream/foundation/repositories/streamFoundationRepositoryContracts.ts",
      "src/modules/stream/foundation/repositories/streamFoundationRepositoryRegistry.ts",
      "src/modules/stream/foundation/repositories/index.ts",
      "src/modules/stream/foundation/stream136lBackendFoundationRepositoryContractsStagingManifest.ts",
      "src/modules/stream/index.ts",
      "STREAM_BACKEND_STAGING_README_136L.md",
    ],
    repositorySummary: getStreamFoundationRepositoryRegistrySummary(),
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
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
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeRowsAllowedNow: false,
    fakeCountersAllowedNow: false,
    fakeSuccessAllowedNow: false,
    nextStep: "BACKEND_STREAM_FOUNDATION_136M_SERVICE_READINESS_COMPOSITION",
  };
}
