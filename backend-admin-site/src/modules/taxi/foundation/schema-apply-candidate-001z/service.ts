import {
  TAXI_PRISMA_ENUM_CANDIDATES_001Z,
  TAXI_PRISMA_MODEL_CANDIDATES_001Z,
  TAXI_SCHEMA_APPEND_CANDIDATE_TEXT_001Z,
  TAXI_SCHEMA_APPLY_CANDIDATE_VERSION_001Z,
  TAXI_SCHEMA_APPLY_GATES_001Z,
  TAXI_SCHEMA_APPLY_PLAN_STEPS_001Z,
} from './constants';
import type {
  TaxiPrismaModelCandidate001Z,
  TaxiSchemaApplyCandidateDomain001Z,
  TaxiSchemaApplyCandidateModelName001Z,
  TaxiSchemaApplyCandidateReadinessDecision001Z,
  TaxiSchemaApplyCandidateReadinessInput001Z,
  TaxiSchemaApplyCandidateSnapshot001Z,
  TaxiSchemaApplyGateId001Z,
} from './types';

export function getTaxiSchemaApplyCandidateSnapshot001Z(): TaxiSchemaApplyCandidateSnapshot001Z {
  return {
    version: TAXI_SCHEMA_APPLY_CANDIDATE_VERSION_001Z,
    status: 'schema_apply_candidate_ready_safe_disabled',
    enums: TAXI_PRISMA_ENUM_CANDIDATES_001Z,
    models: TAXI_PRISMA_MODEL_CANDIDATES_001Z,
    gates: TAXI_SCHEMA_APPLY_GATES_001Z,
    planSteps: TAXI_SCHEMA_APPLY_PLAN_STEPS_001Z,
    appendCandidateText: TAXI_SCHEMA_APPEND_CANDIDATE_TEXT_001Z,
    schemaPrismaPatchedNow: false,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    routeRuntimeMountedNow: false,
    adminUiRuntimeMountedNow: false,
    walletMutationNow: false,
    paymentNow: false,
    payoutNow: false,
    providerDispatchNow: false,
    fakeSuccessBlocked: true,
  };
}

export function buildTaxiPrismaSchemaAppendCandidate001Z(): string {
  return TAXI_SCHEMA_APPEND_CANDIDATE_TEXT_001Z;
}

export function listTaxiSchemaApplyCandidateModelNames001Z(): readonly TaxiSchemaApplyCandidateModelName001Z[] {
  return TAXI_PRISMA_MODEL_CANDIDATES_001Z.map((candidate) => candidate.modelName);
}

export function findTaxiSchemaApplyCandidateModel001Z(
  modelName: TaxiSchemaApplyCandidateModelName001Z,
): TaxiPrismaModelCandidate001Z | undefined {
  return TAXI_PRISMA_MODEL_CANDIDATES_001Z.find((candidate) => candidate.modelName === modelName);
}

export function summarizeTaxiSchemaApplyCandidateDomains001Z(): readonly {
  readonly domain: TaxiSchemaApplyCandidateDomain001Z;
  readonly modelCount: number;
  readonly enumCount: number;
  readonly schemaWriteNow: false;
  readonly migrationNow: false;
  readonly dbWriteNow: false;
}[] {
  const domains = Array.from(
    new Set<TaxiSchemaApplyCandidateDomain001Z>([
      ...TAXI_PRISMA_MODEL_CANDIDATES_001Z.map((candidate) => candidate.domain),
      ...TAXI_PRISMA_ENUM_CANDIDATES_001Z.map((candidate) => candidate.domain),
    ]),
  );

  return domains.map((domain) => ({
    domain,
    modelCount: TAXI_PRISMA_MODEL_CANDIDATES_001Z.filter((candidate) => candidate.domain === domain).length,
    enumCount: TAXI_PRISMA_ENUM_CANDIDATES_001Z.filter((candidate) => candidate.domain === domain).length,
    schemaWriteNow: false,
    migrationNow: false,
    dbWriteNow: false,
  }));
}

export function evaluateTaxiSchemaApplyCandidateReadiness001Z(
  input: TaxiSchemaApplyCandidateReadinessInput001Z,
): TaxiSchemaApplyCandidateReadinessDecision001Z {
  const missing: TaxiSchemaApplyGateId001Z[] = [];

  if (!input.ownerExactSchemaAppendApproval) {
    missing.push('owner_exact_schema_append_approval_required');
  }
  if (!input.schemaBackupReviewed) {
    missing.push('schema_backup_required');
  }
  if (!input.duplicateModelScanPassed) {
    missing.push('duplicate_model_scan_required');
  }
  if (!input.relationIntegrityReviewed) {
    missing.push('relation_integrity_review_required');
  }
  if (!input.rollbackPlanReviewed) {
    missing.push('rollback_plan_required');
  }
  if (!input.migrationWindowApproved) {
    missing.push('migration_separate_approval_required');
  }
  if (!input.providerBoundariesApproved) {
    missing.push('wallet_payment_provider_separate_approval_required');
  }
  if (!input.walletPaymentBoundaryApproved) {
    missing.push('wallet_payment_provider_separate_approval_required');
  }

  return {
    canAppendPrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    missing: Array.from(new Set(missing)),
    fakeSuccessBlocked: true,
  };
}

export function countTaxiSchemaApplyCandidateRelations001Z(): number {
  return TAXI_PRISMA_MODEL_CANDIDATES_001Z.reduce((count, candidate) => count + candidate.requiredRelations.length, 0);
}

export function countTaxiSchemaApplyCandidateIndexes001Z(): number {
  return TAXI_PRISMA_MODEL_CANDIDATES_001Z.reduce((count, candidate) => count + candidate.requiredIndexes.length, 0);
}
