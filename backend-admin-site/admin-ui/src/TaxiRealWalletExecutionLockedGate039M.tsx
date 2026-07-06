import React from 'react';

export const TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_ADMIN_PANEL_READY = 'TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_ADMIN_PANEL_READY' as const;

export const taxiRealWalletExecutionLockedGate039MAdminPanel = Object.freeze({
  marker: TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_ADMIN_PANEL_READY,
  scope: 'admin_read_only_real_wallet_execution_locked_gate_no_money_movement',
  taxiUsesMainGlobalWallet: true,
  standaloneTaxiWalletAllowed: false,
  rideFareCommissionBps: 0,
  visaCashbackBps: 200,
  realWalletExecutionLocked: true,
  exactOwnerApprovalRequiredBeforeMoneyMovement: true,
  noMoneyMovement: true,
  noWalletMutation: true,
  noPaymentExecution: true,
  noPayoutExecution: true,
  noProviderCall: true,
  noProductionLaunch: true,
} as const);

export function TaxiRealWalletExecutionLockedGate039M() {
  return (
    <section data-testid="taxi-real-wallet-execution-locked-gate-039m">
      <h2>Taxi global Wallet execution locked</h2>
      <p>Main/global Wallet only. Standalone Taxi Wallet is blocked.</p>
      <p>Ride fare commission: 0%. Visa cashback: 2%.</p>
      <p>Real money movement remains locked until separate exact Owner approval.</p>
    </section>
  );
}

export default TaxiRealWalletExecutionLockedGate039M;
