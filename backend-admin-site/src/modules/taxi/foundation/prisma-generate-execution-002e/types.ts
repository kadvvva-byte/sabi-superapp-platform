export type TaxiPrismaGenerateGateId002E =
  | 'schema_002b_append_required'
  | 'prisma_validate_002d_fix1_passed_required'
  | 'generate_only_owner_approval_required'
  | 'migration_separate_approval_required'
  | 'db_execution_blocked_required'
  | 'runtime_route_mount_blocked_required'
  | 'wallet_payment_provider_blocked_required';

export type TaxiPrismaGenerateCommandDraft002E = Readonly<{
  id: string;
  command: string;
  allowedNow: boolean;
  requiresSeparateApproval: boolean;
  safetyNote: string;
}>;

export type TaxiPrismaGenerateExecutionSnapshot002E = Readonly<{
  version: string;
  status: 'prisma_generate_execution_ready_safe_disabled';
  prerequisiteValidateReportPath: string;
  generateReportPath: string;
  requiredTaxiModelCount: number;
  requiredTaxiEnumCount: number;
  commandDrafts: readonly TaxiPrismaGenerateCommandDraft002E[];
  gates: readonly TaxiPrismaGenerateGateId002E[];
  prismaGenerateExecutedNow: false;
  prismaMigrationExecutedNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  runtimeRouteMountedNow: false;
  walletMutationNow: false;
  paymentNow: false;
  payoutNow: false;
  providerDispatchNow: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiPrismaGenerateExecutionInput002E = Readonly<{
  schemaAppendApplied002B: boolean;
  prismaValidatePassed002D: boolean;
  ownerApprovedGenerateOnly: boolean;
  ownerApprovedMigrationExecution: boolean;
  ownerApprovedDbExecution: boolean;
  ownerApprovedRuntimeRouteMount: boolean;
  ownerApprovedWalletPaymentProvider: boolean;
}>;

export type TaxiPrismaGenerateExecutionDecision002E = Readonly<{
  canRunPrismaGenerateNow: boolean;
  canRunPrismaMigrationNow: false;
  canReadDbNow: false;
  canWriteDbNow: false;
  canMountRuntimeRoutesNow: false;
  canEnableWalletPaymentProviderNow: false;
  safeDisabledForRuntime: true;
  missingGateIds: readonly TaxiPrismaGenerateGateId002E[];
  fakeSuccessBlocked: true;
}>;
