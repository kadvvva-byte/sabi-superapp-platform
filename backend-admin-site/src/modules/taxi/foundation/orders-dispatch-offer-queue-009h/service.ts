import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_DEFAULT_LIMIT_009H,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_ENDPOINTS_009H,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_MAX_LIMIT_009H,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_DELEGATES_009H,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_OFFER_STATUS_009H,
  TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_VEHICLE_STATUS_009H,
} from './constants';
import type {
  TaxiOrdersDispatchOfferQueueItem009H,
  TaxiOrdersDispatchOfferQueueReadiness009H,
  TaxiOrdersDispatchOfferQueueResult009H,
} from './types';

type PrismaAny009H = Record<string, any>;
type RowAny009H = Record<string, any>;

function str009H(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function iso009H(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const raw = str009H(value);
  return raw || '';
}

function limit009H(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TAXI_ORDERS_DISPATCH_OFFER_QUEUE_DEFAULT_LIMIT_009H;
  return Math.max(1, Math.min(TAXI_ORDERS_DISPATCH_OFFER_QUEUE_MAX_LIMIT_009H, Math.trunc(parsed)));
}

function missingDelegates009H(prisma: PrismaAny009H): string[] {
  return TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_DELEGATES_009H.filter((delegate) => !prisma[delegate]);
}

export function buildTaxiOrdersDispatchOfferQueueReadiness009H(): TaxiOrdersDispatchOfferQueueReadiness009H {
  return {
    version: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION,
    existingDispatchOfferOnly: true,
    acceptedDispatchOfferRequired: true,
    approvedVehicleRequired: true,
    tripCreateSource: 'TaxiDispatchOffer',
    orderDbSource: 'TaxiTrip',
    readOnlyQueue: true,
    dbWriteExecuted: false,
    fakeOrderCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    endpoints: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_ENDPOINTS_009H,
    requiredPrismaDelegates: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_DELEGATES_009H,
  };
}

async function resolveApprovedVehicle009H(prisma: PrismaAny009H, driverProfileId: string, offeredVehicleId: string): Promise<RowAny009H | null> {
  if (offeredVehicleId) {
    const vehicle = await prisma.taxiVehicle.findUnique({ where: { id: offeredVehicleId } });
    if (!vehicle) return null;
    if (str009H(vehicle.driverProfileId) !== driverProfileId) return null;
    if (str009H(vehicle.status).toLowerCase() !== TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_VEHICLE_STATUS_009H) return null;
    return vehicle;
  }

  if (!driverProfileId) return null;
  return prisma.taxiVehicle.findFirst({
    where: { driverProfileId, status: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_VEHICLE_STATUS_009H },
    orderBy: { updatedAt: 'desc' },
  });
}

function offerVehicleId009H(offer: RowAny009H): string {
  return str009H(offer.vehicleId || offer.taxiVehicleId || offer.assignedVehicleId || offer.driverVehicleId);
}

function riderProfileId009H(offer: RowAny009H): string {
  return str009H(offer.riderProfileId || offer.riderId || offer.customerProfileId || offer.customerId);
}

export async function listTaxiOrdersAcceptedDispatchOffers009H(
  limitRaw: unknown,
  prisma: PrismaAny009H = defaultPrisma as unknown as PrismaAny009H,
): Promise<TaxiOrdersDispatchOfferQueueResult009H> {
  const missing = missingDelegates009H(prisma);
  if (missing.length) {
    return {
      ok: false,
      version: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION,
      code: 'taxi_orders_009h_prisma_delegate_missing',
      offers: [],
      acceptedOfferCount: 0,
      createReadyCount: 0,
      existingTripCount: 0,
      dbWriteExecuted: false,
      fakeOrderCreateBlocked: true,
      fakeTripCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  const take = limit009H(limitRaw);
  const acceptedOffers: RowAny009H[] = await prisma.taxiDispatchOffer.findMany({
    where: { status: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_REQUIRED_OFFER_STATUS_009H },
    orderBy: { updatedAt: 'desc' },
    take,
  });

  const offers: TaxiOrdersDispatchOfferQueueItem009H[] = [];
  for (const offer of acceptedOffers) {
    const dispatchOfferId = str009H(offer.id);
    const driverProfileId = str009H(offer.driverProfileId);
    const offeredVehicleId = offerVehicleId009H(offer);
    const vehicle = await resolveApprovedVehicle009H(prisma, driverProfileId, offeredVehicleId);
    const vehicleId = str009H(vehicle?.id, offeredVehicleId);
    const existingTrip = dispatchOfferId ? await prisma.taxiTrip.findUnique({ where: { dispatchOfferId } }) : null;
    const existingTripId = str009H(existingTrip?.id);
    const approvedVehicleFound = Boolean(vehicle?.id);

    offers.push({
      dispatchOfferId,
      status: str009H(offer.status),
      driverProfileId,
      riderProfileId: riderProfileId009H(offer),
      vehicleId,
      approvedVehicleFound,
      existingTripId,
      canCreateTrip: Boolean(dispatchOfferId && driverProfileId && approvedVehicleFound && !existingTripId),
      createdAt: iso009H(offer.createdAt),
      updatedAt: iso009H(offer.updatedAt),
      noFakeTripCreate: true,
    });
  }

  return {
    ok: true,
    version: TAXI_ORDERS_DISPATCH_OFFER_QUEUE_009H_VERSION,
    code: 'taxi_orders_009h_existing_accepted_dispatch_offer_queue_loaded',
    offers,
    acceptedOfferCount: offers.length,
    createReadyCount: offers.filter((offer) => offer.canCreateTrip).length,
    existingTripCount: offers.filter((offer) => Boolean(offer.existingTripId)).length,
    dbWriteExecuted: false,
    fakeOrderCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}
