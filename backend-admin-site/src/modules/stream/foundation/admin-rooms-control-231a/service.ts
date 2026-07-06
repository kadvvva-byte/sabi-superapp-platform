import {
  STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL,
  STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION,
  type StreamAdminRoomsControlArtifact231A,
  type StreamAdminRoomsControlBlocked231A,
  type StreamAdminRoomsControlInput231A,
  type StreamAdminRoomsControlPrepared231A,
  type StreamAdminRoomsControlResult231A,
  type StreamAdminRoomsControlSafety231A,
  type StreamAdminRoomsControlSnapshot231A,
  type StreamAdminRoomsControlSurface231A,
} from "./types";

export { STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL, STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION } from "./types";

export const STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS: readonly StreamAdminRoomsControlArtifact231A[] = [
  "230b_admin_provider_runtime_control_clean",
  "225b_rooms_lifecycle_final_handoff_clean",
  "rooms_create_control_visible",
  "rooms_join_control_visible",
  "rooms_leave_control_visible",
  "rooms_end_control_visible",
  "host_viewer_cohost_state_control_visible",
  "battle_room_control_visible",
  "room_audit_control_visible",
] as const;

export const STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES: readonly StreamAdminRoomsControlSurface231A[] = [
  "room_lifecycle_status_panel",
  "create_room_gate_panel",
  "join_room_gate_panel",
  "leave_room_gate_panel",
  "end_room_gate_panel",
  "host_viewer_cohost_state_panel",
  "battle_room_state_panel",
  "room_audit_evidence_panel",
  "provider_room_status_panel",
  "safe_disabled_room_runtime_panel",
] as const;

export const STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY: StreamAdminRoomsControlSafety231A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminRoomsControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous230BRequired: true,
  roomsLifecycle225BRequired: true,
  adminRoomCreateToggleExecuted: false,
  adminRoomJoinToggleExecuted: false,
  adminRoomLeaveToggleExecuted: false,
  adminRoomEndToggleExecuted: false,
  roomRuntimeCreateExecuted: false,
  roomRuntimeJoinExecuted: false,
  roomRuntimeLeaveExecuted: false,
  roomRuntimeEndExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  roomAuditRuntimeWriteExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  mediaRuntimeStarted: false,
  recordingRuntimeStarted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  providerRoomCallExecuted: false,
  providerRealtimeCallExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeSuccessWritten: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureRoomRuntimeCreateRequiresSeparateApproval: true,
  futureRoomRuntimeJoinRequiresSeparateApproval: true,
  futureRoomRuntimeLeaveRequiresSeparateApproval: true,
  futureRoomRuntimeEndRequiresSeparateApproval: true,
  futureRoomStateMutationRequiresSeparateApproval: true,
  futureRoomAuditWriteRequiresSeparateApproval: true,
  futureProviderRoomCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const ADMIN_ROOMS_CONTROL_MARKERS_231A = [
  "admin.rooms.control.visible",
  "rooms.lifecycle.status.visible",
  "room.create.control.locked",
  "room.join.control.locked",
  "room.leave.control.locked",
  "room.end.control.locked",
  "room.state.control.locked",
  "room.audit.evidence.visible",
] as const;

export function normalizeStreamAdminRoomsControlInput231A(
  input: StreamAdminRoomsControlInput231A,
): Required<StreamAdminRoomsControlInput231A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged230BStage: input.acknowledged230BStage ?? "disabled",
    acknowledged225BStage: input.acknowledged225BStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminRoomsControl231ARemainsSafe(): StreamAdminRoomsControlSafety231A {
  return STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY;
}

