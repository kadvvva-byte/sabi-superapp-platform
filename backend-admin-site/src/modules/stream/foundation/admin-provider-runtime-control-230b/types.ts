export const STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION = "BACKEND-STREAM-ADMIN-PROVIDER-RUNTIME-CONTROL-230B" as const;

export const STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL =
  "I_APPROVE_230B_ADMIN_PROVIDER_RUNTIME_CONTROL_NO_RUNTIME_ENABLEMENT" as const;

export type StreamAdminProviderRuntimeControlArtifact230B =
  | "230a_admin_foundation_visibility_clean"
  | "provider_not_configured_panel_visible"
  | "runtime_disabled_panel_visible"
  | "exact_approval_gate_visible"
  | "admin_toggle_locked_visible"
  | "provider_binding_locked_visible"
  | "provider_lookup_locked_visible"
  | "runtime_execution_locked_visible";

export type StreamAdminProviderRuntimeControlSurface230B =
  | "gift_ledger_provider_status"
  | "room_provider_status"
  | "realtime_provider_status"
  | "media_provider_status"
  | "moderation_provider_status"
  | "runtime_toggle_status"
  | "exact_owner_approval_status"
  | "safe_disabled_audit_status";

export type StreamAdminProviderRuntimeControlSafety230B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  adminProviderRuntimeControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous230ARequired: true;
  adminRuntimeToggleExecuted: false;
  runtimeEnablementExecuted: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerActivationExecuted: false;
  providerCredentialLookupExecuted: false;
  providerCallExecuted: false;
  providerRoomCallExecuted: false;
  providerRealtimeCallExecuted: false;
  providerMediaSessionCallExecuted: false;
  providerModerationCallExecuted: false;
  providerGiftLedgerCallExecuted: false;
  roomRuntimeCreateExecuted: false;
  roomRuntimeJoinExecuted: false;
  roomRuntimeLeaveExecuted: false;
  roomRuntimeEndExecuted: false;
  roomRuntimeStateMutationExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  mediaRuntimeStarted: false;
  recordingRuntimeStarted: false;
  mediaUploadRuntimeExecuted: false;
  mediaTranscodeRuntimeExecuted: false;
  cdnPublishRuntimeExecuted: false;
  moderationRuntimeActionExecuted: false;
  contentSafetyRuntimeDecisionExecuted: false;
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
  futureAdminRuntimeToggleRequiresSeparateApproval: true;
  futureProviderRuntimeRequiresSeparateApproval: true;
  futureProviderBindingRequiresSeparateApproval: true;
  futureProviderLookupRequiresSeparateApproval: true;
  futureProviderCallRequiresSeparateApproval: true;
  futureDbReadWriteRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamAdminProviderRuntimeControlInput230B = Readonly<{
  ownerApproval?: string;
  controlMode?: "admin_provider_runtime_control_visibility_only" | "disabled";
  acknowledged230AStage?: "230A_admin_foundation_visibility_clean" | "disabled";
  evidenceReferences?: readonly string[];
  requiredArtifacts?: readonly StreamAdminProviderRuntimeControlArtifact230B[];
  requiredSurfaces?: readonly StreamAdminProviderRuntimeControlSurface230B[];
  operatorNote?: string;
}>;

export type StreamAdminProviderRuntimeControlBlockedCode230B =
  | "owner_approval_required"
  | "control_mode_disabled"
  | "previous_stage_missing"
  | "artifact_missing"
  | "surface_missing"
  | "runtime_not_allowed"
  | "provider_not_allowed"
  | "db_not_allowed";

export type StreamAdminProviderRuntimeControlBlocked230B = Readonly<{
  code: StreamAdminProviderRuntimeControlBlockedCode230B;
  message: string;
}>;

export type StreamAdminProviderRuntimeControlPrepared230B = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION;
  type: "admin_provider_runtime_control_panel";
  previousStageRequired: "230A admin foundation visibility clean plus TypeScript clean on owner machine";
  adminProviderRuntimeControlOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  adminFoundationVisibility230ALocked: true;
  providerRuntimeDisabledVisible: true;
  adminRuntimeToggleLocked: true;
  providerBindingLocked: true;
  providerLookupLocked: true;
  providerCallLocked: true;
  exactOwnerApprovalRequiredVisible: true;
  giftLedgerProviderStatusVisible: true;
  roomProviderStatusVisible: true;
  realtimeProviderStatusVisible: true;
  mediaProviderStatusVisible: true;
  moderationProviderStatusVisible: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureAdminRuntimeToggleRequiresSeparateApproval: true;
  futureProviderRuntimeRequiresSeparateApproval: true;
  sourceOnly: true;
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminProviderRuntimeControlArtifact230B[];
  requiredSurfaces: readonly StreamAdminProviderRuntimeControlSurface230B[];
  safety: StreamAdminProviderRuntimeControlSafety230B;
}>;

export type StreamAdminProviderRuntimeControlResult230B = Readonly<{
  ok: boolean;
  prepared?: StreamAdminProviderRuntimeControlPrepared230B;
  blocked: readonly StreamAdminProviderRuntimeControlBlocked230B[];
}>;

export type StreamAdminProviderRuntimeControlSnapshot230B = StreamAdminProviderRuntimeControlPrepared230B;

export type StreamAdminProviderRuntimeControlEnvelope230B = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION;
  readiness: StreamAdminProviderRuntimeControlSnapshot230B;
  blocked: readonly StreamAdminProviderRuntimeControlBlocked230B[];
}>;
