import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness } from "../kernel-diagnostics-route-source-generation-approval-gate";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackage";
import { STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION;
  readonly readyForDryRunReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly dryRunPackageOnly: true;
  readonly dryRunReviewManifestBuiltNow: true;
  readonly virtualFilePlanBuiltNow: true;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly approvalGateReady: boolean;
  readonly expectedVirtualFilePlanCount: 5;
  readonly actualVirtualFilePlanCount: number;
  readonly expectedForbiddenPathCheckCount: 5;
  readonly actualForbiddenPathCheckCount: number;
  readonly forbiddenPathViolationCount: 0;
  readonly allVirtualFilesNotGeneratedAndNotWritten: boolean;
  readonly allForbiddenPathChecksPassed: boolean;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness(): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness {
  const approvalReadiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationApprovalGateReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot();
  const allVirtualFilesNotGeneratedAndNotWritten = snapshot.virtualFilePlans.every(
    (item) => item.includedInThisPatch === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allForbiddenPathChecksPassed = snapshot.forbiddenPathChecks.every((item) => item.checkedNow && item.passed && item.matchedCount === 0);

  return {
    version: STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION,
    readyForDryRunReview:
      approvalReadiness.readyForGenerationApprovalReview &&
      snapshot.readyForDryRunReview &&
      snapshot.virtualFilePlanCount === 5 &&
      snapshot.generatedVirtualFileCount === 0 &&
      snapshot.writtenVirtualFileCount === 0 &&
      snapshot.forbiddenPathCheckCount === 5 &&
      snapshot.forbiddenPathViolationCount === 0 &&
      snapshot.routeSourceFilesWrittenNow === false &&
      snapshot.implementationSourceFilesGeneratedNow === false &&
      snapshot.implementationSourceTextReturnedNow === false &&
      snapshot.routeMountPerformed === false &&
      allVirtualFilesNotGeneratedAndNotWritten &&
      allForbiddenPathChecksPassed,
    readyForRouteSourceGenerationNow: false,
    dryRunPackageOnly: true,
    dryRunReviewManifestBuiltNow: true,
    virtualFilePlanBuiltNow: true,
    sourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    approvalGateReady: approvalReadiness.readyForGenerationApprovalReview,
    expectedVirtualFilePlanCount: 5,
    actualVirtualFilePlanCount: snapshot.virtualFilePlanCount,
    expectedForbiddenPathCheckCount: 5,
    actualForbiddenPathCheckCount: snapshot.forbiddenPathCheckCount,
    forbiddenPathViolationCount: 0,
    allVirtualFilesNotGeneratedAndNotWritten,
    allForbiddenPathChecksPassed,
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
