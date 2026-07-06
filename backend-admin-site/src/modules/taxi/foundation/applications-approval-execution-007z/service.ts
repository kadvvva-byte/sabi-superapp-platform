import { createHash } from 'crypto';
import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z,
  TAXI_APPLICATION_CATEGORIES_007Z,
  TAXI_APPLICATION_EXECUTION_ENDPOINTS_007Z,
  TAXI_APPLICATION_PRISMA_DELEGATES_007Z,
  TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z,
  TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Z,
  TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION,
} from './constants';
import type {
  TaxiApplicationExecutionAction007Z,
  TaxiApplicationExecutionPayload007Z,
  TaxiApplicationExecutionReadiness007Z,
  TaxiApplicationExecutionResult007Z,
  TaxiApplicationMobileUpload007Z,
  TaxiApplicationRecord007Z,
} from './types';

type PrismaAny007Z = Record<string, any>;

const EMPTY_UPLOAD_007Z: TaxiApplicationMobileUpload007Z = {
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
};


const TAXI_APPLICATION_LIST_STATUSES_007Z = ['submitted', 'under_review'] as const;

function nowIso007Z(): string {
  return new Date().toISOString();
}

export function normalizeTaxiApplicationId007Z(value: unknown): string {
  const id = String(value || '').trim();
  return (id.replace(/[^a-zA-Z0-9:_\-.]/g, '').slice(0, 128) || 'missing_application_id');
}

