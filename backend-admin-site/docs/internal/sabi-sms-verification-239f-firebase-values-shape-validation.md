# Sabi SMS Verification 239F — Firebase exact values shape validation

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Provider selected for validation only: Firebase Phone Auth. This is not live SMS approval.

239F validates only the future value shape and storage boundary. Values remain placeholders and must not be replaced with real secrets in this stage.

Required placeholders before future live SMS:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>

Firebase planning placeholders:
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Validation rules:
- SMS verify service id shape is recorded as placeholder-only.
- Sender id shape is recorded as placeholder-only.
- Webhook secret shape is recorded as placeholder-only and must later be stored only in Secret Manager.
- Owner approval reference is required before any live connection.
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Sabi AI report-only.
- Owner final authority.
- AI self-repair candidate only.
