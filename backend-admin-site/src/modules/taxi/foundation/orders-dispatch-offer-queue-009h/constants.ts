export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION = 'TAXI-ORDERS-DISPATCH-OFFER-QUEUE-009H-EXISTING-ACCEPTED-OFFERS-NO-FAKE' as const;

export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_ENDPOINTS_009H = [
  'GET /api/admin/taxi/orders/009h/dispatch-offers/readiness',
  'GET /api/admin/taxi/orders/009h/dispatch-offers/eligible',
] as const;

export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_DELEGATES_009H = [
  'taxiDispatchOffer',
  'taxiTrip',
  'taxiVehicle',
] as const;

export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_OFFER_STATUS_009H = 'accepted' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_VEHICLE_STATUS_009H = 'approved' as const;
export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_DEFAULT_LIMIT_009H = 50 as const;
export const TAXI_ORDERS_DISPATCH_OFFER_QUEUE_MAX_LIMIT_009H = 200 as const;
