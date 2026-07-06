import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION,
  TAXI_ORDERS_QUOTE_INTAKE_AUDIT_ACTION_009K,
  TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K,
  TAXI_ORDERS_QUOTE_INTAKE_DEFAULT_TTL_MINUTES_009K,
  TAXI_ORDERS_QUOTE_INTAKE_ENDPOINTS_009K,
  TAXI_ORDERS_QUOTE_INTAKE_MAX_TTL_MINUTES_009K,
  TAXI_ORDERS_QUOTE_INTAKE_MIN_TTL_MINUTES_009K,
  TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_DELEGATES_009K,
  TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_TARIFF_STATUS_009K,
} from './constants';
import type {
  TaxiOrdersQuoteIntakeCreateInput009K,
  TaxiOrdersQuoteIntakeCreateResult009K,
  TaxiOrdersQuoteIntakeReadiness009K,
} from './types';

type PrismaAny009K = Record<string, any>;
type RowAny009K = Record<string, any>;

function str009K(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function int009K(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function now009K(): Date {
  return new Date();
}

function iso009K(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return str009K(value);
}

function ttl009K(value: unknown): number {
  const parsed = int009K(value, TAXI_ORDERS_QUOTE_INTAKE_DEFAULT_TTL_MINUTES_009K);
  return Math.max(TAXI_ORDERS_QUOTE_INTAKE_MIN_TTL_MINUTES_009K, Math.min(TAXI_ORDERS_QUOTE_INTAKE_MAX_TTL_MINUTES_009K, parsed));
}

function status009K(row: RowAny009K | null | undefined): string {
  return str009K(row?.status).toLowerCase();
}

function missingDelegates009K(prisma: PrismaAny009K): string[] {
  return TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_DELEGATES_009K.filter((delegate) => !prisma[delegate]);
}

function payloadJson009K(value: unknown): unknown {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try { return JSON.parse(trimmed); } catch { return null; }
  }
  if (value && typeof value === 'object') return value;
  return null;
}

function validJsonPayload009K(value: unknown): boolean {
  return Boolean(value && typeof value === 'object');
}

function baseResult009K(overrides: Partial<TaxiOrdersQuoteIntakeCreateResult009K>): TaxiOrdersQuoteIntakeCreateResult009K {
  return {
    ok: false,
    version: TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION,
    code: 'taxi_orders_009k_not_executed',
    quoteId: '',
    riderProfileId: '',
    tariffRegionId: '',
    routeProviderRef: '',
    estimatedFareMinor: 0,
    expiresAt: '',
    idempotencyKey: '',
    existingRiderProfileFound: false,
    activeTariffRegionFound: false,
    realRoutePayloadAccepted: false,
    existingOpenQuoteFound: false,
    createdQuoteStatus: '',
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeRiderCreateBlocked: true,
    fakeTariffCreateBlocked: true,
    fakeRouteCreateBlocked: true,
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

export function buildTaxiOrdersQuoteIntakeReadiness009K(): TaxiOrdersQuoteIntakeReadiness009K {
  return {
    version: TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION,
    createsQuoteStatus: TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K,
    realRiderProfileRequired: true,
    activeTariffRegionRequired: true,
    realRouteProviderReferenceRequired: true,
    realPickupDropoffGeoJsonRequired: true,
    positiveFareRequired: true,
    quoteSource: 'admin_real_route_intake',
    riderRequestSourceRemains: 'TaxiQuote',
    dispatchOfferSourceRemains: 'TaxiRiderRequest',
    orderTripSourceRemains: 'TaxiTrip',
    auditStorage: 'TaxiAuditLog',
    protectedCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_QUOTE_INTAKE_ENDPOINTS_009K,
    requiredPrismaDelegates: TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_DELEGATES_009K,
    dbWriteOnlyForExistingRiderTariffAndRealRoute: true,
    fakeRiderCreateBlocked: true,
    fakeTariffCreateBlocked: true,
    fakeRouteCreateBlocked: true,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiQuoteFromRealRouteIntake009K(
  input: TaxiOrdersQuoteIntakeCreateInput009K,
  idempotencyKeyRaw: string,
  actorIdRaw: string,
  prisma: PrismaAny009K = defaultPrisma as unknown as PrismaAny009K,
): Promise<TaxiOrdersQuoteIntakeCreateResult009K> {
  const idempotencyKey = str009K(idempotencyKeyRaw, `taxi-orders-009k-quote-intake:${now009K().toISOString()}`);
  const actorId = str009K(actorIdRaw, 'admin-panel');
  const riderProfileId = str009K(input.riderProfileId);
  const tariffRegionId = str009K(input.tariffRegionId);
  const routeProviderRef = str009K(input.routeProviderRef);
  const estimatedFareMinor = int009K(input.estimatedFareMinor);
  const pickupGeoJson = payloadJson009K(input.pickupGeoJson);
  const dropoffGeoJson = payloadJson009K(input.dropoffGeoJson);
  const reason = str009K(input.reason, 'admin_quote_intake_009k');
  const expiresAt = new Date(now009K().getTime() + ttl009K(input.expiresInMinutes) * 60_000);
  const missing = missingDelegates009K(prisma);

  if (missing.length) {
    return baseResult009K({ code: 'taxi_orders_009k_prisma_delegate_missing', riderProfileId, tariffRegionId, routeProviderRef, estimatedFareMinor, idempotencyKey });
  }
  if (!riderProfileId || !tariffRegionId || !routeProviderRef || estimatedFareMinor <= 0 || !validJsonPayload009K(pickupGeoJson) || !validJsonPayload009K(dropoffGeoJson)) {
    return baseResult009K({
      code: 'taxi_orders_009k_real_quote_input_required_no_fake_quote_create',
      riderProfileId,
      tariffRegionId,
      routeProviderRef,
      estimatedFareMinor,
      idempotencyKey,
      realRoutePayloadAccepted: false,
    });
  }

  const rider: RowAny009K | null = await prisma.taxiRiderProfile.findUnique({ where: { id: riderProfileId } });
  if (!rider) {
    return baseResult009K({ code: 'taxi_orders_009k_existing_rider_profile_not_found_no_fake_rider_create', riderProfileId, tariffRegionId, routeProviderRef, estimatedFareMinor, idempotencyKey, realRoutePayloadAccepted: true });
  }

  const tariffRegion: RowAny009K | null = await prisma.taxiTariffRegion.findUnique({ where: { id: tariffRegionId } });
  if (!tariffRegion) {
    return baseResult009K({ code: 'taxi_orders_009k_existing_tariff_region_not_found_no_fake_tariff_create', riderProfileId, tariffRegionId, routeProviderRef, estimatedFareMinor, idempotencyKey, existingRiderProfileFound: true, realRoutePayloadAccepted: true });
  }
  if (status009K(tariffRegion) !== TAXI_ORDERS_QUOTE_INTAKE_REQUIRED_TARIFF_STATUS_009K) {
    return baseResult009K({ code: 'taxi_orders_009k_tariff_region_not_active_no_fake_quote_create', riderProfileId, tariffRegionId, routeProviderRef, estimatedFareMinor, idempotencyKey, existingRiderProfileFound: true, activeTariffRegionFound: false, realRoutePayloadAccepted: true });
  }

  const existing: RowAny009K | null = await prisma.taxiQuote.findFirst({
    where: {
      riderProfileId,
      tariffRegionId,
      routeProviderRef,
      status: TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K,
      expiresAt: { gt: now009K() },
    },
    orderBy: { updatedAt: 'desc' },
  });
  if (existing) {
    return baseResult009K({
      ok: true,
      code: 'taxi_orders_009k_quote_already_exists_idempotent',
      quoteId: str009K(existing.id),
      riderProfileId,
      tariffRegionId,
      routeProviderRef,
      estimatedFareMinor: int009K(existing.estimatedFareMinor, estimatedFareMinor),
      expiresAt: iso009K(existing.expiresAt),
      idempotencyKey,
      existingRiderProfileFound: true,
      activeTariffRegionFound: true,
      realRoutePayloadAccepted: true,
      existingOpenQuoteFound: true,
      createdQuoteStatus: str009K(existing.status),
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  let quoteId = '';
  await prisma.$transaction(async (tx: PrismaAny009K) => {
    const created = await tx.taxiQuote.create({
      data: {
        riderProfileId,
        tariffRegionId,
        status: TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K,
        pickupGeoJson,
        dropoffGeoJson,
        routeProviderRef,
        estimatedFareMinor,
        expiresAt,
      },
    });
    quoteId = str009K(created.id);

    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId,
        action: TAXI_ORDERS_QUOTE_INTAKE_AUDIT_ACTION_009K,
        targetType: 'TaxiQuote',
        targetId: quoteId,
        payloadJson: {
          version: TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION,
          quoteId,
          riderProfileId,
          tariffRegionId,
          routeProviderRef,
          estimatedFareMinor,
          expiresAt: expiresAt.toISOString(),
          idempotencyKey,
          reason,
          realRiderProfileRequired: true,
          activeTariffRegionRequired: true,
          realRouteProviderReferenceRequired: true,
          realPickupDropoffGeoJsonRequired: true,
          positiveFareRequired: true,
          fakeRiderCreateBlocked: true,
          fakeTariffCreateBlocked: true,
          fakeRouteCreateBlocked: true,
          fakeQuoteCreateBlocked: true,
          fakeRequestCreateBlocked: true,
          fakeDispatchOfferCreateBlocked: true,
          fakeTripCreateBlocked: true,
          providerDispatch: false,
          walletMutation: false,
          createdAt: now009K().toISOString(),
        },
      },
    });
  });

  return baseResult009K({
    ok: true,
    code: 'taxi_orders_009k_quote_created_from_real_rider_tariff_route_with_audit',
    quoteId,
    riderProfileId,
    tariffRegionId,
    routeProviderRef,
    estimatedFareMinor,
    expiresAt: expiresAt.toISOString(),
    idempotencyKey,
    existingRiderProfileFound: true,
    activeTariffRegionFound: true,
    realRoutePayloadAccepted: true,
    existingOpenQuoteFound: false,
    createdQuoteStatus: TAXI_ORDERS_QUOTE_INTAKE_CREATED_QUOTE_STATUS_009K,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
  });
}
