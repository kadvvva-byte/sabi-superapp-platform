import {
  STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
  type StreamGiftLedgerProviderVisibilityArea202A,
  type StreamGiftLedgerProviderVisibilityBlocked202A,
  type StreamGiftLedgerProviderVisibilityBlockedCode202A,
  type StreamGiftLedgerProviderVisibilityEnvelope202A,
  type StreamGiftLedgerProviderVisibilityInput202A,
  type StreamGiftLedgerProviderVisibilityItem202A,
  type StreamGiftLedgerProviderVisibilityReadiness202A,
  type StreamGiftLedgerProviderVisibilityResult202A,
  type StreamGiftLedgerProviderVisibilitySafety202A,
  type StreamGiftLedgerProviderVisibilityStatus202A,
} from "./types";

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_OWNER_APPROVAL =
  "I_APPROVE_202A_STREAM_GIFTS_PROVIDER_VISIBILITY_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_REQUIRED_AREAS_202A = Object.freeze([
  "gift_catalog",
  "gift_media_assets",
  "gift_media_cdn",
  "admin_controls",
  "provider_not_configured_visibility",
  "provider_reference_labels",
  "localization_and_disclosures",
  "creator_payout_boundary",
  "mobile_contract_boundary",
] as const satisfies readonly StreamGiftLedgerProviderVisibilityArea202A[]);

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_SAFETY: StreamGiftLedgerProviderVisibilitySafety202A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  postClosure201BRequired: true,
  providerVisibilityIndexOnly: true,
  catalogRuntimePublishAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  providerNotConfiguredVisible: true,
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

function normalizeVisibilityItem(value: unknown): StreamGiftLedgerProviderVisibilityItem202A | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Record<string, unknown>;
  const area = normalizeString(item.area) as StreamGiftLedgerProviderVisibilityArea202A | undefined;
  const status = normalizeString(item.status) as StreamGiftLedgerProviderVisibilityStatus202A | undefined;
  const evidenceReference = normalizeString(item.evidenceReference);
  if (!area || !status || !evidenceReference) return undefined;
  return Object.freeze({
    area,
    status,
    evidenceReference,
    adminVisible: true,
    clientRuntimeEnabled: false,
    providerRuntimeEnabled: false,
    providerCallAllowedNow: false,
    mediaPublishAllowedNow: false,
    walletPaymentOrPayoutAllowedNow: false,
    fakeSuccessAllowed: false,
  });
}

