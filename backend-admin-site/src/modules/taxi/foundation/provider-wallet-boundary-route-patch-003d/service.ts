import {
  taxiProviderWalletBoundaryGates003D,
  taxiProviderWalletBoundaryRoutePatchPlan003D,
  taxiProviderWalletBoundaryRoutePatchSafety003D,
} from './constants';
import type {
  TaxiProviderWalletBoundaryBlockedResult003D,
  TaxiProviderWalletBoundaryRoutePatchPlan003D,
  TaxiProviderWalletBoundaryRoutePatchSafety003D,
} from './types';

export function buildTaxiProviderWalletBoundaryRoutePatchPlan003D(): TaxiProviderWalletBoundaryRoutePatchPlan003D {
  return taxiProviderWalletBoundaryRoutePatchPlan003D;
}

export function buildTaxiProviderWalletBoundaryRoutePatchSafety003D(): TaxiProviderWalletBoundaryRoutePatchSafety003D {
  return taxiProviderWalletBoundaryRoutePatchSafety003D;
}

export function buildTaxiProviderWalletBoundaryBlockedResult003D(): TaxiProviderWalletBoundaryBlockedResult003D {
  return {
    version: taxiProviderWalletBoundaryRoutePatchPlan003D.version,
    status: 'blocked_until_003e_provider_wallet_boundary_smoke',
    routePatchApprovedNow: true,
    providerCredentialRuntimeLookupApprovedNow: false,
    providerRuntimeApprovedNow: false,
    walletRuntimeApprovedNow: false,
    paymentRuntimeApprovedNow: false,
    payoutRuntimeApprovedNow: false,
    providerDispatch: false,
    walletMutation: false,
    payment: false,
    payout: false,
    fakeSuccessBlocked: true,
    boundaryGateCount: taxiProviderWalletBoundaryGates003D.length,
  };
}
