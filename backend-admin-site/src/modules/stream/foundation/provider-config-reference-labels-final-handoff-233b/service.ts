import {
  STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL,
  STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_VERSION,
  type StreamProviderConfigReferenceLabelBlocked233B,
  type StreamProviderConfigReferenceLabelInput233B,
  type StreamProviderConfigReferenceLabelPrepared233B,
  type StreamProviderConfigReferenceLabelResult233B,
  type StreamProviderConfigReferenceLabelSafety233B,
  type StreamProviderConfigReferenceLabelScope233B,
  type StreamProviderConfigReferenceLabelSnapshot233B,
  type StreamProviderConfigReferenceLabelStatus233B,
  type StreamProviderConfigReferenceLabelSurface233B,
} from "./types";

export { STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL, STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_VERSION } from "./types";

export const STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SCOPES: readonly StreamProviderConfigReferenceLabelScope233B[] = [
  "gift_ledger_provider",
  "stream_room_provider",
  "stream_realtime_provider",
  "stream_media_provider",
  "stream_moderation_provider",
  "creator_payout_provider",
  "diamonds_billing_provider",
] as const;

export const STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SURFACES: readonly StreamProviderConfigReferenceLabelSurface233B[] = [
  "reference_label_matrix_panel",
  "scope_ownership_panel",
  "missing_label_blocker_panel",
  "runtime_disabled_panel",
  "exact_approval_gate_panel",
  "provider_not_configured_panel",
] as const;

export const STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_SAFETY: StreamProviderConfigReferenceLabelSafety233B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous233ARequired: true,
  adminFinalStreamControlCenter232BLocked: true,
  providerConfigReadiness233ALocked: true,
  providerRuntimeEnabled: false,
  providerBindingExecuted: false,
  providerActivationExecuted: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
  providerConfigValueReadExecuted: false,
  providerReferenceLabelValueReadExecuted: false,
  providerReferenceLabelWriteExecuted: false,
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
  futureProviderBindingRequiresSeparateApproval: true,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  sourceOnly: true,
} as const;

function makeLabelStatus233B(scope: StreamProviderConfigReferenceLabelScope233B): StreamProviderConfigReferenceLabelStatus233B {
  return {
    scope,
    referenceLabelVisible: true,
    providerNotConfiguredVisible: true,
    runtimeDisabled: true,
    valueReadNow: false,
    labelWriteNow: false,
    futureValueReadRequiresSeparateApproval: true,
  };
}

export function normalizeStreamProviderConfigReferenceLabelInput233B(
  input: StreamProviderConfigReferenceLabelInput233B,
): Required<StreamProviderConfigReferenceLabelInput233B> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    handoffMode: input.handoffMode ?? "disabled",
    acknowledged233AStage: input.acknowledged233AStage ?? "disabled",
    acknowledged232BStage: input.acknowledged232BStage ?? "disabled",
    requiredScopes: input.requiredScopes ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    evidenceReferences: input.evidenceReferences ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamProviderConfigReferenceLabels233BRemainSafe(): StreamProviderConfigReferenceLabelSafety233B {
  return STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_SAFETY;
}

