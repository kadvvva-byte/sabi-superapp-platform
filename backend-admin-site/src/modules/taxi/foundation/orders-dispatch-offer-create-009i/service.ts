import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_AUDIT_ACTION_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_CREATED_OFFER_STATUS_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_LIMIT_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_TTL_SECONDS_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_DRIVER_STATUS_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_DUPLICATE_STATUSES_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_ENDPOINTS_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_LIMIT_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_TTL_SECONDS_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUEST_STATUSES_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUIRED_DELEGATES_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_VEHICLE_STATUS_009I,
} from './constants';
import type {
  TaxiOrdersDispatchOfferCandidate009I,
  TaxiOrdersDispatchOfferCandidateResult009I,
  TaxiOrdersDispatchOfferCreateInput009I,
  TaxiOrdersDispatchOfferCreateReadiness009I,
  TaxiOrdersDispatchOfferCreateResult009I,
} from './types';

type PrismaAny009I = Record<string, any>;
type RowAny009I = Record<string, any>;

function str009I(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function int009I(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

function iso009I(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return str009I(value);
}

function now009I(): Date {
  return new Date();
}

function limit009I(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_LIMIT_009I;
  return Math.max(1, Math.min(TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_LIMIT_009I, Math.trunc(parsed)));
}

function ttl009I(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TAXI_ORDERS_DISPATCH_OFFER_CREATE_DEFAULT_TTL_SECONDS_009I;
  return Math.max(15, Math.min(TAXI_ORDERS_DISPATCH_OFFER_CREATE_MAX_TTL_SECONDS_009I, Math.trunc(parsed)));
}

function missingDelegates009I(prisma: PrismaAny009I): string[] {
  return TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUIRED_DELEGATES_009I.filter((delegate) => !prisma[delegate]);
}

function status009I(row: RowAny009I | null | undefined): string {
  return str009I(row?.status).toLowerCase();
}

function baseResult009I(overrides: Partial<TaxiOrdersDispatchOfferCreateResult009I>): TaxiOrdersDispatchOfferCreateResult009I {
  return {
    ok: false,
    version: TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
    code: 'taxi_orders_009i_not_executed',
    riderRequestId: '',
    dispatchOfferId: '',
    driverProfileId: '',
    vehicleId: '',
    idempotencyKey: '',
    existingRiderRequestFound: false,
    existingApprovedDriverFound: false,
    existingApprovedVehicleFound: false,
    activeVehicleAssignmentFound: false,
    positiveDriverBalanceFound: false,
    existingOpenDispatchOfferFound: false,
    createdOfferStatus: '',
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeRequestCreateBlocked: true,
    fakeDriverCreateBlocked: true,
    fakeVehicleCreateBlocked: true,
    fakeOfferCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
    ...overrides,
  };
}

export function buildTaxiOrdersDispatchOfferCreateReadiness009I(): TaxiOrdersDispatchOfferCreateReadiness009I {
  return {
    version: TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
    existingRiderRequestOnly: true,
    existingApprovedDriverOnly: true,
    existingApprovedVehicleOnly: true,
    activeVehicleAssignmentRequired: true,
    positiveDriverBalanceRequired: true,
    createsDispatchOfferStatus: TAXI_ORDERS_DISPATCH_OFFER_CREATE_CREATED_OFFER_STATUS_009I,
    orderTripSourceRemains: 'TaxiTrip',
    dispatchOfferSource: 'TaxiRiderRequest',
    auditStorage: 'TaxiAuditLog',
    protectedCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_DISPATCH_OFFER_CREATE_ENDPOINTS_009I,
    requiredPrismaDelegates: TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUIRED_DELEGATES_009I,
    dbWriteOnlyForExistingRequestDriverVehicle: true,
    fakeRequestCreateBlocked: true,
    fakeDriverCreateBlocked: true,
    fakeVehicleCreateBlocked: true,
    fakeOfferCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

async function findTariffRegion009I(prisma: PrismaAny009I, tariffRegionId: string): Promise<RowAny009I | null> {
  if (!tariffRegionId || !prisma.taxiTariffRegion) return null;
  return prisma.taxiTariffRegion.findUnique({ where: { id: tariffRegionId } });
}

async function findEligibleDriver009I(prisma: PrismaAny009I, countryCode: string, cityId: string): Promise<RowAny009I | null> {
  const where: Record<string, unknown> = {
    status: TAXI_ORDERS_DISPATCH_OFFER_CREATE_DRIVER_STATUS_009I,
    balanceReserveMinor: { gt: 0 },
  };
  if (countryCode) where.countryCode = countryCode;
  if (cityId) where.cityId = cityId;
  return prisma.taxiDriverProfile.findFirst({ where, orderBy: { updatedAt: 'desc' } });
}

async function findApprovedVehicle009I(prisma: PrismaAny009I, driverProfileId: string, vehicleIdRaw = ''): Promise<RowAny009I | null> {
  const vehicleId = str009I(vehicleIdRaw);
  if (vehicleId) {
    const vehicle = await prisma.taxiVehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) return null;
    if (str009I(vehicle.driverProfileId) !== driverProfileId) return null;
    if (status009I(vehicle) !== TAXI_ORDERS_DISPATCH_OFFER_CREATE_VEHICLE_STATUS_009I) return null;
    const assignment = await prisma.taxiDriverVehicleAssignment.findFirst({ where: { driverProfileId, vehicleId, active: true } });
    return assignment ? vehicle : null;
  }

  const assignments: RowAny009I[] = await prisma.taxiDriverVehicleAssignment.findMany({ where: { driverProfileId, active: true }, orderBy: { updatedAt: 'desc' }, take: 10 });
  for (const assignment of assignments) {
    const vehicle = await prisma.taxiVehicle.findUnique({ where: { id: str009I(assignment.vehicleId) } });
    if (vehicle && str009I(vehicle.driverProfileId) === driverProfileId && status009I(vehicle) === TAXI_ORDERS_DISPATCH_OFFER_CREATE_VEHICLE_STATUS_009I) return vehicle;
  }
  return prisma.taxiVehicle.findFirst({
    where: { driverProfileId, status: TAXI_ORDERS_DISPATCH_OFFER_CREATE_VEHICLE_STATUS_009I },
    orderBy: { updatedAt: 'desc' },
  });
}

async function findOpenOffer009I(prisma: PrismaAny009I, riderRequestId: string, driverProfileId = ''): Promise<RowAny009I | null> {
  const where: Record<string, unknown> = {
    riderRequestId,
    status: { in: [...TAXI_ORDERS_DISPATCH_OFFER_CREATE_DUPLICATE_STATUSES_009I] },
  };
  if (driverProfileId) where.driverProfileId = driverProfileId;
  return prisma.taxiDispatchOffer.findFirst({ where, orderBy: { updatedAt: 'desc' } });
}

function candidate009I(overrides: Partial<TaxiOrdersDispatchOfferCandidate009I>): TaxiOrdersDispatchOfferCandidate009I {
  return {
    riderRequestId: '',
    riderRequestStatus: '',
    quoteId: '',
    riderProfileId: '',
    tariffRegionId: '',
    countryCode: '',
    cityId: '',
    driverProfileId: '',
    driverBalanceReserveMinor: 0,
    vehicleId: '',
    matchingScore: 0,
    canCreateDispatchOffer: false,
    blockedReason: 'not_evaluated',
    existingOpenDispatchOfferId: '',
    createdAt: '',
    updatedAt: '',
    noFakeDispatchOffer: true,
    ...overrides,
  };
}

export async function listTaxiOrdersDispatchOfferCreateCandidates009I(
  limitRaw: unknown,
  prisma: PrismaAny009I = defaultPrisma as unknown as PrismaAny009I,
): Promise<TaxiOrdersDispatchOfferCandidateResult009I> {
  const missing = missingDelegates009I(prisma);
  if (missing.length) {
    return {
      ok: false,
      version: TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
      code: 'taxi_orders_009i_prisma_delegate_missing',
      candidates: [],
      openRequestCount: 0,
      createReadyCount: 0,
      existingOpenOfferCount: 0,
      dbWriteExecuted: false,
      fakeRequestCreateBlocked: true,
      fakeDriverCreateBlocked: true,
      fakeVehicleCreateBlocked: true,
      fakeOfferCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  const requests: RowAny009I[] = await prisma.taxiRiderRequest.findMany({
    where: { status: { in: [...TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUEST_STATUSES_009I] } },
    orderBy: { updatedAt: 'desc' },
    take: limit009I(limitRaw),
  });

  const candidates: TaxiOrdersDispatchOfferCandidate009I[] = [];
  for (const request of requests) {
    const riderRequestId = str009I(request.id);
    const tariffRegionId = str009I(request.tariffRegionId);
    const tariffRegion = await findTariffRegion009I(prisma, tariffRegionId);
    const countryCode = str009I(tariffRegion?.countryCode || request.countryCode);
    const cityId = str009I(tariffRegion?.cityId || request.cityId);
    const existingOpenOffer = await findOpenOffer009I(prisma, riderRequestId);

    if (existingOpenOffer) {
      candidates.push(candidate009I({
        riderRequestId,
        riderRequestStatus: str009I(request.status),
        quoteId: str009I(request.quoteId),
        riderProfileId: str009I(request.riderProfileId),
        tariffRegionId,
        countryCode,
        cityId,
        driverProfileId: str009I(existingOpenOffer.driverProfileId),
        existingOpenDispatchOfferId: str009I(existingOpenOffer.id),
        blockedReason: 'existing_open_dispatch_offer',
        createdAt: iso009I(request.createdAt),
        updatedAt: iso009I(request.updatedAt),
      }));
      continue;
    }

    const driver = await findEligibleDriver009I(prisma, countryCode, cityId);
    const driverProfileId = str009I(driver?.id);
    if (!driverProfileId) {
      candidates.push(candidate009I({
        riderRequestId,
        riderRequestStatus: str009I(request.status),
        quoteId: str009I(request.quoteId),
        riderProfileId: str009I(request.riderProfileId),
        tariffRegionId,
        countryCode,
        cityId,
        blockedReason: 'no_approved_driver_with_positive_balance',
        createdAt: iso009I(request.createdAt),
        updatedAt: iso009I(request.updatedAt),
      }));
      continue;
    }

    const vehicle = await findApprovedVehicle009I(prisma, driverProfileId);
    const vehicleId = str009I(vehicle?.id);
    const score = vehicleId ? 90 : 40;
    candidates.push(candidate009I({
      riderRequestId,
      riderRequestStatus: str009I(request.status),
      quoteId: str009I(request.quoteId),
      riderProfileId: str009I(request.riderProfileId),
      tariffRegionId,
      countryCode,
      cityId,
      driverProfileId,
      driverBalanceReserveMinor: int009I(driver?.balanceReserveMinor),
      vehicleId,
      matchingScore: score,
      canCreateDispatchOffer: Boolean(vehicleId),
      blockedReason: vehicleId ? '' : 'approved_active_vehicle_required',
      createdAt: iso009I(request.createdAt),
      updatedAt: iso009I(request.updatedAt),
    }));
  }

  return {
    ok: true,
    version: TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
    code: 'taxi_orders_009i_existing_rider_request_dispatch_candidates_loaded',
    candidates,
    openRequestCount: requests.length,
    createReadyCount: candidates.filter((item) => item.canCreateDispatchOffer).length,
    existingOpenOfferCount: candidates.filter((item) => Boolean(item.existingOpenDispatchOfferId)).length,
    dbWriteExecuted: false,
    fakeRequestCreateBlocked: true,
    fakeDriverCreateBlocked: true,
    fakeVehicleCreateBlocked: true,
    fakeOfferCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function createTaxiDispatchOfferFromExistingRequest009I(
  input: TaxiOrdersDispatchOfferCreateInput009I,
  idempotencyKeyRaw: string,
  actorIdRaw: string,
  prisma: PrismaAny009I = defaultPrisma as unknown as PrismaAny009I,
): Promise<TaxiOrdersDispatchOfferCreateResult009I> {
  const idempotencyKey = str009I(idempotencyKeyRaw, `taxi-orders-009i-dispatch-create:${now009I().toISOString()}`);
  const actorId = str009I(actorIdRaw, 'admin-panel');
  const riderRequestId = str009I(input.riderRequestId);
  const driverProfileId = str009I(input.driverProfileId);
  const requestedVehicleId = str009I(input.vehicleId);
  const matchingScore = Math.max(0, Math.min(100, int009I(input.matchingScore, 75)));
  const ttlSeconds = ttl009I(input.offerTtlSeconds);
  const reason = str009I(input.reason, 'admin_dispatch_offer_create_009i');
  const missing = missingDelegates009I(prisma);

  if (missing.length || !riderRequestId || !driverProfileId) {
    return baseResult009I({
      code: missing.length ? 'taxi_orders_009i_prisma_delegate_missing' : 'taxi_orders_009i_rider_request_and_driver_required',
      riderRequestId,
      driverProfileId,
      idempotencyKey,
    });
  }

  const riderRequest: RowAny009I | null = await prisma.taxiRiderRequest.findUnique({ where: { id: riderRequestId } });
  if (!riderRequest) {
    return baseResult009I({
      code: 'taxi_orders_009i_existing_rider_request_not_found_no_fake_request_create',
      riderRequestId,
      driverProfileId,
      idempotencyKey,
    });
  }

  if (!TAXI_ORDERS_DISPATCH_OFFER_CREATE_REQUEST_STATUSES_009I.includes(status009I(riderRequest) as any)) {
    return baseResult009I({
      code: 'taxi_orders_009i_rider_request_status_not_open_for_dispatch_offer',
      riderRequestId,
      driverProfileId,
      idempotencyKey,
      existingRiderRequestFound: true,
    });
  }

  const driver: RowAny009I | null = await prisma.taxiDriverProfile.findUnique({ where: { id: driverProfileId } });
  const positiveDriverBalanceFound = int009I(driver?.balanceReserveMinor) > 0;
  if (!driver || status009I(driver) !== TAXI_ORDERS_DISPATCH_OFFER_CREATE_DRIVER_STATUS_009I || !positiveDriverBalanceFound) {
    return baseResult009I({
      code: 'taxi_orders_009i_existing_approved_driver_with_positive_balance_required_no_fake_driver',
      riderRequestId,
      driverProfileId,
      idempotencyKey,
      existingRiderRequestFound: true,
      existingApprovedDriverFound: Boolean(driver && status009I(driver) === TAXI_ORDERS_DISPATCH_OFFER_CREATE_DRIVER_STATUS_009I),
      positiveDriverBalanceFound,
    });
  }

  const vehicle = await findApprovedVehicle009I(prisma, driverProfileId, requestedVehicleId);
  const vehicleId = str009I(vehicle?.id, requestedVehicleId);
  if (!vehicle?.id) {
    return baseResult009I({
      code: 'taxi_orders_009i_existing_approved_active_vehicle_required_no_fake_vehicle',
      riderRequestId,
      driverProfileId,
      vehicleId,
      idempotencyKey,
      existingRiderRequestFound: true,
      existingApprovedDriverFound: true,
      positiveDriverBalanceFound: true,
    });
  }

  const assignment = await prisma.taxiDriverVehicleAssignment.findFirst({ where: { driverProfileId, vehicleId, active: true } });
  if (!assignment) {
    return baseResult009I({
      code: 'taxi_orders_009i_active_driver_vehicle_assignment_required_no_fake_assignment',
      riderRequestId,
      driverProfileId,
      vehicleId,
      idempotencyKey,
      existingRiderRequestFound: true,
      existingApprovedDriverFound: true,
      existingApprovedVehicleFound: true,
      positiveDriverBalanceFound: true,
    });
  }

  const existingOpenOffer = await findOpenOffer009I(prisma, riderRequestId, driverProfileId);
  if (existingOpenOffer) {
    return baseResult009I({
      ok: true,
      code: 'taxi_orders_009i_dispatch_offer_already_exists_idempotent',
      riderRequestId,
      dispatchOfferId: str009I(existingOpenOffer.id),
      driverProfileId,
      vehicleId,
      idempotencyKey,
      existingRiderRequestFound: true,
      existingApprovedDriverFound: true,
      existingApprovedVehicleFound: true,
      activeVehicleAssignmentFound: true,
      positiveDriverBalanceFound: true,
      existingOpenDispatchOfferFound: true,
      createdOfferStatus: str009I(existingOpenOffer.status),
      dbWriteExecuted: false,
      auditWriteExecuted: false,
    });
  }

  let dispatchOfferId = '';
  const offerExpiresAt = new Date(now009I().getTime() + ttlSeconds * 1000);
  await prisma.$transaction(async (tx: PrismaAny009I) => {
    const created = await tx.taxiDispatchOffer.create({
      data: {
        riderRequestId,
        driverProfileId,
        status: TAXI_ORDERS_DISPATCH_OFFER_CREATE_CREATED_OFFER_STATUS_009I,
        offerExpiresAt,
        matchingScore,
      },
    });
    dispatchOfferId = str009I(created.id);

    await tx.taxiRiderRequest.update({ where: { id: riderRequestId }, data: { status: 'matched' } });

    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId,
        action: TAXI_ORDERS_DISPATCH_OFFER_CREATE_AUDIT_ACTION_009I,
        targetType: 'TaxiDispatchOffer',
        targetId: dispatchOfferId,
        payloadJson: {
          version: TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION,
          riderRequestId,
          dispatchOfferId,
          driverProfileId,
          vehicleId,
          matchingScore,
          offerExpiresAt: offerExpiresAt.toISOString(),
          idempotencyKey,
          reason,
          existingRiderRequestOnly: true,
          existingApprovedDriverOnly: true,
          positiveDriverBalanceRequired: true,
          activeVehicleAssignmentRequired: true,
          fakeRequestCreateBlocked: true,
          fakeDriverCreateBlocked: true,
          fakeVehicleCreateBlocked: true,
          fakeOfferCreateBlocked: true,
          providerDispatch: false,
          walletMutation: false,
          createdAt: now009I().toISOString(),
        },
      },
    });
  });

  return baseResult009I({
    ok: true,
    code: 'taxi_orders_009i_dispatch_offer_created_from_existing_request_driver_vehicle_with_audit',
    riderRequestId,
    dispatchOfferId,
    driverProfileId,
    vehicleId,
    idempotencyKey,
    existingRiderRequestFound: true,
    existingApprovedDriverFound: true,
    existingApprovedVehicleFound: true,
    activeVehicleAssignmentFound: true,
    positiveDriverBalanceFound: true,
    existingOpenDispatchOfferFound: false,
    createdOfferStatus: TAXI_ORDERS_DISPATCH_OFFER_CREATE_CREATED_OFFER_STATUS_009I,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
  });
}
