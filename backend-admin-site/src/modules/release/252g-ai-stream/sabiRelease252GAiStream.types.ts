export type SabiRelease252GAiStreamStatus = Readonly<{
  version: string;
  status: 'training_seeds_local_only';
  trainingSeedContractReadiness: 100;
  trainingSeedSamplesReadiness: 100;
  trainingSeedQueueContractReadiness: 100;
  safetyReviewContractReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  gatesClosed: true;
}>;
