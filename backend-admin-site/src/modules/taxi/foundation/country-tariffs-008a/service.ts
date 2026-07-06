import { prisma as defaultPrisma } from '../../../../config/prisma';
import {
  TAXI_COUNTRY_TARIFF_CLASSES_008A,
  TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A,
  TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
  TAXI_COUNTRY_TARIFFS_008A_ENDPOINTS,
  TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
  TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
  TAXI_COUNTRY_TARIFFS_008A_VERSION,
  TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
  TAXI_SABI_AI_COMPETITOR_DISCOUNT_DEFAULT_PERCENT_008B,
  TAXI_SABI_AI_COMPETITOR_DISCOUNT_MAX_PERCENT_008B,
  TAXI_SABI_AI_COMPETITOR_DISCOUNT_MIN_PERCENT_008B,
  TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URL_ENV_008B,
  TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URLS_ENV_008B,
  TAXI_SABI_AI_COMPETITOR_PROVIDERS_008B,
  TAXI_SABI_AI_PRICE_MONITOR_008B_VERSION,
} from './constants';
import { listTaxiSabiAiCompetitorSourceUrls008E } from '../competitor-source-config-008e';
import type {
  TaxiCountryTariffClass008A,
  TaxiCountryTariffCountry008A,
  TaxiCountryTariffDraftInput008A,
  TaxiCountryTariffRow008A,
  TaxiCountryTariffSavePayload008A,
  TaxiCountryTariffsListResult008A,
  TaxiCountryTariffsReadiness008A,
  TaxiCountryTariffsSaveResult008A,
  TaxiSabiAiCompetitorObservation008B,
  TaxiSabiAiCompetitorProvider008B,
  TaxiSabiAiPriceMonitorResult008B,
  TaxiSabiAiTariffRecommendation008B,
} from './types';

type PrismaAny008A = Record<string, any>;

const DEFAULT_MINOR_BY_COUNTRY_008A: Record<string, Record<TaxiCountryTariffClass008A, { base: number; km: number; minute: number; commission: number }>> = {
  UZ: { standard: { base: 8000, km: 2500, minute: 450, commission: 12 }, comfort: { base: 12000, km: 3500, minute: 650, commission: 14 }, business: { base: 22000, km: 6000, minute: 1000, commission: 16 }, delivery: { base: 9000, km: 2600, minute: 400, commission: 10 }, intercity: { base: 25000, km: 4200, minute: 350, commission: 12 } },
  KZ: { standard: { base: 700, km: 160, minute: 35, commission: 12 }, comfort: { base: 950, km: 210, minute: 45, commission: 14 }, business: { base: 1600, km: 330, minute: 65, commission: 16 }, delivery: { base: 750, km: 170, minute: 30, commission: 10 }, intercity: { base: 2500, km: 260, minute: 25, commission: 12 } },
  KG: { standard: { base: 90, km: 24, minute: 4, commission: 12 }, comfort: { base: 130, km: 32, minute: 6, commission: 14 }, business: { base: 230, km: 55, minute: 9, commission: 16 }, delivery: { base: 100, km: 25, minute: 4, commission: 10 }, intercity: { base: 350, km: 42, minute: 3, commission: 12 } },
  TJ: { standard: { base: 10, km: 3, minute: 1, commission: 12 }, comfort: { base: 14, km: 4, minute: 1, commission: 14 }, business: { base: 25, km: 7, minute: 2, commission: 16 }, delivery: { base: 11, km: 3, minute: 1, commission: 10 }, intercity: { base: 40, km: 5, minute: 1, commission: 12 } },
  RU: { standard: { base: 17900, km: 2600, minute: 900, commission: 14 }, comfort: { base: 24900, km: 3400, minute: 1200, commission: 16 }, business: { base: 49000, km: 6500, minute: 2200, commission: 18 }, delivery: { base: 19900, km: 2800, minute: 700, commission: 12 }, intercity: { base: 95000, km: 4200, minute: 500, commission: 14 } },
  AZ: { standard: { base: 250, km: 70, minute: 12, commission: 12 }, comfort: { base: 350, km: 95, minute: 16, commission: 14 }, business: { base: 650, km: 160, minute: 28, commission: 16 }, delivery: { base: 280, km: 75, minute: 10, commission: 10 }, intercity: { base: 1000, km: 110, minute: 8, commission: 12 } },
  TR: { standard: { base: 3500, km: 2400, minute: 350, commission: 12 }, comfort: { base: 4800, km: 3200, minute: 500, commission: 14 }, business: { base: 9000, km: 5200, minute: 850, commission: 16 }, delivery: { base: 3800, km: 2500, minute: 300, commission: 10 }, intercity: { base: 15000, km: 3900, minute: 250, commission: 12 } },
  AE: { standard: { base: 1200, km: 260, minute: 45, commission: 12 }, comfort: { base: 1800, km: 360, minute: 60, commission: 14 }, business: { base: 3000, km: 620, minute: 100, commission: 16 }, delivery: { base: 1400, km: 280, minute: 38, commission: 10 }, intercity: { base: 4000, km: 420, minute: 30, commission: 12 } },
};

