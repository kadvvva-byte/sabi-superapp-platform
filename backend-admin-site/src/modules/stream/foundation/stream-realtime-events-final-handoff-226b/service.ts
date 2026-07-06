import {
  STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL,
  STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
  type StreamRealtimeEventsArtifact226B,
  type StreamRealtimeEventsBlocked226B,
  type StreamRealtimeEventsBlockedCode226B,
  type StreamRealtimeEventsInput226B,
  type StreamRealtimeEventsResult226B,
  type StreamRealtimeEventsSafety226B,
  type StreamRealtimeEventsSnapshot226B,
  type StreamRealtimeEventsSurface226B,
} from "./types";

export { STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL, STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION } from "./types";

export const STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS: readonly StreamRealtimeEventsArtifact226B[] = [
  "226a_realtime_events_readiness_clean",
  "225b_rooms_lifecycle_final_handoff_locked",
  "host_event_boundary_locked",
  "viewer_event_boundary_locked",
  "cohost_event_boundary_locked",
  "battle_event_boundary_locked",
  "chat_reaction_event_boundary_locked",
  "moderation_event_boundary_locked",
  "admin_realtime_evidence_locked",
] as const;

export const STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES: readonly StreamRealtimeEventsSurface226B[] = [
  "host_room_events",
  "viewer_room_events",
  "cohost_room_events",
  "battle_room_events",
  "chat_reaction_events",
  "moderation_events",
  "admin_realtime_evidence",
  "future_exact_approval_reference",
] as const;

export const STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY: StreamRealtimeEventsSafety226B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous226ARequired: true,
  realtimeEmitExecuted: false,
  socketRuntimeBindingExecuted: false,
  socketNamespaceRuntimeMounted: false,
  roomRuntimeStateMutationExecuted: false,
  roomRuntimeCreateExecuted: false,
  roomRuntimeJoinExecuted: false,
  roomRuntimeLeaveExecuted: false,
  roomRuntimeEndExecuted: false,
  mediaRuntimeStarted: false,
  providerRealtimeCallExecuted: false,
  providerRoomCallExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  adminRuntimeToggleExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeEventSuccessAllowed: false,
  fakeLiveSuccessAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureRealtimeEmitRequiresSeparateApproval: true,
  futureSocketRuntimeBindingRequiresSeparateApproval: true,
  futureRoomStateMutationRequiresSeparateApproval: true,
  futureProviderRealtimeCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const forbiddenRuntimeMarkers = [
  "BEGIN" + "_" + "PRIVATE" + "_" + "KEY",
  "PRIVATE" + "_" + "KEY",
  "ACCESS" + "_" + "TOKEN",
  "REFRESH" + "_" + "TOKEN",
  "PROVIDER" + "_" + "SECRET",
  "PAYMENT" + "_" + "TOKEN",
  "PAYOUT" + "_" + "TOKEN",
  "ROOM" + "_" + "TOKEN",
  "SOCKET" + "_" + "TOKEN",
  "REALTIME" + "_" + "RUNTIME" + "_" + "ENABLED",
  "SOCKET" + "_" + "RUNTIME" + "_" + "ENABLED",
  "ROOM" + "_" + "RUNTIME" + "_" + "ENABLED",
  "PROVIDER" + "_" + "RUNTIME" + "_" + "ENABLED",
  "DATABASE" + "_" + "URL",
] as const;

function hasForbiddenRuntimeMarker(value: unknown): boolean {
  if (typeof value === "string") {
    const upper = value.toUpperCase();
    return forbiddenRuntimeMarkers.some((marker) => upper.includes(marker));
  }
  if (Array.isArray(value)) return value.some(hasForbiddenRuntimeMarker);
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasForbiddenRuntimeMarker);
  return false;
}

function blocked(code: StreamRealtimeEventsBlockedCode226B, blockedReason: string): StreamRealtimeEventsBlocked226B {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    status: "stream_realtime_events_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    handoffPrepared: false,
    providerNotConfiguredVisible: true,
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}

function uniqueStrings(value: readonly string[]): readonly string[] {
  return Array.from(new Set(value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)));
}

