import { getStreamFoundationKernelFacadeActionRouterReadiness } from "../kernel-action-router/streamFoundationKernelFacadeActionRouterReadiness";
import { getStreamFoundationKernelActionReducerSnapshot } from "./streamFoundationKernelActionReducer";
import { STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION } from "./streamFoundationKernelActionReducerContracts";

export interface StreamFoundationKernelActionReducerReadiness {
  readonly version: typeof STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION;
  readonly readyForKernelReducer: boolean;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForDirectRealtimeConnection: false;
  readonly readyForRouteMount: false;
  readonly streamIndexPatchIncluded: false;
  readonly totalReducerCases: number;
  readonly routerReadyForKernelActionRouting: boolean;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly requiredNextStage: "kernel_reducer_smoke";
}

export function getStreamFoundationKernelActionReducerReadiness(): StreamFoundationKernelActionReducerReadiness {
  const router = getStreamFoundationKernelFacadeActionRouterReadiness();
  const reducer = getStreamFoundationKernelActionReducerSnapshot();
  const directBindingViolations = reducer.directBindingViolations + router.directBindingViolations;
  const fakeSuccessViolations = reducer.fakeSuccessViolations + router.fakeSuccessViolations;

  return {
    version: STREAM_FOUNDATION_137Z_KERNEL_ACTION_REDUCER_VERSION,
    readyForKernelReducer: router.readyForKernelActionRouting && reducer.uncoveredActions.length === 0 && directBindingViolations === 0 && fakeSuccessViolations === 0,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForDirectRealtimeConnection: false,
    readyForRouteMount: false,
    streamIndexPatchIncluded: false,
    totalReducerCases: reducer.totalReducerCases,
    routerReadyForKernelActionRouting: router.readyForKernelActionRouting,
    directBindingViolations,
    fakeSuccessViolations,
    requiredNextStage: "kernel_reducer_smoke",
  };
}
