# Sabi SMS Verification 239D — Provider Choice Gate

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Purpose: prepare the Owner decision gate for choosing the SMS verification provider before any live integration.

Provider candidates:
- Firebase Phone Auth
- Twilio Verify
- Other Owner-approved SMS verification provider

Decision status: provider not selected in this stage.

Required Owner choice before 239E:
- <SMS_PROVIDER>
- <SMS_PROVIDER_DECISION_REASON>
- <OWNER_APPROVAL_REFERENCE>

Rules:
- Mobile never calls the SMS provider directly.
- Provider credentials stay backend-only.
- Provider secrets must be placed only in Secret Manager during a future approved stage.
- No live auth activation in this stage.
- Sabi AI report-only.
- Owner final authority.
- AI self-repair candidate only.

The final provider selection must be recorded by Owner approval. This stage only validates that the decision gate and safety boundaries exist.
