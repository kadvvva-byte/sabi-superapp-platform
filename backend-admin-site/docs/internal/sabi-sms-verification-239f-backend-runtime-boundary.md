# Sabi SMS Verification 239F — Backend runtime boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Backend endpoints remain contract-only:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Required abuse controls before live runtime:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration

Runtime locks remain active until separate Owner approval:
- Real SMS provider connection
- Real SMS sending
- Real auth activation
- Real DB/session/token writes
- Any .env/secrets/API/provider usage
- Real Google Cloud project/API calls
- Real gcloud command execution
- Real hosting deployment
- Real DNS changes
- Real SSL binding
- Any Wallet/payment/payout/crypto connection
- Public launch announcement
