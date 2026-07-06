import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackage";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness";
import { STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION;
  readonly passed: boolean;
  readonly expectedReviewItemCount: 8;
  readonly actualReviewItemCount: number;
  readonly expectedVirtualFileReviewCount: 5;
  readonly actualVirtualFileReviewCount: number;
  readonly readyForFinalReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly routeSourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly generatedSourceTextPersistedNow: false;
  readonly generatedSourceTextPrintedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly approvedVirtualFileWriteCount: 0;
  readonly writtenVirtualFileCount: 0;
  readonly allVirtualFilesFinalReviewedAndNotWritten: boolean;
  readonly allRequiredReviewItemsPassed: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noPaymentAuthorization: boolean;
  readonly noMonthlyPayout: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness();
  const allVirtualFilesFinalReviewedAndNotWritten = snapshot.virtualFileReviews.every(
    (item) => item.finalReviewPassed && item.approvedForWriteNow === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allRequiredReviewItemsPassed = snapshot.reviewItems.every((item) => item.passed || !item.blocking);
  const passed =
    readiness.readyForFinalReview &&
    snapshot.reviewItemCount === 8 &&
    snapshot.virtualFileReviewCount === 5 &&
    snapshot.approvedVirtualFileWriteCount === 0 &&
    snapshot.writtenVirtualFileCount === 0 &&
    snapshot.routeSourceGenerationApprovedNow === false &&
    snapshot.readyForRouteSourceGenerationNow === false &&
    snapshot.routeSourceGenerationExecutedNow === false &&
    snapshot.routeSourceFilesWrittenNow === false &&
    snapshot.implementationSourceFilesGeneratedNow === false &&
    snapshot.implementationSourceTextReturnedNow === false &&
    snapshot.generatedSourceTextPersistedNow === false &&
    snapshot.generatedSourceTextPrintedNow === false &&
    snapshot.routeMountApprovedNow === false &&
    snapshot.routeMountPerformed === false &&
    snapshot.protectedRouteRegisteredNow === false &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.paymentAuthorizationPerformed === 0 &&
    snapshot.monthlyPayoutPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.streamIndexPatchIncluded === false &&
    snapshot.appServerPatchIncluded === false &&
    allVirtualFilesFinalReviewedAndNotWritten &&
    allRequiredReviewItemsPassed;

  return {
    version: STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION,
    passed,
    expectedReviewItemCount: 8,
    actualReviewItemCount: snapshot.reviewItemCount,
    expectedVirtualFileReviewCount: 5,
    actualVirtualFileReviewCount: snapshot.virtualFileReviewCount,
    readyForFinalReview: readiness.readyForFinalReview,
    readyForRouteSourceGenerationNow: false,
    routeSourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    generatedSourceTextPersistedNow: false,
    generatedSourceTextPrintedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    approvedVirtualFileWriteCount: 0,
    writtenVirtualFileCount: 0,
    allVirtualFilesFinalReviewedAndNotWritten,
    allRequiredReviewItemsPassed,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noPaymentAuthorization: snapshot.paymentAuthorizationPerformed === 0,
    noMonthlyPayout: snapshot.monthlyPayoutPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    safeSummary: passed
      ? "138U final review package is review-only; it writes no source, returns no generated source text, mounts no route, calls no provider, mutates no Wallet, moves no money, and keeps stream index plus app server untouched."
      : "138U final review remains blocked until dry-run, owner generation approval and separate route mount approval are handled later.",
  };
}
