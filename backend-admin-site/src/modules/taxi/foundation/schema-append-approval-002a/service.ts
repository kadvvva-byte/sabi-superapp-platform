import {
  buildTaxiPrismaSchemaAppendCandidate001Z,
  listTaxiSchemaApplyCandidateModelNames001Z,
  TAXI_PRISMA_ENUM_CANDIDATES_001Z,
} from '../schema-apply-candidate-001z';
import {
  TAXI_SCHEMA_APPEND_APPROVAL_GATES_002A,
  TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_ENUM_NAMES_002A,
  TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_MODEL_NAMES_002A,
  TAXI_SCHEMA_APPEND_APPROVAL_STEPS_002A,
  TAXI_SCHEMA_APPEND_APPROVAL_VERSION_002A,
  TAXI_SCHEMA_APPEND_DUPLICATE_SCAN_RULES_002A,
  TAXI_SCHEMA_APPEND_ROLLBACK_RULES_002A,
} from './constants';
import type {
  TaxiSchemaAppendApprovalDecision002A,
  TaxiSchemaAppendApprovalGateId002A,
  TaxiSchemaAppendApprovalInput002A,
  TaxiSchemaAppendApprovalSnapshot002A,
  TaxiSchemaAppendCandidateSummary002A,
} from './types';

export function summarizeTaxiSchemaAppendCandidate002A(): TaxiSchemaAppendCandidateSummary002A {
  const appendCandidateText = buildTaxiPrismaSchemaAppendCandidate001Z();
  const modelNames = listTaxiSchemaApplyCandidateModelNames001Z();
  const enumNames = TAXI_PRISMA_ENUM_CANDIDATES_001Z.map((candidate) => candidate.enumName);

  return {
    modelNames,
    enumNames,
    modelCount: modelNames.length,
    enumCount: enumNames.length,
    appendCandidateLength: appendCandidateText.length,
    appendCandidateLineCount: appendCandidateText.split('\n').length,
    prismaSchemaWriteNow: false,
    prismaGenerateNow: false,
    prismaMigrationNow: false,
    dbReadNow: false,
    dbWriteNow: false,
  };
}

export function getTaxiSchemaAppendApprovalSnapshot002A(): TaxiSchemaAppendApprovalSnapshot002A {
  return {
    version: TAXI_SCHEMA_APPEND_APPROVAL_VERSION_002A,
    status: 'schema_append_approval_ready_safe_disabled',
    gates: TAXI_SCHEMA_APPEND_APPROVAL_GATES_002A,
    steps: TAXI_SCHEMA_APPEND_APPROVAL_STEPS_002A,
    duplicateScanRules: TAXI_SCHEMA_APPEND_DUPLICATE_SCAN_RULES_002A,
    rollbackRules: TAXI_SCHEMA_APPEND_ROLLBACK_RULES_002A,
    candidateSummary: summarizeTaxiSchemaAppendCandidate002A(),
    ownerExactApprovalRequired: true,
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

export function buildTaxiSchemaAppendApprovalRequest002A(): string {
  const models = TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_MODEL_NAMES_002A.join(', ');
  const enums = TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_ENUM_NAMES_002A.join(', ');
  return [
    'I approve TAXI-BACKEND-FOUNDATION-002A controlled Prisma schema append planning only.',
    'Read-only structural review is allowed for prisma/schema.prisma and Taxi schema append candidate artifacts.',
    `Taxi model candidates: ${models}.`,
    `Taxi enum candidates: ${enums}.`,
    'No Prisma generate, no Prisma migration, no DB read/write, no route mount, no Wallet/payment/payout, no provider dispatch, no env read.',
    'Any real schema write requires a separate exact owner approval after duplicate, relation, backup, and rollback review.',
  ].join(' ');
}

export function evaluateTaxiSchemaAppendApproval002A(
  input: TaxiSchemaAppendApprovalInput002A,
): TaxiSchemaAppendApprovalDecision002A {
  const missingGateIds: TaxiSchemaAppendApprovalGateId002A[] = [];

  if (!input.ownerExactApprovalTextPresent) missingGateIds.push('owner_exact_002a_schema_append_approval_required');
  if (!input.currentSchemaReviewed) missingGateIds.push('current_schema_read_review_required');
  if (!input.schemaBackupPrepared) missingGateIds.push('schema_backup_file_required');
  if (!input.duplicateScanPassed) missingGateIds.push('duplicate_model_enum_scan_required');
  if (!input.relationIntegrityReviewed) missingGateIds.push('relation_integrity_review_required');
  if (!input.indexCollisionReviewed) missingGateIds.push('index_and_unique_name_collision_review_required');
  if (!input.rollbackPatchReviewed) missingGateIds.push('rollback_patch_required');
  if (!input.prismaGenerateApprovalGranted) missingGateIds.push('prisma_generate_separate_approval_required');
  if (!input.migrationApprovalGranted) missingGateIds.push('migration_separate_approval_required');
  if (!input.dbSmokeApprovalGranted) missingGateIds.push('db_smoke_separate_approval_required');
  if (!input.routeMountApprovalGranted) missingGateIds.push('runtime_route_mount_separate_approval_required');
  if (!input.walletProviderApprovalGranted) missingGateIds.push('wallet_payment_provider_runtime_separate_approval_required');
  if (!input.adminUiRuntimeApprovalGranted) missingGateIds.push('admin_ui_runtime_separate_approval_required');

  return {
    canWritePrismaSchemaNow: false,
    canRunPrismaGenerateNow: false,
    canRunMigrationNow: false,
    canReadDbNow: false,
    canWriteDbNow: false,
    canMountRuntimeRoutesNow: false,
    canEnableWalletPaymentProviderNow: false,
    safeDisabled: true,
    exactOwnerApprovalRequired: true,
    missingGateIds: Array.from(new Set(missingGateIds)),
    fakeSuccessBlocked: true,
  };
}

export function assertTaxiSchemaAppendCandidateCoverage002A(): {
  readonly requiredModelCount: number;
  readonly requiredEnumCount: number;
  readonly candidateModelCount: number;
  readonly candidateEnumCount: number;
  readonly allRequiredModelsCovered: boolean;
  readonly allRequiredEnumsCovered: boolean;
  readonly prismaSchemaWriteNow: false;
  readonly dbWriteNow: false;
  readonly fakeSuccessBlocked: true;
} {
  const summary = summarizeTaxiSchemaAppendCandidate002A();
  const modelNameSet = new Set(summary.modelNames);
  const enumNameSet = new Set(summary.enumNames);

  return {
    requiredModelCount: TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_MODEL_NAMES_002A.length,
    requiredEnumCount: TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_ENUM_NAMES_002A.length,
    candidateModelCount: summary.modelCount,
    candidateEnumCount: summary.enumCount,
    allRequiredModelsCovered: TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_MODEL_NAMES_002A.every((name) => modelNameSet.has(name)),
    allRequiredEnumsCovered: TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_ENUM_NAMES_002A.every((name) => enumNameSet.has(name)),
    prismaSchemaWriteNow: false,
    dbWriteNow: false,
    fakeSuccessBlocked: true,
  };
}
