import { getStreamFoundationKernelStateMachineReadiness } from "../kernel-state-machine/streamFoundationKernelStateMachineReadiness";
import { getStreamFoundationKernelEventDispatcherSnapshot } from "./streamFoundationKernelEventDispatcher";
import { STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION } from "./streamFoundationKernelEventDispatcherContracts";

export interface StreamFoundationKernelEventDispatcherReadiness {
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly readyForKernelEventDispatcher: boolean;
  readonly stateMachineReady: boolean;
  readonly totalStateTransitions: number;
  readonly totalPreparedEvents: number;
  readonly coveredEventKinds: number;
  readonly directBindingViolations: number;
  readonly fakeSuccessViolations: number;
  readonly moneyMovementViolations: number;
  readonly secretLeakViolations: number;
  readonly readyForEventBusPublish: false;
  readonly readyForDirectDbConnection: false;
  readonly readyForDirectProviderConnection: false;
  readonly readyForDirectWalletConnection: false;
  readonly readyForRouteMount: false;
  readonly streamIndexPatchIncluded: false;
  readonly requiredNextStage: "kernel_event_dispatcher_smoke";
}

export function getStreamFoundationKernelEventDispatcherReadiness(): StreamFoundationKernelEventDispatcherReadiness {
  const stateMachine = getStreamFoundationKernelStateMachineReadiness();
  const snapshot = getStreamFoundationKernelEventDispatcherSnapshot();
  const readyForKernelEventDispatcher = stateMachine.readyForKernelStateMachine && snapshot.totalPreparedEvents > 0 && snapshot.directBindingViolations === 0 && snapshot.fakeSuccessViolations === 0 && snapshot.moneyMovementViolations === 0 && snapshot.secretLeakViolations === 0;

  return {
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    readyForKernelEventDispatcher,
    stateMachineReady: stateMachine.readyForKernelStateMachine,
    totalStateTransitions: snapshot.totalStateTransitions,
    totalPreparedEvents: snapshot.totalPreparedEvents,
    coveredEventKinds: snapshot.coveredEventKinds.length,
    directBindingViolations: snapshot.directBindingViolations,
    fakeSuccessViolations: snapshot.fakeSuccessViolations,
    moneyMovementViolations: snapshot.moneyMovementViolations,
    secretLeakViolations: snapshot.secretLeakViolations,
    readyForEventBusPublish: false,
    readyForDirectDbConnection: false,
    readyForDirectProviderConnection: false,
    readyForDirectWalletConnection: false,
    readyForRouteMount: false,
    streamIndexPatchIncluded: false,
    requiredNextStage: "kernel_event_dispatcher_smoke",
  };
}
