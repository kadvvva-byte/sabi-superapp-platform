# WALLET-100.52 — Coin/Crypto sandbox env safe-disabled

## Goal

Prepare the backend `.env` structure for Coin and Crypto providers without enabling live or sandbox execution.

## Providers

- `coin_wallet_ledger`
- `crypto_custody_provider`
- `crypto_market_data_provider`

## Mandatory disabled state

All provider flags and execution flags stay `false`.

## Security rules

- Sabi does not store crypto seed phrase.
- Sabi does not store crypto private keys.
- Sabi does not create fake crypto balances or transactions.
- Coin Wallet remains separate from fiat Wallet and Crypto Wallet.
- Coin cash-out remains routed through Sabi Wallet bridge only.
- Mobile must not receive vault refs, env names, API keys, secrets, seed phrase, or private keys.

## Expected status

`liveCoinCryptoReady=False` until real Coin treasury, crypto custody, and crypto market data providers are connected.
