export type SabiRelease252EAiStreamStatus = Readonly<{
  version: string;
  status: 'generation_contract_local_only';
  originalSongGenerationContractReadiness: 100;
  originalClipScriptContractReadiness: 100;
  creativePipelineContractReadiness: 100;
  safetyReviewContractReadiness: 100;
  liveBroadcastReadinessNow: 0;
  runtimeGenerationReadinessNow: 0;
  gatesClosed: true;
}>;
