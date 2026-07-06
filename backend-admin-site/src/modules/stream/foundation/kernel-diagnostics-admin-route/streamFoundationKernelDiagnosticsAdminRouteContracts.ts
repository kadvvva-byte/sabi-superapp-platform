import type {
  StreamFoundationKernelDiagnosticsAdminHandoffSnapshot,
  StreamFoundationKernelDiagnosticsAdminRequest,
} from "../kernel-diagnostics-admin-handoff";

export const STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION = "BACKEND-STREAM-FOUNDATION-138J" as const;

export type StreamFoundationKernelDiagnosticsAdminRouteMethod = "GET" | "POST";

export type StreamFoundationKernelDiagnosticsAdminRouteId =
  | "stream_kernel_diagnostics_snapshot"
  | "stream_kernel_diagnostics_blocked_findings"
  | "stream_kernel_diagnostics_readiness"
  | "stream_kernel_diagnostics_safe_summary";

export type StreamFoundationKernelDiagnosticsAdminRoutePath =
  | "/api/admin/stream/kernel/diagnostics/snapshot"
  | "/api/admin/stream/kernel/diagnostics/blocked-findings"
  | "/api/admin/stream/kernel/diagnostics/readiness"
  | "/api/admin/stream/kernel/diagnostics/safe-summary";

export type StreamFoundationKernelDiagnosticsAdminRouteAuthScope =
  | "admin:stream:read"
  | "admin:stream:diagnostics:read"
  | "admin:stream:monetization:read";

export interface StreamFoundationKernelDiagnosticsAdminRouteSafety {
  readonly streamIndexPatchIncluded: false;
  readonly adminUiFilesChangedNow: false;
  readonly adminRouteMountedNow: false;
  readonly expressRouterCreatedNow: false;
  readonly appServerTouchedNow: false;
  readonly routeMountAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly recipientEarningCreditAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteDefinition {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly method: StreamFoundationKernelDiagnosticsAdminRouteMethod;
  readonly path: StreamFoundationKernelDiagnosticsAdminRoutePath;
  readonly descriptionKey: string;
  readonly requiredScopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly responseShape: "redacted_admin_handoff_snapshot" | "redacted_findings_only" | "readiness_status" | "safe_summary";
  readonly mountedNow: false;
  readonly appServerPatchRequiredLater: true;
  readonly adminPermissionRequired: true;
  readonly returnsRawSecrets: false;
  readonly performsProviderCall: false;
  readonly performsDatabaseRead: false;
  readonly performsDatabaseWrite: false;
  readonly performsMoneyMovement: false;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteRequest {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly adminUserId?: string;
  readonly scopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly body?: Readonly<Record<string, unknown>>;
  readonly sourceIpHash?: string;
  readonly routeMountApproved: boolean;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteResponseEnvelope {
  readonly version: typeof STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION;
  readonly ok: true;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly mountedNow: false;
  readonly statusCode: 200;
  readonly safeCode: "stream_kernel_diagnostics_route_preview_ready";
  readonly safeMessageKey: string;
  readonly snapshot: StreamFoundationKernelDiagnosticsAdminHandoffSnapshot;
  readonly routeDefinition: StreamFoundationKernelDiagnosticsAdminRouteDefinition;
  readonly requestedAdminUserIdRedacted: string;
  readonly rawSecretFieldsReturned: 0;
  readonly providerCallsPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRouteSafety;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope {
  readonly version: typeof STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION;
  readonly ok: false;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly mountedNow: false;
  readonly statusCode: 403 | 404 | 409;
  readonly safeCode:
    | "stream_kernel_diagnostics_route_unknown"
    | "stream_kernel_diagnostics_admin_scope_missing"
    | "stream_kernel_diagnostics_route_mount_still_blocked";
  readonly safeMessageKey: string;
  readonly missingScopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly rawSecretFieldsReturned: 0;
  readonly providerCallsPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRouteSafety;
}

export type StreamFoundationKernelDiagnosticsAdminRouteEnvelope =
  | StreamFoundationKernelDiagnosticsAdminRouteResponseEnvelope
  | StreamFoundationKernelDiagnosticsAdminRouteBlockedEnvelope;

export function toAdminHandoffRequest(request: StreamFoundationKernelDiagnosticsAdminRouteRequest): StreamFoundationKernelDiagnosticsAdminRequest {
  const includeBlockedFindingsOnly = request.routeId === "stream_kernel_diagnostics_blocked_findings" || request.query?.blockedOnly === "true";
  return {
    mode: "admin_redacted_snapshot",
    adminUserId: request.adminUserId,
    includeBlockedFindingsOnly,
    routeMountApproved: request.routeMountApproved,
    repositoryBound: false,
    providerConfigured: false,
    walletLedgerBound: false,
    paymentAuthorizationBound: false,
    monthlyPayoutBatchBound: false,
    mediaRealtimeBound: false,
    adminPermissionBound: request.scopes.length > 0,
  };
}
