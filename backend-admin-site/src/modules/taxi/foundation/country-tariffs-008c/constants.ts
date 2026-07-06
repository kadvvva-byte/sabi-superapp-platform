export const TAXI_COUNTRY_TARIFFS_008C_VERSION = 'TAXI-COUNTRY-TARIFFS-008C-PRODUCTION-SAVE-AUDIT';

export const TAXI_COUNTRY_TARIFFS_008C_APPROVAL_HEADER = 'x-sabi-taxi-tariffs-008c-production-save-approval';
export const TAXI_COUNTRY_TARIFFS_008C_APPROVAL_VALUE = 'i-approve-taxi-tariffs-008c-production-save-audit';
export const TAXI_COUNTRY_TARIFFS_008C_IDEMPOTENCY_HEADER = 'x-sabi-idempotency-key';

export const TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT = 0;
export const TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT = 35;
export const TAXI_COUNTRY_TARIFFS_008C_MAX_ROWS_PER_SAVE = 200;

export const TAXI_COUNTRY_TARIFFS_008C_AUDIT_ACTION = 'taxi_country_tariffs_008c_production_save_audit';

export const TAXI_COUNTRY_TARIFFS_008C_ENDPOINTS = [
  'GET /api/admin/taxi/tariffs/008c/readiness',
  'POST /api/admin/taxi/tariffs/008c/production-save',
  'GET /api/admin/taxi/tariffs/008c/audit-journal',
] as const;
