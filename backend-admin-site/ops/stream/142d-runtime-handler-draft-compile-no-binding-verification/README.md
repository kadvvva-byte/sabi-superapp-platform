# BACKEND-STREAM-FOUNDATION-142D-FIX1

Fix for the previous 142D runner.

Problem:
- PowerShell StrictMode tried to read `$transaction` as a variable because it was inside a double-quoted scan string.

Fix:
- The scan term is now a single-quoted literal: `'$transaction'`.

Run:

```powershell
cd C:\Users\User\Desktop\superapp

Expand-Archive -Force "$env:USERPROFILE\Downloads\backend-stream-foundation-142d-fix1-runtime-handler-draft-compile-no-binding-verification-ops-only-package.zip" -DestinationPath .

powershell -ExecutionPolicy Bypass -File .\ops\stream\142d-runtime-handler-draft-compile-no-binding-verification\run-stream-foundation-142d-runtime-handler-draft-compile-no-binding-verification.ps1 -RunTsc -WriteReport
```

Expected:
- `ok: true`
- `status: runtime_handler_draft_compile_and_no_binding_safety_verification_passed`
- `fix1.fixedPowerShellStrictModeTransactionLiteral: true`
- `tscResult.exitCode: 0`
