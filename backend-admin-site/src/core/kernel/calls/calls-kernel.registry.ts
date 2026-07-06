import type {
  CallsKernelRuntimeSnapshot,
  CallsKernelRuntimeUpdate,
  CallsKernelStatus,
} from "./calls-kernel.contract";

function now(): string {
  return new Date().toISOString();
}

function createInitialSnapshot(): CallsKernelRuntimeSnapshot {
  const timestamp = now();

  return {
    moduleName: "sabi-calls",
    status: "idle",
    initialized: false,
    started: false,
    serviceReady: false,
    routerReady: false,
    repositoryReady: false,
    realtimeConfigured: false,
    realtimeReady: false,
    realtimeRegistered: false,
    translationProviderReady: false,
    translationProviderKey: null,
    translationReason: null,
    createdAt: timestamp,
    initializedAt: null,
    startedAt: null,
    stoppedAt: null,
    updatedAt: timestamp,
    lastError: null,
  };
}

let snapshot: CallsKernelRuntimeSnapshot = createInitialSnapshot();

function cloneSnapshot(): CallsKernelRuntimeSnapshot {
  return { ...snapshot };
}

export function getCallsKernelHealthSnapshot(): CallsKernelRuntimeSnapshot {
  return cloneSnapshot();
}

export function registerCallsKernelRuntime(update: CallsKernelRuntimeUpdate): void {
  snapshot = {
    ...snapshot,
    ...update,
    updatedAt: now(),
  };
}

export function setCallsKernelStatus(
  status: CallsKernelStatus,
  error: string | null = null
): void {
  const timestamp = now();

  snapshot = {
    ...snapshot,
    status,
    lastError: error,
    updatedAt: timestamp,
  };

  if (status === "initialized") {
    snapshot.initialized = true;
    snapshot.initializedAt = snapshot.initializedAt ?? timestamp;
  }

  if (status === "started") {
    snapshot.initialized = true;
    snapshot.started = true;
    snapshot.startedAt = timestamp;
  }

  if (status === "stopped") {
    snapshot.started = false;
    snapshot.stoppedAt = timestamp;
  }

  if (status === "failed") {
    snapshot.lastError = error ?? "sabi_calls_kernel_failed";
  }
}

export function markCallsKernelInitialized(update: CallsKernelRuntimeUpdate = {}): void {
  registerCallsKernelRuntime(update);
  setCallsKernelStatus("initialized", null);
}

export function markCallsKernelStarted(update: CallsKernelRuntimeUpdate = {}): void {
  registerCallsKernelRuntime(update);
  setCallsKernelStatus("started", null);
}

export function markCallsKernelStopped(update: CallsKernelRuntimeUpdate = {}): void {
  registerCallsKernelRuntime(update);
  setCallsKernelStatus("stopped", null);
}

export function markCallsKernelFailed(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error ?? "unknown_error");
  setCallsKernelStatus("failed", message);
}

export function resetCallsKernelRegistry(): void {
  snapshot = createInitialSnapshot();
}
