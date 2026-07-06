import type {
  TaxiSchemaAppendApprovalGate002A,
  TaxiSchemaAppendApprovalStep002A,
  TaxiSchemaAppendApprovalVersion002A,
  TaxiSchemaAppendDuplicateScanRule002A,
  TaxiSchemaAppendRollbackRule002A,
} from './types';

export const TAXI_SCHEMA_APPEND_APPROVAL_VERSION_002A: TaxiSchemaAppendApprovalVersion002A =
  'TAXI-BACKEND-FOUNDATION-002A-MEGA';

const gate = (id: TaxiSchemaAppendApprovalGate002A['id'], label: string): TaxiSchemaAppendApprovalGate002A => ({
  id,
  label,
  passedNow: false,
  blocksAppendNow: true,
  blocksPrismaGenerateNow: true,
  blocksMigrationNow: true,
  blocksDbNow: true,
  exactOwnerApprovalRequired: true,
  fakePassBlocked: true,
});

export const TAXI_SCHEMA_APPEND_APPROVAL_GATES_002A: readonly TaxiSchemaAppendApprovalGate002A[] = [
  gate('owner_exact_002a_schema_append_approval_required', 'Owner exact approval for 002A schema append is required'),
  gate('current_schema_read_review_required', 'Current prisma/schema.prisma must be reviewed before append'),
  gate('schema_backup_file_required', 'Schema backup file must exist before append'),
  gate('duplicate_model_enum_scan_required', 'Duplicate Taxi model and enum scan must pass before append'),
  gate('relation_integrity_review_required', 'Relation integrity review must pass before append'),
  gate('index_and_unique_name_collision_review_required', 'Index and unique name collision review must pass before append'),
  gate('enum_value_collision_review_required', 'Enum value collision review must pass before append'),
  gate('schema_formatting_review_required', 'Schema formatting and Prisma syntax review must pass before append'),
  gate('rollback_patch_required', 'Rollback patch must be prepared before append'),
  gate('prisma_generate_separate_approval_required', 'Prisma generate requires a separate approval after append'),
  gate('migration_separate_approval_required', 'Migration requires a separate approval after generate review'),
  gate('db_smoke_separate_approval_required', 'DB smoke requires a separate approval after migration planning'),
  gate('runtime_route_mount_separate_approval_required', 'Runtime route mount requires a separate approval'),
  gate('wallet_payment_provider_runtime_separate_approval_required', 'Wallet/payment/provider runtime requires a separate approval'),
  gate('admin_ui_runtime_separate_approval_required', 'Admin UI runtime requires a separate approval'),
];

const step = (
  order: number,
  domain: TaxiSchemaAppendApprovalStep002A['domain'],
  label: string,
): TaxiSchemaAppendApprovalStep002A => ({
  id: `taxi_schema_append_002a_step_${String(order).padStart(2, '0')}`,
  order,
  domain,
  label,
  canExecuteNow: false,
  readsSchemaPrismaNow: false,
  writesSchemaPrismaNow: false,
  runsPrismaGenerateNow: false,
  runsPrismaMigrationNow: false,
  readsDbNow: false,
  writesDbNow: false,
  mountsRuntimeRoutesNow: false,
  enablesWalletPaymentProviderNow: false,
  requiresSeparateApproval: true,
  fakeExecutionBlocked: true,
});

