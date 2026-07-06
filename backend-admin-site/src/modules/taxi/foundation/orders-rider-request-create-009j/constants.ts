export const TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION = 'TAXI-ORDERS-RIDER-REQUEST-CREATE-009J-EXISTING-ACCEPTED-QUOTE-NO-FAKE' as const;

export const TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_HEADER_009J = 'x-sabi-taxi-orders-009j-rider-request-create-approval' as const;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_VALUE_009J = 'i-approve-taxi-orders-009j-create-rider-request-from-existing-accepted-quote' as const;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_IDEMPOTENCY_HEADER_009J = 'x-sabi-idempotency-key' as const;

export const TAXI_ORDERS_RIDER_REQUEST_CREATE_QUOTE_STATUSES_009J = ['accepted'] as const;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_OPEN_REQUEST_STATUSES_009J = ['created', 'searching', 'matched'] as const;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_CREATED_REQUEST_STATUS_009J = 'created' as const;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_AUDIT_ACTION_009J = 'taxi_orders_009j_rider_request_created_from_existing_accepted_quote' as const;

export const TAXI_ORDERS_RIDER_REQUEST_CREATE_REQUIRED_DELEGATES_009J = [
  'taxiQuote',
  'taxiRiderRequest',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_RIDER_REQUEST_CREATE_ENDPOINTS_009J = [
  'GET /api/admin/taxi/orders/009j/rider-request-create/readiness',
  'GET /api/admin/taxi/orders/009j/rider-request-create/quote-candidates',
  'POST /api/admin/taxi/orders/009j/rider-request-create/from-existing-quote',
] as const;

export const TAXI_ORDERS_RIDER_REQUEST_CREATE_DEFAULT_LIMIT_009J = 50;
export const TAXI_ORDERS_RIDER_REQUEST_CREATE_MAX_LIMIT_009J = 200;
