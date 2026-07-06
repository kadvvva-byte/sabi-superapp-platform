# WALLET-100.48 — KYC sandbox env safe-disabled

Purpose: add a KYC provider sandbox environment skeleton without enabling live KYC execution or fake approval/rejection.

This step is safe because:

- `WALLET_PROVIDER_KYC_PROVIDER_ENABLED` remains `false`.
- The KYC execution route must stay unavailable until a real provider adapter, vault references, webhook secret, and backend execution flags are configured.
- No fake KYC decision is allowed.
- Mobile endpoints must not expose env names, vault references, admin-only onboarding fields, or secrets.

Required KYC sandbox env keys:

```env
WALLET_PROVIDER_KYC_PROVIDER_ENABLED=false
WALLET_PROVIDER_KYC_PROVIDER_ID=kyc_provider_sandbox_pending
WALLET_PROVIDER_KYC_PROVIDER_BASE_URL=
WALLET_PROVIDER_KYC_PROVIDER_API_KEY_VAULT_REF=
WALLET_PROVIDER_KYC_PROVIDER_WEBHOOK_SECRET_VAULT_REF=
WALLET_PROVIDER_KYC_PROVIDER_WEBHOOK_URL=http://localhost:4001/api/wallet/provider-config/webhooks/kyc-provider
```

The empty values are intentional until a real KYC provider is selected. Do not replace them with fake URLs, fake keys, or fake approval flags.

Expected result after running the check:

```txt
FAIL=0
kycEnvSkeletonReady=True
liveKycReady=False
safeDisabled=True
```
