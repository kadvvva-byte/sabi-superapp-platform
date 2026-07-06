export const STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-204B" as const;

export type StreamGiftLedgerAssetPolicyFinalHandoffArea204B =
  | "anime_style_gift_quality_policy_locked"
  | "anime_mp4_loop_policy_locked"
  | "poster_fallback_policy_locked"
  | "asset_manifest_visibility_locked"
  | "media_cdn_provider_not_configured_visibility_locked"
  | "localization_quality_all_languages_locked"
  | "admin_asset_quality_controls_visibility_locked"
  | "asset_publish_blocker_locked"
  | "future_asset_publish_approval_boundary_locked"
  | "post_204a_final_handoff_closure";

export type StreamGiftLedgerAssetPolicyFinalHandoffSafety204B = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderResponseAccepted: false;
  finalHandoffOnlyNoRuntime: true;
  providerNotConfiguredVisible: true;
  animeStyleGiftQualityRequired: true;
  animeMp4LoopPolicyVisible: true;
  posterFallbackRequired: true;
  localizationQualityRequiredAllLanguages: true;
  assetManifestVisible: true;
  adminAssetQualityControlsVisible: true;
  assetRuntimePublishAllowedNow: false;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminAssetQualityToggleAllowedNow: false;
  adminCatalogToggleAllowedNow: false;
  adminMediaCdnToggleAllowedNow: false;
  adminProviderToggleAllowedNow: false;
  assetUploadExecuted: false;
  mediaTranscodeExecuted: false;
  cdnInvalidateExecuted: false;
  assetRuntimePublishExecuted: false;
  catalogRuntimePublishExecuted: false;
  mediaCdnRuntimePublishExecuted: false;
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
  futureAssetPublishRequiresSeparateApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  futureAdminToggleRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerAssetPolicyFinalHandoffInput204B = Readonly<{
  ownerApproval?: string;
  handoffMode?: "gift_asset_policy_final_handoff_only" | "disabled";
  acknowledged204AStage?: "204A_asset_policy_readiness_index_clean" | "disabled";
  evidenceReferences: readonly string[];
  closedAreas: readonly StreamGiftLedgerAssetPolicyFinalHandoffArea204B[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerAssetPolicyFinalHandoffBlockedCode204B =
  | "owner_approval_required"
  | "handoff_mode_disabled"
  | "previous_204a_readiness_required"
  | "evidence_references_required"
  | "closed_areas_required"
  | "missing_required_area"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerAssetPolicyFinalHandoffBlocked204B = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION;
  status: "gift_asset_policy_final_handoff_blocked_without_runtime_enablement";
  code: StreamGiftLedgerAssetPolicyFinalHandoffBlockedCode204B;
  blockedReason: string;
  finalHandoffPrepared: false;
  providerNotConfiguredVisible: true;
  assetRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminAssetQualityToggleAllowedNow: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerAssetPolicyFinalHandoffSafety204B;
}>;

export type StreamGiftLedgerAssetPolicyFinalHandoffEnvelope204B = Readonly<{
  contract: "stream.gift.asset_policy.final_handoff.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION;
  previousStageRequired: "204A_asset_policy_readiness_index_clean";
  requiredAreas: readonly StreamGiftLedgerAssetPolicyFinalHandoffArea204B[];
  closedAreas: readonly StreamGiftLedgerAssetPolicyFinalHandoffArea204B[];
  evidenceReferences: readonly string[];
  finalHandoffPrepared: true;
  providerNotConfiguredVisible: true;
  animeStyleGiftQualityRequired: true;
  animeMp4LoopPolicyVisible: true;
  posterFallbackRequired: true;
  assetManifestVisible: true;
  localizationQualityRequiredAllLanguages: true;
  adminAssetQualityControlsVisible: true;
  assetPublishBlocked: true;
  mediaCdnPublishBlocked: true;
  adminAssetQualityToggleBlocked: true;
  futureAssetPublishApprovalBoundaryVisible: true;
  runtimeExecutionStillBlocked: true;
  assetRuntimePublishAllowedNow: false;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminAssetQualityToggleAllowedNow: false;
  adminCatalogToggleAllowedNow: false;
  adminMediaCdnToggleAllowedNow: false;
  adminProviderToggleExecuted: false;
  assetUploadExecuted: false;
  mediaTranscodeExecuted: false;
  cdnInvalidateExecuted: false;
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
  futureAssetPublishRequiresSeparateApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  futureAdminToggleRequiresSeparateApproval: true;
  nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval";
}>;

export type StreamGiftLedgerAssetPolicyFinalHandoffPrepared204B = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION;
  status: "gift_asset_policy_final_handoff_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerAssetPolicyFinalHandoffEnvelope204B;
  finalHandoffPrepared: true;
  providerNotConfiguredVisible: true;
  assetRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminAssetQualityToggleAllowedNow: false;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerAssetPolicyFinalHandoffSafety204B;
}>;

export type StreamGiftLedgerAssetPolicyFinalHandoffResult204B =
  | StreamGiftLedgerAssetPolicyFinalHandoffPrepared204B
  | StreamGiftLedgerAssetPolicyFinalHandoffBlocked204B;

export type StreamGiftLedgerAssetPolicyFinalHandoffSnapshot204B = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_ASSET_POLICY_FINAL_HANDOFF_204B_VERSION;
  status: "ready_for_gift_asset_policy_final_handoff_without_runtime_enablement";
  previousStageRequired: "204A_asset_policy_readiness_index_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  animeStyleGiftQualityRequired: true;
  animeMp4LoopPolicyVisible: true;
  posterFallbackRequired: true;
  localizationQualityRequiredAllLanguages: true;
  runtimeExecutionStillBlocked: true;
  assetRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminAssetQualityToggleAllowedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  nextStage: "closed_stream_gifts_asset_policy_future_asset_publish_or_runtime_requires_exact_owner_approval";
  safety: StreamGiftLedgerAssetPolicyFinalHandoffSafety204B;
}>;
