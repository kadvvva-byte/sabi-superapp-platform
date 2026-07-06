export const sabiAiInternetVerifyOnlyDoctrine254G = {
  version: 'SABI-AI-LEARNING-254G-FIX5-INTERNET-VERIFY-COMPARE-ONLY-PERSON-COMPANY-NO-TRAINING-INGESTION',
  readiness: 100,
  internetAllowedForVerification: true,
  internetAllowedForComparison: true,
  internetNotTrainingSourceByDefault: true,
  rawInternetTrainingRejected: true,
  candidateInternetDataQuarantinedFirst: true,
  trainingIngestionRequiresSeparateOwnerApproval: true,
  sourceTraceRequired: true,
  citationOrMetadataRequired: true,
  confidenceScoreRequired: true,
  domainTagRequired: true,
} as const;

export const sabiAiPersonCompanyVerification254G = {
  personVerificationRequiresLawfulBasis: true,
  personVerificationRequiresPrivacyGate: true,
  companyVerificationCanUseOfficialRegistries: true,
  companyVerificationCanUseOfficialRegulators: true,
  companyVerificationCanUseGoogleGroundedSources: true,
  noDoxing: true,
  noPublicAccusation: true,
  noAutoBlockFromInternetMatchAlone: true,
  noTrainingFromRawInternet: true,
} as const;

export const sabiAiInternetComparisonStatuses254G = [
  'verified_match',
  'verified_mismatch',
  'insufficient_source',
  'source_conflict',
  'privacy_blocked',
] as const;
