export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION = 'TAXI-ORDERS-DISPATCH-OFFER-CREATE-009I-EXISTING-RIDER-REQUEST-DRIVER-VEHICLE-NO-FAKE' as const;

export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_HEADER_009I = 'x-sabi-taxi-orders-009i-dispatch-create-approval' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_VALUE_009I = 'i-approve-taxi-orders-009i-create-dispatch-offer-from-existing-rider-request' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_IDEMPOTENCY_HEADER_009I = 'x-sabi-idempotency-key' as const;

export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUIRED_DELEGATES_009I = [
  'taxiRiderRequest',
  'taxiDriverProfile',
  'taxiVehicle',
  'taxiDriverVehicleAssignment',
  'taxiDispatchOffer',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_ENDPOINTS_009I = [
  'GET /api/admin/taxi/orders/009i/dispatch-create/readiness',
  'GET /api/admin/taxi/orders/009i/dispatch-create/candidates',
  'POST /api/admin/taxi/orders/009i/dispatch-create/from-existing-request',
] as const;

export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUEST_STATUSES_009I = ['created', 'searching'] as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_DRIVER_STATUS_009I = 'approved' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_VEHICLE_STATUS_009I = 'approved' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_CREATED_OFFER_STATUS_009I = 'sent' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_DUPLICATE_STATUSES_009I = ['created', 'sent', 'accepted'] as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_AUDIT_ACTION_009I = 'taxi_orders_009i_dispatch_offer_created_from_existing_request' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_LIMIT_009I = 30;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_LIMIT_009I = 100;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_TTL_SECONDS_009I = 90;
export const TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_TTL_SECONDS_009I = 600;
