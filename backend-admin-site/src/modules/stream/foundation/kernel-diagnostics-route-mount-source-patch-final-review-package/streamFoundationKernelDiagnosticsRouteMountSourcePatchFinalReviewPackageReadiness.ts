import { getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackage";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139E";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageStatus;
  readonly ready: boolean;
  readonly readyForFutureSourcePackage: boolean;
  readonly totalReviewItems: number;
  readonly passedReviewItems: number;
  readonly totalChecks: number;
  readonly passedChecks: number;
  readonly blockingChecks: number;
  readonly sourcePatchAllowedNow: false;
  readonly sourcePatchExecutedNow: false;
  readonly sourceFilesWrittenNow: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePatchFinalReviewPackageSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_patch_final_review_ready" && snapshot.blockingChecks === 0,
    readyForFutureSourcePackage: snapshot.decision.readyForFutureSourcePackage,
    totalReviewItems: snapshot.totalReviewItems,
    passedReviewItems: snapshot.passedReviewItems,
    totalChecks: snapshot.totalChecks,
    passedChecks: snapshot.passedChecks,
    blockingChecks: snapshot.blockingChecks,
    sourcePatchAllowedNow: false,
    sourcePatchExecutedNow: false,
    sourceFilesWrittenNow: false,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
