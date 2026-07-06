export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_FINAL_HANDOFF_034R_VERSION = 'TAXI-034R-OWNER-SABI-AI-DAILY-SNAPSHOT-FINAL-HANDOFF-SAFE-DISABLED' as const;

export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_FINAL_HANDOFF_034R_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/readiness',
  publicHandoff: '/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff',
  adminReadiness: '/api/admin/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/readiness',
  adminHandoff: '/api/admin/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff',
  upstreamDailySnapshotReadiness034O: '/api/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness',
  upstreamDailySnapshot034O: '/api/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot',
  upstreamOwnerAiReport034L: '/api/taxi/owner-ai/agent-request/034l/report',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_OWNER_AI_AGENT_REQUEST_DAILY_SNAPSHOT_FINAL_HANDOFF_034R_NEXT_STEP = '035a_wallet_payment_payout_owner_approval_chain_planning_locked' as const;
