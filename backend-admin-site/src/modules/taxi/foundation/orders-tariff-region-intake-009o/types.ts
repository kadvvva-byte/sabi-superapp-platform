import type { TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION } from './constants';

export type TaxiOrdersTariffRegionIntakeVersion009O = typeof TAXI_ORDERS_TARIFF_REGION_INTAKE_009O_VERSION;

export type TaxiOrdersTariffRegionIntakeReadiness009O = Readonly<{
  version: TaxiOrdersTariffRegionIntakeVersion009O;
  createsFromRealTariffOnly: true;
  activeTariffRegionUnlocksQuoteIntake009K: true;
  fakeTariffCreateBlocked: true;
  fakePriceGenerated: false;
  defaultPriceGenerated: false;
  protectedCreateRequiresExactHeader: true;
  idempotencyRequired: true;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  requiredRealFields: readonly string[];
  dbWriteOnlyForOwnerProvidedTariffRegion: true;
  auditStorage: 'TaxiAuditLog';
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersTariffRegionIntakeStatus009O = Readonly<{
  ok: true;
  version: TaxiOrdersTariffRegionIntakeVersion009O;
  code: string;
  counts: Readonly<{
    tariffRegions: number;
    activeTariffRegions: number;
    auditLogs: number;
  }>;
  canUnlockQuoteIntake009K: boolean;
  nextOwnerAction: string;
  noFakeRows: true;
  noFakeCreate: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersTariffRegionUpsertInput009O = Readonly<{
  countryCode: string;
  cityId: string;
  zoneId: string;
  tariffCode: string;
  status?: string;
  baseFareMinor: number;
  perKmMinor: number;
  perMinuteMinor: number;
  commissionBasisPoints: number;
  idempotencyKey?: string;
  reason?: string;
}>;

export type TaxiOrdersTariffRegionUpsertResult009O = Readonly<{
  ok: boolean;
  statusCode: number;
  version: TaxiOrdersTariffRegionIntakeVersion009O;
  code: string;
  tariffRegionId: string;
  countryCode: string;
  cityId: string;
  zoneId: string;
  tariffCode: string;
  status: string;
  idempotencyKey: string;
  realTariffPayloadAccepted: boolean;
  idempotent: boolean;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  fakeTariffCreateBlocked: true;
  fakePriceGenerated: false;
  defaultPriceGenerated: false;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
  message?: string;
}>;
