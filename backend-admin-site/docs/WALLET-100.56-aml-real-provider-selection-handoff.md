# WALLET-100.56 — AML real provider selection handoff

This step prepares the AML provider handoff without enabling real AML execution.

## Rules

- No fake AML clear/block.
- No live AML execution before KYC real provider binding.
- AML must remain blocked while KYC is not live.
- Mobile must not receive admin/env/vault fields.
- Raw provider secrets must not be stored in the repository or mobile app.

## Required provider inputs later

- Provider legal/compliance documentation.
- Sandbox base URL.
- Vault references for API key and webhook secret.
- Webhook delivery format and signature verification method.
- Decision statuses and retry policy.
- Audit/report retention requirements.
