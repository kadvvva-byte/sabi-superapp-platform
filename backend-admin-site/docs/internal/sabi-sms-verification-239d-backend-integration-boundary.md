# Sabi SMS Verification 239D — Backend Integration Boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Backend-only API contract remains:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Boundary rules:
- Mobile calls only Sabi backend endpoints.
- Backend calls SMS provider only in a later approved live/provider stage.
- Provider credentials stay backend-only.
- Secret Manager is the only approved future location for SMS credentials.
- No SMS provider SDK/token/key may be embedded in mobile.
- No DB/session/token writes are made in this stage.
- No Wallet/payment/payout/crypto action may depend directly on SMS status.

Future provider-specific implementation must remain behind sms-provider-bridge and sms-anti-abuse services.
