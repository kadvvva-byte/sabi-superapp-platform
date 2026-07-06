export const TAXI_ORDERS_CONTROL_009A_VERSION = 'TAXI-ORDERS-CONTROL-009B-DAILY-GROWTH-AUDIT-7D-ARCHIVE-NO-FAKE' as const;

export const TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A = 7 as const;
export const TAXI_ORDERS_DAILY_TREND_DAYS_009B = 14 as const;

export const TAXI_ORDERS_ARCHIVE_APPROVAL_HEADER_009A = 'x-sabi-taxi-orders-009a-archive-approval' as const;
export const TAXI_ORDERS_ARCHIVE_APPROVAL_VALUE_009A = 'i-approve-taxi-orders-009a-archive-7-days' as const;
export const TAXI_ORDERS_IDEMPOTENCY_HEADER_009A = 'x-sabi-idempotency-key' as const;

export const TAXI_ORDERS_REQUIRED_PRISMA_DELEGATES_009A = [
  'taxiTrip',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_RUNTIME_ENDPOINTS_009A = [
  'GET /api/admin/taxi/orders/009a/readiness',
  'GET /api/admin/taxi/orders/009a/orders',
  'GET /api/admin/taxi/orders/009a/report',
  'GET /api/admin/taxi/orders/009a/audit',
  'POST /api/admin/taxi/orders/009a/archive/run',
] as const;

export const TAXI_ORDERS_ARCHIVE_AUDIT_ACTION_009A = 'taxi_order_archived_after_7_days_009a' as const;
export const TAXI_ORDERS_DAILY_GROWTH_MARKER_009B = 'TAXI-ORDERS-009B-DAILY-GROWTH-SCALE-AUDIT-NO-FAKE' as const;
