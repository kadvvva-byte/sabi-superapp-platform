import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "../kernel-diagnostics-admin-route";
import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_SAFETY,
  getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReport,
} from "../kernel-diagnostics-admin-route-unmounted-smoke";
import {
  STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteMountCandidate,
  type StreamFoundationKernelDiagnosticsRouteMountGateCheck,
  type StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety,
  type StreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot,
  type StreamFoundationKernelDiagnosticsRouteMountReadinessGateStatus,
} from "./streamFoundationKernelDiagnosticsRouteMountReadinessGateContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_SAFETY: StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_SAFETY,
  routeMountReadinessGateOnly: true,
  sourcePatchForRouteMountCreatedNow: false,
  sourcePatchForStreamIndexCreatedNow: false,
  appServerPatchCreatedNow: false,
  protectedRouteRegisteredNow: false,
  routeMountExecutedNow: false,
  routeMountApprovedNow: false,
  realHttpEndpointReachableNow: false,
  routeMountAllowedInThisPatch: false,
};

function buildCandidates(): readonly StreamFoundationKernelDiagnosticsRouteMountCandidate[] {
  return STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.map((definition) => ({
    routeId: definition.routeId,
    path: definition.path,
    definition,
    mayBeMountedInFutureProtectedAdminRoute: true,
    mountedNow: false,
    requiresAppServerPatchLater: true,
    requiresProtectedAdminMiddlewareLater: true,
    returnsRawSecrets: false,
    performsProviderCall: false,
    performsDatabaseExecution: false,
    performsWalletMutation: false,
    performsMoneyMovement: false,
  }));
}

function gateCheck(gateName: StreamFoundationKernelDiagnosticsRouteMountGateCheck["gateName"], passed: boolean): StreamFoundationKernelDiagnosticsRouteMountGateCheck {
  return {
    gateName,
    passed,
    requiredForFutureMount: true,
    safeCode: passed ? `stream_kernel_diagnostics_${gateName}_passed` : `stream_kernel_diagnostics_${gateName}_blocked`,
    safeMessageKey: passed ? `stream.kernel.diagnostics.${gateName}.passed` : `stream.kernel.diagnostics.${gateName}.blocked`,
  };
}

function deriveStatus(
  unmountedSmokePassed: boolean,
  failedGateChecks: number,
): StreamFoundationKernelDiagnosticsRouteMountReadinessGateStatus {
  if (!unmountedSmokePassed) return "route_mount_blocked_by_unmounted_smoke";
  if (failedGateChecks > 0) return "route_mount_blocked_by_safety_violation";
  return "route_mount_source_patch_review_ready_later";
}

export function getStreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot(): StreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot {
  const unmountedSmokeReport = getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeReport();
  const candidates = buildCandidates();
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_SAFETY;

  const gateChecks: readonly StreamFoundationKernelDiagnosticsRouteMountGateCheck[] = [
    gateCheck("unmounted_smoke_passed", unmountedSmokeReport.passed),
    gateCheck("protected_admin_scope_model_ready", candidates.every((candidate) => candidate.definition.adminPermissionRequired)),
    gateCheck("redacted_response_envelope_ready", candidates.every((candidate) => candidate.returnsRawSecrets === false)),
    gateCheck("raw_secret_return_blocked", unmountedSmokeReport.rawSecretsReturned === 0 && safety.rawSecretsReturned === false),
    gateCheck("provider_calls_blocked", unmountedSmokeReport.providerCallsPerformed === 0 && safety.providerCallAllowedNow === false),
    gateCheck("database_execution_blocked", unmountedSmokeReport.databaseExecutionPerformed === 0 && safety.databaseWriteAllowedNow === false),
    gateCheck("wallet_mutation_blocked", unmountedSmokeReport.walletMutationPerformed === 0 && safety.walletMutationAllowedNow === false),
    gateCheck("money_movement_blocked", unmountedSmokeReport.moneyMovementPerformed === 0 && safety.moneyMovementAllowedNow === false),
    gateCheck("runtime_http_requests_blocked", unmountedSmokeReport.runtimeHttpRequestsPerformed === 0 && safety.runtimeHttpRequestPerformedNow === false),
    gateCheck("app_server_patch_separate_approval_required", unmountedSmokeReport.requiresSeparateRouteMountApproval),
    gateCheck("stream_index_patch_not_included", unmountedSmokeReport.streamIndexPatchIncluded === false && safety.streamIndexPatchIncluded === false),
  ];

  const passedGateChecks = gateChecks.filter((check) => check.passed).length;
  const failedGateChecks = gateChecks.length - passedGateChecks;
  const status = deriveStatus(unmountedSmokeReport.passed, failedGateChecks);
  const futureMountSourcePatchReviewReady = status === "route_mount_source_patch_review_ready_later";

  return {
    version: STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION,
    gateId: "stream_kernel_diagnostics_route_mount_readiness_gate",
    status,
    patchScope: "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    candidates,
    candidateCount: candidates.length,
    mountedCandidateCount: 0,
    gateChecks,
    passedGateChecks,
    failedGateChecks,
    futureMountSourcePatchReviewReady,
    readyForRouteMountNow: false,
    requiresSeparateRouteMountApproval: true,
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
    safety,
  };
}
