import {
  TAXI_APPLICATION_APPROVE_ATOMIC_OPERATIONS_007Y,
  TAXI_APPLICATION_CATEGORIES_007Y,
  TAXI_APPLICATION_FOUNDATION_ENDPOINTS_007Y,
  TAXI_APPLICATION_REJECT_ATOMIC_OPERATIONS_007Y,
  TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y,
  TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION,
} from './constants';
import type {
  TaxiApplicationDecisionAction007Y,
  TaxiApplicationDetailsResponse007Y,
  TaxiApplicationFoundationReadiness007Y,
  TaxiApplicationLockedWriteResponse007Y,
  TaxiApplicationReadOnlyListResponse007Y,
  TaxiApplicationRecordContract007Y,
} from './types';

const EXPECTED_MODELS_007Y = [
  'TaxiDriverApplication',
  'TaxiDriverApplicationMobileUpload',
  'TaxiApprovedDriver',
  'TaxiVehicle',
  'TaxiApplicationArchive',
  'TaxiAdminAuditEvent',
] as const;

const REQUIRED_BEFORE_UNLOCK_007Y = [
  'Prisma models exist and are migrated',
  'Admin role gate is runtime-verified',
  'Archive write is transactional with approve/reject',
  'Approved-driver write is transactional with vehicle link',
  'Runtime smoke proves approve/reject/archive do not fake success',
] as const;

export function normalizeTaxiApplicationId007Y(value: unknown): string {
  const id = String(value || '').trim();
  if (!id) return 'missing_application_id';
  return id.replace(/[^a-zA-Z0-9:_\-.]/g, '').slice(0, 128) || 'invalid_application_id';
}

export function buildEmptyTaxiApplicationContract007Y(applicationId: string): TaxiApplicationRecordContract007Y {
  return {
    applicationId,
    status: 'new',
    category: 'standard',
    submittedAt: '',
    driverName: '',
    phone: '',
    region: '',
    vehiclePlate: '',
    vehicleModel: '',
    rawMobileUploadId: '',
    mobileUpload: {
      passportUrl: '',
      licenseUrl: '',
      vehicleDocumentUrl: '',
      driverPhotoUrl: '',
      vehicleFrontPhotoUrl: '',
      vehicleBackPhotoUrl: '',
      vehicleLeftPhotoUrl: '',
      vehicleRightPhotoUrl: '',
      interiorFrontPhotoUrl: '',
      interiorBackPhotoUrl: '',
      dashboardPhotoUrl: '',
      mileagePhotoUrl: '',
    },
  };
}

export function buildTaxiApplicationsFoundationReadiness007Y(): TaxiApplicationFoundationReadiness007Y {
  return {
    version: TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION,
    status: 'mounted_no_fake_write_gate',
    uiReadinessPercent: 100,
    productionReadinessPercent: 83,
    routes: TAXI_APPLICATION_FOUNDATION_ENDPOINTS_007Y,
    categories: TAXI_APPLICATION_CATEGORIES_007Y,
    requiredMobileUploadFields: TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y,
    fakeSuccessBlocked: true,
    localStatusMutationBlocked: true,
    archiveRequiredBeforeApprovedDriverWrite: true,
    approvedDriverDbWriteRequiresBackendSuccess: true,
    dbWriteExecutedByThisRoute: false,
    nextStep: 'TAXI-APPLICATIONS-APPROVAL-FOUNDATION-007Z real DB/archive write approval and runtime smoke',
  };
}

export function buildTaxiApplicationsReadOnlyListResponse007Y(): TaxiApplicationReadOnlyListResponse007Y {
  return {
    ok: true,
    version: TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION,
    source: 'taxi_driver_applications_db_read_contract',
    sourceConfigured: false,
    noSampleRowsReturned: true,
    applications: [],
    expectedBackendModels: EXPECTED_MODELS_007Y,
    categories: TAXI_APPLICATION_CATEGORIES_007Y,
    requiredMobileUploadFields: TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y,
  };
}

export function buildTaxiApplicationDetailsResponse007Y(applicationId: string): TaxiApplicationDetailsResponse007Y {
  return {
    ok: true,
    version: TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION,
    applicationId,
    source: 'taxi_driver_application_details_db_read_contract',
    sourceConfigured: false,
    noSampleRecordReturned: true,
    expectedRecordShape: buildEmptyTaxiApplicationContract007Y(applicationId),
  };
}

export function buildTaxiApplicationLockedWriteResponse007Y(
  action: TaxiApplicationDecisionAction007Y,
  applicationId: string,
  payload: Record<string, unknown>,
): TaxiApplicationLockedWriteResponse007Y {
  const approve = action === 'approve';
  const reject = action === 'reject';
  const archiveOnly = action === 'archive';
  const atomicOperations = approve
    ? TAXI_APPLICATION_APPROVE_ATOMIC_OPERATIONS_007Y
    : reject
      ? TAXI_APPLICATION_REJECT_ATOMIC_OPERATIONS_007Y
      : archiveOnly
        ? (['archive_received_mobile_upload_data', 'write_audit_event', 'notify_owner_sabi_ai_report'] as const)
        : (['mark_application_needs_documents', 'write_document_request_reason', 'write_audit_event', 'notify_owner_sabi_ai_report'] as const);

  return {
    ok: false,
    version: TAXI_APPLICATIONS_APPROVAL_FOUNDATION_007Y_VERSION,
    code: 'taxi_application_write_gate_locked_007y',
    action,
    applicationId,
    fakeSuccessBlocked: true,
    statusChangedLocally: false,
    dbWriteExecuted: false,
    archiveWriteExecuted: false,
    approvedDriverCreated: false,
    requiredBeforeUnlock: REQUIRED_BEFORE_UNLOCK_007Y,
    archivePackageRequired: true,
    approvedDriverDraftRequired: approve,
    atomicOperations,
    ownerSabiAi: {
      controlsManager: true,
      reportsToOwner: true,
      mayApproveIndependently: false,
    },
    receivedPayloadKeys: Object.keys(payload).sort(),
    nextStep: 'Run exact owner-approved backend DB/archive write implementation and protected runtime smoke; do not fake success in UI.',
  };
}
