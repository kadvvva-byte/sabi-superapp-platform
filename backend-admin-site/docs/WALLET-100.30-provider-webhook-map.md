# WALLET-100.30 — Provider Webhook Map

Use backend webhook endpoints only. Mobile must never receive provider secrets or webhook signing secrets.

## Required provider webhooks

| Provider | Required webhook purpose | Minimum event coverage |
|---|---|---|
| KYC provider | identity verification result | verified, rejected, review_required, expired |
| AML provider | sanctions/AML/risk result | clear, review_required, restricted, blocked |
| Bank card tokenization | tokenization/card binding result | token_created, token_failed, token_revoked, card_status_changed |
| Local bank gateway | payment transfer result | authorized, captured, failed, reversed, disputed |
| Virtual card issuer | card issuing lifecycle | issued, failed, frozen, closed, replaced |
| Alipay+ acquiring | acquiring payment status | pending, success, failed, cancelled, refunded |
| Merchant acquiring | merchant payment/settlement | paid, settlement_pending, settled, failed, dispute_opened |
| Business payout | payout status | pending, sent, failed, returned, held |
| Coin ledger/treasury | internal treasury/ledger sync | credited, debited, held, released, reversed |
| Crypto custody | wallet/transaction lifecycle | address_created, tx_pending, tx_confirmed, tx_failed, tx_flagged |
| Crypto market data | price/feed status | feed_ready, feed_delayed, feed_failed |

## Required webhook controls

Every webhook must include or support:

- provider event id
- provider account/reference id
- provider transaction/reference id
- signature verification
- idempotency handling
- event timestamp
- replay protection
- audit log
- provider raw payload stored only if it contains no forbidden card data

## Forbidden in webhook persistence

Webhook persistence must reject or redact:

- PAN
- CVV/CVC
- crypto private key
- seed phrase
- provider API secret
- webhook signing secret value

