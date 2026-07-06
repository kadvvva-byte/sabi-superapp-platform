import { runStreamFoundationKernelAdapterRegistrySmoke } from "./kernel-adapter-registry/streamFoundationKernelAdapterRegistrySmoke";
import { getStreamFoundationKernelAdapterRegistryReadiness } from "./kernel-adapter-registry/streamFoundationKernelAdapterRegistryReadiness";
import { getStreamFoundationKernelAdapterRegistrySnapshot } from "./kernel-adapter-registry/streamFoundationKernelAdapterRegistry";

export const STREAM_138E_BACKEND_FOUNDATION_KERNEL_ADAPTER_REGISTRY_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-138E" as const;

export function getStream138EBackendFoundationKernelAdapterRegistryStagingManifest() {
  const snapshot = getStreamFoundationKernelAdapterRegistrySnapshot();
  const readiness = getStreamFoundationKernelAdapterRegistryReadiness();
  const smoke = runStreamFoundationKernelAdapterRegistrySmoke();
  return {
    version: STREAM_138E_BACKEND_FOUNDATION_KERNEL_ADAPTER_REGISTRY_STAGING_MANIFEST_VERSION,
    scope: "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    addedLayer: "kernel_adapter_registry_contracts",
    pipeline: [
      "kernel_queue_consumer_138d",
      "kernel_adapter_registry_138e",
      "future_adapter_binding_only_after_owner_approval",
    ] as const,
    registeredAdapterContracts: snapshot.totalAdapters,
    readiness,
    smoke,
    safety: {
      routeMountAllowedNow: false,
      adapterRuntimeBindingAllowedNow: false,
      databaseReadAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      paymentAuthorizationAllowedNow: false,
      recipientEarningCreditAllowedNow: false,
      monthlyPayoutAllowedNow: false,
      realtimeBroadcastAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
  } as const;
}
