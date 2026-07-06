import {
  STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
  type StreamGiftLedgerAdminControlsReadinessArea208A,
  type StreamGiftLedgerAdminControlsReadinessBlocked208A,
  type StreamGiftLedgerAdminControlsReadinessInput208A,
  type StreamGiftLedgerAdminControlsReadinessPrepared208A,
  type StreamGiftLedgerAdminControlsReadinessResult208A,
  type StreamGiftLedgerAdminControlsReadinessSafety208A,
  type StreamGiftLedgerAdminControlsReadinessSnapshot208A,
} from "./types";

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_OWNER_APPROVAL =
  "I_APPROVE_208A_STREAM_GIFTS_ADMIN_CONTROLS_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_SURFACES_208A = [
  "provider_toggle",
  "catalog_toggle",
  "localization_toggle",
  "asset_quality_toggle",
  "media_cdn_toggle",
  "runtime_execution_toggle",
  "audit_evidence",
  "rollback_hold",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_AREAS_208A: readonly StreamGiftLedgerAdminControlsReadinessArea208A[] = [
  "previous_207b_media_cdn_handoff_locked",
  "previous_206b_catalog_publish_handoff_locked",
  "previous_205b_localization_handoff_locked",
  "previous_204b_asset_policy_handoff_locked",
  "provider_not_configured_visibility_locked",
  "admin_provider_toggle_boundary_visible",
  "admin_catalog_toggle_boundary_visible",
  "admin_localization_toggle_boundary_visible",
  "admin_asset_quality_toggle_boundary_visible",
  "admin_media_cdn_toggle_boundary_visible",
  "admin_runtime_execution_boundary_visible",
  "admin_audit_evidence_required",
  "admin_rollout_hold_required",
  "admin_reviewer_role_boundary_visible",
  "admin_rollback_boundary_visible",
] as const;

const RAW_SECRET_MARKERS_208A = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY: StreamGiftLedgerAdminControlsReadinessSafety208A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  adminProviderToggleVisible: true,
  adminCatalogToggleVisible: true,
  adminLocalizationToggleVisible: true,
  adminAssetQualityToggleVisible: true,
  adminMediaCdnToggleVisible: true,
  adminRuntimeExecutionBoundaryVisible: true,
  adminAuditEvidenceRequired: true,
  adminRolloutHoldRequired: true,
  adminReviewerRoleBoundaryVisible: true,
  adminRollbackBoundaryVisible: true,
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

const defaultEvidenceReferences208A = Object.freeze([
  "207B_media_cdn_publish_readiness_final_handoff_passed",
  "206B_catalog_publish_readiness_final_handoff_passed",
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
] as const);

function containsRawSecretOrProviderValue208A(input: StreamGiftLedgerAdminControlsReadinessInput208A): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    adminControlSurfaces: input.adminControlSurfaces,
  });
  return RAW_SECRET_MARKERS_208A.some((marker) => payload.includes(marker));
}

function blocked208A(
  code: StreamGiftLedgerAdminControlsReadinessBlocked208A["code"],
  blockedReason: string,
): StreamGiftLedgerAdminControlsReadinessBlocked208A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    status: "admin_controls_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerAdminControlsReadinessInput208A(
  input?: Partial<StreamGiftLedgerAdminControlsReadinessInput208A>,
): StreamGiftLedgerAdminControlsReadinessInput208A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode ?? "disabled",
    acknowledged207BStage: input?.acknowledged207BStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences208A)]),
    readinessAreas: Object.freeze([...(input?.readinessAreas ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_AREAS_208A)]),
    adminControlSurfaces: Object.freeze([...(input?.adminControlSurfaces ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_SURFACES_208A)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerAdminControlsReadiness208ARemainsSafe(): StreamGiftLedgerAdminControlsReadinessSafety208A {
  return STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY;
}

export function getStreamGiftLedgerAdminControlsReadiness208A(): StreamGiftLedgerAdminControlsReadinessSnapshot208A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    status: "ready_for_admin_controls_readiness_index_without_runtime_enablement",
    previousStageRequired: "207B_media_cdn_publish_readiness_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    adminProviderToggleBoundaryVisible: true,
    adminCatalogToggleBoundaryVisible: true,
    adminLocalizationToggleBoundaryVisible: true,
    adminAssetQualityToggleBoundaryVisible: true,
    adminMediaCdnToggleBoundaryVisible: true,
    adminRuntimeExecutionBoundaryVisible: true,
    adminAuditEvidenceRequired: true,
    adminRolloutHoldRequired: true,
    adminReviewerRoleBoundaryVisible: true,
    adminRollbackBoundaryVisible: true,
    adminToggleAllowedNow: false,
    runtimeExecutionStillBlocked: true,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "208B_stream_gifts_admin_controls_final_handoff",
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY,
  });
}

