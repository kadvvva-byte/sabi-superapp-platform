# WALLET-100.30 — Sandbox Launch Order

## Phase A — Compliance and identity

1. Connect KYC sandbox provider.
2. Connect AML/sanctions sandbox provider.
3. Verify user identity and risk states can block Wallet operations.
4. Verify admin/review states without exposing secrets to mobile.

## Phase B — Card tokenization and bank gateway

1. Connect card tokenization provider SDK/iFrame/hosted page.
2. Confirm Sabi receives only provider token id and masked metadata.
3. Connect local bank gateway sandbox.
4. Verify payment webhooks and idempotency.

## Phase C — Virtual card issuer

1. Connect issuer sandbox.
2. Verify KYC/risk/issuer readiness before card issue.
3. Verify issued card is represented only by provider token/reference and masked metadata.

## Phase D — Alipay+ and acquiring

1. Connect Alipay+ acquiring sandbox.
2. Register backend callback/notification endpoints.
3. Verify QR/payment status callbacks.
4. Confirm no mobile secret exposure.

## Phase E — Merchant and Business routes

1. Connect merchant acquiring sandbox.
2. Connect business payout sandbox.
3. Verify personal wallet, merchant wallet, and business wallet routes remain separate.
4. Verify settlement and payout do not mix with personal balance.

## Phase F — Coin Wallet

1. Connect Coin ledger/treasury backend route.
2. Verify Coin cannot withdraw directly to card.
3. Verify Coin cash-out only through Sabi Wallet bridge.
4. Verify Coin history/hold/release/reversal states.

## Phase G — Crypto Wallet

1. Connect crypto custody provider sandbox.
2. Connect market data provider.
3. Verify no seed/private key storage by Sabi.
4. Verify fake price/feed/transaction remains impossible.

