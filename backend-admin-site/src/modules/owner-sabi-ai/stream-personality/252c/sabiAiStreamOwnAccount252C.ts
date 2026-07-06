import type {
  SabiAiStreamDraftGalleryItem252C,
  SabiAiStreamOwnAccountProfile252C,
  SabiAiStreamPostingGate252C,
  SabiAiStreamSafetyLocks252C,
} from './sabiAiStreamOwnAccount252C.types';

export const sabiAiStreamOwnAccountProfile252C: SabiAiStreamOwnAccountProfile252C = {
  accountOwner: 'Sabi AI',
  accountType: 'official_sabi_ai_stream_personality',
  publicModeBeforeLive: 'training_and_original_clips_preparation',
  liveStatusNow: 'not_on_air',
  canShowProfileNowAfterFutureUiApproval: true,
  canPostPublicNow: false,
  canGoLiveNow: false,
  canAutoReplyLiveNow: false,
  canUseRuntimeUploadNow: false,
  canUseProviderNow: false,
} as const;

export const sabiAiStreamDraftGalleryItemTemplate252C: SabiAiStreamDraftGalleryItem252C = {
  draftClipId: 'local-draft-id',
  linkedMetadataContract: '252b_generated_clip_metadata_contract',
  title: '',
  languageCode: 'ru',
  cultureContext: '',
  theme: 'love_homeland_nature_values_learning_or_other_safe_theme',
  thumbnailPlan: 'original_thumbnail_plan',
  scriptSummary: '',
  musicPlan: 'original_or_none',
  videoPlan: 'original_visual_plan',
  safetyStatus: 'pending',
  ownerApprovalStatus: 'pending',
  publicPostAllowed: false,
  liveUseAllowed: false,
} as const;

export const sabiAiStreamPostingGate252C: SabiAiStreamPostingGate252C = {
  noPublicAutoPostNow: true,
  noRuntimePostNow: true,
  noProviderCallNow: true,
  noDbMutationNow: true,
  noLiveBroadcastNow: true,
  noPaymentNow: true,
  noProtectedConfigReadWriteNow: true,
  ownerApprovalRequired: true,
  safetyReviewPassedRequired: true,
  copyrightOriginalityPassedRequired: true,
  youthSafetyPassedRequired: true,
  cultureRespectPassedRequired: true,
  noRedPriorityHoldRequired: true,
} as const;

export const sabiAiStreamSafetyLocks252C: SabiAiStreamSafetyLocks252C = {
  localCodeArtifactOnly: true,
  noLiveBroadcastNow: true,
  noRuntimeMountNow: true,
  noAdminRouteConnectionNow: true,
  noRuntimePostNow: true,
  noProviderCallNow: true,
  noProtectedConfigReadWriteNow: true,
  noDbMutationNow: true,
  noPaymentNow: true,
  noRestrictedLiveActionNow: true,
  finalActionsExecutedNow: false,
  ownerApprovalRequiredForPublicPost: true,
  ownerApprovalRequiredForLiveBroadcast: true,
} as const;
