import {
  STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL,
  STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_VERSION,
  type StreamAdminFinalStreamControlCenterArtifact232B,
  type StreamAdminFinalStreamControlCenterBlocked232B,
  type StreamAdminFinalStreamControlCenterInput232B,
  type StreamAdminFinalStreamControlCenterPrepared232B,
  type StreamAdminFinalStreamControlCenterResult232B,
  type StreamAdminFinalStreamControlCenterSafety232B,
  type StreamAdminFinalStreamControlCenterSnapshot232B,
  type StreamAdminFinalStreamControlCenterSurface232B,
} from "./types";

export { STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL, STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_VERSION } from "./types";

export const STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS: readonly StreamAdminFinalStreamControlCenterArtifact232B[] = [
  "229a_stream_foundation_final_control_clean",
  "230a_admin_foundation_visibility_clean",
  "230b_admin_provider_runtime_control_clean",
  "231a_admin_rooms_control_clean",
  "231b_admin_realtime_media_control_clean",
  "232a_admin_moderation_safety_control_clean",
  "safe_disabled_status_visible",
  "blocker_matrix_visible",
  "approval_gate_visible",
] as const;

export const STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES: readonly StreamAdminFinalStreamControlCenterSurface232B[] = [
  "final_stream_status_panel",
  "safe_disabled_coverage_panel",
  "blocker_matrix_panel",
  "approval_gate_panel",
  "provider_runtime_status_panel",
  "rooms_control_summary_panel",
  "realtime_media_control_summary_panel",
  "moderation_safety_control_summary_panel",
  "runtime_execution_locked_panel",
] as const;

export const STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY: StreamAdminFinalStreamControlCenterSafety232B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminFinalStreamControlCenterOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous229ARequired: true,
  previous230ARequired: true,
  previous230BRequired: true,
  previous231ARequired: true,
  previous231BRequired: true,
  previous232ARequired: true,
  adminRuntimeToggleExecuted: false,
  runtimeEnablementExecuted: false,
  launchRuntimeEnablementExecuted: false,
  providerRuntimeEnabled: false,
  providerBindingExecuted: false,
  providerActivationExecuted: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
  providerRoomCallExecuted: false,
  providerRealtimeCallExecuted: false,
  providerMediaSessionCallExecuted: false,
  providerModerationCallExecuted: false,
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
  moderationRuntimeBanExecuted: false,
  moderationRuntimeMuteExecuted: false,
  moderationRuntimeKickExecuted: false,
  moderationRuntimeReportWriteExecuted: false,
  contentSafetyRuntimeDecisionExecuted: false,
  appealRuntimeDecisionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeSuccessWritten: false,
  fakeLaunchReadyWritten: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureProviderActivationRequiresSeparateApproval: true,
  futureAdminRuntimeToggleRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  futureRoomRealtimeMediaModerationRuntimeRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const FINAL_STREAM_CONTROL_CENTER_MARKERS_232B = [
  "admin.final-stream-control-center.visible",
  "safe-disabled.coverage.visible",
  "blocker.matrix.visible",
  "approval.gate.visible",
  "provider.runtime.status.locked",
  "rooms.control.summary.locked",
  "realtime-media.control.summary.locked",
  "moderation-safety.control.summary.locked",
  "runtime.execution.locked",
] as const;

export function normalizeStreamAdminFinalStreamControlCenterInput232B(
  input: StreamAdminFinalStreamControlCenterInput232B,
): Required<StreamAdminFinalStreamControlCenterInput232B> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged229AStage: input.acknowledged229AStage ?? "disabled",
    acknowledged230AStage: input.acknowledged230AStage ?? "disabled",
    acknowledged230BStage: input.acknowledged230BStage ?? "disabled",
    acknowledged231AStage: input.acknowledged231AStage ?? "disabled",
    acknowledged231BStage: input.acknowledged231BStage ?? "disabled",
    acknowledged232AStage: input.acknowledged232AStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminFinalStreamControlCenter232BRemainsSafe(): StreamAdminFinalStreamControlCenterSafety232B {
  return STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY;
}

