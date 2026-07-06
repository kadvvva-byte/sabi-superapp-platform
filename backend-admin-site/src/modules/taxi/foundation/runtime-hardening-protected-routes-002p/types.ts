export type TaxiRuntimeHardeningHeaderName002P =
  | 'Cache-Control'
  | 'Pragma'
  | 'X-Content-Type-Options'
  | 'X-Sabi-Taxi-Runtime-Stage'
  | 'X-Sabi-Taxi-Safe-Disabled'
  | 'X-Sabi-Taxi-Fake-Success-Blocked'
  | 'X-Sabi-Taxi-Provider-Dispatch'
  | 'X-Sabi-Taxi-Wallet-Mutation'
  | 'X-Sabi-Taxi-Db-Runtime'
  | 'Vary';

export interface TaxiRuntimeHardeningHeader002P {
  readonly name: TaxiRuntimeHardeningHeaderName002P;
  readonly value: string;
  readonly purpose: string;
}

export interface TaxiRuntimeHardeningResponseWriter002P {
  setHeader(name: string, value: string): unknown;
}

export interface TaxiProtectedRouteHardeningPolicy002P {
  readonly key: string;
  readonly category:
    | 'public_readiness'
    | 'public_catalog'
    | 'admin_guard'
    | 'safe_disabled_write'
    | 'idempotency_boundary'
    | 'wallet_boundary'
    | 'provider_boundary'
    | 'fake_success_block';
  readonly enforcedAtStage: '002P_source_patch' | '002Q_runtime_smoke';
  readonly enabledNow: boolean;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly walletMutation: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiBackendRuntimeHardeningSafety002P {
  readonly sourcePatch: true;
  readonly routeRuntimeMountedAlready: true;
  readonly envValueReadByModule: false;
  readonly dbRead: false;
  readonly dbWrite: false;
  readonly prismaValidate: false;
  readonly prismaGenerate: false;
  readonly prismaMigration: false;
  readonly adminUiRuntimeMounted: false;
  readonly walletMutation: false;
  readonly payment: false;
  readonly payout: false;
  readonly providerDispatch: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiBackendRuntimeHardening002P {
  readonly version: 'TAXI-BACKEND-FOUNDATION-002P-BACKEND-RUNTIME-HARDENING';
  readonly status: 'protected_runtime_hardening_source_ready';
  readonly routeContractCountExpected: 58;
  readonly previousRuntimeSmokePassed002O: true;
  readonly hardeningHeaderCount: number;
  readonly protectedPolicyCount: number;
  readonly requiresBackendRestartForRuntimeEffect: true;
  readonly nextStep: '002Q protected runtime hardening smoke';
  readonly headers: readonly TaxiRuntimeHardeningHeader002P[];
  readonly policies: readonly TaxiProtectedRouteHardeningPolicy002P[];
  readonly safety: TaxiBackendRuntimeHardeningSafety002P;
}

export interface TaxiBackendRuntimeHardeningEvaluation002P {
  readonly version: TaxiBackendRuntimeHardening002P['version'];
  readonly status: TaxiBackendRuntimeHardening002P['status'];
  readonly headerCountReady: boolean;
  readonly protectedPolicyCountReady: boolean;
  readonly previousSmokePassed: boolean;
  readonly runtimeEffectRequiresRestart: true;
  readonly walletProviderBlocked: boolean;
  readonly fakeSuccessBlocked: true;
  readonly safety: TaxiBackendRuntimeHardeningSafety002P;
}
