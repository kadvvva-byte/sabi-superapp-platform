# BACKEND-STREAM-FOUNDATION-140K-FIX1

Protected-admin aware runtime HTTP smoke runner.

This package does not modify backend source. It only adds an ops runner that:
- uses GET only,
- checks /health on the selected BaseUrl,
- accepts health.modules.streamFoundation string marker,
- treats /api/admin/stream/foundation/diagnostics/* returning 401/403 without AdminToken as expected protection,
- optionally supports authenticated read-only GET with -AdminToken.

Safety:
- no backend restart,
- no DB write,
- no provider call,
- no Wallet mutation,
- no payment authorization,
- no monthly payout,
- no money movement,
- no fake success.
