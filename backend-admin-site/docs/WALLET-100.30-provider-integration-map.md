# WALLET-100.30 — Provider Integration Map

## Current confirmed state

Wallet foundation is in safe provider-disabled mode.

Confirmed by previous checks:

- backend provider-config API works
- mobile-safe endpoints are available
- admin endpoints are available with admin token
- endpoint blockers: 0
- policy violations: 0
- fake execution: disabled
- PAN/CVV storage: forbidden
- mobile secret exposure: blocked
- live launch readiness: false until real providers are connected

## Mandatory provider priority

The provider integration order must stay strict:

1. KYC provider
2. AML provider
3. Bank card tokenization
4. Local bank gateway
5. Virtual card issuer
6. Alipay+ acquiring
7. Merchant acquiring
8. Business payout
9. Coin Wallet ledger/treasury
10. Crypto custody provider
11. Crypto market data provider

## Banking/card-data rule

Sabi must not store card data and must not accept card-data liability.

Allowed storage:

- provider token id
- provider customer/card reference
- masked card metadata, if provider allows it
- card status
- provider status
- ledger reference
- risk/compliance status

Forbidden storage:

- PAN
- CVV/CVC
- raw card number
- expiry used as raw card credential
- card PIN
- cardholder sensitive authentication data

Card entry must happen only through provider bank SDK/iFrame/hosted page/tokenization flow.

## Provider readiness gates

A provider is not ready until all are true:

- provider contract is signed or sandbox access is approved
- backend env/vault refs are configured
- webhook endpoint is registered with provider
- webhook signature verification is configured
- adapter binding exists
- execution flag is enabled only for sandbox or live provider mode
- admin/compliance review confirms readiness

## No fake execution rule

Do not enable live operation just because the UI or endpoint exists.

All money movement must remain blocked unless the exact provider family is ready and the execution adapter is real.

