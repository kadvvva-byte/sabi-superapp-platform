import { TAXI_040C_COMMISSION_BPS, TAXI_040C_SCOPE, TAXI_040C_VISA_CASHBACK_BPS, TAXI_040C_VERSION } from './constants';
import type { Taxi040CReadiness, Taxi040CSummary } from './types';

export function getTaxi040CReadiness(): Taxi040CReadiness {
  return {
    stage: TAXI_040C_VERSION,
    ready: true,
    providerBindingExecutionFinalOwnerApprovalLocked: 'locked',
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
    taxiCommissionBps: TAXI_040C_COMMISSION_BPS,
    visaCashbackBps: TAXI_040C_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040CSummary(): Taxi040CSummary {
  return {
    ...getTaxi040CReadiness(),
    nextStep: '040D_provider_binding_execution_final_evidence_owner_approval_locked_no_secret_value_no_provider_call',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040CProviderBindingExecutionFinalOwnerApprovalLockedScope = TAXI_040C_SCOPE;
