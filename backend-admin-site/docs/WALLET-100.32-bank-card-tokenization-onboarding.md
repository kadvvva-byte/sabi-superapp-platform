# WALLET-100.32 — Bank / Card Tokenization / Virtual Issuer Onboarding

## Goal

Prepare Sabi Wallet for real bank-grade card flows without taking card-data liability.

Sabi must not collect, process, store, log, or persist raw card data. Card entry must happen only inside the bank/payment-provider SDK, iframe, or hosted flow. Sabi receives only a provider-issued token, masked metadata, status, and provider references.

## Provider scope

1. `bank_card_tokenization`
2. `local_bank_gateway`
3. `virtual_card_issuer`

## Required guarantees

- Card data entry is owned by bank/provider SDK/iframe/hosted page.
- Sabi backend receives only tokenized payloads.
- Sabi mobile never receives provider secrets.
- Provider webhooks update card/payment state.
- Execution remains disabled until real adapter binding is implemented and reviewed.
- Token-only policy remains enforced across mobile and backend.

## Live readiness conditions

Each provider must have:

- Contract / sandbox access
- Provider ID / merchant ID / client ID
- Backend secret or vault reference
- Webhook URL registered with provider
- Webhook signature verification method
- Sandbox test cards or provider testing tools
- Provider adapter implemented against real API documentation
- Compliance approval for KYC/AML dependency chain
- Admin review before enabling execution flag

## No-go rules

- No manual card number input in Sabi screens
- No CVV field in Sabi screens
- No card number in logs, analytics, ledger, or audit JSON
- No fake tokenization
- No local success mutation before provider callback
- No live execution until provider adapter returns verified provider state
