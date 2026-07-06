import {
  STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
  type StreamGiftLedgerCatalogPublishFinalHandoffArea206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffBlocked206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffInput206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffPrepared206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffResult206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffSafety206B,
  type StreamGiftLedgerCatalogPublishFinalHandoffSnapshot206B,
} from "./types";

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_OWNER_APPROVAL =
  "I_APPROVE_206B_STREAM_GIFTS_CATALOG_PUBLISH_READINESS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_LOCALES_206B = [
  "ru",
  "en",
] as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_206B: readonly StreamGiftLedgerCatalogPublishFinalHandoffArea206B[] = [
  "previous_catalog_publish_readiness_locked",
  "localization_handoff_locked",
  "asset_policy_handoff_locked",
  "catalog_manifest_shape_visible",
  "catalog_item_prices_visible_no_fake_money",
  "anime_asset_manifest_visible",
  "poster_fallback_manifest_visible",
  "all_language_copy_quality_visible",
  "provider_not_configured_visibility_locked",
  "admin_catalog_review_controls_visible",
  "catalog_publish_approval_boundary_locked",
  "localization_publish_approval_boundary_locked",
  "media_cdn_publish_approval_boundary_locked",
  "runtime_execution_approval_boundary_locked",
  "final_handoff_only_no_runtime",
] as const;

const RAW_SECRET_MARKERS_206B = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY: StreamGiftLedgerCatalogPublishFinalHandoffSafety206B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previousCatalogPublishReadinessRequired: true,
  previousLocalizationHandoffRequired: true,
  assetPolicyHandoffRequired: true,
  catalogManifestShapeVisible: true,
  catalogItemPricesVisibleNoFakeMoney: true,
  animeAssetManifestVisible: true,
  posterFallbackManifestVisible: true,
  allLanguageCopyQualityVisible: true,
  adminCatalogReviewControlsVisible: true,
  catalogPublishApprovalBoundaryLocked: true,
  localizationPublishApprovalBoundaryLocked: true,
  mediaCdnPublishApprovalBoundaryLocked: true,
  runtimeExecutionApprovalBoundaryLocked: true,
  catalogRuntimePublishAllowedNow: false,
  localizationRuntimeWriteAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminCatalogToggleAllowedNow: false,
  adminLocalizationToggleAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  catalogRuntimePublishExecuted: false,
  localizationRuntimeWriteExecuted: false,
  mediaCdnRuntimePublishExecuted: false,
  adminCatalogToggleExecuted: false,
  adminLocalizationToggleExecuted: false,
  adminMediaCdnToggleExecuted: false,
  adminProviderToggleExecuted: false,
  assetRuntimePublishExecuted: false,
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
  futureCatalogPublishRequiresSeparateApproval: true,
  futureLocalizationPublishRequiresSeparateApproval: true,
  futureMediaCdnPublishRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
});

const defaultEvidenceReferences206B = Object.freeze([
  "206A_catalog_publish_readiness_index_passed",
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
  "catalog_publish_boundary_locked_no_runtime",
] as const);

function containsRawSecretOrProviderValue206B(input: StreamGiftLedgerCatalogPublishFinalHandoffInput206B): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    catalogLocales: input.catalogLocales,
  });
  return RAW_SECRET_MARKERS_206B.some((marker) => payload.includes(marker));
}

function blocked206B(
  code: StreamGiftLedgerCatalogPublishFinalHandoffBlocked206B["code"],
  blockedReason: string,
): StreamGiftLedgerCatalogPublishFinalHandoffBlocked206B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    status: "gift_catalog_publish_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
    providerNotConfiguredVisible: true,
    catalogRuntimePublishAllowedNow: false,
    localizationRuntimeWriteAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

