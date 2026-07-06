import { getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness } from "../kernel-diagnostics-admin-route-unmounted-smoke";
import { getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountReadinessGate";
import { STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION } from "./streamFoundationKernelDiagnosticsRouteMountReadinessGateContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness {
  readonly version: typeof STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION;
  readonly readyForRouteMountReadinessReview: boolean;
  readonly futureRouteMountSourcePatchReviewReady: boolean;
  readonly readyForRouteMountNow: false;
  readonly routeMountPerformed: false;
  readonly requiresSeparateRouteMountApproval: true;
  readonly unmountedSmokeReady: boolean;
  readonly allGateChecksPassed: boolean;
  readonly allCandidatesStillUnmounted: boolean;
  readonly noRuntimeHttpRequests: boolean;
  readonly noProviderCalls: boolean;
  readonly noDatabaseExecution: boolean;
  readonly noWalletMutation: boolean;
  readonly noMoneyMovement: boolean;
  readonly noRawSecrets: boolean;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness(): StreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness {
  const unmountedSmokeReadiness = getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReadiness();
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot();
  const allGateChecksPassed = snapshot.failedGateChecks === 0;

  return {
    version: STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION,
    readyForRouteMountReadinessReview: unmountedSmokeReadiness.readyForUnmountedSmokeReview && allGateChecksPassed,
    futureRouteMountSourcePatchReviewReady: snapshot.futureMountSourcePatchReviewReady,
    readyForRouteMountNow: false,
    routeMountPerformed: false,
    requiresSeparateRouteMountApproval: true,
    unmountedSmokeReady: unmountedSmokeReadiness.readyForUnmountedSmokeReview,
    allGateChecksPassed,
    allCandidatesStillUnmounted: snapshot.mountedCandidateCount === 0,
    noRuntimeHttpRequests: snapshot.runtimeHttpRequestsPerformed === 0,
    noProviderCalls: snapshot.providerCallsPerformed === 0,
    noDatabaseExecution: snapshot.databaseExecutionPerformed === 0,
    noWalletMutation: snapshot.walletMutationPerformed === 0,
    noMoneyMovement: snapshot.moneyMovementPerformed === 0,
    noRawSecrets: snapshot.rawSecretsReturned === 0,
    streamIndexPatchIncluded: false,
  };
}
