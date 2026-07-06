# WALLET-100.31 — KYC/AML webhook map

## Target webhook routes
These route names are required before live integration. If final backend paths differ, map them in provider onboarding docs and admin config.

### KYC provider webhook
Suggested route:
POST /api/wallet/provider-webhooks/kyc/status

Expected events:
- kyc.session.created
- kyc.review.pending
- kyc.verified
- kyc.rejected
- kyc.expired
- kyc.manual_review_required

### AML provider webhook
Suggested route:
POST /api/wallet/provider-webhooks/aml/status

Expected events:
- aml.screening.started
- aml.clear
- aml.review_required
- aml.high_risk
- aml.restricted
- aml.updated

## Security
- Verify webhook signature on backend.
- Use idempotency keys/provider event IDs.
- Never trust mobile for KYC/AML result decisions.
- Persist audit trail with provider reference and normalized status.
