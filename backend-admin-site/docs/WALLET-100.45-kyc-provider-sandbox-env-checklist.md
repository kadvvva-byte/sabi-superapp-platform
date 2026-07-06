# WALLET-100.45 KYC Sandbox Env Checklist

Before enabling KYC sandbox readiness, collect from the real provider:

- Provider account / tenant ID
- Sandbox API base URL
- API key vault reference
- Webhook signing secret vault reference
- Callback/webhook URL allowlist
- Supported document types
- Supported country coverage
- Status mapping: pending, approved, rejected, manual_review, expired
- Retry and idempotency rules
- Data retention requirements

Secrets must remain in backend env/vault only. Mobile must never receive API keys, webhook signing secrets, or vault references.
