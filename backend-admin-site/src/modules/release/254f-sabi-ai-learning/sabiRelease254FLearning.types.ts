export type SabiRelease254FLearningStatus = Readonly<{
  version: string;
  status: 'sabi_ai_domain_knowledge_ingestion_pack_local_only';
  domainKnowledgePacksReadiness: 100;
  unifiedKnowledgeMergePackReadiness: 100;
  localIngestionPlanReadiness: 100;
  knowledgeCoverageMatrixReadiness: 100;
  canonicalQualityGateReadiness: 100;
  domainKnowledgePacksPreparedNow: 1;
  realUserDataNow: 0;
  realMonitoringNow: 0;
  aiProviderCallNow: 0;
  dbReadNow: 0;
  dbWriteNow: 0;
  runtimeMountNow: 0;
  millionUserRuntimeNow: 0;
}>;
