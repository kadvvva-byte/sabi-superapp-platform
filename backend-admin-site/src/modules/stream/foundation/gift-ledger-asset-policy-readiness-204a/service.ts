import {
  STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
  type StreamGiftLedgerAssetPolicyReadinessArea204A,
  type StreamGiftLedgerAssetPolicyReadinessBlocked204A,
  type StreamGiftLedgerAssetPolicyReadinessBlockedCode204A,
  type StreamGiftLedgerAssetPolicyReadinessEnvelope204A,
  type StreamGiftLedgerAssetPolicyReadinessInput204A,
  type StreamGiftLedgerAssetPolicyReadinessResult204A,
  type StreamGiftLedgerAssetPolicyReadinessSafety204A,
  type StreamGiftLedgerAssetPolicyReadinessSnapshot204A,
} from "./types";

export const STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_OWNER_APPROVAL =
  "I_APPROVE_204A_STREAM_GIFTS_ASSET_POLICY_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_REQUIRED_AREAS_204A = Object.freeze([
  "anime_style_gift_quality_policy",
  "anime_mp4_loop_policy",
  "poster_fallback_required",
  "asset_manifest_contract_visibility",
  "media_cdn_provider_not_configured_visibility",
  "localization_quality_all_languages",
  "admin_asset_quality_controls_visibility",
  "asset_publish_blocker",
  "future_asset_publish_approval_boundary",
] as const satisfies readonly StreamGiftLedgerAssetPolicyReadinessArea204A[]);

export const STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_SAFETY: StreamGiftLedgerAssetPolicyReadinessSafety204A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  animeStyleGiftQualityRequired: true,
  animeMp4LoopPolicyVisible: true,
  posterFallbackRequired: true,
  localizationQualityRequiredAllLanguages: true,
  assetManifestVisible: true,
  adminAssetQualityControlsVisible: true,
  assetRuntimePublishAllowedNow: false,
  catalogRuntimePublishAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminAssetQualityToggleAllowedNow: false,
  adminCatalogToggleAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  assetUploadExecuted: false,
  mediaTranscodeExecuted: false,
  cdnInvalidateExecuted: false,
  assetRuntimePublishExecuted: false,
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
  futureAssetPublishRequiresSeparateApproval: true,
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

function normalizeReadinessAreas(value: unknown): readonly StreamGiftLedgerAssetPolicyReadinessArea204A[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const allowed = new Set(STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_REQUIRED_AREAS_204A);
  return Object.freeze(
    value
      .map(normalizeString)
      .filter((entry): entry is StreamGiftLedgerAssetPolicyReadinessArea204A => !!entry && allowed.has(entry as StreamGiftLedgerAssetPolicyReadinessArea204A)),
  );
}

