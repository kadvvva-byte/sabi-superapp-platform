import { getStreamFoundationServiceReadinessCompositionSnapshot } from "./readiness";

export type Stream136MBackendFoundationServiceReadinessCompositionManifest = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136M";
  title: "service_readiness_composition_local_staging_patch";
  localStagingOnly: true;
  patchOnly: true;
  serverInstallAllowedNow: false;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  readiness: ReturnType<typeof getStreamFoundationServiceReadinessCompositionSnapshot>;
}>;

export function getStream136MBackendFoundationServiceReadinessCompositionManifest(): Stream136MBackendFoundationServiceReadinessCompositionManifest {
  return {
    stage: "BACKEND_STREAM_FOUNDATION_136M",
    title: "service_readiness_composition_local_staging_patch",
    localStagingOnly: true,
    patchOnly: true,
    serverInstallAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    giftsPaymentsRuntimeMutationAllowedNow: false,
    fakeSuccessAllowed: false,
    readiness: getStreamFoundationServiceReadinessCompositionSnapshot(),
  };
}
