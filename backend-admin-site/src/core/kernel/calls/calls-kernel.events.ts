export const CALLS_KERNEL_EVENTS = {
  INITIALIZED: "calls.kernel.initialized",
  STARTED: "calls.kernel.started",
  STOPPED: "calls.kernel.stopped",
  FAILED: "calls.kernel.failed",
  HEALTH_CHANGED: "calls.kernel.health.changed",
} as const;

export type CallsKernelEventName =
  (typeof CALLS_KERNEL_EVENTS)[keyof typeof CALLS_KERNEL_EVENTS];
