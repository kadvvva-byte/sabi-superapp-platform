import {
  STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL,
  STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION,
  type StreamAdminFoundationVisibilityArtifact230A,
  type StreamAdminFoundationVisibilityBlocked230A,
  type StreamAdminFoundationVisibilityInput230A,
  type StreamAdminFoundationVisibilityPrepared230A,
  type StreamAdminFoundationVisibilityResult230A,
  type StreamAdminFoundationVisibilitySafety230A,
  type StreamAdminFoundationVisibilitySnapshot230A,
  type StreamAdminFoundationVisibilitySection230A,
} from "./types";

export { STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL, STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION } from "./types";

export const STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS: readonly StreamAdminFoundationVisibilityArtifact230A[] = [
  "224a_gift_ledger_closure_visible",
  "225b_rooms_lifecycle_visible",
  "226b_realtime_events_visible",
  "227b_media_lifecycle_visible",
  "228b_moderation_safety_visible",
  "229a_foundation_final_control_visible",
  "provider_not_configured_visible",
  "runtime_disabled_visible",
] as const;

export const STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS: readonly StreamAdminFoundationVisibilitySection230A[] = [
  "gift_ledger_closure_status",
  "rooms_lifecycle_status",
  "realtime_events_status",
  "media_lifecycle_status",
  "moderation_safety_status",
  "foundation_final_control_status",
  "safe_disabled_status",
  "future_exact_approval_boundary",
] as const;

export const STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY: StreamAdminFoundationVisibilitySafety230A = {
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  adminVisibilityOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous224ARequired: true,
  previous225BRequired: true,
  previous226BRequired: true,
  previous227BRequired: true,
  previous228BRequired: true,
  previous229ARequired: true,
  adminRuntimeToggleExecuted: false,
  runtimeEnablementExecuted: false,
  providerRuntimeEnabled: false,
  providerCredentialLookupExecuted: false,
  providerCallExecuted: false,
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
  futureDbReadWriteRequiresSeparateApproval: true,
  futureRealtimeEmitRequiresSeparateApproval: true,
  sourceOnly: true,
} as const;

const ADMIN_VISIBILITY_ONLY_MARKERS_230A = [
  "admin.foundation.visibility",
  "gift-ledger.closure.visible",
  "rooms.lifecycle.visible",
  "realtime.events.visible",
  "media.lifecycle.visible",
  "moderation.safety.visible",
  "foundation.final-control.visible",
  "runtime.disabled.visible",
] as const;

export function normalizeStreamAdminFoundationVisibilityInput230A(
  input: StreamAdminFoundationVisibilityInput230A,
): Required<StreamAdminFoundationVisibilityInput230A> {
  return {
    ownerApproval: input.ownerApproval ?? "",
    visibilityMode: input.visibilityMode ?? "disabled",
    acknowledged224AStage: input.acknowledged224AStage ?? "disabled",
    acknowledged225BStage: input.acknowledged225BStage ?? "disabled",
    acknowledged226BStage: input.acknowledged226BStage ?? "disabled",
    acknowledged227BStage: input.acknowledged227BStage ?? "disabled",
    acknowledged228BStage: input.acknowledged228BStage ?? "disabled",
    acknowledged229AStage: input.acknowledged229AStage ?? "disabled",
    evidenceReferences: input.evidenceReferences ?? [],
    requiredArtifacts: input.requiredArtifacts ?? [],
    requiredSections: input.requiredSections ?? [],
    operatorNote: input.operatorNote ?? "",
  };
}

export function assertStreamAdminFoundationVisibility230ARemainsSafe(): StreamAdminFoundationVisibilitySafety230A {
  return STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY;
}

