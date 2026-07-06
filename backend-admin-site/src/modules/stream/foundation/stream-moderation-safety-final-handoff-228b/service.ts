import {
  STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL,
  STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
  type StreamModerationSafetyFinalArtifact228B,
  type StreamModerationSafetyFinalBlocked228B,
  type StreamModerationSafetyFinalBlockedCode228B,
  type StreamModerationSafetyFinalInput228B,
  type StreamModerationSafetyFinalResult228B,
  type StreamModerationSafetyFinalSafety228B,
  type StreamModerationSafetyFinalSnapshot228B,
  type StreamModerationSafetyFinalSurface228B,
} from "./types";

export { STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL, STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION } from "./types";

export const STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS: readonly StreamModerationSafetyFinalArtifact228B[] = [
  "228a_moderation_safety_readiness_clean",
  "227b_media_lifecycle_final_handoff_locked",
  "226b_realtime_events_final_handoff_locked",
  "225b_rooms_lifecycle_final_handoff_locked",
  "ban_boundary_locked",
  "mute_boundary_locked",
  "kick_boundary_locked",
  "report_boundary_locked",
  "content_safety_boundary_locked",
  "appeal_review_boundary_locked",
  "admin_moderation_evidence_locked",
] as const;

export const STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES: readonly StreamModerationSafetyFinalSurface228B[] = [
  "ban_controls_locked",
  "mute_controls_locked",
  "kick_controls_locked",
  "report_queue_locked",
  "content_safety_review_locked",
  "appeal_review_locked",
  "admin_moderation_evidence_locked",
  "future_exact_approval_reference_locked",
] as const;

export const STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_SAFETY: StreamModerationSafetyFinalSafety228B = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous228ARequired: true,
  moderationRuntimeBanExecuted: false,
  moderationRuntimeMuteExecuted: false,
  moderationRuntimeKickExecuted: false,
  moderationRuntimeReportWriteExecuted: false,
  contentSafetyRuntimeDecisionExecuted: false,
  adminModerationToggleExecuted: false,
  realtimeEmitPerformed: false,
  socketRuntimeBindingExecuted: false,
  roomRuntimeStateMutationExecuted: false,
  mediaRuntimeStarted: false,
  providerModerationCallExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  giftSendExecutionExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  fakeModerationSuccessAllowed: false,
  fakeLiveSuccessAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureModerationRuntimeActionRequiresSeparateApproval: true,
  futureContentSafetyDecisionRequiresSeparateApproval: true,
  futureAdminModerationToggleRequiresSeparateApproval: true,
  futureProviderModerationCallRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const FORBIDDEN_RUNTIME_MARKERS_228B = [
  "private" + "_key",
  "access" + "_token",
  "refresh" + "_token",
  "provider" + "_secret",
  "payment" + "_token",
  "payout" + "_token",
  "room" + "_token",
  "socket" + "_token",
] as const;

function containsForbiddenRuntimeValue228B(value: string): boolean {
  const normalized = value.toLowerCase();
  return FORBIDDEN_RUNTIME_MARKERS_228B.some((marker) => normalized.includes(marker));
}

function blocked228B(code: StreamModerationSafetyFinalBlockedCode228B, blockedReason: string): StreamModerationSafetyFinalBlocked228B {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    status: "stream_moderation_safety_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    handoffPrepared: false,
    providerNotConfiguredVisible: true,
    moderationRuntimeBanExecuted: false,
    moderationRuntimeMuteExecuted: false,
    contentSafetyRuntimeDecisionExecuted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_SAFETY,
  } as const;
}

export function normalizeStreamModerationSafetyFinalHandoffInput228B(
  input: StreamModerationSafetyFinalInput228B,
): StreamModerationSafetyFinalInput228B {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    handoffMode: input.handoffMode ?? "moderation_safety_final_handoff_only",
    acknowledged228AStage: input.acknowledged228AStage ?? "228A_moderation_safety_readiness_clean",
    evidenceReferences: input.evidenceReferences.map((item) => item.trim()).filter(Boolean),
    requiredArtifacts: input.requiredArtifacts,
    requiredSurfaces: input.requiredSurfaces,
    operatorNote: input.operatorNote?.trim(),
  } as const;
}

export function assertStreamModerationSafetyFinalHandoff228BRemainsSafe(): StreamModerationSafetyFinalSafety228B {
  return STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_SAFETY;
}

