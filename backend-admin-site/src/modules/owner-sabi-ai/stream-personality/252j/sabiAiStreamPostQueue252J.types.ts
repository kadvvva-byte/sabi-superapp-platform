export type SabiAiStreamPostReviewOutcome252J =
  | 'approved_for_future_account_post_queue'
  | 'needs_edit'
  | 'rejected'
  | 'red_priority_hold';

export type SabiAiStreamAccountPostQueueItem252J = Readonly<{
  queueItemId: string;
  assetId: string;
  sourceDraftId: string;
  accountOwner: 'Sabi AI';
  accountType: 'official_sabi_ai_stream_personality';
  title: string;
  description: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  postType: string;
  postGenerationReviewId: string;
  ownerFinalApprovalId: string;
  publicPostAllowedNow: false;
  liveUseAllowedNow: false;
  runtimePostAllowedNow: false;
}>;

export type SabiAiStreamPostQueueAudit252J = Readonly<{
  auditId: string;
  queueItemId: string;
  assetId: string;
  action: string;
  actorRole: string;
  internalReason: string;
  publicReasonAllowed: false;
  suspectDisclosureAllowed: false;
  auditModeNow: 'contract_only_no_db';
}>;

export type SabiAiStreamSafetyLocks252J = Readonly<Record<string, boolean>>;
