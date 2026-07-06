export type SabiAiStreamSafeReadSmokeResult252O = Readonly<{
  smokeId: '252o-local-safe-read-smoke';
  sourceReportPath: string;
  sourcePassed: boolean;
  candidatePayloadAvailable: boolean;
  smokePassed: boolean;
  findings: readonly string[];
  serverStartedNow: false;
  routeMountedNow: false;
  realHttpRequestNow: false;
  dbReadNow: false;
  dbMutationNow: false;
  providerCallNow: false;
  networkCallNow: false;
  schedulerNow: false;
  notificationSendNow: false;
  generationNow: false;
  postNow: false;
  liveBroadcastNow: false;
}>;

export type SabiAiStreamSafeReadSmokeInput252O = Readonly<{
  ok?: unknown;
  ownerPrivateOnly?: unknown;
  trainingModeReadiness?: unknown;
  streamCreativeFoundationReadiness?: unknown;
  blockers?: unknown;
  locks?: unknown;
  liveBroadcastReadinessNow?: unknown;
  runtimeGenerationReadinessNow?: unknown;
  runtimePostReadinessNow?: unknown;
  providerCallNow?: unknown;
  networkCallNow?: unknown;
  dbReadNow?: unknown;
  dbMutationNow?: unknown;
  protectedConfigReadWriteNow?: unknown;
  schedulerNow?: unknown;
  notificationSendNow?: unknown;
  paymentNow?: unknown;
}>;

export type SabiAiStreamSafetyLocks252O = Readonly<Record<string, boolean>>;
