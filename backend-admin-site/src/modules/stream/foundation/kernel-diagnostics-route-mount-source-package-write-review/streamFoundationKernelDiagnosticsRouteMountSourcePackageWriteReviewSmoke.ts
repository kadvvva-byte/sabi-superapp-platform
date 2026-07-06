import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReview";
import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSmokeReport {
  readonly version: "BACKEND-STREAM-FOUNDATION-139H";
  readonly status: "route_mount_source_package_write_review_smoke_ready" | "route_mount_source_package_write_review_smoke_blocked";
  readonly snapshotReady: boolean;
  readonly readinessReady: boolean;
  readonly readyForFutureSourceWriteGate: boolean;
  readonly allReviewItemsPassed: boolean;
  readonly foundationScopeOnly: boolean;
  readonly ownerApprovalStillRequired: true;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly sourcePackageWriteAllowed: false;
  readonly sourcePackageWriteExecuted: false;
  readonly sourceFilesWritten: false;
  readonly sourceTextReturned: false;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSmokeReport(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness();
  const snapshotReady = snapshot.status === "route_mount_source_package_write_review_ready" && snapshot.blockingReviewItems === 0;
  const readinessReady = readiness.ready === true && readiness.blockingReviewItems === 0;
  const readyForFutureSourceWriteGate = snapshot.decision.readyForFutureSourceWriteGate === true && readiness.readyForFutureSourceWriteGate === true;
  const allReviewItemsPassed = snapshot.totalReviewItems > 0 && snapshot.passedReviewItems === snapshot.totalReviewItems;
  const foundationScopeOnly = snapshot.patchScope === "src/modules/stream/foundation/** only";
  const safe = snapshotReady && readinessReady && readyForFutureSourceWriteGate && allReviewItemsPassed && foundationScopeOnly;

  return {
    version: snapshot.version,
    status: safe ? "route_mount_source_package_write_review_smoke_ready" : "route_mount_source_package_write_review_smoke_blocked",
    snapshotReady,
    readinessReady,
    readyForFutureSourceWriteGate,
    allReviewItemsPassed,
    foundationScopeOnly,
    ownerApprovalStillRequired: true,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    sourcePackageWriteAllowed: false,
    sourcePackageWriteExecuted: false,
    sourceFilesWritten: false,
    sourceTextReturned: false,
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
