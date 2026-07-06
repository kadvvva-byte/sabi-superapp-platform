import React from 'react';

export const TAXI_GLOBAL_WALLET_DIRECT_FARE_VISA_CASHBACK_039I_ADMIN_PANEL_READY = 'TAXI_GLOBAL_WALLET_DIRECT_FARE_VISA_CASHBACK_039I_ADMIN_PANEL_READY' as const;

export const taxiGlobalWalletDirectFareVisaCashback039IAdminPanel = Object.freeze({
  marker: TAXI_GLOBAL_WALLET_DIRECT_FARE_VISA_CASHBACK_039I_ADMIN_PANEL_READY,
  scope: 'admin_read_only_global_wallet_direct_fare_visa_cashback_no_money_movement',
  taxiUsesMainGlobalWallet: true,
  standaloneTaxiWalletAllowed: false,
  rideFareCommissionBps: 0,
  visaCashbackBps: 200,
  noMoneyMovement: true,
  noWalletMutation: true,
  noPaymentExecution: true,
  noPayoutExecution: true,
  noProviderCall: true,
} as const);

export function TaxiGlobalWalletDirectFareVisaCashback039I() {
  return (
    <section data-testid="taxi-global-wallet-direct-fare-visa-cashback-039i" data-sabi-no-money-movement="true">
      <h2>Taxi Global Wallet</h2>
      <p>Direct fare payment uses the main Wallet. Taxi standalone wallet is blocked.</p>
      <p>Taxi commission: 0%. Visa card cashback: 2% through main Wallet ledger.</p>
    </section>
  );
}

export default TaxiGlobalWalletDirectFareVisaCashback039I;
