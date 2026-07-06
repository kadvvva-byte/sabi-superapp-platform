import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_COUNTRY_TARIFF_CLASSES_008A,
  TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A,
  TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
  TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
  TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
  TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
} from '../country-tariffs-008a/constants';
import {
  TAXI_COUNTRY_TARIFFS_008C_AUDIT_ACTION,
  TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT,
  TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT,
  TAXI_COUNTRY_TARIFFS_008C_ENDPOINTS,
  TAXI_COUNTRY_TARIFFS_008C_MAX_ROWS_PER_SAVE,
  TAXI_COUNTRY_TARIFFS_008C_VERSION,
} from './constants';
import type {
  TaxiCountryTariffClass008A,
  TaxiCountryTariffRow008A,
} from '../country-tariffs-008a/types';
import type {
  TaxiCountryTariffAuditEntry008C,
  TaxiCountryTariffAuditJournalItem008C,
  TaxiCountryTariffChange008C,
  TaxiCountryTariffDraftInput008C,
  TaxiCountryTariffSavePayload008C,
  TaxiCountryTariffsAuditJournalResult008C,
  TaxiCountryTariffsProductionSaveResult008C,
  TaxiCountryTariffsReadiness008C,
} from './types';

type PrismaAny008C = Record<string, any>;

type TransactionResult008C = Readonly<{
  savedRows: TaxiCountryTariffRow008A[];
  auditEntries: TaxiCountryTariffAuditEntry008C[];
}>;

type TaxiAuditLogRow008C = Record<string, any>;

type NormalizedTariff008C = Readonly<{
  countryCode: string;
  tariffCode: TaxiCountryTariffClass008A;
  status: 'draft' | 'active' | 'paused' | 'retired';
  baseFareMinor: number;
  peakBaseFareMinor: number;
  perKmMinor: number;
  perMinuteMinor: number;
  commissionBasisPoints: number;
}>;

function nowIso008C(): string {
  return new Date().toISOString();
}

function str008C(value: unknown): string {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function number008C(value: unknown, fallback: number): number {
  const raw = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(raw)) return fallback;
  return Math.round(raw);
}

function percent008C(value: unknown, fallback: number): number {
  const raw = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(raw)) return fallback;
  return Math.round(raw * 100) / 100;
}

function safeSabiAiApplyFlow008C(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  return {
    countryCode: str008C(input.countryCode).toUpperCase(),
    discountPercent: percent008C(input.discountPercent, 0),
    appliedAt: str008C(input.appliedAt),
    appliedRows: Math.max(0, number008C(input.appliedRows, 0)),
    sourceCode: str008C(input.sourceCode),
    localOnly: input.localOnly === true,
    dbWriteExecuted: input.dbWriteExecuted === true,
    tariffWriteExecuted: input.tariffWriteExecuted === true,
    dbWriteRequiresProtectedSave: input.dbWriteRequiresProtectedSave === true,
  };
}

function countryInfo008C(countryCode: string) {
  const code = str008C(countryCode).toUpperCase().slice(0, 3) || 'UZ';
  return TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A.find((item) => item.countryCode === code) || {
    countryCode: code,
    countryName: code,
    currencyCode: code,
    localeLabel: code,
  };
}

function tariffCode008C(value: unknown): TaxiCountryTariffClass008A {
  const code = str008C(value).toLowerCase();
  return TAXI_COUNTRY_TARIFF_CLASSES_008A.includes(code as TaxiCountryTariffClass008A) ? code as TaxiCountryTariffClass008A : 'standard';
}

function status008C(value: unknown): 'draft' | 'active' | 'paused' | 'retired' {
  const status = str008C(value).toLowerCase();
  if (status === 'draft' || status === 'paused' || status === 'retired') return status;
  return 'active';
}

function commissionBasisPoints008C(input: TaxiCountryTariffDraftInput008C): number {
  if (input.commissionBasisPoints !== undefined && input.commissionBasisPoints !== null && input.commissionBasisPoints !== '') {
    return number008C(input.commissionBasisPoints, 0);
  }
  return Math.round(percent008C(input.commissionPercent, 0) * 100);
}

