import { getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackage";
import { getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness } from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness";
import { STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSmokeReport {
  readonly version: typeof STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION;
  readonly passed: boolean;
  readonly expectedCommandItemCount: 9;
  readonly actualCommandItemCount: number;
  readonly expectedCommandPreviewCount: 5;
  readonly actualCommandPreviewCount: number;
  readonly readyForWriteApprovalCommandPackage: boolean;
  readonly readyForRouteSourceWriteNow: false;
  readonly ownerWriteApprovalCapturedNow: false;
  readonly ownerWriteApprovalPersistedNow: false;
  readonly commandExecutionApprovedNow: false;
  readonly commandExecutionPerformedNow: false;
  readonly routeSourceWriteCommandExecutedNow: false;
  readonly executableCommandTextReturnedNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly implementationSourceFilesGeneratedNow: false;
  readonly implementationSourceTextReturnedNow: false;
  readonly generatedSourceTextPersistedNow: false;
  readonly generatedSourceTextPrintedNow: false;
  readonly routeMountApprovedNow: false;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly executableCommandPreviewCount: 0;
  readonly executedCommandCount: 0;
  readonly allCommandPreviewsBlockedAndSafe: boolean;
  readonly allRequiredCommandItemsPassed: boolean;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSmokeReport(): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSmokeReport {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness();
  const allCommandPreviewsBlockedAndSafe = snapshot.commandPreviews.every(
    (item) => item.previewOnly && item.allowedToExecuteNow === false && item.executableCommandTextReturnedNow === false && item.routeSourceFilesWrittenNow === false && item.routeMountPerformedNow === false,
  );
  const allRequiredCommandItemsPassed = snapshot.commandItems.every((item) => item.passed || !item.blocking);
  const passed =
    readiness.readyForWriteApprovalCommandPackage &&
    snapshot.commandItemCount === 9 &&
    snapshot.commandPreviewCount === 5 &&
    snapshot.executableCommandPreviewCount === 0 &&
    snapshot.executedCommandCount === 0 &&
    snapshot.readyForRouteSourceWriteNow === false &&
    snapshot.ownerWriteApprovalCapturedNow === false &&
    snapshot.ownerWriteApprovalPersistedNow === false &&
    snapshot.commandExecutionApprovedNow === false &&
    snapshot.commandExecutionPerformedNow === false &&
    snapshot.routeSourceWriteCommandExecutedNow === false &&
    snapshot.executableCommandTextReturnedNow === false &&
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
    allCommandPreviewsBlockedAndSafe &&
    allRequiredCommandItemsPassed;

  return {
    version: STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION,
    passed,
    expectedCommandItemCount: 9,
    actualCommandItemCount: snapshot.commandItemCount,
    expectedCommandPreviewCount: 5,
    actualCommandPreviewCount: snapshot.commandPreviewCount,
    readyForWriteApprovalCommandPackage: readiness.readyForWriteApprovalCommandPackage,
    readyForRouteSourceWriteNow: false,
    ownerWriteApprovalCapturedNow: false,
    ownerWriteApprovalPersistedNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeSourceWriteCommandExecutedNow: false,
    executableCommandTextReturnedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    generatedSourceTextPersistedNow: false,
    generatedSourceTextPrintedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    executableCommandPreviewCount: 0,
    executedCommandCount: 0,
    allCommandPreviewsBlockedAndSafe,
    allRequiredCommandItemsPassed,
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
      ? "138V write approval command package is preview-only; it executes no command, writes no route source, returns no executable command text, mounts no route, calls no provider, mutates no Wallet, moves no money, and keeps stream index plus app server untouched."
      : "138V write approval command package remains blocked until final review, owner write approval and separate route mount approval are handled later.",
  };
}
