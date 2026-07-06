import type { TaxiRouteDescriptor } from '../foundation';

export const TAXI_AI_DAILY_REVIEW_ROUTE_DESCRIPTORS: readonly TaxiRouteDescriptor[] = [
  {
    method: 'GET',
    path: '/api/admin/taxi/ai-daily-review/snapshot',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Admin-compatible daily Sabi AI Taxi report snapshot. Not mounted; no DB/provider/runtime access.',
  },
  {
    method: 'POST',
    path: '/api/admin/taxi/ai-daily-review/report-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview daily report request by country and local date. No scheduler, DB, penalty or payout runtime.',
  },
  {
    method: 'POST',
    path: '/api/admin/taxi/ai-daily-review/complaint-case-preview',
    authRequired: true,
    mountedNow: false,
    runtimeEnabled: false,
    exactApprovalRequiredForRuntime: true,
    description: 'Preview complaint escalation for driver/rider in one country day. UI cannot execute sanctions.',
  },
];
