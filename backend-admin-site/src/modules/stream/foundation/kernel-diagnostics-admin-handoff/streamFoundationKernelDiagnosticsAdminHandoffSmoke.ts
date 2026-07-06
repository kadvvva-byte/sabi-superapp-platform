import { STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION } from "./streamFoundationKernelDiagnosticsAdminHandoffContracts";
import { getStreamFoundationKernelDiagnosticsDefaultAdminHandoffSnapshot } from "./streamFoundationKernelDiagnosticsAdminHandoffSnapshot";
import { getStreamFoundationKernelDiagnosticsAdminHandoffReadiness } from "./streamFoundationKernelDiagnosticsAdminHandoffReadiness";

export interface StreamFoundationKernelDiagnosticsAdminHandoffSmoke {
  readonly version: typeof STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly passed: boolean;
  readonly checks: readonly {
    readonly name: string;
    readonly passed: boolean;
  }[];
}

export function getStreamFoundationKernelDiagnosticsAdminHandoffSmoke(): StreamFoundationKernelDiagnosticsAdminHandoffSmoke {
  const snapshot = getStreamFoundationKernelDiagnosticsDefaultAdminHandoffSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsAdminHandoffReadiness();
  const checks = [
    { name: "admin_snapshot_has_widgets", passed: snapshot.totalWidgets > 0 },
    { name: "admin_actions_defined", passed: snapshot.totalActions > 0 },
    { name: "raw_secrets_blocked", passed: readiness.rawSecretsBlocked },
    { name: "mobile_widgets_blocked", passed: readiness.mobileWidgetsBlocked },
    { name: "route_mount_blocked", passed: readiness.routeMountBlocked },
    { name: "provider_calls_blocked", passed: readiness.providerCallsBlocked },
    { name: "money_movement_blocked", passed: readiness.moneyMovementBlocked },
    { name: "fake_success_blocked", passed: readiness.fakeSuccessBlocked },
    { name: "admin_handoff_ready_later", passed: readiness.readyForAdminUiContractLater },
  ] as const;
  return {
    version: STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION,
    streamIndexPatchIncluded: false,
    passed: checks.every((check) => check.passed),
    checks,
  };
}
