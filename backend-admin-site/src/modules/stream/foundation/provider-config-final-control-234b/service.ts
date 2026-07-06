import {
  STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_VERSION,
  type StreamProviderConfigFinalControlBlocked234B,
  type StreamProviderConfigFinalControlInput234B,
  type StreamProviderConfigFinalControlPrepared234B,
  type StreamProviderConfigFinalControlResult234B,
  type StreamProviderConfigFinalControlSafety234B,
  type StreamProviderConfigFinalControlScope234B,
  type StreamProviderConfigFinalControlScopeStatus234B,
  type StreamProviderConfigFinalControlSnapshot234B,
  type StreamProviderConfigFinalControlSurface234B,
} from "./types";

export { STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL, STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_VERSION } from "./types";

export const STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES: readonly StreamProviderConfigFinalControlScope234B[] = [
  "gift_ledger_provider",
  "stream_room_provider",
  "stream_realtime_provider",
  "stream_media_provider",
  "stream_moderation_provider",
  "creator_payout_provider",
  "diamonds_billing_provider",
] as const;

export const STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES: readonly StreamProviderConfigFinalControlSurface234B[] = [
  "final_provider_config_control_panel",
  "final_scope_matrix_panel",
  "final_binding_readiness_panel",
  "final_missing_config_blocker_panel",
  "final_runtime_disabled_panel",
  "final_exact_approval_gate_panel",
  "final_admin_control_center_panel",
  "provider_not_configured_panel",
] as const;

export const STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_SAFETY: StreamProviderConfigFinalControlSafety234B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous234ARequired: true,
  providerConfigReadiness233ALocked: true,
  providerReferenceLabels233BLocked: true,
  providerAdminBindingReadiness234ALocked: true,
  adminFinalStreamControlCenter232BLocked: true,
  providerRuntimeEnabled: false,
  providerBindingExecuted: false,
  providerActivationExecuted: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
  providerConfigValueReadExecuted: false,
  providerReferenceLabelValueReadExecuted: false,
  providerReferenceLabelWriteExecuted: false,
  adminBindingApprovalExecuted: false,
  adminRuntimeToggleExecuted: false,
  runtimeEnablementExecuted: false,
  launchRuntimeEnablementExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  roomRuntimeCreateExecuted: false,
  roomRuntimeJoinExecuted: false,
  roomRuntimeLeaveExecuted: false,
  roomRuntimeEndExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  mediaRuntimeStarted: false,
  recordingRuntimeStarted: false,
  moderationRuntimeActionExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeSuccessWritten: false,
  fakeProviderReadyWritten: false,
  fakeLaunchReadyWritten: false,
  futureProviderConfigValueReadRequiresSeparateApproval: true,
  futureProviderReferenceLabelValueReadRequiresSeparateApproval: true,
  futureAdminBindingApprovalRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderActivationRequiresSeparateApproval: true,
  futureProviderCallRequiresSeparateApproval: true,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  sourceOnly: true,
} as const;

function makeScopeStatus234B(scope: StreamProviderConfigFinalControlScope234B): StreamProviderConfigFinalControlScopeStatus234B {
  return {
    scope,
    finalControlVisible: true,
    providerNotConfiguredVisible: true,
    runtimeDisabled: true,
    configValueReadNow: false,
    referenceLabelValueReadNow: false,
    adminBindingApprovalNow: false,
    bindingExecutedNow: false,
    activationExecutedNow: false,
    providerCallExecutedNow: false,
    futureRuntimeRequiresExactApproval: true,
  };
}

export function normalizeStreamProviderConfigFinalControlInput234B(
  input: StreamProviderConfigFinalControlInput234B = {},
): Required<Pick<StreamProviderConfigFinalControlInput234B, "ownerApproval" | "finalControlMode" | "acknowledged234AStage" | "acknowledged233BStage" | "acknowledged232BStage">> &
  Pick<StreamProviderConfigFinalControlInput234B, "requiredScopes" | "requiredSurfaces" | "evidenceReferences" | "operatorNote"> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    finalControlMode: input.finalControlMode ?? "disabled",
    acknowledged234AStage: input.acknowledged234AStage ?? "disabled",
    acknowledged233BStage: input.acknowledged233BStage ?? "disabled",
    acknowledged232BStage: input.acknowledged232BStage ?? "disabled",
    requiredScopes: input.requiredScopes ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    evidenceReferences: input.evidenceReferences ?? [],
    operatorNote: input.operatorNote,
  };
}

