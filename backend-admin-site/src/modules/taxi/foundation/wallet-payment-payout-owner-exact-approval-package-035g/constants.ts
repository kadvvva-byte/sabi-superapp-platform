export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_PACKAGE_035G_VERSION = 'TAXI-035G-WALLET-PAYMENT-PAYOUT-OWNER-EXACT-APPROVAL-PACKAGE-LOCKED' as const;

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_PACKAGE_035G_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness',
  publicPackage: '/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness',
  adminPackage: '/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package',
  upstreamFinalHandoff035D: '/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff',
  upstreamApprovalPlan035A: '/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan',
  upstreamFinalHandoff034R: '/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_EXACT_APPROVAL_PACKAGE_035G_NEXT_STEP = '035h_wallet_payment_payout_owner_exact_approval_package_admin_visibility_safe_read_locked' as const;
