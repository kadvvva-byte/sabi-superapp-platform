# Sabi SMS Verification 239G — Backend endpoint contract candidate

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Required future placeholder values, not filled now:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Required endpoints for future backend implementation:

POST /api/auth/phone/start
- Input shape: countryCode, phoneNumberMaskedOrEncrypted, deviceFingerprintRef, locale, clientRequestId.
- Output shape: requestAccepted, cooldownUntil, maskedPhone, riskStatus, auditId.
- Must not reveal whether a phone number is registered.
- Must enforce Per-phone cooldown, Per-device limit, Per-IP limit, Per-country risk threshold, Max resend count, No enumeration.

POST /api/auth/phone/verify
- Input shape: verificationIdRef, otpCode, deviceFingerprintRef, clientRequestId.
- Output shape: verificationAccepted, sessionCandidateRef, riskStatus, auditId.
- Must not create final session/token until approved runtime implementation exists.

POST /api/auth/phone/resend
- Input shape: verificationIdRef, deviceFingerprintRef, clientRequestId.
- Output shape: resendAccepted, cooldownUntil, maskedPhone, riskStatus, auditId.
- Must enforce resend and cooldown policy.

GET /api/admin/auth/sms/readiness
- Output shape: providerSelected, valuesShapeReady, secretsReady, liveSmsEnabled, lastAuditStatus, riskSummary.
- Admin view is readiness-only until live approval.
