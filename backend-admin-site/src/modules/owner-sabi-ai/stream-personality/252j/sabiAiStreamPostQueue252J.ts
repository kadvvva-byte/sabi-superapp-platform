import type {
  SabiAiStreamAccountPostQueueItem252J,
  SabiAiStreamPostQueueAudit252J,
  SabiAiStreamSafetyLocks252J,
} from './sabiAiStreamPostQueue252J.types';

export const sabiAiStreamAccountPostQueueItemTemplate252J: SabiAiStreamAccountPostQueueItem252J = {
  queueItemId: 'future-queue-item-id',
  assetId: 'future-asset-id',
  sourceDraftId: 'local-or-future-draft-id',
  accountOwner: 'Sabi AI',
  accountType: 'official_sabi_ai_stream_personality',
  title: '',
  description: '',
  languageCode: 'ru',
  cultureContext: '',
  theme: '',
  postType: 'video',
  postGenerationReviewId: 'required-future-review-id',
  ownerFinalApprovalId: 'required-future-owner-or-authorized-approval-id',
  publicPostAllowedNow: false,
  liveUseAllowedNow: false,
  runtimePostAllowedNow: false,
} as const;

export const sabiAiStreamPostQueueAuditTemplate252J: SabiAiStreamPostQueueAudit252J = {
  auditId: 'future-audit-id',
  queueItemId: 'future-queue-item-id',
  assetId: 'future-asset-id',
  action: 'review_approve_needs_edit_reject_red_priority_hold_future_post',
  actorRole: 'owner_authorized_reviewer_sabi_ai_recommendation_or_future_runtime',
  internalReason: '',
  publicReasonAllowed: false,
  suspectDisclosureAllowed: false,
  auditModeNow: 'contract_only_no_db',
} as const;

export const sabiAiStreamSafetyLocks252J: SabiAiStreamSafetyLocks252J = {
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
  ownerApprovalRequiredForFuturePostQueue: true,
  ownerApprovalRequiredForPublicPost: true,
  ownerApprovalRequiredForLiveBroadcast: true,
} as const;
