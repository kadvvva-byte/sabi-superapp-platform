# 238F — Google Cloud Static Upload Manifest

Internal only. Staging-only. No live deploy.

Upload candidate files after separate Owner approval:

- `site-ui/index.html`
- `site-ui/index-en.html`
- `site-ui/index-en-fix75.html`
- `site-ui/styles.css`
- `site-ui/app.js`
- `site-ui/app-en.js`
- `site-ui/legal/sabi-terms-of-service-en.pdf`
- `site-ui/legal/sabi-terms-of-service-ru.pdf`
- `site-ui/legal/sabi-privacy-policy-uk-gdpr-en.pdf`
- `site-ui/legal/sabi-privacy-policy-uk-gdpr-ru.pdf`
- `site-ui/legal/sabi-crypto-wallet-external-provider-policy-en.pdf`
- `site-ui/legal/sabi-crypto-wallet-external-provider-policy-ru.pdf`

Rollback package: FIX75.

Do not upload internal docs, `.data`, tools, reports, source backups, Prisma files, Admin UI, backend source, `.env`, or secrets.
