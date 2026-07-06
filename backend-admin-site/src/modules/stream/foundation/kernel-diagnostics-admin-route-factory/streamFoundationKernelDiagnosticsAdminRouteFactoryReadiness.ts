import { getStreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot } from "./streamFoundationKernelDiagnosticsAdminRouteFactory";
import { STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteFactoryContracts";

export interface StreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness {
  readonly version: typeof STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION;
  readonly readyForUnmountedPreview: boolean;
  readonly readyForExpressMountNow: false;
  readonly requiresSeparateRouteMountApproval: true;
  readonly allHandlersUnMounted: boolean;
  readonly allHandlersSafeRedacted: boolean;
  readonly allHandlersNoProviderCalls: boolean;
  readonly allHandlersNoDatabaseExecution: boolean;
  readonly allHandlersNoWalletMutation: boolean;
  readonly allHandlersNoMoneyMovement: boolean;
  readonly streamIndexPatchIncluded: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness(): StreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness {
  const snapshot = getStreamFoundationKernelDiagnosticsAdminRouteFactorySnapshot();
  return {
    version: STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION,
    readyForUnmountedPreview: snapshot.handlerCount > 0,
    readyForExpressMountNow: false,
    requiresSeparateRouteMountApproval: true,
    allHandlersUnMounted: snapshot.mountedHandlerCount === 0 && snapshot.expressRouterBoundCount === 0,
    allHandlersSafeRedacted: snapshot.rawSecretReturningHandlers === 0 && snapshot.mobileProviderKeyHandlers === 0,
    allHandlersNoProviderCalls: snapshot.providerCallingHandlers === 0,
    allHandlersNoDatabaseExecution: snapshot.databaseExecutingHandlers === 0,
    allHandlersNoWalletMutation: snapshot.walletMutatingHandlers === 0,
    allHandlersNoMoneyMovement: snapshot.moneyMovementHandlers === 0,
    streamIndexPatchIncluded: false,
  };
}
