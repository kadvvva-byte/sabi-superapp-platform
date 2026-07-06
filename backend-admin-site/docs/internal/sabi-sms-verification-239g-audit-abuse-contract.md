# Sabi SMS Verification 239G — Audit and anti-abuse contract candidate

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Anti-abuse required controls:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration

Audit required records:
- startAttempt
- verifyAttempt
- resendAttempt
- readinessViewed
- providerBoundaryChecked
- maskedPhoneLogs
- clientRequestId
- riskStatus
- Sabi AI report-only
- Owner final authority

Evidence and logs must preserve admissible materials when fraud, money laundering, corruption, or criminal activity is detected. Any report to competent law-enforcement authorities must happen within applicable law and only through approved governance flow.

No Wallet/payment/payout/crypto connection is part of this SMS stage.