export function normalizeStreamGiftLedgerProviderVisibilityInput202A(raw: Record<string, unknown>): StreamGiftLedgerProviderVisibilityInput202A {
  const rawItems = Array.isArray(raw.visibilityItems) ? raw.visibilityItems : [];
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    visibilityMode: normalizeString(raw.visibilityMode) as StreamGiftLedgerProviderVisibilityInput202A["visibilityMode"],
    acknowledged201BStage: normalizeString(raw.acknowledged201BStage) as StreamGiftLedgerProviderVisibilityInput202A["acknowledged201BStage"],
    visibilityItems: Object.freeze(rawItems.map(normalizeVisibilityItem).filter((item): item is StreamGiftLedgerProviderVisibilityItem202A => !!item)),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerProviderVisibility202ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_SAFETY;
  if (
    safety.envFileReadAllowedNow ||
    safety.envValueReadAllowedNow ||
    safety.rawSecretAccepted ||
    safety.rawProviderTokenAccepted ||
    safety.rawProviderResponseAccepted ||
    safety.catalogRuntimePublishAllowedNow ||
    safety.mediaCdnRuntimePublishAllowedNow ||
    safety.adminProviderToggleAllowedNow ||
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-202A safety invariant failed: provider visibility must not enable runtime/provider/media/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerProviderVisibilityBlockedCode202A, blockedReason: string): StreamGiftLedgerProviderVisibilityBlocked202A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    status: "provider_visibility_index_blocked_without_runtime_enablement",
    code,
    blockedReason,
    visibilityIndexPrepared: false,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    mediaCdnRuntimePublishAllowedNow: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateVisibilityItems(items: readonly StreamGiftLedgerProviderVisibilityItem202A[]): StreamGiftLedgerProviderVisibilityBlocked202A | undefined {
  if (!items.length) return baseBlocked("visibility_items_required", "Provider visibility items are required for 202A.");
  const areas = new Set(items.map((item) => item.area));
  for (const area of STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_REQUIRED_AREAS_202A) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 202A area: ${area}`);
  }
  for (const item of items) {
    if (!evidenceReferenceValid(item.evidenceReference)) return baseBlocked("evidence_reference_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
    if (item.adminVisible !== true) return baseBlocked("admin_visibility_must_be_true", "Admin visibility must be true for safe-disabled control surfaces.");
    if (item.clientRuntimeEnabled !== false) return baseBlocked("client_runtime_must_remain_disabled", "Client runtime must remain disabled in 202A.");
    if (item.providerRuntimeEnabled !== false) return baseBlocked("provider_runtime_must_remain_disabled", "Provider runtime must remain disabled in 202A.");
    if (item.providerCallAllowedNow !== false) return baseBlocked("provider_call_must_remain_disabled", "Provider calls must remain disabled in 202A.");
    if (item.mediaPublishAllowedNow !== false) return baseBlocked("media_publish_must_remain_disabled", "Media/CDN runtime publish must remain disabled in 202A.");
    if (item.walletPaymentOrPayoutAllowedNow !== false) return baseBlocked("wallet_payment_or_payout_must_remain_disabled", "Wallet/payment/payout must remain disabled in 202A.");
    if (item.fakeSuccessAllowed !== false) return baseBlocked("fake_success_must_remain_blocked", "Fake success must remain blocked in 202A.");
  }
  return undefined;
}

export function prepareStreamGiftLedgerProviderVisibility202A(input: StreamGiftLedgerProviderVisibilityInput202A, rawInput?: unknown): StreamGiftLedgerProviderVisibilityResult202A {
  assertStreamGiftLedgerProviderVisibility202ARemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "202A accepts visibility evidence labels only, not raw secrets/provider tokens/responses.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 202A owner approval phrase is required for provider visibility index preparation.");
  if (input.visibilityMode !== "provider_visibility_index_only") return baseBlocked("visibility_mode_disabled", "202A can only prepare a visibility index; it cannot enable runtime, media publish, or provider calls.");
  if (input.acknowledged201BStage !== "201B_post_closure_final_handoff_clean") return baseBlocked("previous_201b_post_closure_required", "201B post-closure final handoff must be clean before 202A.");
  const blocked = validateVisibilityItems(input.visibilityItems);
  if (blocked) return blocked;
  const visibleAreas = Object.freeze(input.visibilityItems.map((item) => item.area));
  const envelope: StreamGiftLedgerProviderVisibilityEnvelope202A = Object.freeze({
    contract: "stream.gift.provider_visibility.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    previousStageRequired: "201B_post_closure_final_handoff_clean",
    requiredAreas: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_REQUIRED_AREAS_202A,
    visibleAreas,
    itemCount: input.visibilityItems.length,
    visibilityIndexPrepared: true,
    catalogVisible: true,
    mediaAssetsVisible: true,
    mediaCdnVisible: true,
    adminControlsVisible: true,
    providerNotConfiguredVisible: true,
    providerReferenceLabelsVisible: true,
    creatorPayoutBoundaryVisible: true,
    mobileContractBoundaryVisible: true,
    runtimeExecutionStillBlocked: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
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
    nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff",
  });
  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    status: "provider_visibility_index_prepared_without_runtime_enablement",
    envelope,
    visibilityIndexPrepared: true,
    providerNotConfiguredVisible: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_SAFETY,
  });
}

export function getStreamGiftLedgerProviderVisibility202AReadiness(): StreamGiftLedgerProviderVisibilityReadiness202A {
  assertStreamGiftLedgerProviderVisibility202ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    status: "ready_for_provider_visibility_index_without_runtime_enablement",
    previousStageRequired: "201B_post_closure_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff",
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_SAFETY,
  });
}

export function getStreamGiftLedgerProviderVisibility202AContract() {
  assertStreamGiftLedgerProviderVisibility202ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    contract: "stream.gift.provider_visibility.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_OWNER_APPROVAL,
    previousStageRequired: "201B_post_closure_final_handoff_clean",
    adminSurfaces: Object.freeze([
      "catalog_status",
      "media_asset_status",
      "cdn_publish_blocker",
      "provider_not_configured_banner",
      "provider_reference_label_visibility",
      "creator_payout_boundary_visibility",
      "mobile_contract_boundary_visibility",
    ]),
    accepts: "visibility evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, media runtime publish payloads, payment or payout execution data",
    noRuntimeExecution: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noMediaCdnRuntimePublish: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff",
  });
}

export function getStreamGiftLedgerProviderVisibility202ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    steps: Object.freeze([
      "Verify 201B post-closure final handoff and TypeScript are clean.",
      "Expose safe-disabled Admin visibility for gift catalog, media assets, CDN blocker, and provider_not_configured states.",
      "Keep provider reference labels visible as labels only, never raw secret values.",
      "Keep media/CDN runtime publish blocked until a separate exact approval package.",
      "Keep Wallet, payment capture, payout execution, DB write, Prisma, realtime, and fake success blocked.",
      "Prepare 202B final handoff before any future execution package.",
    ]),
    blockedOperations: Object.freeze([
      "env_read",
      "raw_secret_input",
      "provider_call",
      "provider_runtime_enablement",
      "catalog_runtime_publish",
      "media_cdn_runtime_publish",
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

export function createStreamGiftLedgerProviderVisibility202ARuntimeRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION,
    status: "runtime_execution_blocked_requires_new_exact_owner_approval",
    reason: "202A is provider visibility index only. Runtime execution, media/CDN publish, or provider enablement require a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff",
  });
}
