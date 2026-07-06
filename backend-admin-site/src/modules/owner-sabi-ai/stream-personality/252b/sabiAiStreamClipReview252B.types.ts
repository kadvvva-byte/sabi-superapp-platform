export type SabiAiStreamClipMetadata252B = Readonly<{
  clipId: string;
  accountMode: 'sabi_ai_own_stream_account';
  publicStatus: 'draft_until_review_passed';
  title: string;
  description: string;
  languageCode: string;
  targetCultureOrMentality: string;
  theme: readonly string[];
  creativeStyle: string;
  mood: string;
  lyricsMode: 'original_or_no_lyrics';
  musicMode: 'original_composition_or_no_music';
  videoMode: 'original_visual_plan';
  ageAudience: 'general_or_youth_safe';
  createdBy: 'Sabi AI';
  ownerApprovalStatus: 'pending';
  safetyReviewStatus: 'pending';
  publicPostAllowed: false;
  liveBroadcastAllowed: false;
}>;

export type SabiAiStreamClipSafetyReview252B = Readonly<Record<string, boolean>>;

export type SabiAiStreamClipDraftQueue252B = Readonly<{
  queueMode: 'draft_clip_queue_before_public_account_post';
  states: readonly string[];
}>;

export type SabiAiStreamSafetyLocks252B = Readonly<Record<string, boolean>>;
