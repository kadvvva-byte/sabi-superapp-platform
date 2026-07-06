import type {
  StreamFoundationAction,
  StreamFoundationGateId,
  StreamFoundationSafeCode,
  StreamFoundationSeverity,
  StreamFoundationSurface,
} from "../core";
import {
  STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
  type StreamFoundationPortDecision,
  type StreamFoundationPortDescriptor,
  type StreamFoundationPortId,
  type StreamFoundationPortKind,
  type StreamFoundationPortRegistrySnapshot,
  type StreamFoundationPortStatus,
} from "./streamFoundationPorts";

const descriptor = (
  portId: StreamFoundationPortId,
  kind: StreamFoundationPortKind,
  status: StreamFoundationPortStatus,
  requiredGate: StreamFoundationGateId,
  surfaces: readonly StreamFoundationSurface[],
  actions: readonly StreamFoundationAction[],
  safeMessageKey: string,
): StreamFoundationPortDescriptor => ({
  portId,
  kind,
  mode: status === "source_only_contract_ready" ? "contract_only" : "noop_blocking_adapter",
  status,
  requiredGate,
  surfaces,
  actions,
  safeMessageKey,
  runtimeImplementationFileAllowedLater: true,
  safety: STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
});

export const STREAM_FOUNDATION_PORT_DESCRIPTORS: readonly StreamFoundationPortDescriptor[] = [
  descriptor(
    "identity_session_port",
    "identity",
    "source_only_contract_ready",
    "identity_session_gate",
    ["stream_entry", "live_composer", "creator_profile", "business_stream", "moderation_admin"],
    ["open_surface", "prepare_live_draft", "request_creator_verification", "request_business_product_attach"],
    "stream.foundation.port.identity_session.contract_ready",
  ),
  descriptor(
    "realtime_room_port",
    "realtime",
    "adapter_missing",
    "realtime_room_gate",
    ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file"],
    ["start_live", "stop_live", "join_live", "send_live_heartbeat"],
    "stream.foundation.port.realtime_room.adapter_missing",
  ),
  descriptor(
    "live_lifecycle_port",
    "lifecycle",
    "adapter_missing",
    "live_lifecycle_gate",
    ["live_single", "live_group", "live_audio", "live_game_screen", "live_video_file", "business_stream"],
    ["start_live", "stop_live", "join_live", "send_live_heartbeat"],
    "stream.foundation.port.live_lifecycle.adapter_missing",
  ),
  descriptor(
    "media_storage_cdn_port",
    "media",
    "provider_not_configured",
    "media_storage_cdn_gate",
    ["shorts_creator", "shorts_feed", "live_game_screen", "live_video_file"],
    ["upload_short_media", "publish_short", "load_shorts_feed", "start_live"],
    "stream.foundation.port.media_storage.provider_not_configured",
  ),
  descriptor(
    "shorts_feed_port",
    "feed",
    "adapter_missing",
    "shorts_moderation_feed_gate",
    ["shorts_creator", "shorts_feed"],
    ["publish_short", "load_shorts_feed"],
    "stream.foundation.port.shorts_feed.adapter_missing",
  ),
  descriptor(
    "moderation_admin_port",
    "moderation",
    "admin_gate_missing",
    "moderation_admin_gate",
    ["moderation_admin", "shorts_creator", "shorts_feed", "business_stream", "creator_profile"],
    ["report_content", "publish_short", "request_creator_verification", "request_business_product_attach"],
    "stream.foundation.port.moderation_admin.gate_missing",
  ),
  descriptor(
    "playback_analytics_port",
    "analytics",
    "adapter_missing",
    "observability_audit_gate",
    ["playback_analytics", "shorts_feed", "live_single", "live_group", "live_audio", "live_game_screen", "live_video_file"],
    ["load_playback_analytics", "load_shorts_feed", "send_live_heartbeat"],
    "stream.foundation.port.playback_analytics.adapter_missing",
  ),
  descriptor(
    "business_stream_catalog_port",
    "business",
    "admin_gate_missing",
    "business_merchant_catalog_gate",
    ["business_stream"],
    ["request_business_product_attach", "start_live", "stop_live"],
    "stream.foundation.port.business_catalog.gate_missing",
  ),
  descriptor(
    "notification_qr_deeplink_port",
    "notification",
    "adapter_missing",
    "notification_qr_deeplink_gate",
    ["stream_entry", "live_single", "live_group", "shorts_feed", "creator_profile", "business_stream"],
    ["open_surface", "join_live", "load_shorts_feed", "request_creator_verification"],
    "stream.foundation.port.notification_qr_deeplink.adapter_missing",
  ),
  descriptor(
    "provider_gate_port",
    "provider_gate",
    "provider_not_configured",
    "provider_secret_gate",
    ["shorts_creator", "live_game_screen", "live_video_file", "business_stream", "wallet_gift_boundary"],
    ["upload_short_media", "start_live", "request_business_product_attach", "request_gift_send"],
    "stream.foundation.port.provider_gate.provider_not_configured",
  ),
  descriptor(
    "observability_audit_port",
    "audit",
    "source_only_contract_ready",
    "observability_audit_gate",
    ["stream_entry", "live_composer", "shorts_creator", "business_stream", "moderation_admin", "playback_analytics"],
    ["open_surface", "prepare_live_draft", "prepare_short_draft", "report_content", "load_playback_analytics"],
    "stream.foundation.port.observability_audit.contract_ready",
  ),
  descriptor(
    "wallet_coin_gift_boundary_port",
    "last_stage_boundary",
    "last_stage_locked",
    "wallet_coin_gift_last_stage_gate",
    ["wallet_gift_boundary"],
    ["request_gift_send"],
    "stream.foundation.port.wallet_coin_gift.last_stage_locked",
  ),
] as const;

