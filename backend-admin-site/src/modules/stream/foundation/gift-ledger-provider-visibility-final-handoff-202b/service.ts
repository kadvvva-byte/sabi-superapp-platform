import {
  STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
  type StreamGiftLedgerProviderVisibilityFinalHandoffArea202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffBlocked202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffBlockedCode202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffEnvelope202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffInput202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffReadiness202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffResult202B,
  type StreamGiftLedgerProviderVisibilityFinalHandoffSafety202B,
} from "./types";

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_OWNER_APPROVAL =
  "I_APPROVE_202B_STREAM_GIFTS_PROVIDER_VISIBILITY_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_202B = Object.freeze([
  "gift_catalog_visibility",
  "gift_media_asset_visibility",
  "gift_media_cdn_blocker_visibility",
  "admin_controls_visibility",
  "provider_not_configured_banner",
  "provider_reference_label_visibility",
  "creator_payout_boundary_visibility",
  "mobile_contract_boundary_visibility",
  "future_approval_boundary_visibility",
] as const satisfies readonly StreamGiftLedgerProviderVisibilityFinalHandoffArea202B[]);

export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_SAFETY: StreamGiftLedgerProviderVisibilityFinalHandoffSafety202B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  providerVisibilityFinalHandoffOnly: true,
  providerNotConfiguredVisible: true,
  catalogRuntimePublishAllowedNow: false,
  mediaCdnRuntimePublishAllowedNow: false,
  adminProviderToggleAllowedNow: false,
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

function normalizeEvidenceReferences(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  return Object.freeze(value.map(normalizeString).filter((entry): entry is string => !!entry));
}

function normalizeVisibleAreas(value: unknown): readonly StreamGiftLedgerProviderVisibilityFinalHandoffArea202B[] {
  if (!Array.isArray(value)) return Object.freeze([]);
  const allowed = new Set(STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_202B);
  return Object.freeze(
    value
      .map(normalizeString)
      .filter((entry): entry is StreamGiftLedgerProviderVisibilityFinalHandoffArea202B => !!entry && allowed.has(entry as StreamGiftLedgerProviderVisibilityFinalHandoffArea202B)),
  );
}

export function normalizeStreamGiftLedgerProviderVisibilityFinalHandoff202BInput(raw: Record<string, unknown>): StreamGiftLedgerProviderVisibilityFinalHandoffInput202B {
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    handoffMode: normalizeString(raw.handoffMode) as StreamGiftLedgerProviderVisibilityFinalHandoffInput202B["handoffMode"],
    acknowledged202AStage: normalizeString(raw.acknowledged202AStage) as StreamGiftLedgerProviderVisibilityFinalHandoffInput202B["acknowledged202AStage"],
    evidenceReferences: normalizeEvidenceReferences(raw.evidenceReferences),
    visibleAreas: normalizeVisibleAreas(raw.visibleAreas),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerProviderVisibilityFinalHandoff202BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_SAFETY;
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-202B safety invariant failed: final handoff must not enable runtime/provider/media/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerProviderVisibilityFinalHandoffBlockedCode202B, blockedReason: string): StreamGiftLedgerProviderVisibilityFinalHandoffBlocked202B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    status: "provider_visibility_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|admin_note|owner_note):[a-z0-9_./:-]{4,180}$/i.test(value);
}

function validateFinalHandoffEvidence(input: StreamGiftLedgerProviderVisibilityFinalHandoffInput202B): StreamGiftLedgerProviderVisibilityFinalHandoffBlocked202B | undefined {
  if (!input.evidenceReferences.length) return baseBlocked("evidence_references_required", "202B final handoff requires 202A evidence references, not raw provider values.");
  if (!input.visibleAreas.length) return baseBlocked("visible_areas_required", "202B final handoff requires visible safe-disabled Admin areas.");
  for (const reference of input.evidenceReferences) {
    if (!evidenceReferenceValid(reference)) return baseBlocked("evidence_references_required", "Evidence must be a report:/handoff:/checker:/tsc:/admin_note:/owner_note: reference, never raw secrets/provider values.");
  }
  const areas = new Set(input.visibleAreas);
  for (const area of STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_202B) {
    if (!areas.has(area)) return baseBlocked("missing_required_area", `Missing required 202B final handoff area: ${area}`);
  }
  return undefined;
}

