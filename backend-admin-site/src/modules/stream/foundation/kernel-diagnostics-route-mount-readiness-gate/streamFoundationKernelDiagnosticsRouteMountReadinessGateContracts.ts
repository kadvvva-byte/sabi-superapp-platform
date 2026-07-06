import type { StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety } from "../kernel-diagnostics-admin-route-unmounted-smoke";
import type {
  StreamFoundationKernelDiagnosticsAdminRouteDefinition,
  StreamFoundationKernelDiagnosticsAdminRouteId,
  StreamFoundationKernelDiagnosticsAdminRoutePath,
} from "../kernel-diagnostics-admin-route";

export const STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-138M" as const;

export type StreamFoundationKernelDiagnosticsRouteMountReadinessGateId =
  | "stream_kernel_diagnostics_route_mount_readiness_gate"
  | "stream_kernel_diagnostics_route_mount_scope_gate"
  | "stream_kernel_diagnostics_route_mount_safety_gate"
  | "stream_kernel_diagnostics_route_mount_external_dependency_gate";

export type StreamFoundationKernelDiagnosticsRouteMountReadinessGateStatus =
  | "route_mount_not_allowed_in_foundation_patch"
  | "route_mount_source_patch_review_ready_later"
  | "route_mount_blocked_by_unmounted_smoke"
  | "route_mount_blocked_by_safety_violation"
  | "route_mount_blocked_by_external_dependency";

export type StreamFoundationKernelDiagnosticsRouteMountGateName =
  | "unmounted_smoke_passed"
  | "protected_admin_scope_model_ready"
  | "redacted_response_envelope_ready"
  | "raw_secret_return_blocked"
  | "provider_calls_blocked"
  | "database_execution_blocked"
  | "wallet_mutation_blocked"
  | "money_movement_blocked"
  | "runtime_http_requests_blocked"
  | "app_server_patch_separate_approval_required"
  | "stream_index_patch_not_included";

export interface StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety extends StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety {
  readonly routeMountReadinessGateOnly: true;
  readonly sourcePatchForRouteMountCreatedNow: false;
  readonly sourcePatchForStreamIndexCreatedNow: false;
  readonly appServerPatchCreatedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly routeMountExecutedNow: false;
  readonly routeMountApprovedNow: false;
  readonly realHttpEndpointReachableNow: false;
  readonly routeMountAllowedInThisPatch: false;
}

export interface StreamFoundationKernelDiagnosticsRouteMountGateCheck {
  readonly gateName: StreamFoundationKernelDiagnosticsRouteMountGateName;
  readonly passed: boolean;
  readonly requiredForFutureMount: true;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsRouteMountCandidate {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly path: StreamFoundationKernelDiagnosticsAdminRoutePath;
  readonly definition: StreamFoundationKernelDiagnosticsAdminRouteDefinition;
  readonly mayBeMountedInFutureProtectedAdminRoute: boolean;
  readonly mountedNow: false;
  readonly requiresAppServerPatchLater: true;
  readonly requiresProtectedAdminMiddlewareLater: true;
  readonly returnsRawSecrets: false;
  readonly performsProviderCall: false;
  readonly performsDatabaseExecution: false;
  readonly performsWalletMutation: false;
  readonly performsMoneyMovement: false;
}

export interface StreamFoundationKernelDiagnosticsRouteMountReadinessGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138M_KERNEL_DIAGNOSTICS_ROUTE_MOUNT_READINESS_GATE_VERSION;
  readonly gateId: StreamFoundationKernelDiagnosticsRouteMountReadinessGateId;
  readonly status: StreamFoundationKernelDiagnosticsRouteMountReadinessGateStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly streamIndexPatchIncluded: false;
  readonly candidates: readonly StreamFoundationKernelDiagnosticsRouteMountCandidate[];
  readonly candidateCount: number;
  readonly mountedCandidateCount: 0;
  readonly gateChecks: readonly StreamFoundationKernelDiagnosticsRouteMountGateCheck[];
  readonly passedGateChecks: number;
  readonly failedGateChecks: number;
  readonly futureMountSourcePatchReviewReady: boolean;
  readonly readyForRouteMountNow: false;
  readonly requiresSeparateRouteMountApproval: true;
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
  readonly safety: StreamFoundationKernelDiagnosticsRouteMountReadinessGateSafety;
}
