import {
  STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL,
  STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
  type StreamRealtimeEventsArtifact226A,
  type StreamRealtimeEventsBlocked226A,
  type StreamRealtimeEventsBlockedCode226A,
  type StreamRealtimeEventsInput226A,
  type StreamRealtimeEventsResult226A,
  type StreamRealtimeEventsSafety226A,
  type StreamRealtimeEventsSnapshot226A,
  type StreamRealtimeEventsSurface226A,
} from "./types";

export { STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL, STREAM_REALTIME_EVENTS_READINESS_226A_VERSION } from "./types";

export const STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS: readonly StreamRealtimeEventsArtifact226A[] = [
  "225b_rooms_lifecycle_final_handoff_clean",
  "host_event_boundary_visible",
  "viewer_event_boundary_visible",
  "cohost_event_boundary_visible",
  "battle_event_boundary_visible",
  "chat_reaction_event_boundary_visible",
  "moderation_event_boundary_visible",
  "admin_realtime_evidence_visible",
] as const;

export const STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES: readonly StreamRealtimeEventsSurface226A[] = [
  "host_room_events",
  "viewer_room_events",
  "cohost_room_events",
  "battle_room_events",
  "chat_reaction_events",
  "moderation_events",
  "admin_realtime_evidence",
  "future_exact_approval_reference",
] as const;

export const STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY: StreamRealtimeEventsSafety226A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous225BRequired: true,
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
  if (Array.isArray(value)) {
    return value.some((entry) => hasForbiddenRuntimeMarker(entry));
  }
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((entry) => hasForbiddenRuntimeMarker(entry));
  }
  return false;
}

function blocked(code: StreamRealtimeEventsBlockedCode226A, blockedReason: string): StreamRealtimeEventsBlocked226A {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    status: "stream_realtime_events_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}

function uniqueStrings(value: readonly string[] | undefined): readonly string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)));
}

export function normalizeStreamRealtimeEventsReadinessInput226A(input: StreamRealtimeEventsInput226A): StreamRealtimeEventsInput226A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode,
    acknowledged225BStage: input.acknowledged225BStage,
    evidenceReferences: uniqueStrings(input.evidenceReferences),
    requiredArtifacts: uniqueStrings(input.requiredArtifacts) as readonly StreamRealtimeEventsArtifact226A[],
    requiredSurfaces: uniqueStrings(input.requiredSurfaces) as readonly StreamRealtimeEventsSurface226A[],
    operatorNote: input.operatorNote,
  } as const;
}

export function prepareStreamRealtimeEventsReadiness226A(input: StreamRealtimeEventsInput226A): StreamRealtimeEventsResult226A {
  const normalized = normalizeStreamRealtimeEventsReadinessInput226A(input);
  if (hasForbiddenRuntimeMarker(normalized)) return blocked("raw_secret_or_runtime_value_rejected", "Raw secret or runtime marker input is rejected.");
  if (normalized.ownerApproval !== STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL) return blocked("owner_approval_required", "Owner approval phrase is required for readiness packaging only.");
  if (normalized.readinessMode !== "realtime_events_readiness_index_only") return blocked("readiness_mode_disabled", "Readiness mode must stay index-only.");
  if (normalized.acknowledged225BStage !== "225B_rooms_lifecycle_final_handoff_clean") return blocked("previous_225b_required", "225B clean handoff is required before realtime events readiness.");
  if (normalized.evidenceReferences.length === 0) return blocked("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_realtime_events_readiness_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.realtime.events-readiness.safe_disabled.v1",
      version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
      previousStageRequired: "225B_rooms_lifecycle_final_handoff_clean",
      requiredArtifacts: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      hostEventBoundaryVisible: true,
      viewerEventBoundaryVisible: true,
      cohostEventBoundaryVisible: true,
      battleEventBoundaryVisible: true,
      chatReactionEventBoundaryVisible: true,
      moderationEventBoundaryVisible: true,
      adminRealtimeEvidenceVisible: true,
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
      safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
    },
  } as const;
}

export function getStreamRealtimeEventsReadiness226ASnapshot(): StreamRealtimeEventsSnapshot226A {
  return {
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    type: "stream_realtime_events_readiness_index",
    previousStageRequired: "225B rooms lifecycle final handoff clean plus TypeScript clean on owner machine",
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    hostEventBoundaryVisible: true,
    viewerEventBoundaryVisible: true,
    cohostEventBoundaryVisible: true,
    battleEventBoundaryVisible: true,
    chatReactionEventBoundaryVisible: true,
    moderationEventBoundaryVisible: true,
    adminRealtimeEvidenceVisible: true,
    socketRuntimeBindingBlockedUntilExactApproval: true,
    realtimeEmitBlockedUntilExactApproval: true,
    roomStateMutationBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}

export function assertStreamRealtimeEventsReadiness226ARemainsSafe() {
  return {
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    status: "safe_disabled_realtime_events_readiness_only",
    providerNotConfiguredVisible: true,
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}

export function createStreamRealtimeEmitRuntimeRequest226A() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    status: "blocked_realtime_emit_requires_separate_exact_owner_approval",
    realtimeEmitExecuted: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
    providerRuntimeEnabled: false,
    dbWriteExecuted: false,
    futureRealtimeEmitRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}

export function createStreamSocketRuntimeBindingRequest226A() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    status: "blocked_socket_runtime_binding_requires_separate_exact_owner_approval",
    socketRuntimeBindingExecuted: false,
    realtimeEmitExecuted: false,
    providerRuntimeEnabled: false,
    dbWriteExecuted: false,
    futureSocketRuntimeBindingRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}

export function createStreamRoomStateMutationRuntimeRequest226A() {
  return {
    ok: false,
    version: STREAM_REALTIME_EVENTS_READINESS_226A_VERSION,
    status: "blocked_room_state_mutation_requires_separate_exact_owner_approval",
    roomRuntimeStateMutationExecuted: false,
    realtimeEmitExecuted: false,
    dbWriteExecuted: false,
    futureRoomStateMutationRequiresSeparateApproval: true,
    safety: STREAM_REALTIME_EVENTS_READINESS_226A_SAFETY,
  } as const;
}
