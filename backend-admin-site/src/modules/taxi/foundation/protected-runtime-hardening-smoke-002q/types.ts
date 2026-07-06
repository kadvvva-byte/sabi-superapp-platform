export type TaxiRuntimeHardeningSmokeEndpointKey002Q =
  | 'public_readiness'
  | 'public_route_catalog'
  | 'admin_diagnostics_unauth'
  | 'safe_disabled_rider_quote_create'
  | 'admin_safe_disabled_or_protected';

export interface TaxiRuntimeHardeningSmokeEndpoint002Q {
  readonly key: TaxiRuntimeHardeningSmokeEndpointKey002Q;
  readonly method: 'GET' | 'POST';
  readonly path: string;
  readonly expectedStatus: 200 | 403 | 409;
  readonly expectedSafeDisabledHeader: true;
  readonly expectedFakeSuccessBlockedHeader: true;
  readonly expectedProviderDispatchHeader: false;
  readonly expectedWalletMutationHeader: false;
  readonly expectedDbRuntimeHeader: false;
}

export interface TaxiRuntimeHardeningSmokeSafety002Q {
  readonly sourcePatch: false;
  readonly backendRuntimeMustBeRestartedAfter002P: true;
  readonly routeRuntimeSmoke: true;
  readonly appRuntimeMounted: true;
  readonly dbReadByTaxiSmoke: false;
  readonly dbWrite: false;
  readonly prismaValidate: false;
  readonly prismaGenerate: false;
  readonly prismaMigration: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiRuntimeHardeningSmokePlan002Q {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002Q-PROTECTED-RUNTIME-HARDENING-SMOKE';
  readonly status: 'runtime_hardening_smoke_plan_ready';
  readonly expectedRouteContractCount: 58;
  readonly expectedHeaderCount: 10;
  readonly expectedProtectedPolicyCount: 22;
  readonly endpoints: readonly TaxiRuntimeHardeningSmokeEndpoint002Q[];
  readonly requiredHeaders: readonly string[];
  readonly safety: TaxiRuntimeHardeningSmokeSafety002Q;
}
