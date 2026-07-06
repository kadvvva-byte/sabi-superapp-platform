# Sabi SMS Verification 239C — Provider exact values intake gate

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Purpose: prepare the exact Owner-provided SMS provider values gate for a future live SMS verification connection. This stage does not connect Firebase, Twilio, or any other provider.

Required values before any future live SMS step:

- `<SMS_PROVIDER>`
- `<SMS_VERIFY_SERVICE_ID>`
- `<SMS_SENDER_ID>`
- `<SMS_WEBHOOK_SECRET>`
- `<OWNER_APPROVAL_REFERENCE>`

Current state: placeholder-only. Real values are not embedded in this package.

Rules:

1. Mobile never calls the SMS provider directly.
2. Provider credentials stay backend-only.
3. Provider credentials must be stored in Secret Manager in future live stages.
4. No real SMS may be sent from this stage.
5. No real auth/session/token write may be enabled from this stage.
6. Sabi AI report-only: Sabi AI can report readiness, risk, abuse, and configuration gaps to Owner.
7. Owner final authority: live SMS provider connection requires separate exact Owner approval.
8. AI self-repair candidate only: Sabi AI may prepare patch candidates and tests, but must not merge, deploy, activate providers, send SMS, or write production secrets without separate Owner approval.
