import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A,
  TAXI_ORDERS_TRIP_SUPPORT_CATEGORIES_011A,
  TAXI_ORDERS_TRIP_SUPPORT_CREATE_ACTION_011A,
  TAXI_ORDERS_TRIP_SUPPORT_ENDPOINTS_011A,
  TAXI_ORDERS_TRIP_SUPPORT_REQUIRED_DELEGATES_011A,
  TAXI_ORDERS_TRIP_SUPPORT_STATUS_ACTION_011A,
  TAXI_ORDERS_TRIP_SUPPORT_STATUSES_011A,
  TAXI_ORDERS_TRIP_SUPPORT_WORKFLOW_STAGES_011A,
  TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION,
} from './constants';
import type {
  TaxiOrdersTripSupportCaseSummary011A,
  TaxiOrdersTripSupportCategory011A,
  TaxiOrdersTripSupportCreateInput011A,
  TaxiOrdersTripSupportList011A,
  TaxiOrdersTripSupportReadiness011A,
  TaxiOrdersTripSupportStatus011A,
  TaxiOrdersTripSupportStatusResponse011A,
  TaxiOrdersTripSupportUpdateInput011A,
  TaxiOrdersTripSupportWriteResult011A,
} from './types';

type PrismaAny011A = Record<string, any>;
type RowAny011A = Record<string, any>;

function str011A(value: unknown): string {
  return String(value ?? '').trim();
}

function int011A(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function mask011A(value: unknown): string {
  const raw = str011A(value);
  if (!raw) return '';
  if (raw.length <= 8) return `${raw.slice(0, 2)}***`;
  return `${raw.slice(0, 4)}***${raw.slice(-3)}`;
}

function iso011A(value: unknown): string {
  if (!value) return '';
  try {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  } catch {
    return '';
  }
}

async function count011A(prisma: PrismaAny011A, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function missingDelegates011A(prisma: PrismaAny011A): string[] {
  return TAXI_ORDERS_TRIP_SUPPORT_REQUIRED_DELEGATES_011A.filter((delegate) => !prisma[delegate]);
}

async function counts011A(prisma: PrismaAny011A): Promise<TaxiOrdersTripSupportStatusResponse011A['counts']> {
  return {
    taxiTrips: await count011A(prisma, 'taxiTrip'),
    tripSupportCases: await count011A(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A } }),
    openTripSupportCases: await count011A(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A, status: 'open' } }),
    underReviewTripSupportCases: await count011A(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A, status: 'under_review' } }),
    escalatedTripSupportCases: await count011A(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A, status: 'escalated' } }),
    resolvedTripSupportCases: await count011A(prisma, 'taxiSupportCase', { where: { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A, status: 'resolved' } }),
    auditLogs: await count011A(prisma, 'taxiAuditLog'),
  };
}

function supportStatus011A(value: unknown): TaxiOrdersTripSupportStatus011A {
  const status = str011A(value || 'under_review').toLowerCase();
  return (TAXI_ORDERS_TRIP_SUPPORT_STATUSES_011A as readonly string[]).includes(status)
    ? status as TaxiOrdersTripSupportStatus011A
    : 'under_review';
}

function supportCategory011A(value: unknown): TaxiOrdersTripSupportCategory011A {
  const category = str011A(value || 'trip_issue').toLowerCase();
  return (TAXI_ORDERS_TRIP_SUPPORT_CATEGORIES_011A as readonly string[]).includes(category)
    ? category as TaxiOrdersTripSupportCategory011A
    : 'trip_issue';
}

function workflowStage011A(value: unknown): string {
  const stage = str011A(value || 'triage').toLowerCase();
  return (TAXI_ORDERS_TRIP_SUPPORT_WORKFLOW_STAGES_011A as readonly string[]).includes(stage) ? stage : 'triage';
}

