import type { TaxiReadOnlyDbDelegateKey002T, TaxiReadOnlyDbDryRunSafety002T } from './types';

export const TAXI_READ_ONLY_DB_RUNTIME_DRY_RUN_VERSION_002T =
  'TAXI-BACKEND-FOUNDATION-002T-READ-ONLY-DB-RUNTIME-DRY-RUN-ROUTE-PATCH' as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_002T = 'x-sabi-taxi-db-dry-run' as const;
export const TAXI_READ_ONLY_DB_DRY_RUN_APPROVAL_HEADER_VALUE_002T = 'read-only-approved-002t' as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_DELEGATES_002T: readonly TaxiReadOnlyDbDelegateKey002T[] = [
  'taxiRiderProfile',
  'taxiDriverProfile',
  'taxiDriverApplication',
  'taxiVehicle',
  'taxiDriverVehicleAssignment',
  'taxiTariffRegion',
  'taxiQuote',
  'taxiRiderRequest',
  'taxiDispatchOffer',
  'taxiTrip',
  'taxiPaymentHold',
  'taxiDriverSettlement',
  'taxiSupportCase',
  'taxiDisputeEvidence',
  'taxiSafetyEvent',
  'taxiAuditLog',
  'taxiProviderReadinessSnapshot',
  'taxiIdempotencyRecord',
  'taxiTripRatingLedger',
  'taxiRealtimeTripShadow',
] as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_ROUTES_002T = [
  '/api/taxi/002t/read-only-db-dry-run/plan',
  '/api/taxi/002t/read-only-db-dry-run',
  '/api/admin/taxi/002t/read-only-db-dry-run/diagnostics',
] as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_COUNTS_002T = {
  delegateCount: 20,
  readOnlyOperationCount: 20,
  writeOperationBlockedCount: 44,
  adminGateCount: 24,
  idempotencyGateCount: 44,
} as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_PATCH_SAFETY_002T: TaxiReadOnlyDbDryRunSafety002T = {
  envValueReadByModule: false,
  dbRead: false,
  dbWrite: false,
  prismaSchemaWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigrationApply: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
  fakeSuccessBlocked: true,
} as const;

export const TAXI_READ_ONLY_DB_DRY_RUN_EXECUTION_SAFETY_002T: TaxiReadOnlyDbDryRunSafety002T = {
  ...TAXI_READ_ONLY_DB_DRY_RUN_PATCH_SAFETY_002T,
  dbRead: true,
} as const;
