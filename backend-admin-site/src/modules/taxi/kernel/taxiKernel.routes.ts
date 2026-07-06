import { getTaxiKernelBridgeSnapshot } from './taxiKernel.service';

export const taxiKernelRouteDescriptors = [
  {
    method: 'GET',
    path: '/admin/taxi/kernel/readiness',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Safe-disabled Taxi kernel bridge readiness snapshot for Admin/mobile contract alignment.',
  },
  {
    method: 'POST',
    path: '/admin/taxi/kernel/mobile-call-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview-only client app kernel call decision; no provider/backend/payment runtime is executed.',
  },
] as const;

export function getTaxiKernelRouteSnapshot() {
  return {
    mountedNow: false,
    runtimeEnabled: false,
    clientAppMustUseKernel: true,
    directMobileProviderImportsAllowed: false,
    exactApprovalRequiredForRuntime: true,
    fakeRuntimeBlocked: true,
    snapshot: getTaxiKernelBridgeSnapshot(),
    routes: taxiKernelRouteDescriptors,
  };
}
