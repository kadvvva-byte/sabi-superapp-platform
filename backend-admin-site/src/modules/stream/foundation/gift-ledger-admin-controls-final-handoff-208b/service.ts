import {
  STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
  type StreamGiftLedgerAdminControlsFinalHandoffArea208B,
  type StreamGiftLedgerAdminControlsFinalHandoffBlocked208B,
  type StreamGiftLedgerAdminControlsFinalHandoffInput208B,
  type StreamGiftLedgerAdminControlsFinalHandoffPrepared208B,
  type StreamGiftLedgerAdminControlsFinalHandoffResult208B,
  type StreamGiftLedgerAdminControlsFinalHandoffSafety208B,
  type StreamGiftLedgerAdminControlsFinalHandoffSnapshot208B,
} from "./types";

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_OWNER_APPROVAL =
  "I_APPROVE_208B_STREAM_GIFTS_ADMIN_CONTROLS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_SURFACES_208B = [
  "provider_toggle",
  "catalog_toggle",
  "localization_toggle",
  "asset_quality_toggle",
  "media_cdn_toggle",
  "runtime_execution_toggle",
  "audit_evidence",
  "rollout_hold",
  "rollback_hold",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_AREAS_208B: readonly StreamGiftLedgerAdminControlsFinalHandoffArea208B[] = [
  "previous_208a_admin_controls_readiness_locked",
  "previous_207b_media_cdn_handoff_locked",
  "previous_206b_catalog_publish_handoff_locked",
  "previous_205b_localization_handoff_locked",
  "previous_204b_asset_policy_handoff_locked",
  "provider_not_configured_visibility_locked",
  "admin_provider_toggle_boundary_locked",
  "admin_catalog_toggle_boundary_locked",
  "admin_localization_toggle_boundary_locked",
  "admin_asset_quality_toggle_boundary_locked",
  "admin_media_cdn_toggle_boundary_locked",
  "admin_runtime_execution_boundary_locked",
  "admin_audit_evidence_required",
  "admin_rollout_hold_required",
  "admin_rollback_boundary_locked",
  "future_exact_owner_approval_required",
] as const;

const RAW_SECRET_MARKERS_208B = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY: StreamGiftLedgerAdminControlsFinalHandoffSafety208B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  adminProviderToggleBoundaryLocked: true,
  adminCatalogToggleBoundaryLocked: true,
  adminLocalizationToggleBoundaryLocked: true,
  adminAssetQualityToggleBoundaryLocked: true,
  adminMediaCdnToggleBoundaryLocked: true,
  adminRuntimeExecutionBoundaryLocked: true,
  adminAuditEvidenceRequired: true,
  adminRolloutHoldRequired: true,
  adminRollbackBoundaryLocked: true,
  adminProviderToggleAllowedNow: false,
  adminCatalogToggleAllowedNow: false,
  adminLocalizationToggleAllowedNow: false,
  adminAssetQualityToggleAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminRuntimeExecutionToggleAllowedNow: false,
  adminProviderToggleExecuted: false,
  adminCatalogToggleExecuted: false,
  adminLocalizationToggleExecuted: false,
  adminAssetQualityToggleExecuted: false,
  adminMediaCdnToggleExecuted: false,
  adminRuntimeExecutionToggleExecuted: false,
  localizationRuntimeWriteExecuted: false,
  assetRuntimePublishExecuted: false,
  catalogRuntimePublishExecuted: false,
  mediaCdnRuntimePublishExecuted: false,
  assetUploadExecuted: false,
  mediaTranscodeExecuted: false,
  cdnInvalidateExecuted: false,
  runtimeExecutionApprovedNow: false,
  liveActivationExecutionApprovedNow: false,
  liveActivationExecutionPerformedNow: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  futureCatalogPublishRequiresSeparateApproval: true,
  futureLocalizationPublishRequiresSeparateApproval: true,
  futureMediaCdnPublishRequiresSeparateApproval: true,
  futureAssetPublishRequiresSeparateApproval: true,
  sourceOnly: true,
});

const defaultEvidenceReferences208B = Object.freeze([
  "208A_admin_controls_readiness_index_passed",
  "207B_media_cdn_publish_readiness_final_handoff_passed",
  "206B_catalog_publish_readiness_final_handoff_passed",
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
] as const);

function containsRawSecretOrProviderValue208B(input: StreamGiftLedgerAdminControlsFinalHandoffInput208B): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    adminControlSurfaces: input.adminControlSurfaces,
  });
  return RAW_SECRET_MARKERS_208B.some((marker) => payload.includes(marker));
}

