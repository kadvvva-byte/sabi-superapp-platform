# 238H — Owner approval form template for future staging

Internal only. Template only. Do not paste real secrets here.

## Staging approval draft
- Approval reference: `<OWNER_APPROVAL_REFERENCE>`
- Google Cloud project ID: `<GOOGLE_CLOUD_PROJECT_ID>`
- Google Cloud region: `<GOOGLE_CLOUD_REGION>`
- Staging bucket or hosting target: `<STAGING_BUCKET_OR_HOSTING_TARGET>`
- Staging URL: `<STAGING_URL>`
- Source baseline: FIX75
- Allowed scope: staging-only static deploy after separate Owner approval
- Disallowed scope: production domain, DNS change, SSL binding, corporate mail, live auth, provider/API/secrets, DB/session/token, Wallet/payment/payout/crypto, public launch announcement

## Required Owner wording for a future staging-only deploy
`I approve Google Cloud staging-only static deploy for Sabi public site FIX75 with project <GOOGLE_CLOUD_PROJECT_ID>, region <GOOGLE_CLOUD_REGION>, target <STAGING_BUCKET_OR_HOSTING_TARGET>, staging URL <STAGING_URL>. No production DNS, no SSL live binding, no corporate mail activation, no Admin auth activation, no provider/API/secrets, no DB, no Wallet, no payment, no payout, no crypto, no public launch.`

## Sabi AI role
Sabi AI may validate files, compare hashes, run staging smoke checks, and report risks to Owner. Sabi AI must not make final activation decisions.
