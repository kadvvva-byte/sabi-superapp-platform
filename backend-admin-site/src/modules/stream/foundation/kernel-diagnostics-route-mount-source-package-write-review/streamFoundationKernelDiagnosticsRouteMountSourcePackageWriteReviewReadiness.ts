import { getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReview";
import type { StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStatus } from "./streamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139H";
  readonly status: StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewStatus;
  readonly ready: boolean;
  readonly readyForFutureSourceWriteGate: boolean;
  readonly totalReviewItems: number;
  readonly passedReviewItems: number;
  readonly blockingReviewItems: number;
  readonly ownerApprovalRequiredBeforeWrite: true;
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

export function getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness(): StreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountSourcePackageWriteReviewSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "route_mount_source_package_write_review_ready" && snapshot.blockingReviewItems === 0,
    readyForFutureSourceWriteGate: snapshot.decision.readyForFutureSourceWriteGate,
    totalReviewItems: snapshot.totalReviewItems,
    passedReviewItems: snapshot.passedReviewItems,
    blockingReviewItems: snapshot.blockingReviewItems,
    ownerApprovalRequiredBeforeWrite: true,
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
