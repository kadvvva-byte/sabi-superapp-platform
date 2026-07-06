import type { TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION } from './constants';

export type TaxiOrdersRealDataReadinessVersion009M = typeof TAXI_ORDERS_REAL_DATA_READINESS_009M_VERSION;

export type TaxiOrdersRealDataCounts009M = Readonly<{
  riderProfiles: number;
  activeTariffRegions: number;
  acceptedQuotes: number;
  openRiderRequests: number;
  approvedDriversWithPositiveBalance: number;
  approvedVehicles: number;
  activeDriverVehicleAssignments: number;
  openDispatchOffers: number;
  acceptedDispatchOffers: number;
  taxiTrips: number;
  auditLogs: number;
}>;

export type TaxiOrdersRealDataRequirementStatus009M = 'ready' | 'missing';

export type TaxiOrdersRealDataRequirement009M = Readonly<{
  key: string;
  title: string;
  dbModel: string;
  neededFor: string;
  status: TaxiOrdersRealDataRequirementStatus009M;
  count: number;
  requiredMinimum: number;
  missingText: string;
  actionEndpoint: string;
}>;

export type TaxiOrdersRealDataReadiness009M = Readonly<{
  version: TaxiOrdersRealDataReadinessVersion009M;
  dashboardPurpose: 'show_missing_real_data_requirements';
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  productionChainVerifiedBy009L: true;
  strictDbOnlyNoZeroFill: true;
  noFakeRows: true;
  noFakeCreate: true;
  readOnlyStatus: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteExecuted: false;
}>;

export type TaxiOrdersRealDataStatus009M = Readonly<{
  ok: boolean;
  version: TaxiOrdersRealDataReadinessVersion009M;
  code: string;
  counts: TaxiOrdersRealDataCounts009M;
  requirements: readonly TaxiOrdersRealDataRequirement009M[];
  readyRequirements: number;
  missingRequirements: number;
  readinessPercent: number;
  canCreateQuoteNow: boolean;
  canCreateRiderRequestNow: boolean;
  canCreateDispatchOfferNow: boolean;
  canCreateTripNow: boolean;
  ordersVisibleFromTaxiTrip: boolean;
  nextMissingRequirementKey: string;
  nextOwnerAction: string;
  strictDbOnlyNoZeroFill: true;
  noFakeRows: true;
  noFakeCreate: true;
  dbWriteExecuted: false;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
