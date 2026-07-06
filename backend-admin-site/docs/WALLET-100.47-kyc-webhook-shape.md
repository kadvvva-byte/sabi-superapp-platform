# WALLET-100.47 — KYC webhook shape

Recommended backend route:

```txt
POST /api/wallet/provider-config/webhooks/kyc
```

Recommended event payload fields:

```json
{
  "providerId": "kyc_provider",
  "providerUserId": "provider-user-reference",
  "sabiUserId": "sabi-user-id",
  "eventId": "provider-event-id",
  "eventType": "kyc.status.updated",
  "verificationId": "provider-verification-id",
  "status": "pending | approved | rejected | review_required | expired",
  "reasonCode": "optional-provider-reason-code",
  "createdAt": "2026-05-09T00:00:00.000Z",
  "signature": "provider-signature"
}
```

## Rules

- Webhook must verify provider signature.
- Webhook must be idempotent by provider `eventId`.
- Webhook must never accept card PAN/CVV.
- Webhook must never make payment execution decisions directly.
- KYC result should update compliance state; payment execution remains controlled by Wallet provider readiness/risk guard.
