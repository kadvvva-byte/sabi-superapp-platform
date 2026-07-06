import { previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler } from "../kernel-diagnostics-admin-route-factory";
import {
  STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION,
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteRequest,
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse,
  type StreamFoundationKernelDiagnosticsAdminRuntimeRouteSafety,
} from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_SAFETY: StreamFoundationKernelDiagnosticsAdminRuntimeRouteSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  routeSourceWrittenInFoundationNow: true,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

export function mapStreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse(
  request: StreamFoundationKernelDiagnosticsAdminRuntimeRouteRequest,
): StreamFoundationKernelDiagnosticsAdminRuntimeRouteResponse {
  const context = request.context ?? {};
  const preview = previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler({
    routeId: request.routeId,
    context: {
      adminUserId: context.adminUserId,
      scopes: context.scopes ?? ["admin:stream:read", "admin:stream:diagnostics:read"],
      query: context.query,
      body: context.body,
      sourceIpHash: context.sourceIpHash,
      routeMountApproved: context.routeMountApproved ?? false,
    },
  });
  return {
    version: STREAM_FOUNDATION_139K_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_VERSION,
    routeId: request.routeId,
    status: preview.handlerFound ? "runtime_route_source_ready_unmounted" : "runtime_route_source_blocked",
    mountedNow: false,
    protectedRouteRegisteredNow: false,
    envelope: preview.envelope,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_RUNTIME_ROUTE_SAFETY,
  };
}
