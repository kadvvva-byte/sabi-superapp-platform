# Sabi Site 238G — Google Cloud staging dry-run command pack

Internal only. This document prepares command templates for a future staging deployment to Google Cloud.
It is not a live deployment instruction and must not be pasted into a terminal until Owner gives a separate staging-only approval.

## Mode
- Dry-run / command template only.
- No Google Cloud API call.
- No `gcloud` command is executed by this package.
- No DNS, SSL, mail, auth, provider, `.env`, DB, Wallet, payment, payout, or crypto connection is enabled.
- FIX75 remains the rollback baseline.

## Required placeholders before any real staging approval
- `<GOOGLE_CLOUD_PROJECT_ID>`
- `<GOOGLE_CLOUD_REGION>`
- `<STAGING_BUCKET_OR_HOSTING_TARGET>`
- `<STAGING_URL>`
- `<OWNER_APPROVAL_REFERENCE>`

## Candidate deployment target
Primary candidate: Google Cloud static staging target controlled by Owner.
The exact implementation can be Cloud Storage static staging, Firebase Hosting under Google Cloud, or another Google Cloud static delivery target selected later.

## Staging smoke after future approval
1. Open staging RU page.
2. Open staging EN page.
3. Verify EN page has no Cyrillic.
4. Verify legal PDF links.
5. Verify no internal DNS/MX/DKIM/DMARC/Google Cloud technical panels are visible on public pages.
6. Verify no donation/investment solicitation.
7. Keep FIX75 rollback package ready.

## Locked until separate Owner approval
- Real Google Cloud project/API calls.
- Real `gcloud` execution.
- Real hosting deployment.
- Real DNS changes.
- Real SSL binding.
- Real corporate mail activation.
- Real Admin auth activation.
- Any `.env`, secrets, API, provider, DB, session, token, Wallet, payment, payout, or crypto connection.
