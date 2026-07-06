import { TAXI_040W_COMMISSION_BPS, TAXI_040W_SCOPE, TAXI_040W_VISA_CASHBACK_BPS, TAXI_040W_VERSION } from './constants';
import type { Taxi040WReadiness, Taxi040WSummary } from './types';

export function getTaxi040WReadiness(): Taxi040WReadiness {
  return {
    stage: TAXI_040W_VERSION,
    ready: true,
    mainWalletLedgerLiveGate: 'controlled-main-wallet-ledger-live-gate',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'previous-handshake-verified-no-new-money',
    dbWrite: 'previous-db-production-apply-gate-verified-no-new-money',
    walletMutation: 'controlled-main-wallet-ledger-live-gate',
    moneyMovement: false,
    paymentExecution: false,
    payoutExecution: false,
    productionLaunch: false,
    taxiCommissionBps: TAXI_040W_COMMISSION_BPS,
    visaCashbackBps: TAXI_040W_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040WSummary(): Taxi040WSummary {
  return {
    ...getTaxi040WReadiness(),
    nextStep: '040X_payment_execution_controlled_smoke_no_payout',
    exactOwnerApprovalRequiredBeforePayment: true,
    exactOwnerApprovalRequiredBeforePayout: true,
  };
}

export const taxi040WMainWalletLedgerLiveGateScope = TAXI_040W_SCOPE;
