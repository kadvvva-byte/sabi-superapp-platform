import {
  STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_OWNER_APPROVAL,
  STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_VERSION,
  type StreamRoomsLifecycleArtifact225B,
  type StreamRoomsLifecycleBlocked225B,
  type StreamRoomsLifecycleBlockedCode225B,
  type StreamRoomsLifecycleInput225B,
  type StreamRoomsLifecycleResult225B,
  type StreamRoomsLifecycleSafety225B,
  type StreamRoomsLifecycleSnapshot225B,
  type StreamRoomsLifecycleSurface225B,
} from "./types";

export { STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_OWNER_APPROVAL, STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_VERSION } from "./types";

export const STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS: readonly StreamRoomsLifecycleArtifact225B[] = [
  "225a_fix1_rooms_lifecycle_readiness_clean",
  "224a_gift_ledger_closure_marker_locked",
  "room_create_boundary_locked",
  "room_join_boundary_locked",
  "room_leave_boundary_locked",
  "room_end_boundary_locked",
  "host_viewer_cohost_state_boundary_locked",
  "battle_room_state_boundary_locked",
  "admin_room_lifecycle_evidence_locked",
] as const;

export const STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES: readonly StreamRoomsLifecycleSurface225B[] = [
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

export const STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_SAFETY: StreamRoomsLifecycleSafety225B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous225AFix1Required: true,
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
  const joinedNeedles = ["private", "access", "refresh", "provider", "payment", "payout", "socket"].join("|");
  const sensitiveSuffix = ["key", "secret", "credential", "token"].join("|");
  const sensitivePattern = new RegExp(`(${joinedNeedles}).*(${sensitiveSuffix})`, "i");
  return sensitivePattern.test(normalized);
}

function blocked(code: StreamRoomsLifecycleBlockedCode225B, blockedReason: string): StreamRoomsLifecycleBlocked225B {
  return {
    ok: false,
    version: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_VERSION,
    status: "stream_rooms_lifecycle_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    handoffPrepared: false,
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
    safety: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_SAFETY,
  };
}

export function normalizeStreamRoomsLifecycleFinalHandoffInput225B(
  input: StreamRoomsLifecycleInput225B,
): StreamRoomsLifecycleInput225B {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    handoffMode: input.handoffMode ?? "disabled",
    acknowledged225AStage: input.acknowledged225AStage ?? "disabled",
    evidenceReferences: [...new Set(input.evidenceReferences.map((value) => value.trim()).filter(Boolean))],
    requiredArtifacts: [...new Set(input.requiredArtifacts)],
    requiredSurfaces: [...new Set(input.requiredSurfaces)],
    operatorNote: input.operatorNote?.trim(),
  };
}

export function assertStreamRoomsLifecycleFinalHandoff225BRemainsSafe(): StreamRoomsLifecycleSafety225B {
  return STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_SAFETY;
}

export function prepareStreamRoomsLifecycleFinalHandoff225B(
  input: StreamRoomsLifecycleInput225B,
): StreamRoomsLifecycleResult225B {
  const normalized = normalizeStreamRoomsLifecycleFinalHandoffInput225B(input);

  if (normalized.ownerApproval !== STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "225B rooms lifecycle final handoff requires the exact owner approval phrase.");
  }
  if (normalized.handoffMode !== "rooms_lifecycle_final_handoff_only") {
    return blocked("handoff_mode_disabled", "225B is final-handoff only and cannot create, join, leave, end, or mutate live rooms.");
  }
  if (normalized.acknowledged225AStage !== "225A_FIX1_rooms_lifecycle_readiness_clean") {
    return blocked("previous_225a_fix1_required", "225A-FIX1 rooms lifecycle readiness must be clean first.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "225B requires 225A-FIX1 checker evidence references.");
  }
  if (normalized.evidenceReferences.some(containsForbiddenRawSecret) || containsForbiddenRawSecret(normalized.operatorNote)) {
    return blocked("raw_secret_or_runtime_value_rejected", "225B rejects raw secrets, provider values, room credentials, socket credentials, and runtime credentials.");
  }
  if (normalized.requiredArtifacts.length === 0) {
    return blocked("required_artifacts_required", "225B requires rooms lifecycle final handoff artifacts.");
  }
  if (normalized.requiredSurfaces.length === 0) {
    return blocked("required_surfaces_required", "225B requires rooms lifecycle final handoff surfaces.");
  }
  for (const requiredArtifact of STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(requiredArtifact)) {
      return blocked("missing_required_artifact", `Missing required artifact: ${requiredArtifact}`);
    }
  }
  for (const requiredSurface of STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(requiredSurface)) {
      return blocked("missing_required_surface", `Missing required surface: ${requiredSurface}`);
    }
  }

  return {
    ok: true,
    status: "stream_rooms_lifecycle_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.rooms.lifecycle-final-handoff.safe_disabled.v1",
      version: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_VERSION,
      previousStageRequired: "225A_FIX1_rooms_lifecycle_readiness_clean",
      requiredArtifacts: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      roomsLifecycleReadiness225AFix1Locked: true,
      giftLedgerClosureMarkerLocked: true,
      roomsCreateBoundaryLocked: true,
      roomsJoinBoundaryLocked: true,
      roomsLeaveBoundaryLocked: true,
      roomsEndBoundaryLocked: true,
      hostViewerCohostStateBoundaryLocked: true,
      battleRoomStateBoundaryLocked: true,
      adminRoomLifecycleEvidenceLocked: true,
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
      safety: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_SAFETY,
    },
  };
}

export function getStreamRoomsLifecycleFinalHandoff225BSnapshot(): StreamRoomsLifecycleSnapshot225B {
  return {
    version: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_VERSION,
    type: "stream_rooms_lifecycle_final_handoff",
    previousStageRequired: "225A-FIX1 rooms lifecycle readiness clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    roomsLifecycleReadiness225AFix1Locked: true,
    giftLedgerClosureMarkerLocked: true,
    roomsCreateBoundaryLocked: true,
    roomsJoinBoundaryLocked: true,
    roomsLeaveBoundaryLocked: true,
    roomsEndBoundaryLocked: true,
    hostViewerCohostStateBoundaryLocked: true,
    battleRoomStateBoundaryLocked: true,
    adminRoomLifecycleEvidenceLocked: true,
    realtimeEmitBlockedUntil226A: true,
    providerRoomCreationBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES,
    safety: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_SAFETY,
  };
}

export function createStreamRoomsRuntimeCreateRequest225B(): StreamRoomsLifecycleBlocked225B {
  return blocked("handoff_mode_disabled", "225B does not create rooms. Runtime room creation requires a later exact owner approval execution package.");
}

export function createStreamRoomsRuntimeJoinRequest225B(): StreamRoomsLifecycleBlocked225B {
  return blocked("handoff_mode_disabled", "225B does not join rooms. Runtime room joining requires a later exact owner approval execution package.");
}

export function createStreamRoomsRuntimeEndRequest225B(): StreamRoomsLifecycleBlocked225B {
  return blocked("handoff_mode_disabled", "225B does not end rooms. Runtime room ending requires a later exact owner approval execution package.");
}