function writeResult011A(overrides: Partial<TaxiOrdersTripSupportWriteResult011A>): TaxiOrdersTripSupportWriteResult011A {
  return {
    ok: false,
    statusCode: 409,
    version: TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION,
    code: 'taxi_orders_011a_trip_support_not_executed',
    supportCaseId: '',
    tripId: '',
    status: '',
    category: '',
    workflowStage: '',
    idempotencyKey: '',
    existingTaxiTripVerified: false,
    fakeTripCreateBlocked: true,
    fakeCaseCreateBlocked: true,
    rawPiiExposedToList: false,
    passengerDriverDirectContactBlocked: true,
    adminMediatedContactOnly: true,
    noLocalPenalty: true,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
    ...overrides,
  };
}

function safeCase011A(row: RowAny011A): TaxiOrdersTripSupportCaseSummary011A {
  const trip = row.trip || {};
  const payload = row.payloadJson || row.metadata || {};
  return {
    supportCaseId: str011A(row.id),
    tripId: str011A(row.tripId),
    status: str011A(row.status),
    caseType: str011A(row.caseType),
    category: str011A(payload.category || row.category || TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A),
    priority: int011A(row.priority, 0),
    assignedAdminIdMasked: mask011A(row.assignedAdminId),
    createdAt: iso011A(row.createdAt),
    updatedAt: iso011A(row.updatedAt),
    safeTripRef: {
      tripId: str011A(row.tripId || trip.id),
      driverProfileIdMasked: mask011A(trip.driverProfileId),
      vehicleIdMasked: mask011A(trip.vehicleId),
      tripStatus: str011A(trip.status),
      completedAt: iso011A(trip.completedAt),
    },
    rawPiiBlocked: true,
    contactMediatedByAdmin: true,
  };
}

export function buildTaxiOrdersTripSupportAppealsReadiness011A(): TaxiOrdersTripSupportReadiness011A {
  return {
    version: TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION,
    servicePurpose: 'information_service_panel_for_passenger_driver_trip_support_appeals_linked_to_real_taxi_trip',
    endpoints: TAXI_ORDERS_TRIP_SUPPORT_ENDPOINTS_011A,
    requiredPrismaDelegates: TAXI_ORDERS_TRIP_SUPPORT_REQUIRED_DELEGATES_011A,
    supportCaseModel: 'TaxiSupportCase',
    auditModel: 'TaxiAuditLog',
    tripModel: 'TaxiTrip',
    createsFromExistingTaxiTripOnly: true,
    supportsPassengerAppeals: true,
    supportsDriverAppeals: true,
    supportsTripDisputes: true,
    rawPassengerPiiBlockedInList: true,
    rawDriverPiiBlockedInList: true,
    adminMediatedContactOnly: true,
    passengerDriverDirectContactBlocked: true,
    protectedCreateRequiresExactHeader: true,
    protectedUpdateRequiresExactHeader: true,
    noFakeTripCreate: true,
    noFakeCaseCreate: true,
    noLocalPenalty: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteOnlyThroughProtectedBackend: true,
  };
}

