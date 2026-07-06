import { getStreamFoundationKernelStateMachineReadiness } from "./kernel-state-machine/streamFoundationKernelStateMachineReadiness";
import { getStreamFoundationKernelStateMachineSmokeSnapshot } from "./kernel-state-machine/streamFoundationKernelStateMachineSmoke";
import { getStreamFoundationKernelStateMachineSnapshot } from "./kernel-state-machine/streamFoundationKernelStateMachine";
import { STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION } from "./kernel-state-machine/streamFoundationKernelStateMachineContracts";

export interface Stream138ABackendFoundationKernelStateMachineStagingManifest {
  readonly version: typeof STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION;
  readonly patchScope: "foundation_only_no_stream_index";
  readonly summary: string;
  readonly totalTransitions: number;
  readonly coveredStates: number;
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
  readonly nextStage: "BACKEND-STREAM-FOUNDATION-138B kernel event dispatcher contracts";
}

export function getStream138ABackendFoundationKernelStateMachineStagingManifest(): Stream138ABackendFoundationKernelStateMachineStagingManifest {
  const snapshot = getStreamFoundationKernelStateMachineSnapshot();
  const readiness = getStreamFoundationKernelStateMachineReadiness();
  const smoke = getStreamFoundationKernelStateMachineSmokeSnapshot();

  return {
    version: STREAM_FOUNDATION_138A_KERNEL_STATE_MACHINE_VERSION,
    patchScope: "foundation_only_no_stream_index",
    summary: "Adds a Stream foundation kernel state machine that turns reducer decisions into strict lifecycle and monetization states for Live, Shorts, Business Stream, creator, moderation, analytics, gifts, Admin monetization, and monthly payout without direct DB/provider/Wallet/realtime binding.",
    totalTransitions: snapshot.totalTransitions,
    coveredStates: snapshot.stateCoverage.length,
    readinessPassed: readiness.readyForKernelStateMachine,
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
    nextStage: "BACKEND-STREAM-FOUNDATION-138B kernel event dispatcher contracts",
  };
}
