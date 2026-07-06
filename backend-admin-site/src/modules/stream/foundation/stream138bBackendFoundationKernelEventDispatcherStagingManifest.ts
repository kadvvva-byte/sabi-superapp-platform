import { getStreamFoundationKernelEventDispatcherSnapshot } from "./kernel-event-dispatcher/streamFoundationKernelEventDispatcher";
import { getStreamFoundationKernelEventDispatcherReadiness } from "./kernel-event-dispatcher/streamFoundationKernelEventDispatcherReadiness";
import { getStreamFoundationKernelEventDispatcherSmokeSnapshot } from "./kernel-event-dispatcher/streamFoundationKernelEventDispatcherSmoke";
import { STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION } from "./kernel-event-dispatcher/streamFoundationKernelEventDispatcherContracts";

export interface Stream138BBackendFoundationKernelEventDispatcherStagingManifest {
  readonly version: typeof STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION;
  readonly patchScope: "foundation_only_no_stream_index";
  readonly summary: string;
  readonly totalStateTransitions: number;
  readonly totalPreparedEvents: number;
  readonly coveredEventKinds: number;
  readonly readinessPassed: boolean;
  readonly smokePassed: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly nextStage: "BACKEND-STREAM-FOUNDATION-138C kernel event queue contracts";
}

export function getStream138BBackendFoundationKernelEventDispatcherStagingManifest(): Stream138BBackendFoundationKernelEventDispatcherStagingManifest {
  const snapshot = getStreamFoundationKernelEventDispatcherSnapshot();
  const readiness = getStreamFoundationKernelEventDispatcherReadiness();
  const smoke = getStreamFoundationKernelEventDispatcherSmokeSnapshot();

  return {
    version: STREAM_FOUNDATION_138B_KERNEL_EVENT_DISPATCHER_VERSION,
    patchScope: "foundation_only_no_stream_index",
    summary: "Adds a foundation-only kernel event dispatcher that converts safe state-machine transitions into redacted event envelopes for Live, Shorts, Gifts, Admin monetization, and monthly payout gates without event-bus publish, route mount, DB write, provider call, Wallet mutation, or money movement.",
    totalStateTransitions: snapshot.totalStateTransitions,
    totalPreparedEvents: snapshot.totalPreparedEvents,
    coveredEventKinds: snapshot.coveredEventKinds.length,
    readinessPassed: readiness.readyForKernelEventDispatcher,
    smokePassed: smoke.failedCases === 0,
    streamIndexPatchIncluded: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    nextStage: "BACKEND-STREAM-FOUNDATION-138C kernel event queue contracts",
  };
}
