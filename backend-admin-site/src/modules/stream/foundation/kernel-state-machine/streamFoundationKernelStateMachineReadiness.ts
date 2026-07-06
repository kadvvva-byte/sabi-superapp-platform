import { getStreamFoundationKernelActionReducerReadiness } from "../kernel-action-reducer/streamFoundationKernelActionReducerReadiness";
import { getStreamFoundationKernelStateMachineSnapshot } from "./streamFoundationKernelStateMachine";
import { STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION } from "./streamFoundationKernelStateMachineContracts";

export interface StreamFoundationKernelStateMachineReadiness {
  readonly version: typeof STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION;
  readonly readyForKernelStateMachine: boolean;
  readonly reducerReady: boolean;
  readonly totalTransitions: number;
  readonly coveredStates: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly moneyMovementViolations: number;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForDirectRealtimeConnection: false;
  readonly readyForRouteMount: false;
  readonly streamIndexPatchIncluded: false;
  readonly requiredNextStage: "kernel_state_machine_smoke";
}

export function getStreamFoundationKernelStateMachineReadiness(): StreamFoundationKernelStateMachineReadiness {
  const reducer = getStreamFoundationKernelActionReducerReadiness();
  const snapshot = getStreamFoundationKernelStateMachineSnapshot();
  const readyForKernelStateMachine = reducer.readyForKernelReducer && snapshot.totalTransitions > 0 && snapshot.directBindingViolations === 0 && snapshot.fakeSuccessViolations === 0 && snapshot.moneyMovementViolations === 0;

  return {
    version: STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
    readyForKernelStateMachine,
    reducerReady: reducer.readyForKernelReducer,
    totalTransitions: snapshot.totalTransitions,
    coveredStates: snapshot.stateCoverage.length,
    directBindingViolations: snapshot.directBindingViolations,
    fakeSuccessViolations: snapshot.fakeSuccessViolations,
    moneyMovementViolations: snapshot.moneyMovementViolations,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForDirectRealtimeConnection: false,
    readyForRouteMount: false,
    streamIndexPatchIncluded: false,
    requiredNextStage: "kernel_state_machine_smoke",
  };
}
