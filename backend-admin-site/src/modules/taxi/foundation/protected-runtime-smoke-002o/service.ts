import {
  TAXI_PROTECTED_RUNTIME_SMOKE_ENDPOINTS_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_REQUIRED_ROUTE_COUNT_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_SAFETY_002O,
  TAXI_PROTECTED_RUNTIME_SMOKE_VERSION_002O,
} from './constants';
import type { TaxiProtectedRuntimeSmokePlan002O } from './types';

export const buildTaxiProtectedRuntimeSmokePlan002O = (): TaxiProtectedRuntimeSmokePlan002O => ({
  version: TAXI_PROTECTED_RUNTIME_SMOKE_VERSION_002O,
  status: 'runtime_smoke_ready',
  endpointExpectationCount: TAXI_PROTECTED_RUNTIME_SMOKE_ENDPOINTS_002O.length,
  routeContractCountRequired: TAXI_PROTECTED_RUNTIME_SMOKE_REQUIRED_ROUTE_COUNT_002O,
  safeDisabledRouteSmokeRequired: true,
  adminProtectionSmokeRequired: true,
  safety: TAXI_PROTECTED_RUNTIME_SMOKE_SAFETY_002O,
  endpoints: TAXI_PROTECTED_RUNTIME_SMOKE_ENDPOINTS_002O,
});

export const evaluateTaxiProtectedRuntimeSmokePlan002O = () => {
  const plan = buildTaxiProtectedRuntimeSmokePlan002O();
  return {
    version: plan.version,
    status: plan.status,
    endpointExpectationCountReady: plan.endpointExpectationCount >= 5,
    routeContractCountRequiredReady: plan.routeContractCountRequired >= 58,
    safeDisabledRouteSmokeRequired: plan.safeDisabledRouteSmokeRequired,
    adminProtectionSmokeRequired: plan.adminProtectionSmokeRequired,
    walletProviderBlocked: plan.safety.walletMutation === false && plan.safety.providerDispatch === false,
    moneyMovementBlocked: plan.safety.payment === false && plan.safety.payout === false,
    prismaExecutionBlocked: plan.safety.prismaValidate === false && plan.safety.prismaGenerate === false && plan.safety.prismaMigration === false,
  };
};
