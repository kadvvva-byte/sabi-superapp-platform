import { getStreamFoundationKernelBridgeSnapshot } from "./streamFoundationKernelBridgePolicy";
import { STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION } from "./streamFoundationKernelBridgeContracts";

export interface StreamFoundation137WKernelBridgeReadiness {
  readonly version: typeof STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION;
  readonly readyForKernelOnlyConnection: boolean;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForDirectRealtimeConnection: false;
  readonly readyForRouteMountNow: false;
  readonly policyItems: number;
  readonly violations: number;
  readonly requiredNextStage: "kernel_facade_connection";
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundation137WKernelBridgeReadiness(): StreamFoundation137WKernelBridgeReadiness {
  const snapshot = getStreamFoundationKernelBridgeSnapshot();
  const violations = snapshot.directBindingViolations + snapshot.fakeSuccessViolations;

  return {
    version: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION,
    readyForKernelOnlyConnection: violations === 0,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForDirectRealtimeConnection: false,
    readyForRouteMountNow: false,
    policyItems: snapshot.totalPolicyItems,
    violations,
    requiredNextStage: "kernel_facade_connection",
    streamIndexPatchIncluded: false,
  };
}
