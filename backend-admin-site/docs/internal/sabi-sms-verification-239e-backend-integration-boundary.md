# 239E backend integration boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Mobile never calls the SMS provider directly.
Provider credentials stay backend-only.
Secret Manager is the only future storage boundary for provider credentials.

Backend API contract remains:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Anti-abuse remains mandatory:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration

Sabi AI report-only. Owner final authority. AI self-repair candidate only.