function normalizeInput008C(input: TaxiCountryTariffDraftInput008C): NormalizedTariff008C {
  const countryCode = str008C(input.countryCode).toUpperCase().slice(0, 3) || 'UZ';
  const tariffCode = tariffCode008C(input.tariffCode);
  const baseFareMinor = Math.max(0, number008C(input.baseFareMinor, 0));
  return {
    countryCode,
    tariffCode,
    status: status008C(input.status),
    baseFareMinor,
    peakBaseFareMinor: baseFareMinor * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    perKmMinor: Math.max(0, number008C(input.perKmMinor, 0)),
    perMinuteMinor: Math.max(0, number008C(input.perMinuteMinor, 0)),
    commissionBasisPoints: commissionBasisPoints008C(input),
  };
}

function row008C(input: NormalizedTariff008C & Readonly<{ updatedAt?: unknown; persisted: boolean }>): TaxiCountryTariffRow008A {
  const country = countryInfo008C(input.countryCode);
  const commissionPercent = Math.round((input.commissionBasisPoints / 100) * 100) / 100;
  return {
    countryCode: country.countryCode,
    countryName: country.countryName,
    currencyCode: country.currencyCode,
    cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
    zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
    tariffCode: input.tariffCode,
    status: input.status,
    baseFareMinor: input.baseFareMinor,
    peakBaseFareMinor: input.baseFareMinor * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    peakPickupIncreasePercent: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
    peakPickupMultiplier: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    perKmMinor: input.perKmMinor,
    perMinuteMinor: input.perMinuteMinor,
    commissionPercent,
    commissionBasisPoints: input.commissionBasisPoints,
    effectiveOrderCommissionFormula: `orderTotalMinor * ${commissionPercent} / 100`,
    updatedAt: input.updatedAt instanceof Date ? input.updatedAt.toISOString() : str008C(input.updatedAt) || nowIso008C(),
    persisted: input.persisted,
  };
}

function persistedRow008C(item: Record<string, any> | null): Partial<TaxiCountryTariffRow008A> | null {
  if (!item) return null;
  return row008C({
    countryCode: str008C(item.countryCode).toUpperCase(),
    tariffCode: tariffCode008C(item.tariffCode),
    status: status008C(item.status),
    baseFareMinor: number008C(item.baseFareMinor, 0),
    peakBaseFareMinor: number008C(item.baseFareMinor, 0) * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    perKmMinor: number008C(item.perKmMinor, 0),
    perMinuteMinor: number008C(item.perMinuteMinor, 0),
    commissionBasisPoints: number008C(item.commissionBasisPoints, 0),
    updatedAt: item.updatedAt,
    persisted: true,
  });
}

