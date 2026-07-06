import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B,
  TAXI_ORDERS_LOST_PROPERTY_CREATE_ACTION_010B,
  TAXI_ORDERS_LOST_PROPERTY_ENDPOINTS_010B,
  TAXI_ORDERS_LOST_PROPERTY_REQUIRED_DELEGATES_010B,
  TAXI_ORDERS_LOST_PROPERTY_STATUS_ACTION_010B,
  TAXI_ORDERS_LOST_PROPERTY_SUPPORT_STATUSES_010B,
  TAXI_ORDERS_LOST_PROPERTY_WORKFLOW_STAGES_010B,
  TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION,
} from './constants';
import type {
  TaxiOrdersLostPropertyCaseSummary010B,
  TaxiOrdersLostPropertyCreateInput010B,
  TaxiOrdersLostPropertyList010B,
  TaxiOrdersLostPropertyReadiness010B,
  TaxiOrdersLostPropertyStatus010B,
  TaxiOrdersLostPropertySupportStatus010B,
  TaxiOrdersLostPropertyUpdateInput010B,
  TaxiOrdersLostPropertyWriteResult010B,
} from './types';

type PrismaAny010B = Record<string, any>;
type RowAny010B = Record<string, any>;

function str010B(value: unknown): string {
  return String(value ?? '').trim();
}

function int010B(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function mask010B(value: unknown): string {
  const raw = str010B(value);
  if (!raw) return '';
  if (raw.length <= 8) return `${raw.slice(0, 2)}***`;
  return `${raw.slice(0, 4)}***${raw.slice(-3)}`;
}

function iso010B(value: unknown): string {
  if (!value) return '';
  try {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  } catch {
    return '';
  }
}

async function count010B(prisma: PrismaAny010B, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function missingDelegates010B(prisma: PrismaAny010B): string[] {
  return TAXI_ORDERS_LOST_PROPERTY_REQUIRED_DELEGATES_010B.filter((delegate) => !prisma[delegate]);
}

async function counts010B(prisma: PrismaAny010B) {
  return {
    taxiTrips: await count010B(prisma, 'taxiTrip'),
    lostPropertyCases: await count010B(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B } }),
    openLostPropertyCases: await count010B(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B, status: 'open' } }),
    underReviewLostPropertyCases: await count010B(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B, status: 'under_review' } }),
    resolvedLostPropertyCases: await count010B(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B, status: 'resolved' } }),
    auditLogs: await count010B(prisma, 'taxiAuditLog'),
  };
}

function supportStatus010B(value: unknown): TaxiOrdersLostPropertySupportStatus010B {
  const status = str010B(value || 'under_review').toLowerCase();
  return (TAXI_ORDERS_LOST_PROPERTY_SUPPORT_STATUSES_010B as readonly string[]).includes(status)
    ? status as TaxiOrdersLostPropertySupportStatus010B
    : 'under_review';
}

function workflowStage010B(value: unknown): string {
  const stage = str010B(value || 'driver_contact_requested').toLowerCase();
  return (TAXI_ORDERS_LOST_PROPERTY_WORKFLOW_STAGES_010B as readonly string[]).includes(stage) ? stage : 'driver_contact_requested';
}

function writeResult010B(overrides: Partial<TaxiOrdersLostPropertyWriteResult010B>): TaxiOrdersLostPropertyWriteResult010B {
  return {
    ok: false,
    statusCode: 409,
    version: TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION,
    code: 'taxi_orders_010b_lost_property_not_executed',
    supportCaseId: '',
    tripId: '',
    status: '',
    workflowStage: '',
    idempotencyKey: '',
    existingTaxiTripVerified: false,
    fakeTripCreateBlocked: true,
    fakeCaseCreateBlocked: true,
    rawPiiExposedToList: false,
    passengerDriverDirectContactBlocked: true,
    adminMediatedContactOnly: true,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
    ...overrides,
  };
}

function safeCase010B(row: RowAny010B): TaxiOrdersLostPropertyCaseSummary010B {
  const trip = row.trip || {};
  return {
    supportCaseId: str010B(row.id),
    tripId: str010B(row.tripId),
    status: str010B(row.status),
    caseType: str010B(row.caseType),
    priority: int010B(row.priority, 0),
    assignedAdminIdMasked: mask010B(row.assignedAdminId),
    createdAt: iso010B(row.createdAt),
    updatedAt: iso010B(row.updatedAt),
    safeTripRef: {
      tripId: str010B(row.tripId || trip.id),
      driverProfileIdMasked: mask010B(trip.driverProfileId),
      vehicleIdMasked: mask010B(trip.vehicleId),
      tripStatus: str010B(trip.status),
      completedAt: iso010B(trip.completedAt),
    },
    rawPiiBlocked: true,
    contactMediatedByAdmin: true,
  };
}

