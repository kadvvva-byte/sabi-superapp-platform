# 239H backend stub contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Safe-disabled future module names:
- authPhoneStartController239H
- authPhoneVerifyController239H
- authPhoneResendController239H
- adminSmsReadinessController239H
- firebasePhoneAuthProviderAdapterStub239H
- smsAttemptAuditWriterStub239H

Contract endpoints retained from 239G:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Runtime state: disabled_by_default. The adapter returns locked readiness only and never calls Firebase.

Required placeholders:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>