export const TAXI_SCHEMA_APPEND_APPROVAL_STEPS_002A: readonly TaxiSchemaAppendApprovalStep002A[] = [
  step(1, 'owner_approval', 'Collect exact owner approval text for schema append only'),
  step(2, 'schema_read', 'Read current schema and capture non-secret structural inventory'),
  step(3, 'backup_rollback', 'Create schema backup artifact before append'),
  step(4, 'duplicate_scan', 'Scan duplicate Taxi models, enums, relation names, and mapped names'),
  step(5, 'relation_review', 'Review rider driver vehicle trip payment settlement support relations'),
  step(6, 'format_review', 'Review Prisma formatting and enum/model ordering'),
  step(7, 'append_patch', 'Append Taxi schema candidate into prisma/schema.prisma after approval'),
  step(8, 'backup_rollback', 'Generate rollback patch from backup and appended block'),
  step(9, 'generate_gate', 'Prepare separate Prisma generate approval package'),
  step(10, 'migration_gate', 'Prepare separate migration approval package'),
  step(11, 'db_smoke_gate', 'Keep DB smoke blocked until migration approval'),
  step(12, 'runtime_gate', 'Keep Taxi runtime routes unmounted until route approval'),
  step(13, 'wallet_provider_gate', 'Keep Wallet/payment/provider disabled until provider approval'),
  step(14, 'admin_ui_gate', 'Keep Admin UI runtime disabled until Admin approval'),
];

const duplicateRule = (
  id: string,
  target: TaxiSchemaAppendDuplicateScanRule002A['target'],
  label: string,
): TaxiSchemaAppendDuplicateScanRule002A => ({
  id,
  target,
  label,
  requiredBeforeAppend: true,
  passedNow: false,
  fakePassBlocked: true,
});

export const TAXI_SCHEMA_APPEND_DUPLICATE_SCAN_RULES_002A: readonly TaxiSchemaAppendDuplicateScanRule002A[] = [
  duplicateRule('taxi_model_name_duplicate_scan', 'model', 'No duplicate Taxi model names in prisma/schema.prisma'),
  duplicateRule('taxi_enum_name_duplicate_scan', 'enum', 'No duplicate Taxi enum names in prisma/schema.prisma'),
  duplicateRule('taxi_relation_name_duplicate_scan', 'relation', 'No duplicate relation aliases for Taxi models'),
  duplicateRule('taxi_index_name_collision_scan', 'index', 'No duplicate @@index or @@unique names'),
  duplicateRule('taxi_field_name_collision_scan', 'field', 'No invalid duplicate fields inside Taxi model blocks'),
  duplicateRule('taxi_map_name_collision_scan', 'map_name', 'No duplicate @map or @@map identifiers'),
  duplicateRule('taxi_wallet_boundary_field_scan', 'field', 'Wallet/payment fields remain references until provider approval'),
  duplicateRule('taxi_provider_boundary_field_scan', 'field', 'Provider fields remain readiness references until provider approval'),
  duplicateRule('taxi_audit_relation_scan', 'relation', 'Audit relations do not create circular runtime dependencies'),
  duplicateRule('taxi_support_relation_scan', 'relation', 'Support and dispute evidence relations remain review-only'),
];

const rollbackRule = (id: string, label: string): TaxiSchemaAppendRollbackRule002A => ({
  id,
  label,
  requiredBeforeAppend: true,
  rollbackTestedNow: false,
  fakeRollbackSuccessBlocked: true,
});

export const TAXI_SCHEMA_APPEND_ROLLBACK_RULES_002A: readonly TaxiSchemaAppendRollbackRule002A[] = [
  rollbackRule('taxi_schema_backup_snapshot_required', 'A backup snapshot must exist before schema append'),
  rollbackRule('taxi_schema_append_block_boundary_required', 'Appended Taxi block must have clear boundary markers'),
  rollbackRule('taxi_schema_remove_block_patch_required', 'Rollback remove-block patch must be generated'),
  rollbackRule('taxi_schema_restore_backup_patch_required', 'Rollback restore-backup patch must be documented'),
  rollbackRule('taxi_prisma_generate_rollback_gate_required', 'Prisma generate rollback is a separate gate'),
  rollbackRule('taxi_migration_rollback_gate_required', 'Migration rollback is a separate gate'),
  rollbackRule('taxi_runtime_mount_rollback_gate_required', 'Runtime route rollback is a separate gate'),
];

export const TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_MODEL_NAMES_002A = [
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

export const TAXI_SCHEMA_APPEND_APPROVAL_REQUIRED_ENUM_NAMES_002A = [
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
