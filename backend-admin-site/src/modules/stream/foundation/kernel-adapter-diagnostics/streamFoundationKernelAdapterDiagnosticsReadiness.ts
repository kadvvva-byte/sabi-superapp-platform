import { getStreamFoundationKernelAdapterDefaultDiagnosticsSnapshot } from "./streamFoundationKernelAdapterDiagnosticsSnapshot";
import { STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION } from "./streamFoundationKernelAdapterDiagnosticsContracts";

export interface StreamFoundationKernelAdapterDiagnosticsReadiness {
  readonly version: typeof STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly diagnosticsSnapshotReady: boolean;
  readonly redactionReady: boolean;
  readonly adminSafeSnapshotReady: boolean;
  readonly mobileDirectAccessBlocked: boolean;
  readonly routeMountBlocked: boolean;
  readonly providerCallsBlocked: boolean;
  readonly walletMutationBlocked: boolean;
  readonly moneyMovementBlocked: boolean;
  readonly fakeSuccessBlocked: boolean;
  readonly readyForAdminDiagnosticsRouteLater: boolean;
}

export function getStreamFoundationKernelAdapterDiagnosticsReadiness(): StreamFoundationKernelAdapterDiagnosticsReadiness {
  const snapshot = getStreamFoundationKernelAdapterDefaultDiagnosticsSnapshot();
  return {
    version: STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION,
    streamIndexPatchIncluded: false,
    diagnosticsSnapshotReady: snapshot.totalFindings > 0,
    redactionReady: snapshot.rawSecretFindingsReturned === 0 && snapshot.findings.every((finding) => finding.redacted),
    adminSafeSnapshotReady: snapshot.diagnosticsSafeForAdmin,
    mobileDirectAccessBlocked: snapshot.findings.every((finding) => finding.mobileDirectAccessBlocked),
    routeMountBlocked: snapshot.safety.routeMountAllowedNow === false,
    providerCallsBlocked: snapshot.providerCallsPerformed === 0 && snapshot.safety.providerCallAllowedNow === false,
    walletMutationBlocked: snapshot.safety.walletMutationAllowedNow === false,
    moneyMovementBlocked: snapshot.moneyMovementPerformed === 0 && snapshot.safety.paymentAuthorizationAllowedNow === false && snapshot.safety.monthlyPayoutAllowedNow === false,
    fakeSuccessBlocked: snapshot.safety.fakeSuccessAllowed === false,
    readyForAdminDiagnosticsRouteLater: snapshot.diagnosticsSafeForAdmin && snapshot.routeMountReadyNow === false,
  };
}
