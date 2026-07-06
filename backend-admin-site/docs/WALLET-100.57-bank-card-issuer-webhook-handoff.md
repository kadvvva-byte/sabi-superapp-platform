# WALLET-100.57 — Bank/Card/Issuer webhook handoff

Required webhook families:

1. Card tokenization webhook
- token_created
- token_verified
- token_failed
- token_revoked

2. Bank gateway webhook
- transfer_pending
- transfer_confirmed
- transfer_failed
- transfer_reversed

3. Virtual card issuer webhook
- card_issue_pending
- card_issue_approved
- card_issue_failed
- card_status_changed
- card_suspended

Webhook payload must not include raw PAN or CVV. It may include:
- provider reference
- provider token ID
- masked card metadata where allowed
- status
- risk/compliance decision references
- ledger references
