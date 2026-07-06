import type { TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION } from './constants';

export type TaxiOrdersProductionChainVersion009L = typeof TAXI_ORDERS_PRODUCTION_CHAIN_009L_VERSION;

export type TaxiOrdersProductionChainStep009L = Readonly<{
  key: string;
  from: string;
  to: string;
  endpoint: string;
  approvalHeader: string;
}>;

export type TaxiOrdersProductionChainReadiness009L = Readonly<{
  version: TaxiOrdersProductionChainVersion009L;
  fullRealOrderChain: true;
  chain: readonly TaxiOrdersProductionChainStep009L[];
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  orderDbSource: 'TaxiTrip';
  quoteSource: 'TaxiRiderProfile + TaxiTariffRegion + real route + real fare';
  riderRequestSource: 'TaxiQuote';
  dispatchOfferSource: 'TaxiRiderRequest';
  tripCreateSource: 'TaxiDispatchOffer';
  auditStorage: 'TaxiAuditLog';
  archiveAfterDays: 7;
  strictDbOnlyNoZeroFill: true;
  fakeRiderCreateBlocked: true;
  fakeTariffCreateBlocked: true;
  fakeRouteCreateBlocked: true;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  fakeOrderCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
  dbWriteExecuted: false;
}>;

export type TaxiOrdersProductionChainCounts009L = Readonly<{
  riderProfiles: number;
  activeTariffRegions: number;
  acceptedQuotes: number;
  openRiderRequests: number;
  approvedDriversWithPositiveBalance: number;
  approvedVehicles: number;
  openDispatchOffers: number;
  acceptedDispatchOffers: number;
  taxiTrips: number;
  auditLogs: number;
}>;

export type TaxiOrdersProductionChainStatus009L = Readonly<{
  ok: boolean;
  version: TaxiOrdersProductionChainVersion009L;
  code: string;
  missingPrismaDelegates: readonly string[];
  counts: TaxiOrdersProductionChainCounts009L;
  chainCanStartFromRealData: boolean;
  quoteCandidatesAvailable: boolean;
  riderRequestCandidatesAvailable: boolean;
  dispatchOfferCandidatesAvailable: boolean;
  tripCandidatesAvailable: boolean;
  ordersVisibleFromTaxiTrip: boolean;
  strictDbOnlyNoZeroFill: true;
  dbWriteExecuted: false;
  fakeRiderCreateBlocked: true;
  fakeTariffCreateBlocked: true;
  fakeRouteCreateBlocked: true;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  fakeOrderCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
