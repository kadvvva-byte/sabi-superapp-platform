import { TAXI_040U_COMMISSION_BPS, TAXI_040U_SCOPE, TAXI_040U_VISA_CASHBACK_BPS, TAXI_040U_VERSION } from './constants';
import type { Taxi040UReadiness, Taxi040USummary } from './types';

export function getTaxi040UReadiness(): Taxi040UReadiness {
  return {
    stage: TAXI_040U_VERSION,
    ready: true,
    providerBindingHandshake: 'controlled-handshake-no-money',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'handshake-no-money-controlled',
    dbWrite: false,
    walletMutation: false,
    moneyMovement: false,
    paymentExecution: false,
    payoutExecution: false,
    productionLaunch: false,
    taxiCommissionBps: TAXI_040U_COMMISSION_BPS,
    visaCashbackBps: TAXI_040U_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040USummary(): Taxi040USummary {
  return {
    ...getTaxi040UReadiness(),
    nextStep: '040V_db_production_apply_gate_no_money_movement',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040UProviderBindingHandshakeScope = TAXI_040U_SCOPE;
