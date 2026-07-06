import {
  TAXI_SCHEMA_REAL_APPEND_LOCKS_002B,
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B,
  TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B,
  TAXI_SCHEMA_REAL_APPEND_VERSION_002B,
} from './constants';
import type { TaxiSchemaRealAppendReadiness002B } from './types';

export function getTaxiSchemaRealAppendReadiness002B(): TaxiSchemaRealAppendReadiness002B {
  return {
    version: TAXI_SCHEMA_REAL_APPEND_VERSION_002B,
    schemaAppendIsReal002B: true,
    applyScriptRequiresExactFlag: true,
    prismaSchemaWriteAllowedByApplyScriptOnly: true,
    prismaGenerateRunsNow: false,
    prismaMigrationRunsNow: false,
    dbReadNow: false,
    dbWriteNow: false,
    runtimeRouteMountedNow: false,
    adminUiRuntimeMountedNow: false,
    walletPaymentPayoutProviderRunsNow: false,
    requiredModelCount: TAXI_SCHEMA_REAL_APPEND_REQUIRED_MODELS_002B.length,
    requiredEnumCount: TAXI_SCHEMA_REAL_APPEND_REQUIRED_ENUMS_002B.length,
    lockCount: TAXI_SCHEMA_REAL_APPEND_LOCKS_002B.length,
    fakeSuccessBlocked: true,
  };
}
