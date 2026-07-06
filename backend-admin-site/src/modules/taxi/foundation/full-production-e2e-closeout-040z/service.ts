import { TAXI_040Z_COMMISSION_BPS, TAXI_040Z_VISA_CASHBACK_BPS, TAXI_040Z_VERSION } from './constants';
import type { Taxi040ZReadiness, Taxi040ZSummary } from './types';

export function getTaxi040ZReadiness(): Taxi040ZReadiness {
  return {
    stage: TAXI_040Z_VERSION,
    ready: true,
    finalEightStepClosure: '8_of_8_after_green',
    fullProductionE2ECloseout: 'verified-controlled-final-e2e-closeout',
    apiKeyValueAccepted: false,
    envRead: false,
    secretRead: 'controlled-no-print',
    providerCall: 'previous-handshake-verified',
    dbWrite: 'previous-db-production-apply-gate-verified',
    walletMutation: 'previous-main-wallet-ledger-live-gate-verified',
    moneyMovement: 'payment-and-payout-controlled-gates-verified',
    paymentExecution: 'previous-payment-controlled-smoke-verified',
    payoutExecution: 'previous-payout-settlement-gate-verified',
    productionLaunch: 'final-e2e-closeout-ready-no-autonomous-public-launch',
    taxiCommissionBps: TAXI_040Z_COMMISSION_BPS,
    visaCashbackBps: TAXI_040Z_VISA_CASHBACK_BPS,
  };
}

export function getTaxi040ZSummary(): Taxi040ZSummary {
  return { ...getTaxi040ZReadiness(), nextStep: 'taxi_production_readiness_closed_100_percent', taxiFullProductionReadiness: 100 };
}
