export type SabiAiStreamOriginalSongDraft252E = Readonly<{
  songDraftId: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  mood: string;
  originalLyricsPlan: 'required_before_future_generation';
  originalMelodyPlan: 'required_before_future_generation';
  originalArrangementPlan: 'required_before_future_generation';
  vocalPersonalityPlan: 'sabi_ai_original_voice_style_only';
  ageAudience: 'general_or_youth_safe';
  safetyStatus: 'pending';
  ownerApprovalStatus: 'pending';
  publicUseAllowed: false;
}>;

export type SabiAiStreamOriginalClipScript252E = Readonly<{
  clipDraftId: string;
  linkedSongDraftId?: string;
  title: string;
  storyIdea: string;
  scenePlan: string;
  visualStylePlan: string;
  editTimelinePlan: string;
  thumbnailPlan: string;
  subtitlesPlan: string;
  culturalRespectNotes: string;
  youthSafetyNotes: string;
  redPriorityRiskStatus: 'clear_pending_or_hold';
  publicUseAllowed: false;
  liveUseAllowed: false;
}>;

export type SabiAiStreamCreativePipeline252E = Readonly<{
  pipelineStages: readonly string[];
}>;

export type SabiAiStreamSafetyLocks252E = Readonly<Record<string, boolean>>;
