export type TaxiDbWriteRuntimeGateSmokeEndpoint002Y = Readonly<{
  key: string;
  method: 'GET' | 'POST';
  path: string;
  expectedStatus: number;
  requiresHeader: boolean;
  purpose: string;
}>;

export type TaxiDbWriteRuntimeGateSmokePlan002Y = Readonly<{
  version: string;
  status: 'db_write_runtime_gate_smoke_ready';
  endpointCount: number;
  expectedWriteOperationCount: number;
  expectedWriteBlockedCount: number;
  expectedAdminGateCount: number;
  expectedIdempotencyGateCount: number;
  dbWriteExpected: false;
  walletProviderExpected: false;
  fakeSuccessExpected: false;
  nextStep: string;
}>;

export type TaxiDbWriteRuntimeGateSmokeSafety002Y = Readonly<{
  envValueReadByModule: false;
  dbReadByModule: false;
  dbWrite: false;
  prismaSchemaWrite: false;
  prismaValidate: false;
  prismaGenerate: false;
  prismaMigrationApply: false;
  walletMutation: false;
  payment: false;
  payout: false;
  providerDispatch: false;
  fakeSuccessBlocked: true;
}>;
