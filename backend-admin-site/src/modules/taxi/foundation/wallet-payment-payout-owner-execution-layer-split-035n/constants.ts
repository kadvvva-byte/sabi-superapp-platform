export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_VERSION = 'TAXI-035N-OWNER-APPROVAL-EXECUTION-LAYER-SPLIT-LOCKED' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/execution-layer-split/035n/readiness',
  publicApprovals: '/api/taxi/wallet-payment-payout/execution-layer-split/035n/approvals',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/readiness',
  adminApprovals: '/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/approvals',
  upstreamExecutionPreflight035L: '/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight',
  upstreamDecisionGate035J: '/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate',
  upstreamOwnerPackage035G: '/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package',
  upstreamFinalHandoff035D: '/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-035N owner execution layer split only: safe-read locked split of future wallet/payment/payout/provider/db approvals; no money movement, no wallet mutation, no provider call, no DB write, no production launch' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXECUTION_LAYER_SPLIT_035N_NEXT_STEP = '035o_execution_layer_split_admin_visibility_runtime_smoke_locked' as const;
