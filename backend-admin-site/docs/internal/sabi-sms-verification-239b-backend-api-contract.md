# Sabi 239B — Backend-only SMS verification API contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

## Backend endpoints
- `POST /api/auth/phone/start`
- `POST /api/auth/phone/verify`
- `POST /api/auth/phone/resend`
- `GET /api/admin/auth/sms/readiness`

## start request
Input: normalized phone number, country code, device risk context, app channel.
Output: verification session id, cooldown, masked phone, safe status.

## verify request
Input: verification session id and one-time code.
Output: verified/not verified status, safe reason code, audit id.

## resend request
Input: verification session id.
Output: cooldown state and safe retry status.

## readiness request
Admin-only read endpoint showing provider readiness, secret readiness, rate-limit readiness, audit readiness, and Owner approval status.

## Prohibited
- No SMS provider call from mobile.
- No SMS provider key in mobile.
- No raw code stored in logs.
- No live SMS without Owner approval.
- No DB/session/token write in 239B.
