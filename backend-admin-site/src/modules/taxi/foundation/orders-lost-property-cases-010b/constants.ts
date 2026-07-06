export const TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION = 'TAXI-ORDERS-LOST-PROPERTY-CASES-010B-REAL-TRIP-SUPPORT-CASE-NO-FAKE' as const;

export const TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B = 'lost_property' as const;
export const TAXI_ORDERS_LOST_PROPERTY_CREATE_ACTION_010B = 'taxi_orders_010b_lost_property_case_created_from_existing_trip' as const;
export const TAXI_ORDERS_LOST_PROPERTY_STATUS_ACTION_010B = 'taxi_orders_010b_lost_property_case_status_updated' as const;

export const TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_HEADER_010B = 'x-sabi-taxi-orders-010b-lost-property-create-approval' as const;
export const TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_VALUE_010B = 'i-approve-taxi-orders-010b-create-lost-property-case-from-existing-trip' as const;

export const TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_HEADER_010B = 'x-sabi-taxi-orders-010b-lost-property-update-approval' as const;
export const TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_VALUE_010B = 'i-approve-taxi-orders-010b-update-lost-property-case-status' as const;

export const TAXI_ORDERS_LOST_PROPERTY_ENDPOINTS_010B = [
  'GET /api/admin/taxi/orders/010b/lost-property/readiness',
  'GET /api/admin/taxi/orders/010b/lost-property/status',
  'GET /api/admin/taxi/orders/010b/lost-property/cases',
  'POST /api/admin/taxi/orders/010b/lost-property/create-from-trip',
  'PATCH /api/admin/taxi/orders/010b/lost-property/update-status',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_REQUIRED_DELEGATES_010B = [
  'taxiTrip',
  'taxiSupportCase',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_SUPPORT_STATUSES_010B = [
  'open',
  'waiting_for_user',
  'under_review',
  'resolved',
  'rejected',
  'escalated',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_WORKFLOW_STAGES_010B = [
  'opened',
  'driver_contact_requested',
  'driver_contacted',
  'item_found',
  'return_scheduled',
  'returned',
  'closed',
] as const;
