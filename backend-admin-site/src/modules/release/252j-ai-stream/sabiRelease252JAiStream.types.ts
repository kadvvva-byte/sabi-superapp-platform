export type SabiRelease252JAiStreamStatus = Readonly<{
  version: string;
  status: 'post_generation_review_queue_contract_local_only';
  postGenerationReviewContractReadiness: 100;
  accountPostQueueContractReadiness: 100;
  accountPostPolicyContractReadiness: 100;
  auditTraceContractReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimePostReadinessNow: 0;
  gatesClosed: true;
}>;
