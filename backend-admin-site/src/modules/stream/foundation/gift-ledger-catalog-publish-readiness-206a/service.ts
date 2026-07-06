import {
  STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
  type StreamGiftLedgerCatalogPublishReadinessArea206A,
  type StreamGiftLedgerCatalogPublishReadinessBlocked206A,
  type StreamGiftLedgerCatalogPublishReadinessInput206A,
  type StreamGiftLedgerCatalogPublishReadinessPrepared206A,
  type StreamGiftLedgerCatalogPublishReadinessResult206A,
  type StreamGiftLedgerCatalogPublishReadinessSafety206A,
  type StreamGiftLedgerCatalogPublishReadinessSnapshot206A,
} from "./types";

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_OWNER_APPROVAL =
  "I_APPROVE_206A_STREAM_GIFTS_CATALOG_PUBLISH_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_LOCALES_206A = [
  "ru",
  "en",
] as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_AREAS_206A: readonly StreamGiftLedgerCatalogPublishReadinessArea206A[] = [
  "previous_localization_handoff_locked",
  "asset_policy_handoff_locked",
  "catalog_manifest_shape_visible",
  "catalog_item_prices_visible_no_fake_money",
  "anime_asset_manifest_visible",
  "poster_fallback_manifest_visible",
  "all_language_copy_quality_visible",
  "provider_not_configured_visibility_locked",
  "admin_catalog_review_controls_visible",
  "catalog_publish_approval_boundary_locked",
  "media_cdn_publish_approval_boundary_locked",
  "runtime_execution_approval_boundary_locked",
  "readiness_index_only_no_runtime",
] as const;

const RAW_SECRET_MARKERS_206A = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY: StreamGiftLedgerCatalogPublishReadinessSafety206A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previousLocalizationHandoffRequired: true,
  assetPolicyHandoffRequired: true,
  catalogManifestShapeVisible: true,
  catalogItemPricesVisibleNoFakeMoney: true,
  animeAssetManifestVisible: true,
  posterFallbackManifestVisible: true,
  allLanguageCopyQualityVisible: true,
  adminCatalogReviewControlsVisible: true,
  catalogPublishApprovalBoundaryLocked: true,
  mediaCdnPublishApprovalBoundaryLocked: true,
  runtimeExecutionApprovalBoundaryLocked: true,
  catalogRuntimePublishAllowedNow: false,
  localizationRuntimeWriteAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminCatalogToggleAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  catalogRuntimePublishExecuted: false,
  localizationRuntimeWriteExecuted: false,
  mediaCdnRuntimePublishExecuted: false,
  adminCatalogToggleExecuted: false,
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

const defaultEvidenceReferences206A = Object.freeze([
  "205B_catalog_localization_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
  "catalog_manifest_shape_review_ready",
  "catalog_publish_boundary_locked_no_runtime",
] as const);

function containsRawSecretOrProviderValue206A(input: StreamGiftLedgerCatalogPublishReadinessInput206A): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    catalogLocales: input.catalogLocales,
  });
  return RAW_SECRET_MARKERS_206A.some((marker) => payload.includes(marker));
}

function blocked206A(
  code: StreamGiftLedgerCatalogPublishReadinessBlocked206A["code"],
  blockedReason: string,
): StreamGiftLedgerCatalogPublishReadinessBlocked206A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    status: "gift_catalog_publish_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerCatalogPublishReadinessInput206A(
  input?: Partial<StreamGiftLedgerCatalogPublishReadinessInput206A>,
): StreamGiftLedgerCatalogPublishReadinessInput206A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode ?? "disabled",
    acknowledged205BStage: input?.acknowledged205BStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences206A)]),
    readinessAreas: Object.freeze([...(input?.readinessAreas ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_AREAS_206A)]),
    catalogLocales: Object.freeze([...(input?.catalogLocales ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_LOCALES_206A)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerCatalogPublishReadiness206ARemainsSafe(): StreamGiftLedgerCatalogPublishReadinessSafety206A {
  return STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY;
}

export function getStreamGiftLedgerCatalogPublishReadiness206A(): StreamGiftLedgerCatalogPublishReadinessSnapshot206A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    status: "ready_for_gift_catalog_publish_readiness_index_without_runtime_enablement",
    previousStageRequired: "205B_catalog_localization_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
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
    nextStage: "206B_stream_gifts_catalog_publish_readiness_final_handoff",
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY,
  });
}

