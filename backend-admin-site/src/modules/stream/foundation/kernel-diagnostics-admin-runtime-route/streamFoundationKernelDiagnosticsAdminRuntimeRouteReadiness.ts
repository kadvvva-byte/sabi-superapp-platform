import { getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot } from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteHandlerFactory";
import type { StreamFoundationKernelDiagnosticsAdminRuntimeRouteStatus } from "./streamFoundationKernelDiagnosticsAdminRuntimeRouteContracts";

export interface StreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness {
  readonly version: "BACKEND-STREAM-FOUNDATION-139K";
  readonly status: StreamFoundationKernelDiagnosticsAdminRuntimeRouteStatus;
  readonly ready: boolean;
  readonly definitionCount: number;
  readonly sourceReadyNow: true;
  readonly routeSourceWrittenInFoundationNow: true;
  readonly mountedDefinitionCount: 0;
  readonly protectedRouteRegisteredCount: 0;
  readonly routeMountAllowedNow: false;
  readonly runtimeActivationAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness(): StreamFoundationKernelDiagnosticsAdminRuntimeRouteReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsAdminRuntimeRouteSnapshot();
  return {
    version: snapshot.version,
    status: snapshot.status,
    ready: snapshot.status === "runtime_route_source_ready_unmounted" && snapshot.definitionCount > 0,
    definitionCount: snapshot.definitionCount,
    sourceReadyNow: true,
    routeSourceWrittenInFoundationNow: true,
    mountedDefinitionCount: 0,
    protectedRouteRegisteredCount: 0,
    routeMountAllowedNow: false,
    runtimeActivationAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
  };
}
