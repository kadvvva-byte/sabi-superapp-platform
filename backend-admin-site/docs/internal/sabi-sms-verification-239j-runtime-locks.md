# 239J runtime locks

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Runtime locks:
- disabled_by_default
- safe-disabled route mount candidate
- no process.env reads
- no Firebase Admin import
- no initializeApp
- no getAuth
- no fetch/axios/http/https request
- no Prisma Client
- no DB/session/token writes
- no SMS send call
- no Google Cloud API call
- no gcloud command execution
- no site-ui write
- no admin-ui write
- no mobile write
- no Wallet/payment/payout/crypto connection

Anti-abuse contract markers:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration
- startAttempt
- verifyAttempt
- resendAttempt
- maskedPhoneLogs
