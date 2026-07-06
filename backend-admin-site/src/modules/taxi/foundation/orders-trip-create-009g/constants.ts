export const TAXI_ORDERS_TRIP_CREATE_009G_VERSION = 'TAXI-ORDERS-TRIP-CREATE-009G-EXISTING-DISPATCH-OFFER-NO-FAKE' as const;

export const TAXI_ORDERS_TRIP_CREATE_APPROVAL_HEADER_009G = 'x-sabi-taxi-orders-009g-trip-create-approval' as const;
export const TAXI_ORDERS_TRIP_CREATE_APPROVAL_VALUE_009G = 'i-approve-taxi-orders-009g-create-trip-from-existing-dispatch-offer' as const;
export const TAXI_ORDERS_TRIP_CREATE_IDEMPOTENCY_HEADER_009G = 'x-sabi-idempotency-key' as const;
export const TAXI_ORDERS_TRIP_CREATE_AUDIT_ACTION_009G = 'taxi_orders_009g_existing_dispatch_offer_trip_created' as const;

export const TAXI_ORDERS_TRIP_CREATE_ENDPOINTS_009G = [
  'GET /api/admin/taxi/orders/009g/trip-create/readiness',
  'POST /api/admin/taxi/orders/009g/trip-create/from-dispatch-offer',
] as const;

export const TAXI_ORDERS_TRIP_CREATE_REQUIRED_DELEGATES_009G = [
  'taxiDispatchOffer',
  'taxiTrip',
  'taxiVehicle',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_TRIP_CREATE_REQUIRED_OFFER_STATUS_009G = 'accepted' as const;
export const TAXI_ORDERS_TRIP_CREATE_REQUIRED_VEHICLE_STATUS_009G = 'approved' as const;
export const TAXI_ORDERS_TRIP_CREATE_INITIAL_TRIP_STATUS_009G = 'accepted' as const;
