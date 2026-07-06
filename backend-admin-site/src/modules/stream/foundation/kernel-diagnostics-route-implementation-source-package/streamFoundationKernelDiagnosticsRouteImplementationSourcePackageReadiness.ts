import { getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistReadiness } from "../kernel-diagnostics-route-source-implementation-checklist";
import { getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteImplementationSourcePackage";
import { STREAM_FOUNDATION_138R_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteImplementationSourcePackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138R_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_VERSION;
  readonly readyForImplementationSourcePackageReview: boolean;
  readonly readyForRouteSourceImplementationNow: false;
  readonly implementationSourcePackageOnly: true;
  readonly implementationSourceBlueprintsPreparedNow: true;
  readonly routeSourceImplementationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountPerformed: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly checklistReady: boolean;
  readonly expectedBlueprintCount: 5;
  readonly actualBlueprintCount: number;
  readonly expectedMountBoundaryCount: 4;
  readonly actualMountBoundaryCount: number;
  readonly allBlueprintsReviewOnly: boolean;
  readonly allMountBoundariesUnchanged: boolean;
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

export function getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageReadiness(): StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageReadiness {
  const checklistReadiness = getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot();
  const allBlueprintsReviewOnly = snapshot.sourceBlueprints.every(
    (item) => item.includedInThisPatch === false && item.generatedNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allMountBoundariesUnchanged = snapshot.mountBoundaryReviews.every(
    (item) => item.includedInThisPatch === false && item.routeMountedNow === false && item.separateApprovalRequiredLater && item.allowedOnlyAfterSourceReview,
  );

  return {
    version: STREAM_FOUNDATION_138R_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_VERSION,
    readyForImplementationSourcePackageReview:
      checklistReadiness.readyForImplementationChecklistReview &&
      snapshot.readyForImplementationSourcePackageReview &&
      snapshot.sourceBlueprintCount === 5 &&
      snapshot.generatedSourceBlueprintCount === 0 &&
      snapshot.mountBoundaryReviewCount === 4 &&
      allBlueprintsReviewOnly &&
      allMountBoundariesUnchanged,
    readyForRouteSourceImplementationNow: false,
    implementationSourcePackageOnly: true,
    implementationSourceBlueprintsPreparedNow: true,
    routeSourceImplementationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountPerformed: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    checklistReady: checklistReadiness.readyForImplementationChecklistReview,
    expectedBlueprintCount: 5,
    actualBlueprintCount: snapshot.sourceBlueprintCount,
    expectedMountBoundaryCount: 4,
    actualMountBoundaryCount: snapshot.mountBoundaryReviewCount,
    allBlueprintsReviewOnly,
    allMountBoundariesUnchanged,
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