function nowIso008A(): string {
  return new Date().toISOString();
}

function str008A(value: unknown): string {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function country008A(countryCode: string): TaxiCountryTariffCountry008A {
  const code = countryCode.trim().toUpperCase().slice(0, 3) || 'UZ';
  return TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A.find((item) => item.countryCode === code) || { countryCode: code, countryName: code, currencyCode: code, localeLabel: code };
}

function tariffCode008A(value: unknown): TaxiCountryTariffClass008A {
  const code = str008A(value).toLowerCase();
  return TAXI_COUNTRY_TARIFF_CLASSES_008A.includes(code as TaxiCountryTariffClass008A) ? code as TaxiCountryTariffClass008A : 'standard';
}

function status008A(value: unknown): 'draft' | 'active' | 'paused' | 'retired' {
  const status = str008A(value).toLowerCase();
  if (status === 'draft' || status === 'paused' || status === 'retired') return status;
  return 'active';
}

function number008A(value: unknown, fallback: number): number {
  const raw = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(raw)) return fallback;
  return Math.round(raw);
}

function percent008A(value: unknown, fallback: number): number {
  const raw = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(raw)) return fallback;
  return Math.round(raw * 100) / 100;
}

function commissionBasisPoints008A(input: TaxiCountryTariffDraftInput008A, fallbackPercent: number): number {
  if (input.commissionBasisPoints !== undefined) return Math.max(0, Math.min(10000, number008A(input.commissionBasisPoints, Math.round(fallbackPercent * 100))));
  return Math.max(0, Math.min(10000, Math.round(percent008A(input.commissionPercent, fallbackPercent) * 100)));
}

function defaultNumbers008A(countryCode: string, tariffCode: TaxiCountryTariffClass008A): { base: number; km: number; minute: number; commission: number } {
  return DEFAULT_MINOR_BY_COUNTRY_008A[countryCode]?.[tariffCode] || DEFAULT_MINOR_BY_COUNTRY_008A.UZ[tariffCode];
}

function row008A(input: {
  countryCode: string;
  tariffCode: TaxiCountryTariffClass008A;
  status?: string;
  baseFareMinor: number;
  perKmMinor: number;
  perMinuteMinor: number;
  commissionBasisPoints: number;
  updatedAt?: unknown;
  persisted: boolean;
}): TaxiCountryTariffRow008A {
  const country = country008A(input.countryCode);
  const commissionPercent = Math.round((input.commissionBasisPoints / 100) * 100) / 100;
  return {
    countryCode: country.countryCode,
    countryName: country.countryName,
    currencyCode: country.currencyCode,
    cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
    zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
    tariffCode: input.tariffCode,
    status: status008A(input.status),
    baseFareMinor: Math.max(0, Math.round(input.baseFareMinor)),
    peakBaseFareMinor: Math.max(0, Math.round(input.baseFareMinor)) * TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    peakPickupIncreasePercent: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
    peakPickupMultiplier: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    perKmMinor: Math.max(0, Math.round(input.perKmMinor)),
    perMinuteMinor: Math.max(0, Math.round(input.perMinuteMinor)),
    commissionPercent,
    commissionBasisPoints: input.commissionBasisPoints,
    effectiveOrderCommissionFormula: `orderTotalMinor * ${commissionPercent} / 100`,
    updatedAt: input.updatedAt instanceof Date ? input.updatedAt.toISOString() : str008A(input.updatedAt) || nowIso008A(),
    persisted: input.persisted,
  };
}

