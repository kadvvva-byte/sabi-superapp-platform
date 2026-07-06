import {
  STREAM_ROOMS_LIFECYCLE_READINESS_225A_OWNER_APPROVAL,
  STREAM_ROOMS_LIFECYCLE_READINESS_225A_VERSION,
  type StreamRoomsLifecycleArtifact225A,
  type StreamRoomsLifecycleBlocked225A,
  type StreamRoomsLifecycleBlockedCode225A,
  type StreamRoomsLifecycleInput225A,
  type StreamRoomsLifecycleResult225A,
  type StreamRoomsLifecycleSafety225A,
  type StreamRoomsLifecycleSnapshot225A,
  type StreamRoomsLifecycleSurface225A,
} from "./types";

export { STREAM_ROOMS_LIFECYCLE_READINESS_225A_OWNER_APPROVAL, STREAM_ROOMS_LIFECYCLE_READINESS_225A_VERSION } from "./types";

export const STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS: readonly StreamRoomsLifecycleArtifact225A[] = [
  "224a_gift_ledger_closure_marker_passed",
  "gift_ledger_chain_closed_no_more_archive_layers",
  "stream_foundation_transition_started",
  "rooms_create_boundary_visible",
  "rooms_join_boundary_visible",
  "rooms_leave_boundary_visible",
  "rooms_end_boundary_visible",
  "host_viewer_cohost_state_boundary_visible",
  "realtime_emit_blocked_until_226a",
  "provider_room_creation_blocked_until_exact_approval",
] as const;

export const STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES: readonly StreamRoomsLifecycleSurface225A[] = [
  "room_create_lifecycle",
  "room_join_lifecycle",
  "room_leave_lifecycle",
  "room_end_lifecycle",
  "host_room_state",
  "viewer_room_state",
  "cohost_room_state",
  "battle_room_state",
  "admin_room_lifecycle_evidence",
  "future_exact_approval_reference",
] as const;

export const STREAM_ROOMS_LIFECYCLE_READINESS_225A_SAFETY: StreamRoomsLifecycleSafety225A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  giftLedgerClosureMarkerRequired: true,
  streamFoundationRoomsLifecycleStarted: true,
  roomRuntimeCreateExecuted: false,
  roomRuntimeJoinExecuted: false,
  roomRuntimeLeaveExecuted: false,
  roomRuntimeEndExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  realtimeEmitExecuted: false,
  socketRuntimeBindingExecuted: false,
  mediaRuntimeStarted: false,
  providerRoomCreateCallExecuted: false,
  providerRoomEndCallExecuted: false,
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
  fakeRoomSuccessAllowed: false,
  fakeLiveSuccessAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureRoomRuntimeCreateRequiresSeparateApproval: true,
  futureRoomRuntimeJoinRequiresSeparateApproval: true,
  futureRoomRuntimeEndRequiresSeparateApproval: true,
  futureRealtimeEmitRequiresSeparateApproval: true,
  futureProviderRoomCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

function containsForbiddenRawSecret(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.toLowerCase();
  const blockedMarkers = [
    "secret=",
    ["api", "_key="].join(""),
    "apikey=",
    ["private", "_key"].join(""),
    ["access", "_token"].join(""),
    ["refresh", "_token"].join(""),
    "bearer ",
    "password=",
    "credential=",
    ["provider", "_secret"].join(""),
    ["payment", "_token"].join(""),
    ["payout", "_token"].join(""),
    ["room", "_token"].join(""),
    ["socket", "_token"].join(""),
  ] as const;
  return blockedMarkers.some((pattern) => normalized.includes(pattern));
}

function blocked(
  code: StreamRoomsLifecycleBlockedCode225A,
  blockedReason: string,
): StreamRoomsLifecycleBlocked225A {
  return {
    ok: false,
    version: STREAM_ROOMS_LIFECYCLE_READINESS_225A_VERSION,
    status: "stream_rooms_lifecycle_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    roomRuntimeCreateExecuted: false,
    roomRuntimeJoinExecuted: false,
    roomRuntimeEndExecuted: false,
    realtimeEmitExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_ROOMS_LIFECYCLE_READINESS_225A_SAFETY,
  };
}

