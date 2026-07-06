# WALLET-100.46 — AML provider sandbox activation readiness

This step prepares AML provider sandbox activation readiness without enabling live AML execution.

Rules:

- Do not fake AML clear/block decisions.
- Do not enable AML execution without a real provider binding.
- AML must remain after KYC in the activation order.
- Mobile responses must not expose admin, vault, env, API key, or secret surfaces.
- Sabi must not store PAN/CVV or crypto seed/private key material.

Expected current state before real provider integration:

- `activationReadinessPassed=True`
- `liveAmlReady=False`
- `blockedUntilKycSandbox=True`
- `nextProviderToActivate=kyc_provider`

This is correct because KYC must be activated before AML can become the next live sandbox provider.
