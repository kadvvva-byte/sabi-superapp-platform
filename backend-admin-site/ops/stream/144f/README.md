# BACKEND-STREAM-FOUNDATION-144F-FIX1

Short-path repack of 144F ops-only verification runner.

Reason:
- Original 144F package used a very long Windows path.
- Windows PowerShell `Expand-Archive` failed before creating the `.ps1` file.
- FIX1 keeps the same verification logic, but moves it to: `ops/stream/144f/run.ps1`.

Run:

```powershell
cd C:\Users\User\Desktop\superapp

Expand-Archive -Force "$env:USERPROFILE\Downloads\backend-stream-foundation-144f-fix1-short-path-ops-only-package.zip" -DestinationPath .

powershell -ExecutionPolicy Bypass -File .\ops\stream\144f\run.ps1 -RunTsc -WriteReport
```

Expected:
- `ok: true`
- `status: runtime_mount_target_patch_draft_preview_evidence_capture_planning_compile_safety_verification_passed`
- `tscResult.exitCode: 0`

Safety remains ops-only:
- no source modification
- no backend restart
- no runtime POST
- no runtime DB read/write
- no provider call
- no provider secret read
- no realtime socket/broadcast
- no moderation bypass
- no runtime mount
- no route behavior change
- no target route write
- no rollback execution
- no post-mount smoke
- no Wallet/payment/payout/money movement
- no fake success
