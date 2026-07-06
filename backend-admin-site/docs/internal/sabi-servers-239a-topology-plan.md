# Sabi Servers 239A — Ideal Server Topology Plan

Internal only. No live deploy. No gcloud run. No Google Cloud API call. No SMS provider call. No SMS sent.

## Goal
Create the correct production topology so Stream works perfectly, Taxi works perfectly, Sabi AI works as the central control intelligence, and finance/legal/evidence areas stay isolated.

## Cloud Run service topology
Public, Admin, Core API, Stream, Taxi, Wallet Finance, AI, Compliance, Security Logs, and SMS Auth are separate service groups.

### Public group
- public-site-static-edge
- public-assets
- legal-docs

### Admin group
- admin-ui
- admin-api
- admin-auth-boundary
- admin-audit-viewer

### Core group
- api-gateway
- auth-access
- users-profile
- messenger
- notification-mail

### Stream isolated service group
- stream-core
- stream-room
- stream-chat
- stream-media
- stream-moderation
- stream-gift-visual
- stream-gift-ledger
- stream-creator-payout-boundary

Stream failure must not stop Taxi. Stream media and gift ledger must not have direct Wallet write access.

### Taxi isolated service group
- taxi-rider
- taxi-driver
- taxi-dispatch
- taxi-trip-lifecycle
- taxi-tariff
- taxi-complaint
- taxi-agent-finance
- taxi-lost-property

Taxi failure must not stop Stream. Taxi dispatch must stay fast and must not wait for finance reports or long AI review paths.

### Wallet finance isolated service group
- wallet-ledger
- agent-balance
- payment-provider-bridge
- payout-provider-bridge
- accounting-control
- finance-report

No ordinary Taxi or Stream service can write directly to Wallet ledger.

### Sabi AI group
- sabi-ai-orchestrator
- sabi-ai-translation
- sabi-ai-risk
- sabi-ai-accounting
- sabi-ai-legal
- sabi-ai-psychology
- sabi-ai-code-repair
- sabi-ai-owner-report

Owner final authority. Sabi AI report-only for final legal, finance, blocking, payout, production deploy, and law-enforcement actions.

### Compliance group
- aml-fraud-detection
- legal-case
- evidence-vault
- law-enforcement-report-prep

Evidence and legal data must stay private and audit controlled.

## AI self-repair candidate only
AI can detect errors, prepare patch candidates, run safe tests, and report to Owner. AI cannot silently push production deploy, change secrets, change payment, change payout, or remove evidence.

## Readiness
Architecture planning target: 100%.
Real Google Cloud deploy: 0%.
Real SMS provider connected: 0%.
Production launch: 0%.
