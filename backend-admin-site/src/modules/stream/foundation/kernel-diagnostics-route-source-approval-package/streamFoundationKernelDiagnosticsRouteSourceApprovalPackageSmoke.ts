import { getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackage";
import { getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness";
import { STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION;
  readonly passed: boolean;
  readonly expectedRouteReviews: 4;
  readonly actualRouteReviews: number;
  readonly expectedChecklistItems: 8;
  readonly actualChecklistItems: number;
  readonly readyForOwnerApprovalPackageReview: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly ownerApprovalCapturedNow: false;
  readonly routeSourcePatchAuthorizedNow: false;
  readonly routeSourcePatchGeneratedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly noForbiddenTargetsIncluded: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness();
  const passed =
    readiness.readyForOwnerApprovalPackageReview &&
    snapshot.routeReviewCount === 4 &&
    snapshot.checklistItemCount === 8 &&
    snapshot.forbiddenTargetsIncluded === 0 &&
    snapshot.ownerApprovalCapturedNow === false &&
    snapshot.routeSourcePatchAuthorizedNow === false &&
    snapshot.routeSourcePatchGeneratedNow === false &&
    snapshot.routeMountPerformed === false &&
    snapshot.protectedRouteRegisteredNow === false &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.streamIndexPatchIncluded === false &&
    snapshot.appServerPatchIncluded === false;

  return {
    version: STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION,
    passed,
    expectedRouteReviews: 4,
    actualRouteReviews: snapshot.routeReviewCount,
    expectedChecklistItems: 8,
    actualChecklistItems: snapshot.checklistItemCount,
    readyForOwnerApprovalPackageReview: readiness.readyForOwnerApprovalPackageReview,
    readyForRouteSourcePatchNow: false,
    ownerApprovalCapturedNow: false,
    routeSourcePatchAuthorizedNow: false,
    routeSourcePatchGeneratedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    noForbiddenTargetsIncluded: snapshot.forbiddenTargetsIncluded === 0,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeSummary: passed
      ? "138O approval package is safe for owner review only; it captures no approval, creates no protected route source, performs no mount, and keeps provider, Wallet, money movement, raw secrets, app server, and stream index untouched."
      : "138O approval package requires review before any future source or mount patch can be approved.",
  };
}
