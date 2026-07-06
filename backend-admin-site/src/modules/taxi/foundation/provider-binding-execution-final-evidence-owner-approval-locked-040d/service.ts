import { TAXI_040D_COMMISSION_BPS, TAXI_040D_SCOPE, TAXI_040D_VISA_CASHBACK_BPS, TAXI_040D_VERSION } from './constants';
import type { Taxi040DReadiness, Taxi040DSummary } from './types';

export function getTaxi040DReadiness(): Taxi040DReadiness {
  return {
    stage: TAXI_040D_VERSION,
    ready: true,
    providerBindingExecutionFinalEvidenceOwnerApprovalLocked: 'locked',
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
    taxiCommissionBps: TAXI_040D_COMMISSION_BPS,
    visaCashbackBps: TAXI_040D_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040DSummary(): Taxi040DSummary {
  return {
    ...getTaxi040DReadiness(),
    nextStep: '040E_provider_secret_value_access_approval_request_no_provider_call_no_money_movement',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040DProviderBindingExecutionFinalEvidenceOwnerApprovalLockedScope = TAXI_040D_SCOPE;
