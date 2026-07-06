import { getStreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateReadiness } from "../kernel-diagnostics-route-source-write-final-owner-approval-gate";
import { getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnly";
import { STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness {
  readonly version: typeof STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION;
  readonly readyForSourceOnlyExecutionPackage: boolean;
  readonly finalOwnerApprovalGateReadyForReview: boolean;
  readonly sourceOnlyPatchReady: boolean;
  readonly expectedTargetFileCount: 6;
  readonly actualTargetFileCount: number;
  readonly outsideFoundationWriteCount: 0;
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
}

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness(): StreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlyReadiness {
  const ownerReadiness = getStreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionSourceOnlySnapshot();
  const allFilesSafe = snapshot.filePlans.every(
    (file) => file.insideFoundationScope && !file.includesExpressImport && !file.mountsRoute && !file.executesDatabase && !file.executesProviderCall && !file.mutatesWallet && !file.movesMoney && !file.returnsRawSecrets,
  );
  const safetyPassed =
    snapshot.runtimeHttpRequestsPerformed === 0 &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.paymentAuthorizationPerformed === 0 &&
    snapshot.monthlyPayoutPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.mobileProviderKeysAllowed === false &&
    snapshot.fakeSuccessAllowed === false;

  return {
    version: STREAM_FOUNDATION_138Y_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_SOURCE_ONLY_VERSION,
    readyForSourceOnlyExecutionPackage:
      ownerReadiness.readyForFinalOwnerApprovalGate &&
      snapshot.sourceOnlyExecutionPackageBuiltNow &&
      snapshot.decision.sourceOnlyPatchReady &&
      snapshot.targetFileCount === 6 &&
      snapshot.outsideFoundationWriteCount === 0 &&
      snapshot.routeSourceFilesWrittenOutsideFoundationNow === false &&
      snapshot.routeMountApprovedNow === false &&
      snapshot.routeSourceMountedNow === false &&
      snapshot.protectedRouteRegisteredNow === false &&
      snapshot.streamIndexPatchIncluded === false &&
      snapshot.streamModuleIndexTouchedNow === false &&
      snapshot.appServerPatchIncluded === false &&
      snapshot.appServerTouchedNow === false &&
      allFilesSafe &&
      safetyPassed,
    finalOwnerApprovalGateReadyForReview: ownerReadiness.readyForFinalOwnerApprovalGate,
    sourceOnlyPatchReady: snapshot.decision.sourceOnlyPatchReady,
    expectedTargetFileCount: 6,
    actualTargetFileCount: snapshot.targetFileCount,
    outsideFoundationWriteCount: 0,
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
  };
}