export function prepareStreamAdminFoundationVisibility230A(
  input: StreamAdminFoundationVisibilityInput230A,
): StreamAdminFoundationVisibilityResult230A {
  const normalized = normalizeStreamAdminFoundationVisibilityInput230A(input);
  const blocked: StreamAdminFoundationVisibilityBlocked230A[] = [];

  if (normalized.ownerApproval !== STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL) {
    blocked.push({ code: "owner_approval_required", message: "230A owner approval marker is required for Admin visibility only." });
  }
  if (normalized.visibilityMode !== "admin_foundation_visibility_only") {
    blocked.push({ code: "visibility_mode_disabled", message: "230A remains disabled unless Admin visibility-only mode is selected." });
  }
  if (
    normalized.acknowledged224AStage !== "224A_gift_ledger_closure_clean" ||
    normalized.acknowledged225BStage !== "225B_rooms_lifecycle_final_handoff_clean" ||
    normalized.acknowledged226BStage !== "226B_realtime_events_final_handoff_clean" ||
    normalized.acknowledged227BStage !== "227B_media_lifecycle_final_handoff_clean" ||
    normalized.acknowledged228BStage !== "228B_moderation_safety_final_handoff_clean" ||
    normalized.acknowledged229AStage !== "229A_foundation_final_control_clean"
  ) {
    blocked.push({ code: "previous_stage_missing", message: "224A, 225B, 226B, 227B, 228B, and 229A clean stages are required." });
  }
  for (const artifact of STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS) {
    if (!normalized.requiredArtifacts.includes(artifact)) {
      blocked.push({ code: "artifact_missing", message: `Missing 230A artifact: ${artifact}` });
    }
  }
  for (const section of STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS) {
    if (!normalized.requiredSections.includes(section)) {
      blocked.push({ code: "section_missing", message: `Missing 230A Admin section: ${section}` });
    }
  }
  if (ADMIN_VISIBILITY_ONLY_MARKERS_230A.length !== 8) {
    blocked.push({ code: "runtime_not_allowed", message: "Admin visibility markers must remain static and non-executable." });
  }
  if (STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY.providerRuntimeEnabled || STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY.providerCallExecuted) {
    blocked.push({ code: "provider_not_allowed", message: "Provider runtime must remain disabled." });
  }
  if (STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY.dbReadExecuted || STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY.dbWriteExecuted) {
    blocked.push({ code: "db_not_allowed", message: "DB read/write must remain disabled." });
  }

  if (blocked.length > 0) {
    return { ok: false, blocked };
  }

  const prepared: StreamAdminFoundationVisibilityPrepared230A = {
    version: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_VERSION,
    type: "admin_stream_foundation_visibility",
    previousStageRequired: "224A/225B/226B/227B/228B/229A clean plus TypeScript clean on owner machine",
    adminVisibilityOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    giftLedgerClosure224AVisible: true,
    roomsLifecycle225BVisible: true,
    realtimeEvents226BVisible: true,
    mediaLifecycle227BVisible: true,
    moderationSafety228BVisible: true,
    foundationFinalControl229AVisible: true,
    safeDisabledStatusVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureAdminRuntimeToggleRequiresSeparateApproval: true,
    sourceOnly: true,
    evidenceReferences: normalized.evidenceReferences,
    requiredArtifacts: normalized.requiredArtifacts,
    requiredSections: normalized.requiredSections,
    safety: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_SAFETY,
  };

  return { ok: true, prepared, blocked: [] };
}

export function getStreamAdminFoundationVisibility230ASnapshot(): StreamAdminFoundationVisibilitySnapshot230A {
  const result = prepareStreamAdminFoundationVisibility230A({
    ownerApproval: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL,
    visibilityMode: "admin_foundation_visibility_only",
    acknowledged224AStage: "224A_gift_ledger_closure_clean",
    acknowledged225BStage: "225B_rooms_lifecycle_final_handoff_clean",
    acknowledged226BStage: "226B_realtime_events_final_handoff_clean",
    acknowledged227BStage: "227B_media_lifecycle_final_handoff_clean",
    acknowledged228BStage: "228B_moderation_safety_final_handoff_clean",
    acknowledged229AStage: "229A_foundation_final_control_clean",
    evidenceReferences: ["224A_passed_122", "225B_passed_128", "226B_passed_147", "227B_passed_147", "228B_passed_149", "229A_passed_153"],
    requiredArtifacts: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS,
    requiredSections: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS,
  });

  if (!result.ok || !result.prepared) {
    throw new Error("230A Admin Stream foundation visibility snapshot must remain prepared and safe-disabled.");
  }
  return result.prepared;
}

export function createStreamAdminRuntimeToggleRequest230A(): StreamAdminFoundationVisibilityResult230A {
  return {
    ok: false,
    blocked: [
      { code: "runtime_not_allowed", message: "Admin runtime toggles are blocked in 230A and require separate exact owner approval." },
    ],
  };
}

export function createStreamAdminProviderRuntimeRequest230A(): StreamAdminFoundationVisibilityResult230A {
  return {
    ok: false,
    blocked: [
      { code: "provider_not_allowed", message: "Provider runtime enablement is blocked in 230A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminDbMutationRequest230A(): StreamAdminFoundationVisibilityResult230A {
  return {
    ok: false,
    blocked: [
      { code: "db_not_allowed", message: "DB read/write is blocked in 230A and requires separate exact owner approval." },
    ],
  };
}

export function createStreamAdminRealtimeEmitRequest230A(): StreamAdminFoundationVisibilityResult230A {
  return {
    ok: false,
    blocked: [
      { code: "runtime_not_allowed", message: "Realtime emit is blocked in 230A and requires separate exact owner approval." },
    ],
  };
}
