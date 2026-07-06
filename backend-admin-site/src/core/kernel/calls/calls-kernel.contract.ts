export type CallsKernelStatus = "idle" | "initialized" | "started" | "stopped" | "failed";

export type CallsKernelTranslationReason = "provider_not_configured" | null;

export type CallsKernelRuntimeSnapshot = {
  moduleName: "sabi-calls";
  status: CallsKernelStatus;
  initialized: boolean;
  started: boolean;
  serviceReady: boolean;
  routerReady: boolean;
  repositoryReady: boolean;
  realtimeConfigured: boolean;
  realtimeReady: boolean;
  realtimeRegistered: boolean;
  translationProviderReady: boolean;
  translationProviderKey: string | null;
  translationReason: CallsKernelTranslationReason;
  createdAt: string;
  initializedAt: string | null;
  startedAt: string | null;
  stoppedAt: string | null;
  updatedAt: string;
  lastError: string | null;
};

export type CallsKernelRuntimeUpdate = Partial<
  Pick<
    CallsKernelRuntimeSnapshot,
    | "initialized"
    | "started"
    | "serviceReady"
    | "routerReady"
    | "repositoryReady"
    | "realtimeConfigured"
    | "realtimeReady"
    | "realtimeRegistered"
    | "translationProviderReady"
    | "translationProviderKey"
    | "translationReason"
    | "lastError"
  >
>;
