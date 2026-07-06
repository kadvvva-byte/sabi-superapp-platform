# Sabi 239B — SMS anti-abuse and audit rules

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

## Anti-abuse controls
- Per-phone cooldown.
- Per-device limit.
- Per-IP limit.
- Per-country risk threshold.
- Max resend count.
- Suspicious pattern block pending admin review.
- No enumeration: response must not reveal whether a phone already exists.

## Audit controls
- Create audit event for start/verify/resend attempts.
- Store masked phone only in normal logs.
- Store provider request id only after future live integration.
- Sabi AI report-only: daily summary of SMS abuse attempts and urgent alerts for spikes.
- Owner final authority for production activation and high-risk blocks.

## Safety
SMS/auth events must not directly trigger Wallet/payment/payout/provider actions.
