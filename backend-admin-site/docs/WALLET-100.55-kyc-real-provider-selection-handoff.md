# WALLET-100.55 — KYC Real Provider Selection / Handoff

## Status before this step

Wallet foundation is frozen and clean:
- token-only policy passed;
- mobile-safe redaction passed;
- safe-disabled mode passed;
- real binding preflight passed;
- liveLaunchReady remains false until real providers are connected.

## KYC provider must support

1. Identity verification
   - document verification;
   - selfie/liveness where available;
   - manual review status;
   - retry/recheck state.

2. Business/compliance integration
   - webhook delivery;
   - sandbox environment;
   - production environment;
   - provider reference IDs;
   - status reconciliation API.

3. Required statuses

Sabi should map provider statuses into internal states:

- provider_not_configured
- pending
- verified
- rejected
- review_required
- expired
- restricted
- provider_failed

## Data boundary

Sabi backend may store:
- provider customer/applicant ID;
- provider verification ID;
- status;
- timestamps;
- masked/non-sensitive metadata;
- audit references.

Sabi mobile must not receive:
- provider API keys;
- webhook secrets;
- vault references;
- raw document files as permanent wallet storage;
- admin-only review fields.

## No fake KYC rule

Until a real KYC provider is connected:
- no fake approve;
- no fake reject;
- no bypass;
- no local decision as verified;
- wallet execution remains blocked.

## Handoff questions for KYC provider

Ask the provider/bank:

1. Do you support sandbox KYC?
2. Which countries/documents are supported?
3. Do you provide webhook signing?
4. What are the webhook event names?
5. What is the provider applicant/customer ID field?
6. How do we fetch final verification status?
7. Is manual review supported?
8. What retention rules apply to uploaded documents?
9. What data can be stored by Sabi?
10. What must stay only inside provider infrastructure?
