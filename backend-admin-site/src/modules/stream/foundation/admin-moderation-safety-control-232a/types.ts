export const STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION = "BACKEND-STREAM-ADMIN-MODERATION-SAFETY-CONTROL-232A" as const;

export const STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL =
  "I_APPROVE_232A_ADMIN_MODERATION_SAFETY_CONTROL_NO_RUNTIME_ENABLEMENT" as const;

export type StreamAdminModerationSafetyControlArtifact232A =
  | "230b_admin_provider_runtime_control_clean"
  | "228b_moderation_safety_final_handoff_clean"
  | "ban_control_visible"
  | "mute_control_visible"
  | "kick_control_visible"
  | "report_queue_control_visible"
  | "content_safety_review_visible"
  | "appeal_review_control_visible"
  | "provider_moderation_status_visible";

export type StreamAdminModerationSafetyControlSurface232A =
  | "moderation_status_panel"
  | "ban_gate_panel"
  | "mute_gate_panel"
  | "kick_gate_panel"
  | "report_queue_gate_panel"
  | "content_safety_review_gate_panel"
  | "appeal_review_gate_panel"
  | "safe_disabled_moderation_runtime_panel";

export type StreamAdminModerationSafetyControlSafety232A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  adminModerationSafetyControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous230BRequired: true;
  moderation228BRequired: true;
  adminBanToggleExecuted: false;
  adminMuteToggleExecuted: false;
  adminKickToggleExecuted: false;
  adminReportToggleExecuted: false;
  adminContentSafetyToggleExecuted: false;
  moderationRuntimeBanExecuted: false;
  moderationRuntimeMuteExecuted: false;
  moderationRuntimeKickExecuted: false;
  moderationRuntimeReportWriteExecuted: false;
  contentSafetyRuntimeDecisionExecuted: false;
  appealRuntimeDecisionExecuted: false;
  adminModerationToggleExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  mediaRuntimeStarted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  providerModerationCallExecuted: false;
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
  futureModerationRuntimeActionRequiresSeparateApproval: true;
  futureContentSafetyDecisionRequiresSeparateApproval: true;
  futureAppealRuntimeDecisionRequiresSeparateApproval: true;
  futureProviderModerationCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamAdminModerationSafetyControlInput232A = Readonly<{
  ownerApproval?: string;
  controlMode?: "admin_moderation_safety_control_visibility_only" | "disabled";
  acknowledged230BStage?: "230B_admin_provider_runtime_control_clean" | "disabled";
  acknowledged228BStage?: "228B_moderation_safety_final_handoff_clean" | "disabled";
  evidenceReferences?: readonly string[];
  requiredArtifacts?: readonly StreamAdminModerationSafetyControlArtifact232A[];
  requiredSurfaces?: readonly StreamAdminModerationSafetyControlSurface232A[];
  operatorNote?: string;
}>;

export type StreamAdminModerationSafetyControlBlockedCode232A =
  | "owner_approval_required"
  | "control_mode_disabled"
  | "previous_stage_missing"
  | "moderation_stage_missing"
  | "artifact_missing"
  | "surface_missing"
  | "moderation_runtime_not_allowed"
  | "content_safety_runtime_not_allowed"
  | "provider_not_allowed"
  | "db_not_allowed";

export type StreamAdminModerationSafetyControlBlocked232A = Readonly<{
  code: StreamAdminModerationSafetyControlBlockedCode232A;
  message: string;
}>;

export type StreamAdminModerationSafetyControlPrepared232A = Readonly<{
  version: typeof STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION;
  type: "admin_moderation_safety_control";
  previousStageRequired: "230B admin provider/runtime control plus 228B moderation/safety final handoff clean plus TypeScript clean on owner machine";
  adminModerationSafetyControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  adminProviderRuntimeControl230BLocked: true;
  moderationSafetyFinalHandoff228BLocked: true;
  moderationStatusVisible: true;
  banControlVisible: true;
  muteControlVisible: true;
  kickControlVisible: true;
  reportQueueControlVisible: true;
  contentSafetyReviewControlVisible: true;
  appealReviewControlVisible: true;
  providerModerationStatusVisible: true;
  adminModerationSafetyEvidenceVisible: true;
  adminModerationRuntimeTogglesLocked: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  sourceOnly: true;
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminModerationSafetyControlArtifact232A[];
  requiredSurfaces: readonly StreamAdminModerationSafetyControlSurface232A[];
  safety: StreamAdminModerationSafetyControlSafety232A;
}>;

export type StreamAdminModerationSafetyControlResult232A = Readonly<{
  ok: boolean;
  prepared?: StreamAdminModerationSafetyControlPrepared232A;
  blocked: readonly StreamAdminModerationSafetyControlBlocked232A[];
}>;

export type StreamAdminModerationSafetyControlSnapshot232A = StreamAdminModerationSafetyControlPrepared232A;

export type StreamAdminModerationSafetyControlEnvelope232A = Readonly<{
  version: typeof STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION;
  readiness: StreamAdminModerationSafetyControlSnapshot232A;
  blocked: readonly StreamAdminModerationSafetyControlBlocked232A[];
}>;
