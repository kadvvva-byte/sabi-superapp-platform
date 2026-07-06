import {
  STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
  type StreamGiftLedgerCatalogMediaAdminReadinessArea203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessBlocked203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessBlockedCode203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessEnvelope203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessInput203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessResult203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessSafety203A,
  type StreamGiftLedgerCatalogMediaAdminReadinessSnapshot203A,
} from "./types";

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_OWNER_APPROVAL =
  "I_APPROVE_203A_STREAM_GIFTS_CATALOG_MEDIA_CDN_ADMIN_CONTROLS_READINESS_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_REQUIRED_AREAS_203A = Object.freeze([
  "gift_catalog_contract_visibility",
  "gift_asset_manifest_visibility",
  "gift_media_poster_fallback_visibility",
  "anime_mp4_loop_asset_readiness",
  "media_cdn_publish_blocker",
  "admin_gift_catalog_controls_visibility",
  "admin_media_cdn_controls_visibility",
  "provider_not_configured_visibility",
  "localization_quality_visibility",
  "future_publish_approval_boundary",
] as const satisfies readonly StreamGiftLedgerCatalogMediaAdminReadinessArea203A[]);

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_SAFETY: StreamGiftLedgerCatalogMediaAdminReadinessSafety203A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  catalogRuntimePublishAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminCatalogToggleAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  assetUploadExecuted: false,
  mediaTranscodeExecuted: false,
  cdnInvalidateExecuted: false,
  catalogRuntimePublishExecuted: false,
  mediaCdnRuntimePublishExecuted: false,
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
  futureMediaCdnPublishRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
});

const UNSAFE_VALUE_PATTERN = /(sk_live_|pk_live_|AIza|AKIA|-----BEGIN|private[_ -]?key|secret[_ -]?key|access[_ -]?token|refresh[_ -]?token|client[_ -]?secret|webhook[_ -]?secret|bearer\s+[a-z0-9._-]{12,})/i;
const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function hasUnsafeRawProviderValue(value: unknown): boolean {
  return typeof value === "string" && UNSAFE_VALUE_PATTERN.test(value);
}

function hasUnsafeRawProviderValueDeep(value: unknown): boolean {
  if (!value || typeof value !== "object") return hasUnsafeRawProviderValue(value);
  if (Array.isArray(value)) return value.some(hasUnsafeRawProviderValueDeep);
  return Object.entries(value as Record<string, unknown>).some(([key, entry]) => UNSAFE_KEY_PATTERN.test(key) || hasUnsafeRawProviderValueDeep(entry));
}

function normalizeEvidenceReferences(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  return Object.freeze(value.map(normalizeString).filter((entry): entry is string => !!entry));
}

function normalizeReadinessAreas(value: unknown): readonly StreamGiftLedgerCatalogMediaAdminReadinessArea203A[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const allowed = new Set(STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_REQUIRED_AREAS_203A);
  return Object.freeze(
    value
      .map(normalizeString)
      .filter((entry): entry is StreamGiftLedgerCatalogMediaAdminReadinessArea203A => !!entry && allowed.has(entry as StreamGiftLedgerCatalogMediaAdminReadinessArea203A)),
  );
}

