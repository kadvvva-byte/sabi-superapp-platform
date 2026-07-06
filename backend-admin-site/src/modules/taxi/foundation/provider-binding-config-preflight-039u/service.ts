import { TAXI_039U_PROVIDER_BINDING_CONFIG_PREFLIGHT_VERSION, TAXI_039U_RULES, TAXI_039U_SCOPE } from './constants';
import type { Taxi039UReadiness } from './types';

export function getTaxi039UProviderBindingConfigPreflightReadiness(): Taxi039UReadiness {
  return {
    version: TAXI_039U_PROVIDER_BINDING_CONFIG_PREFLIGHT_VERSION,
    scope: TAXI_039U_SCOPE,
    providerBindingConfigPreflightReady: true,
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
    apiKeyValueAcceptedByThisStage: false,
    providerCallPerformed: false,
    envReadOrDumped: false,
    secretValuesReadOrPrinted: false,
    taxiCommissionBps: 0,
    visaCardCashbackBps: 200,
  };
}

export function getTaxi039UProviderBindingConfigPreflightSummary() {
  return {
    readiness: getTaxi039UProviderBindingConfigPreflightReadiness(),
    rules: TAXI_039U_RULES,
    nextStep: '039V_provider_binding_config_shape_validation_no_secret_value_no_provider_call',
  };
}
