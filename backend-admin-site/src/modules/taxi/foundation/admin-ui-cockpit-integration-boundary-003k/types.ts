export type TaxiAdminUiCockpitIntegrationCategory003K =
  | 'foundation'
  | 'db'
  | 'runtime'
  | 'admin'
  | 'provider_wallet'
  | 'activation'
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'admin_ui'
  | 'safety'
  | 'next_phase';

export type TaxiAdminUiCockpitIntegrationState003K = 'complete' | 'ready' | 'blocked_until_exact_approval';

export type TaxiAdminUiCockpitIntegrationItem003K = Readonly<{
  key: string;
  category: TaxiAdminUiCockpitIntegrationCategory003K;
  state: TaxiAdminUiCockpitIntegrationState003K;
  visibleInAdminUi: true;
  requiresSeparateExactOwnerApproval: boolean;
}>;

export type TaxiAdminUiCockpitIntegrationSnapshot003K = Readonly<{
  version: string;
  status: 'admin_ui_cockpit_integration_boundary_ready';
  backendApiFoundationComplete: true;
  adminFoundationCockpitComplete: true;
  adminUiIntegrationBoundaryReady: true;
  adminUiSourceWritePerformed: false;
  productionReadinessPercent: 99;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  fakeSuccessBlocked: true;
  items: readonly TaxiAdminUiCockpitIntegrationItem003K[];
}>;
