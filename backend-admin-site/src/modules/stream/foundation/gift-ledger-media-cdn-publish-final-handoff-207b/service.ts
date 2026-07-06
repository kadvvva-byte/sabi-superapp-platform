import {
  STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffArea207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffBlocked207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffInput207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffPrepared207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffResult207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffSafety207B,
  type StreamGiftLedgerMediaCdnPublishFinalHandoffSnapshot207B,
} from "./types";

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_OWNER_APPROVAL =
  "I_APPROVE_207B_STREAM_GIFTS_MEDIA_CDN_PUBLISH_READINESS_FINAL_HANDOFF_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_PROFILES_207B = [
  "anime_mp4_loop",
  "poster_fallback",
  "cdn_delivery_policy",
] as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_207B: readonly StreamGiftLedgerMediaCdnPublishFinalHandoffArea207B[] = [
  "previous_207a_readiness_index_locked",
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
  "admin_toggle_approval_boundary_locked",
  "runtime_execution_approval_boundary_locked",
  "final_handoff_locked",
] as const;

const RAW_SECRET_MARKERS_207B = [
  "sk_live_",
  "pk_live_",
  "AKIA",
  "AIza",
  ["-----BEGIN", "PRIVATE KEY-----"].join(" "),
  "provider_secret_value",
  "raw_provider_response",
  "purchase_token_value",
] as const;

export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY: StreamGiftLedgerMediaCdnPublishFinalHandoffSafety207B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  finalHandoffOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous207AReadinessIndexRequired: true,
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
  adminToggleApprovalBoundaryLocked: true,
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

const defaultEvidenceReferences207B = Object.freeze([
  "207A_media_cdn_publish_readiness_index_passed",
  "206B_catalog_publish_readiness_final_handoff_passed",
  "204B_asset_policy_final_handoff_passed",
  "media_cdn_publish_boundary_closed_no_runtime",
] as const);

function containsRawSecretOrProviderValue207B(input: StreamGiftLedgerMediaCdnPublishFinalHandoffInput207B): boolean {
  const payload = JSON.stringify({
    evidenceReferences: input.evidenceReferences,
    operatorNote: input.operatorNote ?? "",
    mediaProfiles: input.mediaProfiles,
  });
  return RAW_SECRET_MARKERS_207B.some((marker) => payload.includes(marker));
}

function blocked207B(
  code: StreamGiftLedgerMediaCdnPublishFinalHandoffBlocked207B["code"],
  blockedReason: string,
): StreamGiftLedgerMediaCdnPublishFinalHandoffBlocked207B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    status: "media_cdn_publish_final_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    finalHandoffPrepared: false,
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
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY,
  });
}

export function normalizeStreamGiftLedgerMediaCdnPublishFinalHandoffInput207B(
  input?: Partial<StreamGiftLedgerMediaCdnPublishFinalHandoffInput207B>,
): StreamGiftLedgerMediaCdnPublishFinalHandoffInput207B {
  return Object.freeze({
    ownerApproval: input?.ownerApproval,
    handoffMode: input?.handoffMode ?? "disabled",
    acknowledged207AStage: input?.acknowledged207AStage ?? "disabled",
    evidenceReferences: Object.freeze([...(input?.evidenceReferences ?? defaultEvidenceReferences207B)]),
    handoffAreas: Object.freeze([...(input?.handoffAreas ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_207B)]),
    mediaProfiles: Object.freeze([...(input?.mediaProfiles ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_PROFILES_207B)]),
    operatorNote: input?.operatorNote,
  });
}

export function assertStreamGiftLedgerMediaCdnPublishFinalHandoff207BRemainsSafe(): StreamGiftLedgerMediaCdnPublishFinalHandoffSafety207B {
  return STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY;
}

export function getStreamGiftLedgerMediaCdnPublishFinalHandoff207B(): StreamGiftLedgerMediaCdnPublishFinalHandoffSnapshot207B {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    status: "ready_for_media_cdn_publish_readiness_final_handoff_without_runtime_enablement",
    previousStageRequired: "207A_media_cdn_publish_readiness_index_clean",
    backendReadinessPercent: 100,
    providerNotConfiguredVisible: true,
    previous207AReadinessIndexRequired: true,
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
    adminToggleBlocked: true,
    runtimeExecutionStillBlocked: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_stream_gifts_media_cdn_publish_readiness_future_publish_or_runtime_requires_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY,
  });
}

