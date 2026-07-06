import type {
  TaxiSchemaRealAppendLock002B,
  TaxiSchemaRealAppendRequirement002B,
  TaxiSchemaRealAppendVersion002B,
} from './types';

export const TAXI_SCHEMA_REAL_APPEND_VERSION_002B: TaxiSchemaRealAppendVersion002B =
  'TAXI-BACKEND-FOUNDATION-002B-REAL-SCHEMA-APPEND';

export const TAXI_SCHEMA_REAL_APPEND_START_MARKER_002B =
  '/// BEGIN SABI TAXI BACKEND FOUNDATION 002B SCHEMA APPEND';

export const TAXI_SCHEMA_REAL_APPEND_END_MARKER_002B =
  '/// END SABI TAXI BACKEND FOUNDATION 002B SCHEMA APPEND';

export const TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B = [
  'TaxiRiderProfile',
  'TaxiDriverProfile',
  'TaxiDriverApplication',
  'TaxiVehicle',
  'TaxiDriverVehicleAssignment',
  'TaxiTariffRegion',
  'TaxiQuote',
  'TaxiRiderRequest',
  'TaxiDispatchOffer',
  'TaxiTrip',
  'TaxiPaymentHold',
  'TaxiDriverSettlement',
  'TaxiSupportCase',
  'TaxiDisputeEvidence',
  'TaxiSafetyEvent',
  'TaxiAuditLog',
  'TaxiProviderReadinessSnapshot',
  'TaxiIdempotencyRecord',
  'TaxiTripRatingLedger',
  'TaxiRealtimeTripShadow',
] as const;

export const TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B = [
  'TaxiDriverVerificationStatus',
  'TaxiVehicleReviewStatus',
  'TaxiTariffRegionStatus',
  'TaxiQuoteStatus',
  'TaxiRiderRequestStatus',
  'TaxiDispatchOfferStatus',
  'TaxiTripStatus',
  'TaxiPaymentHoldStatus',
  'TaxiSettlementStatus',
  'TaxiSupportCaseStatus',
  'TaxiDisputeEvidenceType',
  'TaxiSafetyEventType',
  'TaxiAuditActorType',
  'TaxiProviderArea',
  'TaxiIdempotencyStatus',
  'TaxiRatingLedgerSource',
  'TaxiRealtimeShadowStatus',
] as const;

const lock = (id: TaxiSchemaRealAppendLock002B['id'], label: string): TaxiSchemaRealAppendLock002B => ({
  id,
  label,
  lockedAfterSchemaAppend: true,
  requiresSeparateApproval: true,
  fakeUnlockBlocked: true,
});

export const TAXI_SCHEMA_REAL_APPEND_LOCKS_002B: readonly TaxiSchemaRealAppendLock002B[] = [
  lock('prisma_generate_still_blocked', 'Prisma generate remains blocked after schema append'),
  lock('prisma_migration_still_blocked', 'Prisma migration remains blocked after schema append'),
  lock('db_runtime_still_blocked', 'DB read/write remains blocked after schema append'),
  lock('taxi_route_runtime_still_blocked', 'Taxi route runtime remains unmounted after schema append'),
  lock('wallet_payment_provider_still_blocked', 'Wallet/payment/provider execution remains blocked'),
  lock('admin_ui_runtime_still_blocked', 'Admin UI runtime wiring remains blocked'),
];

export const TAXI_SCHEMA_REAL_APPEND_REQUIREMENTS_002B: readonly TaxiSchemaRealAppendRequirement002B[] = [
  ...TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B.map((name) => ({
    kind: 'model' as const,
    name,
    requiredInSchemaAfterApply: true,
  })),
  ...TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B.map((name) => ({
    kind: 'enum' as const,
    name,
    requiredInSchemaAfterApply: true,
  })),
  {
    kind: 'marker',
    name: TAXI_SCHEMA_REAL_APPEND_START_MARKER_002B,
    requiredInSchemaAfterApply: true,
  },
  {
    kind: 'marker',
    name: TAXI_SCHEMA_REAL_APPEND_END_MARKER_002B,
    requiredInSchemaAfterApply: true,
  },
  {
    kind: 'backup',
    name: 'prisma/schema.prisma.taxi-002b-before-append.backup',
    requiredInSchemaAfterApply: true,
  },
  {
    kind: 'report',
    name: '.data/taxi/002b/schema-append-report.json',
    requiredInSchemaAfterApply: true,
  },
];
