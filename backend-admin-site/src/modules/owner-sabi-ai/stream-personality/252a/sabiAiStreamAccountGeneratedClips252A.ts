import type {
  SabiAiStreamAccountMode252A,
  SabiAiStreamCreativeRole252A,
  SabiAiStreamLearningPlan252A,
  SabiAiStreamSafetyLocks252A,
} from './sabiAiStreamAccountGeneratedClips252A.types';

export const sabiAiStreamAccountMode252A: SabiAiStreamAccountMode252A = {
  ownStreamAccountRequired: true,
  accountModeBeforeLiveBroadcast: true,
  liveBroadcastNow: false,
  uploadGeneratedClipsFoundation: true,
  autoPublicUploadNow: false,
  runtimeUploadConnectionNow: false,
  streamProviderCallNow: false,
  dbMutationNow: false,
} as const;

export const sabiAiStreamCreativeRoles252A: SabiAiStreamCreativeRole252A = {
  streamerPersonality: true,
  performerSingerStylePersonality: true,
  composer: true,
  originalClipAuthor: true,
  videoEditorPlanner: true,
  scriptWriter: true,
  realTimeCommunicationLater: true,
  learningFirst: true,
  liveOnAirOnlyAfterApproval: true,
} as const;

export const sabiAiStreamLearningPlan252A: SabiAiStreamLearningPlan252A = {
  learningBeforeBroadcast: true,
  learningTracks: [
    'stream_voice_personality',
    'music_composition_basics',
    'song_theme_planning',
    'clip_scriptwriting',
    'video_editing_structure',
    'culture_and_mentality',
    'youth_safe_communication',
    'language_style_matrix',
    'copyright_safe_originality',
    'red_priority_safety_background',
  ],
  liveBroadcastUnlockRequirements: [
    'owner_approval',
    'safety_review_passed',
    'copyright_originality_check_passed',
    'youth_safety_check_passed',
    'language_culture_quality_check_passed',
    'stream_runtime_connection_approved',
    'no_secret_or_provider_key_exposed',
  ],
} as const;

export const sabiAiStreamSafetyLocks252A: SabiAiStreamSafetyLocks252A = {
  localCodeArtifactOnly: true,
  noLiveBroadcastNow: true,
  noRuntimeMountNow: true,
  noAdminRouteConnectionNow: true,
  noRuntimeUploadNow: true,
  noProviderCallNow: true,
  noProtectedConfigReadWriteNow: true,
  noDbMutationNow: true,
  noPaymentNow: true,
  noRestrictedLiveActionNow: true,
  finalActionsExecutedNow: false,
  ownerApprovalRequiredForLiveBroadcast: true,
  ownerApprovalRequiredForPublicAutoPosting: true,
} as const;
