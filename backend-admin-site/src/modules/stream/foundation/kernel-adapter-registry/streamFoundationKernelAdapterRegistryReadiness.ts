import { getStreamFoundationKernelAdapterRegistrySnapshot } from "./streamFoundationKernelAdapterRegistry";
import { STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION } from "./streamFoundationKernelAdapterRegistryContracts";

export interface StreamFoundationKernelAdapterRegistryReadiness {
  readonly version: typeof STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION;
  readonly readyForKernelAdapterContractReview: true;
  readonly readyForAdapterRuntimeBindingNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly recipientEarningCreditAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly mediaStorageWriteAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly blockingReasons: readonly string[];
}

export function getStreamFoundationKernelAdapterRegistryReadiness(): StreamFoundationKernelAdapterRegistryReadiness {
  const snapshot = getStreamFoundationKernelAdapterRegistrySnapshot();
  return {
    version: STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION,
    readyForKernelAdapterContractReview: true,
    readyForAdapterRuntimeBindingNow: false,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseReadAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    paymentAuthorizationAllowedNow: false,
    recipientEarningCreditAllowedNow: false,
    monthlyPayoutAllowedNow: false,
    realtimeBroadcastAllowedNow: false,
    mediaStorageWriteAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    blockingReasons: [
      "adapter_runtime_binding_not_approved",
      "database_repositories_not_bound",
      "provider_secret_store_not_bound",
      "accept_payment_provider_not_configured",
      "wallet_coin_ledger_adapter_not_bound",
      "monthly_payout_batch_not_live",
      `registered_adapter_contracts:${snapshot.totalAdapters}`,
    ],
  };
}
