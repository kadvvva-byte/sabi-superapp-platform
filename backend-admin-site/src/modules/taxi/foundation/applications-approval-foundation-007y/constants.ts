export const TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION = 'TAXI-APPLICATIONS-APPROVAL-FOUNDATION-007Y';

export const TAXI_APPLICATION_CATEGORIES_007Y = [
  'standard',
  'comfort',
  'business',
  'delivery',
  'intercity',
] as const;

export const TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y = [
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

export const TAXI_APPLICATION_FOUNDATION_ENDPOINTS_007Y = [
  'GET /api/admin/taxi/applications/007y/readiness',
  'GET /api/admin/taxi/applications/007y/new-applications',
  'GET /api/admin/taxi/applications/007y/applications/:applicationId',
  'POST /api/admin/taxi/applications/007y/applications/:applicationId/approve',
  'POST /api/admin/taxi/applications/007y/applications/:applicationId/reject',
  'POST /api/admin/taxi/applications/007y/applications/:applicationId/request-documents',
  'POST /api/admin/taxi/applications/007y/applications/:applicationId/archive',
] as const;

export const TAXI_APPLICATION_APPROVE_ATOMIC_OPERATIONS_007Y = [
  'archive_received_mobile_upload_data',
  'create_or_update_approved_driver',
  'create_or_update_vehicle',
  'link_driver_vehicle',
  'mark_application_approved',
  'write_audit_event',
  'notify_owner_sabi_ai_report',
] as const;

export const TAXI_APPLICATION_REJECT_ATOMIC_OPERATIONS_007Y = [
  'archive_received_mobile_upload_data',
  'mark_application_rejected',
  'write_rejection_reason',
  'write_audit_event',
  'notify_owner_sabi_ai_report',
] as const;
