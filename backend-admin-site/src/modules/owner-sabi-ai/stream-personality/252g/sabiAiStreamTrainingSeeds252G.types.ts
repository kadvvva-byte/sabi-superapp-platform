export type SabiAiStreamTrainingSeed252G = Readonly<{
  seedId: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  titleIdea: string;
  messageGoal: string;
  songMoodPlan: string;
  clipVisualPlan: string;
  scriptStructurePlan: string;
  youthSafetyNotes: string;
  originalityDeclaration: 'original_seed_only_no_copy';
  ownerReviewStatus: 'pending';
  futureUseAllowedNow: false;
}>;

export type SabiAiStreamTrainingQueue252G = Readonly<{
  queueStates: readonly string[];
}>;

export type SabiAiStreamSafetyLocks252G = Readonly<Record<string, boolean>>;
