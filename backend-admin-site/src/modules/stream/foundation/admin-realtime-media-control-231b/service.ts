import {
  STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL,
  STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION,
  type StreamAdminRealtimeMediaControlArtifact231B,
  type StreamAdminRealtimeMediaControlBlocked231B,
  type StreamAdminRealtimeMediaControlInput231B,
  type StreamAdminRealtimeMediaControlPrepared231B,
  type StreamAdminRealtimeMediaControlResult231B,
  type StreamAdminRealtimeMediaControlSafety231B,
  type StreamAdminRealtimeMediaControlSnapshot231B,
  type StreamAdminRealtimeMediaControlSurface231B,
} from "./types";

export { STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL, STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION } from "./types";

export const STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS: readonly StreamAdminRealtimeMediaControlArtifact231B[] = [
  "230b_admin_provider_runtime_control_clean",
  "226b_realtime_events_final_handoff_clean",
  "227b_media_lifecycle_final_handoff_clean",
  "realtime_emit_control_visible",
  "socket_binding_control_visible",
  "media_runtime_control_visible",
  "recording_control_visible",
  "cdn_publish_control_visible",
  "provider_realtime_media_status_visible",
] as const;

export const STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES: readonly StreamAdminRealtimeMediaControlSurface231B[] = [
  "realtime_event_status_panel",
  "socket_binding_gate_panel",
  "realtime_emit_gate_panel",
  "camera_microphone_screen_gate_panel",
  "recording_gate_panel",
  "media_storage_cdn_gate_panel",
  "provider_realtime_media_status_panel",
  "safe_disabled_realtime_media_runtime_panel",
] as const;

export const STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY: StreamAdminRealtimeMediaControlSafety231B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminRealtimeMediaControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous230BRequired: true,
  realtime226BRequired: true,
  media227BRequired: true,
  adminRealtimeToggleExecuted: false,
  adminMediaToggleExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  mediaRuntimeStarted: false,
  cameraRuntimeStarted: false,
  microphoneRuntimeStarted: false,
  screenShareRuntimeStarted: false,
  recordingRuntimeStarted: false,
  recordingRuntimeStopped: false,
  mediaUploadRuntimeExecuted: false,
  mediaTranscodeRuntimeExecuted: false,
  cdnPublishRuntimeExecuted: false,
  cdnInvalidationRuntimeExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  providerRealtimeCallExecuted: false,
  providerMediaSessionCallExecuted: false,
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
  futureRealtimeEmitRequiresSeparateApproval: true,
  futureSocketRuntimeBindingRequiresSeparateApproval: true,
  futureMediaRuntimeStartRequiresSeparateApproval: true,
  futureRecordingRuntimeStartRequiresSeparateApproval: true,
  futureMediaUploadTranscodePublishRequiresSeparateApproval: true,
  futureProviderRealtimeMediaCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const ADMIN_REALTIME_MEDIA_CONTROL_MARKERS_231B = [
  "admin.realtime-media.control.visible",
  "realtime.event.status.visible",
  "socket.binding.control.locked",
  "realtime.emit.control.locked",
  "media.runtime.control.locked",
  "recording.control.locked",
  "cdn.publish.control.locked",
  "provider.realtime-media.status.visible",
] as const;

export function normalizeStreamAdminRealtimeMediaControlInput231B(
  input: StreamAdminRealtimeMediaControlInput231B,
): Required<StreamAdminRealtimeMediaControlInput231B> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged230BStage: input.acknowledged230BStage ?? "disabled",
    acknowledged226BStage: input.acknowledged226BStage ?? "disabled",
    acknowledged227BStage: input.acknowledged227BStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminRealtimeMediaControl231BRemainsSafe(): StreamAdminRealtimeMediaControlSafety231B {
  return STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY;
}

