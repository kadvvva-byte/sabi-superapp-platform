import { TAXI_040Y_COMMISSION_BPS, TAXI_040Y_SCOPE, TAXI_040Y_VISA_CASHBACK_BPS, TAXI_040Y_VERSION } from './constants';
import type { Taxi040YReadiness, Taxi040YSummary } from './types';

export function getTaxi040YReadiness(): Taxi040YReadiness {
  return {
    stage: TAXI_040Y_VERSION,
    ready: true,
    payoutSettlementGate: 'controlled-payout-settlement-gate',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'previous-handshake-verified-no-new-money',
    dbWrite: 'previous-db-production-apply-gate-verified-no-new-money',
    walletMutation: 'previous-main-wallet-ledger-live-gate-verified-no-new-money',
    moneyMovement: 'controlled-payout-settlement-gate',
    paymentExecution: 'previous-payment-controlled-smoke-verified-no-payout',
    payoutExecution: 'controlled-payout-settlement-gate',
    productionLaunch: false,
    taxiCommissionBps: TAXI_040Y_COMMISSION_BPS,
    visaCashbackBps: TAXI_040Y_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040YSummary(): Taxi040YSummary {
  return {
    ...getTaxi040YReadiness(),
    nextStep: '040Z_full_production_e2e_closeout',
    exactOwnerApprovalRequiredBeforeE2EProductionCloseout: true,
  };
}

export const taxi040YPayoutSettlementGateScope = TAXI_040Y_SCOPE;
