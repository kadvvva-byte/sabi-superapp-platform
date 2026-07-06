export const STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION = "BACKEND-STREAM-ADMIN-FOUNDATION-VISIBILITY-230A" as const;

export const STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL =
  "I_APPROVE_230A_ADMIN_STREAM_FOUNDATION_VISIBILITY_NO_RUNTIME_ENABLEMENT" as const;

export type StreamAdminFoundationVisibilityArtifact230A =
  | "224a_gift_ledger_closure_visible"
  | "225b_rooms_lifecycle_visible"
  | "226b_realtime_events_visible"
  | "227b_media_lifecycle_visible"
  | "228b_moderation_safety_visible"
  | "229a_foundation_final_control_visible"
  | "provider_not_configured_visible"
  | "runtime_disabled_visible";

export type StreamAdminFoundationVisibilitySection230A =
  | "gift_ledger_closure_status"
  | "rooms_lifecycle_status"
  | "realtime_events_status"
  | "media_lifecycle_status"
  | "moderation_safety_status"
  | "foundation_final_control_status"
  | "safe_disabled_status"
  | "future_exact_approval_boundary";

export type StreamAdminFoundationVisibilitySafety230A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  adminVisibilityOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous224ARequired: true;
  previous225BRequired: true;
  previous226BRequired: true;
  previous227BRequired: true;
  previous228BRequired: true;
  previous229ARequired: true;
  adminRuntimeToggleExecuted: false;
  runtimeEnablementExecuted: false;
  providerRuntimeEnabled: false;
  providerCredentialLookupExecuted: false;
  providerCallExecuted: false;
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
  futureDbReadWriteRequiresSeparateApproval: true;
  futureRealtimeEmitRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamAdminFoundationVisibilityInput230A = Readonly<{
  ownerApproval?: string;
  visibilityMode?: "admin_foundation_visibility_only" | "disabled";
  acknowledged224AStage?: "224A_gift_ledger_closure_clean" | "disabled";
  acknowledged225BStage?: "225B_rooms_lifecycle_final_handoff_clean" | "disabled";
  acknowledged226BStage?: "226B_realtime_events_final_handoff_clean" | "disabled";
  acknowledged227BStage?: "227B_media_lifecycle_final_handoff_clean" | "disabled";
  acknowledged228BStage?: "228B_moderation_safety_final_handoff_clean" | "disabled";
  acknowledged229AStage?: "229A_foundation_final_control_clean" | "disabled";
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminFoundationVisibilityArtifact230A[];
  requiredSections: readonly StreamAdminFoundationVisibilitySection230A[];
  operatorNote?: string;
}>;

export type StreamAdminFoundationVisibilityBlockedCode230A =
  | "owner_approval_required"
  | "visibility_mode_disabled"
  | "previous_stage_missing"
  | "artifact_missing"
  | "section_missing"
  | "runtime_not_allowed"
  | "provider_not_allowed"
  | "db_not_allowed";

export type StreamAdminFoundationVisibilityBlocked230A = Readonly<{
  code: StreamAdminFoundationVisibilityBlockedCode230A;
  message: string;
}>;

export type StreamAdminFoundationVisibilityPrepared230A = Readonly<{
  version: typeof STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION;
  type: "admin_stream_foundation_visibility";
  previousStageRequired: "224A/225B/226B/227B/228B/229A clean plus TypeScript clean on owner machine";
  adminVisibilityOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  giftLedgerClosure224AVisible: true;
  roomsLifecycle225BVisible: true;
  realtimeEvents226BVisible: true;
  mediaLifecycle227BVisible: true;
  moderationSafety228BVisible: true;
  foundationFinalControl229AVisible: true;
  safeDisabledStatusVisible: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureAdminRuntimeToggleRequiresSeparateApproval: true;
  sourceOnly: true;
  evidenceReferences: readonly string[];
  requiredArtifacts: readonly StreamAdminFoundationVisibilityArtifact230A[];
  requiredSections: readonly StreamAdminFoundationVisibilitySection230A[];
  safety: StreamAdminFoundationVisibilitySafety230A;
}>;

export type StreamAdminFoundationVisibilityResult230A = Readonly<{
  ok: boolean;
  prepared?: StreamAdminFoundationVisibilityPrepared230A;
  blocked: readonly StreamAdminFoundationVisibilityBlocked230A[];
}>;

export type StreamAdminFoundationVisibilitySnapshot230A = StreamAdminFoundationVisibilityPrepared230A;

export type StreamAdminFoundationVisibilityEnvelope230A = Readonly<{
  version: typeof STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION;
  readiness: StreamAdminFoundationVisibilitySnapshot230A;
  blocked: readonly StreamAdminFoundationVisibilityBlocked230A[];
}>;
