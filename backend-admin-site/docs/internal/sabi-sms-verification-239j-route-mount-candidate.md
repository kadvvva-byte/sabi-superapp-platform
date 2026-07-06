# SABI-SERVERS-239J — backend route contract mount candidate

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

239J prepares a backend route contract mount candidate for Firebase Phone Auth SMS verification. Provider selected for validation only.

This stage is not live SMS approval and does not mount live routes into production runtime.

Route contracts covered:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Route mount candidate status: safe-disabled mount candidate only.

Placeholders remain unfilled:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>
