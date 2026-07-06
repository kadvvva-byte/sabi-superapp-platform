import { getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackage";
import { getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness";
import { STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION;
  readonly passed: boolean;
  readonly expectedDraftFiles: 5;
  readonly actualDraftFiles: number;
  readonly expectedRouteBindingPreviews: 4;
  readonly actualRouteBindingPreviews: number;
  readonly readyForDraftPackageReview: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly draftFilesGeneratedNow: false;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceDraftPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness();
  const passed =
    readiness.readyForDraftPackageReview &&
    snapshot.draftFileCount === 5 &&
    snapshot.generatedDraftFileCount === 0 &&
    snapshot.routeBindingPreviewCount === 4 &&
    snapshot.forbiddenTargetsIncluded === 0 &&
    snapshot.routeSourceFilesWrittenNow === false &&
    snapshot.draftFilesGeneratedNow === false &&
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
    version: STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION,
    passed,
    expectedDraftFiles: 5,
    actualDraftFiles: snapshot.draftFileCount,
    expectedRouteBindingPreviews: 4,
    actualRouteBindingPreviews: snapshot.routeBindingPreviewCount,
    readyForDraftPackageReview: readiness.readyForDraftPackageReview,
    readyForRouteSourcePatchNow: false,
    routeSourceFilesWrittenNow: false,
    draftFilesGeneratedNow: false,
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
      ? "138P draft package is review-only; it creates no route source files, mounts no route, calls no provider, mutates no Wallet, moves no money, and keeps app server plus stream index untouched."
      : "138P draft package requires review before any future source generation or mount approval.",
  };
}
