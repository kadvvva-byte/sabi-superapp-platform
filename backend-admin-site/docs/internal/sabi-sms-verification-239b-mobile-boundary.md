# Sabi 239B — Mobile SMS confirmation boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No mobile write.

## Mobile allowed behavior
- Enter phone number.
- Request backend verification session.
- Enter code.
- Receive safe status.
- Show cooldown/resend timer.

## Mobile prohibited behavior
- No direct call to SMS provider.
- No provider SDK secret/key.
- No local fake success.
- No automatic account unlock without backend verification.
- No Wallet/payment/payout change from SMS status.

## User-facing statuses
- `phone_verification_ready`
- `verification_code_sent_pending_provider_live`
- `verification_pending`
- `verification_failed_safe`
- `verification_rate_limited`
- `verified_backend_only_after_future_live_provider`

All current 239B statuses are contract-only; no live SMS is sent.