export function prepareStreamGiftLedgerCatalogPublishReadiness206A(
  input?: Partial<StreamGiftLedgerCatalogPublishReadinessInput206A>,
): StreamGiftLedgerCatalogPublishReadinessResult206A {
  const normalized = normalizeStreamGiftLedgerCatalogPublishReadinessInput206A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_OWNER_APPROVAL) {
    return blocked206A("owner_approval_required", "206A requires explicit owner approval phrase for catalog publish readiness index only.");
  }
  if (normalized.readinessMode !== "gift_catalog_publish_readiness_index_only") {
    return blocked206A("readiness_mode_disabled", "206A readiness mode must remain readiness-index-only and cannot publish catalog.");
  }
  if (normalized.acknowledged205BStage !== "205B_catalog_localization_final_handoff_clean") {
    return blocked206A("previous_205b_handoff_required", "205B catalog localization final handoff must be clean before 206A.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked206A("evidence_references_required", "206A requires evidence references but must not include raw secrets or provider values.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked206A("readiness_areas_required", "206A requires catalog publish readiness areas.");
  }
  if (normalized.catalogLocales.length === 0) {
    return blocked206A("catalog_locales_required", "206A requires catalog locale coverage evidence.");
  }
  if (!["ru", "en"].every((locale) => normalized.catalogLocales.includes(locale))) {
    return blocked206A("ru_en_locales_required", "206A requires RU and EN catalog publish readiness coverage.");
  }
  const missingArea = STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_AREAS_206A.find(
    (area) => !normalized.readinessAreas.includes(area),
  );
  if (missingArea) {
    return blocked206A("missing_required_area", `206A is missing required catalog publish readiness area: ${missingArea}`);
  }
  if (containsRawSecretOrProviderValue206A(normalized)) {
    return blocked206A("raw_secret_or_provider_value_rejected", "206A rejects raw secrets, provider tokens, purchase tokens, and raw provider responses.");
  }

  const prepared: StreamGiftLedgerCatalogPublishReadinessPrepared206A = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    status: "gift_catalog_publish_readiness_index_prepared_without_runtime_enablement",
    envelope: Object.freeze({
      contract: "stream.gift.catalog.publish.readiness-index.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
      previousStageRequired: "205B_catalog_localization_final_handoff_clean",
      requiredAreas: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_AREAS_206A,
      readinessAreas: normalized.readinessAreas,
      evidenceReferences: normalized.evidenceReferences,
      catalogLocales: normalized.catalogLocales,
      readinessIndexPrepared: true,
      providerNotConfiguredVisible: true,
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
      adminMediaCdnToggleAllowedNow: false,
      adminProviderToggleAllowedNow: false,
      adminCatalogToggleExecuted: false,
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
      nextStage: "206B_stream_gifts_catalog_publish_readiness_final_handoff",
    }),
    readinessIndexPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerCatalogPublishReadiness206AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    contract: "stream.gift.catalog.publish.readiness-index.safe_disabled.v1",
    ownerApproval: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_OWNER_APPROVAL,
    previousStageRequired: "205B_catalog_localization_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_AREAS_206A,
    requiredCatalogLocales: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_REQUIRED_LOCALES_206A,
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    catalogRuntimePublishAllowedNow: false,
    localizationRuntimeWriteAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    runtimeExecutionAllowedNow: false,
    providerRuntimeEnabled: false,
    safety: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogPublishReadiness206ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    steps: Object.freeze([
      "Keep catalog publish blocked until a separate exact owner approval and execution package exists.",
      "Require 205B localization final handoff and 204B asset policy final handoff evidence before publish readiness.",
      "Expose provider_not_configured, catalog manifest shape, no-fake-money pricing copy, anime asset manifest, and poster fallback to Admin.",
      "Reject raw secrets, provider values, purchase tokens, and raw provider responses from readiness evidence.",
      "Do not upload assets, transcode media, invalidate CDN, publish catalog/localization, toggle Admin controls, mutate Wallet, execute payout/payment, read/write DB, or emit realtime events.",
    ]),
    readinessIndexOnlyNoRuntime: true,
    nextStage: "206B_stream_gifts_catalog_publish_readiness_final_handoff",
  });
}

export function createStreamGiftLedgerCatalogPublishReadiness206APublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    status: "catalog_publish_blocked_requires_separate_exact_owner_approval",
    reason: "206A is readiness index only and cannot publish catalog, localization, assets, media, or CDN at runtime.",
    catalogRuntimePublishExecuted: false,
    localizationRuntimeWriteExecuted: false,
    mediaCdnRuntimePublishExecuted: false,
    assetRuntimePublishExecuted: false,
    runtimeExecutionApprovedNow: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  });
}

export function createStreamGiftLedgerCatalogPublishReadiness206AAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_VERSION,
    status: "admin_catalog_publish_toggle_blocked_requires_separate_exact_owner_approval",
    reason: "206A does not execute Admin catalog/localization/media/CDN/provider toggles.",
    adminCatalogToggleExecuted: false,
    adminMediaCdnToggleExecuted: false,
    adminProviderToggleExecuted: false,
    runtimeExecutionApprovedNow: false,
    fakeSuccessWritten: false,
  });
}

