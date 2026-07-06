export const TAXI_ORDERS_LIFECYCLE_009F_VERSION = 'TAXI-ORDERS-LIFECYCLE-009F-EXISTING-TAXITRIP-STATUS-FLOW-NO-FAKE' as const;

export const TAXI_ORDERS_LIFECYCLE_APPROVAL_HEADER_009F = 'x-sabi-taxi-orders-009f-lifecycle-approval' as const;
export const TAXI_ORDERS_LIFECYCLE_APPROVAL_VALUE_009F = 'i-approve-taxi-orders-009f-existing-trip-status-transition' as const;
export const TAXI_ORDERS_LIFECYCLE_IDEMPOTENCY_HEADER_009F = 'x-sabi-idempotency-key' as const;

export const TAXI_ORDERS_LIFECYCLE_AUDIT_ACTION_009F = 'taxi_order_lifecycle_status_transition_009f' as const;

export const TAXI_ORDERS_LIFECYCLE_REQUIRED_DELEGATES_009F = [
  'taxiTrip',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_LIFECYCLE_ENDPOINTS_009F = [
  'GET /api/admin/taxi/orders/009f/lifecycle/readiness',
  'POST /api/admin/taxi/orders/009f/lifecycle/transition',
] as const;

export const TAXI_ORDERS_LIFECYCLE_ALLOWED_TRANSITIONS_009F = {
  accepted: ['driver_arriving', 'cancelled', 'disputed'],
  driver_arriving: ['arrived', 'cancelled', 'disputed'],
  arrived: ['rider_onboard', 'cancelled', 'disputed'],
  rider_onboard: ['active', 'completed', 'disputed'],
  active: ['completed', 'cancelled', 'disputed'],
  completed: [],
  cancelled: [],
  disputed: [],
  unknown: [],
} as const;
