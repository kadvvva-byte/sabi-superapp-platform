# BACKEND-STREAM-FOUNDATION-140O-BLOCKED-AUTH-DIAGNOSIS-FIX3

Fixes FIX2 malformed JSON arrays and detects placeholder token usage.

No-restart diagnosis after 140O returned 403 even with runtime token.

Default mode:
- scans selected admin/auth/source files,
- performs no HTTP,
- stores no token.

Optional mode:
- `-ProbeHeaderVariants` tries GET-only admin diagnostics with redacted auth header variants only if token is not a placeholder.

Safety:
- no POST/PUT/PATCH/DELETE,
- no backend restart,
- no source mutation,
- no DB/provider/Wallet/payment/payout/money action,
- token is redacted from report.