export function normalizeStreamGiftLedgerAssetPolicyReadinessInput204A(raw: Record<string, unknown>): StreamGiftLedgerAssetPolicyReadinessInput204A {
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    readinessMode: normalizeString(raw.readinessMode) as StreamGiftLedgerAssetPolicyReadinessInput204A["readinessMode"],
    acknowledged203BStage: normalizeString(raw.acknowledged203BStage) as StreamGiftLedgerAssetPolicyReadinessInput204A["acknowledged203BStage"],
    evidenceReferences: normalizeEvidenceReferences(raw.evidenceReferences),
    readinessAreas: normalizeReadinessAreas(raw.readinessAreas),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerAssetPolicyReadiness204ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_SAFETY;
  if (
    safety.envFileReadAllowedNow ||
    safety.envValueReadAllowedNow ||
    safety.rawSecretAccepted ||
    safety.rawProviderTokenAccepted ||
    safety.rawProviderResponseAccepted ||
    safety.assetRuntimePublishAllowedNow ||
    safety.catalogRuntimePublishAllowedNow ||
    safety.mediaCdnRuntimePublishAllowedNow ||
    safety.adminAssetQualityToggleAllowedNow ||
    safety.adminCatalogToggleAllowedNow ||
    safety.adminMediaCdnToggleAllowedNow ||
    safety.adminProviderToggleAllowedNow ||
    safety.assetUploadExecuted ||
    safety.mediaTranscodeExecuted ||
    safety.cdnInvalidateExecuted ||
    safety.assetRuntimePublishExecuted ||
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-204A safety invariant failed: asset policy readiness must not publish assets/media/CDN or enable runtime/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerAssetPolicyReadinessBlockedCode204A, blockedReason: string): StreamGiftLedgerAssetPolicyReadinessBlocked204A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    status: "gift_asset_policy_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    assetRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminAssetQualityToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateReadinessEvidence(input: StreamGiftLedgerAssetPolicyReadinessInput204A): StreamGiftLedgerAssetPolicyReadinessBlocked204A | undefined {
  if (!input.evidenceReferences.length) return baseBlocked("evidence_references_required", "204A readiness requires 203B evidence references, not raw provider values or media publish payloads.");
  if (!input.readinessAreas.length) return baseBlocked("readiness_areas_required", "204A readiness requires asset policy safe-disabled areas.");
  for (const reference of input.evidenceReferences) {
    if (!evidenceReferenceValid(reference)) return baseBlocked("evidence_references_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
  }
  const areas = new Set(input.readinessAreas);
  for (const area of STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_REQUIRED_AREAS_204A) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 204A asset policy area: ${area}`);
  }
  return undefined;
}

export function prepareStreamGiftLedgerAssetPolicyReadiness204A(
  input: StreamGiftLedgerAssetPolicyReadinessInput204A,
  rawInput?: unknown,
): StreamGiftLedgerAssetPolicyReadinessResult204A {
  assertStreamGiftLedgerAssetPolicyReadiness204ARemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "204A accepts evidence labels only, not raw secrets/provider tokens/media publish payloads.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 204A owner approval phrase is required for asset policy readiness index.");
  if (input.readinessMode !== "gift_asset_policy_readiness_index_only") return baseBlocked("readiness_mode_disabled", "204A is asset policy readiness index only; it cannot upload, transcode, publish CDN, or enable runtime/payment/payout.");
  if (input.acknowledged203BStage !== "203B_catalog_media_admin_final_handoff_clean") return baseBlocked("previous_203b_final_handoff_required", "203B catalog/media/Admin final handoff must be clean before 204A.");
  const blocked = validateReadinessEvidence(input);
  if (blocked) return blocked;

  const envelope: StreamGiftLedgerAssetPolicyReadinessEnvelope204A = Object.freeze({
    contract: "stream.gift.asset_policy.readiness.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    previousStageRequired: "203B_catalog_media_admin_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_REQUIRED_AREAS_204A,
    readinessAreas: Object.freeze([...input.readinessAreas]),
    evidenceReferences: Object.freeze([...input.evidenceReferences]),
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    animeStyleGiftQualityRequired: true,
    animeMp4LoopPolicyVisible: true,
    posterFallbackRequired: true,
    assetManifestVisible: true,
    localizationQualityRequiredAllLanguages: true,
    adminAssetQualityControlsVisible: true,
    assetPublishBlocked: true,
    mediaCdnPublishBlocked: true,
    futureAssetPublishApprovalBoundaryVisible: true,
    runtimeExecutionStillBlocked: true,
    assetRuntimePublishAllowedNow: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminAssetQualityToggleAllowedNow: false,
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
    futureAssetPublishRequiresSeparateApproval: true,
    futureMediaCdnPublishRequiresSeparateApproval: true,
    futureAdminToggleRequiresSeparateApproval: true,
    nextStage: "204B_stream_gifts_asset_policy_final_handoff",
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    status: "gift_asset_policy_readiness_index_prepared_without_runtime_enablement",
    envelope,
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    assetRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminAssetQualityToggleAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_SAFETY,
  });
}

export function getStreamGiftLedgerAssetPolicyReadiness204A(): StreamGiftLedgerAssetPolicyReadinessSnapshot204A {
  assertStreamGiftLedgerAssetPolicyReadiness204ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    status: "ready_for_gift_asset_policy_readiness_index_without_runtime_enablement",
    previousStageRequired: "203B_catalog_media_admin_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    animeStyleGiftQualityRequired: true,
    animeMp4LoopPolicyVisible: true,
    posterFallbackRequired: true,
    localizationQualityRequiredAllLanguages: true,
    runtimeExecutionStillBlocked: true,
    assetRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminAssetQualityToggleAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "204B_stream_gifts_asset_policy_final_handoff",
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_SAFETY,
  });
}

export function getStreamGiftLedgerAssetPolicyReadiness204AContract() {
  assertStreamGiftLedgerAssetPolicyReadiness204ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    contract: "stream.gift.asset_policy.readiness.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_OWNER_APPROVAL,
    previousStageRequired: "203B_catalog_media_admin_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_REQUIRED_AREAS_204A,
    accepts: "203B report/handoff/checker/tsc evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, asset upload payloads, CDN credentials, publish payloads, payment or payout execution data",
    animeStyleGiftQualityRequired: true,
    animeMp4LoopPolicyVisible: true,
    posterFallbackRequired: true,
    localizationQualityRequiredAllLanguages: true,
    noAssetRuntimePublish: true,
    noCatalogRuntimePublish: true,
    noMediaCdnRuntimePublish: true,
    noAdminAssetQualityToggle: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "204B_stream_gifts_asset_policy_final_handoff",
  });
}

export function getStreamGiftLedgerAssetPolicyReadiness204ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    steps: Object.freeze([
      "Verify 203B catalog/media/CDN/Admin controls final handoff and TypeScript are clean.",
      "Expose anime-style gift quality, anime MP4 loop policy, poster fallback, asset manifest, and all-language localization quality as readiness surfaces.",
      "Keep asset upload, media transcode, CDN invalidation, asset publish, media/CDN publish, and Admin asset toggles blocked.",
      "Keep provider_not_configured visible instead of fake provider readiness.",
      "Keep provider runtime, Wallet, payment capture, payout execution, DB write, Prisma, realtime, and fake success blocked.",
      "Treat future asset/media/CDN publish as a separate exact owner approval flow.",
    ]),
    blockedOperations: Object.freeze([
      "env_read",
      "raw_secret_input",
      "provider_call",
      "provider_runtime_enablement",
      "admin_asset_quality_toggle",
      "asset_runtime_publish",
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

export function createStreamGiftLedgerAssetPolicyReadiness204APublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_READINESS_204A_VERSION,
    status: "asset_publish_blocked_requires_new_exact_owner_approval",
    reason: "204A is asset policy readiness index only. Asset upload, transcode, CDN invalidation, asset publish, media/CDN publish, or Admin asset toggles require a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    assetRuntimePublishAllowedNow: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminAssetQualityToggleAllowedNow: false,
    assetUploadExecuted: false,
    mediaTranscodeExecuted: false,
    cdnInvalidateExecuted: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "204B_stream_gifts_asset_policy_final_handoff",
  });
}
