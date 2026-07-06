import {
  TAXI_BACKEND_RUNTIME_HARDENING_SAFETY_002P,
  TAXI_BACKEND_RUNTIME_HARDENING_VERSION_002P,
  TAXI_PROTECTED_ROUTE_HARDENING_POLICIES_002P,
  TAXI_RUNTIME_HARDENING_HEADERS_002P,
} from './constants';
import type {
  TaxiBackendRuntimeHardening002P,
  TaxiBackendRuntimeHardeningEvaluation002P,
  TaxiRuntimeHardeningResponseWriter002P,
} from './types';

export const buildTaxiBackendRuntimeHardening002P = (): TaxiBackendRuntimeHardening002P => ({
  version: TAXI_BACKEND_RUNTIME_HARDENING_VERSION_002P,
  status: 'protected_runtime_hardening_source_ready',
  routeContractCountExpected: 58,
  previousRuntimeSmokePassed002O: true,
  hardeningHeaderCount: TAXI_RUNTIME_HARDENING_HEADERS_002P.length,
  protectedPolicyCount: TAXI_PROTECTED_ROUTE_HARDENING_POLICIES_002P.length,
  requiresBackendRestartForRuntimeEffect: true,
  nextStep: '002Q protected runtime hardening smoke',
  headers: TAXI_RUNTIME_HARDENING_HEADERS_002P,
  policies: TAXI_PROTECTED_ROUTE_HARDENING_POLICIES_002P,
  safety: TAXI_BACKEND_RUNTIME_HARDENING_SAFETY_002P,
});

export const evaluateTaxiBackendRuntimeHardening002P = (): TaxiBackendRuntimeHardeningEvaluation002P => {
  const hardening = buildTaxiBackendRuntimeHardening002P();
  return {
    version: hardening.version,
    status: hardening.status,
    headerCountReady: hardening.hardeningHeaderCount >= 10,
    protectedPolicyCountReady: hardening.protectedPolicyCount >= 20,
    previousSmokePassed: hardening.previousRuntimeSmokePassed002O,
    runtimeEffectRequiresRestart: true,
    walletProviderBlocked: hardening.safety.walletMutation === false && hardening.safety.providerDispatch === false,
    fakeSuccessBlocked: hardening.safety.fakeSuccessBlocked,
    safety: hardening.safety,
  };
};

export const applyTaxiRuntimeHardeningHeaders002P = <TResponse extends TaxiRuntimeHardeningResponseWriter002P>(response: TResponse): TResponse => {
  TAXI_RUNTIME_HARDENING_HEADERS_002P.forEach((header) => {
    response.setHeader(header.name, header.value);
  });
  return response;
};
