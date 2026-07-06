# WALLET-100.36 — Wallet Foundation Freeze

## Frozen clean state

WALLET-100.35 passed with:

- backend `npx tsc --noEmit` clean
- `finalPrelaunchPassed=True`
- `liveLaunchReady=False`
- `providerBlockers=11`
- endpoint blockers = 0
- policy violations = 0
- mobile redaction clean
- safe-disabled mode active
- token-only card policy active

## Freeze rule

Do not change the Wallet foundation without a specific provider integration reason.

Do not redesign Wallet screens during provider onboarding.

Do not add fake/local success for:

- card binding
- virtual card issuing
- bank transfer
- QR payment
- merchant settlement
- business payout
- Coin top-up/send/withdraw
- crypto send/swap/buy/sell/price feed
- KYC/AML result

## Card-data rule

Sabi must not store:

- PAN
- CVV
- raw card number
- card security code
- crypto private keys
- crypto seed phrases

Sabi may store only provider/bank tokens, token IDs, masked metadata/status where allowed, provider references, ledger references, and compliance/risk states.

## Execution rule

Provider execution must remain disabled until a real provider is contracted, configured, webhook-bound, tested in sandbox, and approved for execution.
