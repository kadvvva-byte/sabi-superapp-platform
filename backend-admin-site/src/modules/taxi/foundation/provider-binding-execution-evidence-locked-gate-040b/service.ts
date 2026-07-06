import { TAXI_040B_COMMISSION_BPS, TAXI_040B_SCOPE, TAXI_040B_VISA_CASHBACK_BPS, TAXI_040B_VERSION } from './constants';
import type { Taxi040BReadiness, Taxi040BSummary } from './types';

export function getTaxi040BReadiness(): Taxi040BReadiness {
  return {
    stage: TAXI_040B_VERSION,
    ready: true,
    providerBindingExecutionEvidenceLockedGate: 'locked',
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
    taxiCommissionBps: TAXI_040B_COMMISSION_BPS,
    visaCashbackBps: TAXI_040B_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040BSummary(): Taxi040BSummary {
  return {
    ...getTaxi040BReadiness(),
    nextStep: '040C_provider_binding_execution_final_owner_approval_locked_no_secret_value_no_provider_call',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040BProviderBindingExecutionEvidenceLockedGateScope = TAXI_040B_SCOPE;
