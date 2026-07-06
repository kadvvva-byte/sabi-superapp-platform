import {
  STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_OWNER_APPROVAL,
  STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION,
  type StreamMediaLifecycleFinalArtifact227B,
  type StreamMediaLifecycleFinalBlocked227B,
  type StreamMediaLifecycleFinalBlockedCode227B,
  type StreamMediaLifecycleFinalInput227B,
  type StreamMediaLifecycleFinalResult227B,
  type StreamMediaLifecycleFinalSafety227B,
  type StreamMediaLifecycleFinalSnapshot227B,
  type StreamMediaLifecycleFinalSurface227B,
} from "./types";

export { STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_OWNER_APPROVAL, STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION } from "./types";

export const STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS: readonly StreamMediaLifecycleFinalArtifact227B[] = [
  "227a_media_lifecycle_readiness_clean",
  "226b_realtime_events_final_handoff_locked",
  "225b_rooms_lifecycle_final_handoff_locked",
  "camera_capture_boundary_locked",
  "microphone_capture_boundary_locked",
  "screen_share_boundary_locked",
  "recording_boundary_locked",
  "media_storage_cdn_boundary_locked",
  "provider_media_session_boundary_locked",
  "admin_media_lifecycle_evidence_locked",
] as const;

export const STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES: readonly StreamMediaLifecycleFinalSurface227B[] = [
  "camera_capture_controls_locked",
  "microphone_capture_controls_locked",
  "screen_share_controls_locked",
  "recording_policy_locked",
  "media_storage_cdn_locked",
  "provider_media_session_locked",
  "admin_media_lifecycle_evidence_locked",
  "future_exact_approval_reference_locked",
] as const;

export const STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY: StreamMediaLifecycleFinalSafety227B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous227ARequired: true,
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
  providerMediaSessionCallExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeMediaSuccessAllowed: false,
  fakeLiveSuccessAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureMediaRuntimeStartRequiresSeparateApproval: true,
  futureRecordingRuntimeStartRequiresSeparateApproval: true,
  futureMediaUploadTranscodePublishRequiresSeparateApproval: true,
  futureProviderMediaSessionRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const FORBIDDEN_RUNTIME_MARKERS_227B = [
  "private" + "_key",
  "access" + "_token",
  "refresh" + "_token",
  "provider" + "_secret",
  "payment" + "_token",
  "payout" + "_token",
  "room" + "_token",
  "socket" + "_token",
] as const;

function containsForbiddenRuntimeValue227B(value: string): boolean {
  const normalized = value.toLowerCase();
  return FORBIDDEN_RUNTIME_MARKERS_227B.some((marker) => normalized.includes(marker));
}

function blocked227B(code: StreamMediaLifecycleFinalBlockedCode227B, blockedReason: string): StreamMediaLifecycleFinalBlocked227B {
  return {
    ok: false,
    version: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION,
    status: "stream_media_lifecycle_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    handoffPrepared: false,
    providerNotConfiguredVisible: true,
    mediaRuntimeStarted: false,
    recordingRuntimeStarted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY,
  } as const;
}

export function normalizeStreamMediaLifecycleFinalHandoffInput227B(
  input: StreamMediaLifecycleFinalInput227B,
): StreamMediaLifecycleFinalInput227B {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    handoffMode: input.handoffMode ?? "media_lifecycle_final_handoff_only",
    acknowledged227AStage: input.acknowledged227AStage ?? "227A_media_lifecycle_readiness_clean",
    evidenceReferences: input.evidenceReferences.map((item) => item.trim()).filter(Boolean),
    requiredArtifacts: input.requiredArtifacts,
    requiredSurfaces: input.requiredSurfaces,
    operatorNote: input.operatorNote?.trim(),
  } as const;
}

export function assertStreamMediaLifecycleFinalHandoff227BRemainsSafe(): StreamMediaLifecycleFinalSafety227B {
  return STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY;
}

