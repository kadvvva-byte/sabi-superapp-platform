import {
  TAXI_RUNTIME_HARDENING_REQUIRED_HEADERS_002Q,
  TAXI_RUNTIME_HARDENING_SMOKE_ENDPOINTS_002Q,
  TAXI_RUNTIME_HARDENING_SMOKE_SAFETY_002Q,
  TAXI_RUNTIME_HARDENING_SMOKE_VERSION_002Q,
} from './constants';
import type { TaxiRuntimeHardeningSmokePlan002Q } from './types';

export const buildTaxiRuntimeHardeningSmokePlan002Q = (): TaxiRuntimeHardeningSmokePlan002Q => ({
  version: TAXI_RUNTIME_HARDENING_SMOKE_VERSION_002Q,
  status: 'runtime_hardening_smoke_plan_ready',
  expectedRouteContractCount: 58,
  expectedHeaderCount: TAXI_RUNTIME_HARDENING_REQUIRED_HEADERS_002Q.length,
  expectedProtectedPolicyCount: 22,
  endpoints: TAXI_RUNTIME_HARDENING_SMOKE_ENDPOINTS_002Q,
  requiredHeaders: TAXI_RUNTIME_HARDENING_REQUIRED_HEADERS_002Q,
  safety: TAXI_RUNTIME_HARDENING_SMOKE_SAFETY_002Q,
});

export const evaluateTaxiRuntimeHardeningSmokePlan002Q = () => {
  const plan = buildTaxiRuntimeHardeningSmokePlan002Q();
  return {
    version: plan.version,
    endpointCountReady: plan.endpoints.length === 5,
    requiredHeaderCountReady: plan.requiredHeaders.length >= 10,
    routeContractCountExpected: plan.expectedRouteContractCount,
    protectedPolicyCountExpected: plan.expectedProtectedPolicyCount,
    walletProviderBlocked: plan.safety.walletMutation === false && plan.safety.providerDispatch === false,
    fakeSuccessBlocked: plan.safety.fakeSuccessBlocked,
    safety: plan.safety,
  };
};
