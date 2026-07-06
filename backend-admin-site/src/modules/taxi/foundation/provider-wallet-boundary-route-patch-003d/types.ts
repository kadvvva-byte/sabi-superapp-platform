import type { Request, Response } from 'express';

export type TaxiProviderWalletBoundaryCategory003D =
  | 'provider'
  | 'wallet'
  | 'payment'
  | 'payout'
  | 'finance'
  | 'admin'
  | 'audit'
  | 'safety';

export type TaxiProviderWalletBoundaryRouteScope003D =
  | 'diagnostic_only'
  | 'blocked'
  | 'contract_only'
  | 'protected';

export type TaxiProviderWalletBoundaryGate003D = Readonly<{
  key: string;
  category: TaxiProviderWalletBoundaryCategory003D;
  routeScope: TaxiProviderWalletBoundaryRouteScope003D;
  runtimeApprovedNow: false;
  requiresSeparateExactOwnerApproval: true;
}>;

export type TaxiProviderWalletBoundaryRoutePatchPlan003D = Readonly<{
  version: string;
  status: 'provider_wallet_boundary_route_patch_ready';
  routePatchApprovedNow: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  boundaryGateCount: number;
  providerBoundaryGateCount: number;
  walletBoundaryGateCount: number;
  paymentPayoutBoundaryGateCount: number;
  adminAuditBoundaryGateCount: number;
  requiredHeader: string;
  requiredHeaderValue: string;
  routes: readonly string[];
  nextStep: string;
}>;

export type TaxiProviderWalletBoundaryRoutePatchSafety003D = Readonly<{
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

export type TaxiProviderWalletBoundaryGuard003D = Readonly<{
  requireAdminToken: (request: Request, response: Response) => boolean;
}>;

export type TaxiProviderWalletBoundaryBlockedResult003D = Readonly<{
  version: string;
  status: 'blocked_until_003e_provider_wallet_boundary_smoke';
  routePatchApprovedNow: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  providerDispatch: false;
  walletMutation: false;
  payment: false;
  payout: false;
  fakeSuccessBlocked: true;
  boundaryGateCount: number;
}>;
