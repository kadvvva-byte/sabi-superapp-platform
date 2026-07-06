# WALLET-100.31 — KYC/AML provider onboarding

## Purpose
KYC and AML must be connected before enabling real Wallet money movement, card tokenization, virtual card issuance, Alipay+/bank payment routes, Coin cash-out, merchant settlement, business payout, or crypto operations.

## Hard rules
- Sabi must not fake KYC or AML decisions.
- Sabi must not enable live payment execution until compliance provider readiness is confirmed.
- Mobile must not receive provider secrets, vault references, or admin-only onboarding fields.
- KYC/AML decisions are provider/admin/compliance signals, not UI-only switches.
- Admin/compliance review must be available before sensitive operations are enabled.

## Provider priority
1. KYC provider
2. AML provider
3. Bank card tokenization
4. Local bank gateway
5. Virtual card issuer
6. Alipay+ acquiring
7. Merchant acquiring
8. Business payout
9. Coin Wallet ledger/treasury
10. Crypto custody
11. Crypto market data

## Minimum KYC provider requirements
- Sandbox base URL
- Production base URL
- API key or OAuth client credentials stored only in backend env/vault
- Webhook signing secret stored only in backend env/vault
- Applicant/session creation endpoint
- Identity document verification flow
- Liveness/face check flow if required
- Status webhook
- Admin/manual review status
- Provider reference ID mapping
- Idempotency support
- Audit/export support

## Minimum AML provider requirements
- Sandbox base URL
- Production base URL
- API key or OAuth credentials stored only in backend env/vault
- Webhook signing secret stored only in backend env/vault
- Sanctions screening
- PEP screening
- Adverse media screening if available
- Transaction monitoring hooks
- Status webhook
- Risk score / risk reason mapping
- Admin/manual review status
- Provider reference ID mapping
- Audit/export support

## Required backend states
- provider_not_configured
- provider_disabled
- provider_pending
- provider_ready
- kyc_required
- aml_review_required
- admin_review_required
- safe_hold
- restricted

## Launch rule
Wallet live execution stays disabled until KYC and AML providers are ready and verified in admin/provider readiness checks.
