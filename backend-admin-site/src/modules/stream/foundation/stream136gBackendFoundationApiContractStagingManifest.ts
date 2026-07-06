import { getStreamFoundationApiContractSnapshot } from "./api";

export const STREAM_136G_BACKEND_FOUNDATION_API_CONTRACT_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136G" as const;

export type Stream136GBackendFoundationApiContractStagingManifest = Readonly<{
  version: typeof STREAM_136G_BACKEND_FOUNDATION_API_CONTRACT_STAGING_VERSION;
  scope: "backend_stream_foundation_local_staging_only";
  addsRouteContracts: true;
  mountsRoutesNow: false;
  touchesAppServerNow: false;
  executesRuntimeNow: false;
  writesDatabaseNow: false;
  callsProvidersNow: false;
  touchesWalletRuntimeNow: false;
  touchesMessengerRuntimeNow: false;
  touchesGiftsPaymentsRuntimeNow: false;
  fakeSuccessAllowed: false;
  endpointContracts: number;
  mountedEndpointsNow: 0;
  samplePreviewCases: number;
  samplePreviewPassed: number;
  nextStep: "BACKEND_STREAM_FOUNDATION_136H_LOCAL_STAGING_READ_MODEL_CONTRACTS";
}>;

export function getStream136GBackendFoundationApiContractStagingManifest(): Stream136GBackendFoundationApiContractStagingManifest {
  const snapshot = getStreamFoundationApiContractSnapshot();

  return {
    version: STREAM_136G_BACKEND_FOUNDATION_API_CONTRACT_STAGING_VERSION,
    scope: "backend_stream_foundation_local_staging_only",
    addsRouteContracts: true,
    mountsRoutesNow: false,
    touchesAppServerNow: false,
    executesRuntimeNow: false,
    writesDatabaseNow: false,
    callsProvidersNow: false,
    touchesWalletRuntimeNow: false,
    touchesMessengerRuntimeNow: false,
    touchesGiftsPaymentsRuntimeNow: false,
    fakeSuccessAllowed: false,
    endpointContracts: snapshot.endpointContracts.length,
    mountedEndpointsNow: snapshot.mountedEndpointsNow,
    samplePreviewCases: snapshot.samplePreviewCases,
    samplePreviewPassed: snapshot.samplePreviewPassed,
    nextStep: "BACKEND_STREAM_FOUNDATION_136H_LOCAL_STAGING_READ_MODEL_CONTRACTS",
  };
}
