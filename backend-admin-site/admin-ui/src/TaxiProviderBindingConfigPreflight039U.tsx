import React from 'react';

export function TaxiProviderBindingConfigPreflight039U() {
  return (
    <section data-testid="taxi-039u-provider-binding-config-preflight">
      <h2>Taxi 039U · Provider binding config preflight</h2>
      <p>No raw API key, no env read, no secret read, no provider call, no money movement.</p>
      <ul>
        <li>Main/global Wallet only; standalone Taxi Wallet blocked.</li>
        <li>Ride fare direct: 0% Taxi commission.</li>
        <li>Visa cashback: 2% through main Wallet ledger.</li>
        <li>Owner approval required before real provider binding or raw secret intake.</li>
      </ul>
    </section>
  );
}

export default TaxiProviderBindingConfigPreflight039U;
