import type { StreamFoundationKernelDiagnosticsAdminRouteEnvelope } from "../kernel-diagnostics-admin-route";
import type {
  StreamFoundationKernelDiagnosticsAdminRouteAuthScope,
  StreamFoundationKernelDiagnosticsAdminRouteId,
  StreamFoundationKernelDiagnosticsAdminRouteMethod,
} from "../kernel-diagnostics-admin-route/streamFoundationKernelDiagnosticsAdminRouteContracts";

export const STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION = "BACKEND-STREAM-FOUNDATION-139K" as const;

export type StreamFoundationKernelDiagnosticsAdminRuntimeRouteStatus =
  | "runtime_route_source_ready_unmounted"
  | "runtime_route_source_blocked";

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteContext {
  readonly adminUserId?: string;
  readonly requestId?: string;
  readonly locale?: string;
  readonly scopes?: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly query?: Readonly<Record<string, string | undefined>>;
  readonly body?: Readonly<Record<string, unknown>>;
  readonly sourceIpHash?: string;
  readonly routeMountApproved?: boolean;
}

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteRequest {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly context?: StreamFoundationKernelDiagnosticsAdminRuntimeRouteContext;
}

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteSafety {
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly routeSourceWrittenInFoundationNow: true;
  readonly diagnosticsRouteRuntimeMountAllowedNow: false;
  readonly diagnosticsRouteRuntimeMountPerformedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly expressRouterCreatedNow: false;
  readonly expressRouterImportedNow: false;
  readonly expressRouterBoundNow: false;
  readonly streamIndexPatchIncluded: false;
  readonly streamModuleIndexTouchedNow: false;
  readonly appServerPatchIncluded: false;
  readonly appServerTouchedNow: false;
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

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinition {
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly method: StreamFoundationKernelDiagnosticsAdminRouteMethod;
  readonly path: string;
  readonly mountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly sourceReadyNow: true;
  readonly requiredScopes: readonly StreamFoundationKernelDiagnosticsAdminRouteAuthScope[];
  readonly safeCode: string;
  readonly safeMessageKey: string;
}

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse {
  readonly version: typeof STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION;
  readonly routeId: StreamFoundationKernelDiagnosticsAdminRouteId;
  readonly status: StreamFoundationKernelDiagnosticsAdminRuntimeRouteStatus;
  readonly mountedNow: false;
  readonly protectedRouteRegisteredNow: false;
  readonly envelope: StreamFoundationKernelDiagnosticsAdminRouteEnvelope;
  readonly safety: StreamFoundationKernelDiagnosticsAdminRuntimeRouteSafety;
}

export type StreamFoundationKernelDiagnosticsAdminRuntimeRouteHandler = (
  request: StreamFoundationKernelDiagnosticsAdminRuntimeRouteRequest,
) => StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse;

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot {
  readonly version: typeof STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION;
  readonly status: StreamFoundationKernelDiagnosticsAdminRuntimeRouteStatus;
  readonly patchScope: "src/modules/stream/foundation/** only";
  readonly sourceReadyNow: true;
  readonly routeSourceWrittenInFoundationNow: true;
  readonly definitions: readonly StreamFoundationKernelDiagnosticsAdminRuntimeRouteDefinition[];
  readonly definitionCount: number;
  readonly mountedDefinitionCount: 0;
  readonly protectedRouteRegisteredCount: 0;
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
  readonly safety: StreamFoundationKernelDiagnosticsAdminRuntimeRouteSafety;
}
