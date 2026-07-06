export type TaxiMigrationDiffGateId002F =
  | 'schema_002b_append_required'
  | 'prisma_validate_002d_fix1_passed_required'
  | 'prisma_generate_002e_passed_required'
  | 'migration_diff_owner_approval_required'
  | 'migration_apply_separate_approval_required'
  | 'db_execution_blocked_required'
  | 'runtime_route_mount_blocked_required'
  | 'wallet_payment_provider_blocked_required';

export type TaxiMigrationDiffCommandDraft002F = Readonly<{
  id: string;
  command: string;
  allowedNow: boolean;
  requiresSeparateApproval: boolean;
  writesDb: boolean;
  writesSchema: boolean;
  writesMigrationFolder: boolean;
  safetyNote: string;
}>;

export type TaxiMigrationDiffArtifact002F = Readonly<{
  id: string;
  path: string;
  required: boolean;
  writeAllowedNow: boolean;
  safetyNote: string;
}>;

export type TaxiMigrationDiffPreflightSnapshot002F = Readonly<{
  version: string;
  status: 'migration_diff_preflight_ready_safe_disabled';
  prerequisiteGenerateReportPath: string;
  migrationDiffReportPath: string;
  migrationDiffSqlCandidatePath: string;
  requiredTaxiModelCount: number;
  requiredTaxiEnumCount: number;
  commandDrafts: readonly TaxiMigrationDiffCommandDraft002F[];
  artifacts: readonly TaxiMigrationDiffArtifact002F[];
  gates: readonly TaxiMigrationDiffGateId002F[];
  prismaMigrateDiffExecutedNow: false;
  prismaMigrationApplyExecutedNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  schemaWriteNow: false;
  runtimeRouteMountedNow: false;
  walletMutationNow: false;
  paymentNow: false;
  payoutNow: false;
  providerDispatchNow: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiMigrationDiffPreflightInput002F = Readonly<{
  schemaAppendApplied002B: boolean;
  prismaValidatePassed002D: boolean;
  prismaGeneratePassed002E: boolean;
  ownerApprovedMigrationDiffOnly: boolean;
  ownerApprovedMigrationApply: boolean;
  ownerApprovedDbExecution: boolean;
  ownerApprovedRuntimeRouteMount: boolean;
  ownerApprovedWalletPaymentProvider: boolean;
}>;

export type TaxiMigrationDiffPreflightDecision002F = Readonly<{
  canRunPrismaMigrateDiffNow: boolean;
  canApplyPrismaMigrationNow: false;
  canReadDbNow: false;
  canWriteDbNow: false;
  canWriteSchemaNow: false;
  canMountRuntimeRoutesNow: false;
  canEnableWalletPaymentProviderNow: false;
  safeDisabledForRuntime: true;
  missingGateIds: readonly TaxiMigrationDiffGateId002F[];
  fakeSuccessBlocked: true;
}>;
