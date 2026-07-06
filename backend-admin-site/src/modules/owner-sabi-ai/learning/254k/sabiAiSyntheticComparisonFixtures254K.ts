export const sabiAiSyntheticComparisonFixtures254K = {
  version: 'SABI-AI-LEARNING-254K-VERIFIED-SOURCE-SYNTHETIC-PERSON-COMPANY-COMPARISON-FIXTURES-NO-REAL-DATA',
  readiness: 100,
  syntheticOnly: true,
  fixtureCount: 7,
  statuses: [
    'verified_match',
    'verified_mismatch',
    'insufficient_source',
    'source_conflict',
    'privacy_blocked',
  ],
  realPersonDataUsedNow: false,
  realCompanyDataUsedNow: false,
  internetLookupNow: false,
  googleLookupNow: false,
  googleApiCallNow: false,
  dbReadNow: false,
  dbWriteNow: false,
  runtimeMountNow: false,
} as const;

export const sabiAiSyntheticComparisonEngineShape254K = {
  readiness: 100,
  mode: 'local_fixture_shape_only',
  noRealDataAllowed: true,
  noInternetLookupAllowedNow: true,
  noGoogleLookupAllowedNow: true,
  noTrainingIngestionAllowedNow: true,
  noAutoActionAllowedNow: true,
  privateReviewNoteOnlyWhenNeeded: true,
} as const;

export const sabiAiSyntheticComparisonSafety254K = {
  noRealPersonData: true,
  noRealCompanyData: true,
  noPublicAccusationNow: true,
  noDoxingNow: true,
  noAccountBlockNow: true,
  noPaymentRestrictionNow: true,
  noPayoutFreezeNow: true,
  noLawEnforcementSendNow: true,
} as const;