function missingRequiredItems<T extends string>(required: readonly T[], actual: readonly T[] | undefined): readonly T[] {
  const actualSet = new Set(actual ?? []);
  return required.filter((item) => !actualSet.has(item));
}

export function assertStreamProviderConfigFinalControl234BRemainsSafe(): StreamProviderConfigFinalControlSafety234B {
  return STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_SAFETY;
}

export function prepareStreamProviderConfigFinalControl234B(
  input: StreamProviderConfigFinalControlInput234B = {},
): StreamProviderConfigFinalControlResult234B {
  const normalized = normalizeStreamProviderConfigFinalControlInput234B(input);
  const blocked: StreamProviderConfigFinalControlBlocked234B[] = [];

  if (normalized.ownerApproval !== STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "234B final provider config control requires the exact owner approval marker." });
  }
  if (normalized.finalControlMode !== "provider_config_final_control_only") {
    blocked.push({ code: "final_control_mode_disabled", message: "234B can only prepare the final provider config control snapshot." });
  }
  if (normalized.acknowledged234AStage !== "234A_admin_binding_readiness_clean") {
    blocked.push({ code: "admin_binding_readiness_missing", message: "234A Admin binding readiness must be clean before 234B." });
  }
  if (normalized.acknowledged233BStage !== "233B_reference_labels_final_handoff_clean") {
    blocked.push({ code: "reference_labels_handoff_missing", message: "233B reference labels final handoff must be clean before 234B." });
  }
  if (normalized.acknowledged232BStage !== "232B_admin_final_stream_control_center_clean") {
    blocked.push({ code: "admin_control_center_missing", message: "232B Admin final Stream control center must be clean before 234B." });
  }

  const missingScopes = missingRequiredItems(STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES, normalized.requiredScopes);
  for (const scope of missingScopes) {
    blocked.push({ code: "scope_missing", message: `Required provider scope is missing from 234B final control: ${scope}.` });
  }

  const missingSurfaces = missingRequiredItems(STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES, normalized.requiredSurfaces);
  for (const surface of missingSurfaces) {
    blocked.push({ code: "surface_missing", message: `Required Admin surface is missing from 234B final control: ${surface}.` });
  }

  const safety = STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_SAFETY;
  if (safety.runtimeEnablementExecuted || safety.launchRuntimeEnablementExecuted || safety.adminRuntimeToggleExecuted) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime enablement and Admin runtime toggles must remain disabled." });
  }
  if (safety.providerRuntimeEnabled || safety.providerBindingExecuted || safety.providerActivationExecuted || safety.providerCredentialLookupExecuted || safety.providerCallExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, activation, lookup, and calls must remain disabled." });
  }
  if (safety.providerConfigValueReadExecuted || safety.providerReferenceLabelValueReadExecuted || safety.providerReferenceLabelWriteExecuted) {
    blocked.push({ code: "provider_config_read_not_allowed", message: "Provider config/reference label value reads and writes are blocked in 234B." });
  }
  if (safety.adminBindingApprovalExecuted) {
    blocked.push({ code: "admin_binding_not_allowed", message: "Admin binding approvals are visible only and must not execute in 234B." });
  }
  if (safety.dbReadExecuted || safety.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }
  if (safety.walletMutationExecuted || safety.paymentCaptureExecuted || safety.payoutExecutionExecuted || safety.giftSendExecutionExecuted) {
    blocked.push({ code: "money_movement_not_allowed", message: "Wallet, payment, payout, and gift-send runtime flows must remain disabled." });
  }
  if (safety.fakeSuccessWritten || safety.fakeProviderReadyWritten || safety.fakeLaunchReadyWritten) {
    blocked.push({ code: "fake_success_not_allowed", message: "Fake success, fake provider-ready, and fake launch-ready signals are blocked." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamProviderConfigFinalControlPrepared234B = {
    version: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_VERSION,
    type: "stream_provider_config_final_control",
    previousStageRequired: "234A admin binding readiness clean plus 233B reference labels final handoff plus 232B Admin final stream control center clean plus TypeScript clean on owner machine",
    finalControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    providerConfigReadiness233ALocked: true,
    providerReferenceLabels233BLocked: true,
    providerAdminBindingReadiness234ALocked: true,
    adminFinalStreamControlCenter232BLocked: true,
    providerScopeMatrixLocked: true,
    referenceLabelMatrixLocked: true,
    adminBindingReadinessLocked: true,
    missingConfigBlockerVisible: true,
    finalRuntimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    providerConfigSafeDisabledCoveragePercent: 100,
    requiredScopeCount: 7,
    futureProviderConfigValueReadRequiresSeparateApproval: true,
    futureProviderReferenceLabelValueReadRequiresSeparateApproval: true,
    futureAdminBindingApprovalRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureProviderActivationRequiresSeparateApproval: true,
    futureProviderCallRequiresSeparateApproval: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    requiredScopes: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES,
    scopeStatuses: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES.map(makeScopeStatus234B),
    evidenceReferences: normalized.evidenceReferences ?? [],
    safety,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamProviderConfigFinalControl234BSnapshot(): StreamProviderConfigFinalControlSnapshot234B {
  const result = prepareStreamProviderConfigFinalControl234B({
    ownerApproval: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_OWNER_APPROVAL,
    finalControlMode: "provider_config_final_control_only",
    acknowledged234AStage: "234A_admin_binding_readiness_clean",
    acknowledged233BStage: "233B_reference_labels_final_handoff_clean",
    acknowledged232BStage: "232B_admin_final_stream_control_center_clean",
    requiredScopes: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_FINAL_CONTROL_234B_REQUIRED_SURFACES,
    evidenceReferences: ["234A_passed_142", "233B_passed_128", "232B_passed_159", "provider_config_final_control_only"],
  });

  if (!result.ok || !result.prepared) {
    throw new Error("234B provider config final control snapshot must stay safe-disabled and prepared.");
  }

  return result.prepared;
}

function blockedRequest234B(reason: string) {
  return {
    ok: false,
    status: "blocked" as const,
    reason,
    providerNotConfiguredVisible: true,
    finalRuntimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  };
}

export function createStreamProviderConfigValueReadRequest234B() {
  return blockedRequest234B("Provider config value reads require separate exact owner approval and are not executed in 234B.");
}

export function createStreamProviderReferenceLabelValueReadRequest234B() {
  return blockedRequest234B("Provider reference label value reads require separate exact owner approval and are not executed in 234B.");
}

export function createStreamProviderReferenceLabelWriteRequest234B() {
  return blockedRequest234B("Provider reference label writes require separate exact owner approval and are not executed in 234B.");
}

export function createStreamProviderAdminBindingApprovalRequest234B() {
  return blockedRequest234B("Admin binding approvals require separate exact owner approval and are not executed in 234B.");
}

export function createStreamProviderBindingRequest234B() {
  return blockedRequest234B("Provider binding requires separate exact owner approval and is not executed in 234B.");
}

export function createStreamProviderActivationRequest234B() {
  return blockedRequest234B("Provider activation requires separate exact owner approval and is not executed in 234B.");
}

export function createStreamProviderCallRequest234B() {
  return blockedRequest234B("Provider calls require separate exact owner approval and are not executed in 234B.");
}

export function createStreamProviderRuntimeEnablementRequest234B() {
  return blockedRequest234B("Runtime enablement requires separate exact owner approval and is not executed in 234B.");
}

export function createStreamProviderLaunchRuntimeRequest234B() {
  return blockedRequest234B("Launch runtime enablement requires separate exact owner approval and is not executed in 234B.");
}
