# BACKEND-STREAM-FOUNDATION-140K — controlled runtime HTTP smoke only

This package performs read-only HTTP GET checks against an already-running backend.

It does not restart the backend and it does not perform DB writes, provider calls, Wallet mutation, payment authorization, monthly payout, money movement, raw secret output, or fake success.

Targets:

- `GET /health`
- `GET /api/admin/stream/foundation/diagnostics/readiness`
- `GET /api/admin/stream/foundation/diagnostics/preview`

PowerShell:

```powershell
cd C:\Users\User\Desktop\superapp
powershell -ExecutionPolicy Bypass -File .\ops\stream\140k-runtime-http-smoke\run-stream-foundation-140k-runtime-http-smoke.ps1 -BaseUrl http://127.0.0.1:3000 -WriteReport
```

If the backend is not already running from the 140H-patched source, this smoke can return 404/connection errors. Do not restart the backend without the next explicit approval.