export function prepareStreamProviderConfigReferenceLabelsFinalHandoff233B(
  input: StreamProviderConfigReferenceLabelInput233B,
): StreamProviderConfigReferenceLabelResult233B {
  const normalized = normalizeStreamProviderConfigReferenceLabelInput233B(input);
  const blocked: StreamProviderConfigReferenceLabelBlocked233B[] = [];

  if (normalized.ownerApproval !== STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "233B owner approval marker is required for provider config reference labels final handoff only." });
  }
  if (normalized.handoffMode !== "provider_config_reference_labels_final_handoff_only") {
    blocked.push({ code: "handoff_mode_disabled", message: "233B remains disabled unless final handoff-only mode is selected." });
  }
  if (normalized.acknowledged233AStage !== "233A_provider_config_readiness_clean") {
    blocked.push({ code: "provider_config_readiness_missing", message: "233A provider config readiness clean stage is required." });
  }
  if (normalized.acknowledged232BStage !== "232B_admin_final_stream_control_center_clean") {
    blocked.push({ code: "admin_control_center_missing", message: "232B Admin final Stream control center clean stage is required." });
  }
  for (const scope of STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SCOPES) {
    if (!normalized.requiredScopes.includes(scope)) {
      blocked.push({ code: "scope_missing", message: `Missing reference label scope: ${scope}` });
    }
  }
  for (const surface of STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing Admin reference label surface: ${surface}` });
    }
  }

  const safety = STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_SAFETY;
  if (safety.runtimeEnablementExecuted || safety.launchRuntimeEnablementExecuted || safety.adminRuntimeToggleExecuted) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime enablement and Admin runtime toggles must remain disabled." });
  }
  if (safety.providerRuntimeEnabled || safety.providerBindingExecuted || safety.providerActivationExecuted || safety.providerCredentialLookupExecuted || safety.providerCallExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, activation, lookup, and calls must remain disabled." });
  }
  if (safety.providerConfigValueReadExecuted || safety.providerReferenceLabelValueReadExecuted) {
    blocked.push({ code: "provider_config_read_not_allowed", message: "Provider config and reference label value reads are blocked in 233B." });
  }
  if (safety.providerReferenceLabelWriteExecuted) {
    blocked.push({ code: "label_write_not_allowed", message: "Provider reference label writes are blocked in 233B." });
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

  const prepared: StreamProviderConfigReferenceLabelPrepared233B = {
    version: STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_VERSION,
    type: "stream_provider_config_reference_labels_final_handoff",
    previousStageRequired: "233A provider config readiness clean plus 232B Admin final stream control center clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    providerConfigReadiness233ALocked: true,
    adminFinalStreamControlCenter232BLocked: true,
    referenceLabelMatrixVisible: true,
    scopeOwnershipPanelVisible: true,
    missingLabelBlockerVisible: true,
    runtimeDisabledStatusVisible: true,
    exactApprovalGateVisible: true,
    requiredScopeCount: 7,
    futureProviderConfigValueReadRequiresSeparateApproval: true,
    futureProviderReferenceLabelValueReadRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    requiredScopes: normalized.requiredScopes,
    requiredSurfaces: normalized.requiredSurfaces,
    labelStatuses: normalized.requiredScopes.map(makeLabelStatus233B),
    evidenceReferences: normalized.evidenceReferences,
    safety,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamProviderConfigReferenceLabelsFinalHandoff233BSnapshot(): StreamProviderConfigReferenceLabelSnapshot233B {
  const result = prepareStreamProviderConfigReferenceLabelsFinalHandoff233B({
    ownerApproval: STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_OWNER_APPROVAL,
    handoffMode: "provider_config_reference_labels_final_handoff_only",
    acknowledged233AStage: "233A_provider_config_readiness_clean",
    acknowledged232BStage: "232B_admin_final_stream_control_center_clean",
    requiredScopes: STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SCOPES,
    requiredSurfaces: STREAM_PROVIDER_CONFIG_REFERENCE_LABELS_FINAL_HANDOFF_233B_REQUIRED_SURFACES,
    evidenceReferences: ["233A_passed_121", "232B_passed_159", "reference_labels_final_handoff_only"],
  });

  if (!result.ok || !result.prepared) {
    throw new Error("233B provider config reference labels final handoff snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamProviderConfigReferenceLabelValueReadRequest233B(): StreamProviderConfigReferenceLabelResult233B {
  return { ok: false, blocked: [{ code: "provider_config_read_not_allowed", message: "Provider reference label value read is blocked in 233B and requires separate exact owner approval." }] };
}

export function createStreamProviderConfigReferenceLabelWriteRequest233B(): StreamProviderConfigReferenceLabelResult233B {
  return { ok: false, blocked: [{ code: "label_write_not_allowed", message: "Provider reference label write is blocked in 233B and requires separate exact owner approval." }] };
}

export function createStreamProviderConfigBindingRequest233B(): StreamProviderConfigReferenceLabelResult233B {
  return { ok: false, blocked: [{ code: "provider_not_allowed", message: "Provider binding is blocked in 233B and requires separate exact owner approval." }] };
}

export function createStreamProviderConfigRuntimeEnablementRequest233B(): StreamProviderConfigReferenceLabelResult233B {
  return { ok: false, blocked: [{ code: "runtime_not_allowed", message: "Provider runtime enablement is blocked in 233B and requires separate exact owner approval." }] };
}
