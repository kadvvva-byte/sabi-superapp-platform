import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGate";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139I";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateStatus;
  readonly ready: boolean;
  readonly readyForFutureOwnerApprovedSourceOnlyWrite: boolean;
  readonly totalGateItems: number;
  readonly passedGateItems: number;
  readonly blockingGateItems: number;
  readonly ownerApprovalRequiredBeforeWrite: true;
  readonly ownerApprovalCapturedNow: false;
  readonly sourcePackageWriteAllowedNow: false;
  readonly sourcePackageWriteExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly sourceTextReturned: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteFinalGateSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_package_write_final_gate_ready" && snapshot.blockingGateItems === 0,
    readyForFutureOwnerApprovedSourceOnlyWrite: snapshot.decision.readyForFutureOwnerApprovedSourceOnlyWrite,
    totalGateItems: snapshot.totalGateItems,
    passedGateItems: snapshot.passedGateItems,
    blockingGateItems: snapshot.blockingGateItems,
    ownerApprovalRequiredBeforeWrite: true,
    ownerApprovalCapturedNow: false,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
