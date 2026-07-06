import type { TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION } from './constants';

export type TaxiOrdersQuoteIntakeVersion009K = typeof TAXI_ORDERS_QUOTE_INTAKE_009K_VERSION;

export type TaxiOrdersQuoteIntakeReadiness009K = Readonly<{
  version: TaxiOrdersQuoteIntakeVersion009K;
  createsQuoteStatus: 'accepted';
  realRiderProfileRequired: true;
  activeTariffRegionRequired: true;
  realRouteProviderReferenceRequired: true;
  realPickupDropoffGeoJsonRequired: true;
  positiveFareRequired: true;
  quoteSource: 'admin_real_route_intake';
  riderRequestSourceRemains: 'TaxiQuote';
  dispatchOfferSourceRemains: 'TaxiRiderRequest';
  orderTripSourceRemains: 'TaxiTrip';
  auditStorage: 'TaxiAuditLog';
  protectedCreateRequiresExactHeader: true;
  idempotencyRequired: true;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  dbWriteOnlyForExistingRiderTariffAndRealRoute: true;
  fakeRiderCreateBlocked: true;
  fakeTariffCreateBlocked: true;
  fakeRouteCreateBlocked: true;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersQuoteIntakeCreateInput009K = Readonly<{
  riderProfileId: string;
  tariffRegionId: string;
  routeProviderRef: string;
  estimatedFareMinor: number;
  pickupGeoJson: unknown;
  dropoffGeoJson: unknown;
  expiresInMinutes?: number;
  reason?: string;
}>;

export type TaxiOrdersQuoteIntakeCreateResult009K = Readonly<{
  ok: boolean;
  version: TaxiOrdersQuoteIntakeVersion009K;
  code: string;
  quoteId: string;
  riderProfileId: string;
  tariffRegionId: string;
  routeProviderRef: string;
  estimatedFareMinor: number;
  expiresAt: string;
  idempotencyKey: string;
  existingRiderProfileFound: boolean;
  activeTariffRegionFound: boolean;
  realRoutePayloadAccepted: boolean;
  existingOpenQuoteFound: boolean;
  createdQuoteStatus: string;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  fakeRiderCreateBlocked: true;
  fakeTariffCreateBlocked: true;
  fakeRouteCreateBlocked: true;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
