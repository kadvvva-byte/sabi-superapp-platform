export type TaxiDbWriteExecutionFinalizationBoundaryGate003B = Readonly<{
  key: string;
  category: 'wallet' | 'payment' | 'payout' | 'provider' | 'finance' | 'admin' | 'production_write';
  runtimeApprovedNow: false;
  requiresSeparateExactOwnerApproval: true;
}>;

export type TaxiDbWriteExecutionFinalizationSnapshot003B = Readonly<{
  version: string;
  status: 'db_write_execution_finalized_provider_wallet_boundary_ready';
  dbReadWriteFoundationComplete: true;
  productionWriteFlowsStillBlocked: true;
  providerWalletBoundaryApprovalReady: true;
  walletRuntimeApprovedNow: false;
  providerRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  fakeSuccessBlocked: true;
  boundaryGates: readonly TaxiDbWriteExecutionFinalizationBoundaryGate003B[];
}>;
