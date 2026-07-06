# WALLET-100.37 — KYC/AML provider adapter binding preparation

Status target: backend-ready binding shell, no live KYC/AML decision simulation.

## Purpose

This step prepares the real provider binding boundary for Wallet compliance. It does not approve, reject, clear, or block a user by fake logic. It only defines the contract that a real KYC/AML provider must satisfy before Wallet live execution can be enabled.

## Hard rules

- No fake KYC approval.
- No fake AML clearance.
- No live wallet execution without real provider binding.
- Mobile receives only safe provider status and readiness state.
- Admin endpoints may show provider configuration requirements, but never secret values.
- Sabi stores provider references, verification status, risk/compliance status, audit metadata, and admin review state.
- Sabi does not store raw payment card data.
- Crypto seed/private keys are not stored by Sabi.

## Provider states

Current expected state before real provider onboarding:

- `kyc_provider`: `provider_not_configured`
- `aml_provider`: `provider_not_configured`
- `liveKycAmlReady`: `false`

## Required real provider artifacts

For KYC:

- Provider contract and data-processing agreement.
- Sandbox credentials in backend vault/env only.
- Production credentials in backend vault/env only.
- Verification start API.
- Webhook signature validation.
- Webhook event mapping.
- Admin review workflow for ambiguous cases.

For AML:

- Provider contract and compliance policy.
- Sandbox credentials in backend vault/env only.
- Production credentials in backend vault/env only.
- Sanctions/PEP/adverse-media screening API if applicable.
- Transaction monitoring status API.
- Webhook signature validation.
- Case lifecycle webhooks.
- Safe hold/restricted state mapping.

## What this step installs

- `src/modules/wallet/application/provider/compliance/kyc-aml-provider-binding.contract.ts`
- `tools/wallet-kyc-aml-binding-preparation-check.ps1`
- Provider handoff documentation.

## Expected test result

Before real provider connection:

```txt
FAIL=0
bindingPreparationPassed=True
liveKycAmlReady=False
```

`liveKycAmlReady=False` is correct until real KYC/AML providers are connected.
