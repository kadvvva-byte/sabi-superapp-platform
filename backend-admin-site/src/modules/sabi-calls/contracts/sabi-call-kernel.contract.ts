export type SabiCallsKernelRuntimeStatus =
  | "idle"
  | "initialized"
  | "started"
  | "stopped"
  | "failed";

export type SabiCallsKernelHealth = {
  name: "sabi-calls";
  status: SabiCallsKernelRuntimeStatus;
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
  translationReason: "provider_not_configured" | null;
  createdAt: string;
  initializedAt: string | null;
  startedAt: string | null;
  stoppedAt: string | null;
  updatedAt: string;
  lastError: string | null;
  ownsMessengerCalls: false;
  module: unknown | null;
};
