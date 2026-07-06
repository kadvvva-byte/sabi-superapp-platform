# Provider sandbox activation order

## Phase 1 — Compliance

- KYC provider
- AML provider

No bank, Alipay, Coin, or Crypto execution should be enabled before compliance providers are configured.

## Phase 2 — Bank and cards

- Bank card tokenization
- Local bank gateway
- Virtual card issuer

Sabi must keep token-only storage. PAN/CVV must remain inside bank/provider SDK or iFrame.

## Phase 3 — Payments and business settlement

- Alipay+ acquiring
- Merchant acquiring
- Business payout

Merchant/business money routes must remain separate from personal Wallet.

## Phase 4 — Coin and Crypto

- Coin Wallet ledger / treasury
- Crypto custody provider
- Crypto market data provider

Coin, fiat, and crypto must remain separate wallet layers.
