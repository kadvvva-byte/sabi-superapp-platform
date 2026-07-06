import type { TAXI_COUNTRY_TARIFF_CLASSES_008A } from './constants';

export type TaxiCountryTariffClass008A = typeof TAXI_COUNTRY_TARIFF_CLASSES_008A[number];

export type TaxiCountryTariffCountry008A = Readonly<{
  countryCode: string;
  countryName: string;
  currencyCode: string;
  localeLabel: string;
}>;

export type TaxiCountryTariffRow008A = Readonly<{
  countryCode: string;
  countryName: string;
  currencyCode: string;
  cityId: string;
  zoneId: string;
  tariffCode: TaxiCountryTariffClass008A;
  status: 'draft' | 'active' | 'paused' | 'retired';
  baseFareMinor: number;
  peakBaseFareMinor: number;
  peakPickupIncreasePercent: 100;
  peakPickupMultiplier: 2;
  perKmMinor: number;
  perMinuteMinor: number;
  commissionPercent: number;
  commissionBasisPoints: number;
  effectiveOrderCommissionFormula: string;
  updatedAt: string;
  persisted: boolean;
}>;

export type TaxiCountryTariffDraftInput008A = Readonly<{
  countryCode?: string;
  tariffCode?: string;
  status?: string;
  baseFareMinor?: number | string;
  perKmMinor?: number | string;
  perMinuteMinor?: number | string;
  commissionPercent?: number | string;
  commissionBasisPoints?: number | string;
}>;

export type TaxiCountryTariffSavePayload008A = Readonly<{
  source?: string;
  tariffs?: readonly TaxiCountryTariffDraftInput008A[];
  ownerNote?: string;
  idempotencyKey?: string;
}>;

export type TaxiCountryTariffsReadiness008A = Readonly<{
  version: string;
  status: 'ready';
  uiReadinessPercent: 100;
  backendReadinessPercent: 100;
  productionReadinessPercent: number;
  endpoints: readonly string[];
  countryLevelSeparated: true;
  cityIdForCountryLevelTariffs: string;
  zoneIdForCountryLevelTariffs: string;
  peakPickupIncreasePercent: 100;
  peakPickupMultiplier: 2;
  commissionPercentConfigurable: true;
  requiredPrismaDelegate: 'taxiTariffRegion';
  writeRequiresExactApprovalHeader: true;
  fakeSuccessBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiCountryTariffsListResult008A = Readonly<{
  ok: boolean;
  version: string;
  sourceConfigured: boolean;
  countries: readonly TaxiCountryTariffCountry008A[];
  tariffs: readonly TaxiCountryTariffRow008A[];
  missing: readonly string[];
  peakRule: Readonly<{ pickupIncreasePercent: 100; multiplier: 2; formula: string }>;
}>;

export type TaxiCountryTariffsSaveResult008A = Readonly<{
  ok: boolean;
  version: string;
  code: string;
  message: string;
  sourceConfigured: boolean;
  savedCount: number;
  rejectedCount: number;
  tariffs: readonly TaxiCountryTariffRow008A[];
  validationErrors: readonly string[];
  idempotencyKey: string;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  fakeSuccessBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;


export type TaxiSabiAiCompetitorProvider008B = 'yandex' | 'uber';

export type TaxiSabiAiCompetitorObservation008B = Readonly<{
  provider: TaxiSabiAiCompetitorProvider008B;
  countryCode: string;
  currencyCode: string;
  tariffCode: TaxiCountryTariffClass008A;
  baseFareMinor: number | null;
  perKmMinor: number | null;
  sourceUrl: string;
  sourceName: string;
  capturedAt: string;
  valid: boolean;
  rejectedReason?: string;
}>;

export type TaxiSabiAiTariffRecommendation008B = Readonly<{
  tariffCode: TaxiCountryTariffClass008A;
  competitorProviders: readonly TaxiSabiAiCompetitorProvider008B[];
  competitorMinBaseFareMinor: number | null;
  competitorMinPerKmMinor: number | null;
  recommendedBaseFareMinor: number | null;
  recommendedPerKmMinor: number | null;
  discountPercent: number;
  formula: string;
  confidence: 'blocked' | 'partial' | 'ready';
  canApply: boolean;
}>;

export type TaxiSabiAiPriceMonitorResult008B = Readonly<{
  ok: boolean;
  version: string;
  code: string;
  message: string;
  sourceConfigured: boolean;
  internetCheckAttempted: boolean;
  legalPublicSourcesOnly: true;
  noPrivateApiScraping: true;
  competitors: readonly TaxiSabiAiCompetitorProvider008B[];
  countryCode: string;
  currencyCode: string;
  discountPercent: number;
  observations: readonly TaxiSabiAiCompetitorObservation008B[];
  recommendations: readonly TaxiSabiAiTariffRecommendation008B[];
  validationErrors: readonly string[];
  fakeSuccessBlocked: true;
  tariffWriteExecuted: false;
  dbWriteExecuted: false;
  providerDispatch: false;
}>;
