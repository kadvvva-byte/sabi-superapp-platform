import {
  STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL,
  STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION,
  type StreamAdminModerationSafetyControlArtifact232A,
  type StreamAdminModerationSafetyControlBlocked232A,
  type StreamAdminModerationSafetyControlInput232A,
  type StreamAdminModerationSafetyControlPrepared232A,
  type StreamAdminModerationSafetyControlResult232A,
  type StreamAdminModerationSafetyControlSafety232A,
  type StreamAdminModerationSafetyControlSnapshot232A,
  type StreamAdminModerationSafetyControlSurface232A,
} from "./types";

export { STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL, STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION } from "./types";

export const STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS: readonly StreamAdminModerationSafetyControlArtifact232A[] = [
  "230b_admin_provider_runtime_control_clean",
  "228b_moderation_safety_final_handoff_clean",
  "ban_control_visible",
  "mute_control_visible",
  "kick_control_visible",
  "report_queue_control_visible",
  "content_safety_review_visible",
  "appeal_review_control_visible",
  "provider_moderation_status_visible",
] as const;

export const STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES: readonly StreamAdminModerationSafetyControlSurface232A[] = [
  "moderation_status_panel",
  "ban_gate_panel",
  "mute_gate_panel",
  "kick_gate_panel",
  "report_queue_gate_panel",
  "content_safety_review_gate_panel",
  "appeal_review_gate_panel",
  "safe_disabled_moderation_runtime_panel",
] as const;

export const STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY: StreamAdminModerationSafetyControlSafety232A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminModerationSafetyControlOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous230BRequired: true,
  moderation228BRequired: true,
  adminBanToggleExecuted: false,
  adminMuteToggleExecuted: false,
  adminKickToggleExecuted: false,
  adminReportToggleExecuted: false,
  adminContentSafetyToggleExecuted: false,
  moderationRuntimeBanExecuted: false,
  moderationRuntimeMuteExecuted: false,
  moderationRuntimeKickExecuted: false,
  moderationRuntimeReportWriteExecuted: false,
  contentSafetyRuntimeDecisionExecuted: false,
  appealRuntimeDecisionExecuted: false,
  adminModerationToggleExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  mediaRuntimeStarted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  providerModerationCallExecuted: false,
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
  futureModerationRuntimeActionRequiresSeparateApproval: true,
  futureContentSafetyDecisionRequiresSeparateApproval: true,
  futureAppealRuntimeDecisionRequiresSeparateApproval: true,
  futureProviderModerationCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const ADMIN_MODERATION_SAFETY_CONTROL_MARKERS_232A = [
  "admin.moderation-safety.control.visible",
  "ban.control.locked",
  "mute.control.locked",
  "kick.control.locked",
  "report.queue.control.locked",
  "content.safety.review.locked",
  "appeal.review.control.locked",
  "provider.moderation.status.visible",
] as const;

export function normalizeStreamAdminModerationSafetyControlInput232A(
  input: StreamAdminModerationSafetyControlInput232A,
): Required<StreamAdminModerationSafetyControlInput232A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    controlMode: input.controlMode ?? "disabled",
    acknowledged230BStage: input.acknowledged230BStage ?? "disabled",
    acknowledged228BStage: input.acknowledged228BStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSurfaces: input.requiredSurfaces ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminModerationSafetyControl232ARemainsSafe(): StreamAdminModerationSafetyControlSafety232A {
  return STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY;
}

