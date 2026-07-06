export const TAXI_AGENT_CONTACT_SAFE_READ_CONTRACT_034C_VERSION = 'TAXI-BACKEND-034C-AGENT-CONTACT-SAFE-READ-CONTRACT' as const;

export const TAXI_AGENT_CONTACT_SAFE_READ_ENDPOINTS_034C = Object.freeze([
  'GET /api/taxi/mobile/agent/contact/034c/readiness',
  'GET /api/taxi/mobile/agent/contact/034c/contract',
  'GET /api/taxi/mobile/agent/contact/034c/directory',
  'GET /api/taxi/mobile/agent/contact/034c/permissions',
  'GET /api/taxi/mobile/agent/contact/034c/owner-ai',
  'POST /api/taxi/mobile/agent/contact/034c/request',
  'GET /api/admin/taxi/agent-contact/034c/readiness',
] as const);

export const TAXI_AGENT_CONTACT_SAFE_READ_ALLOWED_FIELDS_034C = Object.freeze([
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

export const TAXI_AGENT_CONTACT_SAFE_READ_BLOCKED_RAW_FIELDS_034C = Object.freeze([
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
] as const);

export const TAXI_AGENT_CONTACT_SAFE_READ_PERMISSION_GATES_034C = Object.freeze([
  'mobileAuthRequired',
  'approvedTaxiAgentRoleRequired',
  'countryScopeRequired',
  'cityScopeRequired',
  'driverBalanceEligibilityRequired',
  'ownerSabiAiReviewRequiredForRisk',
  'adminRuntimeBridge030AAcknowledged',
  'walletPaymentPayoutExecutionLocked',
] as const);

export const TAXI_AGENT_CONTACT_SAFE_READ_CONTACT_CHANNELS_034C = Object.freeze([
  'safe_read_directory_card',
  'request_agent_contact_review',
  'driver_balance_topup_handoff',
  'receipt_proof_intake_handoff',
  'owner_sabi_ai_private_report',
] as const);
