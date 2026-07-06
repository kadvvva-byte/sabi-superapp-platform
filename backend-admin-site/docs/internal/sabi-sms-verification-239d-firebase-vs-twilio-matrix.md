# Sabi SMS Verification 239D — Firebase vs Twilio Decision Matrix

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Firebase Phone Auth candidate:
- Good for Firebase-centric authentication flows.
- Useful when mobile identity is tightly coupled with Firebase Auth.
- Must still be isolated from mobile provider secrets.
- Backend/Admin must keep readiness, audit, anti-abuse, and Owner controls.

Twilio Verify candidate:
- Good for dedicated verification workflows and multi-channel verification expansion.
- Useful when SMS verification should remain provider-agnostic and backend-controlled.
- Must keep service SID / credentials backend-only in Secret Manager.
- Backend/Admin must keep readiness, audit, anti-abuse, and Owner controls.

Required common controls for both:
- Per-phone cooldown
- Per-device limit
- Per-IP limit
- Per-country risk threshold
- Max resend count
- No enumeration
- Masked phone logs
- Sabi AI report-only
- Owner final authority
- AI self-repair candidate only

No provider is selected by this file. Owner must choose in a later values stage.