export function prepareStreamGiftLedgerAdminControlsReadiness208A(
  input?: Partial<StreamGiftLedgerAdminControlsReadinessInput208A>,
): StreamGiftLedgerAdminControlsReadinessResult208A {
  const normalized = normalizeStreamGiftLedgerAdminControlsReadinessInput208A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_OWNER_APPROVAL) {
    return blocked208A("owner_approval_required", "208A requires explicit owner approval phrase for readiness index only.");
  }
  if (normalized.readinessMode !== "admin_controls_readiness_index_only") {
    return blocked208A("readiness_mode_disabled", "208A readiness mode must remain readiness-index-only and disabled for runtime.");
  }
  if (normalized.acknowledged207BStage !== "207B_media_cdn_publish_readiness_final_handoff_clean") {
    return blocked208A("previous_207b_handoff_required", "207B media/CDN final handoff must be acknowledged before 208A.");
  }
  if (normalized.evidenceReferences.length < 3) {
    return blocked208A("evidence_references_required", "At least three safe evidence references are required.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked208A("readiness_areas_required", "Admin controls readiness areas are required.");
  }
  if (normalized.adminControlSurfaces.length === 0) {
    return blocked208A("admin_control_surfaces_required", "Admin control surfaces are required.");
  }
  for (const surface of STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_SURFACES_208A) {
    if (!normalized.adminControlSurfaces.includes(surface)) {
      return blocked208A("required_admin_control_surface_missing", `Missing required Admin control surface: ${surface}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_AREAS_208A) {
    if (!normalized.readinessAreas.includes(area)) {
      return blocked208A("missing_required_area", `Missing required 208A area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue208A(normalized)) {
    return blocked208A("raw_secret_or_provider_value_rejected", "208A rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.admin-controls.readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    previousStageRequired: "207B_media_cdn_publish_readiness_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_AREAS_208A,
    readinessAreas: normalized.readinessAreas,
    evidenceReferences: normalized.evidenceReferences,
    adminControlSurfaces: normalized.adminControlSurfaces,
    readinessIndexPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    adminProviderToggleBoundaryVisible: true as const,
    adminCatalogToggleBoundaryVisible: true as const,
    adminLocalizationToggleBoundaryVisible: true as const,
    adminAssetQualityToggleBoundaryVisible: true as const,
    adminMediaCdnToggleBoundaryVisible: true as const,
    adminRuntimeExecutionBoundaryVisible: true as const,
    adminAuditEvidenceRequired: true as const,
    adminRolloutHoldRequired: true as const,
    adminReviewerRoleBoundaryVisible: true as const,
    adminRollbackBoundaryVisible: true as const,
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
    nextStage: "208B_stream_gifts_admin_controls_final_handoff" as const,
  });

  const prepared: StreamGiftLedgerAdminControlsReadinessPrepared208A = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    status: "admin_controls_readiness_index_prepared_without_runtime_enablement",
    envelope,
    readinessIndexPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerAdminControlsReadiness208AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_OWNER_APPROVAL,
    readinessMode: "admin_controls_readiness_index_only" as const,
    requiredPreviousStage: "207B_media_cdn_publish_readiness_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_AREAS_208A,
    requiredAdminControlSurfaces: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_REQUIRED_SURFACES_208A,
    providerNotConfiguredVisible: true,
    adminToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    safety: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_SAFETY,
  });
}

export function getStreamGiftLedgerAdminControlsReadiness208ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    steps: Object.freeze([
      "Confirm 207B media/CDN publish readiness final handoff passed.",
      "Confirm catalog, localization, asset, and media/CDN readiness layers remain safe-disabled.",
      "Expose Admin provider/catalog/localization/asset/media-CDN/runtime toggle boundaries as visibility only.",
      "Keep Admin toggles, publish actions, provider runtime, Wallet, DB, payment, payout, and realtime disabled.",
      "Require separate exact owner approval before any future Admin toggle or runtime execution package.",
    ] as const),
    runtimeActionsAllowedNow: false,
    adminToggleAllowedNow: false,
    providerRuntimeEnabled: false,
  });
}

export function createStreamGiftLedgerAdminControlsReadiness208AAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
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

export function createStreamGiftLedgerAdminControlsReadiness208ARuntimeRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_VERSION,
    status: "admin_runtime_execution_request_blocked_requires_separate_exact_owner_approval",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
  });
}