export function prepareStreamGiftLedgerProviderVisibilityFinalHandoff202B(
  input: StreamGiftLedgerProviderVisibilityFinalHandoffInput202B,
  rawInput?: unknown,
): StreamGiftLedgerProviderVisibilityFinalHandoffResult202B {
  assertStreamGiftLedgerProviderVisibilityFinalHandoff202BRemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "202B accepts evidence labels only, not raw secrets/provider tokens/responses.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 202B owner approval phrase is required for provider visibility final handoff.");
  if (input.handoffMode !== "provider_visibility_final_handoff_only") return baseBlocked("handoff_mode_disabled", "202B is final handoff only; it cannot enable provider/runtime/media publish/payment/payout.");
  if (input.acknowledged202AStage !== "202A_provider_visibility_index_clean") return baseBlocked("previous_202a_visibility_index_required", "202A provider visibility index must be clean before 202B.");
  const blocked = validateFinalHandoffEvidence(input);
  if (blocked) return blocked;

  const envelope: StreamGiftLedgerProviderVisibilityFinalHandoffEnvelope202B = Object.freeze({
    contract: "stream.gift.provider_visibility.final_handoff.safe_disabled.v1",
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    previousStageRequired: "202A_provider_visibility_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_202B,
    visibleAreas: Object.freeze([...input.visibleAreas]),
    evidenceReferences: Object.freeze([...input.evidenceReferences]),
    finalHandoffPrepared: true,
    providerNotConfiguredVisible: true,
    adminControlsVisible: true,
    catalogVisibilityClosed: true,
    mediaAssetVisibilityClosed: true,
    mediaCdnBlockerVisibilityClosed: true,
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
    adminProviderToggleExecuted: false,
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
    nextStage: "closed_stream_gifts_admin_provider_visibility_future_runtime_requires_exact_owner_approval",
  });

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    status: "provider_visibility_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_SAFETY,
  });
}

export function getStreamGiftLedgerProviderVisibilityFinalHandoff202BReadiness(): StreamGiftLedgerProviderVisibilityFinalHandoffReadiness202B {
  assertStreamGiftLedgerProviderVisibilityFinalHandoff202BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    status: "ready_for_provider_visibility_final_handoff_without_runtime_enablement",
    previousStageRequired: "202A_provider_visibility_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    runtimeExecutionStillBlocked: true,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_stream_gifts_admin_provider_visibility_future_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_SAFETY,
  });
}

export function getStreamGiftLedgerProviderVisibilityFinalHandoff202BContract() {
  assertStreamGiftLedgerProviderVisibilityFinalHandoff202BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    contract: "stream.gift.provider_visibility.final_handoff.safe_disabled.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_OWNER_APPROVAL,
    previousStageRequired: "202A_provider_visibility_index_clean",
    requiredAreas: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_REQUIRED_AREAS_202B,
    accepts: "202A report/handoff/checker/tsc evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, media runtime publish payloads, provider toggles, payment or payout execution data",
    noRuntimeExecution: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noMediaCdnRuntimePublish: true,
    noAdminProviderToggle: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "closed_stream_gifts_admin_provider_visibility_future_runtime_requires_exact_owner_approval",
  });
}

export function getStreamGiftLedgerProviderVisibilityFinalHandoff202BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    steps: Object.freeze([
      "Verify 202A provider visibility index and TypeScript are clean.",
      "Close the Admin-visible safe-disabled surfaces for catalog, media assets, CDN blocker, and provider_not_configured state.",
      "Keep provider reference labels visible as labels only, never raw secret values.",
      "Keep media/CDN runtime publish blocked until a separate exact approval package.",
      "Keep provider runtime, Wallet, payment capture, payout execution, DB write, Prisma, realtime, and fake success blocked.",
      "Treat future execution as a new exact owner approval flow, not a continuation of 202B.",
    ]),
    blockedOperations: Object.freeze([
      "env_read",
      "raw_secret_input",
      "provider_call",
      "provider_runtime_enablement",
      "admin_provider_toggle",
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

export function createStreamGiftLedgerProviderVisibilityFinalHandoff202BRuntimeRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_FINAL_HANDOFF_202B_VERSION,
    status: "runtime_execution_blocked_requires_new_exact_owner_approval",
    reason: "202B is final handoff only. Runtime execution, media/CDN publish, provider toggle, or provider enablement require a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    catalogRuntimePublishAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    adminProviderToggleExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "closed_stream_gifts_admin_provider_visibility_future_runtime_requires_exact_owner_approval",
  });
}
