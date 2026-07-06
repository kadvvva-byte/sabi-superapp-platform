# WALLET-100.40 — Coin/Crypto webhook contract

## Coin provider webhook events

- coin_ledger.topup.pending
- coin_ledger.topup.confirmed
- coin_ledger.transfer.pending
- coin_ledger.transfer.confirmed
- coin_ledger.withdrawal.pending
- coin_ledger.withdrawal.confirmed
- coin_ledger.withdrawal.rejected

Each event must include provider reference, ledger reference, user ID, amount, currency/unit, status, and immutable audit timestamp.

## Crypto custody webhook events

- crypto.deposit.detected
- crypto.deposit.confirmed
- crypto.withdrawal.pending
- crypto.withdrawal.broadcasted
- crypto.withdrawal.confirmed
- crypto.withdrawal.failed

No private key, seed phrase, or mnemonic may be sent to Sabi.

## Market-data events

- market.price.snapshot
- market.price.feed_status

No fake price fallback is allowed. If provider is not configured, the state must remain `provider_not_configured`.
