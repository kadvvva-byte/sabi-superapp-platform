import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackage";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139E";
  readonly status: "route_mount_source_patch_final_review_package_smoke_ready" | "route_mount_source_patch_final_review_package_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureSourcePackage: boolean;
  readonly foundationScopeOnly: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly sourcePatchExecuted: false;
  readonly sourceFilesWritten: false;
  readonly generatedSourceTextReturned: false;
  readonly routeMountPerformed: false;
  readonly runtimeHttpRequestPerformed: false;
  readonly databaseWritePerformed: false;
  readonly providerCallPerformed: false;
  readonly walletMutationPerformed: false;
  readonly paymentAuthorizationPerformed: false;
  readonly monthlyPayoutPerformed: false;
  readonly moneyMovementPerformed: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness();
  const snapshotReady = snapshot.status === "route_mount_source_patch_final_review_ready" && snapshot.blockingChecks === 0;
  const readinessReady = readiness.ready === true && readiness.blockingChecks === 0;
  const readyForFutureSourcePackage = snapshot.decision.readyForFutureSourcePackage === true && readiness.readyForFutureSourcePackage === true;

  return {
    version: snapshot.version,
    status: snapshotReady && readinessReady && readyForFutureSourcePackage ? "route_mount_source_patch_final_review_package_smoke_ready" : "route_mount_source_patch_final_review_package_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureSourcePackage,
    foundationScopeOnly: snapshot.patchScope === "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    sourcePatchExecuted: false,
    sourceFilesWritten: false,
    generatedSourceTextReturned: false,
    routeMountPerformed: false,
    runtimeHttpRequestPerformed: false,
    databaseWritePerformed: false,
    providerCallPerformed: false,
    walletMutationPerformed: false,
    paymentAuthorizationPerformed: false,
    monthlyPayoutPerformed: false,
    moneyMovementPerformed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  };
}