export function normalizeStreamGiftLedgerCatalogPublishFinalHandoffInput206B(
  input?: Partial<StreamGiftLedgerCatalogPublishFinalHandoffInput206B>,
): StreamGiftLedgerCatalogPublishFinalHandoffInput206B {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    handoffMode: input?.handoffMode ?? "disabled",
    acknowledged206AStage: input?.acknowledged206AStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences206B)]),
    handoffAreas: Object.freeze([...(input?.handoffAreas ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_206B)]),
    catalogLocales: Object.freeze([...(input?.catalogLocales ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_LOCALES_206B)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerCatalogPublishFinalHandoff206BRemainsSafe(): StreamGiftLedgerCatalogPublishFinalHandoffSafety206B {
  return STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY;
}

export function getStreamGiftLedgerCatalogPublishFinalHandoff206B(): StreamGiftLedgerCatalogPublishFinalHandoffSnapshot206B {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    status: "ready_for_gift_catalog_publish_readiness_final_handoff_without_runtime_enablement",
    previousStageRequired: "206A_catalog_publish_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previousCatalogPublishReadinessRequired: true,
    previousLocalizationHandoffRequired: true,
    assetPolicyHandoffRequired: true,
    catalogManifestShapeVisible: true,
    catalogItemPricesVisibleNoFakeMoney: true,
    animeAssetManifestVisible: true,
    posterFallbackManifestVisible: true,
    allLanguageCopyQualityVisible: true,
    adminCatalogReviewControlsVisible: true,
    catalogPublishBlocked: true,
    localizationPublishBlocked: true,
    mediaCdnPublishBlocked: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    localizationRuntimeWriteAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_stream_gifts_catalog_publish_readiness_future_publish_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

export function prepareStreamGiftLedgerCatalogPublishFinalHandoff206B(
  input?: Partial<StreamGiftLedgerCatalogPublishFinalHandoffInput206B>,
): StreamGiftLedgerCatalogPublishFinalHandoffResult206B {
  const normalized = normalizeStreamGiftLedgerCatalogPublishFinalHandoffInput206B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_OWNER_APPROVAL) {
    return blocked206B("owner_approval_required", "206B requires explicit owner approval phrase for final handoff only.");
  }
  if (normalized.handoffMode !== "gift_catalog_publish_readiness_final_handoff_only") {
    return blocked206B("handoff_mode_disabled", "206B mode must remain final-handoff-only and cannot publish catalog.");
  }
  if (normalized.acknowledged206AStage !== "206A_catalog_publish_readiness_index_clean") {
    return blocked206B("previous_206a_readiness_required", "206A catalog publish readiness index must be clean before 206B.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked206B("evidence_references_required", "206B requires evidence references but must not include raw secrets or provider values.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked206B("handoff_areas_required", "206B requires handoff areas but performs no runtime action.");
  }
  if (normalized.catalogLocales.length === 0) {
    return blocked206B("catalog_locales_required", "206B requires catalog locale evidence without writing localization runtime state.");
  }
  if (!normalized.catalogLocales.includes("ru") || !normalized.catalogLocales.includes("en")) {
    return blocked206B("ru_en_locales_required", "206B requires RU and EN locale evidence to prevent low-quality catalog copy.");
  }
  const missingArea = STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_206B.find(
    (area) => !normalized.handoffAreas.includes(area),
  );
  if (missingArea) {
    return blocked206B("missing_required_area", `206B missing required final handoff area: ${missingArea}`);
  }
  if (containsRawSecretOrProviderValue206B(normalized)) {
    return blocked206B("raw_secret_or_provider_value_rejected", "206B rejects raw secrets, provider tokens, purchase tokens, and provider responses.");
  }

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    status: "gift_catalog_publish_readiness_final_handoff_prepared_without_runtime_enablement",
    envelope: Object.freeze({
      contract: "stream.gift.catalog.publish.final-handoff.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
      previousStageRequired: "206A_catalog_publish_readiness_index_clean",
      requiredAreas: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_206B,
      handoffAreas: normalized.handoffAreas,
      evidenceReferences: normalized.evidenceReferences,
      catalogLocales: normalized.catalogLocales,
      finalHandoffPrepared: true,
      providerNotConfiguredVisible: true,
      previousCatalogPublishReadinessRequired: true,
      previousLocalizationHandoffRequired: true,
      assetPolicyHandoffRequired: true,
      catalogManifestShapeVisible: true,
      catalogItemPricesVisibleNoFakeMoney: true,
      animeAssetManifestVisible: true,
      posterFallbackManifestVisible: true,
      allLanguageCopyQualityVisible: true,
      adminCatalogReviewControlsVisible: true,
      catalogPublishBlocked: true,
      localizationPublishBlocked: true,
      mediaCdnPublishBlocked: true,
      futureCatalogPublishApprovalBoundaryVisible: true,
      futureLocalizationPublishApprovalBoundaryVisible: true,
      futureMediaCdnPublishApprovalBoundaryVisible: true,
      runtimeExecutionStillBlocked: true,
      catalogRuntimePublishAllowedNow: false,
      localizationRuntimeWriteAllowedNow: false,
      mediaCdnRuntimePublishAllowedNow: false,
      adminCatalogToggleAllowedNow: false,
      adminLocalizationToggleAllowedNow: false,
      adminMediaCdnToggleAllowedNow: false,
      adminProviderToggleAllowedNow: false,
      adminCatalogToggleExecuted: false,
      adminLocalizationToggleExecuted: false,
      adminMediaCdnToggleExecuted: false,
      adminProviderToggleExecuted: false,
      assetUploadExecuted: false,
      mediaTranscodeExecuted: false,
      cdnInvalidateExecuted: false,
      runtimeExecutionApprovedNow: false,
      liveActivationExecutionApprovedNow: false,
      liveActivationExecutionPerformedNow: false,
      providerRuntimeEnabled: false,
      providerBindingExecuted: false,
      providerBindingActivationExecuted: false,
      providerLiveCallExecuted: false,
      providerPayoutCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      realtimeEmitExecuted: false,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      fakeSuccessWritten: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureCatalogPublishRequiresSeparateApproval: true,
      futureLocalizationPublishRequiresSeparateApproval: true,
      futureMediaCdnPublishRequiresSeparateApproval: true,
      futureAdminToggleRequiresSeparateApproval: true,
      nextStage: "closed_stream_gifts_catalog_publish_readiness_future_publish_or_runtime_requires_exact_owner_approval",
    }),
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    catalogRuntimePublishAllowedNow: false,
    localizationRuntimeWriteAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogPublishFinalHandoff206BContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    contract: "stream.gift.catalog.publish.final-handoff.safe_disabled.v1",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_OWNER_APPROVAL,
    previousStageRequired: "206A_catalog_publish_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_206B,
    requiredLocales: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_REQUIRED_LOCALES_206B,
    finalHandoffOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    catalogPublishBlocked: true,
    localizationPublishBlocked: true,
    mediaCdnPublishBlocked: true,
    adminTogglesBlocked: true,
    runtimeExecutionStillBlocked: true,
    noEnvRead: true,
    noRawSecrets: true,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogPublishFinalHandoff206BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    steps: Object.freeze([
      "Confirm 206A catalog publish readiness index is clean on owner machine.",
      "Confirm 205B localization and 204B asset policy handoffs remain clean.",
      "Keep catalog publish, localization write, media/CDN publish, Admin toggles, provider runtime, and runtime execution blocked.",
      "Use this final handoff only as Admin/readiness visibility evidence.",
      "Require a new exact owner approval and separate execution package for any future publish or runtime action.",
    ]),
    blockedRuntimeActions: Object.freeze([
      "catalog_runtime_publish",
      "localization_runtime_write",
      "media_cdn_runtime_publish",
      "admin_catalog_toggle",
      "admin_localization_toggle",
      "admin_media_cdn_toggle",
      "provider_runtime_enablement",
      "wallet_mutation",
      "payment_capture",
      "payout_execution",
      "db_write",
      "realtime_emit",
    ]),
    providerNotConfiguredVisible: true,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureCatalogPublishRequiresSeparateApproval: true,
    futureLocalizationPublishRequiresSeparateApproval: true,
    futureMediaCdnPublishRequiresSeparateApproval: true,
    futureAdminToggleRequiresSeparateApproval: true,
  });
}

export function createStreamGiftLedgerCatalogPublishFinalHandoff206BPublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    status: "catalog_publish_blocked_separate_exact_owner_approval_required",
    reason: "206B is final handoff only and cannot publish catalog, localization, assets, or media/CDN.",
    providerNotConfiguredVisible: true,
    catalogRuntimePublishExecuted: false,
    localizationRuntimeWriteExecuted: false,
    mediaCdnRuntimePublishExecuted: false,
    assetRuntimePublishExecuted: false,
    futureCatalogPublishRequiresSeparateApproval: true,
    futureLocalizationPublishRequiresSeparateApproval: true,
    futureMediaCdnPublishRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

export function createStreamGiftLedgerCatalogPublishFinalHandoff206BAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_VERSION,
    status: "admin_catalog_publish_toggle_blocked_separate_exact_owner_approval_required",
    reason: "206B exposes Admin visibility only and cannot toggle provider/catalog/localization/media-CDN state.",
    providerNotConfiguredVisible: true,
    adminCatalogToggleExecuted: false,
    adminLocalizationToggleExecuted: false,
    adminMediaCdnToggleExecuted: false,
    adminProviderToggleExecuted: false,
    futureAdminToggleRequiresSeparateApproval: true,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_SAFETY,
  });
}

