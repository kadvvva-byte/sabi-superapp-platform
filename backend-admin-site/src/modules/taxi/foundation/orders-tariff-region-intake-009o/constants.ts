export const TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION = 'TAXI-ORDERS-TARIFF-REGION-INTAKE-009O-REAL-TARIFF-NO-FAKE' as const;

export const TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_HEADER_009O = 'x-sabi-taxi-orders-009o-tariff-region-approval' as const;
export const TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_VALUE_009O = 'i-approve-taxi-orders-009o-real-tariff-region-upsert' as const;

export const TAXI_ORDERS_TARIFF_REGION_INTAKE_ENDPOINTS_009O = [
  'GET /api/admin/taxi/orders/009o/tariff-region-intake/readiness',
  'GET /api/admin/taxi/orders/009o/tariff-region-intake/status',
  'POST /api/admin/taxi/orders/009o/tariff-region-intake/from-real-tariff',
] as const;

export const TAXI_ORDERS_TARIFF_REGION_INTAKE_REQUIRED_DELEGATES_009O = [
  'taxiTariffRegion',
  'taxiAuditLog',
] as const;

export const TAXI_ORDERS_TARIFF_REGION_INTAKE_ACTION_009O = 'taxi_orders_009o_real_tariff_region_upsert' as const;

export const TAXI_ORDERS_TARIFF_REGION_ALLOWED_STATUSES_009O = ['active', 'paused', 'draft'] as const;
