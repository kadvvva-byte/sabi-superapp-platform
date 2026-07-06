import { getStreamFoundationKernelAdapterRegistryReadiness } from "./streamFoundationKernelAdapterRegistryReadiness";
import { STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION } from "./streamFoundationKernelAdapterRegistryContracts";

export interface StreamFoundationKernelAdapterRegistrySmokeResult {
  readonly version: typeof STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION;
  readonly passed: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountViolations: number;
  readonly adapterRuntimeBindingViolations: number;
  readonly databaseAccessViolations: number;
  readonly providerCallViolations: number;
  readonly walletMutationViolations: number;
  readonly moneyMovementViolations: number;
  readonly mediaRealtimeViolations: number;
  readonly secretLeakViolations: number;
  readonly fakeSuccessViolations: number;
}

export function runStreamFoundationKernelAdapterRegistrySmoke(): StreamFoundationKernelAdapterRegistrySmokeResult {
  const readiness = getStreamFoundationKernelAdapterRegistryReadiness();
  const routeMountViolations = readiness.routeMountAllowedNow ? 1 : 0;
  const adapterRuntimeBindingViolations = readiness.readyForAdapterRuntimeBindingNow ? 1 : 0;
  const databaseAccessViolations = readiness.databaseReadAllowedNow || readiness.databaseWriteAllowedNow ? 1 : 0;
  const providerCallViolations = readiness.providerCallAllowedNow ? 1 : 0;
  const walletMutationViolations = readiness.walletMutationAllowedNow ? 1 : 0;
  const moneyMovementViolations = readiness.paymentAuthorizationAllowedNow || readiness.recipientEarningCreditAllowedNow || readiness.monthlyPayoutAllowedNow ? 1 : 0;
  const mediaRealtimeViolations = readiness.realtimeBroadcastAllowedNow || readiness.mediaStorageWriteAllowedNow ? 1 : 0;
  const secretLeakViolations = readiness.rawSecretsReturned || readiness.mobileProviderKeysAllowed ? 1 : 0;
  const fakeSuccessViolations = readiness.fakeSuccessAllowed ? 1 : 0;

  return {
    version: STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION,
    passed: routeMountViolations + adapterRuntimeBindingViolations + databaseAccessViolations + providerCallViolations + walletMutationViolations + moneyMovementViolations + mediaRealtimeViolations + secretLeakViolations + fakeSuccessViolations === 0,
    streamIndexPatchIncluded: false,
    routeMountViolations,
    adapterRuntimeBindingViolations,
    databaseAccessViolations,
    providerCallViolations,
    walletMutationViolations,
    moneyMovementViolations,
    mediaRealtimeViolations,
    secretLeakViolations,
    fakeSuccessViolations,
  };
}