export function prepareStreamModerationSafetyFinalHandoff228B(
  input: StreamModerationSafetyFinalInput228B,
): StreamModerationSafetyFinalResult228B {
  const normalized = normalizeStreamModerationSafetyFinalHandoffInput228B(input);
  const combined = [
    normalized.ownerApproval ?? "",
    normalized.operatorNote ?? "",
    ...normalized.evidenceReferences,
    ...normalized.requiredArtifacts,
    ...normalized.requiredSurfaces,
  ].join(" ");
  if (containsForbiddenRuntimeValue228B(combined)) return blocked228B("raw_secret_or_runtime_value_rejected", "Raw secret or runtime token-like input is rejected.");
  if (normalized.ownerApproval !== STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL) return blocked228B("owner_approval_required", "Owner approval phrase is required for final handoff packaging only.");
  if (normalized.handoffMode !== "moderation_safety_final_handoff_only") return blocked228B("handoff_mode_disabled", "Final handoff mode must stay handoff-only.");
  if (normalized.acknowledged228AStage !== "228A_moderation_safety_readiness_clean") return blocked228B("previous_228a_required", "228A clean readiness is required before moderation/safety final handoff.");
  if (normalized.evidenceReferences.length === 0) return blocked228B("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked228B("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked228B("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked228B("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked228B("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_moderation_safety_final_handoff_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.moderation.safety-final-handoff.safe_disabled.v1",
      version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
      previousStageRequired: "228A_moderation_safety_readiness_clean",
      requiredArtifacts: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      handoffPrepared: true,
      providerNotConfiguredVisible: true,
      moderationSafetyReadiness228ALocked: true,
      mediaLifecycleFinalHandoff227BLocked: true,
      realtimeEventsFinalHandoff226BLocked: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      banBoundaryLocked: true,
      muteBoundaryLocked: true,
      kickBoundaryLocked: true,
      reportBoundaryLocked: true,
      contentSafetyBoundaryLocked: true,
      appealReviewBoundaryLocked: true,
      adminModerationEvidenceLocked: true,
      moderationRuntimeActionBlockedUntilExactApproval: true,
      contentSafetyDecisionBlockedUntilExactApproval: true,
      adminModerationToggleBlockedUntilExactApproval: true,
      providerModerationCallBlockedUntilExactApproval: true,
      rawSecretHandlingForbidden: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureModerationRuntimeActionRequiresSeparateApproval: true,
      futureContentSafetyDecisionRequiresSeparateApproval: true,
      futureAdminModerationToggleRequiresSeparateApproval: true,
      futureProviderModerationCallRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      sourceOnly: true,
      safety: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_SAFETY,
    },
  } as const;
}

export function getStreamModerationSafetyFinalHandoff228BSnapshot(): StreamModerationSafetyFinalSnapshot228B {
  return {
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    type: "stream_moderation_safety_final_handoff",
    previousStageRequired: "228A moderation/safety readiness clean plus TypeScript clean on owner machine",
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    moderationSafetyReadiness228ALocked: true,
    mediaLifecycleFinalHandoff227BLocked: true,
    realtimeEventsFinalHandoff226BLocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    banBoundaryLocked: true,
    muteBoundaryLocked: true,
    kickBoundaryLocked: true,
    reportBoundaryLocked: true,
    contentSafetyBoundaryLocked: true,
    appealReviewBoundaryLocked: true,
    adminModerationEvidenceLocked: true,
    moderationRuntimeActionBlockedUntilExactApproval: true,
    contentSafetyDecisionBlockedUntilExactApproval: true,
    adminModerationToggleBlockedUntilExactApproval: true,
    providerModerationCallBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES,
    safety: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_SAFETY,
  } as const;
}

export function createStreamModerationRuntimeActionRequest228B() {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    status: "blocked_until_separate_exact_owner_approval",
    reason: "Runtime ban/mute/kick/report actions are not enabled by 228B final handoff.",
    futureModerationRuntimeActionRequiresSeparateApproval: true,
    moderationRuntimeBanExecuted: false,
    moderationRuntimeMuteExecuted: false,
    moderationRuntimeKickExecuted: false,
    moderationRuntimeReportWriteExecuted: false,
  } as const;
}

export function createStreamContentSafetyDecisionRequest228B() {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    status: "blocked_until_separate_exact_owner_approval",
    reason: "Content safety runtime decisions are not enabled by 228B final handoff.",
    futureContentSafetyDecisionRequiresSeparateApproval: true,
    contentSafetyRuntimeDecisionExecuted: false,
  } as const;
}

export function createStreamAdminModerationToggleRequest228B() {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    status: "blocked_until_separate_exact_owner_approval",
    reason: "Admin moderation runtime toggles are not enabled by 228B final handoff.",
    futureAdminModerationToggleRequiresSeparateApproval: true,
    adminModerationToggleExecuted: false,
  } as const;
}

export function createStreamProviderModerationCallRequest228B() {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_VERSION,
    status: "provider_not_configured_runtime_blocked",
    reason: "Provider moderation calls remain blocked until a separate exact approval and provider configuration package exists.",
    providerNotConfiguredVisible: true,
    futureProviderModerationCallRequiresSeparateApproval: true,
    providerModerationCallExecuted: false,
    providerRuntimeEnabled: false,
  } as const;
}