export function prepareStreamAdminModerationSafetyControl232A(
  input: StreamAdminModerationSafetyControlInput232A,
): StreamAdminModerationSafetyControlResult232A {
  const normalized = normalizeStreamAdminModerationSafetyControlInput232A(input);
  const blocked: StreamAdminModerationSafetyControlBlocked232A[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "232A owner approval marker is required for Admin moderation/safety control visibility only." });
  }
  if (normalized.controlMode !== "admin_moderation_safety_control_visibility_only") {
    blocked.push({ code: "control_mode_disabled", message: "232A remains disabled unless Admin moderation/safety control visibility-only mode is selected." });
  }
  if (normalized.acknowledged230BStage !== "230B_admin_provider_runtime_control_clean") {
    blocked.push({ code: "previous_stage_missing", message: "230B Admin provider/runtime control clean stage is required." });
  }
  if (normalized.acknowledged228BStage !== "228B_moderation_safety_final_handoff_clean") {
    blocked.push({ code: "moderation_stage_missing", message: "228B moderation/safety final handoff clean stage is required." });
  }
  for (const artifact of STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 232A artifact: ${artifact}` });
    }
  }
  for (const surface of STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) {
      blocked.push({ code: "surface_missing", message: `Missing 232A Admin moderation/safety control surface: ${surface}` });
    }
  }
  if (ADMIN_MODERATION_SAFETY_CONTROL_MARKERS_232A.length !== 8) {
    blocked.push({ code: "moderation_runtime_not_allowed", message: "Admin moderation/safety markers must remain static and non-executable." });
  }
  if (
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.moderationRuntimeBanExecuted ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.moderationRuntimeMuteExecuted ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.moderationRuntimeKickExecuted ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.moderationRuntimeReportWriteExecuted
  ) {
    blocked.push({ code: "moderation_runtime_not_allowed", message: "Moderation runtime actions must remain disabled." });
  }
  if (
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.contentSafetyRuntimeDecisionExecuted ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.appealRuntimeDecisionExecuted ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.adminModerationToggleExecuted
  ) {
    blocked.push({ code: "content_safety_runtime_not_allowed", message: "Content safety, appeal, and Admin moderation runtime toggles must remain disabled." });
  }
  if (
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.providerRuntimeEnabled ||
    STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.providerModerationCallExecuted
  ) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime and moderation calls must remain disabled." });
  }
  if (STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.dbReadExecuted || STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminModerationSafetyControlPrepared232A = {
    version: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_VERSION,
    type: "admin_moderation_safety_control",
    previousStageRequired: "230B admin provider/runtime control plus 228B moderation/safety final handoff clean plus TypeScript clean on owner machine",
    adminModerationSafetyControlOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    adminProviderRuntimeControl230BLocked: true,
    moderationSafetyFinalHandoff228BLocked: true,
    moderationStatusVisible: true,
    banControlVisible: true,
    muteControlVisible: true,
    kickControlVisible: true,
    reportQueueControlVisible: true,
    contentSafetyReviewControlVisible: true,
    appealReviewControlVisible: true,
    providerModerationStatusVisible: true,
    adminModerationSafetyEvidenceVisible: true,
    adminModerationRuntimeTogglesLocked: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSurfaces: normalized.requiredSurfaces,
    safety: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminModerationSafetyControl232ASnapshot(): StreamAdminModerationSafetyControlSnapshot232A {
  const result = prepareStreamAdminModerationSafetyControl232A({
    ownerApproval: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL,
    controlMode: "admin_moderation_safety_control_visibility_only",
    acknowledged230BStage: "230B_admin_provider_runtime_control_clean",
    acknowledged228BStage: "228B_moderation_safety_final_handoff_clean",
    evidenceReferences: ["230B_passed_141", "228B_passed_149", "229A_passed_153"],
    requiredArtifacts: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("232A Admin moderation/safety control snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminModerationBanRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "moderation_runtime_not_allowed", message: "Ban runtime action is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminModerationMuteRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "moderation_runtime_not_allowed", message: "Mute runtime action is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminModerationKickRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "moderation_runtime_not_allowed", message: "Kick runtime action is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminModerationReportWriteRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "moderation_runtime_not_allowed", message: "Report runtime write is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminContentSafetyDecisionRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "content_safety_runtime_not_allowed", message: "Content safety runtime decision is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminAppealDecisionRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "content_safety_runtime_not_allowed", message: "Appeal runtime decision is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminProviderModerationCallRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "provider_not_allowed", message: "Provider moderation call is blocked in 232A and requires separate exact owner approval." }] };
}

export function createStreamAdminModerationDbMutationRequest232A(): StreamAdminModerationSafetyControlResult232A {
  return { ok: false, blocked: [{ code: "db_not_allowed", message: "Moderation DB mutation is blocked in 232A and requires separate exact owner approval." }] };
}
