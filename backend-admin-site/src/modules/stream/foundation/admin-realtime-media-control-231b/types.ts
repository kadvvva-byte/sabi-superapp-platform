export const STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION = "BACKEND-STREAM-ADMIN-REALTIME-MEDIA-CONTROL-231B" as const;

export const STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL =
  "I_APPROVE_231B_ADMIN_REALTIME_MEDIA_CONTROL_NO_RUNTIME_ENABLEMENT" as const;

export type StreamAdminRealtimeMediaControlArtifact231B =
  | "230b_admin_provider_runtime_control_clean"
  | "226b_realtime_events_final_handoff_clean"
  | "227b_media_lifecycle_final_handoff_clean"
  | "realtime_emit_control_visible"
  | "socket_binding_control_visible"
  | "media_runtime_control_visible"
  | "recording_control_visible"
  | "cdn_publish_control_visible"
  | "provider_realtime_media_status_visible";

export type StreamAdminRealtimeMediaControlSurface231B =
  | "realtime_event_status_panel"
  | "socket_binding_gate_panel"
  | "realtime_emit_gate_panel"
  | "camera_microphone_screen_gate_panel"
  | "recording_gate_panel"
  | "media_storage_cdn_gate_panel"
  | "provider_realtime_media_status_panel"
  | "safe_disabled_realtime_media_runtime_panel";

export type StreamAdminRealtimeMediaControlSafety231B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  adminRealtimeMediaControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous230BRequired: true;
  realtime226BRequired: true;
  media227BRequired: true;
  adminRealtimeToggleExecuted: false;
  adminMediaToggleExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  mediaRuntimeStarted: false;
  cameraRuntimeStarted: false;
  microphoneRuntimeStarted: false;
  screenShareRuntimeStarted: false;
  recordingRuntimeStarted: false;
  recordingRuntimeStopped: false;
  mediaUploadRuntimeExecuted: false;
  mediaTranscodeRuntimeExecuted: false;
  cdnPublishRuntimeExecuted: false;
  cdnInvalidationRuntimeExecuted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  providerRealtimeCallExecuted: false;
  providerMediaSessionCallExecuted: false;
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
  futureRealtimeEmitRequiresSeparateApproval: true;
  futureSocketRuntimeBindingRequiresSeparateApproval: true;
  futureMediaRuntimeStartRequiresSeparateApproval: true;
  futureRecordingRuntimeStartRequiresSeparateApproval: true;
  futureMediaUploadTranscodePublishRequiresSeparateApproval: true;
  futureProviderRealtimeMediaCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamAdminRealtimeMediaControlInput231B = Readonly<{
  ownerApproval?: string;
  controlMode?: "admin_realtime_media_control_visibility_only" | "disabled";
  acknowledged230BStage?: "230B_admin_provider_runtime_control_clean" | "disabled";
  acknowledged226BStage?: "226B_realtime_events_final_handoff_clean" | "disabled";
  acknowledged227BStage?: "227B_media_lifecycle_final_handoff_clean" | "disabled";
  evidenceReferences?: readonly string[];
  requiredArtifacts?: readonly StreamAdminRealtimeMediaControlArtifact231B[];
  requiredSurfaces?: readonly StreamAdminRealtimeMediaControlSurface231B[];
  operatorNote?: string;
}>;

export type StreamAdminRealtimeMediaControlBlockedCode231B =
  | "owner_approval_required"
  | "control_mode_disabled"
  | "previous_stage_missing"
  | "realtime_stage_missing"
  | "media_stage_missing"
  | "artifact_missing"
  | "surface_missing"
  | "realtime_runtime_not_allowed"
  | "media_runtime_not_allowed"
  | "provider_not_allowed"
  | "db_not_allowed";

export type StreamAdminRealtimeMediaControlBlocked231B = Readonly<{
  code: StreamAdminRealtimeMediaControlBlockedCode231B;
  message: string;
}>;

export type StreamAdminRealtimeMediaControlPrepared231B = Readonly<{
  version: typeof STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION;
  type: "admin_realtime_media_control";
  previousStageRequired: "230B admin provider/runtime control plus 226B realtime final handoff plus 227B media final handoff clean plus TypeScript clean on owner machine";
  adminRealtimeMediaControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  adminProviderRuntimeControl230BLocked: true;
  realtimeEventsFinalHandoff226BLocked: true;
  mediaLifecycleFinalHandoff227BLocked: true;
  realtimeEventStatusVisible: true;
  socketBindingControlVisible: true;
  realtimeEmitControlVisible: true;
  cameraMicrophoneScreenControlVisible: true;
  recordingControlVisible: true;
  mediaStorageCdnControlVisible: true;
  providerRealtimeMediaStatusVisible: true;
  adminRealtimeMediaEvidenceVisible: true;
  adminRealtimeMediaRuntimeTogglesLocked: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  sourceOnly: true;
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminRealtimeMediaControlArtifact231B[];
  requiredSurfaces: readonly StreamAdminRealtimeMediaControlSurface231B[];
  safety: StreamAdminRealtimeMediaControlSafety231B;
}>;

export type StreamAdminRealtimeMediaControlResult231B = Readonly<{
  ok: boolean;
  prepared?: StreamAdminRealtimeMediaControlPrepared231B;
  blocked: readonly StreamAdminRealtimeMediaControlBlocked231B[];
}>;

export type StreamAdminRealtimeMediaControlSnapshot231B = StreamAdminRealtimeMediaControlPrepared231B;

export type StreamAdminRealtimeMediaControlEnvelope231B = Readonly<{
  version: typeof STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION;
  readiness: StreamAdminRealtimeMediaControlSnapshot231B;
  blocked: readonly StreamAdminRealtimeMediaControlBlocked231B[];
}>;