export function normalizeStreamRoomsLifecycleInput225A(
  input: StreamRoomsLifecycleInput225A,
): StreamRoomsLifecycleInput225A {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    readinessMode: input.readinessMode ?? "disabled",
    acknowledged224AStage: input.acknowledged224AStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamRoomsLifecycle225ARemainsSafe(): StreamRoomsLifecycleSafety225A {
  return STREAM_ROOMS_LIFECYCLE_READINESS_225A_SAFETY;
}

export function prepareStreamRoomsLifecycleReadiness225A(
  input: StreamRoomsLifecycleInput225A,
): StreamRoomsLifecycleResult225A {
  const normalized = normalizeStreamRoomsLifecycleInput225A(input);

  if (normalized.ownerApproval !== STREAM_ROOMS_LIFECYCLE_READINESS_225A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "225A rooms lifecycle readiness requires the exact owner approval phrase.");
  }
  if (normalized.readinessMode !== "rooms_lifecycle_readiness_index_only") {
    return blocked("readiness_mode_disabled", "225A is readiness-index only and cannot create or mutate live rooms.");
  }
  if (normalized.acknowledged224AStage !== "224A_gift_ledger_closure_marker_clean") {
    return blocked("previous_224a_closure_required", "224A gift-ledger closure marker must be clean first.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "225A requires 224A closure evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_runtime_value_rejected", "225A rejects raw secrets, provider values, room tokens, socket tokens, and runtime credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "225A requires rooms lifecycle artifacts.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "225A requires rooms lifecycle surfaces.");
  }
  for (const requiredArtifact of STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "stream_rooms_lifecycle_readiness_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.rooms.lifecycle-readiness.safe_disabled.v1",
      version: STREAM_ROOMS_LIFECYCLE_READINESS_225A_VERSION,
      previousStageRequired: "224A_gift_ledger_closure_marker_clean",
      requiredArtifacts: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      giftLedgerClosureMarkerLocked: true,
      roomsCreateBoundaryVisible: true,
      roomsJoinBoundaryVisible: true,
      roomsLeaveBoundaryVisible: true,
      roomsEndBoundaryVisible: true,
      hostViewerCohostStateBoundaryVisible: true,
      battleRoomStateBoundaryVisible: true,
      adminRoomLifecycleEvidenceVisible: true,
      realtimeEmitBlockedUntil226A: true,
      providerRoomCreationBlockedUntilExactApproval: true,
      rawSecretHandlingForbidden: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureRoomRuntimeCreateRequiresSeparateApproval: true,
      futureRoomRuntimeJoinRequiresSeparateApproval: true,
      futureRoomRuntimeEndRequiresSeparateApproval: true,
      futureRealtimeEmitRequiresSeparateApproval: true,
      futureProviderRoomCallRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      sourceOnly: true,
      safety: STREAM_ROOMS_LIFECYCLE_READINESS_225A_SAFETY,
    },
  };
}

export function getStreamRoomsLifecycleReadiness225ASnapshot(): StreamRoomsLifecycleSnapshot225A {
  return {
    version: STREAM_ROOMS_LIFECYCLE_READINESS_225A_VERSION,
    type: "stream_rooms_lifecycle_readiness_index",
    previousStageRequired: "224A gift-ledger closure marker clean plus TypeScript clean on owner machine",
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    giftLedgerClosureMarkerLocked: true,
    roomsCreateBoundaryVisible: true,
    roomsJoinBoundaryVisible: true,
    roomsLeaveBoundaryVisible: true,
    roomsEndBoundaryVisible: true,
    hostViewerCohostStateBoundaryVisible: true,
    battleRoomStateBoundaryVisible: true,
    adminRoomLifecycleEvidenceVisible: true,
    realtimeEmitBlockedUntil226A: true,
    providerRoomCreationBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES,
    safety: STREAM_ROOMS_LIFECYCLE_READINESS_225A_SAFETY,
  };
}

export function createStreamRoomsRuntimeCreateRequest225A(): StreamRoomsLifecycleBlocked225A {
  return blocked("readiness_mode_disabled", "225A does not create rooms. Runtime room creation requires a later exact owner approval execution package.");
}

export function createStreamRoomsRuntimeJoinRequest225A(): StreamRoomsLifecycleBlocked225A {
  return blocked("readiness_mode_disabled", "225A does not join rooms. Runtime room joining requires a later exact owner approval execution package.");
}

export function createStreamRoomsRuntimeEndRequest225A(): StreamRoomsLifecycleBlocked225A {
  return blocked("readiness_mode_disabled", "225A does not end rooms. Runtime room ending requires a later exact owner approval execution package.");
}
