import { getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackage";

export interface StreamFoundation140JRuntimeSmokeApprovalReadiness {
  readonly ready: boolean;
  readonly status: "runtime_smoke_approval_ready_blocked_until_exact_owner_approval" | "runtime_smoke_approval_blocked";
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly nextApprovalRequired: true;
}

export function getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageReadiness(): StreamFoundation140JRuntimeSmokeApprovalReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot();
  const blockingChecks = snapshot.blockingChecks.length;

  return {
    ready: blockingChecks === 0,
    status: blockingChecks === 0
      ? "runtime_smoke_approval_ready_blocked_until_exact_owner_approval"
      : "runtime_smoke_approval_blocked",
    passedChecks: snapshot.checks.length - blockingChecks,
    blockingChecks,
    nextApprovalRequired: true,
  };
}
