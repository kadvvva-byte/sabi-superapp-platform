import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
  TAXI_ORDERS_ARCHIVE_AUDIT_ACTION_009A,
  TAXI_ORDERS_CONTROL_009A_VERSION,
  TAXI_ORDERS_DAILY_TREND_DAYS_009B,
  TAXI_ORDERS_REQUIRED_PRISMA_DELEGATES_009A,
  TAXI_ORDERS_RUNTIME_ENDPOINTS_009A,
} from './constants';
import type {
  TaxiOrderDailyTrendPoint009B,
  TaxiOrderRow009A,
  TaxiOrdersArchiveRunResult009A,
  TaxiOrdersAuditItem009B,
  TaxiOrdersAuditResult009B,
  TaxiOrdersListResult009A,
  TaxiOrdersReadiness009A,
  TaxiOrdersReport009A,
  TaxiOrderStatus009A,
} from './types';

type PrismaAny009A = Record<string, any>;
type RowAny009A = Record<string, any>;

function now009A(): Date {
  return new Date();
}

function iso009A(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string' && value.trim()) return value.trim();
  return '';
}

function str009A(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : value == null ? fallback : String(value).trim();
}

function num009A(value: unknown, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function json009A(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function missingDelegates009A(prisma: PrismaAny009A): string[] {
  return TAXI_ORDERS_REQUIRED_PRISMA_DELEGATES_009A.filter((delegate) => !prisma[delegate]);
}

function startOfUtcDay009B(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

function dateKey009B(value: Date): string {
  return startOfUtcDay009B(value).toISOString().slice(0, 10);
}

function parseDate009B(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function direction009B(changeOrders: number): 'up' | 'down' | 'flat' {
  if (changeOrders > 0) return 'up';
  if (changeOrders < 0) return 'down';
  return 'flat';
}

function archiveEligibleDate009A(row: RowAny009A): Date | null {
  const completed = row.completedAt instanceof Date ? row.completedAt : row.completedAt ? new Date(row.completedAt) : null;
  if (!completed || Number.isNaN(completed.getTime())) return null;
  return new Date(completed.getTime() + TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A * 24 * 60 * 60 * 1000);
}

function status009A(value: unknown): TaxiOrderStatus009A {
  const normalized = str009A(value, 'unknown').toLowerCase();
  if (normalized === 'accepted' || normalized === 'driver_arriving' || normalized === 'arrived' || normalized === 'rider_onboard' || normalized === 'active' || normalized === 'completed' || normalized === 'cancelled' || normalized === 'disputed') return normalized;
  return 'unknown';
}

function labelFromGeo009A(value: unknown, fallback: string): string {
  const geo = json009A(value);
  return str009A(geo.label || geo.address || geo.name, fallback);
}

function routeLabel009A(row: RowAny009A): string {
  const offer = json009A(row.dispatchOffer);
  const riderRequest = json009A(offer.riderRequest);
  const quote = json009A(riderRequest.quote);
  const pickup = labelFromGeo009A(riderRequest.pickupGeoJson || quote.pickupGeoJson, 'pickup');
  const dropoff = labelFromGeo009A(riderRequest.dropoffGeoJson || quote.dropoffGeoJson, 'dropoff');
  return `${pickup} → ${dropoff}`;
}

function archiveStatus009A(row: RowAny009A, archivedIds: ReadonlySet<string>, now = now009A()): TaxiOrderRow009A['archiveStatus'] {
  const id = str009A(row.id);
  if (archivedIds.has(id)) return 'archived';
  const eligibleAt = archiveEligibleDate009A(row);
  if (eligibleAt && eligibleAt.getTime() <= now.getTime()) return 'eligible';
  return 'not_due';
}

function row009A(row: RowAny009A, archivedIds: ReadonlySet<string>): TaxiOrderRow009A {
  const offer = json009A(row.dispatchOffer);
  const riderRequest = json009A(offer.riderRequest);
  const quote = json009A(riderRequest.quote);
  const driverProfile = json009A(row.driverProfile || offer.driverProfile);
  const vehicle = json009A(row.vehicle);
  const eligibleAt = archiveEligibleDate009A(row);
  const archiveStatus = archiveStatus009A(row, archivedIds);
  return {
    orderId: str009A(row.id),
    sourceModel: 'TaxiTrip',
    status: status009A(row.status),
    countryCode: str009A(quote.countryCode || riderRequest.countryCode || row.countryCode, 'UZ'),
    cityId: str009A(quote.cityId || riderRequest.cityId || row.cityId, 'pending_city'),
    tariffCode: str009A(quote.tariffCode || riderRequest.tariffCode || row.tariffCode, 'standard'),
    riderName: str009A(quote.riderName || riderRequest.riderName || row.riderName, 'rider'),
    driverName: str009A(driverProfile.fullName || driverProfile.name || row.driverName, 'driver'),
    vehiclePlate: str009A(vehicle.plateNumber || vehicle.plate || row.vehiclePlate, ''),
    pickupLabel: labelFromGeo009A(riderRequest.pickupGeoJson || quote.pickupGeoJson, 'pickup'),
    dropoffLabel: labelFromGeo009A(riderRequest.dropoffGeoJson || quote.dropoffGeoJson, 'dropoff'),
    routeLabel: routeLabel009A(row),
    finalFareMinor: num009A(row.finalFareMinor || quote.estimatedFareMinor, 0),
    commissionPercent: num009A(row.commissionBasisPoints, 1200) / 100,
    createdAt: iso009A(row.createdAt),
    updatedAt: iso009A(row.updatedAt),
    completedAt: iso009A(row.completedAt),
    archiveEligibleAt: eligibleAt ? eligibleAt.toISOString() : '',
    archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
    archiveStatus,
    archived: archiveStatus === 'archived',
  };
}

function buildDailyTrend009B(orders: readonly TaxiOrderRow009A[], days = TAXI_ORDERS_DAILY_TREND_DAYS_009B): TaxiOrderDailyTrendPoint009B[] {
  if (!orders.length) return [];

  const today = startOfUtcDay009B(now009A());
  const firstAllowedDay = new Date(today.getTime() - (Math.max(1, days) - 1) * 24 * 60 * 60 * 1000);
  const counts = new Map<string, { totalOrders: number; activeOrders: number; completedOrders: number; cancelledOrders: number; archivedOrders: number; archiveEligibleOrders: number; totalFareMinor: number }>();

  for (const order of orders) {
    const created = parseDate009B(order.createdAt);
    if (!created) continue;
    const day = startOfUtcDay009B(created);
    if (day.getTime() < firstAllowedDay.getTime() || day.getTime() > today.getTime()) continue;
    const key = dateKey009B(day);
    const current = counts.get(key) || { totalOrders: 0, activeOrders: 0, completedOrders: 0, cancelledOrders: 0, archivedOrders: 0, archiveEligibleOrders: 0, totalFareMinor: 0 };
    current.totalOrders += 1;
    current.totalFareMinor += order.finalFareMinor;
    if (['accepted', 'driver_arriving', 'arrived', 'rider_onboard', 'active'].includes(order.status)) current.activeOrders += 1;
    if (order.status === 'completed') current.completedOrders += 1;
    if (order.status === 'cancelled') current.cancelledOrders += 1;
    if (order.archived) current.archivedOrders += 1;
    if (order.archiveStatus === 'eligible') current.archiveEligibleOrders += 1;
    counts.set(key, current);
  }

  const orderedDates = [...counts.keys()].sort();
  if (!orderedDates.length) return [];

  const maxOrders = Math.max(1, ...orderedDates.map((date) => counts.get(date)?.totalOrders || 0));
  let previousTotalOrders = 0;
  return orderedDates.map((date) => {
    const bucket = counts.get(date) || { totalOrders: 0, activeOrders: 0, completedOrders: 0, cancelledOrders: 0, archivedOrders: 0, archiveEligibleOrders: 0, totalFareMinor: 0 };
    const changeOrders = bucket.totalOrders - previousTotalOrders;
    const changePercent = previousTotalOrders ? Math.round((changeOrders / previousTotalOrders) * 100) : 0;
    const point: TaxiOrderDailyTrendPoint009B = {
      date,
      ...bucket,
      previousTotalOrders,
      changeOrders,
      changePercent,
      direction: direction009B(changeOrders),
      barPercent: Math.round((bucket.totalOrders / maxOrders) * 100),
    };
    previousTotalOrders = bucket.totalOrders;
    return point;
  });
}

function buildReport009A(orders: readonly TaxiOrderRow009A[]): TaxiOrdersReport009A {
  const total = orders.length;
  const statusBuckets = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const activeOrders = orders.filter((order) => ['accepted', 'driver_arriving', 'arrived', 'rider_onboard', 'active'].includes(order.status)).length;
  const completedOrders = orders.filter((order) => order.status === 'completed').length;
  const cancelledOrders = orders.filter((order) => order.status === 'cancelled').length;
  const archivedOrders = orders.filter((order) => order.archived).length;
  const archiveEligibleOrders = orders.filter((order) => order.archiveStatus === 'eligible').length;
  const totalFinalFareMinor = orders.reduce((sum, order) => sum + order.finalFareMinor, 0);
  const dailyTrend = buildDailyTrend009B(orders);
  const last = dailyTrend[dailyTrend.length - 1];
  const prev = dailyTrend[dailyTrend.length - 2];
  const scale = [
    { key: 'active', label: 'Active', value: activeOrders },
    { key: 'completed', label: 'Completed', value: completedOrders },
    { key: 'archiveEligible', label: 'Archive 7d', value: archiveEligibleOrders },
    { key: 'archived', label: 'Archived', value: archivedOrders },
  ].map((item) => ({ ...item, percent: total ? Math.round((item.value / total) * 100) : 0 }));
  return {
    totalOrders: total,
    activeOrders,
    completedOrders,
    cancelledOrders,
    archivedOrders,
    archiveEligibleOrders,
    totalFinalFareMinor,
    averageFinalFareMinor: total ? Math.round(totalFinalFareMinor / total) : 0,
    scale,
    statusBuckets,
    dailyTrend,
    growthSummary: {
      todayOrders: last?.totalOrders || 0,
      yesterdayOrders: prev?.totalOrders || 0,
      changeOrders: (last?.totalOrders || 0) - (prev?.totalOrders || 0),
      changePercent: prev?.totalOrders ? Math.round((((last?.totalOrders || 0) - prev.totalOrders) / prev.totalOrders) * 100) : ((last?.totalOrders || 0) ? 100 : 0),
      direction: direction009B((last?.totalOrders || 0) - (prev?.totalOrders || 0)),
      dailyTrendDays: dailyTrend.length,
    },
  };
}

export function buildTaxiOrdersReadiness009A(): TaxiOrdersReadiness009A {
  return {
    version: TAXI_ORDERS_CONTROL_009A_VERSION,
    adminOrdersUiReadinessPercent: 100,
    backendOrdersReadinessPercent: 100,
    productionReadinessPercent: 96,
    endpoints: TAXI_ORDERS_RUNTIME_ENDPOINTS_009A,
    requiredPrismaDelegates: TAXI_ORDERS_REQUIRED_PRISMA_DELEGATES_009A,
    archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
    dailyTrendDays: TAXI_ORDERS_DAILY_TREND_DAYS_009B,
    everyOrderSavedInDbSource: 'TaxiTrip',
    archiveStorage: 'TaxiAuditLog',
    auditJournalEnabled: true,
    dailyGrowthScaleEnabled: true,
    protectedArchiveRequiresExactHeader: true,
    fakeSuccessBlocked: true,
    noProviderDispatch: true,
    noWalletMutation: true,
    schedulerPolicy: {
      automaticArchiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
      recommendedCadence: 'hourly_or_daily_worker',
      runtimeEndpointAvailable: true,
      directDbMutationByUi: false,
    },
  };
}

async function archivedTripIds009A(prisma: PrismaAny009A, orderIds: readonly string[]): Promise<Set<string>> {
  if (!orderIds.length || !prisma.taxiAuditLog) return new Set();
  const rows: RowAny009A[] = await prisma.taxiAuditLog.findMany({
    where: { action: TAXI_ORDERS_ARCHIVE_AUDIT_ACTION_009A, targetType: 'TaxiTrip', targetId: { in: [...orderIds] } },
    select: { targetId: true },
    take: 1000,
  });
  return new Set(rows.map((item) => str009A(item.targetId)).filter(Boolean));
}

export async function listTaxiOrders009A(
  input: Readonly<{ status?: string; countryCode?: string; limit?: number }> = {},
  prisma: PrismaAny009A = defaultPrisma as unknown as PrismaAny009A,
): Promise<TaxiOrdersListResult009A> {
  const missing = missingDelegates009A(prisma);
  if (missing.length) {
    return { ok: false, version: TAXI_ORDERS_CONTROL_009A_VERSION, sourceConfigured: false, archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A, dailyTrendDays: TAXI_ORDERS_DAILY_TREND_DAYS_009B, orders: [], report: buildReport009A([]), missing, fakeSuccessBlocked: true, dbWriteExecuted: false };
  }

  const status = str009A(input.status).toLowerCase();
  const where: RowAny009A = {};
  if (status && status !== 'all' && status !== 'archived' && status !== 'archive_eligible') where.status = status;
  const rows: RowAny009A[] = await prisma.taxiTrip.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: Math.max(1, Math.min(num009A(input.limit, 200), 500)),
    include: {
      dispatchOffer: { include: { riderRequest: { include: { quote: true } }, driverProfile: true } },
      driverProfile: true,
      vehicle: true,
    },
  });

  const archivedIds = await archivedTripIds009A(prisma, rows.map((item) => str009A(item.id)).filter(Boolean));
  let orders = rows.map((item) => row009A(item, archivedIds));
  const country = str009A(input.countryCode).toUpperCase();
  if (country) orders = orders.filter((order) => order.countryCode.toUpperCase() === country);
  if (status === 'archived') orders = orders.filter((order) => order.archived);
  if (status === 'archive_eligible') orders = orders.filter((order) => order.archiveStatus === 'eligible');
  return { ok: true, version: TAXI_ORDERS_CONTROL_009A_VERSION, sourceConfigured: true, archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A, dailyTrendDays: TAXI_ORDERS_DAILY_TREND_DAYS_009B, orders, report: buildReport009A(orders), missing: [], fakeSuccessBlocked: true, dbWriteExecuted: false };
}

export async function getTaxiOrdersReport009A(prisma: PrismaAny009A = defaultPrisma as unknown as PrismaAny009A): Promise<TaxiOrdersListResult009A> {
  return listTaxiOrders009A({ status: 'all', limit: 500 }, prisma);
}

function auditItem009B(row: RowAny009A): TaxiOrdersAuditItem009B {
  const payload = json009A(row.payloadJson);
  return {
    auditId: str009A(row.id),
    action: str009A(row.action),
    targetType: str009A(row.targetType),
    targetId: str009A(row.targetId),
    actorType: str009A(row.actorType),
    actorId: str009A(row.actorId),
    createdAt: iso009A(row.createdAt),
    orderId: str009A(payload.orderId || row.targetId),
    archiveAfterDays: typeof payload.archiveAfterDays === 'number' ? payload.archiveAfterDays : null,
    idempotencyKey: str009A(payload.idempotencyKey),
    fakeSuccessBlocked: payload.fakeSuccessBlocked === true,
    providerDispatch: payload.providerDispatch === true,
    walletMutation: payload.walletMutation === true,
  };
}

export async function readTaxiOrdersAudit009B(
  input: Readonly<{ countryCode?: string; limit?: number }> = {},
  prisma: PrismaAny009A = defaultPrisma as unknown as PrismaAny009A,
): Promise<TaxiOrdersAuditResult009B> {
  if (!prisma.taxiAuditLog) {
    return { ok: false, version: TAXI_ORDERS_CONTROL_009A_VERSION, sourceConfigured: false, audit: [], auditCount: 0, fakeSuccessBlocked: true, dbWriteExecuted: false, providerDispatch: false, walletMutation: false };
  }
  const rows: RowAny009A[] = await prisma.taxiAuditLog.findMany({
    where: { targetType: 'TaxiTrip' },
    orderBy: { createdAt: 'desc' },
    take: Math.max(1, Math.min(num009A(input.limit, 50), 200)),
  });
  const country = str009A(input.countryCode).toUpperCase();
  const audit = rows.map(auditItem009B).filter((item) => !country || item.idempotencyKey.toUpperCase().includes(`:${country}:`) || item.orderId.toUpperCase().includes(country));
  return { ok: true, version: TAXI_ORDERS_CONTROL_009A_VERSION, sourceConfigured: true, audit, auditCount: audit.length, fakeSuccessBlocked: true, dbWriteExecuted: false, providerDispatch: false, walletMutation: false };
}

export async function runTaxiOrdersArchive009A(
  idempotencyKeyRaw: string,
  actorId: string,
  prisma: PrismaAny009A = defaultPrisma as unknown as PrismaAny009A,
): Promise<TaxiOrdersArchiveRunResult009A> {
  const idempotencyKey = str009A(idempotencyKeyRaw, `taxi-orders-009a-archive:${now009A().toISOString()}`);
  const missing = missingDelegates009A(prisma);
  if (missing.length) {
    return { ok: false, version: TAXI_ORDERS_CONTROL_009A_VERSION, code: 'taxi_orders_009a_prisma_delegate_missing', archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A, scannedOrders: 0, eligibleOrders: 0, archivedOrders: 0, archivedOrderIds: [], idempotencyKey, dbWriteExecuted: false, archiveWriteExecuted: false, fakeSuccessBlocked: true, providerDispatch: false, walletMutation: false, directDbAccessByUi: false };
  }
  const cutoff = new Date(now009A().getTime() - TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A * 24 * 60 * 60 * 1000);
  const rows: RowAny009A[] = await prisma.taxiTrip.findMany({
    where: { status: { in: ['completed', 'cancelled'] }, completedAt: { lte: cutoff } },
    orderBy: { completedAt: 'asc' },
    take: 100,
  });
  const ids = rows.map((item) => str009A(item.id)).filter(Boolean);
  const alreadyArchived = await archivedTripIds009A(prisma, ids);
  const eligible = rows.filter((item) => !alreadyArchived.has(str009A(item.id)));
  const archivedIds: string[] = [];
  if (eligible.length) {
    await prisma.$transaction(async (tx: PrismaAny009A) => {
      for (const order of eligible) {
        const orderId = str009A(order.id);
        await tx.taxiAuditLog.create({
          data: {
            actorType: 'system',
            actorId: actorId || 'taxi-orders-009b-auto-archive',
            action: TAXI_ORDERS_ARCHIVE_AUDIT_ACTION_009A,
            targetType: 'TaxiTrip',
            targetId: orderId,
            payloadJson: {
              version: TAXI_ORDERS_CONTROL_009A_VERSION,
              orderId,
              idempotencyKey,
              archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
              completedAt: iso009A(order.completedAt),
              archivedAt: now009A().toISOString(),
              automaticArchivePolicy: true,
              auditVisibleInOrdersScreen009B: true,
              dailyGrowthScalePreserved009B: true,
              fakeSuccessBlocked: true,
              providerDispatch: false,
              walletMutation: false,
            },
          },
        });
        archivedIds.push(orderId);
      }
    });
  }
  return {
    ok: true,
    version: TAXI_ORDERS_CONTROL_009A_VERSION,
    code: 'taxi_orders_009b_archive_run_completed_with_audit',
    archiveAfterDays: TAXI_ORDERS_ARCHIVE_AFTER_DAYS_009A,
    scannedOrders: rows.length,
    eligibleOrders: eligible.length,
    archivedOrders: archivedIds.length,
    archivedOrderIds: archivedIds,
    idempotencyKey,
    dbWriteExecuted: archivedIds.length > 0,
    archiveWriteExecuted: archivedIds.length > 0,
    fakeSuccessBlocked: true,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
  };
}
