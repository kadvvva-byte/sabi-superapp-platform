# WALLET-100.56 — AML webhook handoff shape

Expected future webhook categories:

- aml_screening.created
- aml_screening.pending
- aml_screening.clear
- aml_screening.review_required
- aml_screening.restricted
- aml_screening.failed

No provider webhook may include card PAN, CVV, crypto private keys, or seed phrases.
Provider secrets must be verified on backend only.
