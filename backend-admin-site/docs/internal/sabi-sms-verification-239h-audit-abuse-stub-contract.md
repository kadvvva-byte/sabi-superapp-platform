# 239H audit and anti-abuse stub contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Anti-abuse markers preserved:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration

Audit markers preserved:
- startAttempt
- verifyAttempt
- resendAttempt
- maskedPhoneLogs

Sabi AI report-only: may detect risk and prepare reports. Owner final authority remains required for live provider activation and enforcement policy changes. AI self-repair candidate only: patch candidates may be prepared but not merged/deployed without separate Owner approval.
