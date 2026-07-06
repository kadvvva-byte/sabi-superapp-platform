import {
  STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_VERSION,
  type StreamProviderConfigAdminBindingBlocked234A,
  type StreamProviderConfigAdminBindingInput234A,
  type StreamProviderConfigAdminBindingPrepared234A,
  type StreamProviderConfigAdminBindingResult234A,
  type StreamProviderConfigAdminBindingSafety234A,
  type StreamProviderConfigAdminBindingScope234A,
  type StreamProviderConfigAdminBindingScopeStatus234A,
  type StreamProviderConfigAdminBindingSnapshot234A,
  type StreamProviderConfigAdminBindingSurface234A,
} from "./types";

export { STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL, STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_VERSION } from "./types";

export const STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES: readonly StreamProviderConfigAdminBindingScope234A[] = [
  "gift_ledger_provider",
  "stream_room_provider",
  "stream_realtime_provider",
  "stream_media_provider",
  "stream_moderation_provider",
  "creator_payout_provider",
  "diamonds_billing_provider",
] as const;

export const STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES: readonly StreamProviderConfigAdminBindingSurface234A[] = [
  "admin_binding_readiness_panel",
  "provider_scope_binding_panel",
  "reference_label_binding_panel",
  "activation_dry_run_blocker_panel",
  "runtime_disabled_panel",
  "exact_approval_gate_panel",
  "provider_not_configured_panel",
] as const;

export const STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_SAFETY: StreamProviderConfigAdminBindingSafety234A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminBindingReadinessOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous233BRequired: true,
  adminFinalStreamControlCenter232BLocked: true,
  providerConfigReadiness233ALocked: true,
  providerReferenceLabels233BLocked: true,
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
  futureProviderConfigValueReadRequiresSeparateApproval: true,
  futureProviderReferenceLabelValueReadRequiresSeparateApproval: true,
  futureAdminBindingApprovalRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderActivationRequiresSeparateApproval: true,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  sourceOnly: true,
} as const;

function makeBindingStatus234A(scope: StreamProviderConfigAdminBindingScope234A): StreamProviderConfigAdminBindingScopeStatus234A {
  return {
    scope,
    adminBindingVisible: true,
    providerNotConfiguredVisible: true,
    runtimeDisabled: true,
    configValueReadNow: false,
    referenceLabelValueReadNow: false,
    bindingExecutedNow: false,
    activationExecutedNow: false,
    futureBindingRequiresSeparateApproval: true,
  };
}

export function normalizeStreamProviderConfigAdminBindingInput234A(
  input: StreamProviderConfigAdminBindingInput234A,
): Required<StreamProviderConfigAdminBindingInput234A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    readinessMode: input.readinessMode ?? "disabled",
    acknowledged233BStage: input.acknowledged233BStage ?? "disabled",
    acknowledged232BStage: input.acknowledged232BStage ?? "disabled",
    requiredScopes: input.requiredScopes ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    evidenceReferences: input.evidenceReferences ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamProviderConfigAdminBinding234ARemainsSafe(): StreamProviderConfigAdminBindingSafety234A {
  return STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_SAFETY;
}

