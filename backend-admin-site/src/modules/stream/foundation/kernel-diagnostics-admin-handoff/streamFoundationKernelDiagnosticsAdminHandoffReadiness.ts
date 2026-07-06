import { STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION } from "./streamFoundationKernelDiagnosticsAdminHandoffContracts";
import { getStreamFoundationKernelDiagnosticsDefaultAdminHandoffSnapshot } from "./streamFoundationKernelDiagnosticsAdminHandoffSnapshot";

export interface StreamFoundationKernelDiagnosticsAdminHandoffReadiness {
  readonly version: typeof STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly adminHandoffSnapshotReady: boolean;
  readonly adminWidgetsRedacted: boolean;
  readonly mobileWidgetsBlocked: boolean;
  readonly rawSecretsBlocked: boolean;
  readonly routeMountBlocked: boolean;
  readonly providerCallsBlocked: boolean;
  readonly moneyMovementBlocked: boolean;
  readonly fakeSuccessBlocked: boolean;
  readonly readyForAdminUiContractLater: boolean;
}

export function getStreamFoundationKernelDiagnosticsAdminHandoffReadiness(): StreamFoundationKernelDiagnosticsAdminHandoffReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsDefaultAdminHandoffSnapshot();
  return {
    version: STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION,
    streamIndexPatchIncluded: false,
    adminHandoffSnapshotReady: snapshot.totalWidgets > 0 && snapshot.totalActions > 0,
    adminWidgetsRedacted: snapshot.widgets.every((widget) => widget.redacted && widget.rawSecretFieldCount === 0),
    mobileWidgetsBlocked: snapshot.mobileVisibleWidgets === 0 && snapshot.widgets.every((widget) => widget.visibleForMobile === false),
    rawSecretsBlocked: snapshot.rawSecretFieldsReturned === 0 && snapshot.safety.rawSecretsReturned === false,
    routeMountBlocked: snapshot.routeMountReadyNow === false && snapshot.safety.routeMountAllowedNow === false,
    providerCallsBlocked: snapshot.providerCallsPerformed === 0 && snapshot.safety.providerCallAllowedNow === false,
    moneyMovementBlocked: snapshot.moneyMovementPerformed === 0 && snapshot.safety.paymentAuthorizationAllowedNow === false && snapshot.safety.monthlyPayoutAllowedNow === false,
    fakeSuccessBlocked: snapshot.safety.fakeSuccessAllowed === false,
    readyForAdminUiContractLater: snapshot.adminHandoffReadyForUiLater,
  };
}
