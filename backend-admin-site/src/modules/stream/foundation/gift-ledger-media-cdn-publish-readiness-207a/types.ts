export const STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-207A" as const;

export type StreamGiftLedgerMediaCdnPublishReadinessArea207A =
  | "previous_catalog_publish_handoff_locked"
  | "asset_policy_handoff_locked"
  | "anime_mp4_loop_manifest_visible"
  | "poster_fallback_manifest_visible"
  | "media_codec_profile_visible"
  | "cdn_path_policy_visible"
  | "storage_bucket_policy_visible"
  | "content_moderation_review_visible"
  | "provider_not_configured_visibility_locked"
  | "admin_media_cdn_review_controls_visible"
  | "media_cdn_publish_approval_boundary_locked"
  | "asset_upload_approval_boundary_locked"
  | "media_transcode_approval_boundary_locked"
  | "cdn_invalidation_approval_boundary_locked"
  | "runtime_execution_approval_boundary_locked";

export type StreamGiftLedgerMediaCdnPublishReadinessSafety207A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderResponseAccepted: false;
  readinessIndexOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  previousCatalogPublishHandoffRequired: true;
  assetPolicyHandoffRequired: true;
  animeMp4LoopManifestVisible: true;
  posterFallbackManifestVisible: true;
  mediaCodecProfileVisible: true;
  cdnPathPolicyVisible: true;
  storageBucketPolicyVisible: true;
  contentModerationReviewVisible: true;
  adminMediaCdnReviewControlsVisible: true;
  mediaCdnPublishApprovalBoundaryLocked: true;
  assetUploadApprovalBoundaryLocked: true;
  mediaTranscodeApprovalBoundaryLocked: true;
  cdnInvalidationApprovalBoundaryLocked: true;
  runtimeExecutionApprovalBoundaryLocked: true;
  mediaCdnRuntimePublishAllowedNow: false;
  assetUploadAllowedNow: false;
  mediaTranscodeAllowedNow: false;
  cdnInvalidateAllowedNow: false;
  adminMediaCdnToggleAllowedNow: false;
  adminProviderToggleAllowedNow: false;
  mediaCdnRuntimePublishExecuted: false;
  assetUploadExecuted: false;
  mediaTranscodeExecuted: false;
  cdnInvalidateExecuted: false;
  adminMediaCdnToggleExecuted: false;
  adminProviderToggleExecuted: false;
  localizationRuntimeWriteExecuted: false;
  assetRuntimePublishExecuted: false;
  catalogRuntimePublishExecuted: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  walletMutationExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecutionExecuted: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  schemaWriteExecuted: false;
  migrationExecuted: false;
  prismaGenerateExecuted: false;
  realtimeEmitExecuted: false;
  runtimeEnablementExecuted: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSendSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  futureAssetUploadRequiresSeparateApproval: true;
  futureMediaTranscodeRequiresSeparateApproval: true;
  futureCdnInvalidationRequiresSeparateApproval: true;
  futureAdminToggleRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerMediaCdnPublishReadinessInput207A = Readonly<{
  ownerApproval?: string;
  readinessMode?: "media_cdn_publish_approval_readiness_index_only" | "disabled";
  acknowledged206BStage?: "206B_catalog_publish_final_handoff_clean" | "disabled";
  evidenceReferences: readonly string[];
  readinessAreas: readonly StreamGiftLedgerMediaCdnPublishReadinessArea207A[];
  mediaProfiles: readonly string[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerMediaCdnPublishReadinessBlockedCode207A =
  | "owner_approval_required"
  | "readiness_mode_disabled"
  | "previous_206b_handoff_required"
  | "evidence_references_required"
  | "readiness_areas_required"
  | "media_profiles_required"
  | "required_media_profiles_missing"
  | "missing_required_area"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerMediaCdnPublishReadinessBlocked207A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION;
  status: "media_cdn_publish_readiness_blocked_without_runtime_enablement";
  code: StreamGiftLedgerMediaCdnPublishReadinessBlockedCode207A;
  blockedReason: string;
  readinessIndexPrepared: false;
  providerNotConfiguredVisible: true;
  mediaCdnRuntimePublishAllowedNow: false;
  assetUploadAllowedNow: false;
  mediaTranscodeAllowedNow: false;
  cdnInvalidateAllowedNow: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerMediaCdnPublishReadinessSafety207A;
}>;

export type StreamGiftLedgerMediaCdnPublishReadinessEnvelope207A = Readonly<{
  contract: "stream.gift.media-cdn.publish.readiness.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION;
  previousStageRequired: "206B_catalog_publish_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerMediaCdnPublishReadinessArea207A[];
  readinessAreas: readonly StreamGiftLedgerMediaCdnPublishReadinessArea207A[];
  evidenceReferences: readonly string[];
  mediaProfiles: readonly string[];
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  previousCatalogPublishHandoffRequired: true;
  assetPolicyHandoffRequired: true;
  animeMp4LoopManifestVisible: true;
  posterFallbackManifestVisible: true;
  mediaCodecProfileVisible: true;
  cdnPathPolicyVisible: true;
  storageBucketPolicyVisible: true;
  contentModerationReviewVisible: true;
  adminMediaCdnReviewControlsVisible: true;
  mediaCdnPublishBlocked: true;
  assetUploadBlocked: true;
  mediaTranscodeBlocked: true;
  cdnInvalidationBlocked: true;
  runtimeExecutionStillBlocked: true;
  mediaCdnRuntimePublishAllowedNow: false;
  assetUploadAllowedNow: false;
  mediaTranscodeAllowedNow: false;
  cdnInvalidateAllowedNow: false;
  adminMediaCdnToggleAllowedNow: false;
  adminProviderToggleAllowedNow: false;
  mediaCdnRuntimePublishExecuted: false;
  assetUploadExecuted: false;
  mediaTranscodeExecuted: false;
  cdnInvalidateExecuted: false;
  adminMediaCdnToggleExecuted: false;
  adminProviderToggleExecuted: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  futureAssetUploadRequiresSeparateApproval: true;
  futureMediaTranscodeRequiresSeparateApproval: true;
  futureCdnInvalidationRequiresSeparateApproval: true;
  futureAdminToggleRequiresSeparateApproval: true;
  nextStage: "207B_stream_gifts_media_cdn_publish_readiness_final_handoff";
}>;

export type StreamGiftLedgerMediaCdnPublishReadinessPrepared207A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION;
  status: "media_cdn_publish_readiness_index_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerMediaCdnPublishReadinessEnvelope207A;
  readinessIndexPrepared: true;
  providerNotConfiguredVisible: true;
  mediaCdnRuntimePublishAllowedNow: false;
  assetUploadAllowedNow: false;
  mediaTranscodeAllowedNow: false;
  cdnInvalidateAllowedNow: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerMediaCdnPublishReadinessSafety207A;
}>;

