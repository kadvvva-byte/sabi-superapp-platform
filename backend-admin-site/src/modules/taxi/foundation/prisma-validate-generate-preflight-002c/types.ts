import type {
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B,
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B,
} from '../schema-real-append-002b';

export type TaxiPrismaValidateGeneratePreflightVersion002C =
  'TAXI-BACKEND-FOUNDATION-002C-PRISMA-VALIDATE-GENERATE-PREFLIGHT';

export type TaxiPrismaPreflightGateId002C =
  | 'schema_002b_append_marker_required'
  | 'all_taxi_models_present_once_required'
  | 'all_taxi_enums_present_once_required'
  | 'schema_backup_report_required'
  | 'prisma_validate_command_review_required'
  | 'prisma_generate_command_review_required'
  | 'no_migration_execution_required'
  | 'no_db_execution_required'
  | 'no_runtime_route_mount_required'
  | 'no_wallet_payment_provider_required'
  | 'prisma_generate_separate_owner_approval_required'
  | 'migration_separate_owner_approval_required';

export type TaxiPrismaPreflightCommandKind002C =
  | 'prisma_validate'
  | 'prisma_generate'
  | 'prisma_format_check'
  | 'typescript_check_after_generate';

export interface TaxiPrismaPreflightGate002C {
  readonly id: TaxiPrismaPreflightGateId002C;
  readonly label: string;
  readonly requiredBeforePrismaValidate: boolean;
  readonly requiredBeforePrismaGenerate: boolean;
  readonly passedNow: false;
  readonly exactOwnerApprovalRequired: true;
  readonly fakePassBlocked: true;
}

export interface TaxiPrismaPreflightCommandDraft002C {
  readonly kind: TaxiPrismaPreflightCommandKind002C;
  readonly command: string;
  readonly allowedToExecuteNow: false;
  readonly readsEnvPotentially: boolean;
  readonly touchesDb: false;
  readonly writesDb: false;
  readonly writesSchema: false;
  readonly runsMigration: false;
  readonly requiresSeparateApproval: true;
  readonly fakeExecutionBlocked: true;
}

export interface TaxiPrismaPreflightModelCoverage002C {
  readonly modelNames: readonly (typeof TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B)[number][];
  readonly enumNames: readonly (typeof TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B)[number][];
  readonly expectedModelCount: number;
  readonly expectedEnumCount: number;
  readonly schemaReadAllowedForPreflight: true;
  readonly prismaSchemaWriteNow: false;
  readonly prismaValidateExecutedNow: false;
  readonly prismaGenerateExecutedNow: false;
}

export interface TaxiPrismaPreflightInput002C {
  readonly schemaAppendMarkersPresent: boolean;
  readonly allTaxiModelsPresentOnce: boolean;
  readonly allTaxiEnumsPresentOnce: boolean;
  readonly schemaBackupReportPresent: boolean;
  readonly ownerApprovedPrismaValidateExecution: boolean;
  readonly ownerApprovedPrismaGenerateExecution: boolean;
  readonly ownerApprovedMigrationExecution: boolean;
  readonly ownerApprovedDbSmokeExecution: boolean;
  readonly ownerApprovedRuntimeRouteMount: boolean;
  readonly ownerApprovedWalletPaymentProvider: boolean;
}

export interface TaxiPrismaPreflightDecision002C {
  readonly canRunPrismaValidateNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunPrismaMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly canEnableWalletPaymentProviderNow: false;
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly missingGateIds: readonly TaxiPrismaPreflightGateId002C[];
  readonly fakeSuccessBlocked: true;
}

export interface TaxiPrismaValidateGeneratePreflightSnapshot002C {
  readonly version: TaxiPrismaValidateGeneratePreflightVersion002C;
  readonly status: 'prisma_validate_generate_preflight_ready_safe_disabled';
  readonly gates: readonly TaxiPrismaPreflightGate002C[];
  readonly commandDrafts: readonly TaxiPrismaPreflightCommandDraft002C[];
  readonly coverage: TaxiPrismaPreflightModelCoverage002C;
  readonly schemaAppendAlreadyApplied002BRequired: true;
  readonly preflightReportPath: '.data/taxi/002c/prisma-preflight-report.json';
  readonly prismaValidateExecutedNow: false;
  readonly prismaGenerateExecutedNow: false;
  readonly prismaMigrationExecutedNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly runtimeRouteMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}
