import {
  STREAM_FOUNDATION_SAFE_SNAPSHOT,
  type StreamFoundationRequestEnvelope,
  type StreamFoundationResponseEnvelope,
} from "./streamFoundationCoreTypes";
import {
  createStreamFoundationGateSnapshot,
  getStreamFoundationActionPolicy,
  isStreamFoundationActionAllowedForSurface,
} from "./streamFoundationGatePolicy";

const UNKNOWN_ACTION_GATES = [
  createStreamFoundationGateSnapshot("stream_kernel_gateway_gate", "blocked_backend_common_missing"),
] as const;

export function createStreamFoundationResponseEnvelope(
  request: StreamFoundationRequestEnvelope,
): StreamFoundationResponseEnvelope {
  const policy = getStreamFoundationActionPolicy(request.action);
  const actionAllowedForSurface = isStreamFoundationActionAllowedForSurface(request.surface, request.action);

  if (!policy || !actionAllowedForSurface) {
    return {
      ok: false,
      safeCode: "STREAM_UNKNOWN_ACTION_BLOCKED",
      safeMessageKey: "stream.foundation.unknown_action.blocked",
      severity: "blocked",
      mobileAction: "show_blocked_state",
      request: {
        requestId: request.requestId,
        surface: request.surface,
        action: request.action,
      },
      gates: UNKNOWN_ACTION_GATES,
      safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
    };
  }

  const gates = policy.requiredGates.map((gateId) => createStreamFoundationGateSnapshot(gateId, policy.blockedBy));

  return {
    ok: policy.sourceOnlyLocalPreviewAllowed,
    safeCode: policy.safeCode,
    safeMessageKey: policy.safeMessageKey,
    severity: policy.severity,
    mobileAction: policy.mobileAction,
    request: {
      requestId: request.requestId,
      surface: request.surface,
      action: request.action,
    },
    gates,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export function createStreamFoundationSourceOnlyRequest(
  requestId: string,
  surface: StreamFoundationRequestEnvelope["surface"],
  action: StreamFoundationRequestEnvelope["action"],
): StreamFoundationRequestEnvelope {
  return {
    requestId,
    stage: "BACKEND_STREAM_FOUNDATION_CORE_STAGING",
    surface,
    action,
    ownerScope: surface === "business_stream" ? "business" : surface === "moderation_admin" ? "admin" : "user",
    locale: "system_default",
  };
}
