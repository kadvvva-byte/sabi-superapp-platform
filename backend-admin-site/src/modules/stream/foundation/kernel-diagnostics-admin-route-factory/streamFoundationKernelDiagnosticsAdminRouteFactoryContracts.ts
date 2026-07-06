import type {
  StreamFoundationKernelDiagnosticsAdminRouteAuthScope,
  StreamFoundationKernelDiagnosticsAdminRouteEnvelope,
  StreamFoundationKernelDiagnosticsAdminRouteId,
  StreamFoundationKernelDiagnosticsAdminRouteMethod,
  StreamFoundationKernelDiagnosticsAdminRoutePath,
  StreamFoundationKernelDiagnosticsAdminRouteRequest,
  StreamFoundationKernelDiagnosticsAdminRouteSafety,
} from "../kernel-diagnostics-admin-route";

export const STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION = "BACKEND-STREAM-FOUNDATION-138K" as const;

export type StreamFoundationKernelDiagnosticsAdminRouteFactoryId =
  | "stream_kernel_diagnostics_admin_route_factory_unmounted"
  | "stream_kernel_diagnostics_admin_route_factory_preview_handler"
  | "stream_kernel_diagnostics_admin_route_factory_scope_guard"
  | "stream_kernel_diagnostics_admin_route_factory_redaction_guard";

export type StreamFoundationKernelDiagnosticsAdminRouteFactoryStatus =
  | "factory_ready_unmounted"
  | "blocked_route_mount_not_approved"
  | "blocked_scope_missing"
  | "blocked_unknown_route";

export interface StreamFoundationKernelDiagnosticsAdminRouteFactorySafety extends StreamFoundationKernelDiagnosticsAdminRouteSafety {
  readonly streamIndexPatchIncluded: false;
  readonly adminUiFilesChangedNow: false;
  readonly adminRouteMountedNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly appServerTouchedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeHandlerExecutesProviderCallNow: false;
  readonly routeHandlerExecutesDatabaseNow: false;
  readonly routeHandlerExecutesWalletNow: false;
  readonly routeHandlerExecutesMoneyMovementNow: false;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteFactoryHandlerContext {
  readonly adminUserId?: string;
  readonly scopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly body?: Readonly<Record<string, unknown>>;
  readonly sourceIpHash?: string;
  readonly routeMountApproved: boolean;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteFactoryHandler {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly method: StreamFoundationKernelDiagnosticsAdminRouteMethod;
  readonly path: StreamFoundationKernelDiagnosticsAdminRoutePath;
  readonly mountedNow: false;
  readonly expressRouterBoundNow: false;
  readonly requiredScopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly returnsRawSecrets: false;
  readonly executesDatabase: false;
  readonly executesProviderCall: false;
  readonly executesWalletMutation: false;
  readonly executesMoneyMovement: false;
  readonly preview: (context: StreamFoundationKernelDiagnosticsAdminRouteFactoryHandlerContext) => StreamFoundationKernelDiagnosticsAdminRouteEnvelope;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot {
  readonly version: typeof STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION;
  readonly factoryId: StreamFoundationKernelDiagnosticsAdminRouteFactoryId;
  readonly status: StreamFoundationKernelDiagnosticsAdminRouteFactoryStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly handlers: readonly StreamFoundationKernelDiagnosticsAdminRouteFactoryHandler[];
  readonly handlerCount: number;
  readonly mountedHandlerCount: 0;
  readonly expressRouterBoundCount: 0;
  readonly rawSecretReturningHandlers: 0;
  readonly providerCallingHandlers: 0;
  readonly databaseExecutingHandlers: 0;
  readonly walletMutatingHandlers: 0;
  readonly moneyMovementHandlers: 0;
  readonly mobileProviderKeyHandlers: 0;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRouteFactorySafety;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewRequest {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly context: StreamFoundationKernelDiagnosticsAdminRouteFactoryHandlerContext;
}

export interface StreamFoundationKernelDiagnosticsAdminRouteFactoryPreviewResult {
  readonly version: typeof STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly handlerFound: boolean;
  readonly mountedNow: false;
  readonly expressRouterBoundNow: false;
  readonly envelope: StreamFoundationKernelDiagnosticsAdminRouteEnvelope;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRouteFactorySafety;
}

export function toKernelDiagnosticsAdminRouteRequest(
  routeId: StreamFoundationKernelDiagnosticsAdminRouteId,
  context: StreamFoundationKernelDiagnosticsAdminRouteFactoryHandlerContext,
): StreamFoundationKernelDiagnosticsAdminRouteRequest {
  return {
    routeId,
    adminUserId: context.adminUserId,
    scopes: context.scopes,
    query: context.query,
    body: context.body,
    sourceIpHash: context.sourceIpHash,
    routeMountApproved: context.routeMountApproved,
  };
}
