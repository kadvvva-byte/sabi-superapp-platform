# Sabi SMS verification 239H — Firebase backend adapter stub package

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

239H creates safe-disabled backend TypeScript stubs for the Firebase Phone Auth adapter boundary. The package is not wired into runtime routes and must not send SMS, verify real OTP codes, call Firebase, read environment variables, write DB/session/token data, or enable live auth.

Provider selected for validation only: Firebase Phone Auth.

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager is the only future storage boundary for provider credentials.

Required placeholders before any future live SMS approval:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Owner final authority. Sabi AI report-only. AI self-repair candidate only.
