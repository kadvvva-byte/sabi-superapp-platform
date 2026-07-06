import {
  STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_READINESS_233A_VERSION,
  type StreamProviderConfigReadinessBlocked233A,
  type StreamProviderConfigReadinessInput233A,
  type StreamProviderConfigReadinessPrepared233A,
  type StreamProviderConfigReadinessResult233A,
  type StreamProviderConfigReadinessSafety233A,
  type StreamProviderConfigReadinessSnapshot233A,
  type StreamProviderConfigScope233A,
  type StreamProviderConfigScopeStatus233A,
  type StreamProviderConfigSurface233A,
} from "./types";

export { STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL, STREAM_PROVIDER_CONFIG_READINESS_233A_VERSION } from "./types";

export const STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SCOPES: readonly StreamProviderConfigScope233A[] = [
  "gift_ledger_provider",
  "stream_room_provider",
  "stream_realtime_provider",
  "stream_media_provider",
  "stream_moderation_provider",
  "creator_payout_provider",
  "diamonds_billing_provider",
] as const;

export const STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SURFACES: readonly StreamProviderConfigSurface233A[] = [
  "provider_config_status_panel",
  "provider_scope_matrix_panel",
  "reference_label_status_panel",
  "runtime_disabled_panel",
  "missing_config_blocker_panel",
  "exact_approval_gate_panel",
] as const;

export const STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY: StreamProviderConfigReadinessSafety233A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  providerConfigReadinessOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous232BRequired: true,
  providerRuntimeEnabled: false,
  providerBindingExecuted: false,
  providerActivationExecuted: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
  providerConfigValueReadExecuted: false,
  providerReferenceLabelValueReadExecuted: false,
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
  futureProviderBindingRequiresSeparateApproval: true,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  sourceOnly: true,
} as const;

function makeScopeStatus233A(scope: StreamProviderConfigScope233A): StreamProviderConfigScopeStatus233A {
  return {
    scope,
    visibleInAdmin: true,
    providerNotConfiguredVisible: true,
    runtimeDisabled: true,
    configValueReadNow: false,
    futureValueReadRequiresSeparateApproval: true,
  };
}

export function normalizeStreamProviderConfigReadinessInput233A(
  input: StreamProviderConfigReadinessInput233A,
): Required<StreamProviderConfigReadinessInput233A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    readinessMode: input.readinessMode ?? "disabled",
    acknowledged232BStage: input.acknowledged232BStage ?? "disabled",
    requiredScopes: input.requiredScopes ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    evidenceReferences: input.evidenceReferences ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamProviderConfigReadiness233ARemainsSafe(): StreamProviderConfigReadinessSafety233A {
  return STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY;
}

export function prepareStreamProviderConfigReadiness233A(
  input: StreamProviderConfigReadinessInput233A,
): StreamProviderConfigReadinessResult233A {
  const normalized = normalizeStreamProviderConfigReadinessInput233A(input);
  const blocked: StreamProviderConfigReadinessBlocked233A[] = [];

  if (normalized.ownerApproval !== STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "233A owner approval marker is required for provider config readiness visibility only." });
  }
  if (normalized.readinessMode !== "provider_config_readiness_visibility_only") {
    blocked.push({ code: "readiness_mode_disabled", message: "233A remains disabled unless provider config readiness visibility-only mode is selected." });
  }
  if (normalized.acknowledged232BStage !== "232B_admin_final_stream_control_center_clean") {
    blocked.push({ code: "admin_control_center_missing", message: "232B Admin final Stream control center clean stage is required." });
  }
  for (const scope of STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SCOPES) {
    if (!normalized.requiredScopes.includes(scope)) {
      blocked.push({ code: "scope_missing", message: `Missing provider config readiness scope: ${scope}` });
    }
  }
  for (const surface of STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing provider config readiness surface: ${surface}` });
    }
  }
  if (
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.runtimeEnablementExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.launchRuntimeEnablementExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.adminRuntimeToggleExecuted
  ) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime enablement and Admin toggles must remain disabled." });
  }
  if (
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerRuntimeEnabled ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerBindingExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerActivationExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerCredentialLookupExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerCallExecuted
  ) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, activation, lookup, and calls must remain disabled." });
  }
  if (
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerConfigValueReadExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.providerReferenceLabelValueReadExecuted
  ) {
    blocked.push({ code: "provider_config_read_not_allowed", message: "Provider config value reads are blocked in 233A." });
  }
  if (STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.dbReadExecuted || STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }
  if (
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.walletMutationExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.paymentCaptureExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.payoutExecutionExecuted ||
    STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.giftSendExecutionExecuted
  ) {
    blocked.push({ code: "money_movement_not_allowed", message: "Wallet, payment, payout, and gift-send runtime flows must remain disabled." });
  }
  if (STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.fakeSuccessWritten || STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY.fakeProviderReadyWritten) {
    blocked.push({ code: "fake_success_not_allowed", message: "Fake success and fake provider-ready signals are blocked." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamProviderConfigReadinessPrepared233A = {
    version: STREAM_PROVIDER_CONFIG_READINESS_233A_VERSION,
    type: "stream_provider_config_readiness",
    previousStageRequired: "232B Admin final stream control center clean plus TypeScript clean on owner machine",
    providerConfigReadinessOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    adminFinalStreamControlCenter232BLocked: true,
    providerScopeMatrixVisible: true,
    referenceLabelStatusVisible: true,
    missingConfigBlockerVisible: true,
    runtimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    futureProviderConfigValueReadRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    requiredScopes: normalized.requiredScopes,
    requiredSurfaces: normalized.requiredSurfaces,
    scopeStatuses: normalized.requiredScopes.map(makeScopeStatus233A),
    evidenceReferences: normalized.evidenceReferences,
    safety: STREAM_PROVIDER_CONFIG_READINESS_233A_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamProviderConfigReadiness233ASnapshot(): StreamProviderConfigReadinessSnapshot233A {
  const result = prepareStreamProviderConfigReadiness233A({
    ownerApproval: STREAM_PROVIDER_CONFIG_READINESS_233A_OWNER_APPROVAL,
    readinessMode: "provider_config_readiness_visibility_only",
    acknowledged232BStage: "232B_admin_final_stream_control_center_clean",
    requiredScopes: STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_READINESS_233A_REQUIRED_SURFACES,
    evidenceReferences: ["232B_passed_159", "provider_config_readiness_visibility_only"],
  });

  if (!result.ok || !result.prepared) {
    throw new Error("233A provider config readiness snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamProviderConfigValueReadRequest233A(): StreamProviderConfigReadinessResult233A {
  return { ok: false, blocked: [{ code: "provider_config_read_not_allowed", message: "Provider config value read is blocked in 233A and requires separate exact owner approval." }] };
}

export function createStreamProviderBindingRequest233A(): StreamProviderConfigReadinessResult233A {
  return { ok: false, blocked: [{ code: "provider_not_allowed", message: "Provider binding is blocked in 233A and requires separate exact owner approval." }] };
}

export function createStreamProviderRuntimeEnablementRequest233A(): StreamProviderConfigReadinessResult233A {
  return { ok: false, blocked: [{ code: "runtime_not_allowed", message: "Provider runtime enablement is blocked in 233A and requires separate exact owner approval." }] };
}

export function createStreamProviderConfigDbRequest233A(): StreamProviderConfigReadinessResult233A {
  return { ok: false, blocked: [{ code: "db_not_allowed", message: "Provider config DB read/write is blocked in 233A and requires separate exact owner approval." }] };
}
