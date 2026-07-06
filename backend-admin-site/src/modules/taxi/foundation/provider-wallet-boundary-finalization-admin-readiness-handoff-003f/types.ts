export type TaxiProviderWalletAdminReadinessCategory003F =
  | 'admin'
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'audit'
  | 'safety';

export type TaxiProviderWalletAdminReadinessItem003F = Readonly<{
  key: string;
  category: TaxiProviderWalletAdminReadinessCategory003F;
  ready: true;
  runtimeExecutionApprovedNow: false;
  requiresSeparateExactOwnerApproval: true;
}>;

export type TaxiProviderWalletBoundaryFinalizationAdminReadinessSnapshot003F = Readonly<{
  version: string;
  status: 'provider_wallet_boundary_finalized_admin_readiness_handoff_ready';
  dbReadWriteFoundationComplete: true;
  providerWalletBoundarySmokePassed003E: true;
  providerWalletBoundaryFinalized003F: true;
  adminReadinessHandoffReady: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  fakeSuccessBlocked: true;
  items: readonly TaxiProviderWalletAdminReadinessItem003F[];
}>;
