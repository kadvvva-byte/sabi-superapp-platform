# WALLET-100.38 — Token-only Data Boundaries

Mobile:
- may display provider_not_configured / disabled readiness states
- may request provider SDK/iFrame session from backend
- must never receive API keys, vault refs, admin env fields, PAN/CVV, seed/private keys

Backend:
- holds provider readiness and safe config metadata
- may use env/vault refs for providers
- must not store raw PAN/CVV
- stores only provider tokens and masked metadata/status where allowed

Provider:
- owns card data entry and card-data liability
- returns tokenized references and webhook status
