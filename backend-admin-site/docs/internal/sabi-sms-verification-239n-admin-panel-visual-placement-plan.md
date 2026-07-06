# Sabi SMS Verification 239N - Admin Panel Visual Placement Plan

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets. Firebase Phone Auth. Provider selected for validation only.

This stage defines an Admin SMS readiness panel visual placement plan only. It does not mount any Admin UI screen, does not attach a backend route at runtime, and does not enable live authentication.

Visual placement target: Security / Authentication / SMS readiness.

Panel identity markers:
- adminSmsReadinessPanelVisualPlacementPlan239N
- adminSmsReadinessPanelPlacementCandidate239N
- visual_plan_only_no_admin_runtime_mount
- contract_only_no_admin_runtime_mount
- contract_only_no_runtime_mount
- disabled_by_default

Panel status cards:
- Provider validation candidate
- Exact Firebase values status
- Real Firebase provider connection status
- Real SMS provider connection status
- Real SMS sent status
- Route runtime mount status
- Admin runtime mount status
- Live auth enabled status

Readiness endpoint reference: GET /api/admin/auth/sms/readiness.

Audit rows remain masked only: startAttempt, verifyAttempt, resendAttempt, maskedPhoneLogs.

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

