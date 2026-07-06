export type TaxiAdminReadinessCockpitCategory003G =
  | 'foundation'
  | 'db'
  | 'runtime'
  | 'admin'
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'safety';

export type TaxiAdminReadinessCockpitState003G =
  | 'complete'
  | 'ready'
  | 'blocked_until_exact_approval';

export type TaxiAdminReadinessCockpitItem003G = Readonly<{
  key: string;
  category: TaxiAdminReadinessCockpitCategory003G;
  state: TaxiAdminReadinessCockpitState003G;
  visibleInAdminCockpit: true;
  runtimeExecutionApprovedNow: false;
  requiresSeparateExactOwnerApproval: boolean;
}>;

export type TaxiAdminReadinessCockpitBoundarySnapshot003G = Readonly<{
  version: string;
  status: 'admin_readiness_cockpit_boundary_ready';
  dbReadWriteFoundationComplete: true;
  adminReadinessHandoffReady: true;
  adminCockpitBoundaryReady: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  fakeSuccessBlocked: true;
  items: readonly TaxiAdminReadinessCockpitItem003G[];
}>;
