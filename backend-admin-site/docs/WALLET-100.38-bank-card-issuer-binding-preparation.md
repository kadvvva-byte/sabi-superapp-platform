# WALLET-100.38 — Bank/Card/Virtual Issuer Binding Preparation

Goal: prepare real provider binding boundaries for local bank gateway, bank card tokenization, and virtual card issuer.

This is not a fake integration. It must not create card tokens locally and must not issue virtual cards without a real bank/issuer provider.

Required provider priorities:
1. bank_card_tokenization
2. local_bank_gateway
3. virtual_card_issuer

Hard rules:
- Sabi does not store PAN.
- Sabi does not store CVV.
- Card entry must happen inside provider SDK/iFrame/web flow.
- Sabi stores only provider token ID, masked metadata if allowed, provider status, provider reference, and ledger reference.
- Virtual card issuance must remain provider_not_configured until a real issuer provider is connected.
- Execution must remain disabled until provider status is ready and backend execution flag plus real adapter binding are enabled.
