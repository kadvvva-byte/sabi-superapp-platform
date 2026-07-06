export const TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION = 'TAXI-APPLICATIONS-APPROVAL-EXECUTION-007Z-DB-ARCHIVE-WRITE-NO-FAKE' as const;

export const TAXI_APPLICATIONS_EXECUTION_APPROVAL_HEADER_007Z = 'x-sabi-taxi-applications-007z-execution-approval' as const;
export const TAXI_APPLICATIONS_EXECUTION_APPROVAL_VALUE_007Z = 'i-approve-taxi-applications-007z-db-archive-write' as const;
export const TAXI_APPLICATIONS_IDEMPOTENCY_HEADER_007Z = 'x-sabi-idempotency-key' as const;

export const TAXI_APPLICATION_CATEGORIES_007Z = ['standard', 'comfort', 'business', 'delivery', 'intercity'] as const;

export const TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Z = [
  'passportUrl',
  'licenseUrl',
  'vehicleDocumentUrl',
  'driverPhotoUrl',
  'vehicleFrontPhotoUrl',
  'vehicleBackPhotoUrl',
  'vehicleLeftPhotoUrl',
  'vehicleRightPhotoUrl',
  'interiorFrontPhotoUrl',
  'interiorBackPhotoUrl',
  'dashboardPhotoUrl',
  'mileagePhotoUrl',
] as const;

export const TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z = [
  'read_application_from_database',
  'archive_received_mobile_upload_data',
  'update_application_status_approved',
  'upsert_driver_profile_approved',
  'upsert_vehicle_approved',
  'link_driver_and_vehicle',
  'write_admin_audit_event',
  'write_owner_sabi_ai_report_payload',
] as const;

export const TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z = [
  'read_application_from_database',
  'archive_received_mobile_upload_data',
  'update_application_status_rejected',
  'write_rejection_reason',
  'write_admin_audit_event',
  'write_owner_sabi_ai_report_payload',
] as const;

export const TAXI_APPLICATION_EXECUTION_ENDPOINTS_007Z = [
  'GET /api/admin/taxi/applications/007z/readiness',
  'GET /api/admin/taxi/applications/007z/new-applications',
  'GET /api/admin/taxi/applications/007z/applications/:applicationId',
  'POST /api/admin/taxi/applications/007z/applications/:applicationId/approve',
  'POST /api/admin/taxi/applications/007z/applications/:applicationId/reject',
  'POST /api/admin/taxi/applications/007z/applications/:applicationId/request-documents',
  'POST /api/admin/taxi/applications/007z/applications/:applicationId/archive',
] as const;

export const TAXI_APPLICATION_PRISMA_DELEGATES_007Z = [
  'taxiDriverApplication',
  'taxiDriverProfile',
  'taxiVehicle',
  'taxiDriverVehicleAssignment',
  'taxiAuditLog',
] as const;
