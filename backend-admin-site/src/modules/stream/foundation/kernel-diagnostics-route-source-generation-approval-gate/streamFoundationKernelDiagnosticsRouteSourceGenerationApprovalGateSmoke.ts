import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGate";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness";
import { STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION;
  readonly passed: boolean;
  readonly expectedRequirementCount: 8;
  readonly actualRequirementCount: number;
  readonly expectedBlueprintReviewCount: 5;
  readonly actualBlueprintReviewCount: number;
  readonly expectedMountBoundaryGateCount: 4;
  readonly actualMountBoundaryGateCount: number;
  readonly readyForGenerationApprovalReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
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
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness();
  const allBlueprintsNotApprovedAndNotGenerated = snapshot.blueprintReviews.every(
    (item) => item.approvedForGenerationNow === false && item.generatedNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allMountBoundariesBlocked = snapshot.mountBoundaryGates.every(
    (item) => item.approvedForMountNow === false && item.routeMountedNow === false && item.includedInThisPatch === false,
  );
  const passed =
    readiness.readyForGenerationApprovalReview &&
    snapshot.requirementCount === 8 &&
    snapshot.blueprintReviewCount === 5 &&
    snapshot.approvedBlueprintCount === 0 &&
    snapshot.mountBoundaryGateCount === 4 &&
    snapshot.sourceGenerationApprovedNow === false &&
    snapshot.readyForRouteSourceGenerationNow === false &&
    snapshot.routeSourceGenerationExecutedNow === false &&
    snapshot.routeSourceFilesWrittenNow === false &&
    snapshot.implementationSourceFilesGeneratedNow === false &&
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
    allBlueprintsNotApprovedAndNotGenerated &&
    allMountBoundariesBlocked;

  return {
    version: STREAM_FOUNDATION_138S_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_APPROVAL_GATE_VERSION,
    passed,
    expectedRequirementCount: 8,
    actualRequirementCount: snapshot.requirementCount,
    expectedBlueprintReviewCount: 5,
    actualBlueprintReviewCount: snapshot.blueprintReviewCount,
    expectedMountBoundaryGateCount: 4,
    actualMountBoundaryGateCount: snapshot.mountBoundaryGateCount,
    readyForGenerationApprovalReview: readiness.readyForGenerationApprovalReview,
    readyForRouteSourceGenerationNow: false,
    sourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
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
    safeSummary: passed
      ? "138S generation approval gate is review-only; it approves no source generation, writes no route file, mounts no route, calls no provider, mutates no Wallet, moves no money, and keeps stream index plus app server untouched."
      : "138S generation approval gate remains blocked until owner source-generation approval and separate mount approval are explicitly handled later.",
  };
}
