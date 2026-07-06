# WALLET-100.44 — Sandbox activation checklist

This step does not enable live payments, card issuing, Coin movement, crypto movement, KYC approval, or AML clearance.

Purpose:

1. Confirm mobile-safe and admin provider endpoints are reachable.
2. Confirm all execution readiness routes remain closed until real providers are configured.
3. Identify the next provider to activate in sandbox order.
4. Preserve token-only policy and prevent accidental execution.

Activation order:

1. KYC provider
2. AML provider
3. Bank card tokenization
4. Local bank gateway
5. Virtual card issuer
6. Alipay+ acquiring
7. Merchant acquiring
8. Business payout
9. Coin Wallet ledger / treasury
10. Crypto custody provider
11. Crypto market data provider

Live launch must remain false until real provider contracts, sandbox keys, webhook secrets, vault references, and real adapters are connected and validated.
