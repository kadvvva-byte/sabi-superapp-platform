export type SabiAiStreamDraftExpansion252H = Readonly<{
  expansionId: string;
  sourceSeedId: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  titleWorkingDraft: string;
  coreMessage: string;
  songDirectionPlan: string;
  lyricDirectionPlan: string;
  melodyDirectionPlan: string;
  sceneOutline: string;
  editTimelineOutline: string;
  thumbnailDirection: string;
  subtitleDirection: string;
  youthSafetyNotes: string;
  cultureRespectNotes: string;
  originalityDeclaration: 'original_draft_plan_only_no_copy';
  safetyReviewStatus: 'pending';
  ownerReviewStatus: 'pending';
  futureUseAllowedNow: false;
}>;

export type SabiAiStreamDraftExpansionQueue252H = Readonly<{
  queueStates: readonly string[];
}>;

export type SabiAiStreamSafetyLocks252H = Readonly<Record<string, boolean>>;
