export const TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_030A_VERSION = 'TAXI-AGENT-FINANCE-ADMIN-MOBILE-BRIDGE-030A' as const;

export const TAXI_AGENT_FINANCE_ADMIN_MOBILE_BRIDGE_ROUTES_030A = Object.freeze([
  'GET /api/taxi/agent-finance/030a/readiness',
  'POST /api/taxi/mobile/agent/finance/context',
  'POST /api/taxi/mobile/agent/finance/chat/send',
  'POST /api/taxi/mobile/agent/finance/receipt/send',
  'POST /api/taxi/mobile/agent/finance/admin-account/request',
  'POST /api/taxi/mobile/agent/application/submit',
  'POST /api/taxi/mobile/agent/application/document/send',
  'POST /api/taxi-finance/admin/payment-account/context',
  'POST /api/taxi-finance/admin/agents/finance/context',
  'POST /api/taxi-finance/admin/agents/balance/confirm-bridge',
  'POST /api/taxi-finance/admin/agents/report/build-bridge',
  'POST /api/taxi-finance/admin/agents/archive/write-bridge',
  'POST /api/taxi-finance/admin/agent-applications/queue',
  'POST /api/taxi-finance/admin/agent-applications/open',
  'POST /api/taxi-finance/admin/agent-applications/documents',
  'POST /api/taxi-finance/admin/agent-applications/approve',
  'POST /api/taxi-finance/admin/agent-applications/reject',
] as const);

export const TAXI_AGENT_FINANCE_CHAT_REQUIRED_PROOF_FIELDS_030A = Object.freeze([
  'agentId',
  'agentAccountId',
  'countryLabel',
  'balanceCurrencyLabel',
  'requestValue',
  'adminPaymentAccountLabel',
  'proofReference',
  'proofMessageIdOrFileId',
  'ownerAdminVerificationNote',
] as const);

export const TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_030B = Object.freeze([
  'firstName',
  'lastName',
  'phone',
  'email',
  'countryLabel',
  'cityLabel',
  'addressLabel',
  'passportDocument',
  'identityDocumentFront',
  'identityDocumentBack',
  'selfieWithPassport',
  'selfieOrFacePhoto',
  'agentAgreementAccepted',
] as const);
