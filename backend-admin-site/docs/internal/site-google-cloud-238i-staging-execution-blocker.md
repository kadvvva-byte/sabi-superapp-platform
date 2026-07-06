# Sabi Site 238I — Staging execution blocker

Internal only.

238I must block future execution until all conditions are true:

1. Owner provides exact Google Cloud project ID.
2. Owner provides exact Google Cloud region.
3. Owner provides exact staging bucket or hosting target.
4. Owner provides exact staging URL.
5. Owner provides exact approval reference.
6. The site hash still matches FIX75 stable baseline.
7. Prior chain remains passed: 238A → 238H.
8. No active gcloud command lines exist in internal docs.
9. No secret values exist in internal docs.
10. Production DNS, SSL, mail, Admin auth and public launch remain locked.

Sabi AI role: report-only verification and risk summary. Owner final authority remains required for any live/staging action.
