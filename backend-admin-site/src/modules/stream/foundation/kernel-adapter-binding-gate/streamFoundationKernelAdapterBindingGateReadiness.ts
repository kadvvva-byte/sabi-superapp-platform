import { getStreamFoundationKernelAdapterBindingGateSnapshot } from "./streamFoundationKernelAdapterBindingGate";
import { STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION } from "./streamFoundationKernelAdapterBindingGateContracts";

export interface StreamFoundationKernelAdapterBindingGateReadiness {
  readonly version: typeof STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly readyForContractReview: boolean;
  readonly readyForRuntimeBindingNow: false;
  readonly totalRegisteredAdapters: number;
  readonly blockedRuntimeAdaptersNow: number;
  readonly missingSafetyGuards: readonly string[];
  readonly nextStep: "BACKEND-STREAM-FOUNDATION-138G";
}

export function getStreamFoundationKernelAdapterBindingGateReadiness(): StreamFoundationKernelAdapterBindingGateReadiness {
  const snapshot = getStreamFoundationKernelAdapterBindingGateSnapshot();
  const missingSafetyGuards: string[] = [];
  if (snapshot.safety.routeMountAllowedNow) missingSafetyGuards.push("route_mount_must_stay_blocked");
  if (snapshot.safety.adapterRuntimeBindingAllowedNow) missingSafetyGuards.push("runtime_binding_must_stay_blocked");
  if (snapshot.safety.databaseWriteAllowedNow) missingSafetyGuards.push("database_write_must_stay_blocked");
  if (snapshot.safety.providerCallAllowedNow) missingSafetyGuards.push("provider_calls_must_stay_blocked");
  if (snapshot.safety.walletMutationAllowedNow) missingSafetyGuards.push("wallet_mutation_must_stay_blocked");
  if (snapshot.safety.fakeSuccessAllowed) missingSafetyGuards.push("fake_success_must_stay_blocked");

  return {
    version: STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
    streamIndexPatchIncluded: false,
    readyForContractReview: missingSafetyGuards.length === 0 && snapshot.allDirectMobileBindingBlocked,
    readyForRuntimeBindingNow: false,
    totalRegisteredAdapters: snapshot.totalRegisteredAdapters,
    blockedRuntimeAdaptersNow: snapshot.blockedRuntimeAdaptersNow,
    missingSafetyGuards,
    nextStep: "BACKEND-STREAM-FOUNDATION-138G",
  };
}
