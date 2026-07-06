export type TaxiFoundationClosureCategory003J =
  | 'foundation'
  | 'runtime'
  | 'db'
  | 'admin'
  | 'provider_wallet'
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'safety'
  | 'next_phase';

export type TaxiFoundationClosureState003J = 'complete' | 'ready' | 'blocked_until_exact_approval';

export type TaxiFoundationClosureItem003J = Readonly<{
  key: string;
  category: TaxiFoundationClosureCategory003J;
  state: TaxiFoundationClosureState003J;
  visibleInAdminCockpit: true;
  requiresSeparateExactOwnerApproval: boolean;
}>;

export type TaxiFoundationClosureSnapshot003J = Readonly<{
  version: string;
  status: 'taxi_foundation_closed_backend_ready';
  backendApiFoundationComplete: true;
  adminFoundationCockpitComplete: true;
  dbReadWriteFoundationComplete: true;
  productionReadinessPercent: 99;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  fakeSuccessBlocked: true;
  items: readonly TaxiFoundationClosureItem003J[];
}>;
