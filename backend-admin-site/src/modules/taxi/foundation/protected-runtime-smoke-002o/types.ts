export type TaxiRuntimeSmokeEndpointExpectation002O = Readonly<{
  key: string;
  method: 'GET' | 'POST';
  path: string;
  expectedStatus: 200 | 403 | 409 | '200_or_403';
  requiresAdminToken: boolean;
  expectedSafeDisabled: boolean;
}>;

export type TaxiProtectedRuntimeSmokeSafety002O = Readonly<{
  sourceOnly: boolean;
  envValueRead: boolean;
  dbWrite: boolean;
  prismaValidate: boolean;
  prismaGenerate: boolean;
  prismaMigration: boolean;
  walletMutation: boolean;
  payment: boolean;
  payout: boolean;
  providerDispatch: boolean;
}>;

export type TaxiProtectedRuntimeSmokePlan002O = Readonly<{
  version: string;
  status: 'runtime_smoke_ready';
  endpointExpectationCount: number;
  routeContractCountRequired: number;
  safeDisabledRouteSmokeRequired: boolean;
  adminProtectionSmokeRequired: boolean;
  safety: TaxiProtectedRuntimeSmokeSafety002O;
  endpoints: readonly TaxiRuntimeSmokeEndpointExpectation002O[];
}>;
