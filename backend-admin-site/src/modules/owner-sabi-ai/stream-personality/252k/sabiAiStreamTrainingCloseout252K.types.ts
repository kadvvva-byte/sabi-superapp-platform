export type SabiAiStreamTrainingCloseoutStage252K = Readonly<{
  stage: string;
  file: string;
  exists: boolean;
  status: string;
  checksPassed: number;
  checksTotal: number;
  blockers: readonly string[];
}>;

export type SabiAiStreamTrainingCloseout252K = Readonly<{
  version: string;
  readiness: 100;
  sourceStatus: readonly SabiAiStreamTrainingCloseoutStage252K[];
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  runtimePostReadinessNow: 0;
  providerCallNow: 0;
  dbMutationNow: 0;
  protectedConfigReadWriteNow: 0;
  paymentNow: 0;
}>;

export type SabiAiStreamSafetyLocks252K = Readonly<Record<string, boolean>>;
