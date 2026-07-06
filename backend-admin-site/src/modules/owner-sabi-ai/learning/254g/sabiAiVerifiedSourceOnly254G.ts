export const sabiAiVerifiedSourceOnlyDoctrine254G = {
  version: 'SABI-AI-LEARNING-254G-FIX4-VERIFIED-SOURCE-ONLY-ANTI-FAKE-ANTI-GARBAGE-LOCAL-ONLY',
  readiness: 100,
  rawInternetMaterialForTrainingRejected: true,
  uncheckedWebMaterialRejected: true,
  unapprovedScrapedPagesRejected: true,
  noSourceTraceRejected: true,
  noCitationOrMetadataRejected: true,
  brokenTextRejected: true,
  mixedLanguageGarbageRejected: true,
  privateUserDataWithoutLegalGateRejected: true,
  onlyVerifiedSourcesCanEnterSabiAiBrain: true,
} as const;

export const sabiAiVerifiedSourcePipeline254G = [
  'source_intake',
  'quarantine',
  'source_identity_check',
  'quality_gate',
  'legal_privacy_gate',
  'domain_tagging',
  'confidence_and_trace',
  'owner_approved_registry',
  'unified_brain_merge',
] as const;

export const sabiAiNoAutoBlockDuringLearning254G = {
  learningCanClassifyCandidateSource: true,
  learningCanRejectBadSource: true,
  learningCanRouteRiskForReview: true,
  learningCanPreparePrivateReportDraft: true,
  learningCannotBlockAccount: true,
  learningCannotRestrictPayment: true,
  learningCannotFreezePayout: true,
  learningCannotDeleteUser: true,
  learningCannotSendToAuthorities: true,
  learningCannotMutateDb: true,
  learningCannotCallProviderWithoutApproval: true,
  learningCannotMakeFinalLegalDecision: true,
  learningCannotMakeFinalFinancialDecision: true,
} as const;
