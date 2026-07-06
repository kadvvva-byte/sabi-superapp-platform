# WALLET-100.55 — KYC Webhook Handoff Shape

Sabi should accept KYC webhook events only from the real provider and only after webhook signature verification.

## Incoming provider webhook fields

Recommended normalized shape:

```json
{
  "providerId": "kyc_provider",
  "eventId": "provider-event-id",
  "eventType": "kyc.status.updated",
  "providerCustomerId": "provider-customer-id",
  "providerVerificationId": "provider-verification-id",
  "status": "pending|verified|rejected|review_required|expired|provider_failed",
  "reasonCode": "optional-provider-reason",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "rawProviderReference": "optional-reference"
}
```

## Sabi normalized result

```json
{
  "userId": "sabi-user-id",
  "kycStatus": "pending|verified|rejected|review_required|expired|provider_failed",
  "providerId": "kyc_provider",
  "providerReference": "provider-verification-id",
  "adminReviewRequired": false,
  "walletExecutionAllowed": false
}
```

`walletExecutionAllowed` must remain false unless all required providers are ready and execution flags are explicitly enabled.
