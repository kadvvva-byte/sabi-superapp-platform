# QR Module

README.md must stay **inside** `src/modules/qr/README.md`.

## Stage 6 goal
This stage hardens runtime execution before gift integration.

## What is added now
- wallet-type guards by QR route
- rail compatibility checks
- currency checks
- stronger insufficient balance handling
- safer transaction typing for live-first flows

## Live-first route rules
### `coin_send`
- payer wallet type must be `COIN`
- receiver wallet type must be `COIN`

### `coin_receive`
- payer wallet type must be `COIN`
- receiver wallet type must be `COIN`

### `sabi_user_transfer`
- payer wallet type must **not** be `COIN`
- receiver wallet type must **not** be `COIN`

### `sabi_merchant_payment`
- payer wallet type must **not** be `COIN`
- receiver wallet type can be `MERCHANT` or another non-coin wallet, depending on project routing

## Important
Gifts are still not connected here.
This stage is only for safer QR runtime execution.
