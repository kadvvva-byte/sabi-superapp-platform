# WALLET-100.46 — AML webhook contract draft

AML provider webhook events must be treated as risk signals for admin/compliance review and must not directly confiscate funds.

Minimum event fields:

- providerId
- providerReference
- subjectUserId
- walletId, when applicable
- transactionId or ledgerReference, when applicable
- screeningStatus: pending | clear | review_required | restricted | rejected
- riskScore, when provided by provider
- reasonCode, when provided by provider
- providerTimestamp
- signature/header verification metadata

Sensitive rules:

- Do not send PAN/CVV through Sabi backend.
- Do not expose provider secrets to mobile.
- Do not make fake clear/block decisions.
- Serious AML risk may trigger safe hold/restricted state for review.
