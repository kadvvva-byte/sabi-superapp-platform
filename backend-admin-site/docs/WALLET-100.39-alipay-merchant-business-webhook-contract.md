# WALLET-100.39 — Webhook contract

## Alipay+ acquiring webhook

Required event types:

- payment authorized
- payment captured/succeeded
- payment failed
- payment cancelled
- refund started
- refund succeeded
- dispute/chargeback opened
- dispute/chargeback resolved

Required fields:

- provider payment id
- merchant reference
- wallet operation reference
- amount
- currency
- status
- event timestamp
- provider signature

## Merchant acquiring webhook

Required event types:

- merchant payment authorized
- merchant payment captured
- settlement pending
- settlement completed
- settlement failed
- dispute opened
- dispute resolved

## Business payout webhook

Required event types:

- payout accepted
- payout processing
- payout completed
- payout failed
- payout reversed

## Security

Webhook signatures must be verified server-side. Mobile must never receive webhook secret values.
