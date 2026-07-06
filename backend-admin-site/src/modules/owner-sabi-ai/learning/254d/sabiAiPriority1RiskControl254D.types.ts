export type SabiAiPriority1RiskDomain254D =
  | 'aml_money_laundering'
  | 'fraud_scams'
  | 'corruption_bribery'
  | 'taxi_safety_fraud'
  | 'messenger_crime_abuse'
  | 'profile_identity_kyc_risk'
  | 'stream_public_safety_risk'
  | 'public_ecology_tender_corruption';

export type SabiAiPriority1RiskSignalGroup254D = Readonly<{
  id: SabiAiPriority1RiskDomain254D;
  priority: 'P1';
  examples: readonly string[];
  response: string;
}>;

export type SabiAiPriority1ControlDoctrine254D = Readonly<{
  priority1CoreProjectPart: true;
  notSecondaryFeature: true;
  accountRiskControlAboveNormalConvenience: true;
  crimeAmlFraudCorruptionControlAcrossAllPrograms: true;
  helpNormalUsersMustContinue: true;
  ownerFinalAuthority: true;
  legalPrivacyComplianceRequired: true;
}>;

export type SabiAiLearningSafetyLocks254D = Readonly<Record<string, boolean>>;
