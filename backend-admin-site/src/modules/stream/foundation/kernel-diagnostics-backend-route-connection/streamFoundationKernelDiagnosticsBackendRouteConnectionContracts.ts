import type {
  StreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler,
  StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse,
} from "../kernel-diagnostics-admin-runtime-route";
import type {
  StreamFoundationKernelDiagnosticsAdminRouteAuthScope,
  StreamFoundationKernelDiagnosticsAdminRouteId,
  StreamFoundationKernelDiagnosticsAdminRouteMethod,
  StreamFoundationKernelDiagnosticsAdminRoutePath,
} from "../kernel-diagnostics-admin-route";

export const STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION = "BACKEND-STREAM-FOUNDATION-140A" as const;

export type StreamFoundationKernelDiagnosticsBackendRouteConnectionStatus =
  | "controlled_backend_route_connection_source_ready_unmounted"
  | "controlled_backend_route_connection_source_blocked";

export type StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceRole =
  | "connection_contracts"
  | "mount_plan"
  | "handler_bridge"
  | "response_adapter"
  | "readiness"
  | "smoke"
  | "index";

export type StreamFoundationKernelDiagnosticsBackendRouteConnectionAdapterKind =
  | "backend_route_definition"
  | "protected_route_shell"
  | "runtime_handler_bridge"
  | "redacted_response_adapter";

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly backendRouteConnectionSourceWrittenInsideFoundationNow: true;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly backendEntryPatchIncluded: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
  readonly runtimeHttpRequestPerformedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile {
  readonly role: StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceRole;
  readonly path: string;
  readonly scope: "src/modules/stream/foundation/** only";
  readonly writtenInsideFoundationNow: true;
  readonly includesStreamIndexPatch: false;
  readonly includesBackendEntryPatch: false;
  readonly includesAppServerPatch: false;
  readonly includesRuntimeMount: false;
  readonly includesDatabaseExecution: false;
  readonly includesProviderCall: false;
  readonly includesWalletMutation: false;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlan {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly method: StreamFoundationKernelDiagnosticsAdminRouteMethod;
  readonly path: StreamFoundationKernelDiagnosticsAdminRoutePath;
  readonly adapterKind: StreamFoundationKernelDiagnosticsBackendRouteConnectionAdapterKind;
  readonly requiredScopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly sourceReadyNow: true;
  readonly mountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly runtimeHandlerBridgeReadyNow: true;
  readonly responseAdapterReadyNow: true;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionContext {
  readonly adminUserId?: string;
  readonly requestId?: string;
  readonly locale?: string;
  readonly scopes?: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly body?: Readonly<Record<string, unknown>>;
  readonly sourceIpHash?: string;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionRequest {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly context?: StreamFoundationKernelDiagnosticsBackendRouteConnectionContext;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionEnvelope {
  readonly version: typeof STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION;
  readonly ok: boolean;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly sourceReadyNow: true;
  readonly mountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly statusCode: 200 | 403 | 404 | 409;
  readonly safeCode: string;
  readonly safeMessageKey: string;
  readonly runtimeResponse: StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse;
  readonly rawSecretFieldsReturned: 0;
  readonly providerCallsPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly safety: StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety;
}

export type StreamFoundationKernelDiagnosticsBackendRouteConnectionHandler = (
  request: StreamFoundationKernelDiagnosticsBackendRouteConnectionRequest,
) => StreamFoundationKernelDiagnosticsBackendRouteConnectionEnvelope;

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionHandlerBridge {
  readonly bridgeId: "stream_kernel_diagnostics_backend_route_connection_handler_bridge";
  readonly version: typeof STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION;
  readonly sourceReadyNow: true;
  readonly mountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly runtimeHandler: StreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler;
  readonly backendHandler: StreamFoundationKernelDiagnosticsBackendRouteConnectionHandler;
  readonly safety: StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionGateItem {
  readonly gateId: string;
  readonly area:
    | "previous_owner_approved_package"
    | "source_only_scope"
    | "route_plan"
    | "handler_bridge"
    | "backend_entry_deferred"
    | "route_mount_deferred"
    | "runtime_execution_deferred"
    | "persistence_provider_wallet_deferred"
    | "secret_redaction"
    | "fake_success_block";
  readonly passed: boolean;
  readonly blocking: boolean;
  readonly expected: string;
  readonly observed: string;
  readonly remediation: string;
  readonly safeCode: string;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionDecision {
  readonly decisionCode:
    | "controlled_backend_route_connection_source_ready_unmounted"
    | "controlled_backend_route_connection_blocked_by_previous_gate"
    | "controlled_backend_route_connection_blocked_by_safety_gate";
  readonly backendRouteConnectionSourceReadyNow: boolean;
  readonly readyForControlledBackendEntryPatchReview: boolean;
  readonly readyForProductionBackend: false;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsBackendRouteConnectionSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140A_KERNEL_DIAGNOSTICS_BACKEND_ROUTE_CONNECTION_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsBackendRouteConnectionStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly sourceFiles: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionSourceFile[];
  readonly sourceFileCount: number;
  readonly routePlans: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionRoutePlan[];
  readonly routePlanCount: number;
  readonly gateItems: readonly StreamFoundationKernelDiagnosticsBackendRouteConnectionGateItem[];
  readonly gateItemCount: number;
  readonly passedGateItems: number;
  readonly blockingGateItems: number;
  readonly backendRouteConnectionSourceReadyNow: boolean;
  readonly readyForControlledBackendEntryPatchReview: boolean;
  readonly readyForProductionBackend: false;
  readonly routeMountAllowedNow: false;
  readonly routeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly runtimeHttpRequestsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly providerCallsPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
  readonly decision: StreamFoundationKernelDiagnosticsBackendRouteConnectionDecision;
  readonly safety: StreamFoundationKernelDiagnosticsBackendRouteConnectionSafety;
}