export function buildTaxiOrdersLostPropertyReadiness010B(): TaxiOrdersLostPropertyReadiness010B {
  return {
    version: TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION,
    servicePurpose: 'information_service_panel_for_passenger_lost_property_requests_linked_to_real_taxi_trip',
    endpoints: TAXI_ORDERS_LOST_PROPERTY_ENDPOINTS_010B,
    requiredPrismaDelegates: TAXI_ORDERS_LOST_PROPERTY_REQUIRED_DELEGATES_010B,
    supportCaseModel: 'TaxiSupportCase',
    auditModel: 'TaxiAuditLog',
    tripModel: 'TaxiTrip',
    createsFromExistingTaxiTripOnly: true,
    rawPassengerPiiBlockedInList: true,
    rawDriverPiiBlockedInList: true,
    adminMediatedContactOnly: true,
    passengerDriverDirectContactBlocked: true,
    protectedCreateRequiresExactHeader: true,
    protectedUpdateRequiresExactHeader: true,
    noFakeTripCreate: true,
    noFakeCaseCreate: true,
    noLocalArchive: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteOnlyThroughProtectedBackend: true,
  };
}

export async function loadTaxiOrdersLostPropertyStatus010B(
  prisma: PrismaAny010B = defaultPrisma as unknown as PrismaAny010B,
): Promise<TaxiOrdersLostPropertyStatus010B> {
  const counts = await counts010B(prisma);
  return {
    ok: true,
    version: TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION,
    code: 'taxi_orders_010b_lost_property_status_loaded',
    counts,
    canCreateLostPropertyCaseFromTrip: counts.taxiTrips > 0,
    nextAdminAction: counts.taxiTrips > 0
      ? 'Find the real TaxiTrip from passenger request, then create a Lost Property case with exact approval. Do not create fake trips.'
      : 'No real TaxiTrip exists yet. Lost Property case creation must wait for a real trip; fake trip creation is blocked.',
    noFakeRows: true,
    noFakeCreate: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function listTaxiOrdersLostPropertyCases010B(
  options: { limit?: unknown; status?: unknown } = {},
  prisma: PrismaAny010B = defaultPrisma as unknown as PrismaAny010B,
): Promise<TaxiOrdersLostPropertyList010B> {
  const counts = await counts010B(prisma);
  const limit = Math.min(Math.max(int010B(options.limit, 20), 1), 50);
  const status = str010B(options.status).toLowerCase();
  const where: Record<string, unknown> = { caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B };
  if ((TAXI_ORDERS_LOST_PROPERTY_SUPPORT_STATUSES_010B as readonly string[]).includes(status)) where.status = status;

  let rows: RowAny010B[] = [];
  try {
    if (prisma.taxiSupportCase && typeof prisma.taxiSupportCase.findMany === 'function') {
      rows = await prisma.taxiSupportCase.findMany({
        where,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { trip: true },
      });
    }
  } catch {
    rows = [];
  }

  return {
    ok: true,
    version: TAXI_ORDERS_LOST_PROPERTY_CASES_010B_VERSION,
    code: 'taxi_orders_010b_lost_property_cases_loaded',
    counts,
    cases: rows.map(safeCase010B),
    readOnlyList: true,
    safeRedaction: true,
    rawPiiBlocked: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiOrdersLostPropertyCaseFromTrip010B(
  input: TaxiOrdersLostPropertyCreateInput010B,
  prisma: PrismaAny010B = defaultPrisma as unknown as PrismaAny010B,
): Promise<TaxiOrdersLostPropertyWriteResult010B> {
  const tripId = str010B(input.tripId);
  const itemDescription = str010B(input.itemDescription);
  const passengerMessage = str010B(input.passengerMessage);
  const lastSeenHint = str010B(input.lastSeenHint);
  const assignedAdminId = str010B(input.assignedAdminId || 'admin-ui');
  const priority = Math.min(Math.max(int010B(input.priority, 1), 0), 10);
  const idempotencyKey = str010B(input.idempotencyKey);
  const reason = str010B(input.reason) || 'admin_orders_010b_lost_property_case_from_existing_trip';

  if (!tripId || !itemDescription || !idempotencyKey) {
    return writeResult010B({
      statusCode: 400,
      code: 'taxi_orders_010b_required_fields_missing_no_fake_case_create',
      tripId,
      idempotencyKey,
      message: 'tripId, itemDescription and idempotencyKey are required.',
    });
  }

  const missing = missingDelegates010B(prisma);
  if (missing.length) {
    return writeResult010B({
      statusCode: 409,
      code: 'taxi_orders_010b_prisma_delegate_missing_no_fake_case_create',
      tripId,
      idempotencyKey,
      message: missing.join(', '),
    });
  }

  const trip = await prisma.taxiTrip.findUnique({ where: { id: tripId } }).catch(() => null);
  if (!trip) {
    return writeResult010B({
      statusCode: 404,
      code: 'taxi_orders_010b_existing_trip_not_found_no_fake_trip_create',
      tripId,
      idempotencyKey,
    });
  }

  const existingOpen = await prisma.taxiSupportCase.findFirst({
    where: { tripId, caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B, status: { in: ['open', 'waiting_for_user', 'under_review', 'escalated'] } },
    orderBy: { createdAt: 'desc' },
  }).catch(() => null);

  if (existingOpen) {
    return writeResult010B({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_010b_lost_property_case_already_open_idempotent',
      supportCaseId: str010B(existingOpen.id),
      tripId,
      status: str010B(existingOpen.status),
      workflowStage: 'opened',
      idempotencyKey,
      existingTaxiTripVerified: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  try {
    const execute = async (tx: PrismaAny010B): Promise<RowAny010B> => {
      const supportCase = await tx.taxiSupportCase.create({
        data: {
          tripId,
          caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B,
          status: 'open',
          priority,
          assignedAdminId,
        },
      });
      await tx.taxiAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: assignedAdminId || 'admin-ui',
          action: TAXI_ORDERS_LOST_PROPERTY_CREATE_ACTION_010B,
          targetType: 'TaxiSupportCase',
          targetId: str010B(supportCase.id),
          payloadJson: {
            tripId,
            caseType: TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B,
            itemDescription,
            passengerMessage,
            lastSeenHint,
            workflowStage: 'opened',
            reason,
            idempotencyKey,
            rawPiiBlockedInList: true,
            passengerDriverDirectContactBlocked: true,
            adminMediatedContactOnly: true,
            fakeTripCreateBlocked: true,
            fakeCaseCreateBlocked: true,
            providerDispatch: false,
            walletMutation: false,
          },
        },
      });
      return supportCase;
    };
    const supportCase = typeof prisma.$transaction === 'function' ? await prisma.$transaction(execute) : await execute(prisma);
    return writeResult010B({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_010b_lost_property_case_created_from_existing_trip_with_audit',
      supportCaseId: str010B(supportCase.id),
      tripId,
      status: str010B(supportCase.status || 'open'),
      workflowStage: 'opened',
      idempotencyKey,
      existingTaxiTripVerified: true,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
    });
  } catch (error) {
    return writeResult010B({
      statusCode: 409,
      code: 'taxi_orders_010b_lost_property_case_create_failed_no_fake_case_created',
      tripId,
      idempotencyKey,
      existingTaxiTripVerified: true,
      message: error instanceof Error ? error.message : 'create_failed',
    });
  }
}

export async function updateTaxiOrdersLostPropertyCaseStatus010B(
  input: TaxiOrdersLostPropertyUpdateInput010B,
  prisma: PrismaAny010B = defaultPrisma as unknown as PrismaAny010B,
): Promise<TaxiOrdersLostPropertyWriteResult010B> {
  const supportCaseId = str010B(input.supportCaseId);
  const status = supportStatus010B(input.status);
  const workflowStage = workflowStage010B(input.workflowStage);
  const adminNote = str010B(input.adminNote);
  const idempotencyKey = str010B(input.idempotencyKey);
  const reason = str010B(input.reason) || 'admin_orders_010b_lost_property_status_update';

  if (!supportCaseId || !idempotencyKey) {
    return writeResult010B({ statusCode: 400, code: 'taxi_orders_010b_update_required_fields_missing_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey });
  }

  const missing = missingDelegates010B(prisma).filter((delegate) => delegate !== 'taxiTrip');
  if (missing.length) {
    return writeResult010B({ statusCode: 409, code: 'taxi_orders_010b_prisma_delegate_missing_no_fake_status_update', supportCaseId, status, workflowStage, idempotencyKey, message: missing.join(', ') });
  }

  const existing = await prisma.taxiSupportCase.findUnique({ where: { id: supportCaseId } }).catch(() => null);
  if (!existing || str010B(existing.caseType) !== TAXI_ORDERS_LOST_PROPERTY_CASE_TYPE_010B) {
    return writeResult010B({ statusCode: 404, code: 'taxi_orders_010b_lost_property_case_not_found_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey });
  }

  try {
    const execute = async (tx: PrismaAny010B): Promise<RowAny010B> => {
      const updated = await tx.taxiSupportCase.update({ where: { id: supportCaseId }, data: { status } });
      await tx.taxiAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: str010B(existing.assignedAdminId || 'admin-ui'),
          action: TAXI_ORDERS_LOST_PROPERTY_STATUS_ACTION_010B,
          targetType: 'TaxiSupportCase',
          targetId: supportCaseId,
          payloadJson: {
            tripId: str010B(existing.tripId),
            previousStatus: str010B(existing.status),
            status,
            workflowStage,
            adminNote,
            reason,
            idempotencyKey,
            rawPiiBlockedInList: true,
            passengerDriverDirectContactBlocked: true,
            adminMediatedContactOnly: true,
            providerDispatch: false,
            walletMutation: false,
          },
        },
      });
      return updated;
    };
    const updated = typeof prisma.$transaction === 'function' ? await prisma.$transaction(execute) : await execute(prisma);
    return writeResult010B({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_010b_lost_property_case_status_updated_with_audit',
      supportCaseId,
      tripId: str010B(updated.tripId),
      status: str010B(updated.status),
      workflowStage,
      idempotencyKey,
      existingTaxiTripVerified: !!updated.tripId,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
    });
  } catch (error) {
    return writeResult010B({ statusCode: 409, code: 'taxi_orders_010b_lost_property_status_update_failed_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey, message: error instanceof Error ? error.message : 'update_failed' });
  }
}
