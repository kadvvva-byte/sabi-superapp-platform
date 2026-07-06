# BACKEND-STREAM-FOUNDATION-142V-FIX2

Fix for 142V-FIX1 runtime compatibility.

Previous problem:
- `System.Net.Http.StringContent` constructor overload with 3 arguments was unavailable in the user's PowerShell/.NET runtime.

FIX2:
- Replaces `HttpClient + StringContent` with `System.Net.WebRequest`.
- Reads normal response bodies and WebException response bodies through `GetResponseStream()`.
- Keeps FIX1 PowerShell string escaping fix.

Run:

```powershell
cd C:\Users\User\Desktop\superapp

Expand-Archive -Force "$env:USERPROFILE\Downloads\backend-stream-foundation-142v-fix2-blocked-response-body-capture-diagnosis-runtime-smoke-ops-only-package.zip" -DestinationPath .

powershell -ExecutionPolicy Bypass -File .\ops\stream\142v-blocked-response-body-capture-diagnosis-runtime-smoke\run-stream-foundation-142v-blocked-response-body-capture-diagnosis-runtime-smoke.ps1 -BaseUrl "http://127.0.0.1:4001" -RunTsc -WriteReport
```

Expected:
- `ok: true`
- `status: controlled_blocked_response_body_capture_diagnosis_runtime_smoke_passed`
- `fix2.replacedHttpClientStringContent: true`
- `smoke.passedRoutes: 3`
- all `actualStatusCode: 423`
- `bodyCaptureDiagnosisSummary.conclusion` shows whether JSON envelopes are present or bodies are truly empty.
