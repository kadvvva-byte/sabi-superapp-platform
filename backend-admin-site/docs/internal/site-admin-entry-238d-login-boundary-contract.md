# Sabi Site 238D — Admin Entry Protection / Login Boundary Contract

INTERNAL ONLY — not public website content.

## Scope
238D defines the Admin entry and future login/access boundary for Sabi SuperApp. It is a preflight-only control package.

## Admin entry boundary
The public site may contain only a small Admin entry link. The public site must not display internal DNS, mail, Cloud, provider, release, wallet, payment, payout, or production gate details.

Admin verification and operational control must live inside Admin UI and backend stages, not public homepage blocks.

## Owner final authority
Owner final authority is required for all live activation decisions, including real Admin login, real role creation, provider connection, mailbox activation, DNS changes, hosting deployment, SSL binding, Wallet/payment/payout activation, and public launch announcements.

## Sabi AI governance
Owner Sabi AI is directly below Owner. Sabi AI report-only mode is mandatory at this stage: it monitors, detects risks, prepares reports, and escalates issues to Owner. It does not execute final actions independently.

## No live auth in 238D
No live auth is enabled in 238D. There are no secrets, no .env reads, no auth provider calls, no DB/session/token writes, no user creation, and no production login activation.

## Future Admin login controls
Future live Admin login must include:
- Owner account separation
- function-scoped staff roles
- least privilege access
- MFA policy
- session timeout policy
- audit logging
- login anomaly detection
- Sabi AI daily risk summary
- urgent Owner alert for suspected compromise

## Locked until Owner approval
The following are locked:
- real auth provider connection
- real Admin login activation
- real user/role creation
- .env/secrets/API usage
- DB/session/token writes
- production Admin access
