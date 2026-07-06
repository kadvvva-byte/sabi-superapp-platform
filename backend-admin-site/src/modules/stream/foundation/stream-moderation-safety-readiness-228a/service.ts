import {
  STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL,
  STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
  type StreamModerationSafetyArtifact228A,
  type StreamModerationSafetyBlocked228A,
  type StreamModerationSafetyBlockedCode228A,
  type StreamModerationSafetyInput228A,
  type StreamModerationSafetyResult228A,
  type StreamModerationSafetySafety228A,
  type StreamModerationSafetySnapshot228A,
  type StreamModerationSafetySurface228A,
} from "./types";

export { STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL, STREAM_MODERATION_SAFETY_READINESS_228A_VERSION } from "./types";

export const STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS: readonly StreamModerationSafetyArtifact228A[] = [
  "227b_media_lifecycle_final_handoff_clean",
  "226b_realtime_events_final_handoff_locked",
  "225b_rooms_lifecycle_final_handoff_locked",
  "ban_boundary_visible",
  "mute_boundary_visible",
  "kick_boundary_visible",
  "report_boundary_visible",
  "content_safety_boundary_visible",
  "admin_moderation_evidence_visible",
] as const;

export const STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES: readonly StreamModerationSafetySurface228A[] = [
  "ban_controls",
  "mute_controls",
  "kick_controls",
  "report_queue",
  "content_safety_review",
  "appeal_review",
  "admin_moderation_evidence",
  "future_exact_approval_reference",
] as const;

export const STREAM_MODERATION_SAFETY_READINESS_228A_SAFETY: StreamModerationSafetySafety228A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous227BRequired: true,
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

const FORBIDDEN_RUNTIME_MARKERS_228A = [
  "private" + "_key",
  "access" + "_token",
  "refresh" + "_token",
  "provider" + "_secret",
  "payment" + "_token",
  "payout" + "_token",
  "room" + "_token",
  "socket" + "_token",
] as const;

function containsForbiddenRuntimeValue228A(value: string): boolean {
  const normalized = value.toLowerCase();
  return FORBIDDEN_RUNTIME_MARKERS_228A.some((marker) => normalized.includes(marker));
}

function blocked228A(code: StreamModerationSafetyBlockedCode228A, blockedReason: string): StreamModerationSafetyBlocked228A {
  return {
    ok: false,
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    status: "stream_moderation_safety_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    moderationRuntimeBanExecuted: false,
    moderationRuntimeMuteExecuted: false,
    contentSafetyRuntimeDecisionExecuted: false,
    providerRuntimeEnabled: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_MODERATION_SAFETY_READINESS_228A_SAFETY,
  } as const;
}

export function normalizeStreamModerationSafetyReadinessInput228A(
  input: StreamModerationSafetyInput228A,
): StreamModerationSafetyInput228A {
  return {
    ownerApproval: input.ownerApproval?.trim(),
    readinessMode: input.readinessMode ?? "moderation_safety_readiness_index_only",
    acknowledged227BStage: input.acknowledged227BStage ?? "227B_media_lifecycle_final_handoff_clean",
    evidenceReferences: input.evidenceReferences.map((item) => item.trim()).filter(Boolean),
    requiredArtifacts: input.requiredArtifacts,
    requiredSurfaces: input.requiredSurfaces,
    operatorNote: input.operatorNote?.trim(),
  } as const;
}

export function assertStreamModerationSafetyReadiness228ARemainsSafe(): StreamModerationSafetySafety228A {
  return STREAM_MODERATION_SAFETY_READINESS_228A_SAFETY;
}

