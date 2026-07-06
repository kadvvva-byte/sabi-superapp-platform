# Sabi 238B — Corporate Mail DNS Record Template

Target domain: `sabiai.app`

Do not publish these records until Owner chooses a mail provider and gives exact approval.

| Type | Host / Name | Value | Status |
|---|---|---|---|
| MX | @ | `<MAIL_PROVIDER_MX_RECORDS>` | placeholder only |
| TXT | @ | `v=spf1 include:<MAIL_PROVIDER_SPF> -all` | placeholder only |
| TXT/CNAME | `<DKIM_SELECTOR>._domainkey` | `<MAIL_PROVIDER_DKIM_VALUE>` | placeholder only |
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:dmarc@sabiai.app; adkim=s; aspf=s` | draft only; publish after mailbox exists |

## DMARC rollout policy

1. Start with `p=none` while monitoring reports.
2. Move to `p=quarantine` only after legitimate mail passes SPF/DKIM alignment.
3. Move to `p=reject` only after Owner approval and stable reporting.

## Notes

- `dmarc@sabiai.app` must exist before publishing DMARC `rua`.
- SPF must not include too many DNS lookups.
- DKIM selector/value must come from the chosen mail provider.
- This file is internal only and must not be placed on the public homepage.