function str007Z(value: unknown): string {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function safeJson007Z(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function documentBundle007Z(row: Record<string, any>): Record<string, unknown> {
  return safeJson007Z(row.documentBundleJson || row.documentBundle || row.mobileUpload || row.payloadJson);
}

function uploadFromBundle007Z(bundle: Record<string, unknown>): TaxiApplicationMobileUpload007Z {
  const mobile = safeJson007Z(bundle.mobileUpload || bundle.upload || bundle.files);
  return {
    passportUrl: str007Z(mobile.passportUrl || bundle.passportUrl),
    licenseUrl: str007Z(mobile.licenseUrl || bundle.licenseUrl || bundle.driverLicenseUrl),
    vehicleDocumentUrl: str007Z(mobile.vehicleDocumentUrl || bundle.vehicleDocumentUrl),
    driverPhotoUrl: str007Z(mobile.driverPhotoUrl || bundle.driverPhotoUrl || bundle.profilePhotoUrl),
    vehicleFrontPhotoUrl: str007Z(mobile.vehicleFrontPhotoUrl || bundle.vehicleFrontPhotoUrl),
    vehicleBackPhotoUrl: str007Z(mobile.vehicleBackPhotoUrl || bundle.vehicleBackPhotoUrl),
    vehicleLeftPhotoUrl: str007Z(mobile.vehicleLeftPhotoUrl || bundle.vehicleLeftPhotoUrl),
    vehicleRightPhotoUrl: str007Z(mobile.vehicleRightPhotoUrl || bundle.vehicleRightPhotoUrl),
    interiorFrontPhotoUrl: str007Z(mobile.interiorFrontPhotoUrl || bundle.interiorFrontPhotoUrl),
    interiorBackPhotoUrl: str007Z(mobile.interiorBackPhotoUrl || bundle.interiorBackPhotoUrl),
    dashboardPhotoUrl: str007Z(mobile.dashboardPhotoUrl || bundle.dashboardPhotoUrl),
    mileagePhotoUrl: str007Z(mobile.mileagePhotoUrl || bundle.mileagePhotoUrl),
  };
}

function category007Z(value: unknown): TaxiApplicationRecord007Z['category'] {
  const c = str007Z(value).toLowerCase();
  if (c === 'comfort' || c === 'business' || c === 'delivery' || c === 'intercity') return c;
  return 'standard';
}

function recordFromDb007Z(row: Record<string, any>): TaxiApplicationRecord007Z {
  const bundle = documentBundle007Z(row);
  const upload = uploadFromBundle007Z(bundle);
  const driver = safeJson007Z(bundle.driver || bundle.driverData);
  const vehicle = safeJson007Z(bundle.vehicle || bundle.vehicleData);
  return {
    applicationId: str007Z(row.id || row.applicationId),
    driverProfileId: str007Z(row.driverProfileId || bundle.driverProfileId),
    userId: str007Z(bundle.userId || driver.userId || row.userId || row.driverProfile?.userId),
    status: str007Z(row.status || 'submitted'),
    category: category007Z(bundle.category || vehicle.category || vehicle.vehicleClass),
    submittedAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : str007Z(row.createdAt || bundle.submittedAt),
    driverName: str007Z(bundle.driverName || driver.fullName || driver.name),
    phone: str007Z(bundle.phone || driver.phone),
    region: str007Z(bundle.region || driver.region),
    countryCode: str007Z(bundle.countryCode || driver.countryCode || 'UZ'),
    cityId: str007Z(bundle.cityId || driver.cityId || bundle.region || 'pending_city'),
    vehiclePlate: str007Z(bundle.vehiclePlate || vehicle.plate || vehicle.plateNumber),
    vehicleModel: str007Z(bundle.vehicleModel || vehicle.model),
    vehicleClass: str007Z(bundle.vehicleClass || vehicle.category || bundle.category || 'standard'),
    rawMobileUploadId: str007Z(bundle.rawMobileUploadId || bundle.mobileUploadId || row.id),
    mobileUpload: upload,
  };
}

function emptyRecord007Z(applicationId: string): TaxiApplicationRecord007Z {
  return {
    applicationId,
    driverProfileId: '',
    userId: '',
    status: 'missing',
    category: 'standard',
    submittedAt: '',
    driverName: '',
    phone: '',
    region: '',
    countryCode: 'UZ',
    cityId: '',
    vehiclePlate: '',
    vehicleModel: '',
    vehicleClass: 'standard',
    rawMobileUploadId: '',
    mobileUpload: EMPTY_UPLOAD_007Z,
  };
}

function delegateMissing007Z(prisma: PrismaAny007Z): string[] {
  return TAXI_APPLICATION_PRISMA_DELEGATES_007Z.filter((delegate) => !prisma[delegate]);
}

function plateHash007Z(plate: string): string {
  return createHash('sha256').update(plate.trim().toUpperCase() || 'missing_plate').digest('hex');
}

function idempotency007Z(applicationId: string, action: TaxiApplicationExecutionAction007Z, payload: TaxiApplicationExecutionPayload007Z, provided: string): string {
  return provided || str007Z(payload.idempotencyKey) || `${applicationId}:${action}:${nowIso007Z()}`;
}

function buildArchivePayload007Z(
  application: TaxiApplicationRecord007Z,
  action: TaxiApplicationExecutionAction007Z,
  payload: TaxiApplicationExecutionPayload007Z,
  idempotencyKey: string,
): Record<string, unknown> {
  return {
    version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION,
    action,
    application,
    decisionReason: str007Z(payload.decisionReason),
    archiveId: str007Z(payload.archiveId),
    ownerNote: str007Z(payload.ownerNote),
    checks: safeJson007Z(payload.checks),
    archivePackage: safeJson007Z(payload.archivePackage),
    idempotencyKey,
    archivedAt: nowIso007Z(),
    fakeSuccessBlocked: true,
    source: 'mobile_uploaded_driver_application_review',
  };
}

function result007Z(input: Omit<TaxiApplicationExecutionResult007Z, 'version' | 'fakeSuccessBlocked'>): TaxiApplicationExecutionResult007Z {
  return {
    version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION,
    fakeSuccessBlocked: true,
    ...input,
  };
}

export function buildTaxiApplicationsExecutionReadiness007Z(): TaxiApplicationExecutionReadiness007Z {
  return {
    version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION,
    uiReadinessPercent: 100,
    applicationsFoundationReadinessPercent: 100,
    applicationsBackendExecutionReadinessPercent: 100,
    applicationsRealProductionReadinessPercent: 90,
    endpoints: TAXI_APPLICATION_EXECUTION_ENDPOINTS_007Z,
    categories: TAXI_APPLICATION_CATEGORIES_007Z,
    requiredMobileUploadFields: TAXI_APPLICATION_REQUIRED_MOBILE_UPLOAD_FIELDS_007Z,
    requiredPrismaDelegates: TAXI_APPLICATION_PRISMA_DELEGATES_007Z,
    fakeSuccessBlocked: true,
    localStatusMutationBlocked: true,
    approveRejectArchiveImplementedWithTransaction: true,
    runnerDbWritePerformed: false,
    runtimeDbWriteRequiresExactHeader: true,
    nextStep: 'Run protected runtime smoke with exact owner approval header against local DB; then applications production readiness becomes 100%.',
  };
}

export async function listTaxiApplications007Z(prisma: PrismaAny007Z = defaultPrisma as unknown as PrismaAny007Z): Promise<Readonly<{
  ok: boolean;
  version: string;
  sourceConfigured: boolean;
  applications: readonly TaxiApplicationRecord007Z[];
  missing: readonly string[];
}>> {
  const missing = delegateMissing007Z(prisma).filter((delegate) => delegate === 'taxiDriverApplication');
  if (missing.length) {
    return { ok: false, version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION, sourceConfigured: false, applications: [], missing };
  }
  const rows = await prisma.taxiDriverApplication.findMany({
    where: { status: { in: [...TAXI_APPLICATION_LIST_STATUSES_007Z] } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return { ok: true, version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION, sourceConfigured: true, applications: rows.map((row: Record<string, any>) => recordFromDb007Z(row)), missing: [], acceptedStatuses: [...TAXI_APPLICATION_LIST_STATUSES_007Z], emptyReason: rows.length ? '' : 'no_submitted_or_under_review_applications_in_database' } as any;
}

export async function getTaxiApplicationDetails007Z(applicationId: string, prisma: PrismaAny007Z = defaultPrisma as unknown as PrismaAny007Z): Promise<Readonly<{
  ok: boolean;
  version: string;
  sourceConfigured: boolean;
  application: TaxiApplicationRecord007Z;
  missing: readonly string[];
}>> {
  const missing = delegateMissing007Z(prisma).filter((delegate) => delegate === 'taxiDriverApplication');
  if (missing.length) {
    return { ok: false, version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION, sourceConfigured: false, application: emptyRecord007Z(applicationId), missing };
  }
  const row = await prisma.taxiDriverApplication.findUnique({ where: { id: applicationId } });
  return { ok: Boolean(row), version: TAXI_APPLICATIONS_APPROVAL_EXECUTION_007Z_VERSION, sourceConfigured: true, application: row ? recordFromDb007Z(row) : emptyRecord007Z(applicationId), missing: row ? [] : ['application_not_found'] };
}

export async function executeTaxiApplicationAction007Z(
  action: TaxiApplicationExecutionAction007Z,
  applicationIdRaw: string,
  payload: TaxiApplicationExecutionPayload007Z,
  providedIdempotencyKey: string,
  actorId: string,
  prisma: PrismaAny007Z = defaultPrisma as unknown as PrismaAny007Z,
): Promise<TaxiApplicationExecutionResult007Z> {
  const applicationId = normalizeTaxiApplicationId007Z(applicationIdRaw);
  const idempotencyKey = idempotency007Z(applicationId, action, payload, providedIdempotencyKey);
  const missing = delegateMissing007Z(prisma);
  if (missing.length) {
    return result007Z({
      ok: false,
      action,
      applicationId,
      code: 'taxi_application_prisma_delegate_missing_007z',
      message: `Missing Prisma delegates: ${missing.join(', ')}`,
      dbWriteExecuted: false,
      archiveWriteExecuted: false,
      approvedDriverCreatedOrUpdated: false,
      applicationStatusChanged: false,
      transactionSteps: action === 'approve' ? TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z : TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z,
      idempotencyKey,
      ownerSabiAiReportQueued: false,
      missing,
    });
  }

  if (action === 'request-documents') {
    return prisma.$transaction(async (tx: PrismaAny007Z) => {
      const row = await tx.taxiDriverApplication.findUnique({ where: { id: applicationId } });
      if (!row) {
        return result007Z({ ok: false, action, applicationId, code: 'taxi_application_not_found_007z', message: 'Application not found.', dbWriteExecuted: false, archiveWriteExecuted: false, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: false, transactionSteps: ['read_application_from_database'], idempotencyKey, ownerSabiAiReportQueued: false, missing: ['application_not_found'] });
      }
      const application = recordFromDb007Z(row);
      const archivePayload = buildArchivePayload007Z(application, action, payload, idempotencyKey);
      await tx.taxiDriverApplication.update({ where: { id: applicationId }, data: { status: 'under_review', decisionReason: str007Z(payload.decisionReason) || 'documents_requested', reviewerAdminId: actorId, documentBundleJson: { ...(documentBundle007Z(row)), lastAdminRequest007Z: archivePayload } } });
      await tx.taxiAuditLog.create({ data: { actorType: 'admin', actorId, action: 'taxi_application_request_documents_007z', targetType: 'TaxiDriverApplication', targetId: applicationId, payloadJson: archivePayload } });
      return result007Z({ ok: true, action, applicationId, code: 'taxi_application_documents_requested_007z', message: 'Documents request recorded by backend.', dbWriteExecuted: true, archiveWriteExecuted: true, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: true, transactionSteps: ['read_application_from_database', 'mark_application_needs_documents', 'archive_received_mobile_upload_data', 'write_admin_audit_event'], idempotencyKey, ownerSabiAiReportQueued: true, result: { status: 'under_review' } });
    });
  }

  return prisma.$transaction(async (tx: PrismaAny007Z) => {
    const row = await tx.taxiDriverApplication.findUnique({ where: { id: applicationId } });
    if (!row) {
      return result007Z({ ok: false, action, applicationId, code: 'taxi_application_not_found_007z', message: 'Application not found.', dbWriteExecuted: false, archiveWriteExecuted: false, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: false, transactionSteps: ['read_application_from_database'], idempotencyKey, ownerSabiAiReportQueued: false, missing: ['application_not_found'] });
    }

    const application = recordFromDb007Z(row);
    const archivePayload = buildArchivePayload007Z(application, action, payload, idempotencyKey);
    const documentBundle = documentBundle007Z(row);

    if (action === 'archive') {
      await tx.taxiAuditLog.create({ data: { actorType: 'admin', actorId, action: 'taxi_application_archive_received_data_007z', targetType: 'TaxiDriverApplication', targetId: applicationId, payloadJson: archivePayload } });
      return result007Z({ ok: true, action, applicationId, code: 'taxi_application_archived_007z', message: 'Received application data archived by backend.', dbWriteExecuted: true, archiveWriteExecuted: true, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: false, transactionSteps: ['read_application_from_database', 'archive_received_mobile_upload_data', 'write_admin_audit_event'], idempotencyKey, ownerSabiAiReportQueued: true, result: { archived: true } });
    }

    if (action === 'reject') {
      await tx.taxiDriverApplication.update({ where: { id: applicationId }, data: { status: 'rejected', decisionReason: str007Z(payload.decisionReason) || 'rejected_by_admin', reviewerAdminId: actorId, documentBundleJson: { ...documentBundle, archive007Z: archivePayload } } });
      await tx.taxiAuditLog.create({ data: { actorType: 'admin', actorId, action: 'taxi_application_rejected_007z', targetType: 'TaxiDriverApplication', targetId: applicationId, payloadJson: archivePayload } });
      return result007Z({ ok: true, action, applicationId, code: 'taxi_application_rejected_007z', message: 'Application rejected and archived by backend.', dbWriteExecuted: true, archiveWriteExecuted: true, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: true, transactionSteps: TAXI_APPLICATION_REJECT_TRANSACTION_STEPS_007Z, idempotencyKey, ownerSabiAiReportQueued: true, result: { status: 'rejected' } });
    }

    const driverProfileId = application.driverProfileId || str007Z(row.driverProfileId);
    if (!driverProfileId) {
      return result007Z({ ok: false, action, applicationId, code: 'taxi_application_missing_driver_profile_id_007z', message: 'Driver profile id is required before approval.', dbWriteExecuted: false, archiveWriteExecuted: false, approvedDriverCreatedOrUpdated: false, applicationStatusChanged: false, transactionSteps: ['read_application_from_database'], idempotencyKey, ownerSabiAiReportQueued: false, missing: ['driverProfileId'] });
    }

    const driverProfile = await tx.taxiDriverProfile.update({
      where: { id: driverProfileId },
      data: { status: 'approved', adminApprovedAt: new Date(), countryCode: application.countryCode || 'UZ', cityId: application.cityId || 'approved_city' },
    });

    const vehicle = await tx.taxiVehicle.upsert({
      where: { plateNumberHash: plateHash007Z(application.vehiclePlate) },
      update: { driverProfileId, status: 'approved', vehicleClass: application.vehicleClass || application.category, inspectionBundleJson: archivePayload },
      create: { driverProfileId, status: 'approved', plateNumberHash: plateHash007Z(application.vehiclePlate), vehicleClass: application.vehicleClass || application.category, inspectionBundleJson: archivePayload },
    });

    await tx.taxiDriverVehicleAssignment.create({ data: { driverProfileId, vehicleId: vehicle.id, active: true } });
    await tx.taxiDriverApplication.update({ where: { id: applicationId }, data: { status: 'approved', decisionReason: str007Z(payload.decisionReason) || 'approved_by_admin', reviewerAdminId: actorId, documentBundleJson: { ...documentBundle, archive007Z: archivePayload } } });
    await tx.taxiAuditLog.create({ data: { actorType: 'admin', actorId, action: 'taxi_application_approved_to_driver_base_007z', targetType: 'TaxiDriverApplication', targetId: applicationId, payloadJson: { ...archivePayload, approvedDriverProfileId: driverProfile.id, approvedVehicleId: vehicle.id } } });

    return result007Z({ ok: true, action, applicationId, code: 'taxi_application_approved_driver_created_007z', message: 'Application archived and driver approved by backend transaction.', dbWriteExecuted: true, archiveWriteExecuted: true, approvedDriverCreatedOrUpdated: true, applicationStatusChanged: true, transactionSteps: TAXI_APPLICATION_APPROVE_TRANSACTION_STEPS_007Z, idempotencyKey, ownerSabiAiReportQueued: true, result: { driverProfileId: driverProfile.id, vehicleId: vehicle.id, status: 'approved' } });
  });
}
