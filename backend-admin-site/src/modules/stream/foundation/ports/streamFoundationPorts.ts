import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationRequestEnvelope,
  StreamFoundationResponseEnvelope,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";

export type StreamFoundationPortId =
  | "identity_session_port"
  | "realtime_room_port"
  | "live_lifecycle_port"
  | "media_storage_cdn_port"
  | "shorts_feed_port"
  | "moderation_admin_port"
  | "playback_analytics_port"
  | "business_stream_catalog_port"
  | "notification_qr_deeplink_port"
  | "provider_gate_port"
  | "observability_audit_port"
  | "wallet_coin_gift_boundary_port";

export type StreamFoundationPortKind =
  | "identity"
  | "realtime"
  | "lifecycle"
  | "media"
  | "feed"
  | "moderation"
  | "analytics"
  | "business"
  | "notification"
  | "provider_gate"
  | "audit"
  | "last_stage_boundary";

export type StreamFoundationPortStatus =
  | "source_only_contract_ready"
  | "adapter_missing"
  | "admin_gate_missing"
  | "provider_not_configured"
  | "last_stage_locked";

export type StreamFoundationPortMode =
  | "contract_only"
  | "noop_blocking_adapter"
  | "runtime_adapter_later";

export type StreamFoundationPortSafety = Readonly<{
  sourceOnlyNow: true;
  adapterRuntimeEnabledNow: false;
  routeMountAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  externalNetworkAllowedNow: false;
  walletRuntimeMutationAllowedNow: false;
  messengerRuntimeMutationAllowedNow: false;
  giftsPaymentsRuntimeMutationAllowedNow: false;
  fakeSuccessAllowed: false;
  secretMaterialAllowedInResponse: false;
}>;

export const STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT: StreamFoundationPortSafety = {
  sourceOnlyNow: true,
  adapterRuntimeEnabledNow: false,
  routeMountAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  externalNetworkAllowedNow: false,
  walletRuntimeMutationAllowedNow: false,
  messengerRuntimeMutationAllowedNow: false,
  giftsPaymentsRuntimeMutationAllowedNow: false,
  fakeSuccessAllowed: false,
  secretMaterialAllowedInResponse: false,
};

export type StreamFoundationPortDescriptor = Readonly<{
  portId: StreamFoundationPortId;
  kind: StreamFoundationPortKind;
  mode: StreamFoundationPortMode;
  status: StreamFoundationPortStatus;
  requiredGate: StreamFoundationGateId;
  surfaces: readonly StreamFoundationSurface[];
  actions: readonly StreamFoundationAction[];
  safeMessageKey: string;
  runtimeImplementationFileAllowedLater: boolean;
  safety: StreamFoundationPortSafety;
}>;

export type StreamFoundationPortDecision = Readonly<{
  portId: StreamFoundationPortId;
  status: StreamFoundationPortStatus;
  ok: false;
  safeCode: StreamFoundationSafeCode;
  safeMessageKey: string;
  severity: StreamFoundationSeverity;
  blockedByGate: StreamFoundationGateId;
  adapterRuntimeEnabledNow: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationAdapterRequest = Readonly<{
  request: StreamFoundationRequestEnvelope;
  expectedPort: StreamFoundationPortId;
  correlationId: string;
}>;

export type StreamFoundationAdapterResponse = Readonly<{
  portDecision: StreamFoundationPortDecision;
  responseEnvelope: StreamFoundationResponseEnvelope;
}>;

export type StreamFoundationPortRegistrySnapshot = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136E_PORTS_ADAPTERS_STAGING";
  totalPorts: number;
  contractOnlyPorts: number;
  blockingNoopAdapters: number;
  runtimeAdaptersEnabledNow: 0;
  providerReadyPortsNow: 0;
  routeMountReadyPortsNow: 0;
  databaseWriteReadyPortsNow: 0;
  descriptors: readonly StreamFoundationPortDescriptor[];
  safety: StreamFoundationPortSafety;
}>;
