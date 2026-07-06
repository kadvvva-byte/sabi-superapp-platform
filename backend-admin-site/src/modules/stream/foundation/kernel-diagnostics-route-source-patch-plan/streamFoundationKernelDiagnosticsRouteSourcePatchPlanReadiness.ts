import { getStreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness } from "../kernel-diagnostics-route-mount-readiness-gate";
import { getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot } from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlan";
import { STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourcePatchPlanContracts";

export interface StreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness {
  readonly version: typeof STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION;
  readonly readyForRouteSourcePatchPlanReview: boolean;
  readonly futureRouteSourcePatchReviewReady: boolean;
  readonly readyForRouteSourcePatchNow: false;
  readonly routeSourcePatchCreatedNow: false;
  readonly routeMountPerformed: false;
  readonly requiresSeparateRouteSourceApproval: true;
  readonly requiresSeparateRouteMountApproval: true;
  readonly mountReadinessGateReady: boolean;
  readonly allRouteItemsStillUnmounted: boolean;
  readonly noForbiddenTargetsIncluded: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness(): StreamFoundationKernelDiagnosticsRouteSourcePatchPlanReadiness {
  const mountReadiness = getStreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteSourcePatchPlanSnapshot();
  const allRouteItemsStillUnmounted = snapshot.routeItems.every((item) => item.mountedNow === false && item.sourceCreatedNow === false);

  return {
    version: STREAM_FOUNDATION_138N_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_PATCH_PLAN_VERSION,
    readyForRouteSourcePatchPlanReview: mountReadiness.futureRouteMountSourcePatchReviewReady && snapshot.futureSourcePatchReviewReady && allRouteItemsStillUnmounted,
    futureRouteSourcePatchReviewReady: snapshot.futureSourcePatchReviewReady,
    readyForRouteSourcePatchNow: false,
    routeSourcePatchCreatedNow: false,
    routeMountPerformed: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    mountReadinessGateReady: mountReadiness.futureRouteMountSourcePatchReviewReady,
    allRouteItemsStillUnmounted,
    noForbiddenTargetsIncluded: snapshot.forbiddenTargetsIncluded === 0,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
  };
}
