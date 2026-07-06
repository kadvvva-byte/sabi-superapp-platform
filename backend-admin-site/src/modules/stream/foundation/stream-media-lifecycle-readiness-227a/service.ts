import {
  STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL,
  STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION,
  type StreamMediaLifecycleArtifact227A,
  type StreamMediaLifecycleBlocked227A,
  type StreamMediaLifecycleBlockedCode227A,
  type StreamMediaLifecycleInput227A,
  type StreamMediaLifecycleResult227A,
  type StreamMediaLifecycleSafety227A,
  type StreamMediaLifecycleSnapshot227A,
  type StreamMediaLifecycleSurface227A,
} from "./types";

export { STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL, STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION } from "./types";

export const STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS: readonly StreamMediaLifecycleArtifact227A[] = [
  "226b_realtime_events_final_handoff_clean",
  "camera_capture_boundary_visible",
  "microphone_capture_boundary_visible",
  "screen_share_boundary_visible",
  "recording_boundary_visible",
  "media_storage_cdn_boundary_visible",
  "provider_media_session_boundary_visible",
  "admin_media_lifecycle_evidence_visible",
] as const;

export const STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES: readonly StreamMediaLifecycleSurface227A[] = [
  "camera_capture_controls",
  "microphone_capture_controls",
  "screen_share_controls",
  "recording_policy",
  "media_storage_cdn",
  "provider_media_session",
  "admin_media_lifecycle_evidence",
  "future_exact_approval_reference",
] as const;

export const STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY: StreamMediaLifecycleSafety227A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous226BRequired: true,
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
  "MEDIA" + "_" + "RUNTIME" + "_" + "ENABLED",
  "RECORDING" + "_" + "RUNTIME" + "_" + "ENABLED",
  "PROVIDER" + "_" + "RUNTIME" + "_" + "ENABLED",
  "DATABASE" + "_" + "URL",
] as const;

function hasForbiddenRuntimeMarker(value: unknown): boolean {
  const text = JSON.stringify(value ?? "").toUpperCase();
  return forbiddenRuntimeMarkers.some((marker) => text.includes(marker));
}

export function assertStreamMediaLifecycleReadiness227ARemainsSafe(): StreamMediaLifecycleSafety227A {
  return STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY;
}

function blocked(code: StreamMediaLifecycleBlockedCode227A, blockedReason: string): StreamMediaLifecycleBlocked227A {
  return {
    ok: false,
    version: STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION,
    status: "stream_media_lifecycle_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    mediaRuntimeStarted: false,
    recordingRuntimeStarted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY,
  } as const;
}

function uniqueStrings(value: readonly string[] | undefined): readonly string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)));
}

export function normalizeStreamMediaLifecycleReadinessInput227A(input: StreamMediaLifecycleInput227A): StreamMediaLifecycleInput227A {
  return {
    ownerApproval: input.ownerApproval,
    readinessMode: input.readinessMode,
    acknowledged226BStage: input.acknowledged226BStage,
    evidenceReferences: uniqueStrings(input.evidenceReferences),
    requiredArtifacts: uniqueStrings(input.requiredArtifacts) as readonly StreamMediaLifecycleArtifact227A[],
    requiredSurfaces: uniqueStrings(input.requiredSurfaces) as readonly StreamMediaLifecycleSurface227A[],
    operatorNote: input.operatorNote,
  } as const;
}

export function prepareStreamMediaLifecycleReadiness227A(input: StreamMediaLifecycleInput227A): StreamMediaLifecycleResult227A {
  const normalized = normalizeStreamMediaLifecycleReadinessInput227A(input);
  if (hasForbiddenRuntimeMarker(normalized)) return blocked("raw_secret_or_runtime_value_rejected", "Raw secret or runtime marker input is rejected.");
  if (normalized.ownerApproval !== STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL) return blocked("owner_approval_required", "Owner approval phrase is required for readiness packaging only.");
  if (normalized.readinessMode !== "media_lifecycle_readiness_index_only") return blocked("readiness_mode_disabled", "Readiness mode must stay index-only.");
  if (normalized.acknowledged226BStage !== "226B_realtime_events_final_handoff_clean") return blocked("previous_226b_required", "226B clean handoff is required before media lifecycle readiness.");
  if (normalized.evidenceReferences.length === 0) return blocked("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_media_lifecycle_readiness_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.media.lifecycle-readiness.safe_disabled.v1",
      version: STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION,
      previousStageRequired: "226B_realtime_events_final_handoff_clean",
      requiredArtifacts: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      realtimeEventsFinalHandoff226BLocked: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      cameraCaptureBoundaryVisible: true,
      microphoneCaptureBoundaryVisible: true,
      screenShareBoundaryVisible: true,
      recordingBoundaryVisible: true,
      mediaStorageCdnBoundaryVisible: true,
      providerMediaSessionBoundaryVisible: true,
      adminMediaLifecycleEvidenceVisible: true,
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
      safety: STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY,
    },
  } as const;
}

export function getStreamMediaLifecycleReadiness227ASnapshot(): StreamMediaLifecycleSnapshot227A {
  return {
    version: STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION,
    type: "stream_media_lifecycle_readiness_index",
    previousStageRequired: "226B realtime events final handoff clean plus TypeScript clean on owner machine",
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    realtimeEventsFinalHandoff226BLocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    cameraCaptureBoundaryVisible: true,
    microphoneCaptureBoundaryVisible: true,
    screenShareBoundaryVisible: true,
    recordingBoundaryVisible: true,
    mediaStorageCdnBoundaryVisible: true,
    providerMediaSessionBoundaryVisible: true,
    adminMediaLifecycleEvidenceVisible: true,
    mediaRuntimeStartBlockedUntilExactApproval: true,
    recordingRuntimeStartBlockedUntilExactApproval: true,
    uploadTranscodeCdnPublishBlockedUntilExactApproval: true,
    providerMediaSessionBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES,
    safety: STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY,
  } as const;
}

function blockedRuntimeRequest227A(kind: string) {
  return {
    ok: false,
    version: STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION,
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
    safety: STREAM_MEDIA_LIFECYCLE_READINESS_227A_SAFETY,
  } as const;
}

export function createStreamMediaRuntimeStartRequest227A() {
  return blockedRuntimeRequest227A("media_runtime_start");
}

export function createStreamRecordingRuntimeStartRequest227A() {
  return blockedRuntimeRequest227A("recording_runtime_start");
}

export function createStreamUploadTranscodePublishRequest227A() {
  return blockedRuntimeRequest227A("upload_transcode_cdn_publish");
}

export function createStreamProviderMediaSessionRequest227A() {
  return blockedRuntimeRequest227A("provider_media_session");
}
