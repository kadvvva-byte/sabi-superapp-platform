import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackage";
import type { StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageStatus } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageContracts";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139N";
  readonly status: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageStatus;
  readonly ready: boolean;
  readonly readyForControlledRouteMountSourceWriteReview: boolean;
  readonly readyForProductionRouteMount: false;
  readonly plannedFileCount: number;
  readonly filesCreatedNow: 0;
  readonly filesOverwrittenNow: 0;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot();
  const ready = snapshot.status === "controlled_route_mount_source_patch_package_ready" && snapshot.blockingChecks === 0;
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready,
    readyForControlledRouteMountSourceWriteReview: snapshot.readyForControlledRouteMountSourceWriteReview,
    readyForProductionRouteMount: false,
    plannedFileCount: snapshot.plannedFileCount,
    filesCreatedNow: 0,
    filesOverwrittenNow: 0,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretsReturned: false,
    fakeSuccessAllowed: false,
  };
}
