export const STREAM_PROVIDER_CONFIG_READINESS_233A_VERSION = "BACKEND-STREAM-PROVIDER-CONFIG-READINESS-233A" as const;

export const STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL =
  "I_APPROVE_233A_STREAM_PROVIDER_CONFIG_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export type StreamProviderConfigScope233A =
  | "gift_ledger_provider"
  | "stream_room_provider"
  | "stream_realtime_provider"
  | "stream_media_provider"
  | "stream_moderation_provider"
  | "creator_payout_provider"
  | "diamonds_billing_provider";

export type StreamProviderConfigSurface233A =
  | "provider_config_status_panel"
  | "provider_scope_matrix_panel"
  | "reference_label_status_panel"
  | "runtime_disabled_panel"
  | "missing_config_blocker_panel"
  | "exact_approval_gate_panel";

export type StreamProviderConfigReadinessSafety233A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  providerConfigReadinessOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previous232BRequired: true;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerActivationExecuted: false;
  providerCredentialLookupExecuted: false;
  providerCallExecuted: false;
  providerConfigValueReadExecuted: false;
  providerReferenceLabelValueReadExecuted: false;
  adminRuntimeToggleExecuted: false;
  runtimeEnablementExecuted: false;
  launchRuntimeEnablementExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  roomRuntimeCreateExecuted: false;
  realtimeEmitPerformed: false;
  socketRuntimeBindingExecuted: false;
  mediaRuntimeStarted: false;
  recordingRuntimeStarted: false;
  moderationRuntimeActionExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  giftSendExecutionExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  fakeSuccessWritten: false;
  fakeProviderReadyWritten: false;
  futureProviderConfigValueReadRequiresSeparateApproval: true;
  futureProviderBindingRequiresSeparateApproval: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  sourceOnly: true;
}>;

export type StreamProviderConfigReadinessInput233A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "provider_config_readiness_visibility_only" | "disabled";
  acknowledged232BStage?: "232B_admin_final_stream_control_center_clean" | "disabled";
  requiredScopes?: readonly StreamProviderConfigScope233A[];
  requiredSurfaces?: readonly StreamProviderConfigSurface233A[];
  evidenceReferences?: readonly string[];
  operatorNote?: string;
}>;

export type StreamProviderConfigReadinessBlockedCode233A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "admin_control_center_missing"
  | "scope_missing"
  | "surface_missing"
  | "runtime_not_allowed"
  | "provider_not_allowed"
  | "provider_config_read_not_allowed"
  | "db_not_allowed"
  | "money_movement_not_allowed"
  | "fake_success_not_allowed";

export type StreamProviderConfigReadinessBlocked233A = Readonly<{
  code: StreamProviderConfigReadinessBlockedCode233A;
  message: string;
}>;

export type StreamProviderConfigScopeStatus233A = Readonly<{
  scope: StreamProviderConfigScope233A;
  visibleInAdmin: true;
  providerNotConfiguredVisible: true;
  runtimeDisabled: true;
  configValueReadNow: false;
  futureValueReadRequiresSeparateApproval: true;
}>;

export type StreamProviderConfigReadinessPrepared233A = Readonly<{
  version: typeof STREAM_PROVIDER_CONFIG_READINESS_233A_VERSION;
  type: "stream_provider_config_readiness";
  previousStageRequired: "232B Admin final stream control center clean plus TypeScript clean on owner machine";
  providerConfigReadinessOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  adminFinalStreamControlCenter232BLocked: true;
  providerScopeMatrixVisible: true;
  referenceLabelStatusVisible: true;
  missingConfigBlockerVisible: true;
  runtimeDisabledStatusVisible: true;
  exactApprovalGateVisible: true;
  futureProviderConfigValueReadRequiresSeparateApproval: true;
  futureProviderBindingRequiresSeparateApproval: true;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  sourceOnly: true;
  requiredScopes: readonly StreamProviderConfigScope233A[];
  requiredSurfaces: readonly StreamProviderConfigSurface233A[];
  scopeStatuses: readonly StreamProviderConfigScopeStatus233A[];
  evidenceReferences: readonly string[];
  safety: StreamProviderConfigReadinessSafety233A;
}>;

export type StreamProviderConfigReadinessResult233A = Readonly<{
  ok: boolean;
  prepared?: StreamProviderConfigReadinessPrepared233A;
  blocked: readonly StreamProviderConfigReadinessBlocked233A[];
}>;

export type StreamProviderConfigReadinessSnapshot233A = StreamProviderConfigReadinessPrepared233A;
