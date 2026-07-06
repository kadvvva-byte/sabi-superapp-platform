export const TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION = 'TAXI-ORDERS-PRODUCTION-CHAIN-009L-END-TO-END-REAL-DB-NO-FAKE' as const;

export const TAXI_ORDERS_PRODUCTION_CHAIN_ENDPOINTS_009L = [
  'GET /api/admin/taxi/orders/009l/production-chain/readiness',
  'GET /api/admin/taxi/orders/009l/production-chain/status',
] as const;

export const TAXI_ORDERS_PRODUCTION_CHAIN_REQUIRED_DELEGATES_009L = [
  'taxiRiderProfile',
  'taxiTariffRegion',
  'taxiQuote',
  'taxiRiderRequest',
  'taxiDriverProfile',
  'taxiVehicle',
  'taxiDriverVehicleAssignment',
  'taxiDispatchOffer',
  'taxiTrip',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_PRODUCTION_CHAIN_STEPS_009L = [
  {
    key: 'quoteIntake009K',
    from: 'TaxiRiderProfile + TaxiTariffRegion + real route + real fare',
    to: 'TaxiQuote',
    endpoint: 'POST /api/admin/taxi/orders/009k/quote-intake/from-real-route',
    approvalHeader: 'x-sabi-taxi-orders-009k-quote-intake-approval',
  },
  {
    key: 'riderRequest009J',
    from: 'accepted TaxiQuote',
    to: 'TaxiRiderRequest',
    endpoint: 'POST /api/admin/taxi/orders/009j/rider-request-create/from-existing-quote',
    approvalHeader: 'x-sabi-taxi-orders-009j-rider-request-create-approval',
  },
  {
    key: 'dispatchOffer009I',
    from: 'TaxiRiderRequest + approved driver + positive balance + approved vehicle',
    to: 'TaxiDispatchOffer',
    endpoint: 'POST /api/admin/taxi/orders/009i/dispatch-create/from-existing-request',
    approvalHeader: 'x-sabi-taxi-orders-009i-dispatch-create-approval',
  },
  {
    key: 'acceptedOfferQueue009H',
    from: 'accepted TaxiDispatchOffer',
    to: 'create-ready dispatch offer queue',
    endpoint: 'GET /api/admin/taxi/orders/009h/dispatch-offers/eligible',
    approvalHeader: '',
  },
  {
    key: 'tripCreate009G',
    from: 'accepted TaxiDispatchOffer + approved vehicle',
    to: 'TaxiTrip',
    endpoint: 'POST /api/admin/taxi/orders/009g/trip-create/from-dispatch-offer',
    approvalHeader: 'x-sabi-taxi-orders-009g-trip-create-approval',
  },
  {
    key: 'tripLifecycle009F',
    from: 'existing TaxiTrip',
    to: 'status lifecycle + TaxiAuditLog',
    endpoint: 'POST /api/admin/taxi/orders/009f/lifecycle/transition',
    approvalHeader: 'x-sabi-taxi-orders-009f-lifecycle-approval',
  },
  {
    key: 'ordersScreen009A009D',
    from: 'TaxiTrip',
    to: 'orders screen + strict DB-only chart',
    endpoint: 'GET /api/admin/taxi/orders/009a/report',
    approvalHeader: '',
  },
  {
    key: 'archive009A009E',
    from: 'TaxiTrip older than 7 days',
    to: 'TaxiAuditLog archive record',
    endpoint: 'POST /api/admin/taxi/orders/009a/archive/run',
    approvalHeader: 'x-sabi-taxi-orders-009a-archive-approval',
  },
] as const;

export const TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_QUOTE_STATUSES_009L = ['accepted'] as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_REQUEST_STATUSES_009L = ['created', 'searching', 'matched'] as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_OFFER_STATUSES_009L = ['created', 'sent', 'accepted'] as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_ACCEPTED_OFFER_STATUS_009L = 'accepted' as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_ACTIVE_TARIFF_STATUS_009L = 'active' as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_DRIVER_STATUS_009L = 'approved' as const;
export const TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_VEHICLE_STATUS_009L = 'approved' as const;
