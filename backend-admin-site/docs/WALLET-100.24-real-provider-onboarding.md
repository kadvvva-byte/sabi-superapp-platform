# WALLET-100.24 — Real Provider Onboarding

## Current verified state

The Wallet provider-config API is mounted and reachable.

Expected report after WALLET-100.23:

- Endpoint blockers: 0
- Policy violations: 0
- Provider blockers: 11
- Launch ready: false

This is the correct safe state before real banking/payment providers are connected.

## Non-negotiable policy

Sabi must not store or process raw card data on Sabi infrastructure.

Allowed to store:

- provider id
- provider token id
- provider reference
- masked metadata if allowed by provider
- provider status
- ledger reference
- audit/compliance status

Forbidden:

- PAN
- CVV/CVC
- full card number
- expiry as raw card credential payload
- crypto private keys
- crypto seed phrases
- mobile API keys/provider secrets

## Provider onboarding order

### 1. Local bank gateway

Required before live fiat Wallet execution.

Needs:

- bank contract
- backend client id/reference
- backend secret or vault reference
- webhook URL registered at provider
- webhook signature verification
- sandbox callback tested
- production callback tested
- transaction status mapping
- refund/reversal mapping
- settlement/reconciliation file/API

### 2. Alipay+ acquiring

Required for Alipay-compatible QR/Pay route.

Needs:

- Alipay+ acquiring partner credentials
- merchant/acquirer IDs
- backend secret/vault refs
- callback URL
- signature verification
- QR payment status mapping
- reconciliation mapping

### 3. Bank card tokenization

Required before card binding can be enabled.

Needs:

- provider SDK/iFrame
- tokenization endpoint
- token status webhook
- masked card metadata contract
- card delete/suspend endpoint
- no PAN/CVV returned to Sabi backend or mobile

### 4. Virtual card issuer

Required before virtual card issue button can be enabled.

Needs:

- issuer provider contract
- KYC/KYB requirements
- tokenized card creation endpoint
- issuer webhook
- card lifecycle statuses
- limits and risk rules
- masked display metadata only

### 5. Merchant acquiring

Required before merchant pay/settlement can be enabled.

Needs:

- merchant onboarding route
- KYB flow
- acquiring provider account
- settlement account mapping
- settlement webhook
- dispute/chargeback hooks
- admin/compliance review

### 6. Business payout

Required before business transfers can be enabled.

Needs:

- business wallet route
- payout provider
- KYB/admin approval
- payout status webhook
- restricted/safe-hold states

### 7. Coin Wallet ledger/treasury

Required before Coin Wallet movement can be enabled.

Needs:

- Coin ledger backend
- treasury settlement model
- Coin top-up provider route
- Coin transfer route
- Coin cash-out only through Sabi Wallet bridge
- no direct Coin-to-card withdrawal
- admin/risk ledger holds

### 8. Crypto custody provider

Required before crypto send/receive/swap can be enabled.

Needs:

- custody provider or non-custodial design decision
- blockchain network support list
- address generation provider
- transaction signing policy
- withdrawal risk checks
- no seed/private keys stored by Sabi
- provider webhook/indexer

### 9. Crypto market data provider

Required before crypto prices/portfolio can be shown as live.

Needs:

- market data provider
- price feed endpoint
- currency conversion mapping
- stale feed policy
- no fake price fallback

### 10. KYC provider

Required before card/virtual/merchant/business routes can be live.

Needs:

- identity verification provider
- document/face flow
- status webhook
- rejection/appeal states
- admin review hooks

### 11. AML provider

Required before high-risk money movement can be live.

Needs:

- AML screening provider
- sanction/PEP/adverse media checks if required by jurisdiction
- transaction monitoring hooks
- restricted/safe-hold states
- admin/compliance review

## Execution enablement rule

Never set provider execution to enabled until all are true:

1. real provider contract exists
2. backend credentials or vault refs exist
3. provider webhook is registered
4. signature verification is implemented
5. sandbox transaction tested
6. production readiness approved
7. adapter binding uses real provider, not mock/demo
8. admin/compliance states are connected
9. ledger persistence is connected
10. rollback/refund/failure paths are connected

## Current safe default

All providers should remain:

```txt
provider_not_configured
provider_disabled
execution_ready = false
```

until the real provider onboarding is completed.
