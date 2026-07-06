import { getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageReadiness } from "../kernel-diagnostics-route-implementation-source-package";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGate";
import { STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness {
  readonly version: typeof STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION;
  readonly readyForGenerationApprovalReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly generationApprovalGateOnly: true;
  readonly sourceGenerationOwnerApprovalRecordedNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly sourcePackageReady: boolean;
  readonly expectedRequirementCount: 8;
  readonly actualRequirementCount: number;
  readonly blockedRequirementCount: number;
  readonly expectedBlueprintReviewCount: 5;
  readonly actualBlueprintReviewCount: number;
  readonly expectedMountBoundaryGateCount: 4;
  readonly actualMountBoundaryGateCount: number;
  readonly allBlueprintsNotApprovedAndNotGenerated: boolean;
  readonly allMountBoundariesBlocked: boolean;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness(): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness {
  const sourcePackageReadiness = getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot();
  const allBlueprintsNotApprovedAndNotGenerated = snapshot.blueprintReviews.every(
    (item) => item.approvedForGenerationNow === false && item.generatedNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allMountBoundariesBlocked = snapshot.mountBoundaryGates.every(
    (item) => item.approvedForMountNow === false && item.routeMountedNow === false && item.includedInThisPatch === false && item.requiredBeforeMount,
  );

  return {
    version: STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION,
    readyForGenerationApprovalReview:
      sourcePackageReadiness.readyForImplementationSourcePackageReview &&
      snapshot.readyForGenerationApprovalReview &&
      snapshot.requirementCount === 8 &&
      snapshot.blueprintReviewCount === 5 &&
      snapshot.approvedBlueprintCount === 0 &&
      snapshot.mountBoundaryGateCount === 4 &&
      snapshot.sourceGenerationApprovedNow === false &&
      snapshot.readyForRouteSourceGenerationNow === false &&
      snapshot.routeSourceFilesWrittenNow === false &&
      snapshot.routeMountPerformed === false &&
      allBlueprintsNotApprovedAndNotGenerated &&
      allMountBoundariesBlocked,
    readyForRouteSourceGenerationNow: false,
    generationApprovalGateOnly: true,
    sourceGenerationOwnerApprovalRecordedNow: false,
    sourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    sourcePackageReady: sourcePackageReadiness.readyForImplementationSourcePackageReview,
    expectedRequirementCount: 8,
    actualRequirementCount: snapshot.requirementCount,
    blockedRequirementCount: snapshot.blockedRequirementCount,
    expectedBlueprintReviewCount: 5,
    actualBlueprintReviewCount: snapshot.blueprintReviewCount,
    expectedMountBoundaryGateCount: 4,
    actualMountBoundaryGateCount: snapshot.mountBoundaryGateCount,
    allBlueprintsNotApprovedAndNotGenerated,
    allMountBoundariesBlocked,
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
