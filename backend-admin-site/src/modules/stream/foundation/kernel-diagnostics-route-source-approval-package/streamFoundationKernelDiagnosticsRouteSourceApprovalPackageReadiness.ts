import { getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness } from "../kernel-diagnostics-route-source-patch-plan";
import { getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackage";
import { STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceApprovalPackageContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness {
  readonly version: typeof STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION;
  readonly readyForOwnerApprovalPackageReview: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly ownerApprovalCapturedNow: false;
  readonly routeSourcePatchAuthorizedNow: false;
  readonly routeSourcePatchGeneratedNow: false;
  readonly routeMountPerformed: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly sourcePatchPlanReady: boolean;
  readonly allChecklistItemsSatisfiedByFoundationContracts: boolean;
  readonly allRouteReviewsStillUnmounted: boolean;
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

export function getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness(): StreamFoundationKernelDiagnosticsRouteSourceApprovalPackageReadiness {
  const planReadiness = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourceApprovalPackageSnapshot();
  const allChecklistItemsSatisfiedByFoundationContracts = snapshot.checklist.every((item) => item.satisfiedByCurrentFoundationContracts);
  const allRouteReviewsStillUnmounted = snapshot.routeReviews.every((item) => item.mountedNow === false && item.sourceCreatedNow === false);

  return {
    version: STREAM_FOUNDATION_138O_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_APPROVAL_PACKAGE_VERSION,
    readyForOwnerApprovalPackageReview:
      planReadiness.readyForRouteSourcePatchPlanReview &&
      snapshot.readyForOwnerApprovalReview &&
      allChecklistItemsSatisfiedByFoundationContracts &&
      allRouteReviewsStillUnmounted,
    readyForRouteSourcePatchNow: false,
    ownerApprovalCapturedNow: false,
    routeSourcePatchAuthorizedNow: false,
    routeSourcePatchGeneratedNow: false,
    routeMountPerformed: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    sourcePatchPlanReady: planReadiness.readyForRouteSourcePatchPlanReview,
    allChecklistItemsSatisfiedByFoundationContracts,
    allRouteReviewsStillUnmounted,
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
