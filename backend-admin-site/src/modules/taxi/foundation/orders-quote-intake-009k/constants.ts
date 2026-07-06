export const TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION = 'TAXI-ORDERS-QUOTE-INTAKE-009K-REAL-RIDER-TARIFF-ROUTE-NO-FAKE' as const;

export const TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_HEADER_009K = 'x-sabi-taxi-orders-009k-quote-intake-approval' as const;
export const TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_VALUE_009K = 'i-approve-taxi-orders-009k-create-quote-from-real-rider-tariff-route' as const;
export const TAXI_ORDERS_QUOTE_INTAKE_IDEMPOTENCY_HEADER_009K = 'x-sabi-idempotency-key' as const;

export const TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K = 'accepted' as const;
export const TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_TARIFF_STATUS_009K = 'active' as const;
export const TAXI_ORDERS_QUOTE_INTAKE_AUDIT_ACTION_009K = 'taxi_orders_009k_quote_created_from_real_rider_tariff_route' as const;

export const TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_DELEGATES_009K = [
  'taxiRiderProfile',
  'taxiTariffRegion',
  'taxiQuote',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_QUOTE_INTAKE_ENDPOINTS_009K = [
  'GET /api/admin/taxi/orders/009k/quote-intake/readiness',
  'POST /api/admin/taxi/orders/009k/quote-intake/from-real-route',
] as const;

export const TAXI_ORDERS_QUOTE_INTAKE_MIN_TTL_MINUTES_009K = 1;
export const TAXI_ORDERS_QUOTE_INTAKE_MAX_TTL_MINUTES_009K = 120;
export const TAXI_ORDERS_QUOTE_INTAKE_DEFAULT_TTL_MINUTES_009K = 15;
