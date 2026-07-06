import { TAXI_039Z_COMMISSION_BPS, TAXI_039Z_SCOPE, TAXI_039Z_VISA_CASHBACK_BPS, TAXI_039Z_VERSION } from './constants';
import type { Taxi039ZReadiness, Taxi039ZSummary } from './types';

export function getTaxi039ZReadiness(): Taxi039ZReadiness {
  return {
    stage: TAXI_039Z_VERSION,
    ready: true,
    providerBindingExecutionApprovalRequest: 'locked',
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
    taxiCommissionBps: TAXI_039Z_COMMISSION_BPS,
    visaCashbackBps: TAXI_039Z_VISA_CASHBACK_BPS,
  };
}

export function getTaxi039ZSummary(): Taxi039ZSummary {
  return {
    ...getTaxi039ZReadiness(),
    nextStep: '040A_provider_binding_execution_locked_gate_no_secret_value_no_provider_call',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi039ZProviderBindingExecutionApprovalRequestScope = TAXI_039Z_SCOPE;
