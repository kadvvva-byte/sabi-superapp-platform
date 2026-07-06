export const TAXI_OWNER_AI_AGENT_REQUEST_REPORT_SAFE_DISABLED_034L_VERSION = 'TAXI-034L-OWNER-AI-AGENT-REQUEST-REPORT-SAFE-DISABLED' as const;

export const TAXI_OWNER_AI_AGENT_REQUEST_REPORT_SAFE_DISABLED_034L_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/owner-ai/agent-request/034l/readiness',
  publicReport: '/api/taxi/owner-ai/agent-request/034l/report',
  adminReadiness: '/api/admin/taxi/owner-ai/agent-request/034l/readiness',
  adminReport: '/api/admin/taxi/owner-ai/agent-request/034l/report',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);
