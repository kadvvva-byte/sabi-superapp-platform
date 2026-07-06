# WALLET-100.45 — KYC Provider Sandbox Activation Readiness

This step verifies that Sabi Wallet is ready to start the real KYC sandbox onboarding sequence while still keeping live execution disabled.

## Rules

- No fake KYC approval.
- No fake KYC rejection.
- No live payment execution.
- No PAN/CVV storage.
- No secrets in mobile-safe endpoints.
- KYC remains `provider_not_configured` until real provider env/vault/webhook binding is complete.

## Expected current result

- activationReadinessPassed: true
- liveKycReady: false
- nextProviderToActivate: kyc_provider
