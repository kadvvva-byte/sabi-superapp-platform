import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackage";
import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness";
import { STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION;
  readonly passed: boolean;
  readonly expectedVirtualFilePlanCount: 5;
  readonly actualVirtualFilePlanCount: number;
  readonly expectedForbiddenPathCheckCount: 5;
  readonly actualForbiddenPathCheckCount: number;
  readonly readyForDryRunReview: boolean;
  readonly readyForRouteSourceGenerationNow: false;
  readonly sourceGenerationApprovedNow: false;
  readonly routeSourceGenerationExecutedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly generatedSourceTextPersistedNow: false;
  readonly generatedSourceTextPrintedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
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
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationDryRunPackageReadiness();
  const allVirtualFilesNotGeneratedAndNotWritten = snapshot.virtualFilePlans.every(
    (item) => item.includedInThisPatch === false && item.generatedNow === false && item.writtenNow === false && item.sourceTextReturnedNow === false && item.routeMountedNow === false,
  );
  const allForbiddenPathChecksPassed = snapshot.forbiddenPathChecks.every((item) => item.passed && item.matchedCount === 0);
  const passed =
    readiness.readyForDryRunReview &&
    snapshot.virtualFilePlanCount === 5 &&
    snapshot.generatedVirtualFileCount === 0 &&
    snapshot.writtenVirtualFileCount === 0 &&
    snapshot.forbiddenPathCheckCount === 5 &&
    snapshot.forbiddenPathViolationCount === 0 &&
    snapshot.sourceGenerationApprovedNow === false &&
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
    allVirtualFilesNotGeneratedAndNotWritten &&
    allForbiddenPathChecksPassed;

  return {
    version: STREAM_FOUNDATION_138T_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_GENERATION_DRY_RUN_PACKAGE_VERSION,
    passed,
    expectedVirtualFilePlanCount: 5,
    actualVirtualFilePlanCount: snapshot.virtualFilePlanCount,
    expectedForbiddenPathCheckCount: 5,
    actualForbiddenPathCheckCount: snapshot.forbiddenPathCheckCount,
    readyForDryRunReview: readiness.readyForDryRunReview,
    readyForRouteSourceGenerationNow: false,
    sourceGenerationApprovedNow: false,
    routeSourceGenerationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    generatedSourceTextPersistedNow: false,
    generatedSourceTextPrintedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
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
    safeSummary: passed
      ? "138T dry-run package builds a review manifest only; it writes no route source, returns no generated source text, mounts no route, calls no provider, mutates no Wallet, moves no money, and keeps stream index plus app server untouched."
      : "138T dry-run package remains blocked until owner generation approval, forbidden path scan and separate route mount approval are handled later.",
  };
}
