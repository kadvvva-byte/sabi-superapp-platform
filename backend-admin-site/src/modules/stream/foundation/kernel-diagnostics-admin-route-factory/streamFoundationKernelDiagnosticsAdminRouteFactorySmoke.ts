import { previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler } from "./streamFoundationKernelDiagnosticsAdminRouteFactory";
import { getStreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness } from "./streamFoundationKernelDiagnosticsAdminRouteFactoryReadiness";
import { STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteFactoryContracts";

export interface StreamFoundationKernelDiagnosticsAdminRouteFactorySmoke {
  readonly version: typeof STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION;
  readonly checkedCases: number;
  readonly passedCases: number;
  readonly failedCases: number;
  readonly passed: boolean;
  readonly streamIndexPatchIncluded: false;
  readonly routeMountPerformed: false;
  readonly expressRouterCreated: false;
  readonly providerCallsPerformed: 0;
  readonly databaseExecutionPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly fakeSuccessAllowed: false;
}

export function getStreamFoundationKernelDiagnosticsAdminRouteFactorySmoke(): StreamFoundationKernelDiagnosticsAdminRouteFactorySmoke {
  const readiness = getStreamFoundationKernelDiagnosticsAdminRouteFactoryReadiness();
  const preview = previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler({
    routeId: "stream_kernel_diagnostics_snapshot",
    context: {
      adminUserId: "admin-smoke-user",
      scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
      routeMountApproved: false,
    },
  });
  const checks = [
    readiness.readyForUnmountedPreview,
    readiness.readyForExpressMountNow === false,
    readiness.requiresSeparateRouteMountApproval,
    readiness.allHandlersUnMounted,
    readiness.allHandlersSafeRedacted,
    readiness.allHandlersNoProviderCalls,
    readiness.allHandlersNoDatabaseExecution,
    readiness.allHandlersNoWalletMutation,
    readiness.allHandlersNoMoneyMovement,
    preview.handlerFound,
    preview.mountedNow === false,
    preview.expressRouterBoundNow === false,
    preview.envelope.rawSecretFieldsReturned === 0,
    preview.envelope.providerCallsPerformed === 0,
    preview.envelope.moneyMovementPerformed === 0,
  ];
  const passedCases = checks.filter(Boolean).length;
  return {
    version: STREAM_FOUNDATION_138K_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_VERSION,
    checkedCases: checks.length,
    passedCases,
    failedCases: checks.length - passedCases,
    passed: passedCases === checks.length,
    streamIndexPatchIncluded: false,
    routeMountPerformed: false,
    expressRouterCreated: false,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    fakeSuccessAllowed: false,
  };
}
