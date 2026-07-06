export const STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION = "BACKEND-STREAM-ADMIN-ROOMS-CONTROL-231A" as const;

export const STREAM_ADMIN_ROOMS_CONTROL_231A_OWNER_APPROVAL =
  "I_APPROVE_231A_ADMIN_ROOMS_CONTROL_NO_RUNTIME_ENABLEMENT" as const;

export type StreamAdminRoomsControlArtifact231A =
  | "230b_admin_provider_runtime_control_clean"
  | "225b_rooms_lifecycle_final_handoff_clean"
  | "rooms_create_control_visible"
  | "rooms_join_control_visible"
  | "rooms_leave_control_visible"
  | "rooms_end_control_visible"
  | "host_viewer_cohost_state_control_visible"
  | "battle_room_control_visible"
  | "room_audit_control_visible";

export type StreamAdminRoomsControlSurface231A =
  | "room_lifecycle_status_panel"
  | "create_room_gate_panel"
  | "join_room_gate_panel"
  | "leave_room_gate_panel"
  | "end_room_gate_panel"
  | "host_viewer_cohost_state_panel"
  | "battle_room_state_panel"
  | "room_audit_evidence_panel"
  | "provider_room_status_panel"
  | "safe_disabled_room_runtime_panel";

export type StreamAdminRoomsControlSafety231A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  adminRoomsControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous230BRequired: true;
  roomsLifecycle225BRequired: true;
  adminRoomCreateToggleExecuted: false;
  adminRoomJoinToggleExecuted: false;
  adminRoomLeaveToggleExecuted: false;
  adminRoomEndToggleExecuted: false;
  roomRuntimeCreateExecuted: false;
  roomRuntimeJoinExecuted: false;
  roomRuntimeLeaveExecuted: false;
  roomRuntimeEndExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  roomAuditRuntimeWriteExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  mediaRuntimeStarted: false;
  recordingRuntimeStarted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  providerRoomCallExecuted: false;
  providerRealtimeCallExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  giftSendExecutionExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureRoomRuntimeCreateRequiresSeparateApproval: true;
  futureRoomRuntimeJoinRequiresSeparateApproval: true;
  futureRoomRuntimeLeaveRequiresSeparateApproval: true;
  futureRoomRuntimeEndRequiresSeparateApproval: true;
  futureRoomStateMutationRequiresSeparateApproval: true;
  futureRoomAuditWriteRequiresSeparateApproval: true;
  futureProviderRoomCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamAdminRoomsControlInput231A = Readonly<{
  ownerApproval?: string;
  controlMode?: "admin_rooms_control_visibility_only" | "disabled";
  acknowledged230BStage?: "230B_admin_provider_runtime_control_clean" | "disabled";
  acknowledged225BStage?: "225B_rooms_lifecycle_final_handoff_clean" | "disabled";
  evidenceReferences?: readonly string[];
  requiredArtifacts?: readonly StreamAdminRoomsControlArtifact231A[];
  requiredSurfaces?: readonly StreamAdminRoomsControlSurface231A[];
  operatorNote?: string;
}>;

export type StreamAdminRoomsControlBlockedCode231A =
  | "owner_approval_required"
  | "control_mode_disabled"
  | "previous_stage_missing"
  | "rooms_stage_missing"
  | "artifact_missing"
  | "surface_missing"
  | "room_runtime_not_allowed"
  | "provider_not_allowed"
  | "db_not_allowed";

export type StreamAdminRoomsControlBlocked231A = Readonly<{
  code: StreamAdminRoomsControlBlockedCode231A;
  message: string;
}>;

export type StreamAdminRoomsControlPrepared231A = Readonly<{
  version: typeof STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION;
  type: "admin_rooms_control";
  previousStageRequired: "230B admin provider/runtime control plus 225B rooms lifecycle final handoff clean plus TypeScript clean on owner machine";
  adminRoomsControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  adminProviderRuntimeControl230BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  roomLifecycleStatusVisible: true;
  roomCreateControlVisible: true;
  roomJoinControlVisible: true;
  roomLeaveControlVisible: true;
  roomEndControlVisible: true;
  hostViewerCohostStateControlVisible: true;
  battleRoomStateControlVisible: true;
  roomAuditEvidenceVisible: true;
  providerRoomStatusVisible: true;
  adminRoomRuntimeTogglesLocked: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureRoomRuntimeCreateRequiresSeparateApproval: true;
  futureRoomRuntimeJoinRequiresSeparateApproval: true;
  futureRoomRuntimeLeaveRequiresSeparateApproval: true;
  futureRoomRuntimeEndRequiresSeparateApproval: true;
  sourceOnly: true;
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminRoomsControlArtifact231A[];
  requiredSurfaces: readonly StreamAdminRoomsControlSurface231A[];
  safety: StreamAdminRoomsControlSafety231A;
}>;

export type StreamAdminRoomsControlResult231A = Readonly<{
  ok: boolean;
  prepared?: StreamAdminRoomsControlPrepared231A;
  blocked: readonly StreamAdminRoomsControlBlocked231A[];
}>;

export type StreamAdminRoomsControlSnapshot231A = StreamAdminRoomsControlPrepared231A;

export type StreamAdminRoomsControlEnvelope231A = Readonly<{
  version: typeof STREAM_ADMIN_ROOMS_CONTROL_231A_VERSION;
  readiness: StreamAdminRoomsControlSnapshot231A;
  blocked: readonly StreamAdminRoomsControlBlocked231A[];
}>;
