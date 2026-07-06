import { getStreamFoundationKernelAdapterDefaultHealthSnapshot } from "./streamFoundationKernelAdapterHealthSnapshot";
import { STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION } from "./streamFoundationKernelAdapterHealthContracts";

export interface StreamFoundationKernelAdapterHealthReadiness {
  readonly version: typeof STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly readyForAdminSnapshot: boolean;
  readonly readyForRuntimeBindingNow: false;
  readonly readyForMoneyMovementNow: false;
  readonly totalAdapters: number;
  readonly healthyContractOnlyAdapters: number;
  readonly blockedAdapters: number;
  readonly reviewRequiredAdapters: number;
  readonly missingSafetyGuards: readonly string[];
  readonly nextStep: "BACKEND-STREAM-FOUNDATION-138H";
}

export function getStreamFoundationKernelAdapterHealthReadiness(): StreamFoundationKernelAdapterHealthReadiness {
  const snapshot = getStreamFoundationKernelAdapterDefaultHealthSnapshot();
  const missingSafetyGuards: string[] = [];
  if (snapshot.safety.routeMountAllowedNow) missingSafetyGuards.push("route_mount_must_stay_blocked");
  if (snapshot.safety.adapterRuntimeBindingAllowedNow) missingSafetyGuards.push("runtime_adapter_binding_must_stay_blocked");
  if (snapshot.safety.databaseWriteAllowedNow) missingSafetyGuards.push("database_write_must_stay_blocked");
  if (snapshot.safety.providerCallAllowedNow) missingSafetyGuards.push("provider_calls_must_stay_blocked");
  if (snapshot.safety.walletMutationAllowedNow) missingSafetyGuards.push("wallet_mutation_must_stay_blocked");
  if (snapshot.safety.paymentAuthorizationAllowedNow) missingSafetyGuards.push("payment_authorization_must_stay_blocked");
  if (snapshot.safety.monthlyPayoutAllowedNow) missingSafetyGuards.push("monthly_payout_must_stay_blocked");
  if (snapshot.safety.fakeSuccessAllowed) missingSafetyGuards.push("fake_success_must_stay_blocked");

  return {
    version: STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION,
    streamIndexPatchIncluded: false,
    readyForAdminSnapshot: missingSafetyGuards.length === 0 && snapshot.allAdaptersServerSideOnly && snapshot.allMobileDirectAccessBlocked,
    readyForRuntimeBindingNow: false,
    readyForMoneyMovementNow: false,
    totalAdapters: snapshot.totalAdapters,
    healthyContractOnlyAdapters: snapshot.healthyContractOnlyAdapters,
    blockedAdapters: snapshot.blockedAdapters,
    reviewRequiredAdapters: snapshot.reviewRequiredAdapters,
    missingSafetyGuards,
    nextStep: "BACKEND-STREAM-FOUNDATION-138H",
  };
}
