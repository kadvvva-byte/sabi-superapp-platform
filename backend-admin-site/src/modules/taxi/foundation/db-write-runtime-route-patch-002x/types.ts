import type { Request, Response } from 'express';

export type TaxiDbWriteRuntimeRoutePatchStatus002X =
  | 'db_write_runtime_route_patch_ready'
  | 'db_write_runtime_execution_still_blocked';

export type TaxiDbWriteRuntimeRoutePatchPlan002X = Readonly<{
  version: string;
  status: TaxiDbWriteRuntimeRoutePatchStatus002X;
  routePatchApprovedNow: boolean;
  dbWriteExecutedByPatchNow: boolean;
  dbWriteExecutionApprovedForSmokeNow: boolean;
  writeOperationCount: number;
  writeOperationBlockedCount: number;
  adminOperationGateCount: number;
  idempotencyGateCount: number;
  requiredHeader: string;
  requiredHeaderValue: string;
  routes: readonly string[];
  nextStep: string;
}>;

export type TaxiDbWriteRuntimeRoutePatchSafety002X = Readonly<{
  envValueReadByModule: false;
  dbRead: false;
  dbWrite: false;
  prismaSchemaWrite: false;
  prismaValidate: false;
  prismaGenerate: false;
  prismaMigrationApply: false;
  walletMutation: false;
  payment: false;
  payout: false;
  providerDispatch: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiDbWriteRuntimeRouteGuard002X = Readonly<{
  requireAdminToken: (request: Request, response: Response) => boolean;
}>;

export type TaxiDbWriteRuntimeGateResult002X = Readonly<{
  version: string;
  status: 'blocked_until_002Y_exact_db_write_smoke_approval';
  routePatchApprovedNow: true;
  dbWriteExecutionApprovedNow: false;
  dbWriteExecuted: false;
  writeOperationCount: number;
  writeOperationBlockedCount: number;
  adminOperationGateCount: number;
  idempotencyGateCount: number;
  walletMutation: false;
  providerDispatch: false;
  payment: false;
  payout: false;
  fakeSuccessBlocked: true;
}>;
