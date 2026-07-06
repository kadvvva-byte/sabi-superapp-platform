import { getStreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness } from "./streamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness";
import { getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot } from "./streamFoundationKernelDiagnosticsRouteMountReadinessGate";
import { STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION } from "./streamFoundationKernelDiagnosticsRouteMountReadinessGateContracts";

export interface StreamFoundationKernelDiagnosticsRouteMountReadinessGateSmoke {
  readonly version: typeof STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION;
  readonly passed: boolean;
  readonly futureRouteMountSourcePatchReviewReady: boolean;
  readonly readyForRouteMountNow: false;
  readonly candidateCount: number;
  readonly mountedCandidateCount: 0;
  readonly gateChecks: number;
  readonly failedGateChecks: number;
  readonly routeMountPerformed: false;
  readonly protectedRouteRegisteredNow: false;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSmoke(): StreamFoundationKernelDiagnosticsRouteMountReadinessGateSmoke {
  const snapshot = getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot();
  const readiness = getStreamFoundationKernelDiagnosticsRouteMountReadinessGateReadiness();
  const passed =
    readiness.readyForRouteMountReadinessReview &&
    readiness.futureRouteMountSourcePatchReviewReady &&
    readiness.readyForRouteMountNow === false &&
    snapshot.mountedCandidateCount === 0 &&
    snapshot.routeMountPerformed === false &&
    snapshot.runtimeHttpRequestsPerformed === 0 &&
    snapshot.providerCallsPerformed === 0 &&
    snapshot.databaseExecutionPerformed === 0 &&
    snapshot.walletMutationPerformed === 0 &&
    snapshot.moneyMovementPerformed === 0 &&
    snapshot.rawSecretsReturned === 0 &&
    snapshot.fakeSuccessAllowed === false;

  return {
    version: STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION,
    passed,
    futureRouteMountSourcePatchReviewReady: readiness.futureRouteMountSourcePatchReviewReady,
    readyForRouteMountNow: false,
    candidateCount: snapshot.candidateCount,
    mountedCandidateCount: 0,
    gateChecks: snapshot.gateChecks.length,
    failedGateChecks: snapshot.failedGateChecks,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    streamIndexPatchIncluded: false,
  };
}