export function prepareStreamAdminRoomsControl231A(
  input: StreamAdminRoomsControlInput231A,
): StreamAdminRoomsControlResult231A {
  const normalized = normalizeStreamAdminRoomsControlInput231A(input);
  const blocked: StreamAdminRoomsControlBlocked231A[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "231A owner approval marker is required for Admin rooms control visibility only." });
  }
  if (normalized.controlMode !== "admin_rooms_control_visibility_only") {
    blocked.push({ code: "control_mode_disabled", message: "231A remains disabled unless Admin rooms control visibility-only mode is selected." });
  }
  if (normalized.acknowledged230BStage !== "230B_admin_provider_runtime_control_clean") {
    blocked.push({ code: "previous_stage_missing", message: "230B Admin provider/runtime control clean stage is required." });
  }
  if (normalized.acknowledged225BStage !== "225B_rooms_lifecycle_final_handoff_clean") {
    blocked.push({ code: "rooms_stage_missing", message: "225B rooms lifecycle final handoff clean stage is required." });
  }
  for (const artifact of STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 231A artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 231A Admin rooms control surface: ${surface}` });
    }
  }
  if (ADMIN_ROOMS_CONTROL_MARKERS_231A.length !== 8) {
    blocked.push({ code: "room_runtime_not_allowed", message: "Admin rooms markers must remain static and non-executable." });
  }
  if (
    STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.roomRuntimeCreateExecuted ||
    STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.roomRuntimeJoinExecuted ||
    STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.roomRuntimeLeaveExecuted ||
    STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.roomRuntimeEndExecuted ||
    STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.roomRuntimeStateMutationExecuted
  ) {
    blocked.push({ code: "room_runtime_not_allowed", message: "Room runtime create/join/leave/end/state mutation must remain disabled." });
  }
  if (STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.providerRuntimeEnabled || STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.providerRoomCallExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime and room calls must remain disabled." });
  }
  if (STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.dbReadExecuted || STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminRoomsControlPrepared231A = {
    version: STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION,
    type: "admin_rooms_control",
    previousStageRequired: "230B admin provider/runtime control plus 225B rooms lifecycle final handoff clean plus TypeScript clean on owner machine",
    adminRoomsControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    adminProviderRuntimeControl230BLocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    roomLifecycleStatusVisible: true,
    roomCreateControlVisible: true,
    roomJoinControlVisible: true,
    roomLeaveControlVisible: true,
    roomEndControlVisible: true,
    hostViewerCohostStateControlVisible: true,
    battleRoomStateControlVisible: true,
    roomAuditEvidenceVisible: true,
    providerRoomStatusVisible: true,
    adminRoomRuntimeTogglesLocked: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureRoomRuntimeCreateRequiresSeparateApproval: true,
    futureRoomRuntimeJoinRequiresSeparateApproval: true,
    futureRoomRuntimeLeaveRequiresSeparateApproval: true,
    futureRoomRuntimeEndRequiresSeparateApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_ADMIN_ROOMS_CONTROL_231A_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminRoomsControl231ASnapshot(): StreamAdminRoomsControlSnapshot231A {
  const result = prepareStreamAdminRoomsControl231A({
    ownerApproval: STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL,
    controlMode: "admin_rooms_control_visibility_only",
    acknowledged230BStage: "230B_admin_provider_runtime_control_clean",
    acknowledged225BStage: "225B_rooms_lifecycle_final_handoff_clean",
    evidenceReferences: ["230B_passed_141", "230A_passed_134", "225B_passed_128", "229A_passed_153"],
    requiredArtifacts: STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ADMIN_ROOMS_CONTROL_231A_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("231A Admin rooms control snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminRoomCreateRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room create runtime is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomJoinRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room join runtime is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomLeaveRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room leave runtime is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomEndRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room end runtime is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomStateMutationRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room state mutation is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomAuditWriteRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "room_runtime_not_allowed", message: "Room audit runtime write is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderRoomCallRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider room calls are blocked in 231A and require separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRoomsDbMutationRequest231A(): StreamAdminRoomsControlResult231A {
  return {
    ok: false,
    blocked: [
      { code: "db_not_allowed", message: "DB read/write for Admin rooms control is blocked in 231A and requires separate exact owner approval." },
    ],
  };
}
