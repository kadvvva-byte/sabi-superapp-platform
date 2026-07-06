import { STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION } from "./streamFoundationKernelAdapterDiagnosticsContracts";
import { getStreamFoundationKernelAdapterDefaultDiagnosticsSnapshot } from "./streamFoundationKernelAdapterDiagnosticsSnapshot";
import { getStreamFoundationKernelAdapterDiagnosticsReadiness } from "./streamFoundationKernelAdapterDiagnosticsReadiness";

export interface StreamFoundationKernelAdapterDiagnosticsSmoke {
  readonly version: typeof STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly passed: boolean;
  readonly checks: readonly {
    readonly name: string;
    readonly passed: boolean;
  }[];
}

export function getStreamFoundationKernelAdapterDiagnosticsSmoke(): StreamFoundationKernelAdapterDiagnosticsSmoke {
  const snapshot = getStreamFoundationKernelAdapterDefaultDiagnosticsSnapshot();
  const readiness = getStreamFoundationKernelAdapterDiagnosticsReadiness();
  const checks = [
    { name: "diagnostics_snapshot_has_findings", passed: snapshot.totalFindings > 0 },
    { name: "raw_secrets_not_returned", passed: snapshot.rawSecretFindingsReturned === 0 },
    { name: "provider_calls_not_performed", passed: snapshot.providerCallsPerformed === 0 },
    { name: "money_movement_not_performed", passed: snapshot.moneyMovementPerformed === 0 },
    { name: "mobile_direct_access_blocked", passed: snapshot.directMobileAccessFindings === 0 && readiness.mobileDirectAccessBlocked },
    { name: "route_mount_blocked", passed: snapshot.routeMountReadyNow === false && readiness.routeMountBlocked },
    { name: "fake_success_blocked", passed: readiness.fakeSuccessBlocked },
    { name: "admin_snapshot_redacted", passed: readiness.adminSafeSnapshotReady && readiness.redactionReady },
  ] as const;
  return {
    version: STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION,
    streamIndexPatchIncluded: false,
    passed: checks.every((check) => check.passed),
    checks,
  };
}
