import {
  STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL,
  STREAM_FOUNDATION_FINAL_CONTROL_229A_VERSION,
  type StreamFoundationFinalControlArtifact229A,
  type StreamFoundationFinalControlBlocked229A,
  type StreamFoundationFinalControlInput229A,
  type StreamFoundationFinalControlPrepared229A,
  type StreamFoundationFinalControlResult229A,
  type StreamFoundationFinalControlSafety229A,
  type StreamFoundationFinalControlSnapshot229A,
  type StreamFoundationFinalControlSurface229A,
} from "./types";

export { STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL, STREAM_FOUNDATION_FINAL_CONTROL_229A_VERSION } from "./types";

export const STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS: readonly StreamFoundationFinalControlArtifact229A[] = [
  "224a_gift_ledger_closure_marker_locked",
  "225b_rooms_lifecycle_final_handoff_locked",
  "226b_realtime_events_final_handoff_locked",
  "227b_media_lifecycle_final_handoff_locked",
  "228b_moderation_safety_final_handoff_locked",
  "rooms_realtime_media_moderation_foundation_locked",
  "provider_not_configured_visibility_locked",
  "future_exact_owner_approval_required",
] as const;

export const STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES: readonly StreamFoundationFinalControlSurface229A[] = [
  "rooms_lifecycle_control",
  "realtime_events_control",
  "media_lifecycle_control",
  "moderation_safety_control",
  "admin_foundation_evidence",
  "provider_readiness_visibility",
  "future_runtime_execution_boundary",
] as const;

export const STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY: StreamFoundationFinalControlSafety229A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalReadinessControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous224ARequired: true,
  previous225BRequired: true,
  previous226BRequired: true,
  previous227BRequired: true,
  previous228BRequired: true,
  launchRuntimeEnablementExecuted: false,
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
  adminRuntimeToggleExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  providerRoomCallExecuted: false,
  providerRealtimeCallExecuted: false,
  providerMediaSessionCallExecuted: false,
  providerModerationCallExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeLiveSuccessAllowed: false,
  fakeRuntimeReadyAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderRuntimeRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  futureRealtimeEmitRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const RUNTIME_MARKERS_229A = [
  "runtime.enable",
  "provider.bind",
  "provider.call",
  "socket.emit",
  "room.create.execute",
  "media.start.execute",
  "moderation.ban.execute",
  "db.write.execute",
  "wallet.mutate",
  "runtime.success.forbidden",
] as const;

export function normalizeStreamFoundationFinalControlInput229A(
  input: StreamFoundationFinalControlInput229A,
): Required<StreamFoundationFinalControlInput229A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged224AStage: input.acknowledged224AStage ?? "disabled",
    acknowledged225BStage: input.acknowledged225BStage ?? "disabled",
    acknowledged226BStage: input.acknowledged226BStage ?? "disabled",
    acknowledged227BStage: input.acknowledged227BStage ?? "disabled",
    acknowledged228BStage: input.acknowledged228BStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamFoundationFinalControl229ARemainsSafe(): StreamFoundationFinalControlSafety229A {
  return STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY;
}

