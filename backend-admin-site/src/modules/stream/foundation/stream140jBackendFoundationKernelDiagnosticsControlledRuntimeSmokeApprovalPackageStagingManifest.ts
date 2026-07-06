import { getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot } from "./kernel-diagnostics-controlled-runtime-smoke-approval-package";
import { getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness } from "./kernel-diagnostics-controlled-runtime-smoke-approval-package";
import { runStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSmoke } from "./kernel-diagnostics-controlled-runtime-smoke-approval-package";

export const STREAM_140J_BACKEND_FOUNDATION_KERNEL_DIAGNOSTICS_CONTROLLED_RUNTIME_SMOKE_APPROVAL_PACKAGE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140J",
  stage: "controlled_runtime_smoke_approval_package_source_only",
  changedPaths: [
    "src/modules/stream/foundation/kernel-diagnostics-controlled-runtime-smoke-approval-package/**",
    "src/modules/stream/foundation/stream140jBackendFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageStagingManifest.ts",
  ],
  forbiddenActions: [
    "backend_restart",
    "runtime_http_smoke_without_140k_exact_approval",
    "db_write",
    "provider_call",
    "wallet_mutation",
    "payment_authorization",
    "monthly_payout",
    "money_movement",
    "fake_success",
  ],
  snapshot: getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot(),
  readiness: getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness(),
  smoke: runStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSmoke(),
} as const;