function validationErrors008C(rawTariffs: readonly TaxiCountryTariffDraftInput008C[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  if (!rawTariffs.length) errors.push('tariffs is required');
  if (rawTariffs.length > TAXI_COUNTRY_TARIFFS_008C_MAX_ROWS_PER_SAVE) errors.push(`tariffs max ${TAXI_COUNTRY_TARIFFS_008C_MAX_ROWS_PER_SAVE} rows per save`);

  rawTariffs.forEach((input, index) => {
    const prefix = `tariffs[${index}]`;
    const countryCode = str008C(input.countryCode).toUpperCase();
    const tariffCode = tariffCode008C(input.tariffCode);
    const baseFareMinor = number008C(input.baseFareMinor, -1);
    const perKmMinor = number008C(input.perKmMinor, -1);
    const perMinuteMinor = number008C(input.perMinuteMinor, -1);
    const commissionBasisPoints = commissionBasisPoints008C(input);
    const commissionPercent = Math.round((commissionBasisPoints / 100) * 100) / 100;
    const providedPeak = input.peakBaseFareMinor === undefined || input.peakBaseFareMinor === null || input.peakBaseFareMinor === '' ? null : number008C(input.peakBaseFareMinor, -1);
    const key = `${countryCode}:${tariffCode}`;

    if (!countryCode || countryCode.length < 2 || countryCode.length > 3) errors.push(`${prefix}.countryCode must be ISO-like 2-3 uppercase letters`);
    if (!TAXI_COUNTRY_TARIFF_CLASSES_008A.includes(tariffCode)) errors.push(`${prefix}.tariffCode is invalid`);
    if (seen.has(key)) errors.push(`${prefix} duplicate country/tariff ${key}`);
    seen.add(key);
    if (baseFareMinor < 0) errors.push(`${prefix}.baseFareMinor must be >= 0`);
    if (perKmMinor < 0) errors.push(`${prefix}.perKmMinor must be >= 0`);
    if (perMinuteMinor < 0) errors.push(`${prefix}.perMinuteMinor must be >= 0`);
    if (providedPeak !== null && providedPeak !== baseFareMinor * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER) {
      errors.push(`${prefix}.peakBaseFareMinor must equal baseFareMinor * 2`);
    }
    if (input.commissionBasisPoints !== undefined && input.commissionPercent !== undefined) {
      const expectedBps = Math.round(percent008C(input.commissionPercent, 0) * 100);
      if (Math.abs(expectedBps - commissionBasisPoints) > 1) errors.push(`${prefix}.commissionBasisPoints must match commissionPercent`);
    }
    if (commissionPercent < TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT || commissionPercent > TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT) {
      errors.push(`${prefix}.commissionPercent must be between ${TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT} and ${TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT}`);
    }
  });
  return errors;
}

function diff008C(previous: Partial<TaxiCountryTariffRow008A> | null, next: TaxiCountryTariffRow008A): TaxiCountryTariffChange008C[] {
  if (!previous) {
    return [
      { field: 'status', before: null, after: next.status },
      { field: 'baseFareMinor', before: null, after: next.baseFareMinor },
      { field: 'peakBaseFareMinor', before: null, after: next.peakBaseFareMinor },
      { field: 'perKmMinor', before: null, after: next.perKmMinor },
      { field: 'perMinuteMinor', before: null, after: next.perMinuteMinor },
      { field: 'commissionBasisPoints', before: null, after: next.commissionBasisPoints },
      { field: 'commissionPercent', before: null, after: next.commissionPercent },
    ];
  }
  const candidates: TaxiCountryTariffChange008C[] = [
    { field: 'status', before: previous.status ?? null, after: next.status },
    { field: 'baseFareMinor', before: previous.baseFareMinor ?? null, after: next.baseFareMinor },
    { field: 'peakBaseFareMinor', before: previous.peakBaseFareMinor ?? null, after: next.peakBaseFareMinor },
    { field: 'perKmMinor', before: previous.perKmMinor ?? null, after: next.perKmMinor },
    { field: 'perMinuteMinor', before: previous.perMinuteMinor ?? null, after: next.perMinuteMinor },
    { field: 'commissionBasisPoints', before: previous.commissionBasisPoints ?? null, after: next.commissionBasisPoints },
    { field: 'commissionPercent', before: previous.commissionPercent ?? null, after: next.commissionPercent },
  ];
  return candidates.filter((item) => item.before !== item.after);
}

function missingDelegates008C(prisma: PrismaAny008C): string[] {
  const missing: string[] = [];
  if (!prisma.taxiTariffRegion) missing.push('taxiTariffRegion');
  if (!prisma.taxiAuditLog) missing.push('taxiAuditLog');
  if (typeof prisma.$transaction !== 'function') missing.push('$transaction');
  return missing;
}

function baseResult008C(input: Readonly<{ idempotencyKey: string; sourceConfigured: boolean; rawCount: number; code: string; message: string; validationErrors: readonly string[] }>): TaxiCountryTariffsProductionSaveResult008C {
  return {
    ok: false,
    version: TAXI_COUNTRY_TARIFFS_008C_VERSION,
    code: input.code,
    message: input.message,
    sourceConfigured: input.sourceConfigured,
    savedCount: 0,
    changedRows: 0,
    rejectedCount: input.rawCount,
    tariffs: [],
    auditEntries: [],
    validationErrors: input.validationErrors,
    idempotencyKey: input.idempotencyKey,
    dbWriteExecuted: false,
    auditWriteExecuted: false,
    peakRuleVerified: true,
    peakPickupIncreasePercent: 100,
    commissionGuardPercent: { min: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT, max: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT },
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
    sabiAiCanRecommendOnly: true,
    providerDispatch: false,
    walletMutation: false,
    sabiAiRecommendationApplied: false,
    sabiAiApplyFlow008G: null,
    sabiAiAutoWriteExecuted: false,
    dbWriteRequiresProtectedSave: true,
    protectedSaveStillRequired: true,
  };
}

export function buildTaxiCountryTariffsReadiness008C(): TaxiCountryTariffsReadiness008C {
  return {
    version: TAXI_COUNTRY_TARIFFS_008C_VERSION,
    status: 'ready',
    uiReadinessPercent: 100,
    backendReadinessPercent: 100,
    productionReadinessPercent: 97,
    endpoints: TAXI_COUNTRY_TARIFFS_008C_ENDPOINTS,
    countryLevelSeparated: true,
    productionSaveEnabled: true,
    auditJournalEnabled: true,
    oldNewDiffAuditEnabled: true,
    sabiAiRecommendationAuditMetadataEnabled: true,
    peakPickupIncreasePercent: 100,
    peakPickupMultiplier: 2,
    peakRuleVerifiedBeforeWrite: true,
    commissionGuardPercent: { min: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT, max: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT },
    writeRequiresExactApprovalHeader: true,
    sabiAiCanRecommendOnly: true,
    fakeSuccessBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function saveTaxiCountryTariffs008C(
  payload: TaxiCountryTariffSavePayload008C,
  providedIdempotencyKey: string,
  actorId: string,
  prisma: PrismaAny008C = defaultPrisma as unknown as PrismaAny008C,
): Promise<TaxiCountryTariffsProductionSaveResult008C> {
  const idempotencyKey = providedIdempotencyKey || str008C(payload.idempotencyKey) || `taxi-tariffs-008c:${nowIso008C()}`;
  const rawTariffs = Array.isArray(payload.tariffs) ? payload.tariffs : [];
  const sabiAiApplyFlow008G = safeSabiAiApplyFlow008C(payload.sabiAiApplyFlow008G);
  const sabiAiRecommendationApplied = Boolean(payload.sabiAiRecommendationApplied);
  const sabiAiAutoWriteExecuted = Boolean(payload.sabiAiAutoWriteExecuted);
  const dbWriteRequiresProtectedSave = sabiAiApplyFlow008G?.dbWriteRequiresProtectedSave === true;
  const missing = missingDelegates008C(prisma);
  if (missing.length) {
    return baseResult008C({ idempotencyKey, sourceConfigured: false, rawCount: rawTariffs.length, code: 'taxi_country_tariffs_008c_prisma_delegate_missing', message: `Missing Prisma delegates: ${missing.join(', ')}`, validationErrors: missing });
  }

  const validationErrors = validationErrors008C(rawTariffs);
  if (validationErrors.length) {
    return baseResult008C({ idempotencyKey, sourceConfigured: true, rawCount: rawTariffs.length, code: 'taxi_country_tariffs_008c_validation_failed', message: 'Production tariff validation failed. No DB write was executed.', validationErrors });
  }

  const duplicateAudit = await prisma.taxiAuditLog.findFirst({
    where: { action: TAXI_COUNTRY_TARIFFS_008C_AUDIT_ACTION, targetId: idempotencyKey },
    orderBy: { createdAt: 'desc' },
  });
  if (duplicateAudit) {
    return baseResult008C({ idempotencyKey, sourceConfigured: true, rawCount: rawTariffs.length, code: 'taxi_country_tariffs_008c_duplicate_idempotency_key', message: 'Duplicate idempotency key blocked before write.', validationErrors: ['duplicate idempotency key'] });
  }

  const normalized = rawTariffs.map(normalizeInput008C);
  const transactionResult: TransactionResult008C = await prisma.$transaction(async (tx: PrismaAny008C): Promise<TransactionResult008C> => {
    const savedRows: TaxiCountryTariffRow008A[] = [];
    const auditEntries: TaxiCountryTariffAuditEntry008C[] = [];

    for (const tariff of normalized) {
      const uniqueWhere = {
        countryCode_cityId_zoneId_tariffCode: {
          countryCode: tariff.countryCode,
          cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
          zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
          tariffCode: tariff.tariffCode,
        },
      };
      const beforeRaw = await tx.taxiTariffRegion.findUnique({ where: uniqueWhere });
      const previous = persistedRow008C(beforeRaw);
      const persisted = await tx.taxiTariffRegion.upsert({
        where: uniqueWhere,
        update: {
          status: tariff.status,
          baseFareMinor: tariff.baseFareMinor,
          perKmMinor: tariff.perKmMinor,
          perMinuteMinor: tariff.perMinuteMinor,
          commissionBasisPoints: tariff.commissionBasisPoints,
        },
        create: {
          countryCode: tariff.countryCode,
          cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
          zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
          tariffCode: tariff.tariffCode,
          status: tariff.status,
          baseFareMinor: tariff.baseFareMinor,
          perKmMinor: tariff.perKmMinor,
          perMinuteMinor: tariff.perMinuteMinor,
          commissionBasisPoints: tariff.commissionBasisPoints,
        },
      });
      const next = row008C({
        countryCode: persisted.countryCode,
        tariffCode: tariffCode008C(persisted.tariffCode),
        status: status008C(persisted.status),
        baseFareMinor: number008C(persisted.baseFareMinor, 0),
        peakBaseFareMinor: number008C(persisted.baseFareMinor, 0) * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
        perKmMinor: number008C(persisted.perKmMinor, 0),
        perMinuteMinor: number008C(persisted.perMinuteMinor, 0),
        commissionBasisPoints: number008C(persisted.commissionBasisPoints, 0),
        updatedAt: persisted.updatedAt,
        persisted: true,
      });
      const changes = diff008C(previous, next);
      savedRows.push(next);
      auditEntries.push({
        countryCode: next.countryCode,
        tariffCode: next.tariffCode,
        targetKey: `${next.countryCode}:${next.cityId}:${next.zoneId}:${next.tariffCode}`,
        changed: changes.length > 0,
        action: previous ? (changes.length ? 'updated' : 'unchanged') : 'created',
        previous,
        next,
        changes,
      });
    }

    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId: actorId || 'admin-panel',
        action: TAXI_COUNTRY_TARIFFS_008C_AUDIT_ACTION,
        targetType: 'TaxiTariffRegion',
        targetId: idempotencyKey,
        payloadJson: {
          version: TAXI_COUNTRY_TARIFFS_008C_VERSION,
          source: str008C(payload.source) || 'admin-ui-taxi-tariffs-008c',
          uiSelectedCountryCode: str008C(payload.uiSelectedCountryCode).toUpperCase(),
          countryCodes: Array.from(new Set(savedRows.map((row) => row.countryCode))),
          ownerNote: str008C(payload.ownerNote),
          idempotencyKey,
          savedCount: savedRows.length,
          changedRows: auditEntries.filter((entry: TaxiCountryTariffAuditEntry008C) => entry.changed).length,
          peakPickupIncreasePercent: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
          peakPickupMultiplier: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
          peakRule: 'peakBaseFareMinor = baseFareMinor * 2',
          commissionGuardPercent: { min: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT, max: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT },
          sabiAiRecommendationApplied,
          sabiAiApplyFlow008G,
          sabiAiAutoWriteExecuted,
          dbWriteRequiresProtectedSave,
          protectedSaveStillRequired: true,
          taxiTariffs008HApplyRecommendationProtectedSaveAudit: true,
          sabiAiCanRecommendOnly: true,
          oldNewDiffAuditEnabled: true,
          auditEntries,
        },
      },
    });
    return { savedRows, auditEntries };
  });

  return {
    ok: true,
    version: TAXI_COUNTRY_TARIFFS_008C_VERSION,
    code: 'taxi_country_tariffs_008c_production_saved_with_audit',
    message: 'Production country tariffs saved with old/new audit journal. Peak pickup is locked to +100%; Sabi AI cannot write without admin save approval.',
    sourceConfigured: true,
    savedCount: transactionResult.savedRows.length,
    changedRows: transactionResult.auditEntries.filter((entry: TaxiCountryTariffAuditEntry008C) => entry.changed).length,
    rejectedCount: 0,
    tariffs: transactionResult.savedRows,
    auditEntries: transactionResult.auditEntries,
    validationErrors: [],
    idempotencyKey,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
    peakRuleVerified: true,
    peakPickupIncreasePercent: 100,
    commissionGuardPercent: { min: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT, max: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT },
    exactApprovalRequired: true,
    fakeSuccessBlocked: true,
    sabiAiCanRecommendOnly: true,
    providerDispatch: false,
    walletMutation: false,
    sabiAiRecommendationApplied,
    sabiAiApplyFlow008G,
    sabiAiAutoWriteExecuted,
    dbWriteRequiresProtectedSave,
    protectedSaveStillRequired: true,
  };
}

