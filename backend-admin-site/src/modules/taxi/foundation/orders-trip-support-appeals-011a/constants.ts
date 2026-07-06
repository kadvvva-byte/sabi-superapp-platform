export const TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION = 'TAXI-ORDERS-TRIP-SUPPORT-APPEALS-011A-REAL-TRIP-SUPPORT-CASE-NO-FAKE' as const;

export const TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A = 'trip_appeal' as const;
export const TAXI_ORDERS_TRIP_SUPPORT_CREATE_ACTION_011A = 'taxi_orders_011a_trip_support_appeal_created_from_existing_trip' as const;
export const TAXI_ORDERS_TRIP_SUPPORT_STATUS_ACTION_011A = 'taxi_orders_011a_trip_support_appeal_status_updated' as const;

export const TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_HEADER_011A = 'x-sabi-taxi-orders-011a-trip-support-create-approval' as const;
export const TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_VALUE_011A = 'i-approve-taxi-orders-011a-create-trip-support-case-from-existing-trip' as const;

export const TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_HEADER_011A = 'x-sabi-taxi-orders-011a-trip-support-update-approval' as const;
export const TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_VALUE_011A = 'i-approve-taxi-orders-011a-update-trip-support-case-status' as const;

export const TAXI_ORDERS_TRIP_SUPPORT_ENDPOINTS_011A = [
  'GET /api/admin/taxi/orders/011a/support-appeals/readiness',
  'GET /api/admin/taxi/orders/011a/support-appeals/status',
  'GET /api/admin/taxi/orders/011a/support-appeals/cases',
  'POST /api/admin/taxi/orders/011a/support-appeals/create-from-trip',
  'PATCH /api/admin/taxi/orders/011a/support-appeals/update-status',
] as const;

export const TAXI_ORDERS_TRIP_SUPPORT_REQUIRED_DELEGATES_011A = [
  'taxiTrip',
  'taxiSupportCase',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_TRIP_SUPPORT_STATUSES_011A = [
  'open',
  'waiting_for_user',
  'under_review',
  'resolved',
  'rejected',
  'escalated',
] as const;

export const TAXI_ORDERS_TRIP_SUPPORT_CATEGORIES_011A = [
  'trip_issue',
  'driver_behavior',
  'passenger_behavior',
  'route_dispute',
  'fare_dispute',
  'safety_concern',
  'service_quality',
  'other',
] as const;

export const TAXI_ORDERS_TRIP_SUPPORT_WORKFLOW_STAGES_011A = [
  'opened',
  'triage',
  'evidence_review',
  'driver_response_requested',
  'passenger_response_requested',
  'supervisor_review',
  'resolved',
  'closed',
] as const;
