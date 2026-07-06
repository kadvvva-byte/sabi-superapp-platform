# WALLET-100.57 — Bank/Card/Virtual Issuer real provider handoff

This step prepares the real-provider handoff for the banking layer without enabling live execution.

Scope:
- bank_card_tokenization
- local_bank_gateway
- virtual_card_issuer

Rules:
- Sabi must not store PAN.
- Sabi must not store CVV.
- Card data entry must happen only through a bank/payment provider iFrame or SDK.
- Sabi stores only provider tokens/token IDs, masked metadata, statuses, ledger references and provider references.
- Mobile must not receive API keys, vault refs, admin fields or card-data surfaces.
- Execution remains disabled until real KYC/AML and bank/provider binding are complete.

Required provider materials later:
- sandbox base URL
- SDK/iFrame integration guide
- tokenization callback contract
- provider token format
- webhook signing specification
- virtual issuer API documentation
- settlement/ledger reconciliation shape
- compliance/KYC dependency requirements
