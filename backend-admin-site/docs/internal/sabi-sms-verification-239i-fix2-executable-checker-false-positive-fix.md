# Sabi SMS Verification 239I-FIX2 — executable checker false-positive fix

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

239I-FIX2 fixes a documentation/static checker false-positive: plain English documentation mentioning Firebase Phone Auth is not an executable Firebase CLI command.

Allowed documentation sentence shape:
- Selected provider for validation only: Firebase Phone Auth. This is not live SMS approval.

Blocked executable command shapes remain blocked:
- gcloud command lines
- firebase CLI command lines
- twilio CLI command lines
- curl / Invoke-RestMethod / Invoke-WebRequest lines
- gsutil / terraform / kubectl / deploy command lines

Provider selected for validation only: Firebase Phone Auth.
Mobile never calls the SMS provider directly.
Provider credentials stay backend-only.
Secret Manager remains the only future secret boundary.

Required placeholders remain unfilled:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Static TypeScript check remains limited to safe-disabled skeleton source under src/modules/auth/sms/firebase-adapter-239h.
