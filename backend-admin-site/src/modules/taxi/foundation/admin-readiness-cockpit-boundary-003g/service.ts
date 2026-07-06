import { taxiAdminReadinessCockpitBoundarySnapshot003G, taxiAdminReadinessCockpitItems003G } from './constants';
import type { TaxiAdminReadinessCockpitBoundarySnapshot003G } from './types';

export function getTaxiAdminReadinessCockpitBoundarySnapshot003G(): TaxiAdminReadinessCockpitBoundarySnapshot003G {
  return taxiAdminReadinessCockpitBoundarySnapshot003G;
}

export function evaluateTaxiAdminReadinessCockpitBoundary003G(): Readonly<{
  version: string;
  adminCockpitBoundaryReady: true;
  adminCockpitItemCount: number;
  blockedRuntimeItemCount: number;
  providerWalletPaymentPayoutStillDisabled: true;
  dbRuntimeWriteExecutionApprovedNow: false;
  fakeSuccessBlocked: true;
}> {
  const blockedRuntimeItemCount = taxiAdminReadinessCockpitItems003G.filter((item) => item.state === 'blocked_until_exact_approval').length;
  return {
    version: taxiAdminReadinessCockpitBoundarySnapshot003G.version,
    adminCockpitBoundaryReady: true,
    adminCockpitItemCount: taxiAdminReadinessCockpitItems003G.length,
    blockedRuntimeItemCount,
    providerWalletPaymentPayoutStillDisabled: true,
    dbRuntimeWriteExecutionApprovedNow: false,
    fakeSuccessBlocked: true,
  };
}
