# 239K Safe-disabled route source contract

Internal only. The route TypeScript sources are checked as a safe-disabled skeleton. This is the safe-disabled route source contract.

Allowed source markers:
- authPhoneSmsRouteMountCandidate239J
- backendRouteContractMountCandidate239J
- disabled_by_default
- contract_only_no_runtime_mount
- startAttempt
- verifyAttempt
- resendAttempt
- maskedPhoneLogs

Forbidden in checked route sources:
- process.env
- firebase-admin import
- initializeApp
- getAuth
- fetch/axios/http request
- PrismaClient
- DB/session/token writes
- sendSms/sendVerificationCode/sendCode
- app.use/router.post/router.get runtime route mount

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager is required before live approval.
