import type {
  StreamFoundationKernelDiagnosticsAdminRouteAuthScope,
  StreamFoundationKernelDiagnosticsAdminRouteEnvelope,
  StreamFoundationKernelDiagnosticsAdminRouteId,
} from "../kernel-diagnostics-admin-route";
import type { StreamFoundationKernelDiagnosticsAdminRouteFactorySafety } from "../kernel-diagnostics-admin-route-factory";

export const STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION = "BACKEND-STREAM-FOUNDATION-138L" as const;

export type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseId =
  | "snapshot_preview_success"
  | "blocked_findings_preview_success"
  | "readiness_preview_success"
  | "safe_summary_preview_success"
  | "missing_scope_blocked"
  | "route_mount_approved_blocked";

export type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeStatus =
  | "unmounted_smoke_passed"
  | "unmounted_smoke_failed";

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety extends StreamFoundationKernelDiagnosticsAdminRouteFactorySafety {
  readonly unmountedSmokeOnly: true;
  readonly runtimeHttpRequestPerformedNow: false;
  readonly actualAdminRouteRegisteredNow: false;
  readonly actualAdminRouteMountedNow: false;
  readonly actualExpressRouterCreatedNow: false;
  readonly actualExpressMiddlewareTouchedNow: false;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCase {
  readonly caseId: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseId;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly scopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly routeMountApproved: boolean;
  readonly expectedOk: boolean;
  readonly expectedStatusCode: 200 | 403 | 409;
  readonly expectedHandlerFound: true;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseResult {
  readonly caseId: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseId;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly handlerFound: boolean;
  readonly expectedOk: boolean;
  readonly actualOk: boolean;
  readonly expectedStatusCode: 200 | 403 | 409;
  readonly actualStatusCode: 200 | 403 | 404 | 409;
  readonly mountedNow: false;
  readonly expressRouterBoundNow: false;
  readonly rawSecretFieldsReturned: 0;
  readonly providerCallsPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly envelopeSafeCode: StreamFoundationKernelDiagnosticsAdminRouteEnvelope["safeCode"];
  readonly passed: boolean;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly streamIndexPatchIncluded: false;
  readonly cases: readonly StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseResult[];
  readonly checkedCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly allHandlersFound: boolean;
  readonly allRoutesUnmounted: boolean;
  readonly allResponsesRedacted: boolean;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly fakeSuccessAllowed: false;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety;
}
