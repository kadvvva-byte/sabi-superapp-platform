export const STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION = "BACKEND-STREAM-MODERATION-SAFETY-228B" as const;

export const STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL =
  "I_APPROVE_228B_STREAM_MODERATION_SAFETY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export type StreamModerationSafetyFinalArtifact228B =
  | "228a_moderation_safety_readiness_clean"
  | "227b_media_lifecycle_final_handoff_locked"
  | "226b_realtime_events_final_handoff_locked"
  | "225b_rooms_lifecycle_final_handoff_locked"
  | "ban_boundary_locked"
  | "mute_boundary_locked"
  | "kick_boundary_locked"
  | "report_boundary_locked"
  | "content_safety_boundary_locked"
  | "appeal_review_boundary_locked"
  | "admin_moderation_evidence_locked";

export type StreamModerationSafetyFinalSurface228B =
  | "ban_controls_locked"
  | "mute_controls_locked"
  | "kick_controls_locked"
  | "report_queue_locked"
  | "content_safety_review_locked"
  | "appeal_review_locked"
  | "admin_moderation_evidence_locked"
  | "future_exact_approval_reference_locked";

export type StreamModerationSafetyFinalSafety228B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous228ARequired: true;
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

export type StreamModerationSafetyFinalInput228B = Readonly<{
  ownerApproval?: string;
  handoffMode?: "moderation_safety_final_handoff_only" | "disabled";
  acknowledged228AStage?: "228A_moderation_safety_readiness_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamModerationSafetyFinalArtifact228B[];
  requiredSurfaces: readonly StreamModerationSafetyFinalSurface228B[];
  operatorNote?: string;
}>;

export type StreamModerationSafetyFinalBlockedCode228B =
  | "owner_approval_required"
  | "handoff_mode_disabled"
  | "previous_228a_required"
  | "evidence_references_required"
  | "required_artifacts_required"
  | "required_surfaces_required"
  | "missing_required_artifact"
  | "missing_required_surface"
  | "raw_secret_or_runtime_value_rejected";

export type StreamModerationSafetyFinalBlocked228B = Readonly<{
  ok: false;
  version: typeof STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION;
  status: "stream_moderation_safety_final_handoff_blocked_without_runtime_enablement";
  code: StreamModerationSafetyFinalBlockedCode228B;
  blockedReason: string;
  handoffPrepared: false;
  providerNotConfiguredVisible: true;
  moderationRuntimeBanExecuted: false;
  moderationRuntimeMuteExecuted: false;
  contentSafetyRuntimeDecisionExecuted: false;
  providerRuntimeEnabled: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamModerationSafetyFinalSafety228B;
}>;

export type StreamModerationSafetyFinalEnvelope228B = Readonly<{
  contract: "stream.moderation.safety-final-handoff.safe_disabled.v1";
  version: typeof STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION;
  previousStageRequired: "228A_moderation_safety_readiness_clean";
  requiredArtifacts: readonly StreamModerationSafetyFinalArtifact228B[];
  requiredSurfaces: readonly StreamModerationSafetyFinalSurface228B[];
  evidenceReferences: readonly string[];
  handoffPrepared: true;
  providerNotConfiguredVisible: true;
  moderationSafetyReadiness228ALocked: true;
  mediaLifecycleFinalHandoff227BLocked: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  banBoundaryLocked: true;
  muteBoundaryLocked: true;
  kickBoundaryLocked: true;
  reportBoundaryLocked: true;
  contentSafetyBoundaryLocked: true;
  appealReviewBoundaryLocked: true;
  adminModerationEvidenceLocked: true;
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
  safety: StreamModerationSafetyFinalSafety228B;
}>;

export type StreamModerationSafetyFinalPrepared228B = Readonly<{
  ok: true;
  status: "stream_moderation_safety_final_handoff_ready_without_runtime_enablement";
  envelope: StreamModerationSafetyFinalEnvelope228B;
}>;

export type StreamModerationSafetyFinalResult228B =
  | StreamModerationSafetyFinalPrepared228B
  | StreamModerationSafetyFinalBlocked228B;

export type StreamModerationSafetyFinalSnapshot228B = Readonly<{
  version: typeof STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION;
  type: "stream_moderation_safety_final_handoff";
  previousStageRequired: "228A moderation/safety readiness clean plus TypeScript clean on owner machine";
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  moderationSafetyReadiness228ALocked: true;
  mediaLifecycleFinalHandoff227BLocked: true;
  realtimeEventsFinalHandoff226BLocked: true;
  roomsLifecycleFinalHandoff225BLocked: true;
  banBoundaryLocked: true;
  muteBoundaryLocked: true;
  kickBoundaryLocked: true;
  reportBoundaryLocked: true;
  contentSafetyBoundaryLocked: true;
  appealReviewBoundaryLocked: true;
  adminModerationEvidenceLocked: true;
  moderationRuntimeActionBlockedUntilExactApproval: true;
  contentSafetyDecisionBlockedUntilExactApproval: true;
  adminModerationToggleBlockedUntilExactApproval: true;
  providerModerationCallBlockedUntilExactApproval: true;
  rawSecretHandlingForbidden: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  requiredArtifacts: readonly StreamModerationSafetyFinalArtifact228B[];
  requiredSurfaces: readonly StreamModerationSafetyFinalSurface228B[];
  safety: StreamModerationSafetyFinalSafety228B;
}>;
