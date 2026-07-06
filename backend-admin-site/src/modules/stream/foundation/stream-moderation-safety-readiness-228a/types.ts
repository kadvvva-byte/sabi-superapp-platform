export const STREAM_MODERATION_SAFETY_READINESS_228A_VERSION = "BACKEND-STREAM-MODERATION-SAFETY-228A" as const;

export const STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL =
  "I_APPROVE_228A_STREAM_MODERATION_SAFETY_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export type StreamModerationSafetyArtifact228A =
  | "227b_media_lifecycle_final_handoff_clean"
  | "226b_realtime_events_final_handoff_locked"
  | "225b_rooms_lifecycle_final_handoff_locked"
  | "ban_boundary_visible"
  | "mute_boundary_visible"
  | "kick_boundary_visible"
  | "report_boundary_visible"
  | "content_safety_boundary_visible"
  | "admin_moderation_evidence_visible";

export type StreamModerationSafetySurface228A =
  | "ban_controls"
  | "mute_controls"
  | "kick_controls"
  | "report_queue"
  | "content_safety_review"
  | "appeal_review"
  | "admin_moderation_evidence"
  | "future_exact_approval_reference";

export type StreamModerationSafetySafety228A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous227BRequired: true;
  moderationRuntimeBanExecuted: false;
  moderationRuntimeMuteExecuted: false;
  moderationRuntimeKickExecuted: false;
  moderationRuntimeReportWriteExecuted: false;
  contentSafetyRuntimeDecisionExecuted: false;
  adminModerationToggleExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  mediaRuntimeStarted: false;
  providerModerationCallExecuted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  giftSendExecutionExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  fakeModerationSuccessAllowed: false;
  fakeLiveSuccessAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureModerationRuntimeActionRequiresSeparateApproval: true;
  futureContentSafetyDecisionRequiresSeparateApproval: true;
  futureAdminModerationToggleRequiresSeparateApproval: true;
  futureProviderModerationCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamModerationSafetyInput228A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "moderation_safety_readiness_index_only" | "disabled";
  acknowledged227BStage?: "227B_media_lifecycle_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamModerationSafetyArtifact228A[];
  requiredSurfaces: readonly StreamModerationSafetySurface228A[];
  operatorNote?: string;
}>;

export type StreamModerationSafetyBlockedCode228A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_227b_required"
  | "evidence_references_required"
  | "required_artifacts_required"
  | "required_surfaces_required"
  | "missing_required_artifact"
  | "missing_required_surface"
  | "raw_secret_or_runtime_value_rejected";

export type StreamModerationSafetyBlocked228A = Readonly<{
  ok: false;
  version: typeof STREAM_MODERATION_SAFETY_READINESS_228A_VERSION;
  status: "stream_moderation_safety_readiness_blocked_without_runtime_enablement";
  code: StreamModerationSafetyBlockedCode228A;
  blockedReason: string;
  readinessPrepared: false;
  providerNotConfiguredVisible: true;
  moderationRuntimeBanExecuted: false;
  moderationRuntimeMuteExecuted: false;
  contentSafetyRuntimeDecisionExecuted: false;
  providerRuntimeEnabled: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamModerationSafetySafety228A;
}>;

export type StreamModerationSafetyEnvelope228A = Readonly<{
  contract: "stream.moderation.safety-readiness.safe_disabled.v1";
  version: typeof STREAM_MODERATION_SAFETY_READINESS_228A_VERSION;
  previousStageRequired: "227B_media_lifecycle_final_handoff_clean";
  requiredArtifacts: readonly StreamModerationSafetyArtifact228A[];
  requiredSurfaces: readonly StreamModerationSafetySurface228A[];
  evidenceReferences: readonly string[];
  readinessPrepared: true;
  providerNotConfiguredVisible: true;
  mediaLifecycleFinalHandoff227BLocked: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  banBoundaryVisible: true;
  muteBoundaryVisible: true;
  kickBoundaryVisible: true;
  reportBoundaryVisible: true;
  contentSafetyBoundaryVisible: true;
  appealReviewBoundaryVisible: true;
  adminModerationEvidenceVisible: true;
  moderationRuntimeActionBlockedUntilExactApproval: true;
  contentSafetyDecisionBlockedUntilExactApproval: true;
  adminModerationToggleBlockedUntilExactApproval: true;
  providerModerationCallBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureModerationRuntimeActionRequiresSeparateApproval: true;
  futureContentSafetyDecisionRequiresSeparateApproval: true;
  futureAdminModerationToggleRequiresSeparateApproval: true;
  futureProviderModerationCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
  safety: StreamModerationSafetySafety228A;
}>;

export type StreamModerationSafetyPrepared228A = Readonly<{
  ok: true;
  status: "stream_moderation_safety_readiness_ready_without_runtime_enablement";
  envelope: StreamModerationSafetyEnvelope228A;
}>;

export type StreamModerationSafetyResult228A =
  | StreamModerationSafetyPrepared228A
  | StreamModerationSafetyBlocked228A;

export type StreamModerationSafetySnapshot228A = Readonly<{
  version: typeof STREAM_MODERATION_SAFETY_READINESS_228A_VERSION;
  type: "stream_moderation_safety_readiness_index";
  previousStageRequired: "227B media lifecycle final handoff clean plus TypeScript clean on owner machine";
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  mediaLifecycleFinalHandoff227BLocked: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  banBoundaryVisible: true;
  muteBoundaryVisible: true;
  kickBoundaryVisible: true;
  reportBoundaryVisible: true;
  contentSafetyBoundaryVisible: true;
  appealReviewBoundaryVisible: true;
  adminModerationEvidenceVisible: true;
  moderationRuntimeActionBlockedUntilExactApproval: true;
  contentSafetyDecisionBlockedUntilExactApproval: true;
  adminModerationToggleBlockedUntilExactApproval: true;
  providerModerationCallBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  requiredArtifacts: readonly StreamModerationSafetyArtifact228A[];
  requiredSurfaces: readonly StreamModerationSafetySurface228A[];
  safety: StreamModerationSafetySafety228A;
}>;
