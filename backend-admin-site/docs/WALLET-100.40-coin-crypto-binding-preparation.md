# WALLET-100.40 — Coin/Crypto binding preparation

This step prepares Coin Wallet and Crypto Wallet provider binding without enabling live execution.

## Rules

- Coin Wallet remains separate from fiat Wallet.
- Crypto Wallet remains separate from fiat and Coin.
- COIN cash-out may only route through Sabi Wallet bridge.
- No direct COIN withdrawal to bank cards.
- No fake Coin ledger movement.
- No fake crypto transaction.
- No fake market data.
- No seed phrase, mnemonic, private key, or custody secret may be stored on Sabi mobile.
- Backend may expose admin readiness metadata only through protected admin endpoints.
- Mobile-safe endpoints must not expose admin/env/vault/secret surfaces.

## Providers covered

1. `coin_wallet_ledger`
2. `crypto_custody_provider`
3. `crypto_market_data_provider`

## Operations that must remain disabled until real provider binding

- `coin_topup`
- `coin_send`
- `coin_withdraw`
- `crypto_send`
- `crypto_market_data`

`liveCoinCryptoReady=False` is the expected state until real provider contracts, env/vault refs, webhooks, and adapters are connected.