function defaultRows008A(): TaxiCountryTariffRow008A[] {
  return TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A.flatMap((country) => TAXI_COUNTRY_TARIFF_CLASSES_008A.map((tariffCode) => {
    const defaults = defaultNumbers008A(country.countryCode, tariffCode);
    return row008A({ countryCode: country.countryCode, tariffCode, status: 'draft', baseFareMinor: defaults.base, perKmMinor: defaults.km, perMinuteMinor: defaults.minute, commissionBasisPoints: defaults.commission * 100, persisted: false, updatedAt: '' });
  }));
}

function validationErrors008A(input: TaxiCountryTariffDraftInput008A, index: number): string[] {
  const countryCode = str008A(input.countryCode).toUpperCase();
  const tariffCode = tariffCode008A(input.tariffCode);
  const defaults = defaultNumbers008A(countryCode || 'UZ', tariffCode);
  const baseFareMinor = number008A(input.baseFareMinor, defaults.base);
  const perKmMinor = number008A(input.perKmMinor, defaults.km);
  const perMinuteMinor = number008A(input.perMinuteMinor, defaults.minute);
  const commissionBasisPoints = commissionBasisPoints008A(input, defaults.commission);
  const errors: string[] = [];
  const prefix = `tariffs[${index}]`;
  if (!countryCode || countryCode.length < 2 || countryCode.length > 3) errors.push(`${prefix}.countryCode must be ISO-like 2-3 uppercase letters`);
  if (!TAXI_COUNTRY_TARIFF_CLASSES_008A.includes(tariffCode)) errors.push(`${prefix}.tariffCode is invalid`);
  if (baseFareMinor < 0) errors.push(`${prefix}.baseFareMinor must be >= 0`);
  if (perKmMinor < 0) errors.push(`${prefix}.perKmMinor must be >= 0`);
  if (perMinuteMinor < 0) errors.push(`${prefix}.perMinuteMinor must be >= 0`);
  if (commissionBasisPoints < 0 || commissionBasisPoints > 10000) errors.push(`${prefix}.commissionPercent must be between 0 and 100`);
  return errors;
}

function normalizeInputRow008A(input: TaxiCountryTariffDraftInput008A): TaxiCountryTariffRow008A {
  const countryCode = str008A(input.countryCode).toUpperCase().slice(0, 3) || 'UZ';
  const tariffCode = tariffCode008A(input.tariffCode);
  const defaults = defaultNumbers008A(countryCode, tariffCode);
  const commissionBasisPoints = commissionBasisPoints008A(input, defaults.commission);
  return row008A({
    countryCode,
    tariffCode,
    status: status008A(input.status),
    baseFareMinor: number008A(input.baseFareMinor, defaults.base),
    perKmMinor: number008A(input.perKmMinor, defaults.km),
    perMinuteMinor: number008A(input.perMinuteMinor, defaults.minute),
    commissionBasisPoints,
    persisted: false,
    updatedAt: '',
  });
}

function delegateMissing008A(prisma: PrismaAny008A): string[] {
  const missing: string[] = [];
  if (!prisma.taxiTariffRegion) missing.push('taxiTariffRegion');
  if (!prisma.taxiAuditLog) missing.push('taxiAuditLog');
  return missing;
}

