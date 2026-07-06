export type SabiAiStreamSafeReadRouteDescriptor252Q = Readonly<{
  routeId: 'owner_sabi_ai_stream_training_readiness_safe_read_candidate';
  futureApiReadPath: '/api/owner-sabi-ai/stream-training/readiness';
  futureAdminPath: '/admin/owner-sabi-ai/stream-training';
  method: 'GET_only_future';
  handlerCandidateName: 'buildOwnerSabiAiStreamTrainingReadinessResponse252Q';
  ownerPrivateScopeRequired: true;
  routeMountedNow: false;
  handlerMountedNow: false;
  serverStartedNow: false;
  realHttpRequestNow: false;
}>;

export type SabiAiStreamSafeReadResponse252Q = Readonly<{
  ok: true;
  module: 'owner_sabi_ai_stream_training';
  mode: 'safe_read_candidate_code_local_only';
  ownerPrivateOnly: true;
  trainingModeReadiness: 100;
  streamCreativeFoundationReadiness: 100;
  routeCandidateCodeReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  runtimePostReadinessNow: 0;
  routeMountedNow: 0;
  handlerMountedNow: 0;
  serverStartedNow: 0;
  realHttpRequestNow: 0;
  dbReadNow: 0;
  dbMutationNow: 0;
  providerCallNow: 0;
  networkCallNow: 0;
  schedulerNow: 0;
  notificationSendNow: 0;
  paymentNow: 0;
  blockers: readonly string[];
  locks: readonly string[];
  nextSafeStage: string;
}>;

export type SabiAiStreamAccessGuardDescriptor252Q = Readonly<{
  ownerPrivateScopeRequired: true;
  publicDenied: true;
  streamUserDenied: true;
  suspectDenied: true;
  noActionButtons: true;
  noSecretView: true;
  noProviderKeyView: true;
  noPrivateEvidencePublicView: true;
}>;

export type SabiAiStreamSafetyLocks252Q = Readonly<Record<string, boolean>>;
