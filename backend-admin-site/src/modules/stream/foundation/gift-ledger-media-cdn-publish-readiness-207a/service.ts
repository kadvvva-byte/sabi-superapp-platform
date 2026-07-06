import {
  STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
  type StreamGiftLedgerMediaCdnPublishReadinessArea207A,
  type StreamGiftLedgerMediaCdnPublishReadinessBlocked207A,
  type StreamGiftLedgerMediaCdnPublishReadinessInput207A,
  type StreamGiftLedgerMediaCdnPublishReadinessPrepared207A,
  type StreamGiftLedgerMediaCdnPublishReadinessResult207A,
  type StreamGiftLedgerMediaCdnPublishReadinessSafety207A,
  type StreamGiftLedgerMediaCdnPublishReadinessSnapshot207A,
} from "./types";

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_OWNER_APPROVAL =
  "I_APPROVE_207A_STREAM_GIFTS_MEDIA_CDN_PUBLISH_READINESS_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_PROFILES_207A = [
  "anime_mp4_loop",
  "poster_fallback",
  "cdn_delivery_policy",
] as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_AREAS_207A: readonly StreamGiftLedgerMediaCdnPublishReadinessArea207A[] = [
  "previous_catalog_publish_handoff_locked",
  "asset_policy_handoff_locked",
  "anime_mp4_loop_manifest_visible",
  "poster_fallback_manifest_visible",
  "media_codec_profile_visible",
  "cdn_path_policy_visible",
  "storage_bucket_policy_visible",
  "content_moderation_review_visible",
  "provider_not_configured_visibility_locked",
  "admin_media_cdn_review_controls_visible",
  "media_cdn_publish_approval_boundary_locked",
  "asset_upload_approval_boundary_locked",
  "media_transcode_approval_boundary_locked",
  "cdn_invalidation_approval_boundary_locked",
  "runtime_execution_approval_boundary_locked",
] as const;

const RAW_SECRET_MARKERS_207A = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY: StreamGiftLedgerMediaCdnPublishReadinessSafety207A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previousCatalogPublishHandoffRequired: true,
  assetPolicyHandoffRequired: true,
  animeMp4LoopManifestVisible: true,
  posterFallbackManifestVisible: true,
  mediaCodecProfileVisible: true,
  cdnPathPolicyVisible: true,
  storageBucketPolicyVisible: true,
  contentModerationReviewVisible: true,
  adminMediaCdnReviewControlsVisible: true,
  mediaCdnPublishApprovalBoundaryLocked: true,
  assetUploadApprovalBoundaryLocked: true,
  mediaTranscodeApprovalBoundaryLocked: true,
  cdnInvalidationApprovalBoundaryLocked: true,
  runtimeExecutionApprovalBoundaryLocked: true,
  mediaCdnRuntimePublishAllowedNow: false,
  assetUploadAllowedNow: false,
  mediaTranscodeAllowedNow: false,
  cdnInvalidateAllowedNow: false,
  adminMediaCdnToggleAllowedNow: false,
  adminProviderToggleAllowedNow: false,
  mediaCdnRuntimePublishExecuted: false,
  assetUploadExecuted: false,
  mediaTranscodeExecuted: false,
  cdnInvalidateExecuted: false,
  adminMediaCdnToggleExecuted: false,
  adminProviderToggleExecuted: false,
  localizationRuntimeWriteExecuted: false,
  assetRuntimePublishExecuted: false,
  catalogRuntimePublishExecuted: false,
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
  futureMediaCdnPublishRequiresSeparateApproval: true,
  futureAssetUploadRequiresSeparateApproval: true,
  futureMediaTranscodeRequiresSeparateApproval: true,
  futureCdnInvalidationRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
});

const defaultEvidenceReferences207A = Object.freeze([
  "206B_catalog_publish_readiness_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
  "anime_mp4_loop_and_poster_fallback_manifest_visible",
  "media_cdn_publish_boundary_locked_no_runtime",
] as const);

function containsRawSecretOrProviderValue207A(input: StreamGiftLedgerMediaCdnPublishReadinessInput207A): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    mediaProfiles: input.mediaProfiles,
  });
  return RAW_SECRET_MARKERS_207A.some((marker) => payload.includes(marker));
}

