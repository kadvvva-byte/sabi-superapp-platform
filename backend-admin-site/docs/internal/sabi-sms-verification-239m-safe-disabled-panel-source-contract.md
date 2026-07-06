# 239M safe-disabled panel source contract

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Panel contract markers required in source:
- adminSmsReadinessPanelContractCandidate239L
- backendSmsReadinessPanelContract239L
- disabled_by_default
- contract_only_no_admin_runtime_mount
- contract_only_no_runtime_mount

Provider status is Firebase Phone Auth and Provider selected for validation only. Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager is the planned boundary.

Abuse controls remain: Per-phone cooldown, Per-device limit, Per-IP limit, Per-country risk threshold, Max resend count, No enumeration.

Governance remains: Sabi AI report-only, Owner final authority, AI self-repair candidate only.
