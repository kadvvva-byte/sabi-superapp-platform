import {
  createStreamFoundationResponseEnvelope,
  createStreamFoundationSourceOnlyRequest,
  type StreamFoundationAction,
  type StreamFoundationRequestEnvelope,
  type StreamFoundationSurface,
} from "../core";
import {
  createStreamFoundationPortDecision,
  getStreamFoundationPortsForAction,
  getStreamFoundationPortsForSurface,
} from "./streamFoundationPortRegistry";
import type {
  StreamFoundationAdapterRequest,
  StreamFoundationAdapterResponse,
  StreamFoundationPortDecision,
  StreamFoundationPortId,
} from "./streamFoundationPorts";

export type StreamFoundationNoopAdapterSnapshot = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136E_NOOP_ADAPTERS";
  adapterRuntimeEnabledNow: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  fakeSuccessAllowed: false;
  sampleDecisions: readonly StreamFoundationPortDecision[];
}>;

export function createStreamFoundationNoopAdapterResponse(
  adapterRequest: StreamFoundationAdapterRequest,
): StreamFoundationAdapterResponse {
  return {
    portDecision: createStreamFoundationPortDecision(adapterRequest.expectedPort),
    responseEnvelope: createStreamFoundationResponseEnvelope(adapterRequest.request),
  };
}

export function createStreamFoundationNoopAdapterRequest(
  requestId: string,
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
  expectedPort: StreamFoundationPortId,
): StreamFoundationAdapterRequest {
  return {
    request: createStreamFoundationSourceOnlyRequest(requestId, surface, action),
    expectedPort,
    correlationId: `stream-136e-${requestId}`,
  };
}

export function getStreamFoundationNoopAdapterSnapshot(): StreamFoundationNoopAdapterSnapshot {
  const samples: readonly StreamFoundationPortId[] = [
    "realtime_room_port",
    "media_storage_cdn_port",
    "moderation_admin_port",
    "provider_gate_port",
    "wallet_coin_gift_boundary_port",
  ];

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136E_NOOP_ADAPTERS",
    adapterRuntimeEnabledNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    fakeSuccessAllowed: false,
    sampleDecisions: samples.map((portId) => createStreamFoundationPortDecision(portId)),
  };
}

export function getStreamFoundationPortIdsForSurfaceAction(
  surface: StreamFoundationSurface,
  action: StreamFoundationAction,
): readonly StreamFoundationPortId[] {
  const bySurface = getStreamFoundationPortsForSurface(surface).map((port) => port.portId);
  const byAction = getStreamFoundationPortsForAction(action).map((port) => port.portId);
  return bySurface.filter((portId) => byAction.includes(portId));
}