function blocked207A(
  code: StreamGiftLedgerMediaCdnPublishReadinessBlocked207A["code"],
  blockedReason: string,
): StreamGiftLedgerMediaCdnPublishReadinessBlocked207A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    status: "media_cdn_publish_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessIndexPrepared: false,
    providerNotConfiguredVisible: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY,
  });
}

export function normalizeStreamGiftLedgerMediaCdnPublishReadinessInput207A(
  input?: Partial<StreamGiftLedgerMediaCdnPublishReadinessInput207A>,
): StreamGiftLedgerMediaCdnPublishReadinessInput207A {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    readinessMode: input?.readinessMode ?? "disabled",
    acknowledged206BStage: input?.acknowledged206BStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences207A)]),
    readinessAreas: Object.freeze([...(input?.readinessAreas ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_AREAS_207A)]),
    mediaProfiles: Object.freeze([...(input?.mediaProfiles ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_PROFILES_207A)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerMediaCdnPublishReadiness207ARemainsSafe(): StreamGiftLedgerMediaCdnPublishReadinessSafety207A {
  return STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY;
}

export function getStreamGiftLedgerMediaCdnPublishReadiness207A(): StreamGiftLedgerMediaCdnPublishReadinessSnapshot207A {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    status: "ready_for_media_cdn_publish_readiness_without_runtime_enablement",
    previousStageRequired: "206B_catalog_publish_final_handoff_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previousCatalogPublishHandoffRequired: true,
    assetPolicyHandoffRequired: true,
    animeMp4LoopManifestVisible: true,
    posterFallbackManifestVisible: true,
    mediaCodecProfileVisible: true,
    cdnPathPolicyVisible: true,
    storageBucketPolicyVisible: true,
    contentModerationReviewVisible: true,
    adminMediaCdnReviewControlsVisible: true,
    mediaCdnPublishBlocked: true,
    assetUploadBlocked: true,
    mediaTranscodeBlocked: true,
    cdnInvalidationBlocked: true,
    runtimeExecutionStillBlocked: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "207B_stream_gifts_media_cdn_publish_readiness_final_handoff",
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY,
  });
}

