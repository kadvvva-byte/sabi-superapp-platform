import {
  STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL,
  STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION,
  type StreamAdminProviderRuntimeControlArtifact230B,
  type StreamAdminProviderRuntimeControlBlocked230B,
  type StreamAdminProviderRuntimeControlInput230B,
  type StreamAdminProviderRuntimeControlPrepared230B,
  type StreamAdminProviderRuntimeControlResult230B,
  type StreamAdminProviderRuntimeControlSafety230B,
  type StreamAdminProviderRuntimeControlSnapshot230B,
  type StreamAdminProviderRuntimeControlSurface230B,
} from "./types";

export { STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL, STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION } from "./types";

export const STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS: readonly StreamAdminProviderRuntimeControlArtifact230B[] = [
  "230a_admin_foundation_visibility_clean",
  "provider_not_configured_panel_visible",
  "runtime_disabled_panel_visible",
  "exact_approval_gate_visible",
  "admin_toggle_locked_visible",
  "provider_binding_locked_visible",
  "provider_lookup_locked_visible",
  "runtime_execution_locked_visible",
] as const;

export const STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES: readonly StreamAdminProviderRuntimeControlSurface230B[] = [
  "gift_ledger_provider_status",
  "room_provider_status",
  "realtime_provider_status",
  "media_provider_status",
  "moderation_provider_status",
  "runtime_toggle_status",
  "exact_owner_approval_status",
  "safe_disabled_audit_status",
] as const;

export const STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY: StreamAdminProviderRuntimeControlSafety230B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminProviderRuntimeControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous230ARequired: true,
  adminRuntimeToggleExecuted: false,
  runtimeEnablementExecuted: false,
  providerRuntimeEnabled: false,
  providerBindingExecuted: false,
  providerActivationExecuted: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
  providerRoomCallExecuted: false,
  providerRealtimeCallExecuted: false,
  providerMediaSessionCallExecuted: false,
  providerModerationCallExecuted: false,
  providerGiftLedgerCallExecuted: false,
  roomRuntimeCreateExecuted: false,
  roomRuntimeJoinExecuted: false,
  roomRuntimeLeaveExecuted: false,
  roomRuntimeEndExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  mediaRuntimeStarted: false,
  recordingRuntimeStarted: false,
  mediaUploadRuntimeExecuted: false,
  mediaTranscodeRuntimeExecuted: false,
  cdnPublishRuntimeExecuted: false,
  moderationRuntimeActionExecuted: false,
  contentSafetyRuntimeDecisionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeSuccessWritten: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureAdminRuntimeToggleRequiresSeparateApproval: true,
  futureProviderRuntimeRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderLookupRequiresSeparateApproval: true,
  futureProviderCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const ADMIN_PROVIDER_CONTROL_MARKERS_230B = [
  "admin.provider.control.visible",
  "provider.not-configured.visible",
  "runtime.disabled.visible",
  "exact.owner-approval.visible",
  "admin.toggle.locked",
  "provider.binding.locked",
  "provider.lookup.locked",
  "provider.calls.locked",
] as const;

export function normalizeStreamAdminProviderRuntimeControlInput230B(
  input: StreamAdminProviderRuntimeControlInput230B,
): Required<StreamAdminProviderRuntimeControlInput230B> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged230AStage: input.acknowledged230AStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminProviderRuntimeControl230BRemainsSafe(): StreamAdminProviderRuntimeControlSafety230B {
  return STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY;
}

export function prepareStreamAdminProviderRuntimeControl230B(
  input: StreamAdminProviderRuntimeControlInput230B,
): StreamAdminProviderRuntimeControlResult230B {
  const normalized = normalizeStreamAdminProviderRuntimeControlInput230B(input);
  const blocked: StreamAdminProviderRuntimeControlBlocked230B[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "230B owner approval marker is required for Admin provider/runtime control visibility only." });
  }
  if (normalized.controlMode !== "admin_provider_runtime_control_visibility_only") {
    blocked.push({ code: "control_mode_disabled", message: "230B remains disabled unless Admin provider/runtime control visibility-only mode is selected." });
  }
  if (normalized.acknowledged230AStage !== "230A_admin_foundation_visibility_clean") {
    blocked.push({ code: "previous_stage_missing", message: "230A Admin foundation visibility clean stage is required." });
  }
  for (const artifact of STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 230B artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 230B Admin provider/runtime surface: ${surface}` });
    }
  }
  if (ADMIN_PROVIDER_CONTROL_MARKERS_230B.length !== 8) {
    blocked.push({ code: "runtime_not_allowed", message: "Admin provider/runtime markers must remain static and non-executable." });
  }
  if (
    STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.providerRuntimeEnabled ||
    STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.providerBindingExecuted ||
    STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.providerCallExecuted ||
    STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.providerCredentialLookupExecuted
  ) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, lookup, and calls must remain disabled." });
  }
  if (STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.dbReadExecuted || STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminProviderRuntimeControlPrepared230B = {
    version: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_VERSION,
    type: "admin_provider_runtime_control_panel",
    previousStageRequired: "230A admin foundation visibility clean plus TypeScript clean on owner machine",
    adminProviderRuntimeControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    adminFoundationVisibility230ALocked: true,
    providerRuntimeDisabledVisible: true,
    adminRuntimeToggleLocked: true,
    providerBindingLocked: true,
    providerLookupLocked: true,
    providerCallLocked: true,
    exactOwnerApprovalRequiredVisible: true,
    giftLedgerProviderStatusVisible: true,
    roomProviderStatusVisible: true,
    realtimeProviderStatusVisible: true,
    mediaProviderStatusVisible: true,
    moderationProviderStatusVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureAdminRuntimeToggleRequiresSeparateApproval: true,
    futureProviderRuntimeRequiresSeparateApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminProviderRuntimeControl230BSnapshot(): StreamAdminProviderRuntimeControlSnapshot230B {
  const result = prepareStreamAdminProviderRuntimeControl230B({
    ownerApproval: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_OWNER_APPROVAL,
    controlMode: "admin_provider_runtime_control_visibility_only",
    acknowledged230AStage: "230A_admin_foundation_visibility_clean",
    evidenceReferences: ["230A_passed_134", "229A_passed_153", "228B_passed_149", "227B_passed_147", "226B_passed_147", "225B_passed_128"],
    requiredArtifacts: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ADMIN_PROVIDER_RUNTIME_CONTROL_230B_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("230B Admin provider/runtime control snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminRuntimeToggleRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "runtime_not_allowed", message: "Admin runtime toggles are blocked in 230B and require separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderEnableRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider runtime enablement is blocked in 230B and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderBindingRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider binding and activation are blocked in 230B and require separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderLookupRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider credential lookup is blocked in 230B and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderCallRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider calls are blocked in 230B and require separate exact owner approval." },
    ],
  };
}

export function createStreamAdminDbMutationRequest230B(): StreamAdminProviderRuntimeControlResult230B {
  return {
    ok: false,
    blocked: [
      { code: "db_not_allowed", message: "DB read/write is blocked in 230B and requires separate exact owner approval." },
    ],
  };
}
