export type TaxiSchemaRealAppendVersion002B = 'TAXI-BACKEND-FOUNDATION-002B-REAL-SCHEMA-APPEND';

export type TaxiSchemaRealAppendLockId002B =
  | 'prisma_generate_still_blocked'
  | 'prisma_migration_still_blocked'
  | 'db_runtime_still_blocked'
  | 'taxi_route_runtime_still_blocked'
  | 'wallet_payment_provider_still_blocked'
  | 'admin_ui_runtime_still_blocked';

export type TaxiSchemaRealAppendLock002B = Readonly<{
  id: TaxiSchemaRealAppendLockId002B;
  label: string;
  lockedAfterSchemaAppend: true;
  requiresSeparateApproval: true;
  fakeUnlockBlocked: true;
}>;

export type TaxiSchemaRealAppendRequirement002B = Readonly<{
  kind: 'model' | 'enum' | 'marker' | 'backup' | 'report';
  name: string;
  requiredInSchemaAfterApply: boolean;
}>;

export type TaxiSchemaRealAppendReadiness002B = Readonly<{
  version: TaxiSchemaRealAppendVersion002B;
  schemaAppendIsReal002B: true;
  applyScriptRequiresExactFlag: true;
  prismaSchemaWriteAllowedByApplyScriptOnly: true;
  prismaGenerateRunsNow: false;
  prismaMigrationRunsNow: false;
  dbReadNow: false;
  dbWriteNow: false;
  runtimeRouteMountedNow: false;
  adminUiRuntimeMountedNow: false;
  walletPaymentPayoutProviderRunsNow: false;
  requiredModelCount: number;
  requiredEnumCount: number;
  lockCount: number;
  fakeSuccessBlocked: true;
}>;
