import {
  taxiAdminReadinessCockpitRoutePatchPlan003H,
  taxiAdminReadinessCockpitRoutePatchSafety003H,
} from './constants';
import type {
  TaxiAdminReadinessCockpitBlockedResult003H,
  TaxiAdminReadinessCockpitRoutePatchPlan003H,
  TaxiAdminReadinessCockpitRoutePatchSafety003H,
} from './types';
import {
  evaluateTaxiAdminReadinessCockpitBoundary003G,
  getTaxiAdminReadinessCockpitBoundarySnapshot003G,
} from '../admin-readiness-cockpit-boundary-003g';

export function buildTaxiAdminReadinessCockpitRoutePatchPlan003H(): TaxiAdminReadinessCockpitRoutePatchPlan003H {
  return taxiAdminReadinessCockpitRoutePatchPlan003H;
}

export function buildTaxiAdminReadinessCockpitRoutePatchSafety003H(): TaxiAdminReadinessCockpitRoutePatchSafety003H {
  return taxiAdminReadinessCockpitRoutePatchSafety003H;
}

export function buildTaxiAdminReadinessCockpitRoutePatchSnapshot003H() {
  return {
    plan: buildTaxiAdminReadinessCockpitRoutePatchPlan003H(),
    boundary: getTaxiAdminReadinessCockpitBoundarySnapshot003G(),
    evaluation: evaluateTaxiAdminReadinessCockpitBoundary003G(),
    safety: buildTaxiAdminReadinessCockpitRoutePatchSafety003H(),
  } as const;
}

export function buildTaxiAdminReadinessCockpitBlockedResult003H(): TaxiAdminReadinessCockpitBlockedResult003H {
  return {
    version: taxiAdminReadinessCockpitRoutePatchPlan003H.version,
    status: 'blocked_until_003i_admin_cockpit_route_smoke',
    routePatchApprovedNow: true,
    providerCredentialRuntimeLookupApprovedNow: false,
    providerRuntimeApprovedNow: false,
    walletRuntimeApprovedNow: false,
    paymentRuntimeApprovedNow: false,
    payoutRuntimeApprovedNow: false,
    dbRuntimeWriteExecutionApprovedNow: false,
    providerDispatch: false,
    walletMutation: false,
    payment: false,
    payout: false,
    fakeSuccessBlocked: true,
    adminCockpitItemCount: taxiAdminReadinessCockpitRoutePatchPlan003H.adminCockpitItemCount,
    blockedRuntimeItemCount: taxiAdminReadinessCockpitRoutePatchPlan003H.blockedRuntimeItemCount,
  };
}
