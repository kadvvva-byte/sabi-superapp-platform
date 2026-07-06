export const TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION = 'TAXI-ORDERS-REAL-DATA-READINESS-009M-MISSING-REQUIREMENTS-DASHBOARD-NO-FAKE' as const;

export const TAXI_ORDERS_REAL_DATA_READINESS_ENDPOINTS_009M = [
  'GET /api/admin/taxi/orders/009m/real-data-readiness/readiness',
  'GET /api/admin/taxi/orders/009m/real-data-readiness/status',
] as const;

export const TAXI_ORDERS_REAL_DATA_READINESS_REQUIRED_DELEGATES_009M = [
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

export const TAXI_ORDERS_REAL_DATA_REQUIREMENTS_009M = [
  {
    key: 'rider_profile',
    title: 'Real rider profile',
    dbModel: 'TaxiRiderProfile',
    neededFor: '009K quote intake',
    missingText: 'Create/verify at least one real TaxiRiderProfile before quote intake.',
    actionEndpoint: '',
  },
  {
    key: 'active_tariff_region',
    title: 'Active tariff region',
    dbModel: 'TaxiTariffRegion',
    neededFor: '009K quote intake',
    missingText: 'Configure one active TaxiTariffRegion in tariffs; no fallback tariff is generated.',
    actionEndpoint: 'GET /api/admin/taxi/tariffs/008c/readiness',
  },
  {
    key: 'real_route_and_fare',
    title: 'Real route + real fare',
    dbModel: 'TaxiQuote',
    neededFor: '009K quote intake',
    missingText: 'Use real routeProviderRef, pickup/dropoff GeoJSON and positive estimatedFareMinor.',
    actionEndpoint: 'POST /api/admin/taxi/orders/009k/quote-intake/from-real-route',
  },
  {
    key: 'accepted_quote',
    title: 'Accepted quote candidate',
    dbModel: 'TaxiQuote',
    neededFor: '009J RiderRequest create',
    missingText: 'No accepted non-expired TaxiQuote is available for RiderRequest creation.',
    actionEndpoint: 'GET /api/admin/taxi/orders/009j/rider-request-create/quote-candidates',
  },
  {
    key: 'open_rider_request',
    title: 'Open rider request',
    dbModel: 'TaxiRiderRequest',
    neededFor: '009I DispatchOffer create',
    missingText: 'No real open TaxiRiderRequest is ready for dispatch matching.',
    actionEndpoint: 'GET /api/admin/taxi/orders/009i/dispatch-create/candidates',
  },
  {
    key: 'approved_driver_positive_balance',
    title: 'Approved driver with positive balance',
    dbModel: 'TaxiDriverProfile',
    neededFor: '009I DispatchOffer create',
    missingText: 'Driver must be approved and have positive balanceReserveMinor before receiving orders.',
    actionEndpoint: '',
  },
  {
    key: 'approved_vehicle_active_assignment',
    title: 'Approved vehicle + active assignment',
    dbModel: 'TaxiVehicle + TaxiDriverVehicleAssignment',
    neededFor: '009I/009G dispatch and trip create',
    missingText: 'Vehicle must be approved and actively assigned to driver; no fake vehicle is generated.',
    actionEndpoint: '',
  },
  {
    key: 'accepted_dispatch_offer',
    title: 'Accepted dispatch offer',
    dbModel: 'TaxiDispatchOffer',
    neededFor: '009G TaxiTrip create',
    missingText: 'No accepted TaxiDispatchOffer is available for trip creation.',
    actionEndpoint: 'GET /api/admin/taxi/orders/009h/dispatch-offers/eligible',
  },
  {
    key: 'taxi_trip',
    title: 'TaxiTrip order',
    dbModel: 'TaxiTrip',
    neededFor: 'Orders screen/chart/lifecycle/archive',
    missingText: 'No TaxiTrip exists yet; orders screen stays honest empty-state.',
    actionEndpoint: 'GET /api/admin/taxi/orders/009a/report',
  },
] as const;
