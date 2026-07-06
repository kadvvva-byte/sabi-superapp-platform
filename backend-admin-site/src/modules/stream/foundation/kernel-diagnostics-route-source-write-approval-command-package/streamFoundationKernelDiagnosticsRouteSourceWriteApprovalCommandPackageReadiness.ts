import { getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness } from "../kernel-diagnostics-route-source-generation-final-review-package";
import { getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackage";
import { STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION;
  readonly readyForWriteApprovalCommandPackage: boolean;
  readonly readyForOwnerWriteApproval: boolean;
  readonly readyForRouteSourceWriteNow: false;
  readonly writeApprovalCommandPackageOnly: true;
  readonly writeApprovalCommandBuiltNow: true;
  readonly finalReviewReady: boolean;
  readonly expectedCommandItemCount: 9;
  readonly actualCommandItemCount: number;
  readonly blockingCommandItemCount: number;
  readonly expectedCommandPreviewCount: 5;
  readonly actualCommandPreviewCount: number;
  readonly executableCommandPreviewCount: 0;
  readonly executedCommandCount: 0;
  readonly allCommandPreviewsBlockedAndSafe: boolean;
  readonly allRequiredCommandItemsPassed: boolean;
  readonly ownerWriteApprovalCapturedNow: false;
  readonly ownerWriteApprovalPersistedNow: false;
  readonly commandExecutionApprovedNow: false;
  readonly commandExecutionPerformedNow: false;
  readonly routeSourceWriteCommandExecutedNow: false;
  readonly executableCommandTextReturnedNow: false;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness(): StreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageReadiness {
  const finalReviewReadiness = getStreamFoundationKernelDiagnosticsRouteSourceGenerationFinalReviewPackageReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceWriteApprovalCommandPackageSnapshot();
  const allCommandPreviewsBlockedAndSafe = snapshot.commandPreviews.every(
    (item) =>
      item.previewOnly &&
      item.allowedToExecuteNow === false &&
      item.executableCommandTextReturnedNow === false &&
      item.routeSourceFilesWrittenNow === false &&
      item.routeMountPerformedNow === false &&
      item.touchesStreamIndex === false &&
      item.touchesAppServer === false &&
      item.touchesWalletMessengerAdmin === false &&
      item.touchesPrismaOrEnv === false,
  );
  const allRequiredCommandItemsPassed = snapshot.commandItems.every((item) => item.passed || !item.blocking);

  return {
    version: STREAM_FOUNDATION_138V_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_APPROVAL_COMMAND_PACKAGE_VERSION,
    readyForWriteApprovalCommandPackage:
      finalReviewReadiness.readyForFinalReview &&
      snapshot.writeApprovalCommandBuiltNow &&
      snapshot.commandItemCount === 9 &&
      snapshot.commandPreviewCount === 5 &&
      snapshot.executableCommandPreviewCount === 0 &&
      snapshot.executedCommandCount === 0 &&
      snapshot.ownerWriteApprovalCapturedNow === false &&
      snapshot.ownerWriteApprovalPersistedNow === false &&
      snapshot.commandExecutionApprovedNow === false &&
      snapshot.commandExecutionPerformedNow === false &&
      snapshot.routeSourceWriteCommandExecutedNow === false &&
      snapshot.executableCommandTextReturnedNow === false &&
      snapshot.routeSourceFilesWrittenNow === false &&
      snapshot.implementationSourceFilesGeneratedNow === false &&
      snapshot.implementationSourceTextReturnedNow === false &&
      snapshot.routeMountPerformed === false &&
      allCommandPreviewsBlockedAndSafe &&
      allRequiredCommandItemsPassed,
    readyForOwnerWriteApproval: snapshot.readyForOwnerWriteApproval,
    readyForRouteSourceWriteNow: false,
    writeApprovalCommandPackageOnly: true,
    writeApprovalCommandBuiltNow: true,
    finalReviewReady: finalReviewReadiness.readyForFinalReview,
    expectedCommandItemCount: 9,
    actualCommandItemCount: snapshot.commandItemCount,
    blockingCommandItemCount: snapshot.blockingCommandItemCount,
    expectedCommandPreviewCount: 5,
    actualCommandPreviewCount: snapshot.commandPreviewCount,
    executableCommandPreviewCount: 0,
    executedCommandCount: 0,
    allCommandPreviewsBlockedAndSafe,
    allRequiredCommandItemsPassed,
    ownerWriteApprovalCapturedNow: false,
    ownerWriteApprovalPersistedNow: false,
    commandExecutionApprovedNow: false,
    commandExecutionPerformedNow: false,
    routeSourceWriteCommandExecutedNow: false,
    executableCommandTextReturnedNow: false,
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
