export type TaxiReadOnlyDbRuntimeDryRunSmokeEndpointKey002U =
  | 'read_only_plan'
  | 'read_only_without_header_forbidden'
  | 'read_only_with_header_db_count_only'
  | 'route_catalog_still_58'
  | 'safe_disabled_write_still_blocked';

export type TaxiReadOnlyDbRuntimeDryRunSmokeEndpointResult002U = Readonly<{
  key: TaxiReadOnlyDbRuntimeDryRunSmokeEndpointKey002U;
  method: 'GET' | 'POST';
  path: string;
  status: number;
  passed: boolean;
  failures: readonly string[];
  hardeningHeadersPassed: boolean;
  dbReadExecutedByEndpoint: boolean;
  dbWriteExecuted: false;
  walletMutation: false;
  providerDispatch: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiReadOnlyDbRuntimeDryRunSmokeSummary002U = Readonly<{
  version: 'TAXI-BACKEND-FOUNDATION-002U-PROTECTED-READ-ONLY-DB-RUNTIME-DRY-RUN-SMOKE';
  status: 'passed' | 'failed';
  backendRuntimeBaseUrl: string;
  endpointSmokeCount: 5;
  planEndpointPassed: boolean;
  forbiddenWithoutHeaderPassed: boolean;
  readOnlyDbDryRunPassed: boolean;
  delegateCountReadPassedCount: number;
  delegateCountReadFailedCount: number;
  routeCatalogStill58: boolean;
  safeDisabledWriteStillBlocked: boolean;
  allHardeningHeadersPassed: boolean;
  dbReadExecutedByDryRunEndpoint: boolean;
  dbWriteExecuted: false;
  noWalletProviderExecution: boolean;
  fakeSuccessBlocked: true;
}>;
