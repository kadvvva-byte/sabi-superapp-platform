import React from 'react';

export const TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_ADMIN_PANEL_READY = 'TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_ADMIN_PANEL_READY' as const;

export const taxiRealMoneyMovementApprovalRequest039NAdminPanel = Object.freeze({
  marker: TAXI_REAL_MONEY_MOVEMENT_APPROVAL_REQUEST_039N_ADMIN_PANEL_READY,
  scope: 'admin_read_only_real_money_movement_approval_request_locked_no_execution',
  taxiUsesMainGlobalWallet: true,
  standaloneTaxiWalletAllowed: false,
  rideFareCommissionBps: 0,
  visaCashbackBps: 200,
  realMoneyMovementApprovalRequired: true,
  exactOwnerApprovalRequiredBeforeMoneyMovement: true,
  noMoneyMovement: true,
  noWalletMutation: true,
  noPaymentExecution: true,
  noPayoutExecution: true,
  noProviderCall: true,
  noProductionLaunch: true,
} as const);

export function TaxiRealMoneyMovementApprovalRequest039N() {
  return (
    <section data-testid="taxi-real-money-movement-approval-request-039n">
      <h2>Taxi real money movement approval required</h2>
      <p>Main/global Wallet only. Standalone Taxi Wallet is blocked.</p>
      <p>Ride fare commission: 0%. Visa cashback: 2%.</p>
      <p>Real money movement is not executed here. Separate exact Owner approval and verified Wallet/provider runtime are required.</p>
    </section>
  );
}

export default TaxiRealMoneyMovementApprovalRequest039N;
