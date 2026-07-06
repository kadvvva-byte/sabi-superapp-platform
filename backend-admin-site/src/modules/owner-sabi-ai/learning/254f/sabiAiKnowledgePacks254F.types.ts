export type SabiAiKnowledgeDomain254F =
  | 'owner_governance'
  | 'legal_knowledge'
  | 'crime_compliance'
  | 'taxi'
  | 'messenger'
  | 'profile_account_kyc'
  | 'wallet_finance'
  | 'stream'
  | 'merchant_business'
  | 'public_ecology_transparency'
  | 'future_programs';

export type SabiAiDomainKnowledgePack254F = Readonly<{
  domainId: SabiAiKnowledgeDomain254F;
  readiness: 100;
  priority: number;
  learnsSeparately: true;
  contributesToUnifiedBrain: true;
  knowledge: readonly string[];
  controlRules: readonly string[];
}>;

export type SabiAiUnifiedKnowledgeMerge254F = Readonly<{
  oneSabiAiBrain: true;
  domainKnowledgeRemainsTagged: true;
  sourceDomainAlwaysPreserved: true;
  ownerRulesOverrideAll: true;
  p1RiskControlOverridesConvenience: true;
  privacyGateOverridesExposure: true;
  financeGateOverridesSpeed: true;
  finalActionGateOverridesAll: true;
}>;

export type SabiAiLearningSafetyLocks254F = Readonly<Record<string, boolean>>;
