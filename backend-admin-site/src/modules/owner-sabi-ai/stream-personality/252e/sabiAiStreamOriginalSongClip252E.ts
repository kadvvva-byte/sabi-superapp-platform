import type {
  SabiAiStreamCreativePipeline252E,
  SabiAiStreamOriginalClipScript252E,
  SabiAiStreamOriginalSongDraft252E,
  SabiAiStreamSafetyLocks252E,
} from './sabiAiStreamOriginalSongClip252E.types';

export const sabiAiStreamOriginalSongDraftTemplate252E: SabiAiStreamOriginalSongDraft252E = {
  songDraftId: 'local-song-draft-id',
  languageCode: 'ru',
  cultureContext: '',
  theme: 'love_homeland_nature_values_learning_or_safe_theme',
  mood: 'calm_positive_emotional_educational_or_inspiring',
  originalLyricsPlan: 'required_before_future_generation',
  originalMelodyPlan: 'required_before_future_generation',
  originalArrangementPlan: 'required_before_future_generation',
  vocalPersonalityPlan: 'sabi_ai_original_voice_style_only',
  ageAudience: 'general_or_youth_safe',
  safetyStatus: 'pending',
  ownerApprovalStatus: 'pending',
  publicUseAllowed: false,
} as const;

export const sabiAiStreamOriginalClipScriptTemplate252E: SabiAiStreamOriginalClipScript252E = {
  clipDraftId: 'local-clip-draft-id',
  linkedSongDraftId: 'local-song-draft-id',
  title: '',
  storyIdea: '',
  scenePlan: 'original_scene_sequence',
  visualStylePlan: 'original_visual_style_description',
  editTimelinePlan: 'intro_middle_climax_outro',
  thumbnailPlan: 'original_thumbnail_plan',
  subtitlesPlan: 'language_safe_subtitles_plan',
  culturalRespectNotes: '',
  youthSafetyNotes: '',
  redPriorityRiskStatus: 'clear_pending_or_hold',
  publicUseAllowed: false,
  liveUseAllowed: false,
} as const;

export const sabiAiStreamCreativePipeline252E: SabiAiStreamCreativePipeline252E = {
  pipelineStages: [
    'idea_draft',
    'language_culture_mentality_selection',
    'song_plan',
    'lyrics_plan',
    'clip_script_plan',
    'video_edit_timeline_plan',
    'metadata_contract',
    'safety_review',
    'copyright_originality_review',
    'youth_and_child_safety_review',
    'owner_or_authorized_review',
    'draft_gallery_queue',
    'future_runtime_generation_after_approval',
  ],
} as const;

export const sabiAiStreamSafetyLocks252E: SabiAiStreamSafetyLocks252E = {
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
