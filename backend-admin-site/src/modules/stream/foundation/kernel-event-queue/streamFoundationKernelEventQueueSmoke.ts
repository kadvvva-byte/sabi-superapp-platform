import { getStreamFoundationKernelEventQueueReadiness } from "./streamFoundationKernelEventQueueReadiness";
import { getStreamFoundationKernelEventQueueSnapshot } from "./streamFoundationKernelEventQueue";
import { STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION } from "./streamFoundationKernelEventQueueContracts";

export interface StreamFoundationKernelEventQueueSmokeResult {
  readonly version: typeof STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION;
  readonly passed: boolean;
  readonly checked: readonly string[];
  readonly failed: readonly string[];
}

export function smokeStreamFoundationKernelEventQueue(): StreamFoundationKernelEventQueueSmokeResult {
  const snapshot = getStreamFoundationKernelEventQueueSnapshot();
  const readiness = getStreamFoundationKernelEventQueueReadiness();
  const checks: readonly [string, boolean][] = [
    ["prepared events are represented as queue items", snapshot.totalQueuedItems > 0],
    ["queue writes are blocked now", snapshot.queueWriteExecutedNow === false],
    ["queue consumers are blocked now", snapshot.queueConsumerStartedNow === false],
    ["route mount is blocked now", snapshot.routeMountAllowedNow === false],
    ["database write is blocked now", snapshot.databaseWriteAllowedNow === false],
    ["provider call is blocked now", snapshot.providerCallAllowedNow === false],
    ["Wallet mutation is blocked now", snapshot.walletMutationAllowedNow === false],
    ["money movement is blocked now", snapshot.moneyMovementAllowedNow === false],
    ["no stream index patch included", snapshot.streamIndexPatchIncluded === false],
    ["no direct binding violations", snapshot.directBindingViolations === 0],
    ["no fake success violations", snapshot.fakeSuccessViolations === 0],
    ["no money movement violations", snapshot.moneyMovementViolations === 0],
    ["no secret leak violations", snapshot.secretLeakViolations === 0],
    ["readiness is safe blocked", readiness.status === "foundation_queue_ready_safe_blocked"],
  ];
  const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
  return {
    version: STREAM_FOUNDATION_138C_KERNEL_EVENT_QUEUE_VERSION,
    passed: failed.length === 0,
    checked: checks.map(([name]) => name),
    failed,
  };
}
