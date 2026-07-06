import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_AUDIT_ACTION_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_CREATED_REQUEST_STATUS_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_DEFAULT_LIMIT_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_ENDPOINTS_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_MAX_LIMIT_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_OPEN_REQUEST_STATUSES_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_QUOTE_STATUSES_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_REQUIRED_DELEGATES_009J,
} from './constants';
import type {
  TaxiOrdersRiderRequestCreateInput009J,
  TaxiOrdersRiderRequestCreateReadiness009J,
  TaxiOrdersRiderRequestCreateResult009J,
  TaxiOrdersRiderRequestQuoteCandidate009J,
  TaxiOrdersRiderRequestQuoteCandidateResult009J,
} from './types';

type PrismaAny009J = Record<string, any>;
type RowAny009J = Record<string, any>;

function str009J(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function int009J(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function iso009J(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return str009J(value);
}

function now009J(): Date {
  return new Date();
}

function limit009J(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TAXI_ORDERS_RIDER_REQUEST_CREATE_DEFAULT_LIMIT_009J;
  return Math.max(1, Math.min(TAXI_ORDERS_RIDER_REQUEST_CREATE_MAX_LIMIT_009J, Math.trunc(parsed)));
}

function status009J(row: RowAny009J | null | undefined): string {
  return str009J(row?.status).toLowerCase();
}

function missingDelegates009J(prisma: PrismaAny009J): string[] {
  return TAXI_ORDERS_RIDER_REQUEST_CREATE_REQUIRED_DELEGATES_009J.filter((delegate) => !prisma[delegate]);
}

function quoteExpired009J(quote: RowAny009J): boolean {
  const expiresAt = quote?.expiresAt instanceof Date ? quote.expiresAt : new Date(str009J(quote?.expiresAt));
  return Number.isFinite(expiresAt.getTime()) ? expiresAt.getTime() <= now009J().getTime() : true;
}

function candidate009J(overrides: Partial<TaxiOrdersRiderRequestQuoteCandidate009J>): TaxiOrdersRiderRequestQuoteCandidate009J {
  return {
    quoteId: '',
    quoteStatus: '',
    riderProfileId: '',
    tariffRegionId: '',
    estimatedFareMinor: 0,
    expiresAt: '',
    expired: true,
    existingOpenRiderRequestId: '',
    canCreateRiderRequest: false,
    blockedReason: 'not_evaluated',
    createdAt: '',
    updatedAt: '',
    noFakeRiderRequest: true,
    ...overrides,
  };
}

function baseResult009J(overrides: Partial<TaxiOrdersRiderRequestCreateResult009J>): TaxiOrdersRiderRequestCreateResult009J {
  return {
    ok: false,
    version: TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
    code: 'taxi_orders_009j_not_executed',
    quoteId: '',
    riderRequestId: '',
    riderProfileId: '',
    tariffRegionId: '',
    idempotencyKey: '',
    existingAcceptedQuoteFound: false,
    quoteNotExpiredFound: false,
    existingOpenRiderRequestFound: false,
    createdRiderRequestStatus: '',
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
    ...overrides,
  };
}

export function buildTaxiOrdersRiderRequestCreateReadiness009J(): TaxiOrdersRiderRequestCreateReadiness009J {
  return {
    version: TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
    existingAcceptedQuoteOnly: true,
    quoteStatusRequired: TAXI_ORDERS_RIDER_REQUEST_CREATE_QUOTE_STATUSES_009J,
    quoteNotExpiredRequired: true,
    createsRiderRequestStatus: TAXI_ORDERS_RIDER_REQUEST_CREATE_CREATED_REQUEST_STATUS_009J,
    riderRequestSource: 'TaxiQuote',
    dispatchOfferSourceRemains: 'TaxiRiderRequest',
    orderTripSourceRemains: 'TaxiTrip',
    auditStorage: 'TaxiAuditLog',
    protectedCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_RIDER_REQUEST_CREATE_ENDPOINTS_009J,
    requiredPrismaDelegates: TAXI_ORDERS_RIDER_REQUEST_CREATE_REQUIRED_DELEGATES_009J,
    dbWriteOnlyForExistingAcceptedQuote: true,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

async function findOpenRiderRequest009J(prisma: PrismaAny009J, quoteId: string): Promise<RowAny009J | null> {
  return prisma.taxiRiderRequest.findFirst({
    where: { quoteId, status: { in: [...TAXI_ORDERS_RIDER_REQUEST_CREATE_OPEN_REQUEST_STATUSES_009J] } },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function listTaxiOrdersRiderRequestQuoteCandidates009J(
  limitRaw: unknown,
  prisma: PrismaAny009J = defaultPrisma as unknown as PrismaAny009J,
): Promise<TaxiOrdersRiderRequestQuoteCandidateResult009J> {
  const missing = missingDelegates009J(prisma);
  if (missing.length) {
    return {
      ok: false,
      version: TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
      code: 'taxi_orders_009j_prisma_delegate_missing',
      candidates: [],
      acceptedQuoteCount: 0,
      createReadyCount: 0,
      existingOpenRequestCount: 0,
      dbWriteExecuted: false,
      fakeQuoteCreateBlocked: true,
      fakeRequestCreateBlocked: true,
      fakeDispatchOfferCreateBlocked: true,
      fakeTripCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  const quotes: RowAny009J[] = await prisma.taxiQuote.findMany({
    where: { status: { in: [...TAXI_ORDERS_RIDER_REQUEST_CREATE_QUOTE_STATUSES_009J] } },
    orderBy: { updatedAt: 'desc' },
    take: limit009J(limitRaw),
  });

  const candidates: TaxiOrdersRiderRequestQuoteCandidate009J[] = [];
  for (const quote of quotes) {
    const quoteId = str009J(quote.id);
    const expired = quoteExpired009J(quote);
    const existingRequest = await findOpenRiderRequest009J(prisma, quoteId);
    const existingOpenRiderRequestId = str009J(existingRequest?.id);
    const canCreateRiderRequest = !expired && !existingOpenRiderRequestId;
    candidates.push(candidate009J({
      quoteId,
      quoteStatus: str009J(quote.status),
      riderProfileId: str009J(quote.riderProfileId),
      tariffRegionId: str009J(quote.tariffRegionId),
      estimatedFareMinor: int009J(quote.estimatedFareMinor),
      expiresAt: iso009J(quote.expiresAt),
      expired,
      existingOpenRiderRequestId,
      canCreateRiderRequest,
      blockedReason: canCreateRiderRequest ? '' : existingOpenRiderRequestId ? 'existing_open_rider_request' : 'quote_expired',
      createdAt: iso009J(quote.createdAt),
      updatedAt: iso009J(quote.updatedAt),
    }));
  }

  return {
    ok: true,
    version: TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
    code: 'taxi_orders_009j_existing_accepted_quote_candidates_loaded',
    candidates,
    acceptedQuoteCount: quotes.length,
    createReadyCount: candidates.filter((item) => item.canCreateRiderRequest).length,
    existingOpenRequestCount: candidates.filter((item) => Boolean(item.existingOpenRiderRequestId)).length,
    dbWriteExecuted: false,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiRiderRequestFromExistingQuote009J(
  input: TaxiOrdersRiderRequestCreateInput009J,
  idempotencyKeyRaw: string,
  actorIdRaw: string,
  prisma: PrismaAny009J = defaultPrisma as unknown as PrismaAny009J,
): Promise<TaxiOrdersRiderRequestCreateResult009J> {
  const idempotencyKey = str009J(idempotencyKeyRaw, `taxi-orders-009j-rider-request-create:${now009J().toISOString()}`);
  const actorId = str009J(actorIdRaw, 'admin-panel');
  const quoteId = str009J(input.quoteId);
  const reason = str009J(input.reason, 'admin_rider_request_create_009j');
  const missing = missingDelegates009J(prisma);

  if (missing.length || !quoteId) {
    return baseResult009J({ code: missing.length ? 'taxi_orders_009j_prisma_delegate_missing' : 'taxi_orders_009j_quote_id_required', quoteId, idempotencyKey });
  }

  const quote: RowAny009J | null = await prisma.taxiQuote.findUnique({ where: { id: quoteId } });
  if (!quote) {
    return baseResult009J({ code: 'taxi_orders_009j_existing_quote_not_found_no_fake_quote_create', quoteId, idempotencyKey });
  }

  if (!TAXI_ORDERS_RIDER_REQUEST_CREATE_QUOTE_STATUSES_009J.includes(status009J(quote) as any)) {
    return baseResult009J({
      code: 'taxi_orders_009j_quote_status_not_accepted_no_fake_request_create',
      quoteId,
      riderProfileId: str009J(quote.riderProfileId),
      tariffRegionId: str009J(quote.tariffRegionId),
      idempotencyKey,
      existingAcceptedQuoteFound: false,
    });
  }

  if (quoteExpired009J(quote)) {
    return baseResult009J({
      code: 'taxi_orders_009j_quote_expired_no_fake_request_create',
      quoteId,
      riderProfileId: str009J(quote.riderProfileId),
      tariffRegionId: str009J(quote.tariffRegionId),
      idempotencyKey,
      existingAcceptedQuoteFound: true,
      quoteNotExpiredFound: false,
    });
  }

  const existingOpenRequest = await findOpenRiderRequest009J(prisma, quoteId);
  if (existingOpenRequest) {
    return baseResult009J({
      ok: true,
      code: 'taxi_orders_009j_rider_request_already_exists_idempotent',
      quoteId,
      riderRequestId: str009J(existingOpenRequest.id),
      riderProfileId: str009J(existingOpenRequest.riderProfileId),
      tariffRegionId: str009J(existingOpenRequest.tariffRegionId),
      idempotencyKey,
      existingAcceptedQuoteFound: true,
      quoteNotExpiredFound: true,
      existingOpenRiderRequestFound: true,
      createdRiderRequestStatus: str009J(existingOpenRequest.status),
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  let riderRequestId = '';
  await prisma.$transaction(async (tx: PrismaAny009J) => {
    const created = await tx.taxiRiderRequest.create({
      data: {
        riderProfileId: str009J(quote.riderProfileId),
        quoteId,
        tariffRegionId: str009J(quote.tariffRegionId),
        status: TAXI_ORDERS_RIDER_REQUEST_CREATE_CREATED_REQUEST_STATUS_009J,
        pickupGeoJson: quote.pickupGeoJson,
        dropoffGeoJson: quote.dropoffGeoJson,
      },
    });
    riderRequestId = str009J(created.id);

    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId,
        action: TAXI_ORDERS_RIDER_REQUEST_CREATE_AUDIT_ACTION_009J,
        targetType: 'TaxiRiderRequest',
        targetId: riderRequestId,
        payloadJson: {
          version: TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION,
          quoteId,
          riderRequestId,
          riderProfileId: str009J(quote.riderProfileId),
          tariffRegionId: str009J(quote.tariffRegionId),
          idempotencyKey,
          reason,
          existingAcceptedQuoteOnly: true,
          quoteNotExpiredRequired: true,
          fakeQuoteCreateBlocked: true,
          fakeRequestCreateBlocked: true,
          fakeDispatchOfferCreateBlocked: true,
          fakeTripCreateBlocked: true,
          providerDispatch: false,
          walletMutation: false,
          createdAt: now009J().toISOString(),
        },
      },
    });
  });

  return baseResult009J({
    ok: true,
    code: 'taxi_orders_009j_rider_request_created_from_existing_accepted_quote_with_audit',
    quoteId,
    riderRequestId,
    riderProfileId: str009J(quote.riderProfileId),
    tariffRegionId: str009J(quote.tariffRegionId),
    idempotencyKey,
    existingAcceptedQuoteFound: true,
    quoteNotExpiredFound: true,
    existingOpenRiderRequestFound: false,
    createdRiderRequestStatus: TAXI_ORDERS_RIDER_REQUEST_CREATE_CREATED_REQUEST_STATUS_009J,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
  });
}
