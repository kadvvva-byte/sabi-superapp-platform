# BACKEND-STREAM-FOUNDATION-140O

Controlled authenticated admin GET smoke runner package.

Scope:
- Ops runner only.
- No backend source mutation.
- No backend restart.
- No DB write.
- No provider call.
- No Wallet mutation.
- No payment authorization.
- No monthly payout.
- No money movement.
- No fake success.

Token handling:
- Token must be supplied only at runtime.
- Do not paste token into source files, audit files, reports, screenshots, or chat.
- Prefer a process-scoped environment variable, then pass only the env var name to the runner.
- Report stores only booleans and redacted output.

Example with env var:
```powershell
$env:SABI_ADMIN_TOKEN = Read-Host "Paste admin token"
powershell -ExecutionPolicy Bypass -File .\ops\stream\140o-authenticated-admin-get-smoke\run-stream-foundation-140o-authenticated-admin-get-smoke.ps1 -BaseUrl http://127.0.0.1:4001 -AdminTokenEnvName SABI_ADMIN_TOKEN -WriteReport
Remove-Item Env:\SABI_ADMIN_TOKEN
```

Alternative direct runtime input:
```powershell
powershell -ExecutionPolicy Bypass -File .\ops\stream\140o-authenticated-admin-get-smoke\run-stream-foundation-140o-authenticated-admin-get-smoke.ps1 -BaseUrl http://127.0.0.1:4001 -AdminToken "<runtime token>" -WriteReport
```

