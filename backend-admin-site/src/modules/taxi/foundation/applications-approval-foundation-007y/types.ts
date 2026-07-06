import type {
  TAXI_APPLICATION_APPROVE_ATOMIC_OPERATIONS_007Y,
  TAXI_APPLICATION_CATEGORIES_007Y,
  TAXI_APPLICATION_REJECT_ATOMIC_OPERATIONS_007Y,
  TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y,
} from './constants';

export type TaxiApplicationCategory007Y = typeof TAXI_APPLICATION_CATEGORIES_007Y[number];
export type TaxiApplicationRequiredMobileUploadField007Y = typeof TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Y[number];
export type TaxiApplicationApproveAtomicOperation007Y = typeof TAXI_APPLICATION_APPROVE_ATOMIC_OPERATIONS_007Y[number];
export type TaxiApplicationRejectAtomicOperation007Y = typeof TAXI_APPLICATION_REJECT_ATOMIC_OPERATIONS_007Y[number];

export type TaxiApplicationDecisionAction007Y = 'approve' | 'reject' | 'request-documents' | 'archive';

export type TaxiApplicationMobileUploadContract007Y = Readonly<{
  passportUrl: string;
  licenseUrl: string;
  vehicleDocumentUrl: string;
  driverPhotoUrl: string;
  vehicleFrontPhotoUrl: string;
  vehicleBackPhotoUrl: string;
  vehicleLeftPhotoUrl: string;
  vehicleRightPhotoUrl: string;
  interiorFrontPhotoUrl: string;
  interiorBackPhotoUrl: string;
  dashboardPhotoUrl: string;
  mileagePhotoUrl: string;
}>;

export type TaxiApplicationRecordContract007Y = Readonly<{
  applicationId: string;
  status: 'new' | 'pending_review' | 'needs_documents' | 'approved' | 'rejected' | 'archived';
  category: TaxiApplicationCategory007Y;
  submittedAt: string;
  driverName: string;
  phone: string;
  region: string;
  vehiclePlate: string;
  vehicleModel: string;
  rawMobileUploadId: string;
  mobileUpload: TaxiApplicationMobileUploadContract007Y;
}>;

export type TaxiApplicationFoundationReadiness007Y = Readonly<{
  version: string;
  status: 'mounted_no_fake_write_gate';
  uiReadinessPercent: 100;
  productionReadinessPercent: number;
  routes: readonly string[];
  categories: readonly TaxiApplicationCategory007Y[];
  requiredMobileUploadFields: readonly TaxiApplicationRequiredMobileUploadField007Y[];
  fakeSuccessBlocked: true;
  localStatusMutationBlocked: true;
  archiveRequiredBeforeApprovedDriverWrite: true;
  approvedDriverDbWriteRequiresBackendSuccess: true;
  dbWriteExecutedByThisRoute: false;
  nextStep: string;
}>;

export type TaxiApplicationReadOnlyListResponse007Y = Readonly<{
  ok: true;
  version: string;
  source: 'taxi_driver_applications_db_read_contract';
  sourceConfigured: false;
  noSampleRowsReturned: true;
  applications: readonly TaxiApplicationRecordContract007Y[];
  expectedBackendModels: readonly string[];
  categories: readonly TaxiApplicationCategory007Y[];
  requiredMobileUploadFields: readonly TaxiApplicationRequiredMobileUploadField007Y[];
}>;

export type TaxiApplicationDetailsResponse007Y = Readonly<{
  ok: true;
  version: string;
  applicationId: string;
  source: 'taxi_driver_application_details_db_read_contract';
  sourceConfigured: false;
  noSampleRecordReturned: true;
  expectedRecordShape: TaxiApplicationRecordContract007Y;
}>;

export type TaxiApplicationLockedWriteResponse007Y = Readonly<{
  ok: false;
  version: string;
  code: 'taxi_application_write_gate_locked_007y';
  action: TaxiApplicationDecisionAction007Y;
  applicationId: string;
  fakeSuccessBlocked: true;
  statusChangedLocally: false;
  dbWriteExecuted: false;
  archiveWriteExecuted: false;
  approvedDriverCreated: false;
  requiredBeforeUnlock: readonly string[];
  archivePackageRequired: true;
  approvedDriverDraftRequired: boolean;
  atomicOperations: readonly string[];
  ownerSabiAi: Readonly<{
    controlsManager: true;
    reportsToOwner: true;
    mayApproveIndependently: false;
  }>;
  receivedPayloadKeys: readonly string[];
  nextStep: string;
}>;
