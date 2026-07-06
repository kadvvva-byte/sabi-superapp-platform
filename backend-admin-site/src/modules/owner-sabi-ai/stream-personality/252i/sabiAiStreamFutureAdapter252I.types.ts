export type SabiAiStreamFutureAdapterCategory252I =
  | 'text_script'
  | 'song_plan'
  | 'audio'
  | 'voice'
  | 'video'
  | 'video_edit_render'
  | 'subtitle'
  | 'thumbnail'
  | 'safety_review';

export type SabiAiStreamFutureAdapterShape252I = Readonly<{
  adapterId: string;
  adapterCategory: SabiAiStreamFutureAdapterCategory252I;
  providerDisplayLabel: string;
  allowedPurpose: 'future_generation_after_owner_approval';
  inputContract: string;
  outputContract: string;
  requiredReviewBeforeUse: true;
  ownerApprovalRequired: true;
  protectedConfigReferenceMode: 'not_set_now';
  liveEnabledNow: false;
  runtimeCallableNow: false;
}>;

export type SabiAiStreamFutureGenerationRequest252I = Readonly<{
  requestId: string;
  sourceDraftId: string;
  requestType: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  ownerApprovalId: string;
  safetyReviewId: string;
  originalityReviewId: string;
  youthSafetyReviewId: string;
  adapterId: string;
  publicPostAllowedAfterGeneration: false;
  liveUseAllowedAfterGeneration: false;
}>;

export type SabiAiStreamSafetyLocks252I = Readonly<Record<string, boolean>>;
