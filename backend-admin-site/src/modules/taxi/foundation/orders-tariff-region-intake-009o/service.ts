import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_ORDERS_TARIFF_REGION_ALLOWED_STATUSES_009O,
  TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION,
  TAXI_ORDERS_TARIFF_REGION_INTAKE_ACTION_009O,
  TAXI_ORDERS_TARIFF_REGION_INTAKE_ENDPOINTS_009O,
  TAXI_ORDERS_TARIFF_REGION_INTAKE_REQUIRED_DELEGATES_009O,
} from './constants';
import type {
  TaxiOrdersTariffRegionIntakeReadiness009O,
  TaxiOrdersTariffRegionIntakeStatus009O,
  TaxiOrdersTariffRegionUpsertInput009O,
  TaxiOrdersTariffRegionUpsertResult009O,
} from './types';

type PrismaAny009O = Record<string, any>;
type RowAny009O = Record<string, any>;

function str009O(value: unknown): string {
  return String(value ?? '').trim();
}

function upper009O(value: unknown): string {
  return str009O(value).toUpperCase();
}

function int009O(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : Number.NaN;
}

async function count009O(prisma: PrismaAny009O, delegate: string, args?: Record<string, unknown>): Promise<number> {
  try {
    if (!prisma[delegate] || typeof prisma[delegate].count !== 'function') return 0;
    const value = await prisma[delegate].count(args || {});
    return Number.isFinite(Number(value)) ? Number(value) : 0;
  } catch {
    return 0;
  }
}

function missingDelegates009O(prisma: PrismaAny009O): string[] {
  return TAXI_ORDERS_TARIFF_REGION_INTAKE_REQUIRED_DELEGATES_009O.filter((delegate) => !prisma[delegate]);
}

function status009O(value: unknown): 'active' | 'paused' | 'draft' {
  const status = str009O(value || 'active').toLowerCase();
  return (TAXI_ORDERS_TARIFF_REGION_ALLOWED_STATUSES_009O as readonly string[]).includes(status) ? status as 'active' | 'paused' | 'draft' : 'active';
}

function baseResult009O(overrides: Partial<TaxiOrdersTariffRegionUpsertResult009O>): TaxiOrdersTariffRegionUpsertResult009O {
  return {
    ok: false,
    statusCode: 409,
    version: TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION,
    code: 'taxi_orders_009o_not_executed',
    tariffRegionId: '',
    countryCode: '',
    cityId: '',
    zoneId: '',
    tariffCode: '',
    status: '',
    idempotencyKey: '',
    realTariffPayloadAccepted: false,
    idempotent: false,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    fakeTariffCreateBlocked: true,
    fakePriceGenerated: false,
    defaultPriceGenerated: false,
    providerDispatch: false,
    walletMutation: false,
    directDbAccessByUi: false,
    ...overrides,
  };
}

