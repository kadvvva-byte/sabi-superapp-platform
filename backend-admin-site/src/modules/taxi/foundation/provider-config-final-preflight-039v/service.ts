import { TAXI_039V_PROVIDER_CONFIG_FINAL_PREFLIGHT_VERSION, TAXI_039V_RULES, TAXI_039V_SCOPE } from './constants';
import type { Taxi039VReadiness } from './types';

export function getTaxi039VProviderConfigFinalPreflightReadiness(): Taxi039VReadiness {
  return {
    version: TAXI_039V_PROVIDER_CONFIG_FINAL_PREFLIGHT_VERSION,
    scope: TAXI_039V_SCOPE,
    providerConfigFinalPreflightReady: true,
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

export function getTaxi039VProviderConfigFinalPreflightSummary() {
  return {
    readiness: getTaxi039VProviderConfigFinalPreflightReadiness(),
    rules: TAXI_039V_RULES,
    nextStep: '039W_provider_config_final_evidence_preflight_no_secret_value_no_provider_call',
  };
}
