import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_TRIP_CREATE_009G_VERSION,
  TAXI_ORDERS_TRIP_CREATE_AUDIT_ACTION_009G,
  TAXI_ORDERS_TRIP_CREATE_ENDPOINTS_009G,
  TAXI_ORDERS_TRIP_CREATE_INITIAL_TRIP_STATUS_009G,
  TAXI_ORDERS_TRIP_CREATE_REQUIRED_DELEGATES_009G,
  TAXI_ORDERS_TRIP_CREATE_REQUIRED_OFFER_STATUS_009G,
  TAXI_ORDERS_TRIP_CREATE_REQUIRED_VEHICLE_STATUS_009G,
} from './constants';
import type {
  TaxiOrdersTripCreateInput009G,
  TaxiOrdersTripCreateReadiness009G,
  TaxiOrdersTripCreateResult009G,
} from './types';

type PrismaAny009G = Record<string, any>;
type RowAny009G = Record<string, any>;

function str009G(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function now009G(): Date {
  return new Date();
}

function missingDelegates009G(prisma: PrismaAny009G): string[] {
  return TAXI_ORDERS_TRIP_CREATE_REQUIRED_DELEGATES_009G.filter((delegate) => !prisma[delegate]);
}

function baseResult009G(overrides: Partial<TaxiOrdersTripCreateResult009G>): TaxiOrdersTripCreateResult009G {
  return {
    ok: false,
    version: TAXI_ORDERS_TRIP_CREATE_009G_VERSION,
    code: 'taxi_orders_009g_not_executed',
    dispatchOfferId: '',
    tripId: '',
    vehicleId: '',
    driverProfileId: '',
    idempotencyKey: '',
    existingDispatchOfferFound: false,
    acceptedDispatchOfferRequired: true,
    approvedVehicleRequired: true,
    existingTripFound: false,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeOrderCreateBlocked: true,
    fakeTripCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
    ...overrides,
  };
}

export function buildTaxiOrdersTripCreateReadiness009G(): TaxiOrdersTripCreateReadiness009G {
  return {
    version: TAXI_ORDERS_TRIP_CREATE_009G_VERSION,
    existingDispatchOfferOnly: true,
    acceptedDispatchOfferRequired: true,
    approvedVehicleRequired: true,
    fakeOrderCreateBlocked: true,
    fakeTripCreateBlocked: true,
    adminCannotCreateFakeOrders: true,
    everyOrderSavedInDbSource: 'TaxiTrip',
    tripCreateSource: 'TaxiDispatchOffer',
    auditStorage: 'TaxiAuditLog',
    protectedTripCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_TRIP_CREATE_ENDPOINTS_009G,
    requiredPrismaDelegates: TAXI_ORDERS_TRIP_CREATE_REQUIRED_DELEGATES_009G,
    dbWriteOnlyForExistingAcceptedDispatchOffer: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

async function findApprovedVehicle009G(prisma: PrismaAny009G, driverProfileId: string, vehicleId: string): Promise<RowAny009G | null> {
  if (vehicleId) {
    const vehicle = await prisma.taxiVehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) return null;
    if (str009G(vehicle.driverProfileId) !== driverProfileId) return null;
    if (str009G(vehicle.status).toLowerCase() !== TAXI_ORDERS_TRIP_CREATE_REQUIRED_VEHICLE_STATUS_009G) return null;
    return vehicle;
  }

  return prisma.taxiVehicle.findFirst({
    where: { driverProfileId, status: TAXI_ORDERS_TRIP_CREATE_REQUIRED_VEHICLE_STATUS_009G },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function createTaxiTripFromExistingDispatchOffer009G(
  input: TaxiOrdersTripCreateInput009G,
  idempotencyKeyRaw: string,
  actorIdRaw: string,
  prisma: PrismaAny009G = defaultPrisma as unknown as PrismaAny009G,
): Promise<TaxiOrdersTripCreateResult009G> {
  const idempotencyKey = str009G(idempotencyKeyRaw, `taxi-orders-009g-trip-create:${now009G().toISOString()}`);
  const actorId = str009G(actorIdRaw, 'admin-panel');
  const dispatchOfferId = str009G(input.dispatchOfferId);
  const requestedVehicleId = str009G(input.vehicleId);
  const reason = str009G(input.reason, 'existing_dispatch_offer_trip_create_009g');
  const missing = missingDelegates009G(prisma);

  if (missing.length || !dispatchOfferId) {
    return baseResult009G({
      code: missing.length ? 'taxi_orders_009g_prisma_delegate_missing' : 'taxi_orders_009g_dispatch_offer_id_required',
      dispatchOfferId,
      idempotencyKey,
    });
  }

  const dispatchOffer: RowAny009G | null = await prisma.taxiDispatchOffer.findUnique({ where: { id: dispatchOfferId } });
  if (!dispatchOffer) {
    return baseResult009G({
      code: 'taxi_orders_009g_existing_dispatch_offer_not_found_no_fake_trip_create',
      dispatchOfferId,
      idempotencyKey,
    });
  }

  const driverProfileId = str009G(dispatchOffer.driverProfileId);
  const offerStatus = str009G(dispatchOffer.status).toLowerCase();
  if (offerStatus !== TAXI_ORDERS_TRIP_CREATE_REQUIRED_OFFER_STATUS_009G) {
    return baseResult009G({
      code: 'taxi_orders_009g_dispatch_offer_must_be_accepted_before_trip_create',
      dispatchOfferId,
      driverProfileId,
      idempotencyKey,
      existingDispatchOfferFound: true,
    });
  }

  const existingTrip: RowAny009G | null = await prisma.taxiTrip.findUnique({ where: { dispatchOfferId } });
  if (existingTrip) {
    return baseResult009G({
      ok: true,
      code: 'taxi_orders_009g_trip_already_exists_for_dispatch_offer_idempotent',
      dispatchOfferId,
      tripId: str009G(existingTrip.id),
      vehicleId: str009G(existingTrip.vehicleId),
      driverProfileId: str009G(existingTrip.driverProfileId, driverProfileId),
      idempotencyKey,
      existingDispatchOfferFound: true,
      existingTripFound: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  const vehicle = await findApprovedVehicle009G(prisma, driverProfileId, requestedVehicleId);
  if (!vehicle) {
    return baseResult009G({
      code: 'taxi_orders_009g_approved_vehicle_required_no_fake_vehicle',
      dispatchOfferId,
      driverProfileId,
      vehicleId: requestedVehicleId,
      idempotencyKey,
      existingDispatchOfferFound: true,
    });
  }

  const vehicleId = str009G(vehicle.id);
  let createdTripId = '';
  await prisma.$transaction(async (tx: PrismaAny009G) => {
    const createdTrip = await tx.taxiTrip.create({
      data: {
        dispatchOfferId,
        driverProfileId,
        vehicleId,
        status: TAXI_ORDERS_TRIP_CREATE_INITIAL_TRIP_STATUS_009G,
      },
    });
    createdTripId = str009G(createdTrip.id);
    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId,
        action: TAXI_ORDERS_TRIP_CREATE_AUDIT_ACTION_009G,
        targetType: 'TaxiTrip',
        targetId: createdTripId,
        payloadJson: {
          version: TAXI_ORDERS_TRIP_CREATE_009G_VERSION,
          dispatchOfferId,
          tripId: createdTripId,
          vehicleId,
          driverProfileId,
          idempotencyKey,
          reason,
          source: 'TaxiDispatchOffer',
          existingDispatchOfferOnly: true,
          acceptedDispatchOfferRequired: true,
          approvedVehicleRequired: true,
          fakeOrderCreateBlocked: true,
          fakeTripCreateBlocked: true,
          providerDispatch: false,
          walletMutation: false,
          createdAt: now009G().toISOString(),
        },
      },
    });
  });

  return baseResult009G({
    ok: true,
    code: 'taxi_orders_009g_trip_created_from_existing_accepted_dispatch_offer_with_audit',
    dispatchOfferId,
    tripId: createdTripId,
    vehicleId,
    driverProfileId,
    idempotencyKey,
    existingDispatchOfferFound: true,
    existingTripFound: false,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
  });
}
