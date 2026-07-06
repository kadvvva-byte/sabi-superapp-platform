export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_FINAL_LOCK_SELECTION_035V_VERSION = 'TAXI-035V-OWNER-APPROVAL-EXECUTION-FINAL-LOCK-SELECTION-LOCKED';

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_FINAL_LOCK_SELECTION_035V_REQUIRED_OWNER_APPROVAL =
  'Separate exact owner approval is required for one selected execution layer before any real wallet/payment/payout/provider/DB action.';

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_FINAL_LOCK_SELECTION_035V_NEXT_STEP =
  '035w_owner_exact_approval_selected_layer_preflight_locked';

export const TAXI_WALLET_PAYMENT_PAYOUT_OWNER_APPROVAL_FINAL_LOCK_SELECTION_035V_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness',
  publicSelection: '/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection',
  publicSummary: '/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary',
  adminReadiness: '/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness',
  adminSelection: '/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection',
  adminSummary: '/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary',
  upstreamExecutionRuntimeGate035T: '/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate',
  upstreamMegaHandoff035Q035S: '/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff',
  upstreamOwnerExactApprovalIntake035P: '/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package',
  upstreamContactRequestGate034C: '/api/taxi/mobile/agent/contact/034c/request',
  upstreamDirectoryRequestGate034D: '/api/taxi/mobile/agent/directory/034d/contact-request',
} as const);
