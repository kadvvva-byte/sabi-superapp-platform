import { TAXI_040V_COMMISSION_BPS, TAXI_040V_SCOPE, TAXI_040V_VISA_CASHBACK_BPS, TAXI_040V_VERSION } from './constants';
import type { Taxi040VReadiness, Taxi040VSummary } from './types';

export function getTaxi040VReadiness(): Taxi040VReadiness {
  return {
    stage: TAXI_040V_VERSION,
    ready: true,
    dbProductionApplyGate: 'controlled-db-production-apply-gate',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'previous-handshake-verified-no-new-money',
    dbWrite: 'controlled-db-production-apply-gate',
    walletMutation: false,
    moneyMovement: false,
    paymentExecution: false,
    payoutExecution: false,
    productionLaunch: false,
    taxiCommissionBps: TAXI_040V_COMMISSION_BPS,
    visaCashbackBps: TAXI_040V_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040VSummary(): Taxi040VSummary {
  return {
    ...getTaxi040VReadiness(),
    nextStep: '040W_main_wallet_ledger_live_gate_no_money_movement',
    exactOwnerApprovalRequiredBeforeProviderBinding: true,
    exactOwnerApprovalRequiredBeforeRawApiKeyIntake: true,
  };
}

export const taxi040VDbProductionApplyGateScope = TAXI_040V_SCOPE;
