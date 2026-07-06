export const TAXI_AGENT_APPLICATION_ACCESS_029A_VERSION = 'TAXI-AGENT-APPLICATION-ACCESS-029A' as const;

export const TAXI_AGENT_APPLICATION_REQUIRED_FIELDS_029A = Object.freeze([
  'firstName',
  'lastName',
  'phone',
  'countryCode',
  'city',
  'documentType',
  'documentNumber',
  'documentFrontFileId',
  'selfieFileId',
  'address',
  'agentWorkRegion',
  'payoutOrSettlementContact',
  'consentToVerification',
] as const);

export const TAXI_AGENT_APPLICATION_ACCESS_ROUTES_029A = Object.freeze([
  'GET /api/taxi/agent/029a/readiness',
  'POST /api/taxi/agents/applications',
  'GET /api/taxi/mobile/agent/access',
  'POST /api/taxi/mobile/agent/driver-balance-topup/request',
  'POST /api/taxi-finance/admin/agents/contacts',
  'POST /api/taxi-finance/admin/agents/chat/open',
  'POST /api/taxi-finance/admin/agents/chat/send',
  'POST /api/taxi-finance/admin/agents/payment-link/create',
  'POST /api/taxi-finance/admin/agents/proof/attach',
  'POST /api/taxi-finance/admin/agents/fx/preview',
  'POST /api/taxi-finance/admin/agents/internal-credit/submit',
  'POST /api/taxi-finance/admin/agents/report/daily',
  'POST /api/taxi-finance/admin/agents/archive/search',
] as const);
