import {
  STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
  type StreamGiftLedgerAssetPolicyFinalHandoffArea204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffBlocked204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffBlockedCode204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffEnvelope204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffInput204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffResult204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffSafety204B,
  type StreamGiftLedgerAssetPolicyFinalHandoffSnapshot204B,
} from "./types";

export const STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_OWNER_APPROVAL =
  "I_APPROVE_204B_STREAM_GIFTS_ASSET_POLICY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_REQUIRED_AREAS_204B = Object.freeze([
  "anime_style_gift_quality_policy_locked",
  "anime_mp4_loop_policy_locked",
  "poster_fallback_policy_locked",
  "asset_manifest_visibility_locked",
  "media_cdn_provider_not_configured_visibility_locked",
  "localization_quality_all_languages_locked",
  "admin_asset_quality_controls_visibility_locked",
  "asset_publish_blocker_locked",
  "future_asset_publish_approval_boundary_locked",
  "post_204a_final_handoff_closure",
] as const satisfies readonly StreamGiftLedgerAssetPolicyFinalHandoffArea204B[]);

export const STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_SAFETY: StreamGiftLedgerAssetPolicyFinalHandoffSafety204B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  finalHandoffOnlyNoRuntime: true,
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

function normalizeClosedAreas(value: unknown): readonly StreamGiftLedgerAssetPolicyFinalHandoffArea204B[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const allowed = new Set(STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_REQUIRED_AREAS_204B);
  return Object.freeze(
    value
      .map(normalizeString)
      .filter((entry): entry is StreamGiftLedgerAssetPolicyFinalHandoffArea204B => !!entry && allowed.has(entry as StreamGiftLedgerAssetPolicyFinalHandoffArea204B)),
  );
}

export function normalizeStreamGiftLedgerAssetPolicyFinalHandoffInput204B(raw: Record<string, unknown>): StreamGiftLedgerAssetPolicyFinalHandoffInput204B {
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    handoffMode: normalizeString(raw.handoffMode) as StreamGiftLedgerAssetPolicyFinalHandoffInput204B["handoffMode"],
    acknowledged204AStage: normalizeString(raw.acknowledged204AStage) as StreamGiftLedgerAssetPolicyFinalHandoffInput204B["acknowledged204AStage"],
    evidenceReferences: normalizeEvidenceReferences(raw.evidenceReferences),
    closedAreas: normalizeClosedAreas(raw.closedAreas),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerAssetPolicyFinalHandoff204BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_SAFETY;
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-204B safety invariant failed: asset policy final handoff must not publish assets/media/CDN or enable runtime/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerAssetPolicyFinalHandoffBlockedCode204B, blockedReason: string): StreamGiftLedgerAssetPolicyFinalHandoffBlocked204B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    status: "gift_asset_policy_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateFinalHandoffEvidence(input: StreamGiftLedgerAssetPolicyFinalHandoffInput204B): StreamGiftLedgerAssetPolicyFinalHandoffBlocked204B | undefined {
  if (!input.evidenceReferences.length) return baseBlocked("evidence_references_required", "204B final handoff requires 204A evidence references, not raw provider values or asset publish payloads.");
  if (!input.closedAreas.length) return baseBlocked("closed_areas_required", "204B final handoff requires all asset policy closure areas.");
  for (const reference of input.evidenceReferences) {
    if (!evidenceReferenceValid(reference)) return baseBlocked("evidence_references_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
  }
  const areas = new Set(input.closedAreas);
  for (const area of STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_REQUIRED_AREAS_204B) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 204B asset policy final handoff area: ${area}`);
  }
  return undefined;
}

export function prepareStreamGiftLedgerAssetPolicyFinalHandoff204B(
  input: StreamGiftLedgerAssetPolicyFinalHandoffInput204B,
  rawInput?: unknown,
): StreamGiftLedgerAssetPolicyFinalHandoffResult204B {
  assertStreamGiftLedgerAssetPolicyFinalHandoff204BRemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "204B accepts evidence labels only, not raw secrets/provider tokens/asset publish payloads/CDN credentials.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 204B owner approval phrase is required for asset policy final handoff.");
  if (input.handoffMode !== "gift_asset_policy_final_handoff_only") return baseBlocked("handoff_mode_disabled", "204B is final handoff only; it cannot upload, transcode, publish CDN, or enable runtime/payment/payout.");
  if (input.acknowledged204AStage !== "204A_asset_policy_readiness_index_clean") return baseBlocked("previous_204a_readiness_required", "204A asset policy readiness index must be clean before 204B.");
  const blocked = validateFinalHandoffEvidence(input);
  if (blocked) return blocked;

  const envelope: StreamGiftLedgerAssetPolicyFinalHandoffEnvelope204B = Object.freeze({
    contract: "stream.gift.asset_policy.final_handoff.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    previousStageRequired: "204A_asset_policy_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_REQUIRED_AREAS_204B,
    closedAreas: Object.freeze([...input.closedAreas]),
    evidenceReferences: Object.freeze([...input.evidenceReferences]),
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    animeStyleGiftQualityRequired: true,
    animeMp4LoopPolicyVisible: true,
    posterFallbackRequired: true,
    assetManifestVisible: true,
    localizationQualityRequiredAllLanguages: true,
    adminAssetQualityControlsVisible: true,
    assetPublishBlocked: true,
    mediaCdnPublishBlocked: true,
    adminAssetQualityToggleBlocked: true,
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
    nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval",
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    status: "gift_asset_policy_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_SAFETY,
  });
}

export function getStreamGiftLedgerAssetPolicyFinalHandoff204B(): StreamGiftLedgerAssetPolicyFinalHandoffSnapshot204B {
  assertStreamGiftLedgerAssetPolicyFinalHandoff204BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    status: "ready_for_gift_asset_policy_final_handoff_without_runtime_enablement",
    previousStageRequired: "204A_asset_policy_readiness_index_clean",
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
    nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_SAFETY,
  });
}

export function getStreamGiftLedgerAssetPolicyFinalHandoff204BContract() {
  assertStreamGiftLedgerAssetPolicyFinalHandoff204BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    contract: "stream.gift.asset_policy.final_handoff.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_OWNER_APPROVAL,
    previousStageRequired: "204A_asset_policy_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_REQUIRED_AREAS_204B,
    accepts: "204A report/handoff/checker/tsc evidence references only",
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
    nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval",
  });
}

export function getStreamGiftLedgerAssetPolicyFinalHandoff204BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    steps: Object.freeze([
      "Verify 204A asset policy readiness index and TypeScript are clean.",
      "Close anime-style gift quality, anime MP4 loop, poster fallback, asset manifest, and all-language localization quality as safe-disabled policy surfaces.",
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

export function createStreamGiftLedgerAssetPolicyFinalHandoff204BPublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION,
    status: "asset_policy_publish_blocked_requires_new_exact_owner_approval",
    reason: "204B is asset policy final handoff only. Asset upload, transcode, CDN invalidation, asset publish, media/CDN publish, or Admin asset toggles require a new exact owner approval and separate execution package.",
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
    nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval",
  });
}
