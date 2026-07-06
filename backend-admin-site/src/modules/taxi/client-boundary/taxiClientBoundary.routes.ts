import { getTaxiClientBoundarySnapshot } from './taxiClientBoundary.service';

export const taxiClientBoundaryRouteDescriptors = [
  {
    method: 'GET',
    path: '/admin/taxi/client-boundary/readiness',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Safe-disabled Taxi client-kernel boundary contract snapshot; route is not mounted now.',
  },
  {
    method: 'POST',
    path: '/admin/taxi/client-boundary/call-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview-only Taxi client boundary decision; no backend/provider/payment runtime is executed.',
  },
] as const;

export function getTaxiClientBoundaryRouteSnapshot() {
  return {
    mountedNow: false,
    runtimeEnabled: false,
    clientMustUseKernelBoundary: true,
    foundationOwnsTaxiContracts: true,
    noMobileUiImplementationFilesInFoundation: true,
    directClientBackendRuntimeCallsAllowed: false,
    directClientProviderImportsAllowed: false,
    directClientWalletMutationAllowed: false,
    directClientPaymentOrPayoutAllowed: false,
    noAlwaysOnTaxiBackgroundRuntime: true,
    exactApprovalRequiredForRuntime: true,
    fakeRuntimeBlocked: true,
    snapshot: getTaxiClientBoundarySnapshot(),
    routes: taxiClientBoundaryRouteDescriptors,
  };
}
