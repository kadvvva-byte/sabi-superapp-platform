export const sabiAiLearningSourceRegistry254G = {
  version: 'SABI-AI-LEARNING-254G-FIX1-NO-GARBAGE-NO-AUTO-BLOCK-SOURCE-QUARANTINE-LOCAL-ONLY',
  currentAllowedSources: [
    'owner_approved_local_rules',
    'clean_domain_knowledge_packs_254f',
    'local_release_contracts_254a_to_254f',
  ],
  externalAiProviderConnectedNow: false,
  internetLiveSourcesConnectedNow: false,
  databaseUserDataConnectedNow: false,
  vectorDbConnectedNow: false,
  realMonitoringConnectedNow: false,
} as const;

export const sabiAiNoGarbageIngestionPolicy254G = {
  noGarbageIntoSabiAiBrain: true,
  noBrokenTextIntoSabiAiBrain: true,
  noMixedLanguageGarbageIntoSabiAiBrain: true,
  noUncheckedSourceIntoSabiAiBrain: true,
  quarantineBeforeIngestion: true,
  qualityGateBeforeIngestion: true,
  domainTagRequiredBeforeMerge: true,
  ownerApprovedSourceRegistryRequired: true,
} as const;

export const sabiAiNoAutoBlockDuringLearning254G = {
  learningMayClassifyRisk: true,
  learningMayRouteRisk: true,
  learningMayPreparePrivateReportDraft: true,
  learningMayRecommendGateAction: true,
  learningMayContinueNormalUserHelp: true,
  learningMustNotBlockAccount: true,
  learningMustNotRestrictPayment: true,
  learningMustNotFreezePayout: true,
  learningMustNotDeleteUser: true,
  learningMustNotSendToLawEnforcement: true,
  learningMustNotMutateDb: true,
  learningMustNotCallProvider: true,
  learningMustNotActivateRuntimeMonitoring: true,
  learningMustNotMakeFinalLegalDecision: true,
  learningMustNotMakeFinalFinancialDecision: true,
} as const;
