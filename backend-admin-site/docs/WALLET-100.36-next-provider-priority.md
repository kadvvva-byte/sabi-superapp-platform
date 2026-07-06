# WALLET-100.36 — Next Provider Priority

Provider onboarding order:

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

Reason:

- KYC/AML must exist before money movement.
- Bank/card tokenization must exist before card UX becomes live.
- Local bank gateway and virtual issuer enable core wallet/card functions.
- Alipay+/merchant/business routes come after bank/payment foundation.
- Coin and Crypto remain separate wallet layers and must not use fake balances, fake market data, or fake movement.
