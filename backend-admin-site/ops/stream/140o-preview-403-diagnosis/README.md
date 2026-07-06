# BACKEND-STREAM-FOUNDATION-140O-PREVIEW-403-DIAGNOSIS

Read-only diagnosis for the case where:
- Authorization: Bearer real ADMIN_PANEL_TOKEN gives readiness=200,
- preview still returns 403.

Safety:
- no backend restart,
- no source mutation,
- no DB/provider/Wallet/payment/payout/money action,
- optional HTTP is GET-only,
- token is redacted and not stored.