export function normalizeStreamGiftLedgerCatalogMediaAdminReadinessInput203A(raw: Record<string, unknown>): StreamGiftLedgerCatalogMediaAdminReadinessInput203A {
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    readinessMode: normalizeString(raw.readinessMode) as StreamGiftLedgerCatalogMediaAdminReadinessInput203A["readinessMode"],
    acknowledged202BStage: normalizeString(raw.acknowledged202BStage) as StreamGiftLedgerCatalogMediaAdminReadinessInput203A["acknowledged202BStage"],
    evidenceReferences: normalizeEvidenceReferences(raw.evidenceReferences),
    readinessAreas: normalizeReadinessAreas(raw.readinessAreas),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerCatalogMediaAdminReadiness203ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_SAFETY;
  if (
    safety.envFileReadAllowedNow ||
    safety.envValueReadAllowedNow ||
    safety.rawSecretAccepted ||
    safety.rawProviderTokenAccepted ||
    safety.rawProviderResponseAccepted ||
    safety.catalogRuntimePublishAllowedNow ||
    safety.mediaCdnRuntimePublishAllowedNow ||
    safety.adminCatalogToggleAllowedNow ||
    safety.adminMediaCdnToggleAllowedNow ||
    safety.adminProviderToggleAllowedNow ||
    safety.assetUploadExecuted ||
    safety.mediaTranscodeExecuted ||
    safety.cdnInvalidateExecuted ||
    safety.catalogRuntimePublishExecuted ||
    safety.mediaCdnRuntimePublishExecuted ||
    safety.runtimeExecutionApprovedNow ||
    safety.liveActivationExecutionApprovedNow ||
    safety.liveActivationExecutionPerformedNow ||
    safety.providerBindingExecuted ||
    safety.providerBindingActivationExecuted ||
    safety.providerRuntimeEnabled ||
    safety.providerLiveCallExecuted ||
    safety.providerPayoutCallExecuted ||
    safety.walletMutationExecuted ||
    safety.paymentCaptureExecuted ||
    safety.payoutExecutionExecuted ||
    safety.dbReadExecuted ||
    safety.dbWriteExecuted ||
    safety.schemaWriteExecuted ||
    safety.migrationExecuted ||
    safety.prismaGenerateExecuted ||
    safety.realtimeEmitExecuted ||
    safety.runtimeEnablementExecuted ||
    safety.fakePaymentSuccessAllowed ||
    safety.fakeGiftSendSuccessAllowed ||
    safety.fakePayoutSuccessAllowed ||
    safety.fakeAvailableBalanceAllowed
  ) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-203A safety invariant failed: readiness index must not enable catalog/media/provider/runtime/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerCatalogMediaAdminReadinessBlockedCode203A, blockedReason: string): StreamGiftLedgerCatalogMediaAdminReadinessBlocked203A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    status: "catalog_media_admin_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateReadinessEvidence(input: StreamGiftLedgerCatalogMediaAdminReadinessInput203A): StreamGiftLedgerCatalogMediaAdminReadinessBlocked203A | undefined {
  if (!input.evidenceReferences.length) return baseBlocked("evidence_references_required", "203A readiness requires 202B evidence references, not raw provider values.");
  if (!input.readinessAreas.length) return baseBlocked("readiness_areas_required", "203A readiness requires catalog/media/CDN/Admin safe-disabled areas.");
  for (const reference of input.evidenceReferences) {
    if (!evidenceReferenceValid(reference)) return baseBlocked("evidence_references_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
  }
  const areas = new Set(input.readinessAreas);
  for (const area of STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_REQUIRED_AREAS_203A) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 203A readiness area: ${area}`);
  }
  return undefined;
}

export function prepareStreamGiftLedgerCatalogMediaAdminReadiness203A(
  input: StreamGiftLedgerCatalogMediaAdminReadinessInput203A,
  rawInput?: unknown,
): StreamGiftLedgerCatalogMediaAdminReadinessResult203A {
  assertStreamGiftLedgerCatalogMediaAdminReadiness203ARemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "203A accepts evidence labels only, not raw secrets/provider tokens/responses/media publish payloads.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 203A owner approval phrase is required for catalog/media/CDN/Admin readiness index.");
  if (input.readinessMode !== "catalog_media_cdn_admin_controls_readiness_index_only") return baseBlocked("readiness_mode_disabled", "203A is readiness index only; it cannot publish catalog/media/CDN or enable provider/runtime/payment/payout.");
  if (input.acknowledged202BStage !== "202B_provider_visibility_final_handoff_clean") return baseBlocked("previous_202b_visibility_final_handoff_required", "202B provider visibility final handoff must be clean before 203A.");
  const blocked = validateReadinessEvidence(input);
  if (blocked) return blocked;

  const envelope: StreamGiftLedgerCatalogMediaAdminReadinessEnvelope203A = Object.freeze({
    contract: "stream.gift.catalog_media_admin.readiness.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    previousStageRequired: "202B_provider_visibility_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_REQUIRED_AREAS_203A,
    readinessAreas: Object.freeze([...input.readinessAreas]),
    evidenceReferences: Object.freeze([...input.evidenceReferences]),
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    catalogContractVisible: true,
    giftAssetManifestVisible: true,
    posterFallbackVisible: true,
    animeMp4LoopReadinessVisible: true,
    mediaCdnPublishBlocked: true,
    adminGiftCatalogControlsVisible: true,
    adminMediaCdnControlsVisible: true,
    localizationQualityVisible: true,
    futurePublishApprovalBoundaryVisible: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
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
    futureMediaCdnPublishRequiresSeparateApproval: true,
    futureAdminToggleRequiresSeparateApproval: true,
    nextStage: "203B_stream_gifts_catalog_media_admin_controls_final_handoff",
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    status: "catalog_media_admin_readiness_index_prepared_without_runtime_enablement",
    envelope,
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogMediaAdminReadiness203A(): StreamGiftLedgerCatalogMediaAdminReadinessSnapshot203A {
  assertStreamGiftLedgerCatalogMediaAdminReadiness203ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    status: "ready_for_catalog_media_admin_readiness_index_without_runtime_enablement",
    previousStageRequired: "202B_provider_visibility_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "203B_stream_gifts_catalog_media_admin_controls_final_handoff",
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogMediaAdminReadiness203AContract() {
  assertStreamGiftLedgerCatalogMediaAdminReadiness203ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    contract: "stream.gift.catalog_media_admin.readiness.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_OWNER_APPROVAL,
    previousStageRequired: "202B_provider_visibility_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_REQUIRED_AREAS_203A,
    accepts: "202B report/handoff/checker/tsc evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, media runtime publish payloads, CDN credentials, provider toggles, payment or payout execution data",
    noCatalogRuntimePublish: true,
    noMediaCdnRuntimePublish: true,
    noAdminCatalogToggle: true,
    noAdminMediaCdnToggle: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "203B_stream_gifts_catalog_media_admin_controls_final_handoff",
  });
}

export function getStreamGiftLedgerCatalogMediaAdminReadiness203ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    steps: Object.freeze([
      "Verify 202B provider visibility final handoff and TypeScript are clean.",
      "Expose gift catalog contract, asset manifest, poster fallback, anime MP4 loop readiness, and localization quality as safe-disabled readiness surfaces.",
      "Keep media/CDN publish, asset upload, transcode, CDN invalidation, and Admin catalog/media toggles blocked.",
      "Keep provider_not_configured visible instead of fake provider readiness.",
      "Keep provider runtime, Wallet, payment capture, payout execution, DB write, Prisma, realtime, and fake success blocked.",
      "Treat future catalog/media/CDN publish as a separate exact owner approval flow.",
    ]),
    blockedOperations: Object.freeze([
      "env_read",
      "raw_secret_input",
      "provider_call",
      "provider_runtime_enablement",
      "admin_provider_toggle",
      "admin_catalog_toggle",
      "admin_media_cdn_toggle",
      "catalog_runtime_publish",
      "media_cdn_runtime_publish",
      "asset_upload",
      "media_transcode",
      "cdn_invalidate",
      "wallet_mutation",
      "payment_capture",
      "payout_execution",
      "db_read_write",
      "prisma_generate_or_migration",
      "realtime_emit",
      "fake_success",
    ]),
  });
}

export function createStreamGiftLedgerCatalogMediaAdminReadiness203APublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_READINESS_203A_VERSION,
    status: "catalog_media_cdn_publish_blocked_requires_new_exact_owner_approval",
    reason: "203A is readiness index only. Catalog publish, media/CDN publish, asset upload, transcode, CDN invalidation, or Admin toggles require a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
    assetUploadExecuted: false,
    mediaTranscodeExecuted: false,
    cdnInvalidateExecuted: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "203B_stream_gifts_catalog_media_admin_controls_final_handoff",
  });
}
