# Sabi Site 238B — Corporate Mail Admin Readiness Handoff

Stage: 238B
Scope: corporate mail readiness, Admin verification contract, no live mail connection.

## Confirmed architecture

Corporate mail verification belongs in Admin, not on the public site.

The public site may later show only approved contact addresses after Owner approval and live mail checks. DNS/MX/SPF/DKIM/DMARC status must stay internal.

## Current state

- Domain: `sabiai.app`
- Mail provider: not selected in this package.
- Real mailboxes: not created by this package.
- Real DNS: not changed by this package.
- Admin UI: not modified by this package.
- Public site FIX75: not modified by this package.

## Next step after 238B

238C should prepare hosting / Google Cloud / static deployment preflight, still without modifying the stable public site.
