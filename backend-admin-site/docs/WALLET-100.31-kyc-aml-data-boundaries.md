# WALLET-100.31 — KYC/AML data boundaries

## Mobile boundary
Mobile may show only safe statuses:
- provider_not_configured
- kyc_required
- aml_review_required
- admin_review_required
- safe_hold
- restricted
- provider_ready

Mobile must not receive:
- API keys
- vault references
- secret env names
- webhook signing secrets
- raw provider secret payloads
- PAN/CVV/card raw data
- crypto seed phrase/private keys

## Backend boundary
Backend may store safe operational references:
- provider ID
- provider reference
- verification status
- risk status
- audit reference
- timestamp
- masked display metadata where allowed

Backend must not store:
- PAN
- CVV
- crypto seed phrase/private keys
- plaintext provider secrets in application code

## Admin/compliance boundary
Admin endpoints may expose missing config names and readiness blockers, but must not expose actual secret values.
