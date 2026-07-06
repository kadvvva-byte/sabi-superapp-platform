import type {
  SabiAiStreamFutureAdapterShape252I,
  SabiAiStreamFutureGenerationRequest252I,
  SabiAiStreamSafetyLocks252I,
} from './sabiAiStreamFutureAdapter252I.types';

export const sabiAiStreamFutureAdapterShapeTemplate252I: SabiAiStreamFutureAdapterShape252I = {
  adapterId: 'future-adapter-id',
  adapterCategory: 'video',
  providerDisplayLabel: 'generic_provider_label_no_brand_required_now',
  allowedPurpose: 'future_generation_after_owner_approval',
  inputContract: 'approved_draft_expansion_or_song_clip_script_contract',
  outputContract: 'generated_asset_metadata_contract_after_future_runtime',
  requiredReviewBeforeUse: true,
  ownerApprovalRequired: true,
  protectedConfigReferenceMode: 'not_set_now',
  liveEnabledNow: false,
  runtimeCallableNow: false,
} as const;

export const sabiAiStreamFutureGenerationRequestTemplate252I: SabiAiStreamFutureGenerationRequest252I = {
  requestId: 'future-request-id',
  sourceDraftId: 'local-or-future-draft-id',
  requestType: 'video',
  languageCode: 'ru',
  cultureContext: '',
  theme: '',
  ownerApprovalId: 'required-future-approval-id',
  safetyReviewId: 'required-future-safety-review-id',
  originalityReviewId: 'required-future-originality-review-id',
  youthSafetyReviewId: 'required-future-youth-review-id',
  adapterId: 'future-adapter-id',
  publicPostAllowedAfterGeneration: false,
  liveUseAllowedAfterGeneration: false,
} as const;

export const sabiAiStreamSafetyLocks252I: SabiAiStreamSafetyLocks252I = {
  localCodeArtifactOnly: true,
  noLiveBroadcastNow: true,
  noRuntimeMountNow: true,
  noAdminRouteConnectionNow: true,
  noRuntimeGenerationNow: true,
  noRuntimePostNow: true,
  noProviderCallNow: true,
  noNetworkCallNow: true,
  noProtectedConfigReadWriteNow: true,
  noDbMutationNow: true,
  noPaymentNow: true,
  noRestrictedLiveActionNow: true,
  finalActionsExecutedNow: false,
  ownerApprovalRequiredForFutureProviderConnection: true,
  ownerApprovalRequiredForFutureGeneration: true,
  ownerApprovalRequiredForPublicPost: true,
  ownerApprovalRequiredForLiveBroadcast: true,
} as const;
