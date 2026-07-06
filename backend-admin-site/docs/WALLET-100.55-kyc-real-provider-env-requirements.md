# WALLET-100.55 — KYC Real Provider Env Requirements

Do not put raw provider API keys directly into mobile.

Recommended backend env/vault refs:

```env
WALLET_PROVIDER_KYC_PROVIDER_ENABLED=false
WALLET_PROVIDER_KYC_PROVIDER_ID=kyc_provider
WALLET_PROVIDER_KYC_PROVIDER_BASE_URL=
WALLET_PROVIDER_KYC_PROVIDER_API_KEY_VAULT_REF=
WALLET_PROVIDER_KYC_PROVIDER_WEBHOOK_SECRET_VAULT_REF=
WALLET_PROVIDER_KYC_PROVIDER_WEBHOOK_URL=/api/wallet/provider-webhooks/kyc
WALLET_PROVIDER_EXECUTION_KYC_PROVIDER_ENABLED=false
WALLET_PROVIDER_EXECUTION_KYC_VERIFICATION_ENABLED=false
```

To move from skeleton to sandbox:
1. enter real sandbox base URL;
2. enter vault refs, not raw secrets;
3. configure webhook URL at the provider;
4. verify webhook signature;
5. turn on provider enabled only after readiness checks pass;
6. keep execution disabled until adapter is bound and tested.
