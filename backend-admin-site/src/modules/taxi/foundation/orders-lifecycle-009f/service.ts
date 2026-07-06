import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_LIFECYCLE_009F_VERSION,
  TAXI_ORDERS_LIFECYCLE_ALLOWED_TRANSITIONS_009F,
  TAXI_ORDERS_LIFECYCLE_AUDIT_ACTION_009F,
  TAXI_ORDERS_LIFECYCLE_ENDPOINTS_009F,
  TAXI_ORDERS_LIFECYCLE_REQUIRED_DELEGATES_009F,
} from './constants';
import type {
  TaxiOrdersLifecycleReadiness009F,
  TaxiOrdersLifecycleTransitionInput009F,
  TaxiOrdersLifecycleTransitionResult009F,
  TaxiTripLifecycleStatus009F,
} from './types';

type PrismaAny009F = Record<string, any>;
type RowAny009F = Record<string, any>;

function now009F(): Date {
  return new Date();
}

function str009F(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function num009F(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function status009F(value: unknown): TaxiTripLifecycleStatus009F {
  const normalized = str009F(value, 'unknown').toLowerCase();
  if (normalized === 'accepted' || normalized === 'driver_arriving' || normalized === 'arrived' || normalized === 'rider_onboard' || normalized === 'active' || normalized === 'completed' || normalized === 'cancelled' || normalized === 'disputed') return normalized;
  return 'unknown';
}

function missingDelegates009F(prisma: PrismaAny009F): string[] {
  return TAXI_ORDERS_LIFECYCLE_REQUIRED_DELEGATES_009F.filter((delegate) => !prisma[delegate]);
}

function allowedNext009F(previousStatus: TaxiTripLifecycleStatus009F, nextStatus: TaxiTripLifecycleStatus009F): boolean {
  const allowed = TAXI_ORDERS_LIFECYCLE_ALLOWED_TRANSITIONS_009F[previousStatus] || [];
  return allowed.includes(nextStatus as never);
}

function transitionTimestamps009F(nextStatus: TaxiTripLifecycleStatus009F, existing: RowAny009F, finalFareMinor: number): RowAny009F {
  const data: RowAny009F = { status: nextStatus };
  const now = now009F();
  if (nextStatus === 'driver_arriving' && !existing.pickupStartedAt) data.pickupStartedAt = now;
  if (nextStatus === 'rider_onboard' && !existing.pickedUpAt) data.pickedUpAt = now;
  if (nextStatus === 'active' && !existing.pickedUpAt) data.pickedUpAt = now;
  if (nextStatus === 'completed') {
    if (!existing.completedAt) data.completedAt = now;
    if (finalFareMinor > 0) data.finalFareMinor = finalFareMinor;
  }
  if (nextStatus === 'cancelled' || nextStatus === 'disputed') {
    // Do not synthesize completion or fare on cancellation/dispute.
  }
  return data;
}

export function buildTaxiOrdersLifecycleReadiness009F(): TaxiOrdersLifecycleReadiness009F {
  return {
    version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
    existingTripOnly: true,
    fakeOrderCreateBlocked: true,
    adminCannotCreateFakeOrders: true,
    everyOrderSource: 'TaxiTrip',
    auditStorage: 'TaxiAuditLog',
    protectedTransitionRequiresExactHeader: true,
    endpoints: TAXI_ORDERS_LIFECYCLE_ENDPOINTS_009F,
    requiredPrismaDelegates: TAXI_ORDERS_LIFECYCLE_REQUIRED_DELEGATES_009F,
    allowedTransitions: TAXI_ORDERS_LIFECYCLE_ALLOWED_TRANSITIONS_009F,
    dbWriteOnlyForExistingTaxiTripTransition: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function transitionExistingTaxiTripLifecycle009F(
  input: TaxiOrdersLifecycleTransitionInput009F,
  idempotencyKeyRaw: string,
  actorIdRaw: string,
  prisma: PrismaAny009F = defaultPrisma as unknown as PrismaAny009F,
): Promise<TaxiOrdersLifecycleTransitionResult009F> {
  const idempotencyKey = str009F(idempotencyKeyRaw, `taxi-orders-009f-lifecycle:${now009F().toISOString()}`);
  const actorId = str009F(actorIdRaw, 'admin-panel');
  const orderId = str009F(input.orderId);
  const nextStatus = status009F(input.nextStatus);
  const finalFareMinor = num009F(input.finalFareMinor, 0);
  const reason = str009F(input.reason, 'admin_lifecycle_transition');

  const missing = missingDelegates009F(prisma);
  if (missing.length || !orderId) {
    return {
      ok: false,
      version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
      code: missing.length ? 'taxi_orders_009f_prisma_delegate_missing' : 'taxi_orders_009f_order_id_required',
      orderId,
      previousStatus: 'unknown',
      nextStatus,
      idempotencyKey,
      transitionAllowed: false,
      existingTaxiTripFound: false,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeOrderCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
      directDbAccessByUi: false,
    };
  }

  const existing: RowAny009F | null = await prisma.taxiTrip.findUnique({ where: { id: orderId } });
  if (!existing) {
    return {
      ok: false,
      version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
      code: 'taxi_orders_009f_existing_taxitrip_not_found_no_fake_create',
      orderId,
      previousStatus: 'unknown',
      nextStatus,
      idempotencyKey,
      transitionAllowed: false,
      existingTaxiTripFound: false,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeOrderCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
      directDbAccessByUi: false,
    };
  }

  const previousStatus = status009F(existing.status);
  const transitionAllowed = allowedNext009F(previousStatus, nextStatus);
  if (!transitionAllowed) {
    return {
      ok: false,
      version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
      code: 'taxi_orders_009f_transition_not_allowed',
      orderId,
      previousStatus,
      nextStatus,
      idempotencyKey,
      transitionAllowed: false,
      existingTaxiTripFound: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeOrderCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
      directDbAccessByUi: false,
    };
  }

  if (nextStatus === 'completed' && finalFareMinor <= 0 && num009F(existing.finalFareMinor, 0) <= 0) {
    return {
      ok: false,
      version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
      code: 'taxi_orders_009f_completed_requires_real_final_fare',
      orderId,
      previousStatus,
      nextStatus,
      idempotencyKey,
      transitionAllowed: false,
      existingTaxiTripFound: true,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeOrderCreateBlocked: true,
      providerDispatch: false,
      walletMutation: false,
      directDbAccessByUi: false,
    };
  }

  const updateData = transitionTimestamps009F(nextStatus, existing, finalFareMinor || num009F(existing.finalFareMinor, 0));
  await prisma.$transaction(async (tx: PrismaAny009F) => {
    await tx.taxiTrip.update({ where: { id: orderId }, data: updateData });
    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId,
        action: TAXI_ORDERS_LIFECYCLE_AUDIT_ACTION_009F,
        targetType: 'TaxiTrip',
        targetId: orderId,
        payloadJson: {
          version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
          orderId,
          previousStatus,
          nextStatus,
          idempotencyKey,
          reason,
          existingTripOnly: true,
          fakeOrderCreateBlocked: true,
          providerDispatch: false,
          walletMutation: false,
          dbWriteOnlyForExistingTaxiTripTransition: true,
          transitionedAt: now009F().toISOString(),
        },
      },
    });
  });

  return {
    ok: true,
    version: TAXI_ORDERS_LIFECYCLE_009F_VERSION,
    code: 'taxi_orders_009f_existing_taxitrip_transitioned_with_audit',
    orderId,
    previousStatus,
    nextStatus,
    idempotencyKey,
    transitionAllowed: true,
    existingTaxiTripFound: true,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
    fakeOrderCreateBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
  };
}
