export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_009N_VERSION = 'TAXI-ORDERS-RIDER-PROFILE-INTAKE-009N-EXISTING-USER-NO-FAKE' as const;

export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_HEADER_009N = 'x-sabi-taxi-orders-009n-rider-profile-approval' as const;
export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_VALUE_009N = 'i-approve-taxi-orders-009n-existing-user-rider-profile-create' as const;

export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_ENDPOINTS_009N = [
  'GET /api/admin/taxi/orders/009n/rider-profile-intake/readiness',
  'GET /api/admin/taxi/orders/009n/rider-profile-intake/status',
  'POST /api/admin/taxi/orders/009n/rider-profile-intake/from-existing-user',
] as const;

export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_REQUIRED_DELEGATES_009N = [
  'taxiRiderProfile',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_RIDER_PROFILE_USER_DELEGATE_CANDIDATES_009N = [
  'user',
  'appUser',
  'sabiUser',
  'customer',
  'account',
] as const;

export const TAXI_ORDERS_RIDER_PROFILE_INTAKE_ACTION_009N = 'taxi_orders_009n_existing_user_rider_profile_create' as const;
