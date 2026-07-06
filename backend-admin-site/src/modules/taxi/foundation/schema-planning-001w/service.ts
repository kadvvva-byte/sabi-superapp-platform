import {
  TAXI_SCHEMA_CANDIDATE_ENUMS_001W,
  TAXI_SCHEMA_CANDIDATE_MODELS_001W,
  TAXI_SCHEMA_INDEXES_001W,
  TAXI_SCHEMA_MIGRATION_LOCKS_001W,
  TAXI_SCHEMA_PLANNING_VERSION_001W,
  TAXI_SCHEMA_PROVIDER_BOUNDARIES_001W,
  TAXI_SCHEMA_RELATIONS_001W,
} from './constants';
import type {
  TaxiSchemaCandidateDomain001W,
  TaxiSchemaCandidateModel001W,
  TaxiSchemaCandidateModelName001W,
  TaxiSchemaPlanningSnapshot001W,
  TaxiSchemaReadinessDecision001W,
  TaxiSchemaReadinessInput001W,
  TaxiSettlementSchemaPreview001W,
  TaxiSettlementSchemaPreviewInput001W,
} from './types';
import type { TaxiMoneyAmount } from '../taxiFoundation.types';

export function getTaxiSchemaPlanningSnapshot001W(): TaxiSchemaPlanningSnapshot001W {
  return {
    version: TAXI_SCHEMA_PLANNING_VERSION_001W,
    status: 'schema_planning_ready_safe_disabled',
    models: TAXI_SCHEMA_CANDIDATE_MODELS_001W,
    enums: TAXI_SCHEMA_CANDIDATE_ENUMS_001W,
    relations: TAXI_SCHEMA_RELATIONS_001W,
    indexes: TAXI_SCHEMA_INDEXES_001W,
    migrationLocks: TAXI_SCHEMA_MIGRATION_LOCKS_001W,
    providerBoundaries: TAXI_SCHEMA_PROVIDER_BOUNDARIES_001W,
    runtimeRoutesMounted: false,
    envReadNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function listTaxiSchemaCandidateModelNames001W(): readonly TaxiSchemaCandidateModelName001W[] {
  return TAXI_SCHEMA_CANDIDATE_MODELS_001W.map((candidate) => candidate.modelName);
}

export function findTaxiSchemaCandidateModel001W(modelName: TaxiSchemaCandidateModelName001W): TaxiSchemaCandidateModel001W | undefined {
  return TAXI_SCHEMA_CANDIDATE_MODELS_001W.find((candidate) => candidate.modelName === modelName);
}

export function summarizeTaxiSchemaDomains001W(): readonly { readonly domain: TaxiSchemaCandidateDomain001W; readonly modelCount: number; readonly dbWriteNow: false; readonly migrationNow: false }[] {
  const domains = Array.from(new Set(TAXI_SCHEMA_CANDIDATE_MODELS_001W.map((candidate) => candidate.domain)));
  return domains.map((domain) => ({
    domain,
    modelCount: TAXI_SCHEMA_CANDIDATE_MODELS_001W.filter((candidate) => candidate.domain === domain).length,
    dbWriteNow: false,
    migrationNow: false,
  }));
}

export function evaluateTaxiSchemaReadiness001W(input: TaxiSchemaReadinessInput001W): TaxiSchemaReadinessDecision001W {
  const missing = new Set<string>();

  if (!input.adminApprovedSchemaVersion) {
    missing.add('admin_schema_version_required');
  }
  if (!input.ownerApprovedMigration) {
    missing.add('exact_owner_migration_approval_required');
  }
  if (!input.rollbackPlanReviewed) {
    missing.add('rollback_plan_review_required');
  }
  if (!input.providerReferenceLabelsApproved) {
    missing.add('provider_reference_labels_approval_required');
  }
  if (!input.walletPaymentBoundaryApproved) {
    missing.add('wallet_payment_boundary_approval_required');
  }
  if (!input.countryCode || !input.cityId || !input.targetTariff) {
    missing.add('country_city_tariff_scope_required');
  }

  return {
    canWritePrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    missing: Array.from(missing),
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    fakeSuccessBlocked: true,
  };
}

export function previewTaxiSettlementSchema001W(input: TaxiSettlementSchemaPreviewInput001W): TaxiSettlementSchemaPreview001W {
  const gross = normalizeMinor(input.grossFareMinor);
  const basisPoints = normalizeBasisPoints(input.adminConfiguredCommissionBasisPoints);
  const commission = Math.floor((gross * basisPoints) / 10_000);
  const adjustment = normalizeSignedMinor(input.driverAdjustmentMinor);
  const refund = normalizeMinor(input.refundMinor ?? 0);
  const driverNet = Math.max(0, gross - commission + adjustment - refund);

  return {
    grossFare: money(input.currency, gross),
    commissionPreview: money(input.currency, commission),
    driverNetPreview: money(input.currency, driverNet),
    refundPreview: money(input.currency, refund),
    dbSettlementPersistedNow: false,
    walletMutationNow: false,
    paymentCaptureNow: false,
    payoutNow: false,
    adminConfigRequiredForProduction: true,
    fakeSettlementSuccessBlocked: true,
  };
}

export function getTaxiSchemaPlanningMetrics001W(): {
  readonly modelCount: number;
  readonly enumCount: number;
  readonly relationCount: number;
  readonly indexCount: number;
  readonly migrationLockCount: number;
  readonly providerBoundaryCount: number;
  readonly fieldCount: number;
} {
  return {
    modelCount: TAXI_SCHEMA_CANDIDATE_MODELS_001W.length,
    enumCount: TAXI_SCHEMA_CANDIDATE_ENUMS_001W.length,
    relationCount: TAXI_SCHEMA_RELATIONS_001W.length,
    indexCount: TAXI_SCHEMA_INDEXES_001W.length,
    migrationLockCount: TAXI_SCHEMA_MIGRATION_LOCKS_001W.length,
    providerBoundaryCount: TAXI_SCHEMA_PROVIDER_BOUNDARIES_001W.length,
    fieldCount: TAXI_SCHEMA_CANDIDATE_MODELS_001W.reduce((sum, candidate) => sum + candidate.fields.length, 0),
  };
}

function normalizeMinor(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.floor(value));
}

function normalizeSignedMinor(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }
  return Math.trunc(value);
}

function normalizeBasisPoints(value: number | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0;
  }
  return Math.min(10_000, Math.max(0, Math.floor(value)));
}

function money(currency: TaxiMoneyAmount['currency'], amountMinor: number): TaxiMoneyAmount {
  return { currency, amountMinor };
}
