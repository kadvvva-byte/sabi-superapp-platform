export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_INTAKE_035P_VERSION = 'TAXI-035P-OWNER-EXACT-APPROVAL-INTAKE-PACKAGE-LOCKED' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_INTAKE_035P_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/readiness',
  publicIntakePackage: '/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/readiness',
  adminIntakePackage: '/api/admin/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package',
  upstreamExecutionLayerSplit035N: '/api/taxi/wallet-payment-payout/execution-layer-split/035n/approvals',
  upstreamExecutionPreflight035L: '/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight',
  upstreamDecisionGate035J: '/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate',
  upstreamOwnerPackage035G: '/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_INTAKE_035P_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-035P owner exact approval intake package only: safe-read locked collection of future exact owner approval commands; no wallet mutation, no payment capture, no payout, no provider call, no DB write, no production launch' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_INTAKE_035P_NEXT_STEP = '035q_owner_exact_approval_intake_admin_visibility_runtime_smoke_locked' as const;
