# WALLET-100.47 — KYC provider sandbox binding checklist

This step prepares Sabi Wallet for a real KYC provider sandbox binding without enabling live KYC decisions.

## What this step allows

- Readiness verification for `kyc_provider`.
- KYC execution route mapping check: `kyc_verification -> kyc_provider`.
- Mobile redaction check.
- Admin manifest/checklist check.
- KYC env/vault/webhook handoff checklist.

## What this step does not allow

- No fake KYC approval.
- No fake KYC rejection.
- No local identity decision.
- No live execution.
- No provider secret in mobile.

## Expected status before real provider binding

- `activationBindingReady=True` if backend routes and redaction are correct.
- `liveKycReady=False` until real provider env/vault/webhook binding is connected.
- `nextProviderToActivate=kyc_provider`.

## Required provider information

Ask the KYC provider/bank partner for:

1. Sandbox base URL.
2. API key or client credential delivery method.
3. Webhook signing secret delivery method.
4. Webhook event list.
5. Document verification flow contract.
6. Face/liveness verification flow contract, if used.
7. Status enum mapping.
8. Retry/idempotency rules.
9. Data retention and privacy policy.
10. Sandbox test users/documents.

## Sabi data boundary

Sabi must store only provider references, verification status, review status, risk/compliance metadata, and audit events. Raw KYC documents should remain in the provider flow/storage unless a legal/compliance design explicitly requires controlled backend storage.
