export type SabiAiStreamOwnAccountProfile252C = Readonly<{
  accountOwner: 'Sabi AI';
  accountType: 'official_sabi_ai_stream_personality';
  publicModeBeforeLive: 'training_and_original_clips_preparation';
  liveStatusNow: 'not_on_air';
  canShowProfileNowAfterFutureUiApproval: true;
  canPostPublicNow: false;
  canGoLiveNow: false;
  canAutoReplyLiveNow: false;
  canUseRuntimeUploadNow: false;
  canUseProviderNow: false;
}>;

export type SabiAiStreamDraftGalleryItem252C = Readonly<{
  draftClipId: string;
  linkedMetadataContract: '252b_generated_clip_metadata_contract';
  title: string;
  languageCode: string;
  cultureContext: string;
  theme: string;
  thumbnailPlan: string;
  scriptSummary: string;
  musicPlan: string;
  videoPlan: string;
  safetyStatus: 'pending';
  ownerApprovalStatus: 'pending';
  publicPostAllowed: false;
  liveUseAllowed: false;
}>;

export type SabiAiStreamPostingGate252C = Readonly<Record<string, boolean>>;

export type SabiAiStreamSafetyLocks252C = Readonly<Record<string, boolean>>;