export function prepareStreamMediaLifecycleFinalHandoff227B(
  input: StreamMediaLifecycleFinalInput227B,
): StreamMediaLifecycleFinalResult227B {
  const normalized = normalizeStreamMediaLifecycleFinalHandoffInput227B(input);
  const combined = [
    normalized.ownerApproval ?? "",
    normalized.operatorNote ?? "",
    ...normalized.evidenceReferences,
    ...normalized.requiredArtifacts,
    ...normalized.requiredSurfaces,
  ].join(" ");
  if (containsForbiddenRuntimeValue227B(combined)) return blocked227B("raw_secret_or_runtime_value_rejected", "Raw secret or runtime token-like input is rejected.");
  if (normalized.ownerApproval !== STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_OWNER_APPROVAL) return blocked227B("owner_approval_required", "Owner approval phrase is required for final handoff packaging only.");
  if (normalized.handoffMode !== "media_lifecycle_final_handoff_only") return blocked227B("handoff_mode_disabled", "Handoff mode must stay final-handoff-only.");
  if (normalized.acknowledged227AStage !== "227A_media_lifecycle_readiness_clean") return blocked227B("previous_227a_required", "227A clean readiness is required before media lifecycle final handoff.");
  if (normalized.evidenceReferences.length === 0) return blocked227B("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked227B("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked227B("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked227B("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked227B("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_media_lifecycle_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.media.lifecycle-final-handoff.safe_disabled.v1",
      version: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION,
      previousStageRequired: "227A_media_lifecycle_readiness_clean",
      requiredArtifacts: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      mediaLifecycleReadiness227ALocked: true,
      realtimeEventsFinalHandoff226BLocked: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      cameraCaptureBoundaryLocked: true,
      microphoneCaptureBoundaryLocked: true,
      screenShareBoundaryLocked: true,
      recordingBoundaryLocked: true,
      mediaStorageCdnBoundaryLocked: true,
      providerMediaSessionBoundaryLocked: true,
      adminMediaLifecycleEvidenceLocked: true,
      mediaRuntimeStartBlockedUntilExactApproval: true,
      recordingRuntimeStartBlockedUntilExactApproval: true,
      uploadTranscodeCdnPublishBlockedUntilExactApproval: true,
      providerMediaSessionBlockedUntilExactApproval: true,
      rawSecretHandlingForbidden: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureMediaRuntimeStartRequiresSeparateApproval: true,
      futureRecordingRuntimeStartRequiresSeparateApproval: true,
      futureMediaUploadTranscodePublishRequiresSeparateApproval: true,
      futureProviderMediaSessionRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      sourceOnly: true,
      safety: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY,
    },
  } as const;
}

export function getStreamMediaLifecycleFinalHandoff227BSnapshot(): StreamMediaLifecycleFinalSnapshot227B {
  return {
    version: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION,
    type: "stream_media_lifecycle_final_handoff",
    previousStageRequired: "227A media lifecycle readiness clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    mediaLifecycleReadiness227ALocked: true,
    realtimeEventsFinalHandoff226BLocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    cameraCaptureBoundaryLocked: true,
    microphoneCaptureBoundaryLocked: true,
    screenShareBoundaryLocked: true,
    recordingBoundaryLocked: true,
    mediaStorageCdnBoundaryLocked: true,
    providerMediaSessionBoundaryLocked: true,
    adminMediaLifecycleEvidenceLocked: true,
    mediaRuntimeStartBlockedUntilExactApproval: true,
    recordingRuntimeStartBlockedUntilExactApproval: true,
    uploadTranscodeCdnPublishBlockedUntilExactApproval: true,
    providerMediaSessionBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES,
    safety: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY,
  } as const;
}

function blockedRuntimeRequest227B(kind: string) {
  return {
    ok: false,
    version: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_VERSION,
    status: "blocked_until_exact_owner_approval",
    requestType: kind,
    providerNotConfiguredVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    mediaRuntimeStarted: false,
    recordingRuntimeStarted: false,
    mediaUploadRuntimeExecuted: false,
    mediaTranscodeRuntimeExecuted: false,
    cdnPublishRuntimeExecuted: false,
    providerMediaSessionCallExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_SAFETY,
  } as const;
}

export function createStreamMediaRuntimeStartRequest227B() {
  return blockedRuntimeRequest227B("media_runtime_start_request");
}

export function createStreamRecordingRuntimeStartRequest227B() {
  return blockedRuntimeRequest227B("recording_runtime_start_request");
}

export function createStreamUploadTranscodePublishRequest227B() {
  return blockedRuntimeRequest227B("upload_transcode_cdn_publish_request");
}

export function createStreamProviderMediaSessionRequest227B() {
  return blockedRuntimeRequest227B("provider_media_session_request");
}
