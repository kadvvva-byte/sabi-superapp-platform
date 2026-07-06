# WALLET-100.49 — AML sandbox env safe-disabled

This step prepares the AML provider environment skeleton while keeping the provider disabled.

Rules:
- No fake AML clear/block decision.
- No live AML execution.
- AML remains disabled until a real provider contract, sandbox URL, vault references, webhook secret, and backend adapter binding are connected.
- Mobile must not receive admin/vault/env secret fields.

Expected status before real provider binding:
- `amlEnvSkeletonReady=True`
- `liveAmlReady=False`
- `safeDisabled=True`
