export const STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-202A" as const;

export type StreamGiftLedgerProviderVisibilityArea202A =
  | "gift_catalog"
  | "gift_media_assets"
  | "gift_media_cdn"
  | "admin_controls"
  | "provider_not_configured_visibility"
  | "provider_reference_labels"
  | "localization_and_disclosures"
  | "creator_payout_boundary"
  | "mobile_contract_boundary";

export type StreamGiftLedgerProviderVisibilityStatus202A =
  | "visible_safe_disabled"
  | "blocked_provider_not_configured"
  | "admin_review_required"
  | "ready_for_future_exact_owner_approval";

export type StreamGiftLedgerProviderVisibilityItem202A = Readonly<{
  area: StreamGiftLedgerProviderVisibilityArea202A;
  status: StreamGiftLedgerProviderVisibilityStatus202A;
  evidenceReference: string;
  adminVisible: true;
  clientRuntimeEnabled: false;
  providerRuntimeEnabled: false;
  providerCallAllowedNow: false;
  mediaPublishAllowedNow: false;
  walletPaymentOrPayoutAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamGiftLedgerProviderVisibilitySafety202A = Readonly<{
  envFileReadAllowedNow: false;
  envValueReadAllowedNow: false;
  rawSecretAccepted: false;
  rawProviderTokenAccepted: false;
  rawProviderResponseAccepted: false;
  postClosure201BRequired: true;
  providerVisibilityIndexOnly: true;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  adminProviderToggleAllowedNow: false;
  providerNotConfiguredVisible: true;
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
  futureCatalogPublishRequiresSeparateApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  sourceOnly: true;
}>;

export type StreamGiftLedgerProviderVisibilityInput202A = Readonly<{
  ownerApproval?: string;
  visibilityMode?: "provider_visibility_index_only" | "disabled";
  acknowledged201BStage?: "201B_post_closure_final_handoff_clean" | "disabled";
  visibilityItems: readonly StreamGiftLedgerProviderVisibilityItem202A[];
  operatorNote?: string;
}>;

export type StreamGiftLedgerProviderVisibilityBlockedCode202A =
  | "owner_approval_required"
  | "visibility_mode_disabled"
  | "previous_201b_post_closure_required"
  | "visibility_items_required"
  | "missing_required_area"
  | "evidence_reference_required"
  | "admin_visibility_must_be_true"
  | "client_runtime_must_remain_disabled"
  | "provider_runtime_must_remain_disabled"
  | "provider_call_must_remain_disabled"
  | "media_publish_must_remain_disabled"
  | "wallet_payment_or_payout_must_remain_disabled"
  | "fake_success_must_remain_blocked"
  | "raw_secret_or_provider_value_rejected";

export type StreamGiftLedgerProviderVisibilityBlocked202A = Readonly<{
  ok: false;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION;
  status: "provider_visibility_index_blocked_without_runtime_enablement";
  code: StreamGiftLedgerProviderVisibilityBlockedCode202A;
  blockedReason: string;
  visibilityIndexPrepared: false;
  providerNotConfiguredVisible: true;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  mediaCdnRuntimePublishAllowedNow: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderVisibilitySafety202A;
}>;

export type StreamGiftLedgerProviderVisibilityEnvelope202A = Readonly<{
  contract: "stream.gift.provider_visibility.safe_disabled.v1";
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION;
  previousStageRequired: "201B_post_closure_final_handoff_clean";
  requiredAreas: readonly StreamGiftLedgerProviderVisibilityArea202A[];
  visibleAreas: readonly StreamGiftLedgerProviderVisibilityArea202A[];
  itemCount: number;
  visibilityIndexPrepared: true;
  catalogVisible: true;
  mediaAssetsVisible: true;
  mediaCdnVisible: true;
  adminControlsVisible: true;
  providerNotConfiguredVisible: true;
  providerReferenceLabelsVisible: true;
  creatorPayoutBoundaryVisible: true;
  mobileContractBoundaryVisible: true;
  runtimeExecutionStillBlocked: true;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerBindingExecuted: false;
  providerBindingActivationExecuted: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  realtimeEmitExecuted: false;
  rawSecretsIncluded: false;
  envFileRead: false;
  envValueRead: false;
  fakeSuccessWritten: false;
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true;
  futureCatalogPublishRequiresSeparateApproval: true;
  futureMediaCdnPublishRequiresSeparateApproval: true;
  nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff";
}>;

export type StreamGiftLedgerProviderVisibilityPrepared202A = Readonly<{
  ok: true;
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION;
  status: "provider_visibility_index_prepared_without_runtime_enablement";
  envelope: StreamGiftLedgerProviderVisibilityEnvelope202A;
  visibilityIndexPrepared: true;
  providerNotConfiguredVisible: true;
  runtimeExecutionApprovedNow: false;
  liveActivationExecutionPerformedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  providerPayoutCallExecuted: false;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  paymentCaptureExecuted: false;
  payoutExecuted: false;
  walletMutationExecuted: false;
  fakeSuccessWritten: false;
  safety: StreamGiftLedgerProviderVisibilitySafety202A;
}>;

export type StreamGiftLedgerProviderVisibilityResult202A =
  | StreamGiftLedgerProviderVisibilityPrepared202A
  | StreamGiftLedgerProviderVisibilityBlocked202A;

export type StreamGiftLedgerProviderVisibilityReadiness202A = Readonly<{
  version: typeof STREAM_GIFT_LEDGER_PROVIDER_VISIBILITY_202A_VERSION;
  status: "ready_for_provider_visibility_index_without_runtime_enablement";
  previousStageRequired: "201B_post_closure_final_handoff_clean";
  backendReadinessPercent: 100;
  providerNotConfiguredVisible: true;
  runtimeExecutionStillBlocked: true;
  catalogRuntimePublishAllowedNow: false;
  mediaCdnRuntimePublishAllowedNow: false;
  providerRuntimeEnabled: false;
  providerLiveCallExecuted: false;
  nextStage: "202B_stream_gifts_admin_provider_visibility_final_handoff";
  safety: StreamGiftLedgerProviderVisibilitySafety202A;
}>;