export function prepareStreamModerationSafetyReadiness228A(
  input: StreamModerationSafetyInput228A,
): StreamModerationSafetyResult228A {
  const normalized = normalizeStreamModerationSafetyReadinessInput228A(input);
  const combined = [
    normalized.ownerApproval ?? "",
    normalized.operatorNote ?? "",
    ...normalized.evidenceReferences,
    ...normalized.requiredArtifacts,
    ...normalized.requiredSurfaces,
  ].join(" ");
  if (containsForbiddenRuntimeValue228A(combined)) return blocked228A("raw_secret_or_runtime_value_rejected", "Raw secret or runtime token-like input is rejected.");
  if (normalized.ownerApproval !== STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL) return blocked228A("owner_approval_required", "Owner approval phrase is required for readiness packaging only.");
  if (normalized.readinessMode !== "moderation_safety_readiness_index_only") return blocked228A("readiness_mode_disabled", "Readiness mode must stay index-only.");
  if (normalized.acknowledged227BStage !== "227B_media_lifecycle_final_handoff_clean") return blocked228A("previous_227b_required", "227B clean final handoff is required before moderation/safety readiness.");
  if (normalized.evidenceReferences.length === 0) return blocked228A("evidence_references_required", "Evidence references are required.");
  if (normalized.requiredArtifacts.length === 0) return blocked228A("required_artifacts_required", "Required artifacts are missing.");
  if (normalized.requiredSurfaces.length === 0) return blocked228A("required_surfaces_required", "Required surfaces are missing.");
  for (const artifact of STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) return blocked228A("missing_required_artifact", `Missing artifact: ${artifact}`);
  }
  for (const surface of STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES) {
    if (!normalized.requiredSurfaces.includes(surface)) return blocked228A("missing_required_surface", `Missing surface: ${surface}`);
  }
  return {
    ok: true,
    status: "stream_moderation_safety_readiness_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.moderation.safety-readiness.safe_disabled.v1",
      version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
      previousStageRequired: "227B_media_lifecycle_final_handoff_clean",
      requiredArtifacts: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      mediaLifecycleFinalHandoff227BLocked: true,
      realtimeEventsFinalHandoff226BLocked: true,
      roomsLifecycleFinalHandoff225BLocked: true,
      banBoundaryVisible: true,
      muteBoundaryVisible: true,
      kickBoundaryVisible: true,
      reportBoundaryVisible: true,
      contentSafetyBoundaryVisible: true,
      appealReviewBoundaryVisible: true,
      adminModerationEvidenceVisible: true,
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
      safety: STREAM_MODERATION_SAFETY_READINESS_228A_SAFETY,
    },
  } as const;
}

export function getStreamModerationSafetyReadiness228ASnapshot(): StreamModerationSafetySnapshot228A {
  return {
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    type: "stream_moderation_safety_readiness_index",
    previousStageRequired: "227B media lifecycle final handoff clean plus TypeScript clean on owner machine",
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    mediaLifecycleFinalHandoff227BLocked: true,
    realtimeEventsFinalHandoff226BLocked: true,
    roomsLifecycleFinalHandoff225BLocked: true,
    banBoundaryVisible: true,
    muteBoundaryVisible: true,
    kickBoundaryVisible: true,
    reportBoundaryVisible: true,
    contentSafetyBoundaryVisible: true,
    appealReviewBoundaryVisible: true,
    adminModerationEvidenceVisible: true,
    moderationRuntimeActionBlockedUntilExactApproval: true,
    contentSafetyDecisionBlockedUntilExactApproval: true,
    adminModerationToggleBlockedUntilExactApproval: true,
    providerModerationCallBlockedUntilExactApproval: true,
    rawSecretHandlingForbidden: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    requiredArtifacts: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS,
    requiredSurfaces: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES,
    safety: STREAM_MODERATION_SAFETY_READINESS_228A_SAFETY,
  } as const;
}

export function createStreamModerationRuntimeActionRequest228A() {
  return {
    ok: false,
    status: "blocked_pending_separate_exact_owner_approval",
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    reason: "Moderation runtime action is blocked. Separate exact owner approval and runtime execution package required.",
    moderationRuntimeBanExecuted: false,
    moderationRuntimeMuteExecuted: false,
    moderationRuntimeKickExecuted: false,
    dbWriteExecuted: false,
    realtimeEmitPerformed: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamContentSafetyDecisionRequest228A() {
  return {
    ok: false,
    status: "blocked_pending_separate_exact_owner_approval",
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    reason: "Content safety runtime decision is blocked. Separate exact owner approval and runtime execution package required.",
    contentSafetyRuntimeDecisionExecuted: false,
    dbWriteExecuted: false,
    providerModerationCallExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamAdminModerationToggleRequest228A() {
  return {
    ok: false,
    status: "blocked_pending_separate_exact_owner_approval",
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    reason: "Admin moderation runtime toggle is blocked. Separate exact owner approval required.",
    adminModerationToggleExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}

export function createStreamProviderModerationCallRequest228A() {
  return {
    ok: false,
    status: "blocked_pending_separate_exact_owner_approval",
    version: STREAM_MODERATION_SAFETY_READINESS_228A_VERSION,
    reason: "Provider moderation call is blocked. Provider remains not configured for runtime.",
    providerModerationCallExecuted: false,
    providerRuntimeEnabled: false,
    providerCredentialLookupExecuted: false,
    fakeSuccessWritten: false,
  } as const;
}
