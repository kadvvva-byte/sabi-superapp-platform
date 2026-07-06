# 239I safe-disabled source contract

The source must stay as a safe-disabled skeleton.

Required safe markers:
- disabled_by_default
- firebasePhoneAuthProviderAdapterStub239H
- safe-disabled skeleton

Backend endpoint contract markers:
- POST /api/auth/phone/start
- POST /api/auth/phone/verify
- POST /api/auth/phone/resend
- GET /api/admin/auth/sms/readiness

Audit markers:
- startAttempt
- verifyAttempt
- resendAttempt
- maskedPhoneLogs

Abuse-control markers:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager remains the only planned secret boundary.
