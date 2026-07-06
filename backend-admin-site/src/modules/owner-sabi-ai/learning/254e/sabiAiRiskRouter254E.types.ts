export type SabiAiRiskPriority254E =
  | 'p0ImmediateSafetyAndCrime'
  | 'p1AmlFraudCorruption'
  | 'p2ProgramSafetyHelp'
  | 'p3NormalHelp';

export type SabiAiRiskRouterInput254E = Readonly<{
  accountType: string;
  program: string;
  riskSignalType: string;
  moneyRelated: boolean;
  identityRelated: boolean;
  minorSafetyRelated: boolean;
}>;

export type SabiAiRiskRouterOutput254E = Readonly<{
  priorityQueue: SabiAiRiskPriority254E;
  domainBrains: readonly string[];
  ownerReportRequired: boolean;
  complianceReviewRequired?: boolean;
  financeGateRequired?: boolean;
  userHelpContinues?: boolean;
  suspectDisclosureAllowed: boolean;
  finalActionGateRequired: boolean;
}>;

export type SabiAiRiskMemoryIndex254E = Readonly<{
  globalOwnerRulesIndex: true;
  accountRiskSignalIndex: true;
  programRiskIndex: true;
  domainBrainIndex: true;
  evidenceReferenceIndexFuture: true;
  ownerReportIndexFuture: true;
  complianceReviewIndexFuture: true;
  financeSafetyGateIndexFuture: true;
}>;

export type SabiAiLearningSafetyLocks254E = Readonly<Record<string, boolean>>;