export function buildTaxiOrdersTariffRegionIntakeReadiness009O(): TaxiOrdersTariffRegionIntakeReadiness009O {
  return {
    version: TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION,
    createsFromRealTariffOnly: true,
    activeTariffRegionUnlocksQuoteIntake009K: true,
    fakeTariffCreateBlocked: true,
    fakePriceGenerated: false,
    defaultPriceGenerated: false,
    protectedCreateRequiresExactHeader: true,
    idempotencyRequired: true,
    endpoints: TAXI_ORDERS_TARIFF_REGION_INTAKE_ENDPOINTS_009O,
    requiredPrismaDelegates: TAXI_ORDERS_TARIFF_REGION_INTAKE_REQUIRED_DELEGATES_009O,
    requiredRealFields: [
      'countryCode',
      'cityId',
      'zoneId',
      'tariffCode',
      'baseFareMinor',
      'perKmMinor',
      'perMinuteMinor',
      'commissionBasisPoints',
      'idempotencyKey',
    ],
    dbWriteOnlyForOwnerProvidedTariffRegion: true,
    auditStorage: 'TaxiAuditLog',
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function loadTaxiOrdersTariffRegionIntakeStatus009O(
  prisma: PrismaAny009O = defaultPrisma as unknown as PrismaAny009O,
): Promise<TaxiOrdersTariffRegionIntakeStatus009O> {
  const counts = {
    tariffRegions: await count009O(prisma, 'taxiTariffRegion'),
    activeTariffRegions: await count009O(prisma, 'taxiTariffRegion', { where: { status: 'active' } }),
    auditLogs: await count009O(prisma, 'taxiAuditLog'),
  };
  return {
    ok: true,
    version: TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION,
    code: 'taxi_orders_009o_tariff_region_intake_status_loaded',
    counts,
    canUnlockQuoteIntake009K: counts.activeTariffRegions > 0,
    nextOwnerAction: counts.activeTariffRegions > 0
      ? 'Active TaxiTariffRegion exists. Continue with real rider profile and 009K quote intake.'
      : 'Create at least one active TaxiTariffRegion with owner-provided real fare numbers before quote intake.',
    noFakeRows: true,
    noFakeCreate: true,
    dbWriteExecuted: false,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function upsertTaxiOrdersTariffRegionFromRealTariff009O(
  input: TaxiOrdersTariffRegionUpsertInput009O,
  prisma: PrismaAny009O = defaultPrisma as unknown as PrismaAny009O,
): Promise<TaxiOrdersTariffRegionUpsertResult009O> {
  const countryCode = upper009O(input.countryCode).slice(0, 3);
  const cityId = str009O(input.cityId);
  const zoneId = str009O(input.zoneId);
  const tariffCode = str009O(input.tariffCode).toLowerCase();
  const status = status009O(input.status);
  const baseFareMinor = int009O(input.baseFareMinor);
  const perKmMinor = int009O(input.perKmMinor);
  const perMinuteMinor = int009O(input.perMinuteMinor);
  const commissionBasisPoints = int009O(input.commissionBasisPoints);
  const idempotencyKey = str009O(input.idempotencyKey);
  const reason = str009O(input.reason) || 'admin_orders_009o_real_tariff_region_no_fake';

  const common = { countryCode, cityId, zoneId, tariffCode, status, idempotencyKey };
  const missing = missingDelegates009O(prisma);
  if (missing.length) {
    return baseResult009O({ ...common, statusCode: 409, code: 'taxi_orders_009o_prisma_delegate_missing_no_fake_tariff_create', message: missing.join(', ') });
  }

  const validCore = countryCode.length >= 2 && cityId.length > 0 && zoneId.length > 0 && tariffCode.length > 0 && idempotencyKey.length > 0;
  const validNumbers = baseFareMinor > 0 && perKmMinor > 0 && perMinuteMinor >= 0 && commissionBasisPoints >= 0 && commissionBasisPoints <= 10000;
  if (!validCore || !validNumbers) {
    return baseResult009O({
      ...common,
      statusCode: 400,
      code: 'taxi_orders_009o_real_tariff_fields_required_no_fake_default_prices',
      realTariffPayloadAccepted: false,
      message: 'countryCode, cityId, zoneId, tariffCode, positive base/perKm, non-negative perMinute and commissionBasisPoints 0..10000 are required.',
    });
  }

  try {
    const execute = async (tx: PrismaAny009O): Promise<RowAny009O> => {
      const row = await tx.taxiTariffRegion.upsert({
        where: {
          countryCode_cityId_zoneId_tariffCode: { countryCode, cityId, zoneId, tariffCode },
        },
        update: {
          status,
          baseFareMinor,
          perKmMinor,
          perMinuteMinor,
          commissionBasisPoints,
        },
        create: {
          countryCode,
          cityId,
          zoneId,
          tariffCode,
          status,
          baseFareMinor,
          perKmMinor,
          perMinuteMinor,
          commissionBasisPoints,
        },
      });

      if (tx.taxiAuditLog && typeof tx.taxiAuditLog.create === 'function') {
        await tx.taxiAuditLog.create({
          data: {
            actorType: 'admin',
            actorId: 'admin-ui',
            action: TAXI_ORDERS_TARIFF_REGION_INTAKE_ACTION_009O,
            targetType: 'TaxiTariffRegion',
            targetId: str009O(row.id),
            payloadJson: {
              countryCode,
              cityId,
              zoneId,
              tariffCode,
              status,
              baseFareMinor,
              perKmMinor,
              perMinuteMinor,
              commissionBasisPoints,
              reason,
              idempotencyKey,
              fakeTariffCreateBlocked: true,
              fakePriceGenerated: false,
              defaultPriceGenerated: false,
              providerDispatch: false,
              walletMutation: false,
            },
          },
        });
      }
      return row;
    };

    const row = typeof prisma.$transaction === 'function' ? await prisma.$transaction(execute) : await execute(prisma);
    return baseResult009O({
      ok: true,
      statusCode: 200,
      code: 'taxi_orders_009o_tariff_region_upserted_from_real_owner_numbers_with_audit',
      tariffRegionId: str009O(row.id),
      countryCode,
      cityId,
      zoneId,
      tariffCode,
      status,
      idempotencyKey,
      realTariffPayloadAccepted: true,
      idempotent: false,
      dbWriteExecuted: true,
      auditWriteExecuted: true,
    });
  } catch (error) {
    return baseResult009O({
      ...common,
      statusCode: 409,
      code: 'taxi_orders_009o_tariff_region_upsert_failed_no_fake_tariff_created',
      realTariffPayloadAccepted: true,
      message: error instanceof Error ? error.message : 'tariff_region_upsert_failed',
    });
  }
}
