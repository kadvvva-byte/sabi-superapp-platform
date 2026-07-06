# WALLET-100.38 — Bank/Card/Issuer Webhook Contract

Provider webhooks should update token/issuer/payment statuses only. They must not send or store raw card data in Sabi.

Allowed webhook metadata:
- providerId
- providerReference
- providerTokenId
- tokenStatus
- maskedPan or maskedDisplay if provider permits
- cardNetwork if provider permits
- issuerCardId/tokenized card reference
- walletId/userId/unifiedUserId references
- ledgerReference
- status
- riskStatus
- complianceStatus
- createdAt/updatedAt

Blocked webhook payload fields:
- PAN
- CVV
- raw card number
- security code
- full expiry data when it can identify the card beyond masked/provider-approved display

If blocked fields are received, the webhook should be rejected and compliance/audit metadata should be recorded without storing the blocked payload.
