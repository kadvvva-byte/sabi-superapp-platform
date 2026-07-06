# Sabi 239B — SMS provider selection and backend verification contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No gcloud run. No Google Cloud API call. No secrets.

## Purpose
239B fixes the safe contract for mobile phone confirmation before any real provider connection.

## Allowed provider candidates
- Firebase Phone Auth
- Twilio Verify
- Other Owner-approved SMS verification provider

## Required Owner values before live SMS
- `<SMS_PROVIDER>`
- `<SMS_VERIFY_SERVICE_ID>`
- `<SMS_SENDER_ID>`
- `<SMS_WEBHOOK_SECRET>`
- `<OWNER_APPROVAL_REFERENCE>`

## Boundary
Mobile never calls the SMS provider directly. Provider credentials stay backend-only and must later be stored in Secret Manager. Mobile receives only safe session status and masked phone status.

## Current state
Provider selection is planned only. No provider is connected. No SMS is sent.
