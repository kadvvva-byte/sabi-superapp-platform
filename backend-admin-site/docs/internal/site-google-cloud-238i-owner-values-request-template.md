# Sabi Site 238I — Owner values request template

Internal only. Fill this only when Owner decides to prepare staging execution preflight.

## Required values

```text
GOOGLE_CLOUD_PROJECT_ID=<GOOGLE_CLOUD_PROJECT_ID>
GOOGLE_CLOUD_REGION=<GOOGLE_CLOUD_REGION>
STAGING_BUCKET_OR_HOSTING_TARGET=<STAGING_BUCKET_OR_HOSTING_TARGET>
STAGING_URL=<STAGING_URL>
OWNER_APPROVAL_REFERENCE=<OWNER_APPROVAL_REFERENCE>
```

## Required approval wording for a future stage

```text
I approve Sabi public site Google Cloud staging execution preflight with the exact project, region, staging target and staging URL I provided. Staging only. No production DNS. No production SSL. No corporate mail activation. No Admin auth activation. No provider/API/secrets/DB/Wallet/payment/payout/crypto connection. No public launch.
```

## Important
Do not place secrets, service account keys, OAuth tokens, private keys, recovery phrases, database URLs or provider credentials in this file.