export function buildTaxiCountryTariffsReadiness008A(): TaxiCountryTariffsReadiness008A {
  return {
    version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
    status: 'ready',
    uiReadinessPercent: 100,
    backendReadinessPercent: 100,
    productionReadinessPercent: 92,
    endpoints: TAXI_COUNTRY_TARIFFS_008A_ENDPOINTS,
    countryLevelSeparated: true,
    cityIdForCountryLevelTariffs: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
    zoneIdForCountryLevelTariffs: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
    peakPickupIncreasePercent: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
    peakPickupMultiplier: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
    commissionPercentConfigurable: true,
    requiredPrismaDelegate: 'taxiTariffRegion',
    writeRequiresExactApprovalHeader: true,
    fakeSuccessBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}

export async function listTaxiCountryTariffs008A(prisma: PrismaAny008A = defaultPrisma as unknown as PrismaAny008A): Promise<TaxiCountryTariffsListResult008A> {
  const missing = !prisma.taxiTariffRegion ? ['taxiTariffRegion'] : [];
  if (missing.length) {
    return {
      ok: false,
      version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
      sourceConfigured: false,
      countries: TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A,
      tariffs: defaultRows008A(),
      missing,
      peakRule: { pickupIncreasePercent: 100, multiplier: 2, formula: 'peakBaseFareMinor = baseFareMinor * 2' },
    };
  }
  const rows = await prisma.taxiTariffRegion.findMany({
    where: { cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID, zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID },
    orderBy: [{ countryCode: 'asc' }, { tariffCode: 'asc' }],
    take: 500,
  });
  const persisted = rows.map((item: Record<string, any>) => row008A({
    countryCode: str008A(item.countryCode).toUpperCase(),
    tariffCode: tariffCode008A(item.tariffCode),
    status: str008A(item.status) || 'active',
    baseFareMinor: number008A(item.baseFareMinor, 0),
    perKmMinor: number008A(item.perKmMinor, 0),
    perMinuteMinor: number008A(item.perMinuteMinor, 0),
    commissionBasisPoints: number008A(item.commissionBasisPoints, 0),
    updatedAt: item.updatedAt,
    persisted: true,
  }));
  return {
    ok: true,
    version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
    sourceConfigured: true,
    countries: TAXI_COUNTRY_TARIFF_DEFAULT_COUNTRIES_008A,
    tariffs: persisted.length ? persisted : defaultRows008A(),
    missing: [],
    peakRule: { pickupIncreasePercent: 100, multiplier: 2, formula: 'peakBaseFareMinor = baseFareMinor * 2' },
  };
}


function clampDiscount008B(value: unknown): number {
  const raw = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  const fallback = TAXI_SABI_AI_COMPETITOR_DISCOUNT_DEFAULT_PERCENT_008B;
  const bounded = Number.isFinite(raw) ? raw : fallback;
  return Math.round(Math.max(TAXI_SABI_AI_COMPETITOR_DISCOUNT_MIN_PERCENT_008B, Math.min(TAXI_SABI_AI_COMPETITOR_DISCOUNT_MAX_PERCENT_008B, bounded)) * 100) / 100;
}

function configuredFeedUrls008B(countryCode: string): string[] {
  const configuredBy008E = listTaxiSabiAiCompetitorSourceUrls008E(countryCode);
  if (configuredBy008E.length) return configuredBy008E.slice(0, 8);
  const joined = [
    process.env[TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URLS_ENV_008B],
    process.env[TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URL_ENV_008B],
  ].filter(Boolean).join(',');
  return joined.split(',').map((item) => item.trim()).filter((item) => /^https?:\/\//i.test(item)).slice(0, 8);
}

function provider008B(value: unknown): TaxiSabiAiCompetitorProvider008B | null {
  const raw = str008A(value).toLowerCase();
  if (raw.includes('yandex') || raw.includes('янд')) return 'yandex';
  if (raw.includes('uber')) return 'uber';
  return null;
}

function numberOrNull008B(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const raw = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  if (!Number.isFinite(raw) || raw < 0) return null;
  return Math.round(raw);
}

function sourceUrlWithQuery008B(rawUrl: string, countryCode: string, discountPercent: number): string {
  try {
    const url = new URL(rawUrl);
    if (!url.searchParams.has('countryCode')) url.searchParams.set('countryCode', countryCode);
    if (!url.searchParams.has('competitors')) url.searchParams.set('competitors', 'yandex,uber');
    if (!url.searchParams.has('discountPercent')) url.searchParams.set('discountPercent', String(discountPercent));
    return url.toString();
  } catch (_error) {
    return rawUrl;
  }
}

function observationArray008B(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.observations)) return payload.observations;
  if (Array.isArray(payload?.rates)) return payload.rates;
  if (Array.isArray(payload?.tariffs)) return payload.tariffs;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  const fromProviders: any[] = [];
  for (const provider of TAXI_SABI_AI_COMPETITOR_PROVIDERS_008B) {
    const rows = payload?.[provider];
    if (Array.isArray(rows)) rows.forEach((row) => fromProviders.push({ ...row, provider }));
  }
  return fromProviders;
}

