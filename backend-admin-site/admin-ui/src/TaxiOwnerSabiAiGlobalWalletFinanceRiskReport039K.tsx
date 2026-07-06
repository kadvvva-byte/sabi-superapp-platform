import React from 'react';

export const TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_ADMIN_PANEL_READY = 'TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_ADMIN_PANEL_READY' as const;

export const taxiOwnerSabiAiGlobalWalletFinanceRiskReport039KAdminPanel = Object.freeze({
  marker: TAXI_OWNER_SABI_AI_GLOBAL_WALLET_FINANCE_RISK_REPORT_039K_ADMIN_PANEL_READY,
  scope: 'owner_sabi_ai_read_only_global_wallet_finance_risk_report_no_money_movement',
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

export function TaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K() {
  return (
    <section data-testid="taxi-owner-sabi-ai-global-wallet-finance-risk-report-039k" data-sabi-no-money-movement="true">
      <h2>Owner Sabi AI Taxi Finance Risk Report</h2>
      <p>Taxi uses the main Wallet only. Standalone Taxi wallet is blocked.</p>
      <p>Direct fare commission: 0%. Visa cashback: 2% through main Wallet ledger.</p>
      <p>Owner Sabi AI is report-only here and waits for Owner command before any execution.</p>
    </section>
  );
}

export default TaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K;
