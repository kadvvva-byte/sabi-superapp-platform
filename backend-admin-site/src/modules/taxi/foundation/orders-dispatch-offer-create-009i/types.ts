import type { TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION } from './constants';

export type TaxiOrdersDispatchOfferCreateVersion009I = typeof TAXI_ORDERS_DISPATCH_OFFER_CREATE_009I_VERSION;

export type TaxiOrdersDispatchOfferCreateReadiness009I = Readonly<{
  version: TaxiOrdersDispatchOfferCreateVersion009I;
  existingRiderRequestOnly: true;
  existingApprovedDriverOnly: true;
  existingApprovedVehicleOnly: true;
  activeVehicleAssignmentRequired: true;
  positiveDriverBalanceRequired: true;
  createsDispatchOfferStatus: 'sent';
  orderTripSourceRemains: 'TaxiTrip';
  dispatchOfferSource: 'TaxiRiderRequest';
  auditStorage: 'TaxiAuditLog';
  protectedCreateRequiresExactHeader: true;
  idempotencyRequired: true;
  endpoints: readonly string[];
  requiredPrismaDelegates: readonly string[];
  dbWriteOnlyForExistingRequestDriverVehicle: true;
  fakeRequestCreateBlocked: true;
  fakeDriverCreateBlocked: true;
  fakeVehicleCreateBlocked: true;
  fakeOfferCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersDispatchOfferCandidate009I = Readonly<{
  riderRequestId: string;
  riderRequestStatus: string;
  quoteId: string;
  riderProfileId: string;
  tariffRegionId: string;
  countryCode: string;
  cityId: string;
  driverProfileId: string;
  driverBalanceReserveMinor: number;
  vehicleId: string;
  matchingScore: number;
  canCreateDispatchOffer: boolean;
  blockedReason: string;
  existingOpenDispatchOfferId: string;
  createdAt: string;
  updatedAt: string;
  noFakeDispatchOffer: true;
}>;

export type TaxiOrdersDispatchOfferCandidateResult009I = Readonly<{
  ok: boolean;
  version: TaxiOrdersDispatchOfferCreateVersion009I;
  code: string;
  candidates: TaxiOrdersDispatchOfferCandidate009I[];
  openRequestCount: number;
  createReadyCount: number;
  existingOpenOfferCount: number;
  dbWriteExecuted: false;
  fakeRequestCreateBlocked: true;
  fakeDriverCreateBlocked: true;
  fakeVehicleCreateBlocked: true;
  fakeOfferCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
}>;

export type TaxiOrdersDispatchOfferCreateInput009I = Readonly<{
  riderRequestId: string;
  driverProfileId: string;
  vehicleId?: string;
  matchingScore?: number;
  offerTtlSeconds?: number;
  reason?: string;
}>;

export type TaxiOrdersDispatchOfferCreateResult009I = Readonly<{
  ok: boolean;
  version: TaxiOrdersDispatchOfferCreateVersion009I;
  code: string;
  riderRequestId: string;
  dispatchOfferId: string;
  driverProfileId: string;
  vehicleId: string;
  idempotencyKey: string;
  existingRiderRequestFound: boolean;
  existingApprovedDriverFound: boolean;
  existingApprovedVehicleFound: boolean;
  activeVehicleAssignmentFound: boolean;
  positiveDriverBalanceFound: boolean;
  existingOpenDispatchOfferFound: boolean;
  createdOfferStatus: string;
  dbWriteExecuted: boolean;
  auditWriteExecuted: boolean;
  fakeRequestCreateBlocked: true;
  fakeDriverCreateBlocked: true;
  fakeVehicleCreateBlocked: true;
  fakeOfferCreateBlocked: true;
  providerDispatch: false;
  walletMutation: false;
  directDbAccessByUi: false;
}>;
