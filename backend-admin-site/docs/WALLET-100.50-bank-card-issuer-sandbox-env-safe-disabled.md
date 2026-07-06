# WALLET-100.50 — Bank/Card/Virtual Issuer sandbox env safe-disabled

This step prepares sandbox environment structure for the bank/card/virtual issuer layer while keeping all execution disabled.

It does not tokenize cards, issue cards, move money, or simulate a provider. It only makes the future provider binding shape explicit and verifies that execution remains closed until real bank/provider credentials, webhook secrets, and adapters are connected.

## Providers covered

- `bank_card_tokenization`
- `local_bank_gateway`
- `virtual_card_issuer`

## Safety rules

- Sabi does not store PAN.
- Sabi does not store CVV.
- Sabi does not accept card-data liability.
- Mobile receives no API keys, vault refs, admin env names, or card secrets.
- Execution flags remain `false`.
- Provider status remains not live-ready until real providers are connected.
