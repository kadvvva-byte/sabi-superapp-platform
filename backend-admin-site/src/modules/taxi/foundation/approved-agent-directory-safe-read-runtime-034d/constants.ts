export const TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_RUNTIME_034D_VERSION = 'TAXI-BACKEND-034D-APPROVED-AGENT-DIRECTORY-SAFE-READ-RUNTIME' as const;

export const TAXI_APPROVED_AGENT_DIRECTORY_SAFE_READ_ENDPOINTS_034D = Object.freeze([
  'GET /api/taxi/mobile/agent/directory/034d/readiness',
  'GET /api/taxi/mobile/agent/directory/034d/records',
  'GET /api/taxi/mobile/agent/directory/034d/agent/:agentPublicId',
  'GET /api/taxi/mobile/agent/directory/034d/permissions',
  'GET /api/taxi/mobile/agent/directory/034d/owner-ai',
  'POST /api/taxi/mobile/agent/directory/034d/contact-request',
  'GET /api/admin/taxi/agent-directory/034d/readiness',
  'GET /api/admin/taxi/agent-directory/034d/audit',
] as const);

export const TAXI_APPROVED_AGENT_DIRECTORY_SAFE_FIELDS_034D = Object.freeze([
  'agentPublicId',
  'countryCode',
  'cityCode',
  'serviceRegion',
  'displayName',
  'verificationBadge',
  'contactChannels',
  'balanceTopupHelpEnabled',
  'receiptProofRequired',
  'ownerSabiAiReviewRequired',
  'runtimeStatus',
] as const);

export const TAXI_APPROVED_AGENT_DIRECTORY_BLOCKED_RAW_FIELDS_034D = Object.freeze([
  'rawUserId',
  'phoneRaw',
  'emailRaw',
  'passportNumber',
  'documentImage',
  'selfieImage',
  'bankCard',
  'walletPrivateData',
  'paymentProviderAccountSecret',
  'exactGpsTrace',
  'chatTextRaw',
  'receiptImageRaw',
  'addressRaw',
] as const);

export const TAXI_APPROVED_AGENT_DIRECTORY_FILTERS_034D = Object.freeze([
  'countryCode',
  'cityCode',
  'serviceRegion',
  'balanceTopupHelpEnabled',
  'contactChannel',
] as const);

export const TAXI_APPROVED_AGENT_DIRECTORY_PERMISSION_GATES_034D = Object.freeze([
  'mobile034BFix1ContractRequired',
  'backend034CSafeReadContractRequired',
  'approvedTaxiAgentDirectoryScopeRequired',
  'mobileAuthRequiredBeforeContactRequest',
  'countryScopeRequiredBeforeDirectoryExpansion',
  'ownerSabiAiReviewRequiredForRisk',
  'walletPaymentPayoutExecutionLocked',
] as const);
