# WALLET-100.39 — Alipay+/Merchant/Business binding preparation

This step prepares the integration boundary for Alipay+, merchant acquiring, and business payout providers.

It does not enable live execution and does not simulate payments, settlements, or payouts.

## Required providers

1. `alipay_plus_acquiring`
2. `merchant_acquiring`
3. `business_payout`

## Live readiness rules

Live execution remains blocked until all of the following are true:

- Provider contract is signed.
- Backend env/vault references are configured.
- Provider webhook URLs are registered with the provider.
- Real provider adapter is bound.
- KYC/AML providers are ready.
- Execution flags are enabled intentionally.
- Admin/compliance review path is ready.

## Data boundaries

Mobile receives only safe readiness/status data.
Mobile must not receive provider secrets, API key names, vault references, webhook secret references, or raw settlement credentials.

## No fake mode

The binding shell may show `provider_not_configured` and disabled execution. It must never return fake success for payment, settlement, or payout.
