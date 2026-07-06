export type TaxiProviderWalletBoundaryCategory003C =
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'finance'
  | 'admin'
  | 'audit'
  | 'safety';

export type TaxiProviderWalletBoundaryGate003C = Readonly<{
  key: string;
  category: TaxiProviderWalletBoundaryCategory003C;
  runtimeApprovedNow: false;
  requiresSeparateExactOwnerApproval: true;
}>;

export type TaxiProviderWalletBoundaryPlanningSnapshot003C = Readonly<{
  version: string;
  status: 'provider_wallet_boundary_approval_planning_ready';
  dbReadWriteFoundationComplete: true;
  providerWalletBoundaryPlanningReady: true;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  providerCredentialRuntimeLookupApprovedNow: false;
  dbWriteRuntimeExecutionApprovedNow: false;
  fakeSuccessBlocked: true;
  gates: readonly TaxiProviderWalletBoundaryGate003C[];
}>;
