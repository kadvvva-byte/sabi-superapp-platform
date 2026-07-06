import { getStreamFoundationKernelFacadeConnectionReadiness } from "../kernel-facade/streamFoundationKernelFacadeConnectionReadiness";
import {
  getStreamFoundationKernelFacadeActionRouterSnapshot,
} from "./streamFoundationKernelFacadeActionRouter";
import { STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION } from "./streamFoundationKernelFacadeActionRouterContracts";

export interface StreamFoundationKernelFacadeActionRouterReadiness {
  readonly version: typeof STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION;
  readonly readyForKernelActionRouting: boolean;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForDirectRealtimeConnection: false;
  readonly readyForRouteMount: false;
  readonly streamIndexPatchIncluded: false;
  readonly totalRouterRoutes: number;
  readonly totalFacadeRules: number;
  readonly missingFacadeConnections: readonly string[];
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly requiredNextStage: "kernel_action_router_smoke";
}

export function getStreamFoundationKernelFacadeActionRouterReadiness(): StreamFoundationKernelFacadeActionRouterReadiness {
  const router = getStreamFoundationKernelFacadeActionRouterSnapshot();
  const facade = getStreamFoundationKernelFacadeConnectionReadiness();
  const directBindingViolations = router.directBindingViolations + facade.directBindingViolations;
  const fakeSuccessViolations = router.fakeSuccessViolations + facade.fakeSuccessViolations;

  return {
    version: STREAM_FOUNDATION_137Y_KERNEL_FACADE_ACTION_ROUTER_VERSION,
    readyForKernelActionRouting: router.missingFacadeConnections.length === 0 && facade.readyForKernelOnlyConnection && directBindingViolations === 0 && fakeSuccessViolations === 0,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForDirectRealtimeConnection: false,
    readyForRouteMount: false,
    streamIndexPatchIncluded: false,
    totalRouterRoutes: router.totalRoutes,
    totalFacadeRules: facade.totalFacadeRules,
    missingFacadeConnections: router.missingFacadeConnections,
    directBindingViolations,
    fakeSuccessViolations,
    requiredNextStage: "kernel_action_router_smoke",
  };
}