export type StreamGiftLedgerMediaCdnPublishReadinessResult207A =
  | StreamGiftLedgerMediaCdnPublishReadinessPrepared207A
  | StreamGiftLedgerMediaCdnPublishReadinessBlocked207A;

export type StreamGiftLedgerMediaCdnPublishReadinessSnapshot207A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_VERSION;
  status: "ready_for_media_cdn_publish_readiness_without_runtime_enablement";
  previousStageRequired: "206B_catalog_publish_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  previousCatalogPublishHandoffRequired: true;
  assetPolicyHandoffRequired: true;
  animeMp4LoopManifestVisible: true;
  posterFallbackManifestVisible: true;
  mediaCodecProfileVisible: true;
  cdnPathPolicyVisible: true;
  storageBucketPolicyVisible: true;
  contentModerationReviewVisible: true;
  adminMediaCdnReviewControlsVisible: true;
  mediaCdnPublishBlocked: true;
  assetUploadBlocked: true;
  mediaTranscodeBlocked: true;
  cdnInvalidationBlocked: true;
  runtimeExecutionStillBlocked: true;
  mediaCdnRuntimePublishAllowedNow: false;
  assetUploadAllowedNow: false;
  mediaTranscodeAllowedNow: false;
  cdnInvalidateAllowedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  nextStage: "207B_stream_gifts_media_cdn_publish_readiness_final_handoff";
  safety: StreamGiftLedgerMediaCdnPublishReadinessSafety207A;
}>;
