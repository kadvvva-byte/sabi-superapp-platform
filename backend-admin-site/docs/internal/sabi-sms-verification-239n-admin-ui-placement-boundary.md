# 239N Admin UI Placement Boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

This package does not write into admin-ui and does not mount any Admin UI runtime component. It prepares a backend-owned visual placement contract that later Admin UI work may consume after a separate Owner approval.

Required before any real Admin UI runtime mount:
- <OWNER_APPROVAL_REFERENCE>
- verified backend readiness endpoint
- verified role boundary for Owner / Owner Sabi AI / security admin
- no raw phone numbers in visual audit rows
- all visible language copy reviewed for RU / EN / ZH / UZ when the real Admin screen is implemented

Owner final authority. Sabi AI report-only. AI self-repair candidate only.

## 239N-FIX1 backend-only SMS readiness boundary
- Internal only.
- No live deploy.
- No SMS provider call.
- No SMS sent.
- No Firebase API call.
- No secrets.
- Firebase Phone Auth.
- Provider selected for validation only.
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Secret Manager.
- GET /api/admin/auth/sms/readiness.
- POST /api/auth/phone/start.
- POST /api/auth/phone/verify.
- POST /api/auth/phone/resend.
- Per-phone cooldown.
- Per-device limit.
- Per-IP limit.
- Per-country risk threshold.
- Max resend count.
- No enumeration.
- Sabi AI report-only.
- Owner final authority.
- AI self-repair candidate only.
- startAttempt.
- verifyAttempt.
- resendAttempt.
- maskedPhoneLogs.
- <SMS_VERIFY_SERVICE_ID>.
- <SMS_SENDER_ID>.
- <SMS_WEBHOOK_SECRET>.
- <OWNER_APPROVAL_REFERENCE>.
- <FIREBASE_PROJECT_ID>.
- <FIREBASE_APP_ID>.
- <FIREBASE_AUTH_DOMAIN>.
- <FIREBASE_API_KEY_REFERENCE>.
- disabled_by_default.
- adminSmsReadinessPanelVisualPlacementPlan239N.
- adminSmsReadinessPanelPlacementCandidate239N.
- visual_plan_only_no_admin_runtime_mount.
- contract_only_no_admin_runtime_mount.
- contract_only_no_runtime_mount.
- adminSmsReadinessPanelLanguageContract239N.
- SMS readiness.
- Owner approval required.
- Sabi Messenger only.

## 239N-FIX2 backend-only SMS readiness boundary
- Internal only.
- No live deploy.
- No SMS provider call.
- No SMS sent.
- No Firebase API call.
- No secrets.
- Firebase Phone Auth.
- Provider selected for validation only.
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Secret Manager.
- GET /api/admin/auth/sms/readiness.
- POST /api/auth/phone/start.
- POST /api/auth/phone/verify.
- POST /api/auth/phone/resend.
- Per-phone cooldown.
- Per-device limit.
- Per-IP limit.
- Per-country risk threshold.
- Max resend count.
- No enumeration.
- Sabi AI report-only.
- Owner final authority.
- AI self-repair candidate only.
- startAttempt.
- verifyAttempt.
- resendAttempt.
- maskedPhoneLogs.
- <SMS_VERIFY_SERVICE_ID>.
- <SMS_SENDER_ID>.
- <SMS_WEBHOOK_SECRET>.
- <OWNER_APPROVAL_REFERENCE>.
- <FIREBASE_PROJECT_ID>.
- <FIREBASE_APP_ID>.
- <FIREBASE_AUTH_DOMAIN>.
- <FIREBASE_API_KEY_REFERENCE>.
- disabled_by_default.
- adminSmsReadinessPanelVisualPlacementPlan239N.
- adminSmsReadinessPanelPlacementCandidate239N.
- visual_plan_only_no_admin_runtime_mount.
- contract_only_no_admin_runtime_mount.
- contract_only_no_runtime_mount.
- adminSmsReadinessPanelLanguageContract239N.
- SMS readiness.
- Owner approval required.
- Sabi Messenger only.

