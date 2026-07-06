# 238F — Google Cloud Staging Smoke Checklist

Internal only. Staging-only. No live deploy.

After a separately approved staging upload, verify:

1. RU homepage opens and keeps Russian content.
2. EN page opens and contains English content with no Cyrillic.
3. RU/EN switch works.
4. CSS loads and layout is not broken.
5. `app.js` and `app-en.js` load without console syntax errors.
6. Legal PDFs open from `/legal/`.
7. No Telegram wording appears.
8. No public donations/investments solicitation appears.
9. No internal DNS/MX/SPF/DKIM/DMARC/Google Cloud/Auth readiness panels appear on public pages.
10. Admin entry remains small and not promoted as a public CTA.
11. Rollback to FIX75 remains available.

Do not bind real domain, SSL, mail, auth, provider/API, DB, Wallet, payment, payout, or crypto during this stage.