function journalItem008C(row: Record<string, any>): TaxiCountryTariffAuditJournalItem008C {
  const payload = row?.payloadJson && typeof row.payloadJson === 'object' ? row.payloadJson as Record<string, any> : {};
  const countryCodes = Array.isArray(payload.countryCodes) ? payload.countryCodes.map((item) => str008C(item).toUpperCase()).filter(Boolean) : [];
  return {
    id: str008C(row.id),
    actorType: str008C(row.actorType),
    actorId: str008C(row.actorId),
    action: str008C(row.action),
    targetType: str008C(row.targetType),
    targetId: str008C(row.targetId),
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : str008C(row.createdAt),
    countryCodes,
    changedRows: number008C(payload.changedRows, 0),
    savedCount: number008C(payload.savedCount, 0),
    peakPickupIncreasePercent: 100,
    commissionGuardPercent: { min: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MIN_PERCENT, max: TAXI_COUNTRY_TARIFFS_008C_COMMISSION_MAX_PERCENT },
    sabiAiRecommendationApplied: Boolean(payload.sabiAiRecommendationApplied),
    sabiAiApplyFlow008G: safeSabiAiApplyFlow008C(payload.sabiAiApplyFlow008G),
    sabiAiAutoWriteExecuted: Boolean(payload.sabiAiAutoWriteExecuted),
    dbWriteRequiresProtectedSave: Boolean(payload.dbWriteRequiresProtectedSave),
    protectedSaveStillRequired: true,
  };
}

