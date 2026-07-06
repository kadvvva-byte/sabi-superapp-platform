import { getStreamFoundationKernelBridgeSnapshot } from "../kernel-bridge/streamFoundationKernelBridgePolicy";
import { getStreamFoundationKernelFacadeConnectionSnapshot } from "./streamFoundationKernelFacadeConnectionPolicy";
import { STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION } from "./streamFoundationKernelFacadeConnectionContracts";

export interface StreamFoundationKernelFacadeConnectionReadiness {
  readonly version: typeof STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION;
  readonly readyForKernelOnlyConnection: boolean;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForDirectRealtimeConnection: false;
  readonly streamIndexPatchIncluded: false;
  readonly totalFacadeRules: number;
  readonly totalBridgePolicies: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly missingBridgePolicies: readonly string[];
  readonly requiredNextStage: "kernel_connection_smoke";
}

export function getStreamFoundationKernelFacadeConnectionReadiness(): StreamFoundationKernelFacadeConnectionReadiness {
  const facade = getStreamFoundationKernelFacadeConnectionSnapshot();
  const bridge = getStreamFoundationKernelBridgeSnapshot();
  const missingBridgePolicies = facade.rules
    .filter((rule) => !bridge.policyItems.some((item) => item.surface === rule.bridgeSurface && item.action === rule.bridgeAction))
    .map((rule) => `${rule.surface}:${rule.intent}->${rule.bridgeSurface}:${rule.bridgeAction}`);

  const directBindingViolations = facade.directBindingViolations + bridge.directBindingViolations;
  const fakeSuccessViolations = facade.fakeSuccessViolations + bridge.fakeSuccessViolations;

  return {
    version: STREAM_FOUNDATION_137X_KERNEL_FACADE_CONNECTION_VERSION,
    readyForKernelOnlyConnection: missingBridgePolicies.length === 0 && directBindingViolations === 0 && fakeSuccessViolations === 0,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForDirectRealtimeConnection: false,
    streamIndexPatchIncluded: false,
    totalFacadeRules: facade.totalRules,
    totalBridgePolicies: bridge.totalPolicyItems,
    directBindingViolations,
    fakeSuccessViolations,
    missingBridgePolicies,
    requiredNextStage: "kernel_connection_smoke",
  };
}