export function prepareStreamGiftLedgerMediaCdnPublishFinalHandoff207B(
  input?: Partial<StreamGiftLedgerMediaCdnPublishFinalHandoffInput207B>,
): StreamGiftLedgerMediaCdnPublishFinalHandoffResult207B {
  const normalized = normalizeStreamGiftLedgerMediaCdnPublishFinalHandoffInput207B(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_OWNER_APPROVAL) {
    return blocked207B("owner_approval_required", "207B requires explicit owner approval phrase for final handoff only.");
  }
  if (normalized.handoffMode !== "media_cdn_publish_readiness_final_handoff_only") {
    return blocked207B("handoff_mode_disabled", "207B handoff mode must remain final-handoff-only and disabled for runtime.");
  }
  if (normalized.acknowledged207AStage !== "207A_media_cdn_publish_readiness_index_clean") {
    return blocked207B("previous_207a_readiness_required", "207A media/CDN publish readiness index must be acknowledged before 207B.");
  }
  if (normalized.evidenceReferences.length < 2) {
    return blocked207B("evidence_references_required", "At least two safe evidence references are required.");
  }
  if (normalized.handoffAreas.length === 0) {
    return blocked207B("handoff_areas_required", "Final handoff areas are required.");
  }
  if (normalized.mediaProfiles.length === 0) {
    return blocked207B("media_profiles_required", "Media profiles are required.");
  }
  for (const profile of STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_PROFILES_207B) {
    if (!normalized.mediaProfiles.includes(profile)) {
      return blocked207B("required_media_profiles_missing", `Missing required media profile: ${profile}.`);
    }
  }
  for (const area of STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_207B) {
    if (!normalized.handoffAreas.includes(area)) {
      return blocked207B("missing_required_area", `Missing required 207B area: ${area}.`);
    }
  }
  if (containsRawSecretOrProviderValue207B(normalized)) {
    return blocked207B("raw_secret_or_provider_value_rejected", "207B rejects raw secrets, provider tokens, provider responses, and purchase tokens.");
  }

  const envelope = Object.freeze({
    contract: "stream.gift.media-cdn.publish.final-handoff.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    previousStageRequired: "207A_media_cdn_publish_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_207B,
    handoffAreas: normalized.handoffAreas,
    evidenceReferences: normalized.evidenceReferences,
    mediaProfiles: normalized.mediaProfiles,
    finalHandoffPrepared: true as const,
    providerNotConfiguredVisible: true as const,
    previous207AReadinessIndexRequired: true as const,
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
    adminToggleBlocked: true as const,
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
    nextStage: "closed_stream_gifts_media_cdn_publish_readiness_future_publish_or_runtime_requires_exact_owner_approval" as const,
  });

  const prepared: StreamGiftLedgerMediaCdnPublishFinalHandoffPrepared207B = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    status: "media_cdn_publish_readiness_final_handoff_prepared_without_runtime_enablement",
    envelope,
    finalHandoffPrepared: true,
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
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerMediaCdnPublishFinalHandoff207BContract() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_OWNER_APPROVAL,
    handoffMode: "media_cdn_publish_readiness_final_handoff_only" as const,
    requiredPreviousStage: "207A_media_cdn_publish_readiness_index_clean" as const,
    requiredAreas: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_AREAS_207B,
    requiredMediaProfiles: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_REQUIRED_PROFILES_207B,
    providerNotConfiguredVisible: true,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
    safety: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_SAFETY,
  });
}

export function getStreamGiftLedgerMediaCdnPublishFinalHandoff207BRunbook() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    steps: Object.freeze([
      "Confirm 207A media/CDN publish readiness index passed.",
      "Confirm 206B catalog publish final handoff and 204B asset policy final handoff passed.",
      "Close anime MP4 loop, poster fallback, codec profile, CDN path, and storage policy visibility as handoff-only.",
      "Keep media/CDN publish, asset upload, transcode, CDN invalidation, Admin toggle, provider runtime, Wallet, DB, and realtime disabled.",
      "Require separate exact owner approval before any future media/CDN publish or runtime package.",
    ] as const),
    runtimeActionsAllowedNow: false,
    mediaCdnRuntimePublishAllowedNow: false,
    assetUploadAllowedNow: false,
    mediaTranscodeAllowedNow: false,
    cdnInvalidateAllowedNow: false,
  });
}

export function createStreamGiftLedgerMediaCdnPublishFinalHandoff207BPublishRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
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

export function createStreamGiftLedgerMediaCdnPublishFinalHandoff207BAdminToggleRequest() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_VERSION,
    status: "admin_media_cdn_toggle_blocked_requires_separate_exact_owner_approval",
    adminMediaCdnToggleExecuted: false,
    adminProviderToggleExecuted: false,
    providerRuntimeEnabled: false,
    mediaCdnRuntimePublishExecuted: false,
    fakeSuccessWritten: false,
  });
}

