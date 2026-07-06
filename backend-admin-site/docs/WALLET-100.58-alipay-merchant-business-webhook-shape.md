# WALLET-100.58 webhook shape

Recommended provider webhook categories:

- Alipay+ payment authorized/captured/failed/cancelled/refunded.
- Merchant payment received/settled/chargeback/refund.
- Business payout initiated/processing/paid/failed/reversed.

All webhooks must be verified server-side with provider signature rules. Raw secrets must be stored only in backend vault/secret manager references, not mobile and not source code.
