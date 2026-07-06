# BACKEND-STREAM-FOUNDATION-144I

Short-path ops-only compile and safety verification for 144H runner approval package.

Verifies:
- required 144H files exist
- 144H artifacts stay under `src/modules/stream/foundation`
- no 144H references in `src/app.ts`, `src/server.ts`, `src/modules/stream/index.ts`, or `prisma/schema.prisma`
- no migration created
- runner approval package contracts are present
- future runner may read target hashes/excerpts only after separate approval
- no 144H source target write, runtime mount, route behavior change, runtime POST, provider call, Wallet/payment/payout/money, or fake success
- TypeScript compile passes with `-RunTsc`

Run:

```powershell
cd C:\Users\User\Desktop\superapp

Expand-Archive -Force "$env:USERPROFILE\Downloads\backend-stream-foundation-144i-short-ops-only-package.zip" -DestinationPath .

powershell -ExecutionPolicy Bypass -File .\ops\stream\144i\run.ps1 -RunTsc -WriteReport
```

Expected:
- `ok: true`
- `status: evidence_capture_runner_approval_package_compile_safety_verification_passed`
- `scopeVerification.limitedToStreamFoundation: true`
- `targetReferenceVerification.ok: true`
- `contractContentVerification.failed: 0`
- `safetyFragmentVerification.ok: true`
- `migrationVerification.ok: true`
- `tscResult.exitCode: 0`
