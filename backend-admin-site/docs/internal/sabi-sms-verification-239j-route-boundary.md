# 239J route boundary

Internal only. No live deploy. No SMS provider call. No SMS sent. No Firebase API call. No secrets.

Mobile never calls the SMS provider directly. Provider credentials stay backend-only. Secret Manager is the future storage boundary.

The candidate route registry keeps route metadata only:
- method
- path
- purpose
- enabled flag
- safe-disabled reason
- audit marker

No runtime router is modified. No Nest/Express/Fastify app object is imported. No route is mounted into a live server.

Future route mount must wait for Owner final authority and separate explicit approval.
