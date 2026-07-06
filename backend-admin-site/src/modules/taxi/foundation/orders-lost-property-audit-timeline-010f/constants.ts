export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_010F_VERSION = 'TAXI-ORDERS-LOST-PROPERTY-AUDIT-TIMELINE-010F-READ-ONLY-REDACTED-NO-FAKE' as const;

export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_ENDPOINTS_010F = [
  'GET /api/admin/taxi/orders/010f/lost-property/audit/readiness',
  'GET /api/admin/taxi/orders/010f/lost-property/audit/timeline',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_REQUIRED_DELEGATES_010F = [
  'taxiSupportCase',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_TARGET_TYPE_010F = 'TaxiSupportCase' as const;
export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_CASE_TYPE_010F = 'lost_property' as const;

export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_ACTIONS_010F = [
  'taxi_orders_010b_lost_property_case_created_from_existing_trip',
  'taxi_orders_010b_lost_property_case_status_updated',
] as const;

export const TAXI_ORDERS_LOST_PROPERTY_AUDIT_ALLOWED_PAYLOAD_KEYS_010F = [
  'tripId',
  'caseType',
  'previousStatus',
  'status',
  'workflowStage',
  'reason',
  'idempotencyKey',
  'rawPiiBlockedInList',
  'passengerDriverDirectContactBlocked',
  'adminMediatedContactOnly',
  'fakeTripCreateBlocked',
  'fakeCaseCreateBlocked',
  'providerDispatch',
  'walletMutation',
] as const;