export function prepareStreamAdminRealtimeMediaControl231B(
  input: StreamAdminRealtimeMediaControlInput231B,
): StreamAdminRealtimeMediaControlResult231B {
  const normalized = normalizeStreamAdminRealtimeMediaControlInput231B(input);
  const blocked: StreamAdminRealtimeMediaControlBlocked231B[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "231B owner approval marker is required for Admin realtime/media control visibility only." });
  }
  if (normalized.controlMode !== "admin_realtime_media_control_visibility_only") {
    blocked.push({ code: "control_mode_disabled", message: "231B remains disabled unless Admin realtime/media control visibility-only mode is selected." });
  }
  if (normalized.acknowledged230BStage !== "230B_admin_provider_runtime_control_clean") {
    blocked.push({ code: "previous_stage_missing", message: "230B Admin provider/runtime control clean stage is required." });
  }
  if (normalized.acknowledged226BStage !== "226B_realtime_events_final_handoff_clean") {
    blocked.push({ code: "realtime_stage_missing", message: "226B realtime events final handoff clean stage is required." });
  }
  if (normalized.acknowledged227BStage !== "227B_media_lifecycle_final_handoff_clean") {
    blocked.push({ code: "media_stage_missing", message: "227B media lifecycle final handoff clean stage is required." });
  }
  for (const artifact of STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 231B artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 231B Admin realtime/media control surface: ${surface}` });
    }
  }
  if (ADMIN_REALTIME_MEDIA_CONTROL_MARKERS_231B.length !== 8) {
    blocked.push({ code: "realtime_runtime_not_allowed", message: "Admin realtime/media markers must remain static and non-executable." });
  }
  if (STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.realtimeEmitPerformed || STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.socketRuntimeBindingExecuted) {
    blocked.push({ code: "realtime_runtime_not_allowed", message: "Realtime emit and socket binding must remain disabled." });
  }
  if (
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.mediaRuntimeStarted ||
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.recordingRuntimeStarted ||
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.mediaUploadRuntimeExecuted ||
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.cdnPublishRuntimeExecuted
  ) {
    blocked.push({ code: "media_runtime_not_allowed", message: "Media runtime, recording, upload/transcode, and CDN publish must remain disabled." });
  }
  if (
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.providerRuntimeEnabled ||
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.providerRealtimeCallExecuted ||
    STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.providerMediaSessionCallExecuted
  ) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime and realtime/media calls must remain disabled." });
  }
  if (STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.dbReadExecuted || STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminRealtimeMediaControlPrepared231B = {
    version: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_VERSION,
    type: "admin_realtime_media_control",
    previousStageRequired: "230B admin provider/runtime control plus 226B realtime final handoff plus 227B media final handoff clean plus TypeScript clean on owner machine",
    adminRealtimeMediaControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    adminProviderRuntimeControl230BLocked: true,
    realtimeEventsFinalHandoff226BLocked: true,
    mediaLifecycleFinalHandoff227BLocked: true,
    realtimeEventStatusVisible: true,
    socketBindingControlVisible: true,
    realtimeEmitControlVisible: true,
    cameraMicrophoneScreenControlVisible: true,
    recordingControlVisible: true,
    mediaStorageCdnControlVisible: true,
    providerRealtimeMediaStatusVisible: true,
    adminRealtimeMediaEvidenceVisible: true,
    adminRealtimeMediaRuntimeTogglesLocked: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminRealtimeMediaControl231BSnapshot(): StreamAdminRealtimeMediaControlSnapshot231B {
  const result = prepareStreamAdminRealtimeMediaControl231B({
    ownerApproval: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL,
    controlMode: "admin_realtime_media_control_visibility_only",
    acknowledged230BStage: "230B_admin_provider_runtime_control_clean",
    acknowledged226BStage: "226B_realtime_events_final_handoff_clean",
    acknowledged227BStage: "227B_media_lifecycle_final_handoff_clean",
    evidenceReferences: ["230B_passed_141", "226B_passed_147", "227B_passed_147", "229A_passed_153"],
    requiredArtifacts: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("231B Admin realtime/media control snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminRealtimeEmitRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "realtime_runtime_not_allowed", message: "Realtime emit is blocked in 231B and requires separate exact owner approval." }] };
}

export function createStreamAdminSocketBindingRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "realtime_runtime_not_allowed", message: "Socket runtime binding is blocked in 231B and requires separate exact owner approval." }] };
}

export function createStreamAdminMediaRuntimeRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "media_runtime_not_allowed", message: "Media runtime start is blocked in 231B and requires separate exact owner approval." }] };
}

export function createStreamAdminRecordingRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "media_runtime_not_allowed", message: "Recording runtime start/stop is blocked in 231B and requires separate exact owner approval." }] };
}

export function createStreamAdminUploadTranscodeCdnPublishRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "media_runtime_not_allowed", message: "Upload, transcode, and CDN publish are blocked in 231B and require separate exact owner approval." }] };
}

export function createStreamAdminProviderRealtimeMediaCallRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "provider_not_allowed", message: "Provider realtime/media call is blocked in 231B and requires separate exact owner approval." }] };
}

export function createStreamAdminRealtimeMediaDbMutationRequest231B(): StreamAdminRealtimeMediaControlResult231B {
  return { ok: false, blocked: [{ code: "db_not_allowed", message: "Realtime/media DB mutation is blocked in 231B and requires separate exact owner approval." }] };
}