export function getStreamFoundationPortDescriptor(portId: StreamFoundationPortId): StreamFoundationPortDescriptor | undefined {
  return STREAM_FOUNDATION_PORT_DESCRIPTORS.find((descriptorItem) => descriptorItem.portId === portId);
}

export function getStreamFoundationPortsForSurface(surface: StreamFoundationSurface): readonly StreamFoundationPortDescriptor[] {
  return STREAM_FOUNDATION_PORT_DESCRIPTORS.filter((descriptorItem) => descriptorItem.surfaces.includes(surface));
}

export function getStreamFoundationPortsForAction(action: StreamFoundationAction): readonly StreamFoundationPortDescriptor[] {
  return STREAM_FOUNDATION_PORT_DESCRIPTORS.filter((descriptorItem) => descriptorItem.actions.includes(action));
}

function portStatusToCode(status: StreamFoundationPortStatus): StreamFoundationSafeCode {
  if (status === "source_only_contract_ready") return "STREAM_SOURCE_ONLY_PREVIEW_ALLOWED";
  if (status === "admin_gate_missing") return "STREAM_ADMIN_GATE_REQUIRED";
  if (status === "provider_not_configured") return "STREAM_PROVIDER_NOT_CONFIGURED";
  if (status === "last_stage_locked") return "STREAM_WALLET_GIFT_LAST_STAGE_LOCKED";
  return "STREAM_BACKEND_COMMON_FOUNDATION_MISSING";
}

function portStatusToSeverity(status: StreamFoundationPortStatus): StreamFoundationSeverity {
  if (status === "source_only_contract_ready") return "info";
  if (status === "admin_gate_missing") return "review_required";
  if (status === "last_stage_locked") return "locked";
  return "blocked";
}

export function createStreamFoundationPortDecision(portId: StreamFoundationPortId): StreamFoundationPortDecision {
  const descriptorItem = getStreamFoundationPortDescriptor(portId);

  if (!descriptorItem) {
    return {
      portId,
      status: "adapter_missing",
      ok: false,
      safeCode: "STREAM_BACKEND_COMMON_FOUNDATION_MISSING",
      safeMessageKey: "stream.foundation.port.unknown.adapter_missing",
      severity: "blocked",
      blockedByGate: "stream_kernel_gateway_gate",
      adapterRuntimeEnabledNow: false,
      routeMountAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      fakeSuccessAllowed: false,
    };
  }

  return {
    portId,
    status: descriptorItem.status,
    ok: false,
    safeCode: portStatusToCode(descriptorItem.status),
    safeMessageKey: descriptorItem.safeMessageKey,
    severity: portStatusToSeverity(descriptorItem.status),
    blockedByGate: descriptorItem.requiredGate,
    adapterRuntimeEnabledNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}

export function getStreamFoundationPortRegistrySnapshot(): StreamFoundationPortRegistrySnapshot {
  const contractOnlyPorts = STREAM_FOUNDATION_PORT_DESCRIPTORS.filter((descriptorItem) => descriptorItem.mode === "contract_only").length;

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136E_PORTS_ADAPTERS_STAGING",
    totalPorts: STREAM_FOUNDATION_PORT_DESCRIPTORS.length,
    contractOnlyPorts,
    blockingNoopAdapters: STREAM_FOUNDATION_PORT_DESCRIPTORS.length - contractOnlyPorts,
    runtimeAdaptersEnabledNow: 0,
    providerReadyPortsNow: 0,
    routeMountReadyPortsNow: 0,
    databaseWriteReadyPortsNow: 0,
    descriptors: STREAM_FOUNDATION_PORT_DESCRIPTORS,
    safety: STREAM_FOUNDATION_PORT_SAFE_SNAPSHOT,
  };
}
