# 238F — Google Cloud Staging Candidate

Internal only.

Provider target: Google Cloud.
Mode: staging-only candidate package, no live deploy.
Public site baseline: FIX75.

This stage does not modify `site-ui` and does not modify `admin-ui`.
It does not execute `gcloud`, does not call Google Cloud APIs, does not read `.env`, and does not use secrets.

## Candidate flow
1. Owner confirms Google Cloud project/account outside this package.
2. Staging target is selected under Google Cloud.
3. Static files from `site-ui` are uploaded only after separate Owner approval.
4. Staging smoke checks verify RU page, EN page, legal PDFs, local links, and visual sanity.
5. Real DNS, SSL, corporate mail, Admin auth, provider/API and production launch remain locked.

## Live lock
Real DNS, real SSL, real hosting deploy, real mail activation, real Admin auth, API/provider/secrets, DB/session/token, Wallet/payment/payout/crypto, and public launch require separate exact Owner approval.
