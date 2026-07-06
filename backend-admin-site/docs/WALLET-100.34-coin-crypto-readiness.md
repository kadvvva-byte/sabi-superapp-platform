# WALLET-100.34 — Coin / Crypto readiness

This step verifies the Coin Wallet and Crypto Wallet provider readiness without enabling live execution.

## Providers checked

1. `coin_wallet_ledger`
2. `crypto_custody_provider`
3. `crypto_market_data_provider`

## Hard rules

- Coin Wallet remains separate from fiat Wallet and Crypto Wallet.
- Coin cash-out must route only through the Sabi Wallet bridge.
- Crypto Wallet remains separate from fiat and Coin.
- No fake crypto prices, balances, transactions, swaps, sends, or custody events.
- Sabi mobile must not receive API keys, vault refs, admin env names, private keys, seed phrases, or mnemonic material.
- Sabi must not store crypto private keys or seed phrases.

## Expected current status

Until real providers are connected:

- `liveCoinCryptoReady=False`
- ready providers are `0 / 3`
- execution guards remain disabled
