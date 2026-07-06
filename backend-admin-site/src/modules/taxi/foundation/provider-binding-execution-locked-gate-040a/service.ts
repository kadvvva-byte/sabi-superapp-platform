import { TAXI_040A_COMMISSION_BPS, TAXI_040A_SCOPE, TAXI_040A_VISA_CASHBACK_BPS, TAXI_040A_VERSION } from './constants';
import type { Taxi040AReadiness, Taxi040ASummary } from './types';

export function getTaxi040AReadiness(): Taxi040AReadiness {
  return {
    stage: TAXI_040A_VERSION,
    ready: true,
    providerBindingExecutionLockedGate: 'locked',
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
    taxiCommissionBps: TAXI_040A_COMMISSION_BPS,
    visaCashbackBps: TAXI_040A_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040ASummary(): Taxi040ASummary {
  return {
    ...getTaxi040AReadiness(),
    nextStep: '040B_provider_binding_execution_evidence_locked_gate_no_secret_value_no_provider_call',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040AProviderBindingExecutionLockedGateScope = TAXI_040A_SCOPE;
