export const SABI_CALLS_KERNEL_EVENTS = {
  INITIALIZED: "sabi-calls.kernel.initialized",
  STARTED: "sabi-calls.kernel.started",
  STOPPED: "sabi-calls.kernel.stopped",
  FAILED: "sabi-calls.kernel.failed",
  HEALTH_CHANGED: "sabi-calls.kernel.health.changed",
} as const;

export type SabiCallsKernelEventName =
  (typeof SABI_CALLS_KERNEL_EVENTS)[keyof typeof SABI_CALLS_KERNEL_EVENTS];
