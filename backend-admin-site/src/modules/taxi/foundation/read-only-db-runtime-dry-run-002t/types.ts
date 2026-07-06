import type { Request, Response } from 'express';

export type TaxiReadOnlyDbDelegateKey002T =
  | 'taxiRiderProfile'
  | 'taxiDriverProfile'
  | 'taxiDriverApplication'
  | 'taxiVehicle'
  | 'taxiDriverVehicleAssignment'
  | 'taxiTariffRegion'
  | 'taxiQuote'
  | 'taxiRiderRequest'
  | 'taxiDispatchOffer'
  | 'taxiTrip'
  | 'taxiPaymentHold'
  | 'taxiDriverSettlement'
  | 'taxiSupportCase'
  | 'taxiDisputeEvidence'
  | 'taxiSafetyEvent'
  | 'taxiAuditLog'
  | 'taxiProviderReadinessSnapshot'
  | 'taxiIdempotencyRecord'
  | 'taxiTripRatingLedger'
  | 'taxiRealtimeTripShadow';

export type TaxiReadOnlyDbDryRunDelegateResult002T = Readonly<{
  delegate: TaxiReadOnlyDbDelegateKey002T;
  readOnlyOperation: 'count';
  countReadable: boolean;
  count: number | null;
  error: string | null;
}>;

export type TaxiReadOnlyDbDryRunPlan002T = Readonly<{
  version: string;
  status: 'read_only_db_runtime_dry_run_route_patched';
  routePatchApprovedNow: true;
  dbReadExecutedByPatchNow: false;
  dbWriteApprovedNow: false;
  delegateCount: 20;
  readOnlyOperationCount: 20;
  writeOperationBlockedCount: 44;
  adminGateCount: 24;
  idempotencyGateCount: 44;
  routes: readonly string[];
  nextStep: '002U protected read-only DB runtime dry-run smoke';
}>;

export type TaxiReadOnlyDbDryRunExecution002T = Readonly<{
  version: string;
  status: 'passed' | 'failed';
  dbReadExecuted: true;
  dbWriteExecuted: false;
  delegateCount: 20;
  passedDelegateReadCount: number;
  failedDelegateReads: readonly TaxiReadOnlyDbDryRunDelegateResult002T[];
  delegateResults: readonly TaxiReadOnlyDbDryRunDelegateResult002T[];
  safety: TaxiReadOnlyDbDryRunSafety002T;
}>;

export type TaxiReadOnlyDbDryRunSafety002T = Readonly<{
  envValueReadByModule: false;
  dbRead: boolean;
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

export type TaxiReadOnlyDbDryRunRouteGuard002T = Readonly<{
  requireAdminToken: (request: Request, response: Response) => boolean;
}>;
