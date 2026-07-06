export type SabiAiStreamAccountMode252A = Readonly<{
  ownStreamAccountRequired: true;
  accountModeBeforeLiveBroadcast: true;
  liveBroadcastNow: false;
  uploadGeneratedClipsFoundation: true;
  autoPublicUploadNow: false;
  runtimeUploadConnectionNow: false;
  streamProviderCallNow: false;
  dbMutationNow: false;
}>;

export type SabiAiStreamCreativeRole252A = Readonly<Record<string, boolean>>;

export type SabiAiStreamLearningPlan252A = Readonly<{
  learningBeforeBroadcast: true;
  learningTracks: readonly string[];
  liveBroadcastUnlockRequirements: readonly string[];
}>;

export type SabiAiStreamSafetyLocks252A = Readonly<Record<string, boolean>>;
