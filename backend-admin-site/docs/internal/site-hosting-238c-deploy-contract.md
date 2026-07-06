# Sabi Site 238C — Hosting / Google Cloud / Static Deploy Contract

Internal only. This document is not public site content.

## Purpose
Prepare the public site for safe static hosting and domain binding without changing the current FIX75 public site files.

## Scope
- Validate local static deploy folder integrity.
- Prepare hosting and rollback checklist.
- Prepare domain/SSL/static asset readiness checklist.
- Prepare Admin/Owner activation boundary.

## Out of scope in 238C
- No real hosting deployment.
- No real DNS changes.
- No real SSL certificate binding.
- No provider/API calls.
- No .env or secret usage.
- No public site content changes.
- No Admin UI changes.
- No DB, Wallet, payment, payout, crypto provider, or runtime changes.

## Admin / Owner boundary
Hosting status must later be surfaced in Admin as an internal operational status, not on the public homepage.

Owner final approval is required before:
- live DNS changes;
- production hosting deployment;
- SSL binding;
- public contact activation;
- public launch announcement.

Owner Sabi AI can prepare reports and detect risks, but must not perform final activation independently.
