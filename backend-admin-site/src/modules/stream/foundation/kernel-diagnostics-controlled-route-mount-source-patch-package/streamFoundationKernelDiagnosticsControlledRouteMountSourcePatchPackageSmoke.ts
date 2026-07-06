import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackage";
import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness } from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness";

export interface StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139N";
  readonly status: "controlled_route_mount_source_patch_package_smoke_ready" | "controlled_route_mount_source_patch_package_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly plannedFilesReady: boolean;
  readonly noFilesCreatedNow: boolean;
  readonly noBlockingChecks: boolean;
  readonly foundationScopeOnly: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly routeMountPerformed: false;
  readonly runtimeHttpRequestPerformed: false;
  readonly databaseWritePerformed: false;
  readonly providerCallPerformed: false;
  readonly walletMutationPerformed: false;
  readonly paymentAuthorizationPerformed: false;
  readonly monthlyPayoutPerformed: false;
  readonly moneyMovementPerformed: false;
  readonly rawSecretsReturned: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSmokeReport(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePatchPackageReadiness();
  const snapshotReady = snapshot.status === "controlled_route_mount_source_patch_package_ready";
  const readinessReady = readiness.ready === true && readiness.readyForControlledRouteMountSourceWriteReview === true;
  const plannedFilesReady = snapshot.plannedFileCount === 6 && snapshot.plannedFiles.every((file) => file.createdNow === false && file.overwrittenNow === false);
  const noFilesCreatedNow = snapshot.filesCreatedNow === 0 && snapshot.filesOverwrittenNow === 0;
  const noBlockingChecks = snapshot.blockingChecks === 0;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && plannedFilesReady && noFilesCreatedNow && noBlockingChecks && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "controlled_route_mount_source_patch_package_smoke_ready" : "controlled_route_mount_source_patch_package_smoke_blocked",
    snapshotReady,
    readinessReady,
    plannedFilesReady,
    noFilesCreatedNow,
    noBlockingChecks,
    foundationScopeOnly,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountPerformed: false,
    runtimeHttpRequestPerformed: false,
    databaseWritePerformed: false,
    providerCallPerformed: false,
    walletMutationPerformed: false,
    paymentAuthorizationPerformed: false,
    monthlyPayoutPerformed: false,
    moneyMovementPerformed: false,
    rawSecretsReturned: false,
    fakeSuccessAllowed: false,
  };
}
