export type SabiAiStreamReviewDecision252F =
  | 'pending'
  | 'approved_for_future_generation'
  | 'approved_for_future_account_post'
  | 'needs_edit'
  | 'rejected'
  | 'red_priority_hold';

export type SabiAiStreamReviewRecord252F = Readonly<{
  reviewId: string;
  draftId: string;
  draftType: 'song_or_clip_or_script_or_video_plan';
  languageCode: string;
  cultureContext: string;
  theme: string;
  reviewerRole: 'owner_or_authorized_reviewer';
  sabiAiRecommendation: SabiAiStreamReviewDecision252F;
  finalHumanDecision: 'pending';
  decisionReasonInternal: string;
  publicDisclosureAllowed: false;
  suspectDisclosureAllowed: false;
}>;

export type SabiAiStreamOwnerReviewBoard252F = Readonly<Record<string, boolean>>;

export type SabiAiStreamSafetyLocks252F = Readonly<Record<string, boolean>>;
