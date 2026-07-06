import type {
  SabiAiStreamOwnerReviewBoard252F,
  SabiAiStreamReviewRecord252F,
  SabiAiStreamSafetyLocks252F,
} from './sabiAiStreamOwnerReviewBoard252F.types';

export const sabiAiStreamOwnerReviewBoard252F: SabiAiStreamOwnerReviewBoard252F = {
  reviewGeneratedSongDrafts: true,
  reviewGeneratedClipScripts: true,
  reviewVideoPlanDrafts: true,
  reviewMetadataAndSafety: true,
  reviewBeforeFutureGeneration: true,
  reviewBeforeFuturePublicPost: true,
  reviewBeforeFutureLiveUse: true,
  ownerFinalApprovalRequired: true,
  authorizedHumanFinalApprovalAllowed: true,
  sabiAiCanRecommendButCannotApproveFinal: true,
} as const;

export const sabiAiStreamReviewRecordTemplate252F: SabiAiStreamReviewRecord252F = {
  reviewId: 'local-review-id',
  draftId: 'local-draft-id',
  draftType: 'song_or_clip_or_script_or_video_plan',
  languageCode: 'ru',
  cultureContext: '',
  theme: '',
  reviewerRole: 'owner_or_authorized_reviewer',
  sabiAiRecommendation: 'pending',
  finalHumanDecision: 'pending',
  decisionReasonInternal: '',
  publicDisclosureAllowed: false,
  suspectDisclosureAllowed: false,
} as const;

export const sabiAiStreamSafetyLocks252F: SabiAiStreamSafetyLocks252F = {
  localCodeArtifactOnly: true,
  noLiveBroadcastNow: true,
  noRuntimeMountNow: true,
  noAdminRouteConnectionNow: true,
  noRuntimeGenerationNow: true,
  noRuntimePostNow: true,
  noProviderCallNow: true,
  noProtectedConfigReadWriteNow: true,
  noDbMutationNow: true,
  noPaymentNow: true,
  noRestrictedLiveActionNow: true,
  finalActionsExecutedNow: false,
  ownerApprovalRequiredForFutureGeneration: true,
  ownerApprovalRequiredForPublicPost: true,
  ownerApprovalRequiredForLiveBroadcast: true,
} as const;