function blocked208B(
  code: StreamGiftLedgerAdminControlsFinalHandoffBlocked208B["code"],
  blockedReason: string,
): StreamGiftLedgerAdminControlsFinalHandoffBlocked208B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    status: "admin_controls_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    adminToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY,
  });
}

export function normalizeStreamGiftLedgerAdminControlsFinalHandoffInput208B(
  input?: Partial<StreamGiftLedgerAdminControlsFinalHandoffInput208B>,
): StreamGiftLedgerAdminControlsFinalHandoffInput208B {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    handoffMode: input?.handoffMode ?? "disabled",
    acknowledged208AStage: input?.acknowledged208AStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences208B)]),
    handoffAreas: Object.freeze([...(input?.handoffAreas ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_AREAS_208B)]),
    adminControlSurfaces: Object.freeze([...(input?.adminControlSurfaces ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_SURFACES_208B)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerAdminControlsFinalHandoff208BRemainsSafe(): StreamGiftLedgerAdminControlsFinalHandoffSafety208B {
  return STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY;
}

export function getStreamGiftLedgerAdminControlsFinalHandoff208B(): StreamGiftLedgerAdminControlsFinalHandoffSnapshot208B {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    status: "ready_for_admin_controls_final_handoff_without_runtime_enablement",
    previousStageRequired: "208A_admin_controls_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    adminProviderToggleBoundaryLocked: true,
    adminCatalogToggleBoundaryLocked: true,
    adminLocalizationToggleBoundaryLocked: true,
    adminAssetQualityToggleBoundaryLocked: true,
    adminMediaCdnToggleBoundaryLocked: true,
    adminRuntimeExecutionBoundaryLocked: true,
    adminAuditEvidenceRequired: true,
    adminRolloutHoldRequired: true,
    adminRollbackBoundaryLocked: true,
    adminToggleAllowedNow: false,
    runtimeExecutionStillBlocked: true,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_stream_gifts_admin_controls_future_toggles_or_runtime_require_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY,
  });
}

