import { TAXI_039W_PROVIDER_CONFIG_FINAL_EVIDENCE_PREFLIGHT_VERSION, TAXI_039W_RULES, TAXI_039W_SCOPE } from './constants';
import type { Taxi039WReadiness } from './types';

export function getTaxi039WProviderConfigFinalEvidencePreflightReadiness(): Taxi039WReadiness {
  return {
    version: TAXI_039W_PROVIDER_CONFIG_FINAL_EVIDENCE_PREFLIGHT_VERSION,
    scope: TAXI_039W_SCOPE,
    providerConfigFinalEvidencePreflightReady: true,
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

export function getTaxi039WProviderConfigFinalEvidencePreflightSummary() {
  return {
    readiness: getTaxi039WProviderConfigFinalEvidencePreflightReadiness(),
    rules: TAXI_039W_RULES,
    nextStep: '039X_provider_binding_final_gate_no_secret_value_no_provider_call',
  };
}
