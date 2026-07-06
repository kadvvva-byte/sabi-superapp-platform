import {
  TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_EXPECTED_ROUTE_COUNT_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_PREVIOUS_OBSERVED_ROUTE_COUNT_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_SAFETY_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_VERSION_002O,
} from './constants';
import type { TaxiProtectedRuntimeSmokeFix1Readiness002O } from './types';

export const buildTaxiProtectedRuntimeSmokeFix1Readiness002O = (): TaxiProtectedRuntimeSmokeFix1Readiness002O => ({
  version: TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_VERSION_002O,
  status: 'route_catalog_coverage_fix_ready',
  expectedRouteContractCount: TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_EXPECTED_ROUTE_COUNT_002O,
  previousObservedRouteContractCount: TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_PREVIOUS_OBSERVED_ROUTE_COUNT_002O,
  requiresBackendRestartAfterPatch: true,
  nextStep: '002P backend runtime hardening and protected route expansion',
  safety: TAXI_PROTECTED_RUNTIME_SMOKE_FIX1_SAFETY_002O,
});

export const evaluateTaxiProtectedRuntimeSmokeFix1Readiness002O = () => {
  const readiness = buildTaxiProtectedRuntimeSmokeFix1Readiness002O();
  return {
    version: readiness.version,
    status: readiness.status,
    routeCountFixReady: readiness.expectedRouteContractCount === 58 && readiness.previousObservedRouteContractCount === 39,
    restartRequired: readiness.requiresBackendRestartAfterPatch,
    walletProviderBlocked: readiness.safety.walletMutation === false && readiness.safety.providerDispatch === false,
    fakeSuccessBlocked: readiness.safety.fakeSuccessBlocked,
    safety: readiness.safety,
  };
};
