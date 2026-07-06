# 239E Firebase validation choice

Internal only. No live deploy. No SMS provider call. No SMS sent. No secrets.

Selected validation candidate: Firebase Phone Auth.

Reason:
- aligns with Google Cloud direction;
- supports backend-only verification boundary;
- future secrets are mapped only to Secret Manager;
- mobile never calls the SMS provider directly;
- provider credentials stay backend-only;
- admin readiness remains report-only until explicit Owner approval.

Not done in 239E:
- no Firebase project call;
- no Firebase SDK activation;
- no phone auth enablement;
- no SMS sending;
- no DB/session/token writes.
