import type { TaxiProviderWalletBoundaryGate003C, TaxiProviderWalletBoundaryPlanningSnapshot003C } from './types';

export const TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_PLANNING_VERSION_003C = 'TAXI-BACKEND-FOUNDATION-003C-PROVIDER-WALLET-BOUNDARY-APPROVAL-PLANNING' as const;

export const taxiProviderWalletBoundaryApprovalGates003C = [
  { key: 'provider_dispatch_contract_planning_only', category: 'provider', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'provider_key_reference_labels_only_no_secret_read', category: 'provider', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'provider_not_configured_runtime_state_required', category: 'provider', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'provider_timeout_retry_idempotency_contract_required', category: 'provider', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'wallet_mutation_contract_planning_only', category: 'wallet', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'wallet_hold_capture_release_boundary_required', category: 'wallet', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'wallet_refund_reversal_boundary_required', category: 'wallet', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'wallet_balance_mutation_requires_separate_exact_approval', category: 'wallet', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'payment_charge_authorization_boundary_required', category: 'payment', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'payment_capture_requires_provider_wallet_alignment', category: 'payment', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'driver_payout_settlement_boundary_required', category: 'payout', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'commission_fee_ledger_boundary_required', category: 'finance', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'admin_provider_wallet_visibility_required', category: 'admin', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'admin_provider_wallet_override_requires_exact_approval', category: 'admin', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'audit_trace_for_money_boundary_required', category: 'audit', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
  { key: 'fake_success_blocked_for_all_provider_wallet_paths', category: 'safety', runtimeApprovedNow: false, requiresSeparateExactOwnerApproval: true },
] as const satisfies readonly TaxiProviderWalletBoundaryGate003C[];

export const taxiProviderWalletBoundaryPlanningSnapshot003C = {
  version: TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_PLANNING_VERSION_003C,
  status: 'provider_wallet_boundary_approval_planning_ready',
  dbReadWriteFoundationComplete: true,
  providerWalletBoundaryPlanningReady: true,
  providerRuntimeApprovedNow: false,
  walletRuntimeApprovedNow: false,
  paymentRuntimeApprovedNow: false,
  payoutRuntimeApprovedNow: false,
  providerCredentialRuntimeLookupApprovedNow: false,
  dbWriteRuntimeExecutionApprovedNow: false,
  fakeSuccessBlocked: true,
  gates: taxiProviderWalletBoundaryApprovalGates003C,
} as const satisfies TaxiProviderWalletBoundaryPlanningSnapshot003C;