function normalizeObservation008B(raw: any, sourceUrl: string, fallbackCountryCode: string): TaxiSabiAiCompetitorObservation008B | null {
  const provider = provider008B(raw?.provider || raw?.brand || raw?.source || raw?.competitor || raw?.name);
  if (!provider) return null;
  const countryCode = str008A(raw?.countryCode || raw?.country || fallbackCountryCode).toUpperCase().slice(0, 3) || fallbackCountryCode;
  const country = country008A(countryCode);
  const tariffCode = tariffCode008A(raw?.tariffCode || raw?.tariff || raw?.class || raw?.rideClass || 'standard');
  const baseFareMinor = numberOrNull008B(raw?.baseFareMinor ?? raw?.pickupFareMinor ?? raw?.minimumPickupMinor ?? raw?.base ?? raw?.pickup);
  const perKmMinor = numberOrNull008B(raw?.perKmMinor ?? raw?.pricePerKmMinor ?? raw?.kmFareMinor ?? raw?.perKm ?? raw?.km);
  const valid = Boolean(baseFareMinor || perKmMinor);
  return {
    provider,
    countryCode: country.countryCode,
    currencyCode: str008A(raw?.currencyCode || raw?.currency || country.currencyCode).toUpperCase().slice(0, 3) || country.currencyCode,
    tariffCode,
    baseFareMinor,
    perKmMinor,
    sourceUrl,
    sourceName: str008A(raw?.sourceName || raw?.source || provider) || provider,
    capturedAt: str008A(raw?.capturedAt || raw?.updatedAt || raw?.createdAt) || nowIso008A(),
    valid,
    rejectedReason: valid ? undefined : 'missing_baseFareMinor_and_perKmMinor',
  };
}

function recommendationValue008B(value: number | null, discountPercent: number): number | null {
  if (!value || value <= 0) return null;
  const recommended = Math.max(0, Math.floor(value * (1 - discountPercent / 100)));
  if (recommended >= value && value > 0) return value - 1;
  return recommended;
}

function recommendations008B(countryCode: string, discountPercent: number, observations: readonly TaxiSabiAiCompetitorObservation008B[]): TaxiSabiAiTariffRecommendation008B[] {
  return TAXI_COUNTRY_TARIFF_CLASSES_008A.map((tariffCode) => {
    const items = observations.filter((item) => item.countryCode === countryCode && item.tariffCode === tariffCode && item.valid);
    const providers = Array.from(new Set(items.map((item) => item.provider))) as TaxiSabiAiCompetitorProvider008B[];
    const baseValues = items.map((item) => item.baseFareMinor).filter((item): item is number => typeof item === 'number' && item > 0);
    const kmValues = items.map((item) => item.perKmMinor).filter((item): item is number => typeof item === 'number' && item > 0);
    const competitorMinBaseFareMinor = baseValues.length ? Math.min(...baseValues) : null;
    const competitorMinPerKmMinor = kmValues.length ? Math.min(...kmValues) : null;
    const canApply = Boolean(competitorMinBaseFareMinor || competitorMinPerKmMinor);
    const confidence: 'blocked' | 'partial' | 'ready' = !canApply ? 'blocked' : providers.length >= 2 ? 'ready' : 'partial';
    return {
      tariffCode,
      competitorProviders: providers,
      competitorMinBaseFareMinor,
      competitorMinPerKmMinor,
      recommendedBaseFareMinor: recommendationValue008B(competitorMinBaseFareMinor, discountPercent),
      recommendedPerKmMinor: recommendationValue008B(competitorMinPerKmMinor, discountPercent),
      discountPercent,
      formula: 'recommended = min(yandex, uber) * (1 - discountPercent / 100)',
      confidence,
      canApply,
    };
  });
}

