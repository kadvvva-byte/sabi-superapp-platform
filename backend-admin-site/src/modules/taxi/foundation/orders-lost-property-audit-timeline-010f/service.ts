import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_ACTIONS_010F,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_ALLOWED_PAYLOAD_KEYS_010F,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_CASE_TYPE_010F,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_TARGET_TYPE_010F,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_010F_VERSION,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_ENDPOINTS_010F,
  TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_REQUIRED_DELEGATES_010F,
} from './constants';
import type {
  TaxiOrdersLostPropertyAuditPayloadSummary010F,
  TaxiOrdersLostPropertyAuditTimelineItem010F,
  TaxiOrdersLostPropertyAuditTimelineReadiness010F,
  TaxiOrdersLostPropertyAuditTimelineResult010F,
} from './types';

type PrismaAny010F = Record<string, any>;
type RowAny010F = Record<string, any>;

function str010F(value: unknown): string {
  return String(value ?? '').trim();
}

function int010F(value: unknown, fallback = 20): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function iso010F(value: unknown): string {
  if (!value) return '';
  try {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  } catch {
    return '';
  }
}

function mask010F(value: unknown): string {
  const raw = str010F(value);
  if (!raw) return '';
  if (raw.length <= 8) return `${raw.slice(0, 2)}***`;
  return `${raw.slice(0, 4)}***${raw.slice(-3)}`;
}

function payloadObject010F(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return {};
  return payload as Record<string, unknown>;
}

function safePayloadSummary010F(payload: unknown): TaxiOrdersLostPropertyAuditPayloadSummary010F {
  const source = payloadObject010F(payload);
  const summary: Record<string, string | number | boolean> = {};
  for (const key of TAXI_ORDERS_LOST_PROPERTY_AUDIT_ALLOWED_PAYLOAD_KEYS_010F) {
    const value = source[key];
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') summary[key] = value;
  }
  if ('itemDescription' in source) summary.itemDescription = 'redacted_item_description_present';
  if ('passengerMessage' in source) summary.passengerMessage = 'redacted_passenger_message_present';
  if ('lastSeenHint' in source) summary.lastSeenHint = 'redacted_last_seen_hint_present';
  if ('adminNote' in source) summary.adminNote = 'redacted_admin_note_present';
  summary.rawPiiBlockedInTimeline = true;
  return summary;
}

function missingDelegates010F(prisma: PrismaAny010F): string[] {
  return TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_REQUIRED_DELEGATES_010F.filter((delegate) => !prisma[delegate]);
}

function safeTimelineItem010F(row: RowAny010F, fallbackTripId = ''): TaxiOrdersLostPropertyAuditTimelineItem010F {
  const payload = payloadObject010F(row.payloadJson);
  const supportCaseId = str010F(row.targetId);
  const tripId = str010F(payload.tripId || fallbackTripId);
  return {
    auditId: str010F(row.id),
    supportCaseId,
    tripId,
    actorType: str010F(row.actorType),
    actorIdMasked: mask010F(row.actorId),
    action: str010F(row.action),
    targetType: str010F(row.targetType),
    createdAt: iso010F(row.createdAt),
    payloadSummary: safePayloadSummary010F(payload),
    rawPiiBlocked: true,
    adminNoteRedacted: true,
    itemDescriptionRedacted: true,
    passengerMessageRedacted: true,
    contactMediatedByAdmin: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export function buildTaxiOrdersLostPropertyAuditTimelineReadiness010F(): TaxiOrdersLostPropertyAuditTimelineReadiness010F {
  return {
    version: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_010F_VERSION,
    servicePurpose: 'read_only_redacted_audit_timeline_for_lost_property_cases_linked_to_real_taxi_trip',
    endpoints: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_ENDPOINTS_010F,
    requiredPrismaDelegates: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_REQUIRED_DELEGATES_010F,
    auditModel: 'TaxiAuditLog',
    supportCaseModel: 'TaxiSupportCase',
    caseType: TAXI_ORDERS_LOST_PROPERTY_AUDIT_CASE_TYPE_010F,
    readOnlyTimeline: true,
    createsCase: false,
    updatesCase: false,
    deletesCase: false,
    rawPassengerPiiBlocked: true,
    rawDriverPiiBlocked: true,
    adminNoteRedacted: true,
    itemDescriptionRedacted: true,
    passengerMessageRedacted: true,
    passengerDriverDirectContactBlocked: true,
    adminMediatedContactOnly: true,
    noFakeTripCreate: true,
    noFakeCaseCreate: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function loadTaxiOrdersLostPropertyAuditTimeline010F(
  input: { supportCaseId?: unknown; tripId?: unknown; limit?: unknown } = {},
  prisma: PrismaAny010F = defaultPrisma as unknown as PrismaAny010F,
): Promise<TaxiOrdersLostPropertyAuditTimelineResult010F> {
  const supportCaseId = str010F(input.supportCaseId);
  const tripId = str010F(input.tripId);
  const limit = Math.min(Math.max(int010F(input.limit, 20), 1), 50);
  const missing = missingDelegates010F(prisma);

  if (missing.length) {
    return {
      ok: true,
      version: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_010F_VERSION,
      code: 'taxi_orders_010f_prisma_delegate_missing_read_only_no_fake',
      supportCaseId,
      tripId,
      limit,
      caseVerified: false,
      timeline: [],
      readOnlyTimeline: true,
      safeRedaction: true,
      rawPiiBlocked: true,
      dbWriteExecuted: false,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  let caseIds: string[] = [];
  let verifiedTripId = tripId;
  let caseVerified = false;

  if (supportCaseId) {
    const supportCase = await prisma.taxiSupportCase.findUnique({ where: { id: supportCaseId } }).catch(() => null);
    if (supportCase && str010F(supportCase.caseType) === TAXI_ORDERS_LOST_PROPERTY_AUDIT_CASE_TYPE_010F) {
      caseIds = [supportCaseId];
      verifiedTripId = str010F(supportCase.tripId || tripId);
      caseVerified = true;
    }
  } else if (tripId) {
    const cases = await prisma.taxiSupportCase.findMany({
      where: { tripId, caseType: TAXI_ORDERS_LOST_PROPERTY_AUDIT_CASE_TYPE_010F },
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: { id: true, tripId: true },
    }).catch(() => [] as RowAny010F[]);
    caseIds = cases.map((item: RowAny010F) => str010F(item.id)).filter(Boolean);
    caseVerified = caseIds.length > 0;
  }

  const where = caseIds.length
    ? { targetType: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TARGET_TYPE_010F, targetId: { in: caseIds } }
    : { action: { in: [...TAXI_ORDERS_LOST_PROPERTY_AUDIT_ACTIONS_010F] } };

  const rows: RowAny010F[] = await prisma.taxiAuditLog.findMany({
    where,
    take: limit,
    orderBy: { createdAt: 'desc' },
  }).catch(() => [] as RowAny010F[]);

  return {
    ok: true,
    version: TAXI_ORDERS_LOST_PROPERTY_AUDIT_TIMELINE_010F_VERSION,
    code: 'taxi_orders_010f_lost_property_audit_timeline_loaded_redacted_read_only',
    supportCaseId,
    tripId: verifiedTripId,
    limit,
    caseVerified,
    timeline: rows.map((row) => safeTimelineItem010F(row, verifiedTripId)),
    readOnlyTimeline: true,
    safeRedaction: true,
    rawPiiBlocked: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}
