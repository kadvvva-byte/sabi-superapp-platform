export type TaxiProviderWalletBoundarySmokeEndpointStatus003E = 200 | 403 | 409;

export type TaxiProviderWalletBoundarySmokeEndpoint003E = Readonly<{
  key: string;
  method: 'GET' | 'POST';
  path: string;
  expectedStatus: TaxiProviderWalletBoundarySmokeEndpointStatus003E;
  requiresBoundaryHeader: boolean;
}>;

export type TaxiProviderWalletBoundaryRouteSmokeSafety003E = Readonly<{
  envValueReadByModule: false;
  dbRead: false;
  dbWrite: false;
  prismaSchemaWrite: false;
  prismaValidate: false;
  prismaGenerate: false;
  prismaMigrationApply: false;
  providerCredentialRuntimeLookup: false;
  providerDispatch: false;
  walletMutation: false;
  payment: false;
  payout: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiProviderWalletBoundaryRouteSmokePlan003E = Readonly<{
  version: string;
  status: 'provider_wallet_boundary_route_smoke_ready';
  boundarySmokeApprovedNow: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  expectedEndpointCount: number;
  expectedBoundaryGateCount: number;
  expectedProviderBoundaryGateCount: number;
  expectedWalletBoundaryGateCount: number;
  expectedPaymentPayoutBoundaryGateCount: number;
  expectedAdminAuditBoundaryGateCount: number;
  nextStep: string;
}>;
