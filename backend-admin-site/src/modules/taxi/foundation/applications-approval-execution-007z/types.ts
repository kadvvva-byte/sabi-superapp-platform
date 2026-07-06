import type {
  TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z,
  TAXI_APPLICATION_CATEGORIES_007Z,
  TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z,
  TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Z,
} from './constants';

export type TaxiApplicationCategory007Z = typeof TAXI_APPLICATION_CATEGORIES_007Z[number];
export type TaxiApplicationRequiredMobileUploadField007Z = typeof TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Z[number];
export type TaxiApplicationApproveTransactionStep007Z = typeof TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z[number];
export type TaxiApplicationRejectTransactionStep007Z = typeof TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z[number];
export type TaxiApplicationExecutionAction007Z = 'approve' | 'reject' | 'request-documents' | 'archive';

export type TaxiApplicationMobileUpload007Z = Readonly<{
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

export type TaxiApplicationRecord007Z = Readonly<{
  applicationId: string;
  driverProfileId: string;
  userId: string;
  status: string;
  category: TaxiApplicationCategory007Z;
  submittedAt: string;
  driverName: string;
  phone: string;
  region: string;
  countryCode: string;
  cityId: string;
  vehiclePlate: string;
  vehicleModel: string;
  vehicleClass: string;
  rawMobileUploadId: string;
  mobileUpload: TaxiApplicationMobileUpload007Z;
}>;

export type TaxiApplicationExecutionPayload007Z = Readonly<{
  action?: string;
  decisionReason?: string;
  archiveId?: string;
  ownerNote?: string;
  checks?: Record<string, unknown>;
  selectedApplication?: Record<string, unknown> | null;
  archivePackage?: Record<string, unknown>;
  approvedDriverDraft?: Record<string, unknown>;
  idempotencyKey?: string;
}>;

export type TaxiApplicationExecutionReadiness007Z = Readonly<{
  version: string;
  uiReadinessPercent: 100;
  applicationsFoundationReadinessPercent: 100;
  applicationsBackendExecutionReadinessPercent: 100;
  applicationsRealProductionReadinessPercent: number;
  endpoints: readonly string[];
  categories: readonly TaxiApplicationCategory007Z[];
  requiredMobileUploadFields: readonly TaxiApplicationRequiredMobileUploadField007Z[];
  requiredPrismaDelegates: readonly string[];
  fakeSuccessBlocked: true;
  localStatusMutationBlocked: true;
  approveRejectArchiveImplementedWithTransaction: true;
  runnerDbWritePerformed: false;
  runtimeDbWriteRequiresExactHeader: true;
  nextStep: string;
}>;

export type TaxiApplicationExecutionResult007Z = Readonly<{
  ok: boolean;
  version: string;
  action: TaxiApplicationExecutionAction007Z;
  applicationId: string;
  code: string;
  message: string;
  fakeSuccessBlocked: true;
  dbWriteExecuted: boolean;
  archiveWriteExecuted: boolean;
  approvedDriverCreatedOrUpdated: boolean;
  applicationStatusChanged: boolean;
  transactionSteps: readonly string[];
  idempotencyKey: string;
  ownerSabiAiReportQueued: boolean;
  result?: Record<string, unknown>;
  missing?: readonly string[];
}>;
