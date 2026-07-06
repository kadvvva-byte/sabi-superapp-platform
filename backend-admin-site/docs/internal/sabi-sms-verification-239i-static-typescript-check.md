# Sabi Servers 239I — Firebase adapter static TypeScript check

Internal only. This package checks the safe-disabled skeleton created in 239H.

No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

static TypeScript check scope:
- src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.types.ts
- src/modules/auth/sms/firebase-adapter-239h/firebasePhoneAuthProviderAdapter239H.service.ts
- src/modules/auth/sms/firebase-adapter-239h/authPhoneSmsControllerContracts239H.ts
- src/modules/auth/sms/firebase-adapter-239h/index.ts

Required markers remain placeholders only:
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>
- <FIREBASE_PROJECT_ID>
- <FIREBASE_APP_ID>
- <FIREBASE_AUTH_DOMAIN>
- <FIREBASE_API_KEY_REFERENCE>

Firebase Phone Auth is Provider selected for validation only, not live SMS approval.
