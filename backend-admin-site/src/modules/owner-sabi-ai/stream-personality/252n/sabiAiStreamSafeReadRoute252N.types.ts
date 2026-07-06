export type SabiAiStreamSafeReadRouteCandidate252N = Readonly<{
  futureApiReadPath: '/api/owner-sabi-ai/stream-training/readiness';
  futureAdminPath: '/admin/owner-sabi-ai/stream-training';
  method: 'GET_only_candidate';
  ownerAuthRequired: true;
  ownerPrivateScopeRequired: true;
  publicAccessNow: false;
  routeMountedNow: false;
  runtimeHandlerMountedNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  providerCallNow: false;
  networkCallNow: false;
}>;

export type SabiAiStreamSafeReadResponse252N = Readonly<{
  ok: true;
  module: 'owner_sabi_ai_stream_training';
  mode: 'training_mode_read_only';
  ownerPrivateOnly: true;
  trainingModeReadiness: 100;
  streamCreativeFoundationReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  runtimePostReadinessNow: 0;
  providerCallNow: 0;
  networkCallNow: 0;
  dbReadNow: 0;
  dbMutationNow: 0;
  protectedConfigReadWriteNow: 0;
  schedulerNow: 0;
  notificationSendNow: 0;
  paymentNow: 0;
  blockers: readonly string[];
  locks: readonly string[];
  nextSafeStage: string;
}>;

export type SabiAiStreamSafetyLocks252N = Readonly<Record<string, boolean>>;
