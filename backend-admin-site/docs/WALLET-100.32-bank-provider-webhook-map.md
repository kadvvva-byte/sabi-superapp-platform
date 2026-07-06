# WALLET-100.32 — Bank/Card Webhook Map

## Required webhook categories

### Card tokenization provider

- token created
- token verified
- token suspended
- token deleted/revoked
- token failed
- card metadata updated

### Local bank gateway

- payment authorized
- payment captured
- payment failed
- payment cancelled
- refund created
- refund failed
- settlement started
- settlement completed

### Virtual card issuer

- issuer application received
- KYC required
- review required
- issued
- suspended
- closed
- transaction authorized
- transaction reversed

## Sabi persistence

Sabi stores only:

- provider token ID
- provider reference
- masked metadata allowed by provider
- provider status
- ledger reference
- webhook event ID
- compliance/risk/admin state

Sabi does not store raw card data.
