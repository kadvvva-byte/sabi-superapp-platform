import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackage";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139C";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageStatus;
  readonly ready: boolean;
  readonly readyForFutureOwnerReview: boolean;
  readonly requiresFutureExplicitOwnerApproval: true;
  readonly ownerApprovalCapturedNow: false;
  readonly totalRequirements: number;
  readonly readyRequirements: number;
  readonly blockingChecks: number;
  readonly sourcePatchAllowedNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly serverCopyAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchApprovalPackageSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_patch_approval_package_ready" && snapshot.blockingChecks === 0,
    readyForFutureOwnerReview: snapshot.decision.readyForFutureOwnerReview,
    requiresFutureExplicitOwnerApproval: true,
    ownerApprovalCapturedNow: false,
    totalRequirements: snapshot.totalRequirements,
    readyRequirements: snapshot.readyRequirements,
    blockingChecks: snapshot.blockingChecks,
    sourcePatchAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    serverCopyAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
