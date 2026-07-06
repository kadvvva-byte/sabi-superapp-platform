# Sabi 238B — Corporate Mail Admin Control Contract

This document is internal only. It must not be displayed on the public homepage.

## Principle

Corporate mail is not verified on the public site. It is controlled from Admin after the real mail provider and domain DNS are approved by Owner.

Public site role:
- show only approved public contact addresses after they are live;
- never show DNS/MX/SPF/DKIM/DMARC technical readiness blocks.

Admin role:
- verify mailbox readiness;
- verify MX/SPF/DKIM/DMARC state;
- run inbound/outbound test status;
- keep audit and evidence;
- show Sabi AI risk notes and daily status to Owner;
- block public use of an address until Owner approves activation.

## Recommended mailboxes

| Mailbox | Purpose | Public after live? | Admin verification required |
|---|---|---:|---:|
| support@sabiai.app | General user support | Yes | Yes |
| legal@sabiai.app | Legal notices and formal requests | Yes | Yes |
| privacy@sabiai.app | Privacy / UK GDPR requests | Yes | Yes |
| security@sabiai.app | Security reports and responsible disclosure | Yes | Yes |
| dmarc@sabiai.app | DMARC aggregate reports | No | Yes |
| admin@sabiai.app | Internal owner/admin communication | No | Yes |

## Admin statuses

- `planned` — mailbox is planned only.
- `provider_selected` — Owner selected the mail provider.
- `mailbox_created` — mailbox exists at provider.
- `dns_pending` — DNS records are prepared but not verified.
- `dns_verified` — MX/SPF/DKIM/DMARC records verified.
- `inbound_test_passed` — external inbound mail test passed.
- `outbound_test_passed` — outbound mail and authentication test passed.
- `dmarc_monitoring_active` — DMARC reporting mailbox receives reports.
- `active` — Owner approved public or internal use.
- `suspended` — disabled due to security/compliance risk.

## Admin access boundary

- Owner: final activation and suspension authority.
- Owner Sabi AI: full monitoring and reporting, report-only, no final execution.
- Security: prepare security mailbox checks and incidents.
- Legal: prepare legal mailbox checks and official request evidence.
- Privacy: prepare UK GDPR/privacy mailbox checks and subject request evidence.
- Support: prepare support mailbox checks and response quality reports.

## Locked until exact Owner approval

- Real DNS changes.
- Real mailbox creation at provider.
- Real provider API use.
- Real sending/receiving tests.
- Real public contact replacement.
- Any .env, secret, DB, Wallet, payment or payout action.
