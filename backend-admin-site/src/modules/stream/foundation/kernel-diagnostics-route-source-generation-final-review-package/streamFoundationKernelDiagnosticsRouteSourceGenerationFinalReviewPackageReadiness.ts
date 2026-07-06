import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness } from "../kernel-diagnostics-route-source-generation-dry-run-package";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackage";
import { STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION;
  readonly readyForFinalReview: boolean;
  readonly readyForOwnerDecision: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly finalReviewPackageOnly: true;
  readonly finalReviewBuiltNow: true;
  readonly dryRunReady: boolean;
  readonly expectedReviewItemCount: 8;
  readonly actualReviewItemCount: number;
  readonly blockingReviewItemCount: number;
  readonly expectedVirtualFileReviewCount: 5;
  readonly actualVirtualFileReviewCount: number;
  readonly approvedVirtualFileWriteCount: 0;
  readonly writtenVirtualFileCount: 0;
  readonly allVirtualFilesFinalReviewedAndNotWritten: boolean;
  readonly allRequiredReviewItemsPassed: boolean;
  readonly routeSourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
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
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness(): StreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness {
  const dryRunReadiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageSnapshot();
  const allVirtualFilesFinalReviewedAndNotWritten = snapshot.virtualFileReviews.every(
    (item) => item.finalReviewPassed && item.approvedForWriteNow === false && item.includedInThisPatch === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allRequiredReviewItemsPassed = snapshot.reviewItems.every((item) => item.passed || !item.blocking);

  return {
    version: STREAM_FOUNDATION_138U_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_FINAL_REVIEW_PACKAGE_VERSION,
    readyForFinalReview:
      dryRunReadiness.readyForDryRunReview &&
      snapshot.finalReviewBuiltNow &&
      snapshot.reviewItemCount === 8 &&
      snapshot.virtualFileReviewCount === 5 &&
      snapshot.approvedVirtualFileWriteCount === 0 &&
      snapshot.writtenVirtualFileCount === 0 &&
      snapshot.routeSourceFilesWrittenNow === false &&
      snapshot.implementationSourceFilesGeneratedNow === false &&
      snapshot.implementationSourceTextReturnedNow === false &&
      snapshot.routeMountPerformed === false &&
      allVirtualFilesFinalReviewedAndNotWritten &&
      allRequiredReviewItemsPassed,
    readyForOwnerDecision: snapshot.readyForOwnerDecision,
    readyForRouteSourceGenerationNow: false,
    finalReviewPackageOnly: true,
    finalReviewBuiltNow: true,
    dryRunReady: dryRunReadiness.readyForDryRunReview,
    expectedReviewItemCount: 8,
    actualReviewItemCount: snapshot.reviewItemCount,
    blockingReviewItemCount: snapshot.blockingReviewItemCount,
    expectedVirtualFileReviewCount: 5,
    actualVirtualFileReviewCount: snapshot.virtualFileReviewCount,
    approvedVirtualFileWriteCount: 0,
    writtenVirtualFileCount: 0,
    allVirtualFilesFinalReviewedAndNotWritten,
    allRequiredReviewItemsPassed,
    routeSourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
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
  };
}
