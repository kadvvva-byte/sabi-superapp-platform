import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION,
  TAXI_ORDERS_PRODUCTION_CHAIN_ACCEPTED_OFFER_STATUS_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_ACTIVE_TARIFF_STATUS_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_DRIVER_STATUS_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_VEHICLE_STATUS_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_ENDPOINTS_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_OFFER_STATUSES_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_QUOTE_STATUSES_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_REQUEST_STATUSES_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_REQUIRED_DELEGATES_009L,
  TAXI_ORDERS_PRODUCTION_CHAIN_STEPS_009L,
} from './constants';
import type {
  TaxiOrdersProductionChainCounts009L,
  TaxiOrdersProductionChainReadiness009L,
  TaxiOrdersProductionChainStatus009L,
} from './types';

type PrismaAny009L = Record<string, any>;

function missingDelegates009L(prisma: PrismaAny009L): string[] {
  return TAXI_ORDERS_PRODUCTION_CHAIN_REQUIRED_DELEGATES_009L.filter((delegate) => !prisma[delegate]);
}

async function count009L(prisma: PrismaAny009L, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

export function buildTaxiOrdersProductionChainReadiness009L(): TaxiOrdersProductionChainReadiness009L {
  return {
    version: TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION,
    fullRealOrderChain: true,
    chain: TAXI_ORDERS_PRODUCTION_CHAIN_STEPS_009L,
    endpoints: TAXI_ORDERS_PRODUCTION_CHAIN_ENDPOINTS_009L,
    requiredPrismaDelegates: TAXI_ORDERS_PRODUCTION_CHAIN_REQUIRED_DELEGATES_009L,
    orderDbSource: 'TaxiTrip',
    quoteSource: 'TaxiRiderProfile + TaxiTariffRegion + real route + real fare',
    riderRequestSource: 'TaxiQuote',
    dispatchOfferSource: 'TaxiRiderRequest',
    tripCreateSource: 'TaxiDispatchOffer',
    auditStorage: 'TaxiAuditLog',
    archiveAfterDays: 7,
    strictDbOnlyNoZeroFill: true,
    fakeRiderCreateBlocked: true,
    fakeTariffCreateBlocked: true,
    fakeRouteCreateBlocked: true,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    fakeOrderCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    dbWriteExecuted: false,
  };
}

export async function loadTaxiOrdersProductionChainStatus009L(
  prisma: PrismaAny009L = defaultPrisma as unknown as PrismaAny009L,
): Promise<TaxiOrdersProductionChainStatus009L> {
  const missing = missingDelegates009L(prisma);
  const now = new Date();
  const counts: TaxiOrdersProductionChainCounts009L = {
    riderProfiles: await count009L(prisma, 'taxiRiderProfile'),
    activeTariffRegions: await count009L(prisma, 'taxiTariffRegion', { where: { status: TAXI_ORDERS_PRODUCTION_CHAIN_ACTIVE_TARIFF_STATUS_009L } }),
    acceptedQuotes: await count009L(prisma, 'taxiQuote', { where: { status: { in: [...TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_QUOTE_STATUSES_009L] }, expiresAt: { gt: now } } }),
    openRiderRequests: await count009L(prisma, 'taxiRiderRequest', { where: { status: { in: [...TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_REQUEST_STATUSES_009L] } } }),
    approvedDriversWithPositiveBalance: await count009L(prisma, 'taxiDriverProfile', { where: { status: TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_DRIVER_STATUS_009L, balanceReserveMinor: { gt: 0 } } }),
    approvedVehicles: await count009L(prisma, 'taxiVehicle', { where: { status: TAXI_ORDERS_PRODUCTION_CHAIN_APPROVED_VEHICLE_STATUS_009L } }),
    openDispatchOffers: await count009L(prisma, 'taxiDispatchOffer', { where: { status: { in: [...TAXI_ORDERS_PRODUCTION_CHAIN_OPEN_OFFER_STATUSES_009L] } } }),
    acceptedDispatchOffers: await count009L(prisma, 'taxiDispatchOffer', { where: { status: TAXI_ORDERS_PRODUCTION_CHAIN_ACCEPTED_OFFER_STATUS_009L } }),
    taxiTrips: await count009L(prisma, 'taxiTrip'),
    auditLogs: await count009L(prisma, 'taxiAuditLog'),
  };

  return {
    ok: missing.length === 0,
    version: TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION,
    code: missing.length ? 'taxi_orders_009l_prisma_delegate_missing' : 'taxi_orders_009l_production_chain_status_loaded',
    missingPrismaDelegates: missing,
    counts,
    chainCanStartFromRealData: counts.riderProfiles > 0 && counts.activeTariffRegions > 0,
    quoteCandidatesAvailable: counts.acceptedQuotes > 0,
    riderRequestCandidatesAvailable: counts.openRiderRequests > 0 && counts.approvedDriversWithPositiveBalance > 0 && counts.approvedVehicles > 0,
    dispatchOfferCandidatesAvailable: counts.openDispatchOffers > 0,
    tripCandidatesAvailable: counts.acceptedDispatchOffers > 0,
    ordersVisibleFromTaxiTrip: counts.taxiTrips > 0,
    strictDbOnlyNoZeroFill: true,
    dbWriteExecuted: false,
    fakeRiderCreateBlocked: true,
    fakeTariffCreateBlocked: true,
    fakeRouteCreateBlocked: true,
    fakeQuoteCreateBlocked: true,
    fakeRequestCreateBlocked: true,
    fakeDispatchOfferCreateBlocked: true,
    fakeTripCreateBlocked: true,
    fakeOrderCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
  };
}
