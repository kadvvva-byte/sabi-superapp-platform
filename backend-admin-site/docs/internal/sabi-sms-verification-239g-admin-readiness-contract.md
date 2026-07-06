# Sabi SMS Verification 239G — Admin readiness contract candidate

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Admin readiness screen contract:
- Provider: Firebase Phone Auth, validation candidate only.
- Live SMS status: disabled.
- Firebase exact values status: placeholder-only.
- Secret Manager status: planned boundary only.
- Backend endpoints status: contract candidate only.
- Abuse protection status: contract candidate only.
- Audit status: contract candidate only.
- Sabi AI status: report-only.
- Owner status: final authority.

Admin must not display raw phone numbers, raw OTP codes, raw secrets, private provider keys, or unmasked PII.

Admin actions allowed in this stage:
- view readiness
- view contract markers
- view missing values checklist
- prepare Owner approval request

Admin actions locked:
- enable live auth
- connect Firebase
- send SMS
- create sessions/tokens
- write DB/auth state
