# Sabi SMS Verification 239G — Firebase Admin / backend integration contract candidate

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No Google Cloud API call. No gcloud run. No secrets.

Purpose: define the backend-only contract candidate for future Firebase Phone Auth integration after Owner-approved live values are provided.

Provider selected for validation only: Firebase Phone Auth.

Required future placeholder values, not filled now:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Backend boundary:
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Secret Manager is the only future secrets boundary.
- Sabi AI report-only.
- Owner final authority.
- AI self-repair candidate only.

Future implementation modules, not enabled now:
- authPhoneStartController239G
- authPhoneVerifyController239G
- authPhoneResendController239G
- adminSmsReadinessController239G
- firebasePhoneAuthProviderAdapterCandidate239G
- smsAttemptAuditWriterCandidate239G

Locked until separate Owner approval:
- Real SMS provider connection
- Real SMS sending
- Real Firebase/Auth activation
- Real DB/session/token writes
- Any .env/secrets/API/provider usage
- Real Google Cloud project/API calls
- Real gcloud command execution
- Real hosting deployment
- Real DNS changes
- Real SSL binding
- Any Wallet/payment/payout/crypto connection
- Public launch announcement