export function prepareStreamGiftLedgerAdminControlsFinalHandoff208B(
  input?: Partial<StreamGiftLedgerAdminControlsFinalHandoffInput208B>,
): StreamGiftLedgerAdminControlsFinalHandoffResult208B {
  const normalized = normalizeStreamGiftLedgerAdminControlsFinalHandoffInput208B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_OWNER_APPROVAL) {
    return blocked208B("owner_approval_required", "208B requires explicit owner approval phrase for final handoff only.");
  }
  if (normalized.handoffMode !== "admin_controls_final_handoff_only") {
    return blocked208B("handoff_mode_disabled", "208B handoff mode must remain final-handoff-only and disabled for runtime.");
  }
  if (normalized.acknowledged208AStage !== "208A_admin_controls_readiness_index_clean") {
    return blocked208B("previous_208a_readiness_required", "208A Admin controls readiness index must be acknowledged before 208B.");
  }
  if (normalized.evidenceReferences.length < 4) {
    return blocked208B("evidence_references_required", "At least four safe evidence references are required.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked208B("handoff_areas_required", "Admin controls final handoff areas are required.");
  }
  if (normalized.adminControlSurfaces.length === 0) {
    return blocked208B("admin_control_surfaces_required", "Admin control surfaces are required.");
  }
  for (const surface of STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_SURFACES_208B) {
    if (!normalized.adminControlSurfaces.includes(surface)) {
      return blocked208B("required_admin_control_surface_missing", `Missing required Admin control surface: ${surface}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_AREAS_208B) {
    if (!normalized.handoffAreas.includes(area)) {
      return blocked208B("missing_required_area", `Missing required 208B area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue208B(normalized)) {
    return blocked208B("raw_secret_or_provider_value_rejected", "208B rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.admin-controls.final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    previousStageRequired: "208A_admin_controls_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_AREAS_208B,
    handoffAreas: normalized.handoffAreas,
    evidenceReferences: normalized.evidenceReferences,
    adminControlSurfaces: normalized.adminControlSurfaces,
    finalHandoffPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    adminProviderToggleBoundaryLocked: true as const,
    adminCatalogToggleBoundaryLocked: true as const,
    adminLocalizationToggleBoundaryLocked: true as const,
    adminAssetQualityToggleBoundaryLocked: true as const,
    adminMediaCdnToggleBoundaryLocked: true as const,
    adminRuntimeExecutionBoundaryLocked: true as const,
    adminAuditEvidenceRequired: true as const,
    adminRolloutHoldRequired: true as const,
    adminRollbackBoundaryLocked: true as const,
    adminProviderToggleAllowedNow: false as const,
    adminCatalogToggleAllowedNow: false as const,
    adminLocalizationToggleAllowedNow: false as const,
    adminAssetQualityToggleAllowedNow: false as const,
    adminMediaCdnToggleAllowedNow: false as const,
    adminRuntimeExecutionToggleAllowedNow: false as const,
    adminProviderToggleExecuted: false as const,
    adminCatalogToggleExecuted: false as const,
    adminLocalizationToggleExecuted: false as const,
    adminAssetQualityToggleExecuted: false as const,
    adminMediaCdnToggleExecuted: false as const,
    adminRuntimeExecutionToggleExecuted: false as const,
    catalogRuntimePublishExecuted: false as const,
    localizationRuntimeWriteExecuted: false as const,
    mediaCdnRuntimePublishExecuted: false as const,
    assetRuntimePublishExecuted: false as const,
    assetUploadExecuted: false as const,
    mediaTranscodeExecuted: false as const,
    cdnInvalidateExecuted: false as const,
    runtimeExecutionApprovedNow: false as const,
    liveActivationExecutionApprovedNow: false as const,
    liveActivationExecutionPerformedNow: false as const,
    providerRuntimeEnabled: false as const,
    providerBindingExecuted: false as const,
    providerBindingActivationExecuted: false as const,
    providerLiveCallExecuted: false as const,
    providerPayoutCallExecuted: false as const,
    paymentCaptureExecuted: false as const,
    payoutExecuted: false as const,
    walletMutationExecuted: false as const,
    realtimeEmitExecuted: false as const,
    rawSecretsIncluded: false as const,
    envFileRead: false as const,
    envValueRead: false as const,
    fakeSuccessWritten: false as const,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true as const,
    futureAdminToggleRequiresSeparateApproval: true as const,
    futureCatalogPublishRequiresSeparateApproval: true as const,
    futureLocalizationPublishRequiresSeparateApproval: true as const,
    futureMediaCdnPublishRequiresSeparateApproval: true as const,
    futureAssetPublishRequiresSeparateApproval: true as const,
    nextStage: "closed_stream_gifts_admin_controls_future_toggles_or_runtime_require_exact_owner_approval" as const,
  });

  const prepared: StreamGiftLedgerAdminControlsFinalHandoffPrepared208B = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    status: "admin_controls_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    adminToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerAdminControlsFinalHandoff208BContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_OWNER_APPROVAL,
    handoffMode: "admin_controls_final_handoff_only" as const,
    requiredPreviousStage: "208A_admin_controls_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_AREAS_208B,
    requiredAdminControlSurfaces: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_REQUIRED_SURFACES_208B,
    providerNotConfiguredVisible: true,
    adminToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_SAFETY,
  });
}

export function getStreamGiftLedgerAdminControlsFinalHandoff208BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    steps: Object.freeze([
      "Confirm 208A Admin controls readiness index passed.",
      "Confirm media/CDN, catalog, localization, and asset policy blocks are closed safe-disabled.",
      "Lock Admin provider/catalog/localization/asset/media-CDN/runtime toggle boundaries as visibility only.",
      "Keep Admin toggles, publish actions, provider runtime, Wallet, DB, payment, payout, and realtime disabled.",
      "Require a new exact owner approval before any future Admin toggle, publish, or runtime execution package.",
    ] as const),
    runtimeActionsAllowedNow: false,
    adminToggleAllowedNow: false,
    providerRuntimeEnabled: false,
  });
}

export function createStreamGiftLedgerAdminControlsFinalHandoff208BAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    status: "admin_controls_toggle_request_blocked_requires_separate_exact_owner_approval",
    adminProviderToggleExecuted: false,
    adminCatalogToggleExecuted: false,
    adminLocalizationToggleExecuted: false,
    adminAssetQualityToggleExecuted: false,
    adminMediaCdnToggleExecuted: false,
    adminRuntimeExecutionToggleExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  });
}

export function createStreamGiftLedgerAdminControlsFinalHandoff208BRuntimeRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_VERSION,
    status: "admin_runtime_execution_request_blocked_requires_separate_exact_owner_approval",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  });
}