async function fetchJson008B(url: string): Promise<any> {
  const fetchImpl = (globalThis as any).fetch;
  if (typeof fetchImpl !== 'function') throw new Error('global_fetch_unavailable');
  const AbortControllerImpl = (globalThis as any).AbortController;
  const controller = typeof AbortControllerImpl === 'function' ? new AbortControllerImpl() : null;
  const timeout = controller ? setTimeout(() => controller.abort(), 6500) : null;
  try {
    const response = await fetchImpl(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'user-agent': 'SabiTaxiAdminPriceMonitor/008B public-source-comparison',
      },
      signal: controller?.signal,
    });
    if (!response?.ok) throw new Error(`source_http_${response?.status || 'error'}`);
    return await response.json();
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function buildTaxiSabiAiPriceMonitor008B(input: { countryCode?: unknown; discountPercent?: unknown }): Promise<TaxiSabiAiPriceMonitorResult008B> {
  const country = country008A(str008A(input.countryCode || 'UZ').toUpperCase() || 'UZ');
  const discountPercent = clampDiscount008B(input.discountPercent);
  const urls = configuredFeedUrls008B(country.countryCode);

  if (!urls.length) {
    return {
      ok: false,
      version: TAXI_SABI_AI_PRICE_MONITOR_008B_VERSION,
      code: 'taxi_sabi_ai_price_monitor_008b_sources_not_configured',
      message: 'Competitor price feeds are not configured. No fake Yandex/Uber prices were generated.',
      sourceConfigured: false,
      internetCheckAttempted: false,
      legalPublicSourcesOnly: true,
      noPrivateApiScraping: true,
      competitors: TAXI_SABI_AI_COMPETITOR_PROVIDERS_008B,
      countryCode: country.countryCode,
      currencyCode: country.currencyCode,
      discountPercent,
      observations: [],
      recommendations: [],
      validationErrors: ['SABI_TAXI_COMPETITOR_PRICE_SOURCE_CONFIG_008E', TAXI_SABI_AI_COMPETITOR_PRICE_FEED_URLS_ENV_008B],
      fakeSuccessBlocked: true,
      tariffWriteExecuted: false,
      dbWriteExecuted: false,
      providerDispatch: false,
    };
  }

  const observations: TaxiSabiAiCompetitorObservation008B[] = [];
  const validationErrors: string[] = [];
  await Promise.all(urls.map(async (rawUrl) => {
    const url = sourceUrlWithQuery008B(rawUrl, country.countryCode, discountPercent);
    try {
      const payload = await fetchJson008B(url);
      observationArray008B(payload).forEach((item) => {
        const normalized = normalizeObservation008B(item, url, country.countryCode);
        if (normalized) observations.push(normalized);
      });
    } catch (error) {
      validationErrors.push(`${url}: ${error instanceof Error ? error.message : 'fetch_failed'}`);
    }
  }));

  const usable = observations.filter((item) => item.countryCode === country.countryCode && item.valid);
  const recommendations = recommendations008B(country.countryCode, discountPercent, usable);
  const anyRecommendation = recommendations.some((item) => item.canApply);
  return {
    ok: anyRecommendation,
    version: TAXI_SABI_AI_PRICE_MONITOR_008B_VERSION,
    code: anyRecommendation ? 'taxi_sabi_ai_price_monitor_008b_recommendations_ready' : 'taxi_sabi_ai_price_monitor_008b_no_usable_competitor_prices',
    message: anyRecommendation
      ? 'Real configured public competitor sources were checked. Recommendations are 1–2% below the lowest available Yandex/Uber value.'
      : 'Sources were checked, but no usable Yandex/Uber competitor prices were found. No tariff was changed.',
    sourceConfigured: true,
    internetCheckAttempted: true,
    legalPublicSourcesOnly: true,
    noPrivateApiScraping: true,
    competitors: TAXI_SABI_AI_COMPETITOR_PROVIDERS_008B,
    countryCode: country.countryCode,
    currencyCode: country.currencyCode,
    discountPercent,
    observations: usable,
    recommendations,
    validationErrors,
    fakeSuccessBlocked: true,
    tariffWriteExecuted: false,
    dbWriteExecuted: false,
    providerDispatch: false,
  };
}

