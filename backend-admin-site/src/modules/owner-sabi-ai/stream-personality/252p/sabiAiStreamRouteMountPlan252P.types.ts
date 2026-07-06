export type SabiAiStreamRouteMountPlan252P = Readonly<{
  futureApiReadPath: '/api/owner-sabi-ai/stream-training/readiness';
  futureAdminPath: '/admin/owner-sabi-ai/stream-training';
  method: 'GET_only_future';
  ownerAuthRequired: true;
  ownerPrivateScopeRequired: true;
  routeMountNow: false;
  apiHandlerMountNow: false;
  serverStartNow: false;
  realHttpRequestNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  providerCallNow: false;
  networkCallNow: false;
}>;

export type SabiAiStreamFutureHandlerShape252P = Readonly<{
  handlerName: 'futureOwnerSabiAiStreamTrainingReadinessReadOnlyHandler';
  method: 'GET_only_future';
  authGuardRequired: true;
  ownerScopeRequired: true;
  returnsReadinessPercentages: true;
  returnsLocks: true;
  returnsBlockersEvenWhenEmpty: true;
  routeMountedNow: false;
  runtimeHandlerMountedNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  providerCallNow: false;
  networkCallNow: false;
}>;

export type SabiAiStreamSafetyLocks252P = Readonly<Record<string, boolean>>;
