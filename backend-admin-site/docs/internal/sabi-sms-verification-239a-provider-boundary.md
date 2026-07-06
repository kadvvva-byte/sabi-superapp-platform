# Sabi SMS Verification 239A — Provider Boundary

Internal only. No live deploy. No gcloud run. No Google Cloud API call. No SMS provider call. No SMS sent.

## Purpose
Mobile phone confirmation must be connected through a backend verification boundary, not directly from mobile to SMS provider.

## SMS verification boundary
Mobile calls backend verification API only.
SMS provider keys must stay backend-only.
Provider credentials must be stored in Secret Manager in future live stages.

## Future services
- sms-verification-api
- sms-provider-bridge
- sms-anti-abuse
- sms-audit

## Required placeholders before real SMS
- <SMS_PROVIDER>
- <SMS_VERIFY_SERVICE_ID>
- <SMS_SENDER_ID>
- <SMS_WEBHOOK_SECRET>
- <OWNER_APPROVAL_REFERENCE>

## Anti-abuse controls
- rate limit by phone, IP, device, account, country, and risk score
- OTP retry window
- cooldown after repeated attempts
- fraud score before SMS send
- Sabi AI risk report to Owner for abnormal spikes
- audit trail for request, challenge, verification result, failure reason

## Prohibited
- no SMS provider secret in mobile app
- no direct provider call from mobile app
- no real SMS sending in 239A
- no .env/secrets/API/provider usage in 239A
- no DB/session/token writes in 239A

## Owner control
Owner final authority. Sabi AI report-only. Real SMS activation requires separate exact Owner approval.
