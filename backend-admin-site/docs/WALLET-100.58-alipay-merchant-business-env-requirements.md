# WALLET-100.58 env requirements

Use backend `.env` or a secret manager. Do not place provider secrets in mobile.

Required skeletons:

- `WALLET_PROVIDER_ALIPAY_PLUS_ACQUIRING_ENABLED=false`
- `WALLET_PROVIDER_ALIPAY_PLUS_ACQUIRING_BASE_URL=`
- `WALLET_PROVIDER_ALIPAY_PLUS_ACQUIRING_API_KEY_VAULT_REF=`
- `WALLET_PROVIDER_ALIPAY_PLUS_ACQUIRING_WEBHOOK_SECRET_VAULT_REF=`
- `WALLET_PROVIDER_MERCHANT_ACQUIRING_ENABLED=false`
- `WALLET_PROVIDER_BUSINESS_PAYOUT_ENABLED=false`

Execution flags must remain false until real sandbox credentials, webhooks, adapters, KYC/AML, and admin approval are complete.
