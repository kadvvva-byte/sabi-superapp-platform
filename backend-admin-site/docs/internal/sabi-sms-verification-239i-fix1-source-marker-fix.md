# Sabi SMS Verification 239I-FIX1 — Firebase adapter source marker fix

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

This patch fixes the static source marker false-negative by ensuring the safe-disabled adapter source contains the exact exported marker names required by the checker:

- FirebasePhoneAuthProviderAdapter239H
- firebasePhoneAuthProviderAdapterStub239H

The adapter remains disabled_by_default. Provider selected for validation only: Firebase Phone Auth.

Runtime boundary remains locked:
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Secret Manager is the only future secret boundary.
- POST /api/auth/phone/start remains contract-only.
- POST /api/auth/phone/verify remains contract-only.
- POST /api/auth/phone/resend remains contract-only.
- GET /api/admin/auth/sms/readiness remains contract-only.

Audit and abuse controls remain: Per-phone cooldown, Per-device limit, Per-IP limit, Per-country risk threshold, Max resend count, No enumeration, startAttempt, verifyAttempt, resendAttempt, maskedPhoneLogs.

Governance remains: Sabi AI report-only. Owner final authority. AI self-repair candidate only.

Required placeholders remain unfilled:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>
