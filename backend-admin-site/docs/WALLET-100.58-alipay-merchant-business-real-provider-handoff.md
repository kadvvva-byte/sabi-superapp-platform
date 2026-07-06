# WALLET-100.58 — Alipay+ / Merchant / Business real provider handoff

This step prepares the handoff for real Alipay+, merchant acquiring, and business payout provider binding.

It does not enable payment execution. It does not create fake payment success. It does not create fake merchant settlement or business payout.

## Required real-provider inputs

- Alipay+ acquiring sandbox contract and merchant credentials.
- Merchant acquiring sandbox account and settlement rules.
- Business payout sandbox provider and payout constraints.
- Webhook URLs and webhook signing rules.
- Vault references for provider API credentials and webhook verification secrets.
- Compliance constraints for KYC/KYB/AML before merchant/business operations.

## Sabi policy

- Mobile never receives API keys, vault references, raw webhook secrets, or provider credentials.
- Sabi does not store PAN/CVV.
- Payment execution remains blocked until KYC/AML, bank/card tokenization, local bank gateway, and provider adapters are truly bound.
