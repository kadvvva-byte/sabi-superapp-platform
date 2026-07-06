import { TAXI_039Y_COMMISSION_BPS, TAXI_039Y_SCOPE, TAXI_039Y_VISA_CASHBACK_BPS, TAXI_039Y_VERSION } from './constants';
import type { Taxi039YReadiness, Taxi039YSummary } from './types';

export function getTaxi039YReadiness(): Taxi039YReadiness {
  return {
    stage: TAXI_039Y_VERSION,
    ready: true,
    providerBindingFinalEvidenceGate: 'locked',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: false,
    providerCall: false,
    dbWrite: false,
    walletMutation: false,
    moneyMovement: false,
    paymentExecution: false,
    payoutExecution: false,
    productionLaunch: false,
    taxiCommissionBps: TAXI_039Y_COMMISSION_BPS,
    visaCashbackBps: TAXI_039Y_VISA_CASHBACK_BPS,
  };
}

export function getTaxi039YSummary(): Taxi039YSummary {
  return {
    ...getTaxi039YReadiness(),
    nextStep: '039Z_provider_binding_execution_approval_request_no_secret_value_no_provider_call',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi039YProviderBindingFinalEvidenceGateScope = TAXI_039Y_SCOPE;
