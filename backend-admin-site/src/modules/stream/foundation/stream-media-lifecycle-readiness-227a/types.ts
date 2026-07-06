export const STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION = "BACKEND-STREAM-MEDIA-LIFECYCLE-227A" as const;

export const STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL =
  "I_APPROVE_227A_STREAM_MEDIA_LIFECYCLE_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export type StreamMediaLifecycleArtifact227A =
  | "226b_realtime_events_final_handoff_clean"
  | "camera_capture_boundary_visible"
  | "microphone_capture_boundary_visible"
  | "screen_share_boundary_visible"
  | "recording_boundary_visible"
  | "media_storage_cdn_boundary_visible"
  | "provider_media_session_boundary_visible"
  | "admin_media_lifecycle_evidence_visible";

export type StreamMediaLifecycleSurface227A =
  | "camera_capture_controls"
  | "microphone_capture_controls"
  | "screen_share_controls"
  | "recording_policy"
  | "media_storage_cdn"
  | "provider_media_session"
  | "admin_media_lifecycle_evidence"
  | "future_exact_approval_reference";

export type StreamMediaLifecycleSafety227A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous226BRequired: true;
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
  providerMediaSessionCallExecuted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  giftSendExecutionExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  fakeMediaSuccessAllowed: false;
  fakeLiveSuccessAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureMediaRuntimeStartRequiresSeparateApproval: true;
  futureRecordingRuntimeStartRequiresSeparateApproval: true;
  futureMediaUploadTranscodePublishRequiresSeparateApproval: true;
  futureProviderMediaSessionRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamMediaLifecycleInput227A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "media_lifecycle_readiness_index_only" | "disabled";
  acknowledged226BStage?: "226B_realtime_events_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamMediaLifecycleArtifact227A[];
  requiredSurfaces: readonly StreamMediaLifecycleSurface227A[];
  operatorNote?: string;
}>;

export type StreamMediaLifecycleBlockedCode227A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_226b_required"
  | "evidence_references_required"
  | "required_artifacts_required"
  | "required_surfaces_required"
  | "missing_required_artifact"
  | "missing_required_surface"
  | "raw_secret_or_runtime_value_rejected";

export type StreamMediaLifecycleBlocked227A = Readonly<{
  ok: false;
  version: typeof STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION;
  status: "stream_media_lifecycle_readiness_blocked_without_runtime_enablement";
  code: StreamMediaLifecycleBlockedCode227A;
  blockedReason: string;
  readinessPrepared: false;
  providerNotConfiguredVisible: true;
  mediaRuntimeStarted: false;
  recordingRuntimeStarted: false;
  providerRuntimeEnabled: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamMediaLifecycleSafety227A;
}>;

export type StreamMediaLifecycleEnvelope227A = Readonly<{
  contract: "stream.media.lifecycle-readiness.safe_disabled.v1";
  version: typeof STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION;
  previousStageRequired: "226B_realtime_events_final_handoff_clean";
  requiredArtifacts: readonly StreamMediaLifecycleArtifact227A[];
  requiredSurfaces: readonly StreamMediaLifecycleSurface227A[];
  evidenceReferences: readonly string[];
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  cameraCaptureBoundaryVisible: true;
  microphoneCaptureBoundaryVisible: true;
  screenShareBoundaryVisible: true;
  recordingBoundaryVisible: true;
  mediaStorageCdnBoundaryVisible: true;
  providerMediaSessionBoundaryVisible: true;
  adminMediaLifecycleEvidenceVisible: true;
  mediaRuntimeStartBlockedUntilExactApproval: true;
  recordingRuntimeStartBlockedUntilExactApproval: true;
  uploadTranscodeCdnPublishBlockedUntilExactApproval: true;
  providerMediaSessionBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureMediaRuntimeStartRequiresSeparateApproval: true;
  futureRecordingRuntimeStartRequiresSeparateApproval: true;
  futureMediaUploadTranscodePublishRequiresSeparateApproval: true;
  futureProviderMediaSessionRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
  safety: StreamMediaLifecycleSafety227A;
}>;

export type StreamMediaLifecyclePrepared227A = Readonly<{
  ok: true;
  status: "stream_media_lifecycle_readiness_ready_without_runtime_enablement";
  envelope: StreamMediaLifecycleEnvelope227A;
}>;

export type StreamMediaLifecycleResult227A =
  | StreamMediaLifecyclePrepared227A
  | StreamMediaLifecycleBlocked227A;

export type StreamMediaLifecycleSnapshot227A = Readonly<{
  version: typeof STREAM_MEDIA_LIFECYCLE_READINESS_227A_VERSION;
  type: "stream_media_lifecycle_readiness_index";
  previousStageRequired: "226B realtime events final handoff clean plus TypeScript clean on owner machine";
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  cameraCaptureBoundaryVisible: true;
  microphoneCaptureBoundaryVisible: true;
  screenShareBoundaryVisible: true;
  recordingBoundaryVisible: true;
  mediaStorageCdnBoundaryVisible: true;
  providerMediaSessionBoundaryVisible: true;
  adminMediaLifecycleEvidenceVisible: true;
  mediaRuntimeStartBlockedUntilExactApproval: true;
  recordingRuntimeStartBlockedUntilExactApproval: true;
  uploadTranscodeCdnPublishBlockedUntilExactApproval: true;
  providerMediaSessionBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  requiredArtifacts: readonly StreamMediaLifecycleArtifact227A[];
  requiredSurfaces: readonly StreamMediaLifecycleSurface227A[];
  safety: StreamMediaLifecycleSafety227A;
}>;
