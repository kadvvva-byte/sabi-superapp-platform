import type { TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION } from './constants';

export type TaxiOrdersRiderRequestCreateVersion009J = typeof TAXI_ORDERS_RIDER_REQUEST_CREATE_009J_VERSION;

export type TaxiOrdersRiderRequestCreateReadiness009J = Readonly<{
  version: TaxiOrdersRiderRequestCreateVersion009J;
  existingAcceptedQuoteOnly: true;
  quoteStatusRequired: readonly string[];
  quoteNotExpiredRequired: true;
  createsRiderRequestStatus: 'created';
  riderRequestSource: 'TaxiQuote';
  dispatchOfferSourceRemains: 'TaxiRiderRequest';
  orderTripSourceRemains: 'TaxiTrip';
  auditStorage: 'TaxiAuditLog';
  protectedCreateRequiresExactHeader: true;
  idempotencyRequired: true;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  dbWriteOnlyForExistingAcceptedQuote: true;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersRiderRequestQuoteCandidate009J = Readonly<{
  quoteId: string;
  quoteStatus: string;
  riderProfileId: string;
  tariffRegionId: string;
  estimatedFareMinor: number;
  expiresAt: string;
  expired: boolean;
  existingOpenRiderRequestId: string;
  canCreateRiderRequest: boolean;
  blockedReason: string;
  createdAt: string;
  updatedAt: string;
  noFakeRiderRequest: true;
}>;

export type TaxiOrdersRiderRequestQuoteCandidateResult009J = Readonly<{
  ok: boolean;
  version: TaxiOrdersRiderRequestCreateVersion009J;
  code: string;
  candidates: TaxiOrdersRiderRequestQuoteCandidate009J[];
  acceptedQuoteCount: number;
  createReadyCount: number;
  existingOpenRequestCount: number;
  dbWriteExecuted: false;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersRiderRequestCreateInput009J = Readonly<{
  quoteId: string;
  reason?: string;
}>;

export type TaxiOrdersRiderRequestCreateResult009J = Readonly<{
  ok: boolean;
  version: TaxiOrdersRiderRequestCreateVersion009J;
  code: string;
  quoteId: string;
  riderRequestId: string;
  riderProfileId: string;
  tariffRegionId: string;
  idempotencyKey: string;
  existingAcceptedQuoteFound: boolean;
  quoteNotExpiredFound: boolean;
  existingOpenRiderRequestFound: boolean;
  createdRiderRequestStatus: string;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  fakeQuoteCreateBlocked: true;
  fakeRequestCreateBlocked: true;
  fakeDispatchOfferCreateBlocked: true;
  fakeTripCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
