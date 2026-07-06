# Sabi SMS Verification 239C — Owner values form template

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Owner must fill this form only when ready for a later live-preflight stage:

```text
SMS_PROVIDER=<SMS_PROVIDER>
SMS_VERIFY_SERVICE_ID=<SMS_VERIFY_SERVICE_ID>
SMS_SENDER_ID=<SMS_SENDER_ID>
SMS_WEBHOOK_SECRET=<SMS_WEBHOOK_SECRET>
OWNER_APPROVAL_REFERENCE=<OWNER_APPROVAL_REFERENCE>
```

Allowed provider candidates:

- Firebase Phone Auth
- Twilio Verify
- Other Owner-approved SMS verification provider

Forbidden in this stage:

- Real API key values
- Real webhook secrets
- Real provider calls
- Real SMS sends
- Real session or token writes
- Mobile direct provider access
- Wallet/payment/payout/crypto coupling
