import type {
  TaxiCountryTariffClass008A,
  TaxiCountryTariffDraftInput008A,
  TaxiCountryTariffRow008A,
} from '../country-tariffs-008a/types';

export type TaxiCountryTariffDraftInput008C = TaxiCountryTariffDraftInput008A & Readonly<{
  peakBaseFareMinor?: number | string;
}>;

export type TaxiCountryTariffSavePayload008C = Readonly<{
  source?: string;
  tariffs?: readonly TaxiCountryTariffDraftInput008C[];
  ownerNote?: string;
  idempotencyKey?: string;
  uiSelectedCountryCode?: string;
  sabiAiRecommendationApplied?: boolean;
  sabiAiApplyFlow008G?: unknown;
  sabiAiAutoWriteExecuted?: boolean;
}>;

export type TaxiCountryTariffChangeField008C = 'status' | 'baseFareMinor' | 'peakBaseFareMinor' | 'perKmMinor' | 'perMinuteMinor' | 'commissionBasisPoints' | 'commissionPercent';

export type TaxiCountryTariffChange008C = Readonly<{
  field: TaxiCountryTariffChangeField008C;
  before: string | number | null;
  after: string | number | null;
}>;

export type TaxiCountryTariffAuditEntry008C = Readonly<{
  countryCode: string;
  tariffCode: TaxiCountryTariffClass008A;
  targetKey: string;
  changed: boolean;
  action: 'created' | 'updated' | 'unchanged';
  previous: Partial<TaxiCountryTariffRow008A> | null;
  next: TaxiCountryTariffRow008A;
  changes: readonly TaxiCountryTariffChange008C[];
}>;

export type TaxiCountryTariffAuditJournalItem008C = Readonly<{
  id: string;
  actorType: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  countryCodes: readonly string[];
  changedRows: number;
  savedCount: number;
  peakPickupIncreasePercent: 100;
  commissionGuardPercent: Readonly<{ min: number; max: number }>;
  sabiAiRecommendationApplied: boolean;
  sabiAiApplyFlow008G: unknown | null;
  sabiAiAutoWriteExecuted: boolean;
  dbWriteRequiresProtectedSave: boolean;
  protectedSaveStillRequired: true;
}>;

export type TaxiCountryTariffsProductionSaveResult008C = Readonly<{
  ok: boolean;
  version: string;
  code: string;
  message: string;
  sourceConfigured: boolean;
  savedCount: number;
  changedRows: number;
  rejectedCount: number;
  tariffs: readonly TaxiCountryTariffRow008A[];
  auditEntries: readonly TaxiCountryTariffAuditEntry008C[];
  validationErrors: readonly string[];
  idempotencyKey: string;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  peakRuleVerified: true;
  peakPickupIncreasePercent: 100;
  commissionGuardPercent: Readonly<{ min: number; max: number }>;
  exactApprovalRequired: true;
  fakeSuccessBlocked: true;
  sabiAiCanRecommendOnly: true;
  providerDispatch: false;
  walletMutation: false;
  sabiAiRecommendationApplied: boolean;
  sabiAiApplyFlow008G: unknown | null;
  sabiAiAutoWriteExecuted: boolean;
  dbWriteRequiresProtectedSave: boolean;
  protectedSaveStillRequired: true;
}>;

export type TaxiCountryTariffsAuditJournalResult008C = Readonly<{
  ok: boolean;
  version: string;
  sourceConfigured: boolean;
  countryCode: string;
  auditJournal: readonly TaxiCountryTariffAuditJournalItem008C[];
  missing: readonly string[];
  dbReadExecuted: boolean;
  dbWriteExecuted: false;
  fakeSuccessBlocked: true;
}>;

export type TaxiCountryTariffsReadiness008C = Readonly<{
  version: string;
  status: 'ready';
  uiReadinessPercent: 100;
  backendReadinessPercent: 100;
  productionReadinessPercent: number;
  endpoints: readonly string[];
  countryLevelSeparated: true;
  productionSaveEnabled: true;
  auditJournalEnabled: true;
  oldNewDiffAuditEnabled: true;
  sabiAiRecommendationAuditMetadataEnabled: true;
  peakPickupIncreasePercent: 100;
  peakPickupMultiplier: 2;
  peakRuleVerifiedBeforeWrite: true;
  commissionGuardPercent: Readonly<{ min: number; max: number }>;
  writeRequiresExactApprovalHeader: true;
  sabiAiCanRecommendOnly: true;
  fakeSuccessBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;
