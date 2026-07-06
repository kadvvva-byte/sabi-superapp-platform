# Sabi SuperApp Platform

Unified source of truth for Sabi SuperApp.

## Structure

- backend-admin-site/ — backend, Admin UI, public site, Sabi AI server foundation, Taxi/Stream/Admin backend contracts.
- mobile/ — Sabi SuperApp mobile UI, Taxi mobile, Stream mobile, Wallet mobile, AI mobile, Messenger, QR, marketplace modules.
- launch/ — launch readiness notes and production preparation.
- docs/ — architecture and handoff documentation.

## Owner Rules

- Backend/Admin/public site and mobile are kept in one monorepo but remain separated by folder.
- No secrets, private keys, .env files, node_modules, generated reports, uploads, or backup archives are committed.
- Real money, provider execution, payout, SMS, and payment actions remain locked until explicit Owner approval.
