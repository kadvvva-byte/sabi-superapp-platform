export const TAXI_ORDERS_RIDER_USER_CANDIDATES_009Q_VERSION = 'TAXI-ORDERS-RIDER-USER-CANDIDATES-009Q-READ-ONLY-EXISTING-USERS-NO-FAKE';

export const TAXI_ORDERS_RIDER_USER_CANDIDATES_ENDPOINTS_009Q = Object.freeze([
  'GET /api/admin/taxi/orders/009q/rider-user-candidates/readiness',
  'GET /api/admin/taxi/orders/009q/rider-user-candidates/list',
] as const);

export const TAXI_ORDERS_RIDER_USER_CANDIDATES_REQUIRED_DELEGATES_009Q = Object.freeze([
  'taxiRiderProfile',
  'taxiAuditLog',
] as const);

export const TAXI_ORDERS_RIDER_USER_DELEGATE_CANDIDATES_009Q = Object.freeze([
  'user',
  'appUser',
  'sabiUser',
  'customer',
  'account',
] as const);

export const TAXI_ORDERS_RIDER_USER_CANDIDATES_DEFAULT_LIMIT_009Q = 25;
export const TAXI_ORDERS_RIDER_USER_CANDIDATES_MAX_LIMIT_009Q = 50;
