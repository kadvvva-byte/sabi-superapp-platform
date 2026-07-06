# WALLET-100.42 — Real provider sandbox rules

Before enabling any sandbox execution flag, the provider must have:

1. Signed sandbox access or official test credentials.
2. Backend-only env/vault references.
3. Webhook endpoint registration.
4. Adapter binding connected to the real provider sandbox API.
5. KYC/AML/risk route readiness if the operation moves value.
6. Ledger reference and provider reference persistence.
7. No mobile API keys or provider secrets.
8. No PAN/CVV storage on Sabi infrastructure.
9. No crypto private key or seed phrase storage on Sabi infrastructure.

Execution flags must remain false until those conditions are satisfied.