export async function loadTaxiOrdersTripSupportAppealsStatus011A(
  prisma: PrismaAny011A = defaultPrisma as unknown as PrismaAny011A,
): Promise<TaxiOrdersTripSupportStatusResponse011A> {
  const counts = await counts011A(prisma);
  return {
    ok: true,
    version: TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION,
    code: 'taxi_orders_011a_trip_support_status_loaded',
    counts,
    canCreateSupportCaseFromTrip: counts.taxiTrips > 0,
    nextAdminAction: counts.taxiTrips > 0
      ? 'Find the real TaxiTrip from passenger or driver appeal, then create a support case with exact approval. Do not create fake trips.'
      : 'No real TaxiTrip exists yet. Support/appeal case creation must wait for a real trip; fake trip creation is blocked.',
    noFakeRows: true,
    noFakeCreate: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function listTaxiOrdersTripSupportAppealCases011A(
  options: { limit?: unknown; status?: unknown; category?: unknown } = {},
  prisma: PrismaAny011A = defaultPrisma as unknown as PrismaAny011A,
): Promise<TaxiOrdersTripSupportList011A> {
  const counts = await counts011A(prisma);
  const limit = Math.min(Math.max(int011A(options.limit, 20), 1), 50);
  const status = str011A(options.status).toLowerCase();
  const category = str011A(options.category).toLowerCase();
  const where: Record<string, unknown> = { caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A };
  if ((TAXI_ORDERS_TRIP_SUPPORT_STATUSES_011A as readonly string[]).includes(status)) where.status = status;
  if ((TAXI_ORDERS_TRIP_SUPPORT_CATEGORIES_011A as readonly string[]).includes(category)) {
    where.payloadJson = { path: ['category'], equals: category };
  }

  let rows: RowAny011A[] = [];
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
    version: TAXI_ORDERS_TRIP_SUPPORT_APPEALS_011A_VERSION,
    code: 'taxi_orders_011a_trip_support_cases_loaded_redacted',
    counts,
    cases: rows.map(safeCase011A),
    readOnlyList: true,
    safeRedaction: true,
    rawPiiBlocked: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiOrdersTripSupportAppealFromTrip011A(
  input: TaxiOrdersTripSupportCreateInput011A,
  prisma: PrismaAny011A = defaultPrisma as unknown as PrismaAny011A,
): Promise<TaxiOrdersTripSupportWriteResult011A> {
  const tripId = str011A(input.tripId);
  const category = supportCategory011A(input.category);
  const issueSummary = str011A(input.issueSummary);
  const passengerMessage = str011A(input.passengerMessage);
  const driverMessage = str011A(input.driverMessage);
  const evidenceHint = str011A(input.evidenceHint);
  const assignedAdminId = str011A(input.assignedAdminId || 'admin-ui');
  const priority = Math.min(Math.max(int011A(input.priority, 1), 0), 10);
  const idempotencyKey = str011A(input.idempotencyKey);
  const reason = str011A(input.reason) || 'admin_orders_011a_trip_support_case_from_existing_trip';

  if (!tripId || !issueSummary || !idempotencyKey) {
    return writeResult011A({
      statusCode: 400,
      code: 'taxi_orders_011a_required_fields_missing_no_fake_case_create',
      tripId,
      category,
      idempotencyKey,
      message: 'tripId, issueSummary and idempotencyKey are required.',
    });
  }

  const missing = missingDelegates011A(prisma);
  if (missing.length) {
    return writeResult011A({
      statusCode: 409,
      code: 'taxi_orders_011a_prisma_delegate_missing_no_fake_case_create',
      tripId,
      category,
      idempotencyKey,
      message: missing.join(', '),
    });
  }

  const trip = await prisma.taxiTrip.findUnique({ where: { id: tripId } }).catch(() => null);
  if (!trip) {
    return writeResult011A({
      statusCode: 404,
      code: 'taxi_orders_011a_existing_trip_not_found_no_fake_trip_create',
      tripId,
      category,
      idempotencyKey,
    });
  }

  const existingOpen = await prisma.taxiSupportCase.findFirst({
    where: { tripId, caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A, status: { in: ['open', 'waiting_for_user', 'under_review', 'escalated'] } },
    orderBy: { createdAt: 'desc' },
  }).catch(() => null);

  if (existingOpen) {
    return writeResult011A({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_011a_trip_support_case_already_open_idempotent',
      supportCaseId: str011A(existingOpen.id),
      tripId,
      status: str011A(existingOpen.status),
      category,
      workflowStage: 'opened',
      idempotencyKey,
      existingTaxiTripVerified: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  try {
    const execute = async (tx: PrismaAny011A): Promise<RowAny011A> => {
      const supportCase = await tx.taxiSupportCase.create({
        data: {
          tripId,
          caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A,
          status: 'open',
          priority,
          assignedAdminId,
        },
      });
      await tx.taxiAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: assignedAdminId || 'admin-ui',
          action: TAXI_ORDERS_TRIP_SUPPORT_CREATE_ACTION_011A,
          targetType: 'TaxiSupportCase',
          targetId: str011A(supportCase.id),
          payloadJson: {
            tripId,
            caseType: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A,
            category,
            issueSummary,
            passengerMessage,
            driverMessage,
            evidenceHint,
            workflowStage: 'opened',
            reason,
            idempotencyKey,
            rawPiiBlockedInList: true,
            passengerDriverDirectContactBlocked: true,
            adminMediatedContactOnly: true,
            noLocalPenalty: true,
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
    return writeResult011A({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_011a_trip_support_case_created_from_existing_trip_with_audit',
      supportCaseId: str011A(supportCase.id),
      tripId,
      status: str011A(supportCase.status || 'open'),
      category,
      workflowStage: 'opened',
      idempotencyKey,
      existingTaxiTripVerified: true,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
    });
  } catch (error) {
    return writeResult011A({
      statusCode: 409,
      code: 'taxi_orders_011a_trip_support_case_create_failed_no_fake_case_created',
      tripId,
      category,
      idempotencyKey,
      existingTaxiTripVerified: true,
      message: error instanceof Error ? error.message : 'create_failed',
    });
  }
}

export async function updateTaxiOrdersTripSupportAppealStatus011A(
  input: TaxiOrdersTripSupportUpdateInput011A,
  prisma: PrismaAny011A = defaultPrisma as unknown as PrismaAny011A,
): Promise<TaxiOrdersTripSupportWriteResult011A> {
  const supportCaseId = str011A(input.supportCaseId);
  const status = supportStatus011A(input.status);
  const workflowStage = workflowStage011A(input.workflowStage);
  const adminNote = str011A(input.adminNote);
  const idempotencyKey = str011A(input.idempotencyKey);
  const reason = str011A(input.reason) || 'admin_orders_011a_trip_support_status_update';

  if (!supportCaseId || !idempotencyKey) {
    return writeResult011A({ statusCode: 400, code: 'taxi_orders_011a_update_required_fields_missing_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey });
  }

  const missing = missingDelegates011A(prisma).filter((delegate) => delegate !== 'taxiTrip');
  if (missing.length) {
    return writeResult011A({ statusCode: 409, code: 'taxi_orders_011a_prisma_delegate_missing_no_fake_status_update', supportCaseId, status, workflowStage, idempotencyKey, message: missing.join(', ') });
  }

  const existing = await prisma.taxiSupportCase.findUnique({ where: { id: supportCaseId } }).catch(() => null);
  if (!existing || str011A(existing.caseType) !== TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A) {
    return writeResult011A({ statusCode: 404, code: 'taxi_orders_011a_trip_support_case_not_found_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey });
  }

  try {
    const execute = async (tx: PrismaAny011A): Promise<RowAny011A> => {
      const updated = await tx.taxiSupportCase.update({ where: { id: supportCaseId }, data: { status } });
      await tx.taxiAuditLog.create({
        data: {
          actorType: 'admin',
          actorId: str011A(existing.assignedAdminId || 'admin-ui'),
          action: TAXI_ORDERS_TRIP_SUPPORT_STATUS_ACTION_011A,
          targetType: 'TaxiSupportCase',
          targetId: supportCaseId,
          payloadJson: {
            tripId: str011A(existing.tripId),
            previousStatus: str011A(existing.status),
            status,
            workflowStage,
            adminNote,
            reason,
            idempotencyKey,
            rawPiiBlockedInList: true,
            passengerDriverDirectContactBlocked: true,
            adminMediatedContactOnly: true,
            noLocalPenalty: true,
            providerDispatch: false,
            walletMutation: false,
          },
        },
      });
      return updated;
    };
    const updated = typeof prisma.$transaction === 'function' ? await prisma.$transaction(execute) : await execute(prisma);
    return writeResult011A({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_011a_trip_support_case_status_updated_with_audit',
      supportCaseId,
      tripId: str011A(updated.tripId),
      status: str011A(updated.status),
      category: TAXI_ORDERS_TRIP_SUPPORT_APPEAL_CASE_TYPE_011A,
      workflowStage,
      idempotencyKey,
      existingTaxiTripVerified: !!updated.tripId,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
    });
  } catch (error) {
    return writeResult011A({ statusCode: 409, code: 'taxi_orders_011a_trip_support_status_update_failed_no_fake_status', supportCaseId, status, workflowStage, idempotencyKey, message: error instanceof Error ? error.message : 'update_failed' });
  }
}
