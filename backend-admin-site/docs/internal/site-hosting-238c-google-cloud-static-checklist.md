# Sabi Site 238C — Static Hosting / Google Cloud Checklist

Internal only. Do not display this on the public site.

## Candidate hosting model
- Static site artifact: `site-ui/`
- Domain: `sabiai.app`
- Optional `www` redirect to root domain.
- HTTPS required before public launch.
- Static assets should be cacheable; HTML should remain easy to refresh during launch.

## Placeholder records / provider targets
Real values must come from the selected hosting provider.

| Area | Placeholder | Status |
|---|---|---|
| Root domain | `<HOSTING_A_OR_CNAME_TARGET>` | placeholder only |
| www | `<HOSTING_WWW_TARGET>` | placeholder only |
| SSL | `<HOSTING_SSL_CERTIFICATE_OR_MANAGED_SSL>` | placeholder only |
| CDN/cache | `<HOSTING_CACHE_POLICY>` | placeholder only |
| rollback | previous stable package `FIX75` | ready |

## Launch gate checklist
- Owner approval recorded.
- Static artifact checksum recorded.
- DNS target confirmed.
- SSL/HTTPS confirmed.
- `www` redirect confirmed if used.
- RU screen checked.
- EN screen checked.
- Legal PDF links checked.
- No Telegram wording.
- No donations/investments ask.
- No internal technical panels on public homepage.
- Admin entry boundary checked.
- Rollback package available.
