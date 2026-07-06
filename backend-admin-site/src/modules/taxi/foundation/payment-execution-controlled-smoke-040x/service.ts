import { TAXI_040X_COMMISSION_BPS, TAXI_040X_SCOPE, TAXI_040X_VISA_CASHBACK_BPS, TAXI_040X_VERSION } from './constants';
import type { Taxi040XReadiness, Taxi040XSummary } from './types';

export function getTaxi040XReadiness(): Taxi040XReadiness {
  return {
    stage: TAXI_040X_VERSION,
    ready: true,
    paymentExecutionControlledSmoke: 'controlled-payment-execution-smoke-no-payout',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'previous-handshake-verified-no-new-money',
    dbWrite: 'previous-db-production-apply-gate-verified-no-new-money',
    walletMutation: 'previous-main-wallet-ledger-live-gate-verified-no-new-money',
    moneyMovement: 'controlled-payment-smoke-no-payout',
    paymentExecution: 'controlled-payment-execution-smoke-no-payout',
    payoutExecution: false,
    productionLaunch: false,
    taxiCommissionBps: TAXI_040X_COMMISSION_BPS,
    visaCashbackBps: TAXI_040X_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040XSummary(): Taxi040XSummary {
  return {
    ...getTaxi040XReadiness(),
    nextStep: '040Y_payout_settlement_gate_no_production_launch',
    exactOwnerApprovalRequiredBeforePayout: true,
    exactOwnerApprovalRequiredBeforeE2EProductionCloseout: true,
  };
}

export const taxi040XPaymentExecutionControlledSmokeScope = TAXI_040X_SCOPE;
