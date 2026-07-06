# Sabi 238A Internal DNS / Mail / Hosting Checklist

## Domain

Target domain: `sabiai.app`

Do not publish records until Owner gives exact approval and hosting/mail providers are chosen.

## Hosting draft records

| Type | Host | Value | Status |
|---|---|---|---|
| A/AAAA/CNAME | @ | `<HOSTING_PROVIDER_TARGET>` | placeholder only |
| CNAME | www | `<HOSTING_PROVIDER_TARGET>` | placeholder only |
| Redirect | www | `https://sabiai.app` | optional after hosting decision |

## Corporate mail draft records

| Type | Host | Value | Status |
|---|---|---|---|
| MX | @ | `<MAIL_PROVIDER_MX_RECORDS>` | placeholder only |
| TXT | @ | `v=spf1 include:<MAIL_PROVIDER_SPF> -all` | placeholder only |
| TXT/CNAME | `<selector>._domainkey` | `<MAIL_PROVIDER_DKIM_VALUE>` | placeholder only |
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; adkim=s; aspf=s` | draft only; publish after mailbox exists |

## Recommended mailboxes

- support@sabiai.app
- legal@sabiai.app
- privacy@sabiai.app
- security@sabiai.app
- dmarc@sabiai.app
- admin@sabiai.app

## Public site rule

Do not put this checklist on the public site. It belongs only in internal docs/Admin readiness.