export function prepareStreamGiftLedgerMediaCdnPublishReadiness207A(
  input?: Partial<StreamGiftLedgerMediaCdnPublishReadinessInput207A>,
): StreamGiftLedgerMediaCdnPublishReadinessResult207A {
  const normalized = normalizeStreamGiftLedgerMediaCdnPublishReadinessInput207A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_OWNER_APPROVAL) {
    return blocked207A("owner_approval_required", "207A requires explicit owner approval phrase for readiness index only.");
  }
  if (normalized.readinessMode !== "media_cdn_publish_approval_readiness_index_only") {
    return blocked207A("readiness_mode_disabled", "207A readiness mode must remain index-only and disabled for runtime.");
  }
  if (normalized.acknowledged206BStage !== "206B_catalog_publish_final_handoff_clean") {
    return blocked207A("previous_206b_handoff_required", "206B catalog publish final handoff must be acknowledged before 207A.");
  }
  if (normalized.evidenceReferences.length < 2) {
    return blocked207A("evidence_references_required", "At least two safe evidence references are required.");
  }
  if (normalized.readinessAreas.length === 0) {
    return blocked207A("readiness_areas_required", "Readiness areas are required.");
  }
  if (normalized.mediaProfiles.length === 0) {
    return blocked207A("media_profiles_required", "Media profiles are required.");
  }
  for (const profile of STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_PROFILES_207A) {
    if (!normalized.mediaProfiles.includes(profile)) {
      return blocked207A("required_media_profiles_missing", `Missing required media profile: ${profile}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_AREAS_207A) {
    if (!normalized.readinessAreas.includes(area)) {
      return blocked207A("missing_required_area", `Missing required 207A area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue207A(normalized)) {
    return blocked207A("raw_secret_or_provider_value_rejected", "207A rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.media-cdn.publish.readiness.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    previousStageRequired: "206B_catalog_publish_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_AREAS_207A,
    readinessAreas: normalized.readinessAreas,
    evidenceReferences: normalized.evidenceReferences,
    mediaProfiles: normalized.mediaProfiles,
    readinessIndexPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    previousCatalogPublishHandoffRequired: true as const,
    assetPolicyHandoffRequired: true as const,
    animeMp4LoopManifestVisible: true as const,
    posterFallbackManifestVisible: true as const,
    mediaCodecProfileVisible: true as const,
    cdnPathPolicyVisible: true as const,
    storageBucketPolicyVisible: true as const,
    contentModerationReviewVisible: true as const,
    adminMediaCdnReviewControlsVisible: true as const,
    mediaCdnPublishBlocked: true as const,
    assetUploadBlocked: true as const,
    mediaTranscodeBlocked: true as const,
    cdnInvalidationBlocked: true as const,
    runtimeExecutionStillBlocked: true as const,
    mediaCdnRuntimePublishAllowedNow: false as const,
    assetUploadAllowedNow: false as const,
    mediaTranscodeAllowedNow: false as const,
    cdnInvalidateAllowedNow: false as const,
    adminMediaCdnToggleAllowedNow: false as const,
    adminProviderToggleAllowedNow: false as const,
    mediaCdnRuntimePublishExecuted: false as const,
    assetUploadExecuted: false as const,
    mediaTranscodeExecuted: false as const,
    cdnInvalidateExecuted: false as const,
    adminMediaCdnToggleExecuted: false as const,
    adminProviderToggleExecuted: false as const,
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
    futureMediaCdnPublishRequiresSeparateApproval: true as const,
    futureAssetUploadRequiresSeparateApproval: true as const,
    futureMediaTranscodeRequiresSeparateApproval: true as const,
    futureCdnInvalidationRequiresSeparateApproval: true as const,
    futureAdminToggleRequiresSeparateApproval: true as const,
    nextStage: "207B_stream_gifts_media_cdn_publish_readiness_final_handoff" as const,
  });

  const prepared: StreamGiftLedgerMediaCdnPublishReadinessPrepared207A = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    status: "media_cdn_publish_readiness_index_prepared_without_runtime_enablement",
    envelope,
    readinessIndexPrepared: true,
    providerNotConfiguredVisible: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerMediaCdnPublishReadiness207AContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_OWNER_APPROVAL,
    readinessMode: "media_cdn_publish_approval_readiness_index_only" as const,
    requiredPreviousStage: "206B_catalog_publish_final_handoff_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_AREAS_207A,
    requiredMediaProfiles: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_REQUIRED_PROFILES_207A,
    providerNotConfiguredVisible: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_SAFETY,
  });
}

export function getStreamGiftLedgerMediaCdnPublishReadiness207ARunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    steps: Object.freeze([
      "Confirm 206B catalog publish readiness final handoff passed.",
      "Confirm 204B asset policy final handoff passed.",
      "Verify anime MP4 loop, poster fallback, codec profile, CDN path, and storage bucket policy visibility.",
      "Keep media/CDN publish, asset upload, transcode, CDN invalidation, Admin toggle, provider runtime, Wallet, DB, and realtime disabled.",
      "Require separate exact owner approval before any future media/CDN publish package.",
    ] as const),
    runtimeActionsAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
  });
}

export function createStreamGiftLedgerMediaCdnPublishReadiness207APublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    status: "media_cdn_publish_request_blocked_requires_separate_exact_owner_approval",
    providerNotConfiguredVisible: true,
    futureMediaCdnPublishRequiresSeparateApproval: true,
    mediaCdnRuntimePublishExecuted: false,
    assetUploadExecuted: false,
    mediaTranscodeExecuted: false,
    cdnInvalidateExecuted: false,
    providerRuntimeEnabled: false,
    fakeSuccessWritten: false,
  });
}

export function createStreamGiftLedgerMediaCdnPublishReadiness207AAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION,
    status: "admin_media_cdn_toggle_blocked_requires_separate_exact_owner_approval",
    adminMediaCdnToggleExecuted: false,
    adminProviderToggleExecuted: false,
    providerRuntimeEnabled: false,
    mediaCdnRuntimePublishExecuted: false,
    fakeSuccessWritten: false,
  });
}

