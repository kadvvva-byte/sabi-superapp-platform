export type SabiRelease252HAiStreamStatus = Readonly<{
  version: string;
  status: 'draft_expansion_contract_local_only';
  trainingDraftExpansionContractReadiness: 100;
  trainingDraftExpansionSamplesReadiness: 100;
  expansionQueueContractReadiness: 100;
  expansionSafetyReviewContractReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  gatesClosed: true;
}>;
