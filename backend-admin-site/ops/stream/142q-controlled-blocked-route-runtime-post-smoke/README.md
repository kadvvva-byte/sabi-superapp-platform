# BACKEND-STREAM-FOUNDATION-142Q

Controlled blocked-route runtime POST smoke only.

This package sends POST requests only to these local backend routes:
- `/api/stream/live/start`
- `/api/stream/live/stop`
- `/api/stream/live/heartbeat`

Expected for each route:
- HTTP `423`
- blocked/source-only response
- no fake success markers

It does not restart backend, does not write source files, and does not call DB/provider/Wallet/payment/payout/money flows.

Default backend:
- `http://127.0.0.1:4001`

Run:

```powershell
cd C:\Users\User\Desktop\superapp

Expand-Archive -Force "$env:USERPROFILE\Downloads\backend-stream-foundation-142q-controlled-blocked-route-runtime-post-smoke-ops-only-package.zip" -DestinationPath .

powershell -ExecutionPolicy Bypass -File .\ops\stream\142q-controlled-blocked-route-runtime-post-smoke\run-stream-foundation-142q-controlled-blocked-route-runtime-post-smoke.ps1 -BaseUrl "http://127.0.0.1:4001" -RunTsc -WriteReport
```

Expected:
- `ok: true`
- `status: controlled_blocked_route_runtime_post_smoke_passed`
- `smoke.passedRoutes: 3`
- all `actualStatusCode: 423`
- `runtimePostPerformedBy142Q: 3`
- DB/provider/Wallet/payment/payout/money all remain zero.
