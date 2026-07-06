# 239N Panel Copy and Language Contract

Internal only. No live deploy.

The future Admin SMS readiness panel must not mix languages. Russian UI must not contain English service words. English UI must not contain Russian/Chinese/Uzbek text. Chinese and Uzbek copy must be reviewed before real Admin runtime mount.

Visible labels planned for the panel:
- SMS readiness
- Provider validation
- Firebase exact values
- Route mount
- Admin mount
- Live auth
- Masked audit
- Owner approval required

No Telegram. Use Sabi Messenger for official communication wording.

Sabi does not accept donations or investments; this rule is public wording safe and is not a fundraising request.

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

