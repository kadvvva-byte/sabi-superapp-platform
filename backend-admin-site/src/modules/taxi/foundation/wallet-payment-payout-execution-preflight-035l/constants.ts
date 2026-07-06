export const TAXI_WALLET_PAYMENT_PAYOUT_EXECUTION_PREFLIGHT_035L_VERSION = 'TAXI-035L-REAL-WALLET-PAYMENT-PAYOUT-PROVIDER-DB-EXECUTION-PREFLIGHT-LOCKED' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_EXECUTION_PREFLIGHT_035L_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/execution-preflight/035l/readiness',
  publicPreflight: '/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/readiness',
  adminPreflight: '/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/preflight',
  upstreamDecisionGate035J: '/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate',
  upstreamOwnerPackage035G: '/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package',
  upstreamFinalHandoff035D: '/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_WALLET_PAYMENT_PAYOUT_EXECUTION_PREFLIGHT_035L_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-035L real wallet/payment/payout/provider/db execution preflight only: no money movement, no wallet mutation, no provider call, no DB write' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_EXECUTION_PREFLIGHT_035L_NEXT_STEP = '035m_execution_preflight_admin_visibility_runtime_smoke_locked' as const;
