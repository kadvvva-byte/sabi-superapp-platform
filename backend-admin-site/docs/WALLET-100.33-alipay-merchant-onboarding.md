# WALLET-100.33 — Alipay+ / Merchant / Business Payout Onboarding

This stage verifies the payment/acquiring layer after the bank/card-tokenization readiness stage.

## Scope

Providers covered:

1. `alipay_plus_acquiring`
2. `merchant_acquiring`
3. `business_payout`

## Rules

- No fake payment success.
- No fake merchant settlement.
- No fake business payout.
- No PAN/CVV storage on Sabi infrastructure.
- Mobile receives only safe provider state, never API keys, vault refs, env names, or webhook secrets.
- Live execution remains disabled until real provider contracts, sandbox keys, webhook signatures, and adapter bindings are connected.

## Required provider materials

For each acquiring / payout provider Sabi needs:

- sandbox merchant account
- production merchant account later
- API base URL or SDK/iFrame contract
- public client identifier if safe for mobile/web
- backend secret/vault reference
- webhook endpoint list
- webhook signature verification method
- settlement callback contract
- refund/chargeback callback contract
- supported currencies and countries
- KYC/KYB requirements
- compliance/risk states

## Required webhooks

- payment authorized
- payment captured/success
- payment failed
- payment cancelled
- refund created/completed/failed
- settlement created/completed/failed
- chargeback/dispute opened/updated/closed
- merchant account restricted/unrestricted

## Expected current status

Until providers are connected:

- `readyAlipayMerchantProviders = 0 / 3`
- `liveAlipayMerchantReady = False`
- report should still have `FAIL=0`

This is a safe disabled state, not a failure.
