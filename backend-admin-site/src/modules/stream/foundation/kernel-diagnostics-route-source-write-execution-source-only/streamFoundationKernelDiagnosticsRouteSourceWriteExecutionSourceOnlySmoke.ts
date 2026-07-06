import { getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnly";
import { getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness";
import { STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION;
  readonly passed: boolean;
  readonly readyForSourceOnlyExecutionPackage: boolean;
  readonly expectedTargetFileCount: 6;
  readonly actualTargetFileCount: number;
  readonly outsideFoundationWriteCount: 0;
  readonly routeSourceFilesWrittenInsideFoundationPackageNow: true;
  readonly routeSourceFilesWrittenOutsideFoundationNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeSourceMountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noPaymentAuthorization: boolean;
  readonly noMonthlyPayout: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly safeSummary: string;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness();
  const filePlansSafe = snapshot.filePlans.every(
    (file) => file.insideFoundationScope && !file.includesExpressImport && !file.mountsRoute && !file.executesDatabase && !file.executesProviderCall && !file.mutatesWallet && !file.movesMoney && !file.returnsRawSecrets,
  );
  const passed =
    readiness.readyForSourceOnlyExecutionPackage &&
    snapshot.targetFileCount === 6 &&
    snapshot.outsideFoundationWriteCount === 0 &&
    snapshot.routeSourceFilesWrittenInsideFoundationPackageNow === true &&
    snapshot.routeSourceFilesWrittenOutsideFoundationNow === false &&
    snapshot.routeMountApprovedNow === false &&
    snapshot.routeSourceMountedNow === false &&
    snapshot.protectedRouteRegisteredNow === false &&
    snapshot.streamIndexPatchIncluded === false &&
    snapshot.streamModuleIndexTouchedNow === false &&
    snapshot.appServerPatchIncluded === false &&
    snapshot.appServerTouchedNow === false &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.paymentAuthorizationPerformed === 0 &&
    snapshot.monthlyPayoutPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    filePlansSafe;

  return {
    version: STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION,
    passed,
    readyForSourceOnlyExecutionPackage: readiness.readyForSourceOnlyExecutionPackage,
    expectedTargetFileCount: 6,
    actualTargetFileCount: snapshot.targetFileCount,
    outsideFoundationWriteCount: 0,
    routeSourceFilesWrittenInsideFoundationPackageNow: true,
    routeSourceFilesWrittenOutsideFoundationNow: false,
    routeMountApprovedNow: false,
    routeSourceMountedNow: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noPaymentAuthorization: snapshot.paymentAuthorizationPerformed === 0,
    noMonthlyPayout: snapshot.monthlyPayoutPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    safeSummary: passed
      ? "138Y source-only execution package is safe: it stays inside src/modules/stream/foundation, keeps stream index and app/server untouched, mounts no route, performs no HTTP runtime request, calls no provider, mutates no Wallet, moves no money and exposes no secrets."
      : "138Y source-only execution package remains blocked until every target path is foundation-only and every runtime/provider/Wallet/money movement/secret guard stays false.",
  };
}