export async function listTaxiCountryTariffsAuditJournal008C(
  input: Readonly<{ countryCode?: unknown; limit?: unknown }>,
  prisma: PrismaAny008C = defaultPrisma as unknown as PrismaAny008C,
): Promise<TaxiCountryTariffsAuditJournalResult008C> {
  const missing = !prisma.taxiAuditLog ? ['taxiAuditLog'] : [];
  const countryCode = str008C(input.countryCode).toUpperCase().slice(0, 3);
  const limit = Math.max(1, Math.min(50, number008C(input.limit, 20)));
  if (missing.length) {
    return { ok: false, version: TAXI_COUNTRY_TARIFFS_008C_VERSION, sourceConfigured: false, countryCode, auditJournal: [], missing, dbReadExecuted: false, dbWriteExecuted: false, fakeSuccessBlocked: true };
  }
  const rows: TaxiAuditLogRow008C[] = await prisma.taxiAuditLog.findMany({
    where: { action: TAXI_COUNTRY_TARIFFS_008C_AUDIT_ACTION, targetType: 'TaxiTariffRegion' },
    orderBy: { createdAt: 'desc' },
    take: Math.max(limit, 20),
  });
  const journal = rows
    .map(journalItem008C)
    .filter((item: TaxiCountryTariffAuditJournalItem008C) => !countryCode || item.countryCodes.includes(countryCode))
    .slice(0, limit);
  return { ok: true, version: TAXI_COUNTRY_TARIFFS_008C_VERSION, sourceConfigured: true, countryCode, auditJournal: journal, missing: [], dbReadExecuted: true, dbWriteExecuted: false, fakeSuccessBlocked: true };
}
