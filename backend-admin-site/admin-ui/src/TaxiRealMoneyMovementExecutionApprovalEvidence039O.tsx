import React from 'react';

export const TAXI_REAL_MONEY_MOVEMENT_EXECUTION_APPROVAL_EVIDENCE_039O_ADMIN_PANEL_READY = 'TAXI_REAL_MONEY_MOVEMENT_EXECUTION_APPROVAL_EVIDENCE_039O_ADMIN_PANEL_READY' as const;

export const taxiRealMoneyMovementExecutionApprovalEvidence039OAdminPanel = Object.freeze({
  marker: TAXI_REAL_MONEY_MOVEMENT_EXECUTION_APPROVAL_EVIDENCE_039O_ADMIN_PANEL_READY,
  scope: 'admin_read_only_real_money_movement_execution_approval_evidence_no_execution',
  taxiUsesMainGlobalWallet: true,
  standaloneTaxiWalletAllowed: false,
  rideFareCommissionBps: 0,
  visaCashbackBps: 200,
  realMoneyMovementExecutionApprovalEvidenceReady: true,
  exactOwnerApprovalRequiredBeforeMoneyMovement: true,
  noMoneyMovement: true,
  noWalletMutation: true,
  noPaymentExecution: true,
  noPayoutExecution: true,
  noProviderCall: true,
  noProductionLaunch: true,
} as const);

export function TaxiRealMoneyMovementExecutionApprovalEvidence039O() {
  return (
    <section data-testid="taxi-real-money-movement-execution-approval-evidence-039o">
      <h2>Taxi real money movement approval required</h2>
      <p>Main/global Wallet only. Standalone Taxi Wallet is blocked.</p>
      <p>Ride fare commission: 0%. Visa cashback: 2%.</p>
      <p>Real money movement is not executed here. Separate exact Owner approval and verified Wallet/provider runtime are required.</p>
    </section>
  );
}

export default TaxiRealMoneyMovementExecutionApprovalEvidence039O;
