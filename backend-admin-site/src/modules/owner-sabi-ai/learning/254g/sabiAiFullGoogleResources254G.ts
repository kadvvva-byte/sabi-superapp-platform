export const sabiAiFullGoogleResources254G = {
  version: 'SABI-AI-LEARNING-254G-FIX3-FULL-GOOGLE-RESOURCES-VERIFIED-DATA-REGISTRY-NO-KEYS-NO-CALLS',
  readiness: 100,
  resourceFamilies: [
    'google_ai_and_vertex_ai',
    'google_verified_grounding_and_data',
    'google_cloud_data_platform',
    'google_cloud_runtime_and_scaling',
    'google_security_privacy_and_compliance',
    'google_developer_and_release_tools',
    'google_communications_and_business_workspace',
  ],
  verifiedDataResources: [
    'grounding_with_google_search',
    'grounding_with_google_maps',
    'google_knowledge_graph_search_api',
    'google_fact_check_tools_api',
    'bigquery_public_datasets',
    'owner_approved_company_documents',
    'owner_approved_legal_documents',
    'owner_approved_anonymized_support_patterns',
  ],
  actualGoogleProviderConnectionNow: false,
  googleApiCallNow: false,
  googleVerifiedDataConnectedNow: false,
  googleCloudProjectCreatedNow: false,
  googleRuntimeMountedNow: false,
} as const;

export const sabiAiVerifiedGoogleDataPolicy254G = {
  verifiedDoesNotMeanBlindTrust: true,
  everyGoogleDataSourceMustBeApproved: true,
  everyGoogleDataSourceMustHaveSourceTrace: true,
  everyExternalClaimMustHaveCitationOrMetadata: true,
  everyDatasetMustPassPrivacyGate: true,
  everyDatasetMustPassQualityGate: true,
  noPrivateUserDataWithoutLegalGate: true,
  noUncheckedScraping: true,
  noRandomInternetDumps: true,
} as const;

export const sabiAiFullGoogleSafetyGates254G = {
  noGarbageIntoSabiAiBrain: true,
  quarantineBeforeIngestion: true,
  qualityGateBeforeIngestion: true,
  sourceTraceRequired: true,
  domainTagRequired: true,
  learningMustNotBlockAccount: true,
  learningMustNotRestrictPayment: true,
  learningMustNotFreezePayout: true,
  learningMustNotSendToLawEnforcement: true,
  learningMustNotMutateDb: true,
  learningMustNotCallProviderWithoutApproval: true,
} as const;
