import { getStreamFoundationKernelEventQueueSnapshot } from "./streamFoundationKernelEventQueue";
import { STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION } from "./streamFoundationKernelEventQueueContracts";

export interface StreamFoundationKernelEventQueueReadinessSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION;
  readonly status: "foundation_queue_ready_safe_blocked" | "foundation_queue_blocked";
  readonly readyForKernelAdapterBindingLater: boolean;
  readonly queueWriteAllowedNow: false;
  readonly queueConsumerAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly blockerCount: number;
  readonly blockers: readonly string[];
}

export function getStreamFoundationKernelEventQueueReadiness(): StreamFoundationKernelEventQueueReadinessSnapshot {
  const snapshot = getStreamFoundationKernelEventQueueSnapshot();
  const blockers = [
    "queue storage adapter is not bound yet",
    "queue consumer runtime is not mounted yet",
    "route mount approval is still separate",
    "database persistence adapter is still separate",
    "provider and Wallet ledger adapters are still separate",
  ];
  const safe = snapshot.directBindingViolations === 0 && snapshot.fakeSuccessViolations === 0 && snapshot.moneyMovementViolations === 0 && snapshot.secretLeakViolations === 0;
  return {
    version: STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
    status: safe ? "foundation_queue_ready_safe_blocked" : "foundation_queue_blocked",
    readyForKernelAdapterBindingLater: safe,
    queueWriteAllowedNow: false,
    queueConsumerAllowedNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    streamIndexPatchIncluded: false,
    blockerCount: blockers.length,
    blockers,
  };
}
