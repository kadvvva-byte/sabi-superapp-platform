# Real provider requirements before setting any provider to enabled

Before any `WALLET_PROVIDER_*_ENABLED=true` flag is allowed, the provider must have:

1. Signed provider/sandbox access or official sandbox credentials.
2. Backend-only secret storage through vault/env references.
3. Webhook URL and webhook verification secret reference.
4. Real adapter binding, not a local mock or fake implementation.
5. Admin/compliance review path.
6. Execution flag still disabled until adapter readiness is verified.
7. No mobile secret exposure.
8. No PAN/CVV storage.
9. No seed phrase/private-key storage on Sabi infrastructure.

Provider activation order:

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