export function prepareStreamProviderConfigAdminBindingReadiness234A(
  input: StreamProviderConfigAdminBindingInput234A,
): StreamProviderConfigAdminBindingResult234A {
  const normalized = normalizeStreamProviderConfigAdminBindingInput234A(input);
  const blocked: StreamProviderConfigAdminBindingBlocked234A[] = [];

  if (normalized.ownerApproval !== STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "234A owner approval marker is required for Admin provider binding readiness only." });
  }
  if (normalized.readinessMode !== "provider_config_admin_binding_readiness_only") {
    blocked.push({ code: "readiness_mode_disabled", message: "234A remains disabled unless Admin binding readiness-only mode is selected." });
  }
  if (normalized.acknowledged233BStage !== "233B_reference_labels_final_handoff_clean") {
    blocked.push({ code: "reference_labels_handoff_missing", message: "233B provider config reference labels final handoff clean stage is required." });
  }
  if (normalized.acknowledged232BStage !== "232B_admin_final_stream_control_center_clean") {
    blocked.push({ code: "admin_control_center_missing", message: "232B Admin final Stream control center clean stage is required." });
  }
  for (const scope of STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES) {
    if (!normalized.requiredScopes.includes(scope)) {
      blocked.push({ code: "scope_missing", message: `Missing provider binding scope: ${scope}` });
    }
  }
  for (const surface of STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing Admin binding readiness surface: ${surface}` });
    }
  }

  const safety = STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_SAFETY;
  if (safety.runtimeEnablementExecuted || safety.launchRuntimeEnablementExecuted || safety.adminRuntimeToggleExecuted) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime enablement and Admin runtime toggles must remain disabled." });
  }
  if (safety.providerRuntimeEnabled || safety.providerBindingExecuted || safety.providerActivationExecuted || safety.providerCredentialLookupExecuted || safety.providerCallExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, activation, lookup, and calls must remain disabled." });
  }
  if (safety.providerConfigValueReadExecuted || safety.providerReferenceLabelValueReadExecuted || safety.providerReferenceLabelWriteExecuted) {
    blocked.push({ code: "provider_config_read_not_allowed", message: "Provider config/reference label value reads and writes are blocked in 234A." });
  }
  if (safety.adminBindingApprovalExecuted) {
    blocked.push({ code: "admin_binding_not_allowed", message: "Admin binding approvals are visible only and must not execute in 234A." });
  }
  if (safety.dbReadExecuted || safety.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }
  if (safety.walletMutationExecuted || safety.paymentCaptureExecuted || safety.payoutExecutionExecuted || safety.giftSendExecutionExecuted) {
    blocked.push({ code: "money_movement_not_allowed", message: "Wallet, payment, payout, and gift-send runtime flows must remain disabled." });
  }
  if (safety.fakeSuccessWritten || safety.fakeProviderReadyWritten) {
    blocked.push({ code: "fake_success_not_allowed", message: "Fake success and fake provider-ready signals are blocked." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamProviderConfigAdminBindingPrepared234A = {
    version: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_VERSION,
    type: "stream_provider_config_admin_binding_readiness",
    previousStageRequired: "233B provider config reference labels final handoff clean plus 232B Admin final stream control center clean plus TypeScript clean on owner machine",
    adminBindingReadinessOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    providerReferenceLabels233BLocked: true,
    providerConfigReadiness233ALocked: true,
    adminFinalStreamControlCenter232BLocked: true,
    adminBindingReadinessVisible: true,
    providerScopeBindingPanelVisible: true,
    referenceLabelBindingPanelVisible: true,
    activationDryRunBlockerVisible: true,
    runtimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    requiredScopeCount: 7,
    futureProviderConfigValueReadRequiresSeparateApproval: true,
    futureProviderReferenceLabelValueReadRequiresSeparateApproval: true,
    futureAdminBindingApprovalRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureProviderActivationRequiresSeparateApproval: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    requiredScopes: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES,
    bindingStatuses: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES.map(makeBindingStatus234A),
    evidenceReferences: normalized.evidenceReferences,
    safety,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamProviderConfigAdminBindingReadiness234ASnapshot(): StreamProviderConfigAdminBindingSnapshot234A {
  const result = prepareStreamProviderConfigAdminBindingReadiness234A({
    ownerApproval: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_OWNER_APPROVAL,
    readinessMode: "provider_config_admin_binding_readiness_only",
    acknowledged233BStage: "233B_reference_labels_final_handoff_clean",
    acknowledged232BStage: "232B_admin_final_stream_control_center_clean",
    requiredScopes: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_ADMIN_BINDING_READINESS_234A_REQUIRED_SURFACES,
    evidenceReferences: ["233B_passed_128", "232B_passed_159", "admin_binding_readiness_only"],
  });

  if (!result.ok || !result.prepared) {
    throw new Error("234A Admin provider binding readiness snapshot must stay safe-disabled and prepared.");
  }

  return result.prepared;
}

function blockedRequest234A(reason: string) {
  return {
    ok: false,
    status: "blocked" as const,
    reason,
    providerNotConfiguredVisible: true,
    runtimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  };
}

export function createStreamProviderConfigValueReadRequest234A() {
  return blockedRequest234A("Provider config value reads require separate exact owner approval and are not executed in 234A.");
}

export function createStreamProviderReferenceLabelValueReadRequest234A() {
  return blockedRequest234A("Provider reference label value reads require separate exact owner approval and are not executed in 234A.");
}

export function createStreamProviderAdminBindingApprovalRequest234A() {
  return blockedRequest234A("Admin binding approvals are visible only and require separate exact owner approval before execution.");
}

export function createStreamProviderBindingRequest234A() {
  return blockedRequest234A("Provider binding execution requires separate exact owner approval and is not executed in 234A.");
}

export function createStreamProviderActivationRequest234A() {
  return blockedRequest234A("Provider activation requires separate exact owner approval and is not executed in 234A.");
}

export function createStreamProviderRuntimeEnablementRequest234A() {
  return blockedRequest234A("Runtime enablement requires separate exact owner approval and is not executed in 234A.");
}
