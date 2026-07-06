import {
  STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION,
  type StreamFoundation140YBlockedCode,
  type StreamFoundation140YLiveWriteBlockedEnvelope,
  type StreamFoundation140YLiveWriteCommandId,
  type StreamFoundation140YLiveWriteDraftRequest,
  type StreamFoundation140YLiveWriteRouteId,
} from "./streamFoundationLiveWriteHandlerSourceOnlyDraftContracts";

const COMMON_REQUIRED_BEFORE_RUNTIME = [
  "identity_session_gate",
  "rate_limit_gate",
  "moderation_policy_gate",
  "repository_gate",
  "realtime_provider_readiness_gate",
  "event_audit_gate",
  "owner_runtime_mount_approval",
] as const;

function commandIdForRoute(routeId: StreamFoundation140YLiveWriteRouteId): StreamFoundation140YLiveWriteCommandId {
  if (routeId === "stream_live_start") return "stream_start_live_session_command";
  if (routeId === "stream_live_stop") return "stream_stop_live_session_command";
  return "stream_live_heartbeat_command";
}

function auditPlanForRoute(routeId: StreamFoundation140YLiveWriteRouteId): readonly string[] {
  if (routeId === "stream_live_start") {
    return [
      "stream_live_session_start_requested",
      "stream_live_session_start_source_only_blocked",
      "stream_live_session_start_owner_approval_required",
    ];
  }

  if (routeId === "stream_live_stop") {
    return [
      "stream_live_session_stop_requested",
      "stream_live_session_stop_source_only_blocked",
      "stream_live_session_stop_owner_approval_required",
    ];
  }

  return [
    "stream_live_heartbeat_received",
    "stream_live_heartbeat_source_only_blocked",
    "stream_live_heartbeat_owner_approval_required",
  ];
}

function blockedCodeForRequest(request: StreamFoundation140YLiveWriteDraftRequest): StreamFoundation140YBlockedCode {
  if (!request.actorUserId || !request.deviceSessionId) return "STREAM_IDENTITY_SESSION_REQUIRED";
  return "STREAM_OWNER_RUNTIME_APPROVAL_REQUIRED";
}

export function createStreamFoundationLiveWriteSourceOnlyBlockedEnvelope(
  request: StreamFoundation140YLiveWriteDraftRequest,
): StreamFoundation140YLiveWriteBlockedEnvelope {
  const routeCommandId = commandIdForRoute(request.routeId);

  return {
    version: STREAM_FOUNDATION_140Y_LIVE_WRITE_HANDLER_DRAFT_VERSION,
    ok: false,
    sourceOnly: true,
    runtimeMountedNow: false,
    runtimePostAllowedNow: false,
    routeId: request.routeId,
    commandId: request.commandId || routeCommandId,
    statusCode: 423,
    blockedCode: blockedCodeForRequest(request),
    safeMessageKey: "stream.foundation.140y.liveWrite.runtimeBlockedSourceOnly",
    fakeSuccessAllowed: false,
    databaseWritePerformed: 0,
    providerCallPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    auditPlan: auditPlanForRoute(request.routeId),
    requiredBeforeRuntimeMount: COMMON_REQUIRED_BEFORE_RUNTIME,
  };
}

export function handleStreamFoundationLiveStartSourceOnlyDraft(
  request: Omit<StreamFoundation140YLiveWriteDraftRequest, "routeId" | "commandId">,
): StreamFoundation140YLiveWriteBlockedEnvelope {
  return createStreamFoundationLiveWriteSourceOnlyBlockedEnvelope({
    ...request,
    routeId: "stream_live_start",
    commandId: "stream_start_live_session_command",
  });
}

export function handleStreamFoundationLiveStopSourceOnlyDraft(
  request: Omit<StreamFoundation140YLiveWriteDraftRequest, "routeId" | "commandId">,
): StreamFoundation140YLiveWriteBlockedEnvelope {
  return createStreamFoundationLiveWriteSourceOnlyBlockedEnvelope({
    ...request,
    routeId: "stream_live_stop",
    commandId: "stream_stop_live_session_command",
  });
}

export function handleStreamFoundationLiveHeartbeatSourceOnlyDraft(
  request: Omit<StreamFoundation140YLiveWriteDraftRequest, "routeId" | "commandId">,
): StreamFoundation140YLiveWriteBlockedEnvelope {
  return createStreamFoundationLiveWriteSourceOnlyBlockedEnvelope({
    ...request,
    routeId: "stream_live_heartbeat",
    commandId: "stream_live_heartbeat_command",
  });
}