export function prepareStreamFoundationFinalControl229A(
  input: StreamFoundationFinalControlInput229A,
): StreamFoundationFinalControlResult229A {
  const normalized = normalizeStreamFoundationFinalControlInput229A(input);
  const blocked: StreamFoundationFinalControlBlocked229A[] = [];

  if (normalized.ownerApproval !== STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "229A owner approval marker is required for final control visibility." });
  }
  if (normalized.controlMode !== "foundation_final_readiness_control_only") {
    blocked.push({ code: "control_mode_disabled", message: "229A remains disabled unless control-only mode is selected." });
  }
  if (
    normalized.acknowledged224AStage !== "224A_gift_ledger_closure_clean" ||
    normalized.acknowledged225BStage !== "225B_rooms_lifecycle_final_handoff_clean" ||
    normalized.acknowledged226BStage !== "226B_realtime_events_final_handoff_clean" ||
    normalized.acknowledged227BStage !== "227B_media_lifecycle_final_handoff_clean" ||
    normalized.acknowledged228BStage !== "228B_moderation_safety_final_handoff_clean"
  ) {
    blocked.push({ code: "previous_stage_missing", message: "224A, 225B, 226B, 227B, and 228B clean stages are required." });
  }
  for (const artifact of STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 229A artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 229A surface: ${surface}` });
    }
  }
  if (RUNTIME_MARKERS_229A.length !== 10) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime marker catalog must remain static and non-executable." });
  }
  if (STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY.dbReadExecuted || STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }
  if (STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY.providerRuntimeEnabled || STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY.providerCredentialLookupExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime and credential lookup must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamFoundationFinalControlPrepared229A = {
    version: STREAM_FOUNDATION_FINAL_CONTROL_229A_VERSION,
    type: "stream_foundation_final_readiness_control",
    previousStageRequired: "224A/225B/226B/227B/228B clean plus TypeScript clean on owner machine",
    finalReadinessControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    giftLedgerClosure224ALocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    realtimeEventsFinalHandoff226BLocked: true,
    mediaLifecycleFinalHandoff227BLocked: true,
    moderationSafetyFinalHandoff228BLocked: true,
    roomsRealtimeMediaModerationFoundationLocked: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
    futureProviderRuntimeRequiresSeparateApproval: true,
    futureDbReadWriteRequiresSeparateApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_FOUNDATION_FINAL_CONTROL_229A_SAFETY,
  } as const;

  return { ok: true, prepared, blocked: [] };
}

export function getStreamFoundationFinalControl229ASnapshot(): StreamFoundationFinalControlSnapshot229A {
  const result = prepareStreamFoundationFinalControl229A({
    ownerApproval: STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL,
    controlMode: "foundation_final_readiness_control_only",
    acknowledged224AStage: "224A_gift_ledger_closure_clean",
    acknowledged225BStage: "225B_rooms_lifecycle_final_handoff_clean",
    acknowledged226BStage: "226B_realtime_events_final_handoff_clean",
    acknowledged227BStage: "227B_media_lifecycle_final_handoff_clean",
    acknowledged228BStage: "228B_moderation_safety_final_handoff_clean",
    evidenceReferences: ["224A_passed_122", "225B_passed_128", "226B_passed_147", "227B_passed_147", "228B_passed_149"],
    requiredArtifacts: STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("229A final control snapshot must remain prepared and safe-disabled.");
  }

  return result.prepared;
}

export function createStreamFoundationRuntimeEnablementRequest229A() {
  return {
    ok: false,
    status: 423,
    reason: "runtime_enablement_requires_new_exact_owner_approval",
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    realtimeEmitPerformed: false,
  } as const;
}

export function createStreamFoundationProviderRuntimeRequest229A() {
  return {
    ok: false,
    status: 423,
    reason: "provider_runtime_requires_new_exact_owner_approval",
    providerCredentialLookupExecuted: false,
    providerRuntimeEnabled: false,
    providerRoomCallExecuted: false,
    providerRealtimeCallExecuted: false,
    providerMediaSessionCallExecuted: false,
    providerModerationCallExecuted: false,
  } as const;
}

export function createStreamFoundationDbRuntimeRequest229A() {
  return {
    ok: false,
    status: 423,
    reason: "db_read_write_requires_new_exact_owner_approval",
    dbReadExecuted: false,
    dbWriteExecuted: false,
    migrationExecuted: false,
    prismaGenerateExecuted: false,
  } as const;
}

export function createStreamFoundationRealtimeRuntimeRequest229A() {
  return {
    ok: false,
    status: 423,
    reason: "realtime_emit_and_socket_binding_require_new_exact_owner_approval",
    realtimeEmitPerformed: false,
    socketRuntimeBindingExecuted: false,
    roomRuntimeStateMutationExecuted: false,
  } as const;
}