export function prepareStreamAdminFinalStreamControlCenter232B(
  input: StreamAdminFinalStreamControlCenterInput232B,
): StreamAdminFinalStreamControlCenterResult232B {
  const normalized = normalizeStreamAdminFinalStreamControlCenterInput232B(input);
  const blocked: StreamAdminFinalStreamControlCenterBlocked232B[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "232B owner approval marker is required for Admin final stream control center visibility only." });
  }
  if (normalized.controlMode !== "admin_final_stream_control_center_visibility_only") {
    blocked.push({ code: "control_mode_disabled", message: "232B remains disabled unless final Admin Stream control center visibility-only mode is selected." });
  }
  if (normalized.acknowledged229AStage !== "229A_stream_foundation_final_control_clean") {
    blocked.push({ code: "foundation_stage_missing", message: "229A Stream foundation final control clean stage is required." });
  }
  if (normalized.acknowledged230AStage !== "230A_admin_foundation_visibility_clean") {
    blocked.push({ code: "admin_visibility_stage_missing", message: "230A Admin foundation visibility clean stage is required." });
  }
  if (normalized.acknowledged230BStage !== "230B_admin_provider_runtime_control_clean") {
    blocked.push({ code: "provider_runtime_stage_missing", message: "230B Admin provider/runtime control clean stage is required." });
  }
  if (normalized.acknowledged231AStage !== "231A_admin_rooms_control_clean") {
    blocked.push({ code: "rooms_control_stage_missing", message: "231A Admin rooms control clean stage is required." });
  }
  if (normalized.acknowledged231BStage !== "231B_admin_realtime_media_control_clean") {
    blocked.push({ code: "realtime_media_control_stage_missing", message: "231B Admin realtime/media control clean stage is required." });
  }
  if (normalized.acknowledged232AStage !== "232A_admin_moderation_safety_control_clean") {
    blocked.push({ code: "moderation_safety_control_stage_missing", message: "232A Admin moderation/safety control clean stage is required." });
  }
  for (const artifact of STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 232B final Admin Stream control artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 232B final Admin Stream control surface: ${surface}` });
    }
  }
  if (FINAL_STREAM_CONTROL_CENTER_MARKERS_232B.length !== 9) {
    blocked.push({ code: "runtime_not_allowed", message: "Final Admin Stream control center markers must remain static and non-executable." });
  }
  if (
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.runtimeEnablementExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.launchRuntimeEnablementExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.adminRuntimeToggleExecuted
  ) {
    blocked.push({ code: "runtime_not_allowed", message: "Runtime enablement and Admin toggles must remain disabled." });
  }
  if (
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.providerRuntimeEnabled ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.providerBindingExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.providerActivationExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.providerCallExecuted
  ) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime, binding, activation, lookup, and calls must remain disabled." });
  }
  if (STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.dbReadExecuted || STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }
  if (
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.walletMutationExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.paymentCaptureExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.payoutExecutionExecuted ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.giftSendExecutionExecuted
  ) {
    blocked.push({ code: "money_movement_not_allowed", message: "Wallet, payment, payout, and gift-send runtime flows must remain disabled." });
  }
  if (
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.fakeSuccessWritten ||
    STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY.fakeLaunchReadyWritten
  ) {
    blocked.push({ code: "fake_success_not_allowed", message: "Fake success and fake launch-ready signals are blocked." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminFinalStreamControlCenterPrepared232B = {
    version: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_VERSION,
    type: "admin_final_stream_control_center",
    previousStageRequired: "229A foundation final control plus 230A/230B/231A/231B/232A Admin controls clean plus TypeScript clean on owner machine",
    adminFinalStreamControlCenterOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    foundationFinalControl229ALocked: true,
    adminFoundationVisibility230ALocked: true,
    adminProviderRuntimeControl230BLocked: true,
    adminRoomsControl231ALocked: true,
    adminRealtimeMediaControl231BLocked: true,
    adminModerationSafetyControl232ALocked: true,
    safeDisabledCoveragePercent: 100,
    blockerMatrixVisible: true,
    exactApprovalGateVisible: true,
    finalSafeDisabledStatusVisible: true,
    runtimeLaunchBlockedUntilExactApproval: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminFinalStreamControlCenter232BSnapshot(): StreamAdminFinalStreamControlCenterSnapshot232B {
  const result = prepareStreamAdminFinalStreamControlCenter232B({
    ownerApproval: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL,
    controlMode: "admin_final_stream_control_center_visibility_only",
    acknowledged229AStage: "229A_stream_foundation_final_control_clean",
    acknowledged230AStage: "230A_admin_foundation_visibility_clean",
    acknowledged230BStage: "230B_admin_provider_runtime_control_clean",
    acknowledged231AStage: "231A_admin_rooms_control_clean",
    acknowledged231BStage: "231B_admin_realtime_media_control_clean",
    acknowledged232AStage: "232A_admin_moderation_safety_control_clean",
    evidenceReferences: ["229A_passed_153", "230A_passed_134", "230B_passed_141", "231A_passed_143", "231B_passed_141", "232A_passed_140"],
    requiredArtifacts: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("232B Admin final stream control center snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminFinalRuntimeEnablementRequest232B(): StreamAdminFinalStreamControlCenterResult232B {
  return { ok: false, blocked: [{ code: "runtime_not_allowed", message: "Runtime enablement is blocked in 232B and requires separate exact owner approval." }] };
}

export function createStreamAdminFinalProviderActivationRequest232B(): StreamAdminFinalStreamControlCenterResult232B {
  return { ok: false, blocked: [{ code: "provider_not_allowed", message: "Provider activation is blocked in 232B and requires separate exact owner approval." }] };
}

export function createStreamAdminFinalRuntimeToggleRequest232B(): StreamAdminFinalStreamControlCenterResult232B {
  return { ok: false, blocked: [{ code: "runtime_not_allowed", message: "Admin runtime toggle is blocked in 232B and requires separate exact owner approval." }] };
}

export function createStreamAdminFinalDbMutationRequest232B(): StreamAdminFinalStreamControlCenterResult232B {
  return { ok: false, blocked: [{ code: "db_not_allowed", message: "Final Stream control center DB mutation is blocked in 232B and requires separate exact owner approval." }] };
}

export function createStreamAdminFinalLaunchExecutionRequest232B(): StreamAdminFinalStreamControlCenterResult232B {
  return { ok: false, blocked: [{ code: "runtime_not_allowed", message: "Launch execution is blocked in 232B; safe-disabled Admin visibility is complete but live runtime needs a separate exact owner approval chain." }] };
}
