export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_PLANNING_035A_VERSION = 'TAXI-035A-WALLET-PAYMENT-PAYOUT-OWNER-APPROVAL-CHAIN-PLANNING-LOCKED' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_PLANNING_035A_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness',
  publicPlan: '/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness',
  adminPlan: '/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/plan',
  upstreamFinalHandoff034R: '/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff',
  upstreamDailySnapshot034O: '/api/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot',
  upstreamOwnerAiReport034L: '/api/taxi/owner-ai/agent-request/034l/report',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_CHAIN_PLANNING_035A_NEXT_STEP = '035b_wallet_payment_payout_owner_approval_chain_admin_visibility_safe_read_locked' as const;
