# WALLET-100.37 — KYC/AML webhook contract

## KYC webhook events

Allowed event types:

- `verification_started`
- `verification_verified`
- `verification_rejected`
- `verification_manual_review`
- `verification_expired`

Required fields:

- provider reference
- event type
- event timestamp
- unified user ID or provider customer reference
- signature header from provider

Backend behavior:

- Validate signature before state mutation.
- Store provider reference and status.
- Create audit record.
- Never create fake approval.
- If status is unclear, route to admin review.

## AML webhook events

Allowed event types:

- `screening_clear`
- `screening_alert`
- `screening_manual_review`
- `transaction_risk_status`
- `case_closed`

Backend behavior:

- Validate signature before state mutation.
- Store provider reference, risk status, and compliance status.
- For suspicious financial patterns, use safe hold/restricted state plus admin review.
- Do not accuse the user in UI.
- Do not silently allow restricted wallet execution.
