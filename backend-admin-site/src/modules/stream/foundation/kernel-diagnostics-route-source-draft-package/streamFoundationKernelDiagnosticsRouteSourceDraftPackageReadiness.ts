import { getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness } from "../kernel-diagnostics-route-source-approval-package";
import { getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackage";
import { STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceDraftPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION;
  readonly readyForDraftPackageReview: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly routeSourceFilesWrittenNow: false;
  readonly draftFilesGeneratedNow: false;
  readonly routeMountPerformed: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly approvalPackageReady: boolean;
  readonly allDraftFilesReviewOnly: boolean;
  readonly allRouteBindingsStillUnmounted: boolean;
  readonly noForbiddenTargetsIncluded: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly appServerPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness(): StreamFoundationKernelDiagnosticsRouteSourceDraftPackageReadiness {
  const approvalReadiness = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceDraftPackageSnapshot();
  const allDraftFilesReviewOnly = snapshot.draftFiles.every((item) => item.includedInThisPatch === false && item.generatedNow === false);
  const allRouteBindingsStillUnmounted = snapshot.routeBindingPreviews.every((item) => item.generatedNow === false && item.mountedNow === false);

  return {
    version: STREAM_FOUNDATION_138P_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_DRAFT_PACKAGE_VERSION,
    readyForDraftPackageReview:
      approvalReadiness.readyForOwnerApprovalPackageReview &&
      snapshot.readyForDraftPackageReview &&
      allDraftFilesReviewOnly &&
      allRouteBindingsStillUnmounted,
    readyForRouteSourcePatchNow: false,
    routeSourceFilesWrittenNow: false,
    draftFilesGeneratedNow: false,
    routeMountPerformed: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    approvalPackageReady: approvalReadiness.readyForOwnerApprovalPackageReview,
    allDraftFilesReviewOnly,
    allRouteBindingsStillUnmounted,
    noForbiddenTargetsIncluded: snapshot.forbiddenTargetsIncluded === 0,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
  };
}
