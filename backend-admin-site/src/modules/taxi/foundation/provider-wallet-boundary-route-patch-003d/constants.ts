import type { TaxiProviderWalletBoundaryGate003D, TaxiProviderWalletBoundaryRoutePatchPlan003D, TaxiProviderWalletBoundaryRoutePatchSafety003D } from './types';

export const TAXI_PROVIDER_WALLET_BOUNDARY_ROUTE_PATCH_VERSION_003D = 'TAXI-BACKEND-FOUNDATION-003D-PROVIDER-WALLET-BOUNDARY-ROUTE-PATCH' as const;

export const TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_003D = 'x-sabi-taxi-provider-wallet-boundary' as const;
export const TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_VALUE_003D = 'approve-003d-route-patch-only-no-execution' as const;

const rawTaxiProviderWalletBoundaryGates003D = [
  {
    "key": "provider_credential_lookup_route_boundary",
    "category": "provider",
    "routeScope": "diagnostic_only"
  },
  {
    "key": "provider_dispatch_runtime_remains_blocked",
    "category": "provider",
    "routeScope": "blocked"
  },
  {
    "key": "provider_not_configured_response_required",
    "category": "provider",
    "routeScope": "diagnostic_only"
  },
  {
    "key": "provider_retry_timeout_idempotency_boundary",
    "category": "provider",
    "routeScope": "contract_only"
  },
  {
    "key": "wallet_mutation_runtime_remains_blocked",
    "category": "wallet",
    "routeScope": "blocked"
  },
  {
    "key": "wallet_hold_capture_release_boundary",
    "category": "wallet",
    "routeScope": "contract_only"
  },
  {
    "key": "wallet_refund_reversal_boundary",
    "category": "wallet",
    "routeScope": "contract_only"
  },
  {
    "key": "wallet_balance_mutation_requires_exact_approval",
    "category": "wallet",
    "routeScope": "blocked"
  },
  {
    "key": "payment_authorization_boundary",
    "category": "payment",
    "routeScope": "blocked"
  },
  {
    "key": "payment_capture_requires_separate_exact_approval",
    "category": "payment",
    "routeScope": "blocked"
  },
  {
    "key": "payout_settlement_requires_separate_exact_approval",
    "category": "payout",
    "routeScope": "blocked"
  },
  {
    "key": "commission_ledger_boundary_requires_audit_trace",
    "category": "finance",
    "routeScope": "contract_only"
  },
  {
    "key": "admin_boundary_diagnostics_requires_admin_token",
    "category": "admin",
    "routeScope": "protected"
  },
  {
    "key": "admin_override_requires_separate_exact_approval",
    "category": "admin",
    "routeScope": "blocked"
  },
  {
    "key": "audit_trace_required_for_provider_wallet_paths",
    "category": "audit",
    "routeScope": "contract_only"
  },
  {
    "key": "fake_success_blocked_for_provider_wallet_routes",
    "category": "safety",
    "routeScope": "blocked"
  }
] as const;

export const taxiProviderWalletBoundaryGates003D = rawTaxiProviderWalletBoundaryGates003D.map((gate) => ({
  ...gate,
  runtimeApprovedNow: false,
  requiresSeparateExactOwnerApproval: true,
})) as readonly TaxiProviderWalletBoundaryGate003D[];

export const taxiProviderWalletBoundaryRoutePaths003D = [
  '/api/taxi/003d/provider-wallet-boundary/plan',
  '/api/taxi/003d/provider-wallet-boundary/check',
  '/api/admin/taxi/003d/provider-wallet-boundary/diagnostics',
] as const;

export const taxiProviderWalletBoundaryRoutePatchSafety003D = {
  envValueReadByModule: false,
  dbRead: false,
  dbWrite: false,
  prismaSchemaWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigrationApply: false,
  providerCredentialRuntimeLookup: false,
  providerDispatch: false,
  walletMutation: false,
  payment: false,
  payout: false,
  fakeSuccessBlocked: true,
} as const satisfies TaxiProviderWalletBoundaryRoutePatchSafety003D;

export const taxiProviderWalletBoundaryRoutePatchPlan003D = {
  version: TAXI_PROVIDER_WALLET_BOUNDARY_ROUTE_PATCH_VERSION_003D,
  status: 'provider_wallet_boundary_route_patch_ready',
  routePatchApprovedNow: true,
  providerCredentialRuntimeLookupApprovedNow: false,
  providerRuntimeApprovedNow: false,
  walletRuntimeApprovedNow: false,
  paymentRuntimeApprovedNow: false,
  payoutRuntimeApprovedNow: false,
  dbRuntimeWriteExecutionApprovedNow: false,
  boundaryGateCount: taxiProviderWalletBoundaryGates003D.length,
  providerBoundaryGateCount: taxiProviderWalletBoundaryGates003D.filter((gate) => gate.category === 'provider').length,
  walletBoundaryGateCount: taxiProviderWalletBoundaryGates003D.filter((gate) => gate.category === 'wallet').length,
  paymentPayoutBoundaryGateCount: taxiProviderWalletBoundaryGates003D.filter((gate) => gate.category === 'payment' || gate.category === 'payout').length,
  adminAuditBoundaryGateCount: taxiProviderWalletBoundaryGates003D.filter((gate) => gate.category === 'admin' || gate.category === 'audit').length,
  requiredHeader: TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_003D,
  requiredHeaderValue: TAXI_PROVIDER_WALLET_BOUNDARY_APPROVAL_HEADER_VALUE_003D,
  routes: taxiProviderWalletBoundaryRoutePaths003D,
  nextStep: '003E provider Wallet boundary route smoke only',
} as const satisfies TaxiProviderWalletBoundaryRoutePatchPlan003D;
