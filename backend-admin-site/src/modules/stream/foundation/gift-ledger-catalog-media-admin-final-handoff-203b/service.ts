import {
  STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffArea203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffBlocked203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffBlockedCode203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffEnvelope203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffResult203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffSafety203B,
  type StreamGiftLedgerCatalogMediaAdminFinalHandoffSnapshot203B,
} from "./types";

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_OWNER_APPROVAL =
  "I_APPROVE_203B_STREAM_GIFTS_CATALOG_MEDIA_CDN_ADMIN_CONTROLS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_REQUIRED_AREAS_203B = Object.freeze([
  "gift_catalog_contract_closed",
  "gift_asset_manifest_closed",
  "gift_media_poster_fallback_closed",
  "anime_mp4_loop_readiness_closed",
  "media_cdn_publish_blocker_closed",
  "admin_gift_catalog_controls_closed",
  "admin_media_cdn_controls_closed",
  "provider_not_configured_visibility_closed",
  "localization_quality_visibility_closed",
  "future_publish_approval_boundary_closed",
] as const satisfies readonly StreamGiftLedgerCatalogMediaAdminFinalHandoffArea203B[]);

export const STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_SAFETY: StreamGiftLedgerCatalogMediaAdminFinalHandoffSafety203B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  finalHandoffOnlyNoRuntime: true,
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

function normalizeHandoffAreas(value: unknown): readonly StreamGiftLedgerCatalogMediaAdminFinalHandoffArea203B[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const allowed = new Set(STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_REQUIRED_AREAS_203B);
  return Object.freeze(
    value
      .map(normalizeString)
      .filter((entry): entry is StreamGiftLedgerCatalogMediaAdminFinalHandoffArea203B => !!entry && allowed.has(entry as StreamGiftLedgerCatalogMediaAdminFinalHandoffArea203B)),
  );
}

export function normalizeStreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B(raw: Record<string, unknown>): StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B {
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    handoffMode: normalizeString(raw.handoffMode) as StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B["handoffMode"],
    acknowledged203AStage: normalizeString(raw.acknowledged203AStage) as StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B["acknowledged203AStage"],
    evidenceReferences: normalizeEvidenceReferences(raw.evidenceReferences),
    handoffAreas: normalizeHandoffAreas(raw.handoffAreas),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_SAFETY;
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-203B safety invariant failed: final handoff must not enable catalog/media/provider/runtime/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerCatalogMediaAdminFinalHandoffBlockedCode203B, blockedReason: string): StreamGiftLedgerCatalogMediaAdminFinalHandoffBlocked203B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    status: "catalog_media_admin_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateFinalHandoffEvidence(input: StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B): StreamGiftLedgerCatalogMediaAdminFinalHandoffBlocked203B | undefined {
  if (!input.evidenceReferences.length) return baseBlocked("evidence_references_required", "203B final handoff requires 203A evidence references, not raw provider values.");
  if (!input.handoffAreas.length) return baseBlocked("handoff_areas_required", "203B final handoff requires catalog/media/CDN/Admin safe-disabled closure areas.");
  for (const reference of input.evidenceReferences) {
    if (!evidenceReferenceValid(reference)) return baseBlocked("evidence_references_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
  }
  const areas = new Set(input.handoffAreas);
  for (const area of STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_REQUIRED_AREAS_203B) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 203B final handoff area: ${area}`);
  }
  return undefined;
}

export function prepareStreamGiftLedgerCatalogMediaAdminFinalHandoff203B(
  input: StreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B,
  rawInput?: unknown,
): StreamGiftLedgerCatalogMediaAdminFinalHandoffResult203B {
  assertStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "203B accepts evidence labels only, not raw secrets/provider tokens/responses/media publish payloads.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 203B owner approval phrase is required for catalog/media/CDN/Admin final handoff.");
  if (input.handoffMode !== "catalog_media_cdn_admin_controls_final_handoff_only") return baseBlocked("handoff_mode_disabled", "203B is final handoff only; it cannot publish catalog/media/CDN or enable provider/runtime/payment/payout.");
  if (input.acknowledged203AStage !== "203A_catalog_media_admin_readiness_index_clean") return baseBlocked("previous_203a_readiness_index_required", "203A catalog/media/Admin readiness index must be clean before 203B.");
  const blocked = validateFinalHandoffEvidence(input);
  if (blocked) return blocked;

  const envelope: StreamGiftLedgerCatalogMediaAdminFinalHandoffEnvelope203B = Object.freeze({
    contract: "stream.gift.catalog_media_admin.final_handoff.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    previousStageRequired: "203A_catalog_media_admin_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_REQUIRED_AREAS_203B,
    handoffAreas: Object.freeze([...input.handoffAreas]),
    evidenceReferences: Object.freeze([...input.evidenceReferences]),
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    catalogContractClosed: true,
    giftAssetManifestClosed: true,
    posterFallbackClosed: true,
    animeMp4LoopReadinessClosed: true,
    mediaCdnPublishBlockerClosed: true,
    adminGiftCatalogControlsClosed: true,
    adminMediaCdnControlsClosed: true,
    localizationQualityClosed: true,
    futurePublishApprovalBoundaryClosed: true,
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
    nextStage: "closed_stream_gifts_catalog_media_admin_controls_future_publish_or_runtime_requires_exact_owner_approval",
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    status: "catalog_media_admin_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogMediaAdminFinalHandoff203B(): StreamGiftLedgerCatalogMediaAdminFinalHandoffSnapshot203B {
  assertStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    status: "ready_for_catalog_media_admin_final_handoff_without_runtime_enablement",
    previousStageRequired: "203A_catalog_media_admin_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminCatalogToggleAllowedNow: false,
    adminMediaCdnToggleAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_stream_gifts_catalog_media_admin_controls_future_publish_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_SAFETY,
  });
}

export function getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BContract() {
  assertStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    contract: "stream.gift.catalog_media_admin.final_handoff.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_OWNER_APPROVAL,
    previousStageRequired: "203A_catalog_media_admin_readiness_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_REQUIRED_AREAS_203B,
    accepts: "203A report/handoff/checker/tsc evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, media runtime publish payloads, CDN credentials, provider/Admin toggles, payment or payout execution data",
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
    nextStage: "closed_stream_gifts_catalog_media_admin_controls_future_publish_or_runtime_requires_exact_owner_approval",
  });
}

export function getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    steps: Object.freeze([
      "Verify 203A catalog/media/CDN/Admin controls readiness index and TypeScript are clean.",
      "Close gift catalog contract, asset manifest, poster fallback, anime MP4 loop readiness, and localization quality as safe-disabled handoff surfaces.",
      "Keep media/CDN publish, asset upload, transcode, CDN invalidation, and Admin catalog/media toggles blocked.",
      "Keep provider_not_configured visible instead of fake provider readiness.",
      "Keep provider runtime, Wallet, payment capture, payout execution, DB write, Prisma, realtime, and fake success blocked.",
      "Treat future catalog/media/CDN publish, Admin toggle, or runtime execution as separate exact owner approval flows.",
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

export function createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BPublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_CATALOG_MEDIA_ADMIN_FINAL_HANDOFF_203B_VERSION,
    status: "catalog_media_cdn_publish_blocked_requires_new_exact_owner_approval",
    reason: "203B is final handoff only. Catalog publish, media/CDN publish, asset upload, transcode, CDN invalidation, Admin toggles, or runtime execution require a new exact owner approval and separate execution package.",
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
    nextStage: "closed_stream_gifts_catalog_media_admin_controls_future_publish_or_runtime_requires_exact_owner_approval",
  });
}
