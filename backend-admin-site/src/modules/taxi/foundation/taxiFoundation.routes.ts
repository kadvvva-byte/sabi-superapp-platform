import { getTaxiFoundationSnapshot } from './taxiFoundation.service';
import type { TaxiRouteDescriptor } from './taxiFoundation.types';

export const taxiFoundationRouteDescriptors: readonly TaxiRouteDescriptor[] = [
  {
    method: 'GET',
    path: '/admin/taxi/foundation/readiness',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Safe-disabled Taxi foundation snapshot for Admin readiness visibility.',
  },
  {
    method: 'POST',
    path: '/admin/taxi/foundation/driver-dispatch-access-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview-only driver balance/doc/provider gate; no real dispatch offer is created.',
  },
  {
    method: 'POST',
    path: '/admin/taxi/foundation/commission-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview-only Admin-configured commission calculation; no debit or payout is executed.',
  },
  {
    method: 'POST',
    path: '/admin/taxi/foundation/daily-complaint-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview-only daily complaint escalation; no fake points removal, cooldown, block or reward freeze.',
  },
];

export function getTaxiFoundationRouteSnapshot() {
  return {
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    fakeRuntimeBlocked: true,
    snapshot: getTaxiFoundationSnapshot(),
    routes: taxiFoundationRouteDescriptors,
  };
}