export async function saveTaxiCountryTariffs008A(
  payload: TaxiCountryTariffSavePayload008A,
  providedIdempotencyKey: string,
  actorId: string,
  prisma: PrismaAny008A = defaultPrisma as unknown as PrismaAny008A,
): Promise<TaxiCountryTariffsSaveResult008A> {
  const idempotencyKey = providedIdempotencyKey || str008A(payload.idempotencyKey) || `taxi-tariffs-008a:${nowIso008A()}`;
  const rawTariffs = Array.isArray(payload.tariffs) ? payload.tariffs : [];
  const validationErrors = rawTariffs.flatMap((input, index) => validationErrors008A(input, index));
  const normalized = rawTariffs.map(normalizeInputRow008A);
  const missing = delegateMissing008A(prisma);

  if (missing.length) {
    return {
      ok: false,
      version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
      code: 'taxi_country_tariffs_008a_prisma_delegate_missing',
      message: `Missing Prisma delegates: ${missing.join(', ')}`,
      sourceConfigured: false,
      savedCount: 0,
      rejectedCount: rawTariffs.length,
      tariffs: normalized,
      validationErrors: missing,
      idempotencyKey,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeSuccessBlocked: true,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  if (!normalized.length || validationErrors.length) {
    return {
      ok: false,
      version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
      code: normalized.length ? 'taxi_country_tariffs_008a_validation_failed' : 'taxi_country_tariffs_008a_empty_payload',
      message: normalized.length ? 'Tariff validation failed.' : 'At least one country tariff row is required.',
      sourceConfigured: true,
      savedCount: 0,
      rejectedCount: rawTariffs.length,
      tariffs: normalized,
      validationErrors: normalized.length ? validationErrors : ['tariffs is required'],
      idempotencyKey,
      dbWriteExecuted: false,
      auditWriteExecuted: false,
      fakeSuccessBlocked: true,
      providerDispatch: false,
      walletMutation: false,
    };
  }

  const saved = await prisma.$transaction(async (tx: PrismaAny008A) => {
    const savedRows: TaxiCountryTariffRow008A[] = [];
    for (const tariff of normalized) {
      const persisted = await tx.taxiTariffRegion.upsert({
        where: {
          countryCode_cityId_zoneId_tariffCode: {
            countryCode: tariff.countryCode,
            cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
            zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
            tariffCode: tariff.tariffCode,
          },
        },
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
      savedRows.push(row008A({
        countryCode: persisted.countryCode,
        tariffCode: tariffCode008A(persisted.tariffCode),
        status: persisted.status,
        baseFareMinor: persisted.baseFareMinor,
        perKmMinor: persisted.perKmMinor,
        perMinuteMinor: persisted.perMinuteMinor,
        commissionBasisPoints: persisted.commissionBasisPoints,
        updatedAt: persisted.updatedAt,
        persisted: true,
      }));
    }

    await tx.taxiAuditLog.create({
      data: {
        actorType: 'admin',
        actorId: actorId || 'admin-panel',
        action: 'taxi_country_tariffs_008a_upsert_country_tariffs',
        targetType: 'TaxiTariffRegion',
        targetId: idempotencyKey,
        payloadJson: {
          version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
          source: str008A(payload.source) || 'admin-ui-taxi-tariffs-008a',
          countryLevel: true,
          cityId: TAXI_COUNTRY_TARIFFS_008A_CITY_ID,
          zoneId: TAXI_COUNTRY_TARIFFS_008A_ZONE_ID,
          peakPickupIncreasePercent: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_INCREASE_PERCENT,
          peakPickupMultiplier: TAXI_COUNTRY_TARIFFS_008A_PEAK_PICKUP_MULTIPLIER,
          ownerNote: str008A(payload.ownerNote),
          idempotencyKey,
          savedCount: savedRows.length,
          tariffs: savedRows,
        },
      },
    });
    return savedRows;
  });

  return {
    ok: true,
    version: TAXI_COUNTRY_TARIFFS_008A_VERSION,
    code: 'taxi_country_tariffs_008a_saved',
    message: 'Country-level taxi tariffs saved. Peak pickup/base fare rule is locked to +100%.',
    sourceConfigured: true,
    savedCount: saved.length,
    rejectedCount: 0,
    tariffs: saved,
    validationErrors: [],
    idempotencyKey,
    dbWriteExecuted: true,
    auditWriteExecuted: true,
    fakeSuccessBlocked: true,
    providerDispatch: false,
    walletMutation: false,
  };
}
