export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_SAFE_READ_034O_VERSION = 'TAXI-034O-OWNER-SABI-AI-REPORT-DAILY-SNAPSHOT-SAFE-READ' as const;

export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_SAFE_READ_034O_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness',
  publicSnapshot: '/api/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot',
  adminReadiness: '/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness',
  adminSnapshot: '/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot',
  upstreamOwnerAiReportReadiness034L: '/api/taxi/owner-ai/agent-request/034l/readiness',
  upstreamOwnerAiReport034L: '/api/taxi/owner-ai/agent-request/034l/report',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_SAFE_READ_034O_TODAY_UTC = 'runtime_generated_utc_date_only_no_db_write' as const;