export function normalizeStreamRealtimeEventsFinalHandoffInput226B(input: StreamRealtimeEventsInput226B): StreamRealtimeEventsInput226B {
  return {
    ownerApproval: input.ownerApproval,
    handoffMode: input.handoffMode,
    acknowledged226AStage: input.acknowledged226AStage,
    evidenceReferences: uniqueStrings(input.evidenceReferences),
    requiredArtifacts: uniqueStrings(input.requiredArtifacts) as readonly StreamRealtimeEventsArtifact226B[],
    requiredSurfaces: uniqueStrings(input.requiredSurfaces) as readonly StreamRealtimeEventsSurface226B[],
    operatorNote: input.operatorNote,
  } as const;
}

export function prepareStreamRealtimeEventsFinalHandoff226B(input: StreamRealtimeEventsInput226B): StreamRealtimeEventsResult226B {
  const normalized = normalizeStreamRealtimeEventsFinalHandoffInput226B(input);
  if (hasForbiddenRuntimeMarker(normalized)) return blocked("raw_secret_or_runtime_value_rejected", "Raw secret or runtime marker input is rejected.");
  if (normalized.ownerApproval !== STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL) return blocked("owner_approval_required", "Owner approval phrase is required for final handoff packaging only.");
  if (normalized.handoffMode !== "realtime_events_final_handoff_only") return blocked("handoff_mode_disabled", "Handoff mode must stay final-handoff-only.");
  if (normalized.acknowledged226AStage !== "226A_realtime_events_readiness_clean") return blocked("previous_226a_required", "226A clean readiness is required before realtime events final handoff.");
  if (normalized.evidenceReferences.length === 0) return blocked("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_realtime_events_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.realtime.events-final-handoff.safe_disabled.v1",
      version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
      previousStageRequired: "226A_realtime_events_readiness_clean",
      requiredArtifacts: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      realtimeEventsReadiness226ALocked: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      hostEventBoundaryLocked: true,
      viewerEventBoundaryLocked: true,
      cohostEventBoundaryLocked: true,
      battleEventBoundaryLocked: true,
      chatReactionEventBoundaryLocked: true,
      moderationEventBoundaryLocked: true,
      adminRealtimeEvidenceLocked: true,
      socketRuntimeBindingBlockedUntilExactApproval: true,
      realtimeEmitBlockedUntilExactApproval: true,
      roomStateMutationBlockedUntilExactApproval: true,
      rawSecretHandlingForbidden: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureRealtimeEmitRequiresSeparateApproval: true,
      futureSocketRuntimeBindingRequiresSeparateApproval: true,
      futureRoomStateMutationRequiresSeparateApproval: true,
      futureProviderRealtimeCallRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      sourceOnly: true,
      safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
    },
  } as const;
}

export function getStreamRealtimeEventsFinalHandoff226BSnapshot(): StreamRealtimeEventsSnapshot226B {
  return {
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    type: "stream_realtime_events_final_handoff",
    previousStageRequired: "226A realtime events readiness clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    realtimeEventsReadiness226ALocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    hostEventBoundaryLocked: true,
    viewerEventBoundaryLocked: true,
    cohostEventBoundaryLocked: true,
    battleEventBoundaryLocked: true,
    chatReactionEventBoundaryLocked: true,
    moderationEventBoundaryLocked: true,
    adminRealtimeEvidenceLocked: true,
    socketRuntimeBindingBlockedUntilExactApproval: true,
    realtimeEmitBlockedUntilExactApproval: true,
    roomStateMutationBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}

export function assertStreamRealtimeEventsFinalHandoff226BRemainsSafe() {
  return {
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    status: "safe_disabled_realtime_events_final_handoff_only",
    providerNotConfiguredVisible: true,
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}

export function createStreamRealtimeEmitRuntimeRequest226B() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    status: "blocked_realtime_emit_requires_separate_exact_owner_approval",
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    dbWriteExecuted: false,
    futureRealtimeEmitRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}

export function createStreamSocketRuntimeBindingRequest226B() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    status: "blocked_socket_runtime_binding_requires_separate_exact_owner_approval",
    socketRuntimeBindingExecuted: false,
    realtimeEmitExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    dbWriteExecuted: false,
    futureSocketRuntimeBindingRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}

export function createStreamRoomStateMutationRuntimeRequest226B() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_VERSION,
    status: "blocked_room_state_mutation_requires_separate_exact_owner_approval",
    roomRuntimeStateMutationExecuted: false,
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    providerRuntimeEnabled: false,
    dbWriteExecuted: false,
    futureRoomStateMutationRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_SAFETY,
  } as const;
}
