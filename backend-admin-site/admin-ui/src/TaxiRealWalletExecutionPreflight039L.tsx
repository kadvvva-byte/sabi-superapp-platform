import React from 'react';

export const TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_ADMIN_PANEL_READY = 'TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_ADMIN_PANEL_READY' as const;

export const taxiRealWalletExecutionPreflight039LAdminPanel = Object.freeze({
  marker: TAXI_REAL_WALLET_EXECUTION_PREFLIGHT_039L_ADMIN_PANEL_READY,
  scope: 'real_wallet_execution_preflight_read_only_no_money_movement',
  taxiUsesMainGlobalWallet: true,
  standaloneTaxiWalletAllowed: false,
  rideFareCommissionBps: 0,
  visaCashbackBps: 200,
  ownerSabiAiReportOnly: true,
  noAutonomousExecution: true,
  noMoneyMovement: true,
  noWalletMutation: true,
  noPaymentExecution: true,
  noPayoutExecution: true,
  noProviderCall: true,
} as const);

export function TaxiRealWalletExecutionPreflight039L() {
  return (
    <section data-testid="taxi-real-wallet-execution-preflight-039l" data-sabi-no-money-movement="true">
      <h2>Taxi Real Wallet Execution Preflight</h2>
      <p>Taxi uses the main Wallet only. Standalone Taxi wallet is blocked.</p>
      <p>Direct fare commission: 0%. Visa cashback: 2% through main Wallet ledger.</p>
      <p>Execution is locked until exact Owner approval; this preflight performs no money movement.</p>
    </section>
  );
}

export default TaxiRealWalletExecutionPreflight039L;
