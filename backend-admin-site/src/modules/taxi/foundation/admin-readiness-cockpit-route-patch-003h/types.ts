import type { Request, Response } from 'express';

export type TaxiAdminReadinessCockpitRoutePatchGuard003H = Readonly<{
  requireAdminToken: (request: Request, response: Response) => boolean;
}>;

export type TaxiAdminReadinessCockpitRoutePatchSafety003H = Readonly<{
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

export type TaxiAdminReadinessCockpitRoutePatchPlan003H = Readonly<{
  version: string;
  status: 'admin_readiness_cockpit_route_patch_ready';
  routePatchApprovedNow: true;
  adminCockpitItemCount: number;
  blockedRuntimeItemCount: number;
  completeItemCount: number;
  readyItemCount: number;
  providerWalletBoundaryGateCount: number;
  routeCatalogCount: number;
  hardeningHeaderCount: number;
  protectedPolicyCount: number;
  requiredHeader: string;
  requiredHeaderValue: string;
  routes: readonly string[];
  nextStep: string;
}>;

export type TaxiAdminReadinessCockpitBlockedResult003H = Readonly<{
  version: string;
  status: 'blocked_until_003i_admin_cockpit_route_smoke';
  routePatchApprovedNow: true;
  providerCredentialRuntimeLookupApprovedNow: false;
  providerRuntimeApprovedNow: false;
  walletRuntimeApprovedNow: false;
  paymentRuntimeApprovedNow: false;
  payoutRuntimeApprovedNow: false;
  dbRuntimeWriteExecutionApprovedNow: false;
  providerDispatch: false;
  walletMutation: false;
  payment: false;
  payout: false;
  fakeSuccessBlocked: true;
  adminCockpitItemCount: number;
  blockedRuntimeItemCount: number;
}>;
