export type SabiAiDomainId254B =
  | 'legal_brain'
  | 'crime_compliance_brain'
  | 'taxi_brain'
  | 'messenger_brain'
  | 'profile_account_brain'
  | 'wallet_finance_brain'
  | 'stream_brain'
  | 'marketplace_business_brain'
  | 'public_ecology_transparency_brain'
  | 'future_programs_brain';

export type SabiAiDomainBrain254B = Readonly<{
  id: SabiAiDomainId254B;
  name: string;
  readiness: 100;
  purpose: string;
  helpsPeopleWith: readonly string[];
  controls: readonly string[];
  forbiddenNow: readonly string[];
}>;

export type SabiAiUnifiedBrain254B = Readonly<{
  oneSabiAiBrainAboveDomains: true;
  domainsRemainSeparatedForAccuracy: true;
  sharedOwnerRulesApplyEverywhere: true;
  sharedCrimeControlAppliesEverywhere: true;
  sharedHelpPeopleMissionAppliesEverywhere: true;
  sharedEvidencePolicyAppliesEverywhere: true;
  sharedFinalActionGatesApplyEverywhere: true;
}>;

export type SabiAiLearningSafetyLocks254B = Readonly<Record<string, boolean>>;
