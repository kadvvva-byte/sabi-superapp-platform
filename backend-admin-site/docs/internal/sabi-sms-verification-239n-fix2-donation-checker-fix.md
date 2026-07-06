# Sabi SMS verification 239N-FIX2 donation checker fix

Internal only.
No live deploy.
No SMS provider call.
No SMS sent.
No Firebase API call.
No secrets.
Firebase Phone Auth.
Provider selected for validation only.
Mobile never calls the SMS provider directly.
Provider credentials stay backend-only.
Secret Manager.
GET /api/admin/auth/sms/readiness.
POST /api/auth/phone/start.
POST /api/auth/phone/verify.
POST /api/auth/phone/resend.
Per-phone cooldown.
Per-device limit.
Per-IP limit.
Per-country risk threshold.
Max resend count.
No enumeration.
Sabi AI report-only.
Owner final authority.
AI self-repair candidate only.
Sabi Messenger only.
