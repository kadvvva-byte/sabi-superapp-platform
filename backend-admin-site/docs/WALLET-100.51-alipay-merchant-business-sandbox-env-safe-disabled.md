# WALLET-100.51 — Alipay/Merchant/Business sandbox env safe-disabled

This step prepares safe-disabled environment skeletons for Alipay+ acquiring, merchant acquiring, and business payout.

It must not enable live execution, fake settlements, fake payouts, or fake Alipay+ payment success.

Expected state:

- Alipay+ provider skeleton exists but remains disabled.
- Merchant acquiring skeleton exists but remains disabled.
- Business payout skeleton exists but remains disabled.
- Execution flags remain false.
- Mobile-safe endpoints do not expose admin/vault/env/secret fields.
- Token-only policy remains active.
- PAN/CVV storage remains disabled.

Live readiness remains false until real provider contracts, sandbox credentials, webhook signatures, and real adapters are connected.
